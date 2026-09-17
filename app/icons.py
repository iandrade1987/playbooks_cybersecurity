# -*- coding: utf-8 -*-
"""Ícones SVG inline partilhados pelos templates Jinja (exports estáticos)."""

ICONS = {
    "shield": '<path d="M12 3l7 3v5c0 5-3.2 8.5-7 10-3.8-1.5-7-5-7-10V6l7-3z"/>',
    "bug": '<circle cx="12" cy="13" r="5"/><line x1="9" y1="9" x2="7" y2="6"/><line x1="15" y1="9" x2="17" y2="6"/><line x1="7" y1="13" x2="3" y2="13"/><line x1="17" y1="13" x2="21" y2="13"/><line x1="8" y1="18" x2="5" y2="21"/><line x1="16" y1="18" x2="19" y2="21"/><line x1="12" y1="8" x2="12" y2="18"/>',
    "cpu": '<rect x="6" y="6" width="12" height="12" rx="1.5"/><rect x="9.5" y="9.5" width="5" height="5"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>',
    "mail": '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    "briefcase": '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="3" y1="13" x2="21" y2="13"/>',
    "key": '<circle cx="8" cy="16" r="3.5"/><path d="M11 13l9-9"/><path d="M16 8l2 2"/><path d="M18 6l2 2"/>',
    "repeat": '<path d="M4 4v5h5"/><path d="M20 20v-5h-5"/><path d="M5 15a8 8 0 0 0 14-4"/><path d="M19 9A8 8 0 0 0 5 13"/>',
    "waves": '<path d="M2 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M2 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M2 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>',
    "network": '<circle cx="6" cy="6" r="2.2"/><circle cx="18" cy="6" r="2.2"/><circle cx="12" cy="18" r="2.2"/><line x1="7.7" y1="7.3" x2="10.5" y2="16.3"/><line x1="16.3" y1="7.3" x2="13.5" y2="16.3"/><line x1="8.2" y1="6" x2="15.8" y2="6"/>',
    "database": '<ellipse cx="12" cy="5.5" rx="7" ry="2.8"/><path d="M5 5.5v13c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-13"/><path d="M5 12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8"/>',
    "code": '<polyline points="9 8 4 12 9 16"/><polyline points="15 8 20 12 15 16"/>',
    "cloud": '<path d="M7 18a4 4 0 0 1 0-8 5.5 5.5 0 0 1 10.7-1.6A4 4 0 1 1 18 18H7z"/>',
    "terminal": '<rect x="3" y="4" width="18" height="16" rx="2"/><polyline points="7 9 10 12 7 15"/><line x1="12" y1="15" x2="17" y2="15"/>',
    "user-x": '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 20c0-3.5 2.5-6 5.5-6s5.5 2.5 5.5 6"/><line x1="16" y1="9" x2="21" y2="14"/><line x1="21" y1="9" x2="16" y2="14"/>',
    "smartphone-off": '<rect x="6" y="2" width="12" height="20" rx="2"/><line x1="3" y1="3" x2="21" y2="21"/><line x1="11" y1="18" x2="13" y2="18"/>',
    "eye": '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
    "lock": '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    "trash": '<polyline points="4 7 20 7"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>',
    "refresh-cw": '<path d="M20 11A8 8 0 0 0 6.3 6.3L4 8.6"/><polyline points="4 4 4 8.6 8.6 8.6"/><path d="M4 13a8 8 0 0 0 13.7 4.7L20 15.4"/><polyline points="20 20 20 15.4 15.4 15.4"/>',
    "megaphone": '<path d="M3 11v2a2 2 0 0 0 2 2h1l3 4v-12l-3 4H5a2 2 0 0 0-2 2z"/><path d="M9 8l8-3v14l-8-3"/><path d="M18 10a3 3 0 0 1 0 4"/>',
    "clipboard-check": '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6a1 1 0 0 1 1 1v1H8V5a1 1 0 0 1 1-1z"/><polyline points="8.5 13 11 15.5 15.5 10"/>',
    "users": '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M15.5 6.5a3 3 0 0 1 0 5.7"/><path d="M17.5 20c0-2.5-1.2-4.6-3-5.7"/>',
    "radar": '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none"/><path d="M12 12l7-4"/>',
    "search": '<circle cx="10.5" cy="10.5" r="6.5"/><line x1="15.5" y1="15.5" x2="21" y2="21"/>',
    "chevrons-expand": '<polyline points="7 4 12 9 17 4"/><polyline points="7 20 12 15 17 20"/>',
    "download": '<path d="M12 3v12"/><polyline points="7 10 12 15 17 10"/><path d="M5 19h14"/>',
    "clock": '<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/>',
    "home": '<path d="M4 11l8-7 8 7"/><path d="M6 9.5V20a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9.5"/><path d="M10 21v-6h4v6"/>',
    "edit": '<path d="M4 20h4l10.5-10.5a2.121 2.121 0 0 0-3-3L5 17v3z"/><path d="M13.5 6.5l4 4"/>',
    "check": '<polyline points="4 12 9.5 17.5 20 6"/>',
    "wrench": '<path d="M14.7 6.3a4 4 0 0 1-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 1 5.4-5.4l-2.3 2.3-2-2 2.3-2.3z"/>',
    "logout": '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
}


def svg_icon(name, cls=""):
    body = ICONS.get(name, "")
    cls_attr = f"icon {cls}".strip()
    return (
        f'<svg class="{cls_attr}" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
        f'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{body}</svg>'
    )


def icon_chip(name, color, size="md"):
    return f'<span class="icon-chip {size}" style="--chip-color:{color}">{svg_icon(name)}</span>'
