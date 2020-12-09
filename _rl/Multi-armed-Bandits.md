---
title: "Chapter 2 Multi-armed Bandits"
collection: rl
permalink: /rl/multi-armed-bandits
tags:
  - Reinforcement Learning
  - Tabular Solution Method
date: "2020-12-01"
--- 

<!DOCTYPE html>
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
  <b>Action-Value method</b><br>
  k-armed: k options(actions)<br>
  <i>value: </i> \(q_*(a) \doteq \mathbb{E}[R_t\mid A_t = a]\), using \(Q_t(a) \approx q_*(a)\) estimation.<br>
  \[Q_s(a)\doteq \displaystyle \frac{\displaystyle\sum_{i=1}^{t-1} R_i \cdot\mathbf{1}_{A_i = a}}{\displaystyle\sum_{i=1}^{t-1}  \mathbf{1}_{A_i = a}}, \mathbf{1} := \left\{\begin{array}{c}
     & 1 \text{ if predicate is true} \\
     & 0 \text{ if predicate is false}
\end{array}\right.\]
<br>
when \(\displaystyle\sum_{i=1}^{t-1} \mathbf{1}_{A_i=a} \rightarrow \infty\), \(Q(a) \rightarrow q_*(a)\)
<br>
Greedy action: \(\displaystyle A_t \doteq \arg\max_a Q_t(a)\), \(\epsilon\)-greedy: prevent local optimum
<br>
The estimate of its action value after it has been selected \(n-1\) times:
\[
\begin{aligned}
Q_n \doteq \frac{\sum_{i=1}^{n-1} R_i}{n-1} &= \frac{1}{n-1}(R_{n-1}+\sum_{i=1}^{n-2} R_i)\\
  &= \frac{1}{n-1}(R_{n-1}+(n-2)\frac{1}{n-1}\sum_{i=1}^{n-2} R_i)\\
  &= \frac{1}{n-1}(R_{n-1}+(n-2)Q_{n-1}) \\
  &= \frac{1}{n-1}(R_{n-1}+(n-1)Q_{n-1}-Q_{n-1}) \\
  &= Q_{n-1}+\frac{1}{n-1}(R_{n-1}-Q_{n-1})
\end{aligned}
\] 
</p>
</body>
</html>