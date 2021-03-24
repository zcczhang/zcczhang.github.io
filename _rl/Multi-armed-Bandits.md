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

<!DOCTYPE html>
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
<blockquote><p>Author: Charles Zhang  <br><a href="https://zcczhang.github.io/blogs/"><em>All Notes Catelog for</em> <strong><em>Reinforcement Learning: An Introduction</em></strong></a>. This post is created following <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.en"><em>BY-NC-ND 4.0</em></a> agreement, please follow terms while sharing.</p>
</blockquote>

</div>
</div>
</div>
<div class="cell border-box-sizing text_cell rendered"><div class="prompt input_prompt">
</div><div class="inner_cell">
<div class="text_cell_render border-box-sizing rendered_html">
<h3 id="Action-Value-Methods">Action-Value Methods<a class="anchor-link" href="#Action-Value-Methods">&#182;</a></h3><p><body></p>
<p><p>
  k-armed: k options(actions)<br>
  <i>value: </i> (q_<em>(a) \doteq \mathbb{E}[R_t\mid A_t = a]), using (Q<em>t(a) \approx q</em></em>(a)) estimation.<br>
  [Q<em>s(a)\doteq \displaystyle \frac{\displaystyle\sum</em>{i=1}^{t-1} R<em>i \cdot\mathbb{1}</em>{A<em>i = a}}{\displaystyle\sum</em>{i=1}^{t-1}  \mathbb{1}_{A<em>i = a}}, \mathbb{1} := \left{\begin{array}{c}
     &amp; 1 \text{ if predicate is true} \\
     &amp; 0 \text{ if predicate is false}
\end{array}\right.]
<br>
when (\displaystyle\sum</em>{i=1}^{t-1} \mathbb{1}_{A<em>i=a} \rightarrow \infty), (Q(a) \rightarrow q</em>*(a))
<br>
Greedy action: (\displaystyle A_t \doteq \arg\max_a Q_t(a)), (\epsilon)-greedy: prevent local optimum
<br><br>
The estimate of its action value after it has been selected (n-1) times:
[
\begin{aligned}
Q_n \doteq \frac{\sum_{i=1}^{n-1} R_i}{n-1} &amp;= \frac{1}{n-1}(R_{n-1}+\sum_{i=1}^{n-2} R_i)\\
  &amp;= \frac{1}{n-1}(R_{n-1}+(n-2)\frac{1}{n-1}\sum_{i=1}^{n-2} R_i)\\
  &amp;= \frac{1}{n-1}(R_{n-1}+(n-2)Q_{n-1}) \\
  &amp;= \frac{1}{n-1}(R_{n-1}+(n-1)Q_{n-1}-Q_{n-1}) \\
  &amp;= Q_{n-1}+\frac{1}{n-1}(R_{n-1}-Q_{n-1})
\end{aligned}
] 
or more general, (Q<em>{n+1} = \displaystyle Q</em>{n}+\frac{1}{n}(R<em>{n}-Q</em>{n})), (n=1 \rightarrow Q_2=R_1) for arbitrary.
<br>
General <b>[Update Rule]</b>: NewEstimate (\leftarrow) StepSize (\cdot) [Target - OldEstimate], stepsize: (\alpha<em>t(a)), Target - OldEstimate: "error" in estimate.
<br>
[\begin{aligned}
Q</em>{n+1} &amp;= \displaystyle Q<em>{n}+\alpha(R</em>{n}-Q_{n}) = \alpha R_n +(1-\alpha) Q_n \
&amp;= \alpha R<em>n +(1-\alpha)[\alpha R</em>{n-1} +(1-\alpha) Q_{n-1}] \
&amp;= \alpha R<em>n +(1-\alpha)\alpha R</em>{n-1} +(1-\alpha)^2\alpha R_{n-2} + ... +(1-\alpha)^n\alpha Q_1 \
&amp;= (1-\alpha)^n Q<em>1 + \sum</em>{i=1}^n \alpha(1-\alpha)^{n-i}R_i 
\end{aligned}]</p>

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
<div class="prompt input_prompt">In&nbsp;[1]:</div>
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
<div class="prompt input_prompt">In&nbsp;[2]:</div>
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
<pre>100%|██████████| 1000/1000 [00:24&lt;00:00, 40.05it/s]
100%|██████████| 1000/1000 [00:24&lt;00:00, 41.02it/s]
100%|██████████| 1000/1000 [00:24&lt;00:00, 40.12it/s]
</pre>
</div>
</div>

<div class="output_area">

    <div class="prompt"></div>




<div class="output_png output_subarea ">
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYIAAAHgCAYAAACoxmrYAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjMuNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8QVMy6AAAACXBIWXMAAAsTAAALEwEAmpwYAACe+klEQVR4nOyddXwUxxfAvxN3ITgBgrsWbQtFi7VQflXqSo26UaFCjVIXKlCou1FogQqFAqVIoLg7wSUJEs/N74/ZvdvTXEIuIWS+n899bnd2dnf2ZN7Me2/eE1JKNBqNRlN5CSrvBmg0Go2mfNGCQKPRaCo5WhBoNBpNJUcLAo1Go6nkaEGg0Wg0lRwtCDQajaaSE1LeDSguVatWlSkpKeXdDI1Go6lQLFu27LCUspqnYxVOEKSkpJCamlrezdBoNJoKhRBip7djWjWk0Wg0lRwtCDQajaaSowWBRqPRVHK0INBoNJpKjhYEGo1GU8nRgkCj0WgqOVoQaDSaik/qR/DLfcU/7+h2yMks/fZUMLQg0GgCQc6x8m5B5eKXeyF1SvHPe6s9TB5Q2q2pcGhBoNGUNjsWwLi6sHVOebdE4w+H1pd3CzyTmQZfXwV5JwN+Ky0INBp/OHEQ/M3mt2+let84M3DtqWjsXgrZGeXdCmdshY7tA2vLrx3e+ONJ2PALbJgR8FtpQaDRFMWRrfBKE1j0rqPsp9vh6XjP9aOqqvesw4FvW2lwdDscDOCo2FYIk/vBl5dZymzw93g4eaR071WQ53/d/GzHdlHPv+HXktkgfHHysO/Bha1AvQcFvpvWgkBTeTmyVXVIRXF0u3rf8qejbOWX3uuHRav3rKNFX/uX++H52kXX84fCfDiwrvjnvdUe3u1WOm3wRKHROactdZTtmA9znodf7nGvL6XqpA9ugE2/Fe9eeSfU+57lsPUv33WtgiAo2Hfdr68smQ3CG4c3w8uNIHWyo+znUWpwYQoHc8YSFPiQcAETBEKIKUKIg0KINUXU6yyEKBBCXBKotmg0bmQdhbc7wk8j/ahsjtqEf9c2R3LmO6hOx+yYbIWw81+1nToZ8r3ogGc8BM9Wg5Vfw7JPilZN/fk0vNcdjm7zr53FIeeYEpz+8t0N8O7ZatsUBNIidAvz1btV/73qW9URPpMAz9eEd7s6zyJcsdlg5mjVqZrkZ6n3Sb3hs+G+22jWBQgK9V23KGw2pc/f8Y/3OksmwZof1XaGEf9t/XTH8f8+U+8zHlLv5uclihBSpUAgZwQfAwN9VRBCBAMvAb8HsB0ajTumy+Dq74qua3bAwoMg8DSj8CQIZo1WHdOBdfD3S/DRQNi12Pv9Fk+EJRNVJ/rTrTD9blj7k+927lmu3jP3+K5nkpcF0+/1r+4nFyjBabJ9vu/Z1Nof4aChdzc7fY9YPtMfb/FcZe8Kz+Xp22Hxe/DxBY6yvCzPdT1hnRHIQvVM8191r7d7iWPbVfX098uw9EPIPqr0+d9e436+rRDSlsGMB+H7G5RQ/fxio70noSDXWSAuneQ4D+Cbq0p3NuKBgAkCKeU8oKi58V3AD8DBQLVDc5pzdBu81sr/zqu0WPy+f/XmvOi9gwLVUdtssOo7KDQ6frPjswqCQ5vUe3a6wzB54oDztY5uV2qi9dNh5kPu99rpY7QJEBal3ue9DJv/8F0X4L/PYdlH7uVLJqmR+eY/HJ29aQCXUnWYn1wAC14r+h7gmBEA5B6H359wjMYPbYRXW8C2ud7Pn3ieas+Xl6t9mw2Wf+YQ0Cf2W+6V61+bwHlGcGCteqbZY93rTe7v2H6umtLtA+SegDnPwa8PWISKh8FC6hT4sI9jf+dCx3ZeFrzeCl7woB6UFmP2iq+KfJxTodxsBEKIOsBw4L3yaoPmNGDpZDiWBmu+93585iO+r7FjAexbpbbXTVMqiYMblNeOJ4+Lk0eKFgQ5mTCpL/w9DnIyjEIPf/LCXFj/M/x4M/zzuuoc0owRpNUrZZf555eODmzui47jb7RRuvr8k7DIy18iob5xCakEj3V0+nobhw1j+9/whR+aVqugsjLf6OC/uESNdq0U5js6vb+ehR9uhk1FTOitgmDR+7DwbcfI+VgaHN8Lnw4rur2bZqn3VV/DtFEw9wUP93KZfexZruwwOZlw/AC80hRWfKlUg1ZB/PdLju2iVHDHjEFLlsXQbY7osw6r72btT7BxlvoN2H8/BnuXO7YLsuHkIc/3sX4/IeG+23SKlGdimjeAR6SUNuFpym1BCDESGAlQr169wLdMU/rMfhaa9FcGww7XQGSCSwUPv4Elk9R0GmCQyx9VSuVNUZgPHw9R5U9lODqYd7s66ne8Doa+5djP3O18n4VvQ4PzoFZbR9muRbDHjwRIhfkOdcThLcqouP1vtb93uRrJNejpqG+2FeCgxbCbsctyb8uI0Qnjub+5Wqkh9q2ApgOhSkPI3OVevbAAgkOc93OPQVQV43KFzvVthcpoalVTzHwI1k117G/4BYIt+vTV36nXUxkO1Zm1I937H0zs5eV5SoCUkGF8f2t+cD9+eBPUaufYn9RbvcfWhOiqqvOfejvUbAsth3q+R+4xiPDiEQZKiKTvdP6cTCM1qEGBlT5j7JuvJSbQMvVth87clz3HOpDYMR/2r4Garb3XPwXK02uoE/C1EGIHcAnwrhDiIk8VpZQTpZSdpJSdqlXzmGlNc6rknfSusz5VpIT5r8CUAUotMMOD2sMTphBwZf6rMDZRqQv+es5Rfmyv5/rLP3G0AxwjOpPfn4APeihd89Q7VZm/I7CCXIeX0KqvHULAZOptsLGU/MDzs5Wb44Zf1P66aUqd8XpLz/UXWoTfoU3KzjC+gRJcBbnquV2vD86dGjirpL6/QQkiV6xhGgpyHNuuQiA0wnNb/WXl16qj9sZPt8ILddzLj25z7lj3r4IThzwbib+9VgnNRe97XiH+2UXwZlu7IDguBGNWvctxlwHtvMgITgjh1Nl/lBDHQ9WVe3G2EBwI9mIIPrTJfXbz/jme65YC5SYIpJQNpJQpUsoU4HvgDinl1PJqT6Xn1wdgyvmO0VZR2GwO/fGhjWqEZOWHW+DZ6mrb9QdtnSqbnfMfY+DTiyx1fPzZ/3rWsb3NsnrXV8yY2WOVN8riiUpP74kd82HF52pK78mIvOUPpR9Ps8wUCnO9q1hMvAm04rLsY4euHjzPAqzMfga+uFR51UzoDCu+UOWT+sBz1d3rZ6Yp1ZbrTMEfXqoP6w0BZcyQClEj4MNWP3irkCgJ2+YUvTCtINu9bOVXsH4aWULwVmI8eaB+h9FVPdxjrtLrz3pErRD3xvxXAPgyPpaph5byeXys/dDukGDurFmdUTWqObytqjR0Ov32GtXoV8+D0ALSD65hU+4R1oSF2cskqJlqAAik++hXwL9AMyFEmhDiJiHEbUKI2wJ1T40L314Hk8/3r67pguc6WvbG2ET45EK1PaGLGiFZWf2t6iSlhPQdzsc2/670+q5sm6O8aqR0V9+YuBrzIhMd2xk+OkbTG2TFF0XHAfrqcmVI9cTan+DDvo79wvxT79z85fg+NcMoDpt/h3c6OZd5C6nwblffHV9RfHOVmqX99ykAiyMi+CghjmerVnHUKe7q4lYuLqCrvlEqsZKwfR4fJsQxKSGe72NjYNU3HDu5n3cHPYabKF/9bdHXM2wWIcZgJluo7vSlKgkMrqs6+GWREeTvXkRGUBBt4h13mR8ZwbJINTtytUgsjQinZ+pTXBydy4g6Ne11BifX4sNlbxbrkf0lYDYCKeWIYtS9PlDtqDQc3ACHN0LNNoCAKg2cdbuesOrao5JUmekR4YtDG9X7Tg+duSs5GWo06srHQ+Dyz3H7G7zXHYa962iPyfJPlTF03c/O5SEWVcNXlxfdnn0roF73out5w7oACJSKJd/DCLS0qNJQCa7c48XziCkp0odLqL/8+bS6lKEpyTVUJqvCw2i+dTZhXk4DoFFf2DrbsR8a7V7ngM+lST7JM9qSE6Te769ejcUbPqdFVCS9syzfowc31IygILKFoFZhIfnAn9FRDDyZRbjxE94VGsJxIfg8Ps7pvOwgwS8xzs9xR03HjOxoUBC96ifz1oFD9M7K5rfoKOc2A+vDw0gLDSUmNKaET+4bvbL4TOHdrkq3+VYH5X3iDyu/ViP7JZMgrpYqO2y4OWYd9e49YfXwWPi2Y9tmU9Nqqy+2LzfGqXd4vsfuxe6j+2l3uQsBcHiSFIfFpeio9udTzm6Ipc21P8NDWyC2hnN5nGeVgklGUBDvJcRRCt16iRHGV7szNIT9wcFcVbsmz9gOeD/hoa0OF1iT0Mhi3zdHCD6Oi3Uf5QNB0qwTxD+RESw2RuUhrr/Dg2v5LzyMNg3qsTdE6fF71avD+fXq0KZBPW6oVYOHq1dlfmQE4YbwnB0dxbRYd8GVKwQvJSW6lZusiFD2qM/ilGqpwMVx4oHqVbm6tpoZNIkupVXoLmhBUBn5eZTyZjE70RkPQqjxB5z9DGz+UxkVTUNsYYGyAUwZqDpoq7eE1eA4b7wSElb1ja8wCyFeDIf52SWP0xPuw9sjEGz9C7ZYRrAjvi7d60fEG944Ll5VPR9iUUQ4bRrU46iHWDTPJSXybmICiyI8fMZPZdg39wcHk1WE115x2R8czHEhCDJme2mhoWQZI/BpsTF0TKnL7hAPyojoqo61GCaG6s/slFeE+5xPAPBBQhyvJiXyq8soPEsIPkpQo/X3EuO5p7rDPpAnhF1wfBEXQ5sG9fjUGNkviYhgYWQEhZbPaaXReX8SH4e0fDf7EtwFdJ96yT7be8QwGEdJST7wX4Szo8JcywwhLiyWQKAFwZmK6x/K5OQRtZR96m0gLF+/Vb3xhbHqcf4rqv6PNysbwK5/VeAtb14b1uXyJq4+1K7H9q92L9/8e9GraL3RoEfJzjsVrJ5Cdc4q+XVu/A1qd3QuM//4rp11rXZ8bHRUazx0jseC1XcrPfXxxrVyBfSvV4eHq3swmHqis8MtcltoCLOjPI/W+9erw1W1azqJrtXhjs4tXwhmuag/AL7b9B03F+xwKpMR8RQOfYcFkepe/0apzn1CQjwDkmt7nPEcNjrWfLMBDXuxddibvJHSyqlerkWArgoPo0ODesyJiuSbWPWZW4XVrTU9GNeBJZERbA11eB59Elx8NWG68V39HRXJwLq12RbmPdxFVIC6bC0IyouCXLXwydeKSn/xFK/8iCX+ynFjOn5sr1IdecJb5/5ac+dO2Rp4zRVPultfS+ML8zzbGXIyHCoqf7AajF1tC6VFzTbe7+lPuT8EhzpcUa/6Hh7Z4Yg8KdT4+t2EeDb2GQ3hcYQa6ox8o2PfGBbKSkMoFBrdcLA39V5wGJtCVd1FEX66ylqM7MOSa3NvjWrsDAnhg4Q4u6Wn0PictoeFsiLCISiOBDt3NflCQOebOTbcsbBv7L9jWSxP8kNMNOvCQvk9KpLvsnfSfvV4jprnB4WyKjyM9xPj2RsawsawUCbGxzEwuTa/RUXyYXyc3Q7wXWyMcs+84ksuWvUqX+HdSWC2IZj+jook3vCG22h8livCfX8+X8af2ij9ncQE+/ZBTzMlC1F+RkIvLloQlBcZu1Usll/u969++k7lkWEuTzcNveB5ebp1pP1qU+V6+FoLyLW4WJqBr8C7Cse6KrQkuIZRCARn3+3YjqkOZ93g2I/zMi2v7UUgemPo29D6Ysd+ZBXP9YJD4YqvoLOXsBR9n/R+j+BwCDc6lYIcF6EiyBGC9xLjuXbndxAWhTluLDBWHF9Sp5Zdl1xgjIa9hisTweQa6hpPnYANpWt3ovXFbu2/tXFr3klMIKPpALj0Ez7vcJH92DuJDqPp8SBXQQDrUrpyzooX+M1lZvF0tSQur1OLB2pU49ujyl12n9FBzooK4+9IR/2jwcG8XSWBPaEhjKmWxJtVEtgRququCw+nX706HCks2qtrpzGq/yE2xq6zN/khrnQNtFEh7rMhv891nTGWEloQlBdm2FtPPuiF+WpFppV549W7OcJ+tiq8lOI9nrurr7xrqACAPcsc29vmQHDR+tcSE5FQete67DO46D3VKf3vQ2cVV9NBauUyKLWKN0EWVwfCYvxr281/Qe0OjMrZzLexxjmejJjtrlTvzQfDkFfgFksY5HPuVR2pq1dOjdbkgxrJBwXDgOehcX9o1Me5nhB275ssWz6ERdsNnAX93IWLLdqzKgPgp80/sSkszK4TN0fQhcD0mCiybpzFC/3vpXNKXYdP19OZ7E9uz5yEquyyjFqP2dQakcLh7/J3XCIfbP3R4z3TXRZOfRcbw4FsFVrhm7hYNnhRhxyV6vrm7GdbSBATEx12oGMWAZNtbK9zGcE/tfApj9cuL65vfb3fdVslOauzwhqcV8qtUWhBUG4YfzFpUzFjrJEc/3pWrcg8uEHtp+90+LWbaiBbgVKheIp2CO4j8cy0opsUdgojn0aGb314vMPwbGXYO77P71GMRVfBYdD+SujxALS91Dlee9UmEGGMRPOzIM6Ll0VQsGOlqTe9ftfb1crTZHX878IMnq1ahVwBY0OzOdLOEiK558Mw3MUbyXrd/s/wXdtBtNn+Kebyuvy4ZGSD83grMYGra9dkbcZWjkYlwNXf21VEf+36izaftGFVsHQaVX+3YxYhxk8o3+a8YO+toc9SaDz3/uBg/lenJrtDgvk9KpIP67XiyYVPcnGNePsou1AIvo2P55XGnXisWlW6zhnJN1tUh34syDEr6P99f+5e/gpD6jo+0zybErQZORmM+msUx/OPe/wof4h1/m1lBgfz8wG1kj0jJJSNbTyHjD6UrZwG8r0YtNMv8BAt1IV9J/cVWacsiQ7x4BLrgToxdRjUYJBTWVHheEqKFgTlhWnMtRWqiIY/3+k4lmaM1M3O3Jo9Ke+kWt1q4i0ipWs4XW/GYyuxNd3L/PFSCI1ydHrNBsGFb0JSE+c6vmK3PLITej8GD252MkgC6jqDXnYuc7VnWJOKhMc61CuyEK78Vunbr/4RrvoBWhvB2EIiHbOx4R+oV8uL1H7/Z5VgGjQOnnT3XpoVHc13ofm8Xc3xecmWwxj0wyC+2+S8Inlgs3bc0VH9mSf8NwFQo+ODEbF0TAriu9qNWZ+oXHev+PdRzvvmPKSUfLr2Uz5d+ynjl6qZ4FXR+Qy2dMBjFz9HiDGYSM9JZ12PUfZjk1ZPosCYeUyLjWZzWBgvJlXhgRrVeDPY0VE/Wc1hT3m2SjyfF7oHAf4oPo5C4FCW58Boucbahqlbpno87ovZh9WsV1ZrxifSd6ayLV5mDGuPFJ1iclN6MexNZUCfen0Y3ng4X1/wNf3r96dDdXc1ZbAI5sehP1Iz2vEbu6WNjyi4p4gWBOWFOYoz47qYGa+khEPGTMBc6m9dZbv9bxVfprh4WnbvSrNB7mXmEvy2V8Bjllg+rm6SZucbFAxtL4NRS6H+uY7jYT5GQZEJ6ryY6krd0/MhuOB1uGQK3JUKXUfCddOhhhFwK9llgZophGq1Ux4x4ZYFPbE1VLC7xn2hST+oawSjC4tybEdVgXZXwMWTYfRuOOdu6DsGKSX/HfwP6WJwNd0tCwVMr5rM8Do1WXZ8O2kn0hj7r/PK5z156cxPX8s3G74hMkSpk44FBbGzvZpN/Lrnb4KtQdKABXsW8HLqy7yc+jJ7Tnhf6f2TMcp+bdlrXJ42zelYoTFwzDJsIVbPluIwOSGerztfTp/v+vis98m6T0p0fYBjecfYnL7ZZ50DXoyo07ZO81h+qtzc5uYi6/yyey8TG7vPyBPCE+zbXw1xDh897aJpJMcmM/acsbRKasVrvV7j00GferxGVGiUkyC4u+PdbvVKi/KMPlq5MePvmKNbM/jVii8cPvS5x1XWIzPI2KlQVDwcgKTGju3YWsrOUP8clQCkMM9Z5eOqV7frzI0eSAjVkb/aVO3H11U6dNcUj1WbOe9HxEMfl2BooCJ43u5l9lO3Czy83RFV06K/H7dkHEkRSdzS1hhNGeEgMoJDmNvtai4a+IJjRhEcAsFxzEubx52z76RxQmO2ZGyhYXxDzqrhUPOYq1KnbpnK1NggIIynVzqrvh6b/xjn1XXoc59b7AiOl9F8MLaWF8KBPwgOCiZIOI/H7ph9h+fnLAZ7TyihvSpdDSr2hpb8rz7u8L+n3B5fHMzynI6kTdU2rD7swb3YICY0hhP5zgHygkUw/er347cd/qW4rBJRhWkXTSM+PJ42nyiPp2qR1ezfyaVNL6VmdE3e/k8tnOxQvQP/HVQzmXApCa5/Dmz5jKbxjbi+zU0sP7icrrW6MnvnbGbtmEXVyKoMShnEzB0zAWgQ38CvdoUY6s56sSrasvX3Fwj0jKC8cA3EZnqIWIOKzX+1dISAP1z4lvOM4IEN8Ph+NZIGpZISAqobxiunKJLCIdCiLJ4u1tWwIeHuOnSAa0q4XsCVKIsXjxAcbHURYzpfxBfrv+Ct/yxRODteC60vZrQ4ypglL7A9Kg6btGGzGHHvnK3UdFsytgCwLXObk8rnxxh3W8qebEdnJqVk+rbpPPi3Z7vHnnYXM3G9svkEEURwAFIRunaQ5ckFDUswgwWSYzx7fI3vOZ4fh/7I1GFT3Y5Fh0bzynmv0CyxmfuJHkiJSyHeWIQ4sf9EHuz0IF8M/sIuCJIikxjZ1pHO9JOBjplPeFAokcbss1f9vlzY6EKe6v4UA1MG8sK5LzD5/MnUjK7JQ51VtN3GCZaBlhd+v1jldjBH/4kRiXx7wbc8f+7zfj1PSdGCoDyw2WByP+cyc5XtkomOMtNY7I14l9wMQ14rMvSAnUddjMdnXeceklcIR8TEdCOB+42z4KL3lfuloeogpprDBmCqb1wxPZKu+FJ5z7S/WnnGxPvZXmD/yf2sPVy0Thjg3ToNmHp4ufuByAS4ZAr/HFDJY/IK87h6xtW0/7S93+3Y4UFfXWCZcbX9tK3bcSvfb/qeJfvV/YNEkF1ldKYxsu1IzqlzDi2TvITJLgKblwAZ0aHRNElsQo3oGm7HzE7XVSXjD91rd+e6VtdRK6aWXRDYXLy8rMba8FsX0KZaGz4Z+Al3tHOexYUGh9KlVhcAqkZW5Z6O9/B6r9e93vu8ZDV7rBFdg9XXrWZoI0euhBZJLagT4///pCRo1VBZsGsx7F6k1CAzH4YRHn6k+SdV4gkrwWG+A401H+zItFXnLOh8k3p9MtQ9Lj4of3szRn14LFz2qTJEtzWCtQV70CNXb8H+0HB+adqdm6RERMRBeyOe4APrVTatDlcrARRbC5oNdj4/sYESIqYgaD5EvUrAwB8GUigLWX3datKOpxEdGk1ihOcFXLE+jNwnLcnixy8d76R+cPXAKQ1iw2I5nucw0q474khIs2jfIs6uc3ap39MX43uO5+F5D5f6dc+pfQ7/7FXquy41u3BLm1uICIngx82eXUq98dPQn/h207dEBHsOQeLaOVu5qPFFgOqITR7s9CDn1D6HBIs689dtv/JK6itevXDMWZp5ryaJTdzsGBFJjQDoWMO3b78Qokibwxu93yA9J91NTVhW6BlBWTDlfPjjSZVeL2Onik/jStYR98QTeZ5d8QC4Z5XyTTc535Kgxex0+z0DT1i8PTpcrfT21xmhIFoOg16jVaRScHbDNAkJ54H2/Xlz3xx2HnPJORCZqLx9EuopPXvzIe6hEG6YCZd/4ezZ44FtGdt4eenLSCl5a/lbPL7gcbc6hZY4+YN+HMRlvzjcN6dvnU6bT9qw7IDyuPIkIBbvW8wl0y7hwp8utJeZI3OAXt/0YtKqST7bWRKOu3yPpsslgESy+ahvQ2lxCfH0PVoY1GAQL5zrSPP4YCf/XHe71urqVtY0sal92xzFTug7gckDJhNhzHK9dehWXj3P4eXWOLExj3V9jFva3sItbW5h+dXOMztvgqBzTQ9RboHrWl1H48TGVI2san/Vj1OL8ISnzHhg75DN39ynAz9lxv9UgqFb295K22ptS7XTDgkKoVpU+SXd0jOC0iYnEz7sDx2vgbPvcj5m5iYtaRwdK4n1VRIRk/qWUaUZZiEiDkIsi8RCo5xXx7riobPOt+Wz6rDKB2ztwPwmrhbEueuIX1z8IkdyjvDKeSq5x91z7mbnsZ2MaD6CSatVZ+xNL2oa9faf3M+JvBNsz9zOYwseA+D6Wdez+rrVhAc7LyqySRs3/+57VHYk5wjvrSz7FNoHsz0bS02iQqLIKvA/wmmThCZ8OuhTOn/h6Bjrx9VnRPMRdqOjdcbUp24fXkl9pcjrvnDuC2TkZrD28FqeXPgkDeIb8Pngz1lzeA1Hc47Sv35/Bjcc7HZe7RiH2+sd7e+gW61ufLXhK2Zun2kvrx7lvgAuNizWriuvHlXdblSuEuGwB4UEhdjVcu2rtXc6//Jml3vtrM0Rv7cZgV01ZKzviQmLIcZYZzOqwyhGdRjl8byKSiAT00wRQhwUQngMHi6EuEoIsUoIsVoIsVAI0c5TvQrH3v9UXgAjJju5Hkb11hW9vuh0o+/jYdHQZSTc5BL/p7nxZ3RdXeppoRfw7cZv2Xh0o8djTyxwePAUWlP9lZD8wnw+XP0hX2740qNnh1XX3vnzzvYRvjee+fcZ1h91rLMw/8AFLl5SM7aXUrrIUqZGlLue20qD+AbMuWyOU5mvEX90aDSjOowiIiTCye/852E/c1WLq2hepTmAU1z7mjE1+XnYzyy7eplHPfb/mvwPUB1z08SmDG8ynNXXrWbaRdOIDImkc83ODEgZ4LXTbV+9vX17QMoAOlTvwPie4/l6yNdc1vQybm5zMy2TWjKm2xg+PN/DCniUEXX51cuZMmCK0/WubH6l18/iiW5P8FjXxzweCzYGPd5mBEMbDaVxQmNGtPA7rUqFJpCqoY/BkaPZA9uB86SUbYBngYk+6lYcDhmLV2wFsHGm/52+K/XPcY9n42JUtCG5pGA7vxW6xAlqOQzuWOyui3eN9W7w7KJnuWT6JR6P/bHTkU/AnJJvSd/CtkwfSbdRo3ZTvTN391xeXqoWhS3cu5A3l7tnWQoRqnOzLkzKKczh+lnX+7zPrB2zCLUYuW3SxhfrvyDTGlMJeHT+oz6v44ovG0NxOaeOQ+VXNdI50ueBLLVosEWVFvayJ7s7Qka82ftNokKjnNQjrusarCy6chE9k3sCyvOkW61ugKPjM7GOhENECA0TGhIWHGYXFACN4pUO/ImuT/DHJX+cklE7JS7FraxV1VaM6T6GezreQ1hwGJc1u8yj+slsf2hwqJv654FOD3Bne+XlFVOMlfGmAPAmCKpGVuWnYT8F3Eh7uhAwQSClnAd4DUYvpVwopTQD4iwCfAftrihkWx556xzc4sj74nyLKuTKb53VPaAWdFVroQKgoTxeNqZvZPT80e7Xqt7cXV/vLf6/CxvCQrnl91vILcx10subhtTh04YzbOowDmUd4umFT5Nnieczc/tMZu1QeQ7MxT53/XUXn6771KNu9/EFjyOltBv3Jq+Z7FbnuUXPMWWN9yimriPkcUvG2dVLJcUqXF7q8ZKT/7cv7w9rh27yTp93WHLVEhZduYhfh/9qL68RVYP7z7qfOjF16F23NwA3tL6BS5teaq9jPltocCjjeozjh6E/8FjXx4gJjeHdvu9yfavrAQgLCvN477f7vG13SbTSML6hvQ1WoWB97i+GfMHsS2cTGhzqtLCpJNiNrzbvht6SECSCuKn1TdzT8R6uaeEl3IoH7MI0MBEbKhyni43gJmBmkbUqAk6qIOlZNeSNEEOv3flmCI9RPvwPbIJF76rrBAXBnYuYumUqwVun2zsPX14UoOLN3FOjKhNyjriNSD2NLscmVWH1vkWM+WeM07UX7l1Im6qOcMwvLnmRP3b+QY/kHvStp9YbuHqjWD1kPlv3mZsuetrWaTze9XGnDsiVbzZ+4/P5cgOQwvHmNjfbwzsMbjiYZQeWsT1TudBaZws3tL6B6JBo3lmhFpR9c8E3bu6jIUEhTsJqcIPB9K3Xl/NTzrdf4589ytsmNtR5JmLOlACGNFQzvKaJTbmsmTKU90juwVUtrnLr0E0iQiKoFVPLrTwxIpHV17kv1rK2Mzo0mmhPqSJLgDkjsQ4sSovQ4FC/VgJbkUZ4Dm8zgspGuXsNCSF6owTBIz7qjBRCpAohUg8d8hzzpNwpzFcpH61RP7Mz4OhW/6/R9nJofoEKsWASWwP6PwMXvMaxPLVoa8w/Y3hswWP2EXpRguDLblezLjzcSe3y7cZv2Xlsp5MufeqWqZyo1owCI+aQ1ZgH8N7K95xCDZhumGYn7uodA47FWYBXg+TLqS/7XEFaFM/8+0yJzht79liP5fd0vIdrWl7jpM6wdogRIRF8MvATfh3+K/efdb+T2sWfoGAv9XzJLgRMzqlzDh/0+8A+wjcpygMIoGZ0zVILRmbOzKwCqDS4q8NdhAaFUje2bqlet6RoQeBMuc4IhBBtgQ+BQVJ6jzolpZyIYUPo1KlTgFIznCKL3oM/xjiXrf5WvTzR+wnYvwrWG7FSrv2Z7JBQ9g4cSyMPwd/WHVnH5b9cbveyAXeDqCsL9iygRZUWiCoNYO8c++g/35bPs4ueJTIkkrmXzbXXH/PPGMbEQJOYZEhP93jNozkO1dfCvSo3gpSS3cd2M/gnd48Rf1bNfr/p+yLrBIJWVVt5LDc7h+nDHRnXogxDe9PEprSt2tZjx3tD6xuc9if2n1gsvbqn9QT+CILSxPy+kiJLN8FPr7q9WH6NhwV+5YT5Xygvv/3TjXITBEKIesCPwDVSytMrPGBJyPZqDlHcuRSqNVXJZQBa/w/qdFSCoMtIaNiLa6Zdwsb0jay6dpVbR7PmsHK+mp/miDz61y4P6xEMcgtzuf3P22mZ1JLutbqrJhqB56zv18681u3cogKAuTLqL++udKYxtLjc2/FeqkZW5Yl/HF5LzRKbsTHds3dTcXnlvFfsenJXPM2w/tfkf8zaPou3+rzl9t3YR5UuQ5QuNbu4GWmLS1kLgujQaB7u/DC9knuV6X3LGnNGoCcEikC6j34F/As0E0KkCSFuEkLcJoS4zajyJJAEvCuEWCGESA1UW0odW6EjO5idIn5R1Zo670cmqhALQ99RC7/A3sl58tc3OyerN8zHaz/2eruVB1XMou2Z2+0dl2lAzbbkJy6tjtUXieGJHr1GvHFp00u5qc1NDGs8zKm8Xlw9L2coTC8XK9b7mrOpyJBIBqQMICQoxKOB1ZMeu3pUdaZeNNWjF4m3cASnKgSg+ILAZpNk5fkRYNAH17S8hrpxp4cKJ9Bo1ZAikF5DI6SUtaSUoVLKZCnlZCnl+1LK943jN0spE6WU7Y1Xp0C1pVTJOwljqzji/S94A764FBa85lY1MyiIb2NjnAeKdZU7HxEJyqun4zVubp05Be6p9cxOxqqaybGk4Ju7e659+4+df3DT7zcBago8ebWzJ062PyGpPWBVIxWH9Nx0e2jewQ3c1UeuuBq0TZIinNUV31/orFL6ZNAnjOsxjkVXLuLuDncztNFQJ/VO7Wi1sGlEc4dvuOleObzxcG5vdztQfIOm2ZmYo8xPB33KvR3vLdY1vFFcXf1T09bS8snfKCgsXe+cM41a0cqA3rF6YFI/VjROF6+hikOWYcpY+Da0uBDmvmgPbWyn47Ww/FPGdL2UOfv/pWVuHqs3fEXfen0J+t/7VM3LciQl90B2QbY9IqKJaRg+kuMwpRzJdmzf9dddXNDwAh7r+pjdAwWchYX1+iUhLiyu6EoWYkNj7RmrTE+biJAIJvSdwLSt0zwuKHuw04Nc0fwKj9e7o/0dRIVG2V1JG8Q3YGDKQLu7anx4vN2zxh52Gri+1fW0rtqaNtXaMGXAFKdEIGan3yC+gd0N1tfCucMncomPDCXUkozdnHGZgqBD9Q4ek40UB1MNVtxZxddLdwFQYJOElH5Q0zOGJolNmH7R9CJnmZUFbSkpLmZYh5wMmNAFXIyh+cDjiXHsvmc5RwqUV81n8bG8sPgF+n7Xl97ThkINz0ZKk/7f93crM8MKWxOVSBel9C/bfuHWP271mczk83WfF0sQjOnmMIBbA3mZKpXEMO/xUc5NVolpJvSdYA8LEBYURs/knozvOZ4bW7uvnL6u1XVu4SEA5l0+j8SIRPrXV59NTGgMYcFhdgHpzQMI1KKjASkDABWPxqpuMWcfVSKqkByrlrJ485m32SSdnvuTh75b6fG4r4VexWXS+ZOYMmBKiY2Z+XpGUCQp8SnaWGygP4Xi8rNL0pCEeuQDL1VJID0oiLXhYUzbNo3H/n3aXmVGjLMvdptP2rBw70J+3PxjkZ2HqQry5JrpidWHV7No3yKvx19a+pJ78DgPtE5qzZhuY+xrFUzMZNrmKs79e9pzdeMHPF7j6e5P827fd+mZ3NNNtx4kgrjvrPuKbIeJGUTO7MRNrxZTjeY6g/KXa1pewwvnvsCFjS5kcIPBfNDvAy5p6lhlPW3lXnYcVgK99dO/2cs8tc1bJFSTbYdOMGHOFr8ERmJEotcgar4wL51feHo612lOT7RqyAsP//0wM3fM5N6O93JT9W5qTcCid1UsISuH1vN3VCSfx8cxKzqaw8Z8/HD2YZ++3bf+cSugRvHjeoyjWqTzyPrcr8/lnT7vcM1M/1dL+ounuDtVIqpwbp1z7auBvxiiknNk5GTY62w7dIJWcf1Ze2QtdWPrsnT/UsBGk8h+vNm7HvHh8aw/sp6Xlr4EKJfLHsk9AOyjbVOwbdh/jNx8Gz9f9DPbMrZx31zPQuHnYT+TnutwZbUHCzP08ubspqQhIUKCQriwkSMaqasL591f/UdkaDDrnx1IVp5nldEFDS+g0FbIBY18J2C54eOl7DySxYgu9agSHeaz7qmibQSnxtGTeSRGhZZqsvisvAKChCAi9PTT2ekZgRfM1HJvLH8D3jsbPh7sNVtYmDEMO2xRyh7NOcru47s91reydP9SXln6Cr9u/9WpPDM3k30n95Ww9b5ZtG+Rm4fNU92fIin7Ovu+OWW2qlH6vPo3k2fUYMlVSxjeeDgAhSebUGCT9KnXh7NqnMXVLa/2eE9T3XI4W6XhHPjGfIZN+IeG8Q3pV7+fx3MAGiY4p4l0XZdgRuWMCvEcR6mkbD5wnAlzVIay7HxnASCEQEpJoc3hiz68yXCfq6MB8gpU53wy99S8evwhr9DG/swcUkb/ys8rvKsKiyIzO5+U0b/y039pRVc22HLwBBe8PZ/DJ0q24nvzgeM8PW0tNptjVrNydwYf/bO9RNcrLtsPn6Tjs3/w+aKdHM9Rz+86CywJLZ/8jd6vzPV6/PNFO7n5k6Vu5eb3uGJ3xim3wRtaEPiBROn+7YTFQLRjBB/uYapfnLDBx/KOeQyK9vm6z4vRSueIkkXRKMFZEASLYN6avZncw72d4uqEh7jq6wXBhKsIkNtfpjA7xd4heuPJn9cw4j2Vbc2T/v9UMN1Di1LLFJcRkxbx8m8O11rXZ7z3mxU0esx3RNPth0+y5aAjVHikMRLMzC5e8ps3/tzEpHnuQf4On8jlld82evz8Cwol6/epleg/LC+5IFidptyVP/5nh9/njJu5njV7jvHPFiX0txw87qQOk1KSkeU9pPlNn6Ty8cIdTF+1l6+WKOP3sAn/8Mz0dSWyw0gp2X3U///j5gNKDTtn4yF2HlHnvWsMCk6VfZnuzhsmT0xdw5/r3UOSz9usoil8vqholW5J0YLAD6bGRNOxQT261k9mYUQE3LaAo2c/zuuJ8XSvn8yR4FOb6plZnVwx8wCYNIhvQPbei8nPVLFscg876+/bVG1Dk8QmbtfJ3n0NWTtv5sRWhy7fNVKjGb4i79AApl00zV4eGhRK1s6bydrpiOWydq/qHI7nqJFyQaGN1/7YxB/rPC8e+/TfnRTkVmFki0fdcgz8sCyNxdu8LirnWE4+H/+znTZP/8aibUccoQGMKfvTZz/Nh+d/yOw1+aTu8Lyob+XuDL5dWvTszMrxHOdRuzmaN/l5hfcR4qXvL+S13zfS+5W59HvNkSnOVAkcK4YgkFLyxp+beX7GerdjY6au4Z05W+wd7uETuRQYQiG/0MZJYz1BaJCzeqPQJhn2zgLmbPCdBwFgd7rqCOMiHbOdrYdOsCfDu8PBkZOqk48IDeaPdQfo99o8ZqzeD8CibUdo8OgM2o/9w257cSW3QP2u7vl6BY/+6Bx6xHV25sqG/cf44G/nsC6fL9pJj/FzWJWW4VZ/f2aO27oL8x6hwcJucwnyoiLKyS90+m1sOXiClNG/smR7EQtMfXDoeK7TbMh1oWIg0ILADz6NV/rnrKAgbq1VnTbTh/LXrp1MSYjnRFAQj1T37PdeXIryaQ4PDqcgszM5+y7l0hpvkneoPye3jyI7TaljgoOCPSbtLsxJpjCrMTLP0U7XBV6ePIn+25VOyuhfKcxqTGFWY8IMl8nh7y7kh2UOVcHJvELemr2ZWz5VawInnz+ZH4f+SEGhzcl75dUf45m7Loe0dMfo7IHvVnL5xEXY8uOw5ceR7aKHv+bDxTw9fR3HcwrsqhqAw8dz+ek/la6ya62ujJm6hkve/9ejt8ywCf/w8A+reGv2ZlJG/0rKaKWGm73+gNfFVyEunWeLJ2fZt61HXAXEydwClu5I562/triVrzNG6H9vOsQj36+i6eMzOXjceYS4Zk8mR07kcvB4DhlZeWRkOYRGTn6h0+jfvHeO0XFdM9mRbS2v0MaoL5U9KyTY+VnSs/JYmZbJA168n1zbDdi/lwPHcuj76t+cM+4vlu30HIbEdK09kVPAf7tUnX+3HWb30SwnFUuvV+a6fd/gPvtas8exiNJ1NjVrzX7+2uAYgAx8Yz4vztzg9DtYskO1YduhkyzcephXf9/ID8vSkFLS7cXZ9s/tZG4BaelZ7M1Q30lIcBCLt6tBSlCQmuGZzwNqANR8zCzu/cZhN1xgjN7v+mo5u49muX2//tD5+T8Z/1vgF3pa0YLAIN+Wz0drPiJ1v/sC5wIPqw+fyfuBqFIIqWvVwb/S81WG1vOejMYRyiCU+JC6QBC2nGSQqjxEhNhjs5uc2DwaWRBvv0LW7uu4pPHV9KnlyFQ2su1Ip2TZ+43p6/B3FzpdKz7KMSq0diLjZm6wb9tskuWbkqgenkL/1+fR7hnnEMgPfb+Kc19yTrQCcHLLaE5uGc0Jo+PZfvgku49msTLN0QmEhwTZ1V9Hj9bivm9WkjL6VxZsPux4lk9TGfzmfDbud/eyeu0PRySTfZnZ3PRJKtd/tJS5Gw/y3650lu08alflBAf5ZyRcuPUwN3+Sau+M7/l6hVudVWkZPDHVkZ/pg3nb+CZ1N3mFNv5c5zwqv+DtBQx95x+6PD+bTs/96TQzaT5mFjd+7NAhmx18gU1iszlUQQBD3lpg396w/zhT/1PqoRO5Bfa2Hj3pUM+8NXuzR/WTaSC3SUlegY2uL8y2H7v4vYVu9fdlZttHw8dz8jmWozruzxftosf4OW6zoczsfGw2yQsz1rPziJohuHo8WQcOb/yx2Wm0fNvny7jx41QKbZLzX3fMvtIN1dPxnHz7v1ciuXLSYt7+awsPfLeS5Uanbgq0Vk/9xrkvzeGlWer3nF9g47lf1UxsX0YOvV+Zy/B3FzJ5wXZ+XrHHruYxZzvqHooDx3LpMX4OXZ6fzfB3/+HAMd8CwVX4/bjcf5tMaaC9hgxeS32Nz9crnfwdbW9zOnY02LO8zPKxKGxg/SHM2vkr0haKCHL+8YcHR3B47ROEh8DqZx1hFK7/aAlzNycTUasVoXFr7eUj245k4qqJTp2CzaorFUogBQcFkxybzO31f+KdTbcSHH4QWZDgdO/CEy34aDp8NH0+sUZ0hbs63MX7lul0txdnUz3WXZd/6HjRxr+/Nx1i3MwNvDRrg3sUDp8E2e+RW1Doxagm+Ht9HpP7f85lbzsMh1dPXmzfnrNRjche+2MjH1zjfbH6eePV9ZdsP+o2jd8xbohPQWDVErw1ezPLd2Uwc80+qsdG8Od6d/XY0Hc8q/4ATuQ6fhum/ttUuxTYJD1fdhaaf286RHZeIZFhwYQYv7/lO9Pt6iFP7DySxb3frGDdvmNMnLeN2AjH335vRja1EyLtQvKWnir+0tZDJ0hJirarl5bvymC7B1XOloMnCAkSpFRVLtLW7+1EbgEnXFRsmw+ccNrPLShk66ETTJy3jYnzttEuOd7DrM7xgX+Tupu4yBCu7FqfwW864m6lZ+WxyXLtLs/P5vf7enL+6/PsZS/OcAxYAA4ddwjCp6etxZXfLarOIxah+ewvKrT665e7J1X0ZAP4b1cG7831HIX4vm9W0K9FDZa6qDXzytjrSwsCg1X7HSOtd1e973TsWDFtAPUjOzBtWR5hVSF7z5VE1f3E6XhKbEMOyxAsfQArd2cwd+MhIIqcPdeQszefoLCD9GyTxdm1z2biqol2wxXA2r2O0Z8pCGatOcQjR1bxTepuEKPcBJArhTk1kIUxrN2b6TSqBzjoR6fviRuMEWtJ11YNfmu+12N/rj/An+sP0KJWHEjfHjo5+TaO5eQTF+G5XlF/tAIfBnDriNWcsbzx52an78df3pu7lZSkaHo3r+73Zzbys1Q+u6mrfUbw4QL/vGkmGiN+64Ait8Bm18kDvDRrA/WrRDH6x9Xc2bsRWbmOY3d+6R491LSBrH76fGIjQsnJd3yux3MLyHf5HDcecJ6pZeUVEmpRXVlngCbvu+j8J83fTr2kaCd7wZ50d9Wmqw3E9TdtHaV/vHCH2/lFcd837qq1iR5mVd6uv2T7UX76bw8//eduzHdVOQL8teEgWw+doFE1/51C/EULAoOwUoq/nr33EtZkqvAChTk1KDzR3Ol4x+odubHpY1z3r9IhvzV7M9d2r0+qq75VhmLLrUOLmEaE2Tt0xx/GeeRp/GhkkBICADIMWejbVz1ru/Ldt6oRKgJWFYg3/t50iCs+WMSMe3oU+/q/rtrnZiz2hjmlL4kQAEjPymfkZyqd6bPDfK84N5lvqMJCfMxI/aXQJrnhI8cgyDpynTBnK42rOzodqweUKz3HzyEhyvn3diAzp0gvnw37jzmpVjzhyW3S1QA+Y427q/WLLoMbV57yMAsoKbuPZlG3in8uzOeM+4urutVj/CzvdoCsvEKklBzLKbDP/o+ezOO71DRGD2ru9bySogWBQVSw706zTn4Be0J9f1ztIq9nQWZTTDVHwfHWbnUuqDOK6yY5DImv/bHJSXftSkZWHllFeEog1YxFFpauL31FZ92+Y3abQ3HwNPItC8b87H/H9NminU4j6ZJi9WryhKfOPyk6zElVAkqgpWc5z0Cn+vCsMvE0qvYHV3XeB3/7zqEdaG7/YhnPDPVPkO/JyPYpBEx2Hsmil4uK1JPKtjTQxmLgYNZB5h1yXjHcMtd5GnnRiROEGJJZ2kLJS++CrSCa3MO9kVJ9jAv+a4ivjzTvaHce+rJ4i8S+WrKb6z8ydeDOf/y6VSLpWC+BguOtyTkwiNyDA/y+bttk95AMd/d1dz2t6LR+yj2wXUWkZ1PnlefvzdnibCcqQ5rUKH3VRHH50VCnxEf6VhEGirpVnBMOrdlzjIvf+7dU7+EqBACqlbUgEEJMF0JM8/YKSGvKibH/PutWFuHyJ4srtHFNptJv5h3uQ+7+/3Fy8xjyDg0g75CRdlB6njGc3HYP2XsvIffAMKD4aw6yT9SgMKcmOQecQxiM7NGQx4e0AILIP3oeSN8/kg71Enh2WCvqJ0XxyQ1deNRliplQyn+qAa1qFFmnVnxEqd6zJJxV33kxmlUdUlo8PrgFF7arXeLzI0Od/6p7M3P4NrV4niVRYUX/9prX9B2qo3H1GIpYP1im/HZvzzK/Z5/m1enZxHuwxSeGtGDStcWPqu/PDK9GXGD+L75mBK8ArwLbgWxgkvE6ARSZiFcIMUUIcVAIscbLcSGEeEsIsUUIsUoIUW6BwdcecP9D5buMvmOkpF+W0gMHZbd0OpZ3pBfZG1/C28dpy61FQabzD+Pa7vX9b6AMI2v7vdiync+pnRDJWfWrMOtedz14YpR7p/7ZTV25pnsKfz/Um8ToMG49rxFJlpg3/nQU/nJ+yxo8d1Ebj8e6NqhCvxZKSHSsd2orguMiPAtff4SQifW5Hzy/KR9d35nbznNPcnNLjwYMal3TTYD6wy09G/L2iJKHpi5OfJqwEM+/Q3/UCg+e71iHMqKLCtFsHf0GG+E1ToXnh7urTEtKYnTZzgiGta/NlOs7Ex3uXU0cFxlKdAn+S5GhwdRJ8J3atE2dkgVXLAqvgkBK+beU8m/gHCnl5VLK6cbrSsAfC9zHwEAfxwcBTYzXSOA9/5tduhzOc5drJ1wMcTE2G21z8zi+fhx52c6dTHhIEPf2K55axdcPyV/qJymbQPOa7nkCrNe/rnt9RvVuTIyHey4b09+uJgoLCeLVS9vRo4nzArkbzklx2h9zgbMg9MTEazt5nMbuGDeEb27tztmNVPRQT8KnOJ34qD6N3co+u6mLX200Cbd0nLkFNupWifJokLv+nAa8d/VZ3HpeI7a/OFh5L3mgc4qzcHP9PEF9hl/e0tVvPX9EEckFwoKD6FAvAfD8mT4ztBVJMUULgkbVY+zfjfn9nd/SEZb7gra1vIYUWfp4P3aMG+LxWKRFkHWqX8VjnV/uOte+7a8KJLyMky6Y/ytPXj0mPZpUJbIEgiApJpwIl5mf64CxJNf1B39sBNFCCHtyVyFEAyDaR30ApJTzAF/rrIcBn0rFIiBBCFHLj/aUGqvSMhj9wyoQ7j/saJe0g7E2G4XGwi3X/8H6sQOpn+T7I/n5znPs269e2s6p8/FGUnQY39/WnZmG50vVmDAn3b6ve1o7/WeGtebBAe4rjk1qx6tRSHhIMBeflcwH1ziCvPVqVo1HBjp3ivW8eEeM9dPrBRwLb1xXvQK8dll7LmrvW41iOo20rBXPrHt78NhgRxuDhaB6rJpCN/FDzXNzD0fuYl/hH8JcktGEGW23tnX5mP58dUs3p/M8DaBvOrcBZzeqyi93+efVVFQHsOn5QbwwXM3AojzMHq47O4VEw6vHddW0lSpRYbw9ogOLHu3LVV3r0a9FDe7s3ZgNzw5k7TMDuKtvEycXUU9tnP9wb7djTS12Bet3/uD5TQkOElzVtR6tajsE618PnOe1jXf0UrO1kqjw6idFcUFbRzdz63kNaVjN8T/6ZmQ3t3NCgoT9P2D+r3INQeD6m1/99PnUio90GohZ/+s3ntMAbzw0oJl95mfOdJ8Z2op2Hux5pY0/guBeYK4QYq4Q4m9gDnBPKdy7DmANAJNmlLkhhBgphEgVQqQeOnSoFG6tuPmTVLYvm+Xx2IX76pCz37HYa2TOo3TI/cC+b/0BBAWJInXdrWrHkZIUxTtXduDis5KdMlxZSbCodMJCguiUUoUWteJ4/fJ2/PVgL7uL2lsjOni8xkc3qBj2xVHzXHd2CgCdGyQa54bwy13n8uf9Pfn4hi5uaolmNdz1yNVjw7m2e4rf9zRHzU2qO6619pkBzHmwF9HhIQxs7TwmCA0WbHxuIF/d0o0PrjmLEOPZE6JCaV4zjpE9G9ElRY00hRCEhQSxY9wQbvDxx7v53AbsGDeEbg2TGN5B/fSO+XAbdf1Mzc/fOtKuEh1mb5snfr+vJ69d5liI1KxmLF0aOI+Qlzze1+288FDP14yNCLEPFMwO3ptqqIqhRnl4oPug4JuR3ZhyfSfio0JJigmnZnwENeIi+PC6TlSJDiMiNNjeuZlhHt64vL3TNSKM+9atEsUbl7fngf5NCQ0WnNu4qn3wdH//poQas+24iBBG9WnC1hcG8/zwNggh6N+yBm9e0d7j7NXk4YHN+Wd0H366Q4UMX/q4I3rt15aO/KWLHarJq7oqNVd8ZChvXtGB/i1r8NENnXl0UAv+eqCXvZ6nWVOXBlXsMzdTvXZn70Z0b5jE0Ha1nQYbsca6FauwrW1R9zwxpIXXQc7gNrXs/7V3ruzIokf7IoTgy1u6cW33+h6FVGnhUxAIIYKAeJT65h7gbqCZlPJ3X+eVNlLKiVLKTlLKTtWqeTfSFJdmhetIqfO+x2Nvhz1Bfnp3+35GYRLHcHzhrp1ea0N350kNMLxDHUKCg5j7UG8uaKt+BLkWl9BGxogkNiKEf0c7OoHzW9awXCOZuIhQsgx3SG86yC4pVWibHM/YYUoPe1mnZI/1rHRvlMSOcUPso2jzeRpbOmnratR6SVHc5aKSmWeMAmfd24Pf7yvagNc2OYH5D/fm2u71eXRQc67oXJfo8BAaGCtUXVeXhgYHER4STPdGSQxoVdM+NbeOvO7u24SI0CBaWkaW0eHOn9OXt3SlSfUYHhnYnMcGOxLXX3qW+pysXiiPDW7OE0McdVzVeaYgKCqaqDWTXNMasfyvo/N3MnpQc/tvAKB6bAR/PXCe07oCUzX0vw7OY6X7+ze1q6jMu7iuijZViKafv00qNYzZkQLUSYykT3P/VHJm5FBXTyarALyoQx3u6tuEzc8P5vObu9pnkYPb1LLPCII8zEwmXduJYe3rFJkHoE5CpL3TNdVI0WHBdGuo1Fptk+O5vLMjDeWw9upzE6jPZ9K1nejdrLr9+AfXnEWXBlWIi3T+jn+561wmXtuJa7rX57HBze2DpuTEKL4a2Y2EqDD+uN999mIN0lcjTrWvfd0EgoIEYy/ybiO50rDLNKsZS01jcBkdHsLYYa3p2jDJ63mnik9FtZTSJoR4WEr5LVAyh1/v7AHqWvaTjbIyIyxsj1P2MCEF9bmGpwf1oUO1jqxMy+Bac4W/LYLrz05xWiF4Tbf69oVdEaHBzLq3B7XiImk3VsnJNc8MYHVaJu3quk/tDhxT7qnhIUFMG3UurZ76jQ71EokMC+ahAc1oUj2GPs2ru513b7+mbD98ks4uo8gWteJYv+8Y0eEhTBuldK0rnzzfrSMsKaufHkDK6F/tXiXmKPayTsl0bZBkH8m42iuu616fT/7dycRrzuKAy8pOc3ZzqwfD7NmNkqgWG85rl7XjmslLvM6grM93bpOqbHh2kNPxC9rWZuuhk7w1e7Nx3aoe/7jdGyXx5hXtnfThI3s2Yvvhk/Z4M66EGiPgJA9JZga1rsnMNWqhVFG21Y71Epn9QC96jp9DJ2Om1LBaDA2rxfDOnC3cfl4jujVK4s3Zm7nx3AbUrRLFm7M3s/n5QU6fi6m7DwkKol3dBFbuzuCLm7var2nOaLJyC+wDF5PiGKNv7tGQN2dvJiEylE9u7MJSPyJtjru4DRe2q0Xj6jEcNFb0eovo6UrVmDAGtKrJJWcl2/83rky98xzqJqqR939j+tvVVE1rxLDpwAlSqqrf2vAOHpUODGhVkwGtaroFwbN+TiN7uv9Ovbc5nI9u6MwNHy3lis71GNGlnl1IxUWEEhsewnEPa1wuPiuZ/3UsWhCWNv5YLP8UQjwIfAPYg41IKUseZ1UxDRglhPga6ApkSikDk4nFGyHOH7aUwSTK8+yJUDpYPFpkYTg3ndvASRA8e1FrnrVId7MTNL/kqFA1gvXEqD6NCQ8N4vEhLQgPCeaH28+261Hv7O1uADVpVzeBuQ+562C/v627PcCXSbwHz6FTYenj/ewdb48m1Vg+pn+RmbaeurAVjxnPWBySYsJZ+ng/e4C0K7t6TjIeHeb7JxwcJLizdyO7IPCGEMI+arTiS5/+xJAWPJZbwN19m3DxWclOKoL3rj6LxduOcPnERT5VRVbmedCtL37MofYwDbGt68RzX/+mbnVN18JLOyVz4FgOK3dnkBAVav/szc/qpIeIn5HFEAT39W9qv/95TatxXtOiZ+mxEaFu6j5/BUHqE+45vF1pXzfBvp1o+U1+e2t39mbkUD02gk3PDSrSOB8ZFsy2Fwaz62gWKz2ErS4OvZtVZ8OzAz0K2VvPa8grv6uFpC/+r42TkbishQD4JwguN96tYS0l0NBDXTtCiK+AXkBVIUQa8BQQCiClfB+YAQwGtgBZwA3FaXhp0Ni2HjNwb4RNcmTnSJp08myAmnlPb78MvADT7zqX5bvSPU59TepWibKrb8Ddl724RIeHlIonki9cPTn8SbcYFCQIDyr5rCQiNJgNzw70+tn704GZRt6uLrMofzDVGJ46kKY1Yvn+9rPt2650SqnCLT0acOO53u0UpUmV6DB7Z1dok/RrUYNWtR0j2ihDiHvKkFaW6RNNG4anRY2uXNyxaNWmLxKiwuwqMW+2E1eCjCB6ZiA9f7iwXW2PeTW8fa6j+jSha8MkEqPCArJupbgU2XNIKUv0K5ZSjijiuMRZuJQpN8y6gdQajmXp9xzO4omceh4NaaBUL/5mliruj0jjG09/psbVY9hy8IRPYWsihGD2A+dRswSLccx4PmF+juqtBAcJHh/ivxtraWB2diHBwk2nbBr5PQktf8NulwYJUWF8d1t3r+63Jt5cUU9HSrJGpHNK8QcmgcKvIaQQojXQErD/k6SUnwaqUWVB6gHnvAOFwXlUjQl3U2F80P8Dtmeq6I7+zgg0gef727oXK0JqSSM2mrN0f0eTpzOdUqow854eHr2+yprTqRPU+CEIhBBPoVQ8LVHqnEHAAqDCCgJP0SurFhby4+1nu5WfXftszq6tyrUgOH2wTvkDial68mQ/qIi4jsK7NqjC4lNIq6g5M/BnRnAJ0A74T0p5gxCiBlC8rOqnGYPedCRlAXj9wCH6ZmUjknxH7zSNOP64ZGrODKLDQ/hvTH8nd8Azic9v7uoxvaemcuGPIMg23EgLhBBxwEGc3T4rPD2zsj0ko/TM5ucHEVwOVn1N+ZHoh1G8ohIaHOTVNVdTefBHEKQKIRJQAeeWoYLOlW681TImONqRsKJbdjbF+ZvrP41GoznT8Mdr6A5j830hxCwgTkq5KrDNCizBUTvt2ycjqkGd+tD2ch9naDQazZmLP8biz4B5wHwppe/cbxUEWeiI/ZEbFgvXl2nEDI1Gozmt8EfPMQWoBbwthNgmhPhBCFEaQefKDWtS9wKt7tdoNJUcf1RDc4QQ84DOQG/gNqAV8GaA2xYwgkOy7dv5FBEIRqPRaM5w/FENzUblH/gXmA90llIeDHTDAknT0K2Ya4rz0a5zGo2mcuOPamgVkAe0BtoCrYUQvvOpnebUE1upl6/UQxfW+l85t0aj0WjKF39UQ/cBCCFigeuBj4CagH+55E5DjgUHUaOgkDt31qVm7yvLuzkajUZTrvijGhqFylF8FrADZTyeH9hmBZZNYWF0zc6hatsBdLCEr9VoNJrKiD8LyiKA14BlUkrvefwqCFvTt3EiKIhgKenSIMkRVUyj0WgqKUXaCKSUr6DyCFwDIISoZiSwLxIhxEAhxEYhxBYhxGgPx+sJIeYIIf4TQqwSQgwu7gMUlz0nVNaowSezQHsMaTQaTdGCwIg++gjwqFEUih9B54QQwcAEVLTSlsAIIYRrcPYngG+llB2AK4B3/W96ycjIVZFH6xQUgNQeQxqNRuOP19BwYChGmkop5V7An4DmXYAtUsptUso84GtgmEsdCZhxceOBvf40+lQ4lnMCgGibrehkshqNRlMJ8MdGkCellEIICSCE8Df1Vh1gt2U/DZWb2MrTwO9CiLtQaxX6EWCO5R0HINamhYBGo9GAfzOCb4UQHwAJQohbgD9RkUhLgxHAx1LKZFT+4s+EEG5tEkKMFEKkCiFSDx06dEo3TM9WqiE9I9BoNBqFzxmBUJlYvgGaA8eAZsCTUso//Lj2HpzzFiQbZVZuAgYCSCn/FUJEAFVROQ/sSCknAhMBOnXqdEq994y124gMtREKUKfjqVxKo9Fozgh8CgJDJTRDStkG8Kfzt7IUaGJ4GO1BGYNdV2/tAvoCHwshWqBcVU9tyF8EGVkZ1Ii1saTuTXRJ7hTIW2k0Gk2FwB/V0HIhROfiXthYczAK+A1Yj/IOWiuEGCuEGGpUewC4RQixEvgKuF7KwOpr4iPziLZJ4qqeGTloNRqN5lTxx1jcFbhKCLET5TkkUJOFtkWdKKWcgUp4by170rK9DjinWC0+RSIjconNsdG8Xs2yvK1Go9GctvgjCAYEvBVlSL4tixhpgzDfieo1Go2msuBP0LmdRdWpUMjjRNkkxCWXd0s0Go3mtKBSZWI/npNPoS2HcAloQ7FGo9EAlUwQHD2ZR4EoJFwG62BzGo1GY+CXIBBC1BdC9DO2I43cBBWO/EIbBUE2IoL8MY1oNBpN5cCfoHO3AN8DHxhFycDUALYpYOTm28gXknChBYFGo9GY+DMjuBPl4nkMQEq5GageyEYFiuyCXKSACBFa3k3RaDSa0wZ/BEGuET0UACFECBU0kP+JvCwAwoLCyrklGo1Gc/rgjyD4WwjxGBAphOgPfAdMD2yzAsPJ/GwAwoMqbLpljUajKXX8EQSjUfF/VgO3olYKPxHIRgUKuyAIjijnlmg0Gs3pgz8LymyosNOlFXq63Mg2BEFkiBYEGo1GY1KkIBBCrMbdJpAJpALPSSmPBKJhgSDLnBGERJZzSzQajeb0wR8/yplAIfClsX8FEAXsBz4GLgxIywJAVoE5I/A3yZpGo9Gc+fgjCPpJKa0ZXFYLIZZLKTsKIa4OVMMCgakaigjTgkCj0WhM/DEWBwshupg7Rm6CYGO3ICCtChB5+SpfcVRYTDm3RKPRaE4f/BEENwOThRDbhRA7gMmoZDLRwIu+ThRCDBRCbBRCbBFCjPZS5zIhxDohxFohxJee6pQWefmZAESGxwXyNhqNRlOh8MdraCnQRggRb+xnWg5/6+08IUQwMAHoD6QBS4UQ04xkNGadJsCjwDlSynQhREBXLNsKTgAQoQWBRqPR2PEr6I4QYgjQCogQRtROKeXYIk7rAmyRUm4zrvE1MAxYZ6lzCzBBSpluXPOg21VKkaA8JcOCY3WaSo1GozHxJ+jc+8DlwF2oNJWXAvX9uHYdYLdlP80os9IUaCqE+EcIsUgIMdCvVpeQ4Pxj6j1eCwKNRqMx8cdGcLaU8logXUr5DNAd1YGXBiFAE6AXMAKYJIRIcK0khBgphEgVQqQeOnSoxDcThSrWUGh0hYyZp9FoNAHBH0GQY7xnCSFqA/lALT/O2wPUtewnG2VW0oBpUsp8KeV2YBNKMDghpZwopewkpexUrVo1P27tGRuFAISG6qBzGo1GY+KPIJhujNJfBpYDO3AsLvPFUqCJEKKBECIMtRBtmkudqajZAEKIqqiZxjY/rl0ibFIJgpAQLQg0Go3GxKexWAgRBMyWUmYAPwghfgEiXDyHPCKlLBBCjAJ+Q607mCKlXCuEGAukSimnGcfOF0KsQ61efiiQISts0kYQklAtCDQajcaOT0EgpbQJISYAHYz9XCDX34tLKWegopVay560bEvgfuMVcGyykGABQcE6Q5lGo9GY+KMami2EuFiIip/t3SYLCZESdM5ijUajseOPILgVlYwmTwhxTAhxXAhxLMDtCgiF2NQDC38eW6PRaCoH/qwsji2LhpQFNmwES6DiT240Go2m1PBnQZkQQlwthBhj7Ne1BqGrSNikjeCKmW5Zo9FoAoY/OpJ3UYvIrjT2T6BiCFU4bBSqGYFGo9Fo7PhjNe1q5B74D8AIDlch/S9t0kaw1gppNBqNE/7MCPKNSKISQAhRDbAFtFUBwoaNID0j0Gg0Gif8EQRvAT8B1YUQzwMLgBcC2qoAYcNmz6ij0Wg0GoU/XkNfCCGWAX1R0UcvklKuD3jLAoBNSr8kn0aj0VQmihQEQoi3gK+llBXSQGxFzwg0Go3GHX8GyMuAJ4QQW4UQrwghOgW6UYHChiRIamuxRqPRWClSEEgpP5FSDgY6AxuBl4QQmwPesgCgZwQajUbjTnFU5o2B5qjsZBsC05zAUohEzwc0Go3GGX9WFo83ZgBjgTVAJynlhQFvWQCwYSNEq4Y0Go3GCX8WlG0FukspDwe6MYGmQEiitCDQaDQaJ/yxEXwAFAohugghepovfy4uhBgohNgohNgihBjto97FQggZaEN0ITa/JJ9Go9FUJvxxH70ZuAeVc3gF0A34F+hTxHnBqJhE/VG5iZcKIaZJKde51Is1rr+4BO0vFgVIgvWMQKPRaJzwx1h8D8pjaKeUsjcqW1mGH+d1AbZIKbdJKfOAr4FhHuo9C7wE5PjV4lOgQGhBoNFoNK74IwhypJQ5AEKIcCnlBqCZH+fVAXZb9tOMMjtCiI5AXSnlr74uJIQYKYRIFUKkHjp0yI9be6YQSYj2G9JoNBon/BEEaUKIBGAq8IcQ4mdg56neWAgRBLwGPFBUXSnlRCllJyllp2rVqpX4ngWgZwQajUbjgj+xhoYbm08LIeYA8cAsP669B6hr2U82ykxigdbAXCMdck1gmhBiqJQy1Y/rF5sCIQnR0YY0Go3GiWI50Ugp/y5G9aVAEyFEA5QAuAJHchuklJlAVXNfCDEXeDBQQgAMG4FWDWk0FYr8/HzS0tLIyQm4GfGMICIiguTkZEJDQ/0+J2DelFLKAiHEKOA3IBiYIqVcK4QYC6RKKacF6t7eKAQ9I9BoKhhpaWnExsaSkpKC0PnGfSKl5MiRI6SlpdGgQQO/zwuoW72UcgYww6XsSS91ewWyLQAFAoL0jECjqVDk5ORoIeAnQgiSkpIorlNNpRkeSykpEHpGoNFURLQQ8J+SfFaVplcssBUAEFx5Hlmj0Wj8otL0ioWyEIAgHYhao9FonKg0gsAmbWpDTzE1Gk05MWvWLJo1a0bjxo0ZN25csev5e35xqTSCwERUvkfWaDSnAYWFhdx5553MnDmTdevW8dVXX7Fu3Tq/6/l7fkmoNL2iOSNQC5o1Go2meMyaNYv27dvTvn17unbtis1mK9b5S5YsoXHjxjRs2JCwsDCuuOIKfv75Z7/r+Xt+Sag0UZltaEGg0VR0npm+lnV7j5XqNVvWjuOpC1sVWe+uu+5i3rx51KpVy+1Yjx49OH78uFv5K6+8Qr9+/QDYs2cPdes6gi0kJyezeLF70GVv9fw9vyRUGkEgpTS2tCDQaDTFZ/DgwbRt25arrrqKN954w+nY/Pnzy6dRpUSlEwRBekag0VRY/Bm5B4KFCxcipWTfvn2EhLh3m/7MCOrUqcPu3Y6AzGlpadSpU8ftHG/1/D2/JFQaQaBVQxqNpqR89913NG3alJCQEKSUHD9+nLi4OPtxf2YEnTt3ZvPmzWzfvp06derw9ddf8+WXX/pdr1mzZn6dXxIqTa+ojcUajaakjBgxgg8++IC2bdvSrVs3Nm/eXOxrhISE8M477zBgwABatGjBZZddRqtWjhnO4MGD2bt3r9d6RZ1/KgiH7rxi0KlTJ5maWvwApYezD9P7295cm9+Qh24uHUu7RqMJPOvXr6dFixbl3YwKhafPTAixTErpMS98pRkeF9rUymKhVxZrNBqNE5VGEOQXKtVQUJAWBBqNRmMloIJACDFQCLFRCLFFCDHaw/H7hRDrhBCrhBCzhRD1A9WWAmNGgLYRaDQajRMB6xWFEMHABGAQ0BIYIYRo6VLtP6CTlLIt8D0wPlDtyS80gs5pQaDRaDROBLJX7AJskVJuk1LmAV8Dw6wVpJRzpJRZxu4iVF7jgJBfkA+Akk8ajUajMQmkIKgD7Lbspxll3rgJmBmoxuQX5AEQrG0EGo1G48RpsaBMCHE10Ak4z8vxkcBIgHr16pXoHgUFBcbFtGpIo9ForASyV9wD1LXsJxtlTggh+gGPA0OllLmeLiSlnCil7CSl7FStWrUSNaagUKmGtNeQRqPROBNIQbAUaCKEaCCECAOuAKZZKwghOgAfoITAwQC2hULDRhCkbQQajaac8DexzI033kj16tVp3bp1ic4vLgETBFLKAmAU8BuwHvhWSrlWCDFWCDHUqPYyEAN8J4RYIYSY5uVyp0x+oVINaUGg0WjKg+Iklrn++uuZNWtWic8vLgG1EUgpZwAzXMqetGz3C+T9rRQaqiERrAWBRqMpPrNmzWL0aLUcKjw8nH///ZegIP/H0tbEMoA9sUzLlq5e9dCzZ0927NhR4vOLy2lhLC4LCrRqSKOp+MwcDftXl+41a7aBQUWrWcoqMY03dGKaUqDQUA1p91GNRlMSdGKaM4ACmxIEQgsCjabi4sfIPRCUZWIab+jENKWAzbARBAdVmkfWaDSlRFkmpgnU+b6oNKurzAVl2kag0WiKS1kmpjHv1717dzZu3EhycjKTJ08OaGKaSjM8ttmMGUGIFgQajaZ4dOnShdWrT91IPXjwYAYPHuzx2IwZDgfLr776qtjnnwqVZ0ZgX0dQaWSfRqPR+EWlEQQ2Iwy19hrSaDQaZyqNICg0vIaCg/WMQKPRaKxUHkGgvYY0Go3GI5VGEDSrEQ1AldiIcm6JRqPRnF5UGkEQGiTVe3BoObdEo9FoTi8qjSAw3UeF9hrSaDQaJyqRIDCS12uvIY1Go3Gi0ggCaQgCoY3FGo2mnPA3sYy3et4S1pwqARUEQoiBQoiNQogtQojRHo6HCyG+MY4vFkKkBKotUhqCQIeY0Gg05YC/iWV81fOUsKY0CJggEKrHnQAMAloCI4QQrhkUbgLSpZSNgdeBlwLVHq0a0mg0p8KsWbNo37497du3p2vXrthstmKdb00sExYWZk8sU5x6PXv2pEqVKqXyPFYCqSfpAmyRUm4DEEJ8DQwDrCJwGPC0sf098I4QQkgpZWk3RtrDUGvVkEZTUXlpyUtsOLqhVK/ZvEpzHunySJH1yioxTSAT0HgjkL1iHWC3ZT8N6OqtjpSyQAiRCSQBh0u7MTIsCoCg0MjSvrRGo6kE6MQ05YwQYiQwEqBevXoluoatRmtYByI+uTSbptFoyhB/Ru6BoCwT0wQyAY03AikI9gB1LfvJRpmnOmlCOfjHA0dcLySlnAhMBOjUqVOJ1EY2lD4vSFQaRymNRlNKlGVimkAmoPFGIHvFpUATIUQDIUQYcAUwzaXONOA6Y/sS4K9A2AcAzMsKRCAur9FozmDKMjGNr3qeEtaUBgGbERg6/1HAb0AwMEVKuVYIMRZIlVJOAyYDnwkhtgBHUcIiMO3BEARCCwKNRlM8yjoxjbd63hLWnCoBtRFIKWcAM1zKnrRs5wCXBrINJjZpqIYqzxo6jUaj8YtK0yu2qdqGF3u8SPXo6uXdFI1GozmtqBBeQ6VB7Zja1I6pXd7N0Gg0mtOOSjMj0Gg0FZcA+ZCckZTks9KCQKPRnNZERERw5MgRLQz8QErJkSNHiIgoXgKuSqMa0mg0FZPk5GTS0tI4dOhQeTelQhAREUFycvEWzmpBoNFoTmtCQ0Np0KBBeTfjjEarhjQajaaSowWBRqPRVHK0INBoNJpKjqholnghxCFgZwlPr0oAQlyf5uhnrhzoZ64cnMoz15dSVvN0oMIJglNBCJEqpexU3u0oS/QzVw70M1cOAvXMWjWk0Wg0lRwtCDQajaaSU9kEwcTybkA5oJ+5cqCfuXIQkGeuVDYCjUaj0bhT2WYEGo1Go3Gh0ggCIcRAIcRGIcQWIcTo8m5PaSGEqCuEmCOEWCeEWCuEuMcoryKE+EMIsdl4TzTKhRDiLeNzWCWE6Fi+T1AyhBDBQoj/hBC/GPsNhBCLjef6xkiPihAi3NjfYhxPKdeGnwJCiAQhxPdCiA1CiPVCiO5n8vcshLjP+E2vEUJ8JYSIOBO/ZyHEFCHEQSHEGktZsb9XIcR1Rv3NQojrPN3LG5VCEAghgoEJwCCgJTBCCNGyfFtVahQAD0gpWwLdgDuNZxsNzJZSNgFmG/ugPoMmxmsk8F7ZN7lUuAdYb9l/CXhdStkYSAduMspvAtKN8teNehWVN4FZUsrmQDvU85+R37MQog5wN9BJStkale72Cs7M7/ljYKBLWbG+VyFEFeApoCvQBXjKFB5+IaU8419Ad+A3y/6jwKPl3a4APevPQH9gI1DLKKsFbDS2PwBGWOrb61WUF5Bs/Dn6AL8AArXIJsT1+0blzO5ubIcY9UR5P0MJnjke2O7a9jP1ewbqALuBKsb39gsw4Ez9noEUYE1Jv1dgBPCBpdypXlGvSjEjwPGjMkkzys4ojOlwB2AxUENKuc84tB+oYWyfCZ/FG8DDgM3YTwIypJQFxr71mezPaxzPNOpXNBoAh4CPDJXYh0KIaM7Q71lKuQd4BdgF7EN9b8s4879nk+J+r6f0fVcWQXDGI4SIAX4A7pVSHrMek2qIcEa4hwkhLgAOSimXlXdbypgQoCPwnpSyA3ASh7oAOOO+50RgGEoA1gaicVefVArK4nutLIJgD1DXsp9slJ0RCCFCUULgCynlj0bxASFELeN4LeCgUV7RP4tzgKFCiB3A1yj10JtAghDCzK9hfSb78xrH44EjZdngUiINSJNSLjb2v0cJhjP1e+4HbJdSHpJS5gM/or77M/17Ninu93pK33dlEQRLgSaGx0EYyug0rZzbVCoIIQQwGVgvpXzNcmgaYHoOXIeyHZjl1xreB92ATMsU9LRHSvmolDJZSpmC+h7/klJeBcwBLjGquT6v+TlcYtSvcKNmKeV+YLcQoplR1BdYxxn6PaNUQt2EEFHGb9x83jP6e7ZQ3O/1N+B8IUSiMZs63yjzj/I2kpShMWYwsAnYCjxe3u0pxec6FzVtXAWsMF6DUfrR2cBm4E+gilFfoDyotgKrUV4Z5f4cJXz2XsAvxnZDYAmwBfgOCDfKI4z9LcbxhuXd7lN43vZAqvFdTwUSz+TvGXgG2ACsAT4Dws/E7xn4CmUHyUfN/G4qyfcK3Gg8/xbghuK0Qa8s1mg0mkpOZVENaTQajcYLWhBoNBpNJUcLAo1Go6nkaEGg0Wg0lRwtCDQajaaSowWBRlMMhBD3CiGiyrsdGk1pot1HNZpiYKxo7iSlPFzebdFoSgs9I9BovCCEiBZC/CqEWGnExH8KFfdmjhBijlHnfCHEv0KI5UKI74yYTwghdgghxgshVgshlgghGhvllxrXWimEmFd+T6fRONCCQKPxzkBgr5SynVQx8d8A9gK9pZS9hRBVgSeAflLKjqhVv/dbzs+UUrYB3jHOBXgSGCClbAcMLZvH0Gh8owWBRuOd1UB/IcRLQogeUspMl+PdUImO/hFCrEDFhKlvOf6V5b27sf0P8LEQ4hZUshWNptwJKbqKRlM5kVJuMlIBDgaeE0LMdqkigD+klCO8XcJ1W0p5mxCiKzAEWCaEOEtKWZGjZGrOAPSMQKPxghCiNpAlpfwceBkV9vk4EGtUWQScY9H/Rwshmloucbnl/V+jTiMp5WIp5ZOoRDPW0MEaTbmgZwQajXfaAC8LIWyoyJC3o1Q8s4QQew07wfXAV0KIcOOcJ1BRbgEShRCrgFxUKkGM6zVBzSZmAyvL5lE0Gu9o91GNJgBoN1NNRUKrhjQajaaSo2cEGo1GU8nRMwKNRqOp5GhBoNFoNJUcLQg0Go2mkqMFgUaj0VRytCDQaDSaSo4WBBqNRlPJ0YJAo9FoKjkVLsRE1apVZUpKSnk3Q6PRaCoUy5YtOyylrObpWIUTBCkpKaSmppZ3MzQajaZCIYTY6e2YVg1pNBpNJUcLAo1Go6nkaEGg0Wg0lRwtCDQajaaSowWBRqPRVHK0INBoNJpKjhYEGo2m8rLsY9j7X/m2oTAfCvLgxEHYt8r9+I4FkJ8T0CZUuHUEGo1GU2pMv0e9P51Zdvc8vh+WfghNB0HaElj4Dpw8BFFV4Pg+GHMEgo2uOX0HfDwE2l0Jw98LWJP0jECj0VROCvIc2yeLSC1dmA85x0rnvtPvhXkvw4d9YNZoOJYGhblKCAD8NFK97/wX3uqotld+WTr39oIWBBrNmU5+DmRnlP51t89T6gx/mPOiZ7UHQGEB/P4EHN12au2xFarrZOx2lGVnQF6W2s45BnknHcdyMhzbOxfCjIe9C4RvroZxdT0fe6UZPB0Ph7eo/R0L4OurYHxD+Ot52PwnHFgL+1aq47nHfT/Hmh/U+/c3gCx0lOdn+z7vFNCCQKM505kyAF6q79jfsUB1XN46vcJ8mPkIpHuNSABSwicXwpSBRd8/Pxv+Hgcf9PB8fOtsWPg2zB5b9LV8sWuRus6ELnB0OxxYp577ve7q+Li68HpryNil9g+sdZz77TWw5AP4sK/na2+apd4L8x1lB9dDWiqc2K/23zlLCaGPh8CGXyDrCMwbr0b4750NH/RUn33mrqKf5csrHDMEk9KakXhACwKNpqJycL0ayRbFvhXqPc2I0TX/VfXuzUi67W9Y/D789pj3axYYxsujW2Ha3ZC5x3O9jN3wfE338r0rHPdf+LZ6j67uXOePp+CdzjDjITi82fP1106F7HS1bY7287Pg7Y7w9Qi1n75DCQaA7KPwRhtlJJ71qPv10ncoIWdiK4SvrnTsnzig7ArpO+Hdbu6CY9nH7tfMOuLY/niIQxD5YtNM97IlHxR9XgkJqCAQQgwUQmwUQmwRQoz2cLyeEGKOEOI/IcQqIcTgQLZHoylXju1VI/Ftf5/6tea9ojqijwbB+umqbNnHMHkATOoDP94K750L+1c7zjE7LdMDJSRCva/6Fv5501HPHP2GRXu/v6luAVj+Cfz5tPNxm0113q6CauU36n3ieTCxl+rEd8xXZUs+gJNH4PgBWPwB/PMGHN4ESybC1DuU4Ns+z3GtY/vgu+vgu+uViurfdxzHpE0dN3mrvXM7pt8Dh9Z7frbUyfBcTSVYVnwBG391HPvuevU5/3Kv53Pnv+K5vDSY/6pDoJUyAfMaEkIEAxOA/kAasFQIMU1Kuc5S7QngWynle0KIlsAMICVQbdJoyhWzU1z2MTQ8r3jnbpsLW/6E85+DJZPgr2cdx765GoZNcHjAAOxZpt7fP9f9WgWmrlmqDv3HW9Rux2shMhF2L1b7G2YoffX3N8I9K5UOf/ln6l5/POl8zaBgOLgBqjdX+9PughWfQ/1znOv9NNJ51DztLufjLzf0/PxpS5TgA7j9X9j5D9Tt6vhsXmnifk5hrudrWYmuDh2uggWvO8p+fUC9v5isBIpTO5aq961/FX3tQJA6Bc5/tuh6xSSQ7qNdgC1Sym0AQoivgWGAVRBIIM7Yjgf2BrA9Gk35YuqXg0OLd97Jw/DpMLXd/1mY8aB7nZ/v9O9aeVkOlcwXl6lO0GT9dGh/FRwxjJ55x5UQAHiznaNenY6qk7ey8iv16nIr1OvmOL7zH/c27LLMEszZTHEwdf5NBxX/XFfOfw5aX6yEXGQVWPaR45irEPBEUAjYCvy/38WT4eA61fa84/DZcO91G/eHLX84l4WE+3+vYhBI1VAdwGK+J80os/I0cLUQIg01G3AZHmg0FZATh+DLy5315llHYdEEtS2CYdH78M9byoVxzzKY/5ryNLHZlArk8GY10v17PLzcyHGdZxJOrW0v1HJsF2Qrf3aTaXfBay2Vjt0Xvz/h/diSD5S3S1ngSY/uSuN+3o/dsQjaXa589i/7FC58o/htuOp778fOsczQ4oyur3YH6Psk1O0Mjfo4jj9xEB7eDg9uhoh4Vdb1NsfxZobWPKiYgwg/Ke8FZSOAj6WUrwohugOfCSFaS+ksioUQI4GRAPXq1SuHZmoqJQV5avR+zOjQ45PVu5SqYz+xH2q0UmWHN6sOslZ75SEDStfe+wmlNtk2x6GvX/mlwy/8jzHO9/zhJlj746m1u+kg/zpJT5geMP7S7krYOMPZFdOV1pfAnlTVab7Tyff1rvwOvry0eG3wRWID5/3mF6jvqFozqN7Cvf55j6gZ0bppYDNmcC2Gwjn3QliUUk+1v0rZDgCqt3S/RqM+SnUUXV2du36aEjq7l0BSI+e6/Z5WAj8k3DHaH20Yk612GPO84s4m/URIq4W8NC+sOvanpZQDjP1HAaSUL1rqrAUGSil3G/vbgG5SSq/OyZ06dZI6Q5mm1MnPhkXvwlk3qBWeWUdhfAPn6bm5+nT2sw6j4H1rYdF7zobKsuC80Q6B48qoVN8dbr3usOtfP28kUBpcIDgMCvOcDz+wUblFnjjg/RJX/wiNDUN1+k54s633uk9nKluHaUc46wZndY3JwHFqMRZAdDW1MtdKtzvU93nZZ8o11OTST6DVRd7vb5KZBq8bQv6pDBBCbWdnKCP6s1Ud7d2zXHlkVWmgXGBTzlX3vvBNJTQKciA8tuh7emLB62o2EBQCHw2Gm/+EBC/rGYpACLFMSunxhxFI1dBSoIkQooEQIgy4ApjmUmcX0NdoZAsgAnD5RjWaU2TPMvjvC8f+sX3KxxyUe+Cqb5WL4+yxymUybZkSAuCso92/Gl5KcfYM+e6GshECZ13vvJ/cGQa84Llu1SbKoGulSkNHWdvLi77fHYvgnlXwdAYMelmVxVjcQG/6Q3WCsTXdDcKghFGCMXuPSnKUJ9aHemf7vnfnWxzbF7yuDNighLJJt9sd27f85bgXwNU/qJH2NVOh5VC48Xel+ql/rm9VkRVz9gcOIQAQmeAYlUcZwqBOR+g6Epr0h9vmQ69H4dz71WwpOLTkQgDg3PvU7CWpETy4scRCoCgCphqSUhYIIUYBvwHBwBQp5VohxFggVUo5DXgAmCSEuA817LheBmqKoqm4/PMmtLhQdWagvDrCY9WfvSgObVTulOAwjH7QE04ak87QKGeduGn09IQnD5y0JX49Qomp1hyunaaEmdXbJiIeut+pfNS3zoG+Y5wNjx2uVmqJ3x6D/z6Du5arDq3VcOU26s39EaDnQ85qkyqGUIyt6VgMVbuD4/jgl9UIfLLRyTbuB1UaKSELqvO0EhTsvH/vauVxVK2Z2q/ZGq74Uo30hYArvoKPBkLdLkoAutowEurBnUuUMG/cz9HZN+qt3usZ3kUth3l/Zk94Mtaa3LbAWTBaiYiDfk8V717lTEBtBFLKGSgjsLXsScv2OsDDcEKjAY5sVSoOaYPUj+DWvyE02mHg7Pe0Mq7mZCh1jqm7j05SC5mOboNPhzqut381bJzlEAJQtGG0uLS5DFZ/69iv0kgtuvJFvbOdPWkAhk+EvBPQ+Sa1HxblfNwMStb3SfXyREQcXPgWDHnNMao11wY8nanWE+xfrXTibS5R3knfXgudbnK+TtWm6r3bbfC9IfisuuroqurV72nIyXQI6C63qPUF0dWcrxdktH3Qy0rAx9VyHtEDNB/i2K7fHW6YpQSBqxAxCY2EkXMhyYMbaUm58lvvnkM125TefU4DAmYjCBTaRlCJ+H0MLHzLuazrbWrVKyj9b/p25dN+yxzV8f9wk/t1yopz7oH+Yx2+9wCXfKR8/s04OgNfUh4jmXvUQqwtf8KjaWpEPNmitnhoq+pcTaSEz//n8F9/eLsSflaO7VM6/MT6lDo2GwQFqQVx4F+0TinVK8hFAz3nBfj7JTWqPpUO9aPByhXzkR0lv0YlwpeNoLy9hjQaz+xf4y4EwBGQC5yNgJN6n/o9qzSCK7/xbGi9/HO1cMsX1YzFVK0vVuqJ/z5X6oiGvdQK2ioNHSPzOmcp75LM3UrNVbezUsnsX610/FYhAOq8lhcpQXD1j+5CANTIOlCYnXndbkUHTTMRwlm/bnLeI8oAeqqj6htmFF1H4xdaEGjKn+3zlH77gY2ODvDLyzzXdfUOKSlJTeCIJX5N91Ew4HnPdfs8oVQYVm7/F2JqwN7lKr78tFEQkeA4burwQXXanjru8BhnXXwfH/75AB2uUYbJ8lRL3PTbqV8jKBhqtz/162hKDR10TlO+bJiholjaCuBPi4GtOB3+xZMd2wn1obrh9td0INTx4kZ52SfOnjgplsiYzQYrX/PaRiz4ng+p9zsWQ/ur4b51UKOlskU06Q8dr1GCoVkprHT1RVDQGaeb1pwe6BmBJrAsmaTUIsf2Qo/7lVFw/XTl6dJ/rCNCJChVSq32SlXi6q/ujVb/Uy/TNnDNTw7vnk2zlC67IBeec4lsGV/XsYKz12PQzBJOeYThNZR3Uhk/Tao3h4tc3DJNanhYWKTRVBC0sVhzahw/oFZgWv2urZjGRZMxR5TaZ+vs4t3nnHvVwqIcFyOlabTc8qeKodPzIbVS89NhSqd+2Sfq+MaZUKsdrP5e+f0/uEmt3Fw3Va18DQkrXns0mgpGeS0o05zpZB1VSU9eb+W8HD73uHL99MTyTxzhj4vCXDcAcN7DjmiTnW9W77dZApo17udQ4TTsBQ9ugeGW+O3NBkFcbTjnbiUEQLlktr9SCwFNpUerhjQl572zHVmUTh6C9JNq4dO0UaosJNL9nF/vdy974iDknnAPQRxqiYcfFg0Xf6jWAbS5FIa86rttMdV8H9doNHb0jEBTNMf2wr8THH7h5opRayq9nAwVHtgUAmCJe18EIeHK8DrYJalHm4tVaGAzsFdEvIoW6eqXrtFoTgk9I9AUzReXwoE1yg6wdLLKKHXufc51PuhZ9HXOf04Zab+7zlF2pWUVbpdbHLH271unVDlnXQ9hpxCrRaPRFIkWBJqiObBGvX97raNsfhGqGU8k1IPEFMf+ZZ9C0wGe68Yb8dvNgGMajSZgaEGgUdhskH8SwmJgykDoeqvyrc/Y6fu8diOcg7S1v0q5c+afVAvFln6ojLc9HlDXs65K9RQE7KY/vBuaNRpNQNCCQKOY/wrMeV4tztq9SL1MwmJVWj1Xej/uLAjOvc85ImiLoWoG0PZyiDH8+COMzKQdr8Mjdbuol0ajKTP0OgKN4p0ucHij7zpdblWpCE1MH34pPceU8YYZwEyj0ZQZeh2Bxjv5ObD2J9+pBkG5a57/rOdjxRECoIWARnOaoVVDlZl9K/3z9gGVfzUk3JHgRHvyaDRnDAEdmgkhBgohNgohtgghRns4/roQYoXx2iSEyAhkezQuTLur6Drmal4zmUhSI7XiVy/Y0mjOGAImCIQQwcAEYBDQEhghhHCKzCWlvE9K2V5K2R54G/gxUO3RuJB1VCUjd+XpTLjcyO976zxlEAYV/lij0ZyRBFI11AXYIqXcBiCE+BoYBqzzUn8EULESfVZUfrkPUqe4l5uePC0ucM5A5U82Ko1GU2EJpGqoDrDbsp9mlLkhhKgPNAD+CmB7KgdmCIj9a1Ssfyt7lsOUQZ6FAMAFrwe+fRqN5rTjdDEWXwF8L6Us9HRQCDESGAlQr149T1U0Jj/cpAK/pe9Q+3cthyUTVbIVayJ3K4/vV/H/vSUG12g0ZzSBnBHsAepa9pONMk9cAXzl5RhSyolSyk5Syk7VqmkjpRNLJqmY/1lH4eQRldPXFAIAb3dUyd69CQGA0EhHkhaNRlPpCOSMYCnQRAjRACUArgCudK0khGgOJAL/BrAtZy5LjTSN4xsU77zhH8CGXxyRPTUaTaUlYIJASlkghBgF/AYEA1OklGuFEGOBVCnlNKPqFcDXsqItcT4dKCyAQ+uLf15oFLS7Qr00Gk2lJ6A2AinlDGCGS9mTLvtPB7INZzTejL6uiGCwml+8pZXUaDSVEr3WvyKyfjq80aboyKAmZpTPqk1VdNFL/BQgGo2mUnC6eA1pisP0eyHrsErCbmXgOBXq+f1z1P5tC9Qq4IJclfO3eosyb6pGozn90YLgTKLLrc4B3Wq2Ue9h0RBVpXzapNFoTnu0aqiikLFbuYnuXur5uAjWUT01Gk2J0D1HRWHHfPU+6xGlFjIxYwENf99RVrUptLms7Nqm0WgqNFo1VFEIClXve5Y5l5/3sHpZGeVl1qDRaDQe0DOCikBBLuz8x708oX7Zt0Wj0Zxx6BlBRWDaXbDqG+eysBi4bnr5tEej0ZxRaEFwupOf7S4EAB7zFrZJo9FoiodWDZ3unLQYhmNrq/eO15ZPWzQazRmJXzMCI9tYDWt9KeWuQDVKY2ArhDSL4feeFVCYr6KFajQaTSlRpCAQQtyFyhx2ALAZxRJoG8B2VS72LIP4eioPcFoqHFgLZ10HP9wMay3ZO0PC1Uuj0WhKEX9mBPcAzaSURwLdmEqJrRAm9VH5g2+dDx/2VeWbf1dhok0unlw+7dNoNGc8/tgIdgM6aW2gyDA0bIV58G5XR7lVCJx9F7S5pGzbpdFoKg3+zAi2AXOFEL8CuWahlPK1gLWqMnF4c9F1hE4hqdGcyUgp+W3Hb3Sv3Z2Z22ey98ReYsJimLl9Jhc1vohjecdIjklmeJPhAbm/P4Jgl/EKM15+I4QYCLyJSkzzoZRynIc6lwFPo+wOK6WUblnMzlj2LIc133s+NuYILHgd5jwHQpRtuzQazSkjpWTMP2M4kHWAW9rcQtXIqkzfNp3M3EzSc9LZmrmV7ZnbaZ3UmjVH1ni9ziupr9i3myQ2oXXV1qXe1iIFgZTyGQAhRIyxf8KfCxueRhOA/kAasFQIMU1Kuc5SpwnwKHCOlDJdCFG9+I9QgZnU23N5jwchOASaD1aCoOVFZdosjUZTMv7a9RcTVkygSWITft32q7180b5FXs/xJQRcWbBnQfkIAiFEa+AzoIqxfxi4Vkq5tohTuwBbpJTbjPO+BoYB6yx1bgEmSCnTAaSUB4v9BBUVW6F7WacbVbC4et3Ufo1W8LQ2z2g05c3CvQuJC4ujZVJLvt/0Pf3r9ydIBLFgzwKSY5OJDInk7r/uZs8JtdBzU/omj9dpltiM3vV68/7K97m82eUkxyRzsuAk7aq14/Y/bwfggbMe4NVlr/J+v/fpVqsbO47tYPnB5ew+vpt21doF5PlEUamChRALgcellHOM/V7AC1LKs4s47xJgoJTyZmP/GqCrlHKUpc5UYBNwDkp99LSUcpav63bq1Emmpqb6fqqKQPoOeNP4Umt3gJFzy7M1Go3GwCZtBIkgXlryEp+v/5yxZ4/lyYUqw26QCMImbUVcwUFsaCwLRixg/dH1tKjSgiDh3T8nKz+LX7f/ykWNLyLUDDJZigghlkkpO3k65o+NINoUAgBSyrlCiOhSalsI0AToBSQD84QQbaSUGdZKQoiRwEiAevXqldKty5nDWxzbYTHl1w6NphJhdvJWpJT8sfMPMnIzyLfl8/Z/b3My/6T9uCkEzPO9MbrLaHrX7W2/fmRIJEEiiCARRKukVkW2LSo0ikubXlrcRyoV/PIaEkKMQamHAK5GeRIVxR6grmU/2SizkgYsllLmA9uFEJtQgsEpjrKUciIwEdSMwI97n94sel/lFTCpFZjpnkZT2SmwFRAkgvhl2y88vkDl7qgbW5eT+SfJLsimaWJTVh5a6fMaMaExXNfqOiasmABAw/iGbMtUXeC9He9l2tZpjOsxjhZJFTcVrD+qoUTgGeBco2g+SoWTXsR5ISi1T1+UAFgKXGm1LRheRSOklNcJIaoC/wHtfS1eOyNUQ0/HO7av+BIa94eQYjlkaTSVnjWH15ASl0JESAQhQWpMW2ArAODL9V/y05af2JKxxdclPHJH+zv4eM3HZBVkMbrLaAamDCQpMqlU214enJJqyOjw7y7uTaWUBUKIUcBvKP3/FCnlWiHEWCBVSjnNOHa+EGIdUAg8dMatYM49Dp8NhyGvQe4xqNvNcazLrdB8SPm1TaOpYEgpmbVjFg/PcyRjahTfiJFtR/Lbjt/4a/dfxIbGcjz/uMfzL2x4IdO3TeeRzo8QEhTC84ufB+C9fu/RJKEJe0/upUP1Dtze7vYyeZ7TBa8zAiHEG1LKe4UQ01E+/k5IKYcGunGeqHAzgk2/wZeWtJGDX4EZD8Kg8dD11vJrl0ZzmpJTkEOeLY+4sDjm7JrD+KXjaValGVn5Wfy7799iXatmdE0e7/o4d/11Fy2qtODbC791Op6Vn0VeYR4JEQml+ASnJyWdEZg2gVd81NEURUS88/6MB9V7kE4FodEczj7MlDVT6FKzC7uO7UIimbt7LqsPr+baltcyafUkANJOpLmd++w5z1I7ujY3/X6TvezWtreSkZtB9ajq3NDqBiSS0KBQ7j/rfs6re57bNaJCo4gKjQrY81UUvPZGUkozOW57KeWb1mNCiHuAvwPZsDOGglzP5bXal2kzNJryZPex3Yz6axSPd32cLrW6sGTfEualzeOTdZ8A8Nm6z9zOMYWAK7e1u43/Nf4ftWJqAfDxwI+VP37+SRomNPR4zg2tbyilJzkz8WdYeh0qTISV6z2UaTzhSRDE14Xks8q+LRpNgDhw8gBhwWHEh8e7uWem56Qz+KfBANz0+03Uiq7FvpP77MfPrXMueYVKFfTnrj8B+GnoT6QeSKVdtXacyD9BaFAo7au3J78wn9BgZx/7s2ro/9Kp4lUQCCFGAFcCDYQQ0yyHYoGjgW7YGUPqFPVe5yxIOReWTobud5ZvmzSaUyS3MJfs/GymbZ3Gy6kv28urRFShWmQ1NqZvtJdVj3SOHGMVAqAMtSa/bPuFlLgUGic2pnFiY7f7ugoBTenga0awENgHVAVetZQfB1YFslFnBPNfhdodYdNMtf+/SZDUCPo9o4PIaU4bpJTsOr6LiOAIakTX8FhnS/oWRvw6gsENB9MqqRXLDy5nXto8jue5e+YczTnK0RznceLB7IO0r9aeBzs/yPSt0/lm4zfc2PpG9p3cR486PZzqXtDwgtJ7OI3f+LOOoCGwV0qZY+xHAjWklDsC3zx3KoTX0L/vwm+POpfdtxbik8unPRqNQVZ+Fpm5mdSKqUWBrYAbf7uR/w7+B8C7fd8lNizWHs/m2pnXsuLQiiKveXGTi7m02aX8uu1XPlv3GefWOZftmdvtcXeqR1Vn0vmTaBjfECklmzM20zSxacCeUeMZX15D/giCVOBsKWWesR8G/COl7FzqLfWDCiEIno53L3toG0RX/EUpmtMD838rhOC7Td8x9t+xxITGML7neIJFMIWykOTYZH7Z9gsTV02kZnRNCmwF9hW1ver2onFCYz5c/aHbtVsltWLdkXVIi9f4BQ0v4JdtKlnSecnn0aNODxIjEjmac5TLm12O0LPc055TFQQrpJTtXcpWSinLJS7CaS8Iju2D15q7lz+6B8J1TCHNqSGlRAjBEwueYFP6Jq5tdS2Pzn+06BN98FT3p/h03adsz9zuVN61VlcW71sMwOrrVjMvbR4N4htQN7aup8toTnNONejcISHEUGMlMEKIYcDh0mzgGUPOMXchEBEPIghCI8unTZoKz+Hsw6QdT+N43nHumH0H/er1s3vXWIXA+fXP5/edvwMQGhRKpxqd6F67O7uO76J6ZHW61urKnhN76Jnck3O/VhFjWlRpwcVNLmZY42Fsy9hGw/iGvJz6MkMbDaV11dZszdjKiXyVgqRncs8yfnJNWeHPjKAR8AVQGxCoHMbXSimLH8SjFDitZwS/PgBLjal2436w5U8Y8IL2EtIUm0JbIbmFuXyy7hOmrJ5CTmGOz/rfXvAtzas05++0vwkJCuGc2uf4VNcczj5MYngiwUE6DWpl4VRjDW0FuhU3Q1mlIy/LIQRCIpWX0LxX4Cy9kEXjmXxbPgLhFDBt+YHlzNk9h8/Xf+7xnIubXExsWCx1Y+uSb8sn7Xga93e63x6/vlfdXn7du2pk1VJ5Bs2ZgV9xDoQQQ4BWQIQ5ypBSjg1guyoeK75wbDfoCVFVYOAL5dceTbmRlZ/Fwr0L2ZKxhdiwWL7f9D2tq7bm4c4PczzvOOm56bRKasUNs25ASsnngz/nn73/8OLiF9l1fJfb9UJECF8O+ZLsgmw61uhYDk+kOdPxJ1Xl+0AU0Bv4ELgEWBLgdlUsCnLhiEVTdsnk8muLJuDkF+YzafUkhjQcwv6T+0mKSLIvfvpmwzc8t/g5t3O2ZGxh6papHq/X9tO2Hsuvb3U9N7S+gciQSCJDtI1JEzj8mRGcLaVsK4RYJaV8RgjxKjAz0A2rULzaDLIt6RnCY8uvLZqAkZmbSWxYLK8te43P13/OeyvfK/okoGP1jiw/uNyvum/0eoOqUVVpFN+IGJ25TlNG+CMIso33LCFEbeAIUCtwTaqAZPvM0aOpwGTmZhIXFsdry17j47UfF+vcezveS2ZeJvefdT+gAq/N3jWby5tfzl+7/uJA1gF6Jfdi6pap1IyuyfAmw/XIX1Mu+CMIfhFCJAAvA8tRuQk8hwWs7AybAFF60VhFJt+Wz5W/XklOQQ5Hco54DKMA0LZqW+7peA9tqrVh3ZF1/J32NzabjT71+tA4sTEHTx50i5VTN64u17e+HoAhDR0Jie7vdH/Ankej8Qd/vIaeNTZ/EEL8AkRIKTP9ubiRivJNVIayD6WU41yOX48SMGYu43eklO5LHU9nbEYy6+YXQIery7ctGr/Iys9SQdMKsqkVXQubtDFuyTi61urKsgPL2HB0g8fzBjUYRKP4RgSJIG5uc7PdPfOsGme5RcCMC4sL+HNoNKVFsbKjSClzAS8B9p0RQgQDE4D+qCT1S4UQ06SU61yqfiOlHFWcdpwWLJkE/06AlHPUfr3u5dsejd/c9udt9vg6Vr7e+DUA8eHxPHP2MxzMOsglTS5hW+Y2miY21WEUNGcsgUyT1QXYIqXcBiCE+BoYBrgKgoqJmWks3ViWX7dL+bVF4xeL9y1m9/HdHoWAlTd6vUGnmo51N82qNAt00zSaciWQgqAOahWySRrQ1UO9i4UQPYFNwH1Syt0e6pzetLxIC4LThHxbPmsPr2VT+iaGNxnOA3MfICs/iyM5R9iS4bwYvn/9/jzQ6QGW7l9K55qdCQ8OJzw4nNgw7fWlqVz4Skzjc+WKlNI/fzjfTAe+klLmCiFuBT4B+nhoy0hgJEC9evVK4balQGSiw1to2Dvl2xYNKw6u4JqZ1ziVPbvoWY91e9Xtxeguo6kTUweAOo3rBLx9Gs3pjK8Zwas+jkk8dNgu7AGsYQqTcRiF1UWkPGLZ/RAY7/FmUk4EJoKKNVTEfQNPYYESAsldoOUwvW6gjMjMzSQzN5O6sXVZdXgVVcKrkFOYQ54tj682fOXXNYY3Hs5T3Z/SMXY0Ggu+ktf3PsVrLwWaCCEaoATAFajUl3aEELWklGbeuqHA+lO8Z9mQaWiv2l4GXW4p37acwSw7sIwTeSfIKcwhtzCXxxc8XuQ517a8ljZV2xAbFsttf95G7ejaXNPyGpYdWMbrvV8vg1ZrNBUPf2MNtQZaAhFmmZTyU1/nSCkLhBCjgN9Q7qNTpJRrhRBjgVQjrPXdQoihQAEqD/L1JXqKsmT5p7B2KiBUHmJNiZBSkluYS2ZuJlUjq2LDRohQP8dXUl/h03U+f14emXT+JLrV6mbfX3LVEqSURIVGcXVL7dqr0XjDn1hDTwG9UIJgBjAIWAAU+U+VUs4wzrGWPWnZfhQ4tawaZUV2Onx6EexbofbbXg51dACwkpBXmMdZn7sL0RfOfYHIkEg3IdCnbh9aVW3FP3v+YfXh1fSu25tHuz7KwayDvLD4BSb0nUB8uHtWOL1KV6PxD3/yEawG2gH/SSnbCSFqAJ9LKfuXRQNdKbd8BKu+hR8taqBb50Mtz8HCNAopJftO7mPvib10qtmJnIIcNqZv5K3lb7Fkv/e4hSlxKTRNbEr32t1pltiMNtXalGGrNZozk1PNUJYtpbQJIQqEEHHAQZyNwJWD4FDLdrgWAkVwNOcof+z4w2MkTpOza5/NE92eYNmBZWxK38Rn6z4jPDic9/u/b/fo0Wg0gccfQZBqxBqaBCwDTgD/BrJRpyU5lqgaw98vv3acZtikjcX7FrP3xF6O5R0jJCiEn7f8zMb0jV7PiQ6NZv4V8+3JVMwcuA93fph8W769XKPRlA3+xBq6w9h8XwgxC4iTUq4KbLNOM7b8CYc2OfYjKm8cmSPZRxi/dDw7j+2kSWITrzH2rXw04CNs0sbCvQu5vf3thAeHe62rhYBGU/b46zXUFkgx6wshGkspfwxgu04fCnLh84udy6KrlU9bygEpJXtO7CE5Npn8wnx6fdvLfmztkbVezxvaaChBIog7299JzeiaAHSppVdfazSnI/54DU0B2gJrASPUJhKoHIJgjYfHrNai7NtRxvy+43eiQ6NZf3Q9by5/k371+vHnrj891n2558vkFuYyrPEw0nPSEQgSIhLKtsEajabE+DMj6CalbBnwlpyOSAlTb3PsD58IkQkQElZuTQoUmbmZzN41mwsbXcjdf93Ngj0LnI5bhcCyq5cBMHXLVIY3Hk6oxZCeGJFYNg3WaDSlhj+C4F8hREsP4aPPfKyZx1oNVyuJz4BQxFJKt5DKU9ZMYcqaKTy18Cl7mUAgkQxMGUjbam1JjEhkSIMh9nMva3ZZmbZbo9EEBn8EwacoYbAflYtAAFJKeWb7Tx7bC/Mt4ZY6XlshhUCBrYCvNnxFaFAo45eOZ3CDwSw7sIzcwlwubXopTas0ZdHeRfZY/CbjeoyzJ2evEVVDx+LXaM5g/BEEk4FrgNU4bARnPh9fAEe3OvZja5dfW/xk7eG17Dq+iz71+hAeHE6BrYDZu2Yzfqkjlt/PW3+2b7+78l37dlxYHO/2e5d21do5XdM09Go0mjMXfwTBISMuUOVBSmch8NBWiK5afu1x4UTeCR6c9yAPdXqIurF12XFsB7O2z2LSakcq6cYJjdmSsYVmiY6kKvHh8WTmumcZ7ZXci0e6PEJybHKZtF+j0Zxe+CMI/hNCfInKHWBPU3lGu4/utWSw6nJruQuBfFs+qftTiQuP4/H5j7M1Uwmpf/b84/UcMwmLubCrXmw93uv3Hpm5mRzLO0ZuYS7H845zXvJ52sNHo6nk+CMIIlEC4HxL2ZntPmoGlhuVClWblPntcwtzWX5gOa2rtuaxBY8xd/dcv84b020Mu4/vpm+9vlwz8xqGNRpGg/gGNKvSjHPrnBvQNms0moqLPyuLbyiLhpxW/PG0ek+oX6a3PZl/kqM5R5m8ejI/bP7Ba733+71P08SmzNk9h7iwOJpWaUrD+IZOdVZftzrQzdVoNGcIvlJVPiylHC+EeBs1A3BCSnl3QFtWHqz4ErbMBlOPHsD1Apm5mfbQyXtP7OWJf55g6f6lHuu2rdaWjwZ8xPG84yRFJtnLtfumRqMpDXzNCMxsYeUQ87kcyDsJU28P6C3WHlnL3hN7Gb90PPtP7gccRl1XbmlzC5NWT+KbC76hTkwdwoLDnISARqPRlBa+UlVONzazpJTfWY8JIS715+JCiIHAm6gMZR9KKcd5qXcx8D3QWUpZPoLnHUscnBZDYcDzp3zJeWnzSDuexotLXvRaxxQC9511H4NSBnE4+zCtq7ZGCMHdHc+8SZdGozn98MdY/CjwnR9lTgghgoEJQH8gDVgqhJjmukJZCBEL3AMs9rfRAeFYmnpvfQlc/OEpLR7LK8zj4mkXs+PYDo/Hz659Nle1uIrYsFjmpc3j6hZX20f7tWJqlfi+Go1GUxJ82QgGAYOBOkKItyyH4lA5houiC7BFSrnNuN7XwDDANVTFs8BLwEPFaHfpknPMsX3ufSUSAvtP7mde2jyGNR7GZ+s+cxMCKXEp9K9/Pv9rcCPRYaHERar4PG2rtgeg0OZshskrsLEyLQObpTwzO58N+4+7G2w0Gk2loHNKIj2alH70Y18zgr0o+8BQVEIak+PAfX5cuw6w27KfBnS1VhBCdATqSil/FUJ4FQRCiJHASIB69er5cetictjINXDFV1CzdbFOPZJ1lKt/GUlatvLXf3bRswAE57SgrrycMFkDQRC5x2y8tfQYr9nmlmbLNRpNJeK28xqVrSCQUq4EVhqLyQTQHOU9tFFKmXeqNxZCBAGvAdcXVVdKORGYCCpn8ane2w1zAVmNVn6f8uf2+Yxb9BYH8jbYy6QUCKGaF3aiL3HxjnSL4aFBDO9Qh4jQYHanZ9GmTjyhwUE+75FSNZoasc5JXFrViScm3K80EhqNRuMX/vQo/YEPgK0ogdBACHGrlHJmEeftwTm3cbJRZhILtAbmGgHNagLThBBDy9xgnLYUYmtBgpptFNokwUGCQpvkRE4BsREh/Lv1MBuPbuPchvV5f8EK/jjmPIGZNfx3EiPjOZh1kJ3HdtIzuacO1KbRaCoE/giC14DeUsotAEKIRsCvQFGCYCnQRAjRACUArgCuNA9KKTMBe+wGIcRc4MFy8Ro6ug2SGlNgk3y4YBvjZm6gU/1Edmcc5VDOfoJkJJGNlMPT6xucTx3a4DKe7znGvp8Sn0JKfEoZNl6j0WhODX8EwXFTCBhsQ9kJfCKlLBBCjAJ+Q7mPTpFSrhVCjAVST5tAdoe3QNpSMmr3pOMTMzFts6k704lv/DbRoXu9nrrkqiVEhkSWUUM1Go0mMPgjCFKFEDOAb1E2gktRrqD/A9/B56SUM4AZLmVPeqnby882ly5GXKHxe9tgk9C9YRIPXJDAq8ufYc0RZyFwe7vbuaDhBQQHBVMruhZBwreOX6PRaCoC/giCCOAAcJ6xfwgViO5CKnrwua1/wQ83ATA9pwMTruzIrMMvcMMfc92qfnfhdzSv0ryMG6jRaDSBp3IHnds6B4A9MonjRFG3Zjpz/5trPxwfHs9PQ38iPTedpolNy6mRGo1GE1iK1G0IIZKFED8JIQ4arx+EEGdGBpN9K8mKqEnf/Oeo1eotrpp5OfHh8UzoO4GuNbvyTp93qBZVTQsBjUZzRuOPaugj4EuUbQDgaqOsf6AaVSbknoDtf7PF1oAqtXdx3LaX1kmteb7H8zSMb0jP5J7l3UKNRqMpE/yxdlaTUn4kpSwwXh8Dpb+0rYwpPH4AgF8Lu5AV9w3RodF8MeQLt7j+Go1Gc6bjjyA4IoS4WggRbLyuBo4EumGBZtduFf1iR8NgCmUBI5qP0F5AGo2mUuJPz3cjcBmwH9gHXAJUeAPy7jQlCDLi99EksQl3d9AhnzUaTeXEH6+hnajAc2cU9TZM5IQQbMzazo0Nb9LhIDQaTaWlcupC8k6ScnIVbyQ2pFDa6FarW3m3SKPRaMqNyikIju8nSwh+iLMRFxZHu+rtyrtFGo1GU25USkFgy9zD9tBQCkQhz5z9DOHB4UWfpNFoNGcofgsCIUQ3IcQsIcRcIcRFAWxTwNm6bQupEarzb5ig3UU1Gk3lxleqyppSyv2WovuB4aicBIuBqYFtWuDIOLCTqbHRtEhoQYO4BuXdHI1GoylXfM0I3hdCPCmEiDD2M1Cuo8OBY17PqgAcz9jFlrAw+qb01d5CGo2m0uNVEEgpLwL+A34RQlwL3AuEA0nARWXQtoBxJF+Fl26c2LicW6LRaDTlj08bgZRyOjAAiAd+AjZJKd+SUh7y5+JCiIFCiI1CiC1CiNEejt8mhFgthFghhFgghGhZkocoLpnyKAD1Y+uXxe00Go3mtMarIBBCDBVCzAFmAWuAy4FhQoivjXSVPhFCBAMTgEFAS2CEh47+SyllGylle2A8Ki1mwEkPOgFAcuyZEURVo9FoTgVfK4ufA7qgktD8JqXsAjwghGgCPI/KQeyLLsAWKeU2ACHE18AwYJ1ZQUpptTVEoxLdBJzDwQUk2KKICIkourJGoylX8vPzSUtLIycnp7ybUiGIiIggOTmZ0NBQv8/xJQgygf8BUcBBs1BKuZmihQBAHWC3ZT8N6OpaSQhxJ8ojKQzo48d1T4mT2TnsC4XqIjrQt9JoNKVAWloasbGxpKSkaOeOIpBScuTIEdLS0mjQwH+PSF82guEow3AIcOUpts8rUsoJUspGwCPAE57qCCFGCiFShRCphw75ZZ7wyrptu9kRGkpyWNIpXUej0ZQNOTk5JCUlaSHgB0IIkpKSij178jojkFIeBt4+hTbtAepa9pONMm98DbznpS0TgYkAnTp1OiX10T+bVpAeHEynqnr9gEZTUdBCwH9K8lkFMsTEUqCJEKKBECIMpU6aZq1g2BtMhgCbA9geAPYeWwZAh6qtA30rjUajqRD4k6qyREgpC4QQo4DfgGBgipRyrRBiLJAqpZwGjBJC9APygXTgukC1xyQnew1BEZKmzS8K9K00Go2mQhDQoHNSyhlSyqZSykZSyueNsicNIYCU8h4pZSspZXspZW8p5dpAtgcgx3aMGJskLKpKoG+l0Wg0TsyaNYtmzZrRuHFjxo0bV+x6/p5fXCpd9NFccoiRle6xNRpNOVNYWMidd97JzJkzWbduHV999RXr1q3zu56/55eEStcj5ok8YmRweTdDo9FUMGbNmkX79u1p3749Xbt2xWazFev8JUuW0LhxYxo2bEhYWBhXXHEFP//8s9/1/D2/JATMRnA6IqUkJ6iAGKLKuykajaYEPPP/9u4/yKr6vOP4+wO77PJDlI0/iruApgEFFatdESYVm5YIbhL9x1opnUp1wrTT2KRpp8FJJjaZ/kN0GtIxk8GJNjNthRaTJsQYnJQyxYkJuiQqKhJIsGEBIyFqiMDuAk//OGfhsuyFvXfvuZd7z+c1c2fvOed77n2+98vw3O85557n26/w6t7K3vNy1qUTeeAjV5213X333cemTZuYPHnyadtuuukmDh48eNr6hx56iAULFgCwZ88epkw5eSFlR0cHmzdvPm2fYu2Gu385cpUIDvcf49Do41wyamytQzGzOtPV1cXs2bNZsmQJK1euPGXbM888U5ugKiRXieDXh/r4zSgYP3pCrUMxszIM55t7Fp599lkign379tHUdPp/m8OZEbS3t7N798mbLfT09NDe3n7aPsXaDXf/cuQrEbz1Cw6OGsX45om1DsXM6sjatWuZMWMGTU1NRAQHDx5k4sST/48MZ0Zwww03sGPHDnbt2kV7eztr1qzh8ccfH3a7K664Ylj7lyNXJ4t/9XYPITGx5YJah2JmdWTx4sWsWrWK2bNnM3fuXHbsKP23r01NTTz88MMsXLiQmTNncuedd3LVVSdnOF1dXezdu7dou7PtPxKKqMoNPyums7Mzuru7y9r3O5u+zvJd/8B9F3ax7EMrKhyZmWVh27ZtzJw5s9Zh1JWhPjNJWyKic6j2uZoRHDz0FgDntZ5f40jMzM4duUoE7x5+G4DzxzkRmJkNyFUi6O1LzupPGHtBbQMxMzuH5CoR9B1NSlROHD+pxpGYmZ07cpkIzhvrG86ZmQ3IVyI4fgiAcU4EZmYn5CoR9B87DMDYcS5TaWY2IF+J4HhSx3PsGN9iwsxsQKaJQNIiSdsl7ZS0fIjtn5T0qqSXJG2QNC3LePrjCKMiGDNqTJZvY2Y2pOEWlrnnnnu4+OKLufrqU0vq1l1hGkmjgS8DtwKzgMWSZg1q9mOgMyJmA08AX8gqHoD+6KM1XAjbzKqvlMIyS5cuZf369WXvX6osZwRzgJ0R8bOI6APWALcXNoiIjRFxKF38IdCRYTz0009LabUkzMyA6hWmAZg/fz5tbW1l71+qLO8+2g7sLljuAW48Q/t7ge8OtUHSMmAZwNSpU8sOqJ+jtLhMpVn9+u5yeGNrZV/zt66BW89+mKVahWmKafjCNJL+FOgEbh5qe0Q8AjwCyU3nyn2fJBH4sJCZlc6FacqzB5hSsNyRrjuFpAXAp4GbI6I3w3jo0zHGnBu5z8zKMYxv7lmoZmGaYuq1MM3zwHRJl5MkgLuAPylsIOk6YBWwKCLezDAWAPp0nGYnAjMrUTUL02S1/5lkdsA8Io4CHwOeBrYB/xkRr0j6vKTb0mYPAhOAtZJekLQuq3ggSQSeEZhZqapZmGbg/ebNm8f27dvp6Ojg0UcfdWGaQiMpTLPwq7Noj4t47KP/W+GozCwrLkxTOhemKSaCI6OgWf4xmZlZofwkgmP9HJZoVkutIzEzO6fkJhHE0V6OSLSMciIwMyuUmzOnvf3vEhJjaK51KGZm55TczAgO9yV3smge5URgZlYoN4ngUO+7ADQ5EZiZnSI/ieCIZwRmZkPJTSI43JsUpWka7URgZlYoN4mgty8pU9nc5N8RmFltDLewTLF2xQrWjFRuEsGRgUQw2pePmln1DbewzJnaDVWwphLykwj6k0NDY0Z7RmBmpatWYZoztRuqYE0l5OZ3BEf6kxmBE4FZ/Vrx3Ape+9VrFX3NK9uu5FNzPnXWdtUqTJNlAZpicpMI+vr7ABjT5ENDZlY6F6ZpAH3HkhlBS3NrjSMxs3IN55t7FqpZmCbLAjTF5CYR9PYnxc9amj0jMLPSVLMwTZYFaIrJ9GSxpEWStkvaKWn5ENvnS/qRpKOS7sgylvHpqYGJY8dl+TZm1oCqWZjmTO2GKlhTCZnNCCSNBr4MfBDoAZ6XtC4iCq+X+jmwFPi7rOIY8J4JSv9OyPqtzKzBzJkzh61bt474dbq6uujq6hpy21NPPXXWdqtXrx5xDEPJ8tDQHGBnRPwMQNIa4HbgRCKIiNfTbaVdh1WGo8eSk8VNTT5HYGZWKMtE0A7sLljuAW7M8P3OaMrU+Sz5zW7a2mbUKgQzs3NSXZwslrQMWAYwderUsl5j5rSbmTnt5kqGZWbWELI8WbwHmFKw3JGuK1lEPBIRnRHRedFFF1UkODOrHxFR6xDqRjmfVZaJ4HlguqTLJY0B7gLWZfh+ZtaAWltbOXDggJPBMEQEBw4coLW1tHOhmR0aioijkj4GPA2MBh6LiFckfR7ojoh1km4A/guYBHxE0uci4qozvKyZ5UxHRwc9PT3s37+/1qHUhdbWVjo6OkraR/WWZTs7O6O7u7vWYZiZ1RVJWyKic6htubn7qJmZDc2JwMws55wIzMxyru7OEUjaD/xfmbtfCPyyguHUA/c5H9znfBhJn6dFxJDX39ddIhgJSd3FTpY0Kvc5H9znfMiqzz40ZGaWc04EZmY5l7dE8EitA6gB9zkf3Od8yKTPuTpHYGZmp8vbjMDMzAbJTSI4W9nMeiVpiqSNkl6V9Iqkj6fr2yR9T9KO9O+kdL0k/XP6Obwk6fra9qA8kkZL+rGkJ9PlyyVtTvv1H+mNDpHUki7vTLdfVtPAR0DSBZKekPSapG2S5jXyOEv6m/Tf9MuSVktqbcRxlvSYpDclvVywruRxlXR32n6HpLtLiSEXiaCgbOatwCxgsaRZtY2qYo4CfxsRs4C5wF+lfVsObIiI6cCGdBmSz2B6+lgGfKX6IVfEx4FtBcsrgC9GxPuAt4B70/X3Am+l67+YtqtXXwLWR8SVwLUk/W/IcZbUDvw10BkRV5PcuPIuGnOcvwYsGrSupHGV1AY8QFL8aw7wwEDyGJaIaPgHMA94umD5fuD+WseVUV+/RVInejswOV03GdiePl8FLC5of6JdvTxIaltsAP4AeBIQyY9smgaPN8ndb+elz5vSdqp1H8ro8/nArsGxN+o4c7LCYVs6bk8CCxt1nIHLgJfLHVdgMbCqYP0p7c72yMWMgKHLZrbXKJbMpNPh64DNwCURsS/d9AZwSfq8ET6LlcDfAwO1rt8DvB0RR9Plwj6d6G+6/Z20fb25HNgP/Et6SOyrksbToOMcEXuAh4CfA/tIxm0LjT/OA0od1xGNd14SQcOTNAH4OvCJiPh14bZIviI0xOVhkj4MvBkRW2odS5U1AdcDX4mI64B3OXm4AGi4cZ4E3E6SAC8FxnP64ZNcqMa45iURVKxs5rlIUjNJEvj3iPhGuvoXkian2ycDb6br6/2zeD9wm6TXgTUkh4e+BFwgaaDQUmGfTvQ33X4+cKCaAVdID9ATEZvT5SdIEkOjjvMCYFdE7I+IfuAbJGPf6OM8oNRxHdF45yURNGzZTEkCHgW2RcQ/FWxaBwxcOXA3ybmDgfV/ll59MBd4p2AKes6LiPsjoiMiLiMZx/+JiCXARuCOtNng/g58Dnek7evuW3NEvAHslnRFuuoPgVdp0HEmOSQ0V9K49N/4QH8bepwLlDquTwO3SJqUzqZuSdcNT61PklTxZEwX8BPgp8Cnax1PBfv1eyTTxpeAF9JHF8nx0Q3ADuC/gba0vUiuoPopsJXkqoya96PMvv8+8GT6/L3Ac8BOYC3Qkq5vTZd3ptvfW+u4R9Df3wG607H+JkmJ14YdZ+BzwGvAy8C/Ai2NOM7AapLzIP0kM797yxlX4J60/zuBPy8lBv+y2Mws5/JyaMjMzIpwIjAzyzknAjOznHMiMDPLOScCM7OccyIwK4GkT0gaV+s4zCrJl4+alSD9RXNnRPyy1rGYVYpnBGZFSBov6TuSXkzvif8AyX1vNkramLa5RdIPJP1I0tr0nk9Iel3SFyRtlfScpPel6/8ofa0XJW2qXe/MTnIiMCtuEbA3Iq6N5J74K4G9wAci4gOSLgQ+AyyIiOtJfvX7yYL934mIa4CH030BPgssjIhrgduq0w2zM3MiMCtuK/BBSSsk3RQR7wzaPpek0NH3Jb1Ack+YaQXbVxf8nZc+/z7wNUkfJSm2YlZzTWdvYpZPEfGTtBRgF/CPkjYMaiLgexGxuNhLDH4eEX8h6UbgQ8AWSb8bEfV8l0xrAJ4RmBUh6VLgUET8G/AgyW2fDwLnpU1+CLy/4Pj/eEkzCl7ijwv+/iBt89sRsTkiPktSaKbw1sFmNeEZgVlx1wAPSjpOcmfIvyQ5xLNe0t70PMFSYLWklnSfz5Dc5RZgkqSXgF6SUoKkrzedZDaxAXixOl0xK86Xj5plwJeZWj3xoSEzs5zzjMDMLOc8IzAzyzknAjOznHMiMDPLOScCM7OccyIwM8s5JwIzs5z7fwWLliEtfmsbAAAAAElFTkSuQmCC
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
<p><body></p>
<p><p>
Note ((1-\alpha)^n+ \displaystyle\sum<em>{i=1}^n \alpha(1-\alpha)^{n-i} = 1, \alpha \in [0,1]), (Q</em>{n+1}) therefore is called (exponetial recency-)weight average of past (R \text{ and } Q<em>1).<br><br>
<i>Proof</i>:<br>
(n=1, 1-\alpha+\alpha = 1);<br>
assume for (n=k, (1-\alpha)^k+ \displaystyle\sum</em>{i=1}^k \alpha(1-\alpha)^{k-i} = 1);<br>
then for (n=k+1), <br>
(\begin{aligned} &amp; (1-\alpha)^{k+1}+ \displaystyle\sum_{i=1}^{k+1} \alpha(1-\alpha)^{k+1-i} - [(1-\alpha)^k+ \displaystyle\sum_{i=1}^k \alpha(1-\alpha)^{k-i}] \\
&amp;= (1-\alpha)^{k+1}- (1-\alpha)^{k} + \displaystyle\sum_{i=1}^k \alpha(1-\alpha)^{k-i} + \alpha(1-\alpha)^{k+1-1} - \displaystyle\sum_{i=1}^k \alpha(1-\alpha)^{k-i}\\
&amp;= (1-\alpha)^k(1-\alpha-1)+\alpha(1-\alpha)^k \\
&amp;= -\alpha(1-\alpha)^k+\alpha(1-\alpha)^k \\
&amp;= 0
\end{aligned} 
)<br>
(\therefore  (1-\alpha)^{k+1}+ \displaystyle\sum<em>{i=1}^{k+1} \alpha(1-\alpha)^{k+1-i} = 1, \forall k \in \mathbb{N})<br>
(\therefore \forall n\in\mathbb{N}, \text{ }\alpha \in [0,1], \text{ } (1-\alpha)^n+ \displaystyle\sum</em>{i=1}^n \alpha(1-\alpha)^{n-i} = 1)
<br><br>
Consider ({\alpha<em>n}) by stochastic approximation theory: P(coverage) = 1:
[
\sum</em>{n=1}^\infty \alpha<em>n(a) = \infty \text{ }\text{ }\text{ }\text{ and } \text{ }\text{ }\text{ } \sum</em>{n=1}^\infty \alpha<em>n(a) &lt; \infty 
]
This means (i)steps are large enough to overcome initial condition or random fluctuations (ii) steps become small enough to coverage.
<br><br>
As (Q</em>{n+1}) more or less dependent on (Q_1(a) \Rightarrow) biased by initial estimate.<br>
Then, for genral stationary case, we encourage exploration optimistic initial value((Q_1&gt;0, \epsilon=0) compared with greedy's).</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[3]:</div>
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
<pre>100%|██████████| 1000/1000 [00:25&lt;00:00, 39.52it/s]
100%|██████████| 1000/1000 [00:23&lt;00:00, 41.84it/s]
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
<h3 id="Upper-Confidence-Bound(UCB)">Upper Confidence Bound(UCB)<a class="anchor-link" href="#Upper-Confidence-Bound(UCB)">&#182;</a></h3><p><body></p>
<p><p>
Action selection:<br>
[ A_t \doteq \arg\max_a\left[Q_t(a)+c\cdot\sqrt{\frac{\ln t}{N_t(a)}}\right]]
where (N_t(a)): number of times "(a)" has been selected before "(t)";<br>
c&gt;0 controls the degree of exploration;<br>
(\displaystyle \sqrt{\frac{\ln t}{N_t(a)}}): uncertainty, or variance(many "action "(\rightarrow)bad(\rightarrow)less this "action")</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[4]:</div>
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
<pre>100%|██████████| 1000/1000 [00:32&lt;00:00, 30.80it/s]
100%|██████████| 1000/1000 [00:24&lt;00:00, 40.56it/s]
</pre>
</div>
</div>

<div class="output_area">

    <div class="prompt"></div>




<div class="output_png output_subarea ">
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYIAAAEGCAYAAABo25JHAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjMuNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8QVMy6AAAACXBIWXMAAAsTAAALEwEAmpwYAABYN0lEQVR4nO2dd3gU1deA35tNI4ReFAi9CSi9qICCiNIEsSDYK/ZePuzY/YldsWDHAnZERVCkF+kgRToBQu8E0nfv98fM7M7uzm42IZsAOe/z5NmdmTszZ3az99x77ilKa40gCIJQeokpaQEEQRCEkkUUgSAIQilHFIEgCEIpRxSBIAhCKUcUgSAIQikntqQFKChVq1bV9erVK2kxBEEQTigWLVq0V2tdzenYCacI6tWrx8KFC0taDEEQhBMKpdTmUMeiZhpSSn2qlNqtlFoRpk03pdRSpdRKpdT0aMkiCIIghCaaawSfA71CHVRKVQTeA/prrVsAl0dRFkEQBCEEUVMEWusZwP4wTa4EftJabzHb746WLIIgCEJoStJrqAlQSSk1TSm1SCl1baiGSqmhSqmFSqmFe/bsKUYRBUEQTn5KUhHEAu2AvsCFwJNKqSZODbXWo7TW7bXW7atVc1z0FgRBEApJSXoNpQH7tNZHgaNKqRlAK2BtCcokCIJQ6ijJGcEvQBelVKxSKgnoBPxXgvIIgiCUSqI2I1BKjQG6AVWVUmnA00AcgNb6A631f0qpicC/gAf4WGsd0tVUEITiY096NvGuGCokxRXbPbPz3GRku6lUNr7Y7nksrNp+mMzcPNrVrVzSohwzUVMEWushEbQZAYyIlgyCIBSODi9MJt4Vw9oXehfbPa/7dD7/bNxP6st9C3yux6NRCpRSRSJLxxcm06xGeb64sWPINn3englQKHkLysY9R9i09yg9mp0SletLriFBOEnxeDSHs3Ijbj9p5U7u/3apdzvH7Qlqs353Ov/tOFwU4gXxz0Z/b/P9R3PIynVHdG6Dxybw4PfLikyW3enZTF/r81B8b9p6/ly5s0DXOJyVS7rt81+0+QDZec7Po7XG4wldJOy816Zz0xfRy6ggikAQioifFqexdX9G0P7laYcYt2Rboa/7w6I0fl6SVuDz3p++gZbD/2TvkeyI2t/65SJ+XrLNr0P6c+VO7FUMz399Br3fmllgWQpD2+f+YvCof/z2eTyagxk5fvss+X5aXPjPOPAegbwycQ1Dv1yU77laayau2Inbo2k5/E/aPPsXACu3H+LS9+fwxl/rHM97/vf/aPDYBEqqYqQoAkEoAtwezQPfLeOyD+YEHbvo3VncZxtpF5SHvl/G/d8WfLQ7e/1e7+vrf64h12GE70R6Vp73/dAvFzGpgCPhULg9mn0RKCV7Z7h060G/Y6//tZbWz/7Fpr1Hefzn5WTk5PH9wvyVZHaem6s/nsd3C7bS6LEJjgrb4mCmbxQf2DFv3neUNyev9dv/xl8+R8cJy3dy21eL+GTWRgDyTKWybtcRALYe8N33r1W7uGfMEgA+mbUJgFy3ZsW2Q7z99zpHpRAtRSGKQBAc2J2eVSBTgDXl350e2eg7HB6PjngUr7Vm3JJtZOTkBR2rUaEMAE+OW8HbU9bnOytxxRj29f0BI+4DGZGbl8Do8CcFzCQAHv5+Ge2en5yvQnJ7dMgOb8LyHQB0f3UaX8/bwui5m3nkx39DXmvfkWxu+Gw+C1MPMGv9Xh758V/yTPlCccD2/Nl5/rLe9+1S3py8jo17j3r3vfX3OkZMWg3A1DVGgoTvApTT7vQsAKqXS2DV9sMM+nAut4xeyPhl2/0+jxy3h37vzOL1v9Yyfe0e6j/6O9sOZoaUp6gQRSCcNOw7ks2oGRvC2loj5aqP5jH0y0XkRPjDy8412ilg096jjh2NZS/OdXuoN+x3Rs3YAMCFb8xg7Pwt3nZv/r2O9s9P9o4Sw7Fw8wHu+3Ypz/22ym//7sNZpO4zOqsj2Xnm/Y1Xj0dz/7dL/UbbqXuP4jY/t92Hs/yuFecyuomj2f7K5q3J67j9q2BzycczN3Krw0ziJ1MR7U7PZtLKnRw4mhN0LhijYqf1CfApK4vN+/xH9u2e+4vOL0/ht3+38+msTczbtJ+pa/Ywf5P/+sPEFTuZuGKH4z3sz7n7cLafKcpaH+nxmn+OzJFTN3Drlwv5YZGhANbvPuI9du2n83lxgqEoMnPc9Hl7pp88+47YFI9tTeSdKevRGjq/PMV3XBSBIITntb/W8uKE1fy9+tjTVlkjvsx8Fiut0Zz1A/VoY7R6q4M9+Yzhf5J2IIOMHOOaL05YzbQ1u1mzK51hPy33dtjWTCSwc3fisGnG2HEoC7dHe00eHV/8m0WbD3hlAnj1zzVordl+KJOfl2zj4pGzyc5zk56VS7dXp3mvueOQvyI4lJnLH8t38MIE/zCfNyav5Y8VO72fgdujGTFpNX+u2gVAVq5zp/Xf9sPc+uUibnVQIgC5Ho/fuXePWYLWmqPZeUGK4FCmvzLZdzSHbQczueubJTz72yqvotgSYApauPkAt321mGd+XcmBozks2ryf7Dw3H0zfQP93Z3vbdX9tGq1NO3+4ZwKYtHKX4/4ZtkXnsQu2Bh3fuNenNIb9tNz7Pt1hoT/UYvOxcsLVIxCEUJSNdwGwZudhejYP72bn9mh2Hc6iZsUyYdtl5bqpUMbZl/5QZi49XpvGwDa1uKpT3aDj70/bwO3dGvrtW7f7CGfUquDdvv6zBd73PyzcyvWd63tH4Jac4Viy5SAAMUrx2p9reG/aBp4d0MKxbUaOmyVbD5IQ67v+1v2ZQaNluykCfAqpfd1Kjte98+vFjLq2PTPX7WHk1A3e/eUSnbuXlduNUfXytEPkuj3kuTVlzO8OIDfP47WtA/y6bDun1yzPS3+sDrrWhOXhzXdb9hsK3ZodBfLZ7FQ+m50KQMuUCvybdsjveH6ff1GwYY9Ptr9W+ZTJ4cxgc192GEV0LMiMQDhpSIg1OpNI1tNembias1+e4rXdhiIzJ/QIbO6Gvew9ksNHMzc5Ttn/N3E1pz89yW/fkay8kNP7ozlu8twelm/zdUY/LfbZmv9NO8i3C7Z47eeHs3J5d+p6wDBJzdmwD4CnflkZUuasHDf3jV3q3c51e3js5+V+bTbuce40M0J8Fn+u2sX3C7f6KTWAEZPWeM103y7wmb7emGwsrmbmuun5+nSaPTWRKz/yeQflunWQDE5KIBKsGYGlMMMRqASKi89nO5sAdx4O/t/8flHBvcciQWYEwkmDO0KPCq01H84wvDq2H8wiM8dN3SplHdtapqE80/wRaxut77HZdkOZkI4E2NUPZ+X62YHtjJi0hhGT1vjte/gH30LokFH/cDTHTUaOmxs61yfL1jH/vXo3nernH+F65cfz/LadXEF/XOzc2ayyxQ8Ezhqe/TXYjLV6ZzrzNu2nRa3y/N+Py4OOA6SaHbWlxADOfOnvENIXnMA1hKJAqcgGG5GyIYTidWLjniP5NyoEMiMQ8sXt0ew4lJl/wxCs332kwC6Iy7Ye9Atcmr1+r1+wkxPWND43zHT+w+kbaPbURO/2C7+v4twR00g74NxhWKPgge/N4dwR0/h63mbSDmTwb9pBnhzny4iyOYTpIZD0MDOC/DilfCIAa3amk5XrDuqMI3UPLQoCR7Hp2cFmDID7v11Ky+F/FodIjgR+RoDX1BdTyCDkGub3UBJc1KpmVK4rikDIl5cm/MdZL01h/9EcBn0wl5bDJzm2+2vVLnq9OSPIu+STWZt48LtlHMnOY8C7s1i1/TD1hv3O+9M2OF4HYMDI2fR+ayYb9xxh9c7DXPPJPH5eso2x87ewyzZlnrluD91GTCUr1+2NQrU8fQ5n5TJ2/haveWXp1oO89MdqvwW/BanGgmragUy+W7CVAe/OAnz+2lm5bg5m5LB82yG2Hczk8Z9X8OhPy/lijn/5V8tPPD/GLdlWeM8Ps+PKdWtu/XIRA9/zj1nYfjC8masgVCuXEPb4/NQDlIlzhW0DzuaNouTcJpGnpa9cNp4/7u3KtIe6kfpyXza+1JdJ953j2HbklW1DXuei1s6dcY0K0VUQ4+/qzIUtTo3KtcU0JOTLHyuM0fzhzFzmp4YuOnfLaCMEfsehLBpVT/buP5iRw5HsPKat2c2ytEM8+Ysxkv7fxNVc2alOyMVYMELr42NjqF4ukZ2Hs7xeFbP+rzt5bs01n8wHDJdNSxHM27SPRZsPcOn7vo7y79W7+f1fZ3dBQ+ZMrz+63f00M8cd5HGSEOvyU0ZA0IJrKFbvTOfikbPzb+jAHjNG4WBGjl/6AwtN0dkrOtWvzG9hPq9lWw9yeq3yrNgWnXQTYHSsgR5MgVzStpbjZ2Hns+s7cMPnC3DFKJrVKO93rOmp5RzPaV2nouP+gW1qMazXaZzdsCpTV+/molY1mbRyJy1qlufVP/3Nem8PaeMNGCsI/VvVpFq5hCD34ZYpzjIVBTIjEEjPynUMYOr79kyGj19JnsffRTI/An3vD5kujjvNH7Xl1gjw4Hf+EbNHs/OCFnBz8jxUSfbPSDly6no/l8feb80k0xzpL9ly0E8JAGGVAOAXuTvizzVel8vMXLe3A7Yolxjr59rX9JRyYRVkUWHFAQS6x97bozEAuw4fezCbxakRmD+aB3Sq+XFX90YFat82wEupXELwuDXQnTSQxtWTOathFcDoYCMlyTbbsT9nw2plUUpxbpNqDO/fgnZ1K/FYn2YMaF2La8709xwLvN89PRpzebsUP6+tQG7uUp+3h7ThyX7N2fBiH6omh5+ZFRWiCAS6vzqN9s9PBmDyql2s3ZXO+t3prNx+mM/npJLnNnpF+8LnRzM2MnHFDsekYIHBQIGKwM7k/3ahtW8N4vIP5tLxheDFwkA3vjHzg/2xf122PexzRordZHX3mCVByb5+XrKNZTYPk/pVnReaLWpGYDKIpOMNxek2d9RALmuXwvSHu0V8rY71K3Nmg8ohr1ne5hIa64qhVj7ut3bOSPFd85wITDq3dG3AiMtaerftLqYW7c0U0C8MPN3xGh6tSYxzsezpC3isT7OIZbXf62xTkUD47Ka3dG3Ahhf7AHBK+eAOvEujqoy4vBWLnuzp3dfnDJ+p55ubO/F4X5+MrhjF/Md6RCzzsSCmIYG9Nu+Xm0cHZzi0OnZ7GgN7cNGa53t5XTeBIK8YSxHsCGEv/nR2Ks/9torJD5zj55lix57/pqT436VnOHq/pFQK3RlWSorjo+va0/ftWWGv/cYVrRlic6EMhZO5pHLZ0Ka1jvUrh/SIsjirQRUOZOSwemc69/VozNmNqjJr3V7HtsuevoD6j07wbkfqZ++KUfQ4rbp3+53BbWj1rG8R+bkBLVi/+wh7j+Twu5lGokycizY2E43VOcfGKG+cwakVEkl9uS/bHRaFAa+xLJz50c6w3qexNz3bb9TeoFoyi5/syeM/L+dqh3gRC6UULgV/P3gulZOMGezq53oBMHfDPjqaXl3JCbG8MPB04mJiGNShNsPHr+TzOak0qp4cpGhiCruiXUBkRiB4CUwtEMjRbGe3x09mbaLesN+92zluD4s276f+o7+z+3BW2BkBwCRzDcIKw3eiIOmUo8E95zXiig516Nq4atCxsiFMFtecWZfRN3aiRc0KpL7clwn3dA15fcv10+qAQnmH3N/TKOtdpWw8A8xFS1eM72ccaJ5wMqfY+fCadnx1cyevOS8pn/b2jkpr/AK/7PRsfgq3ntuA6Q93Y8wtZzL94W7EumK4qUt96lctS4WkOC5pU8vbPs4VwzMDTmfkVb5F2oTYGL/gOmtx2qlwTbyt446N8ZcxPyY/cC59z6gBGKP6J/o193vO2pXLULlsPO9f3S50oZ7cLPAYv4+G1ZK9MibGuUiMc9HdpgQBrupUl0EdagPweN9mTH2oG9VDzAqnPdSNOcPOy/9BjoFoVij7FOgH7NZaO8/bjHYdgLnAYK31D9GSpzSyblc6I6euZ8Tlrbw/KI9HhxxldHzR2X/bGo0HegNZvDLRf5EsO9fDV/9sRmuYt2m/93z72oAdy74+JUxqiGOZEcS5FLluzRtXtCpUFk+AxqcYi4qjrmnv534K/p3Q0qd6kp6VR4WkOMon+ncazWuGtqnHxChmDzuPpDgXbq2pWCaOBlXL8tbfvrTF9/RoTHXTmyc5MZYXB55B54ZVaZVSgaR4Fxk5bj+bcvem1Ti3aXgTjOWFYq3/JCcYne3ptcrTqX5l5tkWwYPt1ZoHL2jCoz/5z5KqcZAzE7K4qfelAH4zkif7NefJfs0BeOWylmTmuvljxU6cLC6JcS5OrZBIl0ZVmbV+L4lxVsBgcO9ufQeJcTHMeKQ7czfs496xSyPK1tmoejIjr2rLyID9D1/YlFy3h66NI/BMeuEUaDEQLv88/7YBxLliwpoX6+VjeiwKojkj+BzoFa6BUsoF/A8oOUfjE5idh7K4b+wSr53e49Gk2rIi3jN2KeOWbmfNznQAth/MpMFjE/yiVSP1dgGjUEgkbNmf4c3CWZy+7aFoU7sSqS/3ZWCbFH65szPtQqRKCIflXRJop357SBu/EWi5xDhqV04KUgLheO3yVgDUqliGSmXjqZqcQKwrhvt7NmG2bSTYq8WpXhNHnCuGsrEwaOXtqNRZvHlFa8Df2+WzGzqSFB881pv3WA9apVSgySmmZ5fHQ46Zw8ZqXzEpnm9vPcvvPMsEZd3r3CbVGdKxjnfb4s+ER7jpvxvzfe5YV4x3LeIUh9FwYpzRPVm2/fObGaNqJ3OUNZPqe0ZNqpdL9HrYHEuGiDu7N+K+85tEfsLKnwt/sxImmqUqZyil6uXT7G7gR6BDtOQ4mXn2t5VMWL6Tns1PZeLKnSxM3c+OQ1nExij6tazhjUK84+vFzHikO2t2GQrh5yXbOLthVcbM3+I34syP/NIx+OTyRZlGmk7ZiUva1qJr46qFHsVbeGyjwla1K/LRte15Z8o6b46ZSKhnG9U2OSWZtbuOMLhDbfq3qsnqnYe9KRDy82IplxhLl0ZVWbH9EFv3G3btxqckh2xfq2IZ6lVJInVfBolxMd5niXfFQPoOSJ0J+zdywQOr2PBiHw6lp2NYxp3lKBPn4pTyifxyVxffzo+6MSVvHWfwsXfU7YSlhC5uU4vzm59CsmlGGtC6JmUTYrll9EKqlI2nkjvC6NfsdG7f/z/aXv0wZzWtHnTYul/zmuVZ+MT5lEuM5dU/13LXeY2DEvIlxLqY91gPKpsmmUqmCefCFlEo7ZiTAXFlcJzGOJGxH+LLQmzxeAAVhhJbI1BK1QIGAu9H0HaoUmqhUmrhnj3hfYZLE0eyrVGci1+XbfcuIuZ5NOOWbvdO9y0/+BGmCccVo3ju91UFUgLgnxArUsLZ/S1ZQlE5KZ6BbVK82y1tXic1KiRS0WavvebMutx3fmO/862kZ0PPaeB/3bLxPH2Rc2K2UK59dvPP7/d05a5zavN05cngzuW0UyN3o1w+/ELev7od5RJ8sofrfMEIIANjFtD01HJc3Lombw1ujW8p1PgMXRl7qfxGbW5yTXC8DsDCJ84P3rljGeXIoEO9SmEXVe127mTbWoLav5Geeg6pL/fl21vPDPssAORlw9pJsPAzYpZ/x1nbvvAd87hZmXQry8sMRWX7HAeqJieQEOsi9eW+3NSlvuNlTymf6DWBVkyKZ8Hj5zOsdz6eQlrDoQJUNju4FV6sAQs/9ZM5LK/UhzGDI79HCVCSi8VvAv+ntc7XdqC1HqW1bq+1bl+tWuSRhCcqWuuggCUnLJt9JAOTesN+93rkuJTyZuosCKkBeVseL4A7XigGBERpjr6xI5MfOBeAzo38F2aPZOfx2fXG5PHtIW1Y+tQF3mPPXXw6953fxM/WmufWpL7clwtCRGO+e2Ubv+3Vz/Visenad0PnegzpWAcIdk2Mc8XwUPkplJn+DCz4JOJntfPhNe2878P5lQPeOI5YlyLOFcObg9sYaxaBP52DRmK3/q65NFDbIcvXkf58x9l8dVMnx4Vti+9vOzukYp7y4LncnjQVtjsESH10Hnx/PWhNo+rOAVp+TB4O3wyCrWbeI/s/8JHdlPWkU04fgZfrwOrfHS/x8IVN+fqqxuAO7URQrVwCrlcbwrfXBB/MOgwjO8GEh+CN5s7PFUheNiz4yHi/4kff/kAZPJ7gfRumcDxTkoqgPTBWKZUKXAa8p5S6uATlOW54b9oGOr34d9hyeuBTBLsLGEi0IHV/2LzqFknxLm+wkhNdHDxoQvHB1e2C9o255UxeuPgMv31VkxNoVD2ZTS/1CfK0yMnz0P206qS+3JcO9ZwTrI2+sSOP9TkNyL+WQL+WNfn5jrP54Oq2zPq/7iTGuSibEMuypy/gib7Nefqi5jx2YUMGNXQHjxpzze8mw0iW9v5VbbntXDPltNawcVpYl5XalZO8CsBxRrB9KUx5ATBiAcA0lSz8DIZXgMyDvpGoioH1k2GfMcNzE8OUhIfgq0u8l2tTp5LxfWWnGx2axdJvfO+nvggv+mZgdhpUS0ZNeAhGdQs+mHXQfA3I3hnq+feZcRpH9/rkt/AEOAWsts1utPZe885uDen8Ywf4aajzPSwy9sF/441n/upS2DQDxt8D6/6EPathwcdGu/1GEkI+6wvLvnW+1uRnYPZbxnu3bb3ME9DpjxkMz5m/jfxmC4FobXzv+zbk37YIKTFFoLWur7Wup7WuB/wA3KG1HldS8hxPTDTdKXcezuKD6Rv8Arm01t5EWlZCtHCl+pw4nJXHeFvwVahgpsQ4F93CeJ3YXfss7gmhONoEhOyf06QaZzWsQpl4F89d7BtxVzIXJO3uez/cZixaJufj2ghGBzv0nIb0a1nDUfn4kXmQNrt+olfTSqRUSvLurlAmDleMIjHOxdDVNxH3bhtj1GjHZbowmh1C7zNqMKz3acYo85mKMHoALA/vBGcteibExsDRfYYt2eKTnjDjFXDn8mDPpqy5py5JK76B2W8axzP22TojbXRyP98KQNsYIzU1af5poQF4KQU+tpmHxt3uez/9f5CTbnRGHg/kZvLLnZ0ZfWNH/079yB7jeCAZ+/y3Q032rY5fu/23wV9JAeTakvk9UxHG32W8txTGyp+c7xHIzhWGsvziIlj8hb9pB8CVYIziN8+Cn0Molz02M2faAsgxZQsc/a8zc3FtmALrbZ546Q6m1ekj4MuBxvsje2DPGuN7H3tVZM9VRETTfXQM0A2oqpRKA54G4gC01h9E674nA0dzfJWqPpq5iWVbD3rz/VhMefBcxzq1gXSoV8mbWC0UZzWsws8O9WwTYmO8i292/rz/HFwxiriYYEXQr2UN3v57HTF42Jh4Na/mXs677oFBtuePr23vfX/NmXXpffqpzFq311tn147lk+0Xjbr+b6h/DjMf6e7oRfLu6euhehJwKuxZC5MegzNvg0a2TvD762HjVChfE5r2DroGALtW+G97PBAT41MEO5YZPuRxpjK1dxaHw9ue87yKwAUvmusYw81RtdXJ52YSk1iehFGdje0kM8rV4/a1ORQcZe0lN9NY2LSzM5+Bw9518M97sOgzWvV7A9peZ1zH4tVGcOGLcNadxnZcWaPDztgHVWyFeNy5EOMw27H2WZ25pQh2LocPuvi3zTnqv73kKxgw0l9h5OVAbPD/qZ/y+jHAi+lwQBS6Kz54RmNdIy/b+H4DFduLNWHodOP/x8Ku/K0O3uKby+HWGfDHMNi/Aa76HqY+bxzL2G98rnXONrbdkXnoFRVRmxForYdorWtoreO01ila60+01h84KQGt9fWlKYZgYep+x/S4FlYxlI9mGkmnApUAGIndQgV42dl2IP/00aHqw7ZKqegYvNPklHI0rJZMXKy/Pbl702o0Mf3tEzH+kR8o8xsP9GwSZP6ID7CLV01O4GJbgJGdhtWS+e3uLjxyYVNjx6aZhtlj+v+oXTkp2M/anQc/3WKMqud/BCM7wPq/4Lf7/dttnGp+ABHmg988B56vBuv+8nVeG6ca93Ji7STDjPNugFOcxwPf30CXOKNAi+MagXX93IDvzxp152WGtY97CWWbTp0d2nTzXidY9Jnx/rf7YcmXwXJstuVyshRN4Iwg0GRiYc32vGYgc3vluOC2VofvDhj02DvKF2v6yzf/I0O+A6m+ffb3AAcCisEsGwOfBni7rxwHv95rxAik73Ke4Yw6F47aHFh+vCm4jcXedYbJZ977hmlq/D2+Y3vMWJwt5udqKcv0XTD3vaItgOCARBaXAJd9MJfzbAnTAgkVuBXYJj8bOMB9PfP3g+7aKNjWXybOxRu9KlM+bQa/3tXFGx5vJ9A0ZG0P6VibWIxniImJ9ZqLRlzWkotb1WDaJbrA/9in16rgKwqTbirGUHZUaxEy+7CxGGhhn5rbbbeB5ohQfNbb6LyWfOlbIwDDBg3Bz2T9qPeu9e/Isg7Cyp/4IvFVHu/TzD/Ab3gF2LXSpwjyMmG3g+fVb/f7PodwpO+EVDO9xRFbwN7nfUI/t/ZArG0WsXu1//MCJNvWb+JNs9q2xf5tAu397lzzczefd6cZiKZijI7caWZjfQ5um6wHNvvL7smFMUOMznTXSuM7/6w3vN3a+fmcWPmTd40FgEmPw/fXGWYkMGZ3oUxdgc8ditwMeMeW3nqxzVsqPWCGEmMaa8bdBpMehb+eiuwehUQUQQkRmMnT7dEMH7+S1L1HORxBFO2MdZG50Q5qXzvs8dcHteKKDrWDPGjOa1adMh91ha8u4YyUCt4Rvd2DJkgRmCPbFweeQYKpCLCZjy5vX5s3T99IvQlX+f8IQpGTYbjr5QR0QgtNTx1PLqz5w3i/bwP8dKthm/+8j/P1rM4kLxvmfejbn2fz0NIapr1smHy+6O98nf9+g6kv+O/LPgJTngv9LHZbt+kW6UJzS4BrK2AukFrFBzK97f3YtigyT5TfH4DP+xrvv77M/9i0F0Ofl2cbYc973zCt2VG2GV6cqQhmvOLfxp1nLLxaM66XahsjaBXQ7agY+OVO+NdhkdarEG0d/751/ooBjJnZyI7w/tmhn6kgzH03QA4VeuHX7kFUWA5u8d/evcr47i1z1Zy3YcyVx36fEIgiKGbybGaYI9l5LN16EIBlaQf5fE6qX2rlcISqK1sQysa7uKRtCkop6lcty/kxi0jE+IElxrqMhUOArMOMTLuEs2NWUMW925jiYgQ1JZHFnIS7+DDudZpnGiMjpRQDTjdnGYE/ess741A+tVcPpBqjujdPN/y27WyZa7z+96vhobH+b2Ok9e9Yw1vHIs4hNH/DVKNjnPSob5+9k8lOh2kvwYfnwKbpzrJphw7hkwtg5muhn8euzCy3ztyjhunhSIBSn/q8z6ySm+GsCCxZI8XjgV0B5SQtD5hIsGY9FtptuM7uWYNf8NrztgCulT8ZC6+THje28zKNWYCTIkgNUaPBqwhsynrbYofZTJSTs81+2+cdFYhlYjwWDmwO3rfwM2MR22LN7wX3QooQUQTFzFFbndkPpm3g4pGzWbr1IDGRRimaWDVef7mzc8g2TQIiVv971mcDbaq20CR3tTGSzcumBRv5OP415rc10lGXibf9a+z8l3KedB6K/Y5ef54P7xoLvYlxMTzZQVNT7edC10Lu3Pqg95QnepmLhoE/esu263JY3Nu53DCNjGgMb7WCHUt9x8KZQfaudd6f66Asv7w42Jtml+lRsnV+sJ07UnaHLhhvyJJh/NhHNPYfmS/63FgkDMVH5/nFA/hREEXgznH+zAvLwk+N2cbIjrDHl4nWr8P+4xHjdenX8Ipt5hO4JjPtJefFXjDWdvas8b/u1BccFEF0beis/MkYpUeLgw6KYNKjPvOiheVyW8SIIihm7Pb/TWad24tHzuaZX507kta1K/ptB7p62iuB2Rl/V2d+vN1/mlwm3uUNuJqUMIyfE56Gl2oZ7oRHjQ4wKdOwVfqVITRtvbH4j0aUUgzpVM//xge3GrZgq8NXAV4j4RSB5Wp31CH53IwRhu+8E+nhi87ky9KvDffLT3r6u3AWJfs2wFstjWc7UsAI7VAdUEEVQZMLC3Zfi6TI40VC3tuuYC33Si8aKoQxYY7sCJvn+u8LN/sKRcPoZvA8JgJNQ6E41v/1EIgiKEYOZeTy4yKfSSTOtki4ZMtBx3MqJcUx85Hu3vQJdSon+R1PskUIv3FFK3qfbkTRNqyWTDkz8ZnddfO7W8/im1s6+d9k579eU4QrNp6keBftj07zHTeno/UqBHTqR/cFu7m9eTpMHGb4a4PP+2HnciNYx7J5xsTC7w/BCpsfeCgvEzACf35/wPlYQUwc+RFoAgnFGZcX7LpTni24LBYzRjjv3xy+xoEfOUfBFQcV6hT8/jf/VfBzCko4RQDwyx3+26vGFfweleoV/JziYt96Z1NmIJnRGaiIIogibo/2S4N761cLee0vnxlj3NL8K2qViXdRu3ISTU23zECXTXvgVe/Ta/DmFS2ZfEcrv1QCf95/Dj/efhasGk+1mCOc3dBhhGe6Iqp1k5jRaT4XrLMtfJoj9fIqIO3FiAbw9aDgay34GDICoka/vdrouNLMwjeLPjfC9X+4AQ7vMGcR+SySpy3wd1uMBlbAVn50ezT/NnYsD5nCUrdL/m3C8fppxuJjfBLcOAlqtDb2N+sPF70d/tz40EnxvFQpWBnKINK3Q0IFOPf/ju064agSOko+KpSrkX8bO2UjmHmFMhMeI6IIooTHo2n42ATqPzrBu0D8r628YaSc2cAIIDpl9yzaqrXEuWIYfpF/lOvrg1pRt4qRsiBhynAafdrCz2xwSvlE2lXV8N01RuftNA39zpePpeqC11B2d8F/zEzt9kXLN83UEDn5mCcsRWD5cVumF7ur3uunwbg7nAN67BzcYiwgHw9YgV35MeC9yK+Z7JwTCYA2VxuvCRXgidB1G7yUqwmn+qfvIDcTYhOhzpm+mVrHoVCjZfD5diLJmpnSARJDl8zMl0PboEIKdH/MCNIKxXW/Ff4eLa+A651zF3npfG/hrw/QwpfWgwdXw30BAYkVw8zI4gNmBIFmVQjtOHCMiCKIEkdtUb//bjM6uIycgq/4W6Xx2s68mZ8ShhMbE8P1nf2zL17SNoXpD3c3ZgdW7hgrwCbzAHzc039Bb1zANDtS7P+Ekdo0D231D/YJ9Je2WP6d4aYYLao3z79NQQj80YaidQFc/gIjgAPvN/wQPLoluGO+ZUpwp1/uVCgbkB7k6B7fPc4wZ3KntMi/A3dFoAjcuXD/Kv/4g4JweLvvuWq2Nq4V+Ex1zoaabYJOjZikylAvzMxq2BZoHyYgDKD11eGPd3/cf7tigMkr15xV93o5+NzAaOd7HdKv5zdYKiSiCIqQd/5e563CZa+oVVjHtrpVkoKqicXH5nM1y2ZvRZ2u+gXS5sN0m493pAFURcULYUa6xYV9pNagG1z9U/iRp0WTELWVXHFwzsP5n6+Usxnp7Hvg0k+g2mm+fYEdfD1bacs4/7UhP2q1g8SKwfLVP8d/346lxowAoNOt8MQeo3O0n1vVIQAxkhmBJxcSkiExICX3ucP8t9td7799iZnNMy8gFUaFWlA2oEZBfFnnz6F8ik9BNOhuvHZ90F8Rqpj80/QmVgj/rA+th4tH+tKAOBFOmV/3m88RokZro5pZhTpwi+l+WjfAAzDBZpK77ldAiWnoROC1v9Zy6fuGDduuCA5m5JKdl/9s4Pxmhg924+rJ9DnjVN4ZEjz6iTeDuIZf1JxRtlTG7PgXlo6xKQKzs7f81122XD/hctOcKPR/x3+7Rivfe6cfal4mXD/BsI9f+ws06mGMPENe/13DVDN4DDzwH/R18FI57wm48nvjfcW6/jLYcepcEsrDGZfBzZN9+wJdbe15ekK5V1qUqRhwbpxxj0AsE51Svmva21kj4jv+scll60Ar1oVBo4Ova/m3W2ti9boaCqrbMCO/jqWAGvtSh3PTX/7KLvD5WwTk6jmtr1+AopfK9eHmKXDnfEPJgzHYsWR5aB087ZBv64Y/ghVLrM0rb8hY/2Nx/h57fjTsYTxPOEVQu6PvfaW6xvPdvxxqtYW7F8Mlo/zbW2szra40lHrrq6D6sad+d0IUQRHhCUh8ZlUHA7jh8wX8uiy021cFjvBSxV9INn+X5cvE8d5V7bzl9tg0w9vWSrNwfYfqXLDpFd8I4cOuRji6pQisUb/ls51p+yFEyQWtWGnU03/7/GfCt8/NgnqdDft4KOyj4bbXwENrjI6nfE3ocLPzOVZnmnyK0eE9sil44dQpnYZlWkqw5+8PGLGGM2e1utKYTXQxPak63+9vwnHF+XdqXnkdlJLLlnuy062GWSZUh3Pfv/6zpMd2wGn94ALTucBaO7n8c8NkpZShIK3EbPZRfu2OxozEok1A3YC21/hG+oO+DJ5NVDJNpLkZxvdUranv+dw5vtmWfRBkp+7Z8MhG/312hVqjdehZWfcn/Efwg78xniecIoixyRE426nS0H8GcMHzhtwPrYf+5mL+xSPh9EuIBqIIiojAxG2BqaEf+t653OIPt53F4vaTGZL1LW2zjBw5leLy/CMIJ/hMEPdbuYMWfmqkWpj1hrNAedmGecjKbrhtUQGe5jhnyFgoH+CREcp0YrkM5mcHP/MOo7MBn/08EqwftzVqTqoMdy+CFNvo78zbg89zUiz2iOUH1/ort0BlMvB9uHMenP+0sZ3SDp7c7ZspueKcO/2Y2OB9dpQyzDLhsMeAxCfB4K+hshkwNmSM4YUU6AFjnRMfOAJPMGZdD66FVlcE3+vK74zPodlFwaYda5aWa/NmO9Vc+K7ZBq74Eq76EcoE1Ki2K3xLroY9fPssk1pMrO8eVRr5z9DOfRhusNVKsGYLTsrXIibGt+jvyud7OPtu4zW5WmhFVoRELQ11aSM7oNDLqeUTSc8KXbu1fd1KLDTXE1x5hvkmPsa4xsdpF8H4q40RAPhNmWtVNEccVscQKl3t7w/47KUFpVL94OyMRUHnew1/8bLVjIRehcVKGV3tNF/a51DT9nuWGgvoofz+K9YxFr57vWRsP3Ug8lq04GsbaNa44Q+80a5xZeCp/UYK5V/vMab4Tqaeyg18z1POTNVwyUdGdlMn270Tlr3fFe+sCFLaB+8LRd/XoLpDSc9wn0/l+sZfIDVaGc8Wl2SMphva/jdPC5EbCozkdl3u89937jBjMdx6lg62Bd56nY3vvFI9Q87GDqU5b5vtSyAX44I75vl78wwabUSZJ1fzzaQDR/AWZSr5B9zl978zYKTxd5whiqCIsK8BaK05nBU6OKpqcgJnNazCws0HqFbO92PdtCcDlxW9u/QrR0WAO8/4J7ZGdoEZHi22LSrYLCC+nM8VNCECv3EnWl1pmBT+etL5eKV60P7GEKaSctBnhGHeipSh0+GddnA4LXT6BKWgTZgiH0On+0e9OtmgLYYfMoLo7IFv3oyUAR1A4IgvxuUzAwXmi7nhD1j+vTHyfbk2lLeNyFsOMv4ixZItJtY3S6rX1ShyD9Drf87ndbw1eLRun7XEJvqbSQpKvzeh1RBDSZwbwSJ7OLrbFt+d1oOcFJGdQCVc/TT/7TKVfFHYVRvDhS/B6Zc6X+uRIh4wXfm9c2R9lBFFUAi27MtAo6lbxedCaM8m+teqXewKUz4yITaG+85vwiVtU6j7Xn3vwu7FbWox+i8HBWIvjvLxeUZmzN5mtOm2RaGzZEZK39eMgi1vmYuddltmXFJwCuJAzrzTiDVIKOdfmCSQFDMvv1Lw5F4jed37RvUxHtlo/EAtRXDnfKPDtI7HJ0NOwAwrLtE3E1AuuGuRr83Nf0e2KJ5U2d9OnR9lA+IHLKUWOCNw4rR+xmJsYNBU3bONPzALneRjmgkrn+kpU72ZsXB69j1GAZnVvxkxHKFmTn1ecd5v8YRDWgyriEokxCf5zwJOFJSCs8K4WzvNAAaOMtYrCkOTC/JvEwWiWaHsU6AfsFtrfbrD8auA/8MYSqUDt2utnQ3pxxnnjDDcvVJf7uvdZ58RDP0y/Eg8IS4GV4yR8dOeTrdZjfL893gnsDuoBGZl3GF+RJa90qkcYUEoWz3YXm23SSaUy18RWHZ4bcs1b+fuxeYU2tbhuuLglOb+23aqNfV1svHJhufHizV8NlaLpr1hzjvGIqW9k05pXzAzSGGxZgSRmJNi46Hf6+HbhPNkioT658A144zXGJdvETfUYndheWy7/4BB8OG01nGcE83F4s+BEE7YAGwCztVanwE8B4wK0/a4x6kYvJP7J0CZGE9wjn2LL/r53s94NXRu/VB5dyKl/rnGq5MZyG8xMAIzkWVOcSrc0fVBY5aQ36jbqSNVCoZ8C7fPMUaUww8F21fPf8ZYaAwcqRcXtdoatv0eT5fM/Z1o2N25RGRREl82f5dWwSAwnuM4JJqlKmcAITMkaa3naK0tn8Z/gJRoyRJVDqXB/o1BhWbAlx4CIJY8zokxRvMvZgw3RreBtvLJT/unVA5X6ORYqdbUsHte/nnwMfuotKOtDOPdi43F1FtsBVGu/cVnFnHKld4jn8pKTQJSRpzzsOHpYdG0l+FzHYoYl29htSRIKAf3LIHaHfJvK5ROrh0PTx8saSnCcry4j94E/BHqoFJqqFJqoVJq4Z49kVXmihZBZSTfaAFvtwkKGBvYphbVyiVw3mmGt8HDsd8yOv5/nBuzjFa5pnknMMLXKtpSWKzEZNWb+xdpd0K54LJPnYOgLH/uKo38I3JjE4zR/6m2cxp0g2YDjHt2vrfgttHBXxsRrhbnPeHs6SEIJypKFcwTrQQocUWglOqOoQhCph3UWo/SWrfXWrevVq1aqGbFwrkjnKsR7T3i78apzLw8p1ZIJJY8bo01kl19EW/z2oi0aHqkXGCmOva48/cXDzeCtRYczxjkC3yKiTOSgkGwR0zZKnDHXMMEVKUhPJpP9TE7MS4xMQhCCVOiXkNKqZbAx0BvrXUhS0MVH1rroA7f4p4xS7zv26q1vL5xOKwZS43yjbjO9afzBY8W8ezGymfuyQuvCG6ZYoT/hyKpstGZx5U1ZgC3zylYLne/aFlBEI53SkwRKKXqAD8B12itQ9QaPL4IXAe45L3Z/OTQrm2MmWJ5w1SG7vuMZUkHwCmsoCCVqnq9bBR8CYc1sg6lCCwXzEiKk9g781McgopunxM+WveepVErqycIQtESTffRMUA3oKpSKg14GogD0Fp/ADwFVAHeM4ur5Gmti8Hfr/Bk5fqvAyzechAC3LJb1CxP9SOxkAPM/5AEoCMhOFKAwJH8bP7gyzWTWN5ZEdzwB8wfFXku/XA4KQc7oSJMBUE47oiaItBaD8nn+M1AETs3RxcnzyCLwa4p7Gx0BZ/f0BFmzoe/I7jg1nmR3zywlF+9rtDzWfjIDNLp8ZSRI6bXy0bg0r71sOIHX3tXglGAZMC7kd9TEIRSgUQWF4DAGYGdl+M+ZmQ9M7mYkxulEws+ct7ftC+sCaikZEWE1j/X6OyrNvYPwur6oPFqJTizF8S4c35w4i1BEAQTUQQFwClozM4Ry7U0VP6fUJz/jOF++Y2ZGC3QpGJVRXo0zRjZR+pl03uEkTQrUpfOO/4JXwBFEISTElEEBSDcjABgaFczFW+kMwKLwIRWDbrB3HeNXC6XfuRz23Tyxkk+JfSic6ehBZMjSkUvBEE4vhFFUAACFUF7tdpvu1JZc6RuVYGKlPiy/lWiGp1v5HRv0iv/qNn7ljtn8xQEQYgQUQQFYPk2/5S3PyQ8G9zInQvrQsQNxCZCXpbhtWNPfRxf1gjSSihvFNRQCtpFmK8/knqygiAIYSjxyOLjmalrdnPXN4u926snfsBHca9RuWw8lXAoIq01rJkA2SEKTF/xtfGqAhKCWZ35/202cvcIgiAUI6IIwnDj5wv47d8d7DuSTVaum1fjPqSnaxFNY3eyJNGhgMrKn+G7a0Nf0PLyCZUZMibmuM9JIgjCyYcoglBsmUev8lsAWLf7CHM2+KJkuydvcT7nhxuMV6veaCBWYWx7cfN7lh6bnIIgCMeIrBGE4tMLeB+oxzf8tWoXn8zaRKrpyn997V0QLjPSBc8b6RWO7oH1k419T+03ZgKDvzHqz75rBlFL9K0gCCWMzAgi4JNZRl3S/doo0hK/7MvQja82sw8N/ACutuXVt8xBp/X19xASBEEoYUrljEBrTeq+DKNUZITEYgsSc6rEZVExIKHbtb/4cgBZBJZlFARBKEFCKgKl1HIgpIO61rplVCQqBn5eso0HvlvGlzd1pGvjyOobTEt4gMrqSP4NAyNzG3QLbiOKQBCE44hwMwKreO6d5qtlD7kqeuIUD6u2G+6dq3ekOyuC3KygXSkqwpTKcWXybyNFvwVBOI4IqQi01psBlFI9tdb2KuzDlFKLgXyS4x+/xMUaSyM57hAmnqyD3rfJZJARmGs67MUjyNUjMwJBEI4jIlkjUEqpzlrr2ebG2Zzgi8xxMYavfm4IRaAzD2J5869IvJnlnnqRXzySSF9r4bj1CT+5EgThJCASRXAj8JlSyipHddDcd8IS5zL0WChFkJl+APu4/oyYVN9GhTpwKCCOIC4JcjOM95EGhD2aJpk+BUE4LgirCJRSLuBcrXUrSxForQ+FO8d27qcY6wy7tdanOxxXwFtAHyADuF5rvTiwXTSwTEO5bue18Jz0fYTsou9eZKSZXvwFlK8Ju1ZBs36QeRC2zI1cCKnrKwjCcUJYRaC1diulhgBvRKoAbHwOvAuMDnG8N9DY/OsEvG++Rh1rRpATouJY3tEQ0WLlapq1AOJ9BWCaD/Adr9+1CKUUBEEoHiIxDc1WSr0LfAsctXbmN3rXWs9QStUL02QAMFprrYF/lFIVlVI1tNY7IpDpmIh3hV8jUHv+cz6xcoNoiSQIglBiRKIIWpuv9pzLGjjvGO9dC9hq204z9wUpAqXUUGAoQJ06dQIPF5hYc0aQZzcNZR2CVxrA4DEsXLSAC53ywuVXsF0QBOEEJF9FoLXuXhyC5CPDKGAUQPv27Y+5CovjYvGulYbt/5vLnZUAwAXPHeutBUEQjjsiSjGhlOoLtACfQ73W2qEqS4HYBtgqrJNi7os6caZpyC+OwJ0T+oQ+rxozBikCIwjCSUi+ikAp9QGQBHQHPgYuA+YXwb3HA3cppcZiLBIfKo71AYB4pxlBXghFUKE2dLylGKQSBEEoGSKZEZyttW6plPpXa/2MUuo14I/8TlJKjQG6AVWVUmnA00AcgNb6A2AChuvoegz30RsK9wgFRylrsdhmZcoLTisBGOUlBUEQTmIiUQSZ5muGUqomRib+GvmdpLUeks9xjS+PUTFjKAC/GcHR3c5NI8kdJAiCcAITSaqI35RSFYERwGIgFfgmijIVG3ZFoDdO9zs2LbaL8UYUgSAIJzn5KgKt9XNa64Na6x+BusBpWuunoi9a9NCmRchuGtqybbtfG1c7s/awmIYEQTjJiWSxeBYwHZgJzC5EhPFxi3dGMP4e6h5e6HdsZ9mmxpuuDxSzVIIgCMVLJGsE1wBdgUuBEUqpbGCm1vr+qEoWRax5QE6ex5geLP4iqE3FqjVg+Emj8wRBEEISSUDZJqVUFpBj/nUHmkVbsOIg1+3xqz1g5/xm1YtXGEEQhBIiEtPQBmAvxgLxJ8DdWocr2nv8Y60R1MzdAr9+6thGRZpOWhAE4QQnEq+ht4EtwBDgHuA6pVTDqEoVZbRpHHo763FY9Yt3/6/uM0tKJEEQhBIjEq+ht7TWlwPnA4uA4cDaKMtVLJTHvxi9C2Oi406KrKC9IAjCyUC+ikAp9ZpSah4wD2gJPIVRQ+CExTINWR2/RRmy6Zr9Bvuvn1kCUgmCIJQMkXgNzQVe0VrvirYwJU2SymarPoW45ColLYogCEKxEckawU9AT6XUkwBKqTpKqY7RFSu6hMpjnYiReM5KUy0IglAaiKTHGwmcBVxpbqeb+05YtHZWBUlkA6IIBEEoXURiGuqktW6rlFoCoLU+oJSKj7JcxYpbK1xKU0ZZikBcRwVBKD1EMvTNVUq5MC0qSqlqwAkdR2DgmxXsowJgLBanvtxXYggEQShVRBpH8DNQXSn1AjALeDGqUhUDyd7s2rBflwOgTJNuJSSNIAhCyRHWNKSUigE2AY8APQAFXKy1/q8YZIsaWsMp6oB3+yiJdMt+jWmDripBqQRBEEqGsIpAa+1RSo3UWrcBVhf04kqpXsBbgAv4WGv9csDxOsAXQEWzzTCt9YSC3qegaDQpaq93Ow8XqbqG1B4QBKFUEolp6G+l1KWqgIZzc11hJNAbaA4MUUo1D2j2BPCdqWgGA+8V5B7HQveYJd73udrFE31Pijx6giAIBSYSRXAr8D2QrZQ6rJRKV0odjuC8jsB6rfVGrXUOMBYYENBGA+XN9xWA7RQDWkMd5StNmUcsN3dtUBy3FgRBOO6IJA11uUJeuxaw1badBnQKaDMc+FMpdTdQFiOfURBKqaHAUIA6deoUUhx/ypCDJy6JmNwMjlZrUyTXFARBOBEp6cipIcDnWusUoA/wpblA7YfWepTWur3Wun21aseeEE5rSFQ5ZNfoALfOoO9drx/zNQVBEE5UoqkItgG1bdsp5j47NwHfAWit5wKJQNUoygQY9qhEctCuRKjRCmJc0b6lIAjCcUs0FcECoLFSqr4ZiTwYGB/QZguGWypKqWYYimBPFGUy0Jry6ig6LinqtxIEQTjeiUgRKKW6KKVuMN9XU0rVz+8crXUecBcwCfgPwztopVLqWaVUf7PZg8AtSqllwBjgeh0qEVAR0nzNO9RS+1DaHe1bCYIgHPdEUqryaaA90BT4DIgDvgI653euGRMwIWDfU7b3qyK5TlFTb+s4AOJ2/1vctxYEQTjuiGRGMBDoDxwF0FpvBwrrSXRccKicUVfHlbmvhCURBEEoeSJRBDmmucZKOlc2uiJFn9xY4xH29h9dwpIIgiCUPJEogu+UUh8CFZVStwCTgY+iK1Z0ifHk8p+nNrkpZ5W0KIIgCCVOJAFlryqlegKHMdYJntJa/xV1yaJIjCeX3IhKMQiCIJz8RNQbmh3/Cd3524nRhiKQqgOCIAiReQ2lE1zm9xCwEHhQa70xGoJFE5kRCIIg+IikN3wTI0/QNxj1CAYDDYHFwKdAtyjJFjViPLnk6FikEJkgCEJki8X9tdYfaq3TtdaHtdajgAu11t8ClaIsX1SwZgRKjEOCIAgRKYIMpdQgpVSM+TcIyDKPRT0KOBqIaUgQBMFHJIrgKuAaYDewy3x/tVKqDEYKiRMLrYl1Z5KLS0xDgiAIROY+uhG4KMThWUUrTjHw5xMkZ27DTd2SlkQQBOG4IBKvoUSMdNEtMLKDAqC1vjGKckWPJV8BUIGjskIgCIJAZKahL4FTgQuB6Rh1BdKjKVRUiTV0WQ5xJSyIIAjC8UEkiqCR1vpJ4KjW+gugL8ElJ08c6pwJwAd5FyFTAkEQhMgUQa75elApdTpGkfnq0RMpyiSfQnZsOZboxuI+KgiCQGQBZaOUUpWAJzAqjCUDT0ZVqmjiyUMrcR0VBEGwCDsjMAvJH9ZaH9Baz9BaN9BaV9dafxjJxZVSvZRSa5RS65VSw0K0GaSUWqWUWqmU+qYQz1AwPHl4YmLNe0f9boIgCMc9YRWB1toDPFKYCyulXMBIoDfQHBiilGoe0KYx8CjQWWvdArivMPcqEB43WkmxekEQBItI1ggmK6UeUkrVVkpVtv4iOK8jsF5rvVFrnQOMBQYEtLkFGKm1PgCgtd5dIOkLgycPj6kIZEIgCIIQ2RrBFebrnbZ9GmiQz3m1gK227TSCvY2aACilZgMuYLjWemLghZRSQ4GhAHXq1IlA5DDYFYHYhgRBECKKLK4f5fs3xshgmgLMUEqdobU+GCDDKGAUQPv27Y8tv5EsFguCIPiRr2lIKZWklHpCKTXK3G6slOoXwbW3AbVt2ynmPjtpwHitda7WehOwFkMxRA8xDQmCIPgRyRrBZ0AOcLa5vQ14PoLzFgCNlVL1lVLxGHUMxge0GYdZz0ApVRXDVBTdQjeyWCwIguBHJIqgodb6FczAMq11BhEMprXWeRjZSScB/wHfaa1XKqWeVUr1N5tNAvYppVYBU4GHtdb7CvEckeO3RhDVOwmCIJwQRGIszzFTTmsApVRDIDuSi2utJwATAvY9ZXuvgQfMv+LBk2szDYkmEARBiEQRDAcmArWVUl8DnYHroyhTdPG4ZbFYEATBRiReQ38qpRYBZ2KYhO7VWu+NumTRwp2Lx1IEMiEQBEGIqB7BrxiF68drrY9GX6QocnQfbP2HmiUthyAIwnFEJIvFrwJdgVVKqR+UUpeZxWpOPNK3+23KYrEgCEJkpqHpwHQzd9B5GGkhPgXKR1m2oic3y29T9IAgCEJkMwJMr6FLgduADsAX0RQqauQYhdWmNH+xhAURBEE4fohkjeA7jARyE4F3gelmVtITj2xDERxIbgi4JdeQIAgCkbmPfgIM0Vq7AZRSXZRSQ7TWd+Zz3vGHqQiyXWWBwyUriyAIwnFCJGsEk5RSbZRSQ4BBwCbgp6hLFg1yDKen3JgywGFZIxAEQSCMIlBKNQGGmH97gW8BpbXuXkyyFT1uo/yyVCgTBEHwEW5GsBqYCfTTWq8HUErdXyxSRQtPHgBuiSwWBEHwEs5r6BJgBzBVKfWRUqoHJ7rHpcecEZiKQHINCYIghFEEWutxWuvBwGkYmUHvA6orpd5XSl1QTPIVLR43AG4kDbUgCIJFvnEEWuujWutvtNYXYRSXWQL8X9QliwbuXFAxaHNxQNYIBEEQIgwos9BaH9Baj9Ja94iWQFHFkwsxcSUthSAIwnFFgRTBCY/HDTGx6GOreiwIgnBSEVVFoJTqpZRao5Rar5QaFqbdpUoprZRqH015cOeCy+cxJKYhQRCEKCoCM0ndSKA30BwYopRq7tCuHHAvMC9asnjx5IlpSBAEIYBozgg6Auu11hu11jnAWGCAQ7vngP8BWQ7HihZPLsTYZgTiPioIghBVRVAL2GrbTjP3eVFKtQVqa61/D3chpdRQpdRCpdTCPXv2FF4idx644tCySCAIguClxBaLlVIxwOvAg/m1NT2V2mut21erVq3wN/XkQYzLu1gsawSCIAjRVQTbgNq27RRzn0U54HRgmlIqFaMm8vioLhgHuI+KHhAEQYiuIlgANFZK1VdKxQODgfHWQa31Ia11Va11Pa11PeAfoL/WemHUJPKYpqGo3UAQBOHEI2qKQGudB9wFTAL+A77TWq9USj2rlOofrfuGxW2YhiykMI0gCEJkhWkKjdZ6AjAhYN9TIdp2i6YsgNc0JGvFgiAIPkpZZLFlGjI0gcwHBEEQSpsicOf5xxGIJhAEQShlisAMKBPTkCAIgo9SpggCZwQyJRAEQShdisCdK+6jgiAIAZQuRWCmoRbbkCAIgo9Spgh8SefEKiQIgmBQuhSBmIYEQRCCKF2KwDINITEEgiAIFqVMEYj7qCAIQiClTBH4IovFdVQQBMGgdCkCd66YhgRBEAIoXYrArFkspiFBEAQfUc0+etxhVijDI+6jwvFFbm4uaWlpZGVFv3S3cHKTmJhISkoKcXFx+Tc2KV2KwHIf9ZS0IILgT1paGuXKlaNevXqyfiUUGq01+/btIy0tjfr160d8XukxDWkN2u01DSlZJRCOI7KysqhSpYooAeGYUEpRpUqVAs8so6oIlFK9lFJrlFLrlVLDHI4/oJRapZT6Vyn1t1KqbtSE8eQZr1bSOfm9CccZogSEoqAw/0dRUwRKKRcwEugNNAeGKKWaBzRbArTXWrcEfgBeiZY8PkXg8hamEQRBEKI7I+gIrNdab9Ra5wBjgQH2BlrrqVrrDHPzHyAlatJYCwNmzWIZewmCIBhEUxHUArbattPMfaG4CfgjatJ43MarikEmBIIgCD6Oi8VipdTVQHtgRIjjQ5VSC5VSC/fs2VO4m2hLEbjQiPuoIASSmprK6aef7rdv+PDhvPrqqwDs3LmTwYMH07BhQ9q1a0efPn1Yu3YtAC6Xi9atW9OqVSvatm3LnDlzoibn1q1b6d69O82bN6dFixa89dZbUbtXaSGa7qPbgNq27RRznx9KqfOBx4FztdbZThfSWo8CRgG0b9++cON5K4rMaxoSTSAIkaK1ZuDAgVx33XWMHTsWgGXLlrFr1y6aNGlCmTJlWLp0KQCTJk3i0UcfZfr06VGRJTY2ltdee422bduSnp5Ou3bt6NmzJ82bBy5BCpESTUWwAGislKqPoQAGA1faGyil2gAfAr201rujKIufaUhLaLFwHPPMrytZtf1wkV6zec3yPH1Ri0KfP3XqVOLi4rjtttu8+1q1auXY9vDhw1SqVMnx2Pbt27n77rvZuHEjmZmZjB49mo4dOxZIlho1alCjRg0AypUrR7Nmzdi2bZsogmMgaopAa52nlLoLmAS4gE+11iuVUs8CC7XW4zFMQcnA96bL0xatdf/oCGRbI0BMQ4JQEFasWEG7du1CHs/MzKR169ZkZWWxY8cOpkyZEtQmLy+P3r1788ILL9CvXz8yMjJwu93e4127diU9PT3ovFdffZXzzz/f8b6pqaksWbKETp06FeKpBIuoRhZrrScAEwL2PWV77/ztRkUY02tIxUiuIeG45lhG7sdCKP/zSPzS7aahuXPncu2117JixQq/c8eNG0ezZs3o168fAElJSX7XmDlzZoHkPXLkCJdeeilvvvkm5cuXL9C5gj+lJ8WEZRoS91FBcKRKlSocOHDAb9/+/fupX78+KSkp/PDDDxFd56yzzmLv3r3s2bOH6tWre/cvXbqUM888M+R5BZkR5Obmcumll3LVVVdxySWXRCSXEJrjwmuoWPDOCFziPSoIDiQnJ1OjRg2vWWf//v1MnDiRLl26cN5555Gdnc2oUaO87f/991/HUfzq1atxu91UqVLFb/+pp57KypUrvduBHoAzZ85k6dKlQX+BSkBrzU033USzZs144IEHjvm5hVKlCOyLxRLOLwhOjB49mueee47WrVtz3nnn8fTTT9OwYUOUUvz8889MnjyZhg0b0qJFCx599FFOPfVUwLdG0Lp1a6644gq++OILXC6X37Wvv/56du3aRYsWLWjdujVz584tlIyzZ8/myy+/ZMqUKd57TpgwIf8ThZCUItOQRBYLQn40b96cqVOnOh6rWbMm3333neMx+6JvKJKTkxk/fvwxyQfQpUsX8fwrYkrRjMC2WCzGIUEQBC+lSBH4u4/KlEAQBMGgFCkCn2lIZpWCIAg+So8i8AQElJWgKIIgCMcTpUcR2JLOgXgNCYIgWJQiRWA3DYltSBAEwaL0KAKPz2sIJNeQIAiCRelRBPaAspKVRBAE4biiFCkCf68hmRAIQnQ4++yzve+Tk5NLUJKCYy/EU5xMnDiRpk2b0qhRI15++eWQ7W688UaqV68eVEDoWCk9isD0Grr2s4V8+c9msnI9JSyQIJycRLM6WTi01ng8J97v2u12c+edd/LHH3+watUqxowZw6pVqxzbXn/99UycOLHIZSg9KSbMGUFWnrGZmZt/SLwglAh/DIOdy4v2mqeeAb1DjzQtvvrqK95++21ycnLo1KkT7733Hlu3bqVXr160a9eOxYsX06JFC0aPHo3WmkGDBpGWlobb7ebJJ5/kiiuuIDk5mSNHjgRd+/XXX+fTTz8F4Oabb+a+++4jNTWV3r1706VLF+bMmUOtWrX45ZdfKFOmjN+5zz33HF999RXVqlWjdu3atGvXjoceeojU1FQuvPBCOnXqxKJFi5gwYQIzZ84MegaXy+X4bC6XixdeeIEvvviC6tWre68N8NRTT1G5cmXuu+8+AB5//HGqV6/Ovffe6yfbxIkTGTZsGAAJCQnMnTuXmJjIx9jz58+nUaNGNGjQAIDBgwfzyy+/OBbaOeecc0hNTY342pFSemYE5hqBR4xCguDIf//9x7fffsvs2bNZunQpLpeLr7/+GoA1a9Zwxx138N9//1G+fHnee+89Jk6cSM2aNVm2bBkrVqygV69eIa+9aNEiPvvsM+bNm8c///zDRx99xJIlSwBYt24dd955JytXrqRixYr8+OOPfucuWLCAH3/8kWXLlvHHH3+wcOFCv+Pr1q3jjjvuYOXKlWRkZDg+Q6hnW7RoEWPHjmXp0qVMmDCBBQsWeK974403Mnr0aAA8Hg9jx47l6quvDnq2u+++mz/++IOlS5cyb948PyXQtWtXb2I8+9/kyZO9bbZt20bt2r6qvikpKWzbFlTVN6pEdUaglOoFvIVRoexjrfXLAccTgNFAO2AfcIXWOjUqwphTRk8p0n3CCUoEI/do8Pfff7No0SI6dOgAGBlFq1evzjnnnEPt2rXp3LkzAFdffTVvv/02/fv358EHH+T//u//6NevH127dg157VmzZjFw4EDKli0LwCWXXMLMmTPp378/9evXp3Xr1gC0a9cuaMQ7e/ZsBgwYQGJiIomJiVx00UV+x+vWreutcxDqGQ4fPuy4f//+/QwcONBbJKd/f1+BxHr16lGlShWWLFnCrl27aNOmTVBqbYA+ffrQsmVLrrrqKt58802/YwUttlNSRE0RKKVcwEigJ5AGLFBKjdda241fNwEHtNaNlFKDgf8BV0RFINM05BZFIAiOaK257rrreOmll/z2p6amBgVgKqVo0qQJixcvZsKECTzxxBP06NGDp556ioKSkJDgfe9yucjMzCzQ+ZZyCfcM77zzjuP+wI47kJtvvpnPP/+cnTt3cuONNwYdnzNnDlprduzYQWxscHcaSbGdWrVqsXXrVu+xtLQ0atWqFVauoiaavWJHYL3WeqPWOgcYCwwIaDMA+MJ8/wPQQ0Up5Hf/EeOfy5oRvHlF62jcRhBOWHr06MEPP/zA7t27AaMwzebNmwHYsmWLt37AN998Q5cuXdi+fTtJSUlcffXVPPzwwyxevDjktbt27cq4cePIyMjg6NGj/Pzzz2FnEHY6d+7Mr7/+SlZWFkeOHOG3334r8DOE2n/OOecwbtw4MjMzSU9P59dff/W73sCBA5k4cSILFizgwgsvDLrf999/T5MmTYiNjUVrzeHDh/2OR1Jsp0OHDqxbt45NmzaRk5PD2LFj/WYmxUE0FUEtYKttO83c59hGa50HHAKC515FwMbdxhfkIYakeBcXtylejSsIxzvNmzfn+eef54ILLqBly5b07NmTHTt2ANC0aVNGjhxJs2bNOHDgALfffjvLly+nY8eOtG7dmmeeeYYnnngi5LXbtm3L9ddfT8eOHenUqRM333wzbdq0iUiuDh060L9/f1q2bEnv3r0544wzqFChQoGeIdT+tm3bcsUVV9CqVSt69+7tNR1ZxMfH0717dwYNGhRUaAdgyJAhfPjhh7Rs2ZIzzzyTdevWRfRMdmJjY3n33Xe58MILadasGYMGDaJFC1/d6j59+rB9+3bv/c466yzWrFlDSkoKn3zySYHv54jWOip/wGUY6wLW9jXAuwFtVgAptu0NQFWHaw0FFgIL69SpowvFyl+0frq87jVspF6Yuq9w1xCEKLFq1aqSFiEkmzZt0i1atChRGdLT07XWWh89elS3a9dOL1q0qFju63a7datWrfTatWuL5X5FhdP/E7BQh+ivozkj2AbUtm2nmPsc2yilYoEKGIvGfmitR2mt22ut21erVq1w0pheQ25iaFe3cuGuIQhCiTB06FBat25N27ZtufTSS2nbtm3U77lq1SoaNWpEjx49aNy4cdTvV5JE02toAdBYKVUfo8MfDFwZ0GY8cB0wF2MGMcXUXEVPuZocadiXD87uHpXLC8LJSr169VixYkWJyvDNN98U+z2bN2/Oxo0bi/2+JUHUFIHWOk8pdRcwCcN99FOt9Uql1LMYU5TxwCfAl0qp9cB+DGURHep0IvmabzixAt4FQRCiT1TjCLTWE4AJAfuesr3PAi6PpgyCIAhCeMSpXhCOE6JlFRVKF4X5PxJFIAjHAYmJiezbt0+UgXBMaK3Zt28fiYmJBTqv9CSdE4TjmJSUFNLS0tizZ09JiyKc4CQmJpKSklKgc0QRCMJxQFxcHPXr1y9pMYRSipiGBEEQSjmiCARBEEo5oggEQRBKOepE81JQSu0BNhfy9KrA3iIU50RAnrl0IM9cOjiWZ66rtXbM0XPCKYJjQSm1UGvdvqTlKE7kmUsH8sylg2g9s5iGBEEQSjmiCARBEEo5pU0RjCppAUoAeebSgTxz6SAqz1yq1ggEQRCEYErbjEAQBEEIQBSBIAhCKafUKAKlVC+l1Bql1Hql1LCSlqeoUErVVkpNVUqtUkqtVErda+6vrJT6Sym1znytZO5XSqm3zc/hX6VU9Gv+RQGllEsptUQp9Zu5XV8pNc98rm+VUvHm/gRze715vF6JCn4MKKUqKqV+UEqtVkr9p5Q662T+npVS95v/0yuUUmOUUokn4/eslPpUKbVbKbXCtq/A36tS6jqz/Tql1HUFkaFUKAKllAsYCfQGmgNDlFLNS1aqIiMPeFBr3Rw4E7jTfLZhwN9a68bA3+Y2GJ9BY/NvKPB+8YtcJNwL/Gfb/h/whta6EXAAuMncfxNwwNz/htnuROUtYKLW+jSgFcbzn5Tfs1KqFnAP0F5rfTpGlcPBnJzf8+dAr4B9BfpelVKVgaeBTkBH4GlLeUREqKr2J9MfcBYwybb9KPBoScsVpWf9BegJrAFqmPtqAGvM9x8CQ2ztve1OlD8gxfxxnAf8BiiMaMvYwO8bo1TqWeb7WLOdKulnKMQzVwA2Bcp+sn7PQC1gK1DZ/N5+Ay48Wb9noB6worDfKzAE+NC2369dfn+lYkaA75/KIs3cd1JhTofbAPOAU7TWO8xDO4FTzPcnw2fxJvAI4DG3qwAHtdZ55rb9mbzPax4/ZLY/0agP7AE+M01iHyulynKSfs9a623Aq8AWYAfG97aIk/97tijo93pM33dpUQQnPUqpZOBH4D6t9WH7MW0MEU4KP2GlVD9gt9Z6UUnLUszEAm2B97XWbYCj+MwFwEn3PVcCBmAowJpAWYLNJ6WC4vheS4si2AbUtm2nmPtOCpRScRhK4Gut9U/m7l1KqRrm8RrAbnP/if5ZdAb6K6VSgbEY5qG3gIpKKavQkv2ZvM9rHq8A7CtOgYuINCBNaz3P3P4BQzGcrN/z+cAmrfUerXUu8BPGd3+yf88WBf1ej+n7Li2KYAHQ2PQ4iMdYdBpfwjIVCUopBXwC/Ke1ft12aDxgeQ5ch7F2YO2/1vQ+OBM4ZJuCHvdorR/VWqdorethfI9TtNZXAVOBy8xmgc9rfQ6Xme1PuFGz1nonsFUp1dTc1QNYxUn6PWOYhM5USiWZ/+PW857U37ONgn6vk4ALlFKVzNnUBea+yCjpRZJiXIzpA6wFNgCPl7Q8RfhcXTCmjf8CS82/Phj20b+BdcBkoLLZXmF4UG0AlmN4ZZT4cxTy2bsBv5nvGwDzgfXA90CCuT/R3F5vHm9Q0nIfw/O2Bhaa3/U4oNLJ/D0DzwCrgRXAl0DCyfg9A2Mw1kFyMWZ+NxXmewVuNJ9/PXBDQWSQFBOCIAilnNJiGhIEQRBCIIpAEAShlCOKQBAEoZQjikAQBKGUI4pAEAShlCOKQBBCoJR63Mx++a9SaqlSqpNS6j6lVFJJyyYIRYm4jwqCA0qps4DXgW5a62ylVFUgHpiD4bu9t0QFFIQiRGYEguBMDWCv1jobwOz4L8PIezNVKTUVQCl1gVJqrlJqsVLqezPnE0qpVKXUK0qp5Uqp+UqpRub+y838+suUUjNK5tEEwR+ZEQiCA2aHPgtIwojs/FZrPd3McdRea73XnCX8BPTWWh9VSv0fRqTrs2a7j7TWLyilrgUGaa37KaWWA7201tuUUhW11gdL4vkEwY7MCATBAa31EaAdRvGPPcC3SqnrA5qdiVHoaLZSailGTpi6tuNjbK9nme9nA58rpW7BKLYiCCVObP5NBKF0orV2A9OAaeZIPrD8nwL+0loPCXWJwPda69uUUp2AvsAipVQ7rfWJnCVTOAmQGYEgOKCUaqqUamzb1RrYDKQD5cx9/wCdbfb/skqpJrZzrrC9zjXbNNRaz9NaP4Ux07CnDhaEEkFmBILgTDLwjlKqIkZd6PUYZqIhwESl1HatdXfTXDRGKZVgnvcERpZbgEpKqX+BbPM8gBGmglEY2SWXFcfDCEI4ZLFYEKKAfVG5pGURhPwQ05AgCEIpR2YEgiAIpRyZEQiCIJRyRBEIgiCUckQRCIIglHJEEQiCIJRyRBEIgiCUcv4f2OMDhU4KV8QAAAAASUVORK5CYII=
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
<h3 id="Gradient-Bandits-Algorithm">Gradient Bandits Algorithm<a class="anchor-link" href="#Gradient-Bandits-Algorithm">&#182;</a></h3><p><body></p>
<p><p>
soft-max distribution(i.e. Gibbs or Boltzmann distribution)<br>
[\text{Pr}{A_t=a} \doteq \displaystyle \frac{e^{H<em>t(a)}}{\sum</em>{b=1}^k e^{H_t(b)}} \doteq \pi_t(a)]
(H_t(a)\in\mathbb{R}): preference for each action, initially (H<em>1(a)=0)
Natural Learning algorithmm for soft-max action preferences based on the idea of the stochastic gradient ascent(↑). For update: 
[
H</em>{t+1}(A_t) \doteq H_t(A_t) + \alpha(R_t-\overline{R<em>t})(\mathbb{1}</em>{a=A_t}-\pi_t(A<em>t))
]
[
H</em>{t+1}(a) \doteq H_t(a) + \alpha(R_t-\overline{R_t})\pi_t(a)
]
where (\alpha&gt;0, \overline{R_t} = avr{R<em>1...R</em>{t-1}})<br>
(\overline{R_t}\Rightarrow) baseline, (R_t&gt;\overline{R_t}, P(A<em>t)) in the future increases, vice versa.
<br>
Conclusion: it is a stochastic approximation to gradient ascent:
[
H</em>{t+1}(a)\doteq H_t(a)+\alpha\frac{\partial \mathbb{E}[R_t]}{\partial H_t(a)},\text{ }\text{ }\text{ }\text{ }  \mathbb[E][R_t] = \sum_x\pi<em>t(x)q</em><em>(x)
]
update = gradient of (\mathbb{E}[R<em>t]\Rightarrow) stochastic gradient ascent (\Rightarrow) robust convergence.
<br>
<i>Proof:</i>
<br>
(\begin{aligned} \frac{\partial \mathbb{E}\left[R</em>{t}\right]}{\partial H<em>{t}(a)} &amp;=\frac{\partial}{\partial H</em>{t}(a)}\left[\sum<em>{b} \pi</em>{t}(b) q_{</em>}(b)\right] \ &amp;=\sum<em>{b} q</em>{<em>}(b) \frac{\partial \pi<em>{t}(b)}{\partial H</em>{t}(a)} \end{aligned})
<br>
Let (\forall X_t) and (b) are independent, then (\displaystyle \sum_b\frac{\partial\pi_t(b)}{\partial H<em>t(b)} = 0), so we have
<br>
(\begin{aligned}\frac{\partial \mathbb{E}\left[R</em>{t}\right]}{\partial H<em>{t}(a)} &amp;
=\sum</em>{b}\left(q_{</em>}(b)-X<em>{t}\right) \frac{\partial \pi</em>{t}(b)}{\partial H<em>{t}(a)} \
&amp;=\sum</em>{b} \pi<em>{t}(b)\left(q</em>{<em>}(b)-X<em>{t}\right) \frac{\partial \pi</em>{t}(b)}{\partial H<em>{t}(a)} / \pi</em>{t}(b) \
&amp;=\mathbb{E}\left[\left(q_{</em>}\left(A<em>{t}\right)-X</em>{t}\right) \frac{\partial \pi<em>{t}\left(A</em>{t}\right)}{\partial H<em>{t}(a)} / \pi</em>{t}\left(A_{t}\right)\right]
\end{aligned})
<br><br>
given (A_t, \mathbb{E}[R_t|A<em>t] = q</em>*(A_t) = R_t), and let arbitary (X_t) be (\overline{R<em>t}) then:
<br><br>
(\displaystyle
\frac{\partial \mathbb{E}\left[R</em>{t}\right]}{\partial H_{t}(a)} = \mathbb{E}\left[\left(R_t)-\overline{R<em>t}\right) \frac{\partial \pi</em>{t}\left(A<em>{t}\right)}{\partial H</em>{t}(a)} / \pi<em>{t}\left(A</em>{t}\right)\right]
)
<br><br>
Next,
<br><br>
(\begin{aligned}
\frac{\partial \pi_{t}(b)}{\partial H_{t}(a)} &amp;=\frac{\partial}{\partial H_{t}(a)} \pi_{t}(b) \\
&amp;=\frac{\partial}{\partial H_{t}(a)}\left[\frac{e^{H_{t}(b)}}{\sum_{c=1}^{k} e^{H_{t}(c)}}\right] \\
&amp;=\frac{\frac{\partial e^{H_{t}(b)}}{\partial H_{t}(a)} \sum_{c=1}^{k} e^{H_{t}(c)}-e^{H_{t}(b)} \frac{\partial \sum_{c=1}^{k} e^{H_{t}(c)}}{\partial H_{t}(a)}}{\left(\sum_{c=1}^{k} e^{H_{t}(c)}\right)^{2}} \\
&amp;=\frac{\mathbb{1}_{a=b} e^{H_{t}(a)} \sum_{c=1}^{k} e_{t}^{H}(c)-e^{H_{t}(b)} e^{H_{t}(a)}}{\left(\sum_{c=1}^{k} e^{H_{t}(c)}\right)^{2}} \\
&amp;=\frac{\mathbb{1}_{a=b} e^{H_{t}(b)}}{\sum_{c=1}^{k} e^{H_{t}(c)}}-\frac{e^{H_{t}(b)} e^{H_{t}(a)}}{\left(\sum_{c=1}^{k} e^{H_{t}(c)}\right)^{2}} \\
&amp;=\mathbb{1}_{a=b} \pi_{t}(b)-\pi_{t}(b){\pi}_{t}(a) \\
&amp;=\pi_{t}(b)\left(\mathbb{1}_{a=b}-\pi_{t}(a)\right)
\end{aligned})
<br><br>
Therefore,
<br><br>
(
\begin{aligned}
\frac{\partial \mathbb{E}\left[R_{t}\right]}{\partial H_{t}(a)} &amp;=\mathbb{E}\left[\left(R_{t}-\overline{R}_{t}\right) \frac{\partial \pi_{t}\left(A_{t}\right)}{\partial H_{t}(a)} / \pi_{t}\left(A_{t}\right)\right] \\
&amp;=\mathbb{E}\left[\left(R_{t}-\overline{R}_{t}\right) \pi_{t}\left(A_{t}\right)\left(\mathbf{1}_{a=A_{t}}-\pi_{t}(a)\right) / \pi_{t}\left(A_{t}\right)\right] \\
&amp;=\mathbb{E}\left[\left(R_{t}-\overline{R}_{t}\right)\left(\mathbf{1}_{a=A_{t}}-\pi_{t}(a)\right)\right]
\end{aligned}
)
<br><br>
which is corresponding with the equation for the gradient ascent.</p>

</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="prompt input_prompt">In&nbsp;[5]:</div>
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
<pre>100%|██████████| 1000/1000 [00:41&lt;00:00, 23.86it/s]
100%|██████████| 1000/1000 [00:41&lt;00:00, 23.88it/s]
100%|██████████| 1000/1000 [00:40&lt;00:00, 24.86it/s]
100%|██████████| 1000/1000 [00:40&lt;00:00, 24.90it/s]
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
<div class="prompt input_prompt">In&nbsp;[&nbsp;]:</div>
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
<pre> 83%|████████▎ | 830/1000 [00:20&lt;00:04, 38.63it/s]</pre>
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

 


</html>
