/* Centro de Playbooks de Cibersegurança — frontend (consome /api/data e /api/*) */

const ICONS = {
  shield: '<path d="M12 3l7 3v5c0 5-3.2 8.5-7 10-3.8-1.5-7-5-7-10V6l7-3z"/>',
  bug: '<circle cx="12" cy="13" r="5"/><line x1="9" y1="9" x2="7" y2="6"/><line x1="15" y1="9" x2="17" y2="6"/><line x1="7" y1="13" x2="3" y2="13"/><line x1="17" y1="13" x2="21" y2="13"/><line x1="8" y1="18" x2="5" y2="21"/><line x1="16" y1="18" x2="19" y2="21"/><line x1="12" y1="8" x2="12" y2="18"/>',
  cpu: '<rect x="6" y="6" width="12" height="12" rx="1.5"/><rect x="9.5" y="9.5" width="5" height="5"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="3" y1="13" x2="21" y2="13"/>',
  key: '<circle cx="8" cy="16" r="3.5"/><path d="M11 13l9-9"/><path d="M16 8l2 2"/><path d="M18 6l2 2"/>',
  repeat: '<path d="M4 4v5h5"/><path d="M20 20v-5h-5"/><path d="M5 15a8 8 0 0 0 14-4"/><path d="M19 9A8 8 0 0 0 5 13"/>',
  waves: '<path d="M2 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M2 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M2 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>',
  network: '<circle cx="6" cy="6" r="2.2"/><circle cx="18" cy="6" r="2.2"/><circle cx="12" cy="18" r="2.2"/><line x1="7.7" y1="7.3" x2="10.5" y2="16.3"/><line x1="16.3" y1="7.3" x2="13.5" y2="16.3"/><line x1="8.2" y1="6" x2="15.8" y2="6"/>',
  database: '<ellipse cx="12" cy="5.5" rx="7" ry="2.8"/><path d="M5 5.5v13c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-13"/><path d="M5 12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8"/>',
  code: '<polyline points="9 8 4 12 9 16"/><polyline points="15 8 20 12 15 16"/>',
  cloud: '<path d="M7 18a4 4 0 0 1 0-8 5.5 5.5 0 0 1 10.7-1.6A4 4 0 1 1 18 18H7z"/>',
  terminal: '<rect x="3" y="4" width="18" height="16" rx="2"/><polyline points="7 9 10 12 7 15"/><line x1="12" y1="15" x2="17" y2="15"/>',
  "user-x": '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 20c0-3.5 2.5-6 5.5-6s5.5 2.5 5.5 6"/><line x1="16" y1="9" x2="21" y2="14"/><line x1="21" y1="9" x2="16" y2="14"/>',
  "smartphone-off": '<rect x="6" y="2" width="12" height="20" rx="2"/><line x1="3" y1="3" x2="21" y2="21"/><line x1="11" y1="18" x2="13" y2="18"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  trash: '<polyline points="4 7 20 7"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>',
  "refresh-cw": '<path d="M20 11A8 8 0 0 0 6.3 6.3L4 8.6"/><polyline points="4 4 4 8.6 8.6 8.6"/><path d="M4 13a8 8 0 0 0 13.7 4.7L20 15.4"/><polyline points="20 20 20 15.4 15.4 15.4"/>',
  megaphone: '<path d="M3 11v2a2 2 0 0 0 2 2h1l3 4v-12l-3 4H5a2 2 0 0 0-2 2z"/><path d="M9 8l8-3v14l-8-3"/><path d="M18 10a3 3 0 0 1 0 4"/>',
  "clipboard-check": '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6a1 1 0 0 1 1 1v1H8V5a1 1 0 0 1 1-1z"/><polyline points="8.5 13 11 15.5 15.5 10"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M15.5 6.5a3 3 0 0 1 0 5.7"/><path d="M17.5 20c0-2.5-1.2-4.6-3-5.7"/>',
  radar: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none"/><path d="M12 12l7-4"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><line x1="15.5" y1="15.5" x2="21" y2="21"/>',
  "chevrons-expand": '<polyline points="7 4 12 9 17 4"/><polyline points="7 20 12 15 17 20"/>',
  download: '<path d="M12 3v12"/><polyline points="7 10 12 15 17 10"/><path d="M5 19h14"/>',
  clock: '<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/>',
  home: '<path d="M4 11l8-7 8 7"/><path d="M6 9.5V20a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9.5"/><path d="M10 21v-6h4v6"/>',
  edit: '<path d="M4 20h4l10.5-10.5a2.121 2.121 0 0 0-3-3L5 17v3z"/><path d="M13.5 6.5l4 4"/>',
  check: '<polyline points="4 12 9.5 17.5 20 6"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>'
};

function icon(name, cls) {
  const body = ICONS[name] || "";
  return `<svg class="icon${cls ? " " + cls : ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}
function iconChip(name, color, size) {
  return `<span class="icon-chip ${size || "md"}" style="--chip-color:${color}">${icon(name)}</span>`;
}
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escAttr(s) { return esc(s).replace(/"/g, "&quot;"); }

const PHASES = [
  { key: "indicators", title: "Indicadores de Deteção", icon: "eye" },
  { key: "containment", title: "Fase 1 · Contenção Imediata", icon: "lock" },
  { key: "eradication", title: "Fase 2 · Erradicação", icon: "trash" },
  { key: "recovery", title: "Fase 3 · Recuperação", icon: "refresh-cw" },
  { key: "communication", title: "Fase 4 · Comunicação & Conformidade", icon: "megaphone" },
  { key: "postIncident", title: "Fase 5 · Pós-Incidente", icon: "clipboard-check" }
];
const SEV_LABEL = { critical: "Severidade Crítica", high: "Severidade Alta", medium: "Severidade Média" };

let DATA = null;

async function api(method, url, body) {
  const res = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined
  });
  if (!res.ok) throw new Error("Falha na comunicação com o servidor (" + res.status + ")");
  return res.json();
}

function findPlaybook(id) {
  for (const cat of DATA.categories) {
    const pb = cat.playbooks.find(p => p.id === id);
    if (pb) return { pb, cat };
  }
  return null;
}
function findCategory(id) { return DATA.categories.find(c => c.id === id) || null; }

/* ---------- Rendering ---------- */

function renderPriorityMatrix() {
  const el = document.getElementById("priority-matrix");
  const rows = Object.entries(DATA.priorityInfo).map(([key, p]) => `
    <tr>
      <td class="mx-priority" style="color:${key === "P1" ? "var(--sev-critical)" : key === "P2" ? "var(--sev-high)" : key === "P3" ? "var(--sev-medium)" : "var(--text-faint)"}">${esc(p.label)}</td>
      <td class="mx-response">${esc(p.response)}</td>
      <td>${esc(p.authority)}</td>
      <td class="mx-desc">${esc(p.desc)}</td>
    </tr>`).join("");
  el.innerHTML = `<table class="matrix-table"><thead><tr><th>Prioridade</th><th>Tempo de Resposta</th><th>Autoridade de Decisão</th><th>Critério</th></tr></thead><tbody>${rows}</tbody></table>`;
}

function renderNav() {
  const tree = document.getElementById("nav-tree");
  tree.innerHTML = DATA.categories.map(cat => `
    <div class="cat-group" data-cat="${cat.id}">
      <div class="cat-head">${iconChip(cat.icon, cat.color, "sm")}<span class="cat-head-label">${esc(cat.name)}</span><span class="cat-count">${cat.playbooks.length}</span></div>
      <ul class="cat-items">
        ${cat.playbooks.map(pb => `<li><a href="#${pb.id}" data-target="${pb.id}">${icon(pb.icon, "icon-xs")}<span>${esc(pb.name)}</span></a></li>`).join("")}
      </ul>
    </div>`).join("");
}

function renderContent() {
  const content = document.getElementById("content");
  content.innerHTML = DATA.categories.map(cat => `
    <section class="category-section" data-cat="${cat.id}">
      <div class="category-banner">
        <div class="bar" style="background:${cat.color}"></div>
        ${iconChip(cat.icon, cat.color, "lg")}
        <h3>${esc(cat.name)}</h3>
        <span class="n">${cat.playbooks.length} playbooks</span>
        <a class="btn sm" href="/download/category/${cat.id}" title="Descarregar todos os playbooks desta categoria">${icon("download", "icon-xs")}<span>Descarregar categoria</span></a>
      </div>
      ${cat.playbooks.map(pb => renderPlaybook(pb, cat)).join("")}
    </section>`).join("");
}

function renderStepTools(tools) {
  if (!tools || !tools.length) return "";
  return `<div class="step-tools">${tools.map(t => `<span>${esc(t)}</span>`).join("")}</div>`;
}

function renderPlaybook(pb, cat) {
  const pinfo = DATA.priorityInfo[pb.priority];
  const attackHtml = pb.attack && pb.attack.length
    ? pb.attack.map(a => `<span class="attack-chip"><code>${esc(a.id)}</code>${esc(a.name)}</span>`).join("")
    : `<span class="attack-note">${esc(pb.attackNote || "Sem mapeamento ATT&CK aplicável")}</span>`;
  const relatedHtml = (pb.related || []).map(rid => {
    const target = findPlaybook(rid);
    if (!target) return "";
    return `<a class="related-chip" href="#${rid}">${icon(target.pb.icon, "icon-xs")}${esc(target.pb.name)}</a>`;
  }).join("");

  const blocks = PHASES.filter(p => p.key !== "indicators").map(phase => `
    <div class="pb-block">
      <h5><span class="num">${icon(phase.icon, "icon-xs")}</span>${phase.title}</h5>
      <ul>${pb[phase.key].map(step => `
        <li>
          <div data-editable data-field="${phase.key}" data-key="${step.key}" data-pb="${pb.id}">${esc(step.text)}</div>
          ${renderStepTools(step.tools)}
        </li>`).join("")}</ul>
    </div>`).join("");

  const allSteps = [];
  PHASES.filter(p => p.key !== "indicators").forEach(phase => {
    pb[phase.key].forEach(step => allSteps.push({ phase: phase.key, ...step }));
  });

  return `
    <article class="playbook" id="${pb.id}" data-pb="${pb.id}" data-search="${escAttr((pb.name + " " + pb.objective).toLowerCase())}" style="border-left-color:${cat.color}">
      <div class="pb-head">
        ${iconChip(pb.icon, cat.color, "md")}
        <h4>${esc(pb.name)}</h4>
        <span class="badge priority-${pb.priority}">${esc(pinfo ? pinfo.label : pb.priority)}</span>
        <span class="badge sev-${pb.severity}">${SEV_LABEL[pb.severity]}</span>
        <span class="badge sla">${icon("clock", "icon-xs")}${esc(pb.sla)}</span>
        <button class="icon-btn" data-edit-toggle="${pb.id}" title="Editar textos deste playbook">${icon("edit", "icon-xs")}</button>
        <a class="icon-btn" href="/download/playbook/${pb.id}" title="Descarregar «${escAttr(pb.name)}» em HTML">${icon("download", "icon-xs")}</a>
      </div>
      <div class="pb-objective" data-editable data-field="objective" data-pb="${pb.id}">${esc(pb.objective)}</div>
      <div class="edit-hint">${icon("edit", "icon-xs")}Modo de edição ativo — clique num texto para o alterar. Guarda automaticamente na base de dados.</div>

      <div class="meta-row">
        <div class="pb-block">
          <h5><span class="num">${icon("users", "icon-xs")}</span>Equipas Envolvidas</h5>
          <div class="indicators team-chips">${pb.team.map(t => `<span data-editable data-field="team" data-key="${t.key}" data-pb="${pb.id}">${esc(t.text)}</span>`).join("")}</div>
        </div>
        <div class="pb-block">
          <h5><span class="num">${icon("radar", "icon-xs")}</span>Métodos de Deteção <span class="hint">— marque o que detetou</span></h5>
          <div class="indicators method-chips">${pb.detectionMethods.map(m => `
            <label class="chip-toggle${m.marked ? " marked" : ""}" data-method-toggle data-pb="${pb.id}" data-key="${m.key}">
              <input type="checkbox" ${m.marked ? "checked" : ""} />
              <span class="chip-check">${icon("clipboard-check", "icon-xs")}</span>
              <span data-editable data-field="detectionMethods" data-key="${m.key}" data-pb="${pb.id}">${esc(m.text)}</span>
            </label>`).join("")}</div>
        </div>
      </div>

      <div class="pb-block pb-full" style="margin-bottom:18px;">
        <h5><span class="num">${icon("eye", "icon-xs")}</span>Indicadores de Deteção (sinais observáveis)</h5>
        <div class="indicators">${pb.indicators.map(i => `<span data-editable data-field="indicators" data-key="${i.key}" data-pb="${pb.id}">${esc(i.text)}</span>`).join("")}</div>
      </div>

      <div class="pb-block pb-full" style="margin-bottom:18px;">
        <h5><span class="num">${icon("network", "icon-xs")}</span>Mapeamento MITRE ATT&CK<sup>®</sup></h5>
        <div class="indicators attack-row">${attackHtml}</div>
      </div>

      <div class="pb-grid">${blocks}</div>

      <hr class="pb-div">

      <div class="pb-block pb-full">
        <h5><span class="num">${icon("clipboard-check", "icon-xs")}</span>Checklist Rápido de Execução <span class="hint">— ao marcar, indique a(s) equipa(s)</span></h5>
        <ul class="checklist">
          ${allSteps.map(s => `
          <li class="checklist-item${s.checked ? " done" : ""}" data-pb="${pb.id}" data-key="${s.key}">
            <div class="check-row">
              <input type="checkbox" data-checklist-toggle ${s.checked ? "checked" : ""} />
              <label>${esc(s.text)}</label>
              <button type="button" class="team-btn${s.teams && s.teams.length ? " assigned" : ""}" data-team-btn>
                <span class="team-btn-icon">${icon("users", "icon-xs")}</span>
                <span class="team-btn-label">${s.teams && s.teams.length ? (s.teams.length === 1 ? esc(s.teams[0]) : s.teams.length + " equipas") : "Team"}</span>
              </button>
            </div>
            <div class="team-picker" data-team-picker ${s.checked && (!s.teams || !s.teams.length) ? "" : "hidden"}>
              <span class="team-picker-label">${icon("users", "icon-xs")}Que equipa(s) executaram esta ação? <span class="hint">(pode escolher mais do que uma)</span></span>
              <div class="team-picker-opts">
                ${pb.team.map(t => `<button type="button" class="team-opt${s.teams && s.teams.includes(t.text) ? " selected" : ""}" data-team="${escAttr(t.text)}">${esc(t.text)}</button>`).join("")}
                <button type="button" class="team-picker-done">${icon("check", "icon-xs")}Concluir</button>
              </div>
            </div>
          </li>`).join("")}
        </ul>
      </div>

      ${relatedHtml ? `<div class="pb-block pb-full related-block"><h5>Playbooks Relacionados</h5><div class="indicators">${relatedHtml}</div></div>` : ""}
    </article>`;
}

/* ---------- Interactions ---------- */

function initSearch() {
  const input = document.getElementById("search");
  const counter = document.getElementById("visible-count");
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    let visible = 0;
    document.querySelectorAll(".playbook").forEach(pb => {
      const match = !q || pb.dataset.search.includes(q);
      pb.style.display = match ? "" : "none";
      if (match) visible++;
    });
    document.querySelectorAll(".cat-items li").forEach(li => {
      const id = li.querySelector("a").dataset.target;
      const pb = document.getElementById(id);
      li.style.display = pb && pb.style.display !== "none" ? "" : "none";
    });
    document.querySelectorAll(".category-section").forEach(sec => {
      const anyVisible = [...sec.querySelectorAll(".playbook")].some(p => p.style.display !== "none");
      sec.style.display = anyVisible ? "" : "none";
    });
    counter.textContent = `${visible} playbook${visible === 1 ? "" : "s"}`;
  });
}

let scrollSpyObserver = null;
function initScrollSpy() {
  if (scrollSpyObserver) scrollSpyObserver.disconnect();
  const links = document.querySelectorAll(".cat-items a");
  const map = new Map();
  links.forEach(l => map.set(l.dataset.target, l));
  scrollSpyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const link = map.get(entry.target.id);
      if (!link) return;
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  }, { rootMargin: "-15% 0px -75% 0px" });
  document.querySelectorAll(".playbook").forEach(pb => scrollSpyObserver.observe(pb));
}

const editingCards = new Set();
function setEditMode(pbId, on) {
  const article = document.getElementById(pbId);
  if (!article) return;
  article.classList.toggle("editing", on);
  article.querySelectorAll("[data-editable]").forEach(el => { el.contentEditable = on ? "true" : "false"; el.spellcheck = false; });
  const btn = article.querySelector(`[data-edit-toggle="${pbId}"]`);
  if (btn) btn.classList.toggle("active", on);
}

function initGlobalHandlers() {
  document.addEventListener("click", async (e) => {
    const editBtn = e.target.closest("[data-edit-toggle]");
    if (editBtn) {
      const id = editBtn.dataset.editToggle;
      const on = !editingCards.has(id);
      if (on) editingCards.add(id); else editingCards.delete(id);
      setEditMode(id, on);
      return;
    }

    const teamOpt = e.target.closest(".team-opt");
    if (teamOpt) {
      const li = teamOpt.closest(".checklist-item");
      const pbId = li.dataset.pb, key = li.dataset.key;
      const teamBtn = li.querySelector("[data-team-btn]");
      const teams = [...li.querySelectorAll(".team-opt.selected")].map(b => b.dataset.team);
      const idx = teams.indexOf(teamOpt.dataset.team);
      if (teamOpt.classList.contains("selected")) {
        teamOpt.classList.remove("selected");
        teams.splice(teams.indexOf(teamOpt.dataset.team), 1);
      } else {
        teamOpt.classList.add("selected");
        teams.push(teamOpt.dataset.team);
      }
      updateTeamBtnLabel(teamBtn, teams);
      try { await api("POST", `/api/checklist/${pbId}/${key}/teams`, { teams }); } catch (err) { console.error(err); }
      return;
    }

    const doneBtn = e.target.closest(".team-picker-done");
    if (doneBtn) {
      doneBtn.closest("[data-team-picker]").hidden = true;
      return;
    }

    const teamBtnEl = e.target.closest("[data-team-btn]");
    if (teamBtnEl) {
      const picker = teamBtnEl.closest(".checklist-item").querySelector("[data-team-picker]");
      picker.hidden = !picker.hidden;
      return;
    }
  });

  document.addEventListener("change", async (e) => {
    const methodToggle = e.target.closest("[data-method-toggle]") ? e.target : (e.target.matches("[data-method-toggle] input") ? e.target : null);
    const methodWrap = e.target.closest("[data-method-toggle]");
    if (methodWrap && e.target.matches("input[type=checkbox]")) {
      const marked = e.target.checked;
      methodWrap.classList.toggle("marked", marked);
      try { await api("POST", `/api/method/${methodWrap.dataset.pb}/${methodWrap.dataset.key}/toggle`, { marked }); } catch (err) { console.error(err); }
      return;
    }

    if (e.target.matches("[data-checklist-toggle]")) {
      const li = e.target.closest(".checklist-item");
      const pbId = li.dataset.pb, key = li.dataset.key;
      const checked = e.target.checked;
      li.classList.toggle("done", checked);
      const teamBtn = li.querySelector("[data-team-btn]");
      const picker = li.querySelector("[data-team-picker]");
      const hasTeams = teamBtn.classList.contains("assigned");
      picker.hidden = !(checked && !hasTeams);
      try { await api("POST", `/api/checklist/${pbId}/${key}/toggle`, { checked }); } catch (err) { console.error(err); }
      return;
    }
  });

  document.addEventListener("focusout", async (e) => {
    const el = e.target;
    if (!(el instanceof HTMLElement) || !el.matches("[data-editable]") || el.contentEditable !== "true") return;
    const field = el.dataset.field, key = el.dataset.key, pbId = el.dataset.pb;
    const value = el.textContent.replace(/\s+/g, " ").trim();
    try {
      await api("PATCH", `/api/playbook/${pbId}`, { field, key, value });
    } catch (err) { console.error(err); }
  });

  document.addEventListener("keydown", (e) => {
    const el = e.target;
    if (e.key !== "Enter" || !(el instanceof HTMLElement)) return;
    if (el.matches("[data-editable]") && el.contentEditable === "true") { e.preventDefault(); el.blur(); }
  });
}

function updateTeamBtnLabel(teamBtn, teams) {
  const label = teamBtn.querySelector(".team-btn-label");
  if (!teams || teams.length === 0) { label.textContent = "Team"; teamBtn.classList.remove("assigned"); }
  else { label.textContent = teams.length === 1 ? teams[0] : `${teams.length} equipas`; teamBtn.classList.add("assigned"); }
}

function initStaticIcons() {
  document.getElementById("brand-icon").outerHTML = iconChip("shield", "var(--accent)", "md");
  document.getElementById("search-icon").innerHTML = icon("search");
  document.getElementById("expand-icon").innerHTML = icon("chevrons-expand", "icon-xs");
  document.getElementById("print-icon").innerHTML = icon("download", "icon-xs");
  document.getElementById("matrix-icon").innerHTML = icon("clock", "icon-sm");
  document.getElementById("home-icon").innerHTML = icon("home", "icon-xs");
  document.getElementById("logout-icon").innerHTML = icon("logout", "icon-xs");
}

document.getElementById("home-btn").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  document.querySelectorAll(".cat-items a").forEach(l => l.classList.remove("active"));
});

let expanded = false;
document.getElementById("expand-all-btn").addEventListener("click", () => {
  expanded = !expanded;
  document.querySelectorAll(".checklist").forEach(c => c.style.display = expanded ? "none" : "");
  document.querySelector("#expand-all-btn .btn-label").textContent = expanded ? "Mostrar checklists" : "Expandir tudo";
});

async function boot() {
  DATA = await api("GET", "/api/data");
  renderPriorityMatrix();
  renderNav();
  renderContent();
  initStaticIcons();
  initSearch();
  initScrollSpy();
  initGlobalHandlers();
}

boot().catch(err => {
  document.getElementById("content").innerHTML = `<p style="color:var(--sev-critical)">Erro a carregar dados: ${esc(err.message)}</p>`;
});
