---
layout: default
title: Tags
permalink: /tags/
---
# Tags
{% assign tags = site.tags | sort %}
<ul>
{% for tag in tags %}
  <li><a href="#{{ tag[0] }}">#{{ tag[0] }}</a> ({{ tag[1].size }})</li>
{% endfor %}
</ul>

{% for tag in tags %}
### <a id="{{ tag[0] }}"></a>#{{ tag[0] }}
{% for post in tag[1] %}
- {{ post.date | date: "%Y-%m-%d" }} — [{{ post.title }}]({{ post.url }})
{% endfor %}
{% endfor %}
