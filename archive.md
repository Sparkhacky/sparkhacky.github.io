---
layout: default
title: Archivo
permalink: /archive/
---
# Archivo
{% for post in site.posts %}
- {{ post.date | date: "%Y-%m-%d" }} — [{{ post.title }}]({{ post.url }})
{% endfor %}
