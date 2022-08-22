---
title: "Configure Dual-Boot Linux (Manjaro) to the Laptop (Blade 15 2022) for Everything"
collection: notes
permalink: /notes/Install-and-Configure-Linux-Laptop
tags:
  - Linux
  - Manjaro
date: "2022-05-27"
tool: "/images/nothing.png"
--- 
It is crazy to configure Linux to a latest released laptop, especially for a newbie to the hardware and system (like me), so I would like to share my major configurations journal here for others (and just in case I need to rebuild everything if it is crashed in the future...)

> Charles Zhang


<html>
    <head>
        <meta charset="UTF-8">
        <title>Machine Info</title>
        <style>
/* From extension vscode.github */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

.vscode-dark img[src$=\#gh-light-mode-only],
.vscode-light img[src$=\#gh-dark-mode-only] {
	display: none;
}

/* From extension vscode.markdown-math */
@font-face{font-family:KaTeX_AMS;font-style:normal;font-weight:400;src:url(fonts/KaTeX_AMS-Regular.woff2) format("woff2"),url(fonts/KaTeX_AMS-Regular.woff) format("woff"),url(fonts/KaTeX_AMS-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Caligraphic;font-style:normal;font-weight:700;src:url(fonts/KaTeX_Caligraphic-Bold.woff2) format("woff2"),url(fonts/KaTeX_Caligraphic-Bold.woff) format("woff"),url(fonts/KaTeX_Caligraphic-Bold.ttf) format("truetype")}@font-face{font-family:KaTeX_Caligraphic;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Caligraphic-Regular.woff2) format("woff2"),url(fonts/KaTeX_Caligraphic-Regular.woff) format("woff"),url(fonts/KaTeX_Caligraphic-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Fraktur;font-style:normal;font-weight:700;src:url(fonts/KaTeX_Fraktur-Bold.woff2) format("woff2"),url(fonts/KaTeX_Fraktur-Bold.woff) format("woff"),url(fonts/KaTeX_Fraktur-Bold.ttf) format("truetype")}@font-face{font-family:KaTeX_Fraktur;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Fraktur-Regular.woff2) format("woff2"),url(fonts/KaTeX_Fraktur-Regular.woff) format("woff"),url(fonts/KaTeX_Fraktur-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Main;font-style:normal;font-weight:700;src:url(fonts/KaTeX_Main-Bold.woff2) format("woff2"),url(fonts/KaTeX_Main-Bold.woff) format("woff"),url(fonts/KaTeX_Main-Bold.ttf) format("truetype")}@font-face{font-family:KaTeX_Main;font-style:italic;font-weight:700;src:url(fonts/KaTeX_Main-BoldItalic.woff2) format("woff2"),url(fonts/KaTeX_Main-BoldItalic.woff) format("woff"),url(fonts/KaTeX_Main-BoldItalic.ttf) format("truetype")}@font-face{font-family:KaTeX_Main;font-style:italic;font-weight:400;src:url(fonts/KaTeX_Main-Italic.woff2) format("woff2"),url(fonts/KaTeX_Main-Italic.woff) format("woff"),url(fonts/KaTeX_Main-Italic.ttf) format("truetype")}@font-face{font-family:KaTeX_Main;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Main-Regular.woff2) format("woff2"),url(fonts/KaTeX_Main-Regular.woff) format("woff"),url(fonts/KaTeX_Main-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Math;font-style:italic;font-weight:700;src:url(fonts/KaTeX_Math-BoldItalic.woff2) format("woff2"),url(fonts/KaTeX_Math-BoldItalic.woff) format("woff"),url(fonts/KaTeX_Math-BoldItalic.ttf) format("truetype")}@font-face{font-family:KaTeX_Math;font-style:italic;font-weight:400;src:url(fonts/KaTeX_Math-Italic.woff2) format("woff2"),url(fonts/KaTeX_Math-Italic.woff) format("woff"),url(fonts/KaTeX_Math-Italic.ttf) format("truetype")}@font-face{font-family:"KaTeX_SansSerif";font-style:normal;font-weight:700;src:url(fonts/KaTeX_SansSerif-Bold.woff2) format("woff2"),url(fonts/KaTeX_SansSerif-Bold.woff) format("woff"),url(fonts/KaTeX_SansSerif-Bold.ttf) format("truetype")}@font-face{font-family:"KaTeX_SansSerif";font-style:italic;font-weight:400;src:url(fonts/KaTeX_SansSerif-Italic.woff2) format("woff2"),url(fonts/KaTeX_SansSerif-Italic.woff) format("woff"),url(fonts/KaTeX_SansSerif-Italic.ttf) format("truetype")}@font-face{font-family:"KaTeX_SansSerif";font-style:normal;font-weight:400;src:url(fonts/KaTeX_SansSerif-Regular.woff2) format("woff2"),url(fonts/KaTeX_SansSerif-Regular.woff) format("woff"),url(fonts/KaTeX_SansSerif-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Script;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Script-Regular.woff2) format("woff2"),url(fonts/KaTeX_Script-Regular.woff) format("woff"),url(fonts/KaTeX_Script-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Size1;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Size1-Regular.woff2) format("woff2"),url(fonts/KaTeX_Size1-Regular.woff) format("woff"),url(fonts/KaTeX_Size1-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Size2;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Size2-Regular.woff2) format("woff2"),url(fonts/KaTeX_Size2-Regular.woff) format("woff"),url(fonts/KaTeX_Size2-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Size3;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Size3-Regular.woff2) format("woff2"),url(fonts/KaTeX_Size3-Regular.woff) format("woff"),url(fonts/KaTeX_Size3-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Size4;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Size4-Regular.woff2) format("woff2"),url(fonts/KaTeX_Size4-Regular.woff) format("woff"),url(fonts/KaTeX_Size4-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Typewriter;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Typewriter-Regular.woff2) format("woff2"),url(fonts/KaTeX_Typewriter-Regular.woff) format("woff"),url(fonts/KaTeX_Typewriter-Regular.ttf) format("truetype")}.katex{text-rendering:auto;font:normal 1.21em KaTeX_Main,Times New Roman,serif;line-height:1.2;text-indent:0}.katex *{-ms-high-contrast-adjust:none!important;border-color:currentColor}.katex .katex-version:after{content:"0.13.24"}.katex .katex-mathml{clip:rect(1px,1px,1px,1px);border:0;height:1px;overflow:hidden;padding:0;position:absolute;width:1px}.katex .katex-html>.newline{display:block}.katex .base{position:relative;white-space:nowrap;width:-webkit-min-content;width:-moz-min-content;width:min-content}.katex .base,.katex .strut{display:inline-block}.katex .textbf{font-weight:700}.katex .textit{font-style:italic}.katex .textrm{font-family:KaTeX_Main}.katex .textsf{font-family:KaTeX_SansSerif}.katex .texttt{font-family:KaTeX_Typewriter}.katex .mathnormal{font-family:KaTeX_Math;font-style:italic}.katex .mathit{font-family:KaTeX_Main;font-style:italic}.katex .mathrm{font-style:normal}.katex .mathbf{font-family:KaTeX_Main;font-weight:700}.katex .boldsymbol{font-family:KaTeX_Math;font-style:italic;font-weight:700}.katex .amsrm,.katex .mathbb,.katex .textbb{font-family:KaTeX_AMS}.katex .mathcal{font-family:KaTeX_Caligraphic}.katex .mathfrak,.katex .textfrak{font-family:KaTeX_Fraktur}.katex .mathtt{font-family:KaTeX_Typewriter}.katex .mathscr,.katex .textscr{font-family:KaTeX_Script}.katex .mathsf,.katex .textsf{font-family:KaTeX_SansSerif}.katex .mathboldsf,.katex .textboldsf{font-family:KaTeX_SansSerif;font-weight:700}.katex .mathitsf,.katex .textitsf{font-family:KaTeX_SansSerif;font-style:italic}.katex .mainrm{font-family:KaTeX_Main;font-style:normal}.katex .vlist-t{border-collapse:collapse;display:inline-table;table-layout:fixed}.katex .vlist-r{display:table-row}.katex .vlist{display:table-cell;position:relative;vertical-align:bottom}.katex .vlist>span{display:block;height:0;position:relative}.katex .vlist>span>span{display:inline-block}.katex .vlist>span>.pstrut{overflow:hidden;width:0}.katex .vlist-t2{margin-right:-2px}.katex .vlist-s{display:table-cell;font-size:1px;min-width:2px;vertical-align:bottom;width:2px}.katex .vbox{align-items:baseline;display:inline-flex;flex-direction:column}.katex .hbox{width:100%}.katex .hbox,.katex .thinbox{display:inline-flex;flex-direction:row}.katex .thinbox{max-width:0;width:0}.katex .msupsub{text-align:left}.katex .mfrac>span>span{text-align:center}.katex .mfrac .frac-line{border-bottom-style:solid;display:inline-block;width:100%}.katex .hdashline,.katex .hline,.katex .mfrac .frac-line,.katex .overline .overline-line,.katex .rule,.katex .underline .underline-line{min-height:1px}.katex .mspace{display:inline-block}.katex .clap,.katex .llap,.katex .rlap{position:relative;width:0}.katex .clap>.inner,.katex .llap>.inner,.katex .rlap>.inner{position:absolute}.katex .clap>.fix,.katex .llap>.fix,.katex .rlap>.fix{display:inline-block}.katex .llap>.inner{right:0}.katex .clap>.inner,.katex .rlap>.inner{left:0}.katex .clap>.inner>span{margin-left:-50%;margin-right:50%}.katex .rule{border:0 solid;display:inline-block;position:relative}.katex .hline,.katex .overline .overline-line,.katex .underline .underline-line{border-bottom-style:solid;display:inline-block;width:100%}.katex .hdashline{border-bottom-style:dashed;display:inline-block;width:100%}.katex .sqrt>.root{margin-left:.27777778em;margin-right:-.55555556em}.katex .fontsize-ensurer.reset-size1.size1,.katex .sizing.reset-size1.size1{font-size:1em}.katex .fontsize-ensurer.reset-size1.size2,.katex .sizing.reset-size1.size2{font-size:1.2em}.katex .fontsize-ensurer.reset-size1.size3,.katex .sizing.reset-size1.size3{font-size:1.4em}.katex .fontsize-ensurer.reset-size1.size4,.katex .sizing.reset-size1.size4{font-size:1.6em}.katex .fontsize-ensurer.reset-size1.size5,.katex .sizing.reset-size1.size5{font-size:1.8em}.katex .fontsize-ensurer.reset-size1.size6,.katex .sizing.reset-size1.size6{font-size:2em}.katex .fontsize-ensurer.reset-size1.size7,.katex .sizing.reset-size1.size7{font-size:2.4em}.katex .fontsize-ensurer.reset-size1.size8,.katex .sizing.reset-size1.size8{font-size:2.88em}.katex .fontsize-ensurer.reset-size1.size9,.katex .sizing.reset-size1.size9{font-size:3.456em}.katex .fontsize-ensurer.reset-size1.size10,.katex .sizing.reset-size1.size10{font-size:4.148em}.katex .fontsize-ensurer.reset-size1.size11,.katex .sizing.reset-size1.size11{font-size:4.976em}.katex .fontsize-ensurer.reset-size2.size1,.katex .sizing.reset-size2.size1{font-size:.83333333em}.katex .fontsize-ensurer.reset-size2.size2,.katex .sizing.reset-size2.size2{font-size:1em}.katex .fontsize-ensurer.reset-size2.size3,.katex .sizing.reset-size2.size3{font-size:1.16666667em}.katex .fontsize-ensurer.reset-size2.size4,.katex .sizing.reset-size2.size4{font-size:1.33333333em}.katex .fontsize-ensurer.reset-size2.size5,.katex .sizing.reset-size2.size5{font-size:1.5em}.katex .fontsize-ensurer.reset-size2.size6,.katex .sizing.reset-size2.size6{font-size:1.66666667em}.katex .fontsize-ensurer.reset-size2.size7,.katex .sizing.reset-size2.size7{font-size:2em}.katex .fontsize-ensurer.reset-size2.size8,.katex .sizing.reset-size2.size8{font-size:2.4em}.katex .fontsize-ensurer.reset-size2.size9,.katex .sizing.reset-size2.size9{font-size:2.88em}.katex .fontsize-ensurer.reset-size2.size10,.katex .sizing.reset-size2.size10{font-size:3.45666667em}.katex .fontsize-ensurer.reset-size2.size11,.katex .sizing.reset-size2.size11{font-size:4.14666667em}.katex .fontsize-ensurer.reset-size3.size1,.katex .sizing.reset-size3.size1{font-size:.71428571em}.katex .fontsize-ensurer.reset-size3.size2,.katex .sizing.reset-size3.size2{font-size:.85714286em}.katex .fontsize-ensurer.reset-size3.size3,.katex .sizing.reset-size3.size3{font-size:1em}.katex .fontsize-ensurer.reset-size3.size4,.katex .sizing.reset-size3.size4{font-size:1.14285714em}.katex .fontsize-ensurer.reset-size3.size5,.katex .sizing.reset-size3.size5{font-size:1.28571429em}.katex .fontsize-ensurer.reset-size3.size6,.katex .sizing.reset-size3.size6{font-size:1.42857143em}.katex .fontsize-ensurer.reset-size3.size7,.katex .sizing.reset-size3.size7{font-size:1.71428571em}.katex .fontsize-ensurer.reset-size3.size8,.katex .sizing.reset-size3.size8{font-size:2.05714286em}.katex .fontsize-ensurer.reset-size3.size9,.katex .sizing.reset-size3.size9{font-size:2.46857143em}.katex .fontsize-ensurer.reset-size3.size10,.katex .sizing.reset-size3.size10{font-size:2.96285714em}.katex .fontsize-ensurer.reset-size3.size11,.katex .sizing.reset-size3.size11{font-size:3.55428571em}.katex .fontsize-ensurer.reset-size4.size1,.katex .sizing.reset-size4.size1{font-size:.625em}.katex .fontsize-ensurer.reset-size4.size2,.katex .sizing.reset-size4.size2{font-size:.75em}.katex .fontsize-ensurer.reset-size4.size3,.katex .sizing.reset-size4.size3{font-size:.875em}.katex .fontsize-ensurer.reset-size4.size4,.katex .sizing.reset-size4.size4{font-size:1em}.katex .fontsize-ensurer.reset-size4.size5,.katex .sizing.reset-size4.size5{font-size:1.125em}.katex .fontsize-ensurer.reset-size4.size6,.katex .sizing.reset-size4.size6{font-size:1.25em}.katex .fontsize-ensurer.reset-size4.size7,.katex .sizing.reset-size4.size7{font-size:1.5em}.katex .fontsize-ensurer.reset-size4.size8,.katex .sizing.reset-size4.size8{font-size:1.8em}.katex .fontsize-ensurer.reset-size4.size9,.katex .sizing.reset-size4.size9{font-size:2.16em}.katex .fontsize-ensurer.reset-size4.size10,.katex .sizing.reset-size4.size10{font-size:2.5925em}.katex .fontsize-ensurer.reset-size4.size11,.katex .sizing.reset-size4.size11{font-size:3.11em}.katex .fontsize-ensurer.reset-size5.size1,.katex .sizing.reset-size5.size1{font-size:.55555556em}.katex .fontsize-ensurer.reset-size5.size2,.katex .sizing.reset-size5.size2{font-size:.66666667em}.katex .fontsize-ensurer.reset-size5.size3,.katex .sizing.reset-size5.size3{font-size:.77777778em}.katex .fontsize-ensurer.reset-size5.size4,.katex .sizing.reset-size5.size4{font-size:.88888889em}.katex .fontsize-ensurer.reset-size5.size5,.katex .sizing.reset-size5.size5{font-size:1em}.katex .fontsize-ensurer.reset-size5.size6,.katex .sizing.reset-size5.size6{font-size:1.11111111em}.katex .fontsize-ensurer.reset-size5.size7,.katex .sizing.reset-size5.size7{font-size:1.33333333em}.katex .fontsize-ensurer.reset-size5.size8,.katex .sizing.reset-size5.size8{font-size:1.6em}.katex .fontsize-ensurer.reset-size5.size9,.katex .sizing.reset-size5.size9{font-size:1.92em}.katex .fontsize-ensurer.reset-size5.size10,.katex .sizing.reset-size5.size10{font-size:2.30444444em}.katex .fontsize-ensurer.reset-size5.size11,.katex .sizing.reset-size5.size11{font-size:2.76444444em}.katex .fontsize-ensurer.reset-size6.size1,.katex .sizing.reset-size6.size1{font-size:.5em}.katex .fontsize-ensurer.reset-size6.size2,.katex .sizing.reset-size6.size2{font-size:.6em}.katex .fontsize-ensurer.reset-size6.size3,.katex .sizing.reset-size6.size3{font-size:.7em}.katex .fontsize-ensurer.reset-size6.size4,.katex .sizing.reset-size6.size4{font-size:.8em}.katex .fontsize-ensurer.reset-size6.size5,.katex .sizing.reset-size6.size5{font-size:.9em}.katex .fontsize-ensurer.reset-size6.size6,.katex .sizing.reset-size6.size6{font-size:1em}.katex .fontsize-ensurer.reset-size6.size7,.katex .sizing.reset-size6.size7{font-size:1.2em}.katex .fontsize-ensurer.reset-size6.size8,.katex .sizing.reset-size6.size8{font-size:1.44em}.katex .fontsize-ensurer.reset-size6.size9,.katex .sizing.reset-size6.size9{font-size:1.728em}.katex .fontsize-ensurer.reset-size6.size10,.katex .sizing.reset-size6.size10{font-size:2.074em}.katex .fontsize-ensurer.reset-size6.size11,.katex .sizing.reset-size6.size11{font-size:2.488em}.katex .fontsize-ensurer.reset-size7.size1,.katex .sizing.reset-size7.size1{font-size:.41666667em}.katex .fontsize-ensurer.reset-size7.size2,.katex .sizing.reset-size7.size2{font-size:.5em}.katex .fontsize-ensurer.reset-size7.size3,.katex .sizing.reset-size7.size3{font-size:.58333333em}.katex .fontsize-ensurer.reset-size7.size4,.katex .sizing.reset-size7.size4{font-size:.66666667em}.katex .fontsize-ensurer.reset-size7.size5,.katex .sizing.reset-size7.size5{font-size:.75em}.katex .fontsize-ensurer.reset-size7.size6,.katex .sizing.reset-size7.size6{font-size:.83333333em}.katex .fontsize-ensurer.reset-size7.size7,.katex .sizing.reset-size7.size7{font-size:1em}.katex .fontsize-ensurer.reset-size7.size8,.katex .sizing.reset-size7.size8{font-size:1.2em}.katex .fontsize-ensurer.reset-size7.size9,.katex .sizing.reset-size7.size9{font-size:1.44em}.katex .fontsize-ensurer.reset-size7.size10,.katex .sizing.reset-size7.size10{font-size:1.72833333em}.katex .fontsize-ensurer.reset-size7.size11,.katex .sizing.reset-size7.size11{font-size:2.07333333em}.katex .fontsize-ensurer.reset-size8.size1,.katex .sizing.reset-size8.size1{font-size:.34722222em}.katex .fontsize-ensurer.reset-size8.size2,.katex .sizing.reset-size8.size2{font-size:.41666667em}.katex .fontsize-ensurer.reset-size8.size3,.katex .sizing.reset-size8.size3{font-size:.48611111em}.katex .fontsize-ensurer.reset-size8.size4,.katex .sizing.reset-size8.size4{font-size:.55555556em}.katex .fontsize-ensurer.reset-size8.size5,.katex .sizing.reset-size8.size5{font-size:.625em}.katex .fontsize-ensurer.reset-size8.size6,.katex .sizing.reset-size8.size6{font-size:.69444444em}.katex .fontsize-ensurer.reset-size8.size7,.katex .sizing.reset-size8.size7{font-size:.83333333em}.katex .fontsize-ensurer.reset-size8.size8,.katex .sizing.reset-size8.size8{font-size:1em}.katex .fontsize-ensurer.reset-size8.size9,.katex .sizing.reset-size8.size9{font-size:1.2em}.katex .fontsize-ensurer.reset-size8.size10,.katex .sizing.reset-size8.size10{font-size:1.44027778em}.katex .fontsize-ensurer.reset-size8.size11,.katex .sizing.reset-size8.size11{font-size:1.72777778em}.katex .fontsize-ensurer.reset-size9.size1,.katex .sizing.reset-size9.size1{font-size:.28935185em}.katex .fontsize-ensurer.reset-size9.size2,.katex .sizing.reset-size9.size2{font-size:.34722222em}.katex .fontsize-ensurer.reset-size9.size3,.katex .sizing.reset-size9.size3{font-size:.40509259em}.katex .fontsize-ensurer.reset-size9.size4,.katex .sizing.reset-size9.size4{font-size:.46296296em}.katex .fontsize-ensurer.reset-size9.size5,.katex .sizing.reset-size9.size5{font-size:.52083333em}.katex .fontsize-ensurer.reset-size9.size6,.katex .sizing.reset-size9.size6{font-size:.5787037em}.katex .fontsize-ensurer.reset-size9.size7,.katex .sizing.reset-size9.size7{font-size:.69444444em}.katex .fontsize-ensurer.reset-size9.size8,.katex .sizing.reset-size9.size8{font-size:.83333333em}.katex .fontsize-ensurer.reset-size9.size9,.katex .sizing.reset-size9.size9{font-size:1em}.katex .fontsize-ensurer.reset-size9.size10,.katex .sizing.reset-size9.size10{font-size:1.20023148em}.katex .fontsize-ensurer.reset-size9.size11,.katex .sizing.reset-size9.size11{font-size:1.43981481em}.katex .fontsize-ensurer.reset-size10.size1,.katex .sizing.reset-size10.size1{font-size:.24108004em}.katex .fontsize-ensurer.reset-size10.size2,.katex .sizing.reset-size10.size2{font-size:.28929605em}.katex .fontsize-ensurer.reset-size10.size3,.katex .sizing.reset-size10.size3{font-size:.33751205em}.katex .fontsize-ensurer.reset-size10.size4,.katex .sizing.reset-size10.size4{font-size:.38572806em}.katex .fontsize-ensurer.reset-size10.size5,.katex .sizing.reset-size10.size5{font-size:.43394407em}.katex .fontsize-ensurer.reset-size10.size6,.katex .sizing.reset-size10.size6{font-size:.48216008em}.katex .fontsize-ensurer.reset-size10.size7,.katex .sizing.reset-size10.size7{font-size:.57859209em}.katex .fontsize-ensurer.reset-size10.size8,.katex .sizing.reset-size10.size8{font-size:.69431051em}.katex .fontsize-ensurer.reset-size10.size9,.katex .sizing.reset-size10.size9{font-size:.83317261em}.katex .fontsize-ensurer.reset-size10.size10,.katex .sizing.reset-size10.size10{font-size:1em}.katex .fontsize-ensurer.reset-size10.size11,.katex .sizing.reset-size10.size11{font-size:1.19961427em}.katex .fontsize-ensurer.reset-size11.size1,.katex .sizing.reset-size11.size1{font-size:.20096463em}.katex .fontsize-ensurer.reset-size11.size2,.katex .sizing.reset-size11.size2{font-size:.24115756em}.katex .fontsize-ensurer.reset-size11.size3,.katex .sizing.reset-size11.size3{font-size:.28135048em}.katex .fontsize-ensurer.reset-size11.size4,.katex .sizing.reset-size11.size4{font-size:.32154341em}.katex .fontsize-ensurer.reset-size11.size5,.katex .sizing.reset-size11.size5{font-size:.36173633em}.katex .fontsize-ensurer.reset-size11.size6,.katex .sizing.reset-size11.size6{font-size:.40192926em}.katex .fontsize-ensurer.reset-size11.size7,.katex .sizing.reset-size11.size7{font-size:.48231511em}.katex .fontsize-ensurer.reset-size11.size8,.katex .sizing.reset-size11.size8{font-size:.57877814em}.katex .fontsize-ensurer.reset-size11.size9,.katex .sizing.reset-size11.size9{font-size:.69453376em}.katex .fontsize-ensurer.reset-size11.size10,.katex .sizing.reset-size11.size10{font-size:.83360129em}.katex .fontsize-ensurer.reset-size11.size11,.katex .sizing.reset-size11.size11{font-size:1em}.katex .delimsizing.size1{font-family:KaTeX_Size1}.katex .delimsizing.size2{font-family:KaTeX_Size2}.katex .delimsizing.size3{font-family:KaTeX_Size3}.katex .delimsizing.size4{font-family:KaTeX_Size4}.katex .delimsizing.mult .delim-size1>span{font-family:KaTeX_Size1}.katex .delimsizing.mult .delim-size4>span{font-family:KaTeX_Size4}.katex .nulldelimiter{display:inline-block;width:.12em}.katex .delimcenter,.katex .op-symbol{position:relative}.katex .op-symbol.small-op{font-family:KaTeX_Size1}.katex .op-symbol.large-op{font-family:KaTeX_Size2}.katex .accent>.vlist-t,.katex .op-limits>.vlist-t{text-align:center}.katex .accent .accent-body{position:relative}.katex .accent .accent-body:not(.accent-full){width:0}.katex .overlay{display:block}.katex .mtable .vertical-separator{display:inline-block;min-width:1px}.katex .mtable .arraycolsep{display:inline-block}.katex .mtable .col-align-c>.vlist-t{text-align:center}.katex .mtable .col-align-l>.vlist-t{text-align:left}.katex .mtable .col-align-r>.vlist-t{text-align:right}.katex .svg-align{text-align:left}.katex svg{fill:currentColor;stroke:currentColor;fill-rule:nonzero;fill-opacity:1;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;display:block;height:inherit;position:absolute;width:100%}.katex svg path{stroke:none}.katex img{border-style:none;max-height:none;max-width:none;min-height:0;min-width:0}.katex .stretchy{display:block;overflow:hidden;position:relative;width:100%}.katex .stretchy:after,.katex .stretchy:before{content:""}.katex .hide-tail{overflow:hidden;position:relative;width:100%}.katex .halfarrow-left{left:0;overflow:hidden;position:absolute;width:50.2%}.katex .halfarrow-right{overflow:hidden;position:absolute;right:0;width:50.2%}.katex .brace-left{left:0;overflow:hidden;position:absolute;width:25.1%}.katex .brace-center{left:25%;overflow:hidden;position:absolute;width:50%}.katex .brace-right{overflow:hidden;position:absolute;right:0;width:25.1%}.katex .x-arrow-pad{padding:0 .5em}.katex .cd-arrow-pad{padding:0 .55556em 0 .27778em}.katex .mover,.katex .munder,.katex .x-arrow{text-align:center}.katex .boxpad{padding:0 .3em}.katex .fbox,.katex .fcolorbox{border:.04em solid;box-sizing:border-box}.katex .cancel-pad{padding:0 .2em}.katex .cancel-lap{margin-left:-.2em;margin-right:-.2em}.katex .sout{border-bottom-style:solid;border-bottom-width:.08em}.katex .angl{border-right:.049em solid;border-top:.049em solid;box-sizing:border-box;margin-right:.03889em}.katex .anglpad{padding:0 .03889em}.katex .eqn-num:before{content:"(" counter(katexEqnNo) ")";counter-increment:katexEqnNo}.katex .mml-eqn-num:before{content:"(" counter(mmlEqnNo) ")";counter-increment:mmlEqnNo}.katex .mtr-glue{width:50%}.katex .cd-vert-arrow{display:inline-block;position:relative}.katex .cd-label-left{display:inline-block;position:absolute;right:calc(50% + .3em);text-align:left}.katex .cd-label-right{display:inline-block;left:calc(50% + .3em);position:absolute;text-align:right}.katex-display{display:block;margin:1em 0;text-align:center}.katex-display>.katex{display:block;text-align:center;white-space:nowrap}.katex-display>.katex>.katex-html{display:block;position:relative}.katex-display>.katex>.katex-html>.tag{position:absolute;right:0}.katex-display.leqno>.katex>.katex-html>.tag{left:0;right:auto}.katex-display.fleqn>.katex{padding-left:2em;text-align:left}body{counter-reset:katexEqnNo mmlEqnNo}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

.katex-error {
	color: var(--vscode-editorError-foreground);
}

</style>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.10.2/dist/katex.min.css" integrity="sha384-yFRtMMDnQtDRO8rLpMIKrtPCD5jdktao2TV19YiZYWMDkUR5GQZR/NOVTdquEx1j" crossorigin="anonymous">
<link href="https://cdn.jsdelivr.net/npm/katex-copytex@latest/dist/katex-copytex.min.css" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Microsoft/vscode/extensions/markdown-language-features/media/markdown.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Microsoft/vscode/extensions/markdown-language-features/media/highlight.css">
<style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe WPC', 'Segoe UI', system-ui, 'Ubuntu', 'Droid Sans', sans-serif;
                font-size: 14px;
                line-height: 1.6;
            }
        </style>
        <style>
.task-list-item { list-style-type: none; } .task-list-item-checkbox { margin-left: -20px; vertical-align: middle; }
</style>
        
    </head>
    <body class="vscode-body vscode-light">

<ul>
<li><a href="#machine-info">Machine Info</a></li>
<li><a href="#basic-installation-and-configuration">Basic Installation and Configuration</a></li>
<li><a href="#python-environment--mujoco">Python Environment (&amp; MuJoCo)</a></li>
<li><a href="#ssh">SSH</a></li>
<li><a href="#personal-configuration">Personal Configuration</a></li>
</ul>
<h2 id="machine-info">Machine Info</h2>
<ul>
<li>System
<ul>
<li>Kernel: 5.17.6-1-MANJARO, arch: x86_64</li>
<li>Desktop: Xfce v: 4.16.0,dou   	 dm: LightDM</li>
<li>Distro: Manjaro Linux,     	 base: Arch Linux</li>
</ul>
</li>
<li>Machine
<ul>
<li>Type: laptop,      System: Razer,    Product: Blade 15 (2022) - RZ09-0421</li>
</ul>
</li>
<li>CPU
<ul>
<li>12th Intel Core i7-12800H, Arch: Alder Lake</li>
<li>Cores: 14,   Threads: 20, RAN: 32 GB</li>
</ul>
</li>
<li>GPU
<ul>
<li>Intel Alder Lake-P Integrated Graphics
<ul>
<li>Driver: i915</li>
</ul>
</li>
<li>NVIDIA GeForce RTX 3080 Ti Laptop GPU
<ul>
<li>Driver: nvidia510</li>
<li>VRAM: 16 GB</li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="basic-installation-and-configuration">Basic Installation and Configuration</h2>
<ul>
<li>Download Manjaro iso image: <a href="https://manjaro.org/download/">here</a>
<ul>
<li>linux kernel version: 5.15
<ul>
<li>Not support WiFi driver =&gt; need to update to 5.17</li>
</ul>
</li>
</ul>
</li>
<li>Flash iso to USB by Etcher: <a href="https://www.balena.io/etcher/">here</a></li>
<li><code>F12</code> boot with USB</li>
<li>Wired connection (e.g. by phone hotspot)</li>
<li>Install Manjaro and reboot</li>
<li>Update to kernel version 5.17 (for <code>iwlwifi</code> driver for wifi):
<ul>
<li>
<pre><code class="language-bash"><div>sudo pacman -Sy	<span class="hljs-comment"># synchronizing community database</span>
sudo pacman -R linux515-nvidia	<span class="hljs-comment"># remove conflict dependencies </span>
sudo mhwd-kernel -i linux517  <span class="hljs-comment"># install 5.17</span>
</div></code></pre>
<ul>
<li>Or install from Manjaro Setting Manager/Kernel</li>
</ul>
</li>
<li>Remove kennel 5.15</li>
<li>Reboot</li>
</ul>
</li>
<li>Extended monitor is not working:
<ul>
<li>Append in <code>/etc/default/grub</code>
<ul>
<li>
<pre><code class="language-bash"><div>GRUB_CMDLINE_LINUX_DEFAULT=“pci=realloc”
</div></code></pre>
</li>
</ul>
</li>
</ul>
</li>
<li>Nvidia sanity check
<ul>
<li>Ideal output of <code>pacman -Qs linux517-</code>:</li>
<li>
<pre><code class="language-bash"><div><span class="hljs-built_in">local</span>/linux517-headers 5.17.6-1
  Header files and scripts <span class="hljs-keyword">for</span> building modules <span class="hljs-keyword">for</span> Linux517 kernel
<span class="hljs-built_in">local</span>/linux517-nvidia 510.68.02-4 (linux517-extramodules)
  NVIDIA drivers <span class="hljs-keyword">for</span> linux.
</div></code></pre>
<ul>
<li>Otherwise:
<ul>
<li>
<pre><code class="language-bash"><div>sudo pacman -S linux517-headers linux517-nvidia
</div></code></pre>
</li>
</ul>
</li>
<li>Reboot</li>
</ul>
</li>
</ul>
</li>
<li>Stop random sleeping (logout) issue
<ul>
<li>Edit in <code>/etc/default/grub</code>:
<ul>
<li>Append command inside the quotes of <code>GRUB_CMDLINE_LINUX_DEFAULT=’ … ’ </code>:
<ul>
<li>
<pre><code class="language-bash"><div>button.lid_init_state=open
</div></code></pre>
</li>
</ul>
</li>
</ul>
</li>
<li>To update:
<ul>
<li>
<pre><code class="language-bash"><div>sudo update-grub`
</div></code></pre>
</li>
</ul>
</li>
</ul>
</li>
<li>RAM swap
<ul>
<li><code>pamac install systemd-swap		# install</code></li>
<li>Edit <code>/etc/systemd/swap.conf</code>
<ul>
<li>
<pre><code class="language-bash"><div>`zswap_enabled=1`
`swapfc_enabled=1`
</div></code></pre>
</li>
</ul>
</li>
<li>
<pre><code class="language-bash"><div>sudo systemctl <span class="hljs-built_in">enable</span> --now systemd-swap.service	<span class="hljs-comment"># activate</span>
</div></code></pre>
</li>
<li>Optional check status
<ul>
<li>
<pre><code class="language-bash"><div>sudo systemctl status systemd-swap.service
</div></code></pre>
</li>
</ul>
</li>
</ul>
</li>
<li>Common WiFi Security setup:
<ul>
<li>xfinity
<ul>
<li>Security: WPA &amp; WPA2 Enterprise</li>
<li>Authentication: Tunneled TLS</li>
<li>No CA certificate is required</li>
<li>Inner authentication: PAP</li>
<li>Username &amp; Password</li>
</ul>
</li>
<li>eduroam (and college’s WiFi)
<ul>
<li>Security: WPA &amp; WPA2 Enterprise</li>
<li>Authentication: Protected EAL (PEAP)</li>
<li>Domain: <a href="http://xxx.edu">xxx.edu</a></li>
<li>No CA certificate is required</li>
<li>PEAP version: Automatic</li>
<li>Inner authentication: MMSCHAPv2</li>
<li>Username &amp; password</li>
</ul>
</li>
<li>WiFi needs login/register with redirected portal
<ul>
<li>try <a href="http://neverssl.com/">http://neverssl.com/</a> for a page that does not use TLS helps for portal login page. </li>
</ul>
</li>
</ul>
</li>
<li>Troubleshooting
<ul>
<li>Buzzing sound when output sounds
<ul>
<li>Uninstall <code>wireplumber</code> and install <code>pipewire-media-session</code></li>
<li>Otherwise: discussion <a href="https://forum.manjaro.org/t/buzzing-sound-probably-after-updates/111989/36">here</a></li>
</ul>
</li>
</ul>
</li>
<li>More MacOS / Windows-like extra configurations, e.g. touchpad gestures, mission control, Windows IR Face ID, and so forth, can be found in the section <a href="#personal-configuration">Personal Configuration</a>.</li>
<li>Known unresolvable issues (waiting for updates):
<ul>
<li>No microphone (input audio)</li>
<li>Reversed sound output</li>
</ul>
</li>
</ul>
<h2 id="python-environment--mujoco">Python Environment (&amp; MuJoCo)</h2>
<ul>
<li>Miniconda
<ul>
<li>
<pre><code class="language-bash"><div>wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh
<span class="hljs-built_in">source</span> .bashrc
</div></code></pre>
</li>
</ul>
</li>
<li>MuJoCo
<ul>
<li>
<pre><code class="language-bash"><div>wget https://mujoco.org/download/mujoco210-linux-x86_64.tar.gz 
mkdir ~/.mujoco
tar xf mujoco210-linux-x86_64.tar.gz -C ~/.mujoco
</div></code></pre>
</li>
<li>Extra work to build from scratch for Manjaro:
<ul>
<li>
<pre><code class="language-bash"><div>git <span class="hljs-built_in">clone</span> https://github.com/openai/mujoco-py
<span class="hljs-built_in">cd</span> mujoco-py
pip install -e . --no-cache     <span class="hljs-comment"># after activate conda env</span>
</div></code></pre>
</li>
</ul>
</li>
<li>Render troubleshooting:
<ul>
<li>Missing path to your environment variable
<ul>
<li>
<pre><code class="language-bash"><div><span class="hljs-built_in">export</span> LD_LIBRARY_PATH=<span class="hljs-variable">$LD_LIBRARY_PATH</span>:<span class="hljs-variable">$HOME</span>/.mujoco/mujoco210/bin:/usr/lib/nvidia
</div></code></pre>
<ul>
<li>or add in python file
<ul>
<li>
<pre><code class="language-python"><div>os.environ[
  <span class="hljs-string">&quot;LD_LIBRARY_PATH&quot;</span>
] = <span class="hljs-string">f&quot;<span class="hljs-subst">{os.environ[<span class="hljs-string">&#x27;$LD_LIBRARY_PATH&#x27;</span>]}</span>:<span class="hljs-subst">{os.environ[<span class="hljs-string">&#x27;HOME&#x27;</span>]}</span>/.mujoco/mujoco210/bin:/usr/lib/nvidia&quot;</span> 
</div></code></pre>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
<li>GLEW initialization error: Missing GL version
<ul>
<li>
<pre><code class="language-bash"><div><span class="hljs-built_in">export</span> LD_PRELOAD=/usr/lib/libGLEW.so
</div></code></pre>
</li>
</ul>
</li>
<li>libGL error: failed to load driver: i965 and swrast issues
<ul>
<li>
<pre><code class="language-bash"><div>sudo find / -wholename <span class="hljs-string">&quot;*conda*/**/libstdc++.so*&quot;</span>
conda install libgcc
<span class="hljs-comment"># check if conflicts</span>
sudo find / -wholename <span class="hljs-string">&quot;*conda*/**/libstdc++.so*&quot;</span>
rm ~/miniconda3/envs/&lt;env_name&gt;/lib/libstdc++*
</div></code></pre>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
<li>PyTorch
<ul>
<li>
<pre><code class="language-bash"><div>conda install pytorch torchvision torchaudio cudatoolkit=11.3 -c pytorch
</div></code></pre>
<ul>
<li>Though cuda is 11.6 for the system</li>
<li>Otherwise, error occurs:
<ul>
<li>RuntimeError: CUDA error: no kernel image is available for execution on the device</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="ssh">SSH</h2>
<ul>
<li>
<pre><code class="language-bash"><div>sudo pacman -S openssh
sudo systemctl status sshd.service
sudo systemctl <span class="hljs-built_in">enable</span> sshd.service
sudo systemctl start sshd.service
</div></code></pre>
</li>
<li>Generate key
<ul>
<li>e.g. <code>ssh-keygen -t rsa -b 4096 -C &quot;xxx@xxx.org&quot;</code></li>
<li>Add to <code>~/.ssh/config</code> (or need to <code>/etc/ssh/ssh_config</code>) for login username
<ul>
<li>
<pre><code class="language-bash"><div>HOST *  
  USER charlesz
</div></code></pre>
</li>
</ul>
</li>
<li><code>ssh-keygen -y</code> for pub key</li>
</ul>
</li>
<li>Troubleshooting:
<ul>
<li>…bad permissions…
<ul>
<li>
<pre><code class="language-bash"><div>chmod 400 ~/.ssh/id_rsa
chmod 600 ~/.ssh/config
</div></code></pre>
</li>
</ul>
</li>
</ul>
</li>
<li>same network ip <code>ip ad</code> =&gt; <code>ssh &lt;username&gt;@&lt;ip&gt;</code></li>
<li>With port forwarding
<ul>
<li><code>ssh &lt;username&gt;@&lt;WAN ip address&gt; -p &lt;port&gt;</code></li>
<li>Modify in <code>/etc/ssh/sshd_config</code> for ports</li>
<li>systemctl restart sshd
<ul>
<li><code>ss -tln</code> to double-check</li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="personal-configuration">Personal Configuration</h2>
<ul>
<li><em>AUR</em>, <em>Snap</em> for extension</li>
<li>Hot key command for terminal
<ul>
<li>
<pre><code class="language-bash"><div>xfce4-terminal
</div></code></pre>
</li>
</ul>
</li>
<li>Crop screen: <em>flameshot</em>
<ul>
<li>Hot key command
<ul>
<li>
<pre><code class="language-bash"><div>flameshot gui
</div></code></pre>
</li>
</ul>
</li>
</ul>
</li>
<li>Record screen: <em>SimpleScreenRecorder</em></li>
<li>VS code (refined version)
<ul>
<li>Need for symlink<pre><code class="language-bash"><div>sudo ln -s /var/lib/snapd/snap/snap
</div></code></pre>
</li>
</ul>
</li>
<li>MacOS style <a href="https://www.youtube.com/watch?v=oQ8RWtD3MTQ">ref</a>
<ul>
<li><a href="https://www.pling.com/p/1403328">Theme</a></li>
<li><a href="https://www.pling.com/p/1405756/">Icons</a></li>
</ul>
</li>
<li>Customize &quot;show all application windows&quot; (expose mission control)
<ul>
<li>
<pre><code class="language-bash"><div>cp /etc/xdg/skippy-xd.rc ~/.config/skippy-xd/skippy-xd.rc
</div></code></pre>
</li>
<li>Edit in ~/.config/skippy-xd/skippy-xd.rc</li>
<li>
<pre><code class="language-bash"><div>movePointerOnStart = <span class="hljs-literal">false</span>
switchDesktopOnActivate = <span class="hljs-literal">true</span>
Opacity=255	  <span class="hljs-comment"># 0-255</span>
background = scale mid mid /path/to/file
</div></code></pre>
</li>
<li>on-start command
<ul>
<li>
<pre><code class="language-bash"><div>skippy-xd --start-daemon
</div></code></pre>
</li>
</ul>
</li>
<li>Customized hotkey command <code>skippy-xd</code></li>
</ul>
</li>
<li>Chinese pinyin:
<ul>
<li>
<pre><code class="language-bash"><div>sudo pacman -S fcitx-im fcitx-configtool fcitx-cloudpinyin fcitx-sunpinyin
</div></code></pre>
</li>
<li>Add to <code>~/.xprofile</code>
<ul>
<li>
<pre><code class="language-bash"><div><span class="hljs-built_in">export</span> GTK_IM_MODULE=fcitx
<span class="hljs-built_in">export</span> QT_IM_MODULE=fcitx
<span class="hljs-built_in">export</span> XMODIFIERS=@im=fcitx
</div></code></pre>
</li>
</ul>
</li>
<li>Reboot</li>
<li>Hot key: <code>Ctrl</code>+<code>space</code></li>
</ul>
</li>
<li>Gestures:
<ul>
<li>
<pre><code class="language-bash"><div>sudo pacman -S xdotool libinput-gestures
sudo gpasswd -a &lt;user_name&gt; input <span class="hljs-comment">#add user in input group</span>
libinput-gestures-setup desktop 	<span class="hljs-comment"># set up the application using the DE</span>
libinput-gestures-setup autostart 	<span class="hljs-comment"># enable the app to start automatically in the background</span>
libinput-gestures-setup start 		<span class="hljs-comment"># start the app immediately in the background</span>
</div></code></pre>
<ul>
<li>Troubleshooting: if <em>libinput-gestures failed to start as a desktop application.</em>
<ul>
<li>
<pre><code class="language-bash"><div>sudo gpasswd -a <span class="hljs-variable">$USER</span> input	<span class="hljs-comment"># set user to group first</span>
</div></code></pre>
</li>
<li>Reboot</li>
</ul>
</li>
</ul>
</li>
<li>Add to <code>~/.config/libinput-gestures.conf</code>:
<ul>
<li>
<pre><code class="language-bash"><div><span class="hljs-comment"># Zoom in / Zoom out</span>
gesture: pinch out xdotool key Ctrl+plus
gesture: pinch <span class="hljs-keyword">in</span> xdotool key Ctrl+minus
<span class="hljs-comment"># TODO smoothing scroll not working</span>
<span class="hljs-comment"># gesture: pinch out xdotool key Super_L+equal</span>
<span class="hljs-comment"># gesture: pinch in xdotool key Super_L+minus</span>

<span class="hljs-comment"># Switch between desktops</span>
gesture: swipe left 4 xdotool set_desktop --relative 1
gesture: swipe right 4 xdotool set_desktop --relative -- -1

<span class="hljs-comment"># Full screen windows (tasks) switcher (F11 &amp; ESC)</span>
gesture: swipe up 4 xdotool key 0xffc8
gesture: swipe down 4 xdotool key 0xff1b

<span class="hljs-comment"># Tile windows (hotkey may different)</span>
gesture: swipe left 3 xdotool key Super_L+Left
gesture: swipe right 3 xdotool key Super_L+Right
gesture: swipe up 3 xdotool key Super_L+Up
gesture: swipe down 3 xdotool key Super_L+Down
gesture: swipe left_up 3 xdotool key Ctrl+Super_L+Up
gesture: swipe left_down 3 xdotool key Ctrl+Super_L+Down
gesture: swipe right_up 3 xdotool key Alt+Super_L+Up
gesture: swipe right_down 3 xdotool key Alt+Super_L+Down  
</div></code></pre>
</li>
</ul>
</li>
<li>Reboot</li>
<li>Xdotoll list of key codes: <a href="https://gitlab.com/cunidev/gestures/-/wikis/xdotool-list-of-key-codes#:~:text=Shift%20lock-,Meta_L,-0xffe7">here</a></li>
</ul>
</li>
<li>Github desktop troubleshooting (for UI fans): <em>Authentication failed:
Error calling StartServiceByName for org.freedesktop.secrets: Failed to execute program org.freedesktop.secrets: No such file or directory</em>
<ul>
<li>
<pre><code class="language-bash"><div>sudo pacman -S gnome-keyring libsecret
</div></code></pre>
</li>
<li>if still not working, try SSH keys</li>
<li>if still not working
<ul>
<li>in <code>.git/config</code> manually set
<ul>
<li>
<pre><code class="language-bash"><div>url=https://username:token@github.repo.git
</div></code></pre>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
<li>Tmux
<ul>
<li>Enable mouse:
<ul>
<li>Add in <code>.tmux.conf</code>:
<ul>
<li>
<pre><code class="language-bash"><div><span class="hljs-built_in">set</span> -g mouse on
</div></code></pre>
</li>
</ul>
</li>
<li>
<pre><code class="language-bash"><div>tmux kill-server &amp;&amp; tmux
</div></code></pre>
</li>
<li>After this, selection automatically copied</li>
<li>Paste: <code>Ctrl+b</code> <code>]</code></li>
</ul>
</li>
<li>CheatSheet (prefix <code>Ctrl+b</code>)
<ul>
<li>tmux new -s session_name</li>
<li><code>tmux</code> equivalent to <code>tmux new -s 0 # (or 1, 2, 3, …)</code></li>
<li><code>tmux ls</code></li>
<li><code>Ctrl+b</code> <code>%</code> Split current pane horizontally into two panes</li>
<li><code>Ctrl+b</code> <code>&quot;</code> Split current pane vertically into two panes</li>
<li><code>Ctrl+d</code> close current pane</li>
<li><code>Ctrl+b</code> <code>d</code> detach</li>
<li>
<pre><code class="language-bash"><div>tmux a -t &lt;session_name&gt;	<span class="hljs-comment"># attach</span>
</div></code></pre>
</li>
<li><code>Ctrl+b</code> <code>c</code> Create a new window (with shell)</li>
<li><code>Ctrl+b</code> <code>w</code> Choose window from a list</li>
<li><code>Ctrl+b</code> <code>0</code> Switch to window 0 (by number )</li>
<li><code>Ctrl+b</code> <code>,</code> Rename the current window</li>
</ul>
</li>
</ul>
</li>
<li>Face ID (Windows near infrared (IR) camera):
<ul>
<li>Install <code>howdy</code> (or <code>yay -S --editmenu howdy</code>)</li>
<li>
<pre><code class="language-bash"><div>mpv /dev/video2	  <span class="hljs-comment"># find IR camera, mostly video2</span>
</div></code></pre>
</li>
<li>Edit <code>/lib/security/howdy/config.ini</code>
<ul>
<li>
<pre><code class="language-bash"><div>certainty = 4.5	<span class="hljs-comment"># faster recognize</span>
device_path = /dev/video2	<span class="hljs-comment"># or whatever for IR</span>
dark_threshold = 100
</div></code></pre>
</li>
</ul>
</li>
<li>Register face<pre><code class="language-bash"><div>sudo howdy add
</div></code></pre>
</li>
<li>Add <code>auth sufficient pam_python.so/lib/security/howdy/pam.py</code> in
<ul>
<li><code>/etc/pam.d/sudo</code> for sudo</li>
<li><code>system-local-login</code> and e.t.c. for unlock screen, download apps, e.t.c.</li>
</ul>
</li>
</ul>
</li>
<li>Open folder from terminal:
<ul>
<li>
<pre><code class="language-bash"><div>  xdg-open .  <span class="hljs-comment"># current dir, or /path/to/folder</span>
</div></code></pre>
</li>
</ul>
</li>
<li>Logi-tech mouse button configuration GUI
<ul>
<li><em>Piper</em></li>
</ul>
</li>
<li>Hot corner
<ul>
<li><em>xfce-hotcorner-plugin</em></li>
</ul>
</li>
</ul>

        <script async src="https://cdn.jsdelivr.net/npm/katex-copytex@latest/dist/katex-copytex.min.js"></script>
        
    </body>
    </html>





<script src="https://utteranc.es/client.js"
        repo="zcczhang/zcczhang.github.io"
        issue-term="pathname"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>
