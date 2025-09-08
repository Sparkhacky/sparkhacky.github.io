---
layout: default
title: Writeups
permalink: /writeups/
---
# Writeups
<div class="grid grid-3">
{% assign ws = site.writeups | sort: 'date' | reverse %}
{% for w in ws %}
  {% include card.html item=w %}
{% endfor %}
</div>
