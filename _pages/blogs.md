---
layout: archive
title: "Blogs"
permalink: /blogs/
author_profile: true
redirect_from: 
  - /blogs
---

{% include base_path %}

## Reinforcement Learning Notes

> Reading notes, mathematical proofs, and Python implementations for ___Reinforcement Learning: An Introduction___ (and COMP 394 Reinforcement Learning at Macalester as TA).


  <ul>{% for post in site.rl %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>

> Related work done in the research mentored by [Luca Weihs](https://lucaweihs.github.io/) in [AI2](https://allenai.org/).

  <ul>{% for post in site.paper_notes %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
