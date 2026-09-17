# -*- coding: utf-8 -*-
"""Camada de base de dados (SQLite) para o Centro de Playbooks de Cibersegurança."""
import json
import os
import sqlite3
import uuid

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "playbooks.db")

SCHEMA = """
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    color TEXT NOT NULL,
    icon TEXT NOT NULL,
    sort_order INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS playbooks (
    id TEXT PRIMARY KEY,
    category_id TEXT NOT NULL,
    sort_order INTEGER NOT NULL,
    data TEXT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS checklist_state (
    playbook_id TEXT NOT NULL,
    step_key TEXT NOT NULL,
    checked INTEGER NOT NULL DEFAULT 0,
    teams TEXT NOT NULL DEFAULT '[]',
    updated_at TEXT,
    PRIMARY KEY (playbook_id, step_key)
);

CREATE TABLE IF NOT EXISTS method_state (
    playbook_id TEXT NOT NULL,
    method_key TEXT NOT NULL,
    marked INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (playbook_id, method_key)
);
"""


def get_conn():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def init_db():
    conn = get_conn()
    conn.executescript(SCHEMA)
    conn.commit()
    conn.close()


def _with_step_keys(steps, prefix):
    """Assign a permanent, content-independent key to each phase step."""
    out = []
    for i, step in enumerate(steps):
        out.append({"key": f"{prefix}-{i}", "text": step["text"], "tools": step.get("tools", [])})
    return out


def is_seeded():
    conn = get_conn()
    row = conn.execute("SELECT COUNT(*) AS n FROM playbooks").fetchone()
    conn.close()
    return row["n"] > 0


def seed(categories):
    """Populate categories/playbooks tables from seed_data.CATEGORIES. Only runs once."""
    if is_seeded():
        return
    conn = get_conn()
    for cat_order, cat in enumerate(categories):
        conn.execute(
            "INSERT OR IGNORE INTO categories (id, name, color, icon, sort_order) VALUES (?, ?, ?, ?, ?)",
            (cat["id"], cat["name"], cat["color"], cat["icon"], cat_order),
        )
        for pb_order, pb in enumerate(cat["playbooks"]):
            data = dict(pb)
            data.pop("id", None)
            phase_keys = ["containment", "eradication", "recovery", "communication", "postIncident"]
            for pk in phase_keys:
                data[pk] = _with_step_keys(data.get(pk, []), f"{pb['id']}-{pk}")

            team_with_keys = [{"key": str(uuid.uuid4())[:8], "text": t} for t in data.get("team", [])]
            data["team"] = team_with_keys

            methods_with_keys = [{"key": str(uuid.uuid4())[:8], "text": m} for m in data.get("detectionMethods", [])]
            data["detectionMethods"] = methods_with_keys

            indicators_with_keys = [{"key": str(uuid.uuid4())[:8], "text": i} for i in data.get("indicators", [])]
            data["indicators"] = indicators_with_keys

            conn.execute(
                "INSERT OR IGNORE INTO playbooks (id, category_id, sort_order, data) VALUES (?, ?, ?, ?)",
                (pb["id"], cat["id"], pb_order, json.dumps(data, ensure_ascii=False)),
            )
    conn.commit()
    conn.close()


def has_users():
    conn = get_conn()
    row = conn.execute("SELECT COUNT(*) AS n FROM users").fetchone()
    conn.close()
    return row["n"] > 0
