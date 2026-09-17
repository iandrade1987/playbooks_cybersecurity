# -*- coding: utf-8 -*-
"""Centro de Playbooks de Cibersegurança — aplicação Flask local com login e base de dados."""
import json
import os
import re
import unicodedata
from datetime import datetime, timezone
from functools import wraps

from flask import Flask, jsonify, redirect, render_template, request, session, url_for, send_file, abort
from werkzeug.security import check_password_hash, generate_password_hash

import db
import seed_data
from icons import svg_icon, icon_chip

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SECRET_FILE = os.path.join(BASE_DIR, ".secret_key")

app = Flask(__name__)

if os.path.exists(SECRET_FILE):
    with open(SECRET_FILE, "r", encoding="utf-8") as f:
        app.secret_key = f.read().strip()
else:
    app.secret_key = os.urandom(32).hex()
    with open(SECRET_FILE, "w", encoding="utf-8") as f:
        f.write(app.secret_key)

db.init_db()
db.seed(seed_data.CATEGORIES)

app.jinja_env.globals["icon"] = svg_icon
app.jinja_env.globals["icon_chip"] = icon_chip

with open(os.path.join(BASE_DIR, "static", "style.css"), "r", encoding="utf-8") as f:
    STYLE_CSS = f.read()


def login_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        if not db.has_users():
            return redirect(url_for("setup"))
        if not session.get("user_id"):
            return redirect(url_for("login"))
        return view(*args, **kwargs)
    return wrapped


def now_iso():
    return datetime.now(timezone.utc).isoformat()


def slugify(text):
    text = unicodedata.normalize("NFD", text).encode("ascii", "ignore").decode("ascii")
    text = re.sub(r"[^a-zA-Z0-9]+", "-", text).strip("-").lower()
    return text or "item"


# ---------- Auth ----------

@app.route("/setup", methods=["GET", "POST"])
def setup():
    if db.has_users():
        return redirect(url_for("login"))
    error = None
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "")
        confirm = request.form.get("confirm", "")
        if not username or not password:
            error = "Preencha utilizador e palavra-passe."
        elif password != confirm:
            error = "As palavras-passe não coincidem."
        elif len(password) < 6:
            error = "A palavra-passe deve ter pelo menos 6 caracteres."
        else:
            conn = db.get_conn()
            conn.execute(
                "INSERT INTO users (username, password_hash, created_at) VALUES (?, ?, ?)",
                (username, generate_password_hash(password), now_iso()),
            )
            conn.commit()
            conn.close()
            return redirect(url_for("login"))
    return render_template("setup.html", error=error)


@app.route("/login", methods=["GET", "POST"])
def login():
    if not db.has_users():
        return redirect(url_for("setup"))
    error = None
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "")
        conn = db.get_conn()
        row = conn.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()
        conn.close()
        if row and check_password_hash(row["password_hash"], password):
            session["user_id"] = row["id"]
            session["username"] = row["username"]
            return redirect(url_for("index"))
        error = "Credenciais inválidas."
    return render_template("login.html", error=error)


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))


# ---------- Dashboard ----------

@app.route("/")
@login_required
def index():
    return render_template("dashboard.html", username=session.get("username"))


# ---------- Data helpers ----------

def load_playbooks_rows():
    conn = db.get_conn()
    cats = conn.execute("SELECT * FROM categories ORDER BY sort_order").fetchall()
    result = []
    for cat in cats:
        pbs = conn.execute(
            "SELECT * FROM playbooks WHERE category_id = ? ORDER BY sort_order", (cat["id"],)
        ).fetchall()
        playbooks = []
        for pb in pbs:
            data = json.loads(pb["data"])
            data["id"] = pb["id"]

            check_rows = conn.execute(
                "SELECT step_key, checked, teams FROM checklist_state WHERE playbook_id = ?", (pb["id"],)
            ).fetchall()
            check_map = {r["step_key"]: {"checked": bool(r["checked"]), "teams": json.loads(r["teams"])} for r in check_rows}

            method_rows = conn.execute(
                "SELECT method_key, marked FROM method_state WHERE playbook_id = ?", (pb["id"],)
            ).fetchall()
            method_map = {r["method_key"]: bool(r["marked"]) for r in method_rows}

            for phase_key in ["containment", "eradication", "recovery", "communication", "postIncident"]:
                for step in data.get(phase_key, []):
                    state = check_map.get(step["key"], {"checked": False, "teams": []})
                    step["checked"] = state["checked"]
                    step["teams"] = state["teams"]

            for m in data.get("detectionMethods", []):
                m["marked"] = method_map.get(m["key"], False)

            playbooks.append(data)
        result.append({"id": cat["id"], "name": cat["name"], "color": cat["color"], "icon": cat["icon"], "playbooks": playbooks})
    conn.close()
    return result


# ---------- API ----------

@app.route("/api/data")
@login_required
def api_data():
    return jsonify({"categories": load_playbooks_rows(), "priorityInfo": seed_data.PRIORITY_INFO})


EDITABLE_LIST_FIELDS = {"indicators", "team", "detectionMethods", "containment", "eradication", "recovery", "communication", "postIncident"}
EDITABLE_SCALAR_FIELDS = {"objective"}


@app.route("/api/playbook/<pb_id>", methods=["PATCH"])
@login_required
def api_update_playbook(pb_id):
    body = request.get_json(force=True, silent=True) or {}
    conn = db.get_conn()
    row = conn.execute("SELECT data FROM playbooks WHERE id = ?", (pb_id,)).fetchone()
    if not row:
        conn.close()
        abort(404)
    data = json.loads(row["data"])

    field = body.get("field")
    key = body.get("key")
    value = body.get("value", "")

    if field in EDITABLE_SCALAR_FIELDS:
        data[field] = value
    elif field in EDITABLE_LIST_FIELDS and key:
        for item in data.get(field, []):
            if item.get("key") == key:
                item["text"] = value
                break
    else:
        conn.close()
        return jsonify({"error": "campo inválido"}), 400

    conn.execute("UPDATE playbooks SET data = ? WHERE id = ?", (json.dumps(data, ensure_ascii=False), pb_id))
    conn.commit()
    conn.close()
    return jsonify({"ok": True})


@app.route("/api/checklist/<pb_id>/<step_key>/toggle", methods=["POST"])
@login_required
def api_toggle_checklist(pb_id, step_key):
    body = request.get_json(force=True, silent=True) or {}
    checked = bool(body.get("checked"))
    conn = db.get_conn()
    existing = conn.execute(
        "SELECT teams FROM checklist_state WHERE playbook_id = ? AND step_key = ?", (pb_id, step_key)
    ).fetchone()
    teams = existing["teams"] if existing else "[]"
    conn.execute(
        """INSERT INTO checklist_state (playbook_id, step_key, checked, teams, updated_at)
           VALUES (?, ?, ?, ?, ?)
           ON CONFLICT(playbook_id, step_key) DO UPDATE SET checked = excluded.checked, updated_at = excluded.updated_at""",
        (pb_id, step_key, int(checked), teams, now_iso()),
    )
    conn.commit()
    conn.close()
    return jsonify({"ok": True})


@app.route("/api/checklist/<pb_id>/<step_key>/teams", methods=["POST"])
@login_required
def api_set_checklist_teams(pb_id, step_key):
    body = request.get_json(force=True, silent=True) or {}
    teams = body.get("teams", [])
    if not isinstance(teams, list):
        return jsonify({"error": "teams deve ser uma lista"}), 400
    conn = db.get_conn()
    existing = conn.execute(
        "SELECT checked FROM checklist_state WHERE playbook_id = ? AND step_key = ?", (pb_id, step_key)
    ).fetchone()
    checked = existing["checked"] if existing else 0
    conn.execute(
        """INSERT INTO checklist_state (playbook_id, step_key, checked, teams, updated_at)
           VALUES (?, ?, ?, ?, ?)
           ON CONFLICT(playbook_id, step_key) DO UPDATE SET teams = excluded.teams, updated_at = excluded.updated_at""",
        (pb_id, step_key, checked, json.dumps(teams, ensure_ascii=False), now_iso()),
    )
    conn.commit()
    conn.close()
    return jsonify({"ok": True})


@app.route("/api/method/<pb_id>/<method_key>/toggle", methods=["POST"])
@login_required
def api_toggle_method(pb_id, method_key):
    body = request.get_json(force=True, silent=True) or {}
    marked = bool(body.get("marked"))
    conn = db.get_conn()
    conn.execute(
        """INSERT INTO method_state (playbook_id, method_key, marked) VALUES (?, ?, ?)
           ON CONFLICT(playbook_id, method_key) DO UPDATE SET marked = excluded.marked""",
        (pb_id, method_key, int(marked)),
    )
    conn.commit()
    conn.close()
    return jsonify({"ok": True})


# ---------- Downloads ----------

@app.route("/download/playbook/<pb_id>")
@login_required
def download_playbook(pb_id):
    categories = load_playbooks_rows()
    for cat in categories:
        for pb in cat["playbooks"]:
            if pb["id"] == pb_id:
                html = render_template("export_playbook.html", cat=cat, pb=pb, priority_info=seed_data.PRIORITY_INFO, css=STYLE_CSS)
                filename = f"playbook-{slugify(pb['name'])}.html"
                return app.response_class(html, mimetype="text/html", headers={"Content-Disposition": f'attachment; filename="{filename}"'})
    abort(404)


@app.route("/download/category/<cat_id>")
@login_required
def download_category(cat_id):
    categories = load_playbooks_rows()
    for cat in categories:
        if cat["id"] == cat_id:
            html = render_template("export_category.html", cat=cat, priority_info=seed_data.PRIORITY_INFO, css=STYLE_CSS)
            filename = f"playbooks-{slugify(cat['name'])}.html"
            return app.response_class(html, mimetype="text/html", headers={"Content-Disposition": f'attachment; filename="{filename}"'})
    abort(404)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8002, debug=True)
