---
title: "Chapter 5 Monte Carlo Methods"
collection: rl
permalink: /rl/MC-methods
tags:
  - Reinforcement Learning
  - Tabular Solution Method
date: "2020-12-04"
tool: "/images/nothing.png"
--- 

> Author: Charles Zhang  <br>[*All Notes Catelog for* ***Reinforcement Learning: An Introduction***](https://zcczhang.github.io/blogs/). This post is created following [*BY-NC-ND 4.0*](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.en) agreement, please follow terms while sharing. 

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
<b>First-Visit Monte Carlo(MC) method</b>: estimate \(v_\pi(s)\) as the average of teh returns following the first visit to \(s\). An example of first-visit MC prediction algorithm is shown below:
</p>
</body>
</html> 

![](/images/mc1.png)

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
By Law of Large Numbers, as number of visits to \(s \rightarrow \infty \Rightarrow \text{ first MC method }\rightarrow v_\pi(s)\)
<br>
<i>Estimation of action values</i>:  as \(\pi\) is given, we could use exploration by "<i><b>exploring starts</b></i>": start in a state-action pair \(\Rightarrow P(\text{select as start})>0\), in order to guarantee all states are visited sufficient times for exploration.
<br>
Monte Carlo Control: using GPI, the algorithm is shown below:
</p>
</body>
</html> 

![](/images/mc2.png)

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
To be efficient and prevent calculating the average every time, we could let \(counts(S_t, A_t)\leftarrow counts(S_t, A_t)+1\) and \(\displaystyle Q(S_t, A_t)\leftarrow Q(S_t, A_t)+\frac{G-Q(S_t, A_t)}{counts(S_t, A_t)}\) by the update rule in the chapter 2.
<br><br>
Due to the limitation of the exploration start(e.g. when the agent needs to interact with the environment), <i>Monte Carlo control without exploring starts</i> is introduced next.
<i>on-policy</i>: evaluate and improve the \(\pi\) that is used;<br>
<i>off-policy</i>: evaluate and improve the \(\pi\) that used to;<br>
Then, MC is on-policy. Define "<i>soft</i>": \(\pi(a|s)>0, \forall s\in\mathcal{S}, a\in\mathcal{A}(s)\).<br>
<i>\(\epsilon\)-soft greedy:</i> 
\[\pi^{\prime}(a | s)=\left\{\begin{array}{ll}
\frac{\varepsilon}{|\mathcal{A}(s)|} & , \mathbb{P} = \epsilon
 \\
1-\varepsilon-\frac{\varepsilon}{|\mathcal{A}(s)|} & ,  \mathbb{P} =1- \epsilon
\end{array}\right.\]
Then the on-policy first-visit MC control for \(\epsilon\)-soft policies is shown below:
</p>
</body>
</html> 

![](/images/mc3.png)

to be continued...

<br><br>

***Reference***

[1] Sutton, Richard S., and Andrew G. Barto. Reinforcement learning: An introduction. MIT press, 2018.


<br><br><br><br><br>

<script src="https://utteranc.es/client.js"
        repo="zcczhang/zcczhang.github.io"
        issue-term="pathname"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>