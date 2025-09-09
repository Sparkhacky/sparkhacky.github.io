---
title: "Android: dos 0-days bajo explotación dirigida"
layout: post
tags: [CTI, Android, Vulnerabilidades, Briefing]
date: 2025-09-03
---

**TLP: WHITE** · **Confianza: Alta**  

### Contexto
Google ha publicado el Android Security Bulletin de septiembre de 2025 e indica “explotación limitada y dirigida” de dos vulnerabilidades (CVE-2025-38352 y CVE-2025-48543). Los niveles de parche 2025-09-01/2025-09-05 corrigen todas las fallas divulgadas.

### Hallazgos principales
- **Tipo de amenaza:** Explotación de vulnerabilidades (0-day).
- **Componentes afectados:** Android Runtime (ART) y otros; una vulnerabilidad crítica en System puede permitir RCE proximal/adyacente sin interacción del usuario.
- **Estado de explotación:** Google y un CERT gubernamental confirman explotación limitada/dirigida de CVE-2025-38352 y CVE-2025-48543.
- **Cobertura de parches:** 2025-09-05 (o superior) aborda todas las vulnerabilidades del boletín; fabricantes irán desplegando OTA.

**MITRE ATT&CK (Mobile):** TA0029, T1404
- TA0029 – Privilege Escalation
- T1404 – Exploitation for Privilege Escalation (Mobile)
### Nivel de riesgo
🔴 **Alto**

### Recomendaciones
- Parchar a 2025-09-05 (o más reciente) en cuanto el fabricante lo ofrezca. Validar cumplimiento en MDM/UEM.
- Restringir “sideloading” y reforzar políticas de Google Play Protect en flotas corporativas.
- Supervisión: alertar sobre apps recién instaladas con permisos excesivos y eventos de escalada de privilegios en dispositivos gestionados.
- Segmentación y acceso: limitar acceso a datos sensibles desde móviles no actualizados (condicional access).
- Comunicación al usuario: aviso interno de actualización y buenas prácticas móviles.

### Fuentes
- Android Security Bulletin: https://source.android.com/docs/security/bulletin/2025-09-01?hl=es-419
- INCIBE-CERT: https://www.incibe.es/incibe-cert/alerta-temprana/avisos/boletin-de-seguridad-de-android-septiembre-de-2025
