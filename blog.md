---
layout: default
title: Blog
permalink: /blog/
---
# Blog
<div class="grid grid-3">
{% for post in site.posts %}
  {% include card.html item=post %}
{% endfor %}
</div>
