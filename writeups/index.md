---
title: "Writeups"
layout: default
permalink: /writeups/
---
<section class="container">
  <h1>Writeups técnicos</h1>
  <div class="grid">
    {% assign all = site.writeups | sort: 'date' | reverse %}
    {% for w in all %}
      {% include card.html item=w kind="writeup" %}
    {% endfor %}
  </div>
</section>
