---
title: "Writeup — TryHackMe: Blue"
platform: "TryHackMe"
difficulty: "Fácil"
tags: [smb, eternalblue, privesc]
date: 2025-09-08
---
## 📌 Información General
- Plataforma: TryHackMe
- Máquina: Blue
- Dificultad: Fácil

## 🧭 Objetivo
Obtener user.txt y root.txt explotando MS17-010.

## 🔎 Enumeración
- `nmap -sC -sV -p- <IP>` → SMB abierto en 445…

## ⚔️ Explotación
- Uso de `nmap --script smb-vuln-ms17-010` → vulnerable…
- PoC empleada y por qué funciona…

## 📈 Escalada
- Validación de privilegios, post-explotación…

## 🏁 Flags
- `THM{...}`

## 🔍 Lecciones aprendidas
- …
