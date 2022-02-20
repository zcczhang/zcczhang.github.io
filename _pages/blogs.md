---
layout: archive
title: "Posts"
permalink: /posts/
author_profile: true
redirect_from: 
  - /posts
---

{% include base_path %}

<p>May need to refresh for the math <img src="../images/latex.png" alt="LaTeX" height="42" width="42"/> mode.</p>

> Paper reading notes, and open-source contribution. 
  <ul>{% for post in site.papernotes %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>


> Reading notes, mathematical proofs, and Python implementations for ___Reinforcement Learning: An Introduction___ (and COMP 394 Reinforcement Learning at Macalester as TA).
  <ul>{% for post in site.rl %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>

