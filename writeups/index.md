---
layout: default
title: "Writeups"
permalink: /writeups/
no_page_title: true
---

<section class="container page-section page-writeups">
  <header class="section-head">
    <h1>Technical Writeups</h1>
    <p class="lede">Documentación detallada de análisis, explotación y mapeo MITRE ATT&amp;CK con enfoque didáctico.</p>
  </header>

  <div class="cards-xl">
    {% assign items = site.writeups | sort: 'date' | reverse %}
    {% for w in items %}
      {% include card.html item=w kind="writeup" %}
    {% endfor %}
  </div>
</section>
