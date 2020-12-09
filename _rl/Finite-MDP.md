---
title: "Chapter 3 Finite Markov Decision Processes"
collection: rl
permalink: /rl/Finite-MDP
tags:
  - Reinforcement Learning
  - Tabular Solution Method
date: "2020-12-02"
--- 
***Reinforcement Learning: An Introduction***

> Author: Charles Zhang
<br>This post is created following [*BY-NC-ND 4.0*](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.en) agreement, please follow terms while sharing.

![](/images/mdp.png)

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
  \(S_t \in \mathcal{S}, A_{t} \in \mathcal{A}(s), R_{t+1} = \mathcal{R}\subset \mathbb{R}\rightarrow S_{t+1}\)
<br>
squence or <b><i>trajectory</i></b>: \(S_0, A_0, S_1, A_1, R_2, S_2, A_2, R_3,...\)<br>
Dynamics of MDP: \(p: \mathcal{S}\times\mathcal{R}\times\mathcal{S}\times\mathcal{A}\):
\[
p(s', r|s, a) \doteq \text{Pr}\{S_t=s', R_t=r|S_{t+1}=s, A_{t+1}=a\}
\]
then \(\displaystyle \sum_{s'\in\mathcal{S}}\sum_{r\in\mathcal{R}}p(s', r|s, a) = 1, \forall s\in \mathcal{S}, a\in\mathcal{A}(s)\). And follows the Markov Property: \(S_t, R_t\) only dependent on \(S_{t-1}, A_{t-1}\).
<br>
<i>state-transition probabilities</i> \(p: \mathcal{S}\times\mathcal{S}\times\mathcal{A}\rightarrow [0,1]\)
\[
p(s'|s, a) \doteq \text{Pr}\{S_t=s'|S_{t+1}=s, A_{t+1}=a\} = \sum_{r\in\mathcal{R}}p(s', r|s, a)
\]
\(r: \mathcal{S}\times\mathcal{A}\rightarrow \mathbb{R}\):
\[
r(s,a)\doteq \mathbb{E}[R_t|S_{t-1}=s, A_{t-1}=a] = \sum_{r\in\mathcal{R}}r\sum_{s'\in\mathcal{S}}p(s', r|s, a)
\]
\(r: \mathcal{S}\times\mathcal{A}\times\mathcal{S}\rightarrow \mathbb{R}\):
\[
r(s,a, s')\doteq \mathbb{E}[R_t|S_{t-1}=s, A_{t-1}=a, S_t=s'] = \sum_{r\in\mathcal{R}}r\frac{p(s', r|s, a)}{p(s'|s, a)}
\]
<b>Agent Goal</b>: maximize the cumulative reward \(\Rightarrow\) maximize expected return:
\[
G_t \doteq \sum_{i=t+1}^{T} R_i, \text{ }\text{ }T\text{ is final time step}
\]
<i>Episodic tasks</i>: reset after the terminal state\(\mathcal{S}^+\): \(\mathcal{S}+\mathcal{S}^+\)<br>
<i>Continuing tasks</i>: \(T=\infty\)
<br>
Discounted rate \(\gamma\): 
\[\displaystyle G_t\doteq \sum_{k=0}^{\infty}\gamma^k R_{t+k+1}, \gamma\in(0,1)\]
and therefore:
\[\displaystyle G_t\doteq R_{t+1}+\gamma G_{t+1}\]
if reward is constant: \(G_t = \displaystyle \frac{r}{1-r}\)
<br>
Meaning: \(k\) time steps in the future is worth only \(\gamma^{k-1}\) times what it would be worth if it is received immediately.
<br>
\(\gamma\rightarrow 1\): takes future rewards into account more strongly. 
<br>
<b>Policy</b> \(\pi(a|s) = P(A_t=a|S_t=s)\)
<br>
<b>Value functions</b><br>
\(v_\pi(s)\): <i>state-value function for policy \(\pi\)</i> for MDP:
\[
v_\pi(s) \doteq \mathbb{E}[G_t|S_t=s] = \mathbb{E}_\pi \left[\sum_{k=1}^\infty \gamma^k R_{t+k+1}| S_t=s\right]
\]
\(q_\pi(s)\): <i>action-value function for policy \(\pi\)</i> for MDP:
\[
v_\pi(s) \doteq \mathbb{E}[G_t|S_t=s, A_t=a] = \mathbb{E}_\pi \left[\sum_{k=1}^\infty \gamma^k R_{t+k+1}| S_t=s,A_t=a\right]
\]
<b>Bellman Equation for \(v_\pi\)</b> (recursive relationship):
\[
v_\pi(s) = \sum_{a} \pi(a | s) \sum_{s^{\prime}, r} p\left(s^{\prime}, r | s, a\right)\left[r+\gamma v_{\pi}\left(s^{\prime}\right)\right],  \forall s\in \mathcal{S}
\]
<i>Proof:</i>
<br>
Consider: \(\displaystyle \mathbb{E}_\pi[R_{t+1}|S_t=s] = \sum_r p(r|s)r = \sum_{s'} \sum_{a} \sum_{r} p(s'a,r|s)r = \sum_{s'} \sum_{a} \sum_{r} \pi(a|s)p(s',r|s,a)r \), and: \(\displaystyle \mathbb{E}_\pi[v_\pi(S_{t+1})|S_t=s] = \sum_a\pi(a|s)\sum_{s'}\sum_rp(s',r|s,a) v_\pi(s')\), we have:
\[
\begin{aligned}
v_{\pi}(s) &=\mathbb{E}_{\pi}\left[G_{t} | S_{t}=s\right] \\
&=\mathbb{E}_{\pi}\left[R_{t+1}+\gamma G_{t+1} | S_{t}=s\right] \\
&=\mathbb{E}_{\pi}\left[R_{t+1}+\gamma \mathbb{E}_{\pi}\left[G_{t+1} | S_{t+1}\right] | S_{t}=s\right] \text{ }\text{ }\text{ }\text{ }\text{ }\text{ }\text{ }\text{(by Law of iterated expectation)}\\
&=\mathbb{E}_{\pi}\left[R_{t+1}+\gamma v_{\pi}\left(S_{t+1}\right) | S_{t}=s\right] \\
&=\sum_{a} \pi(a | s) \sum_{r} \sum_{s^{\prime}} p\left(s^{\prime}, r | s, a\right) r+\gamma \sum_{a} \pi(a | s) \sum_{s^{\prime}} \sum_{r} p\left(s^{\prime}, r | s, a\right) v_{\pi}\left(s^{\prime}\right) \\
&=\sum_{a} \pi(a | s) \sum_{s'} \sum_{r} p\left(s^{\prime}, r | s, a\right)\left[r+\gamma v_{\pi}\left(s^{\prime}\right)\right] \\
&= \sum_{a} \pi(a | s) \sum_{s^{\prime}, r} p\left(s^{\prime}, r | s, a\right)\left[r+\gamma v_{\pi}\left(s^{\prime}\right)\right],  \forall s\in \mathcal{S}
\end{aligned}
\]
Similarly, we have the bellman equation for \(q_\pi(s,a)\):
\[
q_{\pi}(s, a)\doteq \mathbb{E}_\pi[G_t|S_t=s, A_t=a]=\sum_{s^{\prime}, r} p\left(s^{\prime}, r \mid s, a\right)\left[r+\gamma v_{\pi}\left(s^{\prime}\right)\right]
\]
and therefore, 
\[
v_\pi(s)=\sum_a\pi(a|s)q_\pi(s,a)
\]
</p>
</body>
</html> 

The backup diagrams below provide the better understanding to the bellman equation.

![](/images/mdp2.png)

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
A fun fact about the reward for the value function:<br>
if \(r\rightarrow r+c, c\in\mathbb{R}\), then \(v_\pi(s)\rightarrow v_\pi(s)+\displaystyle \frac{v}{1-\gamma}, \gamma\in[0,1)\).
<br>
<i>Proof</i>:<br>
\(\displaystyle \begin{aligned}v_\pi^{\text{old}} (s) &= \mathbb{E}_\pi\left[ \sum_{k=0}^\infty \gamma^k R_{t+k+1} |S_t=s \right] \\
v_\pi^{\text{new}}(s) &= \mathbb{E}_\pi\left[ \sum_{k=0}^\infty \gamma^k \left(R_{t+k+1}+c\right) |S_t=s \right]\\
&= \mathbb{E}_\pi\left[ \sum_{k=0}^\infty \gamma^k R_{t+k+1} |S_t=s \right] + \sum_{k=0}^\infty \gamma^k \cdot c \\
&= v_\pi^{\text{old}}(s) + c\cdot\frac{1}{1-\gamma},\text{ } \text{ }\forall s\in\mathcal{S}, \gamma\in[0,1)
\end{aligned}\)
<br><br>
<b>Optimal policy and value functions:</b>
\[
v_*(s)\doteq \max_\pi v_\pi(s) = \max_a \sum_{s',r}p(s',r|s,a)[r+\gamma v_*(s')], \text{  } \forall s\in\mathcal{S} 
\]
\[
q_*(s,a)\doteq \max_\pi q_\pi(s,a) = \sum_{s',r}p(s', r|s,a)[r+\gamma \max_{a'} q_*(s',a')], \text{  } \forall s\in\mathcal{S}
\]
If there were finite \(n\) states, then there will be \(n\) equations for \(v_*(s)\) since dynamics \(p\) is known and MDP is finite. Then, the best policy could be found by "greedy". However, "optimal" requires extreme computatoinal and memory cost due to the enumerations, so we are looking for approximations.<br>
<b>Greedy Policy</b> \(\pi'(s) = \arg\max_x q_\pi(s,a)\)<br>
Efficiency: search directly: \(O(k^n)\) with n states k actions; dynamic programing: \(O(c^n, c^k)\), with constant c, which will be introduced in the next section. 
</p>
</body>
</html>
<br><br><br>

***Reference***

[1] Sutton, Richard S., and Andrew G. Barto. Reinforcement learning: An introduction. MIT press, 2018.




