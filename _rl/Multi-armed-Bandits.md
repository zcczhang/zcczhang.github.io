---
title: "Chapter 2 Multi-armed Bandits"
collection: rl
permalink: /rl/multi-armed-bandits
tags:
  - Reinforcement Learning
  - Tabular Solution Method
  - My Note
date: "2020-12-01"
--- 
***Reinforcement Learning: An Introduction***


<html>
<head><meta charset="utf-8" />

<title>Untitled1</title>

<script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.10/require.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>



<style type="text/css">
    /*!
*
* Twitter Bootstrap
*
*/
/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */
html {
  font-family: sans-serif;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}
body {
  margin: 0;
}
article,
aside,
details,
figcaption,
figure,
hgroup,
main,
section,
summary {
  display: block;
}
audio,
canvas,
progress,
video {
  display: inline-block;
  vertical-align: baseline;
}
audio:not([controls]) {
  display: none;
  height: 0;
}
[hidden],
template {
  display: none;
}
a {
  background-color: transparent;
}
a:active,
a:hover {
  outline: 0;
}
abbr[title] {
  border-bottom: 1px dotted;
}
b,
strong {
  font-weight: bold;
}
dfn {
  font-style: italic;
}
h1 {
  font-size: 2em;
  margin: 0.67em 0;
}
mark {
  background: #ff0;
  color: #000;
}
small {
  font-size: 80%;
}
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
sup {
  top: -0.5em;
}
sub {
  bottom: -0.25em;
}
img {
  border: 0;
}
svg:not(:root) {
  overflow: hidden;
}
figure {
  margin: 1em 40px;
}
hr {
  box-sizing: content-box;
  height: 0;
}
pre {
  overflow: auto;
}
code,
kbd,
pre,
samp {
  font-family: monospace, monospace;
  font-size: 1em;
}
button,
input,
optgroup,
select,
textarea {
  color: inherit;
  font: inherit;
  margin: 0;
}
button {
  overflow: visible;
}
button,
select {
  text-transform: none;
}
button,
html input[type="button"],
input[type="reset"],
input[type="submit"] {
  -webkit-appearance: button;
  cursor: pointer;
}
button[disabled],
html input[disabled] {
  cursor: default;
}
button::-moz-focus-inner,
input::-moz-focus-inner {
  border: 0;
  padding: 0;
}
input {
  line-height: normal;
}
input[type="checkbox"],
input[type="radio"] {
  box-sizing: border-box;
  padding: 0;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  height: auto;
}
input[type="search"] {
  -webkit-appearance: textfield;
  box-sizing: content-box;
}
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}
fieldset {
  border: 1px solid #c0c0c0;
  margin: 0 2px;
  padding: 0.35em 0.625em 0.75em;
}
legend {
  border: 0;
  padding: 0;
}
textarea {
  overflow: auto;
}
optgroup {
  font-weight: bold;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
td,
th {
  padding: 0;
}
/*! Source: https://github.com/h5bp/html5-boilerplate/blob/master/src/css/main.css */
@media print {
  *,
  *:before,
  *:after {
    background: transparent !important;
    box-shadow: none !important;
    text-shadow: none !important;
  }
  a,
  a:visited {
    text-decoration: underline;
  }
  a[href]:after {
    content: " (" attr(href) ")";
  }
  abbr[title]:after {
    content: " (" attr(title) ")";
  }
  a[href^="#"]:after,
  a[href^="javascript:"]:after {
    content: "";
  }
  pre,
  blockquote {
    border: 1px solid #999;
    page-break-inside: avoid;
  }
  thead {
    display: table-header-group;
  }
  tr,
  img {
    page-break-inside: avoid;
  }
  img {
    max-width: 100% !important;
  }
  p,
  h2,
  h3 {
    orphans: 3;
    widows: 3;
  }
  h2,
  h3 {
    page-break-after: avoid;
  }
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
*:before,
*:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
html {
  font-size: 10px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  line-height: 1.42857143;
  color: #000;
  background-color: #fff;
}
input,
button,
select,
textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}
a {
  color: #337ab7;
  text-decoration: none;
}
a:hover,
a:focus {
  color: #23527c;
  text-decoration: underline;
}
a:focus {
  outline: 5px auto -webkit-focus-ring-color;
  outline-offset: -2px;
}
figure {
  margin: 0;
}
img {
  vertical-align: middle;
}
.img-responsive,
.thumbnail > img,
.thumbnail a > img,
.carousel-inner > .item > img,
.carousel-inner > .item > a > img {
  display: block;
  max-width: 100%;
  height: auto;
}
.img-rounded {
  border-radius: 3px;
}
.img-thumbnail {
  padding: 4px;
  line-height: 1.42857143;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 2px;
  -webkit-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  display: inline-block;
  max-width: 100%;
  height: auto;
}
.img-circle {
  border-radius: 50%;
}
hr {
  margin-top: 18px;
  margin-bottom: 18px;
  border: 0;
  border-top: 1px solid #eeeeee;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
.sr-only-focusable:active,
.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  clip: auto;
}
[role="button"] {
  cursor: pointer;
}
h1,
h2,
h3,
h4,
h5,
h6,
.h1,
.h2,
.h3,
.h4,
.h5,
.h6 {
  font-family: inherit;
  font-weight: 500;
  line-height: 1.1;
  color: inherit;
}
h1 small,
h2 small,
h3 small,
h4 small,
h5 small,
h6 small,
.h1 small,
.h2 small,
.h3 small,
.h4 small,
.h5 small,
.h6 small,
h1 .small,
h2 .small,
h3 .small,
h4 .small,
h5 .small,
h6 .small,
.h1 .small,
.h2 .small,
.h3 .small,
.h4 .small,
.h5 .small,
.h6 .small {
  font-weight: normal;
  line-height: 1;
  color: #777777;
}
h1,
.h1,
h2,
.h2,
h3,
.h3 {
  margin-top: 18px;
  margin-bottom: 9px;
}
h1 small,
.h1 small,
h2 small,
.h2 small,
h3 small,
.h3 small,
h1 .small,
.h1 .small,
h2 .small,
.h2 .small,
h3 .small,
.h3 .small {
  font-size: 65%;
}
h4,
.h4,
h5,
.h5,
h6,
.h6 {
  margin-top: 9px;
  margin-bottom: 9px;
}
h4 small,
.h4 small,
h5 small,
.h5 small,
h6 small,
.h6 small,
h4 .small,
.h4 .small,
h5 .small,
.h5 .small,
h6 .small,
.h6 .small {
  font-size: 75%;
}
h1,
.h1 {
  font-size: 33px;
}
h2,
.h2 {
  font-size: 27px;
}
h3,
.h3 {
  font-size: 23px;
}
h4,
.h4 {
  font-size: 17px;
}
h5,
.h5 {
  font-size: 13px;
}
h6,
.h6 {
  font-size: 12px;
}
p {
  margin: 0 0 9px;
}
.lead {
  margin-bottom: 18px;
  font-size: 14px;
  font-weight: 300;
  line-height: 1.4;
}
@media (min-width: 768px) {
  .lead {
    font-size: 19.5px;
  }
}
small,
.small {
  font-size: 92%;
}
mark,
.mark {
  background-color: #fcf8e3;
  padding: .2em;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
.text-center {
  text-align: center;
}
.text-justify {
  text-align: justify;
}
.text-nowrap {
  white-space: nowrap;
}
.text-lowercase {
  text-transform: lowercase;
}
.text-uppercase {
  text-transform: uppercase;
}
.text-capitalize {
  text-transform: capitalize;
}
.text-muted {
  color: #777777;
}
.text-primary {
  color: #337ab7;
}
a.text-primary:hover,
a.text-primary:focus {
  color: #286090;
}
.text-success {
  color: #3c763d;
}
a.text-success:hover,
a.text-success:focus {
  color: #2b542c;
}
.text-info {
  color: #31708f;
}
a.text-info:hover,
a.text-info:focus {
  color: #245269;
}
.text-warning {
  color: #8a6d3b;
}
a.text-warning:hover,
a.text-warning:focus {
  color: #66512c;
}
.text-danger {
  color: #a94442;
}
a.text-danger:hover,
a.text-danger:focus {
  color: #843534;
}
.bg-primary {
  color: #fff;
  background-color: #337ab7;
}
a.bg-primary:hover,
a.bg-primary:focus {
  background-color: #286090;
}
.bg-success {
  background-color: #dff0d8;
}
a.bg-success:hover,
a.bg-success:focus {
  background-color: #c1e2b3;
}
.bg-info {
  background-color: #d9edf7;
}
a.bg-info:hover,
a.bg-info:focus {
  background-color: #afd9ee;
}
.bg-warning {
  background-color: #fcf8e3;
}
a.bg-warning:hover,
a.bg-warning:focus {
  background-color: #f7ecb5;
}
.bg-danger {
  background-color: #f2dede;
}
a.bg-danger:hover,
a.bg-danger:focus {
  background-color: #e4b9b9;
}
.page-header {
  padding-bottom: 8px;
  margin: 36px 0 18px;
  border-bottom: 1px solid #eeeeee;
}
ul,
ol {
  margin-top: 0;
  margin-bottom: 9px;
}
ul ul,
ol ul,
ul ol,
ol ol {
  margin-bottom: 0;
}
.list-unstyled {
  padding-left: 0;
  list-style: none;
}
.list-inline {
  padding-left: 0;
  list-style: none;
  margin-left: -5px;
}
.list-inline > li {
  display: inline-block;
  padding-left: 5px;
  padding-right: 5px;
}
dl {
  margin-top: 0;
  margin-bottom: 18px;
}
dt,
dd {
  line-height: 1.42857143;
}
dt {
  font-weight: bold;
}
dd {
  margin-left: 0;
}
@media (min-width: 541px) {
  .dl-horizontal dt {
    float: left;
    width: 160px;
    clear: left;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dl-horizontal dd {
    margin-left: 180px;
  }
}
abbr[title],
abbr[data-original-title] {
  cursor: help;
  border-bottom: 1px dotted #777777;
}
.initialism {
  font-size: 90%;
  text-transform: uppercase;
}
blockquote {
  padding: 9px 18px;
  margin: 0 0 18px;
  font-size: inherit;
  border-left: 5px solid #eeeeee;
}
blockquote p:last-child,
blockquote ul:last-child,
blockquote ol:last-child {
  margin-bottom: 0;
}
blockquote footer,
blockquote small,
blockquote .small {
  display: block;
  font-size: 80%;
  line-height: 1.42857143;
  color: #777777;
}
blockquote footer:before,
blockquote small:before,
blockquote .small:before {
  content: '\2014 \00A0';
}
.blockquote-reverse,
blockquote.pull-right {
  padding-right: 15px;
  padding-left: 0;
  border-right: 5px solid #eeeeee;
  border-left: 0;
  text-align: right;
}
.blockquote-reverse footer:before,
blockquote.pull-right footer:before,
.blockquote-reverse small:before,
blockquote.pull-right small:before,
.blockquote-reverse .small:before,
blockquote.pull-right .small:before {
  content: '';
}
.blockquote-reverse footer:after,
blockquote.pull-right footer:after,
.blockquote-reverse small:after,
blockquote.pull-right small:after,
.blockquote-reverse .small:after,
blockquote.pull-right .small:after {
  content: '\00A0 \2014';
}
address {
  margin-bottom: 18px;
  font-style: normal;
  line-height: 1.42857143;
}
code,
kbd,
pre,
samp {
  font-family: monospace;
}
code {
  padding: 2px 4px;
  font-size: 90%;
  color: #c7254e;
  background-color: #f9f2f4;
  border-radius: 2px;
}
kbd {
  padding: 2px 4px;
  font-size: 60%;
  color: #888;
  background-color: transparent;
  border-radius: 1px;
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.25);
}
kbd kbd {
  padding: 0;
  font-size: 100%;
  font-weight: bold;
  box-shadow: none;
}
pre {
  display: block;
  padding: 8.5px;
  margin: 0 0 9px;
  font-size: 12px;
  line-height: 1.42857143;
  word-break: break-all;
  word-wrap: break-word;
  color: #333333;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 2px;
}
pre code {
  padding: 0;
  font-size: inherit;
  color: inherit;
  white-space: pre-wrap;
  background-color: transparent;
  border-radius: 0;
}
.pre-scrollable {
  max-height: 340px;
  overflow-y: scroll;
}
.container {
  margin-right: auto;
  margin-left: auto;
  padding-left: 0px;
  padding-right: 0px;
}
@media (min-width: 768px) {
  .container {
    width: 768px;
  }
}
@media (min-width: 992px) {
  .container {
    width: 940px;
  }
}
@media (min-width: 1200px) {
  .container {
    width: 1140px;
  }
}
.container-fluid {
  margin-right: auto;
  margin-left: auto;
  padding-left: 0px;
  padding-right: 0px;
}
.row {
  margin-left: 0px;
  margin-right: 0px;
}
.col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {
  position: relative;
  min-height: 1px;
  padding-left: 0px;
  padding-right: 0px;
}
.col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12 {
  float: left;
}
.col-xs-12 {
  width: 100%;
}
.col-xs-11 {
  width: 91.66666667%;
}
.col-xs-10 {
  width: 83.33333333%;
}
.col-xs-9 {
  width: 75%;
}
.col-xs-8 {
  width: 66.66666667%;
}
.col-xs-7 {
  width: 58.33333333%;
}
.col-xs-6 {
  width: 50%;
}
.col-xs-5 {
  width: 41.66666667%;
}
.col-xs-4 {
  width: 33.33333333%;
}
.col-xs-3 {
  width: 25%;
}
.col-xs-2 {
  width: 16.66666667%;
}
.col-xs-1 {
  width: 8.33333333%;
}
.col-xs-pull-12 {
  right: 100%;
}
.col-xs-pull-11 {
  right: 91.66666667%;
}
.col-xs-pull-10 {
  right: 83.33333333%;
}
.col-xs-pull-9 {
  right: 75%;
}
.col-xs-pull-8 {
  right: 66.66666667%;
}
.col-xs-pull-7 {
  right: 58.33333333%;
}
.col-xs-pull-6 {
  right: 50%;
}
.col-xs-pull-5 {
  right: 41.66666667%;
}
.col-xs-pull-4 {
  right: 33.33333333%;
}
.col-xs-pull-3 {
  right: 25%;
}
.col-xs-pull-2 {
  right: 16.66666667%;
}
.col-xs-pull-1 {
  right: 8.33333333%;
}
.col-xs-pull-0 {
  right: auto;
}
.col-xs-push-12 {
  left: 100%;
}
.col-xs-push-11 {
  left: 91.66666667%;
}
.col-xs-push-10 {
  left: 83.33333333%;
}
.col-xs-push-9 {
  left: 75%;
}
.col-xs-push-8 {
  left: 66.66666667%;
}
.col-xs-push-7 {
  left: 58.33333333%;
}
.col-xs-push-6 {
  left: 50%;
}
.col-xs-push-5 {
  left: 41.66666667%;
}
.col-xs-push-4 {
  left: 33.33333333%;
}
.col-xs-push-3 {
  left: 25%;
}
.col-xs-push-2 {
  left: 16.66666667%;
}
.col-xs-push-1 {
  left: 8.33333333%;
}
.col-xs-push-0 {
  left: auto;
}
.col-xs-offset-12 {
  margin-left: 100%;
}
.col-xs-offset-11 {
  margin-left: 91.66666667%;
}
.col-xs-offset-10 {
  margin-left: 83.33333333%;
}
.col-xs-offset-9 {
  margin-left: 75%;
}
.col-xs-offset-8 {
  margin-left: 66.66666667%;
}
.col-xs-offset-7 {
  margin-left: 58.33333333%;
}
.col-xs-offset-6 {
  margin-left: 50%;
}
.col-xs-offset-5 {
  margin-left: 41.66666667%;
}
.col-xs-offset-4 {
  margin-left: 33.33333333%;
}
.col-xs-offset-3 {
  margin-left: 25%;
}
.col-xs-offset-2 {
  margin-left: 16.66666667%;
}
.col-xs-offset-1 {
  margin-left: 8.33333333%;
}
.col-xs-offset-0 {
  margin-left: 0%;
}
@media (min-width: 768px) {
  .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12 {
    float: left;
  }
  .col-sm-12 {
    width: 100%;
  }
  .col-sm-11 {
    width: 91.66666667%;
  }
  .col-sm-10 {
    width: 83.33333333%;
  }
  .col-sm-9 {
    width: 75%;
  }
  .col-sm-8 {
    width: 66.66666667%;
  }
  .col-sm-7 {
    width: 58.33333333%;
  }
  .col-sm-6 {
    width: 50%;
  }
  .col-sm-5 {
    width: 41.66666667%;
  }
  .col-sm-4 {
    width: 33.33333333%;
  }
  .col-sm-3 {
    width: 25%;
  }
  .col-sm-2 {
    width: 16.66666667%;
  }
  .col-sm-1 {
    width: 8.33333333%;
  }
  .col-sm-pull-12 {
    right: 100%;
  }
  .col-sm-pull-11 {
    right: 91.66666667%;
  }
  .col-sm-pull-10 {
    right: 83.33333333%;
  }
  .col-sm-pull-9 {
    right: 75%;
  }
  .col-sm-pull-8 {
    right: 66.66666667%;
  }
  .col-sm-pull-7 {
    right: 58.33333333%;
  }
  .col-sm-pull-6 {
    right: 50%;
  }
  .col-sm-pull-5 {
    right: 41.66666667%;
  }
  .col-sm-pull-4 {
    right: 33.33333333%;
  }
  .col-sm-pull-3 {
    right: 25%;
  }
  .col-sm-pull-2 {
    right: 16.66666667%;
  }
  .col-sm-pull-1 {
    right: 8.33333333%;
  }
  .col-sm-pull-0 {
    right: auto;
  }
  .col-sm-push-12 {
    left: 100%;
  }
  .col-sm-push-11 {
    left: 91.66666667%;
  }
  .col-sm-push-10 {
    left: 83.33333333%;
  }
  .col-sm-push-9 {
    left: 75%;
  }
  .col-sm-push-8 {
    left: 66.66666667%;
  }
  .col-sm-push-7 {
    left: 58.33333333%;
  }
  .col-sm-push-6 {
    left: 50%;
  }
  .col-sm-push-5 {
    left: 41.66666667%;
  }
  .col-sm-push-4 {
    left: 33.33333333%;
  }
  .col-sm-push-3 {
    left: 25%;
  }
  .col-sm-push-2 {
    left: 16.66666667%;
  }
  .col-sm-push-1 {
    left: 8.33333333%;
  }
  .col-sm-push-0 {
    left: auto;
  }
  .col-sm-offset-12 {
    margin-left: 100%;
  }
  .col-sm-offset-11 {
    margin-left: 91.66666667%;
  }
  .col-sm-offset-10 {
    margin-left: 83.33333333%;
  }
  .col-sm-offset-9 {
    margin-left: 75%;
  }
  .col-sm-offset-8 {
    margin-left: 66.66666667%;
  }
  .col-sm-offset-7 {
    margin-left: 58.33333333%;
  }
  .col-sm-offset-6 {
    margin-left: 50%;
  }
  .col-sm-offset-5 {
    margin-left: 41.66666667%;
  }
  .col-sm-offset-4 {
    margin-left: 33.33333333%;
  }
  .col-sm-offset-3 {
    margin-left: 25%;
  }
  .col-sm-offset-2 {
    margin-left: 16.66666667%;
  }
  .col-sm-offset-1 {
    margin-left: 8.33333333%;
  }
  .col-sm-offset-0 {
    margin-left: 0%;
  }
}
@media (min-width: 992px) {
  .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {
    float: left;
  }
  .col-md-12 {
    width: 100%;
  }
  .col-md-11 {
    width: 91.66666667%;
  }
  .col-md-10 {
    width: 83.33333333%;
  }
  .col-md-9 {
    width: 75%;
  }
  .col-md-8 {
    width: 66.66666667%;
  }
  .col-md-7 {
    width: 58.33333333%;
  }
  .col-md-6 {
    width: 50%;
  }
  .col-md-5 {
    width: 41.66666667%;
  }
  .col-md-4 {
    width: 33.33333333%;
  }
  .col-md-3 {
    width: 25%;
  }
  .col-md-2 {
    width: 16.66666667%;
  }
  .col-md-1 {
    width: 8.33333333%;
  }
  .col-md-pull-12 {
    right: 100%;
  }
  .col-md-pull-11 {
    right: 91.66666667%;
  }
  .col-md-pull-10 {
    right: 83.33333333%;
  }
  .col-md-pull-9 {
    right: 75%;
  }
  .col-md-pull-8 {
    right: 66.66666667%;
  }
  .col-md-pull-7 {
    right: 58.33333333%;
  }
  .col-md-pull-6 {
    right: 50%;
  }
  .col-md-pull-5 {
    right: 41.66666667%;
  }
  .col-md-pull-4 {
    right: 33.33333333%;
  }
  .col-md-pull-3 {
    right: 25%;
  }
  .col-md-pull-2 {
    right: 16.66666667%;
  }
  .col-md-pull-1 {
    right: 8.33333333%;
  }
  .col-md-pull-0 {
    right: auto;
  }
  .col-md-push-12 {
    left: 100%;
  }
  .col-md-push-11 {
    left: 91.66666667%;
  }
  .col-md-push-10 {
    left: 83.33333333%;
  }
  .col-md-push-9 {
    left: 75%;
  }
  .col-md-push-8 {
    left: 66.66666667%;
  }
  .col-md-push-7 {
    left: 58.33333333%;
  }
  .col-md-push-6 {
    left: 50%;
  }
  .col-md-push-5 {
    left: 41.66666667%;
  }
  .col-md-push-4 {
    left: 33.33333333%;
  }
  .col-md-push-3 {
    left: 25%;
  }
  .col-md-push-2 {
    left: 16.66666667%;
  }
  .col-md-push-1 {
    left: 8.33333333%;
  }
  .col-md-push-0 {
    left: auto;
  }
  .col-md-offset-12 {
    margin-left: 100%;
  }
  .col-md-offset-11 {
    margin-left: 91.66666667%;
  }
  .col-md-offset-10 {
    margin-left: 83.33333333%;
  }
  .col-md-offset-9 {
    margin-left: 75%;
  }
  .col-md-offset-8 {
    margin-left: 66.66666667%;
  }
  .col-md-offset-7 {
    margin-left: 58.33333333%;
  }
  .col-md-offset-6 {
    margin-left: 50%;
  }
  .col-md-offset-5 {
    margin-left: 41.66666667%;
  }
  .col-md-offset-4 {
    margin-left: 33.33333333%;
  }
  .col-md-offset-3 {
    margin-left: 25%;
  }
  .col-md-offset-2 {
    margin-left: 16.66666667%;
  }
  .col-md-offset-1 {
    margin-left: 8.33333333%;
  }
  .col-md-offset-0 {
    margin-left: 0%;
  }
}
@media (min-width: 1200px) {
  .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12 {
    float: left;
  }
  .col-lg-12 {
    width: 100%;
  }
  .col-lg-11 {
    width: 91.66666667%;
  }
  .col-lg-10 {
    width: 83.33333333%;
  }
  .col-lg-9 {
    width: 75%;
  }
  .col-lg-8 {
    width: 66.66666667%;
  }
  .col-lg-7 {
    width: 58.33333333%;
  }
  .col-lg-6 {
    width: 50%;
  }
  .col-lg-5 {
    width: 41.66666667%;
  }
  .col-lg-4 {
    width: 33.33333333%;
  }
  .col-lg-3 {
    width: 25%;
  }
  .col-lg-2 {
    width: 16.66666667%;
  }
  .col-lg-1 {
    width: 8.33333333%;
  }
  .col-lg-pull-12 {
    right: 100%;
  }
  .col-lg-pull-11 {
    right: 91.66666667%;
  }
  .col-lg-pull-10 {
    right: 83.33333333%;
  }
  .col-lg-pull-9 {
    right: 75%;
  }
  .col-lg-pull-8 {
    right: 66.66666667%;
  }
  .col-lg-pull-7 {
    right: 58.33333333%;
  }
  .col-lg-pull-6 {
    right: 50%;
  }
  .col-lg-pull-5 {
    right: 41.66666667%;
  }
  .col-lg-pull-4 {
    right: 33.33333333%;
  }
  .col-lg-pull-3 {
    right: 25%;
  }
  .col-lg-pull-2 {
    right: 16.66666667%;
  }
  .col-lg-pull-1 {
    right: 8.33333333%;
  }
  .col-lg-pull-0 {
    right: auto;
  }
  .col-lg-push-12 {
    left: 100%;
  }
  .col-lg-push-11 {
    left: 91.66666667%;
  }
  .col-lg-push-10 {
    left: 83.33333333%;
  }
  .col-lg-push-9 {
    left: 75%;
  }
  .col-lg-push-8 {
    left: 66.66666667%;
  }
  .col-lg-push-7 {
    left: 58.33333333%;
  }
  .col-lg-push-6 {
    left: 50%;
  }
  .col-lg-push-5 {
    left: 41.66666667%;
  }
  .col-lg-push-4 {
    left: 33.33333333%;
  }
  .col-lg-push-3 {
    left: 25%;
  }
  .col-lg-push-2 {
    left: 16.66666667%;
  }
  .col-lg-push-1 {
    left: 8.33333333%;
  }
  .col-lg-push-0 {
    left: auto;
  }
  .col-lg-offset-12 {
    margin-left: 100%;
  }
  .col-lg-offset-11 {
    margin-left: 91.66666667%;
  }
  .col-lg-offset-10 {
    margin-left: 83.33333333%;
  }
  .col-lg-offset-9 {
    margin-left: 75%;
  }
  .col-lg-offset-8 {
    margin-left: 66.66666667%;
  }
  .col-lg-offset-7 {
    margin-left: 58.33333333%;
  }
  .col-lg-offset-6 {
    margin-left: 50%;
  }
  .col-lg-offset-5 {
    margin-left: 41.66666667%;
  }
  .col-lg-offset-4 {
    margin-left: 33.33333333%;
  }
  .col-lg-offset-3 {
    margin-left: 25%;
  }
  .col-lg-offset-2 {
    margin-left: 16.66666667%;
  }
  .col-lg-offset-1 {
    margin-left: 8.33333333%;
  }
  .col-lg-offset-0 {
    margin-left: 0%;
  }
}
table {
  background-color: transparent;
}
caption {
  padding-top: 8px;
  padding-bottom: 8px;
  color: #777777;
  text-align: left;
}
th {
  text-align: left;
}
.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 18px;
}
.table > thead > tr > th,
.table > tbody > tr > th,
.table > tfoot > tr > th,
.table > thead > tr > td,
.table > tbody > tr > td,
.table > tfoot > tr > td {
  padding: 8px;
  line-height: 1.42857143;
  vertical-align: top;
  border-top: 1px solid #ddd;
}
.table > thead > tr > th {
  vertical-align: bottom;
  border-bottom: 2px solid #ddd;
}
.table > caption + thead > tr:first-child > th,
.table > colgroup + thead > tr:first-child > th,
.table > thead:first-child > tr:first-child > th,
.table > caption + thead > tr:first-child > td,
.table > colgroup + thead > tr:first-child > td,
.table > thead:first-child > tr:first-child > td {
  border-top: 0;
}
.table > tbody + tbody {
  border-top: 2px solid #ddd;
}
.table .table {
  background-color: #fff;
}
.table-condensed > thead > tr > th,
.table-condensed > tbody > tr > th,
.table-condensed > tfoot > tr > th,
.table-condensed > thead > tr > td,
.table-condensed > tbody > tr > td,
.table-condensed > tfoot > tr > td {
  padding: 5px;
}
.table-bordered {
  border: 1px solid #ddd;
}
.table-bordered > thead > tr > th,
.table-bordered > tbody > tr > th,
.table-bordered > tfoot > tr > th,
.table-bordered > thead > tr > td,
.table-bordered > tbody > tr > td,
.table-bordered > tfoot > tr > td {
  border: 1px solid #ddd;
}
.table-bordered > thead > tr > th,
.table-bordered > thead > tr > td {
  border-bottom-width: 2px;
}
.table-striped > tbody > tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}
.table-hover > tbody > tr:hover {
  background-color: #f5f5f5;
}
table col[class*="col-"] {
  position: static;
  float: none;
  display: table-column;
}
table td[class*="col-"],
table th[class*="col-"] {
  position: static;
  float: none;
  display: table-cell;
}
.table > thead > tr > td.active,
.table > tbody > tr > td.active,
.table > tfoot > tr > td.active,
.table > thead > tr > th.active,
.table > tbody > tr > th.active,
.table > tfoot > tr > th.active,
.table > thead > tr.active > td,
.table > tbody > tr.active > td,
.table > tfoot > tr.active > td,
.table > thead > tr.active > th,
.table > tbody > tr.active > th,
.table > tfoot > tr.active > th {
  background-color: #f5f5f5;
}
.table-hover > tbody > tr > td.active:hover,
.table-hover > tbody > tr > th.active:hover,
.table-hover > tbody > tr.active:hover > td,
.table-hover > tbody > tr:hover > .active,
.table-hover > tbody > tr.active:hover > th {
  background-color: #e8e8e8;
}
.table > thead > tr > td.success,
.table > tbody > tr > td.success,
.table > tfoot > tr > td.success,
.table > thead > tr > th.success,
.table > tbody > tr > th.success,
.table > tfoot > tr > th.success,
.table > thead > tr.success > td,
.table > tbody > tr.success > td,
.table > tfoot > tr.success > td,
.table > thead > tr.success > th,
.table > tbody > tr.success > th,
.table > tfoot > tr.success > th {
  background-color: #dff0d8;
}
.table-hover > tbody > tr > td.success:hover,
.table-hover > tbody > tr > th.success:hover,
.table-hover > tbody > tr.success:hover > td,
.table-hover > tbody > tr:hover > .success,
.table-hover > tbody > tr.success:hover > th {
  background-color: #d0e9c6;
}
.table > thead > tr > td.info,
.table > tbody > tr > td.info,
.table > tfoot > tr > td.info,
.table > thead > tr > th.info,
.table > tbody > tr > th.info,
.table > tfoot > tr > th.info,
.table > thead > tr.info > td,
.table > tbody > tr.info > td,
.table > tfoot > tr.info > td,
.table > thead > tr.info > th,
.table > tbody > tr.info > th,
.table > tfoot > tr.info > th {
  background-color: #d9edf7;
}
.table-hover > tbody > tr > td.info:hover,
.table-hover > tbody > tr > th.info:hover,
.table-hover > tbody > tr.info:hover > td,
.table-hover > tbody > tr:hover > .info,
.table-hover > tbody > tr.info:hover > th {
  background-color: #c4e3f3;
}
.table > thead > tr > td.warning,
.table > tbody > tr > td.warning,
.table > tfoot > tr > td.warning,
.table > thead > tr > th.warning,
.table > tbody > tr > th.warning,
.table > tfoot > tr > th.warning,
.table > thead > tr.warning > td,
.table > tbody > tr.warning > td,
.table > tfoot > tr.warning > td,
.table > thead > tr.warning > th,
.table > tbody > tr.warning > th,
.table > tfoot > tr.warning > th {
  background-color: #fcf8e3;
}
.table-hover > tbody > tr > td.warning:hover,
.table-hover > tbody > tr > th.warning:hover,
.table-hover > tbody > tr.warning:hover > td,
.table-hover > tbody > tr:hover > .warning,
.table-hover > tbody > tr.warning:hover > th {
  background-color: #faf2cc;
}
.table > thead > tr > td.danger,
.table > tbody > tr > td.danger,
.table > tfoot > tr > td.danger,
.table > thead > tr > th.danger,
.table > tbody > tr > th.danger,
.table > tfoot > tr > th.danger,
.table > thead > tr.danger > td,
.table > tbody > tr.danger > td,
.table > tfoot > tr.danger > td,
.table > thead > tr.danger > th,
.table > tbody > tr.danger > th,
.table > tfoot > tr.danger > th {
  background-color: #f2dede;
}
.table-hover > tbody > tr > td.danger:hover,
.table-hover > tbody > tr > th.danger:hover,
.table-hover > tbody > tr.danger:hover > td,
.table-hover > tbody > tr:hover > .danger,
.table-hover > tbody > tr.danger:hover > th {
  background-color: #ebcccc;
}
.table-responsive {
  overflow-x: auto;
  min-height: 0.01%;
}
@media screen and (max-width: 767px) {
  .table-responsive {
    width: 100%;
    margin-bottom: 13.5px;
    overflow-y: hidden;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    border: 1px solid #ddd;
  }
  .table-responsive > .table {
    margin-bottom: 0;
  }
  .table-responsive > .table > thead > tr > th,
  .table-responsive > .table > tbody > tr > th,
  .table-responsive > .table > tfoot > tr > th,
  .table-responsive > .table > thead > tr > td,
  .table-responsive > .table > tbody > tr > td,
  .table-responsive > .table > tfoot > tr > td {
    white-space: nowrap;
  }
  .table-responsive > .table-bordered {
    border: 0;
  }
  .table-responsive > .table-bordered > thead > tr > th:first-child,
  .table-responsive > .table-bordered > tbody > tr > th:first-child,
  .table-responsive > .table-bordered > tfoot > tr > th:first-child,
  .table-responsive > .table-bordered > thead > tr > td:first-child,
  .table-responsive > .table-bordered > tbody > tr > td:first-child,
  .table-responsive > .table-bordered > tfoot > tr > td:first-child {
    border-left: 0;
  }
  .table-responsive > .table-bordered > thead > tr > th:last-child,
  .table-responsive > .table-bordered > tbody > tr > th:last-child,
  .table-responsive > .table-bordered > tfoot > tr > th:last-child,
  .table-responsive > .table-bordered > thead > tr > td:last-child,
  .table-responsive > .table-bordered > tbody > tr > td:last-child,
  .table-responsive > .table-bordered > tfoot > tr > td:last-child {
    border-right: 0;
  }
  .table-responsive > .table-bordered > tbody > tr:last-child > th,
  .table-responsive > .table-bordered > tfoot > tr:last-child > th,
  .table-responsive > .table-bordered > tbody > tr:last-child > td,
  .table-responsive > .table-bordered > tfoot > tr:last-child > td {
    border-bottom: 0;
  }
}
fieldset {
  padding: 0;
  margin: 0;
  border: 0;
  min-width: 0;
}
legend {
  display: block;
  width: 100%;
  padding: 0;
  margin-bottom: 18px;
  font-size: 19.5px;
  line-height: inherit;
  color: #333333;
  border: 0;
  border-bottom: 1px solid #e5e5e5;
}
label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
  font-weight: bold;
}
input[type="search"] {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
input[type="radio"],
input[type="checkbox"] {
  margin: 4px 0 0;
  margin-top: 1px \9;
  line-height: normal;
}
input[type="file"] {
  display: block;
}
input[type="range"] {
  display: block;
  width: 100%;
}
select[multiple],
select[size] {
  height: auto;
}
input[type="file"]:focus,
input[type="radio"]:focus,
input[type="checkbox"]:focus {
  outline: 5px auto -webkit-focus-ring-color;
  outline-offset: -2px;
}
output {
  display: block;
  padding-top: 7px;
  font-size: 13px;
  line-height: 1.42857143;
  color: #555555;
}
.form-control {
  display: block;
  width: 100%;
  height: 32px;
  padding: 6px 12px;
  font-size: 13px;
  line-height: 1.42857143;
  color: #555555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 2px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}
.form-control:focus {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);
}
.form-control::-moz-placeholder {
  color: #999;
  opacity: 1;
}
.form-control:-ms-input-placeholder {
  color: #999;
}
.form-control::-webkit-input-placeholder {
  color: #999;
}
.form-control::-ms-expand {
  border: 0;
  background-color: transparent;
}
.form-control[disabled],
.form-control[readonly],
fieldset[disabled] .form-control {
  background-color: #eeeeee;
  opacity: 1;
}
.form-control[disabled],
fieldset[disabled] .form-control {
  cursor: not-allowed;
}
textarea.form-control {
  height: auto;
}
input[type="search"] {
  -webkit-appearance: none;
}
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  input[type="date"].form-control,
  input[type="time"].form-control,
  input[type="datetime-local"].form-control,
  input[type="month"].form-control {
    line-height: 32px;
  }
  input[type="date"].input-sm,
  input[type="time"].input-sm,
  input[type="datetime-local"].input-sm,
  input[type="month"].input-sm,
  .input-group-sm input[type="date"],
  .input-group-sm input[type="time"],
  .input-group-sm input[type="datetime-local"],
  .input-group-sm input[type="month"] {
    line-height: 30px;
  }
  input[type="date"].input-lg,
  input[type="time"].input-lg,
  input[type="datetime-local"].input-lg,
  input[type="month"].input-lg,
  .input-group-lg input[type="date"],
  .input-group-lg input[type="time"],
  .input-group-lg input[type="datetime-local"],
  .input-group-lg input[type="month"] {
    line-height: 45px;
  }
}
.form-group {
  margin-bottom: 15px;
}
.radio,
.checkbox {
  position: relative;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
.radio label,
.checkbox label {
  min-height: 18px;
  padding-left: 20px;
  margin-bottom: 0;
  font-weight: normal;
  cursor: pointer;
}
.radio input[type="radio"],
.radio-inline input[type="radio"],
.checkbox input[type="checkbox"],
.checkbox-inline input[type="checkbox"] {
  position: absolute;
  margin-left: -20px;
  margin-top: 4px \9;
}
.radio + .radio,
.checkbox + .checkbox {
  margin-top: -5px;
}
.radio-inline,
.checkbox-inline {
  position: relative;
  display: inline-block;
  padding-left: 20px;
  margin-bottom: 0;
  vertical-align: middle;
  font-weight: normal;
  cursor: pointer;
}
.radio-inline + .radio-inline,
.checkbox-inline + .checkbox-inline {
  margin-top: 0;
  margin-left: 10px;
}
input[type="radio"][disabled],
input[type="checkbox"][disabled],
input[type="radio"].disabled,
input[type="checkbox"].disabled,
fieldset[disabled] input[type="radio"],
fieldset[disabled] input[type="checkbox"] {
  cursor: not-allowed;
}
.radio-inline.disabled,
.checkbox-inline.disabled,
fieldset[disabled] .radio-inline,
fieldset[disabled] .checkbox-inline {
  cursor: not-allowed;
}
.radio.disabled label,
.checkbox.disabled label,
fieldset[disabled] .radio label,
fieldset[disabled] .checkbox label {
  cursor: not-allowed;
}
.form-control-static {
  padding-top: 7px;
  padding-bottom: 7px;
  margin-bottom: 0;
  min-height: 31px;
}
.form-control-static.input-lg,
.form-control-static.input-sm {
  padding-left: 0;
  padding-right: 0;
}
.input-sm {
  height: 30px;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 1px;
}
select.input-sm {
  height: 30px;
  line-height: 30px;
}
textarea.input-sm,
select[multiple].input-sm {
  height: auto;
}
.form-group-sm .form-control {
  height: 30px;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 1px;
}
.form-group-sm select.form-control {
  height: 30px;
  line-height: 30px;
}
.form-group-sm textarea.form-control,
.form-group-sm select[multiple].form-control {
  height: auto;
}
.form-group-sm .form-control-static {
  height: 30px;
  min-height: 30px;
  padding: 6px 10px;
  font-size: 12px;
  line-height: 1.5;
}
.input-lg {
  height: 45px;
  padding: 10px 16px;
  font-size: 17px;
  line-height: 1.3333333;
  border-radius: 3px;
}
select.input-lg {
  height: 45px;
  line-height: 45px;
}
textarea.input-lg,
select[multiple].input-lg {
  height: auto;
}
.form-group-lg .form-control {
  height: 45px;
  padding: 10px 16px;
  font-size: 17px;
  line-height: 1.3333333;
  border-radius: 3px;
}
.form-group-lg select.form-control {
  height: 45px;
  line-height: 45px;
}
.form-group-lg textarea.form-control,
.form-group-lg select[multiple].form-control {
  height: auto;
}
.form-group-lg .form-control-static {
  height: 45px;
  min-height: 35px;
  padding: 11px 16px;
  font-size: 17px;
  line-height: 1.3333333;
}
.has-feedback {
  position: relative;
}
.has-feedback .form-control {
  padding-right: 40px;
}
.form-control-feedback {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  display: block;
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  pointer-events: none;
}
.input-lg + .form-control-feedback,
.input-group-lg + .form-control-feedback,
.form-group-lg .form-control + .form-control-feedback {
  width: 45px;
  height: 45px;
  line-height: 45px;
}
.input-sm + .form-control-feedback,
.input-group-sm + .form-control-feedback,
.form-group-sm .form-control + .form-control-feedback {
  width: 30px;
  height: 30px;
  line-height: 30px;
}
.has-success .help-block,
.has-success .control-label,
.has-success .radio,
.has-success .checkbox,
.has-success .radio-inline,
.has-success .checkbox-inline,
.has-success.radio label,
.has-success.checkbox label,
.has-success.radio-inline label,
.has-success.checkbox-inline label {
  color: #3c763d;
}
.has-success .form-control {
  border-color: #3c763d;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
}
.has-success .form-control:focus {
  border-color: #2b542c;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #67b168;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #67b168;
}
.has-success .input-group-addon {
  color: #3c763d;
  border-color: #3c763d;
  background-color: #dff0d8;
}
.has-success .form-control-feedback {
  color: #3c763d;
}
.has-warning .help-block,
.has-warning .control-label,
.has-warning .radio,
.has-warning .checkbox,
.has-warning .radio-inline,
.has-warning .checkbox-inline,
.has-warning.radio label,
.has-warning.checkbox label,
.has-warning.radio-inline label,
.has-warning.checkbox-inline label {
  color: #8a6d3b;
}
.has-warning .form-control {
  border-color: #8a6d3b;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
}
.has-warning .form-control:focus {
  border-color: #66512c;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #c0a16b;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #c0a16b;
}
.has-warning .input-group-addon {
  color: #8a6d3b;
  border-color: #8a6d3b;
  background-color: #fcf8e3;
}
.has-warning .form-control-feedback {
  color: #8a6d3b;
}
.has-error .help-block,
.has-error .control-label,
.has-error .radio,
.has-error .checkbox,
.has-error .radio-inline,
.has-error .checkbox-inline,
.has-error.radio label,
.has-error.checkbox label,
.has-error.radio-inline label,
.has-error.checkbox-inline label {
  color: #a94442;
}
.has-error .form-control {
  border-color: #a94442;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
}
.has-error .form-control:focus {
  border-color: #843534;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483;
}
.has-error .input-group-addon {
  color: #a94442;
  border-color: #a94442;
  background-color: #f2dede;
}
.has-error .form-control-feedback {
  color: #a94442;
}
.has-feedback label ~ .form-control-feedback {
  top: 23px;
}
.has-feedback label.sr-only ~ .form-control-feedback {
  top: 0;
}
.help-block {
  display: block;
  margin-top: 5px;
  margin-bottom: 10px;
  color: #404040;
}
@media (min-width: 768px) {
  .form-inline .form-group {
    display: inline-block;
    margin-bottom: 0;
    vertical-align: middle;
  }
  .form-inline .form-control {
    display: inline-block;
    width: auto;
    vertical-align: middle;
  }
  .form-inline .form-control-static {
    display: inline-block;
  }
  .form-inline .input-group {
    display: inline-table;
    vertical-align: middle;
  }
  .form-inline .input-group .input-group-addon,
  .form-inline .input-group .input-group-btn,
  .form-inline .input-group .form-control {
    width: auto;
  }
  .form-inline .input-group > .form-control {
    width: 100%;
  }
  .form-inline .control-label {
    margin-bottom: 0;
    vertical-align: middle;
  }
  .form-inline .radio,
  .form-inline .checkbox {
    display: inline-block;
    margin-top: 0;
    margin-bottom: 0;
    vertical-align: middle;
  }
  .form-inline .radio label,
  .form-inline .checkbox label {
    padding-left: 0;
  }
  .form-inline .radio input[type="radio"],
  .form-inline .checkbox input[type="checkbox"] {
    position: relative;
    margin-left: 0;
  }
  .form-inline .has-feedback .form-control-feedback {
    top: 0;
  }
}
.form-horizontal .radio,
.form-horizontal .checkbox,
.form-horizontal .radio-inline,
.form-horizontal .checkbox-inline {
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 7px;
}
.form-horizontal .radio,
.form-horizontal .checkbox {
  min-height: 25px;
}
.form-horizontal .form-group {
  margin-left: 0px;
  margin-right: 0px;
}
@media (min-width: 768px) {
  .form-horizontal .control-label {
    text-align: right;
    margin-bottom: 0;
    padding-top: 7px;
  }
}
.form-horizontal .has-feedback .form-control-feedback {
  right: 0px;
}
@media (min-width: 768px) {
  .form-horizontal .form-group-lg .control-label {
    padding-top: 11px;
    font-size: 17px;
  }
}
@media (min-width: 768px) {
  .form-horizontal .form-group-sm .control-label {
    padding-top: 6px;
    font-size: 12px;
  }
}
.btn {
  display: inline-block;
  margin-bottom: 0;
  font-weight: normal;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 6px 12px;
  font-size: 13px;
  line-height: 1.42857143;
  border-radius: 2px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.btn:focus,
.btn:active:focus,
.btn.active:focus,
.btn.focus,
.btn:active.focus,
.btn.active.focus {
  outline: 5px auto -webkit-focus-ring-color;
  outline-offset: -2px;
}
.btn:hover,
.btn:focus,
.btn.focus {
  color: #333;
  text-decoration: none;
}
.btn:active,
.btn.active {
  outline: 0;
  background-image: none;
  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
}
.btn.disabled,
.btn[disabled],
fieldset[disabled] .btn {
  cursor: not-allowed;
  opacity: 0.65;
  filter: alpha(opacity=65);
  -webkit-box-shadow: none;
  box-shadow: none;
}
a.btn.disabled,
fieldset[disabled] a.btn {
  pointer-events: none;
}
.btn-default {
  color: #333;
  background-color: #fff;
  border-color: #ccc;
}
.btn-default:focus,
.btn-default.focus {
  color: #333;
  background-color: #e6e6e6;
  border-color: #8c8c8c;
}
.btn-default:hover {
  color: #333;
  background-color: #e6e6e6;
  border-color: #adadad;
}
.btn-default:active,
.btn-default.active,
.open > .dropdown-toggle.btn-default {
  color: #333;
  background-color: #e6e6e6;
  border-color: #adadad;
}
.btn-default:active:hover,
.btn-default.active:hover,
.open > .dropdown-toggle.btn-default:hover,
.btn-default:active:focus,
.btn-default.active:focus,
.open > .dropdown-toggle.btn-default:focus,
.btn-default:active.focus,
.btn-default.active.focus,
.open > .dropdown-toggle.btn-default.focus {
  color: #333;
  background-color: #d4d4d4;
  border-color: #8c8c8c;
}
.btn-default:active,
.btn-default.active,
.open > .dropdown-toggle.btn-default {
  background-image: none;
}
.btn-default.disabled:hover,
.btn-default[disabled]:hover,
fieldset[disabled] .btn-default:hover,
.btn-default.disabled:focus,
.btn-default[disabled]:focus,
fieldset[disabled] .btn-default:focus,
.btn-default.disabled.focus,
.btn-default[disabled].focus,
fieldset[disabled] .btn-default.focus {
  background-color: #fff;
  border-color: #ccc;
}
.btn-default .badge {
  color: #fff;
  background-color: #333;
}
.btn-primary {
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
}
.btn-primary:focus,
.btn-primary.focus {
  color: #fff;
  background-color: #286090;
  border-color: #122b40;
}
.btn-primary:hover {
  color: #fff;
  background-color: #286090;
  border-color: #204d74;
}
.btn-primary:active,
.btn-primary.active,
.open > .dropdown-toggle.btn-primary {
  color: #fff;
  background-color: #286090;
  border-color: #204d74;
}
.btn-primary:active:hover,
.btn-primary.active:hover,
.open > .dropdown-toggle.btn-primary:hover,
.btn-primary:active:focus,
.btn-primary.active:focus,
.open > .dropdown-toggle.btn-primary:focus,
.btn-primary:active.focus,
.btn-primary.active.focus,
.open > .dropdown-toggle.btn-primary.focus {
  color: #fff;
  background-color: #204d74;
  border-color: #122b40;
}
.btn-primary:active,
.btn-primary.active,
.open > .dropdown-toggle.btn-primary {
  background-image: none;
}
.btn-primary.disabled:hover,
.btn-primary[disabled]:hover,
fieldset[disabled] .btn-primary:hover,
.btn-primary.disabled:focus,
.btn-primary[disabled]:focus,
fieldset[disabled] .btn-primary:focus,
.btn-primary.disabled.focus,
.btn-primary[disabled].focus,
fieldset[disabled] .btn-primary.focus {
  background-color: #337ab7;
  border-color: #2e6da4;
}
.btn-primary .badge {
  color: #337ab7;
  background-color: #fff;
}
.btn-success {
  color: #fff;
  background-color: #5cb85c;
  border-color: #4cae4c;
}
.btn-success:focus,
.btn-success.focus {
  color: #fff;
  background-color: #449d44;
  border-color: #255625;
}
.btn-success:hover {
  color: #fff;
  background-color: #449d44;
  border-color: #398439;
}
.btn-success:active,
.btn-success.active,
.open > .dropdown-toggle.btn-success {
  color: #fff;
  background-color: #449d44;
  border-color: #398439;
}
.btn-success:active:hover,
.btn-success.active:hover,
.open > .dropdown-toggle.btn-success:hover,
.btn-success:active:focus,
.btn-success.active:focus,
.open > .dropdown-toggle.btn-success:focus,
.btn-success:active.focus,
.btn-success.active.focus,
.open > .dropdown-toggle.btn-success.focus {
  color: #fff;
  background-color: #398439;
  border-color: #255625;
}
.btn-success:active,
.btn-success.active,
.open > .dropdown-toggle.btn-success {
  background-image: none;
}
.btn-success.disabled:hover,
.btn-success[disabled]:hover,
fieldset[disabled] .btn-success:hover,
.btn-success.disabled:focus,
.btn-success[disabled]:focus,
fieldset[disabled] .btn-success:focus,
.btn-success.disabled.focus,
.btn-success[disabled].focus,
fieldset[disabled] .btn-success.focus {
  background-color: #5cb85c;
  border-color: #4cae4c;
}
.btn-success .badge {
  color: #5cb85c;
  background-color: #fff;
}
.btn-info {
  color: #fff;
  background-color: #5bc0de;
  border-color: #46b8da;
}
.btn-info:focus,
.btn-info.focus {
  color: #fff;
  background-color: #31b0d5;
  border-color: #1b6d85;
}
.btn-info:hover {
  color: #fff;
  background-color: #31b0d5;
  border-color: #269abc;
}
.btn-info:active,
.btn-info.active,
.open > .dropdown-toggle.btn-info {
  color: #fff;
  background-color: #31b0d5;
  border-color: #269abc;
}
.btn-info:active:hover,
.btn-info.active:hover,
.open > .dropdown-toggle.btn-info:hover,
.btn-info:active:focus,
.btn-info.active:focus,
.open > .dropdown-toggle.btn-info:focus,
.btn-info:active.focus,
.btn-info.active.focus,
.open > .dropdown-toggle.btn-info.focus {
  color: #fff;
  background-color: #269abc;
  border-color: #1b6d85;
}
.btn-info:active,
.btn-info.active,
.open > .dropdown-toggle.btn-info {
  background-image: none;
}
.btn-info.disabled:hover,
.btn-info[disabled]:hover,
fieldset[disabled] .btn-info:hover,
.btn-info.disabled:focus,
.btn-info[disabled]:focus,
fieldset[disabled] .btn-info:focus,
.btn-info.disabled.focus,
.btn-info[disabled].focus,
fieldset[disabled] .btn-info.focus {
  background-color: #5bc0de;
  border-color: #46b8da;
}
.btn-info .badge {
  color: #5bc0de;
  background-color: #fff;
}
.btn-warning {
  color: #fff;
  background-color: #f0ad4e;
  border-color: #eea236;
}
.btn-warning:focus,
.btn-warning.focus {
  color: #fff;
  background-color: #ec971f;
  border-color: #985f0d;
}
.btn-warning:hover {
  color: #fff;
  background-color: #ec971f;
  border-color: #d58512;
}
.btn-warning:active,
.btn-warning.active,
.open > .dropdown-toggle.btn-warning {
  color: #fff;
  background-color: #ec971f;
  border-color: #d58512;
}
.btn-warning:active:hover,
.btn-warning.active:hover,
.open > .dropdown-toggle.btn-warning:hover,
.btn-warning:active:focus,
.btn-warning.active:focus,
.open > .dropdown-toggle.btn-warning:focus,
.btn-warning:active.focus,
.btn-warning.active.focus,
.open > .dropdown-toggle.btn-warning.focus {
  color: #fff;
  background-color: #d58512;
  border-color: #985f0d;
}
.btn-warning:active,
.btn-warning.active,
.open > .dropdown-toggle.btn-warning {
  background-image: none;
}
.btn-warning.disabled:hover,
.btn-warning[disabled]:hover,
fieldset[disabled] .btn-warning:hover,
.btn-warning.disabled:focus,
.btn-warning[disabled]:focus,
fieldset[disabled] .btn-warning:focus,
.btn-warning.disabled.focus,
.btn-warning[disabled].focus,
fieldset[disabled] .btn-warning.focus {
  background-color: #f0ad4e;
  border-color: #eea236;
}
.btn-warning .badge {
  color: #f0ad4e;
  background-color: #fff;
}
.btn-danger {
  color: #fff;
  background-color: #d9534f;
  border-color: #d43f3a;
}
.btn-danger:focus,
.btn-danger.focus {
  color: #fff;
  background-color: #c9302c;
  border-color: #761c19;
}
.btn-danger:hover {
  color: #fff;
  background-color: #c9302c;
  border-color: #ac2925;
}
.btn-danger:active,
.btn-danger.active,
.open > .dropdown-toggle.btn-danger {
  color: #fff;
  background-color: #c9302c;
  border-color: #ac2925;
}
.btn-danger:active:hover,
.btn-danger.active:hover,
.open > .dropdown-toggle.btn-danger:hover,
.btn-danger:active:focus,
.btn-danger.active:focus,
.open > .dropdown-toggle.btn-danger:focus,
.btn-danger:active.focus,
.btn-danger.active.focus,
.open > .dropdown-toggle.btn-danger.focus {
  color: #fff;
  background-color: #ac2925;
  border-color: #761c19;
}
.btn-danger:active,
.btn-danger.active,
.open > .dropdown-toggle.btn-danger {
  background-image: none;
}
.btn-danger.disabled:hover,
.btn-danger[disabled]:hover,
fieldset[disabled] .btn-danger:hover,
.btn-danger.disabled:focus,
.btn-danger[disabled]:focus,
fieldset[disabled] .btn-danger:focus,
.btn-danger.disabled.focus,
.btn-danger[disabled].focus,
fieldset[disabled] .btn-danger.focus {
  background-color: #d9534f;
  border-color: #d43f3a;
}
.btn-danger .badge {
  color: #d9534f;
  background-color: #fff;
}
.btn-link {
  color: #337ab7;
  font-weight: normal;
  border-radius: 0;
}
.btn-link,
.btn-link:active,
.btn-link.active,
.btn-link[disabled],
fieldset[disabled] .btn-link {
  background-color: transparent;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.btn-link,
.btn-link:hover,
.btn-link:focus,
.btn-link:active {
  border-color: transparent;
}
.btn-link:hover,
.btn-link:focus {
  color: #23527c;
  text-decoration: underline;
  background-color: transparent;
}
.btn-link[disabled]:hover,
fieldset[disabled] .btn-link:hover,
.btn-link[disabled]:focus,
fieldset[disabled] .btn-link:focus {
  color: #777777;
  text-decoration: none;
}
.btn-lg,
.btn-group-lg > .btn {
  padding: 10px 16px;
  font-size: 17px;
  line-height: 1.3333333;
  border-radius: 3px;
}
.btn-sm,
.btn-group-sm > .btn {
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 1px;
}
.btn-xs,
.btn-group-xs > .btn {
  padding: 1px 5px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 1px;
}
.btn-block {
  display: block;
  width: 100%;
}
.btn-block + .btn-block {
  margin-top: 5px;
}
input[type="submit"].btn-block,
input[type="reset"].btn-block,
input[type="button"].btn-block {
  width: 100%;
}
.fade {
  opacity: 0;
  -webkit-transition: opacity 0.15s linear;
  -o-transition: opacity 0.15s linear;
  transition: opacity 0.15s linear;
}
.fade.in {
  opacity: 1;
}
.collapse {
  display: none;
}
.collapse.in {
  display: block;
}
tr.collapse.in {
  display: table-row;
}
tbody.collapse.in {
  display: table-row-group;
}
.collapsing {
  position: relative;
  height: 0;
  overflow: hidden;
  -webkit-transition-property: height, visibility;
  transition-property: height, visibility;
  -webkit-transition-duration: 0.35s;
  transition-duration: 0.35s;
  -webkit-transition-timing-function: ease;
  transition-timing-function: ease;
}
.caret {
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 2px;
  vertical-align: middle;
  border-top: 4px dashed;
  border-top: 4px solid \9;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
}
.dropup,
.dropdown {
  position: relative;
}
.dropdown-toggle:focus {
  outline: 0;
}
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  float: left;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  list-style: none;
  font-size: 13px;
  text-align: left;
  background-color: #fff;
  border: 1px solid #ccc;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  background-clip: padding-box;
}
.dropdown-menu.pull-right {
  right: 0;
  left: auto;
}
.dropdown-menu .divider {
  height: 1px;
  margin: 8px 0;
  overflow: hidden;
  background-color: #e5e5e5;
}
.dropdown-menu > li > a {
  display: block;
  padding: 3px 20px;
  clear: both;
  font-weight: normal;
  line-height: 1.42857143;
  color: #333333;
  white-space: nowrap;
}
.dropdown-menu > li > a:hover,
.dropdown-menu > li > a:focus {
  text-decoration: none;
  color: #262626;
  background-color: #f5f5f5;
}
.dropdown-menu > .active > a,
.dropdown-menu > .active > a:hover,
.dropdown-menu > .active > a:focus {
  color: #fff;
  text-decoration: none;
  outline: 0;
  background-color: #337ab7;
}
.dropdown-menu > .disabled > a,
.dropdown-menu > .disabled > a:hover,
.dropdown-menu > .disabled > a:focus {
  color: #777777;
}
.dropdown-menu > .disabled > a:hover,
.dropdown-menu > .disabled > a:focus {
  text-decoration: none;
  background-color: transparent;
  background-image: none;
  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);
  cursor: not-allowed;
}

.dropdown-backdrop {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 990;
}
.pull-right > .dropdown-menu {
  right: 0;
  left: auto;
}
.dropup .caret,
.navbar-fixed-bottom .dropdown .caret {
  border-top: 0;
  border-bottom: 4px dashed;
  border-bottom: 4px solid \9;
  content: "";
}

@media (min-width: 541px) {
  .navbar-right .dropdown-menu {
    left: auto;
    right: 0;
  }
  .navbar-right .dropdown-menu-left {
    left: 0;
    right: auto;
  }
}
.btn-group,
.btn-group-vertical {
  position: relative;
  display: inline-block;
  vertical-align: middle;
}
.btn-group > .btn,
.btn-group-vertical > .btn {
  position: relative;
  float: left;
}
.btn-group > .btn:hover,
.btn-group-vertical > .btn:hover,
.btn-group > .btn:focus,
.btn-group-vertical > .btn:focus,
.btn-group > .btn:active,
.btn-group-vertical > .btn:active,
.btn-group > .btn.active,
.btn-group-vertical > .btn.active {
  z-index: 2;
}
.
select.input-group-lg > .form-control,
select.input-group-lg > .input-group-addon,
select.input-group-lg > .input-group-btn > .btn {
  height: 45px;
  line-height: 45px;
}
textarea.input-group-lg > .form-control,
textarea.input-group-lg > .input-group-addon,
textarea.input-group-lg > .input-group-btn > .btn,
select[multiple].input-group-lg > .form-control,
select[multiple].input-group-lg > .input-group-addon,
select[multiple].input-group-lg > .input-group-btn > .btn {
  height: auto;
}
.input-group-sm > .form-control,
.input-group-sm > .input-group-addon,
.input-group-sm > .input-group-btn > .btn {
  height: 30px;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 1px;
}
select.input-group-sm > .form-control,
select.input-group-sm > .input-group-addon,
select.input-group-sm > .input-group-btn > .btn {
  height: 30px;
  line-height: 30px;
}
textarea.input-group-sm > .form-control,
textarea.input-group-sm > .input-group-addon,
textarea.input-group-sm > .input-group-btn > .btn,
select[multiple].input-group-sm > .form-control,
select[multiple].input-group-sm > .input-group-addon,
select[multiple].input-group-sm > .input-group-btn > .btn {
  height: auto;
}
.input-group-addon,
.input-group-btn,
.input-group .form-control {
  display: table-cell;
}
.input-group-addon:not(:first-child):not(:last-child),
.input-group-btn:not(:first-child):not(:last-child),
.input-group .form-control:not(:first-child):not(:last-child) {
  border-radius: 0;
}
.input-group-addon,
.input-group-btn {
  width: 1%;
  white-space: nowrap;
  vertical-align: middle;
}
.input-group-addon {
  padding: 6px 12px;
  font-size: 13px;
  font-weight: normal;
  line-height: 1;
  color: #555555;
  text-align: center;
  background-color: #eeeeee;
  border: 1px solid #ccc;
  border-radius: 2px;
}
.input-group-addon.input-sm {
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 1px;
}
.input-group-addon.input-lg {
  padding: 10px 16px;
  font-size: 17px;
  border-radius: 3px;
}
.input-group-addon input[type="radio"],
.input-group-addon input[type="checkbox"] {
  margin-top: 0;
}
.input-group .form-control:first-child,
.input-group-addon:first-child,
.input-group-btn:first-child > .btn,
.input-group-btn:first-child > .btn-group > .btn,
.input-group-btn:first-child > .dropdown-toggle,
.input-group-btn:last-child > .btn:not(:last-child):not(.dropdown-toggle),
.input-group-btn:last-child > .btn-group:not(:last-child) > .btn {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}
.input-group-addon:first-child {
  border-right: 0;
}
.input-group .form-control:last-child,
.input-group-addon:last-child,
.input-group-btn:last-child > .btn,
.input-group-btn:last-child > .btn-group > .btn,
.input-group-btn:last-child > .dropdown-toggle,
.input-group-btn:first-child > .btn:not(:first-child),
.input-group-btn:first-child > .btn-group:not(:first-child) > .btn {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.input-group-addon:last-child {
  border-left: 0;
}
.input-group-btn {
  position: relative;
  font-size: 0;
  white-space: nowrap;
}
.input-group-btn > .btn {
  position: relative;
}
.input-group-btn > .btn + .btn {
  margin-left: -1px;
}
.input-group-btn > .btn:hover,
.input-group-btn > .btn:focus,
.input-group-btn > .btn:active {
  z-index: 2;
}
.input-group-btn:first-child > .btn,
.input-group-btn:first-child > .btn-group {
  margin-right: -1px;
}
.input-group-btn:last-child > .btn,
.input-group-btn:last-child > .btn-group {
  z-index: 2;
  margin-left: -1px;
}
.nav {
  margin-bottom: 0;
  padding-left: 0;
  list-style: none;
}
.nav > li {
  position: relative;
  display: block;
}
.nav > li > a {
  position: relative;
  display: block;
  padding: 10px 15px;
}
.nav > li > a:hover,
.nav > li > a:focus {
  text-decoration: none;
  background-color: #eeeeee;
}
.nav > li.disabled > a {
  color: #777777;
}
.nav > li.disabled > a:hover,
.nav > li.disabled > a:focus {
  color: #777777;
  text-decoration: none;
  background-color: transparent;
  cursor: not-allowed;
}
.nav .open > a,
.nav .open > a:hover,
.nav .open > a:focus {
  background-color: #eeeeee;
  border-color: #337ab7;
}
.nav .nav-divider {
  height: 1px;
  margin: 8px 0;
  overflow: hidden;
  background-color: #e5e5e5;
}
.nav > li > a > img {
  max-width: none;
}
.nav-tabs {
  border-bottom: 1px solid #ddd;
}
.nav-tabs > li {
  float: left;
  margin-bottom: -1px;
}
.nav-tabs > li > a {
  margin-right: 2px;
  line-height: 1.42857143;
  border: 1px solid transparent;
  border-radius: 2px 2px 0 0;
}
.nav-tabs > li > a:hover {
  border-color: #eeeeee #eeeeee #ddd;
}
.nav-tabs > li.active > a,
.nav-tabs > li.active > a:hover,
.nav-tabs > li.active > a:focus {
  color: #555555;
  background-color: #fff;
  border: 1px solid #ddd;
  border-bottom-color: transparent;
  cursor: default;
}
.nav-tabs.nav-justified {
  width: 100%;
  border-bottom: 0;
}
.nav-tabs.nav-justified > li {
  float: none;
}
.nav-tabs.nav-justified > li > a {
  text-align: center;
  margin-bottom: 5px;
}
.nav-tabs.nav-justified > .dropdown .dropdown-menu {
  top: auto;
  left: auto;
}
@media (min-width: 768px) {
  .nav-tabs.nav-justified > li {
    display: table-cell;
    width: 1%;
  }
  .nav-tabs.nav-justified > li > a {
    margin-bottom: 0;
  }
}
.nav-tabs.nav-justified > li > a {
  margin-right: 0;
  border-radius: 2px;
}
.nav-tabs.nav-justified > .active > a,
.nav-tabs.nav-justified > .active > a:hover,
.nav-tabs.nav-justified > .active > a:focus {
  border: 1px solid #ddd;
}
@media (min-width: 768px) {
  .nav-tabs.nav-justified > li > a {
    border-bottom: 1px solid #ddd;
    border-radius: 2px 2px 0 0;
  }
  .nav-tabs.nav-justified > .active > a,
  .nav-tabs.nav-justified > .active > a:hover,
  .nav-tabs.nav-justified > .active > a:focus {
    border-bottom-color: #fff;
  }
}
.nav-pills > li {
  float: left;
}
.nav-pills > li > a {
  border-radius: 2px;
}
.nav-pills > li + li {
  margin-left: 2px;
}
.nav-pills > li.active > a,
.nav-pills > li.active > a:hover,
.nav-pills > li.active > a:focus {
  color: #fff;
  background-color: #337ab7;
}
.nav-stacked > li {
  float: none;
}
.nav-stacked > li + li {
  margin-top: 2px;
  margin-left: 0;
}
.nav-justified {
  width: 100%;
}
.nav-justified > li {
  float: none;
}
.nav-justified > li > a {
  text-align: center;
  margin-bottom: 5px;
}
.nav-justified > .dropdown .dropdown-menu {
  top: auto;
  left: auto;
}
@media (min-width: 768px) {
  .nav-justified > li {
    display: table-cell;
    width: 1%;
  }
  .nav-justified > li > a {
    margin-bottom: 0;
  }
}
.nav-tabs-justified {
  border-bottom: 0;
}
.nav-tabs-justified > li > a {
  margin-right: 0;
  border-radius: 2px;
}
.nav-tabs-justified > .active > a,
.nav-tabs-justified > .active > a:hover,
.nav-tabs-justified > .active > a:focus {
  border: 1px solid #ddd;
}
@media (min-width: 768px) {
  .nav-tabs-justified > li > a {
    border-bottom: 1px solid #ddd;
    border-radius: 2px 2px 0 0;
  }
  .nav-tabs-justified > .active > a,
  .nav-tabs-justified > .active > a:hover,
  .nav-tabs-justified > .active > a:focus {
    border-bottom-color: #fff;
  }
}
.tab-content > .tab-pane {
  display: none;
}
.tab-content > .active {
  display: block;
}
.nav-tabs .dropdown-menu {
  margin-top: -1px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}
.navbar {
  position: relative;
  min-height: 30px;
  margin-bottom: 18px;
  border: 1px solid transparent;
}
@media (min-width: 541px) {
  .navbar {
    border-radius: 2px;
  }
}
@media (min-width: 541px) {
  .navbar-header {
    float: left;
  }
}
.navbar-collapse {
  overflow-x: visible;
  padding-right: 0px;
  padding-left: 0px;
  border-top: 1px solid transparent;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
  -webkit-overflow-scrolling: touch;
}
.navbar-collapse.in {
  overflow-y: auto;
}
@media (min-width: 541px) {
  .navbar-collapse {
    width: auto;
    border-top: 0;
    box-shadow: none;
  }
  .navbar-collapse.collapse {
    display: block !important;
    height: auto !important;
    padding-bottom: 0;
    overflow: visible !important;
  }
  .navbar-collapse.in {
    overflow-y: visible;
  }
  .navbar-fixed-top .navbar-collapse,
  .navbar-static-top .navbar-collapse,
  .navbar-fixed-bottom .navbar-collapse {
    padding-left: 0;
    padding-right: 0;
  }
}
.navbar-fixed-top .navbar-collapse,
.navbar-fixed-bottom .navbar-collapse {
  max-height: 340px;
}
@media (max-device-width: 540px) and (orientation: landscape) {
  .navbar-fixed-top .navbar-collapse,
  .navbar-fixed-bottom .navbar-collapse {
    max-height: 200px;
  }
}
.container > .navbar-header,
.container-fluid > .navbar-header,
.container > .navbar-collapse,
.container-fluid > .navbar-collapse {
  margin-right: 0px;
  margin-left: 0px;
}
@media (min-width: 541px) {
  .container > .navbar-header,
  .container-fluid > .navbar-header,
  .container > .navbar-collapse,
  .container-fluid > .navbar-collapse {
    margin-right: 0;
    margin-left: 0;
  }
}
.navbar-static-top {
  z-index: 1000;
  border-width: 0 0 1px;
}
@media (min-width: 541px) {
  .navbar-static-top {
    border-radius: 0;
  }
}
.navbar-fixed-top,
.navbar-fixed-bottom {
  position: fixed;
  right: 0;
  left: 0;
  z-index: 1030;
}
@media (min-width: 541px) {
  .navbar-fixed-top,
  .navbar-fixed-bottom {
    border-radius: 0;
  }
}
.navbar-fixed-top {
  top: 0;
  border-width: 0 0 1px;
}
.navbar-fixed-bottom {
  bottom: 0;
  margin-bottom: 0;
  border-width: 1px 0 0;
}
.navbar-brand {
  float: left;
  padding: 6px 0px;
  font-size: 17px;
  line-height: 18px;
  height: 30px;
}
.navbar-brand:hover,
.navbar-brand:focus {
  text-decoration: none;
}
.navbar-brand > img {
  display: block;
}
@media (min-width: 541px) {
  .navbar > .container .navbar-brand,
  .navbar > .container-fluid .navbar-brand {
    margin-left: 0px;
  }
}
.navbar-toggle {
  position: relative;
  float: right;
  margin-right: 0px;
  padding: 9px 10px;
  margin-top: -2px;
  margin-bottom: -2px;
  background-color: transparent;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 2px;
}
.navbar-toggle:focus {
  outline: 0;
}
.navbar-toggle .icon-bar {
  display: block;
  width: 22px;
  height: 2px;
  border-radius: 1px;
}
.navbar-toggle .icon-bar + .icon-bar {
  margin-top: 4px;
}
@media (min-width: 541px) {
  .navbar-toggle {
    display: none;
  }
}
.navbar-nav {
  margin: 3px 0px;
}
.navbar-nav > li > a {
  padding-top: 10px;
  padding-bottom: 10px;
  line-height: 18px;
}
@media (max-width: 540px) {
  .navbar-nav .open .dropdown-menu {
    position: static;
    float: none;
    width: auto;
    margin-top: 0;
    background-color: transparent;
    border: 0;
    box-shadow: none;
  }
  .navbar-nav .open .dropdown-menu > li > a,
  .navbar-nav .open .dropdown-menu .dropdown-header {
    padding: 5px 15px 5px 25px;
  }
  .navbar-nav .open .dropdown-menu > li > a {
    line-height: 18px;
  }
  .navbar-nav .open .dropdown-menu > li > a:hover,
  .navbar-nav .open .dropdown-menu > li > a:focus {
    background-image: none;
  }
}
@media (min-width: 541px) {
  .navbar-nav {
    float: left;
    margin: 0;
  }
  .navbar-nav > li {
    float: left;
  }
  .navbar-nav > li > a {
    padding-top: 6px;
    padding-bottom: 6px;
  }
}
.navbar-form {
  margin-left: 0px;
  margin-right: 0px;
  padding: 10px 0px;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1);
  margin-top: -1px;
  margin-bottom: -1px;
}
@media (min-width: 768px) {
  .navbar-form .form-group {
    display: inline-block;
    margin-bottom: 0;
    vertical-align: middle;
  }
  .navbar-form .form-control {
    display: inline-block;
    width: auto;
    vertical-align: middle;
  }
  .navbar-form .form-control-static {
    display: inline-block;
  }
  .navbar-form .input-group {
    display: inline-table;
    vertical-align: middle;
  }
  .navbar-form .input-group .input-group-addon,
  .navbar-form .input-group .input-group-btn,
  .navbar-form .input-group .form-control {
    width: auto;
  }
  .navbar-form .input-group > .form-control {
    width: 100%;
  }
  .navbar-form .control-label {
    margin-bottom: 0;
    vertical-align: middle;
  }
  .navbar-form .radio,
  .navbar-form .checkbox {
    display: inline-block;
    margin-top: 0;
    margin-bottom: 0;
    vertical-align: middle;
  }
  .navbar-form .radio label,
  .navbar-form .checkbox label {
    padding-left: 0;
  }
  .navbar-form .radio input[type="radio"],
  .navbar-form .checkbox input[type="checkbox"] {
    position: relative;
    margin-left: 0;
  }
  .navbar-form .has-feedback .form-control-feedback {
    top: 0;
  }
}
@media (max-width: 540px) {
  .navbar-form .form-group {
    margin-bottom: 5px;
  }
  .navbar-form .form-group:last-child {
    margin-bottom: 0;
  }
}
@media (min-width: 541px) {
  .navbar-form {
    width: auto;
    border: 0;
    margin-left: 0;
    margin-right: 0;
    padding-top: 0;
    padding-bottom: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
}
.navbar-nav > li > .dropdown-menu {
  margin-top: 0;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}
.navbar-fixed-bottom .navbar-nav > li > .dropdown-menu {
  margin-bottom: 0;
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.navbar-btn {
  margin-top: -1px;
  margin-bottom: -1px;
}
.navbar-btn.btn-sm {
  margin-top: 0px;
  margin-bottom: 0px;
}
.navbar-btn.btn-xs {
  margin-top: 4px;
  margin-bottom: 4px;
}
.navbar-text {
  margin-top: 6px;
  margin-bottom: 6px;
}
@media (min-width: 541px) {
  .navbar-text {
    float: left;
    margin-left: 0px;
    margin-right: 0px;
  }
}
@media (min-width: 541px) {
  .navbar-left {
    float: left !important;
    float: left;
  }
  .navbar-right {
    float: right !important;
    float: right;
    margin-right: 0px;
  }
  .navbar-right ~ .navbar-right {
    margin-right: 0;
  }
}
.navbar-default {
  background-color: #f8f8f8;
  border-color: #e7e7e7;
}
.navbar-default .navbar-brand {
  color: #777;
}
.navbar-default .navbar-brand:hover,
.navbar-default .navbar-brand:focus {
  color: #5e5e5e;
  background-color: transparent;
}
.navbar-default .navbar-text {
  color: #777;
}
.navbar-default .navbar-nav > li > a {
  color: #777;
}
.navbar-default .navbar-nav > li > a:hover,
.navbar-default .navbar-nav > li > a:focus {
  color: #333;
  background-color: transparent;
}
.navbar-default .navbar-nav > .active > a,
.navbar-default .navbar-nav > .active > a:hover,
.navbar-default .navbar-nav > .active > a:focus {
  color: #555;
  background-color: #e7e7e7;
}
.navbar-default .navbar-nav > .disabled > a,
.navbar-default .navbar-nav > .disabled > a:hover,
.navbar-default .navbar-nav > .disabled > a:focus {
  color: #ccc;
  background-color: transparent;
}
.navbar-default .navbar-toggle {
  border-color: #ddd;
}
.navbar-default .navbar-toggle:hover,
.navbar-default .navbar-toggle:focus {
  background-color: #ddd;
}
.navbar-default .navbar-toggle .icon-bar {
  background-color: #888;
}
.navbar-default .navbar-collapse,
.navbar-default .navbar-form {
  border-color: #e7e7e7;
}
.navbar-default .navbar-nav > .open > a,
.navbar-default .navbar-nav > .open > a:hover,
.navbar-default .navbar-nav > .open > a:focus {
  background-color: #e7e7e7;
  color: #555;
}
@media (max-width: 540px) {
  .navbar-default .navbar-nav .open .dropdown-menu > li > a {
    color: #777;
  }
  .navbar-default .navbar-nav .open .dropdown-menu > li > a:hover,
  .navbar-default .navbar-nav .open .dropdown-menu > li > a:focus {
    color: #333;
    background-color: transparent;
  }
  .navbar-default .navbar-nav .open .dropdown-menu > .active > a,
  .navbar-default .navbar-nav .open .dropdown-menu > .active > a:hover,
  .navbar-default .navbar-nav .open .dropdown-menu > .active > a:focus {
    color: #555;
    background-color: #e7e7e7;
  }
  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a,
  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:hover,
  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:focus {
    color: #ccc;
    background-color: transparent;
  }
}
.navbar-default .navbar-link {
  color: #777;
}
.navbar-default .navbar-link:hover {
  color: #333;
}
.navbar-default .btn-link {
  color: #777;
}
.navbar-default .btn-link:hover,
.navbar-default .btn-link:focus {
  color: #333;
}
.navbar-default .btn-link[disabled]:hover,
fieldset[disabled] .navbar-default .btn-link:hover,
.navbar-default .btn-link[disabled]:focus,
fieldset[disabled] .navbar-default .btn-link:focus {
  color: #ccc;
}
.navbar-inverse {
  background-color: #222;
  border-color: #080808;
}
.navbar-inverse .navbar-brand {
  color: #9d9d9d;
}
.navbar-inverse .navbar-brand:hover,
.navbar-inverse .navbar-brand:focus {
  color: #fff;
  background-color: transparent;
}
.navbar-inverse .navbar-text {
  color: #9d9d9d;
}
.navbar-inverse .navbar-nav > li > a {
  color: #9d9d9d;
}
.navbar-inverse .navbar-nav > li > a:hover,
.navbar-inverse .navbar-nav > li > a:focus {
  color: #fff;
  background-color: transparent;
}
.navbar-inverse .navbar-nav > .active > a,
.navbar-inverse .navbar-nav > .active > a:hover,
.navbar-inverse .navbar-nav > .active > a:focus {
  color: #fff;
  background-color: #080808;
}
.navbar-inverse .navbar-nav > .disabled > a,
.navbar-inverse .navbar-nav > .disabled > a:hover,
.navbar-inverse .navbar-nav > .disabled > a:focus {
  color: #444;
  background-color: transparent;
}
.navbar-inverse .navbar-toggle {
  border-color: #333;
}
.navbar-inverse .navbar-toggle:hover,
.navbar-inverse .navbar-toggle:focus {
  background-color: #333;
}
.navbar-inverse .navbar-toggle .icon-bar {
  background-color: #fff;
}
.navbar-inverse .navbar-collapse,
.navbar-inverse .navbar-form {
  border-color: #101010;
}
.navbar-inverse .navbar-nav > .open > a,
.navbar-inverse .navbar-nav > .open > a:hover,
.navbar-inverse .navbar-nav > .open > a:focus {
  background-color: #080808;
  color: #fff;
}
@media (max-width: 540px) {
  .navbar-inverse .navbar-nav .open .dropdown-menu > .dropdown-header {
    border-color: #080808;
  }
  .navbar-inverse .navbar-nav .open .dropdown-menu .divider {
    background-color: #080808;
  }
  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a {
    color: #9d9d9d;
  }
  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:hover,
  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:focus {
    color: #fff;
    background-color: transparent;
  }
  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a,
  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:hover,
  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:focus {
    color: #fff;
    background-color: #080808;
  }
  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a,
  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:hover,
  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:focus {
    color: #444;
    background-color: transparent;
  }
}
.navbar-inverse .navbar-link {
  color: #9d9d9d;
}
.navbar-inverse .navbar-link:hover {
  color: #fff;
}
.navbar-inverse .btn-link {
  color: #9d9d9d;
}
.navbar-inverse .btn-link:hover,
.navbar-inverse .btn-link:focus {
  color: #fff;
}
.navbar-inverse .btn-link[disabled]:hover,
fieldset[disabled] .navbar-inverse .btn-link:hover,
.navbar-inverse .btn-link[disabled]:focus,
fieldset[disabled] .navbar-inverse .btn-link:focus {
  color: #444;
}
.breadcrumb {
  padding: 8px 15px;
  margin-bottom: 18px;
  list-style: none;
  background-color: #f5f5f5;
  border-radius: 2px;
}
.breadcrumb > li {
  display: inline-block;
}
.breadcrumb > li + li:before {
  content: "/\00a0";
  padding: 0 5px;
  color: #5e5e5e;
}
.breadcrumb > .active {
  color: #777777;
}
.pagination {
  display: inline-block;
  padding-left: 0;
  margin: 18px 0;
  border-radius: 2px;
}
.pagination > li {
  display: inline;
}
.pagination > li > a,
.pagination > li > span {
  position: relative;
  float: left;
  padding: 6px 12px;
  line-height: 1.42857143;
  text-decoration: none;
  color: #337ab7;
  background-color: #fff;
  border: 1px solid #ddd;
  margin-left: -1px;
}
.pagination > li:first-child > a,
.pagination > li:first-child > span {
  margin-left: 0;
  border-bottom-left-radius: 2px;
  border-top-left-radius: 2px;
}
.pagination > li:last-child > a,
.pagination > li:last-child > span {
  border-bottom-right-radius: 2px;
  border-top-right-radius: 2px;
}
.pagination > li > a:hover,
.pagination > li > span:hover,
.pagination > li > a:focus,
.pagination > li > span:focus {
  z-index: 2;
  color: #23527c;
  background-color: #eeeeee;
  border-color: #ddd;
}
.pagination > .active > a,
.pagination > .active > span,
.pagination > .active > a:hover,
.pagination > .active > span:hover,
.pagination > .active > a:focus,
.pagination > .active > span:focus {
  z-index: 3;
  color: #fff;
  background-color: #337ab7;
  border-color: #337ab7;
  cursor: default;
}
.pagination > .disabled > span,
.pagination > .disabled > span:hover,
.pagination > .disabled > span:focus,
.pagination > .disabled > a,
.pagination > .disabled > a:hover,
.pagination > .disabled > a:focus {
  color: #777777;
  background-color: #fff;
  border-color: #ddd;
  cursor: not-allowed;
}
.pagination-lg > li > a,
.pagination-lg > li > span {
  padding: 10px 16px;
  font-size: 17px;
  line-height: 1.3333333;
}
.pagination-lg > li:first-child > a,
.pagination-lg > li:first-child > span {
  border-bottom-left-radius: 3px;
  border-top-left-radius: 3px;
}
.pagination-lg > li:last-child > a,
.pagination-lg > li:last-child > span {
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;
}
.pagination-sm > li > a,
.pagination-sm > li > span {
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
}
.pagination-sm > li:first-child > a,
.pagination-sm > li:first-child > span {
  border-bottom-left-radius: 1px;
  border-top-left-radius: 1px;
}
.pagination-sm > li:last-child > a,
.pagination-sm > li:last-child > span {
  border-bottom-right-radius: 1px;
  border-top-right-radius: 1px;
}
.pager {
  padding-left: 0;
  margin: 18px 0;
  list-style: none;
  text-align: center;
}
.pager li {
  display: inline;
}
.pager li > a,
.pager li > span {
  display: inline-block;
  padding: 5px 14px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 15px;
}
.pager li > a:hover,
.pager li > a:focus {
  text-decoration: none;
  background-color: #eeeeee;
}
.pager .next > a,
.pager .next > span {
  float: right;
}
.pager .previous > a,
.pager .previous > span {
  float: left;
}
.pager .disabled > a,
.pager .disabled > a:hover,
.pager .disabled > a:focus,
.pager .disabled > span {
  color: #777777;
  background-color: #fff;
  cursor: not-allowed;
}
.label {
  display: inline;
  padding: .2em .6em .3em;
  font-size: 75%;
  font-weight: bold;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: .25em;
}
a.label:hover,
a.label:focus {
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}
.label:empty {
  display: none;
}
.btn .label {
  position: relative;
  top: -1px;
}
.label-default {
  background-color: #777777;
}
.label-default[href]:hover,
.label-default[href]:focus {
  background-color: #5e5e5e;
}
.label-primary {
  background-color: #337ab7;
}
.label-primary[href]:hover,
.label-primary[href]:focus {
  background-color: #286090;
}
.label-success {
  background-color: #5cb85c;
}
.label-success[href]:hover,
.label-success[href]:focus {
  background-color: #449d44;
}
.label-info {
  background-color: #5bc0de;
}
.label-info[href]:hover,
.label-info[href]:focus {
  background-color: #31b0d5;
}
.label-warning {
  background-color: #f0ad4e;
}
.label-warning[href]:hover,
.label-warning[href]:focus {
  background-color: #ec971f;
}
.label-danger {
  background-color: #d9534f;
}
.label-danger[href]:hover,
.label-danger[href]:focus {
  background-color: #c9302c;
}
.badge {
  display: inline-block;
  min-width: 10px;
  padding: 3px 7px;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  line-height: 1;
  vertical-align: middle;
  white-space: nowrap;
  text-align: center;
  background-color: #777777;
  border-radius: 10px;
}
.badge:empty {
  display: none;
}
.btn .badge {
  position: relative;
  top: -1px;
}
.btn-xs .badge,
.btn-group-xs > .btn .badge {
  top: 0;
  padding: 1px 5px;
}
a.badge:hover,
a.badge:focus {
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}
.list-group-item.active > .badge,
.nav-pills > .active > a > .badge {
  color: #337ab7;
  background-color: #fff;
}
.list-group-item > .badge {
  float: right;
}
.list-group-item > .badge + .badge {
  margin-right: 5px;
}
.nav-pills > li > a > .badge {
  margin-left: 3px;
}
.jumbotron {
  padding-top: 30px;
  padding-bottom: 30px;
  margin-bottom: 30px;
  color: inherit;
  background-color: #eeeeee;
}
.jumbotron h1,
.jumbotron .h1 {
  color: inherit;
}
.jumbotron p {
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: 200;
}
.jumbotron > hr {
  border-top-color: #d5d5d5;
}
.container .jumbotron,
.container-fluid .jumbotron {
  border-radius: 3px;
  padding-left: 0px;
  padding-right: 0px;
}
.jumbotron .container {
  max-width: 100%;
}
@media screen and (min-width: 768px) {
  .jumbotron {
    padding-top: 48px;
    padding-bottom: 48px;
  }
  .container .jumbotron,
  .container-fluid .jumbotron {
    padding-left: 60px;
    padding-right: 60px;
  }
  .jumbotron h1,
  .jumbotron .h1 {
    font-size: 59px;
  }
}
.thumbnail {
  display: block;
  padding: 4px;
  margin-bottom: 18px;
  line-height: 1.42857143;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 2px;
  -webkit-transition: border 0.2s ease-in-out;
  -o-transition: border 0.2s ease-in-out;
  transition: border 0.2s ease-in-out;
}
.thumbnail > img,
.thumbnail a > img {
  margin-left: auto;
  margin-right: auto;
}
a.thumbnail:hover,
a.thumbnail:focus,
a.thumbnail.active {
  border-color: #337ab7;
}
.thumbnail .caption {
  padding: 9px;
  color: #000;
}
.alert {
  padding: 15px;
  margin-bottom: 18px;
  border: 1px solid transparent;
  border-radius: 2px;
}
.alert h4 {
  margin-top: 0;
  color: inherit;
}
.alert .alert-link {
  font-weight: bold;
}
.alert > p,
.alert > ul {
  margin-bottom: 0;
}
.alert > p + p {
  margin-top: 5px;
}
.alert-dismissable,
.alert-dismissible {
  padding-right: 35px;
}
.alert-dismissable .close,
.alert-dismissible .close {
  position: relative;
  top: -2px;
  right: -21px;
  color: inherit;
}
.alert-success {
  background-color: #dff0d8;
  border-color: #d6e9c6;
  color: #3c763d;
}
.alert-success hr {
  border-top-color: #c9e2b3;
}
.alert-success .alert-link {
  color: #2b542c;
}
.alert-info {
  background-color: #d9edf7;
  border-color: #bce8f1;
  color: #31708f;
}
.alert-info hr {
  border-top-color: #a6e1ec;
}
.alert-info .alert-link {
  color: #245269;
}
.alert-warning {
  background-color: #fcf8e3;
  border-color: #faebcc;
  color: #8a6d3b;
}
.alert-warning hr {
  border-top-color: #f7e1b5;
}
.alert-warning .alert-link {
  color: #66512c;
}
.alert-danger {
  background-color: #f2dede;
  border-color: #ebccd1;
  color: #a94442;
}
.alert-danger hr {
  border-top-color: #e4b9c0;
}
.alert-danger .alert-link {
  color: #843534;
}
@-webkit-keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }
  to {
    background-position: 0 0;
  }
}
@keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }
  to {
    background-position: 0 0;
  }
}
.progress {
  overflow: hidden;
  height: 18px;
  margin-bottom: 18px;
  background-color: #f5f5f5;
  border-radius: 2px;
  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}
.progress-bar {
  float: left;
  width: 0%;
  height: 100%;
  font-size: 12px;
  line-height: 18px;
  color: #fff;
  text-align: center;
  background-color: #337ab7;
  -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
  -webkit-transition: width 0.6s ease;
  -o-transition: width 0.6s ease;
  transition: width 0.6s ease;
}
.progress-striped .progress-bar,
.progress-bar-striped {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-size: 40px 40px;
}
.progress.active .progress-bar,
.progress-bar.active {
  -webkit-animation: progress-bar-stripes 2s linear infinite;
  -o-animation: progress-bar-stripes 2s linear infinite;
  animation: progress-bar-stripes 2s linear infinite;
}
.progress-bar-success {
  background-color: #5cb85c;
}
.progress-striped .progress-bar-success {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
}
.progress-bar-info {
  background-color: #5bc0de;
}
.progress-striped .progress-bar-info {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
}
.progress-bar-warning {
  background-color: #f0ad4e;
}
.progress-striped .progress-bar-warning {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
}
.progress-bar-danger {
  background-color: #d9534f;
}
.progress-striped .progress-bar-danger {
  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
}
.media {
  margin-top: 15px;
}
.media:first-child {
  margin-top: 0;
}
.media,
.media-body {
  zoom: 1;
  overflow: hidden;
}
.media-body {
  width: 10000px;
}
.media-object {
  display: block;
}
.media-object.img-thumbnail {
  max-width: none;
}
.media-right,
.media > .pull-right {
  padding-left: 10px;
}
.media-left,
.media > .pull-left {
  padding-right: 10px;
}
.media-left,
.media-right,
.media-body {
  display: table-cell;
  vertical-align: top;
}
.media-middle {
  vertical-align: middle;
}
.media-bottom {
  vertical-align: bottom;
}
.media-heading {
  margin-top: 0;
  margin-bottom: 5px;
}
.media-list {
  padding-left: 0;
  list-style: none;
}
.list-group {
  margin-bottom: 20px;
  padding-left: 0;
}
.list-group-item {
  position: relative;
  display: block;
  padding: 10px 15px;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid #ddd;
}
.list-group-item:first-child {
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
}
.list-group-item:last-child {
  margin-bottom: 0;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
}
a.list-group-item,
button.list-group-item {
  color: #555;
}
a.list-group-item .list-group-item-heading,
button.list-group-item .list-group-item-heading {
  color: #333;
}
a.list-group-item:hover,
button.list-group-item:hover,
a.list-group-item:focus,
button.list-group-item:focus {
  text-decoration: none;
  color: #555;
  background-color: #f5f5f5;
}
button.list-group-item {
  width: 100%;
  text-align: left;
}
.list-group-item.disabled,
.list-group-item.disabled:hover,
.list-group-item.disabled:focus {
  background-color: #eeeeee;
  color: #777777;
  cursor: not-allowed;
}
.list-group-item.disabled .list-group-item-heading,
.list-group-item.disabled:hover .list-group-item-heading,
.list-group-item.disabled:focus .list-group-item-heading {
  color: inherit;
}
.list-group-item.disabled .list-group-item-text,
.list-group-item.disabled:hover .list-group-item-text,
.list-group-item.disabled:focus .list-group-item-text {
  color: #777777;
}
.list-group-item.active,
.list-group-item.active:hover,
.list-group-item.active:focus {
  z-index: 2;
  color: #fff;
  background-color: #337ab7;
  border-color: #337ab7;
}
.list-group-item.active .list-group-item-heading,
.list-group-item.active:hover .list-group-item-heading,
.list-group-item.active:focus .list-group-item-heading,
.list-group-item.active .list-group-item-heading > small,
.list-group-item.active:hover .list-group-item-heading > small,
.list-group-item.active:focus .list-group-item-heading > small,
.list-group-item.active .list-group-item-heading > .small,
.list-group-item.active:hover .list-group-item-heading > .small,
.list-group-item.active:focus .list-group-item-heading > .small {
  color: inherit;
}
.list-group-item.active .list-group-item-text,
.list-group-item.active:hover .list-group-item-text,
.list-group-item.active:focus .list-group-item-text {
  color: #c7ddef;
}
.list-group-item-success {
  color: #3c763d;
  background-color: #dff0d8;
}
a.list-group-item-success,
button.list-group-item-success {
  color: #3c763d;
}
a.list-group-item-success .list-group-item-heading,
button.list-group-item-success .list-group-item-heading {
  color: inherit;
}
a.list-group-item-success:hover,
button.list-group-item-success:hover,
a.list-group-item-success:focus,
button.list-group-item-success:focus {
  color: #3c763d;
  background-color: #d0e9c6;
}
a.list-group-item-success.active,
button.list-group-item-success.active,
a.list-group-item-success.active:hover,
button.list-group-item-success.active:hover,
a.list-group-item-success.active:focus,
button.list-group-item-success.active:focus {
  color: #fff;
  background-color: #3c763d;
  border-color: #3c763d;
}
.list-group-item-info {
  color: #31708f;
  background-color: #d9edf7;
}
a.list-group-item-info,
button.list-group-item-info {
  color: #31708f;
}
a.list-group-item-info .list-group-item-heading,
button.list-group-item-info .list-group-item-heading {
  color: inherit;
}
a.list-group-item-info:hover,
button.list-group-item-info:hover,
a.list-group-item-info:focus,
button.list-group-item-info:focus {
  color: #31708f;
  background-color: #c4e3f3;
}
a.list-group-item-info.active,
button.list-group-item-info.active,
a.list-group-item-info.active:hover,
button.list-group-item-info.active:hover,
a.list-group-item-info.active:focus,
button.list-group-item-info.active:focus {
  color: #fff;
  background-color: #31708f;
  border-color: #31708f;
}
.list-group-item-warning {
  color: #8a6d3b;
  background-color: #fcf8e3;
}
a.list-group-item-warning,
button.list-group-item-warning {
  color: #8a6d3b;
}
a.list-group-item-warning .list-group-item-heading,
button.list-group-item-warning .list-group-item-heading {
  color: inherit;
}
a.list-group-item-warning:hover,
button.list-group-item-warning:hover,
a.list-group-item-warning:focus,
button.list-group-item-warning:focus {
  color: #8a6d3b;
  background-color: #faf2cc;
}
a.list-group-item-warning.active,
button.list-group-item-warning.active,
a.list-group-item-warning.active:hover,
button.list-group-item-warning.active:hover,
a.list-group-item-warning.active:focus,
button.list-group-item-warning.active:focus {
  color: #fff;
  background-color: #8a6d3b;
  border-color: #8a6d3b;
}
.list-group-item-danger {
  color: #a94442;
  background-color: #f2dede;
}
a.list-group-item-danger,
button.list-group-item-danger {
  color: #a94442;
}
a.list-group-item-danger .list-group-item-heading,
button.list-group-item-danger .list-group-item-heading {
  color: inherit;
}
a.list-group-item-danger:hover,
button.list-group-item-danger:hover,
a.list-group-item-danger:focus,
button.list-group-item-danger:focus {
  color: #a94442;
  background-color: #ebcccc;
}
a.list-group-item-danger.active,
button.list-group-item-danger.active,
a.list-group-item-danger.active:hover,
button.list-group-item-danger.active:hover,
a.list-group-item-danger.active:focus,
button.list-group-item-danger.active:focus {
  color: #fff;
  background-color: #a94442;
  border-color: #a94442;
}
.list-group-item-heading {
  margin-top: 0;
  margin-bottom: 5px;
}
.list-group-item-text {
  margin-bottom: 0;
  line-height: 1.3;
}
.panel {
  margin-bottom: 18px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 2px;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}
.panel-body {
  padding: 15px;
}
.panel-heading {
  padding: 10px 15px;
  border-bottom: 1px solid transparent;
  border-top-right-radius: 1px;
  border-top-left-radius: 1px;
}
.panel-heading > .dropdown .dropdown-toggle {
  color: inherit;
}
.panel-title {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 15px;
  color: inherit;
}
.panel-title > a,
.panel-title > small,
.panel-title > .small,
.panel-title > small > a,
.panel-title > .small > a {
  color: inherit;
}
.panel-footer {
  padding: 10px 15px;
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
  border-bottom-right-radius: 1px;
  border-bottom-left-radius: 1px;
}
.panel > .list-group,
.panel > .panel-collapse > .list-group {
  margin-bottom: 0;
}
.panel > .list-group .list-group-item,
.panel > .panel-collapse > .list-group .list-group-item {
  border-width: 1px 0;
  border-radius: 0;
}
.panel > .list-group:first-child .list-group-item:first-child,
.panel > .panel-collapse > .list-group:first-child .list-group-item:first-child {
  border-top: 0;
  border-top-right-radius: 1px;
  border-top-left-radius: 1px;
}
.panel > .list-group:last-child .list-group-item:last-child,
.panel > .panel-collapse > .list-group:last-child .list-group-item:last-child {
  border-bottom: 0;
  border-bottom-right-radius: 1px;
  border-bottom-left-radius: 1px;
}
.panel > .panel-heading + .panel-collapse > .list-group .list-group-item:first-child {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}
.panel-heading + .list-group .list-group-item:first-child {
  border-top-width: 0;
}
.list-group + .panel-footer {
  border-top-width: 0;
}
.panel > .table,
.panel > .table-responsive > .table,
.panel > .panel-collapse > .table {
  margin-bottom: 0;
}
.panel > .table caption,
.panel > .table-responsive > .table caption,
.panel > .panel-collapse > .table caption {
  padding-left: 15px;
  padding-right: 15px;
}
.panel > .table:first-child,
.panel > .table-responsive:first-child > .table:first-child {
  border-top-right-radius: 1px;
  border-top-left-radius: 1px;
}
.panel > .table:first-child > thead:first-child > tr:first-child,
.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child,
.panel > .table:first-child > tbody:first-child > tr:first-child,
.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child {
  border-top-left-radius: 1px;
  border-top-right-radius: 1px;
}
.panel > .table:first-child > thead:first-child > tr:first-child td:first-child,
.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:first-child,
.panel > .table:first-child > tbody:first-child > tr:first-child td:first-child,
.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:first-child,
.panel > .table:first-child > thead:first-child > tr:first-child th:first-child,
.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:first-child,
.panel > .table:first-child > tbody:first-child > tr:first-child th:first-child,
.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:first-child {
  border-top-left-radius: 1px;
}
.panel > .table:first-child > thead:first-child > tr:first-child td:last-child,
.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:last-child,
.panel > .table:first-child > tbody:first-child > tr:first-child td:last-child,
.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:last-child,
.panel > .table:first-child > thead:first-child > tr:first-child th:last-child,
.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:last-child,
.panel > .table:first-child > tbody:first-child > tr:first-child th:last-child,
.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:last-child {
  border-top-right-radius: 1px;
}
.panel > .table:last-child,
.panel > .table-responsive:last-child > .table:last-child {
  border-bottom-right-radius: 1px;
  border-bottom-left-radius: 1px;
}
.panel > .table:last-child > tbody:last-child > tr:last-child,
.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child,
.panel > .table:last-child > tfoot:last-child > tr:last-child,
.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child {
  border-bottom-left-radius: 1px;
  border-bottom-right-radius: 1px;
}
.panel > .table:last-child > tbody:last-child > tr:last-child td:first-child,
.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:first-child,
.panel > .table:last-child > tfoot:last-child > tr:last-child td:first-child,
.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:first-child,
.panel > .table:last-child > tbody:last-child > tr:last-child th:first-child,
.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:first-child,
.panel > .table:last-child > tfoot:last-child > tr:last-child th:first-child,
.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:first-child {
  border-bottom-left-radius: 1px;
}
.panel > .table:last-child > tbody:last-child > tr:last-child td:last-child,
.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:last-child,
.panel > .table:last-child > tfoot:last-child > tr:last-child td:last-child,
.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:last-child,
.panel > .table:last-child > tbody:last-child > tr:last-child th:last-child,
.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:last-child,
.panel > .table:last-child > tfoot:last-child > tr:last-child th:last-child,
.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:last-child {
  border-bottom-right-radius: 1px;
}
.panel > .panel-body + .table,
.panel > .panel-body + .table-responsive,
.panel > .table + .panel-body,
.panel > .table-responsive + .panel-body {
  border-top: 1px solid #ddd;
}
.panel > .table > tbody:first-child > tr:first-child th,
.panel > .table > tbody:first-child > tr:first-child td {
  border-top: 0;
}
.panel > .table-bordered,
.panel > .table-responsive > .table-bordered {
  border: 0;
}
.panel > .table-bordered > thead > tr > th:first-child,
.panel > .table-responsive > .table-bordered > thead > tr > th:first-child,
.panel > .table-bordered > tbody > tr > th:first-child,
.panel > .table-responsive > .table-bordered > tbody > tr > th:first-child,
.panel > .table-bordered > tfoot > tr > th:first-child,
.panel > .table-responsive > .table-bordered > tfoot > tr > th:first-child,
.panel > .table-bordered > thead > tr > td:first-child,
.panel > .table-responsive > .table-bordered > thead > tr > td:first-child,
.panel > .table-bordered > tbody > tr > td:first-child,
.panel > .table-responsive > .table-bordered > tbody > tr > td:first-child,
.panel > .table-bordered > tfoot > tr > td:first-child,
.panel > .table-responsive > .table-bordered > tfoot > tr > td:first-child {
  border-left: 0;
}
.panel > .table-bordered > thead > tr > th:last-child,
.panel > .table-responsive > .table-bordered > thead > tr > th:last-child,
.panel > .table-bordered > tbody > tr > th:last-child,
.panel > .table-responsive > .table-bordered > tbody > tr > th:last-child,
.panel > .table-bordered > tfoot > tr > th:last-child,
.panel > .table-responsive > .table-bordered > tfoot > tr > th:last-child,
.panel > .table-bordered > thead > tr > td:last-child,
.panel > .table-responsive > .table-bordered > thead > tr > td:last-child,
.panel > .table-bordered > tbody > tr > td:last-child,
.panel > .table-responsive > .table-bordered > tbody > tr > td:last-child,
.panel > .table-bordered > tfoot > tr > td:last-child,
.panel > .table-responsive > .table-bordered > tfoot > tr > td:last-child {
  border-right: 0;
}
.panel > .table-bordered > thead > tr:first-child > td,
.panel > .table-responsive > .table-bordered > thead > tr:first-child > td,
.panel > .table-bordered > tbody > tr:first-child > td,
.panel > .table-responsive > .table-bordered > tbody > tr:first-child > td,
.panel > .table-bordered > thead > tr:first-child > th,
.panel > .table-responsive > .table-bordered > thead > tr:first-child > th,
.panel > .table-bordered > tbody > tr:first-child > th,
.panel > .table-responsive > .table-bordered > tbody > tr:first-child > th {
  border-bottom: 0;
}
.panel > .table-bordered > tbody > tr:last-child > td,
.panel > .table-responsive > .table-bordered > tbody > tr:last-child > td,
.panel > .table-bordered > tfoot > tr:last-child > td,
.panel > .table-responsive > .table-bordered > tfoot > tr:last-child > td,
.panel > .table-bordered > tbody > tr:last-child > th,
.panel > .table-responsive > .table-bordered > tbody > tr:last-child > th,
.panel > .table-bordered > tfoot > tr:last-child > th,
.panel > .table-responsive > .table-bordered > tfoot > tr:last-child > th {
  border-bottom: 0;
}
.panel > .table-responsive {
  border: 0;
  margin-bottom: 0;
}
.panel-group {
  margin-bottom: 18px;
}
.panel-group .panel {
  margin-bottom: 0;
  border-radius: 2px;
}
.panel-group .panel + .panel {
  margin-top: 5px;
}
.panel-group .panel-heading {
  border-bottom: 0;
}
.panel-group .panel-heading + .panel-collapse > .panel-body,
.panel-group .panel-heading + .panel-collapse > .list-group {
  border-top: 1px solid #ddd;
}
.panel-group .panel-footer {
  border-top: 0;
}
.panel-group .panel-footer + .panel-collapse .panel-body {
  border-bottom: 1px solid #ddd;
}
.panel-default {
  border-color: #ddd;
}
.panel-default > .panel-heading {
  color: #333333;
  background-color: #f5f5f5;
  border-color: #ddd;
}
.panel-default > .panel-heading + .panel-collapse > .panel-body {
  border-top-color: #ddd;
}
.panel-default > .panel-heading .badge {
  color: #f5f5f5;
  background-color: #333333;
}
.panel-default > .panel-footer + .panel-collapse > .panel-body {
  border-bottom-color: #ddd;
}
.panel-primary {
  border-color: #337ab7;
}
.panel-primary > .panel-heading {
  color: #fff;
  background-color: #337ab7;
  border-color: #337ab7;
}
.panel-primary > .panel-heading + .panel-collapse > .panel-body {
  border-top-color: #337ab7;
}
.panel-primary > .panel-heading .badge {
  color: #337ab7;
  background-color: #fff;
}
.panel-primary > .panel-footer + .panel-collapse > .panel-body {
  border-bottom-color: #337ab7;
}
.panel-success {
  border-color: #d6e9c6;
}
.panel-success > .panel-heading {
  color: #3c763d;
  background-color: #dff0d8;
  border-color: #d6e9c6;
}
.panel-success > .panel-heading + .panel-collapse > .panel-body {
  border-top-color: #d6e9c6;
}
.panel-success > .panel-heading .badge {
  color: #dff0d8;
  background-color: #3c763d;
}
.panel-success > .panel-footer + .panel-collapse > .panel-body {
  border-bottom-color: #d6e9c6;
}
.panel-info {
  border-color: #bce8f1;
}
.panel-info > .panel-heading {
  color: #31708f;
  background-color: #d9edf7;
  border-color: #bce8f1;
}
.panel-info > .panel-heading + .panel-collapse > .panel-body {
  border-top-color: #bce8f1;
}
.panel-info > .panel-heading .badge {
  color: #d9edf7;
  background-color: #31708f;
}
.panel-info > .panel-footer + .panel-collapse > .panel-body {
  border-bottom-color: #bce8f1;
}
.panel-warning {
  border-color: #faebcc;
}
.panel-warning > .panel-heading {
  color: #8a6d3b;
  background-color: #fcf8e3;
  border-color: #faebcc;
}
.panel-warning > .panel-heading + .panel-collapse > .panel-body {
  border-top-color: #faebcc;
}
.panel-warning > .panel-heading .badge {
  color: #fcf8e3;
  background-color: #8a6d3b;
}
.panel-warning > .panel-footer + .panel-collapse > .panel-body {
  border-bottom-color: #faebcc;
}
.panel-danger {
  border-color: #ebccd1;
}
.panel-danger > .panel-heading {
  color: #a94442;
  background-color: #f2dede;
  border-color: #ebccd1;
}
.panel-danger > .panel-heading + .panel-collapse > .panel-body {
  border-top-color: #ebccd1;
}
.panel-danger > .panel-heading .badge {
  color: #f2dede;
  background-color: #a94442;
}
.panel-danger > .panel-footer + .panel-collapse > .panel-body {
  border-bottom-color: #ebccd1;
}
.embed-responsive {
  position: relative;
  display: block;
  height: 0;
  padding: 0;
  overflow: hidden;
}
.embed-responsive .embed-responsive-item,
.embed-responsive iframe,
.embed-responsive embed,
.embed-responsive object,
.embed-responsive video {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  border: 0;
}
.embed-responsive-16by9 {
  padding-bottom: 56.25%;
}
.embed-responsive-4by3 {
  padding-bottom: 75%;
}
.well {
  min-height: 20px;
  padding: 19px;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  border: 1px solid #e3e3e3;
  border-radius: 2px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
}
.well blockquote {
  border-color: #ddd;
  border-color: rgba(0, 0, 0, 0.15);
}
.well-lg {
  padding: 24px;
  border-radius: 3px;
}
.well-sm {
  padding: 9px;
  border-radius: 1px;
}
.close {
  float: right;
  font-size: 19.5px;
  font-weight: bold;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.2;
  filter: alpha(opacity=20);
}
.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
  opacity: 0.5;
  filter: alpha(opacity=50);
}
button.close {
  padding: 0;
  cursor: pointer;
  background: transparent;
  border: 0;
  -webkit-appearance: none;
}
.modal-open {
  overflow: hidden;
}
.modal {
  display: none;
  overflow: hidden;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1050;
  -webkit-overflow-scrolling: touch;
  outline: 0;
}
.modal.fade .modal-dialog {
  -webkit-transform: translate(0, -25%);
  -ms-transform: translate(0, -25%);
  -o-transform: translate(0, -25%);
  transform: translate(0, -25%);
  -webkit-transition: -webkit-transform 0.3s ease-out;
  -moz-transition: -moz-transform 0.3s ease-out;
  -o-transition: -o-transform 0.3s ease-out;
  transition: transform 0.3s ease-out;
}
.modal.in .modal-dialog {
  -webkit-transform: translate(0, 0);
  -ms-transform: translate(0, 0);
  -o-transform: translate(0, 0);
  transform: translate(0, 0);
}
.modal-open .modal {
  overflow-x: hidden;
  overflow-y: auto;
}
.modal-dialog {
  position: relative;
  width: auto;
  margin: 10px;
}
.modal-content {
  position: relative;
  background-color: #fff;
  border: 1px solid #999;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
  background-clip: padding-box;
  outline: 0;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1040;
  background-color: #000;
}
.modal-backdrop.fade {
  opacity: 0;
  filter: alpha(opacity=0);
}
.modal-backdrop.in {
  opacity: 0.5;
  filter: alpha(opacity=50);
}
.modal-header {
  padding: 15px;
  border-bottom: 1px solid #e5e5e5;
}
.modal-header .close {
  margin-top: -2px;
}
.modal-title {
  margin: 0;
  line-height: 1.42857143;
}
.modal-body {
  position: relative;
  padding: 15px;
}
.modal-footer {
  padding: 15px;
  text-align: right;
  border-top: 1px solid #e5e5e5;
}
.modal-footer .btn + .btn {
  margin-left: 5px;
  margin-bottom: 0;
}
.modal-footer .btn-group .btn + .btn {
  margin-left: -1px;
}
.modal-footer .btn-block + .btn-block {
  margin-left: 0;
}
.modal-scrollbar-measure {
  position: absolute;
  top: -9999px;
  width: 50px;
  height: 50px;
  overflow: scroll;
}
@media (min-width: 768px) {
  .modal-dialog {
    width: 600px;
    margin: 30px auto;
  }
  .modal-content {
    -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  }
  .modal-sm {
    width: 300px;
  }
}
@media (min-width: 992px) {
  .modal-lg {
    width: 900px;
  }
}
.tooltip {
  position: absolute;
  z-index: 1070;
  display: block;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  letter-spacing: normal;
  line-break: auto;
  line-height: 1.42857143;
  text-align: left;
  text-align: start;
  text-decoration: none;
  text-shadow: none;
  text-transform: none;
  white-space: normal;
  word-break: normal;
  word-spacing: normal;
  word-wrap: normal;
  font-size: 12px;
  opacity: 0;
  filter: alpha(opacity=0);
}
.tooltip.in {
  opacity: 0.9;
  filter: alpha(opacity=90);
}
.tooltip.top {
  margin-top: -3px;
  padding: 5px 0;
}
.tooltip.right {
  margin-left: 3px;
  padding: 0 5px;
}
.tooltip.bottom {
  margin-top: 3px;
  padding: 5px 0;
}
.tooltip.left {
  margin-left: -3px;
  padding: 0 5px;
}
.tooltip-inner {
  max-width: 200px;
  padding: 3px 8px;
  color: #fff;
  text-align: center;
  background-color: #000;
  border-radius: 2px;
}
.tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}
.tooltip.top .tooltip-arrow {
  bottom: 0;
  left: 50%;
  margin-left: -5px;
  border-width: 5px 5px 0;
  border-top-color: #000;
}
.tooltip.top-left .tooltip-arrow {
  bottom: 0;
  right: 5px;
  margin-bottom: -5px;
  border-width: 5px 5px 0;
  border-top-color: #000;
}
.tooltip.top-right .tooltip-arrow {
  bottom: 0;
  left: 5px;
  margin-bottom: -5px;
  border-width: 5px 5px 0;
  border-top-color: #000;
}
.tooltip.right .tooltip-arrow {
  top: 50%;
  left: 0;
  margin-top: -5px;
  border-width: 5px 5px 5px 0;
  border-right-color: #000;
}
.tooltip.left .tooltip-arrow {
  top: 50%;
  right: 0;
  margin-top: -5px;
  border-width: 5px 0 5px 5px;
  border-left-color: #000;
}
.tooltip.bottom .tooltip-arrow {
  top: 0;
  left: 50%;
  margin-left: -5px;
  border-width: 0 5px 5px;
  border-bottom-color: #000;
}
.tooltip.bottom-left .tooltip-arrow {
  top: 0;
  right: 5px;
  margin-top: -5px;
  border-width: 0 5px 5px;
  border-bottom-color: #000;
}
.tooltip.bottom-right .tooltip-arrow {
  top: 0;
  left: 5px;
  margin-top: -5px;
  border-width: 0 5px 5px;
  border-bottom-color: #000;
}
.popover {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1060;
  display: none;
  max-width: 276px;
  padding: 1px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  letter-spacing: normal;
  line-break: auto;
  line-height: 1.42857143;
  text-align: left;
  text-align: start;
  text-decoration: none;
  text-shadow: none;
  text-transform: none;
  white-space: normal;
  word-break: normal;
  word-spacing: normal;
  word-wrap: normal;
  font-size: 13px;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ccc;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}
.popover.top {
  margin-top: -10px;
}
.popover.right {
  margin-left: 10px;
}
.popover.bottom {
  margin-top: 10px;
}
.popover.left {
  margin-left: -10px;
}
.popover-title {
  margin: 0;
  padding: 8px 14px;
  font-size: 13px;
  background-color: #f7f7f7;
  border-bottom: 1px solid #ebebeb;
  border-radius: 2px 2px 0 0;
}
.popover-content {
  padding: 9px 14px;
}
.popover > .arrow,
.popover > .arrow:after {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}
.popover > .arrow {
  border-width: 11px;
}
.popover > .arrow:after {
  border-width: 10px;
  content: "";
}
.popover.top > .arrow {
  left: 50%;
  margin-left: -11px;
  border-bottom-width: 0;
  border-top-color: #999999;
  border-top-color: rgba(0, 0, 0, 0.25);
  bottom: -11px;
}
.popover.top > .arrow:after {
  content: " ";
  bottom: 1px;
  margin-left: -10px;
  border-bottom-width: 0;
  border-top-color: #fff;
}
.popover.right > .arrow {
  top: 50%;
  left: -11px;
  margin-top: -11px;
  border-left-width: 0;
  border-right-color: #999999;
  border-right-color: rgba(0, 0, 0, 0.25);
}
.popover.right > .arrow:after {
  content: " ";
  left: 1px;
  bottom: -10px;
  border-left-width: 0;
  border-right-color: #fff;
}
.popover.bottom > .arrow {
  left: 50%;
  margin-left: -11px;
  border-top-width: 0;
  border-bottom-color: #999999;
  border-bottom-color: rgba(0, 0, 0, 0.25);
  top: -11px;
}
.popover.bottom > .arrow:after {
  content: " ";
  top: 1px;
  margin-left: -10px;
  border-top-width: 0;
  border-bottom-color: #fff;
}
.popover.left > .arrow {
  top: 50%;
  right: -11px;
  margin-top: -11px;
  border-right-width: 0;
  border-left-color: #999999;
  border-left-color: rgba(0, 0, 0, 0.25);
}
.popover.left > .arrow:after {
  content: " ";
  right: 1px;
  border-right-width: 0;
  border-left-color: #fff;
  bottom: -10px;
}
.carousel {
  position: relative;
}
.carousel-inner {
  position: relative;
  overflow: hidden;
  width: 100%;
}
.carousel-inner > .item {
  display: none;
  position: relative;
  -webkit-transition: 0.6s ease-in-out left;
  -o-transition: 0.6s ease-in-out left;
  transition: 0.6s ease-in-out left;
}
.carousel-inner > .item > img,
.carousel-inner > .item > a > img {
  line-height: 1;
}
@media all and (transform-3d), (-webkit-transform-3d) {
  .carousel-inner > .item {
    -webkit-transition: -webkit-transform 0.6s ease-in-out;
    -moz-transition: -moz-transform 0.6s ease-in-out;
    -o-transition: -o-transform 0.6s ease-in-out;
    transition: transform 0.6s ease-in-out;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-perspective: 1000px;
    -moz-perspective: 1000px;
    perspective: 1000px;
  }
  .carousel-inner > .item.next,
  .carousel-inner > .item.active.right {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    left: 0;
  }
  .carousel-inner > .item.prev,
  .carousel-inner > .item.active.left {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
    left: 0;
  }
  .carousel-inner > .item.next.left,
  .carousel-inner > .item.prev.right,
  .carousel-inner > .item.active {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    left: 0;
  }
}
.carousel-inner > .active,
.carousel-inner > .next,
.carousel-inner > .prev {
  display: block;
}
.carousel-inner > .active {
  left: 0;
}
.carousel-inner > .next,
.carousel-inner > .prev {
  position: absolute;
  top: 0;
  width: 100%;
}
.carousel-inner > .next {
  left: 100%;
}
.carousel-inner > .prev {
  left: -100%;
}
.carousel-inner > .next.left,
.carousel-inner > .prev.right {
  left: 0;
}
.carousel-inner > .active.left {
  left: -100%;
}
.carousel-inner > .active.right {
  left: 100%;
}
.carousel-control {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 15%;
  opacity: 0.5;
  filter: alpha(opacity=50);
  font-size: 20px;
  color: #fff;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
  background-color: rgba(0, 0, 0, 0);
}
.carousel-control.left {
  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);
  background-image: -o-linear-gradient(left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);
  background-repeat: repeat-x;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1);
}
.carousel-control.right {
  left: auto;
  right: 0;
  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);
  background-image: -o-linear-gradient(left, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);
  background-repeat: repeat-x;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1);
}
.carousel-control:hover,
.carousel-control:focus {
  outline: 0;
  color: #fff;
  text-decoration: none;
  opacity: 0.9;
  filter: alpha(opacity=90);
}
.carousel-control .icon-prev,
.carousel-control .icon-next,
.carousel-control .glyphicon-chevron-left,
.carousel-control .glyphicon-chevron-right {
  position: absolute;
  top: 50%;
  margin-top: -10px;
  z-index: 5;
  display: inline-block;
}
.carousel-control .icon-prev,
.carousel-control .glyphicon-chevron-left {
  left: 50%;
  margin-left: -10px;
}
.carousel-control .icon-next,
.carousel-control .glyphicon-chevron-right {
  right: 50%;
  margin-right: -10px;
}
.carousel-control .icon-prev,
.carousel-control .icon-next {
  width: 20px;
  height: 20px;
  line-height: 1;
  font-family: serif;
}
.carousel-control .icon-prev:before {
  content: '\2039';
}
.carousel-control .icon-next:before {
  content: '\203a';
}
.carousel-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  z-index: 15;
  width: 60%;
  margin-left: -30%;
  padding-left: 0;
  list-style: none;
  text-align: center;
}
.carousel-indicators li {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 1px;
  text-indent: -999px;
  border: 1px solid #fff;
  border-radius: 10px;
  cursor: pointer;
  background-color: #000 \9;
  background-color: rgba(0, 0, 0, 0);
}
.carousel-indicators .active {
  margin: 0;
  width: 12px;
  height: 12px;
  background-color: #fff;
}
.carousel-caption {
  position: absolute;
  left: 15%;
  right: 15%;
  bottom: 20px;
  z-index: 10;
  padding-top: 20px;
  padding-bottom: 20px;
  color: #fff;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
}
.carousel-caption .btn {
  text-shadow: none;
}
@media screen and (min-width: 768px) {
  .carousel-control .glyphicon-chevron-left,
  .carousel-control .glyphicon-chevron-right,
  .carousel-control .icon-prev,
  .carousel-control .icon-next {
    width: 30px;
    height: 30px;
    margin-top: -10px;
    font-size: 30px;
  }
  .carousel-control .glyphicon-chevron-left,
  .carousel-control .icon-prev {
    margin-left: -10px;
  }
  .carousel-control .glyphicon-chevron-right,
  .carousel-control .icon-next {
    margin-right: -10px;
  }
  .carousel-caption {
    left: 20%;
    right: 20%;
    padding-bottom: 30px;
  }
  .carousel-indicators {
    bottom: 20px;
  }
}
.clearfix:before,
.clearfix:after,
.dl-horizontal dd:before,
.dl-horizontal dd:after,
.container:before,
.container:after,
.container-fluid:before,
.container-fluid:after,
.row:before,
.row:after,
.form-horizontal .form-group:before,
.form-horizontal .form-group:after,
.btn-toolbar:before,
.btn-toolbar:after,
.btn-group-vertical > .btn-group:before,
.btn-group-vertical > .btn-group:after,
.nav:before,
.nav:after,
.navbar:before,
.navbar:after,
.navbar-header:before,
.navbar-header:after,
.navbar-collapse:before,
.navbar-collapse:after,
.pager:before,
.pager:after,
.panel-body:before,
.panel-body:after,
.modal-header:before,
.modal-header:after,
.modal-footer:before,
.modal-footer:after,
.item_buttons:before,
.item_buttons:after {
  content: " ";
  display: table;
}
.clearfix:after,
.dl-horizontal dd:after,
.container:after,
.container-fluid:after,
.row:after,
.form-horizontal .form-group:after,
.btn-toolbar:after,
.btn-group-vertical > .btn-group:after,
.nav:after,
.navbar:after,
.navbar-header:after,
.navbar-collapse:after,
.pager:after,
.panel-body:after,
.modal-header:after,
.modal-footer:after,
.item_buttons:after {
  clear: both;
}
.center-block {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.pull-right {
  float: right !important;
}
.pull-left {
  float: left !important;
}
.hide {
  display: none !important;
}
.show {
  display: block !important;
}
.invisible {
  visibility: hidden;
}
.text-hide {
  font: 0/0 a;
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  border: 0;
}
.hidden {
  display: none !important;
}
.affix {
  position: fixed;
}
@-ms-viewport {
  width: device-width;
}
.visible-xs,
.visible-sm,
.visible-md,
.visible-lg {
  display: none !important;
}
.visible-xs-block,
.visible-xs-inline,
.visible-xs-inline-block,
.visible-sm-block,
.visible-sm-inline,
.visible-sm-inline-block,
.visible-md-block,
.visible-md-inline,
.visible-md-inline-block,
.visible-lg-block,
.visible-lg-inline,
.visible-lg-inline-block {
  display: none !important;
}
@media (max-width: 767px) {
  .visible-xs {
    display: block !important;
  }
  table.visible-xs {
    display: table !important;
  }
  tr.visible-xs {
    display: table-row !important;
  }
  th.visible-xs,
  td.visible-xs {
    display: table-cell !important;
  }
}
@media (max-width: 767px) {
  .visible-xs-block {
    display: block !important;
  }
}
@media (max-width: 767px) {
  .visible-xs-inline {
    display: inline !important;
  }
}
@media (max-width: 767px) {
  .visible-xs-inline-block {
    display: inline-block !important;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .visible-sm {
    display: block !important;
  }
  table.visible-sm {
    display: table !important;
  }
  tr.visible-sm {
    display: table-row !important;
  }
  th.visible-sm,
  td.visible-sm {
    display: table-cell !important;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .visible-sm-block {
    display: block !important;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .visible-sm-inline {
    display: inline !important;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .visible-sm-inline-block {
    display: inline-block !important;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .visible-md {
    display: block !important;
  }
  table.visible-md {
    display: table !important;
  }
  tr.visible-md {
    display: table-row !important;
  }
  th.visible-md,
  td.visible-md {
    display: table-cell !important;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .visible-md-block {
    display: block !important;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .visible-md-inline {
    display: inline !important;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .visible-md-inline-block {
    display: inline-block !important;
  }
}
@media (min-width: 1200px) {
  .visible-lg {
    display: block !important;
  }
  table.visible-lg {
    display: table !important;
  }
  tr.visible-lg {
    display: table-row !important;
  }
  th.visible-lg,
  td.visible-lg {
    display: table-cell !important;
  }
}
@media (min-width: 1200px) {
  .visible-lg-block {
    display: block !important;
  }
}
@media (min-width: 1200px) {
  .visible-lg-inline {
    display: inline !important;
  }
}
@media (min-width: 1200px) {
  .visible-lg-inline-block {
    display: inline-block !important;
  }
}
@media (max-width: 767px) {
  .hidden-xs {
    display: none !important;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .hidden-sm {
    display: none !important;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .hidden-md {
    display: none !important;
  }
}
@media (min-width: 1200px) {
  .hidden-lg {
    display: none !important;
  }
}
.visible-print {
  display: none !important;
}
@media print {
  .visible-print {
    display: block !important;
  }
  table.visible-print {
    display: table !important;
  }
  tr.visible-print {
    display: table-row !important;
  }
  th.visible-print,
  td.visible-print {
    display: table-cell !important;
  }
}
.visible-print-block {
  display: none !important;
}
@media print {
  .visible-print-block {
    display: block !important;
  }
}
.visible-print-inline {
  display: none !important;
}
@media print {
  .visible-print-inline {
    display: inline !important;
  }
}
.visible-print-inline-block {
  display: none !important;
}
@media print {
  .visible-print-inline-block {
    display: inline-block !important;
  }
}
@media print {
  .hidden-print {
    display: none !important;
  }
}
/*!
*
* Font Awesome
*
*/
/*!
 *  Font Awesome 4.7.0 by @davegandy - http://fontawesome.io - @fontawesome
 *  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)
 */
/* FONT PATH
 * -------------------------- */
@font-face {
  font-family: 'FontAwesome';
  src: url('../components/font-awesome/fonts/fontawesome-webfont.eot?v=4.7.0');
  src: url('../components/font-awesome/fonts/fontawesome-webfont.eot?#iefix&v=4.7.0') format('embedded-opentype'), url('../components/font-awesome/fonts/fontawesome-webfont.woff2?v=4.7.0') format('woff2'), url('../components/font-awesome/fonts/fontawesome-webfont.woff?v=4.7.0') format('woff'), url('../components/font-awesome/fonts/fontawesome-webfont.ttf?v=4.7.0') format('truetype'), url('../components/font-awesome/fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular') format('svg');
  font-weight: normal;
  font-style: normal;
}
.fa {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/* makes the font 33% larger relative to the icon container */
.fa-lg {
  font-size: 1.33333333em;
  line-height: 0.75em;
  vertical-align: -15%;
}
.fa-2x {
  font-size: 2em;
}
.fa-3x {
  font-size: 3em;
}
.fa-4x {
  font-size: 4em;
}
.fa-5x {
  font-size: 5em;
}
.fa-fw {
  width: 1.28571429em;
  text-align: center;
}
.fa-ul {
  padding-left: 0;
  margin-left: 2.14285714em;
  list-style-type: none;
}
.fa-ul > li {
  position: relative;
}
.fa-li {
  position: absolute;
  left: -2.14285714em;
  width: 2.14285714em;
  top: 0.14285714em;
  text-align: center;
}
.fa-li.fa-lg {
  left: -1.85714286em;
}
.fa-border {
  padding: .2em .25em .15em;
  border: solid 0.08em #eee;
  border-radius: .1em;
}
.fa-pull-left {
  float: left;
}
.fa-pull-right {
  float: right;
}
.fa.fa-pull-left {
  margin-right: .3em;
}
.fa.fa-pull-right {
  margin-left: .3em;
}
/* Deprecated as of 4.4.0 */
.pull-right {
  float: right;
}
.pull-left {
  float: left;
}
.fa.pull-left {
  margin-right: .3em;
}
.fa.pull-right {
  margin-left: .3em;
}
.fa-spin {
  -webkit-animation: fa-spin 2s infinite linear;
  animation: fa-spin 2s infinite linear;
}
.fa-pulse {
  -webkit-animation: fa-spin 1s infinite steps(8);
  animation: fa-spin 1s infinite steps(8);
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}
.fa-rotate-90 {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=1)";
  -webkit-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
}
.fa-rotate-180 {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2)";
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}
.fa-rotate-270 {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";
  -webkit-transform: rotate(270deg);
  -ms-transform: rotate(270deg);
  transform: rotate(270deg);
}
.fa-flip-horizontal {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)";
  -webkit-transform: scale(-1, 1);
  -ms-transform: scale(-1, 1);
  transform: scale(-1, 1);
}
.fa-flip-vertical {
  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";
  -webkit-transform: scale(1, -1);
  -ms-transform: scale(1, -1);
  transform: scale(1, -1);
}
:root .fa-rotate-90,
:root .fa-rotate-180,
:root .fa-rotate-270,
:root .fa-flip-horizontal,
:root .fa-flip-vertical {
  filter: none;
}
.fa-stack {
  position: relative;
  display: inline-block;
  width: 2em;
  height: 2em;
  line-height: 2em;
  vertical-align: middle;
}
.fa-stack-1x,
.fa-stack-2x {
  position: absolute;
  left: 0;
  width: 100%;
  text-align: center;
}
.fa-stack-1x {
  line-height: inherit;
}
.fa-stack-2x {
  font-size: 2em;
}
.fa-inverse {
  color: #fff;
}
/* Font Awesome uses the Unicode Private Use Area (PUA) to ensure screen
   readers do not read off random characters that represent icons */
.fa-glass:before {
  content: "\f000";
}
.fa-music:before {
  content: "\f001";
}
.fa-search:before {
  content: "\f002";
}
.fa-envelope-o:before {
  content: "\f003";
}
.fa-heart:before {
  content: "\f004";
}
.fa-star:before {
  content: "\f005";
}
.fa-star-o:before {
  content: "\f006";
}
.fa-user:before {
  content: "\f007";
}
.fa-film:before {
  content: "\f008";
}
.fa-th-large:before {
  content: "\f009";
}
.fa-th:before {
  content: "\f00a";
}
.fa-th-list:before {
  content: "\f00b";
}
.fa-check:before {
  content: "\f00c";
}
.fa-remove:before,
.fa-close:before,
.fa-times:before {
  content: "\f00d";
}
.fa-search-plus:before {
  content: "\f00e";
}
.fa-search-minus:before {
  content: "\f010";
}
.fa-power-off:before {
  content: "\f011";
}
.fa-signal:before {
  content: "\f012";
}
.fa-gear:before,
.fa-cog:before {
  content: "\f013";
}
.fa-trash-o:before {
  content: "\f014";
}
.fa-home:before {
  content: "\f015";
}
.fa-file-o:before {
  content: "\f016";
}
.fa-clock-o:before {
  content: "\f017";
}
.fa-road:before {
  content: "\f018";
}
.fa-download:before {
  content: "\f019";
}
.fa-arrow-circle-o-down:before {
  content: "\f01a";
}
.fa-arrow-circle-o-up:before {
  content: "\f01b";
}
.fa-inbox:before {
  content: "\f01c";
}
.fa-play-circle-o:before {
  content: "\f01d";
}
.fa-rotate-right:before,
.fa-repeat:before {
  content: "\f01e";
}
.fa-refresh:before {
  content: "\f021";
}
.fa-list-alt:before {
  content: "\f022";
}
.fa-lock:before {
  content: "\f023";
}
.fa-flag:before {
  content: "\f024";
}
.fa-headphones:before {
  content: "\f025";
}
.fa-volume-off:before {
  content: "\f026";
}
.fa-volume-down:before {
  content: "\f027";
}
.fa-volume-up:before {
  content: "\f028";
}
.fa-qrcode:before {
  content: "\f029";
}
.fa-barcode:before {
  content: "\f02a";
}
.fa-tag:before {
  content: "\f02b";
}
.fa-tags:before {
  content: "\f02c";
}
.fa-book:before {
  content: "\f02d";
}
.fa-bookmark:before {
  content: "\f02e";
}
.fa-print:before {
  content: "\f02f";
}
.fa-camera:before {
  content: "\f030";
}
.fa-font:before {
  content: "\f031";
}
.fa-bold:before {
  content: "\f032";
}
.fa-italic:before {
  content: "\f033";
}
.fa-text-height:before {
  content: "\f034";
}
.fa-text-width:before {
  content: "\f035";
}
.fa-align-left:before {
  content: "\f036";
}
.fa-align-center:before {
  content: "\f037";
}
.fa-align-right:before {
  content: "\f038";
}
.fa-align-justify:before {
  content: "\f039";
}
.fa-list:before {
  content: "\f03a";
}
.fa-dedent:before,
.fa-outdent:before {
  content: "\f03b";
}
.fa-indent:before {
  content: "\f03c";
}
.fa-video-camera:before {
  content: "\f03d";
}
.fa-photo:before,
.fa-image:before,
.fa-picture-o:before {
  content: "\f03e";
}
.fa-pencil:before {
  content: "\f040";
}
.fa-map-marker:before {
  content: "\f041";
}
.fa-adjust:before {
  content: "\f042";
}
.fa-tint:before {
  content: "\f043";
}
.fa-edit:before,
.fa-pencil-square-o:before {
  content: "\f044";
}
.fa-share-square-o:before {
  content: "\f045";
}
.fa-check-square-o:before {
  content: "\f046";
}
.fa-arrows:before {
  content: "\f047";
}
.fa-step-backward:before {
  content: "\f048";
}
.fa-fast-backward:before {
  content: "\f049";
}
.fa-backward:before {
  content: "\f04a";
}
.fa-play:before {
  content: "\f04b";
}
.fa-pause:before {
  content: "\f04c";
}
.fa-stop:before {
  content: "\f04d";
}
.fa-forward:before {
  content: "\f04e";
}
.fa-fast-forward:before {
  content: "\f050";
}
.fa-step-forward:before {
  content: "\f051";
}
.fa-eject:before {
  content: "\f052";
}
.fa-chevron-left:before {
  content: "\f053";
}
.fa-chevron-right:before {
  content: "\f054";
}
.fa-plus-circle:before {
  content: "\f055";
}
.fa-minus-circle:before {
  content: "\f056";
}
.fa-times-circle:before {
  content: "\f057";
}
.fa-check-circle:before {
  content: "\f058";
}
.fa-question-circle:before {
  content: "\f059";
}
.fa-info-circle:before {
  content: "\f05a";
}
.fa-crosshairs:before {
  content: "\f05b";
}
.fa-times-circle-o:before {
  content: "\f05c";
}
.fa-check-circle-o:before {
  content: "\f05d";
}
.fa-ban:before {
  content: "\f05e";
}
.fa-arrow-left:before {
  content: "\f060";
}
.fa-arrow-right:before {
  content: "\f061";
}
.fa-arrow-up:before {
  content: "\f062";
}
.fa-arrow-down:before {
  content: "\f063";
}
.fa-mail-forward:before,
.fa-share:before {
  content: "\f064";
}
.fa-expand:before {
  content: "\f065";
}
.fa-compress:before {
  content: "\f066";
}
.fa-plus:before {
  content: "\f067";
}
.fa-minus:before {
  content: "\f068";
}
.fa-asterisk:before {
  content: "\f069";
}
.fa-exclamation-circle:before {
  content: "\f06a";
}
.fa-gift:before {
  content: "\f06b";
}
.fa-leaf:before {
  content: "\f06c";
}
.fa-fire:before {
  content: "\f06d";
}
.fa-eye:before {
  content: "\f06e";
}
.fa-eye-slash:before {
  content: "\f070";
}
.fa-warning:before,
.fa-exclamation-triangle:before {
  content: "\f071";
}
.fa-plane:before {
  content: "\f072";
}
.fa-calendar:before {
  content: "\f073";
}
.fa-random:before {
  content: "\f074";
}
.fa-comment:before {
  content: "\f075";
}
.fa-magnet:before {
  content: "\f076";
}
.fa-chevron-up:before {
  content: "\f077";
}
.fa-chevron-down:before {
  content: "\f078";
}
.fa-retweet:before {
  content: "\f079";
}
.fa-shopping-cart:before {
  content: "\f07a";
}
.fa-folder:before {
  content: "\f07b";
}
.fa-folder-open:before {
  content: "\f07c";
}
.fa-arrows-v:before {
  content: "\f07d";
}
.fa-arrows-h:before {
  content: "\f07e";
}
.fa-bar-chart-o:before,
.fa-bar-chart:before {
  content: "\f080";
}
.fa-twitter-square:before {
  content: "\f081";
}
.fa-facebook-square:before {
  content: "\f082";
}
.fa-camera-retro:before {
  content: "\f083";
}
.fa-key:before {
  content: "\f084";
}
.fa-gears:before,
.fa-cogs:before {
  content: "\f085";
}
.fa-comments:before {
  content: "\f086";
}
.fa-thumbs-o-up:before {
  content: "\f087";
}
.fa-thumbs-o-down:before {
  content: "\f088";
}
.fa-star-half:before {
  content: "\f089";
}
.fa-heart-o:before {
  content: "\f08a";
}
.fa-sign-out:before {
  content: "\f08b";
}
.fa-linkedin-square:before {
  content: "\f08c";
}
.fa-thumb-tack:before {
  content: "\f08d";
}
.fa-external-link:before {
  content: "\f08e";
}
.fa-sign-in:before {
  content: "\f090";
}
.fa-trophy:before {
  content: "\f091";
}
.fa-github-square:before {
  content: "\f092";
}
.fa-upload:before {
  content: "\f093";
}
.fa-lemon-o:before {
  content: "\f094";
}
.fa-phone:before {
  content: "\f095";
}
.fa-square-o:before {
  content: "\f096";
}
.fa-bookmark-o:before {
  content: "\f097";
}
.fa-phone-square:before {
  content: "\f098";
}
.fa-twitter:before {
  content: "\f099";
}
.fa-facebook-f:before,
.fa-facebook:before {
  content: "\f09a";
}
.fa-github:before {
  content: "\f09b";
}
.fa-unlock:before {
  content: "\f09c";
}
.fa-credit-card:before {
  content: "\f09d";
}
.fa-feed:before,
.fa-rss:before {
  content: "\f09e";
}
.fa-hdd-o:before {
  content: "\f0a0";
}
.fa-bullhorn:before {
  content: "\f0a1";
}
.fa-bell:before {
  content: "\f0f3";
}
.fa-certificate:before {
  content: "\f0a3";
}
.fa-hand-o-right:before {
  content: "\f0a4";
}
.fa-hand-o-left:before {
  content: "\f0a5";
}
.fa-hand-o-up:before {
  content: "\f0a6";
}
.fa-hand-o-down:before {
  content: "\f0a7";
}
.fa-arrow-circle-left:before {
  content: "\f0a8";
}
.fa-arrow-circle-right:before {
  content: "\f0a9";
}
.fa-arrow-circle-up:before {
  content: "\f0aa";
}
.fa-arrow-circle-down:before {
  content: "\f0ab";
}
.fa-globe:before {
  content: "\f0ac";
}
.fa-wrench:before {
  content: "\f0ad";
}
.fa-tasks:before {
  content: "\f0ae";
}
.fa-filter:before {
  content: "\f0b0";
}
.fa-briefcase:before {
  content: "\f0b1";
}
.fa-arrows-alt:before {
  content: "\f0b2";
}
.fa-group:before,
.fa-users:before {
  content: "\f0c0";
}
.fa-chain:before,
.fa-link:before {
  content: "\f0c1";
}
.fa-cloud:before {
  content: "\f0c2";
}
.fa-flask:before {
  content: "\f0c3";
}
.fa-cut:before,
.fa-scissors:before {
  content: "\f0c4";
}
.fa-copy:before,
.fa-files-o:before {
  content: "\f0c5";
}
.fa-paperclip:before {
  content: "\f0c6";
}
.fa-save:before,
.fa-floppy-o:before {
  content: "\f0c7";
}
.fa-square:before {
  content: "\f0c8";
}
.fa-navicon:before,
.fa-reorder:before,
.fa-bars:before {
  content: "\f0c9";
}
.fa-list-ul:before {
  content: "\f0ca";
}
.fa-list-ol:before {
  content: "\f0cb";
}
.fa-strikethrough:before {
  content: "\f0cc";
}
.fa-underline:before {
  content: "\f0cd";
}
.fa-table:before {
  content: "\f0ce";
}
.fa-magic:before {
  content: "\f0d0";
}
.fa-truck:before {
  content: "\f0d1";
}
.fa-pinterest:before {
  content: "\f0d2";
}
.fa-pinterest-square:before {
  content: "\f0d3";
}
.fa-google-plus-square:before {
  content: "\f0d4";
}
.fa-google-plus:before {
  content: "\f0d5";
}
.fa-money:before {
  content: "\f0d6";
}
.fa-caret-down:before {
  content: "\f0d7";
}
.fa-caret-up:before {
  content: "\f0d8";
}
.fa-caret-left:before {
  content: "\f0d9";
}
.fa-caret-right:before {
  content: "\f0da";
}
.fa-columns:before {
  content: "\f0db";
}
.fa-unsorted:before,
.fa-sort:before {
  content: "\f0dc";
}
.fa-sort-down:before,
.fa-sort-desc:before {
  content: "\f0dd";
}
.fa-sort-up:before,
.fa-sort-asc:before {
  content: "\f0de";
}
.fa-envelope:before {
  content: "\f0e0";
}
.fa-linkedin:before {
  content: "\f0e1";
}
.fa-rotate-left:before,
.fa-undo:before {
  content: "\f0e2";
}
.fa-legal:before,
.fa-gavel:before {
  content: "\f0e3";
}
.fa-dashboard:before,
.fa-tachometer:before {
  content: "\f0e4";
}
.fa-comment-o:before {
  content: "\f0e5";
}
.fa-comments-o:before {
  content: "\f0e6";
}
.fa-flash:before,
.fa-bolt:before {
  content: "\f0e7";
}
.fa-sitemap:before {
  content: "\f0e8";
}
.fa-umbrella:before {
  content: "\f0e9";
}
.fa-paste:before,
.fa-clipboard:before {
  content: "\f0ea";
}
.fa-lightbulb-o:before {
  content: "\f0eb";
}
.fa-exchange:before {
  content: "\f0ec";
}
.fa-cloud-download:before {
  content: "\f0ed";
}
.fa-cloud-upload:before {
  content: "\f0ee";
}
.fa-user-md:before {
  content: "\f0f0";
}
.fa-stethoscope:before {
  content: "\f0f1";
}
.fa-suitcase:before {
  content: "\f0f2";
}
.fa-bell-o:before {
  content: "\f0a2";
}
.fa-coffee:before {
  content: "\f0f4";
}
.fa-cutlery:before {
  content: "\f0f5";
}
.fa-file-text-o:before {
  content: "\f0f6";
}
.fa-building-o:before {
  content: "\f0f7";
}
.fa-hospital-o:before {
  content: "\f0f8";
}
.fa-ambulance:before {
  content: "\f0f9";
}
.fa-medkit:before {
  content: "\f0fa";
}
.fa-fighter-jet:before {
  content: "\f0fb";
}
.fa-beer:before {
  content: "\f0fc";
}
.fa-h-square:before {
  content: "\f0fd";
}
.fa-plus-square:before {
  content: "\f0fe";
}
.fa-angle-double-left:before {
  content: "\f100";
}
.fa-angle-double-right:before {
  content: "\f101";
}
.fa-angle-double-up:before {
  content: "\f102";
}
.fa-angle-double-down:before {
  content: "\f103";
}
.fa-angle-left:before {
  content: "\f104";
}
.fa-angle-right:before {
  content: "\f105";
}
.fa-angle-up:before {
  content: "\f106";
}
.fa-angle-down:before {
  content: "\f107";
}
.fa-desktop:before {
  content: "\f108";
}
.fa-laptop:before {
  content: "\f109";
}
.fa-tablet:before {
  content: "\f10a";
}
.fa-mobile-phone:before,
.fa-mobile:before {
  content: "\f10b";
}
.fa-circle-o:before {
  content: "\f10c";
}
.fa-quote-left:before {
  content: "\f10d";
}
.fa-quote-right:before {
  content: "\f10e";
}
.fa-spinner:before {
  content: "\f110";
}
.fa-circle:before {
  content: "\f111";
}
.fa-mail-reply:before,
.fa-reply:before {
  content: "\f112";
}
.fa-github-alt:before {
  content: "\f113";
}
.fa-folder-o:before {
  content: "\f114";
}
.fa-folder-open-o:before {
  content: "\f115";
}
.fa-smile-o:before {
  content: "\f118";
}
.fa-frown-o:before {
  content: "\f119";
}
.fa-meh-o:before {
  content: "\f11a";
}
.fa-gamepad:before {
  content: "\f11b";
}
.fa-keyboard-o:before {
  content: "\f11c";
}
.fa-flag-o:before {
  content: "\f11d";
}
.fa-flag-checkered:before {
  content: "\f11e";
}
.fa-terminal:before {
  content: "\f120";
}
.fa-code:before {
  content: "\f121";
}
.fa-mail-reply-all:before,
.fa-reply-all:before {
  content: "\f122";
}
.fa-star-half-empty:before,
.fa-star-half-full:before,
.fa-star-half-o:before {
  content: "\f123";
}
.fa-location-arrow:before {
  content: "\f124";
}
.fa-crop:before {
  content: "\f125";
}
.fa-code-fork:before {
  content: "\f126";
}
.fa-unlink:before,
.fa-chain-broken:before {
  content: "\f127";
}
.fa-question:before {
  content: "\f128";
}
.fa-info:before {
  content: "\f129";
}
.fa-exclamation:before {
  content: "\f12a";
}
.fa-superscript:before {
  content: "\f12b";
}
.fa-subscript:before {
  content: "\f12c";
}
.fa-eraser:before {
  content: "\f12d";
}
.fa-puzzle-piece:before {
  content: "\f12e";
}
.fa-microphone:before {
  content: "\f130";
}
.fa-microphone-slash:before {
  content: "\f131";
}
.fa-shield:before {
  content: "\f132";
}
.fa-calendar-o:before {
  content: "\f133";
}
.fa-fire-extinguisher:before {
  content: "\f134";
}
.fa-rocket:before {
  content: "\f135";
}
.fa-maxcdn:before {
  content: "\f136";
}
.fa-chevron-circle-left:before {
  content: "\f137";
}
.fa-chevron-circle-right:before {
  content: "\f138";
}
.fa-chevron-circle-up:before {
  content: "\f139";
}
.fa-chevron-circle-down:before {
  content: "\f13a";
}
.fa-html5:before {
  content: "\f13b";
}
.fa-css3:before {
  content: "\f13c";
}
.fa-anchor:before {
  content: "\f13d";
}
.fa-unlock-alt:before {
  content: "\f13e";
}
.fa-bullseye:before {
  content: "\f140";
}
.fa-ellipsis-h:before {
  content: "\f141";
}
.fa-ellipsis-v:before {
  content: "\f142";
}
.fa-rss-square:before {
  content: "\f143";
}
.fa-play-circle:before {
  content: "\f144";
}
.fa-ticket:before {
  content: "\f145";
}
.fa-minus-square:before {
  content: "\f146";
}
.fa-minus-square-o:before {
  content: "\f147";
}
.fa-level-up:before {
  content: "\f148";
}
.fa-level-down:before {
  content: "\f149";
}
.fa-check-square:before {
  content: "\f14a";
}
.fa-pencil-square:before {
  content: "\f14b";
}
.fa-external-link-square:before {
  content: "\f14c";
}
.fa-share-square:before {
  content: "\f14d";
}
.fa-compass:before {
  content: "\f14e";
}
.fa-toggle-down:before,
.fa-caret-square-o-down:before {
  content: "\f150";
}
.fa-toggle-up:before,
.fa-caret-square-o-up:before {
  content: "\f151";
}
.fa-toggle-right:before,
.fa-caret-square-o-right:before {
  content: "\f152";
}
.fa-euro:before,
.fa-eur:before {
  content: "\f153";
}
.fa-gbp:before {
  content: "\f154";
}
.fa-dollar:before,
.fa-usd:before {
  content: "\f155";
}
.fa-rupee:before,
.fa-inr:before {
  content: "\f156";
}
.fa-cny:before,
.fa-rmb:before,
.fa-yen:before,
.fa-jpy:before {
  content: "\f157";
}
.fa-ruble:before,
.fa-rouble:before,
.fa-rub:before {
  content: "\f158";
}
.fa-won:before,
.fa-krw:before {
  content: "\f159";
}
.fa-bitcoin:before,
.fa-btc:before {
  content: "\f15a";
}
.fa-file:before {
  content: "\f15b";
}
.fa-file-text:before {
  content: "\f15c";
}
.fa-sort-alpha-asc:before {
  content: "\f15d";
}
.fa-sort-alpha-desc:before {
  content: "\f15e";
}
.fa-sort-amount-asc:before {
  content: "\f160";
}
.fa-sort-amount-desc:before {
  content: "\f161";
}
.fa-sort-numeric-asc:before {
  content: "\f162";
}
.fa-sort-numeric-desc:before {
  content: "\f163";
}
.fa-thumbs-up:before {
  content: "\f164";
}
.fa-thumbs-down:before {
  content: "\f165";
}
.fa-youtube-square:before {
  content: "\f166";
}
.fa-youtube:before {
  content: "\f167";
}
.fa-xing:before {
  content: "\f168";
}
.fa-xing-square:before {
  content: "\f169";
}
.fa-youtube-play:before {
  content: "\f16a";
}
.fa-dropbox:before {
  content: "\f16b";
}
.fa-stack-overflow:before {
  content: "\f16c";
}
.fa-instagram:before {
  content: "\f16d";
}
.fa-flickr:before {
  content: "\f16e";
}
.fa-adn:before {
  content: "\f170";
}
.fa-bitbucket:before {
  content: "\f171";
}
.fa-bitbucket-square:before {
  content: "\f172";
}
.fa-tumblr:before {
  content: "\f173";
}
.fa-tumblr-square:before {
  content: "\f174";
}
.fa-long-arrow-down:before {
  content: "\f175";
}
.fa-long-arrow-up:before {
  content: "\f176";
}
.fa-long-arrow-left:before {
  content: "\f177";
}
.fa-long-arrow-right:before {
  content: "\f178";
}
.fa-apple:before {
  content: "\f179";
}
.fa-windows:before {
  content: "\f17a";
}
.fa-android:before {
  content: "\f17b";
}
.fa-linux:before {
  content: "\f17c";
}
.fa-dribbble:before {
  content: "\f17d";
}
.fa-skype:before {
  content: "\f17e";
}
.fa-foursquare:before {
  content: "\f180";
}
.fa-trello:before {
  content: "\f181";
}
.fa-female:before {
  content: "\f182";
}
.fa-male:before {
  content: "\f183";
}
.fa-gittip:before,
.fa-gratipay:before {
  content: "\f184";
}
.fa-sun-o:before {
  content: "\f185";
}
.fa-moon-o:before {
  content: "\f186";
}
.fa-archive:before {
  content: "\f187";
}
.fa-bug:before {
  content: "\f188";
}
.fa-vk:before {
  content: "\f189";
}
.fa-weibo:before {
  content: "\f18a";
}
.fa-renren:before {
  content: "\f18b";
}
.fa-pagelines:before {
  content: "\f18c";
}
.fa-stack-exchange:before {
  content: "\f18d";
}
.fa-arrow-circle-o-right:before {
  content: "\f18e";
}
.fa-arrow-circle-o-left:before {
  content: "\f190";
}
.fa-toggle-left:before,
.fa-caret-square-o-left:before {
  content: "\f191";
}
.fa-dot-circle-o:before {
  content: "\f192";
}
.fa-wheelchair:before {
  content: "\f193";
}
.fa-vimeo-square:before {
  content: "\f194";
}
.fa-turkish-lira:before,
.fa-try:before {
  content: "\f195";
}
.fa-plus-square-o:before {
  content: "\f196";
}
.fa-space-shuttle:before {
  content: "\f197";
}
.fa-slack:before {
  content: "\f198";
}
.fa-envelope-square:before {
  content: "\f199";
}
.fa-wordpress:before {
  content: "\f19a";
}
.fa-openid:before {
  content: "\f19b";
}
.fa-institution:before,
.fa-bank:before,
.fa-university:before {
  content: "\f19c";
}
.fa-mortar-board:before,
.fa-graduation-cap:before {
  content: "\f19d";
}
.fa-yahoo:before {
  content: "\f19e";
}
.fa-google:before {
  content: "\f1a0";
}
.fa-reddit:before {
  content: "\f1a1";
}
.fa-reddit-square:before {
  content: "\f1a2";
}
.fa-stumbleupon-circle:before {
  content: "\f1a3";
}
.fa-stumbleupon:before {
  content: "\f1a4";
}
.fa-delicious:before {
  content: "\f1a5";
}
.fa-digg:before {
  content: "\f1a6";
}
.fa-pied-piper-pp:before {
  content: "\f1a7";
}
.fa-pied-piper-alt:before {
  content: "\f1a8";
}
.fa-drupal:before {
  content: "\f1a9";
}
.fa-joomla:before {
  content: "\f1aa";
}
.fa-language:before {
  content: "\f1ab";
}
.fa-fax:before {
  content: "\f1ac";
}
.fa-building:before {
  content: "\f1ad";
}
.fa-child:before {
  content: "\f1ae";
}
.fa-paw:before {
  content: "\f1b0";
}
.fa-spoon:before {
  content: "\f1b1";
}
.fa-cube:before {
  content: "\f1b2";
}
.fa-cubes:before {
  content: "\f1b3";
}
.fa-behance:before {
  content: "\f1b4";
}
.fa-behance-square:before {
  content: "\f1b5";
}
.fa-steam:before {
  content: "\f1b6";
}
.fa-steam-square:before {
  content: "\f1b7";
}
.fa-recycle:before {
  content: "\f1b8";
}
.fa-automobile:before,
.fa-car:before {
  content: "\f1b9";
}
.fa-cab:before,
.fa-taxi:before {
  content: "\f1ba";
}
.fa-tree:before {
  content: "\f1bb";
}
.fa-spotify:before {
  content: "\f1bc";
}
.fa-deviantart:before {
  content: "\f1bd";
}
.fa-soundcloud:before {
  content: "\f1be";
}
.fa-database:before {
  content: "\f1c0";
}
.fa-file-pdf-o:before {
  content: "\f1c1";
}
.fa-file-word-o:before {
  content: "\f1c2";
}
.fa-file-excel-o:before {
  content: "\f1c3";
}
.fa-file-powerpoint-o:before {
  content: "\f1c4";
}
.fa-file-photo-o:before,
.fa-file-picture-o:before,
.fa-file-image-o:before {
  content: "\f1c5";
}
.fa-file-zip-o:before,
.fa-file-archive-o:before {
  content: "\f1c6";
}
.fa-file-sound-o:before,
.fa-file-audio-o:before {
  content: "\f1c7";
}
.fa-file-movie-o:before,
.fa-file-video-o:before {
  content: "\f1c8";
}
.fa-file-code-o:before {
  content: "\f1c9";
}
.fa-vine:before {
  content: "\f1ca";
}
.fa-codepen:before {
  content: "\f1cb";
}
.fa-jsfiddle:before {
  content: "\f1cc";
}
.fa-life-bouy:before,
.fa-life-buoy:before,
.fa-life-saver:before,
.fa-support:before,
.fa-life-ring:before {
  content: "\f1cd";
}
.fa-circle-o-notch:before {
  content: "\f1ce";
}
.fa-ra:before,
.fa-resistance:before,
.fa-rebel:before {
  content: "\f1d0";
}
.fa-ge:before,
.fa-empire:before {
  content: "\f1d1";
}
.fa-git-square:before {
  content: "\f1d2";
}
.fa-git:before {
  content: "\f1d3";
}
.fa-y-combinator-square:before,
.fa-yc-square:before,
.fa-hacker-news:before {
  content: "\f1d4";
}
.fa-tencent-weibo:before {
  content: "\f1d5";
}
.fa-qq:before {
  content: "\f1d6";
}
.fa-wechat:before,
.fa-weixin:before {
  content: "\f1d7";
}
.fa-send:before,
.fa-paper-plane:before {
  content: "\f1d8";
}
.fa-send-o:before,
.fa-paper-plane-o:before {
  content: "\f1d9";
}
.fa-history:before {
  content: "\f1da";
}
.fa-circle-thin:before {
  content: "\f1db";
}
.fa-header:before {
  content: "\f1dc";
}
.fa-paragraph:before {
  content: "\f1dd";
}
.fa-sliders:before {
  content: "\f1de";
}
.fa-share-alt:before {
  content: "\f1e0";
}
.fa-share-alt-square:before {
  content: "\f1e1";
}
.fa-bomb:before {
  content: "\f1e2";
}
.fa-soccer-ball-o:before,
.fa-futbol-o:before {
  content: "\f1e3";
}
.fa-tty:before {
  content: "\f1e4";
}
.fa-binoculars:before {
  content: "\f1e5";
}
.fa-plug:before {
  content: "\f1e6";
}
.fa-slideshare:before {
  content: "\f1e7";
}
.fa-twitch:before {
  content: "\f1e8";
}
.fa-yelp:before {
  content: "\f1e9";
}
.fa-newspaper-o:before {
  content: "\f1ea";
}
.fa-wifi:before {
  content: "\f1eb";
}
.fa-calculator:before {
  content: "\f1ec";
}
.fa-paypal:before {
  content: "\f1ed";
}
.fa-google-wallet:before {
  content: "\f1ee";
}
.fa-cc-visa:before {
  content: "\f1f0";
}
.fa-cc-mastercard:before {
  content: "\f1f1";
}
.fa-cc-discover:before {
  content: "\f1f2";
}
.fa-cc-amex:before {
  content: "\f1f3";
}
.fa-cc-paypal:before {
  content: "\f1f4";
}
.fa-cc-stripe:before {
  content: "\f1f5";
}
.fa-bell-slash:before {
  content: "\f1f6";
}
.fa-bell-slash-o:before {
  content: "\f1f7";
}
.fa-trash:before {
  content: "\f1f8";
}
.fa-copyright:before {
  content: "\f1f9";
}
.fa-at:before {
  content: "\f1fa";
}
.fa-eyedropper:before {
  content: "\f1fb";
}
.fa-paint-brush:before {
  content: "\f1fc";
}
.fa-birthday-cake:before {
  content: "\f1fd";
}
.fa-area-chart:before {
  content: "\f1fe";
}
.fa-pie-chart:before {
  content: "\f200";
}
.fa-line-chart:before {
  content: "\f201";
}
.fa-lastfm:before {
  content: "\f202";
}
.fa-lastfm-square:before {
  content: "\f203";
}
.fa-toggle-off:before {
  content: "\f204";
}
.fa-toggle-on:before {
  content: "\f205";
}
.fa-bicycle:before {
  content: "\f206";
}
.fa-bus:before {
  content: "\f207";
}
.fa-ioxhost:before {
  content: "\f208";
}
.fa-angellist:before {
  content: "\f209";
}
.fa-cc:before {
  content: "\f20a";
}
.fa-shekel:before,
.fa-sheqel:before,
.fa-ils:before {
  content: "\f20b";
}
.fa-meanpath:before {
  content: "\f20c";
}
.fa-buysellads:before {
  content: "\f20d";
}
.fa-connectdevelop:before {
  content: "\f20e";
}
.fa-dashcube:before {
  content: "\f210";
}
.fa-forumbee:before {
  content: "\f211";
}
.fa-leanpub:before {
  content: "\f212";
}
.fa-sellsy:before {
  content: "\f213";
}
.fa-shirtsinbulk:before {
  content: "\f214";
}
.fa-simplybuilt:before {
  content: "\f215";
}
.fa-skyatlas:before {
  content: "\f216";
}
.fa-cart-plus:before {
  content: "\f217";
}
.fa-cart-arrow-down:before {
  content: "\f218";
}
.fa-diamond:before {
  content: "\f219";
}
.fa-ship:before {
  content: "\f21a";
}
.fa-user-secret:before {
  content: "\f21b";
}
.fa-motorcycle:before {
  content: "\f21c";
}
.fa-street-view:before {
  content: "\f21d";
}
.fa-heartbeat:before {
  content: "\f21e";
}
.fa-venus:before {
  content: "\f221";
}
.fa-mars:before {
  content: "\f222";
}
.fa-mercury:before {
  content: "\f223";
}
.fa-intersex:before,
.fa-transgender:before {
  content: "\f224";
}
.fa-transgender-alt:before {
  content: "\f225";
}
.fa-venus-double:before {
  content: "\f226";
}
.fa-mars-double:before {
  content: "\f227";
}
.fa-venus-mars:before {
  content: "\f228";
}
.fa-mars-stroke:before {
  content: "\f229";
}
.fa-mars-stroke-v:before {
  content: "\f22a";
}
.fa-mars-stroke-h:before {
  content: "\f22b";
}
.fa-neuter:before {
  content: "\f22c";
}
.fa-genderless:before {
  content: "\f22d";
}
.fa-facebook-official:before {
  content: "\f230";
}
.fa-pinterest-p:before {
  content: "\f231";
}
.fa-whatsapp:before {
  content: "\f232";
}
.fa-server:before {
  content: "\f233";
}
.fa-user-plus:before {
  content: "\f234";
}
.fa-user-times:before {
  content: "\f235";
}
.fa-hotel:before,
.fa-bed:before {
  content: "\f236";
}
.fa-viacoin:before {
  content: "\f237";
}
.fa-train:before {
  content: "\f238";
}
.fa-subway:before {
  content: "\f239";
}
.fa-medium:before {
  content: "\f23a";
}
.fa-yc:before,
.fa-y-combinator:before {
  content: "\f23b";
}
.fa-optin-monster:before {
  content: "\f23c";
}
.fa-opencart:before {
  content: "\f23d";
}
.fa-expeditedssl:before {
  content: "\f23e";
}
.fa-battery-4:before,
.fa-battery:before,
.fa-battery-full:before {
  content: "\f240";
}
.fa-battery-3:before,
.fa-battery-three-quarters:before {
  content: "\f241";
}
.fa-battery-2:before,
.fa-battery-half:before {
  content: "\f242";
}
.fa-battery-1:before,
.fa-battery-quarter:before {
  content: "\f243";
}
.fa-battery-0:before,
.fa-battery-empty:before {
  content: "\f244";
}
.fa-mouse-pointer:before {
  content: "\f245";
}
.fa-i-cursor:before {
  content: "\f246";
}
.fa-object-group:before {
  content: "\f247";
}
.fa-object-ungroup:before {
  content: "\f248";
}
.fa-sticky-note:before {
  content: "\f249";
}
.fa-sticky-note-o:before {
  content: "\f24a";
}
.fa-cc-jcb:before {
  content: "\f24b";
}
.fa-cc-diners-club:before {
  content: "\f24c";
}
.fa-clone:before {
  content: "\f24d";
}
.fa-balance-scale:before {
  content: "\f24e";
}
.fa-hourglass-o:before {
  content: "\f250";
}
.fa-hourglass-1:before,
.fa-hourglass-start:before {
  content: "\f251";
}
.fa-hourglass-2:before,
.fa-hourglass-half:before {
  content: "\f252";
}
.fa-hourglass-3:before,
.fa-hourglass-end:before {
  content: "\f253";
}
.fa-hourglass:before {
  content: "\f254";
}
.fa-hand-grab-o:before,
.fa-hand-rock-o:before {
  content: "\f255";
}
.fa-hand-stop-o:before,
.fa-hand-paper-o:before {
  content: "\f256";
}
.fa-hand-scissors-o:before {
  content: "\f257";
}
.fa-hand-lizard-o:before {
  content: "\f258";
}
.fa-hand-spock-o:before {
  content: "\f259";
}
.fa-hand-pointer-o:before {
  content: "\f25a";
}
.fa-hand-peace-o:before {
  content: "\f25b";
}
.fa-trademark:before {
  content: "\f25c";
}
.fa-registered:before {
  content: "\f25d";
}
.fa-creative-commons:before {
  content: "\f25e";
}
.fa-gg:before {
  content: "\f260";
}
.fa-gg-circle:before {
  content: "\f261";
}
.fa-tripadvisor:before {
  content: "\f262";
}
.fa-odnoklassniki:before {
  content: "\f263";
}
.fa-odnoklassniki-square:before {
  content: "\f264";
}
.fa-get-pocket:before {
  content: "\f265";
}
.fa-wikipedia-w:before {
  content: "\f266";
}
.fa-safari:before {
  content: "\f267";
}
.fa-chrome:before {
  content: "\f268";
}
.fa-firefox:before {
  content: "\f269";
}
.fa-opera:before {
  content: "\f26a";
}
.fa-internet-explorer:before {
  content: "\f26b";
}
.fa-tv:before,
.fa-television:before {
  content: "\f26c";
}
.fa-contao:before {
  content: "\f26d";
}
.fa-500px:before {
  content: "\f26e";
}
.fa-amazon:before {
  content: "\f270";
}
.fa-calendar-plus-o:before {
  content: "\f271";
}
.fa-calendar-minus-o:before {
  content: "\f272";
}
.fa-calendar-times-o:before {
  content: "\f273";
}
.fa-calendar-check-o:before {
  content: "\f274";
}
.fa-industry:before {
  content: "\f275";
}
.fa-map-pin:before {
  content: "\f276";
}
.fa-map-signs:before {
  content: "\f277";
}
.fa-map-o:before {
  content: "\f278";
}
.fa-map:before {
  content: "\f279";
}
.fa-commenting:before {
  content: "\f27a";
}
.fa-commenting-o:before {
  content: "\f27b";
}
.fa-houzz:before {
  content: "\f27c";
}
.fa-vimeo:before {
  content: "\f27d";
}
.fa-black-tie:before {
  content: "\f27e";
}
.fa-fonticons:before {
  content: "\f280";
}
.fa-reddit-alien:before {
  content: "\f281";
}
.fa-edge:before {
  content: "\f282";
}
.fa-credit-card-alt:before {
  content: "\f283";
}
.fa-codiepie:before {
  content: "\f284";
}
.fa-modx:before {
  content: "\f285";
}
.fa-fort-awesome:before {
  content: "\f286";
}
.fa-usb:before {
  content: "\f287";
}
.fa-product-hunt:before {
  content: "\f288";
}
.fa-mixcloud:before {
  content: "\f289";
}
.fa-scribd:before {
  content: "\f28a";
}
.fa-pause-circle:before {
  content: "\f28b";
}
.fa-pause-circle-o:before {
  content: "\f28c";
}
.fa-stop-circle:before {
  content: "\f28d";
}
.fa-stop-circle-o:before {
  content: "\f28e";
}
.fa-shopping-bag:before {
  content: "\f290";
}
.fa-shopping-basket:before {
  content: "\f291";
}
.fa-hashtag:before {
  content: "\f292";
}
.fa-bluetooth:before {
  content: "\f293";
}
.fa-bluetooth-b:before {
  content: "\f294";
}
.fa-percent:before {
  content: "\f295";
}
.fa-gitlab:before {
  content: "\f296";
}
.fa-wpbeginner:before {
  content: "\f297";
}
.fa-wpforms:before {
  content: "\f298";
}
.fa-envira:before {
  content: "\f299";
}
.fa-universal-access:before {
  content: "\f29a";
}
.fa-wheelchair-alt:before {
  content: "\f29b";
}
.fa-question-circle-o:before {
  content: "\f29c";
}
.fa-blind:before {
  content: "\f29d";
}
.fa-audio-description:before {
  content: "\f29e";
}
.fa-volume-control-phone:before {
  content: "\f2a0";
}
.fa-braille:before {
  content: "\f2a1";
}
.fa-assistive-listening-systems:before {
  content: "\f2a2";
}
.fa-asl-interpreting:before,
.fa-american-sign-language-interpreting:before {
  content: "\f2a3";
}
.fa-deafness:before,
.fa-hard-of-hearing:before,
.fa-deaf:before {
  content: "\f2a4";
}
.fa-glide:before {
  content: "\f2a5";
}
.fa-glide-g:before {
  content: "\f2a6";
}
.fa-signing:before,
.fa-sign-language:before {
  content: "\f2a7";
}
.fa-low-vision:before {
  content: "\f2a8";
}
.fa-viadeo:before {
  content: "\f2a9";
}
.fa-viadeo-square:before {
  content: "\f2aa";
}
.fa-snapchat:before {
  content: "\f2ab";
}
.fa-snapchat-ghost:before {
  content: "\f2ac";
}
.fa-snapchat-square:before {
  content: "\f2ad";
}
.fa-pied-piper:before {
  content: "\f2ae";
}
.fa-first-order:before {
  content: "\f2b0";
}
.fa-yoast:before {
  content: "\f2b1";
}
.fa-themeisle:before {
  content: "\f2b2";
}
.fa-google-plus-circle:before,
.fa-google-plus-official:before {
  content: "\f2b3";
}
.fa-fa:before,
.fa-font-awesome:before {
  content: "\f2b4";
}
.fa-handshake-o:before {
  content: "\f2b5";
}
.fa-envelope-open:before {
  content: "\f2b6";
}
.fa-envelope-open-o:before {
  content: "\f2b7";
}
.fa-linode:before {
  content: "\f2b8";
}
.fa-address-book:before {
  content: "\f2b9";
}
.fa-address-book-o:before {
  content: "\f2ba";
}
.fa-vcard:before,
.fa-address-card:before {
  content: "\f2bb";
}
.fa-vcard-o:before,
.fa-address-card-o:before {
  content: "\f2bc";
}
.fa-user-circle:before {
  content: "\f2bd";
}
.fa-user-circle-o:before {
  content: "\f2be";
}
.fa-user-o:before {
  content: "\f2c0";
}
.fa-id-badge:before {
  content: "\f2c1";
}
.fa-drivers-license:before,
.fa-id-card:before {
  content: "\f2c2";
}
.fa-drivers-license-o:before,
.fa-id-card-o:before {
  content: "\f2c3";
}
.fa-quora:before {
  content: "\f2c4";
}
.fa-free-code-camp:before {
  content: "\f2c5";
}
.fa-telegram:before {
  content: "\f2c6";
}
.fa-thermometer-4:before,
.fa-thermometer:before,
.fa-thermometer-full:before {
  content: "\f2c7";
}
.fa-thermometer-3:before,
.fa-thermometer-three-quarters:before {
  content: "\f2c8";
}
.fa-thermometer-2:before,
.fa-thermometer-half:before {
  content: "\f2c9";
}
.fa-thermometer-1:before,
.fa-thermometer-quarter:before {
  content: "\f2ca";
}
.fa-thermometer-0:before,
.fa-thermometer-empty:before {
  content: "\f2cb";
}
.fa-shower:before {
  content: "\f2cc";
}
.fa-bathtub:before,
.fa-s15:before,
.fa-bath:before {
  content: "\f2cd";
}
.fa-podcast:before {
  content: "\f2ce";
}
.fa-window-maximize:before {
  content: "\f2d0";
}
.fa-window-minimize:before {
  content: "\f2d1";
}
.fa-window-restore:before {
  content: "\f2d2";
}
.fa-times-rectangle:before,
.fa-window-close:before {
  content: "\f2d3";
}
.fa-times-rectangle-o:before,
.fa-window-close-o:before {
  content: "\f2d4";
}
.fa-bandcamp:before {
  content: "\f2d5";
}
.fa-grav:before {
  content: "\f2d6";
}
.fa-etsy:before {
  content: "\f2d7";
}
.fa-imdb:before {
  content: "\f2d8";
}
.fa-ravelry:before {
  content: "\f2d9";
}
.fa-eercast:before {
  content: "\f2da";
}
.fa-microchip:before {
  content: "\f2db";
}
.fa-snowflake-o:before {
  content: "\f2dc";
}
.fa-superpowers:before {
  content: "\f2dd";
}
.fa-wpexplorer:before {
  content: "\f2de";
}
.fa-meetup:before {
  content: "\f2e0";
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
.sr-only-focusable:active,
.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  clip: auto;
}
.sr-only-focusable:active,
.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  clip: auto;
}
/*!
*
* IPython base
*
*/
.modal.fade .modal-dialog {
  -webkit-transform: translate(0, 0);
  -ms-transform: translate(0, 0);
  -o-transform: translate(0, 0);
  transform: translate(0, 0);
}
code {
  color: #000;
}
pre {
  font-size: inherit;
  line-height: inherit;
}
label {
  font-weight: normal;
}
/* Make the page background atleast 100% the height of the view port */
/* Make the page itself atleast 70% the height of the view port */
.border-box-sizing {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.corner-all {
  border-radius: 2px;
}
.no-padding {
  padding: 0px;
}
/* Flexible box model classes */
/* Taken from Alex Russell http://infrequently.org/2009/08/css-3-progress/ */
/* This file is a compatability layer.  It allows the usage of flexible box 
model layouts accross multiple browsers, including older browsers.  The newest,
universal implementation of the flexible box model is used when available (see
`Modern browsers` comments below).  Browsers that are known to implement this 
new spec completely include:

    Firefox 28.0+
    Chrome 29.0+
    Internet Explorer 11+ 
    Opera 17.0+

Browsers not listed, including Safari, are supported via the styling under the
`Old browsers` comments below.
*/
.hbox {
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: horizontal;
  -moz-box-align: stretch;
  display: box;
  box-orient: horizontal;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: row;
  align-items: stretch;
}
.hbox > * {
  /* Old browsers */
  -webkit-box-flex: 0;
  -moz-box-flex: 0;
  box-flex: 0;
  /* Modern browsers */
  flex: none;
}
.vbox {
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: vertical;
  -moz-box-align: stretch;
  display: box;
  box-orient: vertical;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.vbox > * {
  /* Old browsers */
  -webkit-box-flex: 0;
  -moz-box-flex: 0;
  box-flex: 0;
  /* Modern browsers */
  flex: none;
}
.hbox.reverse,
.vbox.reverse,
.reverse {
  /* Old browsers */
  -webkit-box-direction: reverse;
  -moz-box-direction: reverse;
  box-direction: reverse;
  /* Modern browsers */
  flex-direction: row-reverse;
}
.hbox.box-flex0,
.vbox.box-flex0,
.box-flex0 {
  /* Old browsers */
  -webkit-box-flex: 0;
  -moz-box-flex: 0;
  box-flex: 0;
  /* Modern browsers */
  flex: none;
  width: auto;
}
.hbox.box-flex1,
.vbox.box-flex1,
.box-flex1 {
  /* Old browsers */
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  box-flex: 1;
  /* Modern browsers */
  flex: 1;
}
.hbox.box-flex,
.vbox.box-flex,
.box-flex {
  /* Old browsers */
  /* Old browsers */
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  box-flex: 1;
  /* Modern browsers */
  flex: 1;
}
.hbox.box-flex2,
.vbox.box-flex2,
.box-flex2 {
  /* Old browsers */
  -webkit-box-flex: 2;
  -moz-box-flex: 2;
  box-flex: 2;
  /* Modern browsers */
  flex: 2;
}
.box-group1 {
  /*  Deprecated */
  -webkit-box-flex-group: 1;
  -moz-box-flex-group: 1;
  box-flex-group: 1;
}
.box-group2 {
  /* Deprecated */
  -webkit-box-flex-group: 2;
  -moz-box-flex-group: 2;
  box-flex-group: 2;
}
.hbox.start,
.vbox.start,
.start {
  /* Old browsers */
  -webkit-box-pack: start;
  -moz-box-pack: start;
  box-pack: start;
  /* Modern browsers */
  justify-content: flex-start;
}
.hbox.end,
.vbox.end,
.end {
  /* Old browsers */
  -webkit-box-pack: end;
  -moz-box-pack: end;
  box-pack: end;
  /* Modern browsers */
  justify-content: flex-end;
}
.hbox.center,
.vbox.center,
.center {
  /* Old browsers */
  -webkit-box-pack: center;
  -moz-box-pack: center;
  box-pack: center;
  /* Modern browsers */
  justify-content: center;
}
.hbox.baseline,
.vbox.baseline,
.baseline {
  /* Old browsers */
  -webkit-box-pack: baseline;
  -moz-box-pack: baseline;
  box-pack: baseline;
  /* Modern browsers */
  justify-content: baseline;
}
.hbox.stretch,
.vbox.stretch,
.stretch {
  /* Old browsers */
  -webkit-box-pack: stretch;
  -moz-box-pack: stretch;
  box-pack: stretch;
  /* Modern browsers */
  justify-content: stretch;
}
.hbox.align-start,
.vbox.align-start,
.align-start {
  /* Old browsers */
  -webkit-box-align: start;
  -moz-box-align: start;
  box-align: start;
  /* Modern browsers */
  align-items: flex-start;
}
.hbox.align-end,
.vbox.align-end,
.align-end {
  /* Old browsers */
  -webkit-box-align: end;
  -moz-box-align: end;
  box-align: end;
  /* Modern browsers */
  align-items: flex-end;
}
.hbox.align-center,
.vbox.align-center,
.align-center {
  /* Old browsers */
  -webkit-box-align: center;
  -moz-box-align: center;
  box-align: center;
  /* Modern browsers */
  align-items: center;
}
.hbox.align-baseline,
.vbox.align-baseline,
.align-baseline {
  /* Old browsers */
  -webkit-box-align: baseline;
  -moz-box-align: baseline;
  box-align: baseline;
  /* Modern browsers */
  align-items: baseline;
}
.hbox.align-stretch,
.vbox.align-stretch,
.align-stretch {
  /* Old browsers */
  -webkit-box-align: stretch;
  -moz-box-align: stretch;
  box-align: stretch;
  /* Modern browsers */
  align-items: stretch;
}
div.error {
  margin: 2em;
  text-align: center;
}
div.error > h1 {
  font-size: 500%;
  line-height: normal;
}
div.error > p {
  font-size: 200%;
  line-height: normal;
}
div.traceback-wrapper {
  text-align: left;
  max-width: 800px;
  margin: auto;
}
div.traceback-wrapper pre.traceback {
  max-height: 600px;
  overflow: auto;
}
/**
 * Primary styles
 *
 * Author: Jupyter Development Team
 */
body {
  background-color: #fff;
  /* This makes sure that the body covers the entire window and needs to
       be in a different element than the display: box in wrapper below */
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  overflow: visible;
}
body > #header {
  /* Initially hidden to prevent FLOUC */
  display: none;
  background-color: #fff;
  /* Display over codemirror */
  position: relative;
  z-index: 100;
}
body > #header #header-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
  padding-bottom: 5px;
  padding-top: 5px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
body > #header .header-bar {
  width: 100%;
  height: 1px;
  background: #e7e7e7;
  margin-bottom: -1px;
}
@media print {
  body > #header {
    display: none !important;
  }
}
#header-spacer {
  width: 100%;
  visibility: hidden;
}
@media print {
  #header-spacer {
    display: none;
  }
}
#ipython_notebook {
  padding-left: 0px;
  padding-top: 1px;
  padding-bottom: 1px;
}
[dir="rtl"] #ipython_notebook {
  margin-right: 10px;
  margin-left: 0;
}
[dir="rtl"] #ipython_notebook.pull-left {
  float: right !important;
  float: right;
}
.flex-spacer {
  flex: 1;
}
#noscript {
  width: auto;
  padding-top: 16px;
  padding-bottom: 16px;
  text-align: center;
  font-size: 22px;
  color: red;
  font-weight: bold;
}
#ipython_notebook img {
  height: 28px;
}
#site {
  width: 100%;
  display: none;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  overflow: auto;
}
@media print {
  #site {
    height: auto !important;
  }
}
/* Smaller buttons */
.ui-button .ui-button-text {
  padding: 0.2em 0.8em;
  font-size: 77%;
}
input.ui-button {
  padding: 0.3em 0.9em;
}
span#kernel_logo_widget {
  margin: 0 10px;
}
span#login_widget {
  float: right;
}
[dir="rtl"] span#login_widget {
  float: left;
}
span#login_widget > .button,
#logout {
  color: #333;
  background-color: #fff;
  border-color: #ccc;
}
span#login_widget > .button:focus,
#logout:focus,
span#login_widget > .button.focus,
#logout.focus {
  color: #333;
  background-color: #e6e6e6;
  border-color: #8c8c8c;
}
span#login_widget > .button:hover,
#logout:hover {
  color: #333;
  background-color: #e6e6e6;
  border-color: #adadad;
}
span#login_widget > .button:active,
#logout:active,
span#login_widget > .button.active,
#logout.active,
.open > .dropdown-togglespan#login_widget > .button,
.open > .dropdown-toggle#logout {
  color: #333;
  background-color: #e6e6e6;
  border-color: #adadad;
}
span#login_widget > .button:active:hover,
#logout:active:hover,
span#login_widget > .button.active:hover,
#logout.active:hover,
.open > .dropdown-togglespan#login_widget > .button:hover,
.open > .dropdown-toggle#logout:hover,
span#login_widget > .button:active:focus,
#logout:active:focus,
span#login_widget > .button.active:focus,
#logout.active:focus,
.open > .dropdown-togglespan#login_widget > .button:focus,
.open > .dropdown-toggle#logout:focus,
span#login_widget > .button:active.focus,
#logout:active.focus,
span#login_widget > .button.active.focus,
#logout.active.focus,
.open > .dropdown-togglespan#login_widget > .button.focus,
.open > .dropdown-toggle#logout.focus {
  color: #333;
  background-color: #d4d4d4;
  border-color: #8c8c8c;
}
span#login_widget > .button:active,
#logout:active,
span#login_widget > .button.active,
#logout.active,
.open > .dropdown-togglespan#login_widget > .button,
.open > .dropdown-toggle#logout {
  background-image: none;
}
span#login_widget > .button.disabled:hover,
#logout.disabled:hover,
span#login_widget > .button[disabled]:hover,
#logout[disabled]:hover,
fieldset[disabled] span#login_widget > .button:hover,
fieldset[disabled] #logout:hover,
span#login_widget > .button.disabled:focus,
#logout.disabled:focus,
span#login_widget > .button[disabled]:focus,
#logout[disabled]:focus,
fieldset[disabled] span#login_widget > .button:focus,
fieldset[disabled] #logout:focus,
span#login_widget > .button.disabled.focus,
#logout.disabled.focus,
span#login_widget > .button[disabled].focus,
#logout[disabled].focus,
fieldset[disabled] span#login_widget > .button.focus,
fieldset[disabled] #logout.focus {
  background-color: #fff;
  border-color: #ccc;
}
span#login_widget > .button .badge,
#logout .badge {
  color: #fff;
  background-color: #333;
}
.nav-header {
  text-transform: none;
}
#header > span {
  margin-top: 10px;
}
.modal_stretch .modal-dialog {
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: vertical;
  -moz-box-align: stretch;
  display: box;
  box-orient: vertical;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 80vh;
}
.modal_stretch .modal-dialog .modal-body {
  max-height: calc(100vh - 200px);
  overflow: auto;
  flex: 1;
}
.modal-header {
  cursor: move;
}
@media (min-width: 768px) {
  .modal .modal-dialog {
    width: 700px;
  }
}
@media (min-width: 768px) {
  select.form-control {
    margin-left: 12px;
    margin-right: 12px;
  }
}
/*!
*
* IPython auth
*
*/
.center-nav {
  display: inline-block;
  margin-bottom: -4px;
}
[dir="rtl"] .center-nav form.pull-left {
  float: right !important;
  float: right;
}
[dir="rtl"] .center-nav .navbar-text {
  float: right;
}
[dir="rtl"] .navbar-inner {
  text-align: right;
}
[dir="rtl"] div.text-left {
  text-align: right;
}
/*!
*
* IPython tree view
*
*/
/* We need an invisible input field on top of the sentense*/
/* "Drag file onto the list ..." */
.alternate_upload {
  background-color: none;
  display: inline;
}
.alternate_upload.form {
  padding: 0;
  margin: 0;
}
.alternate_upload input.fileinput {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  opacity: 0;
  z-index: 2;
}
.alternate_upload .btn-xs > input.fileinput {
  margin: -1px -5px;
}
.alternate_upload .btn-upload {
  position: relative;
  height: 22px;
}
::-webkit-file-upload-button {
  cursor: pointer;
}
/**
 * Primary styles
 *
 * Author: Jupyter Development Team
 */
ul#tabs {
  margin-bottom: 4px;
}
ul#tabs a {
  padding-top: 6px;
  padding-bottom: 4px;
}
[dir="rtl"] ul#tabs.nav-tabs > li {
  float: right;
}
[dir="rtl"] ul#tabs.nav.nav-tabs {
  padding-right: 0;
}
ul.breadcrumb a:focus,
ul.breadcrumb a:hover {
  text-decoration: none;
}
ul.breadcrumb i.icon-home {
  font-size: 16px;
  margin-right: 4px;
}
ul.breadcrumb span {
  color: #5e5e5e;
}
.list_toolbar {
  padding: 4px 0 4px 0;
  vertical-align: middle;
}
.list_toolbar .tree-buttons {
  padding-top: 1px;
}
[dir="rtl"] .list_toolbar .tree-buttons .pull-right {
  float: left !important;
  float: left;
}
[dir="rtl"] .list_toolbar .col-sm-4,
[dir="rtl"] .list_toolbar .col-sm-8 {
  float: right;
}
.dynamic-buttons {
  padding-top: 3px;
  display: inline-block;
}
.list_toolbar [class*="span"] {
  min-height: 24px;
}
.list_header {
  font-weight: bold;
  background-color: #EEE;
}
.list_placeholder {
  font-weight: bold;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 7px;
  padding-right: 7px;
}
.list_container {
  margin-top: 4px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 2px;
}
.list_container > div {
  border-bottom: 1px solid #ddd;
}
.list_container > div:hover .list-item {
  background-color: red;
}
.list_container > div:last-child {
  border: none;
}
.list_item:hover .list_item {
  background-color: #ddd;
}
.list_item a {
  text-decoration: none;
}
.list_item:hover {
  background-color: #fafafa;
}
.list_header > div,
.list_item > div {
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 7px;
  padding-right: 7px;
  line-height: 22px;
}
.list_header > div input,
.list_item > div input {
  margin-right: 7px;
  margin-left: 14px;
  vertical-align: text-bottom;
  line-height: 22px;
  position: relative;
  top: -1px;
}
.list_header > div .item_link,
.list_item > div .item_link {
  margin-left: -1px;
  vertical-align: baseline;
  line-height: 22px;
}
[dir="rtl"] .list_item > div input {
  margin-right: 0;
}
.new-file input[type=checkbox] {
  visibility: hidden;
}
.item_name {
  line-height: 22px;
  height: 24px;
}
.item_icon {
  font-size: 14px;
  color: #5e5e5e;
  margin-right: 7px;
  margin-left: 7px;
  line-height: 22px;
  vertical-align: baseline;
}
.item_modified {
  margin-right: 7px;
  margin-left: 7px;
}
[dir="rtl"] .item_modified.pull-right {
  float: left !important;
  float: left;
}
.item_buttons {
  line-height: 1em;
  margin-left: -5px;
}
.item_buttons .btn,
.item_buttons .btn-group,
.item_buttons .input-group {
  float: left;
}
.item_buttons > .btn,
.item_buttons > .btn-group,
.item_buttons > .input-group {
  margin-left: 5px;
}
.item_buttons .btn {
  min-width: 13ex;
}
.item_buttons .running-indicator {
  padding-top: 4px;
  color: #5cb85c;
}
.item_buttons .kernel-name {
  padding-top: 4px;
  color: #5bc0de;
  margin-right: 7px;
  float: left;
}
[dir="rtl"] .item_buttons.pull-right {
  float: left !important;
  float: left;
}
[dir="rtl"] .item_buttons .kernel-name {
  margin-left: 7px;
  float: right;
}
.toolbar_info {
  height: 24px;
  line-height: 24px;
}
.list_item input:not([type=checkbox]) {
  padding-top: 3px;
  padding-bottom: 3px;
  height: 22px;
  line-height: 14px;
  margin: 0px;
}
.highlight_text {
  color: blue;
}
#project_name {
  display: inline-block;
  padding-left: 7px;
  margin-left: -2px;
}
#project_name > .breadcrumb {
  padding: 0px;
  margin-bottom: 0px;
  background-color: transparent;
  font-weight: bold;
}
.sort_button {
  display: inline-block;
  padding-left: 7px;
}
[dir="rtl"] .sort_button.pull-right {
  float: left !important;
  float: left;
}
#tree-selector {
  padding-right: 0px;
}
#button-select-all {
  min-width: 50px;
}
[dir="rtl"] #button-select-all.btn {
  float: right ;
}
#select-all {
  margin-left: 7px;
  margin-right: 2px;
  margin-top: 2px;
  height: 16px;
}
[dir="rtl"] #select-all.pull-left {
  float: right !important;
  float: right;
}
.menu_icon {
  margin-right: 2px;
}
.tab-content .row {
  margin-left: 0px;
  margin-right: 0px;
}
.folder_icon:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\f114";
}
.folder_icon:before.fa-pull-left {
  margin-right: .3em;
}
.folder_icon:before.fa-pull-right {
  margin-left: .3em;
}
.folder_icon:before.pull-left {
  margin-right: .3em;
}
.folder_icon:before.pull-right {
  margin-left: .3em;
}
.notebook_icon:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\f02d";
  position: relative;
  top: -1px;
}
.notebook_icon:before.fa-pull-left {
  margin-right: .3em;
}
.notebook_icon:before.fa-pull-right {
  margin-left: .3em;
}
.notebook_icon:before.pull-left {
  margin-right: .3em;
}
.notebook_icon:before.pull-right {
  margin-left: .3em;
}
.running_notebook_icon:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\f02d";
  position: relative;
  top: -1px;
  color: #5cb85c;
}
.running_notebook_icon:before.fa-pull-left {
  margin-right: .3em;
}
.running_notebook_icon:before.fa-pull-right {
  margin-left: .3em;
}
.running_notebook_icon:before.pull-left {
  margin-right: .3em;
}
.running_notebook_icon:before.pull-right {
  margin-left: .3em;
}
.file_icon:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\f016";
  position: relative;
  top: -2px;
}
.file_icon:before.fa-pull-left {
  margin-right: .3em;
}
.file_icon:before.fa-pull-right {
  margin-left: .3em;
}
.file_icon:before.pull-left {
  margin-right: .3em;
}
.file_icon:before.pull-right {
  margin-left: .3em;
}
#notebook_toolbar .pull-right {
  padding-top: 0px;
  margin-right: -1px;
}
ul#new-menu {
  left: auto;
  right: 0;
}
#new-menu .dropdown-header {
  font-size: 10px;
  border-bottom: 1px solid #e5e5e5;
  padding: 0 0 3px;
  margin: -3px 20px 0;
}
.kernel-menu-icon {
  padding-right: 12px;
  width: 24px;
  content: "\f096";
}
.kernel-menu-icon:before {
  content: "\f096";
}
.kernel-menu-icon-current:before {
  content: "\f00c";
}
#tab_content {
  padding-top: 20px;
}
#running .panel-group .panel {
  margin-top: 3px;
  margin-bottom: 1em;
}
#running .panel-group .panel .panel-heading {
  background-color: #EEE;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 7px;
  padding-right: 7px;
  line-height: 22px;
}
#running .panel-group .panel .panel-heading a:focus,
#running .panel-group .panel .panel-heading a:hover {
  text-decoration: none;
}
#running .panel-group .panel .panel-body {
  padding: 0px;
}
#running .panel-group .panel .panel-body .list_container {
  margin-top: 0px;
  margin-bottom: 0px;
  border: 0px;
  border-radius: 0px;
}
#running .panel-group .panel .panel-body .list_container .list_item {
  border-bottom: 1px solid #ddd;
}
#running .panel-group .panel .panel-body .list_container .list_item:last-child {
  border-bottom: 0px;
}
.delete-button {
  display: none;
}
.duplicate-button {
  display: none;
}
.rename-button {
  display: none;
}
.move-button {
  display: none;
}
.download-button {
  display: none;
}
.shutdown-button {
  display: none;
}
.dynamic-instructions {
  display: inline-block;
  padding-top: 4px;
}
/*!
*
* IPython text editor webapp
*
*/
.selected-keymap i.fa {
  padding: 0px 5px;
}
.selected-keymap i.fa:before {
  content: "\f00c";
}
#mode-menu {
  overflow: auto;
  max-height: 20em;
}
.edit_app #header {
  -webkit-box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
  box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
}
.edit_app #menubar .navbar {
  /* Use a negative 1 bottom margin, so the border overlaps the border of the
    header */
  margin-bottom: -1px;
}
.dirty-indicator {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 20px;
}
.dirty-indicator.fa-pull-left {
  margin-right: .3em;
}
.dirty-indicator.fa-pull-right {
  margin-left: .3em;
}
.dirty-indicator.pull-left {
  margin-right: .3em;
}
.dirty-indicator.pull-right {
  margin-left: .3em;
}
.dirty-indicator-dirty {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 20px;
}
.dirty-indicator-dirty.fa-pull-left {
  margin-right: .3em;
}
.dirty-indicator-dirty.fa-pull-right {
  margin-left: .3em;
}
.dirty-indicator-dirty.pull-left {
  margin-right: .3em;
}
.dirty-indicator-dirty.pull-right {
  margin-left: .3em;
}
.dirty-indicator-clean {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 20px;
}
.dirty-indicator-clean.fa-pull-left {
  margin-right: .3em;
}
.dirty-indicator-clean.fa-pull-right {
  margin-left: .3em;
}
.dirty-indicator-clean.pull-left {
  margin-right: .3em;
}
.dirty-indicator-clean.pull-right {
  margin-left: .3em;
}
.dirty-indicator-clean:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\f00c";
}
.dirty-indicator-clean:before.fa-pull-left {
  margin-right: .3em;
}
.dirty-indicator-clean:before.fa-pull-right {
  margin-left: .3em;
}
.dirty-indicator-clean:before.pull-left {
  margin-right: .3em;
}
.dirty-indicator-clean:before.pull-right {
  margin-left: .3em;
}
#filename {
  font-size: 16pt;
  display: table;
  padding: 0px 5px;
}
#current-mode {
  padding-left: 5px;
  padding-right: 5px;
}
#texteditor-backdrop {
  padding-top: 20px;
  padding-bottom: 20px;
}
@media not print {
  #texteditor-backdrop {
    background-color: #EEE;
  }
}
@media print {
  #texteditor-backdrop #texteditor-container .CodeMirror-gutter,
  #texteditor-backdrop #texteditor-container .CodeMirror-gutters {
    background-color: #fff;
  }
}
@media not print {
  #texteditor-backdrop #texteditor-container .CodeMirror-gutter,
  #texteditor-backdrop #texteditor-container .CodeMirror-gutters {
    background-color: #fff;
  }
}
@media not print {
  #texteditor-backdrop #texteditor-container {
    padding: 0px;
    background-color: #fff;
    -webkit-box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
    box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
  }
}
.CodeMirror-dialog {
  background-color: #fff;
}
/*!
*
* IPython notebook
*
*/
/* CSS font colors for translated ANSI escape sequences */
/* The color values are a mix of
   http://www.xcolors.net/dl/baskerville-ivorylight and
   http://www.xcolors.net/dl/euphrasia */
.ansi-black-fg {
  color: #3E424D;
}
.ansi-black-bg {
  background-color: #3E424D;
}
.ansi-black-intense-fg {
  color: #282C36;
}
.ansi-black-intense-bg {
  background-color: #282C36;
}
.ansi-red-fg {
  color: #E75C58;
}
.ansi-red-bg {
  background-color: #E75C58;
}
.ansi-red-intense-fg {
  color: #B22B31;
}
.ansi-red-intense-bg {
  background-color: #B22B31;
}
.ansi-green-fg {
  color: #00A250;
}
.ansi-green-bg {
  background-color: #00A250;
}
.ansi-green-intense-fg {
  color: #007427;
}
.ansi-green-intense-bg {
  background-color: #007427;
}
.ansi-yellow-fg {
  color: #DDB62B;
}
.ansi-yellow-bg {
  background-color: #DDB62B;
}
.ansi-yellow-intense-fg {
  color: #B27D12;
}
.ansi-yellow-intense-bg {
  background-color: #B27D12;
}
.ansi-blue-fg {
  color: #208FFB;
}
.ansi-blue-bg {
  background-color: #208FFB;
}
.ansi-blue-intense-fg {
  color: #0065CA;
}
.ansi-blue-intense-bg {
  background-color: #0065CA;
}
.ansi-magenta-fg {
  color: #D160C4;
}
.ansi-magenta-bg {
  background-color: #D160C4;
}
.ansi-magenta-intense-fg {
  color: #A03196;
}
.ansi-magenta-intense-bg {
  background-color: #A03196;
}
.ansi-cyan-fg {
  color: #60C6C8;
}
.ansi-cyan-bg {
  background-color: #60C6C8;
}
.ansi-cyan-intense-fg {
  color: #258F8F;
}
.ansi-cyan-intense-bg {
  background-color: #258F8F;
}
.ansi-white-fg {
  color: #C5C1B4;
}
.ansi-white-bg {
  background-color: #C5C1B4;
}
.ansi-white-intense-fg {
  color: #A1A6B2;
}
.ansi-white-intense-bg {
  background-color: #A1A6B2;
}
.ansi-default-inverse-fg {
  color: #FFFFFF;
}
.ansi-default-inverse-bg {
  background-color: #000000;
}
.ansi-bold {
  font-weight: bold;
}
.ansi-underline {
  text-decoration: underline;
}
/* The following styles are deprecated an will be removed in a future version */
.ansibold {
  font-weight: bold;
}
.ansi-inverse {
  outline: 0.5px dotted;
}
/* use dark versions for foreground, to improve visibility */
.ansiblack {
  color: black;
}
.ansired {
  color: darkred;
}
.ansigreen {
  color: darkgreen;
}
.ansiyellow {
  color: #c4a000;
}
.ansiblue {
  color: darkblue;
}
.ansipurple {
  color: darkviolet;
}
.ansicyan {
  color: steelblue;
}
.ansigray {
  color: gray;
}
/* and light for background, for the same reason */
.ansibgblack {
  background-color: black;
}
.ansibgred {
  background-color: red;
}
.ansibggreen {
  background-color: green;
}
.ansibgyellow {
  background-color: yellow;
}
.ansibgblue {
  background-color: blue;
}
.ansibgpurple {
  background-color: magenta;
}
.ansibgcyan {
  background-color: cyan;
}
.ansibggray {
  background-color: gray;
}
div.cell {
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: vertical;
  -moz-box-align: stretch;
  display: box;
  box-orient: vertical;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: 2px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  width: 100%;
  padding: 5px;
  /* This acts as a spacer between cells, that is outside the border */
  margin: 0px;
  outline: none;
  position: relative;
  overflow: visible;
}
div.cell:before {
  position: absolute;
  display: block;
  top: -1px;
  left: -1px;
  width: 5px;
  height: calc(100% +  2px);
  content: '';
  background: transparent;
}
div.cell.jupyter-soft-selected {
  border-left-color: #E3F2FD;
  border-left-width: 1px;
  padding-left: 5px;
  border-right-color: #E3F2FD;
  border-right-width: 1px;
  background: #E3F2FD;
}
@media print {
  div.cell.jupyter-soft-selected {
    border-color: transparent;
  }
}
div.cell.selected,
div.cell.selected.jupyter-soft-selected {
  border-color: #ababab;
}
div.cell.selected:before,
div.cell.selected.jupyter-soft-selected:before {
  position: absolute;
  display: block;
  top: -1px;
  left: -1px;
  width: 5px;
  height: calc(100% +  2px);
  content: '';
  background: #42A5F5;
}
@media print {
  div.cell.selected,
  div.cell.selected.jupyter-soft-selected {
    border-color: transparent;
  }
}
.edit_mode div.cell.selected {
  border-color: #66BB6A;
}
.edit_mode div.cell.selected:before {
  position: absolute;
  display: block;
  top: -1px;
  left: -1px;
  width: 5px;
  height: calc(100% +  2px);
  content: '';
  background: #66BB6A;
}
@media print {
  .edit_mode div.cell.selected {
    border-color: transparent;
  }
}
.prompt {
  /* This needs to be wide enough for 3 digit prompt numbers: In[100]: */
  min-width: 14ex;
  /* This padding is tuned to match the padding on the CodeMirror editor. */
  padding: 0.4em;
  margin: 0px;
  font-family: monospace;
  text-align: right;
  /* This has to match that of the the CodeMirror class line-height below */
  line-height: 1.21429em;
  /* Don't highlight prompt number selection */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  /* Use default cursor */
  cursor: default;
}
@media (max-width: 540px) {
  .prompt {
    text-align: left;
  }
}
div.inner_cell {
  min-width: 0;
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: vertical;
  -moz-box-align: stretch;
  display: box;
  box-orient: vertical;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  /* Old browsers */
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  box-flex: 1;
  /* Modern browsers */
  flex: 1;
}
/* input_area and input_prompt must match in top border and margin for alignment */
div.input_area {
  border: 1px solid #cfcfcf;
  border-radius: 2px;
  background: #f7f7f7;
  line-height: 1.21429em;
}
/* This is needed so that empty prompt areas can collapse to zero height when there
   is no content in the output_subarea and the prompt. The main purpose of this is
   to make sure that empty JavaScript output_subareas have no height. */
div.prompt:empty {
  padding-top: 0;
  padding-bottom: 0;
}
div.unrecognized_cell {
  padding: 5px 5px 5px 0px;
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: horizontal;
  -moz-box-align: stretch;
  display: box;
  box-orient: horizontal;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: row;
  align-items: stretch;
}
div.unrecognized_cell .inner_cell {
  border-radius: 2px;
  padding: 5px;
  font-weight: bold;
  color: red;
  border: 1px solid #cfcfcf;
  background: #eaeaea;
}
div.unrecognized_cell .inner_cell a {
  color: inherit;
  text-decoration: none;
}
div.unrecognized_cell .inner_cell a:hover {
  color: inherit;
  text-decoration: none;
}
@media (max-width: 540px) {
  div.unrecognized_cell > div.prompt {
    display: none;
  }
}
div.code_cell {
  /* avoid page breaking on code cells when printing */
}
@media print {
  div.code_cell {
    page-break-inside: avoid;
  }
}
/* any special styling for code cells that are currently running goes here */
div.input {
  page-break-inside: avoid;
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: horizontal;
  -moz-box-align: stretch;
  display: box;
  box-orient: horizontal;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: row;
  align-items: stretch;
}
@media (max-width: 540px) {
  div.input {
    /* Old browsers */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-box-align: stretch;
    display: -moz-box;
    -moz-box-orient: vertical;
    -moz-box-align: stretch;
    display: box;
    box-orient: vertical;
    box-align: stretch;
    /* Modern browsers */
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
}
/* input_area and input_prompt must match in top border and margin for alignment */
div.input_prompt {
  color: #303F9F;
  border-top: 1px solid transparent;
}
div.input_area > div.highlight {
  margin: 0.4em;
  border: none;
  padding: 0px;
  background-color: transparent;
}
div.input_area > div.highlight > pre {
  margin: 0px;
  border: none;
  padding: 0px;
  background-color: transparent;
}
/* The following gets added to the <head> if it is detected that the user has a
 * monospace font with inconsistent normal/bold/italic height.  See
 * notebookmain.js.  Such fonts will have keywords vertically offset with
 * respect to the rest of the text.  The user should select a better font.
 * See: https://github.com/ipython/ipython/issues/1503
 *
 * .CodeMirror span {
 *      vertical-align: bottom;
 * }
 */
.CodeMirror {
  line-height: 1.21429em;
  /* Changed from 1em to our global default */
  font-size: 14px;
  height: auto;
  /* Changed to auto to autogrow */
  background: none;
  /* Changed from white to allow our bg to show through */
}
.CodeMirror-scroll {
  /*  The CodeMirror docs are a bit fuzzy on if overflow-y should be hidden or visible.*/
  /*  We have found that if it is visible, vertical scrollbars appear with font size changes.*/
  overflow-y: hidden;
  overflow-x: auto;
}
.CodeMirror-lines {
  /* In CM2, this used to be 0.4em, but in CM3 it went to 4px. We need the em value because */
  /* we have set a different line-height and want this to scale with that. */
  /* Note that this should set vertical padding only, since CodeMirror assumes
       that horizontal padding will be set on CodeMirror pre */
  padding: 0.4em 0;
}
.CodeMirror-linenumber {
  padding: 0 8px 0 4px;
}
.CodeMirror-gutters {
  border-bottom-left-radius: 2px;
  border-top-left-radius: 2px;
}
.CodeMirror pre {
  /* In CM3 this went to 4px from 0 in CM2. This sets horizontal padding only,
    use .CodeMirror-lines for vertical */
  padding: 0 0.4em;
  border: 0;
  border-radius: 0;
}
.CodeMirror-cursor {
  border-left: 1.4px solid black;
}
@media screen and (min-width: 2138px) and (max-width: 4319px) {
  .CodeMirror-cursor {
    border-left: 2px solid black;
  }
}
@media screen and (min-width: 4320px) {
  .CodeMirror-cursor {
    border-left: 4px solid black;
  }
}
/*

Original style from softwaremaniacs.org (c) Ivan Sagalaev <Maniac@SoftwareManiacs.Org>
Adapted from GitHub theme

*/
.highlight-base {
  color: #000;
}
.highlight-variable {
  color: #000;
}
.highlight-variable-2 {
  color: #1a1a1a;
}
.highlight-variable-3 {
  color: #333333;
}
.highlight-string {
  color: #BA2121;
}
.highlight-comment {
  color: #408080;
  font-style: italic;
}
.highlight-number {
  color: #080;
}
.highlight-atom {
  color: #88F;
}
.highlight-keyword {
  color: #008000;
  font-weight: bold;
}
.highlight-builtin {
  color: #008000;
}
.highlight-error {
  color: #f00;
}
.highlight-operator {
  color: #AA22FF;
  font-weight: bold;
}
.highlight-meta {
  color: #AA22FF;
}
/* previously not defined, copying from default codemirror */
.highlight-def {
  color: #00f;
}
.highlight-string-2 {
  color: #f50;
}
.highlight-qualifier {
  color: #555;
}
.highlight-bracket {
  color: #997;
}
.highlight-tag {
  color: #170;
}
.highlight-attribute {
  color: #00c;
}
.highlight-header {
  color: blue;
}
.highlight-quote {
  color: #090;
}
.highlight-link {
  color: #00c;
}
/* apply the same style to codemirror */
.cm-s-ipython span.cm-keyword {
  color: #008000;
  font-weight: bold;
}
.cm-s-ipython span.cm-atom {
  color: #88F;
}
.cm-s-ipython span.cm-number {
  color: #080;
}
.cm-s-ipython span.cm-def {
  color: #00f;
}
.cm-s-ipython span.cm-variable {
  color: #000;
}
.cm-s-ipython span.cm-operator {
  color: #AA22FF;
  font-weight: bold;
}
.cm-s-ipython span.cm-variable-2 {
  color: #1a1a1a;
}
.cm-s-ipython span.cm-variable-3 {
  color: #333333;
}
.cm-s-ipython span.cm-comment {
  color: #408080;
  font-style: italic;
}
.cm-s-ipython span.cm-string {
  color: #BA2121;
}
.cm-s-ipython span.cm-string-2 {
  color: #f50;
}
.cm-s-ipython span.cm-meta {
  color: #AA22FF;
}
.cm-s-ipython span.cm-qualifier {
  color: #555;
}
.cm-s-ipython span.cm-builtin {
  color: #008000;
}
.cm-s-ipython span.cm-bracket {
  color: #997;
}
.cm-s-ipython span.cm-tag {
  color: #170;
}
.cm-s-ipython span.cm-attribute {
  color: #00c;
}
.cm-s-ipython span.cm-header {
  color: blue;
}
.cm-s-ipython span.cm-quote {
  color: #090;
}
.cm-s-ipython span.cm-link {
  color: #00c;
}
.cm-s-ipython span.cm-error {
  color: #f00;
}
.cm-s-ipython span.cm-tab {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAMCAYAAAAkuj5RAAAAAXNSR0IArs4c6QAAAGFJREFUSMft1LsRQFAQheHPowAKoACx3IgEKtaEHujDjORSgWTH/ZOdnZOcM/sgk/kFFWY0qV8foQwS4MKBCS3qR6ixBJvElOobYAtivseIE120FaowJPN75GMu8j/LfMwNjh4HUpwg4LUAAAAASUVORK5CYII=);
  background-position: right;
  background-repeat: no-repeat;
}
div.output_wrapper {
  /* this position must be relative to enable descendents to be absolute within it */
  position: relative;
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: vertical;
  -moz-box-align: stretch;
  display: box;
  box-orient: vertical;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  z-index: 1;
}
/* class for the output area when it should be height-limited */
div.output_scroll {
  /* ideally, this would be max-height, but FF barfs all over that */
  height: 24em;
  /* FF needs this *and the wrapper* to specify full width, or it will shrinkwrap */
  width: 100%;
  overflow: auto;
  border-radius: 2px;
  -webkit-box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.8);
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.8);
  display: block;
}
/* output div while it is collapsed */
div.output_collapsed {
  margin: 0px;
  padding: 0px;
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: vertical;
  -moz-box-align: stretch;
  display: box;
  box-orient: vertical;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
div.out_prompt_overlay {
  height: 100%;
  padding: 0px 0.4em;
  position: absolute;
  border-radius: 2px;
}
div.out_prompt_overlay:hover {
  /* use inner shadow to get border that is computed the same on WebKit/FF */
  -webkit-box-shadow: inset 0 0 1px #000;
  box-shadow: inset 0 0 1px #000;
  background: rgba(240, 240, 240, 0.5);
}
div.output_prompt {
  color: #D84315;
}
/* This class is the outer container of all output sections. */
div.output_area {
  padding: 0px;
  page-break-inside: avoid;
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: horizontal;
  -moz-box-align: stretch;
  display: box;
  box-orient: horizontal;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: row;
  align-items: stretch;
}
div.output_area .MathJax_Display {
  text-align: left !important;
}
div.output_area .rendered_html table {
  margin-left: 0;
  margin-right: 0;
}
div.output_area .rendered_html img {
  margin-left: 0;
  margin-right: 0;
}
div.output_area img,
div.output_area svg {
  max-width: 100%;
  height: auto;
}
div.output_area img.unconfined,
div.output_area svg.unconfined {
  max-width: none;
}
div.output_area .mglyph > img {
  max-width: none;
}
/* This is needed to protect the pre formating from global settings such
   as that of bootstrap */
.output {
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: vertical;
  -moz-box-align: stretch;
  display: box;
  box-orient: vertical;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
@media (max-width: 540px) {
  div.output_area {
    /* Old browsers */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-box-align: stretch;
    display: -moz-box;
    -moz-box-orient: vertical;
    -moz-box-align: stretch;
    display: box;
    box-orient: vertical;
    box-align: stretch;
    /* Modern browsers */
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
}
div.output_area pre {
  margin: 0;
  padding: 1px 0 1px 0;
  border: 0;
  vertical-align: baseline;
  color: black;
  background-color: transparent;
  border-radius: 0;
}
/* This class is for the output subarea inside the output_area and after
   the prompt div. */
div.output_subarea {
  overflow-x: auto;
  padding: 0.4em;
  /* Old browsers */
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  box-flex: 1;
  /* Modern browsers */
  flex: 1;
  max-width: calc(100% - 14ex);
}
div.output_scroll div.output_subarea {
  overflow-x: visible;
}
/* The rest of the output_* classes are for special styling of the different
   output types */
/* all text output has this class: */
div.output_text {
  text-align: left;
  color: #000;
  /* This has to match that of the the CodeMirror class line-height below */
  line-height: 1.21429em;
}
/* stdout/stderr are 'text' as well as 'stream', but execute_result/error are *not* streams */
div.output_stderr {
  background: #fdd;
  /* very light red background for stderr */
}
div.output_latex {
  text-align: left;
}
/* Empty output_javascript divs should have no height */
div.output_javascript:empty {
  padding: 0;
}
.js-error {
  color: darkred;
}
/* raw_input styles */
div.raw_input_container {
  line-height: 1.21429em;
  padding-top: 5px;
}
pre.raw_input_prompt {
  /* nothing needed here. */
}
input.raw_input {
  font-family: monospace;
  font-size: inherit;
  color: inherit;
  width: auto;
  /* make sure input baseline aligns with prompt */
  vertical-align: baseline;
  /* padding + margin = 0.5em between prompt and cursor */
  padding: 0em 0.25em;
  margin: 0em 0.25em;
}
input.raw_input:focus {
  box-shadow: none;
}
p.p-space {
  margin-bottom: 10px;
}
div.output_unrecognized {
  padding: 5px;
  font-weight: bold;
  color: red;
}
div.output_unrecognized a {
  color: inherit;
  text-decoration: none;
}
div.output_unrecognized a:hover {
  color: inherit;
  text-decoration: none;
}
.rendered_html {
  color: #000;
  /* any extras will just be numbers: */
}
.rendered_html em {
  font-style: italic;
}
.rendered_html strong {
  font-weight: bold;
}
.rendered_html u {
  text-decoration: underline;
}
.rendered_html :link {
  text-decoration: underline;
}
.rendered_html :visited {
  text-decoration: underline;
}
.rendered_html h1 {
  font-size: 185.7%;
  margin: 1.08em 0 0 0;
  font-weight: bold;
  line-height: 1.0;
}
.rendered_html h2 {
  font-size: 157.1%;
  margin: 1.27em 0 0 0;
  font-weight: bold;
  line-height: 1.0;
}
.rendered_html h3 {
  font-size: 128.6%;
  margin: 1.55em 0 0 0;
  font-weight: bold;
  line-height: 1.0;
}
.rendered_html h4 {
  font-size: 100%;
  margin: 2em 0 0 0;
  font-weight: bold;
  line-height: 1.0;
}
.rendered_html h5 {
  font-size: 100%;
  margin: 2em 0 0 0;
  font-weight: bold;
  line-height: 1.0;
  font-style: italic;
}
.rendered_html h6 {
  font-size: 100%;
  margin: 2em 0 0 0;
  font-weight: bold;
  line-height: 1.0;
  font-style: italic;
}
.rendered_html h1:first-child {
  margin-top: 0.538em;
}
.rendered_html h2:first-child {
  margin-top: 0.636em;
}
.rendered_html h3:first-child {
  margin-top: 0.777em;
}
.rendered_html h4:first-child {
  margin-top: 1em;
}
.rendered_html h5:first-child {
  margin-top: 1em;
}
.rendered_html h6:first-child {
  margin-top: 1em;
}
.rendered_html ul:not(.list-inline),
.rendered_html ol:not(.list-inline) {
  padding-left: 2em;
}
.rendered_html ul {
  list-style: disc;
}
.rendered_html ul ul {
  list-style: square;
  margin-top: 0;
}
.rendered_html ul ul ul {
  list-style: circle;
}
.rendered_html ol {
  list-style: decimal;
}
.rendered_html ol ol {
  list-style: upper-alpha;
  margin-top: 0;
}
.rendered_html ol ol ol {
  list-style: lower-alpha;
}
.rendered_html ol ol ol ol {
  list-style: lower-roman;
}
.rendered_html ol ol ol ol ol {
  list-style: decimal;
}
.rendered_html * + ul {
  margin-top: 1em;
}
.rendered_html * + ol {
  margin-top: 1em;
}
.rendered_html hr {
  color: black;
  background-color: black;
}
.rendered_html pre {
  margin: 1em 2em;
  padding: 0px;
  background-color: #fff;
}
.rendered_html code {
  background-color: #eff0f1;
}
.rendered_html p code {
  padding: 1px 5px;
}
.rendered_html pre code {
  background-color: #fff;
}
.rendered_html pre,
.rendered_html code {
  border: 0;
  color: #000;
  font-size: 100%;
}
.rendered_html blockquote {
  margin: 1em 2em;
}
.rendered_html table {
  margin-left: auto;
  margin-right: auto;
  border: none;
  border-collapse: collapse;
  border-spacing: 0;
  color: black;
  font-size: 12px;
  table-layout: fixed;
}
.rendered_html thead {
  border-bottom: 1px solid black;
  vertical-align: bottom;
}
.rendered_html tr,
.rendered_html th,
.rendered_html td {
  text-align: right;
  vertical-align: middle;
  padding: 0.5em 0.5em;
  line-height: normal;
  white-space: normal;
  max-width: none;
  border: none;
}
.rendered_html th {
  font-weight: bold;
}
.rendered_html tbody tr:nth-child(odd) {
  background: #f5f5f5;
}
.rendered_html tbody tr:hover {
  background: rgba(66, 165, 245, 0.2);
}
.rendered_html * + table {
  margin-top: 1em;
}
.rendered_html p {
  text-align: left;
}
.rendered_html * + p {
  margin-top: 1em;
}
.rendered_html img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.rendered_html * + img {
  margin-top: 1em;
}
.rendered_html img,
.rendered_html svg {
  max-width: 100%;
  height: auto;
}
.rendered_html img.unconfined,
.rendered_html svg.unconfined {
  max-width: none;
}
.rendered_html .alert {
  margin-bottom: initial;
}
.rendered_html * + .alert {
  margin-top: 1em;
}
[dir="rtl"] .rendered_html p {
  text-align: right;
}
div.text_cell {
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: horizontal;
  -moz-box-align: stretch;
  display: box;
  box-orient: horizontal;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: row;
  align-items: stretch;
}
@media (max-width: 540px) {
  div.text_cell > div.prompt {
    display: none;
  }
}
div.text_cell_render {
  /*font-family: "Helvetica Neue", Arial, Helvetica, Geneva, sans-serif;*/
  outline: none;
  resize: none;
  width: inherit;
  border-style: none;
  padding: 0.5em 0.5em 0.5em 0.4em;
  color: #000;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
a.anchor-link:link {
  text-decoration: none;
  padding: 0px 20px;
  visibility: hidden;
}
h1:hover .anchor-link,
h2:hover .anchor-link,
h3:hover .anchor-link,
h4:hover .anchor-link,
h5:hover .anchor-link,
h6:hover .anchor-link {
  visibility: visible;
}
.text_cell.rendered .input_area {
  display: none;
}
.text_cell.rendered .rendered_html {
  overflow-x: auto;
  overflow-y: hidden;
}
.text_cell.rendered .rendered_html tr,
.text_cell.rendered .rendered_html th,
.text_cell.rendered .rendered_html td {
  max-width: none;
}
.text_cell.unrendered .text_cell_render {
  display: none;
}
.text_cell .dropzone .input_area {
  border: 2px dashed #bababa;
  margin: -1px;
}
.cm-header-1,
.cm-header-2,
.cm-header-3,
.cm-header-4,
.cm-header-5,
.cm-header-6 {
  font-weight: bold;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
.cm-header-1 {
  font-size: 185.7%;
}
.cm-header-2 {
  font-size: 157.1%;
}
.cm-header-3 {
  font-size: 128.6%;
}
.cm-header-4 {
  font-size: 110%;
}
.cm-header-5 {
  font-size: 100%;
  font-style: italic;
}
.cm-header-6 {
  font-size: 100%;
  font-style: italic;
}
/*!
*
* IPython notebook webapp
*
*/
@media (max-width: 767px) {
  .notebook_app {
    padding-left: 0px;
    padding-right: 0px;
  }
}
#ipython-main-app {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  height: 100%;
}
div#notebook_panel {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  height: 100%;
}
div#notebook {
  font-size: 14px;
  line-height: 20px;
  overflow-y: hidden;
  overflow-x: auto;
  width: 100%;
  /* This spaces the page away from the edge of the notebook area */
  padding-top: 20px;
  margin: 0px;
  outline: none;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  min-height: 100%;
}
@media not print {
  #notebook-container {
    padding: 15px;
    background-color: #fff;
    min-height: 0;
    -webkit-box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
    box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
  }
}
@media print {
  #notebook-container {
    width: 100%;
  }
}
div.ui-widget-content {
  border: 1px solid #ababab;
  outline: none;
}
pre.dialog {
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0.4em;
  padding-left: 2em;
}
p.dialog {
  padding: 0.2em;
}
/* Word-wrap output correctly.  This is the CSS3 spelling, though Firefox seems
   to not honor it correctly.  Webkit browsers (Chrome, rekonq, Safari) do.
 */
pre,
code,
kbd,
samp {
  white-space: pre-wrap;
}
#fonttest {
  font-family: monospace;
}
p {
  margin-bottom: 0;
}
.end_space {
  min-height: 100px;
  transition: height .2s ease;
}
.notebook_app > #header {
  -webkit-box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
  box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
}
@media not print {
  .notebook_app {
    background-color: #EEE;
  }
}
kbd {
  border-style: solid;
  border-width: 1px;
  box-shadow: none;
  margin: 2px;
  padding-left: 2px;
  padding-right: 2px;
  padding-top: 1px;
  padding-bottom: 1px;
}
.jupyter-keybindings {
  padding: 1px;
  line-height: 24px;
  border-bottom: 1px solid gray;
}
.jupyter-keybindings input {
  margin: 0;
  padding: 0;
  border: none;
}
.jupyter-keybindings i {
  padding: 6px;
}
.well code {
  background-color: #ffffff;
  border-color: #ababab;
  border-width: 1px;
  border-style: solid;
  padding: 2px;
  padding-top: 1px;
  padding-bottom: 1px;
}
/* CSS for the cell toolbar */
.celltoolbar {
  border: thin solid #CFCFCF;
  border-bottom: none;
  background: #EEE;
  border-radius: 2px 2px 0px 0px;
  width: 100%;
  height: 29px;
  padding-right: 4px;
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: horizontal;
  -moz-box-align: stretch;
  display: box;
  box-orient: horizontal;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: row;
  align-items: stretch;
  /* Old browsers */
  -webkit-box-pack: end;
  -moz-box-pack: end;
  box-pack: end;
  /* Modern browsers */
  justify-content: flex-end;
  display: -webkit-flex;
}
@media print {
  .celltoolbar {
    display: none;
  }
}
.ctb_hideshow {
  display: none;
  vertical-align: bottom;
}
/* ctb_show is added to the ctb_hideshow div to show the cell toolbar.
   Cell toolbars are only shown when the ctb_global_show class is also set.
*/
.ctb_global_show .ctb_show.ctb_hideshow {
  display: block;
}
.ctb_global_show .ctb_show + .input_area,
.ctb_global_show .ctb_show + div.text_cell_input,
.ctb_global_show .ctb_show ~ div.text_cell_render {
  border-top-right-radius: 0px;
  border-top-left-radius: 0px;
}
.ctb_global_show .ctb_show ~ div.text_cell_render {
  border: 1px solid #cfcfcf;
}
.celltoolbar {
  font-size: 87%;
  padding-top: 3px;
}
.celltoolbar select {
  display: block;
  width: 100%;
  height: 32px;
  padding: 6px 12px;
  font-size: 13px;
  line-height: 1.42857143;
  color: #555555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 2px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  height: 30px;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 1px;
  width: inherit;
  font-size: inherit;
  height: 22px;
  padding: 0px;
  display: inline-block;
}
.celltoolbar select:focus {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);
}
.celltoolbar select::-moz-placeholder {
  color: #999;
  opacity: 1;
}
.celltoolbar select:-ms-input-placeholder {
  color: #999;
}
.celltoolbar select::-webkit-input-placeholder {
  color: #999;
}
.celltoolbar select::-ms-expand {
  border: 0;
  background-color: transparent;
}
.celltoolbar select[disabled],
.celltoolbar select[readonly],
fieldset[disabled] .celltoolbar select {
  background-color: #eeeeee;
  opacity: 1;
}
.celltoolbar select[disabled],
fieldset[disabled] .celltoolbar select {
  cursor: not-allowed;
}
textarea.celltoolbar select {
  height: auto;
}
select.celltoolbar select {
  height: 30px;
  line-height: 30px;
}
textarea.celltoolbar select,
select[multiple].celltoolbar select {
  height: auto;
}
.celltoolbar label {
  margin-left: 5px;
  margin-right: 5px;
}
.tags_button_container {
  width: 100%;
  display: flex;
}
.tag-container {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  overflow: hidden;
  position: relative;
}
.tag-container > * {
  margin: 0 4px;
}
.remove-tag-btn {
  margin-left: 4px;
}
.tags-input {
  display: flex;
}
.cell-tag:last-child:after {
  content: "";
  position: absolute;
  right: 0;
  width: 40px;
  height: 100%;
  /* Fade to background color of cell toolbar */
  background: linear-gradient(to right, rgba(0, 0, 0, 0), #EEE);
}
.tags-input > * {
  margin-left: 4px;
}
.cell-tag,
.tags-input input,
.tags-input button {
  display: block;
  width: 100%;
  height: 32px;
  padding: 6px 12px;
  font-size: 13px;
  line-height: 1.42857143;
  color: #555555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 2px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  height: 30px;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 1px;
  box-shadow: none;
  width: inherit;
  font-size: inherit;
  height: 22px;
  line-height: 22px;
  padding: 0px 4px;
  display: inline-block;
}
.cell-tag:focus,
.tags-input input:focus,
.tags-input button:focus {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, 0.6);
}
.cell-tag::-moz-placeholder,
.tags-input input::-moz-placeholder,
.tags-input button::-moz-placeholder {
  color: #999;
  opacity: 1;
}
.cell-tag:-ms-input-placeholder,
.tags-input input:-ms-input-placeholder,
.tags-input button:-ms-input-placeholder {
  color: #999;
}
.cell-tag::-webkit-input-placeholder,
.tags-input input::-webkit-input-placeholder,
.tags-input button::-webkit-input-placeholder {
  color: #999;
}
.cell-tag::-ms-expand,
.tags-input input::-ms-expand,
.tags-input button::-ms-expand {
  border: 0;
  background-color: transparent;
}
.cell-tag[disabled],
.tags-input input[disabled],
.tags-input button[disabled],
.cell-tag[readonly],
.tags-input input[readonly],
.tags-input button[readonly],
fieldset[disabled] .cell-tag,
fieldset[disabled] .tags-input input,
fieldset[disabled] .tags-input button {
  background-color: #eeeeee;
  opacity: 1;
}
.cell-tag[disabled],
.tags-input input[disabled],
.tags-input button[disabled],
fieldset[disabled] .cell-tag,
fieldset[disabled] .tags-input input,
fieldset[disabled] .tags-input button {
  cursor: not-allowed;
}
textarea.cell-tag,
textarea.tags-input input,
textarea.tags-input button {
  height: auto;
}
select.cell-tag,
select.tags-input input,
select.tags-input button {
  height: 30px;
  line-height: 30px;
}
textarea.cell-tag,
textarea.tags-input input,
textarea.tags-input button,
select[multiple].cell-tag,
select[multiple].tags-input input,
select[multiple].tags-input button {
  height: auto;
}
.cell-tag,
.tags-input button {
  padding: 0px 4px;
}
.cell-tag {
  background-color: #fff;
  white-space: nowrap;
}
.tags-input input[type=text]:focus {
  outline: none;
  box-shadow: none;
  border-color: #ccc;
}
.completions {
  position: absolute;
  z-index: 110;
  overflow: hidden;
  border: 1px solid #ababab;
  border-radius: 2px;
  -webkit-box-shadow: 0px 6px 10px -1px #adadad;
  box-shadow: 0px 6px 10px -1px #adadad;
  line-height: 1;
}
.completions select {
  background: white;
  outline: none;
  border: none;
  padding: 0px;
  margin: 0px;
  overflow: auto;
  font-family: monospace;
  font-size: 110%;
  color: #000;
  width: auto;
}
.completions select option.context {
  color: #286090;
}
#kernel_logo_widget .current_kernel_logo {
  display: none;
  margin-top: -1px;
  margin-bottom: -1px;
  width: 32px;
  height: 32px;
}
[dir="rtl"] #kernel_logo_widget {
  float: left !important;
  float: left;
}
.modal .modal-body .move-path {
  display: flex;
  flex-direction: row;
  justify-content: space;
  align-items: center;
}
.modal .modal-body .move-path .server-root {
  padding-right: 20px;
}
.modal .modal-body .move-path .path-input {
  flex: 1;
}
#menubar {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  margin-top: 1px;
}
#menubar .navbar {
  border-top: 1px;
  border-radius: 0px 0px 2px 2px;
  margin-bottom: 0px;
}
#menubar .navbar-toggle {
  float: left;
  padding-top: 7px;
  padding-bottom: 7px;
  border: none;
}
#menubar .navbar-collapse {
  clear: left;
}
[dir="rtl"] #menubar .navbar-toggle {
  float: right;
}
[dir="rtl"] #menubar .navbar-collapse {
  clear: right;
}
[dir="rtl"] #menubar .navbar-nav {
  float: right;
}
[dir="rtl"] #menubar .nav {
  padding-right: 0px;
}
[dir="rtl"] #menubar .navbar-nav > li {
  float: right;
}
[dir="rtl"] #menubar .navbar-right {
  float: left !important;
}
[dir="rtl"] ul.dropdown-menu {
  text-align: right;
  left: auto;
}
[dir="rtl"] ul#new-menu.dropdown-menu {
  right: auto;
  left: 0;
}
.nav-wrapper {
  border-bottom: 1px solid #e7e7e7;
}
i.menu-icon {
  padding-top: 4px;
}
[dir="rtl"] i.menu-icon.pull-right {
  float: left !important;
  float: left;
}
ul#help_menu li a {
  overflow: hidden;
  padding-right: 2.2em;
}
ul#help_menu li a i {
  margin-right: -1.2em;
}
[dir="rtl"] ul#help_menu li a {
  padding-left: 2.2em;
}
[dir="rtl"] ul#help_menu li a i {
  margin-right: 0;
  margin-left: -1.2em;
}
[dir="rtl"] ul#help_menu li a i.pull-right {
  float: left !important;
  float: left;
}
.dropdown-submenu {
  position: relative;
}
.dropdown-submenu > .dropdown-menu {
  top: 0;
  left: 100%;
  margin-top: -6px;
  margin-left: -1px;
}
[dir="rtl"] .dropdown-submenu > .dropdown-menu {
  right: 100%;
  margin-right: -1px;
}
.dropdown-submenu:hover > .dropdown-menu {
  display: block;
}
.dropdown-submenu > a:after {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: block;
  content: "\f0da";
  float: right;
  color: #333333;
  margin-top: 2px;
  margin-right: -10px;
}
.dropdown-submenu > a:after.fa-pull-left {
  margin-right: .3em;
}
.dropdown-submenu > a:after.fa-pull-right {
  margin-left: .3em;
}
.dropdown-submenu > a:after.pull-left {
  margin-right: .3em;
}
.dropdown-submenu > a:after.pull-right {
  margin-left: .3em;
}
[dir="rtl"] .dropdown-submenu > a:after {
  float: left;
  content: "\f0d9";
  margin-right: 0;
  margin-left: -10px;
}
.dropdown-submenu:hover > a:after {
  color: #262626;
}
.dropdown-submenu.pull-left {
  float: none;
}
.dropdown-submenu.pull-left > .dropdown-menu {
  left: -100%;
  margin-left: 10px;
}
#notification_area {
  float: right !important;
  float: right;
  z-index: 10;
}
[dir="rtl"] #notification_area {
  float: left !important;
  float: left;
}
.indicator_area {
  float: right !important;
  float: right;
  color: #777;
  margin-left: 5px;
  margin-right: 5px;
  width: 11px;
  z-index: 10;
  text-align: center;
  width: auto;
}
[dir="rtl"] .indicator_area {
  float: left !important;
  float: left;
}
#kernel_indicator {
  float: right !important;
  float: right;
  color: #777;
  margin-left: 5px;
  margin-right: 5px;
  width: 11px;
  z-index: 10;
  text-align: center;
  width: auto;
  border-left: 1px solid;
}
#kernel_indicator .kernel_indicator_name {
  padding-left: 5px;
  padding-right: 5px;
}
[dir="rtl"] #kernel_indicator {
  float: left !important;
  float: left;
  border-left: 0;
  border-right: 1px solid;
}
#modal_indicator {
  float: right !important;
  float: right;
  color: #777;
  margin-left: 5px;
  margin-right: 5px;
  width: 11px;
  z-index: 10;
  text-align: center;
  width: auto;
}
[dir="rtl"] #modal_indicator {
  float: left !important;
  float: left;
}
#readonly-indicator {
  float: right !important;
  float: right;
  color: #777;
  margin-left: 5px;
  margin-right: 5px;
  width: 11px;
  z-index: 10;
  text-align: center;
  width: auto;
  margin-top: 2px;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-right: 0px;
  display: none;
}
.modal_indicator:before {
  width: 1.28571429em;
  text-align: center;
}
.edit_mode .modal_indicator:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\f040";
}
.edit_mode .modal_indicator:before.fa-pull-left {
  margin-right: .3em;
}
.edit_mode .modal_indicator:before.fa-pull-right {
  margin-left: .3em;
}
.edit_mode .modal_indicator:before.pull-left {
  margin-right: .3em;
}
.edit_mode .modal_indicator:before.pull-right {
  margin-left: .3em;
}
.command_mode .modal_indicator:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: ' ';
}
.command_mode .modal_indicator:before.fa-pull-left {
  margin-right: .3em;
}
.command_mode .modal_indicator:before.fa-pull-right {
  margin-left: .3em;
}
.command_mode .modal_indicator:before.pull-left {
  margin-right: .3em;
}
.command_mode .modal_indicator:before.pull-right {
  margin-left: .3em;
}
.kernel_idle_icon:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\f10c";
}
.kernel_idle_icon:before.fa-pull-left {
  margin-right: .3em;
}
.kernel_idle_icon:before.fa-pull-right {
  margin-left: .3em;
}
.kernel_idle_icon:before.pull-left {
  margin-right: .3em;
}
.kernel_idle_icon:before.pull-right {
  margin-left: .3em;
}
.kernel_busy_icon:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\f111";
}
.kernel_busy_icon:before.fa-pull-left {
  margin-right: .3em;
}
.kernel_busy_icon:before.fa-pull-right {
  margin-left: .3em;
}
.kernel_busy_icon:before.pull-left {
  margin-right: .3em;
}
.kernel_busy_icon:before.pull-right {
  margin-left: .3em;
}
.kernel_dead_icon:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\f1e2";
}
.kernel_dead_icon:before.fa-pull-left {
  margin-right: .3em;
}
.kernel_dead_icon:before.fa-pull-right {
  margin-left: .3em;
}
.kernel_dead_icon:before.pull-left {
  margin-right: .3em;
}
.kernel_dead_icon:before.pull-right {
  margin-left: .3em;
}
.kernel_disconnected_icon:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\f127";
}
.kernel_disconnected_icon:before.fa-pull-left {
  margin-right: .3em;
}
.kernel_disconnected_icon:before.fa-pull-right {
  margin-left: .3em;
}
.kernel_disconnected_icon:before.pull-left {
  margin-right: .3em;
}
.kernel_disconnected_icon:before.pull-right {
  margin-left: .3em;
}
.notification_widget {
  color: #777;
  z-index: 10;
  background: rgba(240, 240, 240, 0.5);
  margin-right: 4px;
  color: #333;
  background-color: #fff;
  border-color: #ccc;
}
.notification_widget:focus,
.notification_widget.focus {
  color: #333;
  background-color: #e6e6e6;
  border-color: #8c8c8c;
}
.notification_widget:hover {
  color: #333;
  background-color: #e6e6e6;
  border-color: #adadad;
}
.notification_widget:active,
.notification_widget.active,
.open > .dropdown-toggle.notification_widget {
  color: #333;
  background-color: #e6e6e6;
  border-color: #adadad;
}
.notification_widget:active:hover,
.notification_widget.active:hover,
.open > .dropdown-toggle.notification_widget:hover,
.notification_widget:active:focus,
.notification_widget.active:focus,
.open > .dropdown-toggle.notification_widget:focus,
.notification_widget:active.focus,
.notification_widget.active.focus,
.open > .dropdown-toggle.notification_widget.focus {
  color: #333;
  background-color: #d4d4d4;
  border-color: #8c8c8c;
}
.notification_widget:active,
.notification_widget.active,
.open > .dropdown-toggle.notification_widget {
  background-image: none;
}
.notification_widget.disabled:hover,
.notification_widget[disabled]:hover,
fieldset[disabled] .notification_widget:hover,
.notification_widget.disabled:focus,
.notification_widget[disabled]:focus,
fieldset[disabled] .notification_widget:focus,
.notification_widget.disabled.focus,
.notification_widget[disabled].focus,
fieldset[disabled] .notification_widget.focus {
  background-color: #fff;
  border-color: #ccc;
}
.notification_widget .badge {
  color: #fff;
  background-color: #333;
}
.notification_widget.warning {
  color: #fff;
  background-color: #f0ad4e;
  border-color: #eea236;
}
.notification_widget.warning:focus,
.notification_widget.warning.focus {
  color: #fff;
  background-color: #ec971f;
  border-color: #985f0d;
}
.notification_widget.warning:hover {
  color: #fff;
  background-color: #ec971f;
  border-color: #d58512;
}
.notification_widget.warning:active,
.notification_widget.warning.active,
.open > .dropdown-toggle.notification_widget.warning {
  color: #fff;
  background-color: #ec971f;
  border-color: #d58512;
}
.notification_widget.warning:active:hover,
.notification_widget.warning.active:hover,
.open > .dropdown-toggle.notification_widget.warning:hover,
.notification_widget.warning:active:focus,
.notification_widget.warning.active:focus,
.open > .dropdown-toggle.notification_widget.warning:focus,
.notification_widget.warning:active.focus,
.notification_widget.warning.active.focus,
.open > .dropdown-toggle.notification_widget.warning.focus {
  color: #fff;
  background-color: #d58512;
  border-color: #985f0d;
}
.notification_widget.warning:active,
.notification_widget.warning.active,
.open > .dropdown-toggle.notification_widget.warning {
  background-image: none;
}
.notification_widget.warning.disabled:hover,
.notification_widget.warning[disabled]:hover,
fieldset[disabled] .notification_widget.warning:hover,
.notification_widget.warning.disabled:focus,
.notification_widget.warning[disabled]:focus,
fieldset[disabled] .notification_widget.warning:focus,
.notification_widget.warning.disabled.focus,
.notification_widget.warning[disabled].focus,
fieldset[disabled] .notification_widget.warning.focus {
  background-color: #f0ad4e;
  border-color: #eea236;
}
.notification_widget.warning .badge {
  color: #f0ad4e;
  background-color: #fff;
}
.notification_widget.success {
  color: #fff;
  background-color: #5cb85c;
  border-color: #4cae4c;
}
.notification_widget.success:focus,
.notification_widget.success.focus {
  color: #fff;
  background-color: #449d44;
  border-color: #255625;
}
.notification_widget.success:hover {
  color: #fff;
  background-color: #449d44;
  border-color: #398439;
}
.notification_widget.success:active,
.notification_widget.success.active,
.open > .dropdown-toggle.notification_widget.success {
  color: #fff;
  background-color: #449d44;
  border-color: #398439;
}
.notification_widget.success:active:hover,
.notification_widget.success.active:hover,
.open > .dropdown-toggle.notification_widget.success:hover,
.notification_widget.success:active:focus,
.notification_widget.success.active:focus,
.open > .dropdown-toggle.notification_widget.success:focus,
.notification_widget.success:active.focus,
.notification_widget.success.active.focus,
.open > .dropdown-toggle.notification_widget.success.focus {
  color: #fff;
  background-color: #398439;
  border-color: #255625;
}
.notification_widget.success:active,
.notification_widget.success.active,
.open > .dropdown-toggle.notification_widget.success {
  background-image: none;
}
.notification_widget.success.disabled:hover,
.notification_widget.success[disabled]:hover,
fieldset[disabled] .notification_widget.success:hover,
.notification_widget.success.disabled:focus,
.notification_widget.success[disabled]:focus,
fieldset[disabled] .notification_widget.success:focus,
.notification_widget.success.disabled.focus,
.notification_widget.success[disabled].focus,
fieldset[disabled] .notification_widget.success.focus {
  background-color: #5cb85c;
  border-color: #4cae4c;
}
.notification_widget.success .badge {
  color: #5cb85c;
  background-color: #fff;
}
.notification_widget.info {
  color: #fff;
  background-color: #5bc0de;
  border-color: #46b8da;
}
.notification_widget.info:focus,
.notification_widget.info.focus {
  color: #fff;
  background-color: #31b0d5;
  border-color: #1b6d85;
}
.notification_widget.info:hover {
  color: #fff;
  background-color: #31b0d5;
  border-color: #269abc;
}
.notification_widget.info:active,
.notification_widget.info.active,
.open > .dropdown-toggle.notification_widget.info {
  color: #fff;
  background-color: #31b0d5;
  border-color: #269abc;
}
.notification_widget.info:active:hover,
.notification_widget.info.active:hover,
.open > .dropdown-toggle.notification_widget.info:hover,
.notification_widget.info:active:focus,
.notification_widget.info.active:focus,
.open > .dropdown-toggle.notification_widget.info:focus,
.notification_widget.info:active.focus,
.notification_widget.info.active.focus,
.open > .dropdown-toggle.notification_widget.info.focus {
  color: #fff;
  background-color: #269abc;
  border-color: #1b6d85;
}
.notification_widget.info:active,
.notification_widget.info.active,
.open > .dropdown-toggle.notification_widget.info {
  background-image: none;
}
.notification_widget.info.disabled:hover,
.notification_widget.info[disabled]:hover,
fieldset[disabled] .notification_widget.info:hover,
.notification_widget.info.disabled:focus,
.notification_widget.info[disabled]:focus,
fieldset[disabled] .notification_widget.info:focus,
.notification_widget.info.disabled.focus,
.notification_widget.info[disabled].focus,
fieldset[disabled] .notification_widget.info.focus {
  background-color: #5bc0de;
  border-color: #46b8da;
}
.notification_widget.info .badge {
  color: #5bc0de;
  background-color: #fff;
}
.notification_widget.danger {
  color: #fff;
  background-color: #d9534f;
  border-color: #d43f3a;
}
.notification_widget.danger:focus,
.notification_widget.danger.focus {
  color: #fff;
  background-color: #c9302c;
  border-color: #761c19;
}
.notification_widget.danger:hover {
  color: #fff;
  background-color: #c9302c;
  border-color: #ac2925;
}
.notification_widget.danger:active,
.notification_widget.danger.active,
.open > .dropdown-toggle.notification_widget.danger {
  color: #fff;
  background-color: #c9302c;
  border-color: #ac2925;
}
.notification_widget.danger:active:hover,
.notification_widget.danger.active:hover,
.open > .dropdown-toggle.notification_widget.danger:hover,
.notification_widget.danger:active:focus,
.notification_widget.danger.active:focus,
.open > .dropdown-toggle.notification_widget.danger:focus,
.notification_widget.danger:active.focus,
.notification_widget.danger.active.focus,
.open > .dropdown-toggle.notification_widget.danger.focus {
  color: #fff;
  background-color: #ac2925;
  border-color: #761c19;
}
.notification_widget.danger:active,
.notification_widget.danger.active,
.open > .dropdown-toggle.notification_widget.danger {
  background-image: none;
}
.notification_widget.danger.disabled:hover,
.notification_widget.danger[disabled]:hover,
fieldset[disabled] .notification_widget.danger:hover,
.notification_widget.danger.disabled:focus,
.notification_widget.danger[disabled]:focus,
fieldset[disabled] .notification_widget.danger:focus,
.notification_widget.danger.disabled.focus,
.notification_widget.danger[disabled].focus,
fieldset[disabled] .notification_widget.danger.focus {
  background-color: #d9534f;
  border-color: #d43f3a;
}
.notification_widget.danger .badge {
  color: #d9534f;
  background-color: #fff;
}
div#pager {
  background-color: #fff;
  font-size: 14px;
  line-height: 20px;
  overflow: hidden;
  display: none;
  position: fixed;
  bottom: 0px;
  width: 100%;
  max-height: 50%;
  padding-top: 8px;
  -webkit-box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
  box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
  /* Display over codemirror */
  z-index: 100;
  /* Hack which prevents jquery ui resizable from changing top. */
  top: auto !important;
}
div#pager pre {
  line-height: 1.21429em;
  color: #000;
  background-color: #f7f7f7;
  padding: 0.4em;
}
div#pager #pager-button-area {
  position: absolute;
  top: 8px;
  right: 20px;
}
div#pager #pager-contents {
  position: relative;
  overflow: auto;
  width: 100%;
  height: 100%;
}
div#pager #pager-contents #pager-container {
  position: relative;
  padding: 15px 0px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
div#pager .ui-resizable-handle {
  top: 0px;
  height: 8px;
  background: #f7f7f7;
  border-top: 1px solid #cfcfcf;
  border-bottom: 1px solid #cfcfcf;
  /* This injects handle bars (a short, wide = symbol) for 
        the resize handle. */
}
div#pager .ui-resizable-handle::after {
  content: '';
  top: 2px;
  left: 50%;
  height: 3px;
  width: 30px;
  margin-left: -15px;
  position: absolute;
  border-top: 1px solid #cfcfcf;
}
.quickhelp {
  /* Old browsers */
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-align: stretch;
  display: -moz-box;
  -moz-box-orient: horizontal;
  -moz-box-align: stretch;
  display: box;
  box-orient: horizontal;
  box-align: stretch;
  /* Modern browsers */
  display: flex;
  flex-direction: row;
  align-items: stretch;
  line-height: 1.8em;
}
.shortcut_key {
  display: inline-block;
  width: 21ex;
  text-align: right;
  font-family: monospace;
}
.shortcut_descr {
  display: inline-block;
  /* Old browsers */
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  box-flex: 1;
  /* Modern browsers */
  flex: 1;
}
span.save_widget {
  height: 30px;
  margin-top: 4px;
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  width: 50%;
  flex: 1;
}
span.save_widget span.filename {
  height: 100%;
  line-height: 1em;
  margin-left: 16px;
  border: none;
  font-size: 146.5%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  border-radius: 2px;
}
span.save_widget span.filename:hover {
  background-color: #e6e6e6;
}
[dir="rtl"] span.save_widget.pull-left {
  float: right !important;
  float: right;
}
[dir="rtl"] span.save_widget span.filename {
  margin-left: 0;
  margin-right: 16px;
}
span.checkpoint_status,
span.autosave_status {
  font-size: small;
  white-space: nowrap;
  padding: 0 5px;
}
@media (max-width: 767px) {
  span.save_widget {
    font-size: small;
    padding: 0 0 0 5px;
  }
  span.checkpoint_status,
  span.autosave_status {
    display: none;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  span.checkpoint_status {
    display: none;
  }
  span.autosave_status {
    font-size: x-small;
  }
}
.toolbar {
  padding: 0px;
  margin-left: -5px;
  margin-top: 2px;
  margin-bottom: 5px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.toolbar select,
.toolbar label {
  width: auto;
  vertical-align: middle;
  margin-right: 2px;
  margin-bottom: 0px;
  display: inline;
  font-size: 92%;
  margin-left: 0.3em;
  margin-right: 0.3em;
  padding: 0px;
  padding-top: 3px;
}
.toolbar .btn {
  padding: 2px 8px;
}
.toolbar .btn-group {
  margin-top: 0px;
  margin-left: 5px;
}
.toolbar-btn-label {
  margin-left: 6px;
}
#maintoolbar {
  margin-bottom: -3px;
  margin-top: -8px;
  border: 0px;
  min-height: 27px;
  margin-left: 0px;
  padding-top: 11px;
  padding-bottom: 3px;
}
#maintoolbar .navbar-text {
  float: none;
  vertical-align: middle;
  text-align: right;
  margin-left: 5px;
  margin-right: 0px;
  margin-top: 0px;
}
.select-xs {
  height: 24px;
}
[dir="rtl"] .btn-group > .btn,
.btn-group-vertical > .btn {
  float: right;
}
.pulse,
.dropdown-menu > li > a.pulse,
li.pulse > a.dropdown-toggle,
li.pulse.open > a.dropdown-toggle {
  background-color: #F37626;
  color: white;
}
/**
 * Primary styles
 *
 * Author: Jupyter Development Team
 */
/** WARNING IF YOU ARE EDITTING THIS FILE, if this is a .css file, It has a lot
 * of chance of beeing generated from the ../less/[samename].less file, you can
 * try to get back the less file by reverting somme commit in history
 **/
/*
 * We'll try to get something pretty, so we
 * have some strange css to have the scroll bar on
 * the left with fix button on the top right of the tooltip
 */
@-moz-keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@-webkit-keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
/*properties of tooltip after "expand"*/
.bigtooltip {
  overflow: auto;
  height: 200px;
  -webkit-transition-property: height;
  -webkit-transition-duration: 500ms;
  -moz-transition-property: height;
  -moz-transition-duration: 500ms;
  transition-property: height;
  transition-duration: 500ms;
}
/*properties of tooltip before "expand"*/
.smalltooltip {
  -webkit-transition-property: height;
  -webkit-transition-duration: 500ms;
  -moz-transition-property: height;
  -moz-transition-duration: 500ms;
  transition-property: height;
  transition-duration: 500ms;
  text-overflow: ellipsis;
  overflow: hidden;
  height: 80px;
}
.tooltipbuttons {
  position: absolute;
  padding-right: 15px;
  top: 0px;
  right: 0px;
}
.tooltiptext {
  /*avoid the button to overlap on some docstring*/
  padding-right: 30px;
}
.ipython_tooltip {
  max-width: 700px;
  /*fade-in animation when inserted*/
  -webkit-animation: fadeOut 400ms;
  -moz-animation: fadeOut 400ms;
  animation: fadeOut 400ms;
  -webkit-animation: fadeIn 400ms;
  -moz-animation: fadeIn 400ms;
  animation: fadeIn 400ms;
  vertical-align: middle;
  background-color: #f7f7f7;
  overflow: visible;
  border: #ababab 1px solid;
  outline: none;
  padding: 3px;
  margin: 0px;
  padding-left: 7px;
  font-family: monospace;
  min-height: 50px;
  -moz-box-shadow: 0px 6px 10px -1px #adadad;
  -webkit-box-shadow: 0px 6px 10px -1px #adadad;
  box-shadow: 0px 6px 10px -1px #adadad;
  border-radius: 2px;
  position: absolute;
  z-index: 1000;
}
.ipython_tooltip a {
  float: right;
}
.ipython_tooltip .tooltiptext pre {
  border: 0;
  border-radius: 0;
  font-size: 100%;
  background-color: #f7f7f7;
}
.pretooltiparrow {
  left: 0px;
  margin: 0px;
  top: -16px;
  width: 40px;
  height: 16px;
  overflow: hidden;
  position: absolute;
}
.pretooltiparrow:before {
  background-color: #f7f7f7;
  border: 1px #ababab solid;
  z-index: 11;
  content: "";
  position: absolute;
  left: 15px;
  top: 10px;
  width: 25px;
  height: 25px;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
}
ul.typeahead-list i {
  margin-left: -10px;
  width: 18px;
}
[dir="rtl"] ul.typeahead-list i {
  margin-left: 0;
  margin-right: -10px;
}
ul.typeahead-list {
  max-height: 80vh;
  overflow: auto;
}
ul.typeahead-list > li > a {
  /** Firefox bug **/
  /* see https://github.com/jupyter/notebook/issues/559 */
  white-space: normal;
}
ul.typeahead-list  > li > a.pull-right {
  float: left !important;
  float: left;
}
[dir="rtl"] .typeahead-list {
  text-align: right;
}
.cmd-palette .modal-body {
  padding: 7px;
}
.cmd-palette form {
  background: white;
}
.cmd-palette input {
  outline: none;
}
.no-shortcut {
  min-width: 20px;
  color: transparent;
}
[dir="rtl"] .no-shortcut.pull-right {
  float: left !important;
  float: left;
}
[dir="rtl"] .command-shortcut.pull-right {
  float: left !important;
  float: left;
}
.command-shortcut:before {
  content: "(command mode)";
  padding-right: 3px;
  color: #777777;
}
.edit-shortcut:before {
  content: "(edit)";
  padding-right: 3px;
  color: #777777;
}
[dir="rtl"] .edit-shortcut.pull-right {
  float: left !important;
  float: left;
}
#find-and-replace #replace-preview .match,
#find-and-replace #replace-preview .insert {
  background-color: #BBDEFB;
  border-color: #90CAF9;
  border-style: solid;
  border-width: 1px;
  border-radius: 0px;
}
[dir="ltr"] #find-and-replace .input-group-btn + .form-control {
  border-left: none;
}
[dir="rtl"] #find-and-replace .input-group-btn + .form-control {
  border-right: none;
}
#find-and-replace #replace-preview .replace .match {
  background-color: #FFCDD2;
  border-color: #EF9A9A;
  border-radius: 0px;
}
#find-and-replace #replace-preview .replace .insert {
  background-color: #C8E6C9;
  border-color: #A5D6A7;
  border-radius: 0px;
}
#find-and-replace #replace-preview {
  max-height: 60vh;
  overflow: auto;
}
#find-and-replace #replace-preview pre {
  padding: 5px 10px;
}
.terminal-app {
  background: #EEE;
}
.terminal-app #header {
  background: #fff;
  -webkit-box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
  box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.2);
}
.terminal-app .terminal {
  width: 100%;
  float: left;
  font-family: monospace;
  color: white;
  background: black;
  padding: 0.4em;
  border-radius: 2px;
  -webkit-box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.4);
  box-shadow: 0px 0px 12px 1px rgba(87, 87, 87, 0.4);
}
.terminal-app .terminal,
.terminal-app .terminal dummy-screen {
  line-height: 1em;
  font-size: 14px;
}
.terminal-app .terminal .xterm-rows {
  padding: 10px;
}
.terminal-app .terminal-cursor {
  color: black;
  background: white;
}
.terminal-app #terminado-container {
  margin-top: 20px;
}
/*# sourceMappingURL=style.min.css.map */
    </style>
<style type="text/css">
    .highlight .hll { background-color: #ffffcc }
.highlight  { background: #f8f8f8; }
.highlight .c { color: #408080; font-style: italic } /* Comment */
.highlight .err { border: 1px solid #FF0000 } /* Error */
.highlight .k { color: #008000; font-weight: bold } /* Keyword */
.highlight .o { color: #666666 } /* Operator */
.highlight .ch { color: #408080; font-style: italic } /* Comment.Hashbang */
.highlight .cm { color: #408080; font-style: italic } /* Comment.Multiline */
.highlight .cp { color: #BC7A00 } /* Comment.Preproc */
.highlight .cpf { color: #408080; font-style: italic } /* Comment.PreprocFile */
.highlight .c1 { color: #408080; font-style: italic } /* Comment.Single */
.highlight .cs { color: #408080; font-style: italic } /* Comment.Special */
.highlight .gd { color: #A00000 } /* Generic.Deleted */
.highlight .ge { font-style: italic } /* Generic.Emph */
.highlight .gr { color: #FF0000 } /* Generic.Error */
.highlight .gh { color: #000080; font-weight: bold } /* Generic.Heading */
.highlight .gi { color: #00A000 } /* Generic.Inserted */
.highlight .go { color: #888888 } /* Generic.Output */
.highlight .gp { color: #000080; font-weight: bold } /* Generic.Prompt */
.highlight .gs { font-weight: bold } /* Generic.Strong */
.highlight .gu { color: #800080; font-weight: bold } /* Generic.Subheading */
.highlight .gt { color: #0044DD } /* Generic.Traceback */
.highlight .kc { color: #008000; font-weight: bold } /* Keyword.Constant */
.highlight .kd { color: #008000; font-weight: bold } /* Keyword.Declaration */
.highlight .kn { color: #008000; font-weight: bold } /* Keyword.Namespace */
.highlight .kp { color: #008000 } /* Keyword.Pseudo */
.highlight .kr { color: #008000; font-weight: bold } /* Keyword.Reserved */
.highlight .kt { color: #B00040 } /* Keyword.Type */
.highlight .m { color: #666666 } /* Literal.Number */
.highlight .s { color: #BA2121 } /* Literal.String */
.highlight .na { color: #7D9029 } /* Name.Attribute */
.highlight .nb { color: #008000 } /* Name.Builtin */
.highlight .nc { color: #0000FF; font-weight: bold } /* Name.Class */
.highlight .no { color: #880000 } /* Name.Constant */
.highlight .nd { color: #AA22FF } /* Name.Decorator */
.highlight .ni { color: #999999; font-weight: bold } /* Name.Entity */
.highlight .ne { color: #D2413A; font-weight: bold } /* Name.Exception */
.highlight .nf { color: #0000FF } /* Name.Function */
.highlight .nl { color: #A0A000 } /* Name.Label */
.highlight .nn { color: #0000FF; font-weight: bold } /* Name.Namespace */
.highlight .nt { color: #008000; font-weight: bold } /* Name.Tag */
.highlight .nv { color: #19177C } /* Name.Variable */
.highlight .ow { color: #AA22FF; font-weight: bold } /* Operator.Word */
.highlight .w { color: #bbbbbb } /* Text.Whitespace */
.highlight .mb { color: #666666 } /* Literal.Number.Bin */
.highlight .mf { color: #666666 } /* Literal.Number.Float */
.highlight .mh { color: #666666 } /* Literal.Number.Hex */
.highlight .mi { color: #666666 } /* Literal.Number.Integer */
.highlight .mo { color: #666666 } /* Literal.Number.Oct */
.highlight .sa { color: #BA2121 } /* Literal.String.Affix */
.highlight .sb { color: #BA2121 } /* Literal.String.Backtick */
.highlight .sc { color: #BA2121 } /* Literal.String.Char */
.highlight .dl { color: #BA2121 } /* Literal.String.Delimiter */
.highlight .sd { color: #BA2121; font-style: italic } /* Literal.String.Doc */
.highlight .s2 { color: #BA2121 } /* Literal.String.Double */
.highlight .se { color: #BB6622; font-weight: bold } /* Literal.String.Escape */
.highlight .sh { color: #BA2121 } /* Literal.String.Heredoc */
.highlight .si { color: #BB6688; font-weight: bold } /* Literal.String.Interpol */
.highlight .sx { color: #008000 } /* Literal.String.Other */
.highlight .sr { color: #BB6688 } /* Literal.String.Regex */
.highlight .s1 { color: #BA2121 } /* Literal.String.Single */
.highlight .ss { color: #19177C } /* Literal.String.Symbol */
.highlight .bp { color: #008000 } /* Name.Builtin.Pseudo */
.highlight .fm { color: #0000FF } /* Name.Function.Magic */
.highlight .vc { color: #19177C } /* Name.Variable.Class */
.highlight .vg { color: #19177C } /* Name.Variable.Global */
.highlight .vi { color: #19177C } /* Name.Variable.Instance */
.highlight .vm { color: #19177C } /* Name.Variable.Magic */
.highlight .il { color: #666666 } /* Literal.Number.Integer.Long */
    </style>


<style type="text/css">
/* Overrides of notebook CSS for static HTML export */
body {
  overflow: visible;
  padding: 8px;
}

div#notebook {
  overflow: visible;
  border-top: none;
}@media print {
  div.cell {
    display: block;
    page-break-inside: avoid;
  } 
  div.output_wrapper { 
    display: block;
    page-break-inside: avoid; 
  }
  div.output { 
    display: block;
    page-break-inside: avoid; 
  }
}
</style>

<!-- Custom stylesheet, it must be in the same directory as the html file -->
<link rel="stylesheet" href="custom.css">

<!-- Loading mathjax macro -->
<!-- Load mathjax -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/latest.js?config=TeX-AMS_HTML"></script>
    <!-- MathJax configuration -->
    <script type="text/x-mathjax-config">
    MathJax.Hub.Config({
        tex2jax: {
            inlineMath: [ ['$','$'], ["\\(","\\)"] ],
            displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
            processEscapes: true,
            processEnvironments: true
        },
        // Center justify equations in code and markdown cells. Elsewhere
        // we use CSS to left justify single line equations in code cells.
        displayAlign: 'center',
        "HTML-CSS": {
            styles: {'.MathJax_Display': {"margin": 0}},
            linebreaks: { automatic: true }
        }
    });
    </script>
    <!-- End of mathjax configuration --></head>
<body>
  <div tabindex="-1" id="notebook" class="border-box-sizing">
    <div class="container" id="notebook-container">

<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<blockquote><p>Author: Charles Zhang  <br><a href="https://zcczhang.github.io/blogs/"><em>All Notes Catelog for</em> <strong><em>Reinforcement Learning: An Introduction</em></strong></a>. This post is created following <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.en"><em>BY-NC-ND 4.0</em></a> agreement, please follow terms while sharing.</p>
</blockquote>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h3 id="Action-Value-Methods">Action-Value Methods<a class="anchor-link" href="#Action-Value-Methods">&#182;</a></h3><p>k-armed: k options(actions)</p>
<p>Value: $q_{*}(a) \doteq \mathbb{E}[R_t\mid A_t = a]$, using 
$Q_t(a) \approx q_{*}(a)$ estimation.</p>
$$
\begin{array}{l}
Q_{s}(a) \doteq \displaystyle\frac{\displaystyle\sum_{i=1}^{t-1} R_{i} \cdot \mathbb{1}_{A_{i}=a}}{\displaystyle\sum_{i=1}^{t-1} \mathbb{1}_{A_{i}=a}}, \mathbb{1}:=\left\{\begin{array}{l}
1 \text { if predicate is true } \\
0 \text { if predicate is false }
\end{array}\right.
\end{array}
$$<p>when $\displaystyle \sum_{i=1}^{t-1} \mathbb{1}_{A_i=a} \rightarrow \infty$ , $Q(a) \rightarrow q_{*}(a)$</p>
<p>Greedy action: $A_{t} \doteq \arg \max_{a} Q_{t}(a), \epsilon$ -greedy: prevent local optimum</p>
<p>The estimate of its action value after it has been selected $n-1$ times:<br></p>
$$
\begin{aligned}
Q_{n} \doteq \frac{\sum_{i=1}^{n-1} R_{i}}{n-1} &amp;=\frac{1}{n-1}\left(R_{n-1}+\sum_{i=1}^{n-2} R_{i}\right) \\
&amp;=\frac{1}{n-1}\left(R_{n-1}+(n-2) \frac{1}{n-1} \sum_{i=1}^{n-2} R_{i}\right) \\
&amp;=\frac{1}{n-1}\left(R_{n-1}+(n-2) Q_{n-1}\right) \\
&amp;=\frac{1}{n-1}\left(R_{n-1}+(n-1) Q_{n-1}-Q_{n-1}\right) \\
&amp;=Q_{n-1}+\frac{1}{n-1}\left(R_{n-1}-Q_{n-1}\right)
\end{aligned}
$$<p><br>
or more general, $Q_{n+1}=Q_{n}+\frac{1}{n}\left(R_{n}-Q_{n}\right), n=1 \rightarrow Q_{2}=R_{1}$ for arbitrary.<br></p>
<p>General <b>[Update Rule]</b>: NewEstimate $\leftarrow$ StepSize $\cdot$ [Target - OldEstimate], stepsize: $\alpha_t(a)$, Target - OldEstimate: "error" in estimate.
<br>
$$\begin{aligned}
Q_{n+1} &amp;= \displaystyle Q_{n}+\alpha(R_{n}-Q_{n}) = \alpha R_n +(1-\alpha) Q_n \\
&amp;= \alpha R_n +(1-\alpha)[\alpha R_{n-1} +(1-\alpha) Q_{n-1}] \\
&amp;= \alpha R_n +(1-\alpha)\alpha R_{n-1} +(1-\alpha)^2\alpha R_{n-2} + ... +(1-\alpha)^n\alpha Q_1 \\
&amp;= (1-\alpha)^n Q_1 + \sum_{i=1}^n \alpha(1-\alpha)^{n-i}R_i 
\end{aligned}$$</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h3 id="Implementations">Implementations<a class="anchor-link" href="#Implementations">&#182;</a></h3>
</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="kn">import</span> <span class="nn">matplotlib</span>
<span class="kn">import</span> <span class="nn">matplotlib.pyplot</span> <span class="k">as</span> <span class="nn">plt</span>
<span class="kn">import</span> <span class="nn">numpy</span> <span class="k">as</span> <span class="nn">np</span>
<span class="kn">from</span> <span class="nn">tqdm</span> <span class="kn">import</span> <span class="n">trange</span>
<span class="o">%</span><span class="k">matplotlib</span> inline
<span class="kn">import</span> <span class="nn">warnings</span>
<span class="n">warnings</span><span class="o">.</span><span class="n">filterwarnings</span><span class="p">(</span><span class="s1">&#39;ignore&#39;</span><span class="p">)</span>


<span class="k">class</span> <span class="nc">Bandit</span><span class="p">:</span>

    <span class="k">def</span> <span class="fm">__init__</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">k_arm</span><span class="o">=</span><span class="mi">10</span><span class="p">,</span> <span class="n">epsilon</span><span class="o">=</span><span class="mf">0.</span><span class="p">,</span> <span class="n">initial_val</span><span class="o">=</span><span class="mf">0.</span><span class="p">,</span> <span class="n">step_size</span><span class="o">=</span><span class="mf">0.1</span><span class="p">,</span> <span class="n">sample_averages</span><span class="o">=</span><span class="kc">False</span><span class="p">,</span> <span class="n">UCB_param</span><span class="o">=</span><span class="kc">None</span><span class="p">,</span>
                 <span class="n">gradient</span><span class="o">=</span><span class="kc">False</span><span class="p">,</span> <span class="n">gradient_baseline</span><span class="o">=</span><span class="kc">False</span><span class="p">,</span> <span class="n">true_reward</span><span class="o">=</span><span class="mf">0.</span><span class="p">):</span>
        <span class="sd">&quot;&quot;&quot;</span>
<span class="sd">        :param k_arm: # of arms, 10 by default(same in the)</span>
<span class="sd">        :param epsilon: probability for exploration in epsilon-greedy algorithm</span>
<span class="sd">        :param initial_val: initial estimated value for each action</span>
<span class="sd">        :param step_size: constant step size(learning rate) for updating estimations</span>
<span class="sd">        :param sample_averages: if True, use sample averages to update estimations instead of constant step size</span>
<span class="sd">        :param UCB_param: if not None, use UCB algorithm to select action</span>
<span class="sd">        :param gradient: if True, use gradient based bandit algorithm</span>
<span class="sd">        :param gradient_baseline: if True, use average reward as baseline for gradient based bandit algorithm</span>
<span class="sd">        :param true_reward: the actual reward, q(A_t)</span>
<span class="sd">        &quot;&quot;&quot;</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">k</span> <span class="o">=</span> <span class="n">k_arm</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">epsilon</span> <span class="o">=</span> <span class="n">epsilon</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">initial_val</span> <span class="o">=</span> <span class="n">initial_val</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">step_size</span> <span class="o">=</span> <span class="n">step_size</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">sample_averages</span> <span class="o">=</span> <span class="n">sample_averages</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">UCB_param</span> <span class="o">=</span> <span class="n">UCB_param</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">gradient</span> <span class="o">=</span> <span class="n">gradient</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">gradient_baseline</span> <span class="o">=</span> <span class="n">gradient_baseline</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">true_reward</span> <span class="o">=</span> <span class="n">true_reward</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">indices</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">arange</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">k</span><span class="p">)</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">time</span> <span class="o">=</span> <span class="mi">0</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">average_reward</span> <span class="o">=</span> <span class="mi">0</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">action_prob</span> <span class="o">=</span> <span class="mi">0</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">q_true</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">randn</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">k</span><span class="p">)</span> <span class="o">+</span> <span class="bp">self</span><span class="o">.</span><span class="n">true_reward</span>    <span class="c1"># true(actual) value for each action, q(a)</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">q_estimation</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">zeros</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">k</span><span class="p">)</span> <span class="o">+</span> <span class="bp">self</span><span class="o">.</span><span class="n">initial_val</span>     <span class="c1"># estimated value for each action, Q(a)</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">action_count</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">zeros</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">k</span><span class="p">)</span>                        <span class="c1"># # of chosen times for each action</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">best_action</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">argmax</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">q_true</span><span class="p">)</span>                   <span class="c1"># best action based no Q table</span>

    <span class="k">def</span> <span class="nf">reset</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">q_true</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">randn</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">k</span><span class="p">)</span> <span class="o">+</span> <span class="bp">self</span><span class="o">.</span><span class="n">true_reward</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">q_estimation</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">zeros</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">k</span><span class="p">)</span> <span class="o">+</span> <span class="bp">self</span><span class="o">.</span><span class="n">initial_val</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">action_count</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">zeros</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">k</span><span class="p">)</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">best_action</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">argmax</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">q_true</span><span class="p">)</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">time</span> <span class="o">=</span> <span class="mi">0</span>

    <span class="k">def</span> <span class="nf">action</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="sd">&quot;&quot;&quot;</span>
<span class="sd">        :return: get an action for this bandit</span>
<span class="sd">        &quot;&quot;&quot;</span>
        <span class="k">if</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">rand</span><span class="p">()</span> <span class="o">&lt;</span> <span class="bp">self</span><span class="o">.</span><span class="n">epsilon</span><span class="p">:</span>
            <span class="k">return</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">choice</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">indices</span><span class="p">)</span>

        <span class="k">if</span> <span class="bp">self</span><span class="o">.</span><span class="n">UCB_param</span> <span class="ow">is</span> <span class="ow">not</span> <span class="kc">None</span><span class="p">:</span>
            <span class="n">UCB_estimation</span> <span class="o">=</span> <span class="bp">self</span><span class="o">.</span><span class="n">q_estimation</span> <span class="o">+</span> \
                             <span class="bp">self</span><span class="o">.</span><span class="n">UCB_param</span> <span class="o">*</span> <span class="n">np</span><span class="o">.</span><span class="n">sqrt</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">log</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">time</span> <span class="o">+</span> <span class="mi">1</span><span class="p">)</span> <span class="o">/</span> <span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">action_count</span> <span class="o">+</span> <span class="mf">1e-5</span><span class="p">))</span>
            <span class="n">q_best</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">max</span><span class="p">(</span><span class="n">UCB_estimation</span><span class="p">)</span>
            <span class="k">return</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">choice</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">where</span><span class="p">(</span><span class="n">UCB_estimation</span> <span class="o">==</span> <span class="n">q_best</span><span class="p">)[</span><span class="mi">0</span><span class="p">])</span>

        <span class="k">if</span> <span class="bp">self</span><span class="o">.</span><span class="n">gradient</span><span class="p">:</span>
            <span class="n">exp_est</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">exp</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">q_estimation</span><span class="p">)</span>
            <span class="bp">self</span><span class="o">.</span><span class="n">action_prob</span> <span class="o">=</span> <span class="n">exp_est</span> <span class="o">/</span> <span class="n">np</span><span class="o">.</span><span class="n">sum</span><span class="p">(</span><span class="n">exp_est</span><span class="p">)</span>
            <span class="k">return</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">choice</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">indices</span><span class="p">,</span> <span class="n">p</span><span class="o">=</span><span class="bp">self</span><span class="o">.</span><span class="n">action_prob</span><span class="p">)</span>

        <span class="n">q_best</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">max</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">q_estimation</span><span class="p">)</span>
        <span class="k">return</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">choice</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">where</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">q_estimation</span> <span class="o">==</span> <span class="n">q_best</span><span class="p">)[</span><span class="mi">0</span><span class="p">])</span>

    <span class="c1"># take an action, update estimation for this action</span>
    <span class="k">def</span> <span class="nf">step</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">action</span><span class="p">):</span>
        <span class="c1"># generate the reward under N(real reward, 1)</span>
        <span class="n">reward</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">randn</span><span class="p">()</span> <span class="o">+</span> <span class="bp">self</span><span class="o">.</span><span class="n">q_true</span><span class="p">[</span><span class="n">action</span><span class="p">]</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">time</span> <span class="o">+=</span> <span class="mi">1</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">action_count</span><span class="p">[</span><span class="n">action</span><span class="p">]</span> <span class="o">+=</span> <span class="mi">1</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">average_reward</span> <span class="o">+=</span> <span class="p">(</span><span class="n">reward</span> <span class="o">-</span> <span class="bp">self</span><span class="o">.</span><span class="n">average_reward</span><span class="p">)</span> <span class="o">/</span> <span class="bp">self</span><span class="o">.</span><span class="n">time</span>

        <span class="k">if</span> <span class="bp">self</span><span class="o">.</span><span class="n">sample_averages</span><span class="p">:</span>
            <span class="c1"># update estimation using sample averages</span>
            <span class="bp">self</span><span class="o">.</span><span class="n">q_estimation</span><span class="p">[</span><span class="n">action</span><span class="p">]</span> <span class="o">+=</span> <span class="p">(</span><span class="n">reward</span> <span class="o">-</span> <span class="bp">self</span><span class="o">.</span><span class="n">q_estimation</span><span class="p">[</span><span class="n">action</span><span class="p">])</span> <span class="o">/</span> <span class="bp">self</span><span class="o">.</span><span class="n">action_count</span><span class="p">[</span><span class="n">action</span><span class="p">]</span>
        <span class="k">elif</span> <span class="bp">self</span><span class="o">.</span><span class="n">gradient</span><span class="p">:</span>
            <span class="n">one_hot</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">zeros</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">k</span><span class="p">)</span>
            <span class="n">one_hot</span><span class="p">[</span><span class="n">action</span><span class="p">]</span> <span class="o">=</span> <span class="mi">1</span>
            <span class="k">if</span> <span class="bp">self</span><span class="o">.</span><span class="n">gradient_baseline</span><span class="p">:</span>
                <span class="n">baseline</span> <span class="o">=</span> <span class="bp">self</span><span class="o">.</span><span class="n">average_reward</span>
            <span class="k">else</span><span class="p">:</span>
                <span class="n">baseline</span> <span class="o">=</span> <span class="mi">0</span>
            <span class="bp">self</span><span class="o">.</span><span class="n">q_estimation</span> <span class="o">+=</span> <span class="bp">self</span><span class="o">.</span><span class="n">step_size</span> <span class="o">*</span> <span class="p">(</span><span class="n">reward</span> <span class="o">-</span> <span class="n">baseline</span><span class="p">)</span> <span class="o">*</span> <span class="p">(</span><span class="n">one_hot</span> <span class="o">-</span> <span class="bp">self</span><span class="o">.</span><span class="n">action_prob</span><span class="p">)</span>
        <span class="k">else</span><span class="p">:</span>
            <span class="c1"># update estimation with constant step size</span>
            <span class="bp">self</span><span class="o">.</span><span class="n">q_estimation</span><span class="p">[</span><span class="n">action</span><span class="p">]</span> <span class="o">+=</span> <span class="bp">self</span><span class="o">.</span><span class="n">step_size</span> <span class="o">*</span> <span class="p">(</span><span class="n">reward</span> <span class="o">-</span> <span class="bp">self</span><span class="o">.</span><span class="n">q_estimation</span><span class="p">[</span><span class="n">action</span><span class="p">])</span>
        <span class="k">return</span> <span class="n">reward</span>


<span class="k">def</span> <span class="nf">simulate</span><span class="p">(</span><span class="n">runs</span><span class="p">,</span> <span class="n">time</span><span class="p">,</span> <span class="n">bandits</span><span class="p">):</span>
    <span class="n">rewards</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">zeros</span><span class="p">((</span><span class="nb">len</span><span class="p">(</span><span class="n">bandits</span><span class="p">),</span> <span class="n">runs</span><span class="p">,</span> <span class="n">time</span><span class="p">))</span>
    <span class="n">best_action_counts</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">zeros</span><span class="p">(</span><span class="n">rewards</span><span class="o">.</span><span class="n">shape</span><span class="p">)</span>
    <span class="k">for</span> <span class="n">i</span><span class="p">,</span> <span class="n">bandit</span> <span class="ow">in</span> <span class="nb">enumerate</span><span class="p">(</span><span class="n">bandits</span><span class="p">):</span>
        <span class="k">for</span> <span class="n">r</span> <span class="ow">in</span> <span class="n">trange</span><span class="p">(</span><span class="n">runs</span><span class="p">):</span>
            <span class="n">bandit</span><span class="o">.</span><span class="n">reset</span><span class="p">()</span>
            <span class="k">for</span> <span class="n">t</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="n">time</span><span class="p">):</span>
                <span class="n">action</span> <span class="o">=</span> <span class="n">bandit</span><span class="o">.</span><span class="n">action</span><span class="p">()</span>
                <span class="n">reward</span> <span class="o">=</span> <span class="n">bandit</span><span class="o">.</span><span class="n">step</span><span class="p">(</span><span class="n">action</span><span class="p">)</span>
                <span class="n">rewards</span><span class="p">[</span><span class="n">i</span><span class="p">,</span> <span class="n">r</span><span class="p">,</span> <span class="n">t</span><span class="p">]</span> <span class="o">=</span> <span class="n">reward</span>
                <span class="k">if</span> <span class="n">action</span> <span class="o">==</span> <span class="n">bandit</span><span class="o">.</span><span class="n">best_action</span><span class="p">:</span>
                    <span class="n">best_action_counts</span><span class="p">[</span><span class="n">i</span><span class="p">,</span> <span class="n">r</span><span class="p">,</span> <span class="n">t</span><span class="p">]</span> <span class="o">=</span> <span class="mi">1</span>
    <span class="n">mean_best_action_counts</span> <span class="o">=</span> <span class="n">best_action_counts</span><span class="o">.</span><span class="n">mean</span><span class="p">(</span><span class="n">axis</span><span class="o">=</span><span class="mi">1</span><span class="p">)</span>
    <span class="n">mean_rewards</span> <span class="o">=</span> <span class="n">rewards</span><span class="o">.</span><span class="n">mean</span><span class="p">(</span><span class="n">axis</span><span class="o">=</span><span class="mi">1</span><span class="p">)</span>
    <span class="k">return</span> <span class="n">mean_best_action_counts</span><span class="p">,</span> <span class="n">mean_rewards</span>
</pre></div>

    </div>
</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="k">def</span> <span class="nf">figure_2_1</span><span class="p">(</span><span class="n">runs</span><span class="o">=</span><span class="mi">1000</span><span class="p">,</span> <span class="n">time</span><span class="o">=</span><span class="mi">1000</span><span class="p">):</span>
    <span class="n">epsilons</span> <span class="o">=</span> <span class="p">[</span><span class="mi">0</span><span class="p">,</span> <span class="mf">0.1</span><span class="p">,</span> <span class="mf">0.01</span><span class="p">]</span>
    <span class="n">bandits</span> <span class="o">=</span> <span class="p">[</span><span class="n">Bandit</span><span class="p">(</span><span class="n">epsilon</span><span class="o">=</span><span class="n">eps</span><span class="p">,</span> <span class="n">sample_averages</span><span class="o">=</span><span class="kc">True</span><span class="p">)</span> <span class="k">for</span> <span class="n">eps</span> <span class="ow">in</span> <span class="n">epsilons</span><span class="p">]</span>
    <span class="n">best_action_counts</span><span class="p">,</span> <span class="n">rewards</span> <span class="o">=</span> <span class="n">simulate</span><span class="p">(</span><span class="n">runs</span><span class="p">,</span> <span class="n">time</span><span class="p">,</span> <span class="n">bandits</span><span class="p">)</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">figure</span><span class="p">(</span><span class="n">figsize</span><span class="o">=</span><span class="p">(</span><span class="mi">6</span><span class="p">,</span> <span class="mi">8</span><span class="p">))</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">subplot</span><span class="p">(</span><span class="mi">2</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="mi">1</span><span class="p">)</span>
    <span class="k">for</span> <span class="n">eps</span><span class="p">,</span> <span class="n">rewards</span> <span class="ow">in</span> <span class="nb">zip</span><span class="p">(</span><span class="n">epsilons</span><span class="p">,</span> <span class="n">rewards</span><span class="p">):</span>
        <span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">rewards</span><span class="p">,</span> <span class="n">label</span><span class="o">=</span><span class="s1">&#39;$\epsilon = </span><span class="si">%.02f</span><span class="s1">$&#39;</span> <span class="o">%</span> <span class="p">(</span><span class="n">eps</span><span class="p">))</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">xlabel</span><span class="p">(</span><span class="s1">&#39;steps&#39;</span><span class="p">)</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">ylabel</span><span class="p">(</span><span class="s1">&#39;average reward&#39;</span><span class="p">)</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">legend</span><span class="p">()</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">subplot</span><span class="p">(</span><span class="mi">2</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="mi">2</span><span class="p">)</span>
    <span class="k">for</span> <span class="n">eps</span><span class="p">,</span> <span class="n">counts</span> <span class="ow">in</span> <span class="nb">zip</span><span class="p">(</span><span class="n">epsilons</span><span class="p">,</span> <span class="n">best_action_counts</span><span class="p">):</span>
        <span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">counts</span><span class="p">,</span> <span class="n">label</span><span class="o">=</span><span class="s1">&#39;$\epsilon = </span><span class="si">%.02f</span><span class="s1">$&#39;</span> <span class="o">%</span> <span class="p">(</span><span class="n">eps</span><span class="p">))</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">xlabel</span><span class="p">(</span><span class="s1">&#39;steps&#39;</span><span class="p">)</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">ylabel</span><span class="p">(</span><span class="s1">&#39;</span><span class="si">% o</span><span class="s1">ptimal action&#39;</span><span class="p">)</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">legend</span><span class="p">()</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">()</span>

<span class="n">figure_2_1</span><span class="p">()</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stderr output_text">
<pre>100%|██████████| 1000/1000 [00:26&lt;00:00, 38.10it/s]
100%|██████████| 1000/1000 [00:25&lt;00:00, 39.72it/s]
100%|██████████| 1000/1000 [00:25&lt;00:00, 38.98it/s]
</pre>
</div>
</div>

<div class="output_area">

    <div class="prompt"></div>




<div class="output_png output_subarea ">
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYIAAAHgCAYAAACoxmrYAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjMuNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8QVMy6AAAACXBIWXMAAAsTAAALEwEAmpwYAACf10lEQVR4nOydd3hUxdeA39lN75UaQui9hy5SBEFUsNEs2FE/G3bs/Oy9V0Swo4IFFBSV3pvSe+8QQgghfbPz/THbS7IJ2YSQeZ9nn7137tx7526ZM3POmXOElBKNRqPRVF8Mld0AjUaj0VQuWhBoNBpNNUcLAo1Go6nmaEGg0Wg01RwtCDQajaaaowWBRqPRVHMCKrsBpSUhIUGmpKRUdjM0Go2mSrFmzZoTUspET8eqnCBISUlh9erVld0MjUajqVIIIfZ5O6ZVQxqNRlPN0YJAo9FoqjlaEGg0Gk01RwsCjUajqeZoQaDRaDTVHC0INBqNppqjBYFGo6m+SAlfXwU7/q7sllQqWhBoNJryxVykOtjScngtmM3l3pxiMeXDrjkwZWTF3tcTKz+D7yqnHVoQaDS+kJdZts6tOvJcHHw7zPvxn26DLb85l+1fDhN6w7IP/Ns2V8wm9S79IIDWfQ/Z6b7Xn/UwbP+j/NvhA1oQaM4fpARTQflf9+QeeCUZVk10Lp/9JEy6pPzvB1BUCPNegrzT3uvkn4G1352bAmqnF1WLlLBhKvxwvXP5qf3q/cg6z+fNfwU2/uT9fpmH4OcxUJjrfsxcBOOj1YgblBA6tR/W/whfDbW0q5wFQcY++OUOmHqj5+On9qs2bfqlfO9bRrQg0FQtTh1QHbC5yP3Y6s/hhUQ4fbh873lyt3rf+rtz+bIPYP/Ssl9XSu+qkI0/wYJXYe4L3s//41H49S44sLJs98/YC1nHnMuObYKPukPuqbJd0xOH/oWNP6vt/8WU7RrzX4Zpt3g//teTsP4H2DrTXlaQA0c32IXD38+oz/yH62FCX/j5djhUynA12SdUB759ttrPzYA9C93rWWcamQc9Xydtm3qfepP6DTj+DhwF+8rP7L8/P+I3QSCEmCSEOC6E2FhCvc5CCJMQ4hp/tUVzHvHLHaoDPrTG/di6H9S7dXRZGvLPqJcnhOVvUtKocdmHcHxryfcym9Xo9bO+8Fys5zqmfPVekO39OtbnLMwp+Z6eeLcdvNnUuWzui3B8s+fOrbRkHlIzm8/6wrSb4Uxa6a+x8jNI215yPU/f0S9j4JMLVGdtxZSn3nNOuF9j9pNKAC9+x/t9Dq9V7ys+VYLljabw5eXuMxGDUb07DlgKcuydvMEhzNuaSc4DiqJCe/1ZD8MXl8OOf3z7bZURfwad+wL4APjKWwUhhBF4FfjLj+3QnC9k7IN9S9S2J3WItPzphNG5/PcHlL72ySPer/1yXUDA+FPux2ydTDEqGHMRzH4CgqPh8RIEUc4JNXq1UmQCo8tfUQjLhss9f39QdWzDJts7PWunc/owFBXA0Y0QUw9qtyu+HR6fwzKSNZSha5gyCnIcdOJvt4TOt9n332jsXH98NDxxGILC3a+1dRas+QJ2zPbt3sJDx7tzrno/sMJetneJ92s42ica9YMl76gOODoJ7lwMBoP6fEH9Jpa8a69fkA2BofZ962/F+nmePgxvtYBLXoOudzgLjjNpkNjcvm/Kg4Age538LPj2arU9PtN7+88Cv80IpJQLgZMlVLsX+Ak47q92aM4j3m3rsOOhU7Z2AgaXn/XqST6Omr109NYO19uMoKjQPtIsdBnBF+a6T+1zXAyIU0a4Cxmr8Nk1V+myraz+HDb97Nwe63O/1UKN8n+4Dj69UM08Fr0JOS5/w2+ucb6mI7vnWZ6pQNlGPHFwDRzf4l6+bZZzpwuwvYQxnm32ZhF8J3fDj6Ph+1GehYAnVdqR9bDB8jzSQRBYv5OfblXvhTn2DrUkPu2lZgf5mXB8E7yWAkvft8/QXH8L+Vku7bS0w6YiOqTerQOAAofZpzBAYZ593zbTs9zL4DKw8QOVZiMQQtQFrgQ+9qHuGCHEaiHE6rS0MkwvNf7hvY7FT6P9iWPHmXtK7XuaETgaj/csKtu9rKNAT3YJUJ2D9Y/sOJI+kwZfXArvdXCun+3yG975DxxZa7mH2WIwtXSMWUeULhsg66j9HCnttoGvr4DvRri3a/0PMOc5eK2By/3+tl/TESntzzrtZnivvf1zXvA6vNNWqc8m9oOPurmfXxasAsnaYR7+FzZP917f5DCSNpth5kOq07aVmezb0sv3VRbyMuGvp2DRG2p/1xzn49aOfe138GoD++eYfRxmPWqf8R1ao9R+joKj4Iz6nq180lP91qyCuDj1YDlRmfkI3gEek1KahW0a7Bkp5QRgAkBqauo56CJRTTm5C/55Fi4Y69/7fDvcPrqzYfkZnDoA77R2OWQZrWUdhTeb2cu/vAwSmqpp+OA3ICxO/cFP7PB83/wspYax3lua1R80O81F9+vwR7UKgpkPw6rP7OXmIvvI7tgm93tNGQW12kJcQ1jxMXR26ajfT4VaDs/panTd/qf7Nfcttm9/Oxyu+9F95OrI8c32betnWJgDCJhnMVovftteZ3w0dLwRhrwHP9/h+ZoW/XyuEAyrW4tnT5ykc16+/fjityyzHx//1r/dDz3ug9pt1ezB1ZPLH15jjqR50dNbfwNzX4Tck842rJWfqpeVJe+CMdC+v/Q99+t92huObVDbRfnux8uZyhQEqcD3FiGQAAwWQpiklL9WYps0lYm5CP79Ctpfp3SkVjypCKwj1cwDHq5jUuoFTyPLE9vVKzRW1Vv7red2SLNyDT22AYIirTeFf79UNgdHck9CYJjaNhiVcdNRCIAaBQaFqWN/jnO/Z9YR51Ghq7BI3+HcefiC48xox2z1mb2c5L3+xz3cy6aMhBM77fuun/e/X0LfJ2H9956vWaAEz+7AAPYFBvJ6XCw/Hj7qXMc6yvaFDVPVa8wCCIlyP37mKHxxGTS/1Pdrlgfrf4BJAyGiltr3JjDAfSDhCasQcOVMGkR4TDJ2VlSaakhK2UBKmSKlTAGmAf+nhUAVwtsP2epet8IyAjq5W+0fWKkW16z8DJZ+4Hnk9u+X8PtY907UE7/epabgJg+jpe2zi1cvgHIr9CQEQHWIL9ez/xktnRlFhZ49WDL22tthCPD8J7aO6qwqoJLw5JbqOGL3hQIXL6iMvZ7rTb0J9nlxg92zELIc3HE9uZU6euX4DRetwYTenr2QlrwHexd5Frb+ZPUk9X7GIuSKWxhnCIBTXpOFFY+n2UM54LcZgRBiCtAHSBBCHASeBQIBpJSf+Ou+mgrCUwcMaoUoKB/3zrcr7w9QC2cy9sE2i593Tjr0f9b53PRdlmvnKVfQPx6FR3Z5vo/1j+S6QhV8G2Ee/tdz+a553kdzpjyltnHl5G6Iqqu2hdGzv/tXVyghEF2v5LaVF2dcfDC2zPBcb9Mvvi9scpydRSdD5n745qqyta80tBziLtwnXexez1zo/7acLaZ8d4cBHzADhqg65d8e/Os1NEpKWVtKGSilTJJSfi6l/MSTEJBS3iSlnOavtmjKgdlPqpG9lKqD2eDF68TRm2LazXZ/7bA455Hlys/US0q1uGbtFPsI1hikDHN5p+D0oeLbtfrzMj+SR76+wvsxb+sMNk+364izvTjAWWcCnlRZxdHnidLVd2Svi3H872fKfi1PDLTYDUr6jsoDq6A9S16Oi6VDSgnCuMGFxR+v35NxifG0aZDs0z1/iIxgc5CDWi99p/q91OnosX62EGQ72E1PGAxcVK8O7RokQ0iMT/csLXplscY3rFPdokIVrfG3+z3XcxQEm39VxlhQRl3HWURBlloss+JT+LAL/Hqn8n8H5e4YWVNte1NnVAanvawSPbQGZtzjn3um9PTPdX0lLMH7sfDy11VT/wLP5RE1yRaCb6MikMBRo9Gps6TZpdDT/Te5NSiQ7yMjACgCvouOxCQEBwOMDK9Ti62WDnpSdCRtGiRjBrvQaTwArpnk3pa+TzIzwsPaBy+8kBDHiLq1+SM8jDP1u8OeBcpOVbOlvdKlb8ENvyCBW2rXoFtKPaSlzdfUrc3xAKW8+Sa3jCqlEtCC4HyjyAR/jIP1U+HXu+2LUgrzPOtypVR+4b7GqynMUX7Vjjjq+11VRlbd6b9fetZx//mYfdu63H/xW0qHD2pm4E8SmsLdZQzR4MjZCCyrodmVO5d4P+ZK++vKfn9vjM+EGi3circEBbLn1pluC8Hmh4ZywnUNhwXpquN3JDZFvUfXg8ve9lwnogavxcfySnwcPeonMSC5LqPq1LIfr9cZ2gx3O21Y3dq8mBAHxmD+6nytrfzz6Ci2BAexvLbyKns7Tq3wLhSwIsjI6No1KGx+CTRxVj+dMBr4Od2uVlzbcQSbrKN9y/3TjAYOBxh5KS6Wo0a7wf7RGgm8nljDtr9ZFGEbNsU14NX0VbRtkMzm4GAAsgyCmRHhpAfYr3HIWLyHZVnRguB84+Qupcf++TZY+43SeQO81VwtVQf74hZQHfXEfrBzjjL0FhfkDJTqxHUxzdSblNropbqw0QcNX50OJdexcnS973VLS7e74bY5pffGKW9aDvVcHlnbd0HQ1Yv7ph8YXrc2Q+beBQH2lbT5Au6tlcj/1a0LT9vDN2wOCuSbqEhMwRH2C1z6lm1TAvJqy2DBYLR/F2HxzjcNr8EJS6d6xiJs9lg64I3NL6bNrkmsxWEQUq8baUZ79yafOsbpRn1s+ycDQ9RtgiKdhFehCOCp7M38FxLCoSb9IDgSxmdS2GQgBcC9NRN5duMEW/0bMpYxsm5ttXPFx/wYGUG/5CQG1qvLlOhIBiQ7q7R2y3xMwLW1azIiYwntGiRz3GgkE8k3W75xqvtebAxPJjp/Dne2uxN/oAVBVcZcBC8lqaX46bvUqN415klYnFLn5GYob5aDq9XS//8sHjNWA1xhtgo29ko91albX7kZ6t3K4f/c22E1ABecgR0lrCSNTYFON5XhYUug5RW+17XqWeMbKRfE4tQfZ8GcsFBmh4UWXymhKbR1WQw29EMloMLjncMWuBIWD6NnqM+zRitIaKbOvessAuF5Y4QHD6uAYNtmrmUl9P6gYDAGsi0okNMGwYi6tXk1PpZCxxXXSam2zQuS6/LYZouXmCGQImMA/1czkVWBqtOfFB3JM12ugVpt8OZwuayuUrHMPbSA5+Jj+SQmijMC+iXbXWXXpa1jxVH7qudT9bsCUNhyCJub9rOVFzy6g6AAJXzTck9w+MxhPlr7EVeF5TI0qTYbg+3P7EibBsm0+aYDzyfEeWmlYu3JzfzX/TY2hNivc1FyXS5YPNat7g9RkW5l0cHRbmXlgRYEVZnCXKVr/+1+eL+jJZSCiyBY9Kazh4I1Vs8Ki83e6ja46nPPhs6325RvmwPDIKQUP+Zml0KzwSXXi2/k/VirK+3bDftC04Fq29qRhUTBoFc8n9vvafXu7Q8Y5d0vf2zNRB6u6UWPPu4AdBwNo7536lCp1QYa9rF3lt4EwV1L4aHt0LA3XP6uWrl6z0rocD3UbOW1TRuCgjhkVTU8uAWunep03M3nxqoyDAyFp47D1Z6N87kWfb3BIhCuqVub22vZ1SAFMcqwaq7ZiuW5R2x6/tNGI38cWcLhACM/RYSSUZjNorBQHowJxoRS2fySthIZGIrZi1YkKNSi1ikqZGpUJB/GxtDd6ByB9sY/b+TvffbQ2Jn5ynZVEBjKiU52tdoTi55gf5YK8fD4oscZ+NNAPl73MXtP7+VgYPnMHMdneVkjUIloQVBV+PJy+MVlWui62nbDNDjmEux1x1/OMd6tboJWlYvV3W7PAs/3tfrQlxfGoNJ5Poz6Drr9n+djt/5jFyp1Uz3XAbvu+Pqf4LqpDjGJHLynrbMCq5qmwYVw21zobjECu7q6guoUb/TiklkSIVEw5H0lwKyCoEYrFdws2kG4hCeqNlhnDV3GwHXTVGfvGqjOkZqtPRZfW7cWg+pZ1BVRdXg7axP/XDIegNUhwXRskMzXUZE8khhPoYMr5omiHM6YC6GNPUjw27t+Jr/bXawYMYkrGyhBHGAMptASPXOzw+g5u+/jAGw7tYPbFz3CzW37MKxhE9vxgfXqMt5witOWEBImYaCDg1fOyaI8loW6C8Vfhn3A3DQ1S911yourMWB2UWeeyj8FQJ4pj2eX2r/bJYftQemO5biE6C4n9mcXE/ywkqjMlcWa0mANC3ylg/et6+h//1LPC5Ec4/M7xkcvLtyAvxAGCI1xLmt+mRr1T/8/qN0ebvjFOT6Oo37ZkRot4P51atQaFge3zFarO11pPtg5amPqLcqWkeLgoWL1Ugqv4R7h0bo/80H1Ht8EIms5dYqlIqKW877R0mF6CmonBAx8Uc3Y1v+ghESTASXf45Y/leH+9WJmSsCkjUo/v+HRPSyf0B6A1+LVCLvF5q+BTPoEBjB0+ROwHD7tbw+VMGnTJOJSH+aNleNtZRkFmYxfZt+3csbgPJxfk+U5xn46KlbQGeHsvJBl8hw08JnVr9m2lx1Z5rGOJ07mqUB8H637yOdzzme0IDjXKTKpDtITnrIxeeL3sfZtx4BnxYUbsBIap0IoONLnCZj/EsTUty/siqzjvE4AlJrjqMs0uPFF7jOCfk8r32pQqqOwONXZRltGrkEWQVCzNdy1RK1jOLDCXUA4ujOOnq6yTwW561lJ6ene2af0gis/hRbKoC6lxCzNGB0jPz6ToTrmEmJjAUpds/FNtX3PGkjbonT6C9+AEV8717Xeo7h8Bx1vBKTlvXhyTbkEBIQQGBwJl74Jm2fAngW8Ghdjq5NmNOCotFqZudMt2s/ba94GA2Q5uEre8Y+zUfpAlvu6iBm73GdJh874ttYgPdfzQqvDZ8o32ZD0NbZRNUGrhs51pt3kHLveStYxOFPaqWsZXM9chQDYg5/VbKU6vItfhAc3Q1Jne52n0+H2+XCvywreBr3dZwQBQUplBPZO9t7VqjMHiG8M/cfDDb+q/Yga5DUZ4KS6ANQoHeCKj8Gik14VFMD4peNLfk4hoN1ICArneM5xHlrwEO2/bk+RYygNg6FYIXDKwfvE3HG0/UBgqBIw9XvADT/b3C5zTbmMXzqejMJsCgFpiZaZmZ9JRp6Lq68xQMX2L8bDKTM/kzZftqHLt13o+E1Hsgqy1Dn1umICvom2x+bpl5zExA32gG23/nUruQbPzzYxxrtN54dtHn6bHpiwfkLJlYAP137osfzuuXf7dH5JBIiSx77hgeHc1+E+2/6A+gO4rsXZuefe1+E+3u7zNq9d+FrJlV14qecLBAgjgxv4YCsrI1oQVBQ5J9WiKitSlhyjJTfDPYSClJaomk1VNM1SUQ6joJhk5zUHnW6CHveoDvKqz6BeV6XnNgaol6MR9/qfoEEvCHYJFhYQ4tDBeeiMhIALHnAKttX5286MnjXauV5QuBrpt7/Wpm65JTGSn3b8hMkxPHEJDP55sM2waJLO5+WacsnxkNtgVngYveon2VaQHsxyUMF5Mfj+suMXftrxE29t/ZqODZL5KlDd64LvL+DCHy702uYvN31Jmy/b8OjCR9l4YiMfr/2Yk3knOXjGecHbb7ssv53u/8f3bd07kXf/fddp/+voKLc6/iDIEOT12N7Tez2Wl+b7K47kqJJXA+eZ8nCMiFw7vDZXNL7CrV7jGHuinZcueKnYa5qlmf71+3NxfQ9hMbwwtuNYNty4gcsbD+W/0Wt59cJXfT63tGhBUFG809Y5XPL6H+DVFLWaVkrnAFpms3IHXT3Z/TpL33MOrVyRxCSrUb4Nl047rgHc+pdSCTly429w0bPQuL/aNxjhDofwB8ZgeyIWX9QuFjamF5MF1ejc2RRY48N7oNBcyH/H7W6x+Q5hf62GTysXT7uYrt91dSrbHRjAYzWUsfnRGgmYgS0n7YlbZKhzOspcUy4ms4lsi0tlWpFS8U2Pr+U0A7li+hUAPDj/Qdp82Yaj2SqgmbUD/2PPH4yaOYqP1n1E7x96uwmomOAYtREay/JoF7/8EkiJSilV/dLgS2f8cOrDHssnDfSw0teBiRdPtLU90BBI/+T+tmMNoxvybt93PZ43pNEQ23aRLEI4/LaDjEEkhDq7GDeOaexU1ibBs3ddXIhyJzVblo4ZDUZ+GVJyXKeZV87kltbF5GguZ7QgqCis3jeL31Ydv3WkP6GP8gh6ozHMegSObVYun+939Byh0JfgYG2GK88SR64oMf+POy6uhcQ2UL7tpZ1ZNLgQej3oXObo1RIQbL9mKQSBlYy8DNYcc8lh7OJRk+8lpvuJ3BPcP/d+Rv8xmskbJ/PSCueRnetI1Opt4sgSB2+WfYGBbEjp4tQpF5oLOZF7goNZB5mwfgJdvu3CuEXjyLEYQAstKqEdOYdp/3V7+7VOq+/fOjv5cduPSCltLpquPLzAufMMsyxGKygqYMFBL15hXrisYWlnm77jKGT61OvjdjwuJI4RzUbw9SVfux1rEN3ArQyUOmfWlbPoWrsr93RQnl6tE1rTuZZdXfnr0F9JiU5hRDP3JD55Dh540cHRTjOCIGOQrUMHJQSe7f6szRNpRLMRNqEbaHBW3d3fUYW9qBlW035+bGP+vuZvp3p3t7+biRcrVV3X2l1JjkqmpDwt5Yk2FvsLKVV8eddogf+MV0bBrb+rfXOhPTjYygkqPV4NSwySLA82AG9JVBwJDHV3H6zdDu5Zrdp1cpeKMw9KLXP5uyopvCtNL1aJUqypFiMsP+bk7mAIhB73ltwWD+SZ8sgvymdhnaZ8ZMhiljEIYTOUlvzjly7hMG768yZ2Z+5mw40OhmmXP+ThM4c5U3iGepH1bG0Y+NNAm/cIwFtr3sKVJ5c8yWsXvkaQIcip7pi/xjC44WDaJLRxE4vXi6Ow1B7gLdeUS98f+zrVmb13NiObqe8g2zW9pQsBIgCTNPHZhs/Ye3qvV6Hm2D6Ae+fei1EYKXLI1NU8rjlbT5acBL11gmf307Pl4dSHbfd/8YIX2Xd6H/MPzHeq8/nFnxMSEEK7xHYIhJNhN9KT8R+oG1GXelHqu+1YQwVzCzYGUzfCvrLX2rGO7TiWFnEtaJfYjvHLxrMubR2BFtVkjbAaTB44mTn77RnIggxBGISB9/q+R9O4prZrWgXBwJSBNqF7fYvryTXl8v02lZ/hisZXEBMc4ybwaoU7e47Fh8bTtXZXZl89m9gQ5xlkReDPMNSTgMuA41JKt1+VEOI64DHUPz8LuEtKuc61XpVlwzQV5uHmP9XqUUesrqCeyEm3C4YsD/7GrjHmPWEMdFONEBBi19cnNoX71qpUhJ1uUkZSswmmezDIWf30U3rBpZbwzuEJ8MwJ97rFIKXkWM4xaoXXYtTMUew8tROCAQLJkYWEmovU9NRhFJSWk0ZoQCgRQc7eQQVmZzXP7kwlqExmEwKhPH2CI5Sf/7//A2DkzJEEG4OZO3wuUUFR7Mrc5dZxemLhwYX0n9qfM4XOn/uyI8vs7orxxf9xv9z0pcfyIxZ/8tMF3sN6bDyx0clO4bgoyheKXNI1uvrTe6Nb7W60jm9dvPrNhU/6f8Kd/3gPgfB4l8e5tsW1PLrgUQCMwuhu8Me+elYIwc9DfubKGfYFgcHGYLf6oGYEVhLDEvm4/8c0jW1KjbAaTLt8Gs3i7OrUiKAIrm6qchfXiajDurR19KzTky61unBpw0sJNgbTo04P28AgyPJf6pvsLMytn6VRGAkyBrHyupUEG4MxCAMPd34YszRjEAb6JfejJIyWJEJ1IvwTZrok/Kka+gIYVMzxPUBvKWUb4HksqSjPG6yp6g6tdvdtL/LR8HVsk93H3JUaXlaP1moD7a51X2wU4HKduAbKo+diSyjhDtcrQ+uY+c71rIbdCx5wWhH8yspXaPOlb6uOpZSMnTeWAdMGsCdzjxICDnT7rhvP71Muh7+GhzFukUoq0m9qP5ue3EphUaFHYy3AT9t/ov3X7TmafZRVR1fxa6i7euhEjgobsD7N9xhGrkKgtHy2wXOine0ZKslNcYJg1MxRZ3VvV7rWVvaNhNAEJxWNqwHXaDAyvJlzELf5w+d7vOaIZiPoVbdXiSNZ66jbKtgCDAE21ZvjyD3KwZkg0MFL6oFOKjPcohGLmHa5s+ozzCUm0wV1L6BGmFrZ7CgEXLmqicql0KFGB65qcpVN0DSLa8awpsMA78LHKmStqrrQgFDbdrAxmNCA4sOLOD6DN3VfReHPfAQLAa9DLinlUiml1W1mOeCDU3sVItgyhc0/o9IMOuKYS7Y4zIVKHXPTLBj2hfOx66fBBQ+6x06/YxEkdXJTjRAQ4n79+Ebu7oh1OqjwBbdYYga1t0RstESINJlNFBYV8u0WFXvmp+0/8cm6T/hxmz0/wafrPqX7d91t+1O3T2XugbmAizeNA9MOzYdrp/L0mY3M3D3TNlJ0XN0ppaTjNx15bKE9Yuna42tt2y+ueBGArSe3csvsW3h6ydNu98nIz2DgTwPdbAGVgXVGYA13UFpe7VV6L5J7O9zL39f8zbzh87imqVoQd1WTq1h1/So3vXV6nrNPf4DBswLhsoaX8VH/j9z041aaxaqOODlSGYmt362jILih5Q22+o4dr7WzTYlKsRlPY0JiaBbXjCsb22cKd7YtWzC2brW7seHGDSRFunc/bRPbqvZ7ESTjuoyjbUJbmsc1L9O9m8U149KGKqWm0TGtaCVwrtgIbgX+qOxGnBWFeWCJaEhBtj2+z+rivRxKJLKWPSZ9o37wisXjIqqOPeyBNShc++vsqhXXDt51RlAcjrFq2o1UYRcsLpDDfhvmNKJ3XEVqHUF+sFblLigyF2EQBl5bZfedLlYf3vRisGhbHBcqHc0+Sq3wWjZh4riC9IY/7B2IVZd871zvtosvNn7h/f6VTM86PVlyeAlhAWE2Q7KVjy76iHkH5lErvBbv//c+4Jsev09SH+YfnG/bDw0ItY1UraPQEGMIBmGgVngt7utwH6m1VLgOa+c0uuVoIoIiiAry7F5q7di9qZ2e7PYkAkH7Gu1tbQAINYbazg00BDLl0ilsPOGsiooOUr/tvvWc1TIAz3Z/lpHNR9IyvqXbsfJgaKOhdKvdzU2fb6V1Qmu+vdRLulMfMZvVZ1bZM4JKFwRCiL4oQeAlIwUIIcYAYwCSk33LClShHN0In/RUERrDE5TXjzUKp7eMVSVhDFZ5bgMdRvIh0cr7x5PtAOAKh+XyxkC4aiLMf1kZh43B5Bfle53mFotFCKw6uspNrVMcs/bMIjQg1Mm4mZHvfe3ER2vt7X9rtd1wO2DaAD686EPGzhtbikZ7xrFTLC2NYxpzMOsgeUV5bsceazSMV3dN9XCW77zb710+W/8ZZml2Uyf1SupFr6ReADZB4OjJ4o3UWqlen7lnHTXAGNTArsG9ve3ttu3rWlxHeGA4Vze52rbCeuGIhRSaC7lo6kWA6izbJ7YHvEfGbB3f2knF80SXJ2gU3Yhudbqx45SaLSdFJNE6obWbcIsPjWfOsDnEh7i7vxoNRr8JAVA2Cm9CoLzoXLszf+z9g0YxxYcC8TeVKoaEEG2BicBQKaXXJJ5SyglSylQpZWpioh+yIp0tuy0x///7RtkDSgrF7MhNszxnerLGwXENkdz+Wuj1kG/XbjsM7lgAYxbwy56ZpH6T6hYSIL8on0/WfVKsn72VW2aXzq/5icVP8Pzy553Kvt7s7hJo5eN1dhdXV3fHu+eUz8pSX3mux3NuZa/0eoVhzYZ5rH9lV/WduKpPPKlLbmp1k8eVqsHGYO7pcE+JoYZ71unJsKbDiAiKYO6wucXWLY6GMQ3ZcOMGOtTwnB8iyBjE8GbDncJsxIbE2nTvAC9c8IKtk68VXotZV86iflR9AFrEtaBGWA0nIQBKtXNHuzswCAM3tLyBLwZ9QY+6Pby2s0ZYDedQH+cR1zS5hjnD5pRZvVReVNqMQAiRDPwM3CCl3F5Z7SgXstRCH7aXQbuV0lMZbaff7ZxcvHF/Fcqh21l2gMGRUKc9f/2jgoXtPrXb5kIJ8NWmr/hw7YeEBYQxutVozhScIdgYzPZT2/l1x6883vVxn6etbb5s4/aDdvXM8RSb5lzgwqQLubDuhSw7sozeSb2dPiOAiMAImsU1w7TDs6E/PDCcFdeu4J/9//Dk4idt5Zc1vIxfdjqv/Xgo9SF+2v6T17Y4rlj1xCcD7IEHE8OcBxFtE9sSHRTNokPK86xnnZ68wRvFXq88qRdVj+8u/Y7M/EySIpLcvJZcMQgDnWp2qqDWnXsIIZwEa2XhT/fRKUAfIEEIcRB4FggEsCSwfwaIBz6y+PeapJTFxBI+h8kvIatXSYREqdyop/ar3MCrJ6kQyQPcR6WOnMg9wemC0zS88BEVHM4H7pl7DyuuXUFYYBjLDi9j8SFluLaqO7pP6U6POj3IyMtgy8ktDGs2jKaxTYu7pBO++Kifi4xuOZqutbsyorlabOS40hjgsS7KQG21cTSKbsSJvBNOht6wwDAnT5zXe7/O4oN2x4DHuzxO//pqpauju6Mr3et058FOD7Lg4ALWHFtT4mpaR74drHTWVo+uxrGN2XDjBt5e8zYnckvn8ltWooKibPYEX2L7aCofv31LUspi/d6klLcBt/nr/hXC7CfVSl8ffbMBFY/nZ4seto2DmsEYqLx4Um+FtVOgWXGet4pBPw0ivyjfeSGVA9N3TuepJU+xeORip0U56bnphAWGMebvMbYygWBDmrrO0sNL6Z/cny0nt/D+v+9zuuA0b/VxX2x1NvSq28s2ai2OAfUHsD5tfbGx4W9udTOTN3kIx1EKXDvmLIc8DI6f7xnLOo67O9xN/+T+fLj2Q6d1DVZPE4AmMU2Yu0+pbh5JfYRrW9hz5rqqSxwxCAM3t76Zm1rdhMT7SmIrQxoNYcauGYzrMs5W1rNOTy5rZF8dbHW9LE/8GYZCU7FocV1aso7Br3dCv6fU6L001O0ETQepVb/HNnoO+1CrNTx11KfLeVthauWrzV8BKohZt9rdbOUn80+SaHJWKQghuHaWvaP6Z/8/gN242ufHPj61yVccF84EWwzZnogKiirRH9tT2IFJAyfx6bpPWXF0Ba3iW/H1JV9zKv8UUcFRfLXpK9777z2n+q6qoO61u+MJ65qCiMAIhBC2cAaeiAyK5LJGl3E056hTpwx2v/0AQwBtEtpwbwd3TychhFPMG2883/N5nu3+rG3hEzirj/zB3GFz3Xz3NVUXHWuotPx2P+yaC5+VvFqQ4Gh7hqvgKLh9rlID3fYPPLLb70nTHd35lh9ZbtvOyMtgxO/u8VYqEke9aKeanagTbhcMjjryBzo94PQc93e8383zyZPbYsv4lrzT9x2igqK4r+N9BBoDSQxLJNgYTJtEpTZxjP/iaqANNAby9SVf81jnx5zK2yW2A/Dod+5KZFAkFyZdyFeXfOXm4WOdEXSs0ZGvLvnKKSZOaTEIg5MQqAgSwxKLVW9pqhZ6RlBa8kqx+Ofx/bBvmZo5FDj4zweGFp+U3IVdp3ZRJ6JOiSNjgGPZx1hwcAHDmw33Gro3Iy/DFpbBimtI4tJSL7KezRA8aeAkJm6YyNLD7tnSJg2cxMKDC506c9fnCguwjzSjg6OdPEYiAyN5p+87fLHxC57q9hSn8k/ZVugC/DTkJ7ae3GrrpJaMsqcetJJaM5VBKYMY3mw4qTVTvfq/t6/R3ub7buX/2v8fQxsPdZtBeCLE6GERnwXr+d3reJ55aDQViZ4RlIbcDM+pIB3pcIPzvjUJSwneE97IL8rniulXOK2m9UZOYQ79p/Xn+eXPcyDrgFdBkGvyntksMtBzUK+SeLTzozSKbsRrF75G51qd3cL2WulcqzMPpT7kFH9FBW5TNow/rvrDLXvUO33esW1HBUdxQd0LmDhwIinRKbSv0d4WhG540+E0jW3qFFLYEwGGAF7v/Tqda3VGCFEq18QAQ4DNPdIbz3Z/lo41OhYbPbJuRF3mDptboaGGNRpvaEHgCxt/gm+uhgWvl1z3cmfdM1Eqhkp+GSPK5lrSUa44soLtGdtp82UbLvz+QidvldMFp3l0waM8teQpW9lHaz9yS1Ri5eWVL3u938UpzokzFo1wNuje3uZ2p/2G0Q0BtSDo1yt+5ZIGlwDKOHpzq5tt9frV6+cUVrheZD3+vf5fvhn8DTe3vtnW+RuF0daxW9VFDWMakhiqbBqeVrda4+e46uEri2uaXsOXl3gONOdIYlhipa8o1WhAC4KSMRXAtFtg5z+w3HMaPScMBohrBC0so9KQKFaEBJOaksyc/XOYvnO611MnbphImy/bKC+Z7GMUmYtsbp1CCB6arxYtZeRncMH39oXYW9K38MfeP5wiU/6++/dSP+rVTa7moVTnxWoxLvmFL0q+iOtbXG/bt4aVcPVnjwmJ4cHUB5k3fB6LRizi3X7vuqlZAo2BtEtsh0EYeKDjAwQaAolzcIN9rbc9NIXVmOwpDHFKdEqxC6M0Gk3xaEFQEr6EfXblvn+dEpQvbqmij46dN5anljxlyzTlilVPf92s6+g/rT9vrXnLFnNGILym8bvtr/Lxwh3bcSyRQZHFBjOLCYmx+dSDCkOw4cYNXlfDJoQmuAkTTwxuOJh/b/iXYGOwbXbg6DFjXfnsLd6NRqMpO1oQFMe+pfC3PYLl4QAjK0J8j9UjpeRY9jEWmbOcyq26+5zCHJ5d+ixHzhzxGA1z1p5ZtsxJvrgRni3WDrtxrPeVrbb0h37EGmDM0bPIOiOIcs13rDlnkVK6JRHSnJtoQeCNoxth8iUqfpCFIXVrc1vtms71ku1eHz9HhDtluZqydQr9p/VnV+Yup1OsI97Ze2fz846f+XDth0zZOsWtCXmmPPZnqCBtngKd+Yqja6YrntwWrR491vcpl06hXz1l3HX06PEXt7e9nfnD5zsF/LJ+Zt4yVGnOPT6av4sGj88it6BsjhKaikMLAm94CBuRb1Af1xkhsDkcBobC2A0QU59nE+OZvHGyzR1x9t7ZHi89Z59Kg2ddLTt9l2e7gRCCsTNVFEpPmZy80bNuT6f9EEsugptb3eyWr3Vsx7G27cycQjYczLQFSrN2uq0TWvNuv3fZcOMGmyfM/R3vL/fVxlYMwkB8qHO0yS8GfcH1La73GvN+xe50vly61+s1T+UUMHHR7godoZ7KKSBl3EzmbS1jBNpyIqfARGFRKVa/lxPW7+N0nvNv9705O7j723/LfN0tR05TZNYzjfJECwIvrM3cRY6l03s1LoZHE+0dU/eUerzbRsWMISQGYpJZepk9CqRV1+8t5POba94kpzDHKWG2J7IKsgiMWVNsHU980t95ValBGNhw4wYeTH2Qp7o9xYYbN9jyugoEdSPqMrbjWG6YtILLP1hsG/Vf3vByr/e4rc1tDKg/oNh2LN+dzrxtqhPMLSgiZdxMPlmwq9hzvNGpZicn24QrIyYs59kZm7wef/znDbwwcwv/7vceBttX8k1FPDN9IyfOFL+ye+tRpRL09szHs/I4lVNy1NezpeUzs7lp8kqnsoocpbt22m/9vZ2ZG7yEUi+BvSeyueTdRTR6YhYTFpbtt1QezNt2nN1pZ5e5zsp1E5cz9EP39S6OLNqRxjv/+C82pxYEHjiZd5Ib/nuNrin1yBGCb6Kj+CPCeRXlz7n71UZINJn5mdyxxJ44Y9p2lYKuuNj/X/z3F59v/NytvG1CW+7veD+9k3p7PC/34LUey62qG1C62elDpzPx4omAPenF4VO5HDql3FFf7vUyo1uOplVCK/68+k9ubXMr6w8ql9SwgCjmDZ/H2E5jvbbfF0ZOWM7Nk1cB9lHhxEVqIVu+qYiRE5ax/uApn6/35l/bmLvVPebQsl1eI5jbSM9WHW6BqfiR5ILtaexP95wK08qfG4/y1bJ9vDRrCwAbDmay54R7wh2rVUfiPioG6PLiHNo/9zednv+bo5llV/35wpKd6aRbBNfni/fQ4pk/OX7av/e08vH8XaSMm8mhU7kcPuV9DQuo32huQREdn/+b275c7XSssMhMnzfm2/ZfmuUc4NBslrbP+evl+3jzr23F3mvV3pO8+dc2/tp0lONZ7p/F0p0n+GLJHo/n3jx5Ff3eXODxmJU/Nx4lZdxMGjw+k42HvC9EXbIznXUHTrHtaJbXOjd8vpJ3/tnh9fjZogWBBxxz4r7oJTH5qaI8nq7fjDUtL+bVBc6qnayCLHIKc9hzwvsf7eMt7mkUQWVzGt3iFtbt8rwqtSi/ttO+NWbNfR3vA8BcEMekJXtpGNOQjjU60rNOT57r8RwZ2QX0eGUuPV9RM5c6EXV4pPMjGISBhdvTnP6geaYiEkITMAgDUkq2Hj1N62dns3jHCTYczGTRjjSvz+WN/EKz0/u2o1ks332SJ39xzkg1Y91h/veb55H9+3N3cssXzp3DjmNZjPpsucf6jlhVQgZL77xgexp/eBiV3jhpJX3emIfZLPlm+T7yCouQUvLDqv1k5VkzcalrmYrU++UfLKbvG/Pd1E7bj6sR48o9J2k7/i+vI7r07AL+2nyU6WsPsXKP1+yumIrMpIybyYfzdhar4jKbJX9vPuZW558tSoi++ofqQB/8cR1TVx8gr9A+OzAVmVmy0zlKaV5hEduOZvHDqv2YvKiYNh7K5K9Nzt5w1vV0Xy/fB6iOtccrxedP6PHKXG6cvJKT2QW29lo5VoLgem/uDtqO/4uT2QU8/etG3p9bfBKlYZ8s4/25Oxnz9Rqu+2yF07Htx7K4duIKxv+2udhreGP62kPc+Y2azUsJl72/mEOncjlxJp+vlu1l4qLdbp/zwHcWOs2eOjz3F6/P3srsTb7FHjsbdIgJD4ycOdK2vbYYL6FfDbls3vQ5G3fHEOQgLySSrt91pfB0GwJL4eRya9OniCCFgxk5HD1lJMTBLp217VmQgSCcVwsbZSSQjgEjbY2Ps3SvkfWRpwC1Cvat3h9w+FQe905xDqtspcgsGT1pJTWj7M/58I/reG9UB7Yfy+L+79faRrtv/7OdNfuUamXr84MICXRfkXs6r5CIoAAWufzIcwpVu7PyTaSMm8n4y1VmKYNBsHx3Oo0SI0iMDOY+Szv/3HiUZY9f5LHNeYVFtnvnuKg4TEVmvl2xn6s7JRERrH7eJ87k2+pZ/2g3TlKqkt0vDcZgEBw/nUeXl5Ttxiyhy0tzOHEmnwMncziSmceMdYf5ff0Rvr61q8c2AVz63mJm3d/L1sanf3UWcu/8s4OrOyax43gW/Zo7Ox0YhOD+79cCsPcVlcf2TL7J9gwA2fnqGV6fvY3XZ29j4/8GUmAyExdujzP04+oDPDptPQD39mvMoNZ2g/vRzHyOZuZRaEmPuHjnCRbvPMHKPSd5fZiKofToT+v5+d9D/HRXDzrVjyUju4AOz9vXp3wwbyff3NqV+vHOM+TL3lfhttePv5iokEDSsvI5dtpZdeYqu3annaFhYgSgBInRIqW9CcPvV7rnsnD8LUxfexiAk9nuKrsis+TdOTu4vG1tggOMJMc7Oz3sclHzXPz2QoftBTw6sDn9W6rvbN2BUx7b58gPq9zb2tODEPzuNuff0ycLdnF338ZIKcnIKeTDeRWj/vJnPoJJwGXAcSmlW3JVoayO7wKDgRzgJill2S1I5UBOgYkfVu1zWrW7P7D4wHDbM7Y7CQFHjCGHS3X/D+bu4o/lq3nxytZIk4sEMQcBRpABZG19gcjmT2HKSSE9vTchtacxfU02SzYqX/7lu9NJGTeTKzvU5Zf/DgEQZPQ8+bOOWo6dzsdoEBSZJX9tPka/N+Zz2EVdYRUCAIdO5dIgPpzRk1YyLDWJoe3rcjqvkLbj/+Kevo3Zf9I+q8rKK3TrsOdYDKjrDpxi5AQ1ord2gABHXO7tOBId/flKfrxTeWu5RnH4Z8sxnp2xiR3Hs3jhChVcLvWFf2zHcwuLGO9gSziRnU+NyBB2HHfuCKz6/81HTrNohxJqi12E24o96nO2svnIaTo+/zf/Pj2A5k//iSd6vTbP7VkBp6Aab/29nWW7TrBqr/q8VzxxETPWHnZ71tbPKmeEPS8PpuUzs6kRFcw+B7XW+3N3Oo2K3/5nO297mJXM23acFbvTefDHdTbVoVXF8ohFqFg5cDKXZ6ZvYsyFDakTE0qDhHCn30Xb8X+x+qn+3POd+1+5wGU20e/NBXx9axdu+HylW10rUkryCs2EBhn5YJ77CL/503+y+LG+FBZJ24Dl88V7bcf/2XyM/i1rsnx3Ou/N2cF7c5R65bPRzqlPzBJSxs2kb7NEYsOcA/htP3aG275azXe3dWXRzhN8PN/eOc9Yd5imNSNoXisKs1myJz2b+nFhBAf4pmx5Z46zuuf12dv4vz6NyDd5nnkVmaVNYJYn/pwRfAF8AHzl5fglQBPLqyvwseW9wpFScuTAbv7940PeCFiO4Sw+lbwjVxJSW2WkMgSVrLt2xJTdlG1ZWaRl5SOLXN00HUbfMoCsLdZ1BwaydzzNOzv22g5bR2JWIQDOf8I1+zJYvjudvs1q8Pdm+/TbcVrqKgRcOXY6j6+X7bONKlvUjiIkwGi7b6f6dunY/eW5TLjBOQvV5sPuXlmuetShHyxm3cFMpt/d06kTXrn3JGv2ZZCZW+B2nf/2nwJgxtrDjO6eQnKc8+eYW1jEFw7eRVZVlbc/rqNRVUrIzjfZRrauI16Ak9kFLN5RcgIYV7XNEQfV3HsunUNXy0zFG9PXHia3sMhJCJSGE2cKGDHBWb22fHc6O45lualnAOLDg7huolKl/HF/L67+2Dn+lqPgdcSTneT/SvAe6vLSHNKy8lnxxEXEhQdxMtvduH7Bq/Oc9qes3G/bvu0rpUp0FaK3f+WsYrQyb5t3tee1E1e4lVlnsHteHkzvN+Zx4GQuL1/VxuNs2ROebEur9mbQIMFzZNfCIrNf0nb6MzHNQiFESjFVhgJfSfWPWC6EiBFC1JZSls2d4Cx4ce5vBPw3nkbiKIYE9yTZvpJ7aARF2Y2h9i8l1m0k72KXcMlHYFZROLcezaIouzF5R4cSUstbSIqym3esf9zXZxdvTCuOa110qmO+Ws1eS0fk6iVyJt/kNrJM9/CHtqoXrKyzGK89eVS4dj5Wfl+vfj6n80xc/PZCt5HfK384GxgLiswcOJnDqRzP7rln8p1VcZ8s2FWi7vn6z907DFdcR3wfzS+7CmDsD2vLfK43Pl2w2+sxx+/uG4v+3xcyPHznWXmeAyNaSctSwrYkYVgS/vYaHvbJMg6cVMJ85Z6T/LHRN72+9fkcueHzFUy903NU2oIis89CpjR4FQRCiN8Arx+flLL4EI8lUxdwVKQdtJRVmCCQUvLdyv38cPBJSASVObPsFGU3RRaVHCo699BwAmrUsSTuBLMpgsIM+xf/7pwdgIHCjO7FCIJzi70Oo9EiD/+6QyV4i5QXrvdxHfkdzHA+nl9o5qJivD92pzmP2EoSAr5inYlUNRolhrNgu33U/O2K/cXUdubwqYrxUqoMVjuoxxxn4mXhohY1bHYeVwq8qIzOluKGlW8AbwJ7gFzgM8vrDFChDrxCiDFCiNVCiNVpaaX3WPHGkp3pbl4rZ4M0B+H4kZpNEW51sra8gul0R07lSFud7B1PUXDCi2H06FAKTvk3lXPdGN9zI3iiYaLzNNZsluxLd5/yVhSp9b0YbTyQXVD8iNRVr+2N165py4tXupnCbLRNiubarsm2/ax83xcIlgeXtq1dciUvXN9Ntbt2dAjBAb6PRpvXcl4FXtq1Ay9c4f3zXPRoX6/HznXCg4r/DNOy8qkf73kF/8RFnt1ZzxavgkBKuUBKuQDoKaUcIaX8zfK6FuhVDvc+BDhm90iylHlqywQpZaqUMjUxMdFTlTJhnfZLWbKaRUpnJWN+2kXkHrKnZS442UN59VgoyqtJ9o7HObPzEc7sGOd0bmJkMDsPGynMbEfugZuKvW9hRnfyj1xTYvvOhl5NPOcO8MbLV7Vx2q8T7SxIiqS0qXWsdE6JdTOQ+ouO9WNZ+aRdsI65sKHXuo/95HnkVVqGdUqiUaK74LcSHhTAS1faPzdXvXZZKM331rJ22WM0DWhZi+l39+THO7qXKDgdGdG5Hq9d3dbr8ejQ4h0xru9Wn5/u6uHxWL244kOdXNmhbskNLCWun+E7I9q71XH04PLGFV7adpWlfNXeDKc1Bd0b2jUVntY7lAe+KJrDhRC2f5IQogFQHjnqZgCjhaIbkFnR9gEpJTU5iSz0HDnTEdNp586v4MQATKfb2fYLMzvatrO2PkfO3nsBI7IwHmmKoVPETWTvUWkrm9SIAIzkHR6FOS+J167x/mcpiVFdkr0e++DaDnRtYA/r3KJ2lFNnZKWZy8jNEcdRrOM9HTtaV52lp+lrkMUYO3G077ObC5uWTehHBgdQI9K+DuOqjnXZ9sIg20jso+vs35Wr6scX7uvXmE+udzZ+CyFoU9f77yjMcu/HBjV3O9a8ViQz7lEdbWl420NH5I1aUSGsH38xO1+8hGWPO6dZtY74vVE7OoR29WKoFxdWqtCHkSGBmLyEghjdvT7Natp/dx9c24E7etsF9l19GgHQMTnGVvbCFa1ZP/5i1j3jnDPjivYqllatKPt3HhnirvUenlpyelFPPDe0FQCx4c6Cy2gQvD2inVNZcb8BK94MwbdcYM+97ahqTYq1D7TCg/xj1vVFEIwF5gsh5gshFgDzgPtLOkkIMQVYBjQTQhwUQtwqhLhTCHGnpcosYDewE6Vy+r+yPMDZEJa5k4Wh9xBmcO8MAovsH3hBRjdMZ1p6vIYpW/1gscwYLmldC2QQSOcv7P7Ot2DOUz/EpQ4rYX/5vx5c1LwGxXFBY88jPyGK/xP3apzIDw6dy809UmhfL8apzstXteHarslMuslzB+0qOG7srrJzObrYBQc6/4ysrqLjL29pM3pZO2arL7Yn/hzbi10vDea1q9uy8JG+fHVLF768pYvt+NUd7X/k+/qpCKn14kIZ3b0+b49oZxt9uo4W48KCCA4wYrC43UWHBvLr3c7xmErDgxc3c/LPt7rmhgcHkBBhX4/RwaET22DxiHL1YgIlJNomxXhVad3Zu5HH8riwkkefVgIDDESFBBJgNFAzMoThqUm8fFUbnhzcgheuaMMjA5txbddkpxH4thcGMXvshTR16LCLy7rmipSSIrNn1dr/hrRiyxHl8TX1zu5c1rYOj1/SgkcGNuPSNrVtAtPxfl0bxBEVEkh0mHOH/LxFhRTh0Pl7EgRJse6fvau32MjO9fjYYaAA0M0yIh/VJZmx/ZtwU48U9XxAZLBqS0SwmvF5+6860iHZ8/fsTUXbpKZ9phke7B9BUOxVhRAGIBrl4mkdymyVUhYfZAWQUo4q4bgE7vaxnX4hNPsAjyYmkBdQQGKBIC3IPnppkFmL7XEqw1d0UDTHj7YjVxQRWmcqKVEN2Wzxuc87PILA6DWY8+twXddknry0hUePAccOwpFGNSIwOvzY29SNtnUaix7tS1JsKEII/t58jIjgAKdVtBc1r1msN4RrB92yThQt60Sx9flBXPvZcv7df4pmtSIJDjC6LXDyxJJx/Ww/1kCHdQkXNklg5nr3yVxMWBCdU+L46a7utHCYVqfEh9lGPANb1WT2JuWi2LyWqjO8s11j2MIyW4kODcR6y2cua8mFTRN4f95OburRgFsdRlJ9m9cg3jI9b1Ijgh3Hz5AYqT5766ccFmT06C46PDWJ7IIibuhWn5ETllM/PszmkhkTFujmWTSqSzJTVu6nVV37s027szv93pyPWcLg1rV5/Zp29H9rAcct3iFNa7qrj+Itvw2Dg3/4ZW1r2zygxl3SnHxTEZOX7LUdf2xQc6f64UFGsi0COCokgB/u6M6bf223uX86dt8Gg+C1a5xHsnf3VYLVMexEcIDRbbZYkhhomxRNnehQ/tx0lDyTmcIi5x9oUICBApMZIQQd6seycHua0+DE2g5PePOWiQwJ5PMbU2lSI5ILX59nK3OlZ+ME3vp7O/XiQjlwMpd2SdFMv+cC3vlnO+/8s4MVT1xEzagQtxXSTWtGsvm5gYRZRuNSSvo2r8EFjRMoLDLbBETNqBBmrPO8dqh5rUhb7Kn48CDb7+nzG1NpmxRDTFig03/Kyn9PD2CdQxiWkuwLZaVYQSClNAshHpVS/gis80sLKpHj2UXMDVejBCHMOP7M255oyAZzI4ITFtAgIZT6hjhW7e1Edn4NJj06nJ6rV1CERJqiKEhXhitTkSQsKICEiCBOnHF2lbN2RgCTb+rM2gOneGBAU1vZ/4a0ol/zGtz/vX0FsOPIdoBlJD3pplRbmIV+zWvY/KMbJIS7+SS7LiKzrlINCTTy1vD2fLpwF209TGU3/W8grZ51j5zqer1Ao+CWng2IDvU8MrXqgDvVj3Mq/3PshTR/+k9u6pHC05e1pNETszyeD/YR0MBWdkEVGmSkcY1Idr442G1xjePn/PP/9cBsto8qre9hQQEEGN27tKHt69KzcYJNPxtoNDDzvgvIyC6kS4M4mj71h1P9l69qQ99miXROsT9fSkI4t17QgM8W7UEiaVwjgocGNKWdpbNrUjOS54a24pnpm2hZO4rNR06rWaQF66K+D67tyO/r7YvVAlye06o6sdKlQZzNB75j/Vha1I7i7RHtuPKjpew8foYjmb55bQWVtBCqGEnw4x3d6dIgjvQz+QQFGLiifR3bauC2SdHkFBQx7c7uNvfiD6/twLHTeR47QE+4CoKEiGDbwr+LWjgPZGpHu4do6Zgcw8b/DeS//Rnc8PlKru+mZrf39WvCtV2TbbNWT7+NMAeVjBCC3ha1pdFgdLKZ9WmWyGVta3Nlh7q0rhvNmXwTW46cpkXtKJt3WmiQkYjgAE7lFNIxOZZYB7vCx9d15C6HtRWx4UG2FeUA13UrPl92WfFlnvGPEOJh4AfA1tNIKb0HRakCnMwu4O09s8Eyk2tgyud4oPohtM3LZ6O5IZjViCwuIpADx9SXYc6rR0JorEdvEuvS/al39qCvQ3CsWff1cvoR921eg74u6qAbLdPNCA8jGUfaJcUAapo8qosaOT8ysBnXdEqy+VrXjQnl0KlcpxEjQFiwvQ0pCeG8fJWzbeKT6zsSGxbkdfoZ6jIa2fHiYECNkN4c1o6HpjqPFVyX8VsJCTSy9flBBBkNbm10JTw4gCXj+pEYEewWsqGkFZaeRoWgZgS5lvg64UFG+jSrwXVdk+lhmdZb+6Wk2FBa1bELyhqRwW6Gvotb1cIVg0XgWGdr917UxOn4Dd3q07tpIvXjwzl+Oo8aDrrt1U/2t/nWP35Jc9tMyvo53XdRE+5yUBVZZyVCCH7+vx5c9dFSoizPHRkSyGvXtOWqj5bSvp5vnlRWQeBNTREfHsTutGzbvcAeVsJWJyKY90aptKHDU+uxdNcJXr2mrZPdxto+b9+RJ0JcZrgLH+3jZoO4plMS09Yc5LK2dQgwGLjbYYWzEIKI4AB6NUlk9VP9bepNg0E4tS0lvuwm0KiQQD641q5aqgk2JwKDUCuYQ4OMfHNrV/7YeNRJCIBdDeWIVTX0wbUdfDJGlwVfBIE1gL2jGkcC3l0xqgD7MzI4nmDvuF4/foIL6ysd9BdHjtFENsdwJorgGrMZ0+ly7vjPrtd31ZN+eG1H7v7uX9uPqUFCOH/c34tL3lWJ31vW8d1jI7IEHWB8RDA/3tGdVnWibO1wnU7/cncPj0bQiBKuPah18S6GoV6m5kIIru6URFCAgc1HTtuW4NcvxrPDUTCOu6Q5PRp5X8Nh7ZRu7JHC7+sP07dZ8TYVb1i/tpBAI7WiQxjcphb39mvipLYCaFwjkteubsvFrZxHmSuf7O/jjdSbt5D5QghbrB5HIQBqBGjtHO5w6PCtM4JAg3ASyANa1mDKyv2YpaRjcizvjmxPn6b2z6djciy7XnKfOXkjLCiA54e2oo+Xz/iDazsyY+1hOtSLYd7DfcjONzkJAVeiwwKZfHMXr8d94bWr2zJl1X43Q2mYB8Ppq1e3ZfyQVhgNgkvb1ubu7zxf05uqFqBhYgQrn7yILi/OKdYZo7RYfw+hgUZSEsLdZnWgvn/HvgPcVVP+oMQrSykblFSnKnIs274eoVl+AbEORq3ZRd0AMOfX4edBS2lSM5JL225y0tFa+e72rnRvGM+7I9s7GRBb1I7io+s6elwSXxx1YjxHHXWkS4M4j+U/3tGd9DMqdo7r6Au8d+S+UlJncnm7Olzerg739G1M+pkCAnyc8nszhrrSsk4Um54b5FNdTzw0oClPT99EVGgAgUYDH13XyWtdRztFabGmFZXe12OWGqsdyXUE3L5eLELYXWSHtnd3TSxtbJobuqd4PVYzKoTbLffy5v1S3gzvXM/n78NoEE4Dnv8NaUWNyGB6ldIDrUZkSLm7Oz9/RWve+mtbiaqwFrWjeP2attR2cMv2pxAAH0NMCCFaAy0BW+8ipfQWQ6hKcDzHrtkKdPnD/pryNOxQBlvryO2pS1vy/coDNpXCE4Ob896cnfRopNQJnv6Ag9uUfhHPgwOakZVnYmQZRiLeBERwgIF8i4HOV94Z0d7nwFmuhAcH+M274Wy4oXtKsZ1ceWHtd8szrIHRkh3PNXxHXHgQe16umPUZVRGryvVc4IZu9bnBRx3/sNSyD0TKQon/ViHEs0AflCCYhQoWtxjvweTOedLP5PPiH6sJtPTdgZZ/7JvBjYncu4R6Y9rzz2sLqBMdYtOZGg2CRY/1tSUQGXNhI8Zc6NtI1soH13awxbD3RmiQkVeKWYRTFv55sDe7PQS3Kg5vi140JSNsgqD8JEG9ODU6rO3DjFGjKS2+DNuuAdoB/0kpbxZC1AS+KeGcc5oP5u3EJM5YQ/0QKGG/OZGLh/0IeZmcseT4dR2VJ0QEF6tbLInL2npPIu9P6sWFlbgSU1N+2FRD5TgjuLJDXWLDgmzeKhpNeeKLIMi1uJGahBBRwHGcQ0NUOYwCQutMte1nRbdiSs3HeMwYCOEJRADbX7iEQA9uZBpNSdx6QQO2H8vihu7l5+onhHDzNNNoygtfBMFqIUQMavXvGlTQuWX+bJS/MQlnNclVrS5nZFvn5f0l+lNXI366q7vbwiCNd2LDg5hQilAaGk1l44vXkDX0wydCiD+BKCll+UTqqiRyHUIazd93kLgRwyqxNec+rgvCNBrN+YUvxuKvgYXAIinl1pLqVwXOFNmXkMebzRBUMW5wGo1Gcy7ii/5jElAbeF8IsVsI8ZMQosSgc+cyxwu3OBf4IfWbRqPRVBV8UQ3NE0IsBDoDfYE7gVaoxPNVkv25xedJ1Wg0muqEL6qhOaj8A8uARUBnKeVxfzfMnxRagqcOP51VQk2NRqM5//FFNbQeKABaA22B1kIIn3IbCiEGCSG2CSF2CiHGeTieLISYJ4T4TwixXggxuFStLyNFsoBbTmXydHpGyZU1Go3mPKdEQSClfEBKeSFwFZAOTAZOlXSeEMIIfIhaidwSGCWEcM3u8hTwo5SyAzAS+KhUrS8DZmnGjImQ8lzto9FoNFUYX1RD96ByFHcC9qKMx4uKO8dCF2CnlHK35TrfA0OBzQ51JGAN/RgNeM7qUI7kFym1UJBVEDQZ6O9bajQazTmNLwvKQoC3gDVSSt8zV0Nd4IDD/kGgq0ud8cBfQoh7UXYIj3F+hRBjgDEAyclnFxa2oEhFAw22Tgiu+/GsrqfRaDRVHV9UQ28AgcANAEKIREsC+/JgFPCFlDIJGAx8bUmP6dqGCVLKVCllamLi2cVasc4IgqXnXKoajUZT3ShREFiijz4GPG4pCsS3oHOHcI5JlGQpc+RW4EcAKeUy1Oyj5OzPZ0G+ySoI/HkXjUajqTr44jV0JTAES5pKKeVhILLYMxSrgCZCiAZCiCCUMXiGS539wEUAQogWKEGQhh/JLlS5W4OkhKs+8+etNBqNpkrgiyAokCqwugQQQvgUj8FiT7gHmA1sQXkHbRJCPCeEGGKp9hBwuxBiHTAFuEmWZxB3D2xO3w5AlNkMMeWXhk6j0WiqKr4Yi38UQnwKxAghbgduQUUiLREp5SxUMhvHsmcctjcDPX1v7tmz5cQWhJR0yc2DyNJnENNoNJrzjWIFgVC5DX8AmgOngWbAM1LKvyugbX7hTGEOEWapHjy6SqdV0Gg0mnKhWEEgpZRCiFlSyjZAle38HTlTkEuoNJMTVocwg845oNFoNL70hP8KITr7vSUVRE5hDmFmybGGV1V2UzQajeacwBcbQVfgOiHEPpTnkEBNFso3w3oFkVuYTaiUGAPLnntYo9Fozid8EQTnVQyGPFMOkdJMQJBPcfM0Go3mvMeXfAT7KqIhFUWeKYcaZqkFgUaj0ViodtbSgoJ0IsxmAoJCKrspGo1Gc05Q7QRBlimDxKIigizJaTQajaa645MgEELUF0L0t2yHCiF8CTFxzpFTmEOOwUBCURHBuccquzkajUZzTuBL0LnbgWnAp5aiJOBXP7bJb2TmZwIQW2TG2OySSm6NRqPRnBv4MiO4GxUG4jSAlHIHUMOfjfIXheZCAE7IeAwp3Su5NRqNRnNu4IsgyJdSFlh3hBABWALQVTWsgsBMYCW3RKPRaM4dfBEEC4QQTwChQogBwFTgN/82yz+YzCrBmhm9mEyj0Wis+CIIxqFyBGwA7kBFE33Kl4sLIQYJIbYJIXYKIcZ5qTNcCLFZCLFJCPGdrw0vC6bsEwBkGuL9eRuNRqOpUviyoMyMCjtdqiwuQggj8CEwAJWveJUQYoYl9LS1ThNU5rOeUsoMIYRfbQ+FFmPx8YAkf95Go9FoqhQlCgIhxAbcbQKZwGrgBSllupdTuwA7pZS7Ldf5HhgKbHaoczvwoZQyA0BKebx0zS8dJku+4gAR5M/baDQaTZXCl1hDfwBFgFVtMxIIA44CXwCXezmvLnDAYf8gKoCdI00BhBBLACMwXkr5py8NLwuFlnzFgQFaEGg0Go0VXwRBfyllR4f9DUKIf6WUHYUQ15fD/ZsAfVDrExYKIdpIKU85VhJCjAHGACQnlz29pKlIOT8FGLUg0Gg0Giu+GIuNQogu1h1LbgKjZddUzHmHAMcUYEmWMkcOAjOklIVSyj3AdpRgcEJKOUFKmSqlTE1MTPShyZ6xCoIwHWdIo9FobPgiCG4DPhdC7BFC7AU+RyWcDwdeLua8VUATIUQDIUQQSqU0w6XOr6jZAEKIBJSqaHdpHqA0FBblARCqI49qNBqNDV+8hlYBbYQQ0Zb9TIfDPxZznkkIcQ8wGzWDmCSl3CSEeA5YLaWcYTl2sRBiM8oO8UgxxuezJrdA2QjCQ7Qg0Gg0Giu+2AgQQlwKtAJCVD57kFI+V9J5UspZqHUHjmXPOGxL4EHLy+9k5+cCEBasBYFGo9FY8SXo3CfACOBeVJrKYUB9P7fLL+SbVIiJkEBtI9BoNBorvtgIekgpRwMZUsr/Ad2xuH1WNQot6wiCArQg0Gg0Giu+CII8y3uOEKIOUAjU9l+T/EeBxWsoSCeu12g0Ghu+2Ah+E0LEAK8D/6JWGZcq3MS5QqFFNRQUqG0EGo1GY6VYQSCEMABzLAu8fhJC/A6EuHgOVRkKi5QgCNbrCDQajcZGsaohS8C5Dx3286uqEAAoMCvVUEhQWCW3RKPRaM4dfLERzBFCXC2sfqNVGFORWggdpL2GNBqNxoYvguAOVDKaAiHEaSFElhDitJ/b5RdMspAAKQkM0sZijUajseLLyuLIimhIRWAqKiRQSgK1jUCj0Whs+LKgTAghrhdCPG3Zr+cYhK4qYZImAiQEaEGg0Wg0NnxRDX2EWkR2rWX/DA4G5KqEyVxAIJIgHWJCo9FobPiyjqCrJffAfwCWlJJVMqC/yWzCKCEkyKcQSxqNRlMt8GVGUGjJPywBhBCJgNmvrfIThRZBEBWiBYFGo9FY8UUQvAf8AtQQQrwILAZe8mur/ITJbMIInAeesBqNRlNulCgIpJTfAo+iktAcAa6QUk715eJCiEFCiG1CiJ1CiHHF1LtaCCGFEKm+NrwsKNWQFgIajUbjSIk6EiHEe8D3UspSGYgt6qQPgQGolJSrhBAzpJSbXepFAvcDK0pz/bJQJIsI0LMBjUajccIX1dAa4CkhxC4hxBulGLV3AXZKKXdLKQuA74GhHuo9D7yKPcqp3yjCjBEtCDQajcYRX1RDX0opBwOdgW3Aq0KIHT5cuy5wwGH/oKXMhhCiI1BPSjnT9yaXHSnMGLRqSKPRaJzwZUZgpTHQHJWdbOvZ3tgS2fQt4CEf6o4RQqwWQqxOS0sr8z31jECj0Wjc8WVl8WuWGcBzwEYgVUp5uQ/XPgTUc9hPspRZiQRaA/OFEHuBbsAMT6onKeUEKWWqlDI1MTHRh1t7pgipBYFGo9G44ItD/S6gu5TyRCmvvQpoIoRogBIAI7GvTsYSzjrBui+EmA88LKVcXcr7+EyRkASYjf66vEaj0VRJfAk696kQItYSXyjEoXxhCeeZhBD3ALMBIzBJSrlJCPEcsFpKOeMs215q9IxAo9Fo3PHFffQ2lHtnErAWpcJZBvQr6Vwp5SxglkvZM17q9imxtWdJEWDQgkCj0Wic8MVYfD/KY2iflLIv0AE45c9G+YsiITGWyj6u0Wg05z++9Ip5Uso8ACFEsJRyK9DMv83yD0WgBYFGo9G44Iux+KAQIgb4FfhbCJEB7PNno/xFkZAYtCDQaDQaJ3wxFl9p2RwvhJgHRAN/+rVVfsIkIEALAo1Go3GiVPGYpZQL/NWQiqAIMArtPqrRVCUKCws5ePAgeXl+j0JzXhASEkJSUhKBgYE+n1OtAvObBFo1pNFUMQ4ePEhkZCQpKSk6hHwJSClJT0/n4MGDNGjQwOfzqlWvWCS0sVijqWrk5eURHx+vhYAPCCGIj48v9eyp2vSKUkpMaNWQRlMV0ULAd8ryWVUbQVAki5BCEIAWBBqNRuNItRIEAAY9I9BoNBonqo8gMCtBILQg0Gg0lcSff/5Js2bNaNy4Ma+88kqp6/l6fmmpRoLADIBKg6DRaDQVS1FREXfffTd//PEHmzdvZsqUKWzevNnner6eXxaqTa9YYNIzAo1GU3b+/PNP2rdvT/v27enatStmy+DSV1auXEnjxo1p2LAhQUFBjBw5kunTp/tcz9fzy0K1WUdgLjIBIAxaEGg0VZX//baJzYdPl+s1W9aJ4tnLW5VY795772XhwoXUrl3b7VivXr3IyspyK3/jjTfo378/AIcOHaJePXuurqSkJFasWOF2jrd6vp5fFvwqCIQQg4B3UfkIJkopX3E5/iBwG2AC0oBbpJR+iWNkKsq3bFWbSZBGoylHBg8eTNu2bbnuuut45513nI4tWrSochpVTvhNEAilg/kQGIBKXL9KCDFDSumo1PoPlfoyRwhxF/AaMMIf7TEXFVrapWcEGk1VxZeRuz9YunQpUkqOHDlCQIB7t+nLjKBu3bocOHDAduzgwYPUrVvX7Rxv9Xw9vyz4c0bQBdgppdwNIIT4HhgK2ASBlHKeQ/3lwPX+aozJZFENaWOxRqMpJVOnTqVp06YEBAQgpSQrK4uoqCjbcV9mBJ07d2bHjh3s2bOHunXr8v333/Pdd9/5XK9Zs2Y+nV8W/Nkr1gUOOOwftJR541bgD08HhBBjhBCrhRCr09LSytQYsynfci09I9BoNKVj1KhRfPrpp7Rt25Zu3bqxY8eOUl8jICCADz74gIEDB9KiRQuGDx9Oq1b2Gc7gwYM5fPiw13olnX82nBPGYiHE9UAq0NvTcSnlBGACQGpqqizLPUxFBepeBj0j0Gg0paNLly5s2LDhrK8zePBgBg8e7PHYrFmzSqxX3Plngz8FwSGgnsN+kqXMCSFEf+BJoLeUMt/1eHkhLV5D6BATGo1G44Q/h8ergCZCiAZCiCBgJDDDsYIQogPwKTBESnncj22hyGydEZwTkyCNRqM5Z/CbIJBSmoB7gNnAFuBHKeUmIcRzQoghlmqvAxHAVCHEWiHEDC+XO2vMNmOxnhFoNBqNI34dHkspZwGzXMqecdju78/7O2I2a/dRjUaj8US1sZwWmZQgQK8s1mg0GieqjSAwm5VqSIeh1mg0GmeqjSAosq4s1jMCjUajcaLaCAJtI9BoNBrPVBtBYF1HIIR2H9VoNJWDr4llbrnlFmrUqEHr1q3LdH5pqTaCwKxVQxqNphIpTWKZm266iT///LPM55eWaiMIiiyqIYNeUKbRaMpARSWmAbjwwguJi4sr8/mlpdr0itJsTUxTbR5Zozn/+GMcHD37mD9O1GoDl5SsZqmoxDTeqLKJac4lirSxWKPRnAU6Mc35QJHKWaxVQxpNFcaHkbs/qMjENN6oqolpzimKtGpIo9GUkYpMTOOv84uj2hiLT9fqDIAprFYlt0Sj0VQ1KjIxjfV+3bt3Z9u2bSQlJfH555+f/4lpKoIiy/oBYQys5JZoNJqqRkUnppkyZUqpzz8b/DojEEIMEkJsE0LsFEKM83A8WAjxg+X4CiFEir/aUiRVYjOjzlms0Wg0TvitVxTKPedD4BKgJTBKCNHSpdqtQIaUsjHwNvCqv9pj9fk1CuGvW2g0Gk2VxJ/D4y7ATinlbillAfA9MNSlzlDgS8v2NOAiIfzTUxdJJQh09FGNRqNxxp+CoC5wwGH/oKXMYx1LRrNMIN4fjbHOCAx6QqDRaDROVAmFuRBijBBitRBidVpaWpmuYbbaCHSsIY1Go3HCn4LgEFDPYT/JUuaxjlBhQaOBdNcLSSknSClTpZSpiYmJZWqMyaYa0lMCjUajccSfgmAV0EQI0UAIEQSMBFyT088AbrRsXwPMldIydC9nzBZBYDRUiUmQRqPRVBh+W0cgpTQJIe4BZgNGYJKUcpMQ4jlgtZRyBvA58LUQYidwEiUs/IJZWkJMaPdRjUajccKvvaKUcpaUsqmUspGU8kVL2TMWIYCUMk9KOUxK2VhK2UVKudtfbbFGjNXrCDQaTWXha2IZb/W8Jaw5W6pNr1ikZwQajaYS8TWxTHH1PCWsKQ+qTa9o9xqqNo+s0WjKkYpKTFNcPU8Ja8qD6hNrSHsNaTRVnldXvsrWk1vL9ZrN45rzWJfHSqxXUYlp/JmAxhvVRhBYvYYC9IxAo9GUAZ2Y5jwgJT4MdkN8REhlN0Wj0ZQRX0bu/qAiE9P4MwGNN6qNIIiLUOGno0KCKrklGo2mqlGRiWn8mYDGG9VGT2JdpybQNgKNRlM6KjIxTXH1PCWsKQ+qzYxAYhEE2lis0WhKSUUnpvFWz1vCmrOl2swIrMZiQ/V5ZI1Go/GJatMrtklow8u9XqZGeI3KbopGo9GcU1Qb1VCdiDrUiahT2c3QaDSac45qMyPQaDRVFz8FJT4vKctnpQWBRqM5pwkJCSE9PV0LAx+QUpKenk5ISOnWS1Ub1ZBGo6maJCUlcfDgQcqanbC6ERISQlJSUqnO0YJAo9Gc0wQGBtKgQYPKbsZ5jVYNaTQaTTVHCwKNRqOp5mhBoNFoNNUcUdUs8UKINGBfGU9PAE6UY3OqAvqZqwf6masHZ/PM9aWUiZ4OVDlBcDYIIVZLKVMrux0ViX7m6oF+5uqBv55Zq4Y0Go2mmqMFgUaj0VRzqpsgmFDZDagE9DNXD/QzVw/88szVykag0Wg0Gneq24xAo9FoNC5UG0EghBgkhNgmhNgphBhX2e0pL4QQ9YQQ84QQm4UQm4QQ91vK44QQfwshdljeYy3lQgjxnuVzWC+E6Fi5T1A2hBBGIcR/QojfLfsNhBArLM/1gxAiyFIebNnfaTmeUqkNPwuEEDFCiGlCiK1CiC1CiO7n8/cshHjA8pveKISYIoQIOR+/ZyHEJCHEcSHERoeyUn+vQogbLfV3CCFuLE0bqoUgEEIYgQ+BS4CWwCghRMvKbVW5YQIeklK2BLoBd1uebRwwR0rZBJhj2Qf1GTSxvMYAH1d8k8uF+4EtDvuvAm9LKRsDGcCtlvJbgQxL+duWelWVd4E/pZTNgXao5z8vv2chRF3gPiBVStkaMAIjOT+/5y+AQS5lpfpehRBxwLNAV6AL8KxVePiElPK8fwHdgdkO+48Dj1d2u/z0rNOBAcA2oLalrDawzbL9KTDKob6tXlV5AUmWP0c/4HdAoBbZBLh+38BsoLtlO8BST1T2M5ThmaOBPa5tP1+/Z6AucACIs3xvvwMDz9fvGUgBNpb1ewVGAZ86lDvVK+lVLWYE2H9UVg5ays4rLNPhDsAKoKaU8ojl0FGgpmX7fPgs3gEeBcyW/XjglJTSZNl3fCbb81qOZ1rqVzUaAGnAZItKbKIQIpzz9HuWUh4C3gD2A0dQ39sazv/v2Uppv9ez+r6riyA47xFCRAA/AWOllKcdj0k1RDgv3MOEEJcBx6WUayq7LRVMANAR+FhK2QHIxq4uAM677zkWGIoSgHWAcNzVJ9WCivheq4sgOATUc9hPspSdFwghAlFC4Fsp5c+W4mNCiNqW47WB45byqv5Z9ASGCCH2At+j1EPvAjFCCGt+Dcdnsj2v5Xg0kF6RDS4nDgIHpZQrLPvTUILhfP2e+wN7pJRpUspC4GfUd3++f89WSvu9ntX3XV0EwSqgicXjIAhldJpRyW0qF4QQAvgc2CKlfMvh0AzA6jlwI8p2YC0fbfE+6AZkOkxBz3mklI9LKZOklCmo73GulPI6YB5wjaWa6/NaP4drLPWr3KhZSnkUOCCEaGYpugjYzHn6PaNUQt2EEGGW37j1ec/r79mB0n6vs4GLhRCxltnUxZYy36hsI0kFGmMGA9uBXcCTld2ecnyuC1DTxvXAWstrMEo/OgfYAfwDxFnqC5QH1S5gA8oro9Kfo4zP3gf43bLdEFgJ7ASmAsGW8hDL/k7L8YaV3e6zeN72wGrLd/0rEHs+f8/A/4CtwEbgayD4fPyegSkoO0ghauZ3a1m+V+AWy/PvBG4uTRv0ymKNRqOp5lQX1ZBGo9FovKAFgUaj0VRztCDQaDSaao4WBBqNRlPN0YJAo9FoqjlaEGg0pUAIMVYIEVbZ7dBoyhPtPqrRlALLiuZUKeWJym6LRlNe6BmBRuMFIUS4EGKmEGKdJSb+s6i4N/OEEPMsdS4WQiwTQvwrhJhqifmEEGKvEOI1IcQGIcRKIURjS/kwy7XWCSEWVt7TaTR2tCDQaLwzCDgspWwnVUz8d4DDQF8pZV8hRALwFNBfStkRter3QYfzM6WUbYAPLOcCPAMMlFK2A4ZUzGNoNMWjBYFG450NwAAhxKtCiF5SykyX491QiY6WCCHWomLC1Hc4PsXhvbtlewnwhRDidlSyFY2m0gkouYpGUz2RUm63pAIcDLwghJjjUkUAf0spR3m7hOu2lPJOIURX4FJgjRCik5SyKkfJ1JwH6BmBRuMFIUQdIEdK+Q3wOirscxYQaamyHOjpoP8PF0I0dbjECIf3ZZY6jaSUK6SUz6ASzTiGDtZoKgU9I9BovNMGeF0IYUZFhrwLpeL5Uwhx2GInuAmYIoQItpzzFCrKLUCsEGI9kI9KJYjlek1Qs4k5wLqKeRSNxjvafVSj8QPazVRTldCqIY1Go6nm6BmBRqPRVHP0jECj0WiqOVoQaDQaTTVHCwKNRqOp5mhBoNFoNNUcLQg0Go2mmqMFgUaj0VRztCDQaDSaak6VCzGRkJAgU1JSKrsZGo1GU6VYs2bNCSlloqdjVU4QpKSksHr16spuhkaj0VQphBD7vB3TqiGNRqOp5mhBoNFoNNUcLQg0Go2mmqMFgUaj0VRztCDQaDSaao5fBYEQYpAQYpsQYqcQYpyH48lCiHlCiP+EEOuFEIP92R6NRqPRuOM3QSCEMAIfApcALYFRQoiWLtWeAn6UUnYARgIf+as9Go1GU2YOr4U1X7qXm81QmFe+90rfBSf3lO81S8CfM4IuwE4p5W4pZQHwPTDUpY4Eoizb0cBhP7ZHo9FoYPJgWPeD52NFJjAVqG0pYdIg2DwdJvSG3+6Doxud6//zLLxYE4oKS9+Oghz1fmAV5J22l7/fEd5rD6b80l+zjPhTENQFDjjsH7SUOTIeuF4IcRCYBdzrx/ZoNJrqzL6lUJgL+5bAL2M815k8CF5IVCPygjOwfxn8ONp+/JOe9u2Tu2Hpe2q74Iz3+5rywVwEMx+CRW9B5kH4+AJ4qTasnQKf94cpI+HQGlj5mf28F2rArnmQnQ7vd4LjW8v+7CVQ2SuLRwFfSCnfFEJ0B74WQrSWUpodKwkhxgBjAJKTkyuhmRqN5pzg4GpIbAbBkWrEvuQdaDMMopPsdUwFYDCqTv/oBqjfHU7shMmXOF8r5yR80ksd7/c0fHMVpO9Ux95rD/+3wnMb3m4NQsCp/faytO2w/U9o1A+Ob1ZtzMuElkNVh95mOGz4UdWd8z/7eX8/rd73LYHP+rnf6+sr1POl74TFb8FVE0rxYfmO33IWWzr28VLKgZb9xwGklC871NkEDJJSHrDs7wa6SSmPe7tuamqq1CEmNJpqSH4WvJwEjQfA9dOULv39jurY6BmwdzH0fgyej4fG/eHIesg+Do/ugQ3T4I9HnK+X0AxObKv45ygttdvDkbVqe8x8qNOhTJcRQqyRUqZ6OubPGcEqoIkQogFwCGUMvtalzn7gIuALIUQLIARI82ObNBrNucTRjRBREyI8xEIrzIPAEGWQzToCxyz6+b2L1bvZZK/71RD1ntxNve/8x35s0iDPHX5VEAJgFwIAm2eUWRAUh98EgZTSJIS4B5gNGIFJUspNQojngNVSyhnAQ8BnQogHUIbjm6S/pigajabsFBUCAoxl7DKkVLrywBC1bzbDojdg3osQUQse3ma/j5RwfBNM6APXToXvhjlfy5SrdOkHPKhuvrnKvexsO/yUXrB30dldoySGf6XsBdv/KL5eZG2/3N6v6wiklLOklE2llI2klC9ayp6xCAGklJullD2llO2klO2llH/5sz0ajcaBPQvtHjIl8VId+OJS78ezjsL22UoX74jZrHT1S99T3jWH/oXvRsBv9yohAHDmKJxJU140n1+sjLXrp6pjqz7DI7Mehg1TfWt7cQz/yr2s51j7dt1OcONv8MSRs7tPdDJc+KhzWUIz+3ZAKAz9QG1f9Kz36whxdu3wQmUbizUaTXljLlJqk4Bg73VOHYAvL1fbjx+C4Ijir1lUAAeWeyi3qGc+7gk5JyzXOwjTboXWV8OuObDewVXzs76erz95kN1QC7D8Q/WeebD4dpXEkPdhhhdnxCeOQFAY3D7P3q5+T0Grq5QRGiC5u+p8g8IgvIayOThyy18w6WK4coI69tdTnu81dr26zsLX7GVdxyhPIlAzpfAEePIoBIQog7IhEALDID/Tfk6SRxX/WaMFgUZTVXFVtxTmKh/5nBPKo2V8pjruSSDkOXQuX18Btzno1AtzYcdfEBwF+5c7d9BSWl5myDoM77SBqCS7EABl0AXYMdv3Z0nf6bn8+Gbfr+GJ6Hqey0d8qzp3gJj69vKeY8EYCNdMggWvQRcHN9M7FkLeKUhoCs/FKcGQ3BWeSoOAIPu1AoJh1edw+jAc2wDC6Hkkn9DMrnay2jsCQ9X7PashKAIiaigX1rqp6hrFCfezQAsCjeZcZc8iqN9DuUK6Yjarkfavd8I9ayChseq0D/9rr3N8K3zUVW2Pma86dkOA8n+3djgAB1fB+Gg1M9j+J/x0q/c2ZR6ADzpDvS5KtQRw+ixH7b5w0TMw57nSn2dw6eJSb4HVk6Ag214WHg+P7IZT+5QQADWbaX2187lRtdUL4K5lqpMGuxAAaGkxWjcdqN7TtkFItMO9LLOKfk9D/Z7KuL13ker0HUloYt9OucD35y0jWhBoNBXFyd2qY4pxWAuzZ5HqEAwu5rol7ykf80GvQLe7YNOv8N83ym0S1CrX/75W2zv+Up4lrh24o+fMhD4lt2/nP8ULAVAzALALgYqidjv7dlwjOLlLbXe8Uc0aImvBlZ/CrrnKE2nPAjWSRqpO++Puqv7FL0B4IrS60vn64fHq5Ss1XaPleCGxmfP+XUshO81+fp/HoWEfJVgrES0INBp/sulXmHqjsx56vEUts3OO8nIZ8Dz0vE+VzXwIVk20n//ft2p0OPVGtf/JBcpX3ioEAGY/7vnepfV0mX5P6ep7YtQPalay4FX3Y3U7qdWznrj3X6UeOroB5j7vfKxGS6h/AbS+BppfCi2vUHV/ugX6PgmRNe11W1yuXvmnlSAIi1edbmJzyDwEQeHQ94mzf86yEpHo7CprMFbIiL8k/LagzF/oBWWac449C6FeV+XS2GSA8yhwfLR7/afTlRvm+qnw822qbPhXahWqp/r+pNNNsOaLkuuFxkJuRvF1HI3OEwfAwZVq+7qfYNssJcDebKo69pHfwc+3K7UU2IVj1jH48QYwBtkF2bOnSu8tYypQQqe+ZSZgLlK2jbK6v54HVNaCMo3m/GDeyyAM0Ocx92OL34Z/xquVrDv/UQbS4V8p1U4PL94qX1+hXBL/cXAT/HG0u7qitCQ0Vd5Aplzfz2k70l0Q3DZHGZsXvqH8+UHp6M8ch6Xv2+PqdL9Hdbb7l6n9oHD7NTqOVoLgplmQ0hOa9Ffl4x2M1Lf+rTr7lF72ssiacKvFi3zNl+p4WVwmA4LsQgA821k0NvSMQHP+c3gtpG2FdiM9H189CZJ7wPKPoEYLpZO3YspXsWLAuRMDNXp9s2nZ2tT3SbsffXkw4ltocRns+Ef57AsBu+e714uupwy+AEldYMTX8KaLHvvhHcoQaipQPv0BIcqt0dohmwpg4evQ4x44/B98NVTp7e/71/k61pXBmnMCPSPQVG8m9FbvjoKgMFfFoqnRHH5/wLl+3mmo1RpWT3YWCvNfhV4PKfXCsc3w5WVlb1NphED762HtN/b92AZw00x422JwvPE3+6i6SX/1mvmwZ0FQo4UaceedVs9e6GH2YB3ZBwTB4DegwYXOo/KAIOj3pNpO6aUMnp1vd7+OFgJVBi0INOc3J3Y472/6VblO7l5gX7TkyvyX7NuO3iHzX1Kvy96B38eWc0M9kHorNB2kVByOguD2uRAWpwKtZaepjtqVTjfBsU1qxH/mGPx8BzTsDd3+D6LqqBeo0b4rAQ6upV08dPCOGIzQxy35oKaKoVVDmvObD7tB2ha1/fQJeD5BbTe7FLbNLPn8+CaQvsP78R73qcVAy8uYXK9eNzUCD4tzD5nwfyvUqB3UyN0Q6B9jp6lA2QQ+6KT2XVVgmvOC4lRDOnm95tzHXKRejvsLXoPcU2p/y+8wxTWwrQXHBUWvN7Zvl+QBYyV9h3Jb9EavB2HQy/DEYRj1vb38xt/t21a1zQCHBVG3zVGG1BtnwA0/K/WKFetCJsewD4Gh/vN4CQhSC9Ie3QN3+Dm4muacRKuGNOc+H3ZVI+IHNykvFWsCj3kvwjWTYdrNav+zfson/8BytdS/ZivnRUJ5p+zb+5eqRUpH1pV8/8veUl4ws59QoZBrt1MzgS0zlFslqFF9goPhOL6RfbvZJcr7JbG5im8TEOzuxRLfCB7YrFQ9ic2gyx3OyVYqgrA49dJUO7Qg0Jz7OKpmfn/Q+ZhVCIASEl8Mdj7esI/368Y2gMFvqtC/i950PjZ2A/z5uAoVEBKt9Ou9H1M+7kWF0OYa9XIkup5aT9DvKbuA6PUwdL0LarZW1yiO6LrqBSqGjUZTQWhBoDl3SN+lYr1E1FQLiswmFbDLirnIOUmHLzh6zgSEwiM77EHRopOgXmflSbPoTRUm2BodMiYZRn7rfC2rgdUx0bgjAUF2H3iAp46r5xCiZCGg0VQiWhBozg1M+fa0g6A8YVzj2Tx3lmqLnverXLd3LVOhia2RJYMj4MljSmWz8DUVTdMT1kiWjiqm4vBTpEiNprzxqyAQQgwC3kVlKJsopXzF5fjbgDVAeRhQQ0oZ4882ac5BCnLgJZfMS+Ud1KzXQ0oQgHIJvX2O83Grz/sdCyGqrudrRNRQXj7W62g05wl+8xoSQhiBD4FLgJbAKCGEU8g+KeUDlsxk7YH3gZ/91R7NOcRPt8GmX1RSkwWvwyEf3IENgc77jp3xnUvs29dMVgHeujsEUKvTQYVIsMafL47a7VSCEE8IAbfOhuaDPR/XaKoo/nQf7QLslFLullIWAN8DQ4upPwqY4sf2aCoDKeG3+1UIZYD8LOUvP/UmFZdn3gsqREFxPJWm4tVYufVv6P8/+35ic/t266ugbke4wGJUNgTCrQ7hmDUajRv+FAR1gQMO+wctZW4IIeoDDYC5fmyPpjKY+4IKajb9bktScsviLkOgynIF9ndPjPpBGWGv+NheVq+LGp1f+hbcudizf31oDNTpCMO/rNYRJzUaXzhX/iEjgWlSyiJPB4UQY4AxAMnJyZ6qaCoTcxEgAEsaw/SdSt3T4XpY9Ia93kfdVPA3UIlEfrje+zVHfKsieza5WO1H1VGrgZtdYq/T2SGJypAPVHhjKwYjjJl3tk+m0VQL/CkIDgGOCUOTLGWeGAnc7e1CUsoJwARQISbKq4GacsBshtcaqPyr1vjzVpq56NKtQgBUMnQrSV2g041q1hCdDH0fV5E0W7gEdRv1nfd2dLyhbO3XaDR+VQ2tApoIIRoIIYJQnf0M10pCiOZALLDMj23RlCeO4R4+7qESobsKAVACwhtnjtm3R/9qj3hZpz209xIuQqPR+AW/CQIppQm4B5gNbAF+lFJuEkI8J4QY4lB1JPC9rGrR785nsk+oBCSevpL/vlX+/JmWhOXWgG5nQ1C4PSaQ2aN2UKPR+BG/2giklLOAWS5lz7jsj/dnGzRlYPo9KuxC1lGVHzY6SaUV7Hk/TP8/VeftVip8gi84rtgF5ad/2qIlfMCSAcvqHmouLJdH0Gg0vqOjj2rcsa6cXfYBfN4fJl6kgqZ96xJbx9EQ7EgHFyNw66tVPtvrf1L7tdrYj1kDq1kTkDsGbtNoNBXCueI1pDlXMJvtOWitnPZm43cgOBryLXHsB79hXzcAKpqmENCwryUI250qZlBBtr1OnQ4q0UpydzQaTcWiBYHGmdIGdQM14h/6ESx+C07uUbHzB70Kfz4GbYbb0xwajHDR02q7yQD36+jAbBpNpaAFgQam3QotLodWV0DGntKd2+3/VPiGwBDo+4S93BrOwTHXrUajOSfRgqC6IyVsnKZeTY7AtFt8P7fJxSo7lyeseW9rtT37Nmo0Gr+iBUF1QVpW/RoMykVTGNRo3XFh15eXeT/fkRHfqDj7TQd6r9NyCIROg0YXnV27NRqN39FeQ9UBKeH1RvBCImydqdYBzLhXHXM02B5a43ze5e/Zt6+cAC2GqFAOLS4vXgiAisXfZIASPBqN5pxG/0vPZ6yzgHVTICddZfz63rJq97+vVcpFR0HgSNsRKuzDmAUqUUuTATDiax3KQaM5D9GqofOVEztgyijIPamEgCe+vlK5erpy+XtKCIAK+fDgJr81U6PRVD5aEJyvfJBacp29i2DOc85lnW+3CwGNRlMt0ILgfKQ0YZu2zVTvKb2g+WWQerN/2qTRaM5ZtCA4HynMLf74LX9BUT58ebm97LqpaiGYRqOpdmhBcD5ybGPxx0NjIDTOvv/oHi0ENJpqjBYE5xM/36HCPXw3zPPxGi3h+GbV6Uckwrj9EBylV/9qNNUcLQjOFwqyYf336uWNkd/ChmkQbUkcFxJdMW3TaDTnNFoQVHVMBUoVtG6K5+NXfAxZR6BhH4hrCL0frdDmaTSa0vPX3r9YfmQ5w5oOo0V8C0xmEwEG/3XXfhUEQohBwLuAEZgopXzFQ53hwHhAAuuklDpPYWl4OUkZfh0JDIeHtqowEsERldMujUZTJubun8tDCx4CYOr2qQQaAik0FxIbHMt3l35HUmRSud/Tp5XFQgijEKKOECLZ+vLlHOBD4BKgJTBKCNHSpU4T4HGgp5SyFTC2tA9QLZEStvwOexa6CwGAsHgIidJCQKOpZDLzM9mRsYO/9/3NDbNuYO3xtRSaC/lq01cczT4KwJb0Ldz4x418vflrvt3yLffPu992ftPYpjSNVcmaMvIz+Hzj535pZ4kzAiHEvcCzwDHAbCmWQElhJbsAO6WUuy3X+R4YCmx2qHM78KGUMgNASnm8VK2vjqRtgw+7FF+nto74qdFUBGZpRiAwSzMGYcAszRgNRgqKCnh80eP8te8vp/pPLXmKfaf3AfD66tedjv17/F/b9i9DfqFxbGPbfpsvVVa/J7o8gT/wRTV0P9BMSuklToFX6gIHHPYPAl1d6jQFEEIsQamPxksp/yzlfaoXriuBXRk9Q2X70mg0fkFKya87f+WZpfb06yHGEArMBZilmcsbXk6OKYc5++c4nTe4wWBm7Znlejkb17e4nm+2fENscKyTEACYcukUEkITCDQGlu/DWPBFEBwAMv1yd3X/JkAfIAlYKIRoI6U85VhJCDEGGAOQnFyiVur85OQeFTdo6+/e69w0C1J6VlybNJpqwKm8U+w4tYPY4Fj2nd7H2Plj3erkFeXZtn/b/Ztte0ijISSGJhIfGs+IZiNsgmBEsxFsTt/MhUkXkpmfyeWNLqdlfEviQ+PpXsc9XWvrhNbl/2AO+CIIdgPzhRAzAZtCWkr5VgnnHQLqOewnWcocOQiskFIWAnuEENtRgmGVYyUp5QRgAkBqamop4iecR7zX3nm/292w/EO13WUMNO6vhYBGcxbM3jubpIgkmsc1RyIxCiN7T+/lqulXYZKmYs+9pfUtTNo4iRd6vsBTS54C4N2+79IvuZ9TvXFdxtE4pjFda7sqRxS3tbmtfB6mlPgiCPZbXkGWl6+sApoIIRqgBMBIwNUj6FdgFDBZCJGAUhXtLsU9zn/yTsM/z7qXN7/ULggueU0vCtNofKTIXMS2jG1k5GXQJLYJEYER7M7czcMLHi7VdaYPnU7DmIa2/Qc6PQDAp+s/5UDWAXrWdR+YXdfiurNrvJ8oURBIKf8HIISIsOyf8eXCUkqTEOIeYDZK/z9JSrlJCPEcsFpKOcNy7GIhxGagCHikDLaI85u5z8PqSc5ll70NsSn2fS0ENBonVhxZwe1/3Y5Ecn9H5YWTmZ/J+rT1TkZZX7iqyVU8kvoIheZC/tz7J4sPLSYzP5MG0Q081p80cBLHc44TbAw+6+eoKIQsIVKlEKI18DVgDU5zAhgtpayUIPWpqaly9erVlXHryuH765ztArXawJ2LVbrJ5yxfyXh/mXA0mnObw2cO8+bqNzmafZRnuj/DoTOH+O/4f3yx6YtSX6t2eG2uanIVH65VM+3b29xOjzo9SK3lQ0j3KoAQYo2U0uPD+CIIlgJPSinnWfb7AC9JKXuUczt94rwXBJkH4bexULMlLHnXXp7YAhr1gwsfhjCLAFj+CdTtBPU6V0pTNZrKQEqJEAIpJW2/8u4q3TahLYXmQrac3EKAIYArG1/J1O1TAbi51c1M3jSZcV3GMaTREIzCSFhgGKBcQrMKsogOPr9CsBQnCHyxEYRbhQCAlHK+ECK83FqncWbZR7Dzb/WyUv8CGPkNhMY61+12Z8W2TaOpQKSUNr/89Nx0Jm6YyDdbvgGgZXxLNqdv9nruw6kPc2Mr5wRLuaZcDMLAja1upG5EXW5tc6vHzt4gDOedECgJn7yGhBBPo9RDANejDbpnT1EhpG2FmPpw+jDUaK5WDOd7UPNc/Zm7ENBoqjibTmzCJE0cyz5Gq4RWxAbH8vLKl/l1568EiIBiPXWsQuCyhpdxR9s7iA2JxSiMGITBNrJ3JTQglKe6PWXbr26dfXH4IghuAf4H/GzZX2Qp05wN816ExW/b97veqaKB/veNe92whIprl0bjRzLyMth6cisvrXiJvaf3eq3nSQiMaDaCH7b9AMDT3Z7m4voXExMS46eWVi988RrKAO6rgLZULw662DlWfGLfbjMcNvyoto3BEFAar12NpuLZdnIbW09utblOvtLrFVKiUggwBJBVkEXL+Jbc/vftrE9b73ZubHAsGfkZALRPbE/9qPrc0PIGxi0aR2rNVFKiU6gZVpNeSb24KPkiWiW0IiooqqIf8bzGqyAQQrwjpRwrhPgNFVvICSnlEL+27HzH6KVzv+hZuOABaDtc1XF0E9VoKhCrI8m6tHUEGgNpGtsUAwbyi/I5kn2ERjGNMEszK4+u5Pa/bnc6d9yiccVeu2ZYTUICQvh5yM8EGYPIKczBaDA6uVz+MvQXt/M8rbrVnD3FzQisNoE3KqIh1Y4ALz7G9bqodQFNBlRsezQaC1JK9p7ey5Bf3cd6iaGJpOWmAVAnvA6Hsw+71bko+SI2pW+yRde00q9eP+YemEt4YDj/DPvH6Zg3vb6mYvAqCKSUayyb7aWU7zoeE0LcDyzwZ8POe3JOqveWV8DmX+3lcY0qozWaaoDV7dIszUgpMRqM/LLjF47lHGNP5h62ntxKYmgiK46u8HoNqxAAnIRAp5qduL3N7bSMb0lsiHJs+O/4f8zbP4+xncZyMu8kCaEJbEjbQJxjvmzNOYEv6wj+lVJ2dCn7T0pZKSEuq/w6grVT4FeL22dSF7jtbzDlK8+hU/tUJjGNxkd2ZOwgOSrZ6ypWa6TMPaf3MHnj5DLfZ/LAydQIq0FSZBIrj64kPCCc1gmtOZl3ktiQWAzCp9QmmkqkTOsIhBCjULGBGgghZjgcigROlm8TqwlbZ9qFAMBQS6yggGCIa6BeGk0xWOPeZxVk8dn6z5i8aTJNY5vy0UUf8ceeP1ibtpaXLniJQEMgP+34iT2Ze/hu63elukeT2CZ8N/g7QgJC2Hd6HzmFObSIb2E73q12N9t2fGh8uT2bpvIozkawFDgCJABvOpRnAe6mf03JbPrVeT+xaaU0Q1N1WHt8LW+veZv40Hjm7Z+HGTNtEtqwLm2drc72jO30n9bftt/1O/fIli3jWxIZFMmKI0rts370er7a/BVvrFYmwBtb3shd7e+ioKiAiKAIAg0q7n39qPr+fDzNOYIvqqGGwGEpZZ5lPxSoKaXc6//muVNlVUNbZ8L3DsFXR0/XaqBqjlVnb8VkNmEym9iVuYuRv49kSKMhzNg1w+v5Per0YOnhpSXe54fLfqBlvMoSeyL3BPEh8U73Tc9N1yP7asDZhpj4EXCMK1QETAV0gJvS4BhB9N5/IV4bhasDheZCvtn8DVc3vdrJ9/2h+Q9xNPso3wz+hs0nN/PskmfZlrHN6VxHIRAfEk96Xjr9k/vTu15vwgLC6FuvL4HGQA6fOcyE9RO4ufXN7Dy1ky61uvDX3r/YenIrIQEhNI9rbrtOQqj74kQtBDS+zAjWSinbu5Stk1K282fDvFElZwQbf4ZpN6vt8ER4ZGfltkfjd2bsmsHuU7ttycaTIpJIiU5h8aHFtiQmAJFBkWQVZBV7rb+v+Zta4bX83mbN+c3ZzgjShBBDLPkDEEIMRYWi1viCo5eQ5rwnpzCHiRsm8tmGz5zKD545yMEzBwFsQgAgqyCL1vGt2Zi+kRBjCO9f9D4pUWol7Zi/x1BoLtRCQON3fBEEdwLfCiE+AAQqh/Fov7bqfGHfMljksh4vMLRy2qLxCUe9fX5RPj9s/YFRzUcRaAyk0FzI7lO7mX9gPhFBEbbYN/Wj6jN542RWHl1pu05kUCSv9HqFyRsns+vULlsIhcUjFzPvwDwy8zOJD42nUXQjWsS3ILswG4FwWlj12cXOwkSj8RclqoZsFUuZocxyziDgXVSGsolSyldcjt8EvI49l/EHUsqJxV2zyqiGpIT/xTiXBYTCHQsgsVmlNEnjTFZBFjN2zaBNQhtigmNYf2I9jy96HIDrW1xvC3kM0DupNwsO+r6G8s3eb3JxysWAEi4frP2APkl9aJPYpnwfQqPxkbNKTGO5wKVAKyDEWialfK6Ec4zAdmAAKkn9KmCUlHKzQ52bgFQp5T0lP4binBcE77SBU/s9H7voGej1UMW2R+OVsfPGMmf/nDKfnxKV4hRB8/oW13NL61tIDEssh9ZpNOXLWdkIhBCfAGFAX2AicA2wstiTFF2AnVLK3ZbrfA8MBbxnk6jqFJnchcCgV1Tugb+fVtnENJXGiVxl2ooPiWfugbkehcDNrW/m912/O4VSABX3Pi0njSaxTbis0WUkRSQRHRxNkbmIjPwMj944Gk1VwRcbQQ8pZVshxHop5f+EEG8Cf/hwXl2UPcHKQcB9pQtcLYS4EDV7eEBKecBDnarB0XXO+w16Q+fbwBgI7UZBhB4pVhRSSqbvms7hM4f5e9/f9Krbi8mbnEMsCAQPpz5MobmQEc1G2JKaPNjpQTad2ERIQAiNYhpxIvcEcSFxHsMoGA1GLQQ0VR5fBEGu5T1HCFEHSAdql9P9fwOmSCnzhRB3AF8C/VwrCSHGAGMAkpOTy+nW5czxLfDVFfb9kd9B80vt+1oIlDuz986mWWwzsk3ZrDyykhHNRhAWGIaUku0Z23l6ydO2ujtPubvsJoQmMLqVZ7+HVgmtnOppNOczvgiC34UQMSij7r+o3AS+uDMcAuo57CdhNwoDIKVMd9idCLzm6UJSygnABFA2Ah/uXXEcXA0F2fDr/0H+aXu5VgP5BZPZxM5TOykyF/Hwgoedjr215i2P56REpdA3uS+TN06mW+1uLD+yHMAtp61GU13xJUPZ85bNn4QQvwMhUkoPiXXdWAU0EUI0QAmAkaggdjaEELWllEcsu0OALT63/Fxh4kXO++1GQeurIVL7fpcXJ3JPIKVkV+Yuxi8dz6Ezh0o+CRiYMpAnuz5JdHC0Slre8kZigmPIKsgiLDCMIG/JgTSaaoYvMwIbUsp8IN/HuiYhxD3AbJT76CQp5SYhxHPAassCtfuEEEMAEyqi6U2lac85R/vr4LJ3dGrJUlJYVMje03upH1Wfufvn0iC6AWGBYXy/9XuWHFrCrsxdxZ5/ZeMraRTTiOm7ptM7qTcTN0ykZXxLXrvwNSe9vjWUgs5zq9E44/M6gnOFc859dHy0ffuhbXom4MCqo6v4dsu3DG86nM61OhNoVBEtD2YdZMWRFfy972+WHF5SqmtOHjiZRjGN+Hrz1ySEJiCEYFTzUU51MvMzCTYGExIQ4uUqGk3142xDTGg8cXI3fH6xfb9OBy0ELMzdP5f7591v23d00wwPDCe7MNvnawUa1IreZ7o/w7HsY6TWUr/j+zre5/Wc6OBor8c0Go07xSWm6ejtGICU8t/yb04V4vvrINvB1/zqzyuvLZXM/tP7mbJ1itNKXG94EwLrR6/nWM4xAB6Y9wAb0zeydNRSIoMiy7WtGo3GneJmBG8Wc0ziwc2z2nD6CBx3WBd3/zqITam05lQGH639iLyiPG5rcxv3z7vfzT3zpQteone93kQFRbHs8DLG/D0GgNXXrya7MJu4EJW3tqCogJzCHIQQtuBqUy6bUrEPo9FUc4pLXt+3IhtSpXBUCdXved4LgfTcdPKL8pm+azrxIfHkmfL4eN3HAG55cIc3Hc5VTa5y8sPvXqc77/d7n+M5xwk2Bjvl1w0yBmnvHY2mkvHJRiCEaA20xDnW0Ff+atQ5y6kDyjaQaQkjERoHN8+q3Db5iayCLJ5a/BR3d7ibq2dc7bVeaEAoQcYg/tfjfzSNbUq9yHoe6/Wp18dPLdVoNGeLL7GGngX6oATBLOASYDFQ/QTBO62d97veUTntKGc2ndjE4kOLGd1qNKEBoaw8spJb/7oVgLkH5jrVbR7XnFrhtVhzdA0/D/2ZyKBIpJREBEVURtM1Gk054MuM4BqgHfCflPJmIURNoGSr4PlGYa7zfp8noPejldOWciItJ41+U+2mng/WfuC1bp3wOnxw0Qc0iW1SEU3TaDQViE+xhqSUZiGESQgRBRzHOXRE9eCn25z3U28GhwTgVYHdp3aTkZ9B24S2HMk+wqfrP/Vat0VcC3647AfWpa3jq81fcVub27QQ0GjOU3wRBKstsYY+A9YAZ4Bl/mzUOcnW39V7y6EwvGppxaSUzNg1g6eWPOXxeK3wWnza/1NM0sTVM66mdXxrPrv4M4QQtK/RnvY12ldsgzUaTYXiS6yh/7NsfiKE+BOIklKu92+zzkFC4yD3JNSsehmmRvw+gi0n3cM4DUoZRP/6/RmYMtBWtuHGDRXZNI1Gcw7gq9dQWyDFWl8I0VhK+bMf23VukbYNkjrDjtnQ8/6S659D7M3caxMCt7a+lbGdxvLKylfYnrGd13u/Xsmt02g05wK+eA1NAtoCmwCzpVgC1UMQmArgwy72/XM0oNy2k9toGtvUlnj9dMFp9p/ez6iZKg7PpIGT6FyrMwDjuoyrtHZqNJpzD19mBN2klC393pJzkeNb4SNPSdXOLWbunsm4RapzbxTdyC1aZ0xwDJ1q6vwIGo3GM+6599xZJoSonoJgl0tO22FfVEozvHG64DQLDy60CQHAY8jmOcPmeEyzqNFoNODbjOArlDA4ispFIAAppWzr15adC+xdbN++aRak9Ky8tlhYdXQVzy17jmM5x8g15XqsM+XSKSSEJrA2bS2pNVN1CAeNRlMsvgiCz4EbgA3YbQTnP2azXRCE14CEyvGhl1KSX5TPowsf5d/j/5KZ754c7r2+79G9TneyC7NtyVcABoUPqsimajSaKoovgiDNkk2s1AghBgHvojKUTZRSvuKl3tXANKCzlPLcyDqTtkXlIL7iE2g/quT65YSUkl2ndvHyypdZeXQlQYYgAo2BHsM314+qzw+X/UB4YDiATsSi0WjKhC+C4D8hxHfAbzikqSzJfVQIYQQ+BAYAB4FVQogZUsrNLvUigfuBFaVsu3/Zb1kzV7+7Xy4vpeTXnb8yccNE+tfvz9iOY5m8aTJvr3nbqV6BuYACcwEA8SHx3NPhHoY0GqLVPRqNptzwRRCEogSAQ+xln9xHuwA7pZS7AYQQ3wNDgc0u9Z4HXgUe8aXBFULeafh7PASEQkz9cr30ssPLMAgD3275lnkH5gEwaeMkJm2c5FSvR50eXNv8Wp5f/jyNYhpxUfJFDG82vFzbotFoNODbyuKby3jtusABh/2DgJMvpiULWj0p5UwhxLkjCH69Cwqy1HY5xBPKKczh152/0iqhlS1Bi5XXe7/OIwvUo/dO6s2GExu4uP7FPNntSVVWr/dZ31+j0WiKo7hUlY9KKV8TQryPmgE4IaX0njTWB4QQBuAt4CYf6o4BxgAkJyefzW19Y99S9R4QelaXMZlN7Mncw6MLH3XL4AX2RV6hxlAaxjT0Gstfo9Fo/ElxzuXW4DSrUcHmXF8lcQjnKKVJljIrkUBrYL4QYi/QDZghhEh1vZCUcoKUMlVKmZqYmOjDrc8S6ywg8OyMr99u+ZarZlzlJASsq3q71e5mW+nbu15vLQQ0Gk2lUVyqyt8smzlSyqmOx4QQw3y49iqgiRCiAUoAjASudbh+JpDgcM35wMPnhNeQdfFVrbIvldiQtsFm+K0fVZ8HOj1Ai7gW1Imow6CUQYQFhpVHSzUajeas8cVY/Dgw1YcyJ6SUJiHEPcBslPvoJCnlJiHEc8Dqsrqk+p1//gfZaSraaBlWEucU5vDowkdZcHABkUGRfNDvAzrW7OhUx9HXX6PRaCqb4mwElwCDgbpCiPccDkUBJl8uLqWchUpv6Vj2jJe6fXy5pl/J2AuL31LbHW+AsLhSnV5QVEDX7+z28Me7PO4mBDQajeZco7gZwWGUfWAIzjaBLOABfzaq0sjYa98OLV4I5Bfl8/OOn+lbry8Dpg1gUMogNqVvsh2fO2wuiWEVYM/QaDSas6Q4G8E6YJ1lMZkAmqO8h7ZJKQsqqH0Vy5k0+7bLbGD10dUsP7KcxYcWk2fKswV3e2nFSwD8ufdPW93HuzyuhYBGo6ky+GIjGAB8CuxCCYQGQog7pJR/+LVllUG2gyAQBnJNuRzNPsqqo6t4fvnzHk8JNgaTX6QWXN/V7i7qRdbjsoaXVURrNRqNplzwRRC8BfSVUu4EEEI0AmYC55cgKDLBzn8AOG0QbMg5xJ3fdnGr9lCnh/hu63ccyznGD5f9QPO45hXdUo1GoylXfBEEWVYhYGE3yk5wfrHoTdg1h03xyYyMAnZ+41blpQte4vJGl3NT65sqvHkajUbjL3wRBKuFELOAH1E2gmGoAHJXQcnB56oEBdkw/yUmRUfydpS9+NbWt5IclUzD6IYAtK/RvnLap9FoNH7EF0EQAhwDrEFv0lCB6C7nfMld/NtY9gYE8HZcLACNYxrzZu83aRjTsJIbptFoNP7Hn0Hnqg77lzE7wr7S99vB3+qVvxqNptpQYiJbIUSSEOIXIcRxy+snIURSRTSuovgtCD6IjSGpsJB3+76rhYBGo6lW+KIamgx8h7INAFxvKRvgr0ZVFKfyTjFl6xQ+ilBB5q4/nUW/5H4Vdn8pJcIhzPXO42dIjgtDCFh34BQFRedfZtDTuSa2Hj2N2SGebfqZfHYcO1N5jdJoqghD2tfh+m7lmyMFfBMEiVLKyQ77XwghxpZ7SyqB77Z+x8frPgagY14ew4eV3twhpeTo6TxmrD1MdkGR23GzWbLpcKbbsbzCIvafzKFJjQiEEGTnm9h0+HTZHqSKYxDQonYUUSGBld0Ujeacxmg4+/wonvBFEKQLIa4Hplj2RwHpfmlNBZOeqx5jVGYWjzQdRWA9e5ygAydziAoJZN3BU2w4lEm+SY3Odx0/Q9oZtYAsI7uAHcdLHsnGhgXStGakU46bkEAjYYFG2xcbGRJA94bxdG4Qh0FAUmwYSbFnlw/hXKVlHd3pazTnEr4IgluA94G3UV5CS4HzwoB8POcYTfMLeOJkBnQcDcDeE9k8PHUdq/dleDwnNNBI67pRGA2ChIhgejZOIDEymD7NEmlVJ7oim6/RaDTlgi9eQ/tQgefOOw5k7KSeyQRXTWRRZgLPfDWfPSeyAZWb5taeDeiQHEuH5BjqxJyfo3ONRqPxZUZwXpJTmMOe7MMMLCjg2Q1xfLlhJbWjQ7ivX2OGdqhLo8SIym6iRqPRVAjVVhBsObkFM5IW+SZe3ZDLFe3r8sTgFtSIOrv0lBqNRlPVKHEdwdkghBgkhNgmhNgphBjn4fidQogNQoi1QojFQoiW/myPI5tOqNwB9fINjEhN5p2RHbQQ0Gg01RKfBYEQopsQ4k8hxHwhxBU+1DcCHwKXAC2BUR46+u+klG2klO2B11CRTiuEVUf/I8pkJMQcynNXtKqo22o0Gs05h1dBIISo5VL0IHAlKn2l5+D8znQBdkopd1sS2XwPDHWsIKV0dJwPR3kl+R2T2cTiQwtpmR0EQZEEBxgr4rYajUZzTlKcjeATIcS/wGtSyjzgFHANYAZ8WflUFzjgsH8Q6OpaSQhxN0rIBAEVsqz30JlDmGQBzfJDqFOzRkXcUqPRaM5ZvM4IpJRXAP8BvwshRgNjgWAgHriivBogpfxQStkIeAx4ylMdIcQYIcRqIcTqtLQ0T1VKxc4MlV6hVVEeIiz+rK+n0Wg0VZlibQRSyt+AgUA08AuwXUr5npTSl974EFDPYT/JUuaN7/EiYKSUE6SUqVLK1MTEs88F/N/x/0AG0K3gJETXPevraTQaTVWmOBvBECHEPOBPYCMwAhgqhPjekq6yJFYBTYQQDYQQQcBIYIbLPZo47F4K7CjtA5SFbSd3EJEfRqz5DERpQaDRaKo3xdkIXkAZfEOB2VLKLsBDls77RVTH7hUppUkIcQ8wGzACk6SUm4QQzwGrpZQzgHv+v717D5KqTO84/n2cnqGHq4A3nEYZw0VQAd2RS2002Q0KTrJaSW0MxNRqtGIlcY0bc1mt3dJyK3/oaq2Y0trCWjdbtRshgWwiMTDWhlClpS6IWRUFEXYx0qACs4Bc5tLMPPnjnJFmoGe6e/p0T/f5faqm6POe93S/b79TPPOey/uY2SIgAxwCbh9yj/Kw+7MPmZHpCDbmDNgNEamwTCZDOp2ms7Oz0k2pCslkklQqRX19/ut5DRQIjgB/AIwE9vcVuvtOBgkCWXXXAev6lT2U9fq+vFtaIu7OwY79zD+Z4WDqBs4b0//mKBEZTtLpNGPGjGHKlCmnLdsuZ3J32tvbSafTNDc3533cQNcIfp/gwnAC+OMhtm/YONx1mB4/SXPPcZLjJ1W6OSIyiM7OTiZOnKggkAczY+LEiQXPnnLOCNz9IMGqozVl/4lgcjO5p4PRl8ypcGtEJB8KAvkr5ruKdImJ4ehAR3DD09jeBFxTlksSIiLDWvwCwYkgENTVXQh1So4iIhK7QPDRZ8GjDKOTum1URMqrra2NGTNmMHXqVB599NGC6+V7fKFiFwhe/+hVZnR1k7hQ1wdEpHx6enq45557WL9+Pdu2bWPlypVs27Yt73r5Hl+M2AWCX3d8ypRMBlJfqHRTRKSKtLW1MXfuXObOncv8+fPp7e0t6PjNmzczdepULrvsMhoaGli6dCkvvPBC3vXyPb4YsUtM09HTSaM7I8eeV+mmiEiBHvnP99i2L581L/M36+KxPPyVwZeiv/fee3n55ZeZNOnM286vu+46jh49ekb5E088waJFiwDYu3cvkyefWnUnlUqxadOmM47JVS/f44sRu0DQ1dtFY68z5lwtNici+WttbWX27NncdtttLF++/LR9r7zySmUaVSKxCwTdnKTRexk9ToFApNrk85d7FF577TXcnY8//phE4sz/NvOZETQ1NbFnz6mV+dPpNE1NZ960kqtevscXI1aBINOboYdeGt2paxxX6eaISJVYvXo106dPJ5FI4O4cPXqUsWPHfr4/nxnBtddey86dO9m9ezdNTU2sWrWK559/Pu96M2bMyOv4YsTqYnHHyWChufreOkiMqHBrRKRaLFu2jBUrVjB79mwWLFjAzp2FL5ScSCR4+umnWbx4MTNnzuTWW2/liitOzXBaW1vZt29fznqDHT8U5l6W7JAl09LS4lu2bCnq2E+Pf8qiNYv4u/Yuvnb/ByVumYhEYfv27cycObPSzagqZ/vOzOxNd285W/1YzggS52g2ICLSJ56BwBor3BIRkeEjVoHgePdxABJ1IyvcEhGR4SPSQGBmS8xsh5ntMrMHzrL/fjPbZmbvmNkGM7s0yvYc6jwGQENidJQfIyJSVSILBGZWBzwD3ATMApaZ2ax+1X4BtLj7bGAN8N2o2gNwuOMEAA0NYwepKSISH1HOCOYBu9z9V+7eDawCbsmu4O4b3f1EuPlzIBVhezjcGTzwkRyhZwhERPpEGQiagD1Z2+mwLJe7gPURtocjJw4DMDI5PsqPERGpKsPiyWIz+xOgBfitHPvvBu4GuOSSS4r+nBMdhwAY1Tih6PcQEak1Uc4I9gKTs7ZTYdlpzGwR8C3gZnfvOtsbufuz7t7i7i3nn39+0Q063nkEgNGjtc6QiJRfvoll7rzzTi644AKuvPLKoo4vVJSB4A1gmpk1m1kDsBRYm13BzK4GVhAEgf0RtgWAju6jjOjtJTlSp4ZEpLwKSSxzxx130NbWVvTxhYosELj7SeDrwEvAduBf3f09M/uOmd0cVnscGA2sNrO3zGxtjrcric7MMRrdaRyti8UiUphyJaYBuP7665kwYULRxxcq0msE7r4OWNev7KGs14ui/Pz+Ok8ep9GdEQoEItVp/QPwydbSvudFV8FNg59mKVdimlyUmKZEuns6aOx16pN6jkBECqPENDWiu7eLkd4LI/RksUhVyuMv9yiUMzFNLkpMUyLdvV2c2+vQoEAgIvkrZ2KaqI4fSKwWncuQIekODaMq3RQRqSLlTEzT93kLFy5kx44dpFIpnnvuOSWmyTaUxDRffq6FOV2f8eRfKimNSLVQYprCKTHNALqthwaPVZdFRAYVq/8Vu62Heuor3QwRkWElZoHAaYjX9XERkUHFJhBkejP0GNSfk6x0U0REhpXYBIJjXZ0A1ClNpYjIaWITCE5kugGwhAKBiEi22ASCjq4gEZppRiAicprYBIKujuDx73M0IxAROU1sAkFHVxAIEueMqHBLRCSu8k0sk6teroQ1QxWbQNDZeQyARKKhwi0RkTjKN7HMQPXOlrCmFGITCLq7g0BQl9DtoyJSuHIlphmo3tkS1pRCpE9XmdkS4CmgDviBuz/ab//1wHJgNrDU3ddE1ZburuMA1Ccao/oIEYnYY5sf4/1fv1/S97x8wuV8c943B61XrsQ0USagySWyQGBmdcAzwA1AGnjDzNa6e/Zc6CPgDuBvo2pHn+5McNdQQjMCESmCEtMUZx6wy91/BWBmq4BbgM8Dgbt/GO4rbI5VhO7uIBA01OuuIZFqlc9f7lEoZ2KaKBPQ5BJlIGgC9mRtp4H5EX7egDInOwAFAhEpXDkT00SZgCaXqrhYbGZ3m9kWM9ty4MCBot4jkwkDQYMCgYgUppyJaQaqd7aENaUQ5YxgLzA5azsVlhXM3Z8FnoUgMU0x73GsYTwAiZHnF3O4iMTYvHnz2Lp165Dfp7W1ldbW1rPuW7du3aD1Vq5cOeQ2nE2UM4I3gGlm1mxmDcBSYG2Enzeg7nHBObaRYy+qVBNERIalyGYE7n7SzL4OvERw++gP3f09M/sOsMXd15rZtcC/A+OBr5jZI+5emiSc/SyefgWddbcx66KLo3h7EZGqFelzBO6+DljXr+yhrNdvEJwyitzMiTOZOVF5T0VE+quKi8UiEm/uRV0ajKVivisFAhEZ1pLJJO3t7QoGeXB32tvbSSYLe3BWCXxFZFhLpVKk02mKvXU8bpLJJKlUYWfcFQhEZFirr6+nubm50s2oaTo1JCIScwoEIiIxp0AgIhJzVm1X4s3sAPB/RR5+HnCwhM2pBupzPKjP8TCUPl/q7mddY6fqAsFQmNkWd2+pdDvKSX2OB/U5HqLqs04NiYjEnAKBiEjMxS0QPFvpBlSA+hwP6nM8RNLnWF0jEBGRM8VtRiAiIv3EJhCY2RIz22Fmu8zsgUq3p1TMbLKZbTSzbWb2npndF5ZPMLOfmdnO8N/xYbmZ2T+G38M7ZnZNZXtQHDOrM7NfmNmL4XazmW0K+/UvYTIkzGxEuL0r3D+log0fAjM718zWmNn7ZrbdzBbW8jib2V+Hv9PvmtlKM0vW4jib2Q/NbL+ZvZtVVvC4mtntYf2dZnZ7IW2IRSAwszrgGeAmYBawzMxmVbZVJXMS+Bt3nwUsAO4J+/YAsMHdpwEbwm0IvoNp4c/dwPfL3+SSuA/YnrX9GPCku08FDgF3heV3AYfC8ifDetXqKaDN3S8H5hD0vybH2cyagL8CWtz9SoLkVkupzXH+EbCkX1lB42pmE4CHgfnAPODhvuCRF3ev+R9gIfBS1vaDwIOVbldEfX0BuAHYAUwKyyYBO8LXK4BlWfU/r1ctPwTJjDYAXwZeBIzgIZtE//EmyJC3MHydCOtZpftQRJ/HAbv7t71WxxloAvYAE8JxexFYXKvjDEwB3i12XIFlwIqs8tPqDfYTixkBp36p+qTDspoSToevBjYBF7r7x+GuT4ALw9e18F0sB/4e6A23JwKH3f1kuJ3dp8/7G+4/EtavNs3AAeCfwlNiPzCzUdToOLv7XuAJ4CPgY4Jxe5PaH+c+hY7rkMY7LoGg5pnZaODfgG+4+2fZ+zz4E6Embg8zs98D9rv7m5VuS5klgGuA77v71cBxTp0uAGpunMcDtxAEwIuBUZx5+iQWyjGucQkEe4HJWdupsKwmmFk9QRD4Z3f/aVj8qZlNCvdPAvaH5dX+XXwRuNnMPgRWEZweego418z68mtk9+nz/ob7xwHt5WxwiaSBtLtvCrfXEASGWh3nRcBudz/g7hngpwRjX+vj3KfQcR3SeMclELwBTAvvOGgguOi0tsJtKgkzM+A5YLu7fy9r11qg786B2wmuHfSVfy28+2ABcCRrCjrsufuD7p5y9ykE4/g/7n4bsBH4alitf3/7voevhvWr7q9md/8E2GNmM8Ki3wG2UaPjTHBKaIGZjQx/x/v6W9PjnKXQcX0JuNHMxoezqRvDsvxU+iJJGS/GtAIfAL8EvlXp9pSwX79JMG18B3gr/GklOD+6AdgJ/DcwIaxvBHdQ/RLYSnBXRsX7UWTffxt4MXx9GbAZ2AWsBkaE5clwe1e4/7JKt3sI/Z0LbAnH+j+A8bU8zsAjwPvAu8CPgRG1OM7ASoLrIBmCmd9dxYwrcGfY/13AnxbSBj1ZLCISc3E5NSQiIjkoEIiIxJwCgYhIzCkQiIjEnAKBiEjMKRCIFMDMvmFmIyvdDpFS0u2jIgUIn2hucfeDlW6LSKloRiCSg5mNMrP/MrO3wzXxHyZY92ajmW0M69xoZq+b2f+a2epwzSfM7EMz+66ZbTWzzWY2NSz/w/C93jazlyvXO5FTFAhEclsC7HP3OR6sib8c2Ad8yd2/ZGbnAd8GFrn7NQRP/d6fdfwRd78KeDo8FuAhYLG7zwFuLk83RAamQCCS21bgBjN7zMyuc/cj/fYvIEh09KqZvUWwJsylWftXZv27MHz9KvAjM/szgmQrIhWXGLyKSDy5+wdhKsBW4B/MbEO/Kgb8zN2X5XqL/q/d/c/NbD7wu8CbZvYFd6/mVTKlBmhGIJKDmV0MnHD3nwCPEyz7fBQYE1b5OfDFrPP/o8xsetZb/FHWv6+HdX7D3Te5+0MEiWaylw4WqQjNCERyuwp43Mx6CVaG/AuCUzxtZrYvvE5wB7DSzEaEx3ybYJVbgPFm9g7QRZBKkPD9phHMJjYAb5enKyK56fZRkQjoNlOpJjo1JCISc5oRiIjEnGYEIiIxp0AgIhJzCgQiIjGnQCAiEnMKBCIiMadAICISc/8P3i2HrvcD0OoAAAAASUVORK5CYII=
"
>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Note $(1-\alpha)^n+ \displaystyle\sum_{i=1}^n \alpha(1-\alpha)^{n-i} = 1, \alpha \in [0,1]$, $Q_{n+1}$ therefore is called (exponetial recency-)weight average of past $R \text{ and } Q_1$.<br><br>
<em>Proof</em>:<br>
$n=1, 1-\alpha+\alpha = 1$;<br>
assume for $n=k, (1-\alpha)^k+ \displaystyle\sum_{i=1}^k \alpha(1-\alpha)^{k-i} = 1$;<br>
then for $n=k+1$,</p>
<p>$\begin{aligned} &amp; (1-\alpha)^{k+1}+ \displaystyle\sum_{i=1}^{k+1} \alpha(1-\alpha)^{k+1-i} - [(1-\alpha)^k+ \displaystyle\sum_{i=1}^k \alpha(1-\alpha)^{k-i}] \\
&amp;= (1-\alpha)^{k+1}- (1-\alpha)^{k} + \displaystyle\sum_{i=1}^k \alpha(1-\alpha)^{k-i} + \alpha(1-\alpha)^{k+1-1} - \displaystyle\sum_{i=1}^k \alpha(1-\alpha)^{k-i}\\
&amp;= (1-\alpha)^k(1-\alpha-1)+\alpha(1-\alpha)^k \\
&amp;= -\alpha(1-\alpha)^k+\alpha(1-\alpha)^k \\
&amp;= 0
\end{aligned} 
$</p>
<p>$\therefore  (1-\alpha)^{k+1}+ \displaystyle\sum_{i=1}^{k+1} \alpha(1-\alpha)^{k+1-i} = 1, \forall k \in \mathbb{N}$<br>
$\therefore \forall n\in\mathbb{N}, \text{ }\alpha \in [0,1], \text{ } (1-\alpha)^n+ \displaystyle\sum_{i=1}^n \alpha(1-\alpha)^{n-i} = 1$</p>
<p>Consider {$\alpha_n$} by stochastic approximation theory: P(coverage) = 1:
<br></p>
$$
\sum_{n=1}^\infty \alpha_n(a) = \infty \text{ }\text{ }\text{ }\text{ and } \text{ }\text{ }\text{ } \sum_{n=1}^\infty \alpha_n(a) &lt; \infty 
$$<p>This means (i)steps are large enough to overcome initial condition or random fluctuations (ii) steps become small enough to coverage.
<br><br>
As $Q_{n+1}$ more or less dependent on $Q_1(a) \Rightarrow$ biased by initial estimate.<br>
Then, for genral stationary case, we encourage exploration optimistic initial value($Q_1&gt;0, \epsilon=0$ compared with greedy's).</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="k">def</span> <span class="nf">figure_2_2</span><span class="p">(</span><span class="n">runs</span><span class="o">=</span><span class="mi">1000</span><span class="p">,</span> <span class="n">time</span><span class="o">=</span><span class="mi">1000</span><span class="p">):</span>
    <span class="n">bandits</span> <span class="o">=</span> <span class="p">[</span><span class="n">Bandit</span><span class="p">(</span><span class="n">epsilon</span><span class="o">=</span><span class="mi">0</span><span class="p">,</span> <span class="n">initial_val</span><span class="o">=</span><span class="mi">5</span><span class="p">,</span> <span class="n">step_size</span><span class="o">=</span><span class="mf">0.1</span><span class="p">),</span> <span class="n">Bandit</span><span class="p">(</span><span class="n">epsilon</span><span class="o">=</span><span class="mf">0.1</span><span class="p">,</span> <span class="n">initial_val</span><span class="o">=</span><span class="mi">0</span><span class="p">,</span> <span class="n">step_size</span><span class="o">=</span><span class="mf">0.1</span><span class="p">)]</span>
    <span class="n">best_action_counts</span><span class="p">,</span> <span class="n">_</span> <span class="o">=</span> <span class="n">simulate</span><span class="p">(</span><span class="n">runs</span><span class="p">,</span> <span class="n">time</span><span class="p">,</span> <span class="n">bandits</span><span class="p">)</span>

    <span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">best_action_counts</span><span class="p">[</span><span class="mi">0</span><span class="p">],</span> <span class="n">label</span><span class="o">=</span><span class="s1">&#39;$\epsilon = 0, q = 5$&#39;</span><span class="p">)</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">best_action_counts</span><span class="p">[</span><span class="mi">1</span><span class="p">],</span> <span class="n">label</span><span class="o">=</span><span class="s1">&#39;$\epsilon = 0.1, q = 0$&#39;</span><span class="p">)</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">xlabel</span><span class="p">(</span><span class="s1">&#39;Steps&#39;</span><span class="p">)</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">ylabel</span><span class="p">(</span><span class="s1">&#39;</span><span class="si">% o</span><span class="s1">ptimal action&#39;</span><span class="p">)</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">legend</span><span class="p">()</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">()</span>

<span class="n">figure_2_2</span><span class="p">()</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stderr output_text">
<pre>100%|██████████| 1000/1000 [00:25&lt;00:00, 39.42it/s]
100%|██████████| 1000/1000 [00:25&lt;00:00, 40.00it/s]
</pre>
</div>
</div>

<div class="output_area">

    <div class="prompt"></div>




<div class="output_png output_subarea ">
<img src="data:image/png;base64,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
"
>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h3 id="Upper-Confidence-Bound(UCB)">Upper Confidence Bound(UCB)<a class="anchor-link" href="#Upper-Confidence-Bound(UCB)">&#182;</a></h3><p>Action selection:<br>
$$A_t \doteq \arg\max_a\left[Q_t(a)+c\cdot\sqrt{\frac{\ln t}{N_t(a)}}\right]$$
where $N_t(a)$: number of times "$a$" has been selected before "$t$";<br>
c&gt;0 controls the degree of exploration;<br>
$\displaystyle \sqrt{\frac{\ln t}{N_t(a)}}$: uncertainty, or variance(many "action "$\rightarrow$bad$\rightarrow$less this "action")</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="k">def</span> <span class="nf">figure_2_3</span><span class="p">(</span><span class="n">runs</span><span class="o">=</span><span class="mi">1000</span><span class="p">,</span> <span class="n">time</span><span class="o">=</span><span class="mi">1000</span><span class="p">):</span>
    <span class="n">bandits</span> <span class="o">=</span> <span class="p">[</span><span class="n">Bandit</span><span class="p">(</span><span class="n">epsilon</span><span class="o">=</span><span class="mi">0</span><span class="p">,</span> <span class="n">UCB_param</span><span class="o">=</span><span class="mi">2</span><span class="p">,</span> <span class="n">sample_averages</span><span class="o">=</span><span class="kc">True</span><span class="p">),</span> <span class="n">Bandit</span><span class="p">(</span><span class="n">epsilon</span><span class="o">=</span><span class="mf">0.1</span><span class="p">,</span> <span class="n">sample_averages</span><span class="o">=</span><span class="kc">True</span><span class="p">)]</span>
    <span class="n">_</span><span class="p">,</span> <span class="n">average_rewards</span> <span class="o">=</span> <span class="n">simulate</span><span class="p">(</span><span class="n">runs</span><span class="p">,</span> <span class="n">time</span><span class="p">,</span> <span class="n">bandits</span><span class="p">)</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">average_rewards</span><span class="p">[</span><span class="mi">0</span><span class="p">],</span> <span class="n">label</span><span class="o">=</span><span class="s1">&#39;UCB $c = 2$&#39;</span><span class="p">)</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">average_rewards</span><span class="p">[</span><span class="mi">1</span><span class="p">],</span> <span class="n">label</span><span class="o">=</span><span class="s1">&#39;epsilon greedy $\epsilon = 0.1$&#39;</span><span class="p">)</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">xlabel</span><span class="p">(</span><span class="s1">&#39;Steps&#39;</span><span class="p">)</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">ylabel</span><span class="p">(</span><span class="s1">&#39;Average reward&#39;</span><span class="p">)</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">legend</span><span class="p">()</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">()</span>
    
<span class="n">figure_2_3</span><span class="p">()</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stderr output_text">
<pre>100%|██████████| 1000/1000 [00:34&lt;00:00, 28.75it/s]
100%|██████████| 1000/1000 [00:24&lt;00:00, 41.00it/s]
</pre>
</div>
</div>

<div class="output_area">

    <div class="prompt"></div>




<div class="output_png output_subarea ">
<img src="data:image/png;base64,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bruNatWqhWzsdDzEUkDUBLb6nafYaWHLGGOygYNA5SivBUBEBorIfBGZHxy/Jb9UKhMPQEa2ursqSiyI5W5yuWGMIeck1Ay43W7uvfdeJk6cyMqVKxk5ciQrV64MW/aWW25h0qRJhXr/k34dhDFmGDAMoH379se1FLpSmXi2HThGRvbJ90NSThEmDoKdywq3ztNbQI/II1MP33zzDUOHDiUzM5NOnTrxwQcfsHXrVi699FLatWvHwoULad68OV999RXGGK677jpSUlJwu90MHjyYvn37kpSUxJEjR0LqfvPNNxk+fDgAd9xxBw899BDJycn06NGDLl26MGvWLGrWrMnPP/9MqVKlAq594YUX+Oabb6hatSq1a9emXbt2PProoyQnJ9O9e3c6derEggULmDBhAjNmzAh5BqfTGfbZnE4nQ4YM4csvv6RatWreugGefvppKlWqxEMPPQTAk08+SbVq1XjwwQcD2jZp0iQGDbLMrwkJCcyePRuHI/px+dy5c2nYsCH169cHoF+/fvz8889hN0A6//zzSU5OjrruaIjlDGIbUNvvvJadFraMiLiA8sC+KK8tdLwzCFUxKUoAq1atYvTo0cycOZPFixfjdDr59ttvAVizZg333HMPq1atoly5cnzwwQdMmjSJGjVqsGTJEpYvX86ll14ase4FCxbw+eefM2fOHP755x8++eQTFi2yPAvXrVvHvffey4oVK6hQoQI//PBDwLXz5s3jhx9+YMmSJUycOJH58+cH5K9bt4577rmHFStWkJaWFvYZIj3bggULGDVqFIsXL2bChAnMmzfPW+9tt93GV199BUBOTg6jRo3ixhtvDHm2+++/n4kTJ7J48WLmzJkTIBzOO+88b0BB/8/kyZO9ZbZt20bt2r6usFatWmzbFvOu0EssZxDzgEYiUg+rc+8HXB9UZhwwAJgNXANMNcYYERkHjBCRN4EaQCNgbgzbCqiKSTkJiGKkHwumTJnCggUL6NChA2BFaK1WrRrnn38+tWvX5txzzwXgxhtvZOjQofTu3ZtHHnmExx9/nF69enHeeedFrPvvv/+mT58+lClTBoCrrrqKGTNm0Lt3b+rVq0fr1q0BaNeuXcgIeebMmVxxxRUkJiaSmJjI5ZdfHpB/xhlnePeZiPQMhw4dCpuemppKnz59vJsX9e7d21tv3bp1qVy5MosWLWLXrl20adMmJIQ5QM+ePWnZsiU33HADb7/9dkBefjdBKg5iJiCMMdkich/wG+AEhhtjVojI88B8Y8w44DPgaxFZD6RiCRHsct8BK4Fs4F5jTMx7bZ+A0BmEovhjjGHAgAG8/PLLAenJyckh64ZEhMaNG7Nw4UImTJjAU089xcUXX8zTTz+d7/smJCR4j51OJ8eOHcvX9R6hk9szvPvuu2HTgzv0YO644w6++OILdu7cyW233RaSP2vWLIwx7NixA5crtKuNZhOkmjVrsnWrzxybkpJCzZphzbExIabrIIwxE4wxjY0xDYwxQ+y0p23hgDEm3RhzrTGmoTGmozFmo9+1Q+zrmhhjJsaynR48AiI9S2cQiuLPxRdfzJgxY9i9ezdgbRi0efNmALZs2eLdv2HEiBF06dKF7du3U7p0aW688Ub++9//snDhwoh1n3feeYwdO5a0tDSOHj3KTz/9lOuMw59zzz2XX375hfT0dI4cOcKvv/6a72eIlH7++eczduxYjh07xuHDh/nll18C6uvTpw+TJk1i3rx5dO8eulTr+++/p3HjxrhcLowxHDp0KCA/mk2QOnTowLp169i0aROZmZmMGjUqYCYTa3QltR+XtagOwBWti05CK8rJQLNmzXjxxRe55JJLaNmyJd26dWPHjh0ANGnShPfff5+mTZuyf/9+7r77bpYtW0bHjh1p3bo1zz33HE899VTEutu2bcstt9xCx44d6dSpE3fccQdt2rSJql0dOnSgd+/etGzZkh49etCiRQvKly+fr2eIlN62bVv69u1Lq1at6NGjh1cF5SE+Pp6uXbty3XXXhWyABNC/f38+/vhjWrZsSefOnVm3bl1Uz+SPy+Xivffeo3v37jRt2pTrrruO5s19+5L37NmT7du3e+939tlns2bNGmrVqsVnn32W7/sFIyVpc4327dubYCNVNNQdNB6A5FcuK+wmKcpxs2rVKpo2bVrczQhLcnIyvXr1Yvny5cXWhiNHjpCUlERaWhrnn38+w4YNo23btjG/b05ODm3btuX777+nUaNGMb9fYRDutyQiC4wx7cOV1xmEoignNQMHDqR169a0bduWq6++ukiEw8qVK2nYsCEXX3zxSSMcCsJJvw6iMBhxZyd2HEgv7mYoyklH3bp1i3X2AJbdo6hp1qwZGzduzLvgSY4KCOCcBlWKuwmKoignHKpi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
"
>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>soft-max distribution(i.e. Gibbs or Boltzmann distribution)<br>
$$\text{Pr}\{A_t=a\} \doteq \displaystyle \frac{e^{H_t(a)}}{\sum_{b=1}^k e^{H_t(b)}} \doteq \pi_t(a)$$</p>
<p>$H_t(a)\in\mathbb{R}$: preference for each action, initially $H_1(a)=0$
Natural Learning algorithmm for soft-max action preferences based on the idea of the stochastic gradient ascent(↑). For update:</p>
$$
H_{t+1}(A_t) \doteq H_t(A_t) + \alpha(R_t-\overline{R_t})(\mathbb{1}_{a=A_t}-\pi_t(A_t))
$$$$
H_{t+1}(a) \doteq H_t(a) + \alpha(R_t-\overline{R_t})\pi_t(a)
$$<p>where $\alpha&gt;0, \overline{R_t} = avr\{ R_1...R_{t-1} \}$<br>
$\overline{R_t}\Rightarrow$ baseline, $R_t&gt;\overline{R_t}, P(A_t)$ in the future increases, vice versa.
<br>
Conclusion: it is a stochastic approximation to gradient ascent:</p>
$$
H_{t+1}(a)\doteq H_t(a)+\alpha\frac{\partial \mathbb{E}[R_t]}{\partial H_t(a)},\text{ }\text{ }\text{ }\text{ }  \mathbb{E}[R_t] = \sum_x\pi_t(x) q_{*}(x)
$$<p>update = gradient of $\mathbb{E}[R_t]\Rightarrow$ stochastic gradient ascent $\Rightarrow$ robust convergence.</p>
<p><em>Proof:</em></p>
<p>$\begin{aligned} \frac{\partial \mathbb{E}\left[R_{t}\right]}{\partial H_{t}(a)} &amp;=\frac{\partial}{\partial H_{t}(a)}\left[\sum_{b} \pi_{t}(b) q_{*}(b)\right] \\ &amp;=\sum_{b} q_{*}(b) \frac{\partial \pi_{t}(b)}{\partial H_{t}(a)} \end{aligned}$
<br>
Let $\forall X_t$ and $b$ are independent, then $\displaystyle \sum_b\frac{\partial\pi_t(b)}{\partial H_t(b)} = 0$, so we have
<br>
$\begin{aligned}\frac{\partial \mathbb{E}\left[R_{t}\right]}{\partial H_{t}(a)} &amp;
=\sum_{b}\left(q_{*}(b)-X_{t}\right) \frac{\partial \pi_{t}(b)}{\partial H_{t}(a)} \\
&amp;=\sum_{b} \pi_{t}(b)\left(q_{*}(b)-X_{t}\right) \frac{\partial \pi_{t}(b)}{\partial H_{t}(a)} / \pi_{t}(b) \\
&amp;=\mathbb{E}\left[\left(q_{*}\left(A_{t}\right)-X_{t}\right) \frac{\partial \pi_{t}\left(A_{t}\right)}{\partial H_{t}(a)} / \pi_{t}\left(A_{t}\right)\right]
\end{aligned}$
<br><br>
given $A_t, \mathbb{E}[R_t|A_t] = q_{*}(A_t) = R_t$, and let arbitary $X_t$ be $\overline{R_t}$ then:
<br><br>
$\displaystyle
\frac{\partial \mathbb{E}\left[R_{t}\right]}{\partial H_{t}(a)} = \mathbb{E}\left[\left(R_t)-\overline{R_t}\right) \frac{\partial \pi_{t}\left(A_{t}\right)}{\partial H_{t}(a)} / \pi_{t}\left(A_{t}\right)\right]
$
<br><br>
Next,
<br><br>
$\begin{aligned}
\frac{\partial \pi_{t}(b)}{\partial H_{t}(a)} &amp;=\frac{\partial}{\partial H_{t}(a)} \pi_{t}(b) \\
&amp;=\frac{\partial}{\partial H_{t}(a)}\left[\frac{e^{H_{t}(b)}}{\sum_{c=1}^{k} e^{H_{t}(c)}}\right] \\
&amp;=\frac{\frac{\partial e^{H_{t}(b)}}{\partial H_{t}(a)} \sum_{c=1}^{k} e^{H_{t}(c)}-e^{H_{t}(b)} \frac{\partial \sum_{c=1}^{k} e^{H_{t}(c)}}{\partial H_{t}(a)}}{\left(\sum_{c=1}^{k} e^{H_{t}(c)}\right)^{2}} \\
&amp;=\frac{\mathbb{1}_{a=b} e^{H_{t}(a)} \sum_{c=1}^{k} e_{t}^{H}(c)-e^{H_{t}(b)} e^{H_{t}(a)}}{\left(\sum_{c=1}^{k} e^{H_{t}(c)}\right)^{2}} \\
&amp;=\frac{\mathbb{1}_{a=b} e^{H_{t}(b)}}{\sum_{c=1}^{k} e^{H_{t}(c)}}-\frac{e^{H_{t}(b)} e^{H_{t}(a)}}{\left(\sum_{c=1}^{k} e^{H_{t}(c)}\right)^{2}} \\
&amp;=\mathbb{1}_{a=b} \pi_{t}(b)-\pi_{t}(b){\pi}_{t}(a) \\
&amp;=\pi_{t}(b)\left(\mathbb{1}_{a=b}-\pi_{t}(a)\right)
\end{aligned}$
<br><br>
Therefore,
<br><br>
$
\begin{aligned}
\frac{\partial \mathbb{E}\left[R_{t}\right]}{\partial H_{t}(a)} &amp;=\mathbb{E}\left[\left(R_{t}-\overline{R}_{t}\right) \frac{\partial \pi_{t}\left(A_{t}\right)}{\partial H_{t}(a)} / \pi_{t}\left(A_{t}\right)\right] \\
&amp;=\mathbb{E}\left[\left(R_{t}-\overline{R}_{t}\right) \pi_{t}\left(A_{t}\right)\left(\mathbb{1}_{a=A_{t}}-\pi_{t}(a)\right) / \pi_{t}\left(A_{t}\right)\right] \\
&amp;=\mathbb{E}\left[\left(R_{t}-\overline{R}_{t}\right)\left(\mathbb{1}_{a=A_{t}}-\pi_{t}(a)\right)\right]
\end{aligned}
$
<br><br>
which is corresponding with the equation for the gradient ascent.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="k">def</span> <span class="nf">figure_2_4</span><span class="p">(</span><span class="n">runs</span><span class="o">=</span><span class="mi">1000</span><span class="p">,</span> <span class="n">time</span><span class="o">=</span><span class="mi">1000</span><span class="p">):</span>
    <span class="n">bandits</span> <span class="o">=</span> <span class="p">[</span><span class="n">Bandit</span><span class="p">(</span><span class="n">gradient</span><span class="o">=</span><span class="kc">True</span><span class="p">,</span> <span class="n">step_size</span><span class="o">=</span><span class="mf">0.1</span><span class="p">,</span> <span class="n">gradient_baseline</span><span class="o">=</span><span class="kc">True</span><span class="p">,</span> <span class="n">true_reward</span><span class="o">=</span><span class="mi">4</span><span class="p">),</span>
               <span class="n">Bandit</span><span class="p">(</span><span class="n">gradient</span><span class="o">=</span><span class="kc">True</span><span class="p">,</span> <span class="n">step_size</span><span class="o">=</span><span class="mf">0.1</span><span class="p">,</span> <span class="n">gradient_baseline</span><span class="o">=</span><span class="kc">False</span><span class="p">,</span> <span class="n">true_reward</span><span class="o">=</span><span class="mi">4</span><span class="p">),</span>
               <span class="n">Bandit</span><span class="p">(</span><span class="n">gradient</span><span class="o">=</span><span class="kc">True</span><span class="p">,</span> <span class="n">step_size</span><span class="o">=</span><span class="mf">0.4</span><span class="p">,</span> <span class="n">gradient_baseline</span><span class="o">=</span><span class="kc">True</span><span class="p">,</span> <span class="n">true_reward</span><span class="o">=</span><span class="mi">4</span><span class="p">),</span>
               <span class="n">Bandit</span><span class="p">(</span><span class="n">gradient</span><span class="o">=</span><span class="kc">True</span><span class="p">,</span> <span class="n">step_size</span><span class="o">=</span><span class="mf">0.4</span><span class="p">,</span> <span class="n">gradient_baseline</span><span class="o">=</span><span class="kc">False</span><span class="p">,</span> <span class="n">true_reward</span><span class="o">=</span><span class="mi">4</span><span class="p">)]</span>
    <span class="n">best_action_counts</span><span class="p">,</span> <span class="n">_</span> <span class="o">=</span> <span class="n">simulate</span><span class="p">(</span><span class="n">runs</span><span class="p">,</span> <span class="n">time</span><span class="p">,</span> <span class="n">bandits</span><span class="p">)</span>
    <span class="n">labels</span> <span class="o">=</span> <span class="p">[</span><span class="sa">r</span><span class="s1">&#39;$\alpha = 0.1$, with baseline&#39;</span><span class="p">,</span>
              <span class="sa">r</span><span class="s1">&#39;$\alpha = 0.1$, without baseline&#39;</span><span class="p">,</span>
              <span class="sa">r</span><span class="s1">&#39;$\alpha = 0.4$, with baseline&#39;</span><span class="p">,</span>
              <span class="sa">r</span><span class="s1">&#39;$\alpha = 0.4$, without baseline&#39;</span><span class="p">]</span>

    <span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="nb">len</span><span class="p">(</span><span class="n">bandits</span><span class="p">)):</span>
        <span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">best_action_counts</span><span class="p">[</span><span class="n">i</span><span class="p">],</span> <span class="n">label</span><span class="o">=</span><span class="n">labels</span><span class="p">[</span><span class="n">i</span><span class="p">])</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">xlabel</span><span class="p">(</span><span class="s1">&#39;Steps&#39;</span><span class="p">)</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">ylabel</span><span class="p">(</span><span class="s1">&#39;% Optimal action&#39;</span><span class="p">)</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">legend</span><span class="p">()</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">()</span>

<span class="n">figure_2_4</span><span class="p">()</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stderr output_text">
<pre>100%|██████████| 1000/1000 [00:39&lt;00:00, 25.06it/s]
100%|██████████| 1000/1000 [00:39&lt;00:00, 25.38it/s]
100%|██████████| 1000/1000 [00:38&lt;00:00, 26.15it/s]
100%|██████████| 1000/1000 [00:38&lt;00:00, 26.20it/s]
</pre>
</div>
</div>

<div class="output_area">

    <div class="prompt"></div>




<div class="output_png output_subarea ">
<img src="data:image/png;base64,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
"
>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h3 id="Summary">Summary<a class="anchor-link" href="#Summary">&#182;</a></h3><p>A parameter study of the various bandit algorithms presented in
this chapter is shown below. Each point is the average reward obtained over 1000 steps with
a particular algorithm at a particular setting of its parameter.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="k">def</span> <span class="nf">figure_2_5</span><span class="p">(</span><span class="n">runs</span><span class="o">=</span><span class="mi">1000</span><span class="p">,</span> <span class="n">time</span><span class="o">=</span><span class="mi">1000</span><span class="p">):</span>
    <span class="n">labels</span> <span class="o">=</span> <span class="p">[</span><span class="s1">&#39;epsilon-greedy&#39;</span><span class="p">,</span> <span class="s1">&#39;gradient bandit&#39;</span><span class="p">,</span>
              <span class="s1">&#39;UCB&#39;</span><span class="p">,</span> <span class="s1">&#39;optimistic initialization&#39;</span><span class="p">]</span>
    <span class="n">generators</span> <span class="o">=</span> <span class="p">[</span><span class="k">lambda</span> <span class="n">epsilon</span><span class="p">:</span> <span class="n">Bandit</span><span class="p">(</span><span class="n">epsilon</span><span class="o">=</span><span class="n">epsilon</span><span class="p">,</span> <span class="n">sample_averages</span><span class="o">=</span><span class="kc">True</span><span class="p">),</span>
                  <span class="k">lambda</span> <span class="n">alpha</span><span class="p">:</span> <span class="n">Bandit</span><span class="p">(</span><span class="n">gradient</span><span class="o">=</span><span class="kc">True</span><span class="p">,</span> <span class="n">step_size</span><span class="o">=</span><span class="n">alpha</span><span class="p">,</span> <span class="n">gradient_baseline</span><span class="o">=</span><span class="kc">True</span><span class="p">),</span>
                  <span class="k">lambda</span> <span class="n">coef</span><span class="p">:</span> <span class="n">Bandit</span><span class="p">(</span><span class="n">epsilon</span><span class="o">=</span><span class="mi">0</span><span class="p">,</span> <span class="n">UCB_param</span><span class="o">=</span><span class="n">coef</span><span class="p">,</span> <span class="n">sample_averages</span><span class="o">=</span><span class="kc">True</span><span class="p">),</span>
                  <span class="k">lambda</span> <span class="n">initial</span><span class="p">:</span> <span class="n">Bandit</span><span class="p">(</span><span class="n">epsilon</span><span class="o">=</span><span class="mi">0</span><span class="p">,</span> <span class="n">initial_val</span><span class="o">=</span><span class="n">initial</span><span class="p">,</span> <span class="n">step_size</span><span class="o">=</span><span class="mf">0.1</span><span class="p">)]</span>
    <span class="n">parameters</span> <span class="o">=</span> <span class="p">[</span><span class="n">np</span><span class="o">.</span><span class="n">arange</span><span class="p">(</span><span class="o">-</span><span class="mi">7</span><span class="p">,</span> <span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="n">dtype</span><span class="o">=</span><span class="n">np</span><span class="o">.</span><span class="n">float</span><span class="p">),</span>
                  <span class="n">np</span><span class="o">.</span><span class="n">arange</span><span class="p">(</span><span class="o">-</span><span class="mi">5</span><span class="p">,</span> <span class="mi">2</span><span class="p">,</span> <span class="n">dtype</span><span class="o">=</span><span class="n">np</span><span class="o">.</span><span class="n">float</span><span class="p">),</span>
                  <span class="n">np</span><span class="o">.</span><span class="n">arange</span><span class="p">(</span><span class="o">-</span><span class="mi">4</span><span class="p">,</span> <span class="mi">3</span><span class="p">,</span> <span class="n">dtype</span><span class="o">=</span><span class="n">np</span><span class="o">.</span><span class="n">float</span><span class="p">),</span>
                  <span class="n">np</span><span class="o">.</span><span class="n">arange</span><span class="p">(</span><span class="o">-</span><span class="mi">2</span><span class="p">,</span> <span class="mi">3</span><span class="p">,</span> <span class="n">dtype</span><span class="o">=</span><span class="n">np</span><span class="o">.</span><span class="n">float</span><span class="p">)]</span>

    <span class="n">bandits</span> <span class="o">=</span> <span class="p">[]</span>
    <span class="k">for</span> <span class="n">generator</span><span class="p">,</span> <span class="n">parameter</span> <span class="ow">in</span> <span class="nb">zip</span><span class="p">(</span><span class="n">generators</span><span class="p">,</span> <span class="n">parameters</span><span class="p">):</span>
        <span class="k">for</span> <span class="n">param</span> <span class="ow">in</span> <span class="n">parameter</span><span class="p">:</span>
            <span class="n">bandits</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">generator</span><span class="p">(</span><span class="nb">pow</span><span class="p">(</span><span class="mi">2</span><span class="p">,</span> <span class="n">param</span><span class="p">)))</span>

    <span class="n">_</span><span class="p">,</span> <span class="n">average_rewards</span> <span class="o">=</span> <span class="n">simulate</span><span class="p">(</span><span class="n">runs</span><span class="p">,</span> <span class="n">time</span><span class="p">,</span> <span class="n">bandits</span><span class="p">)</span>
    <span class="n">rewards</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">mean</span><span class="p">(</span><span class="n">average_rewards</span><span class="p">,</span> <span class="n">axis</span><span class="o">=</span><span class="mi">1</span><span class="p">)</span>

    <span class="n">i</span> <span class="o">=</span> <span class="mi">0</span>
    <span class="k">for</span> <span class="n">label</span><span class="p">,</span> <span class="n">parameter</span> <span class="ow">in</span> <span class="nb">zip</span><span class="p">(</span><span class="n">labels</span><span class="p">,</span> <span class="n">parameters</span><span class="p">):</span>
        <span class="n">l</span> <span class="o">=</span> <span class="nb">len</span><span class="p">(</span><span class="n">parameter</span><span class="p">)</span>
        <span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">parameter</span><span class="p">,</span> <span class="n">rewards</span><span class="p">[</span><span class="n">i</span><span class="p">:</span><span class="n">i</span> <span class="o">+</span> <span class="n">l</span><span class="p">],</span> <span class="n">label</span><span class="o">=</span><span class="n">label</span><span class="p">)</span>
        <span class="n">i</span> <span class="o">+=</span> <span class="n">l</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">xlabel</span><span class="p">(</span><span class="s1">&#39;Parameter($2^x$)&#39;</span><span class="p">)</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">ylabel</span><span class="p">(</span><span class="s1">&#39;Average reward&#39;</span><span class="p">)</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">legend</span><span class="p">()</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">()</span>

<span class="n">figure_2_5</span><span class="p">()</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stderr output_text">
<pre>100%|██████████| 1000/1000 [00:24&lt;00:00, 40.78it/s]
100%|██████████| 1000/1000 [00:24&lt;00:00, 41.02it/s]
100%|██████████| 1000/1000 [00:24&lt;00:00, 41.31it/s]
100%|██████████| 1000/1000 [00:24&lt;00:00, 41.52it/s]
100%|██████████| 1000/1000 [00:23&lt;00:00, 42.50it/s]
100%|██████████| 1000/1000 [00:22&lt;00:00, 44.48it/s]
100%|██████████| 1000/1000 [00:37&lt;00:00, 26.92it/s]
100%|██████████| 1000/1000 [00:36&lt;00:00, 27.09it/s]
100%|██████████| 1000/1000 [00:37&lt;00:00, 26.97it/s]
100%|██████████| 1000/1000 [00:36&lt;00:00, 27.03it/s]
100%|██████████| 1000/1000 [00:37&lt;00:00, 27.02it/s]
100%|██████████| 1000/1000 [00:36&lt;00:00, 27.07it/s]
100%|██████████| 1000/1000 [00:36&lt;00:00, 27.07it/s]
100%|██████████| 1000/1000 [00:31&lt;00:00, 31.53it/s]
100%|██████████| 1000/1000 [00:31&lt;00:00, 31.61it/s]
100%|██████████| 1000/1000 [00:31&lt;00:00, 31.58it/s]
100%|██████████| 1000/1000 [00:31&lt;00:00, 31.59it/s]
100%|██████████| 1000/1000 [00:31&lt;00:00, 31.54it/s]
100%|██████████| 1000/1000 [00:31&lt;00:00, 31.52it/s]
100%|██████████| 1000/1000 [00:33&lt;00:00, 30.19it/s]
100%|██████████| 1000/1000 [00:26&lt;00:00, 37.93it/s]
100%|██████████| 1000/1000 [00:25&lt;00:00, 38.57it/s]
100%|██████████| 1000/1000 [00:25&lt;00:00, 39.29it/s]
100%|██████████| 1000/1000 [00:26&lt;00:00, 37.80it/s]
100%|██████████| 1000/1000 [00:25&lt;00:00, 38.72it/s]
</pre>
</div>
</div>

<div class="output_area">

    <div class="prompt"></div>




<div class="output_png output_subarea ">
<img src="data:image/png;base64,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
"
>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p><strong><em>Reference</em></strong></p>
<p>[1] Sutton, Richard S., and Andrew G. Barto. Reinforcement learning: An introduction. MIT press, 2018.</p>
<p>[2] <a href="https://github.com/ShangtongZhang/reinforcement-learning-an-introduction">https://github.com/ShangtongZhang/reinforcement-learning-an-introduction</a></p>

</div>
</div>
</div>
    </div>
  </div>
</body>

 


