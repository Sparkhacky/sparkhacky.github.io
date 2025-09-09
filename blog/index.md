---
title: "Briefings"
layout: default
permalink: /blog/
---
<section class="container page-section">
  <header class="section-head">
    <h1>Briefings</h1>
    <p class="lede">Análisis diarios de amenazas emergentes, tendencias y recomendaciones para equipos SOC.</p>
  </header>
  
  <div class="grid">
    {% assign posts_sorted = site.posts | sort: 'date' | reverse %}
    {% for post in posts_sorted %}
      {% include card.html item=post kind="post" %}
    {% endfor %}
  </div>
</section>
