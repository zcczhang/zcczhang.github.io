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
Idea: \(\displaystyle \lim_{k\rightarrow\infty} v_k = v_\pi\). From the Bellman equation for value function \(v(s)\) in last chapter,  there are \(n\) linear equations with \(n\) states, \(v_{k+1} = \boldsymbol{C}\cdot v_k + \boldsymbol{b}\) where \(\boldsymbol{C}\text{ is } n\times n \) matrix of coefficients of \(v_k\) and \( \boldsymbol{b} \text{ is a } n \text{ vector for constants in Bellman equation}\). Therefore, it could be solved using Jacobi iterate method or other numerical techiniques. And this iteration would coverage if and only if \(\displaystyle\lim_{k\rightarrow\infty} C^k = \text{zero matrix }\boldsymbol{O}\). To prove, let<br>
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
</html> <br><br><br>

![](/images/dp1.png)

### Policy Improvement



### Policy Iteration



### Value Iteration




<br>
<br>

***Reference***

[1] Sutton, Richard S., and Andrew G. Barto. Reinforcement learning: An introduction. MIT press, 2018.