---
title: "Phishing dirigido a sector financiero (ES) — Sept 2025"
date: 2025-09-09
tags: [phishing, sector-financiero, es]
tlp: green
confidence: alta
mitre: [TA0001, T1566.001]
excerpt: "Resumen táctico de campaña con IoCs y recomendaciones para SOC."
---

**Contexto.** Campaña activa con señuelos de facturación y portales falsos de banca en línea.

**Hallazgos clave.**
- Enlaces acortados → redirecciones múltiples → kit de phishing alojado en alojamiento comprometido.
- SSL válido y *lookalike domains* con homógrafos.
- Telemetría: picos de tráfico desde ASN X en horario laboral (ES).

**Implicaciones.** Riesgo de robo de credenciales y sesión MFA si hay *session riding*.

**Recomendaciones.**
- Bloqueo de dominios/URLs y huellas de kit conocidos.
- Reglas de detección: cadenas en *landing*, patrón de *referrer*, ASN origen.
- Campaña de concienciación breve para tesorería/atención al cliente.

**IoCs.**
- Domains: `example-login[.]es`, `secure-banca[.]com`
- URLs: `hxxps://short.ly/a1b2 → .../signin`
