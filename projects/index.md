---
title: "Proyectos"
layout: default
permalink: /projects/
---
<section class="container">
  <h1>Proyectos</h1>
  <div class="grid">
    {% assign all = site.projects | sort: 'date' | reverse %}
    {% for p in all %}
      {% include card.html item=p kind="project" %}
    {% endfor %}
  </div>
</section>
