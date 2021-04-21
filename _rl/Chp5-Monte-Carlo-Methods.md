---
title: "Chapter 5 Monte Carlo Methods"
collection: rl
permalink: /rl/Chp5-Monte-Carlo-Methods
tags:
  - Reinforcement Learning
  - Tabular Solution Method
date: "2020-12-04"
tool: "/images/nothing.png"
--- 
___"Reinforcement Learning: An Introduction"___ *by Richard Sutton & Andrew Barto, 2nd Ed*


> Author: Charles Zhang  <br>[*All Notes Catelog for* ***Reinforcement Learning: An Introduction***](https://zcczhang.github.io/blogs/). This post is created following [*BY-NC-ND 4.0*](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.en) agreement, please follow terms while sharing. 


<html>
<head><meta charset="utf-8" />

<title>Monte Carlo Methods</title>

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
footer,
header,
hgroup,
main,
menu,
nav,
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
  font-size: 0.75em;
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
  .navbar {
    display: none;
  }
  .btn > .caret,
  .dropup > .btn > .caret {
    border-top-color: #000 !important;
  }
  .label {
    border: 1px solid #000;
  }
  .table {
    border-collapse: collapse !important;
  }
  .table td,
  .table th {
    background-color: #fff !important;
  }
  .table-bordered th,
  .table-bordered td {
    border: 1px solid #ddd !important;
  }

@font-face {
  font-family: 'Glyphicons Halflings';
  src: url('../components/bootstrap/fonts/glyphicons-halflings-regular.eot');
  src: url('../components/bootstrap/fonts/glyphicons-halflings-regular.eot?#iefix') format('embedded-opentype'), url('../components/bootstrap/fonts/glyphicons-halflings-regular.woff2') format('woff2'), url('../components/bootstrap/fonts/glyphicons-halflings-regular.woff') format('woff'), url('../components/bootstrap/fonts/glyphicons-halflings-regular.ttf') format('truetype'), url('../components/bootstrap/fonts/glyphicons-halflings-regular.svg#glyphicons_halflingsregular') format('svg');
}
.glyphicon {
  position: relative;
  top: 1px;
  display: inline-block;
  font-family: 'Glyphicons Halflings';
  font-style: normal;
  font-weight: normal;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.glyphicon-asterisk:before {
  content: "\002a";
}
.glyphicon-plus:before {
  content: "\002b";
}
.glyphicon-euro:before,
.glyphicon-eur:before {
  content: "\20ac";
}
.glyphicon-minus:before {
  content: "\2212";
}
.glyphicon-cloud:before {
  content: "\2601";
}
.glyphicon-envelope:before {
  content: "\2709";
}
.glyphicon-pencil:before {
  content: "\270f";
}
.glyphicon-glass:before {
  content: "\e001";
}
.glyphicon-music:before {
  content: "\e002";
}
.glyphicon-search:before {
  content: "\e003";
}
.glyphicon-heart:before {
  content: "\e005";
}
.glyphicon-star:before {
  content: "\e006";
}
.glyphicon-star-empty:before {
  content: "\e007";
}
.glyphicon-user:before {
  content: "\e008";
}
.glyphicon-film:before {
  content: "\e009";
}
.glyphicon-th-large:before {
  content: "\e010";
}
.glyphicon-th:before {
  content: "\e011";
}
.glyphicon-th-list:before {
  content: "\e012";
}
.glyphicon-ok:before {
  content: "\e013";
}
.glyphicon-remove:before {
  content: "\e014";
}
.glyphicon-zoom-in:before {
  content: "\e015";
}
.glyphicon-zoom-out:before {
  content: "\e016";
}
.glyphicon-off:before {
  content: "\e017";
}
.glyphicon-signal:before {
  content: "\e018";
}
.glyphicon-cog:before {
  content: "\e019";
}
.glyphicon-trash:before {
  content: "\e020";
}
.glyphicon-home:before {
  content: "\e021";
}
.glyphicon-file:before {
  content: "\e022";
}
.glyphicon-time:before {
  content: "\e023";
}
.glyphicon-road:before {
  content: "\e024";
}
.glyphicon-download-alt:before {
  content: "\e025";
}
.glyphicon-download:before {
  content: "\e026";
}
.glyphicon-upload:before {
  content: "\e027";
}
.glyphicon-inbox:before {
  content: "\e028";
}
.glyphicon-play-circle:before {
  content: "\e029";
}
.glyphicon-repeat:before {
  content: "\e030";
}
.glyphicon-refresh:before {
  content: "\e031";
}
.glyphicon-list-alt:before {
  content: "\e032";
}
.glyphicon-lock:before {
  content: "\e033";
}
.glyphicon-flag:before {
  content: "\e034";
}
.glyphicon-headphones:before {
  content: "\e035";
}
.glyphicon-volume-off:before {
  content: "\e036";
}
.glyphicon-volume-down:before {
  content: "\e037";
}
.glyphicon-volume-up:before {
  content: "\e038";
}
.glyphicon-qrcode:before {
  content: "\e039";
}
.glyphicon-barcode:before {
  content: "\e040";
}
.glyphicon-tag:before {
  content: "\e041";
}
.glyphicon-tags:before {
  content: "\e042";
}
.glyphicon-book:before {
  content: "\e043";
}
.glyphicon-bookmark:before {
  content: "\e044";
}
.glyphicon-print:before {
  content: "\e045";
}
.glyphicon-camera:before {
  content: "\e046";
}
.glyphicon-font:before {
  content: "\e047";
}
.glyphicon-bold:before {
  content: "\e048";
}
.glyphicon-italic:before {
  content: "\e049";
}
.glyphicon-text-height:before {
  content: "\e050";
}
.glyphicon-text-width:before {
  content: "\e051";
}
.glyphicon-align-left:before {
  content: "\e052";
}
.glyphicon-align-center:before {
  content: "\e053";
}
.glyphicon-align-right:before {
  content: "\e054";
}
.glyphicon-align-justify:before {
  content: "\e055";
}
.glyphicon-list:before {
  content: "\e056";
}
.glyphicon-indent-left:before {
  content: "\e057";
}
.glyphicon-indent-right:before {
  content: "\e058";
}
.glyphicon-facetime-video:before {
  content: "\e059";
}
.glyphicon-picture:before {
  content: "\e060";
}
.glyphicon-map-marker:before {
  content: "\e062";
}
.glyphicon-adjust:before {
  content: "\e063";
}
.glyphicon-tint:before {
  content: "\e064";
}
.glyphicon-edit:before {
  content: "\e065";
}
.glyphicon-share:before {
  content: "\e066";
}
.glyphicon-check:before {
  content: "\e067";
}
.glyphicon-move:before {
  content: "\e068";
}
.glyphicon-step-backward:before {
  content: "\e069";
}
.glyphicon-fast-backward:before {
  content: "\e070";
}
.glyphicon-backward:before {
  content: "\e071";
}
.glyphicon-play:before {
  content: "\e072";
}
.glyphicon-pause:before {
  content: "\e073";
}
.glyphicon-stop:before {
  content: "\e074";
}
.glyphicon-forward:before {
  content: "\e075";
}
.glyphicon-fast-forward:before {
  content: "\e076";
}
.glyphicon-step-forward:before {
  content: "\e077";
}
.glyphicon-eject:before {
  content: "\e078";
}
.glyphicon-chevron-left:before {
  content: "\e079";
}
.glyphicon-chevron-right:before {
  content: "\e080";
}
.glyphicon-plus-sign:before {
  content: "\e081";
}
.glyphicon-minus-sign:before {
  content: "\e082";
}
.glyphicon-remove-sign:before {
  content: "\e083";
}
.glyphicon-ok-sign:before {
  content: "\e084";
}
.glyphicon-question-sign:before {
  content: "\e085";
}
.glyphicon-info-sign:before {
  content: "\e086";
}
.glyphicon-screenshot:before {
  content: "\e087";
}
.glyphicon-remove-circle:before {
  content: "\e088";
}
.glyphicon-ok-circle:before {
  content: "\e089";
}
.glyphicon-ban-circle:before {
  content: "\e090";
}
.glyphicon-arrow-left:before {
  content: "\e091";
}
.glyphicon-arrow-right:before {
  content: "\e092";
}
.glyphicon-arrow-up:before {
  content: "\e093";
}
.glyphicon-arrow-down:before {
  content: "\e094";
}
.glyphicon-share-alt:before {
  content: "\e095";
}
.glyphicon-resize-full:before {
  content: "\e096";
}
.glyphicon-resize-small:before {
  content: "\e097";
}
.glyphicon-exclamation-sign:before {
  content: "\e101";
}
.glyphicon-gift:before {
  content: "\e102";
}
.glyphicon-leaf:before {
  content: "\e103";
}
.glyphicon-fire:before {
  content: "\e104";
}
.glyphicon-eye-open:before {
  content: "\e105";
}
.glyphicon-eye-close:before {
  content: "\e106";
}
.glyphicon-warning-sign:before {
  content: "\e107";
}
.glyphicon-plane:before {
  content: "\e108";
}
.glyphicon-calendar:before {
  content: "\e109";
}
.glyphicon-random:before {
  content: "\e110";
}
.glyphicon-comment:before {
  content: "\e111";
}
.glyphicon-magnet:before {
  content: "\e112";
}
.glyphicon-chevron-up:before {
  content: "\e113";
}
.glyphicon-chevron-down:before {
  content: "\e114";
}
.glyphicon-retweet:before {
  content: "\e115";
}
.glyphicon-shopping-cart:before {
  content: "\e116";
}
.glyphicon-folder-close:before {
  content: "\e117";
}
.glyphicon-folder-open:before {
  content: "\e118";
}
.glyphicon-resize-vertical:before {
  content: "\e119";
}
.glyphicon-resize-horizontal:before {
  content: "\e120";
}
.glyphicon-hdd:before {
  content: "\e121";
}
.glyphicon-bullhorn:before {
  content: "\e122";
}
.glyphicon-bell:before {
  content: "\e123";
}
.glyphicon-certificate:before {
  content: "\e124";
}
.glyphicon-thumbs-up:before {
  content: "\e125";
}
.glyphicon-thumbs-down:before {
  content: "\e126";
}
.glyphicon-hand-right:before {
  content: "\e127";
}
.glyphicon-hand-left:before {
  content: "\e128";
}
.glyphicon-hand-up:before {
  content: "\e129";
}
.glyphicon-hand-down:before {
  content: "\e130";
}
.glyphicon-circle-arrow-right:before {
  content: "\e131";
}
.glyphicon-circle-arrow-left:before {
  content: "\e132";
}
.glyphicon-circle-arrow-up:before {
  content: "\e133";
}
.glyphicon-circle-arrow-down:before {
  content: "\e134";
}
.glyphicon-globe:before {
  content: "\e135";
}
.glyphicon-wrench:before {
  content: "\e136";
}
.glyphicon-tasks:before {
  content: "\e137";
}
.glyphicon-filter:before {
  content: "\e138";
}
.glyphicon-briefcase:before {
  content: "\e139";
}
.glyphicon-fullscreen:before {
  content: "\e140";
}
.glyphicon-dashboard:before {
  content: "\e141";
}
.glyphicon-paperclip:before {
  content: "\e142";
}
.glyphicon-heart-empty:before {
  content: "\e143";
}
.glyphicon-link:before {
  content: "\e144";
}
.glyphicon-phone:before {
  content: "\e145";
}
.glyphicon-pushpin:before {
  content: "\e146";
}
.glyphicon-usd:before {
  content: "\e148";
}
.glyphicon-gbp:before {
  content: "\e149";
}
.glyphicon-sort:before {
  content: "\e150";
}
.glyphicon-sort-by-alphabet:before {
  content: "\e151";
}
.glyphicon-sort-by-alphabet-alt:before {
  content: "\e152";
}
.glyphicon-sort-by-order:before {
  content: "\e153";
}
.glyphicon-sort-by-order-alt:before {
  content: "\e154";
}
.glyphicon-sort-by-attributes:before {
  content: "\e155";
}
.glyphicon-sort-by-attributes-alt:before {
  content: "\e156";
}
.glyphicon-unchecked:before {
  content: "\e157";
}
.glyphicon-expand:before {
  content: "\e158";
}
.glyphicon-collapse-down:before {
  content: "\e159";
}
.glyphicon-collapse-up:before {
  content: "\e160";
}
.glyphicon-log-in:before {
  content: "\e161";
}
.glyphicon-flash:before {
  content: "\e162";
}
.glyphicon-log-out:before {
  content: "\e163";
}
.glyphicon-new-window:before {
  content: "\e164";
}
.glyphicon-record:before {
  content: "\e165";
}
.glyphicon-save:before {
  content: "\e166";
}
.glyphicon-open:before {
  content: "\e167";
}
.glyphicon-saved:before {
  content: "\e168";
}
.glyphicon-import:before {
  content: "\e169";
}
.glyphicon-export:before {
  content: "\e170";
}
.glyphicon-send:before {
  content: "\e171";
}
.glyphicon-floppy-disk:before {
  content: "\e172";
}
.glyphicon-floppy-saved:before {
  content: "\e173";
}
.glyphicon-floppy-remove:before {
  content: "\e174";
}
.glyphicon-floppy-save:before {
  content: "\e175";
}
.glyphicon-floppy-open:before {
  content: "\e176";
}
.glyphicon-credit-card:before {
  content: "\e177";
}
.glyphicon-transfer:before {
  content: "\e178";
}
.glyphicon-cutlery:before {
  content: "\e179";
}
.glyphicon-header:before {
  content: "\e180";
}
.glyphicon-compressed:before {
  content: "\e181";
}
.glyphicon-earphone:before {
  content: "\e182";
}
.glyphicon-phone-alt:before {
  content: "\e183";
}
.glyphicon-tower:before {
  content: "\e184";
}
.glyphicon-stats:before {
  content: "\e185";
}
.glyphicon-sd-video:before {
  content: "\e186";
}
.glyphicon-hd-video:before {
  content: "\e187";
}
.glyphicon-subtitles:before {
  content: "\e188";
}
.glyphicon-sound-stereo:before {
  content: "\e189";
}
.glyphicon-sound-dolby:before {
  content: "\e190";
}
.glyphicon-sound-5-1:before {
  content: "\e191";
}
.glyphicon-sound-6-1:before {
  content: "\e192";
}
.glyphicon-sound-7-1:before {
  content: "\e193";
}
.glyphicon-copyright-mark:before {
  content: "\e194";
}
.glyphicon-registration-mark:before {
  content: "\e195";
}
.glyphicon-cloud-download:before {
  content: "\e197";
}
.glyphicon-cloud-upload:before {
  content: "\e198";
}
.glyphicon-tree-conifer:before {
  content: "\e199";
}
.glyphicon-tree-deciduous:before {
  content: "\e200";
}
.glyphicon-cd:before {
  content: "\e201";
}
.glyphicon-save-file:before {
  content: "\e202";
}
.glyphicon-open-file:before {
  content: "\e203";
}
.glyphicon-level-up:before {
  content: "\e204";
}
.glyphicon-copy:before {
  content: "\e205";
}
.glyphicon-paste:before {
  content: "\e206";
}
.glyphicon-alert:before {
  content: "\e209";
}
.glyphicon-equalizer:before {
  content: "\e210";
}
.glyphicon-king:before {
  content: "\e211";
}
.glyphicon-queen:before {
  content: "\e212";
}
.glyphicon-pawn:before {
  content: "\e213";
}
.glyphicon-bishop:before {
  content: "\e214";
}
.glyphicon-knight:before {
  content: "\e215";
}
.glyphicon-baby-formula:before {
  content: "\e216";
}
.glyphicon-tent:before {
  content: "\26fa";
}
.glyphicon-blackboard:before {
  content: "\e218";
}
.glyphicon-bed:before {
  content: "\e219";
}
.glyphicon-apple:before {
  content: "\f8ff";
}
.glyphicon-erase:before {
  content: "\e221";
}
.glyphicon-hourglass:before {
  content: "\231b";
}
.glyphicon-lamp:before {
  content: "\e223";
}
.glyphicon-duplicate:before {
  content: "\e224";
}
.glyphicon-piggy-bank:before {
  content: "\e225";
}
.glyphicon-scissors:before {
  content: "\e226";
}
.glyphicon-bitcoin:before {
  content: "\e227";
}
.glyphicon-btc:before {
  content: "\e227";
}
.glyphicon-xbt:before {
  content: "\e227";
}
.glyphicon-yen:before {
  content: "\00a5";
}
.glyphicon-jpy:before {
  content: "\00a5";
}
.glyphicon-ruble:before {
  content: "\20bd";
}
.glyphicon-rub:before {
  content: "\20bd";
}
.glyphicon-scale:before {
  content: "\e230";
}
.glyphicon-ice-lolly:before {
  content: "\e231";
}
.glyphicon-ice-lolly-tasted:before {
  content: "\e232";
}
.glyphicon-education:before {
  content: "\e233";
}
.glyphicon-option-horizontal:before {
  content: "\e234";
}
.glyphicon-option-vertical:before {
  content: "\e235";
}
.glyphicon-menu-hamburger:before {
  content: "\e236";
}
.glyphicon-modal-window:before {
  content: "\e237";
}
.glyphicon-oil:before {
  content: "\e238";
}
.glyphicon-grain:before {
  content: "\e239";
}
.glyphicon-sunglasses:before {
  content: "\e240";
}
.glyphicon-text-size:before {
  content: "\e241";
}
.glyphicon-text-color:before {
  content: "\e242";
}
.glyphicon-text-background:before {
  content: "\e243";
}
.glyphicon-object-align-top:before {
  content: "\e244";
}
.glyphicon-object-align-bottom:before {
  content: "\e245";
}
.glyphicon-object-align-horizontal:before {
  content: "\e246";
}
.glyphicon-object-align-left:before {
  content: "\e247";
}
.glyphicon-object-align-vertical:before {
  content: "\e248";
}
.glyphicon-object-align-right:before {
  content: "\e249";
}
.glyphicon-triangle-right:before {
  content: "\e250";
}
.glyphicon-triangle-left:before {
  content: "\e251";
}
.glyphicon-triangle-bottom:before {
  content: "\e252";
}
.glyphicon-triangle-top:before {
  content: "\e253";
}
.glyphicon-console:before {
  content: "\e254";
}
.glyphicon-superscript:before {
  content: "\e255";
}
.glyphicon-subscript:before {
  content: "\e256";
}
.glyphicon-menu-left:before {
  content: "\e257";
}
.glyphicon-menu-right:before {
  content: "\e258";
}
.glyphicon-menu-down:before {
  content: "\e259";
}
.glyphicon-menu-up:before {
  content: "\e260";
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
  font-size: 90%;
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
.open > .dropdown-menu {
  display: block;
}
.open > a {
  outline: 0;
}
.dropdown-menu-right {
  left: auto;
  right: 0;
}
.dropdown-menu-left {
  left: 0;
  right: auto;
}
.dropdown-header {
  display: block;
  padding: 3px 20px;
  font-size: 12px;
  line-height: 1.42857143;
  color: #777777;
  white-space: nowrap;
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
.dropup .dropdown-menu,
.navbar-fixed-bottom .dropdown .dropdown-menu {
  top: auto;
  bottom: 100%;
  margin-bottom: 2px;
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
.btn-group .btn + .btn,
.btn-group .btn + .btn-group,
.btn-group .btn-group + .btn,
.btn-group .btn-group + .btn-group {
  margin-left: -1px;
}
.btn-toolbar {
  margin-left: -5px;
}
.btn-toolbar .btn,
.btn-toolbar .btn-group,
.btn-toolbar .input-group {
  float: left;
}
.btn-toolbar > .btn,
.btn-toolbar > .btn-group,
.btn-toolbar > .input-group {
  margin-left: 5px;
}
.btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {
  border-radius: 0;
}
.btn-group > .btn:first-child {
  margin-left: 0;
}
.btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle) {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}
.btn-group > .btn:last-child:not(:first-child),
.btn-group > .dropdown-toggle:not(:first-child) {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.btn-group > .btn-group {
  float: left;
}
.btn-group > .btn-group:not(:first-child):not(:last-child) > .btn {
  border-radius: 0;
}
.btn-group > .btn-group:first-child:not(:last-child) > .btn:last-child,
.btn-group > .btn-group:first-child:not(:last-child) > .dropdown-toggle {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}
.btn-group > .btn-group:last-child:not(:first-child) > .btn:first-child {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.btn-group .dropdown-toggle:active,
.btn-group.open .dropdown-toggle {
  outline: 0;
}
.btn-group > .btn + .dropdown-toggle {
  padding-left: 8px;
  padding-right: 8px;
}
.btn-group > .btn-lg + .dropdown-toggle {
  padding-left: 12px;
  padding-right: 12px;
}
.btn-group.open .dropdown-toggle {
  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
}
.btn-group.open .dropdown-toggle.btn-link {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.btn .caret {
  margin-left: 0;
}
.btn-lg .caret {
  border-width: 5px 5px 0;
  border-bottom-width: 0;
}
.dropup .btn-lg .caret {
  border-width: 0 5px 5px;
}
.btn-group-vertical > .btn,
.btn-group-vertical > .btn-group,
.btn-group-vertical > .btn-group > .btn {
  display: block;
  float: none;
  width: 100%;
  max-width: 100%;
}
.btn-group-vertical > .btn-group > .btn {
  float: none;
}
.btn-group-vertical > .btn + .btn,
.btn-group-vertical > .btn + .btn-group,
.btn-group-vertical > .btn-group + .btn,
.btn-group-vertical > .btn-group + .btn-group {
  margin-top: -1px;
  margin-left: 0;
}
.btn-group-vertical > .btn:not(:first-child):not(:last-child) {
  border-radius: 0;
}
.btn-group-vertical > .btn:first-child:not(:last-child) {
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.btn-group-vertical > .btn:last-child:not(:first-child) {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
}
.btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn {
  border-radius: 0;
}
.btn-group-vertical > .btn-group:first-child:not(:last-child) > .btn:last-child,
.btn-group-vertical > .btn-group:first-child:not(:last-child) > .dropdown-toggle {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.btn-group-vertical > .btn-group:last-child:not(:first-child) > .btn:first-child {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}
.btn-group-justified {
  display: table;
  width: 100%;
  table-layout: fixed;
  border-collapse: separate;
}
.btn-group-justified > .btn,
.btn-group-justified > .btn-group {
  float: none;
  display: table-cell;
  width: 1%;
}
.btn-group-justified > .btn-group .btn {
  width: 100%;
}
.btn-group-justified > .btn-group .dropdown-menu {
  left: auto;
}
[data-toggle="buttons"] > .btn input[type="radio"],
[data-toggle="buttons"] > .btn-group > .btn input[type="radio"],
[data-toggle="buttons"] > .btn input[type="checkbox"],
[data-toggle="buttons"] > .btn-group > .btn input[type="checkbox"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
  pointer-events: none;
}
.input-group {
  position: relative;
  display: table;
  border-collapse: separate;
}
.input-group[class*="col-"] {
  float: none;
  padding-left: 0;
  padding-right: 0;
}
.input-group .form-control {
  position: relative;
  z-index: 2;
  float: left;
  width: 100%;
  margin-bottom: 0;
}
.input-group .form-control:focus {
  z-index: 3;
}
.input-group-lg > .form-control,
.input-group-lg > .input-group-addon,
.input-group-lg > .input-group-btn > .btn {
  height: 45px;
  padding: 10px 16px;
  font-size: 17px;
  line-height: 1.3333333;
  border-radius: 3px;
}
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
<b>First-Visit Monte Carlo(MC) method</b>: estimate \(v_\pi(s)\) as the average of the returns following the first visit to \(s\). An example of first-visit MC prediction algorithm is shown below:
</p>
</body>
</html><p><img src="/images/mc1.png" alt=""></p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h3 id="Implementation-of-Example-5.1-Blackjack">Implementation of Example 5.1 Blackjack<a class="anchor-link" href="#Implementation-of-Example-5.1-Blackjack">&#182;</a></h3><p>The object of the popular casino card game of blackjack is to
obtain cards the sum of whose numerical values is as great as possible without exceeding 21. All face cards count as 10, and an ace can count either as 1 or as 11. We consider
the version in which each player competes independently against the dealer. The game
begins with two cards dealt to both dealer and player. One of the dealer’s cards is face
up and the other is face down. If the player has 21 immediately (an ace and a 10-card),
it is called a natural. He then wins unless the dealer also has a natural, in which case the
game is a draw. If the player does not have a natural, then he can request additional
cards, one by one (<em>hits</em>), until he either stops (<em>sticks</em>) or exceeds 21 (<em>goes bust</em>). If he goes
bust, he loses; if he sticks, then it becomes the dealer’s turn. The dealer hits or sticks
according to a fixed strategy without choice: he sticks on any sum of 17 or greater, and
hits otherwise. If the dealer goes bust, then the player wins; otherwise, the outcome—win,
lose, or draw—is determined by whose final sum is closer to 21.
Playing blackjack is naturally formulated as an episodic finite MDP. Each game of
blackjack is an episode. Rewards of +1, 1, and 0 are given for winning, losing, and
drawing, respectively. All rewards within a game are zero, and we do not discount ($\gamma$= 1);
therefore these terminal rewards are also the returns. The player’s actions are to hit or
to stick. The states depend on the player’s cards and the dealer’s showing card. We
assume that cards are dealt from an infinite deck (i.e., with replacement) so that there is
no advantage to keeping track of the cards already dealt. If the player holds an ace that
he could count as 11 without going bust, then the ace is said to be usable. In this case
it is always counted as 11 because counting it as 1 would make the sum 11 or less, in
which case there is no decision to be made because, obviously, the player should always
hit. Thus, the player makes decisions on the basis of three variables: his current sum
(12–21), the dealer’s one showing card (ace–10), and whether or not he holds a usable
ace. This makes for a total of 200 states.
Consider the policy that sticks if the player’s sum is 20 or 21, and otherwise hits. To
find the state-value function for this policy by a Monte Carlo approach, one simulates
many blackjack games using the policy and averages the returns following each state.
In this way, we obtained the estimates of the state-value function shown in Figure 5.1.
The estimates for states with a usable ace are less certain and less regular because these
states are less common. In any event, after 500,000 games the value function is very well
approximated.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="kn">import</span> <span class="nn">numpy</span> <span class="k">as</span> <span class="nn">np</span>
<span class="kn">import</span> <span class="nn">matplotlib</span>
<span class="kn">import</span> <span class="nn">matplotlib.pyplot</span> <span class="k">as</span> <span class="nn">plt</span>
<span class="o">%</span><span class="k">matplotlib</span> inline
<span class="kn">import</span> <span class="nn">seaborn</span> <span class="k">as</span> <span class="nn">sns</span>
<span class="kn">from</span> <span class="nn">tqdm</span> <span class="kn">import</span> <span class="n">tqdm</span>
<span class="kn">import</span> <span class="nn">warnings</span>
<span class="n">warnings</span><span class="o">.</span><span class="n">filterwarnings</span><span class="p">(</span><span class="s1">&#39;ignore&#39;</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="c1"># actions: hit or stand</span>
<span class="n">ACTION_HIT</span> <span class="o">=</span> <span class="mi">0</span>
<span class="n">ACTION_STAND</span> <span class="o">=</span> <span class="mi">1</span>  <span class="c1">#  &quot;strike&quot; in the book</span>
<span class="n">ACTIONS</span> <span class="o">=</span> <span class="p">[</span><span class="n">ACTION_HIT</span><span class="p">,</span> <span class="n">ACTION_STAND</span><span class="p">]</span>

<span class="c1"># policy for player</span>
<span class="n">POLICY_PLAYER</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">zeros</span><span class="p">(</span><span class="mi">22</span><span class="p">,</span> <span class="n">dtype</span><span class="o">=</span><span class="n">np</span><span class="o">.</span><span class="n">int</span><span class="p">)</span>
<span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="mi">12</span><span class="p">,</span> <span class="mi">20</span><span class="p">):</span>
    <span class="n">POLICY_PLAYER</span><span class="p">[</span><span class="n">i</span><span class="p">]</span> <span class="o">=</span> <span class="n">ACTION_HIT</span>
<span class="n">POLICY_PLAYER</span><span class="p">[</span><span class="mi">20</span><span class="p">]</span> <span class="o">=</span> <span class="n">ACTION_STAND</span>
<span class="n">POLICY_PLAYER</span><span class="p">[</span><span class="mi">21</span><span class="p">]</span> <span class="o">=</span> <span class="n">ACTION_STAND</span>

<span class="c1"># function form of target policy of player</span>
<span class="k">def</span> <span class="nf">target_policy_player</span><span class="p">(</span><span class="n">usable_ace_player</span><span class="p">,</span> <span class="n">player_sum</span><span class="p">,</span> <span class="n">dealer_card</span><span class="p">):</span>
    <span class="k">return</span> <span class="n">POLICY_PLAYER</span><span class="p">[</span><span class="n">player_sum</span><span class="p">]</span>

<span class="c1"># function form of behavior policy of player</span>
<span class="k">def</span> <span class="nf">behavior_policy_player</span><span class="p">(</span><span class="n">usable_ace_player</span><span class="p">,</span> <span class="n">player_sum</span><span class="p">,</span> <span class="n">dealer_card</span><span class="p">):</span>
    <span class="k">if</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">binomial</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="mf">0.5</span><span class="p">)</span> <span class="o">==</span> <span class="mi">1</span><span class="p">:</span>
        <span class="k">return</span> <span class="n">ACTION_STAND</span>
    <span class="k">return</span> <span class="n">ACTION_HIT</span>

<span class="c1"># policy for dealer</span>
<span class="n">POLICY_DEALER</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">zeros</span><span class="p">(</span><span class="mi">22</span><span class="p">)</span>
<span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="mi">12</span><span class="p">,</span> <span class="mi">17</span><span class="p">):</span>
    <span class="n">POLICY_DEALER</span><span class="p">[</span><span class="n">i</span><span class="p">]</span> <span class="o">=</span> <span class="n">ACTION_HIT</span>
<span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="mi">17</span><span class="p">,</span> <span class="mi">22</span><span class="p">):</span>
    <span class="n">POLICY_DEALER</span><span class="p">[</span><span class="n">i</span><span class="p">]</span> <span class="o">=</span> <span class="n">ACTION_STAND</span>
</pre></div>

    </div>
</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="c1"># get a new card</span>
<span class="k">def</span> <span class="nf">get_card</span><span class="p">():</span>
    <span class="n">card</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">randint</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="mi">14</span><span class="p">)</span>
    <span class="n">card</span> <span class="o">=</span> <span class="nb">min</span><span class="p">(</span><span class="n">card</span><span class="p">,</span> <span class="mi">10</span><span class="p">)</span>
    <span class="k">return</span> <span class="n">card</span>

<span class="c1"># get the value of a card (11 for ace).</span>
<span class="k">def</span> <span class="nf">card_value</span><span class="p">(</span><span class="n">card_id</span><span class="p">):</span>
    <span class="k">return</span> <span class="mi">11</span> <span class="k">if</span> <span class="n">card_id</span> <span class="o">==</span> <span class="mi">1</span> <span class="k">else</span> <span class="n">card_id</span>

<span class="c1"># play a game</span>
<span class="c1"># @policy_player: specify policy for player</span>
<span class="c1"># @initial_state: [whether player has a usable Ace, sum of player&#39;s cards, one card of dealer]</span>
<span class="c1"># @initial_action: the initial action</span>
<span class="k">def</span> <span class="nf">play</span><span class="p">(</span><span class="n">policy_player</span><span class="p">,</span> <span class="n">initial_state</span><span class="o">=</span><span class="kc">None</span><span class="p">,</span> <span class="n">initial_action</span><span class="o">=</span><span class="kc">None</span><span class="p">):</span>
    <span class="c1"># player status</span>

    <span class="c1"># sum of player</span>
    <span class="n">player_sum</span> <span class="o">=</span> <span class="mi">0</span>

    <span class="c1"># trajectory of player</span>
    <span class="n">player_trajectory</span> <span class="o">=</span> <span class="p">[]</span>

    <span class="c1"># whether player uses Ace as 11</span>
    <span class="n">usable_ace_player</span> <span class="o">=</span> <span class="kc">False</span>

    <span class="c1"># dealer status</span>
    <span class="n">dealer_card1</span> <span class="o">=</span> <span class="mi">0</span>
    <span class="n">dealer_card2</span> <span class="o">=</span> <span class="mi">0</span>
    <span class="n">usable_ace_dealer</span> <span class="o">=</span> <span class="kc">False</span>

    <span class="k">if</span> <span class="n">initial_state</span> <span class="ow">is</span> <span class="kc">None</span><span class="p">:</span>
        <span class="c1"># generate a random initial state</span>

        <span class="k">while</span> <span class="n">player_sum</span> <span class="o">&lt;</span> <span class="mi">12</span><span class="p">:</span>
            <span class="c1"># if sum of player is less than 12, always hit</span>
            <span class="n">card</span> <span class="o">=</span> <span class="n">get_card</span><span class="p">()</span>
            <span class="n">player_sum</span> <span class="o">+=</span> <span class="n">card_value</span><span class="p">(</span><span class="n">card</span><span class="p">)</span>

            <span class="c1"># If the player&#39;s sum is larger than 21, he may hold one or two aces.</span>
            <span class="k">if</span> <span class="n">player_sum</span> <span class="o">&gt;</span> <span class="mi">21</span><span class="p">:</span>
                <span class="k">assert</span> <span class="n">player_sum</span> <span class="o">==</span> <span class="mi">22</span>
                <span class="c1"># last card must be ace</span>
                <span class="n">player_sum</span> <span class="o">-=</span> <span class="mi">10</span>
            <span class="k">else</span><span class="p">:</span>
                <span class="c1"># usable_ace_player = usable_ace_player | (1 == card)</span>
                <span class="n">usable_ace_player</span> <span class="o">|=</span> <span class="p">(</span><span class="mi">1</span> <span class="o">==</span> <span class="n">card</span><span class="p">)</span>

        <span class="c1"># initialize cards of dealer, suppose dealer will show the first card he gets</span>
        <span class="n">dealer_card1</span> <span class="o">=</span> <span class="n">get_card</span><span class="p">()</span>
        <span class="n">dealer_card2</span> <span class="o">=</span> <span class="n">get_card</span><span class="p">()</span>

    <span class="k">else</span><span class="p">:</span>
        <span class="c1"># use specified initial state</span>
        <span class="n">usable_ace_player</span><span class="p">,</span> <span class="n">player_sum</span><span class="p">,</span> <span class="n">dealer_card1</span> <span class="o">=</span> <span class="n">initial_state</span>
        <span class="n">dealer_card2</span> <span class="o">=</span> <span class="n">get_card</span><span class="p">()</span>

    <span class="c1"># initial state of the game</span>
    <span class="n">state</span> <span class="o">=</span> <span class="p">[</span><span class="n">usable_ace_player</span><span class="p">,</span> <span class="n">player_sum</span><span class="p">,</span> <span class="n">dealer_card1</span><span class="p">]</span>

    <span class="c1"># initialize dealer&#39;s sum</span>
    <span class="n">dealer_sum</span> <span class="o">=</span> <span class="n">card_value</span><span class="p">(</span><span class="n">dealer_card1</span><span class="p">)</span> <span class="o">+</span> <span class="n">card_value</span><span class="p">(</span><span class="n">dealer_card2</span><span class="p">)</span>
    <span class="n">usable_ace_dealer</span> <span class="o">=</span> <span class="mi">1</span> <span class="ow">in</span> <span class="p">(</span><span class="n">dealer_card1</span><span class="p">,</span> <span class="n">dealer_card2</span><span class="p">)</span>
    <span class="c1"># if the dealer&#39;s sum is larger than 21, he must hold two aces.</span>
    <span class="k">if</span> <span class="n">dealer_sum</span> <span class="o">&gt;</span> <span class="mi">21</span><span class="p">:</span>
        <span class="k">assert</span> <span class="n">dealer_sum</span> <span class="o">==</span> <span class="mi">22</span>
        <span class="c1"># use one Ace as 1 rather than 11</span>
        <span class="n">dealer_sum</span> <span class="o">-=</span> <span class="mi">10</span>
    <span class="k">assert</span> <span class="n">dealer_sum</span> <span class="o">&lt;=</span> <span class="mi">21</span>
    <span class="k">assert</span> <span class="n">player_sum</span> <span class="o">&lt;=</span> <span class="mi">21</span>

    <span class="c1"># game starts!</span>

    <span class="c1"># player&#39;s turn</span>
    <span class="k">while</span> <span class="kc">True</span><span class="p">:</span>
        <span class="k">if</span> <span class="n">initial_action</span> <span class="ow">is</span> <span class="ow">not</span> <span class="kc">None</span><span class="p">:</span>
            <span class="n">action</span> <span class="o">=</span> <span class="n">initial_action</span>
            <span class="n">initial_action</span> <span class="o">=</span> <span class="kc">None</span>
        <span class="k">else</span><span class="p">:</span>
            <span class="c1"># get action based on current sum</span>
            <span class="n">action</span> <span class="o">=</span> <span class="n">policy_player</span><span class="p">(</span><span class="n">usable_ace_player</span><span class="p">,</span> <span class="n">player_sum</span><span class="p">,</span> <span class="n">dealer_card1</span><span class="p">)</span>

        <span class="c1"># track player&#39;s trajectory for importance sampling</span>
        <span class="n">player_trajectory</span><span class="o">.</span><span class="n">append</span><span class="p">([(</span><span class="n">usable_ace_player</span><span class="p">,</span> <span class="n">player_sum</span><span class="p">,</span> <span class="n">dealer_card1</span><span class="p">),</span> <span class="n">action</span><span class="p">])</span>

        <span class="k">if</span> <span class="n">action</span> <span class="o">==</span> <span class="n">ACTION_STAND</span><span class="p">:</span>
            <span class="k">break</span>
        <span class="c1"># if hit, get new card</span>
        <span class="n">card</span> <span class="o">=</span> <span class="n">get_card</span><span class="p">()</span>
        <span class="c1"># Keep track of the ace count. the usable_ace_player flag is insufficient alone as it cannot</span>
        <span class="c1"># distinguish between having one ace or two.</span>
        <span class="n">ace_count</span> <span class="o">=</span> <span class="nb">int</span><span class="p">(</span><span class="n">usable_ace_player</span><span class="p">)</span>
        <span class="k">if</span> <span class="n">card</span> <span class="o">==</span> <span class="mi">1</span><span class="p">:</span>
            <span class="n">ace_count</span> <span class="o">+=</span> <span class="mi">1</span>
        <span class="n">player_sum</span> <span class="o">+=</span> <span class="n">card_value</span><span class="p">(</span><span class="n">card</span><span class="p">)</span>
        <span class="c1"># If the player has a usable ace, use it as 1 to avoid busting and continue.</span>
        <span class="k">while</span> <span class="n">player_sum</span> <span class="o">&gt;</span> <span class="mi">21</span> <span class="ow">and</span> <span class="n">ace_count</span><span class="p">:</span>
            <span class="n">player_sum</span> <span class="o">-=</span> <span class="mi">10</span>
            <span class="n">ace_count</span> <span class="o">-=</span> <span class="mi">1</span>
        <span class="c1"># player busts</span>
        <span class="k">if</span> <span class="n">player_sum</span> <span class="o">&gt;</span> <span class="mi">21</span><span class="p">:</span>
            <span class="k">return</span> <span class="n">state</span><span class="p">,</span> <span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="n">player_trajectory</span>
        <span class="k">assert</span> <span class="n">player_sum</span> <span class="o">&lt;=</span> <span class="mi">21</span>
        <span class="n">usable_ace_player</span> <span class="o">=</span> <span class="p">(</span><span class="n">ace_count</span> <span class="o">==</span> <span class="mi">1</span><span class="p">)</span>

    <span class="c1"># dealer&#39;s turn</span>
    <span class="k">while</span> <span class="kc">True</span><span class="p">:</span>
        <span class="c1"># get action based on current sum</span>
        <span class="n">action</span> <span class="o">=</span> <span class="n">POLICY_DEALER</span><span class="p">[</span><span class="n">dealer_sum</span><span class="p">]</span>
        <span class="k">if</span> <span class="n">action</span> <span class="o">==</span> <span class="n">ACTION_STAND</span><span class="p">:</span>
            <span class="k">break</span>
        <span class="c1"># if hit, get a new card</span>
        <span class="n">new_card</span> <span class="o">=</span> <span class="n">get_card</span><span class="p">()</span>
        <span class="n">ace_count</span> <span class="o">=</span> <span class="nb">int</span><span class="p">(</span><span class="n">usable_ace_dealer</span><span class="p">)</span>
        <span class="k">if</span> <span class="n">new_card</span> <span class="o">==</span> <span class="mi">1</span><span class="p">:</span>
            <span class="n">ace_count</span> <span class="o">+=</span> <span class="mi">1</span>
        <span class="n">dealer_sum</span> <span class="o">+=</span> <span class="n">card_value</span><span class="p">(</span><span class="n">new_card</span><span class="p">)</span>
        <span class="c1"># If the dealer has a usable ace, use it as 1 to avoid busting and continue.</span>
        <span class="k">while</span> <span class="n">dealer_sum</span> <span class="o">&gt;</span> <span class="mi">21</span> <span class="ow">and</span> <span class="n">ace_count</span><span class="p">:</span>
            <span class="n">dealer_sum</span> <span class="o">-=</span> <span class="mi">10</span>
            <span class="n">ace_count</span> <span class="o">-=</span> <span class="mi">1</span>
        <span class="c1"># dealer busts</span>
        <span class="k">if</span> <span class="n">dealer_sum</span> <span class="o">&gt;</span> <span class="mi">21</span><span class="p">:</span>
            <span class="k">return</span> <span class="n">state</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="n">player_trajectory</span>
        <span class="n">usable_ace_dealer</span> <span class="o">=</span> <span class="p">(</span><span class="n">ace_count</span> <span class="o">==</span> <span class="mi">1</span><span class="p">)</span>

    <span class="c1"># compare the sum between player and dealer</span>
    <span class="k">assert</span> <span class="n">player_sum</span> <span class="o">&lt;=</span> <span class="mi">21</span> <span class="ow">and</span> <span class="n">dealer_sum</span> <span class="o">&lt;=</span> <span class="mi">21</span>
    <span class="k">if</span> <span class="n">player_sum</span> <span class="o">&gt;</span> <span class="n">dealer_sum</span><span class="p">:</span>
        <span class="k">return</span> <span class="n">state</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="n">player_trajectory</span>
    <span class="k">elif</span> <span class="n">player_sum</span> <span class="o">==</span> <span class="n">dealer_sum</span><span class="p">:</span>
        <span class="k">return</span> <span class="n">state</span><span class="p">,</span> <span class="mi">0</span><span class="p">,</span> <span class="n">player_trajectory</span>
    <span class="k">else</span><span class="p">:</span>
        <span class="k">return</span> <span class="n">state</span><span class="p">,</span> <span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="n">player_trajectory</span>
</pre></div>

    </div>
</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="c1"># Monte Carlo Sample with On-Policy</span>
<span class="k">def</span> <span class="nf">monte_carlo_on_policy</span><span class="p">(</span><span class="n">episodes</span><span class="p">):</span>
    <span class="n">states_usable_ace</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">zeros</span><span class="p">((</span><span class="mi">10</span><span class="p">,</span> <span class="mi">10</span><span class="p">))</span>
    <span class="c1"># initialze counts to 1 to avoid 0 being divided</span>
    <span class="n">states_usable_ace_count</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">ones</span><span class="p">((</span><span class="mi">10</span><span class="p">,</span> <span class="mi">10</span><span class="p">))</span>
    <span class="n">states_no_usable_ace</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">zeros</span><span class="p">((</span><span class="mi">10</span><span class="p">,</span> <span class="mi">10</span><span class="p">))</span>
    <span class="c1"># initialze counts to 1 to avoid 0 being divided</span>
    <span class="n">states_no_usable_ace_count</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">ones</span><span class="p">((</span><span class="mi">10</span><span class="p">,</span> <span class="mi">10</span><span class="p">))</span>
    <span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="n">tqdm</span><span class="p">(</span><span class="nb">range</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="n">episodes</span><span class="p">)):</span>
        <span class="n">_</span><span class="p">,</span> <span class="n">reward</span><span class="p">,</span> <span class="n">player_trajectory</span> <span class="o">=</span> <span class="n">play</span><span class="p">(</span><span class="n">target_policy_player</span><span class="p">)</span>
        <span class="k">for</span> <span class="p">(</span><span class="n">usable_ace</span><span class="p">,</span> <span class="n">player_sum</span><span class="p">,</span> <span class="n">dealer_card</span><span class="p">),</span> <span class="n">_</span> <span class="ow">in</span> <span class="n">player_trajectory</span><span class="p">:</span>
            <span class="n">player_sum</span> <span class="o">-=</span> <span class="mi">12</span>
            <span class="n">dealer_card</span> <span class="o">-=</span> <span class="mi">1</span>
            <span class="k">if</span> <span class="n">usable_ace</span><span class="p">:</span>
                <span class="n">states_usable_ace_count</span><span class="p">[</span><span class="n">player_sum</span><span class="p">,</span> <span class="n">dealer_card</span><span class="p">]</span> <span class="o">+=</span> <span class="mi">1</span>
                <span class="n">states_usable_ace</span><span class="p">[</span><span class="n">player_sum</span><span class="p">,</span> <span class="n">dealer_card</span><span class="p">]</span> <span class="o">+=</span> <span class="n">reward</span>
            <span class="k">else</span><span class="p">:</span>
                <span class="n">states_no_usable_ace_count</span><span class="p">[</span><span class="n">player_sum</span><span class="p">,</span> <span class="n">dealer_card</span><span class="p">]</span> <span class="o">+=</span> <span class="mi">1</span>
                <span class="n">states_no_usable_ace</span><span class="p">[</span><span class="n">player_sum</span><span class="p">,</span> <span class="n">dealer_card</span><span class="p">]</span> <span class="o">+=</span> <span class="n">reward</span>
    <span class="k">return</span> <span class="n">states_usable_ace</span> <span class="o">/</span> <span class="n">states_usable_ace_count</span><span class="p">,</span> <span class="n">states_no_usable_ace</span> <span class="o">/</span> <span class="n">states_no_usable_ace_count</span>
</pre></div>

    </div>
</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="k">def</span> <span class="nf">figure_5_1</span><span class="p">():</span>
    <span class="n">states_usable_ace_1</span><span class="p">,</span> <span class="n">states_no_usable_ace_1</span> <span class="o">=</span> <span class="n">monte_carlo_on_policy</span><span class="p">(</span><span class="mi">10000</span><span class="p">)</span>
    <span class="n">states_usable_ace_2</span><span class="p">,</span> <span class="n">states_no_usable_ace_2</span> <span class="o">=</span> <span class="n">monte_carlo_on_policy</span><span class="p">(</span><span class="mi">500000</span><span class="p">)</span>

    <span class="n">states</span> <span class="o">=</span> <span class="p">[</span><span class="n">states_usable_ace_1</span><span class="p">,</span>
              <span class="n">states_usable_ace_2</span><span class="p">,</span>
              <span class="n">states_no_usable_ace_1</span><span class="p">,</span>
              <span class="n">states_no_usable_ace_2</span><span class="p">]</span>

    <span class="n">titles</span> <span class="o">=</span> <span class="p">[</span><span class="s1">&#39;Usable Ace, 10000 Episodes&#39;</span><span class="p">,</span>
              <span class="s1">&#39;Usable Ace, 500000 Episodes&#39;</span><span class="p">,</span>
              <span class="s1">&#39;No Usable Ace, 10000 Episodes&#39;</span><span class="p">,</span>
              <span class="s1">&#39;No Usable Ace, 500000 Episodes&#39;</span><span class="p">]</span>

    <span class="n">_</span><span class="p">,</span> <span class="n">axes</span> <span class="o">=</span> <span class="n">plt</span><span class="o">.</span><span class="n">subplots</span><span class="p">(</span><span class="mi">2</span><span class="p">,</span> <span class="mi">2</span><span class="p">,</span> <span class="n">figsize</span><span class="o">=</span><span class="p">(</span><span class="mi">40</span><span class="p">,</span> <span class="mi">30</span><span class="p">))</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">subplots_adjust</span><span class="p">(</span><span class="n">wspace</span><span class="o">=</span><span class="mf">0.1</span><span class="p">,</span> <span class="n">hspace</span><span class="o">=</span><span class="mf">0.2</span><span class="p">)</span>
    <span class="n">axes</span> <span class="o">=</span> <span class="n">axes</span><span class="o">.</span><span class="n">flatten</span><span class="p">()</span>

    <span class="k">for</span> <span class="n">state</span><span class="p">,</span> <span class="n">title</span><span class="p">,</span> <span class="n">axis</span> <span class="ow">in</span> <span class="nb">zip</span><span class="p">(</span><span class="n">states</span><span class="p">,</span> <span class="n">titles</span><span class="p">,</span> <span class="n">axes</span><span class="p">):</span>
        <span class="n">fig</span> <span class="o">=</span> <span class="n">sns</span><span class="o">.</span><span class="n">heatmap</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">flipud</span><span class="p">(</span><span class="n">state</span><span class="p">),</span> <span class="n">cmap</span><span class="o">=</span><span class="s2">&quot;YlGnBu&quot;</span><span class="p">,</span> <span class="n">ax</span><span class="o">=</span><span class="n">axis</span><span class="p">,</span> <span class="n">xticklabels</span><span class="o">=</span><span class="nb">range</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="mi">11</span><span class="p">),</span>
                          <span class="n">yticklabels</span><span class="o">=</span><span class="nb">list</span><span class="p">(</span><span class="nb">reversed</span><span class="p">(</span><span class="nb">range</span><span class="p">(</span><span class="mi">12</span><span class="p">,</span> <span class="mi">22</span><span class="p">))))</span>
        <span class="n">fig</span><span class="o">.</span><span class="n">set_ylabel</span><span class="p">(</span><span class="s1">&#39;player sum&#39;</span><span class="p">,</span> <span class="n">fontsize</span><span class="o">=</span><span class="mi">30</span><span class="p">)</span>
        <span class="n">fig</span><span class="o">.</span><span class="n">set_xlabel</span><span class="p">(</span><span class="s1">&#39;dealer showing&#39;</span><span class="p">,</span> <span class="n">fontsize</span><span class="o">=</span><span class="mi">30</span><span class="p">)</span>
        <span class="n">fig</span><span class="o">.</span><span class="n">set_title</span><span class="p">(</span><span class="n">title</span><span class="p">,</span> <span class="n">fontsize</span><span class="o">=</span><span class="mi">30</span><span class="p">)</span>

    <span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">()</span>

<span class="n">figure_5_1</span><span class="p">()</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stderr output_text">
<pre>100%|██████████| 10000/10000 [00:00&lt;00:00, 48228.52it/s]
100%|██████████| 500000/500000 [00:09&lt;00:00, 53947.10it/s]
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
</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p><img src="/images/mc2.png" alt=""></p>
<p>To be efficient and prevent calculating the average every time, we could let $counts(S_t, A_t)\leftarrow counts(S_t, A_t)+1$ and $\displaystyle Q(S_t, A_t)\leftarrow Q(S_t, A_t)+\frac{G-Q(S_t, A_t)}{counts(S_t, A_t)}$ by the update rule in the chapter 2.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h3 id="Solving-the-Blackjack">Solving the Blackjack<a class="anchor-link" href="#Solving-the-Blackjack">&#182;</a></h3><p>To find the optimal policy:</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="c1"># Monte Carlo with Exploring Starts</span>
<span class="k">def</span> <span class="nf">monte_carlo_es</span><span class="p">(</span><span class="n">episodes</span><span class="p">):</span>
    <span class="c1"># (playerSum, dealerCard, usableAce, action)</span>
    <span class="n">state_action_values</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">zeros</span><span class="p">((</span><span class="mi">10</span><span class="p">,</span> <span class="mi">10</span><span class="p">,</span> <span class="mi">2</span><span class="p">,</span> <span class="mi">2</span><span class="p">))</span>
    <span class="c1"># initialze counts to 1 to avoid division by 0</span>
    <span class="n">state_action_pair_count</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">ones</span><span class="p">((</span><span class="mi">10</span><span class="p">,</span> <span class="mi">10</span><span class="p">,</span> <span class="mi">2</span><span class="p">,</span> <span class="mi">2</span><span class="p">))</span>

    <span class="c1"># behavior policy is greedy</span>
    <span class="k">def</span> <span class="nf">behavior_policy</span><span class="p">(</span><span class="n">usable_ace</span><span class="p">,</span> <span class="n">player_sum</span><span class="p">,</span> <span class="n">dealer_card</span><span class="p">):</span>
        <span class="n">usable_ace</span> <span class="o">=</span> <span class="nb">int</span><span class="p">(</span><span class="n">usable_ace</span><span class="p">)</span>
        <span class="n">player_sum</span> <span class="o">-=</span> <span class="mi">12</span>
        <span class="n">dealer_card</span> <span class="o">-=</span> <span class="mi">1</span>
        <span class="c1"># get argmax of the average returns(s, a)</span>
        <span class="n">values_</span> <span class="o">=</span> <span class="n">state_action_values</span><span class="p">[</span><span class="n">player_sum</span><span class="p">,</span> <span class="n">dealer_card</span><span class="p">,</span> <span class="n">usable_ace</span><span class="p">,</span> <span class="p">:]</span> <span class="o">/</span> \
                  <span class="n">state_action_pair_count</span><span class="p">[</span><span class="n">player_sum</span><span class="p">,</span> <span class="n">dealer_card</span><span class="p">,</span> <span class="n">usable_ace</span><span class="p">,</span> <span class="p">:]</span>
        <span class="k">return</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">choice</span><span class="p">([</span><span class="n">action_</span> <span class="k">for</span> <span class="n">action_</span><span class="p">,</span> <span class="n">value_</span> <span class="ow">in</span> <span class="nb">enumerate</span><span class="p">(</span><span class="n">values_</span><span class="p">)</span> <span class="k">if</span> <span class="n">value_</span> <span class="o">==</span> <span class="n">np</span><span class="o">.</span><span class="n">max</span><span class="p">(</span><span class="n">values_</span><span class="p">)])</span>

    <span class="c1"># play for several episodes</span>
    <span class="k">for</span> <span class="n">episode</span> <span class="ow">in</span> <span class="n">tqdm</span><span class="p">(</span><span class="nb">range</span><span class="p">(</span><span class="n">episodes</span><span class="p">)):</span>
        <span class="c1"># for each episode, use a randomly initialized state and action</span>
        <span class="n">initial_state</span> <span class="o">=</span> <span class="p">[</span><span class="nb">bool</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">choice</span><span class="p">([</span><span class="mi">0</span><span class="p">,</span> <span class="mi">1</span><span class="p">])),</span>
                       <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">choice</span><span class="p">(</span><span class="nb">range</span><span class="p">(</span><span class="mi">12</span><span class="p">,</span> <span class="mi">22</span><span class="p">)),</span>
                       <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">choice</span><span class="p">(</span><span class="nb">range</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="mi">11</span><span class="p">))]</span>
        <span class="n">initial_action</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">choice</span><span class="p">(</span><span class="n">ACTIONS</span><span class="p">)</span>
        <span class="n">current_policy</span> <span class="o">=</span> <span class="n">behavior_policy</span> <span class="k">if</span> <span class="n">episode</span> <span class="k">else</span> <span class="n">target_policy_player</span>
        <span class="n">_</span><span class="p">,</span> <span class="n">reward</span><span class="p">,</span> <span class="n">trajectory</span> <span class="o">=</span> <span class="n">play</span><span class="p">(</span><span class="n">current_policy</span><span class="p">,</span> <span class="n">initial_state</span><span class="p">,</span> <span class="n">initial_action</span><span class="p">)</span>
        <span class="n">first_visit_check</span> <span class="o">=</span> <span class="nb">set</span><span class="p">()</span>
        <span class="k">for</span> <span class="p">(</span><span class="n">usable_ace</span><span class="p">,</span> <span class="n">player_sum</span><span class="p">,</span> <span class="n">dealer_card</span><span class="p">),</span> <span class="n">action</span> <span class="ow">in</span> <span class="n">trajectory</span><span class="p">:</span>
            <span class="n">usable_ace</span> <span class="o">=</span> <span class="nb">int</span><span class="p">(</span><span class="n">usable_ace</span><span class="p">)</span>
            <span class="n">player_sum</span> <span class="o">-=</span> <span class="mi">12</span>
            <span class="n">dealer_card</span> <span class="o">-=</span> <span class="mi">1</span>
            <span class="n">state_action</span> <span class="o">=</span> <span class="p">(</span><span class="n">usable_ace</span><span class="p">,</span> <span class="n">player_sum</span><span class="p">,</span> <span class="n">dealer_card</span><span class="p">,</span> <span class="n">action</span><span class="p">)</span>
            <span class="k">if</span> <span class="n">state_action</span> <span class="ow">in</span> <span class="n">first_visit_check</span><span class="p">:</span>
                <span class="k">continue</span>
            <span class="n">first_visit_check</span><span class="o">.</span><span class="n">add</span><span class="p">(</span><span class="n">state_action</span><span class="p">)</span>
            <span class="c1"># update values of state-action pairs</span>
            <span class="n">state_action_values</span><span class="p">[</span><span class="n">player_sum</span><span class="p">,</span> <span class="n">dealer_card</span><span class="p">,</span> <span class="n">usable_ace</span><span class="p">,</span> <span class="n">action</span><span class="p">]</span> <span class="o">+=</span> <span class="n">reward</span>
            <span class="n">state_action_pair_count</span><span class="p">[</span><span class="n">player_sum</span><span class="p">,</span> <span class="n">dealer_card</span><span class="p">,</span> <span class="n">usable_ace</span><span class="p">,</span> <span class="n">action</span><span class="p">]</span> <span class="o">+=</span> <span class="mi">1</span>

    <span class="k">return</span> <span class="n">state_action_values</span> <span class="o">/</span> <span class="n">state_action_pair_count</span>
</pre></div>

    </div>
</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="k">def</span> <span class="nf">figure_5_2</span><span class="p">():</span>
    <span class="n">state_action_values</span> <span class="o">=</span> <span class="n">monte_carlo_es</span><span class="p">(</span><span class="mi">500000</span><span class="p">)</span>

    <span class="n">state_value_no_usable_ace</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">max</span><span class="p">(</span><span class="n">state_action_values</span><span class="p">[:,</span> <span class="p">:,</span> <span class="mi">0</span><span class="p">,</span> <span class="p">:],</span> <span class="n">axis</span><span class="o">=-</span><span class="mi">1</span><span class="p">)</span>
    <span class="n">state_value_usable_ace</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">max</span><span class="p">(</span><span class="n">state_action_values</span><span class="p">[:,</span> <span class="p">:,</span> <span class="mi">1</span><span class="p">,</span> <span class="p">:],</span> <span class="n">axis</span><span class="o">=-</span><span class="mi">1</span><span class="p">)</span>

    <span class="c1"># get the optimal policy</span>
    <span class="n">action_no_usable_ace</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">argmax</span><span class="p">(</span><span class="n">state_action_values</span><span class="p">[:,</span> <span class="p">:,</span> <span class="mi">0</span><span class="p">,</span> <span class="p">:],</span> <span class="n">axis</span><span class="o">=-</span><span class="mi">1</span><span class="p">)</span>
    <span class="n">action_usable_ace</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">argmax</span><span class="p">(</span><span class="n">state_action_values</span><span class="p">[:,</span> <span class="p">:,</span> <span class="mi">1</span><span class="p">,</span> <span class="p">:],</span> <span class="n">axis</span><span class="o">=-</span><span class="mi">1</span><span class="p">)</span>

    <span class="n">images</span> <span class="o">=</span> <span class="p">[</span><span class="n">action_usable_ace</span><span class="p">,</span>
              <span class="n">state_value_usable_ace</span><span class="p">,</span>
              <span class="n">action_no_usable_ace</span><span class="p">,</span>
              <span class="n">state_value_no_usable_ace</span><span class="p">]</span>

    <span class="n">titles</span> <span class="o">=</span> <span class="p">[</span><span class="s1">&#39;Optimal policy with usable Ace&#39;</span><span class="p">,</span>
              <span class="s1">&#39;Optimal value with usable Ace&#39;</span><span class="p">,</span>
              <span class="s1">&#39;Optimal policy without usable Ace&#39;</span><span class="p">,</span>
              <span class="s1">&#39;Optimal value without usable Ace&#39;</span><span class="p">]</span>

    <span class="n">_</span><span class="p">,</span> <span class="n">axes</span> <span class="o">=</span> <span class="n">plt</span><span class="o">.</span><span class="n">subplots</span><span class="p">(</span><span class="mi">2</span><span class="p">,</span> <span class="mi">2</span><span class="p">,</span> <span class="n">figsize</span><span class="o">=</span><span class="p">(</span><span class="mi">40</span><span class="p">,</span> <span class="mi">30</span><span class="p">))</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">subplots_adjust</span><span class="p">(</span><span class="n">wspace</span><span class="o">=</span><span class="mf">0.1</span><span class="p">,</span> <span class="n">hspace</span><span class="o">=</span><span class="mf">0.2</span><span class="p">)</span>
    <span class="n">axes</span> <span class="o">=</span> <span class="n">axes</span><span class="o">.</span><span class="n">flatten</span><span class="p">()</span>

    <span class="k">for</span> <span class="n">image</span><span class="p">,</span> <span class="n">title</span><span class="p">,</span> <span class="n">axis</span> <span class="ow">in</span> <span class="nb">zip</span><span class="p">(</span><span class="n">images</span><span class="p">,</span> <span class="n">titles</span><span class="p">,</span> <span class="n">axes</span><span class="p">):</span>
        <span class="n">fig</span> <span class="o">=</span> <span class="n">sns</span><span class="o">.</span><span class="n">heatmap</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">flipud</span><span class="p">(</span><span class="n">image</span><span class="p">),</span> <span class="n">cmap</span><span class="o">=</span><span class="s2">&quot;YlGnBu&quot;</span><span class="p">,</span> <span class="n">ax</span><span class="o">=</span><span class="n">axis</span><span class="p">,</span> <span class="n">xticklabels</span><span class="o">=</span><span class="nb">range</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="mi">11</span><span class="p">),</span>
                          <span class="n">yticklabels</span><span class="o">=</span><span class="nb">list</span><span class="p">(</span><span class="nb">reversed</span><span class="p">(</span><span class="nb">range</span><span class="p">(</span><span class="mi">12</span><span class="p">,</span> <span class="mi">22</span><span class="p">))))</span>
        <span class="n">fig</span><span class="o">.</span><span class="n">set_ylabel</span><span class="p">(</span><span class="s1">&#39;player sum&#39;</span><span class="p">,</span> <span class="n">fontsize</span><span class="o">=</span><span class="mi">30</span><span class="p">)</span>
        <span class="n">fig</span><span class="o">.</span><span class="n">set_xlabel</span><span class="p">(</span><span class="s1">&#39;dealer showing&#39;</span><span class="p">,</span> <span class="n">fontsize</span><span class="o">=</span><span class="mi">30</span><span class="p">)</span>
        <span class="n">fig</span><span class="o">.</span><span class="n">set_title</span><span class="p">(</span><span class="n">title</span><span class="p">,</span> <span class="n">fontsize</span><span class="o">=</span><span class="mi">30</span><span class="p">)</span>

    <span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">()</span>

<span class="n">figure_5_2</span><span class="p">()</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stderr output_text">
<pre>100%|██████████| 500000/500000 [00:41&lt;00:00, 11912.12it/s]
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
<h3 id="Monte-Carlo-Control-without-Exploring-Starts">Monte Carlo Control without Exploring Starts<a class="anchor-link" href="#Monte-Carlo-Control-without-Exploring-Starts">&#182;</a></h3>
</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
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
Due to the limitation of the exploration start(e.g. when the agent needs to interact with the environment), <i>Monte Carlo control without exploring starts</i> is introduced next.<br>
<i>on-policy</i>: evaluate and improve the \(\pi\) that is used;<br>
<i>off-policy</i>: evaluate and improve the \(\pi\) that used to;<br>
Then, MC is on-policy. Define "<i>soft</i>": \(\pi(a|s)>0, \forall s\in\mathcal{S}, a\in\mathcal{A}(s)\), but gradually shifted closer and closer to a deterministic
optimal policy
<br>
<i>\(\epsilon\)-soft greedy:</i> 
\[\pi^{\prime}(a | s)=\left\{\begin{array}{ll}
\frac{\varepsilon}{|\mathcal{A}(s)|} & , \mathbb{P} = \epsilon, \text{non-greedy}
 \\
    1-\varepsilon-\frac{\varepsilon}{|\mathcal{A}(s)|} & ,  \mathbb{P} =1- \epsilon, \text{greedy}
\end{array}\right.\]
Then the on-policy first-visit MC control for \(\epsilon\)-soft policies is shown below:
</p>
</body>
</html><p><img src="/images/mc3.png" alt=""></p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>GPI model requires "becoming greedy" gradually, and from the algorithm above, $\epsilon-$soft policy would become $\epsilon-$greedy policy, and by policy improvement theorem, we can see that greedy method indeed improve the $\epsilon-$soft policy.</p>
<p><em>Proof:</em></p>
<p>Let the original $\epsilon-$soft policy $\pi$, with probability distribution:</p>
<p>$\pi\left(a_{i} \mid s\right)=\left\{\begin{array}{ll}\frac{\varepsilon}{|\mathcal{A}(s)|}+\delta_{i} &amp; , a_{i} \neq a_{*} \\ 1-\frac{(|\mathcal{A}(s)|-1) \varepsilon}{|\mathcal{A}(s)|}-\sum_{a_{i} \neq a_{*}} \delta_{i} &amp; , a_{i}=a_{*}\end{array}\right.$</p>
<p>Then,</p>
<p>$\begin{aligned} q_{\pi}(s, \pi^{\prime}) &amp;=\sum_{a} \pi^{\prime}(a \mid s) q_{\pi}(s, a) \\ 
&amp;=\frac{\varepsilon}{|\mathcal{A}(s)|} \sum_{a} q_{\pi}(s, a)+(1-\varepsilon) \max _{a} q_{\pi}(s, a) \\
&amp;\geq \frac{\varepsilon}{|\mathcal{A}(s)|} \sum_{a} q_{\pi}(s, a)+(1-\varepsilon) \sum_{a} \frac{\pi(a \mid s)-\frac{\varepsilon}{|\mathcal{A}(s)|}}{1-\varepsilon} q_{\pi}(s, a) \\
&amp;=\frac{\varepsilon}{|\mathcal{A}(s)|} \sum_{a} q_{\pi}(s, a)-\frac{\varepsilon}{|\mathcal{A}(s)|} \sum_{a} q_{\pi}(s, a)+\sum_{a} \pi(a \mid s) q_{\pi}(s, a) \\
&amp;=v_{\pi}(s)\end{aligned}$</p>
<p>To prove that $\max _{a} q_{\pi}(s, a) \geq \displaystyle\sum_{a} \frac{\pi(a \mid s)-\frac{\varepsilon}{|\mathcal{A}(s)|}}{1-\varepsilon} q_{\pi}(s, a)$, let $M = \max _{a} q_{\pi}(s, a) $, and,</p>
<p>$\begin{array}{l}
\displaystyle\sum_{a} \frac{\pi(a \mid s)-\frac{\varepsilon}{|\mathcal{A}(s)|}}{1-\varepsilon} q_{\pi}(s, a) \\
=\displaystyle\frac{\pi\left(a_{*} \mid s\right)-\frac{\varepsilon}{|\mathcal{A}(s)|}}{1-\varepsilon} M+\sum_{a_{i} \neq a_{*}} \frac{\pi\left(a_{i} \mid s\right)-\frac{\varepsilon}{|\mathcal{A}(s)|}}{1-\varepsilon} q_{\pi}\left(s, a_{i}\right) \\
=\displaystyle\frac{1-\frac{(|\mathcal{A}(s)|-1) \varepsilon}{|\mathcal{A}(s)|}-\sum_{a_{i} \neq a_{*}} \delta_{i}-\frac{\varepsilon}{|\mathcal{A}(s)|}}{1-\varepsilon} M+\sum_{a_{i} \neq a_{*}} \frac{\delta_{i}}{1-\varepsilon} q_{\pi}\left(s, a_{i}\right) \\
=\displaystyle\frac{1-\varepsilon}{1-\varepsilon} M-\frac{1}{1-\varepsilon} \sum_{a_{i} \neq a_{*}} \delta_{i} M+\frac{1}{1-\varepsilon} \sum_{a_{i} \neq a_{*}} \delta_{i} q_{\pi}\left(s, a_{i}\right) \\
=M-\frac{\sum_{a_{i} \neq a_{*}} \delta_{i}}{1-\varepsilon}\left(M-q_{\pi}\left(s, a_{i}\right)\right) \\
\leq M=\max _{a} q_{\pi}(s, a)
\end{array}$</p>
<p>And then by theorem, $v_{\pi^\prime} (s)\geq v_\pi(s)$</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h3 id="Off-policy-Prediction-via-Importance-Sampling">Off-policy Prediction via Importance Sampling<a class="anchor-link" href="#Off-policy-Prediction-via-Importance-Sampling">&#182;</a></h3>
</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Learning control method Dillema: They seek to learn action values conditional
on subsequent optimal behavior, but they need to behave non-optimally in order to
explore all actions (to find the optimal actions).</p>
<p>The on-policy approach in the
preceding section is actually a compromise—it learns action values not for the optimal
policy, but for a near-optimal policy that still explores. A more straightforward approach
is to use two policies, one that is learned about and that becomes the optimal policy, and
one that is more exploratory and is used to generate behavior. The policy being learned
about is called the <em>target policy</em>, and the policy used to generate behavior is called the
<em>behavior policy</em>. In this case we say that learning is from data “off” the target policy, and
the overall process is termed <em>off-policy learning</em>. Off-policy include on-policy methods
as the special case in which the target and behavior policies are the same. Off-policy learning is also seen by some as key to learning multi-step predictive models of the world’s dynamics(Section 17.2).</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>In this section we begin the study of off-policy methods by considering the prediction problem, in which both target and behavior policies are fixed. That is, suppose we wish to estimate $v_{\pi}$ or $q_{\pi}$, but all we have are episodes following another policy $b$, where $b \neq \pi .$ In this case, $\pi$ is the target policy, $b$ is the behavior policy, and both policies are considered fixed and given.</p>
<p>Almost all off-policy methods utilize <em>importance sampling</em>, a general technique for
estimating expected values under one distribution given samples from another.</p>
<p>As:</p>
<p>$\begin{aligned}
\mathbb{E}_{f}[x] &amp;=\int x f(x) \mathrm{d} x \\
&amp;=\int \frac{x f(x)}{g(x)} g(x) \mathrm{d} x \\
&amp;=\mathbb{E}_{g}\left[\frac{f(x)}{g(x)} x\right]
\end{aligned}$</p>
<p>Then, $\displaystyle\rho=\frac{f(x)}{g(x)}$ is importance sampling ratio. Then, consider the given State condition,</p>
<p>$\begin{aligned} \mathbb{E}_{f}[x \mid S=s] &amp;=\int x f(x \mid s) \mathrm{d} x \\ &amp;=\int x \frac{f(x \mid s)}{g(x \mid s)} g(x \mid s) \mathrm{d} x \\ &amp;=\mathbb{E}_{g}\left[x \frac{f(x \mid s)}{g(x \mid s)} \mid S=s\right] \\ &amp;=\mathbb{E}_{g}[\rho x \mid S=s] \end{aligned}$</p>
<p>And,</p>
<p>$\begin{array}{l}
\mathrm{P}_{\pi}\left\{A_{t}, S_{t+1}, A_{t+1}, \ldots, S_{T} \mid S_{t}\right\} \\
=\pi\left(A_{t} \mid S_{t}\right) p\left(S_{t+1} \mid S_{t}, A_{t}\right) \pi\left(A_{t+1} \mid S_{t+1}\right) \cdots p\left(S_{T} \mid S_{T-1}, A_{T-1}\right) \\
=\prod_{k=t}^{T-1} \pi\left(A_{k} \mid S_{k}\right) p\left(S_{k+1} \mid S_{k}, A_{k}\right) \\
\mathrm{P}_{b}\left\{A_{t}, S_{t+1}, A_{t+1}, \ldots, S_{T} \mid S_{t}\right\} \\
=b\left(A_{t} \mid S_{t}\right) p\left(S_{t+1} \mid S_{t}, A_{t}\right) b\left(A_{t+1} \mid S_{t+1}\right) \cdots p\left(S_{T} \mid S_{T-1}, A_{T-1}\right) \\
=\prod_{k=t}^{T-1} b\left(A_{k} \mid S_{k}\right) p\left(S_{k+1} \mid S_{k}, A_{k}\right)
\end{array}$</p>
<p>Then the importance sampling ratio can be calculated as:</p>
<p>$\begin{aligned}
\rho_{t: T-1} &amp; \doteq \frac{\mathrm{P}_{\pi}\left\{A_{t}, S_{t+1}, A_{t+1}, \ldots, S_{T} \mid S_{t}\right\}}{\mathrm{P}_{b}\left\{A_{t}, S_{t+1}, A_{t+1}, \ldots, S_{T} \mid S_{t}\right\}} \\
&amp;=\frac{\prod_{k=t}^{T-1} \pi\left(A_{k+1} \mid S_{k}\right) p\left(S_{k+1} \mid S_{k}, A_{k+1}\right)}{\prod_{k=t}^{T-1} b\left(A_{k+1} \mid S_{k}\right) p\left(S_{k+1} \mid S_{k}, A_{k+1}\right)} \\
&amp;=\prod_{k=t}^{T-1} \frac{\pi\left(A_{k+1} \mid S_{k}\right)}{b\left(A_{k+1} \mid S_{k}\right)}
\end{aligned}$</p>
<p>Note that this is not dependent on the transition probability defined on MDP.</p>
<p>Finally, we could have the equation for the value function: $\begin{aligned} v_{\pi}(s) &amp;=\mathbb{E}_{\pi}\left[G_{t} \mid S_{t}=s\right] =\mathbb{E}_{b}\left[\rho_{t: T-1} G_{t} \mid S_{t}=s\right] \end{aligned}$</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p><strong><em>Ordinary Importance Sampling</em></strong>: importance sampling is done as a simple average</p>
<p>$\displaystyle V(s) \doteq \frac{\sum_{t \in(s)} \rho_{t: T(t)-1} G_{t}}{|\mathcal{T}(s)|}$，</p>
<p>where $\mathcal{T}(s)$ is the set of all time steps in which state $s$ is visited; $T(t)$ is the first time of termination following time $t$.</p>
<p>Unbiased, but larger variance, not stable =&gt; is easier to extend to the approximate methods using function
approximation</p>
<p><strong><em>Weighted Importance Sampling</em></strong>: importance sampling is done as a weighted average</p>
<p>$\displaystyle V(s) \doteq \frac{\sum_{t \in \mathcal{T}(s)} \rho_{t: T(t)-1} G_{t}}{\sum_{t \in \mathcal{T}(s)} \rho_{t: T(t)-1}}$</p>
<p>Biased, though the bias converges asymptotically to zero; lower varaince =&gt; preferred in practice</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h3 id="Implementation-for-ordinary-and-weighted-importance-sampling-methods-to-estimate-the-value-of-a-single-blackjack-state">Implementation for ordinary and weighted importance-sampling methods to estimate the value of a single blackjack state<a class="anchor-link" href="#Implementation-for-ordinary-and-weighted-importance-sampling-methods-to-estimate-the-value-of-a-single-blackjack-state">&#182;</a></h3>
</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="c1"># Monte Carlo Sample with Off-Policy</span>
<span class="k">def</span> <span class="nf">monte_carlo_off_policy</span><span class="p">(</span><span class="n">episodes</span><span class="p">):</span>
    <span class="n">initial_state</span> <span class="o">=</span> <span class="p">[</span><span class="kc">True</span><span class="p">,</span> <span class="mi">13</span><span class="p">,</span> <span class="mi">2</span><span class="p">]</span>

    <span class="n">rhos</span> <span class="o">=</span> <span class="p">[]</span>
    <span class="n">returns</span> <span class="o">=</span> <span class="p">[]</span>

    <span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="n">episodes</span><span class="p">):</span>
        <span class="n">_</span><span class="p">,</span> <span class="n">reward</span><span class="p">,</span> <span class="n">player_trajectory</span> <span class="o">=</span> <span class="n">play</span><span class="p">(</span><span class="n">behavior_policy_player</span><span class="p">,</span> <span class="n">initial_state</span><span class="o">=</span><span class="n">initial_state</span><span class="p">)</span>

        <span class="c1"># get the importance ratio</span>
        <span class="n">numerator</span> <span class="o">=</span> <span class="mf">1.0</span>
        <span class="n">denominator</span> <span class="o">=</span> <span class="mf">1.0</span>
        <span class="k">for</span> <span class="p">(</span><span class="n">usable_ace</span><span class="p">,</span> <span class="n">player_sum</span><span class="p">,</span> <span class="n">dealer_card</span><span class="p">),</span> <span class="n">action</span> <span class="ow">in</span> <span class="n">player_trajectory</span><span class="p">:</span>
            <span class="k">if</span> <span class="n">action</span> <span class="o">==</span> <span class="n">target_policy_player</span><span class="p">(</span><span class="n">usable_ace</span><span class="p">,</span> <span class="n">player_sum</span><span class="p">,</span> <span class="n">dealer_card</span><span class="p">):</span>
                <span class="n">denominator</span> <span class="o">*=</span> <span class="mf">0.5</span>
            <span class="k">else</span><span class="p">:</span>
                <span class="n">numerator</span> <span class="o">=</span> <span class="mf">0.0</span>
                <span class="k">break</span>
        <span class="n">rho</span> <span class="o">=</span> <span class="n">numerator</span> <span class="o">/</span> <span class="n">denominator</span>
        <span class="n">rhos</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">rho</span><span class="p">)</span>
        <span class="n">returns</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">reward</span><span class="p">)</span>

    <span class="n">rhos</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">asarray</span><span class="p">(</span><span class="n">rhos</span><span class="p">)</span>
    <span class="n">returns</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">asarray</span><span class="p">(</span><span class="n">returns</span><span class="p">)</span>
    <span class="n">weighted_returns</span> <span class="o">=</span> <span class="n">rhos</span> <span class="o">*</span> <span class="n">returns</span>

    <span class="n">weighted_returns</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">add</span><span class="o">.</span><span class="n">accumulate</span><span class="p">(</span><span class="n">weighted_returns</span><span class="p">)</span>
    <span class="n">rhos</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">add</span><span class="o">.</span><span class="n">accumulate</span><span class="p">(</span><span class="n">rhos</span><span class="p">)</span>

    <span class="n">ordinary_sampling</span> <span class="o">=</span> <span class="n">weighted_returns</span> <span class="o">/</span> <span class="n">np</span><span class="o">.</span><span class="n">arange</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="n">episodes</span> <span class="o">+</span> <span class="mi">1</span><span class="p">)</span>

    <span class="k">with</span> <span class="n">np</span><span class="o">.</span><span class="n">errstate</span><span class="p">(</span><span class="n">divide</span><span class="o">=</span><span class="s1">&#39;ignore&#39;</span><span class="p">,</span><span class="n">invalid</span><span class="o">=</span><span class="s1">&#39;ignore&#39;</span><span class="p">):</span>
        <span class="n">weighted_sampling</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">where</span><span class="p">(</span><span class="n">rhos</span> <span class="o">!=</span> <span class="mi">0</span><span class="p">,</span> <span class="n">weighted_returns</span> <span class="o">/</span> <span class="n">rhos</span><span class="p">,</span> <span class="mi">0</span><span class="p">)</span>

    <span class="k">return</span> <span class="n">ordinary_sampling</span><span class="p">,</span> <span class="n">weighted_sampling</span>
</pre></div>

    </div>
</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="k">def</span> <span class="nf">figure_5_3</span><span class="p">():</span>
    <span class="n">true_value</span> <span class="o">=</span> <span class="o">-</span><span class="mf">0.27726</span>
    <span class="n">episodes</span> <span class="o">=</span> <span class="mi">10000</span>
    <span class="n">runs</span> <span class="o">=</span> <span class="mi">100</span>
    <span class="n">error_ordinary</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">zeros</span><span class="p">(</span><span class="n">episodes</span><span class="p">)</span>
    <span class="n">error_weighted</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">zeros</span><span class="p">(</span><span class="n">episodes</span><span class="p">)</span>
    <span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="n">tqdm</span><span class="p">(</span><span class="nb">range</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="n">runs</span><span class="p">)):</span>
        <span class="n">ordinary_sampling_</span><span class="p">,</span> <span class="n">weighted_sampling_</span> <span class="o">=</span> <span class="n">monte_carlo_off_policy</span><span class="p">(</span><span class="n">episodes</span><span class="p">)</span>
        <span class="c1"># get the squared error</span>
        <span class="n">error_ordinary</span> <span class="o">+=</span> <span class="n">np</span><span class="o">.</span><span class="n">power</span><span class="p">(</span><span class="n">ordinary_sampling_</span> <span class="o">-</span> <span class="n">true_value</span><span class="p">,</span> <span class="mi">2</span><span class="p">)</span>
        <span class="n">error_weighted</span> <span class="o">+=</span> <span class="n">np</span><span class="o">.</span><span class="n">power</span><span class="p">(</span><span class="n">weighted_sampling_</span> <span class="o">-</span> <span class="n">true_value</span><span class="p">,</span> <span class="mi">2</span><span class="p">)</span>
    <span class="n">error_ordinary</span> <span class="o">/=</span> <span class="n">runs</span>
    <span class="n">error_weighted</span> <span class="o">/=</span> <span class="n">runs</span>

    <span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">arange</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="n">episodes</span> <span class="o">+</span> <span class="mi">1</span><span class="p">),</span> <span class="n">error_ordinary</span><span class="p">,</span> <span class="n">color</span><span class="o">=</span><span class="s1">&#39;green&#39;</span><span class="p">,</span> <span class="n">label</span><span class="o">=</span><span class="s1">&#39;Ordinary Importance Sampling&#39;</span><span class="p">)</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">arange</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="n">episodes</span> <span class="o">+</span> <span class="mi">1</span><span class="p">),</span> <span class="n">error_weighted</span><span class="p">,</span> <span class="n">color</span><span class="o">=</span><span class="s1">&#39;red&#39;</span><span class="p">,</span> <span class="n">label</span><span class="o">=</span><span class="s1">&#39;Weighted Importance Sampling&#39;</span><span class="p">)</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">ylim</span><span class="p">(</span><span class="o">-</span><span class="mf">0.1</span><span class="p">,</span> <span class="mi">5</span><span class="p">)</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">xlabel</span><span class="p">(</span><span class="s1">&#39;Episodes (log scale)&#39;</span><span class="p">)</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">ylabel</span><span class="p">(</span><span class="sa">f</span><span class="s1">&#39;Mean square error</span><span class="se">\n</span><span class="s1">(average over </span><span class="si">{</span><span class="n">runs</span><span class="si">}</span><span class="s1"> runs)&#39;</span><span class="p">)</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">xscale</span><span class="p">(</span><span class="s1">&#39;log&#39;</span><span class="p">)</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">legend</span><span class="p">()</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">()</span>

<span class="n">figure_5_3</span><span class="p">()</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stderr output_text">
<pre>100%|██████████| 100/100 [00:16&lt;00:00,  5.88it/s]
</pre>
</div>
</div>

<div class="output_area">

    <div class="prompt"></div>




<div class="output_png output_subarea ">
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYQAAAEOCAYAAACJlmBtAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjMuNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8QVMy6AAAACXBIWXMAAAsTAAALEwEAmpwYAAA/gElEQVR4nO3dd3xUVfr48c8zKQRICISaSA1NSiBAUAELSIkoomIFLMAqNiysdXfVRf1tc3dd+66oiPoFdLEAKgoiIIugCBiQKgQjRXpNCCFlnt8fdxIDpMzAJDOZPO/Xa17J3Ln3nmcOYZ6559xzjqgqxhhjjCvQARhjjAkOlhCMMcYAlhCMMcZ4WEIwxhgDWEIwxhjjYQnBGGMMAOGBDqA4EckAMoECIF9VUwIbkTHGVB9BlRA8+qnqvkAHYYwx1Y01GRljjAGCLyEoMFdEVojI2EAHY4wx1UmwNRmdr6o7RKQR8IWIbFDVRYUvepLEWIDatWv3OPvssys8oMM5h9l8YDNnNzib2pG1K7w8Y4ypSCtWrNinqg1Lek2CdS4jEZkAZKnqP0p6PSUlRZcvX17hcazcuZIeE3vw4XUfclWHqyq8PGOMqUgisqK0G3aCpslIRGqLSEzh78AgYE1go4L46HgAdmbtDHAkxhhTsYKpyagx8JGIgBPXVFX9PLAhQaPajXCJi52ZlhCMMaEtaBKCqm4BugY6jpOFucJoVLuRXSEYY0Je0CSEYJYQk2AJoQrKy8tj+/bt5OTkBDoUYypdVFQUTZs2JSIiwutjLCF4IT46nh2ZOwIdhvHR9u3biYmJoWXLlniaIo2pFlSV/fv3s337dlq1auX1cUHTqRzM4qPjrQ+hCsrJyaF+/fqWDEy1IyLUr1/f56tjSwheiI+JZ8/RPeS78wMdivGRJQNTXZ3O374lBC/ER8ejKHuO7gl0KKaK2b59O1dccQVt27aldevW3HfffeTm5np1bN++fSkca3PppZdy6NChCoz0RJMnT2bcuHGVVh7AjBkzWLduXaWWWWj37t0MGTKErl270rFjRy699NIKLS8jI4POnTsDsHz5cu69994KLc9blhC8kBCTAGDNRsYnqsqwYcO48sor2bRpEz/++CNZWVn84Q9/OGXf/Pyyrz5nz55N3bp1zzim8soJlPz8/IAmhCeeeIKBAweyatUq1q1bx1//+tdKKzslJYUXXnih0soriyUEL8THOIPTfsn8JcCRmKpk/vz5REVFMXr0aADCwsL417/+xaRJk8jOzmby5MkMHTqUiy++mP79+3Ps2DFuuOEGOnTowFVXXcWxY8eKztWyZUv27dtHRkYGHTp04LbbbqNTp04MGjSoaL/XXnuNnj170rVrV66++mqys7MBGDVqFHfccQfnnnsuDz/8MG3btmXv3r0AuN1u2rRpU/S8JKNGjeLOO+/kvPPOIzExkYULFzJmzBg6dOjAqFGjivaLjo5m/PjxdOrUif79+xedMy0tjfPOO48uXbpw1VVXcfDgQcC5Arr//vtJSUnhb3/7G7NmzeKhhx4iOTmZ9PT0Mt/PvffeS+/evUlMTOT9998viuFvf/sbSUlJdO3alUcffRSA9PR0LrnkEnr06MEFF1zAhg0bTnmPO3fupGnTpkXPu3TpAkBWVhb9+/ene/fuJCUlMXPmTMD5hn/22WczatQo2rVrx8iRI5k3bx59+vShbdu2LFu2DIAJEyZw00030atXL9q2bctrr712StkLFy5kyJAhRfuPGTOGvn37kpiYeEKiePrpp2nfvj3nn38+w4cP5x//KHEShzNidxl5wUYrV333f34/abvS/HrO5CbJPHfJc6W+vnbtWnr06HHCtjp16tC8eXM2b94MwMqVK1m9ejVxcXE8++yz1KpVi/Xr17N69Wq6d+9e4nk3bdrEtGnTeO2117juuuv44IMPuPHGGxk2bBi33XYbAI899hhvvPEG99xzD+A0XS1ZsoSwsDBiY2OZMmUK999/P/PmzaNr1640bFji1DZFDh48yNKlS5k1axZDhw7l66+/5vXXX6dnz56kpaWRnJzM0aNHSUlJ4V//+hdPPfUUTz75JC+99BI333wzL774IhdddBFPPPEETz75JM8959Rbbm5uUbPYpk2bGDJkCNdccw0AdevWLfX97Ny5k8WLF7NhwwaGDh3KNddcw2effcbMmTP59ttvqVWrFgcOHABg7Nix/Oc//6Ft27Z8++233HXXXcyfP/+E93f33Xdz/fXX89JLLzFgwABGjx5NQkICUVFRfPTRR9SpU4d9+/Zx3nnnMXToUAA2b97M9OnTmTRpEj179mTq1KksXryYWbNm8ec//5kZM2YAsHr1ar755huOHj1Kt27duOyyy8qs6w0bNrBgwQIyMzNp3749d955J2lpaXzwwQesWrWKvLw8unfvfsrflj/YFYIXGkc3BqzJyPjfwIEDiYuLA2DRokXceOONgPMNtfBb6slatWpFcnIyAD169CAjIwOANWvWcMEFF5CUlMSUKVNYu3Zt0THXXnstYWFhAIwZM4a3334bgEmTJhVdwZTl8ssvR0RISkqicePGJCUl4XK56NSpU1H5LpeL66+/HoAbb7yRxYsXc/jwYQ4dOsRFF10EwC233MKiRUXzVRbtX5Ky3s+VV16Jy+WiY8eO7N69G4B58+YxevRoatWqBUBcXBxZWVksWbKEa6+9luTkZG6//XZ27jz1/3FqaipbtmzhtttuY8OGDXTr1o29e/eiqvz+97+nS5cuDBgwgB07dhSV16pVqxPqoX///kV1VFgnAFdccQU1a9akQYMG9OvXr+jqoTSXXXYZNWrUoEGDBjRq1Ijdu3fz9ddfc8UVVxAVFUVMTAyXX355mec4XXaF4IXIsEga1GpgVwhVWFnf5CtKx44dT2jOADhy5Ahbt26lTZs2rFy5ktq1fZ9Bt0aNGkW/h4WFFTUZjRo1ihkzZtC1a1cmT57MwoULi/YrXk6zZs1o3Lgx8+fPZ9myZUyZMsXrMl0u1wnlu1yuUvslvLnLpaz3X9b7KR5DWRN0ut1u6tatS1paWrmxxMXFMWLECEaMGMGQIUNYtGgRmZmZ7N27lxUrVhAREUHLli2LbuU8uR6K11HxOjm5Hsqrl5P/fSuz38euELwUHx1vCcH4pH///mRnZxd9Gy8oKOCBBx5g1KhRRd9ii7vwwguZOnUq4Hw7Xr16tU/lZWZmEh8fT15eXrkf8rfeeis33njjCVcOZ8rtdhclwKlTp3L++ecTGxtLvXr1+N///gfAO++8U3S1cLKYmBgyMzNP6/2Ac7X15ptvFvU1HDhwgDp16tCqVSumT58OOMlj1apVpxw7f/78ouMyMzNJT0+nefPmHD58mEaNGhEREcGCBQv4+eeffagRx8yZM8nJyWH//v0sXLiQnj17+nyOPn368PHHH5OTk0NWVhaffPKJz+fwhiUELyXEJFiTkfGJiPDRRx8xffp02rZtS7t27YiKiuLPf/5zifvfeeedZGVl0aFDB5544gmf24iffvppzj33XPr06UN5a4UMHTqUrKwsr5qLvFW7dm2WLVtG586dmT9/Pk888QQAb731Fg899BBdunQhLS2taPvJbrjhBv7+97/TrVs30tPTfXo/AJdccglDhw4lJSWF5OTkok7XKVOm8MYbb9C1a1c6depU1DFc3IoVK0hJSaFLly706tWLW2+9lZ49ezJy5EiWL19OUlISb7/9tldxnKxLly7069eP8847j8cff5yEhASfz9GzZ0+GDh1Kly5dGDx4MElJScTGxvp8nvIE7XoI5ams9RAKjZ45mi/Sv2D7b7dXWpnmzKxfv54OHToEOoygtHz5csaPH1/0zd0foqOjycrK8tv5QsGECROIjo7mwQcfPONzZWVlER0dTXZ2NhdeeCETJ04s9caDQiX9HyhrPQTrQ/BSfHQ8u4/uxq1uXGIXVqbq+utf/8q///1vr5phTPAYO3Ys69atIycnh1tuuaXcZHA6LCF4KT46nnx3Pvuy99GodqNAh2PMaXv00UeL7tH3J7s6ONWECRP8dq7C/qWKZF91vVQ4OM36EYwxocoSgpeKpq+wO42MMSHKEoKXCkcr2/QVxphQZQnBS9ZkZIwJdZYQvBQVHkXdqLrWZGS8Nn78+KI5e8CZHuHWW28tev7AAw/w7LPPlnr8E088wbx588osY8KECSVOcnbo0CFeeeUVn2Mu7Xylba9IkydP5pdfAnNFvnHjRvr27UtycjIdOnRg7NixFVpe8QnuZs2aVamzrRZnCcEHNlrZ+KJPnz4sWbIEcEbx7tu374T5eJYsWULv3r1LPf6pp55iwIABp1X26SaEYFFQUBDQhHDvvfcyfvx40tLSWL9+fdGkepVh6NChFXIXmDcsIfggPsaW0jTe6927N0uXLgWcmU87d+5MTEwMBw8e5Pjx46xfv57u3buzYsUKLrroInr06EFqamrR5GujRo0qmgpi9uzZnH322fTo0YN777236NskwLp1606ZLvnRRx8lPT2d5ORkHnroIQD+/ve/07NnT7p06cIf//jHouP/9Kc/0a5dO84//3w2btxY7vvq27cv48ePJyUlhQ4dOvDdd98xbNgw2rZty2OPPQb8Oj30yJEj6dChA9dcc03R1BBffvkl3bp1IykpiTFjxnD8+HHAmeL7kUceoXv37kybNo3ly5czcuRIkpOTOXbsGE899RQ9e/akc+fOjB07tmgOo759+/LII49wzjnn0K5du6LBdgUFBTz44IN07tyZLl268OKLLwKUWt/FnTwddlJSUtH7uuCCC+jevTvdu3cvSvgLFy7koosu4oorriAxMZFHH32UKVOmcM4555CUlER6enrRv+kdd9xBSkoK7dq1K3EKiuKLE5U21bfb7eauu+7i7LPPZuDAgVx66aWnzJt1Omwcgg8SYhL438/+G9lpKtH994MXE5z5JDkZijUJnSwhIYHw8HC2bt3KkiVL6NWrFzt27GDp0qXExsaSlJSEiHDPPfcwc+ZMGjZsyHvvvccf/vAHJk2aVHSenJwcbr/9dhYtWkSrVq0YPnz4CeWUNF3yX//6V9asWVM0qdvcuXPZtGkTy5YtQ1UZOnQoixYtonbt2rz77rukpaWRn5/v9bTKkZGRLF++nOeff54rrriCFStWEBcXR+vWrRk/fjzgNLu88cYb9OnThzFjxvDKK68wbtw4Ro0axZdffkm7du24+eab+fe//839998PQP369Vm5ciUAr7/+Ov/4xz9ISXEG1Y4bN65o2oubbrqJTz75pGjWz/z8fJYtW8bs2bN58sknmTdvHhMnTiQjI4O0tDTCw8M5cOAAeXl55dY3OM19F198Mb1792bQoEGMHj2aunXr0qhRI7744guioqLYtGkTw4cPL5q+e9WqVaxfv564uDgSExO59dZbWbZsGc8//zwvvvhiUfNhRkYGy5YtIz09nX79+hVNhV6akqb6/vDDD8nIyGDdunXs2bOHDh06MGbMmHL/3cpjCcEHhU1Gqmpr9Rqv9O7dmyVLlrBkyRJ++9vfsmPHDpYsWUJsbCx9+vRh48aNrFmzhoEDBwLOt9r4+PgTzrFhwwYSExNp1aoVAMOHD2fixIlFrxdOl1yjRo2i6ZJPNnfuXObOnUu3bt0AZxDZpk2byMzM5KqrriqabK9wrv/yFO6XlJREp06dimJOTExk27Zt1K1bl2bNmtGnTx/AmQ77hRdeYODAgbRq1Yp27doBznTYL7/8clFCKGs67AULFvDMM8+QnZ3NgQMH6NSpU1FCGDZsGHDidODz5s3jjjvuIDzc+ZiLi4tjzZo15dY3wOjRo0lNTeXzzz9n5syZvPrqq0VrEYwbN460tDTCwsL48ccfi47p2bNn0blat27NoEGDiupowYIFRftdd911uFwu2rZtS2JiYokL9hRX0lTfixcv5tprr8XlctGkSRP69etX5jm8ZQnBB/HR8eQW5HIw5yBxNeMCHY7xRRnf5CtSYT/CDz/8QOfOnWnWrBn//Oc/qVOnDqNHj0ZV6dSpU1HT0unwZrpkVeV3v/sdt99++wnbnzvNevFmOmxfp32G0qfDzsnJ4a677mL58uU0a9aMCRMmFE1DXTye8qaL9qW+ExISGDNmDGPGjKFz586sWbOGjz/+mMaNG7Nq1SrcbjdRUVGnxAAVNx12Rc89Z30IPrBbT42vevfuzSeffEJcXBxhYWHExcVx6NAhli5dSu/evWnfvj179+4t+oDKy8s7oeMZoH379mzZsqXom+97771XbrknTyWdmprKpEmTiqaX2LFjB3v27OHCCy9kxowZHDt2jMzMTD7++GM/vXPYunVr0fsqnA67ffv2ZGRkFDWTeDsdduGHf4MGDcjKyvKqvXzgwIG8+uqrRR/GBw4c8Kq+AT7//HPy8vIA2LVrF/v37+ess87i8OHDxMfH43K5eOeddygoKPClSgCYPn06breb9PR0tmzZQvv27X0+R58+ffjggw9wu93s3r37hLUizoQlBB/YUprGV0lJSUVLLxbfFhsbS4MGDYiMjOT999/nkUceoWvXriQnJxd1VBaqWbMmr7zyStG6wDExMeVOfVy/fn369OlD586deeihhxg0aBAjRoygV69eJCUlcc0115CZmUn37t25/vrr6dq1K4MHDz6tufpL0759e15++WU6dOjAwYMHufPOO4mKiuLNN9/k2muvLVpt7I477ijx+MIO2OTkZGrUqMFtt91G586dSU1N9SrOW2+9lebNm9OlSxe6du3K1KlTvapvcJrYOnfuTNeuXUlNTeXvf/87TZo04a677uKtt96ia9eubNiw4bQWOGrevDnnnHMOgwcP5j//+c8JVxneuvrqq2natCkdO3bkxhtvpHv37v6ZDltVq+SjR48eWtl+3PejMgF9O+3tSi/b+G7dunWBDsFvMjMzVVXV7XbrnXfeqc8++2yAIyrbTz/9pJ06dQp0GEHnlltu0enTp/vlXIV/E/v27dPExETduXPnKfuU9H8AWK6lfK5aH4IPCpuMbPoKU9lee+013nrrLXJzc+nWrdspfQGm+hkyZAiHDh0iNzeXxx9/nCZNmpzxOS0h+CA6MproyGhrMjKVbvz48UW3c1YFLVu2ZM2aNYEOI+hMnjzZb+fyV79BcdaH4CMbrWyMCVWWEHxko5WrFq2iS8Qac6ZO52/f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
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
<h3 id="Example-5.5:-Infinite-Variance">Example 5.5: Infinite Variance<a class="anchor-link" href="#Example-5.5:-Infinite-Variance">&#182;</a></h3><p>The estimates of ordinary importance sampling will
typically have infinite variance, and thus unsatisfactory convergence properties, whenever
the scaled returns have infinite variance—and this can easily happen in o↵-policy learning
when trajectories contain loops. A simple example is shown inset in implementation below. There is
only one nonterminal state $s$ and two actions, right and left. The right action causes a
deterministic transition to termination, whereas the left action transitions, with probability
0.9, back to $s$ or, with probability 0.1, on to termination. The rewards are $+1$ on the
latter transition and otherwise zero. Consider the target policy that always selects left.
All episodes under this policy consist of some number (possibly zero) of transitions back
to $s$ followed by termination with a reward and return of +1. Thus the value of s under
the target policy is 1 ($\gamma$ = 1). Suppose we are estimating this value from o↵-policy data
using the behavior policy that selects <strong>right</strong> and <strong>left</strong> with equal probability.</p>
<p><img src="/images/mcfigure.png" alt="" style="width:55%"></p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">ACTION_BACK</span> <span class="o">=</span> <span class="mi">0</span>
<span class="n">ACTION_END</span> <span class="o">=</span> <span class="mi">1</span>

<span class="c1"># behavior policy</span>
<span class="k">def</span> <span class="nf">behavior_policy</span><span class="p">():</span>
    <span class="k">return</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">binomial</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="mf">0.5</span><span class="p">)</span>

<span class="c1"># target policy</span>
<span class="k">def</span> <span class="nf">target_policy</span><span class="p">():</span>
    <span class="k">return</span> <span class="n">ACTION_BACK</span>

<span class="c1"># one turn</span>
<span class="k">def</span> <span class="nf">play</span><span class="p">():</span>
    <span class="c1"># track the action for importance ratio</span>
    <span class="n">trajectory</span> <span class="o">=</span> <span class="p">[]</span>
    <span class="k">while</span> <span class="kc">True</span><span class="p">:</span>
        <span class="n">action</span> <span class="o">=</span> <span class="n">behavior_policy</span><span class="p">()</span>
        <span class="n">trajectory</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">action</span><span class="p">)</span>
        <span class="k">if</span> <span class="n">action</span> <span class="o">==</span> <span class="n">ACTION_END</span><span class="p">:</span>
            <span class="k">return</span> <span class="mi">0</span><span class="p">,</span> <span class="n">trajectory</span>
        <span class="k">if</span> <span class="n">np</span><span class="o">.</span><span class="n">random</span><span class="o">.</span><span class="n">binomial</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="mf">0.9</span><span class="p">)</span> <span class="o">==</span> <span class="mi">0</span><span class="p">:</span>
            <span class="k">return</span> <span class="mi">1</span><span class="p">,</span> <span class="n">trajectory</span>

<span class="k">def</span> <span class="nf">figure_5_4</span><span class="p">():</span>
    <span class="n">runs</span> <span class="o">=</span> <span class="mi">10</span>
    <span class="n">episodes</span> <span class="o">=</span> <span class="mi">1000000</span>
    <span class="k">for</span> <span class="n">run</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="n">runs</span><span class="p">):</span>
        <span class="n">rewards</span> <span class="o">=</span> <span class="p">[]</span>
        <span class="k">for</span> <span class="n">episode</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="n">episodes</span><span class="p">):</span>
            <span class="n">reward</span><span class="p">,</span> <span class="n">trajectory</span> <span class="o">=</span> <span class="n">play</span><span class="p">()</span>
            <span class="k">if</span> <span class="n">trajectory</span><span class="p">[</span><span class="o">-</span><span class="mi">1</span><span class="p">]</span> <span class="o">==</span> <span class="n">ACTION_END</span><span class="p">:</span>
                <span class="n">rho</span> <span class="o">=</span> <span class="mi">0</span>
            <span class="k">else</span><span class="p">:</span>
                <span class="n">rho</span> <span class="o">=</span> <span class="mf">1.0</span> <span class="o">/</span> <span class="nb">pow</span><span class="p">(</span><span class="mf">0.5</span><span class="p">,</span> <span class="nb">len</span><span class="p">(</span><span class="n">trajectory</span><span class="p">))</span>
            <span class="n">rewards</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">rho</span> <span class="o">*</span> <span class="n">reward</span><span class="p">)</span>
        <span class="n">rewards</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">add</span><span class="o">.</span><span class="n">accumulate</span><span class="p">(</span><span class="n">rewards</span><span class="p">)</span>
        <span class="n">estimations</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">asarray</span><span class="p">(</span><span class="n">rewards</span><span class="p">)</span> <span class="o">/</span> <span class="n">np</span><span class="o">.</span><span class="n">arange</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="n">episodes</span> <span class="o">+</span> <span class="mi">1</span><span class="p">)</span>
        <span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">(</span><span class="n">estimations</span><span class="p">)</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">ylim</span><span class="p">(</span><span class="o">-.</span><span class="mi">1</span><span class="p">,</span> <span class="mi">3</span><span class="p">)</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">xlabel</span><span class="p">(</span><span class="s1">&#39;Episodes (log scale)&#39;</span><span class="p">)</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">ylabel</span><span class="p">(</span><span class="s1">&#39;Ordinary Importance Sampling&#39;</span><span class="p">)</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">xscale</span><span class="p">(</span><span class="s1">&#39;log&#39;</span><span class="p">)</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">()</span>

<span class="n">figure_5_4</span><span class="p">()</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


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
<p>This implemented figure shows ten independent runs of the first-visit MC algorithm
using ordinary importance sampling. Even after millions of episodes, the estimates fail
to converge to the correct value of 1. In contrast, the weighted importance-sampling
algorithm would give an estimate of exactly 1 forever after the first episode that ended
with the left action.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>$\begin{aligned} Var[V] &amp;= \mathbb{E}[V -\bar{V}]^2 =  \mathbb{E}[V^2] - \bar{V}^2 \text{        (note }\bar{V}\text{ is finite)}\\ 
&amp;=\mathbb{E}_{b}\left[\left(\prod_{t=0}^{T-1} \frac{\pi\left(A_{t} \mid S_{t}\right)}{b\left(A_{t} \mid S_{t}\right)} G_{0}\right)^{2}\right] \\&amp;= \frac{1}{2} \cdot 0.1\left(\frac{1}{0.5}\right)^{2} \\ &amp;+\frac{1}{2} \cdot 0.9 \cdot \frac{1}{2} \cdot 0.1\left(\frac{1}{0.5} \frac{1}{0.5}\right)^{2} \\ &amp;+\frac{1}{2} \cdot 0.9 \cdot \frac{1}{2} \cdot 0.9 \cdot \frac{1}{2} \cdot 0.1\left(\frac{1}{0.5} \frac{1}{0.5} \frac{1}{0.5}\right)^{2} \\ &amp;+\cdots -\bar{V}^2\\&amp;= 0.1 \sum_{k=0}^{\infty} 0.9^{k} \cdot 2^{k} \cdot 2-\bar{V}^2=0.2 \sum_{k=0}^{\infty} 1.8^{k} - \bar{V}^2\\&amp;=\infty \end{aligned}$</p>
<p>And this proves why it is unstable and has large varaiance of V.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h3 id="Incremental-Implementation">Incremental Implementation<a class="anchor-link" href="#Incremental-Implementation">&#182;</a></h3>
</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>For saving memory and decreasing computational time, we can calculate the increment, introduced in chapter 2.</p>
<p>Denote $\rho_{t:T(t)-1}$ as $W_k$, then we have $\displaystyle  V_{n}=\frac{\sum_{k=1}^{n-1} W_{k} G_{k}}{\sum_{k=1}^{n-1} W_{k}},$ and let $C_{n}=\sum_{k=1}^{n} W_{k}$, then,</p>
<p>$\begin{aligned} V_{n+1} &amp;=\frac{\sum_{k=1}^{n-1} W_{k} G_{k}+W_{n} G_{n}}{\sum_{k=1}^{n} W_{k}} \\ &amp;=\frac{\sum_{k=1}^{n-1} W_{k} \frac{\sum_{k=1}^{n-1} W_{k} G_{k}}{\sum_{k=1}^{n-1} W_{k}}+W_{n} G_{n}}{\sum_{k=1}^{n} W_{k}} \\ &amp;=\frac{C_{n-1} V_{n}+W_{n} G_{n}}{C_{n}} \\ &amp;=\frac{\left(C_{n}-W_{n}\right) V_{n}+W_{n} G_{n}}{C_{n}} \\ &amp;=V_{n}+\frac{W_{n}}{C_{n}}\left[G_{n}-V_{n}\right] \end{aligned}$</p>
<p>And therefore we could get the <strong>update rule</strong>:</p>
<p>$V_{n+1}=V_{n}+\frac{W_{n}}{C_{n}}\left[G_{n}-V_{n}\right]$</p>
<p>$C_{n+1}=C_{n}+W_{n+1},\left(C_{0}=0\right)$</p>
<p>The algorithm for off-policy MC prediction using increment update rule is shown below.</p>
<p><img src="\images\mc4.png" alt=""></p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>When $W = 0 \Rightarrow \pi(A_t|S_t) = 0 \Rightarrow$ behavior policy $b$ produces a new action not within $\pi$, the episode will be terminated.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h3 id="Off-policy-Monte-Carlo-Control">Off-policy Monte Carlo Control<a class="anchor-link" href="#Off-policy-Monte-Carlo-Control">&#182;</a></h3>
</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>After prior intruduction, we can have the off-policy MC control algorithm, based on
GPI and weighted importance sampling, for estimating $\pi_*$ and $q_*$. The target policy
$\pi \approx \pi_*$ is the greedy policy with respect to $Q$, which is an estimate of $q_*$. The behavior
policy $b$ can be anything, but in order to assure convergence of $\pi$ to the optimal policy, an
infinite number of returns must be obtained for each pair of state and action. This can be
assured by choosing $b$ to be "$\epsilon$-soft.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p><img src="/images/mc5.png" alt=""></p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>$\pi$ is deterministic instead of soft, and $b$ is soft to make sure the exploration of actions and deterministic of $\pi$. It is also worth noting that in the algorithm box above, $\displaystyle W \leftarrow W \frac{\pi\left(A_{t} \mid S_{t}\right)}{b\left(A_{t} \mid S_{t}\right)} = \frac{1}{b\left(A_{t} \mid S_{t}\right)}$  as the target policy in deterministic $\Rightarrow \pi(A_t | S_t) =1$</p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<p>Several optional importance sampling methods to approximate value function are introduced in the book, but will not be verified here.</p>

</div>
</div>
</div>
    </div>
  </div>
</body>

 


</html>


<script src="https://utteranc.es/client.js"
        repo="zcczhang/zcczhang.github.io"
        issue-term="pathname"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>