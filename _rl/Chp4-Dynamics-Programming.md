---
title: "Chapter 4 Dynamics Programming"
collection: rl
permalink: /rl/Chp4-Dynamics-Programming
tags:
  - Reinforcement Learning
  - Tabular Solution Method
  - My Note
date: "2020-12-03"
tool: "/images/nothing.png"
--- 

___"Reinforcement Learning: An Introduction"___ *by Richard Sutton & Andrew Barto, 2nd Ed*

> Author: Charles Zhang  <br>[*All Notes Catelog for* ***Reinforcement Learning: An Introduction***](https://zcczhang.github.io/blogs/). This post is created following [*BY-NC-ND 4.0*](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.en) agreement, please follow terms while sharing. 



<html>
<head><meta charset="utf-8" />

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
<h3 id="Policy-Evaluation">Policy Evaluation<a class="anchor-link" href="#Policy-Evaluation">&#182;</a></h3><html>
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
<p><img src="/images/dp1.png" alt=""></p>
</body>


</html><h3 id="Policy-Improvement">Policy Improvement<a class="anchor-link" href="#Policy-Iteration">&#182;</a></h3><html>

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
</html><h3 id="Policy-Iteration">Policy Iteration<a class="anchor-link" href="#Policy-Iteration">&#182;</a></h3><html>
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
</html><p><img src="/images/dp2.png" alt=""></p>
<h3 id="Value-Iteration">Value Iteration<a class="anchor-link" href="#Value-Iteration">&#182;</a></h3><html>
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
</html><p><img src="/images/dp3.png" alt=""></p>
<h3 id="Generalized-Policy-Iteration-(GPI)">Generalized Policy Iteration (GPI)<a class="anchor-link" href="#Generalized-Policy-Iteration-(GPI)">&#182;</a></h3><p>Important model in reinforcement learnig. e.g. policy-evaluation and policy-improvement processes.</p>
<p>The process and convergence is clearly illustrated in the figure below:</p>
<p><img src="/images/dp4.png" alt=""></p>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h3 id="Implementation-of-Stochastic-GridWorld">Implementation of Stochastic GridWorld<a class="anchor-link" href="#Implementation-of-Stochastic-GridWorld">&#182;</a></h3><p>This also shown in my <a href="https://zcczhang.github.io/rl/Finite-MDP">MDP</a> note.</p>
<p><img src="https://github.com/zcczhang/zcczhang.github.io/blob/master/images/mdp_figure1.png?raw=true" style="width:85%"/></p>
<p>Using <strong>Bellman Optimality Equation</strong>: $v*(s) = \max_a \{\sum_{s',r} p(s', r\mid s, a)\cdot [r + \gamma \cdot v(s')]\} = \max q_{\pi*}(s, a)$</p>
<p><img src="https://github.com/zcczhang/zcczhang.github.io/blob/master/images/mdp_figure2.png?raw=true" style="width:85%"/></p>
<p>The explanations, use of equations, and details for implementation are all detailed commented in the code below.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="sd">&quot;&quot;&quot;</span>
<span class="sd">--------------------------</span>
<span class="sd">Environment</span>

<span class="sd"> c   0    1    2    3</span>
<span class="sd">r  - - - - - - - - - -</span>
<span class="sd">0 |    |    |    | +1 |</span>
<span class="sd">   - - - - - - - - - -</span>
<span class="sd">1 |    |WALL|    | -1 |</span>
<span class="sd">   - - - - - - - - - -</span>
<span class="sd">2 |    |    |    |    |</span>
<span class="sd">   - - - - - - - - - -</span>

<span class="sd">For Visualization:</span>

<span class="sd">   - - - - - - - - - -</span>
<span class="sd">3 |    |    |    | +1 |</span>
<span class="sd">   - - - - - - - - - -</span>
<span class="sd">2 |    |WALL|    | -1 |</span>
<span class="sd">   - - - - - - - - - -</span>
<span class="sd">1 |    |    |    |    |</span>
<span class="sd">r  - - - - - - - - - -</span>
<span class="sd">  c  1    2    3    4</span>

<span class="sd">@author: Charles Zhang</span>
<span class="sd">@date Mar 28, 2021</span>
<span class="sd">---------------------------</span>
<span class="sd">&quot;&quot;&quot;</span>
<span class="kn">import</span> <span class="nn">numpy</span> <span class="k">as</span> <span class="nn">np</span>
<span class="kn">from</span> <span class="nn">matplotlib.table</span> <span class="kn">import</span> <span class="n">Table</span>
<span class="kn">import</span> <span class="nn">matplotlib.pyplot</span> <span class="k">as</span> <span class="nn">plt</span>


<span class="c1"># Grid Environment for MDP Value Iteration</span>
<span class="k">class</span> <span class="nc">GridWorldEnv</span><span class="p">:</span>

    <span class="n">EXIT</span>  <span class="o">=</span> <span class="p">(</span><span class="nb">float</span><span class="p">(</span><span class="s2">&quot;inf&quot;</span><span class="p">),</span> <span class="nb">float</span><span class="p">(</span><span class="s2">&quot;inf&quot;</span><span class="p">))</span>
    <span class="c1"># actions</span>
    <span class="n">NORTH</span> <span class="o">=</span> <span class="p">(</span><span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="mi">0</span><span class="p">)</span>
    <span class="n">EAST</span>  <span class="o">=</span> <span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="mi">1</span><span class="p">)</span>
    <span class="n">SOUTH</span> <span class="o">=</span> <span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="mi">0</span><span class="p">)</span>
    <span class="n">WEST</span>  <span class="o">=</span> <span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="o">-</span><span class="mi">1</span><span class="p">)</span>
    <span class="n">ACTIONS</span> <span class="o">=</span> <span class="p">[</span><span class="n">NORTH</span><span class="p">,</span> <span class="n">EAST</span><span class="p">,</span> <span class="n">SOUTH</span><span class="p">,</span> <span class="n">WEST</span><span class="p">]</span>
    <span class="n">index</span> <span class="o">=</span> <span class="p">{</span><span class="n">NORTH</span><span class="p">:</span> <span class="mi">0</span><span class="p">,</span> <span class="n">EAST</span><span class="p">:</span> <span class="mi">1</span><span class="p">,</span> <span class="n">SOUTH</span><span class="p">:</span> <span class="mi">2</span><span class="p">,</span> <span class="n">WEST</span><span class="p">:</span> <span class="mi">3</span><span class="p">,</span> <span class="n">EXIT</span><span class="p">:</span> <span class="o">-</span><span class="mi">1</span><span class="p">}</span>
    <span class="n">GAMEOVER</span> <span class="o">=</span> <span class="p">(</span><span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="o">-</span><span class="mi">1</span><span class="p">)</span>     <span class="c1"># by convenience, the next state of terminals is (-1, -1)</span>

    <span class="k">def</span> <span class="fm">__init__</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">shape</span><span class="p">,</span> <span class="n">prob</span><span class="p">,</span> <span class="n">walls</span><span class="p">,</span> <span class="n">terminals</span><span class="p">,</span> <span class="n">alive_reward</span><span class="o">=</span><span class="mf">0.0</span><span class="p">):</span>
        <span class="sd">&quot;&quot;&quot;</span>
<span class="sd">        :param shape: shape of gridworld: (row, col)</span>
<span class="sd">        :param prob: probability to go north(for stochastic move)</span>
<span class="sd">        :param walls: list of walls: [(1, 1)] if only one wall at (1, 1)</span>
<span class="sd">        :param terminals: dictionary of goal and death terminal states with reward</span>
<span class="sd">               {(0, 3): +1, (1, 3): -1} in this problem</span>
<span class="sd">        :param alive_reward: alive reward</span>
<span class="sd">        &quot;&quot;&quot;</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">rows</span><span class="p">,</span> <span class="bp">self</span><span class="o">.</span><span class="n">cols</span> <span class="o">=</span> <span class="n">shape</span>
        <span class="n">p_not_north</span> <span class="o">=</span> <span class="p">(</span><span class="mi">1</span> <span class="o">-</span> <span class="n">prob</span><span class="p">)</span> <span class="o">/</span> <span class="mi">2</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">turns</span> <span class="o">=</span> <span class="p">{</span><span class="o">-</span><span class="mi">1</span><span class="p">:</span> <span class="n">p_not_north</span><span class="p">,</span> <span class="mi">0</span><span class="p">:</span> <span class="n">prob</span><span class="p">,</span> <span class="mi">1</span><span class="p">:</span> <span class="n">p_not_north</span><span class="p">}</span>    <span class="c1"># turn west, north, or east</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">walls</span> <span class="o">=</span> <span class="nb">set</span><span class="p">(</span><span class="n">walls</span><span class="p">)</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">terminals</span> <span class="o">=</span> <span class="n">terminals</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">alive_reward</span> <span class="o">=</span> <span class="n">alive_reward</span>

    <span class="k">def</span> <span class="nf">getStates</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="sd">&quot;&quot;&quot;</span>
<span class="sd">        All available states(all states except wall(s))</span>
<span class="sd">        &quot;&quot;&quot;</span>
        <span class="k">return</span> <span class="p">[(</span><span class="n">i</span><span class="p">,</span> <span class="n">j</span><span class="p">)</span> <span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">rows</span><span class="p">)</span>
                <span class="k">for</span> <span class="n">j</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">cols</span><span class="p">)</span> <span class="k">if</span> <span class="p">(</span><span class="n">i</span><span class="p">,</span> <span class="n">j</span><span class="p">)</span> <span class="ow">not</span> <span class="ow">in</span> <span class="bp">self</span><span class="o">.</span><span class="n">walls</span><span class="p">]</span>

    <span class="k">def</span> <span class="nf">getTransitionStatesAndProbs</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">state</span><span class="p">,</span> <span class="n">action</span><span class="p">):</span>
        <span class="sd">&quot;&quot;&quot;</span>
<span class="sd">        get all (next state, p(s&#39; | s, a)), in terms of stochastic action</span>
<span class="sd">        :return: list of (next_state, probability to the next state given current state and action)</span>
<span class="sd">        &quot;&quot;&quot;</span>
        <span class="k">if</span> <span class="n">state</span> <span class="ow">in</span> <span class="bp">self</span><span class="o">.</span><span class="n">terminals</span><span class="p">:</span>
            <span class="c1"># if the state is terminal state, the probability of game over is 1</span>
            <span class="k">return</span> <span class="p">[(</span><span class="n">GridWorldEnv</span><span class="o">.</span><span class="n">GAMEOVER</span><span class="p">,</span> <span class="mf">1.0</span><span class="p">)]</span>
        <span class="n">result</span> <span class="o">=</span> <span class="p">[]</span>
        <span class="k">for</span> <span class="n">turn</span> <span class="ow">in</span> <span class="bp">self</span><span class="o">.</span><span class="n">turns</span><span class="p">:</span>     <span class="c1"># loop over all turns(west, north, east)</span>
            <span class="c1"># turn west, north, or east of the &quot;planned&quot; action for the &quot;real&quot; action</span>
            <span class="c1"># -1, 0, 1, or 2 % 4 to get the &quot;real&quot; tuple of direction(action), e.g.:</span>
            <span class="c1"># planned: EAST, index 1 =&gt; turn is WEST(of EAST), index -1 =&gt; 1 + -1 = 0 =&gt; mod 4 =&gt; 0: real action NORTH</span>
            <span class="c1">#                        =&gt; turn is NORTH(of EAST), index 0 =&gt; 1 + 0 = 1 =&gt; mod 4 =&gt; 1: real action EAST</span>
            <span class="n">direction</span> <span class="o">=</span> <span class="n">GridWorldEnv</span><span class="o">.</span><span class="n">ACTIONS</span><span class="p">[(</span><span class="n">GridWorldEnv</span><span class="o">.</span><span class="n">index</span><span class="p">[</span><span class="n">action</span><span class="p">]</span> <span class="o">+</span> <span class="n">turn</span><span class="p">)</span> <span class="o">%</span> <span class="nb">len</span><span class="p">(</span><span class="n">GridWorldEnv</span><span class="o">.</span><span class="n">ACTIONS</span><span class="p">)]</span>
            <span class="n">row</span> <span class="o">=</span> <span class="n">state</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span> <span class="o">+</span> <span class="n">direction</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span>      <span class="c1"># x coordinate of next state</span>
            <span class="n">col</span> <span class="o">=</span> <span class="n">state</span><span class="p">[</span><span class="mi">1</span><span class="p">]</span> <span class="o">+</span> <span class="n">direction</span><span class="p">[</span><span class="mi">1</span><span class="p">]</span>      <span class="c1"># y coordinate of next state</span>
            <span class="n">next_state</span> <span class="o">=</span> <span class="p">(</span><span class="n">row</span> <span class="k">if</span> <span class="mi">0</span> <span class="o">&lt;=</span> <span class="n">row</span> <span class="o">&lt;</span> <span class="bp">self</span><span class="o">.</span><span class="n">rows</span> <span class="k">else</span> <span class="n">state</span><span class="p">[</span><span class="mi">0</span><span class="p">],</span>
                          <span class="n">col</span> <span class="k">if</span> <span class="mi">0</span> <span class="o">&lt;=</span> <span class="n">col</span> <span class="o">&lt;</span> <span class="bp">self</span><span class="o">.</span><span class="n">cols</span> <span class="k">else</span> <span class="n">state</span><span class="p">[</span><span class="mi">1</span><span class="p">])</span>       <span class="c1"># possible next state considered wall(s)</span>
            <span class="k">if</span> <span class="n">next_state</span> <span class="ow">in</span> <span class="bp">self</span><span class="o">.</span><span class="n">walls</span><span class="p">:</span>    <span class="c1"># stay if is wall</span>
                <span class="n">next_state</span> <span class="o">=</span> <span class="n">state</span>
            <span class="n">prob</span> <span class="o">=</span> <span class="bp">self</span><span class="o">.</span><span class="n">turns</span><span class="p">[</span><span class="n">turn</span><span class="p">]</span>
            <span class="n">result</span><span class="o">.</span><span class="n">append</span><span class="p">((</span><span class="n">next_state</span><span class="p">,</span> <span class="n">prob</span><span class="p">))</span>
        <span class="k">return</span> <span class="n">result</span>

    <span class="k">def</span> <span class="nf">getReward</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">state</span><span class="p">,</span> <span class="n">action</span><span class="p">,</span> <span class="n">nextState</span><span class="p">):</span>
        <span class="sd">&quot;&quot;&quot;</span>
<span class="sd">        r(s, a, s&#39;)</span>
<span class="sd">        &quot;&quot;&quot;</span>
        <span class="k">if</span> <span class="n">state</span> <span class="ow">in</span> <span class="bp">self</span><span class="o">.</span><span class="n">terminals</span><span class="p">:</span>
            <span class="k">return</span> <span class="bp">self</span><span class="o">.</span><span class="n">terminals</span><span class="p">[</span><span class="n">state</span><span class="p">]</span>    <span class="c1"># get reward(penalty) for terminal states</span>
        <span class="k">else</span><span class="p">:</span>
            <span class="k">return</span> <span class="bp">self</span><span class="o">.</span><span class="n">alive_reward</span>        <span class="c1"># alive exploration rewards</span>

    <span class="nd">@staticmethod</span>
    <span class="k">def</span> <span class="nf">isTerminal</span><span class="p">(</span><span class="n">next_state</span><span class="p">):</span>
        <span class="sd">&quot;&quot;&quot;</span>
<span class="sd">        check if next state is terminal state, and by convenience, the next state of terminals is (-1, -1)</span>
<span class="sd">        &quot;&quot;&quot;</span>
        <span class="k">return</span> <span class="n">next_state</span> <span class="o">==</span> <span class="n">GridWorldEnv</span><span class="o">.</span><span class="n">GAMEOVER</span>

    <span class="k">def</span> <span class="nf">getLegalActions</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">state</span><span class="p">):</span>
        <span class="sd">&quot;&quot;&quot;</span>
<span class="sd">        get all possible actions, if state the terminal, by convenience return (INF, INF)</span>
<span class="sd">        &quot;&quot;&quot;</span>
        <span class="k">if</span> <span class="n">state</span> <span class="ow">in</span> <span class="bp">self</span><span class="o">.</span><span class="n">terminals</span><span class="p">:</span>
            <span class="k">return</span> <span class="p">[</span><span class="n">GridWorldEnv</span><span class="o">.</span><span class="n">EXIT</span><span class="p">]</span>
        <span class="k">else</span><span class="p">:</span>
            <span class="k">return</span> <span class="n">GridWorldEnv</span><span class="o">.</span><span class="n">ACTIONS</span>

    <span class="k">def</span> <span class="nf">to_2d_array</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">in_list</span><span class="p">,</span> <span class="n">add</span><span class="o">=</span><span class="kc">None</span><span class="p">):</span>
        <span class="sd">&quot;&quot;&quot;</span>
<span class="sd">        input list to 2D array(matrix) based on rows and columns</span>
<span class="sd">        &quot;&quot;&quot;</span>
        <span class="n">mat</span> <span class="o">=</span> <span class="p">[]</span>
        <span class="n">k</span> <span class="o">=</span> <span class="kc">False</span>
        <span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">rows</span><span class="p">):</span>
            <span class="n">temp</span> <span class="o">=</span> <span class="p">[]</span>
            <span class="k">for</span> <span class="n">j</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">cols</span><span class="p">):</span>
                <span class="k">if</span> <span class="n">add</span> <span class="ow">is</span> <span class="ow">not</span> <span class="kc">None</span><span class="p">:</span>
                    <span class="k">if</span> <span class="p">(</span><span class="n">i</span><span class="p">,</span> <span class="n">j</span><span class="p">)</span> <span class="ow">in</span> <span class="bp">self</span><span class="o">.</span><span class="n">walls</span><span class="p">:</span>
                        <span class="n">temp</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">add</span><span class="p">)</span>
                        <span class="n">k</span> <span class="o">=</span> <span class="kc">True</span>
                        <span class="k">continue</span>
                <span class="k">if</span> <span class="n">k</span><span class="p">:</span>
                    <span class="n">temp</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">in_list</span><span class="p">[</span><span class="n">i</span> <span class="o">*</span> <span class="bp">self</span><span class="o">.</span><span class="n">cols</span> <span class="o">+</span> <span class="n">j</span> <span class="o">-</span> <span class="mi">1</span><span class="p">])</span>
                <span class="k">else</span><span class="p">:</span>
                    <span class="n">temp</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">in_list</span><span class="p">[</span><span class="n">i</span> <span class="o">*</span> <span class="bp">self</span><span class="o">.</span><span class="n">cols</span> <span class="o">+</span> <span class="n">j</span><span class="p">])</span>
            <span class="n">mat</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">temp</span><span class="p">)</span>
        <span class="k">return</span> <span class="n">mat</span>

    <span class="k">def</span> <span class="nf">printValues</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">values</span><span class="p">):</span>
        <span class="sd">&quot;&quot;&quot;</span>
<span class="sd">        visualize values in a table</span>
<span class="sd">        &quot;&quot;&quot;</span>
        <span class="n">fig</span><span class="p">,</span> <span class="n">ax</span> <span class="o">=</span> <span class="n">plt</span><span class="o">.</span><span class="n">subplots</span><span class="p">()</span>
        <span class="n">ax</span><span class="o">.</span><span class="n">set_axis_off</span><span class="p">()</span>
        <span class="n">tb</span> <span class="o">=</span> <span class="n">Table</span><span class="p">(</span><span class="n">ax</span><span class="p">,</span> <span class="n">bbox</span><span class="o">=</span><span class="p">[</span><span class="mi">0</span><span class="p">,</span> <span class="mi">0</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="mi">1</span><span class="p">])</span>
        <span class="n">values</span> <span class="o">=</span> <span class="nb">list</span><span class="p">(</span><span class="n">values</span><span class="o">.</span><span class="n">values</span><span class="p">())</span>
        <span class="n">values</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">round</span><span class="p">(</span><span class="n">np</span><span class="o">.</span><span class="n">array</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">to_2d_array</span><span class="p">(</span><span class="n">values</span><span class="p">,</span> <span class="n">add</span><span class="o">=</span><span class="mi">0</span><span class="p">)),</span> <span class="n">decimals</span><span class="o">=</span><span class="mi">2</span><span class="p">)</span>
        <span class="n">width</span><span class="p">,</span> <span class="n">height</span> <span class="o">=</span> <span class="mf">1.0</span> <span class="o">/</span> <span class="bp">self</span><span class="o">.</span><span class="n">rows</span><span class="p">,</span> <span class="mf">1.0</span> <span class="o">/</span> <span class="bp">self</span><span class="o">.</span><span class="n">cols</span>
        <span class="c1"># Add cells</span>
        <span class="k">for</span> <span class="p">(</span><span class="n">i</span><span class="p">,</span> <span class="n">j</span><span class="p">),</span> <span class="n">val</span> <span class="ow">in</span> <span class="n">np</span><span class="o">.</span><span class="n">ndenumerate</span><span class="p">(</span><span class="n">values</span><span class="p">):</span>
            <span class="n">tb</span><span class="o">.</span><span class="n">add_cell</span><span class="p">(</span><span class="n">i</span><span class="p">,</span> <span class="n">j</span><span class="p">,</span> <span class="n">width</span><span class="p">,</span> <span class="n">height</span><span class="p">,</span> <span class="n">text</span><span class="o">=</span><span class="n">val</span><span class="p">,</span>
                        <span class="n">loc</span><span class="o">=</span><span class="s1">&#39;center&#39;</span><span class="p">,</span> <span class="n">facecolor</span><span class="o">=</span><span class="s1">&#39;white&#39;</span><span class="p">)</span>
        <span class="c1"># Row and column labels...</span>
        <span class="n">n</span> <span class="o">=</span> <span class="nb">max</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">rows</span><span class="p">,</span> <span class="bp">self</span><span class="o">.</span><span class="n">cols</span><span class="p">)</span>
        <span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="n">n</span><span class="p">):</span>
            <span class="k">if</span> <span class="n">i</span> <span class="o">&lt;</span> <span class="bp">self</span><span class="o">.</span><span class="n">rows</span><span class="p">:</span>
                <span class="n">tb</span><span class="o">.</span><span class="n">add_cell</span><span class="p">(</span><span class="n">i</span><span class="p">,</span> <span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="n">width</span><span class="p">,</span> <span class="n">height</span><span class="p">,</span> <span class="n">text</span><span class="o">=</span><span class="bp">self</span><span class="o">.</span><span class="n">rows</span><span class="o">-</span><span class="n">i</span><span class="p">,</span> <span class="n">loc</span><span class="o">=</span><span class="s1">&#39;right&#39;</span><span class="p">,</span>
                            <span class="n">edgecolor</span><span class="o">=</span><span class="s1">&#39;none&#39;</span><span class="p">,</span> <span class="n">facecolor</span><span class="o">=</span><span class="s1">&#39;none&#39;</span><span class="p">)</span>
            <span class="k">if</span> <span class="n">i</span> <span class="o">&lt;</span> <span class="bp">self</span><span class="o">.</span><span class="n">cols</span><span class="p">:</span>
                <span class="n">tb</span><span class="o">.</span><span class="n">add_cell</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">rows</span><span class="p">,</span> <span class="n">i</span><span class="p">,</span> <span class="n">width</span><span class="p">,</span> <span class="n">height</span> <span class="o">/</span> <span class="mi">2</span><span class="p">,</span> <span class="n">text</span><span class="o">=</span><span class="n">i</span><span class="o">+</span><span class="mi">1</span><span class="p">,</span> <span class="n">loc</span><span class="o">=</span><span class="s1">&#39;center&#39;</span><span class="p">,</span>
                            <span class="n">edgecolor</span><span class="o">=</span><span class="s1">&#39;none&#39;</span><span class="p">,</span> <span class="n">facecolor</span><span class="o">=</span><span class="s1">&#39;none&#39;</span><span class="p">)</span>
        <span class="n">tb</span><span class="o">.</span><span class="n">set_fontsize</span><span class="p">(</span><span class="mi">13</span><span class="p">)</span>
        <span class="n">ax</span><span class="o">.</span><span class="n">add_table</span><span class="p">(</span><span class="n">tb</span><span class="p">)</span>
        <span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">()</span>

    <span class="k">def</span> <span class="nf">printQValues</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">q_values</span><span class="p">):</span>
        <span class="n">fig</span><span class="p">,</span> <span class="n">ax</span> <span class="o">=</span> <span class="n">plt</span><span class="o">.</span><span class="n">subplots</span><span class="p">()</span>
        <span class="n">ax</span><span class="o">.</span><span class="n">set_axis_off</span><span class="p">()</span>
        <span class="n">tb</span> <span class="o">=</span> <span class="n">Table</span><span class="p">(</span><span class="n">ax</span><span class="p">,</span> <span class="n">bbox</span><span class="o">=</span><span class="p">[</span><span class="mi">0</span><span class="p">,</span> <span class="mi">0</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="mi">1</span><span class="p">])</span>
        <span class="n">width</span><span class="p">,</span> <span class="n">height</span> <span class="o">=</span> <span class="mf">1.0</span> <span class="o">/</span> <span class="bp">self</span><span class="o">.</span><span class="n">rows</span><span class="p">,</span> <span class="mf">1.0</span> <span class="o">/</span> <span class="bp">self</span><span class="o">.</span><span class="n">cols</span>
        <span class="n">qs</span> <span class="o">=</span> <span class="p">[]</span>
        <span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">rows</span><span class="p">):</span>
            <span class="k">for</span> <span class="n">j</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">cols</span><span class="p">):</span>
                <span class="n">q</span> <span class="o">=</span> <span class="s1">&#39;&#39;</span>
                <span class="k">if</span> <span class="p">(</span><span class="n">i</span><span class="p">,</span> <span class="n">j</span><span class="p">)</span> <span class="ow">in</span> <span class="bp">self</span><span class="o">.</span><span class="n">walls</span> <span class="ow">or</span> <span class="p">(</span><span class="n">i</span><span class="p">,</span> <span class="n">j</span><span class="p">)</span> <span class="ow">in</span> <span class="nb">list</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">terminals</span><span class="o">.</span><span class="n">keys</span><span class="p">()):</span>
                    <span class="n">q</span> <span class="o">+=</span> <span class="s2">&quot;           </span><span class="se">\n</span><span class="s2">&quot;</span>
                <span class="k">else</span><span class="p">:</span>
                    <span class="n">q</span> <span class="o">+=</span> <span class="s2">&quot;   </span><span class="si">%.2f</span><span class="s2">   </span><span class="se">\n</span><span class="s2">&quot;</span> <span class="o">%</span> <span class="p">(</span><span class="n">q_values</span><span class="p">[(</span><span class="n">i</span><span class="p">,</span> <span class="n">j</span><span class="p">),</span> <span class="n">GridWorldEnv</span><span class="o">.</span><span class="n">NORTH</span><span class="p">])</span>
                <span class="k">if</span> <span class="p">(</span><span class="n">i</span><span class="p">,</span> <span class="n">j</span><span class="p">)</span> <span class="ow">in</span> <span class="bp">self</span><span class="o">.</span><span class="n">walls</span><span class="p">:</span>
                    <span class="n">q</span> <span class="o">+=</span> <span class="s2">&quot;           </span><span class="se">\n</span><span class="s2">&quot;</span>
                <span class="k">elif</span> <span class="p">(</span><span class="n">i</span><span class="p">,</span> <span class="n">j</span><span class="p">)</span> <span class="ow">in</span> <span class="bp">self</span><span class="o">.</span><span class="n">terminals</span><span class="p">:</span>
                    <span class="n">q</span> <span class="o">+=</span> <span class="s2">&quot;   </span><span class="si">%.2f</span><span class="s2">   </span><span class="se">\n</span><span class="s2">&quot;</span> <span class="o">%</span> <span class="n">q_values</span><span class="p">[(</span><span class="n">i</span><span class="p">,</span> <span class="n">j</span><span class="p">),</span> <span class="n">GridWorldEnv</span><span class="o">.</span><span class="n">EXIT</span><span class="p">]</span>
                <span class="k">else</span><span class="p">:</span>
                    <span class="n">q</span> <span class="o">+=</span> <span class="s2">&quot;</span><span class="si">%.2f</span><span class="s2">    </span><span class="si">%.2f</span><span class="se">\n</span><span class="s2">&quot;</span> <span class="o">%</span> <span class="p">(</span><span class="n">q_values</span><span class="p">[(</span><span class="n">i</span><span class="p">,</span> <span class="n">j</span><span class="p">),</span> <span class="n">GridWorldEnv</span><span class="o">.</span><span class="n">WEST</span><span class="p">],</span> <span class="n">q_values</span><span class="p">[(</span><span class="n">i</span><span class="p">,</span> <span class="n">j</span><span class="p">),</span> <span class="n">GridWorldEnv</span><span class="o">.</span><span class="n">EAST</span><span class="p">])</span>
                <span class="k">if</span> <span class="p">(</span><span class="n">i</span><span class="p">,</span> <span class="n">j</span><span class="p">)</span> <span class="ow">in</span> <span class="bp">self</span><span class="o">.</span><span class="n">walls</span> <span class="ow">or</span> <span class="p">(</span><span class="n">i</span><span class="p">,</span> <span class="n">j</span><span class="p">)</span> <span class="ow">in</span> <span class="nb">list</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">terminals</span><span class="o">.</span><span class="n">keys</span><span class="p">()):</span>
                    <span class="n">q</span> <span class="o">+=</span> <span class="s2">&quot;           &quot;</span>
                <span class="k">else</span><span class="p">:</span>
                    <span class="n">q</span> <span class="o">+=</span> <span class="s2">&quot;   </span><span class="si">%.2f</span><span class="s2">   &quot;</span> <span class="o">%</span> <span class="p">(</span><span class="n">q_values</span><span class="p">[(</span><span class="n">i</span><span class="p">,</span> <span class="n">j</span><span class="p">),</span> <span class="n">GridWorldEnv</span><span class="o">.</span><span class="n">SOUTH</span><span class="p">])</span>
                <span class="n">qs</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">q</span><span class="p">)</span>
        <span class="n">qs</span> <span class="o">=</span> <span class="bp">self</span><span class="o">.</span><span class="n">to_2d_array</span><span class="p">(</span><span class="n">qs</span><span class="p">)</span>
        <span class="n">qs</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">array</span><span class="p">(</span><span class="n">qs</span><span class="p">)</span>
        <span class="k">for</span> <span class="p">(</span><span class="n">i</span><span class="p">,</span> <span class="n">j</span><span class="p">),</span> <span class="n">q</span> <span class="ow">in</span> <span class="n">np</span><span class="o">.</span><span class="n">ndenumerate</span><span class="p">(</span><span class="n">qs</span><span class="p">):</span>
            <span class="n">tb</span><span class="o">.</span><span class="n">add_cell</span><span class="p">(</span><span class="n">i</span><span class="p">,</span> <span class="n">j</span><span class="p">,</span> <span class="n">width</span><span class="p">,</span> <span class="n">height</span><span class="p">,</span> <span class="n">text</span><span class="o">=</span><span class="n">q</span><span class="p">,</span>
                        <span class="n">loc</span><span class="o">=</span><span class="s1">&#39;center&#39;</span><span class="p">,</span> <span class="n">facecolor</span><span class="o">=</span><span class="s1">&#39;white&#39;</span><span class="p">)</span>
        <span class="n">n</span> <span class="o">=</span> <span class="nb">max</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">rows</span><span class="p">,</span> <span class="bp">self</span><span class="o">.</span><span class="n">cols</span><span class="p">)</span>
        <span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="n">n</span><span class="p">):</span>
            <span class="k">if</span> <span class="n">i</span> <span class="o">&lt;</span> <span class="bp">self</span><span class="o">.</span><span class="n">rows</span><span class="p">:</span>
                <span class="n">tb</span><span class="o">.</span><span class="n">add_cell</span><span class="p">(</span><span class="n">i</span><span class="p">,</span> <span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="n">width</span><span class="p">,</span> <span class="n">height</span><span class="p">,</span> <span class="n">text</span><span class="o">=</span><span class="bp">self</span><span class="o">.</span><span class="n">rows</span> <span class="o">-</span> <span class="n">i</span><span class="p">,</span> <span class="n">loc</span><span class="o">=</span><span class="s1">&#39;right&#39;</span><span class="p">,</span>
                            <span class="n">edgecolor</span><span class="o">=</span><span class="s1">&#39;none&#39;</span><span class="p">,</span> <span class="n">facecolor</span><span class="o">=</span><span class="s1">&#39;none&#39;</span><span class="p">)</span>
            <span class="k">if</span> <span class="n">i</span> <span class="o">&lt;</span> <span class="bp">self</span><span class="o">.</span><span class="n">cols</span><span class="p">:</span>
                <span class="n">tb</span><span class="o">.</span><span class="n">add_cell</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">rows</span><span class="p">,</span> <span class="n">i</span><span class="p">,</span> <span class="n">width</span><span class="p">,</span> <span class="n">height</span> <span class="o">/</span> <span class="mi">2</span><span class="p">,</span> <span class="n">text</span><span class="o">=</span><span class="n">i</span> <span class="o">+</span> <span class="mi">1</span><span class="p">,</span> <span class="n">loc</span><span class="o">=</span><span class="s1">&#39;center&#39;</span><span class="p">,</span>
                            <span class="n">edgecolor</span><span class="o">=</span><span class="s1">&#39;none&#39;</span><span class="p">,</span> <span class="n">facecolor</span><span class="o">=</span><span class="s1">&#39;none&#39;</span><span class="p">)</span>
        <span class="n">tb</span><span class="o">.</span><span class="n">set_fontsize</span><span class="p">(</span><span class="mi">15</span><span class="p">)</span>
        <span class="n">ax</span><span class="o">.</span><span class="n">add_table</span><span class="p">(</span><span class="n">tb</span><span class="p">)</span>
        <span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">()</span>

    <span class="k">def</span> <span class="nf">printPolicy</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">policy</span><span class="p">):</span>
        <span class="n">action_map</span> <span class="o">=</span> <span class="p">{</span><span class="mi">0</span><span class="p">:</span> <span class="s1">&#39;↑&#39;</span><span class="p">,</span> <span class="mi">1</span><span class="p">:</span> <span class="s1">&#39;→&#39;</span><span class="p">,</span>
                  <span class="mi">2</span><span class="p">:</span> <span class="s1">&#39;↓&#39;</span><span class="p">,</span> <span class="mi">3</span><span class="p">:</span> <span class="s1">&#39;←&#39;</span><span class="p">,</span>
                  <span class="o">-</span><span class="mi">1</span><span class="p">:</span> <span class="s1">&#39; &#39;</span><span class="p">}</span>
        <span class="n">policy</span> <span class="o">=</span> <span class="nb">list</span><span class="p">(</span><span class="n">policy</span><span class="o">.</span><span class="n">values</span><span class="p">())</span>
        <span class="n">policy</span> <span class="o">=</span> <span class="bp">self</span><span class="o">.</span><span class="n">to_2d_array</span><span class="p">(</span><span class="n">policy</span><span class="p">,</span> <span class="n">add</span><span class="o">=-</span><span class="mi">1</span><span class="p">)</span>
        <span class="n">policy</span> <span class="o">=</span> <span class="n">np</span><span class="o">.</span><span class="n">array</span><span class="p">(</span><span class="n">policy</span><span class="p">,</span> <span class="n">dtype</span><span class="o">=</span><span class="nb">object</span><span class="p">)</span>
        <span class="n">fig</span><span class="p">,</span> <span class="n">ax</span> <span class="o">=</span> <span class="n">plt</span><span class="o">.</span><span class="n">subplots</span><span class="p">()</span>
        <span class="n">ax</span><span class="o">.</span><span class="n">set_axis_off</span><span class="p">()</span>
        <span class="n">tb</span> <span class="o">=</span> <span class="n">Table</span><span class="p">(</span><span class="n">ax</span><span class="p">,</span> <span class="n">bbox</span><span class="o">=</span><span class="p">[</span><span class="mi">0</span><span class="p">,</span> <span class="mi">0</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="mi">1</span><span class="p">])</span>
        <span class="n">width</span><span class="p">,</span> <span class="n">height</span> <span class="o">=</span> <span class="mf">1.0</span> <span class="o">/</span> <span class="bp">self</span><span class="o">.</span><span class="n">rows</span><span class="p">,</span> <span class="mf">1.0</span> <span class="o">/</span> <span class="bp">self</span><span class="o">.</span><span class="n">cols</span>
        <span class="k">for</span> <span class="p">(</span><span class="n">i</span><span class="p">,</span> <span class="n">j</span><span class="p">),</span> <span class="n">action</span> <span class="ow">in</span> <span class="n">np</span><span class="o">.</span><span class="n">ndenumerate</span><span class="p">(</span><span class="n">policy</span><span class="p">):</span>
            <span class="k">if</span> <span class="p">(</span><span class="n">i</span><span class="p">,</span> <span class="n">j</span><span class="p">)</span> <span class="ow">in</span> <span class="bp">self</span><span class="o">.</span><span class="n">walls</span><span class="p">:</span>
                <span class="n">tb</span><span class="o">.</span><span class="n">add_cell</span><span class="p">(</span><span class="n">i</span><span class="p">,</span> <span class="n">j</span><span class="p">,</span> <span class="n">width</span><span class="p">,</span> <span class="n">height</span><span class="p">,</span> <span class="n">text</span><span class="o">=</span><span class="s1">&#39;&#39;</span><span class="p">,</span>
                            <span class="n">loc</span><span class="o">=</span><span class="s1">&#39;center&#39;</span><span class="p">,</span> <span class="n">facecolor</span><span class="o">=</span><span class="s1">&#39;gray&#39;</span><span class="p">)</span>
            <span class="k">elif</span> <span class="p">(</span><span class="n">i</span><span class="p">,</span> <span class="n">j</span><span class="p">)</span> <span class="o">==</span> <span class="nb">list</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">terminals</span><span class="o">.</span><span class="n">keys</span><span class="p">())[</span><span class="mi">0</span><span class="p">]:</span>
                 <span class="n">tb</span><span class="o">.</span><span class="n">add_cell</span><span class="p">(</span><span class="n">i</span><span class="p">,</span> <span class="n">j</span><span class="p">,</span> <span class="n">width</span><span class="p">,</span> <span class="n">height</span><span class="p">,</span> <span class="n">text</span><span class="o">=</span><span class="s1">&#39;+1&#39;</span><span class="p">,</span>
                            <span class="n">loc</span><span class="o">=</span><span class="s1">&#39;center&#39;</span><span class="p">,</span> <span class="n">facecolor</span><span class="o">=</span><span class="s1">&#39;blue&#39;</span><span class="p">)</span>
            <span class="k">elif</span> <span class="p">(</span><span class="n">i</span><span class="p">,</span> <span class="n">j</span><span class="p">)</span> <span class="o">==</span> <span class="nb">list</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">terminals</span><span class="o">.</span><span class="n">keys</span><span class="p">())[</span><span class="mi">1</span><span class="p">]:</span>
                <span class="n">tb</span><span class="o">.</span><span class="n">add_cell</span><span class="p">(</span><span class="n">i</span><span class="p">,</span> <span class="n">j</span><span class="p">,</span> <span class="n">width</span><span class="p">,</span> <span class="n">height</span><span class="p">,</span> <span class="n">text</span><span class="o">=</span><span class="s1">&#39;-1&#39;</span><span class="p">,</span>
                            <span class="n">loc</span><span class="o">=</span><span class="s1">&#39;center&#39;</span><span class="p">,</span> <span class="n">facecolor</span><span class="o">=</span><span class="s1">&#39;red&#39;</span><span class="p">)</span>
            <span class="k">else</span><span class="p">:</span>
                <span class="n">tb</span><span class="o">.</span><span class="n">add_cell</span><span class="p">(</span><span class="n">i</span><span class="p">,</span> <span class="n">j</span><span class="p">,</span> <span class="n">width</span><span class="p">,</span> <span class="n">height</span><span class="p">,</span> <span class="n">text</span><span class="o">=</span><span class="n">action_map</span><span class="p">[</span><span class="n">action</span><span class="p">],</span>
                            <span class="n">loc</span><span class="o">=</span><span class="s1">&#39;center&#39;</span><span class="p">,</span> <span class="n">facecolor</span><span class="o">=</span><span class="s1">&#39;white&#39;</span><span class="p">)</span>

        <span class="n">n</span> <span class="o">=</span> <span class="nb">max</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">rows</span><span class="p">,</span> <span class="bp">self</span><span class="o">.</span><span class="n">cols</span><span class="p">)</span>
        <span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="n">n</span><span class="p">):</span>
            <span class="k">if</span> <span class="n">i</span> <span class="o">&lt;</span> <span class="bp">self</span><span class="o">.</span><span class="n">rows</span><span class="p">:</span>
                <span class="n">tb</span><span class="o">.</span><span class="n">add_cell</span><span class="p">(</span><span class="n">i</span><span class="p">,</span> <span class="o">-</span><span class="mi">1</span><span class="p">,</span> <span class="n">width</span><span class="p">,</span> <span class="n">height</span><span class="p">,</span> <span class="n">text</span><span class="o">=</span><span class="bp">self</span><span class="o">.</span><span class="n">rows</span> <span class="o">-</span> <span class="n">i</span><span class="p">,</span> <span class="n">loc</span><span class="o">=</span><span class="s1">&#39;right&#39;</span><span class="p">,</span>
                            <span class="n">edgecolor</span><span class="o">=</span><span class="s1">&#39;none&#39;</span><span class="p">,</span> <span class="n">facecolor</span><span class="o">=</span><span class="s1">&#39;none&#39;</span><span class="p">)</span>
            <span class="k">if</span> <span class="n">i</span> <span class="o">&lt;</span> <span class="bp">self</span><span class="o">.</span><span class="n">cols</span><span class="p">:</span>
                <span class="n">tb</span><span class="o">.</span><span class="n">add_cell</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">rows</span><span class="p">,</span> <span class="n">i</span><span class="p">,</span> <span class="n">width</span><span class="p">,</span> <span class="n">height</span> <span class="o">/</span> <span class="mi">2</span><span class="p">,</span> <span class="n">text</span><span class="o">=</span><span class="n">i</span> <span class="o">+</span> <span class="mi">1</span><span class="p">,</span> <span class="n">loc</span><span class="o">=</span><span class="s1">&#39;center&#39;</span><span class="p">,</span>
                            <span class="n">edgecolor</span><span class="o">=</span><span class="s1">&#39;none&#39;</span><span class="p">,</span> <span class="n">facecolor</span><span class="o">=</span><span class="s1">&#39;none&#39;</span><span class="p">)</span>
        <span class="n">tb</span><span class="o">.</span><span class="n">set_fontsize</span><span class="p">(</span><span class="mi">13</span><span class="p">)</span>
        <span class="n">ax</span><span class="o">.</span><span class="n">add_table</span><span class="p">(</span><span class="n">tb</span><span class="p">)</span>
        <span class="n">plt</span><span class="o">.</span><span class="n">plot</span><span class="p">()</span>

        
<span class="sd">&quot;&quot;&quot;</span>
<span class="sd">--------------------------------------------------------------------------------------</span>
<span class="sd">Bellman Equation:</span>
<span class="sd">v(s) = Σ_{a} π(a | s) Σ_{s&#39;, r} p(s&#39;, r | s, a) * [r + γ * v(s&#39;)]</span>
<span class="sd">Bellman Optimality Equation:</span>
<span class="sd">v*(s) = max_{a} { Σ p(s&#39;, r | s, a) * [r + γ * v(s&#39;)] }</span>
<span class="sd">      = max q_{π*} (s, a) = max q(s, a), as π(a | s) is unchanged in this MDP problem</span>
<span class="sd">@author: Charles Zhang</span>
<span class="sd">@date Mar 28, 2021</span>
<span class="sd">--------------------------------------------------------------------------------------</span>
<span class="sd">&quot;&quot;&quot;</span>
<span class="kn">from</span> <span class="nn">collections</span> <span class="kn">import</span> <span class="n">defaultdict</span>


<span class="c1"># MDP Value Iteration with Bellman update</span>
<span class="k">class</span> <span class="nc">ValueIteration</span><span class="p">:</span>
    <span class="sd">&quot;&quot;&quot;</span>
<span class="sd">    Class to Find Optimal Value Functions</span>
<span class="sd">    &quot;&quot;&quot;</span>

    <span class="k">def</span> <span class="nf">valueIteration</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">GridWorld</span><span class="p">,</span> <span class="n">discount</span><span class="o">=</span><span class="mf">0.9</span><span class="p">,</span> <span class="n">iterations</span><span class="o">=</span><span class="mi">100</span><span class="p">):</span>
        <span class="sd">&quot;&quot;&quot;</span>
<span class="sd">        Implement the value iteration algorithm by the optimal value function derived by Bellman equation</span>
<span class="sd">        v*(s) = max q(s, a)</span>
<span class="sd">        :param GridWorld: gridworld environment</span>
<span class="sd">        :param discount: discount gamma</span>
<span class="sd">        :param iterations: iteration times</span>
<span class="sd">        :return dictionary of values of all states</span>
<span class="sd">        &quot;&quot;&quot;</span>
        <span class="n">values</span> <span class="o">=</span> <span class="n">defaultdict</span><span class="p">(</span><span class="k">lambda</span><span class="p">:</span> <span class="mi">0</span><span class="p">)</span>     <span class="c1"># initialize values with all 0 of states</span>
        <span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="n">iterations</span><span class="p">):</span>         <span class="c1"># or while TRUE:</span>
            <span class="n">vnext</span> <span class="o">=</span> <span class="n">defaultdict</span><span class="p">(</span><span class="k">lambda</span><span class="p">:</span> <span class="mi">0</span><span class="p">)</span>           <span class="c1"># initialize values for each iteration with all 0 of states</span>
            <span class="k">for</span> <span class="n">state</span> <span class="ow">in</span> <span class="n">GridWorld</span><span class="o">.</span><span class="n">getStates</span><span class="p">():</span>      <span class="c1"># loop over all possible state(all states except wall(s))</span>
                <span class="k">if</span> <span class="ow">not</span> <span class="n">GridWorld</span><span class="o">.</span><span class="n">isTerminal</span><span class="p">(</span><span class="n">state</span><span class="p">):</span>  <span class="c1"># check if the state is terminal</span>
                    <span class="n">maximum</span> <span class="o">=</span> <span class="nb">float</span><span class="p">(</span><span class="s2">&quot;-inf&quot;</span><span class="p">)</span>
                    <span class="k">for</span> <span class="n">action</span> <span class="ow">in</span> <span class="n">GridWorld</span><span class="o">.</span><span class="n">getLegalActions</span><span class="p">(</span><span class="n">state</span><span class="p">):</span>     <span class="c1"># loop over all possible actions</span>
                        <span class="n">q_value</span> <span class="o">=</span> <span class="bp">self</span><span class="o">.</span><span class="n">get_q_from_v</span><span class="p">(</span><span class="n">GridWorld</span><span class="p">,</span> <span class="n">state</span><span class="p">,</span> <span class="n">action</span><span class="p">,</span> <span class="n">values</span><span class="p">,</span> <span class="n">discount</span><span class="p">)</span>
                        <span class="n">maximum</span> <span class="o">=</span> <span class="nb">max</span><span class="p">(</span><span class="n">maximum</span><span class="p">,</span> <span class="n">q_value</span><span class="p">)</span>     <span class="c1"># update the max q value among actions of current state</span>
                    <span class="n">vnext</span><span class="p">[</span><span class="n">state</span><span class="p">]</span> <span class="o">=</span> <span class="n">maximum</span>      <span class="c1"># optimal v*(s) = max q(s, a)</span>
            <span class="n">values</span> <span class="o">=</span> <span class="n">vnext</span>      <span class="c1"># update the new value table</span>
            <span class="c1"># if while TURE above, here could compare the difference between</span>
            <span class="c1"># values and vnext to see if converges, and end the loop</span>
        <span class="k">return</span> <span class="n">values</span>

    <span class="nd">@staticmethod</span>
    <span class="k">def</span> <span class="nf">get_q_from_v</span><span class="p">(</span><span class="n">GridWorld</span><span class="p">,</span> <span class="n">state</span><span class="p">,</span> <span class="n">action</span><span class="p">,</span> <span class="n">values</span><span class="p">,</span> <span class="n">discount</span><span class="o">=</span><span class="mf">0.9</span><span class="p">):</span>
        <span class="sd">&quot;&quot;&quot;</span>
<span class="sd">        get q(s, a) from values v(s) and action a by</span>
<span class="sd">        Bellman Equation: q(s, a) = Σ p(s&#39;, r | s, a) * [r + γ * v(s&#39;)]</span>
<span class="sd">        :param GridWorld: gridworld environment</span>
<span class="sd">        :param state: current state s</span>
<span class="sd">        :param action: current selected action a</span>
<span class="sd">        :param values: current values table</span>
<span class="sd">        :param discount: discount gamma</span>
<span class="sd">        :return: float q(s, a)</span>
<span class="sd">        &quot;&quot;&quot;</span>
        <span class="n">q_val</span> <span class="o">=</span> <span class="mi">0</span>
        <span class="c1"># implement Bellman equation: q(s, a) = Σ p(s&#39;, r | s, a) * [r + γ * v(s&#39;)]</span>
        <span class="k">for</span> <span class="n">next_state</span><span class="p">,</span> <span class="n">prob</span> <span class="ow">in</span> <span class="n">GridWorld</span><span class="o">.</span><span class="n">getTransitionStatesAndProbs</span><span class="p">(</span><span class="n">state</span><span class="p">,</span> <span class="n">action</span><span class="p">):</span>
            <span class="n">q_val</span> <span class="o">+=</span> <span class="n">prob</span> <span class="o">*</span> <span class="p">(</span><span class="n">GridWorld</span><span class="o">.</span><span class="n">getReward</span><span class="p">(</span><span class="n">state</span><span class="p">,</span> <span class="n">action</span><span class="p">,</span> <span class="n">next_state</span><span class="p">)</span> <span class="o">+</span> <span class="n">discount</span> <span class="o">*</span> <span class="n">values</span><span class="p">[</span><span class="n">next_state</span><span class="p">])</span>
        <span class="k">return</span> <span class="n">q_val</span>

    <span class="k">def</span> <span class="nf">getQValues</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">GridWorld</span><span class="p">,</span> <span class="n">values</span><span class="p">,</span> <span class="n">discount</span><span class="o">=</span><span class="mf">0.9</span><span class="p">):</span>
        <span class="sd">&quot;&quot;&quot;</span>
<span class="sd">        Get q values by Values</span>
<span class="sd">        :return dictionary of q values of all states</span>
<span class="sd">        &quot;&quot;&quot;</span>
        <span class="n">q_values</span> <span class="o">=</span> <span class="p">{}</span>
        <span class="k">for</span> <span class="n">state</span> <span class="ow">in</span> <span class="n">GridWorld</span><span class="o">.</span><span class="n">getStates</span><span class="p">():</span>
            <span class="k">if</span> <span class="ow">not</span> <span class="n">GridWorld</span><span class="o">.</span><span class="n">isTerminal</span><span class="p">(</span><span class="n">state</span><span class="p">):</span>
                <span class="k">for</span> <span class="n">action</span> <span class="ow">in</span> <span class="n">GridWorld</span><span class="o">.</span><span class="n">getLegalActions</span><span class="p">(</span><span class="n">state</span><span class="p">):</span>
                    <span class="n">q_values</span><span class="p">[</span><span class="n">state</span><span class="p">,</span> <span class="n">action</span><span class="p">]</span> <span class="o">=</span> <span class="bp">self</span><span class="o">.</span><span class="n">get_q_from_v</span><span class="p">(</span><span class="n">GridWorld</span><span class="p">,</span> <span class="n">state</span><span class="p">,</span> <span class="n">action</span><span class="p">,</span> <span class="n">values</span><span class="p">,</span> <span class="n">discount</span><span class="p">)</span>
        <span class="k">return</span> <span class="n">q_values</span>

    <span class="k">def</span> <span class="nf">getPolicy</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">GridWorld</span><span class="p">,</span> <span class="n">values</span><span class="p">,</span> <span class="n">discount</span><span class="o">=</span><span class="mf">0.9</span><span class="p">):</span>
        <span class="sd">&quot;&quot;&quot;</span>
<span class="sd">        get policy by values</span>
<span class="sd">        π*(s) ≈ π(s) = argmax_a Σ p(s&#39;, r | s, a) * [r + γ * v(s&#39;)] = argmax_a q(s, a)</span>
<span class="sd">        :return dictionary of optimal actions of all states</span>
<span class="sd">        &quot;&quot;&quot;</span>
        <span class="n">policy</span> <span class="o">=</span> <span class="p">{}</span>
        <span class="k">for</span> <span class="n">state</span> <span class="ow">in</span> <span class="n">GridWorld</span><span class="o">.</span><span class="n">getStates</span><span class="p">():</span>
            <span class="k">if</span> <span class="ow">not</span> <span class="n">GridWorld</span><span class="o">.</span><span class="n">isTerminal</span><span class="p">(</span><span class="n">state</span><span class="p">):</span>
                <span class="n">maximum</span> <span class="o">=</span> <span class="o">-</span><span class="nb">float</span><span class="p">(</span><span class="s2">&quot;inf&quot;</span><span class="p">)</span>
                <span class="n">best_action</span> <span class="o">=</span> <span class="kc">None</span>
                <span class="c1"># Choose action for the policy based no the max q values among actions of state s</span>
                <span class="k">for</span> <span class="n">action</span> <span class="ow">in</span> <span class="n">GridWorld</span><span class="o">.</span><span class="n">getLegalActions</span><span class="p">(</span><span class="n">state</span><span class="p">):</span>
                    <span class="n">q_value</span> <span class="o">=</span> <span class="bp">self</span><span class="o">.</span><span class="n">get_q_from_v</span><span class="p">(</span><span class="n">GridWorld</span><span class="p">,</span> <span class="n">state</span><span class="p">,</span> <span class="n">action</span><span class="p">,</span> <span class="n">values</span><span class="p">,</span> <span class="n">discount</span><span class="p">)</span>
                    <span class="k">if</span> <span class="n">q_value</span> <span class="o">&gt;</span> <span class="n">maximum</span><span class="p">:</span>
                        <span class="n">maximum</span> <span class="o">=</span> <span class="n">q_value</span>
                        <span class="n">best_action</span> <span class="o">=</span> <span class="n">action</span>
                <span class="n">best_action</span> <span class="o">=</span> <span class="n">GridWorld</span><span class="o">.</span><span class="n">index</span><span class="p">[</span><span class="n">best_action</span><span class="p">]</span>
                <span class="n">policy</span><span class="p">[</span><span class="n">state</span><span class="p">]</span> <span class="o">=</span> <span class="n">best_action</span>
        <span class="k">return</span> <span class="n">policy</span>
</pre></div>

    </div>
</div>
</div>

</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h4 id="No-Alive-Reward-(discount-reward-$\gamma-=-0.9$)">No Alive Reward (discount reward $\gamma = 0.9$)<a class="anchor-link" href="#No-Alive-Reward-(discount-reward-$\gamma-=-0.9$)">&#182;</a></h4>
</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">gamma</span> <span class="o">=</span> <span class="mf">0.9</span>
<span class="n">alive_reward</span> <span class="o">=</span> <span class="mf">0.0</span>
<span class="nb">print</span><span class="p">(</span><span class="s2">&quot;GridWorld Value Iteration with alive reward = </span><span class="si">%.2f</span><span class="s2">, discount gamma  = </span><span class="si">%.2f</span><span class="se">\n</span><span class="s2">&quot;</span> <span class="o">%</span> <span class="p">(</span><span class="n">alive_reward</span><span class="p">,</span> <span class="n">gamma</span><span class="p">))</span>
<span class="n">terminals</span> <span class="o">=</span> <span class="p">{(</span><span class="mi">0</span><span class="p">,</span> <span class="mi">3</span><span class="p">):</span> <span class="mi">1</span><span class="p">,</span> <span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="mi">3</span><span class="p">):</span> <span class="o">-</span><span class="mi">1</span><span class="p">}</span>
<span class="n">gridworld0</span> <span class="o">=</span> <span class="n">GridWorldEnv</span><span class="p">(</span><span class="n">shape</span><span class="o">=</span><span class="p">(</span><span class="mi">3</span><span class="p">,</span> <span class="mi">4</span><span class="p">),</span> <span class="n">prob</span><span class="o">=</span><span class="mf">0.8</span><span class="p">,</span> <span class="n">walls</span><span class="o">=</span><span class="p">[(</span><span class="mi">1</span><span class="p">,</span> <span class="mi">1</span><span class="p">)],</span> <span class="n">terminals</span><span class="o">=</span><span class="n">terminals</span><span class="p">,</span> <span class="n">alive_reward</span><span class="o">=</span><span class="mf">0.0</span><span class="p">)</span>
<span class="n">vi</span> <span class="o">=</span> <span class="n">ValueIteration</span><span class="p">()</span>
<span class="n">values</span> <span class="o">=</span> <span class="n">vi</span><span class="o">.</span><span class="n">valueIteration</span><span class="p">(</span><span class="n">GridWorld</span><span class="o">=</span><span class="n">gridworld0</span><span class="p">,</span> <span class="n">discount</span><span class="o">=</span><span class="n">gamma</span><span class="p">)</span>
<span class="n">gridworld0</span><span class="o">.</span><span class="n">printValues</span><span class="p">(</span><span class="n">values</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>GridWorld Value Iteration with alive reward = 0.00, discount gamma  = 0.90

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
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">q_values</span> <span class="o">=</span> <span class="n">vi</span><span class="o">.</span><span class="n">getQValues</span><span class="p">(</span><span class="n">GridWorld</span><span class="o">=</span><span class="n">gridworld0</span><span class="p">,</span> <span class="n">values</span><span class="o">=</span><span class="n">values</span><span class="p">,</span> <span class="n">discount</span><span class="o">=</span><span class="n">gamma</span><span class="p">)</span>
<span class="n">gridworld0</span><span class="o">.</span><span class="n">printQValues</span><span class="p">(</span><span class="n">q_values</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>




<div class="output_png output_subarea ">
<img src="data:image/png;base64,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d+JxjS+1ucn48eNl3bp1IiKybt06GT9+fINjq6qqZOzYsTJr1ix54okntO1z586VV155xanv25QHHnhAUlNTRURk9+7dEhQUJDU1NQ2Oj4uLk3nz5sm9996rbcvLy5NDhw7Jn/70pzrxOsOZfOqRyx9++EH7urCwUHr27CklJSXNiPz/LF68WJKTk0VEJDc3V3x9fRtd6fX4449LYmKiREVFadt27twply5dEhGR06dPi7e3t5w8edKpONwxN5197o5w9JiZmZlSWFgoIrU/V5PJJBkZGSIisnDhQklKSpKamhopLS0Vq9UqX375pVNxuCqfH330kfz0008iIpKdnS29e/fWlrpPnz5d+12/evWq+Pv7aysKm8vRfP7www+SkZEh27dvrzM3RUTKysqkoqJCRESqq6slNjbW6VXMYC9E/YjIHhFxad+foqIiZGVlYdasWQCAWbNmISsrCxcvXrQ7/tlnn8Vvf/tbhISEuDIsALUdEebPnw8AGDVqFLp3746DBw/aHfvuu+/C19cXY8eOrbM9KCgINputVbp56JXLG9sXlZaWQimFmpqaFsWWlpaGhx9+GAAQHByM6Oho7Nixw+7Y3bt3Iy8vD3PmzKmzfdy4cejTpw8AYODAgejfvz/OnDnTorgao1c+nXnujnL0mCNGjMCAAQMA1P5chw4dqv3j7+HDh3HXXXdBKYUePXpg7NixLu376Uw+77rrLnh5eQEArFYrRASXLl0CULtS78cffwRQ+8lJKYW+ffu2KDZH89m7d2+tV+rNPD090a1bNwBAZWUlysvL0amTPqWHBayNOn36NPz8/NC5c2cAQOfOnTFgwAC7/cwOHz6Mjz/+GI899pjdY7344ouwWCy45557cPz48RbFdenSJYgIfHx8tG0N9Vk7e/YsXnzxRTz77LMt+p4tpWcuV65cidDQUAwbNgyvv/46vL29WxSboz3rfvrpJzz66KNYsWJFo8fbtWsXfvjhB0RFRbUorsbolU9X9INszjFPnDiBzMxMTJgwAUBt389NmzahsrISxcXF+Pjjj13a99OZfN5o7dq1MJlMWtPiv/71r0hLS4Ofnx8CAgKwYMECrWNJc+n1Mzp79ixsNht8fHzQs2dPPPTQQy2K6zoWMIOrrKzEQw89hJUrV2q/ADdaunQpvv32Wxw9ehSxsbGYNGkSqqurWyW2Bx98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
"
>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">policy</span> <span class="o">=</span> <span class="n">vi</span><span class="o">.</span><span class="n">getPolicy</span><span class="p">(</span><span class="n">GridWorld</span><span class="o">=</span><span class="n">gridworld0</span><span class="p">,</span> <span class="n">values</span><span class="o">=</span><span class="n">values</span><span class="p">,</span> <span class="n">discount</span><span class="o">=</span><span class="n">gamma</span><span class="p">)</span>
<span class="n">gridworld0</span><span class="o">.</span><span class="n">printPolicy</span><span class="p">(</span><span class="n">policy</span><span class="p">)</span>
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
<h4 id="With-Alive-Reward-($\gamma-=-1$)">With Alive Reward ($\gamma = 1$)<a class="anchor-link" href="#With-Alive-Reward-($\gamma-=-1$)">&#182;</a></h4>
</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">reward</span> <span class="o">=</span> <span class="o">-</span><span class="mf">0.01</span>
<span class="nb">print</span><span class="p">(</span><span class="s2">&quot;Grid world Value Iteration with alive rewards = </span><span class="si">%.2f</span><span class="se">\n</span><span class="s2">&quot;</span> <span class="o">%</span> <span class="n">reward</span><span class="p">)</span>
<span class="n">gridworld001</span> <span class="o">=</span> <span class="n">GridWorldEnv</span><span class="p">((</span><span class="mi">3</span><span class="p">,</span> <span class="mi">4</span><span class="p">),</span> <span class="mf">0.8</span><span class="p">,</span> <span class="p">[(</span><span class="mi">1</span><span class="p">,</span> <span class="mi">1</span><span class="p">)],</span> <span class="n">terminals</span><span class="p">,</span> <span class="n">reward</span><span class="p">)</span>
<span class="n">values</span> <span class="o">=</span> <span class="n">vi</span><span class="o">.</span><span class="n">valueIteration</span><span class="p">(</span><span class="n">gridworld001</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="mi">100</span><span class="p">)</span>
<span class="n">gridworld001</span><span class="o">.</span><span class="n">printValues</span><span class="p">(</span><span class="n">values</span><span class="p">)</span>
<span class="c1"># q_values = vi.getQValues(gridworld001, values, 1)</span>
<span class="c1"># gridworld001.printQValues(q_values)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>Grid world Value Iteration with alive rewards = -0.01

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
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">policy</span> <span class="o">=</span> <span class="n">vi</span><span class="o">.</span><span class="n">getPolicy</span><span class="p">(</span><span class="n">gridworld001</span><span class="p">,</span> <span class="n">values</span><span class="p">,</span> <span class="mi">1</span><span class="p">)</span>
<span class="n">gridworld001</span><span class="o">.</span><span class="n">printPolicy</span><span class="p">(</span><span class="n">policy</span><span class="p">)</span>
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
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">reward</span> <span class="o">=</span> <span class="o">-</span><span class="mf">0.03</span>
<span class="nb">print</span><span class="p">(</span><span class="s2">&quot;Grid world Value Iteration with alive rewards = </span><span class="si">%.2f</span><span class="se">\n</span><span class="s2">&quot;</span> <span class="o">%</span> <span class="n">reward</span><span class="p">)</span>
<span class="n">gridworld003</span> <span class="o">=</span> <span class="n">GridWorldEnv</span><span class="p">((</span><span class="mi">3</span><span class="p">,</span> <span class="mi">4</span><span class="p">),</span> <span class="mf">0.8</span><span class="p">,</span> <span class="p">[(</span><span class="mi">1</span><span class="p">,</span> <span class="mi">1</span><span class="p">)],</span> <span class="n">terminals</span><span class="p">,</span> <span class="n">reward</span><span class="p">)</span>
<span class="n">values</span> <span class="o">=</span> <span class="n">vi</span><span class="o">.</span><span class="n">valueIteration</span><span class="p">(</span><span class="n">gridworld003</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="mi">100</span><span class="p">)</span>
<span class="n">gridworld003</span><span class="o">.</span><span class="n">printValues</span><span class="p">(</span><span class="n">values</span><span class="p">)</span>
<span class="c1"># q_values = vi.getQValues(gridworld003, values, 1)</span>
<span class="c1"># gridworld003.printQValues(q_values)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>Grid world Value Iteration with alive rewards = -0.03

</pre>
</div>
</div>

<div class="output_area">

    <div class="prompt"></div>




<div class="output_png output_subarea ">
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbAAAADnCAYAAAB/sgPRAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjMuNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8QVMy6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAZIklEQVR4nO3de3CV5bn38d8N2XQla+VQQ+IJIjVNpCGFANVChwqo3WDVPXJwdEtaY0sHa1/FDZuxB6fbQ2Rq1dc6L3IYoTJDSBnryFCdCgxTpCiMrRyyEVSEBGNfGwE1ByQJWcm1/yBkE5JAFq5D7vD9zDwzrvu5n+V1X+tZ67cOD+DMTAAA+GZAogsAAOB8EGAAAC8RYAAALxFgAAAvEWAAAC8lJbqAC0lycnJNU1PTxYmuo78IBAJtTU1NvAmLAnoZXfQzugKBwCeNjY2XnDnuuIw+fpxzRr+jxzkn+hkd9DK66Gd0tffTnTnOOwQAgJcIMACAlwgwAICXCDAAgJcIMACAlwgwAICXCDAAgJcIMACAlwgwAICXCDAAgJcIMACAlwgwAICXCDAAgJcIMACAlwgwAICXCDAAgJcIMACAlwgwAICXCDAAgJcIMACAlwgwAICXCDAAgJcIMACAlwgwAICXCDAAgJcIsAg55x53zlU55+qdc4edcy8553ISXVdPWltbtWDBAmVlZSk1NVUzZszQ0aNHe5z/1FNPKTc3V6mpqcrLy9PixYs77XfOKSUlRaFQqGOrq6uL9TL6jGj3c8uWLRo3bpzS0tI0bNgwLVq0KNZL6FMi7efSpUuVn5+vUCik0aNH6/XXX+/Y99lnn+naa69Vdna20tLSlJubq9LSUplZHFbS96xZs0bf/e53lZaWpqSkpHPOf/vtt3XNNdcoJSVFubm5Kisri0OVX5KZsUWwSRouKb39v1Mk/V9J23p5rMVbaWmp5eXl2cGDB622ttamT59uU6dO7XbuunXrLCUlxbZv325mZtu2bbOUlBTbuHFjxxxJtnXr1rjUfi6+97OqqsqCwaCVl5dba2urbd++3UKhkP3xj3+M23pOSUQvzSLr54svvmiDBw+2Xbt2WTgctiVLllhKSop9+OGHZmbW1NRk77zzjp04ccLMzCorK2348OG2bNmyuK3nlET183Tr16+38vJyW7FihQ0cOPCsc2tra23w4MH2m9/8xpqammzjxo0WDAZt27Ztcar27Nr72fU1tbtBtl6HWVDSU5I+7eX83jxWUZWTk2PLly/vuH3gwAGTZIcOHeoy9+mnn7bx48d3Ghs3bpw9+eSTHbcv9ACLZj+fe+45Kyoq6rS/pKTEJk+eHIPKzy5RL7iR9PO2226zBx54oNPYsGHD7JFHHun2visrK62goMDmzZsX3aJ7oS8E2CmbN28+Z4D9/ve/t5ycHGtra+sYKy4utpKSkliX1ys9BRhfIZ4H59ydzrk6ScckzZX0cGIr6l5tba2qq6s1duzYjrHc3FylpaWpoqKiy/w77rhD9fX1evPNN9XW1qatW7dq//79mjp1aqd5t912mwYPHqxvf/vbevnll2O+jr4i2v20/31j06GtrU27d++O6Tr6ikj72V2/zKxLv26++WYlJyfryiuvVENDg+bMmROT+vuTiooKjR49Ws65jrExY8Z0+zj0JQTYeTCzcjNLl3SpTobXnsRW1L2GhgZJUnp6eqfxjIwM1dfXd5mfnZ2tmTNnavLkyRo0aJAmT56sRx55RIWFhR1zNm3apKqqKv3jH//QvHnzNGvWLK1fvz62C+kjot3P733ve3r33Xe1atUqhcNhvfHGG1q7dm2399UfRdrPm2++WWVlZXr77bfV0tKiRYsWqbq6usvcV199VceOHdP27dv1gx/8QIMHD47dIvqJhoaGXj8OfQkB9iWYWY2k5yW96py7KNH1nCk1NVWSulxkUVtbq7S0tC7zH3vsMZWXl2v37t1qaWlRRUWFnnnmGa1YsaJjzvXXX69AIKBAIKDbb79dxcXFWr16dWwX0kdEu5/5+fl6+eWX9eyzzyo7O1u/+tWvdPfdd18wL7iR9vOHP/yhFixYoFmzZumSSy7Rrl27dMMNN3Tbr4EDB2rcuHFKT0/Xz372s9gsoB9JTU3t9ePQlxBgX16STv4WdlmiCzlTRkaGcnJytHPnzo6xyspK1dfXa+TIkV3m79ixQ9OmTVNBQYGccxoxYoRuvfVWvfLKKz3+PwYMGNDla53+Khb9vOmmm/T222/rs88+05YtW/Txxx9r0qRJ8VhOwkXaT+ecHnzwQb3//vv69NNPtWTJEu3du/es/QqHw/rggw9iUX6/MmrUqC5fxe7atUujRo1KTEG91d0PY2w9XoQxQNL/kZTdfnuIpLWSqiQl9eL4c/xUGX2lpaWWn59vlZWVVldXZzNnzrQpU6Z0O3fhwoWWn59v+/fvNzOzffv22ZVXXmmPPvqomZnt2bPH3nrrLWtubrYTJ07Y2rVrLTk52datWxe39ZzO936amf3tb3+zEydO2BdffGGLFy+2UChke/fujctaTpeIXppF1s/a2lrbt2+ftbW12eHDh+1HP/qRfeMb37Djx4+bmdn27dtt06ZNdvz4cQuHw7ZlyxbLzs62hx56KJ5LMrO+cRFHOBy2xsZG27Bhgw0cONAaGxutsbGx04Uap3z++ec2ePBg++1vf2vNzc22adMmrkLsb1t7gP1Z0mFJX0j6/5JWS8rt5fG9fbyiJhwO2/z58y0zM9NCoZBNmzbNjhw5YmZmZWVlFgwGO+a2tLTYgw8+aFdccYUFg0EbOnSozZs3r+Oy5L/85S9WUFBgKSkplpGRYWPHjrU//OEPcV/TKb7308zsxhtvtLS0NAsGg3bdddfZ3//+97ivySxxL7iR9LO6utpGjBhhwWDQvvrVr1pxcbHV1NR07N+yZYuNGTPGQqGQpaam2vDhw620tNTC4XDc19UXAuyFF14wSV22qqoq++tf/2rBYLDjjyCYnXwzdfXVV1sgELCvfe1rtmrVqgRW31lPAeZO7kM8OOeMfkePc070MzroZXTRz+hq76c7c5zfwAAAXiLAAABeIsAAAF4iwAAAXiLAAABeIsAAAF4iwAAAXiLAAABeIsAAAF4iwAAAXiLAAABeIsAAAF4iwAAAXiLAAABeIsAAAF4iwAAAXiLAAABeIsAAAF4iwAAAXiLAAABeIsAAAF4iwAAAXiLAAABeIsAAAF4iwAAAXkpKdAEXkkAg0Oac401DlAQCATnnEl1Gv0Avo4t+RlcgEGjrbtyZWbxruWA554x+R49zTvQzOuhldNHP6GrvZ5d3BHwaAAB4iQADAHiJAAMAeIkAAwB4iQADAHiJAAMAeIkAAwB4iQADAHiJAAMAeIkAAwB4iQADAHiJAAMAeIkAAwB4iQADAHiJAAMAeIkAAwB4iQADAHiJAAMAeIkAAwB4iQADAHiJAAMAeIkAAwB4iQADAHiJAAMAeIkAAwB4iQCLgHPuCefcXudcvXPuY+fc8865ixJd19m0trZqwYIFysrKUmpqqmbMmKGjR4/2OP+pp55Sbm6uUlNTlZeXp8WLF3faP3v2bI0YMUJJSUmaPXt2rMvv8yLt7/r16zVixAglJyersLBQGzdujGO1fU+k/Tt8+LDuuusuZWZmKi0tTUVFRfr444879v/5z3/W2LFjlZ6erssuu0z33Xefmpqa4rGUPut8nrNPPvmkLr/8cgWDQd1www2qrKyMcZXnyczYerlJWihptKR/kZQl6TVJf4rgeIu30tJSy8vLs4MHD1ptba1Nnz7dpk6d2u3cdevWWUpKim3fvt3MzLZt22YpKSm2cePGjjnPPvusrV+/3qZNm2Y//vGP47KGniSin2eKpL8HDx605ORkW7VqlTU3N1tZWZmlpKRYVVVVfIvuRqJ6GUn/GhsbrbCw0GbPnm1Hjhyx1tZWe+edd6yurs7MzD755BP7yle+Ys8995y1trbaRx99ZIWFhfbLX/4ynksys75xbp4S6XO2rKzMsrKybMeOHfbFF1/YfffdZyNGjLBwOByHarvX3s+ur6ndDbL1OpCmSqqPYH4vHqroysnJseXLl3fcPnDggEmyQ4cOdZn79NNP2/jx4zuNjRs3zp588skuc++66y4CzCLr769//WubMGFCp7EJEybYww8/HPM6zyVRvYykf0uXLrUhQ4bYiRMnur2vHTt2mCRramrqGPv5z39uN910U/QLP4e+cG6eqbfP2WuvvdYeeuihjtsNDQ2WnJxsr7/+eizLO6ueAoyvEL+c6yVVJLqIntTW1qq6ulpjx47tGMvNzVVaWpoqKrqWfccdd6i+vl5vvvmm2tratHXrVu3fv19Tp06NZ9neiLS/FRUVneZK0pgxY7qdeyGItH+bN29WXl6eSkpKlJmZqeHDh+uZZ57p2F9UVKQbb7xRy5YtUzgc1ocffqg//elPuvXWW+OxnH7jzPM0FAopLy+vT56nBNh5cs7NkHSPpLmJrqUnDQ0NkqT09PRO4xkZGaqvr+8yPzs7WzNnztTkyZM1aNAgTZ48WY888ogKCwvjUq9vIu1vQ0NDr+deCCLt39GjR7V582Zdc801+uc//6mysjI9/vjjWr16tSRpwIABKikp0eOPP65AIKBhw4Zp9OjRuvvuu2O/mH7Ep/OUADsPzrnbJD0v6d/MbGei6+lJamqqJKmurq7TeG1trdLS0rrMf+yxx1ReXq7du3erpaVFFRUVeuaZZ7RixYq41OubSPubmpra67kXgvPp3+WXX665c+dq0KBB+ta3vqXi4mKtW7dO0slPaHfddZdeeOEFNTc3q6amRvX19SopKYn5WvqK1atXKxQKdWznw6fzlACLkHPubknLJN1iZpsTXc/ZZGRkKCcnRzt3/m/GVlZWqr6+XiNHjuwyf8eOHZo2bZoKCgrknNOIESN066236pVXXoln2d6ItL+jRo3qNFeSdu3apVGjRsW81r4o0v4VFRXJOddl/NTYjh07NHLkSH3/+9/XwIEDdfHFF+snP/nJBXX+zpo1S8eOHevYzseZ5+mxY8f0wQcf9M3ztLsfxth6vAjjfkmfSrr6PI8/96+VUVZaWmr5+flWWVlpdXV1NnPmTJsyZUq3cxcuXGj5+fm2f/9+MzPbt2+fXXnllfboo492zGlubrbGxkYrLi62kpISa2xstObm5ris5UyJ6OeZIunvgQMHLDk52crLy+3EiRNWXl7OVYgR9O/QoUOWnJxsixYtsnA4bLt377bBgwfbmjVrzMzsjTfesOTkZNuwYYO1tbXZkSNH7JZbbrHrrrsunksys75xbp4S6XO2rKzMsrOzbefOnXb8+HGbO3euFRQUcBWi75skk9Qi6djpWyTHx1s4HLb58+dbZmamhUIhmzZtmh05csTMTp6owWCwY25LS4s9+OCDdsUVV1gwGLShQ4favHnzOl31NXHiRGvvQ8c2ceLEeC/LzPrGi0Qk/TUze+2116ygoMACgYAVFBTYhg0bElF2F4nqZaT927x5sxUVFVlKSop9/etft0WLFnXav3LlSissLLTU1FTLysqymTNnWnV1ddzWc0pfODdPOddzds6cOV3+6MITTzxhl156qSUnJ9t1111nBw4ciHPVnfUUYO7kPsSDc87od/Q450Q/o4NeRhf9jK72fnb5/pjfwAAAXiLAAABeIsAAAF4iwAAAXiLAAABeIsAAAF4iwAAAXiLAAABeIsAAAF4iwAAAXiLAAABeIsAAAF4iwAAAXiLAAABeIsAAAF4iwAAAXiLAAABeIsAAAF4iwAAAXiLAAABeIsAAAF4iwAAAXiLAAABeIsAAAF4iwAAAXiLAAABeSkp0AReSQCDQ5pzjTUOUBAIBOecSXUa/QC+ji35GVyAQaOtu3JlZvGu5YDnnjH5Hj3NO9DM66GV00c/oau9nl3cEfBoAAHiJAAMAeIkAAwB4iQADAHiJAAMAeIkAAwB4iQADAHiJAAMAeIkAAwB4iQADAHiJAAMAeIkAAwB4iQADAHiJAAMAeIkAAwB4iQADAHiJAAMAeIkAAwB4iQADAHiJAAMAeIkAAwB4iQADAHiJAAMAeIkAAwB4iQCLkHPuDufcVudcvXMunOh6zqW1tVULFixQVlaWUlNTNWPGDB09erTbuQsXLlQoFOq0Oed0//33S5Kqq6u77B80aJDS0tLiuaSEimY/JWnKlCm69NJLlZaWpqFDh2revHlqbm6O13L6nGj390ISSe9Ot2TJEjnnVFpa2jG2devWLr1NSkrSyJEjY7mEyJkZWwSbpCmS/l3SjySFIzzW4q20tNTy8vLs4MGDVltba9OnT7epU6f26tj333/fnHP21ltv9TjnO9/5jv30pz+NVrkR6Q/93LVrlzU1NZmZWU1NjV177bX2i1/8Iia1n00ietmdWJ+v8eLLuXno0CHLzc21b37zm/bYY4/1OK+1tdVycnLsiSeeiHbZvdLez66vqd0NsvUqjCb5EGA5OTm2fPnyjtsHDhwwSXbo0KFzHjt//nwbM2ZMj/v37NljkqyioiIqtUaqv/WzpqbGJk2aZNOnT49KrZHoKwEWy/7Gky/n5vXXX29r1qyxiRMnnjXAXnnlFRs0aJAdPnw4qjX3Vk8BxleI/Vhtba2qq6s1duzYjrHc3FylpaWpoqLirMc2Nzdr5cqVmjNnTo9zli5dqvHjx/e9rxViJFb9vPfeexUMBnXJJZeooqJC8+fPj3rtPoj1+dqfnU/vli1bpmAwqNtvv/2c97906VLNmDFDWVlZUas5GgiwfqyhoUGSlJ6e3mk8IyND9fX1Zz32pZde0okTJ3TnnXd2u//48eMqKyu7oF4wYtXPxYsX69ixY9qzZ4/uueceDRkyJHpFeySW52t/F2nvqqurVVpaqsWLF5/zvqurq/Xaa6/1yec6AdaPpaamSpLq6uo6jdfW1p7zwotly5Zp1qxZCoVC3e5fs2aNBgwY0Kt3b/1FLPvpnFNhYaGKioouqJ6eLpb97e8i7d3s2bP10EMP6fLLLz/nfS9fvlxXXXWVJk6cGJ1io6m77xXZ+tdvYCtWrOi4ffDgQZNkVVVVPR6zd+9ek2S7d+/ucc7VV19tDzzwQDRLjVh/6ucpq1evtszMzGiUGpFE9LI7se5vvPT1c1OSXXTRRZaZmWmZmZmWlJRkKSkpNmHChE7zWlpa7LLLLrPf/e53sS7/rMRFHFELroGSApL+VVK4/b8Dklwvju3t4xU1paWllp+fb5WVlVZXV2czZ860KVOmnPWY+++/38aNG9fj/p07d5oke++996JdbkR87+e7775ra9eutYaGBmttbbWdO3faVVddZcXFxbEqv0d9JcBicb4mQl8/Nz/66KNO27hx42zBggVWU1PTad7LL79sycnJ9vnnn8dhBT0jwKIXYCWSrJttWC+O7e3jFTXhcNjmz59vmZmZFgqFbNq0aXbkyBEzMysrK7NgMNhp/vHjxy0jI8NWrlzZ433OmTPHJk2aFNO6e8P3fu7bt8/Gjx9v6enpFgqFLDc31xYsWGDHjh2Ly1pO11cCLBbnayL4cG6erqerEKdMmWIlJSUxq7m3egowd3If4sE5Z/Q7epxzop/RQS+ji35GV3s/3ZnjXMQBAPASAQYA8BIBBgDwEgEGAPASAQYA8BIBBgDwEgEGAPASAQYA8BIBBgDwEgEGAPASAQYA8BIBBgDwEgEGAPASAQYA8BIBBgDwEgEGAPASAQYA8BIBBgDwEgEGAPASAQYA8BIBBgDwEgEGAPASAQYA8BIBBgDwEgEGAPASAQYA8FJSogu4kAQCgU+ccxcnuo7+IhAItDnneBMWBfQyuuhndAUCgU+6G3dmFu9aAAD40niHAADwEgEGAPASAQYA8BIBBgDwEgEGAPASAQYA8BIBBgDwEgEGAPASAQYA8BIBBkmSc+4O59xW51y9cy6c6Hp85px7wjm3t72XHzvnnnfOXZTounzmnHvcOVfV3tPDzrmXnHM5ia7LZ865Ac65bc45c84NSXQ954MAwymfS1os6YEE19EftEoqlpQpaZSkIZJWJrKgfmCVpCIzS5M0TFK1pDUJrch//yHpeKKL+DL4y3whSTKzDZLknJuU2Er8Z2a/PO3mEefcs5JeTFQ9/YGZvXfaTSepTdJVCSrHe865fEn3SpohaVeCyzlvBBgQe9dLqkh0Eb5zzt0paYmkNElhSfMSW5Gf2v+W/N9L+k9JtYmt5svhK0QghpxzMyTdI2luomvxnZmVm1m6pEslPSxpT2Ir8tZcSTVmtjbRhXxZfAIDYsQ5d5ukZZL+zcx2Jrqe/sLMapxzz0uqdM7lmNlnia7JF865r0uaL+lbia4lGvgEBsSAc+5unQyvW8xsc6Lr6YeSJAUlXZboQjwzQVKWpHecc0clnXpj9d/OuXsTV9b54RMYJEnOuYGS/kXSoPbbgfZdzca/ehoR59z9kv5L0hQz+3ui6/Fd+28290p60cwOt1/y/f8kHZL03tmORRcvStp02u0hkrZL+ld52Ev+RWZIkpxzJZJe6GbX18zsUHyr8ZtzznTyIoPm08fNLJSYivzWHmCv6uTXXkGdvPDgdUm/NrODiavMf865YZKqJA01s38kuJyIEWAAAC/xGxgAwEsEGADASwQYAMBLBBgAwEsEGADASwQYAMBLBBgAwEsEGADASwQYAMBLBBgAwEsEGADASwQYAMBLBBgAwEsEGADASwQYAMBLBBgAwEsEGADAS/8D7X0E9uwt9qwAAAAASUVORK5CYII=
"
>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">policy</span> <span class="o">=</span> <span class="n">vi</span><span class="o">.</span><span class="n">getPolicy</span><span class="p">(</span><span class="n">gridworld003</span><span class="p">,</span> <span class="n">values</span><span class="p">,</span> <span class="mi">1</span><span class="p">)</span>
<span class="n">gridworld003</span><span class="o">.</span><span class="n">printPolicy</span><span class="p">(</span><span class="n">policy</span><span class="p">)</span>
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
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">reward</span> <span class="o">=</span> <span class="o">-</span><span class="mf">0.4</span>
<span class="nb">print</span><span class="p">(</span><span class="s2">&quot;Grid World with additive rewards = </span><span class="si">%.2f</span><span class="se">\n</span><span class="s2">&quot;</span> <span class="o">%</span> <span class="n">reward</span><span class="p">)</span>
<span class="n">gridworld04</span> <span class="o">=</span> <span class="n">GridWorldEnv</span><span class="p">((</span><span class="mi">3</span><span class="p">,</span> <span class="mi">4</span><span class="p">),</span> <span class="mf">0.8</span><span class="p">,</span> <span class="p">[(</span><span class="mi">1</span><span class="p">,</span> <span class="mi">1</span><span class="p">)],</span> <span class="n">terminals</span><span class="p">,</span> <span class="n">reward</span><span class="p">)</span>
<span class="n">values</span> <span class="o">=</span> <span class="n">vi</span><span class="o">.</span><span class="n">valueIteration</span><span class="p">(</span><span class="n">gridworld04</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="mi">100</span><span class="p">)</span>
<span class="n">gridworld04</span><span class="o">.</span><span class="n">printValues</span><span class="p">(</span><span class="n">values</span><span class="p">)</span>
<span class="c1"># q_values = vi.getQValues(gridworld04, values, 1)</span>
<span class="c1"># gridworld04.printQValues(q_values)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>Grid World with additive rewards = -0.40

</pre>
</div>
</div>

<div class="output_area">

    <div class="prompt"></div>




<div class="output_png output_subarea ">
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbAAAADnCAYAAAB/sgPRAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjMuNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8QVMy6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAauklEQVR4nO3de3BV1f338c8StCee3JQApoSLzWOq3FJjtViuIi0ZFSpIixbRqtQoI/p7VIZKsXVGbEVEbW2tsaioXGKF0WpHBBU6paboA4S0IkxAgmgrGKq5ADmE5HyfP4znR0gCCZxkZ8H7NbNn2Guvffjub9bJ51z2gDMzAQDgm1OCLgAAgGNBgAEAvESAAQC8RIABALxEgAEAvNQ56AJOJgkJCbsikUj3oOs4UYRCoWgkEuFFWBzQy/iin/EVCoV2V1dXn3X4uOM2+vbjnDP6HT/OOdHP+KCX8UU/46u+n+7wcV4hAAC8RIABALxEgAEAvESAAQC8RIABALxEgAEAvESAAQC8RIABALxEgAEAvESAAQC8RIABALxEgAEAvESAAQC8RIABALxEgAEAvESAAQC8RIABALxEgAEAvESAAQC8RIABALxEgAEAvESAAQC8RIABALxEgAEAvESAAQC8RIC1knPuAedcqXOu0jn3mXNuqXOuV9B1Hc22bds0atQohcNhZWRkaN68eUc956233tKgQYOUmJiotLQ0TZ06tcl5M2bMkHNOCxcujHfZHVJre1lXV6fp06era9euSkpK0lVXXaU9e/Y0OD5jxgz17NlTSUlJGjBggJYuXdrWl9EhHK03zfnDH/4g55xmz54dGyspKdGECRPUo0cPJSUlqV+/fpo/f35blt+hFRQUaOjQoUpOTlbnzp2POn/dunW66KKLdPrppyszM9OP57OZsbVik3SupJT6P58u6RFJhS0814JQW1tr5557rt122222b98+W79+vXXt2tUKCgqaPWf16tWWkpJiL730kkUiEauurrb169c3mvfuu+/agAEDLD093V544YW2vIxGgujnsfRy9uzZds4559iHH35o5eXlNn78eMvNzY0d/81vfmPp6em2ZcsWi0aj9vLLL9upp55qmzdvbo9LMrNgeml29N40ZceOHZaZmWkDBgyw+++/Pza+du1a+93vfmf//ve/LRqN2po1aywlJcWWLVvW1pfRSFD9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
"
>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">policy</span> <span class="o">=</span> <span class="n">vi</span><span class="o">.</span><span class="n">getPolicy</span><span class="p">(</span><span class="n">gridworld04</span><span class="p">,</span> <span class="n">values</span><span class="p">,</span> <span class="mi">1</span><span class="p">)</span>
<span class="n">gridworld04</span><span class="o">.</span><span class="n">printPolicy</span><span class="p">(</span><span class="n">policy</span><span class="p">)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>




<div class="output_png output_subarea ">
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbAAAADnCAYAAAB/sgPRAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjMuNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8QVMy6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAMoUlEQVR4nO3dcYjf9X3H8efbXPSXWW/DJjRzzlns1j/CVv8oxJCNeQwaQog5sYXQddIy/yiCtuvGWDrS3oiFlMHANbSUzEUiq1WKw9B/hKI3yqZQadms4B9plLA10YTW0zF/mfH33h93GTE5Y35339zn9/7d8wGHud9d4OXHn7/n7/u7nzEyE0mSqrmq9QBJkpbCgEmSSjJgkqSSDJgkqSQDJkkqaaL1gNVk3bp1J/v9/oda7xgXvV5v0O/3fRLWAc+ya70BeJ7d6b2a+dbGC28N30a/ciIiPe/uRASeZzc8y25FBOB5difIzLjwVp8hSJJKMmCSpJIMmCSpJAMmSSrJgEmSSjJgkqSSDJgkqSQDJkkqyYBJkkoyYJKkkgyYJKkkAyZJKsmASZJKMmCSpJIMmCSpJAMmSSrJgEmSSjJgkqSSDJgkqSQDJkkqyYBJkkoyYJKkkgyYJKkkAyZJKsmASZJKMmBDioivRcTLEfFGRLwWEd+LiJta75Kkpft7YDPwK8BHGm+5fAZseI8At2bmJHAzcBz4btNFV8jc3FzrCWPF8+yOZ7kUrwDxHl+7AfhL4K9XbE0XDNiQMvOlzDz3b08AA+CjDSddMdPT0+zdu7f1jLHheXbHs+zaJ4G7gN9oPWQoE60HVBQRnwa+BUwCZ4EvtV10ZTz00ENMTU0BsG/fvsZr6vM8u+NZCiAys/WGsiJiI/CnwL9m5uxlfH+O2nnPzs7+/wPBpTz77LPcdtttK7Do8kUEnmc3PMtuRQQwWuc5/xLih7n0roeBB4CjK7BnGEFmXvT6p1dgy5CZJyPiIHAsIm7KzF+03jSsrVu3curUqUW/duLECXbs2MHOnTvZvHnzCi+ryfPsjmfZhXuB7yz8erDw11877+t/tfBRk1dgyxQRNwD/BfxuZv70fb535K7ALmVqaopNmzZx4MCB1lMWNYpXDZcyyufpWXbLK7CuLX4FZsCGEBFXMf+U5vHMfC0ibgS+AdwK/HZmnn2f318qYCdPnmTjxo2tZ7ynag+6o3yenmW36gXs7MLHI8B+4MWF23srsuz9GbBlWwjY94GPA9cCrwOzwFcy82eX8ftLBWzUVXvQHWWeZbfqBWwG+JtFbh+VvwcD1pwB65YPut3xLLs1mgGrbPGA+d+BSZJKMmCSpJIMmCSpJAMmSSrJgEmSSjJgkqSSDJgkqSQDJkkqyYBJkkoyYJKkkgyYJKkkAyZJKsmASZJKMmCSpJIMmCSpJAMmSSrJgEmSSjJgkqSSDJgkqSQDJkkqyYBJkkoyYJKkkgyYJKkkAyZJKsmASZJKmmg9YDXp9XqDiPBJQ0cmJiaIiNYzxkKv1/MsO9QD+nieXbkGBovdHpm50ltWrYhIz7s7EcHMzEzrGWNhZmYG75vdiQg8ze4EkJkXPSPwakCSVJIBkySVZMAkSSUZMElSSQZMklSSAZMklWTAJEklGTBJUkkGTJJUkgGTJJVkwCRJJRkwSVJJBkySVJIBkySVZMAkSSUZMElSSQZMklSSAZMklWTAJEklGTBJUkkGTJJUkgGTJJVkwCRJJRkwSVJJBkzvMjc3x/79++n3+62nSO/ifVMXMmBDiIivR8SLEfFGRPw8Ig5GxPWtd3Vlbm6Obdu2sWfPHnbt2uUDhUaG983u3QNsAiYWfl2RARvOO8BngA8CHwNuBB5uOagr5x4gJicnARgMBkxPT3PmzJnGy7Taed+8Mn4P+DvgjtZDlsGADSEzv5yZP8nMtzPzFPAgcHvjWZ1Ys2YN27dv5/DhwwAcOXKELVu2EBGNl2m18755ZdwPbAMmWw9ZhsjM1hvKioi/BW7LzD+4zO/PUT/v06dPs2HDBkZ9J0BEMDMz03rGWJiZmRn5f+bV7pujv3LeZ5l/GfEfGu+4lAAy86JnLBMNtoyFiLgL+Dzwh623SNJq5EuISxARnwIOAndk5o9b75GkS/kn4APnfYwLAzakiPgc8G1gZ2Y+03qPJL2fPwb++7yPceFLiEOIiPuBrwLbMvNHrfdI0lL9LzBg/q3VAfSZv6K5uuWoIRmw4TwInAWeOf8dUJk5TlflklaBTwD/ct7nDzP/A/3ZFmOWyIANYbF3wYyb9evXl3iXl1Yf75vdmm09oAP+DEySVJIBkySVZMAkSSUZMElSSQZMklSSAZMklWTAJEklGTBJUkkGTJJUkgGTJJVkwCRJJRkwSVJJBkySVJIBkySVZMAkSSUZMElSSQZMklSSAZMklWTAJEklGTBJUkkGTJJUkgGTJJVkwCRJJRkwSVJJBkySVJIBkySVFJnZesOqsW7dunf6/b5PGjrS6/Xo9/utZ4wFz7Jbnme3etdcM3ir319z4e0GbAVFRHre3YkIPM9ueJbd8jy7tXCeceHtXg1IkkoyYJKkkgyYJKkkAyZJKsmASZJKMmCSpJIMmCSpJAMmSSrJgEmSSjJgkqSSDJgkqSQDJkkqyYBJkkoyYJKkkgyYJKkkAyZJKsmASZJKMmCSpJIMmCSpJAMmSSrJgEmSSjJgkqSSDJgkqSQDpneZm5tj//799Pv91lOkd/G+qQsZsCFFxO6I+GFEvBERZ1vv6dLc3Bzbtm1jz5497Nq1ywcKjQzvm1qMARveL4FvAl9svKNT5x4gJicnARgMBkxPT3PmzJnGy8bH3Nxc6wkled/s1mAw4M0332w9oxMGbEiZ+VRmPgoca72lS2vWrGH79u0cPnwYgCNHjrBlyxYiovGy8TE9Pc3evXtbzyjH+2Z3BoMB99xzD/fdd1/rKZ2IzGy9oaSIuB34QWZODPF7ctTP+/Tp02zYsIFR3wkQESV2nnPs2DGmpqa4++672bdvX+s571LhLL1vLs+5eD3//PM8/fTTrF+/vvWky7Zwnhc9Y/EKTOrQ7OwsEbHoxy233MLx48d54IEHeO6551pP1SrzxBNPcOjQIV544QU2bNjwnvfTo0ePtp562S776kHS+9u6dSunTp1a9GsnTpxgx44d7Ny5k82bN6/wMq12u3bt4s477+To0aM8+eSTXHfddYt+3/XXX7/Cy5bOlxCXyJcQ2xvFl2kuZWpqik2bNnHgwIHWUy5S4Sy9by7f22+/ze7du5mcnOTQoUOt51y293oJ0SuwIUXEGmAtcPXC572FL50Z+TqpqUcffZSNGze2nqFVbO3atTz22GO8/vrrrad0wp+BDe9PgLeAp4A1C79+C/itlqM0+oyXRsHExESpN3Bcii8hrqAKLyFWMqov01TkWXbL8+yW70KUJI0VAyZJKsmASZJKMmCSpJIMmCSpJAMmSSrJgEmSSjJgkqSSDJgkqSQDJkkqyYBJkkoyYJKkkgyYJKkkAyZJKsmASZJKMmCSpJIMmCSpJAMmSSrJgEmSSjJgkqSSDJgkqSQDJkkqyYBJkkoyYJKkkgyYJKkkAyZJKmmi9YDVpNfrvRoRH2q9Y1z0er1BRPgkrAOeZbc8z271er1XF7s9MnOlt0iStGw+Q5AklWTAJEklGTBJUkkGTJJUkgGTJJVkwCRJJRkwSVJJBkySVJIBkySVZMAEQETsjogfRsQbEXG29Z7KIuLrEfHiwln+PCIORsT1rXdVFhFfi4iXF870tYj4XkTc1HpXZRFxVUT8W0RkRNzYes9SGDCd80vgm8AXG+8YB+8AnwE+CHwMuBF4uOWgMfAIcGtmTgI3A8eB7zZdVN+fAf/TesRy+If5CoDMfAogIm5vu6S+zPzyeZ+eiogHgcdb7RkHmfnSeZ8GMAA+2mhOeRHxO8C9wF3ATxrPWTIDJl15fwT8e+sR1UXEp4FvAZPAWeBLbRfVtPCn5P8j8BfA623XLI8vIUpXUETcBXwe+ELrLdVl5ncy81eBXwdmgBfaLirrC8DJzPzn1kOWyysw6QqJiE8B3wbuyMwft94zLjLzZEQcBI5FxE2Z+YvWm6qIiI8Afw58vPWWLngFJl0BEfE55uO1MzOfab1nDE0A1wI3tB5SzO8DG4CfRsRp4NwTq/+IiHvbzVoar8AEQESsAdYCVy983lv40pn0/3o6lIi4H/gqsC0zf9R6T3ULP7O5F3g8M19beMv3N4BXgJcu9Xt1kceBH5z3+Y3As8AnKHiW/h+ZBUBEfBY4tMiXPpyZr6zsmtoiIpl/k8GZ82/PzA+0WVTbQsC+z/zLXtcy/8aDWeArmfmzdsvqi4ibgZeB38zM/2w8Z2gGTJJUkj8DkySVZMAkSSUZMElSSQZMklSSAZMklWTAJEklGTBJUkkGTJJUkgGTJJVkwCRJJRkwSVJJBkySVJIBkySVZMAkSSUZMElSSQZMklSSAZMklfR/z2ib7D1ii3QAAAAASUVORK5CYII=
"
>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">reward</span> <span class="o">=</span> <span class="o">-</span><span class="mi">2</span>
<span class="nb">print</span><span class="p">(</span><span class="s2">&quot;Grid World with additive rewards = </span><span class="si">%.2f</span><span class="se">\n</span><span class="s2">&quot;</span> <span class="o">%</span> <span class="n">reward</span><span class="p">)</span>
<span class="n">gridworld2</span> <span class="o">=</span> <span class="n">GridWorldEnv</span><span class="p">((</span><span class="mi">3</span><span class="p">,</span> <span class="mi">4</span><span class="p">),</span> <span class="mf">0.8</span><span class="p">,</span> <span class="p">[(</span><span class="mi">1</span><span class="p">,</span> <span class="mi">1</span><span class="p">)],</span> <span class="n">terminals</span><span class="p">,</span> <span class="n">reward</span><span class="p">)</span>
<span class="n">values</span> <span class="o">=</span> <span class="n">vi</span><span class="o">.</span><span class="n">valueIteration</span><span class="p">(</span><span class="n">gridworld2</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="mi">100</span><span class="p">)</span>
<span class="n">gridworld2</span><span class="o">.</span><span class="n">printValues</span><span class="p">(</span><span class="n">values</span><span class="p">)</span>
<span class="c1"># q_values = vi.getQValues(gridworld2, values, 1)</span>
<span class="c1"># gridworld2.printQValues(q_values)</span>
</pre></div>

    </div>
</div>
</div>

<div class="output_wrapper">
<div class="output">


<div class="output_area">

    <div class="prompt"></div>


<div class="output_subarea output_stream output_stdout output_text">
<pre>Grid World with additive rewards = -2.00

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
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="n">policy</span> <span class="o">=</span> <span class="n">vi</span><span class="o">.</span><span class="n">getPolicy</span><span class="p">(</span><span class="n">gridworld2</span><span class="p">,</span> <span class="n">values</span><span class="p">,</span> <span class="mi">1</span><span class="p">)</span>
<span class="n">gridworld2</span><span class="o">.</span><span class="n">printPolicy</span><span class="p">(</span><span class="n">policy</span><span class="p">)</span>
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
<p><strong><em>Reference</em></strong></p>
<p>[1] Sutton, Richard S., and Andrew G. Barto. Reinforcement learning: An introduction. MIT press, 2018.
<br>
[2] Sauer, Timothy. Numerical analysis. Pearson, 2018.
<br>
[3] https://github.com/ShangtongZhang/reinforcement-learning-an-introduction</p>

</div>
</div>
</div>
    

 


</html>


<script src="https://utteranc.es/client.js"
        repo="zcczhang/zcczhang.github.io"
        issue-term="pathname"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>