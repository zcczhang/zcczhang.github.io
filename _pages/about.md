---
permalink: /
title: "Hi, this is Charles!"
excerpt: "About me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---
### Hi, this is Charles! I am just an ***Art*** and ***Sports*** aficionado who knows a little bit about Mathematics and Computer Science!

<br>

<details>
<summary>Okay, for more...</summary>
<br>
I am a highly passionate second-year Mathematics and Computer Science student at Macalester College with a solid background in both pure mathematics and applied mathematics(involved with computer and data science). I love competing in mathematical competitions to unveil the elegant beauty of the mathematics. With proficient skills in <i>R, Java, Python, MATLAB, SQL, HTML, CSS</i>, I love using mathematical thinking to solve practical problems as well.
<br>
I love to see the aurora driving four hours away from my school, and I am indulged in Chinese calligraphy, playing basketball, golf, ping-pong, soccer, going fishing, e.t.c. in my spare time. 

 </details>
 
 
 
 
 <script src="./js/jquery.min.js" type="text/javascript"></script>
 
   <script type="text/javascript">
    $(document).ready(function(){
        var range = 50;             //距下边界长度/单位px
        var elemt = 30;           //插入元素高度/单位px
        var maxnum = 30;            //设置加载最多次数
        var num = 1;
        var totalheight = 0; 
        var main = $("#content");                     //主体元素
        $(window).scroll(function(){
            var srollPos = $(window).scrollTop();    //滚动条距顶部距离(页面超出窗口的高度);
			
            totalheight = parseFloat($(window).height()) + parseFloat(srollPos);
    		if(($(document).height()-range) <= totalheight  && num != maxnum) {
                main.append("<div style='border:1px solid tomato;margin-top:20px;height:"+elemt+
							"' >这是下拉后的内容---"+num+"</div>");
                num++;
            }
        });
    });
    </script>
</head>
<body>
    <div id="content" style="height:960px">
		<div style='border:1px solid tomato;margin-top:20px;height:30' >下拉加载更多内容</div>
		
    </div>
</body> 
 
<br><br><br><br>
<br><br><br><br><br><br><br><br><br><br>

<script type="text/javascript" id="clustrmaps" src="//cdn.clustrmaps.com/map_v2.js?cl=5ee2ff&w=400&t=tt&d=5De8UX9TDFsVQrQw4cE3CBhNblYyl2vQbk42qsTB9Fw&co=ffffff&cmo=d99cff&cmn=ffa3b9&ct=808080"></script>