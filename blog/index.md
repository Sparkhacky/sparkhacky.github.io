---
title: "Briefings"
layout: default
permalink: /blog/
---
<section class="container">
  <h1>Briefings</h1>
  <div class="grid">
    {% assign posts_sorted = site.posts | sort: 'date' | reverse %}
    {% for post in posts_sorted %}
      {% include card.html item=post kind="post" %}
    {% endfor %}
  </div>
</section>
