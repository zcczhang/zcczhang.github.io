---
title: "Chapter 4 Dynamics Programming"
collection: rl
permalink: /rl/DP
tags:
  - Reinforcement Learning
  - Tabular Solution Method
  - My Note
date: "2020-12-03"
--- 

***Reinforcement Learning: An Introduction***

### Policy Evaluation

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
Idea: \(\displaystyle \lim_{k\rightarrow\infty} v_k = v_\pi\). From the Bellman equation for value function \(v(s)\) in last chapter,  there are \(n\) linear equations with \(n\) states, \(v_{k+1} = \boldsymbol{C}\cdot v_k + \boldsymbol{b}\) where \(\boldsymbol{C}\text{ is } n\times n \) matrix of coefficients of \(v_k\) and \( \boldsymbol{b} \text{ is a } n \text{ vector for constants in Bellman equation}\). Therefore, it could be solved using Jacobi, or Gauss-Seidel iterate method, or other numerical techiniques. And this iteration would coverage if and only if \(\displaystyle\lim_{k\rightarrow\infty} C^k = \text{zero matrix }\boldsymbol{O}\). To prove, let<br>
\(
\boldsymbol{C}=\left[\begin{array}{cccc}
c_{11} & c_{12} & \cdots & c_{1 n} \\
c_{21} & c_{22} & \cdots & c_{2 n} \\
\vdots & \vdots & \ddots & \vdots \\
c_{n 1} & c_{n 2} & \cdots & c_{n n}
\end{array}\right], \text{ and } \boldsymbol{b}=\left[\begin{array}{c}
b_{1} \\
b_{2} \\
\vdots \\
b_{n}
\end{array}\right]
\)<br>
where from the bellman equation, <br> 
\(
\begin{aligned}
c_{i j} &=\sum_{a} \pi\left(a | s_{i}\right) \sum_{r} p\left(s_{j}, r | s_{i}, a\right) \gamma \\
& \leq \sum_{a} \pi\left(a | s_{i}\right) \sum_{s_{j}, r} p\left(s_{j}, r | s_{i}, a\right) \gamma\\
&= \gamma\\
b_{i} &=\sum_{a} \pi\left(a | s_{i}\right) \sum_{r} p\left(r | s_{i}, a\right) r
\end{aligned}
\)
<br>
Therefore, when \(\gamma \in [0,1)\),<br>
\(\lim _{k \rightarrow \infty} \boldsymbol{C}^{k} \leq \lim _{k \rightarrow \infty}\left[\begin{array}{cccc}
\gamma & \gamma & \cdots & \gamma \\
\gamma & \gamma & \cdots & \gamma \\
\vdots & \vdots & \ddots & \vdots \\
\gamma & \gamma & \cdots & \gamma
\end{array}\right]^{k}=\boldsymbol{O}\)<br>
The DP algorith:
</p>
</body>
</html> 
![](/images/dp1.png)

### Policy Improvement

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
Idea: using greedy \(\pi'(s), \pi(s)\in\mathcal{A}\), \(q_\pi (s,\pi'(s)) \geq v_\pi(s) \Rightarrow v_{\pi'}(s)\geq v_\pi(s)\)<br>
<i>Proof:</i><br>
\(\begin{aligned}
q_{\pi}(s, a) & \doteq \mathbb{E}_{\pi}\left[G_{t} \mid S_{t}=s, A_{t}=a\right]=\mathbb{E}_{\pi}\left[R_{t+1}+\gamma v_{\pi}(s) \mid s, a\right] \\
v_{\pi}(s) & \leq q_{\pi}\left(s, \pi^{\prime}(s)\right) \\
&=\mathbb{E}_{\pi}\left[R_{t+1}+\gamma v_{\pi}\left(S_{t+1}\right) \mid S_{t}=s, A_{t}=\pi^{\prime}(s)\right] \\
&=\mathbb{E}_{\pi^{\prime}}\left[R_{t+1}+\gamma v_{\pi}\left(S_{t+1}\right) \mid S_{t}=s\right] \\
& \leq \mathbb{E}_{\pi^{\prime}}\left[R_{t+1}+\gamma q_{\pi}\left(S_{t+1}, \pi^{\prime}\left(S_{t+1}\right)\right) \mid S_{t}=s\right] \\
&=\mathbb{E}_{\pi^{\prime}}\left[R_{t+1}+\gamma \mathbb{E}_{\pi^{\prime}}\left[R_{t+2}+\gamma v_{\pi}\left(S_{t+2}\right)\right] \mid S_{t}=s\right] \\
&=\mathbb{E}_{\pi^{\prime}}\left[R_{t+1}+\gamma R_{t+2}+\gamma^{2} v_{\pi}\left(S_{t+2}\right) \mid S_{t}=s\right] \\
& \leq \mathbb{E}_{\pi^{\prime}}\left[R_{t+1}+\gamma R_{t+2}+\gamma^{2} R_{t+3}+\gamma^{3} v_{\pi}\left(S_{t+3}\right) \mid S_{t}=s\right] \\
\vdots & \\
& \leq \mathbb{E}_{\pi^{\prime}}\left[R_{t+1}+\gamma R_{t+2}+\gamma^{2} R_{t+3}+\gamma^{3} R_{t+4}+\cdots \mid S_{t}=s\right] \\
&=\mathbb{E}_{\pi^{\prime}}\left[G_{t} \mid S_{t}=s\right] \\
&=v_{\pi^{\prime}}(s)
\end{aligned}\)
<br>
And the equation for updating new greedy policy \(\pi'\):
\[
\begin{aligned}
\pi^{\prime}(s) & \doteq \underset{a}{\arg \max } q_{\pi}(s, a) \\
&=\underset{a}{\arg \max } \mathbb{E}\left[R_{t+1}+\gamma v_{\pi}\left(S_{t+1}\right) \mid S_{t}=s, A_{t}=a\right] \\
&=\underset{a}{\arg \max } \sum_{s^{\prime}, r} p\left(s^{\prime}, r \mid s, a\right)\left[r+\gamma v_{\pi}\left(s^{\prime}\right)\right]
\end{aligned}
\]
</p>
</body>
</html> 

### Policy Iteration

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
Idea: \(\pi_0 \xrightarrow{E} v_{\pi_0} \xrightarrow{I} \pi_1 \xrightarrow{E} v_{\pi_1} \xrightarrow{I} \pi_2 \xrightarrow{E} ... \xrightarrow{I} \pi_* \xrightarrow{E} v_*  \), where \(\xrightarrow{E}\) is policy evaluation and \(\xrightarrow{I}\) is policy improvement.<br>
The DP algorithm below illustrates this iteration directly:
</p>
</body>
</html> 

![](/images/dp2.png)

### Value Iteration

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
Idea: update operation that combines the policy improvement and truncated policy evaluation steps:<br>
\(\begin{aligned}
v_{k+1}(s) & \doteq \max _{a} \mathbb{E}\left[R_{t+1}+\gamma v_{k}\left(S_{t+1}\right) \mid S_{t}=s, A_{t}=a\right] \\
&=\max _{a} \sum_{s^{\prime}, r} p\left(s^{\prime}, r \mid s, a\right)\left[r+\gamma v_{k}\left(s^{\prime}\right)\right], \text{ }\forall s\in\mathcal{S}
\end{aligned}\)<br>
As for arbitrary \(v_0\), \(\{v_k\}\) is shown to be guaranteed to converge to \(v_*\) by the bellman equation illustrated last chapter. The DP algorithm below follows this update: 
</p>
</body>
</html> 

![](/images/dp3.png)

### Generalized Policy Iteration (GPI)

Important model in reinforcement learnig. e.g. policy-evaluation and policy-improvement processes. 

The process and convergence is clearly illustrated in the figure below:

![](/images/dp4.png)

<br>
<br>

***Reference***

[1] Sutton, Richard S., and Andrew G. Barto. Reinforcement learning: An introduction. MIT press, 2018.