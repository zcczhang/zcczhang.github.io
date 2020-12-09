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
<br><br>
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
or more general, \(Q_{n+1} = \displaystyle Q_{n}+\frac{1}{n}(R_{n}-Q_{n})\), \(n=1 \rightarrow Q_2=R_1\) for arbitrary.
<br>
General <b>[Update Rule]</b>: NewEstimate \(\leftarrow\) StepSize \(\cdot\) [Target - OldEstimate], stepsize: \(\alpha_t(a)\), Target - OldEstimate: "error" in estimate.
<br>
\[\begin{aligned}
Q_{n+1} &= \displaystyle Q_{n}+\alpha(R_{n}-Q_{n}) = \alpha R_n +(1-\alpha) Q_n \\
&= \alpha R_n +(1-\alpha)[\alpha R_{n-1} +(1-\alpha) Q_{n-1}] \\
&= \alpha R_n +(1-\alpha)\alpha R_{n-1} +(1-\alpha)^2\alpha R_{n-2} + ... +(1-\alpha)^n\alpha Q_1 \\
&= (1-\alpha)^n Q_1 + \sum_{i=1}^n \alpha(1-\alpha)^{n-i}R_i 
\end{aligned}\]

Note \((1-\alpha)^n+ \displaystyle\sum_{i=1}^n \alpha(1-\alpha)^{n-i} = 1, \alpha \in [0,1]\), \(Q_{n+1}\) therefore is called (exponetial recency-)weight average of past \(R \text{ and } Q_1\).<br><br>
<i>Proof</i>:<br><br>
\(n=1, 1-\alpha+\alpha = 1\);<br>
assume for \(n=k, (1-\alpha)^k+ \displaystyle\sum_{i=1}^k \alpha(1-\alpha)^{k-i} = 1\);<br>
then for \(n=k+1\), <br>
\(\begin{aligned} & (1-\alpha)^{k+1}+ \displaystyle\sum_{i=1}^{k+1} \alpha(1-\alpha)^{k+1-i} - [(1-\alpha)^k+ \displaystyle\sum_{i=1}^k \alpha(1-\alpha)^{k-i}] \\
&= (1-\alpha)^{k+1}- (1-\alpha)^{k} + \displaystyle\sum_{i=1}^k \alpha(1-\alpha)^{k-i} + \alpha(1-\alpha)^{k+1-1} - \displaystyle\sum_{i=1}^k \alpha(1-\alpha)^{k-i}\\
&= (1-\alpha)^k(1-\alpha-1)+\alpha(1-\alpha)^k \\
&= -\alpha(1-\alpha)^k+\alpha(1-\alpha)^k \\
&= 0
\end{aligned} 
\)<br>
\(\therefore  (1-\alpha)^{k+1}+ \displaystyle\sum_{i=1}^{k+1} \alpha(1-\alpha)^{k+1-i} = 1, \forall k \in \mathbb{N}\)<br>
\(\therefore \forall n\in\mathbb{N}, \text{ }\alpha \in [0,1], \text{ } (1-\alpha)^n+ \displaystyle\sum_{i=1}^n \alpha(1-\alpha)^{n-i} = 1\)
<br><br>
Consider \(\{\alpha_n\}\) by stochastic approximation theory: P(coverage) = 1:
\[
\sum_{n=1}^\infty \alpha_n(a) = \infty \text{ }\text{ }\text{ }\text{ and } \text{ }\text{ }\text{ } \sum_{n=1}^\infty \alpha_n(a) < \infty 
\]
This means (i)steps are large enough to overcome initial condition or random fluctuations (ii) steps become small enough to coverage.



<br><br><br><br><br><br><br><br><br>



</p>
</body>
</html>