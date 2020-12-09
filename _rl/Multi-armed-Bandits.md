---
title: "Chapter 2 Multi-armed Bandits"
collection: rl
permalink: /rl/multi-armed-bandits
tags:
  - Reinforcement Learning
  - Tabular Solution Method
date: "2020-12-01"
--- 

<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>MathJax example</title>
  <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
  <script id="MathJax-script" async
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
  </script>
</head>
<body>
<p>
  Action-Value method<br>
  k-armed: k options(actions)<br>
  \(q_*(a) \doteq \mathbb{E}[R_t\mid A_t = a]\)
  
</p>
</body>
</html>


<!--Action-Value method

k-armed: k options(actions)

\(q_*(a) \doteq \mathbb{E}[R_t\mid A_t = a]\), using \(Q_t(a) \approx q_*(a)\) estimation.

\(Q_s(a)\doteq \displaystyle \frac{\displaystyle\sum_{i=1}^{t-1} R_i \cdot\mathbf{1}_{A_i = a}}{\displaystyle\sum_{i=1}^{t-1}  \mathbf{1}_{A_i = a}}\), \(\mathbf{1} := \begin{array}{c}
     & 1 \text{ if predicate is true} \\
     & 0 \text{ if predicate is false}
\end{array}\)

when \(\displaystyle\sum_{i=1}^{t-1} \mathbf{1}_{A_i=a} \rightarrow \infty\), \(Q(a) \rightarrow q_*(a)\)

Greedy action: \(\displaystyle A_t \doteq \argmax_a Q_t(a)\)-->