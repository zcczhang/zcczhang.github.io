---
title: "Chapter 2 Multi-armed Bandits"
collection: rl
permalink: /rl/chp2-multi-armed-bandits
tags:
  - Reinforcement Learning
  - Tabular Solution Method
  - My Note
date: "2020-12-01"
tool: "/images/nothing.png"
--- 
___"Reinforcement Learning: An Introduction"___ *by Richard Sutton & Andrew Barto, 2nd Ed*



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
<blockquote><p>Post Author: Charles Zhang  <br><a href="https://zcczhang.github.io/blogs/"><em>All Notes Catelog for</em> <strong><em>Reinforcement Learning: An Introduction</em></strong></a>. This post is created following <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.en"><em>BY-NC-ND 4.0</em></a> agreement, please follow terms while sharing.</p>
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
    <span class="n">plt</span><span class="o">.</span><span class="n">figure</span><span class="p">(</span><span class="n">figsize</span><span class="o">=</span><span class="p">(</span><span class="mi">9</span><span class="p">,</span> <span class="mi">12</span><span class="p">))</span>
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
<pre>100%|██████████| 1000/1000 [00:25&lt;00:00, 39.60it/s]
100%|██████████| 1000/1000 [00:24&lt;00:00, 40.61it/s]
100%|██████████| 1000/1000 [00:24&lt;00:00, 40.22it/s]
</pre>
</div>
</div>

<div class="output_area">

    <div class="prompt"></div>




<div class="output_png output_subarea ">
<img src="data:image/png;base64,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Ad29PcbjcB2zpoW5TPWatx34ZWC5tfaxgFPTAF/P70uAjwLSf+/tPT4MyA6obpRKWGvvsNamWms74T67X1trLwK+Ac7zZiv9rH3/Bud58+uv/mqy1m4HNhtjenqTTgGWoc92KGwChhljGnh/p/ietT7boVXTz/LnwKnGmGbe2q9TvWkHz1qrH/cZHgOsAtYCd4W7PPX9BzgOV0W4GPjF+zMG1z78FbAa+B+Q7M1vcCOs1gJLcL35w/4+6tsPcBLwiXe/CzAXWANMAeK96Qne4zXe813CXe769gMMAOZ7P98fAs302Q7Zs74PWAH8CrwJxOuzXavPdxKuv08hrpbwigP5LAOXe5/7GuCy2iqfpsUXERGRiKTmHhEREYlIClJEREQkIilIERERkYikIEVEREQikoIUERERiUgKUkQkbIwxNxtjGoS7HCISmTQEWUTCxjtL7iBr7a5wl0VEIo9qUkSkThhjkowxnxpjFhljfjXG3Itbj+UbY8w33jynGmNmG2MWGmOmeNd+whizwRjzsDFmiTFmrjGmmzf9fO+9FhljZobv3YlIKChIEZG6chqw1Vp7pLW2H27l5q3ACGvtCGNMC+BuYKS1diBuRtc/BVyfba09AnjGey3APcBoa+2RwNi6eRsiUlcUpIhIXVkCjDLG/MsYc7y1NrvU+WFAH+BHY8wvuDVDOgacnxSwPca7/yPwmjHmSiA6ZCUXkbCIqTqLiMjBs9auMsYMxK3h9A9jzFelshjgS2vthIpuUXrfWnuNMWYocAawwBhztLVWq96KHCJUkyIidcIY0w7Yb619C3gEGAjkAI28WX4Cjg3ob5JkjOkRcIsLA7azvXm6WmvnWGvvAdIJXi5eROo51aSISF05AnjEGOPBrbh6La7ZZoYxZqu3X8qlwCRjTLz3mrtxq5MDNDPGLAbyAV9tyyPGmO64WpivgEV181ZEpC5oCLKIRDwNVRY5PKm5R0RERCKSalJEREQkIqkmRURERCKSghQRERGJSApSREREJCIpSBEREZGIpCBFREREIpKCFBEREYlIClJEREQkIilIERERkYikIEVEREQikoIUERERiUgKUkRERCQiKUgRERGRiKQgRURERCKSghQRERGJSApSREREJCIpSBEREZGIpCBFREREIpKCFBEREYlIClJEREQkIilIERERkYikIEVEREQikoIU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RCQiKUgRERGRiKQgRURERCKSghQRERGJSApSREREJCIpSBGRsDHG3GyMaRDucohIZNIQZBEJG+8suYOstbvCXRYRiTyqSRGROmGMSTLGfGqMWWSM+dUYcy9uPZZvjDHfePOcaoyZbYxZaIyZ4l37CWPMBmPMw8aYJcaYucaYbt708733WmSMmRm+dycioaAgRUTqymnAVmvtkdbafriVm7cCI6y1I4wxLYC7gZHW2oG4GV3/FHB9trX2COAZ77UA9wCjrbVHAmPr5m2ISF1RkCIidWUJMMoY8y9jzPHW2uxS54cBfYAfjTG/4NYM6RhwflLA9hjv/o/Aa8aYK4HokJVcRMIipuosIiIHz1q7yhgzELeG0z+MMV+VymKAL621Eyq6Rel9a+01xpihwBnAAmPM0dZarXorcohQTYqI1AljTDtgv7X2LeARYCCQAzTyZvkJODagv0mSMaZHwC0uDNjO9ubpaq2dY629B0gneLl4EannVJMiInXlCOARY4wHt+LqtbhmmxnGmK3efimXApOMMfHea+7GrU4O0MwYsxjIB3y1LY8YY7rjamG+AhbVzVsRkbqgIcgiEvE0VFnk8KTmHhEREYlIqkkRERGRiKSaFBEREYlIClJEREQkIilIERERkYikIEVEREQikoIUERERiUj/D3CiVx6enQfsAAAAAElFTkSuQmCC
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
<div class="inner_cell">
    <div class="input_area">
<div class=" highlight hl-ipython3"><pre><span></span><span class="k">def</span> <span class="nf">figure_2_2</span><span class="p">(</span><span class="n">runs</span><span class="o">=</span><span class="mi">1000</span><span class="p">,</span> <span class="n">time</span><span class="o">=</span><span class="mi">1000</span><span class="p">):</span>
    <span class="n">bandits</span> <span class="o">=</span> <span class="p">[</span><span class="n">Bandit</span><span class="p">(</span><span class="n">epsilon</span><span class="o">=</span><span class="mi">0</span><span class="p">,</span> <span class="n">initial_val</span><span class="o">=</span><span class="mi">5</span><span class="p">,</span> <span class="n">step_size</span><span class="o">=</span><span class="mf">0.1</span><span class="p">),</span> 
               <span class="n">Bandit</span><span class="p">(</span><span class="n">epsilon</span><span class="o">=</span><span class="mf">0.1</span><span class="p">,</span> <span class="n">initial_val</span><span class="o">=</span><span class="mi">0</span><span class="p">,</span> <span class="n">step_size</span><span class="o">=</span><span class="mf">0.1</span><span class="p">)]</span>
    <span class="n">best_action_counts</span><span class="p">,</span> <span class="n">_</span> <span class="o">=</span> <span class="n">simulate</span><span class="p">(</span><span class="n">runs</span><span class="p">,</span> <span class="n">time</span><span class="p">,</span> <span class="n">bandits</span><span class="p">)</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">figure</span><span class="p">(</span><span class="n">figsize</span><span class="o">=</span><span class="p">(</span><span class="mi">9</span><span class="p">,</span> <span class="mi">6</span><span class="p">))</span>
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
<pre>100%|██████████| 1000/1000 [00:24&lt;00:00, 40.06it/s]
100%|██████████| 1000/1000 [00:23&lt;00:00, 41.89it/s]
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
    <span class="n">bandits</span> <span class="o">=</span> <span class="p">[</span><span class="n">Bandit</span><span class="p">(</span><span class="n">epsilon</span><span class="o">=</span><span class="mi">0</span><span class="p">,</span> <span class="n">UCB_param</span><span class="o">=</span><span class="mi">2</span><span class="p">,</span> <span class="n">sample_averages</span><span class="o">=</span><span class="kc">True</span><span class="p">),</span> 
               <span class="n">Bandit</span><span class="p">(</span><span class="n">epsilon</span><span class="o">=</span><span class="mf">0.1</span><span class="p">,</span> <span class="n">sample_averages</span><span class="o">=</span><span class="kc">True</span><span class="p">)]</span>
    <span class="n">_</span><span class="p">,</span> <span class="n">average_rewards</span> <span class="o">=</span> <span class="n">simulate</span><span class="p">(</span><span class="n">runs</span><span class="p">,</span> <span class="n">time</span><span class="p">,</span> <span class="n">bandits</span><span class="p">)</span>
    <span class="n">plt</span><span class="o">.</span><span class="n">figure</span><span class="p">(</span><span class="n">figsize</span><span class="o">=</span><span class="p">(</span><span class="mi">9</span><span class="p">,</span> <span class="mi">6</span><span class="p">))</span>
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
<pre>100%|██████████| 1000/1000 [00:32&lt;00:00, 31.00it/s]
100%|██████████| 1000/1000 [00:23&lt;00:00, 41.72it/s]
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
    <span class="n">plt</span><span class="o">.</span><span class="n">figure</span><span class="p">(</span><span class="n">figsize</span><span class="o">=</span><span class="p">(</span><span class="mi">9</span><span class="p">,</span> <span class="mi">6</span><span class="p">))</span>
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
<pre>100%|██████████| 1000/1000 [00:37&lt;00:00, 26.47it/s]
100%|██████████| 1000/1000 [00:37&lt;00:00, 26.36it/s]
100%|██████████| 1000/1000 [00:37&lt;00:00, 26.76it/s]
100%|██████████| 1000/1000 [00:37&lt;00:00, 26.81it/s]
</pre>
</div>
</div>

<div class="output_area">

    <div class="prompt"></div>




<div class="output_png output_subarea ">
<img src="data:image/png;base64,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FOI2baTF37MJv+duAKLffJO2G9YTftddRL/5Js0mT8YzJrratimljmkVh1/vXvj26CHBhRDipLLb7dx1113MnDmTzZs38/3337N58+Zqy15//fXMmjWrXp+/pHQDwcpByqmorK2nIwlS6qDAVoCvx9H3pBTbHMzweszl3GOX9jbmlnz1FXtvu53MH34g4ytjGClxRPkuyP7nnANA02++psmkSQRffjmNP/kEpRTBl47Gt2tXADybNHGZlKksFiLuuVtWagghTlmbNm1iyJAhtG7dmueee4577rmHlStXHlUdK1asoGXLljRv3hxPT0/Gjh3Ln5U2EiwzcOBAQo9iqf5rr73Gu+++C8ADDzzA4MGDAZg3bx7jxo0DynsqJkyYwK5du+jSpQsPP/wwYARQt9xyC+3bt2fo0KEUFhZWeYbNZmPcuHHExcVx2WWXUVC6CGHUqFHEx8fTvn17Pv30UwDy8/MZMWIEnTt3pkOHDvz444/OeiZPnkzPnj3p0qULt912G3Z71R58f39/kpKSiIuLq7FddannZJCJs3VQaCus83CPPS+PlDvvIvLhhymxVlrRYVOk/ziLtM+nOM/lLVzoUib8zjsJv/suY7+OggJMvsZz/XpVv9RVCCGOxTPTNrF5f0691tmuUSBPX1z7BnRFRUVcfvnl/PzzzzRv3py2bdsSHx9PjwrDxQMGDCC3mvxCr7/+OkOGDAFg3759NG7c2HktJiaG5cuX18vvMWDAAN544w3uvfdeEhISKC4uxmq1smjRIgYOHOhS9uWXX2bjxo2sLd2wMikpiR07dvD999/z2WefccUVV/Drr78yfvx4l/u2bdvGpEmT6NevHzfeeCMffvghDz30EF988QWhoaEUFhbSo0cPxowZw4IFC2jUqBHTp08HILt0r6stW7bw448/snjxYiwWC3feeSffffcd1157bbW/V03tOtp6TiQJUo5Aa02BtaDOwz0502dQsGIFSZdfTsS9RlSdqgMx7/Hk0FJPYEq19/kPGkTo9dfh16eP81xZgCKEEGeKuXPn0rVrV9q3N4KZkpIS/u///s+lzKIKw94nQ3x8PKtWrSInJwcvLy+6detGQkICixYtcvaw1CY2NpYupQkx4+PjSaqQLbpM48aN6dfPmJ84fvx43n33XR566CHeffddfv/9dwD27t3Ljh076NixI//3f//H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
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
    <span class="n">plt</span><span class="o">.</span><span class="n">figure</span><span class="p">(</span><span class="n">figsize</span><span class="o">=</span><span class="p">(</span><span class="mi">9</span><span class="p">,</span> <span class="mi">6</span><span class="p">))</span>
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
<pre>100%|██████████| 1000/1000 [00:24&lt;00:00, 40.93it/s]
100%|██████████| 1000/1000 [00:24&lt;00:00, 41.10it/s]
100%|██████████| 1000/1000 [00:24&lt;00:00, 41.35it/s]
100%|██████████| 1000/1000 [00:23&lt;00:00, 41.84it/s]
100%|██████████| 1000/1000 [00:23&lt;00:00, 42.52it/s]
100%|██████████| 1000/1000 [00:22&lt;00:00, 44.37it/s]
100%|██████████| 1000/1000 [00:36&lt;00:00, 27.18it/s]
100%|██████████| 1000/1000 [00:36&lt;00:00, 27.11it/s]
100%|██████████| 1000/1000 [00:37&lt;00:00, 26.92it/s]
100%|██████████| 1000/1000 [00:39&lt;00:00, 25.17it/s]
100%|██████████| 1000/1000 [00:40&lt;00:00, 24.71it/s]
100%|██████████| 1000/1000 [00:39&lt;00:00, 25.23it/s]
100%|██████████| 1000/1000 [00:40&lt;00:00, 24.62it/s]
100%|██████████| 1000/1000 [00:34&lt;00:00, 29.34it/s]
100%|██████████| 1000/1000 [00:33&lt;00:00, 29.57it/s]
100%|██████████| 1000/1000 [00:33&lt;00:00, 29.89it/s]
100%|██████████| 1000/1000 [00:33&lt;00:00, 29.47it/s]
100%|██████████| 1000/1000 [00:33&lt;00:00, 29.94it/s]
100%|██████████| 1000/1000 [00:35&lt;00:00, 28.15it/s]
100%|██████████| 1000/1000 [00:34&lt;00:00, 28.85it/s]
100%|██████████| 1000/1000 [00:27&lt;00:00, 36.68it/s]
100%|██████████| 1000/1000 [00:26&lt;00:00, 37.59it/s]
100%|██████████| 1000/1000 [00:26&lt;00:00, 37.31it/s]
100%|██████████| 1000/1000 [00:28&lt;00:00, 34.88it/s]
100%|██████████| 1000/1000 [00:28&lt;00:00, 35.16it/s]
</pre>
</div>
</div>

<div class="output_area">

    <div class="prompt"></div>




<div class="output_png output_subarea ">
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAikAAAF2CAYAAACrowihAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjMuNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8QVMy6AAAACXBIWXMAAAsTAAALEwEAmpwYAAB6XUlEQVR4nO3dd1zV1R/H8de57C0qCOJAzYULVMA9S224yjTTMq3Msr13tocN22q/zFJTK3OUZaVZZg4cuBepOEH23nB+f1w0zYXIvd97L5/n48Ej4H7v9/u+QvDhfM/5HKW1RgghhBDC1piMDiCEEEIIcS5SpAghhBDCJkmRIoQQQgibJEWKEEIIIWySFClCCCGEsEnORge4VLVr19ahoaFGxxBCCCFEFdi0aVOK1jrgXI/ZXZESGhrKxo0bjY4hhBBCiCqglDp0vsfkdo8QQgghbJIUKUIIIYSwSVKkCCGEEMIm2d2clHMpLi7m6NGjFBQUGB1FOAB3d3fq1auHi4uL0VGEEKJac4gi5ejRo/j4+BAaGopSyug4wo5prUlNTeXo0aM0atTI6DhCCFGtOcTtnoKCAmrVqiUFirhsSilq1aolo3JCCGEDHKJIAaRAEVVGvpeEEMI2OEyRIoQQQgjHIkWKDVmyZAlvvPEGAJMmTeLtt982ONGlue222/juu++MjiGEEMJBOMTEWUcxaNAgBg0aZMi1S0pKcHaWbwchhBC2w2IjKUqpGUqpJKXUjvM83ksplamU2lL+9rylsljL7NmziYqKIjw8nLvuuovS0lK8vb156KGHaNWqFX379iU5ORmADz74gLCwMNq2bctNN90EwMyZM7n33nvPOu+WLVvo1KkTbdu2ZejQoaSnpwPQq1cvnnjiCaKiomjWrBl//fXXOXNt2LCBtm3bEh4ezmOPPUbr1q1PXW/QoEH06dOHvn37kpuby7hx44iKiiIiIoLFixcDUFpaymOPPUZkZCRt27Zl2rRpgHklzL333kvz5s258sorSUpKAuD3339nyJAhp67/22+/MXTo0Cr4FxZCCFGdWPJP55nAR8BXFzjmL631dVV50Rd/2Mmu41lVeUrC6vrywsBWFzxm9+7dzJ8/n7///hsXFxfuuece5syZQ25uLh07duS9997jpZde4sUXX+Sjjz7ijTfe4ODBg7i5uZGRkXHBc9966618+OGH9OzZk+eff54XX3yRKVOmAOYRkJiYGH766SdefPFFli9fftbzx44dy2effUbnzp158sknz3hs8+bNbNu2jZo1a/L000/Tp08fZsyYQUZGBlFRUVx55ZXMmTMHPz8/NmzYQGFhIV27dqVfv37Exsayd+9edu3axYkTJwgLC2PcuHH07t2be+65h+TkZAICAvjiiy8YN27cJf2bCyGEEBYrUrTWq5RSoZY6v61ZsWIFmzZtIjIyEoD8/HwCAwMxmUyMGDECgNGjR3P99dcD0LZtW0aNGsWQIUPOGHX4r8zMTDIyMujZsycAY8aM4cYbbzz1+MnzdejQgfj4+LOen5GRQXZ2Np07dwbg5ptv5scffzz1+FVXXUXNmjUB+PXXX1myZMmpuTAFBQUcPnyYX3/9lW3btp2ab5KZmUlcXByrVq1i5MiRODk5UbduXfr06QOYV8fccsstzJ49m7Fjx7J27Vq++upCtaoQorIKSgpYFr+MNcfXEOgRSD2feoR4h5z6r6uTq9ERhag0oychdFZKbQWOA49qrXee6yCl1HhgPECDBg0ueMKLjXhYitaaMWPG8Prrr5/x+ZdffvmMj08ub126dCmrVq3ihx9+4NVXX2X79u2Vuq6bmxsATk5OlJSUAOaRk9jYWOrWrcvXX399wed7eXmd8RoWLFhA8+bNz3ptH374If379z/j8z/99NN5zzt27FgGDhyIu7s7N954o8x3EaKKHc85zvy98/k+7nsyCjOo7VGb7KJsCksLTx2jUAR6nlm41POuR32f+tTzqUctd+kvJWybkb85NgMNtdY5SqlrgEVA03MdqLWeDkwH6Nixo7ZawkvQt29fBg8ezEMPPURgYCBpaWlkZ2dTVlbGd999x0033cTXX39Nt27dKCsr48iRI/Tu3Ztu3boxb948cnJyznlePz8//P39+euvv+jevTuzZs06NapyPl988cUZH/v4+LB+/Xqio6OZN2/eeZ/Xv39/PvzwQz788EOUUsTGxhIREUH//v359NNP6dOnDy4uLuzbt4+QkBB69OjBtGnTGDNmDElJSaxcuZKbb74ZgLp161K3bl1eeeWVc96CEkJcOq016xLWMXfPXP48+icAfer3YWSLkUQGRaLRpOancjTnKEezy9/K31+XsI6k/UlnnM/dyf3f4qW8gDn53xCfEDycPYx4mUKcYliRorXOOu39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
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
</body>

 


</html>

<br><br><br><br><br>

<script src="https://utteranc.es/client.js"
        repo="zcczhang/zcczhang.github.io"
        issue-term="pathname"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>