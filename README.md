# Playbooks de Cibersegurança

Centro de playbooks de resposta a incidentes de cibersegurança — 15 runbooks organizados em 5 categorias, cobrindo deteção, contenção, erradicação, recuperação e comunicação/conformidade para cada tipo de ataque, com as ferramentas concretas de segurança e de rede/infraestrutura de TI para executar cada passo.

Inclui mapeamento **MITRE ATT&CK®**, uma **matriz de prioridade e escalonamento** (P1–P4) independente da severidade técnica, e referências às obrigações legais aplicáveis (**RGPD** e **NIS2**, com supervisão do CNCS em Portugal).

🔗 **Demo ao vivo:** [iandrade1987.pythonanywhere.com](https://iandrade1987.pythonanywhere.com)

## Aplicação web (`app/`)

Uma aplicação Flask + SQLite que corre localmente, com login e persistência real em base de dados: os textos editados, os itens de checklist marcados e as equipas atribuídas a cada ação ficam guardados entre sessões.

### Funcionalidades

- **Login local** — na primeira execução cria-se uma conta de acesso (`/setup`); depois entra-se normalmente (`/login`).
- **15 playbooks** organizados por categoria (Malware/Ransomware, Engenharia Social e Identidade, Rede e Infraestrutura, Cloud e Aplicações, Ameaças Internas e Ativos Físicos), cada um com:
  - Objetivo, indicadores de deteção, equipas envolvidas e métodos de deteção (marcáveis).
  - As 5 fases de resposta (Contenção, Erradicação, Recuperação, Comunicação & Conformidade, Pós-Incidente), com ferramentas de segurança/rede/TI associadas a cada passo (EDR/XDR, SIEM, NGFW, NAC, PAM, IAM, DLP, CSPM, WAF, forense, backup/DR, etc.).
  - Mapeamento para técnicas **MITRE ATT&CK®**.
  - Checklist de execução rápida, onde cada item marcado pede para selecionar (uma ou várias) as equipas que executaram a ação.
- **Edição em linha** dos textos de cada playbook, guardada diretamente na base de dados.
- **Matriz de Prioridade & Escalonamento** (P1 a P4) com tempo de resposta e autoridade de decisão.
- **Download** de um playbook individual ou de uma categoria completa como ficheiro HTML autónomo.
- **Exportação/Impressão para PDF** de todo o documento.

### Requisitos

- **Python 3.9 ou superior** — [python.org/downloads](https://www.python.org/downloads/)
- **pip** — já vem incluído com o Python
- **SQLite** — não é preciso instalar nada à parte; vem embutido na biblioteca padrão do Python (`sqlite3`)

### Como correr

```bash
cd app
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

pip install -r requirements.txt
python app.py
```

Depois abrir [http://127.0.0.1:8002](http://127.0.0.1:8002) no browser. Da primeira vez é pedido para criar a conta de acesso; os dados ficam guardados em `app/playbooks.db` (ficheiro local, **não** incluído no repositório — ver `.gitignore`).

### Stack

- [Flask](https://flask.palletsprojects.com/) (Python) para o backend e autenticação por sessão.
- SQLite para persistência (categorias, playbooks, estado das checklists e das equipas atribuídas).
- Frontend em HTML/CSS/JS simples (sem framework).

### Estrutura

```
app/
├── app.py              # Rotas Flask (auth, API, downloads)
├── db.py                # Schema SQLite + seed inicial
├── seed_data.py          # Conteúdo dos 15 playbooks (dados-semente)
├── icons.py              # Ícones SVG usados nos templates Jinja
├── requirements.txt
├── templates/            # Páginas de login/setup/dashboard e exports Jinja
└── static/
    ├── app.js            # Lógica do dashboard (fetch à API, edição, checklists)
    └── style.css          # Sistema visual (tema claro/escuro)
```

## Aviso

Estes playbooks são um ponto de partida de referência interna — devem ser revistos e ajustados à realidade da organização (contactos, ferramentas efetivamente usadas, obrigações contratuais) e após cada exercício ou incidente real. Recomenda-se revisão formal a cada 6 meses.
