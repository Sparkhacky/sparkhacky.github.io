---
title: "Proyectos"
layout: default
permalink: /projects/
---
<section class="container page-section">
  <header class="section-head">
    <h1>Projectos</h1>
    <p class="lede">Automatización de CTI, mapeo ATT&CK y visualizaciones para mejorar capacidades defensivas.</p>
  </header>

  
  <div class="grid">
    {% assign all = site.projects | sort: 'date' | reverse %}
    {% for p in all %}
      {% include card.html item=p kind="project" %}
    {% endfor %}
  </div>
</section>
