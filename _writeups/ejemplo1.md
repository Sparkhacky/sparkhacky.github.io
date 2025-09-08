---
title: "TA505: patrón reciente en ES (Jul 2025)"
date: 2025-07-21
tags: [ta505, att&ck, loader]
tlp: amber
confidence: media
mitre: [TA0001, T1059, T1105]
lessons:
  - Priorizar controles de descarga y ejecución Living-off-the-Land
  - Detección basada en TTPs por sobre IoCs efímeros
excerpt: "Resumen táctico y mapeo ATT&CK con evidencias públicas."
---

## Resumen ejecutivo
Actividad compatible con TA505 con señuelos financieros y loaders de primera etapa.

## Evidencias
- VT/any.run: campañas similares con infra temporal.
- IoCs (hashes, dominios) rotando cada 48–72h.

## TTPs ATT&CK
- **T1059** (Command and Scripting Interpreter)  
- **T1105** (Exfiltration Over C2 Channel)

## Detección/Mitigación
- Reglas Sigma/YARA sobre artefactos habituales.
- Controles de *egress* por categorías y reputación.

## Lecciones
- {{ page.lessons | join: "; " }}
