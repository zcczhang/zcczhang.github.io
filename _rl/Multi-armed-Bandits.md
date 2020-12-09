---
title: "Chapter 2 Multi-armed Bandits"
collection: rl
permalink: /rl/multi-armed-bandits
tags:
  - Reinforcement Learning
  - Tabular Solution Method
date: "2020-12-01"
--- 
<b>Action-Value method</b>

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
  k-armed: k options(actions)<br>
  <i>value: </i> \(q_*(a) \doteq \mathbb{E}[R_t\mid A_t = a]\), using \(Q_t(a) \approx q_*(a)\) estimation.<br>
  \[Q_s(a)\doteq \displaystyle \frac{\displaystyle\sum_{i=1}^{t-1} R_i \cdot\mathbb{1}_{A_i = a}}{\displaystyle\sum_{i=1}^{t-1}  \mathbb{1}_{A_i = a}}, \mathbb{1} := \left\{\begin{array}{c}
     & 1 \text{ if predicate is true} \\
     & 0 \text{ if predicate is false}
\end{array}\right.\]
<br>
when \(\displaystyle\sum_{i=1}^{t-1} \mathbb{1}_{A_i=a} \rightarrow \infty\), \(Q(a) \rightarrow q_*(a)\)
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
<i>Proof</i>:<br>
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
<br><br>
As \(Q_{n+1}\) more or less dependent on \(Q_1(a) \Rightarrow\) biased by initial estimate.<br>
Then, for genral stationary case, we encourage exploration optimistic initial value(\(Q_1>0, \epsilon=0\) compared with greedy's).
<br><br>

<b>Upper Confidence Bound</b>(UCB) Action selection:   
\[ A_t \doteq \arg\max_a\left[Q_t(a)+c\cdot\sqrt{\frac{\ln t}{N_t(a)}}\right]\]
where \(N_t(a)\): number of times "\(a\)" has been selected before "\(t\)";<br>
c>0 controls the degree of exploration;<br>
\(\displaystyle \sqrt{\frac{\ln t}{N_t(a)}}\): uncertainty, or variance(many "action "\(\rightarrow\)bad\(\rightarrow\)less this "action")
<br><br>

<b>Gradient Bandit Algorithms</b><br>
soft-max distribution(i.e. Gibbs or Boltzmann distribution)<br>
\[\text{Pr}\{A_t=a\} \doteq \displaystyle \frac{e^{H_t(a)}}{\sum_{b=1}^k e^{H_t(b)}} \doteq \pi_t(a)\]
\(H_t(a)\in\mathbb{R}\): preference for each action, initially \(H_1(a)=0\)
Natural Learning algorithmm for soft-max action preferences based on the idea of the stochastic gradient ascent(↑). For update: 
\[
H_{t+1}(A_t) \doteq H_t(A_t) + \alpha(R_t-\overline{R_t})(\mathbb{1}_{a=A_t}-\pi_t(A_t))
\]
\[
H_{t+1}(a) \doteq H_t(a) + \alpha(R_t-\overline{R_t})\pi_t(a)
\]
where \(\alpha>0, \overline{R_t} = avr\{R_1...R_{t-1}\}\)<br>
\(\overline{R_t}\Rightarrow\) baseline, \(R_t>\overline{R_t}, P(A_t)\) in the future increases, vice versa.
<br>
Conclusion: it is a stochastic approximation to gradient ascent:
\[
H_{t+1}(a)\doteq H_t(a)+\alpha\frac{\partial \mathbb{E}[R_t]}{\partial H_t(a)},\text{ }\text{ }\text{ }\text{ }  \mathbb[E][R_t] = \sum_x\pi_t(x)q_*(x)
\]
update = gradient of \(\mathbb{E}[R_t]\Rightarrow\) stochastic gradient ascent \(\Rightarrow\) robust convergence.
<br>
<i>Proof:</i>
<br>
\(\begin{aligned} \frac{\partial \mathbb{E}\left[R_{t}\right]}{\partial H_{t}(a)} &=\frac{\partial}{\partial H_{t}(a)}\left[\sum_{b} \pi_{t}(b) q_{*}(b)\right] \\ &=\sum_{b} q_{*}(b) \frac{\partial \pi_{t}(b)}{\partial H_{t}(a)} \end{aligned}\)
<br>
Let \(\forall X_t\) and \(b\) are independent, then \(\displaystyle \sum_b\frac{\partial\pi_t(b)}{\partial H_t(b)} = 0\), so we have
<br>
\(\begin{aligned}\frac{\partial \mathbb{E}\left[R_{t}\right]}{\partial H_{t}(a)} &
=\sum_{b}\left(q_{*}(b)-X_{t}\right) \frac{\partial \pi_{t}(b)}{\partial H_{t}(a)} \\
&=\sum_{b} \pi_{t}(b)\left(q_{*}(b)-X_{t}\right) \frac{\partial \pi_{t}(b)}{\partial H_{t}(a)} / \pi_{t}(b) \\
&=\mathbb{E}\left[\left(q_{*}\left(A_{t}\right)-X_{t}\right) \frac{\partial \pi_{t}\left(A_{t}\right)}{\partial H_{t}(a)} / \pi_{t}\left(A_{t}\right)\right]
\end{aligned}\)
<br><br>
given \(A_t, \mathbb{E}[R_t|A_t] = q_*(A_t) = R_t\), and let arbitary \(X_t\) be \(\overline{R_t}\) then:
<br><br>
\(\displaystyle
\frac{\partial \mathbb{E}\left[R_{t}\right]}{\partial H_{t}(a)} = \mathbb{E}\left[\left(R_t)-\overline{R_t}\right) \frac{\partial \pi_{t}\left(A_{t}\right)}{\partial H_{t}(a)} / \pi_{t}\left(A_{t}\right)\right]
\)
<br><br>
Next,
<br><br>
\(\begin{aligned}
\frac{\partial \pi_{t}(b)}{\partial H_{t}(a)} &=\frac{\partial}{\partial H_{t}(a)} \pi_{t}(b) \\
&=\frac{\partial}{\partial H_{t}(a)}\left[\frac{e^{H_{t}(b)}}{\sum_{c=1}^{k} e^{H_{t}(c)}}\right] \\
&=\frac{\frac{\partial e^{H_{t}(b)}}{\partial H_{t}(a)} \sum_{c=1}^{k} e^{H_{t}(c)}-e^{H_{t}(b)} \frac{\partial \sum_{c=1}^{k} e^{H_{t}(c)}}{\partial H_{t}(a)}}{\left(\sum_{c=1}^{k} e^{H_{t}(c)}\right)^{2}} \\
&=\frac{\mathbb{1}_{a=b} e^{H_{t}(a)} \sum_{c=1}^{k} e_{t}^{H}(c)-e^{H_{t}(b)} e^{H_{t}(a)}}{\left(\sum_{c=1}^{k} e^{H_{t}(c)}\right)^{2}} \\
&=\frac{{\mathbb{1}}_{a=b}{ }^{k} e^{H_{t}(b)}}{\sum_{c=1}^{k} e^{H_{t}(c)}}-\frac{e^{H_{t}(b)} e^{H_{t}(a)}}{\left(\sum_{c=1}^{k} e^{H_{t}(c)}\right)^{2}} \\
&={\mathbb{1}}_{a=b} \pi_{t}(b)-\pi_{t}(b){\pi}_{t}(a) \\
&=\pi_{t}(b)\left({\mathbb{1}}_{a=b}-\pi_{t}(a)\right)
\end{aligned}\)
<br><br>
Therefore,
<br><br>
\(
\begin{aligned}
\frac{\partial \mathbb{E}\left[R_{t}\right]}{\partial H_{t}(a)} &=\mathbb{E}\left[\left(R_{t}-\bar{R}_{t}\right) \frac{\partial \pi_{t}\left(A_{t}\right)}{\partial H_{t}(a)} / \pi_{t}\left(A_{t}\right)\right] \\
&=\mathbb{E}\left[\left(R_{t}-\bar{R}_{t}\right) \pi_{t}\left(A_{t}\right)\left(\mathbf{1}_{a=A_{t}}-\pi_{t}(a)\right) / \pi_{t}\left(A_{t}\right)\right] \\
&=\mathbb{E}\left[\left(R_{t}-\bar{R}_{t}\right)\left(\mathbf{1}_{a=A_{t}}-\pi_{t}(a)\right)\right]
\end{aligned}
\)
<br>
which is corresponding with the equation for the gradient ascent. 
</p>
</body>
</html> 