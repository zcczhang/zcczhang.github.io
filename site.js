(function () {
  "use strict";

  function onMqChange(mq, fn) {
    if (!mq) return;
    if (mq.addEventListener) mq.addEventListener("change", fn);
    else if (mq.addListener) mq.addListener(fn);
  }

  var reducedMotion = false;
  try {
    reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (_) {}

  function isCoarseDevice() {
    try {
      if (window.matchMedia("(pointer: coarse)").matches) return true;
      if (window.matchMedia("(hover: none) and (max-width: 820px)").matches) return true;
    } catch (_) {}
    return navigator.maxTouchPoints > 0 && window.innerWidth < 820;
  }

  var coarseDevice = isCoarseDevice();

  /* ------------------------------------------------------------------ */
  /* Theme                                                                */
  /* ------------------------------------------------------------------ */
  var root = document.documentElement;
  var themeBtn = document.getElementById("theme-toggle");

  function storedTheme() {
    try { return localStorage.getItem("theme"); } catch (_) { return null; }
  }

  function applyTheme(theme, persist) {
    root.setAttribute("data-theme", theme);
    if (themeBtn) {
      themeBtn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      themeBtn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
      var label = themeBtn.querySelector(".theme-label");
      if (label) label.textContent = theme === "dark" ? "DARK" : "LIGHT";
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0c1017" : "#f7f8fa");
    if (persist) {
      try { localStorage.setItem("theme", theme); } catch (_) {}
    }
    if (window.__field) window.__field.syncColors();
  }

  applyTheme(storedTheme() || "light", false);

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next, true);
    });
  }

  try {
    onMqChange(window.matchMedia("(prefers-color-scheme: dark)"), function (e) {
      if (!storedTheme()) applyTheme(e.matches ? "dark" : "light", false);
    });
  } catch (_) {}

  /* ------------------------------------------------------------------ */
  /* Smooth cursor-following mobile robot                                 */
  /* ------------------------------------------------------------------ */
  function wrapAngle(a) {
    while (a > Math.PI) a -= Math.PI * 2;
    while (a < -Math.PI) a += Math.PI * 2;
    return a;
  }

  function roundedRect(ctx, x, y, w, h, r) {
    var rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  }

  function viewport() {
    return { w: window.innerWidth, h: window.innerHeight };
  }

  function RobotGuide(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: true });
    this.coarse = coarseDevice;
    this.dpr = Math.min(window.devicePixelRatio || 1, this.coarse ? 1.25 : 2);
    this.t = 0;
    this.steps = 0;
    this.running = false;
    this.enabled = true;
    this.lastTs = 0;
    this.pointer = { x: 0, y: 0, active: false, coarse: this.coarse };
    this.goal = { x: 0, y: 0 };
    this.bot = { x: 0, y: 0, heading: -0.5, speed: 0, wheel: 0, face: 1, pitch: 0, pitchVel: 0, prevSpeed: 0, accel: 0, stride: 0, amp: 0, bank: 0 };
    this.trail = [];
    this.touchStart = null;
    this.tiltBound = false;
    this.tiltHandler = null;
    this.syncColors();
    this.resize();
    this.bot.x = this.w * 0.18;
    this.bot.y = this.h * 0.78;
    this.goal.x = this.w * 0.62;
    this.goal.y = this.h * 0.28;
    this.bind();
  }

  RobotGuide.prototype.syncColors = function () {
    var s = getComputedStyle(document.documentElement);
    this.colBot = (s.getPropertyValue("--canvas-agent") || "#1772d0").trim();
    this.colTrail = (s.getPropertyValue("--canvas-trail") || "rgba(23,114,208,0.28)").trim();
    this.colGoal = (s.getPropertyValue("--canvas-goal") || "rgba(167,35,211,0.75)").trim();
    this.colCone = (s.getPropertyValue("--canvas-cone") || "rgba(23,114,208,0.14)").trim();
    this.colWheel = (s.getPropertyValue("--canvas-wheel") || "#1a1c1f").trim();
    this.colBody = (s.getPropertyValue("--canvas-body") || "#f4f7fb").trim();
  };

  RobotGuide.prototype.resize = function () {
    var v = viewport();
    var sx = this.w ? v.w / this.w : 1;
    var sy = this.h ? v.h / this.h : 1;
    this.w = v.w;
    this.h = v.h;
    this.bot.x *= sx;
    this.bot.y *= sy;
    this.goal.x *= sx;
    this.goal.y *= sy;
    this.canvas.width = Math.floor(v.w * this.dpr);
    this.canvas.height = Math.floor(v.h * this.dpr);
    this.canvas.style.width = v.w + "px";
    this.canvas.style.height = v.h + "px";
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.scale = v.w < 700 ? 0.82 : 1;
  };

  RobotGuide.prototype.setPointer = function (clientX, clientY, active) {
    this.pointer.x = clientX;
    this.pointer.y = clientY;
    this.pointer.active = active;
    if (active) {
      this.goal.x = clientX;
      this.goal.y = clientY;
    }
  };

  RobotGuide.prototype.enableTilt = function (done) {
    var self = this;
    if (this.tiltBound) {
      if (done) done(true);
      return;
    }
    this.tiltHandler = function (e) {
      if (!self.running || !self.enabled) return;
      var gamma = e.gamma;
      var beta = e.beta;
      if (gamma == null || beta == null) return;
      var gx = gamma / 28;
      var gy = (beta - 55) / 32;
      if (gx > 1) gx = 1;
      if (gx < -1) gx = -1;
      if (gy > 1) gy = 1;
      if (gy < -1) gy = -1;
      self.setPointer(self.w * (0.5 + gx * 0.4), self.h * (0.48 + gy * 0.32), true);
    };
    function bind() {
      window.addEventListener("deviceorientation", self.tiltHandler, true);
      self.tiltBound = true;
      if (done) done(true);
    }
    if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
      DeviceOrientationEvent.requestPermission().then(function (state) {
        if (state === "granted") bind();
        else if (done) done(false);
      }).catch(function () {
        if (done) done(false);
      });
    } else if (typeof DeviceOrientationEvent !== "undefined") {
      bind();
    } else if (done) {
      done(false);
    }
  };

  RobotGuide.prototype.disableTilt = function () {
    if (this.tiltHandler) {
      window.removeEventListener("deviceorientation", this.tiltHandler, true);
    }
    this.tiltBound = false;
    this.tiltHandler = null;
    this.pointer.active = false;
  };

  RobotGuide.prototype.bind = function () {
    var self = this;

    if (!this.coarse) {
      window.addEventListener("mousemove", function (e) {
        self.pointer.coarse = false;
        self.setPointer(e.clientX, e.clientY, true);
      }, { passive: true });

      window.addEventListener("mouseleave", function () {
        self.pointer.active = false;
      });
    }

    function onResize() {
      self.dpr = Math.min(window.devicePixelRatio || 1, self.coarse ? 1.25 : 2);
      self.resize();
    }
    window.addEventListener("resize", onResize);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) self.running = false;
      else if (self.enabled) self.start();
    });
  };

  RobotGuide.prototype.setGoalFromElement = function (el) {
    var r = el.getBoundingClientRect();
    this.goal.x = r.left + Math.min(40, r.width * 0.12);
    this.goal.y = r.top + r.height * 0.45;
    this.pointer.active = false;
  };

  RobotGuide.prototype.steer = function (dt) {
    var s = Math.min(2.2, dt / 16.67);
    var bot = this.bot;

    if (!this.pointer.active) {
      var wander = this.t * 0.00022;
      this.goal.x = this.w * (0.5 + 0.34 * Math.cos(wander));
      this.goal.y = this.h * (0.42 + 0.22 * Math.sin(wander * 0.85));
    }

    var dx = this.goal.x - bot.x;
    var dy = this.goal.y - bot.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    var desired = Math.atan2(dy, dx);
    var err = wrapAngle(desired - bot.heading);
    var maxTurn = 0.062 * s;
    if (err > maxTurn) err = maxTurn;
    if (err < -maxTurn) err = -maxTurn;
    bot.heading = wrapAngle(bot.heading + err);
    bot.bank += (err * 1.6 - bot.bank) * 0.08 * s;

    var align = Math.max(0, Math.cos(wrapAngle(desired - bot.heading)));
    var targetSpeed = dist < 22 ? dist * 0.04 : 2.15 * align + 0.35;
    if (dist < 8) targetSpeed = 0;
    var catchUp = targetSpeed < bot.speed ? 0.1 : 0.055;
    bot.speed += (targetSpeed - bot.speed) * catchUp * s;
    if (bot.speed < 0) bot.speed = 0;

    bot.x += Math.cos(bot.heading) * bot.speed * s * 3.1;
    bot.y += Math.sin(bot.heading) * bot.speed * s * 3.1;
    var wheelR = 2.55 * (this.scale * 1.18);
    bot.wheel += wheelR > 0.5 ? (bot.speed * s * 3.1) / wheelR : 0;
    if (Math.abs(Math.cos(bot.heading)) > 0.18) {
      bot.face = Math.cos(bot.heading) >= 0 ? 1 : -1;
    }

    var dtSec = Math.max(dt / 1000, 0.008);
    var instA = (bot.speed - bot.prevSpeed) / dtSec;
    bot.prevSpeed = bot.speed;
    bot.accel += (instA - bot.accel) * Math.min(1, 6 * dtSec);
    var a = Math.abs(bot.accel) < 1.4 ? 0 : bot.accel;
    var gate = (bot.speed * bot.speed) / (bot.speed * bot.speed + 1.4);
    var wantPitch = -a * 0.0055 * gate;
    if (wantPitch > 0.09) wantPitch = 0.09;
    if (wantPitch < -0.06) wantPitch = -0.06;
    var omega = 5.5;
    bot.pitchVel += ((wantPitch - bot.pitch) * omega * omega - 2 * omega * bot.pitchVel) * dtSec;
    bot.pitch += bot.pitchVel * dtSec;
    if (bot.pitch > 0.1) bot.pitch = 0.1;
    if (bot.pitch < -0.07) bot.pitch = -0.07;

    var wantAmp = bot.speed > 1.7 ? Math.min(1, (bot.speed - 1.65) / 0.65) : 0;
    bot.amp += (wantAmp - bot.amp) * 0.1 * s;
    if (bot.amp > 0.04) bot.stride += bot.speed * s * 0.09;

    var m = 22;
    if (bot.x < m) bot.x = m;
    if (bot.y < m) bot.y = m;
    if (bot.x > this.w - m) bot.x = this.w - m;
    if (bot.y > this.h - m) bot.y = this.h - m;

    this.steps += 1;
    if (this.trail.length === 0 || dist > 1.2) {
      this.trail.push({ x: bot.x, y: bot.y });
      if (this.trail.length > 48) this.trail.shift();
    }
  };

  RobotGuide.prototype.drawTrail = function () {
    var trail = this.trail;
    if (trail.length < 3) return;
    var ctx = this.ctx;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = this.colTrail;
    ctx.lineWidth = 2.2 * this.scale;
    ctx.globalAlpha = 0.55;
    ctx.beginPath();
    ctx.moveTo(trail[0].x, trail[0].y);
    var i;
    for (i = 1; i < trail.length - 1; i++) {
      var midX = (trail[i].x + trail[i + 1].x) / 2;
      var midY = (trail[i].y + trail[i + 1].y) / 2;
      ctx.quadraticCurveTo(trail[i].x, trail[i].y, midX, midY);
    }
    var last = trail[trail.length - 1];
    ctx.lineTo(last.x, last.y);
    ctx.stroke();
    ctx.globalAlpha = 1;
  };

  RobotGuide.prototype.drawWaypoint = function () {
    var ctx = this.ctx;
    var g = this.goal;
    ctx.save();
    ctx.translate(g.x, g.y);
    ctx.strokeStyle = this.colGoal;
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.75;
    ctx.beginPath();
    ctx.moveTo(-8, 0);
    ctx.lineTo(8, 0);
    ctx.moveTo(0, -8);
    ctx.lineTo(0, 8);
    ctx.stroke();
    ctx.restore();
    ctx.globalAlpha = 1;
  };

  RobotGuide.prototype.drawLimb = function (ctx, x1, y1, x2, y2, x3, y3, width) {
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x1, y1, width * 0.55, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x2, y2, width * 0.45, 0, Math.PI * 2);
    ctx.fill();
  };

  RobotGuide.prototype.drawWheel = function (ctx, x, y, r, ang, squash) {
    squash = squash == null ? 1 : Math.max(0.16, squash);
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(squash, 1);
    ctx.fillStyle = this.colWheel;
    ctx.strokeStyle = this.colBot;
    ctx.lineWidth = 0.85 / squash;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.55, 0, Math.PI * 2);
    ctx.fillStyle = this.colBody;
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = "#5ec8f0";
    ctx.arc(0, 0, r * 0.22, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = this.colWheel;
    ctx.lineWidth = Math.max(0.6, r * 0.2);
    ctx.beginPath();
    ctx.moveTo(Math.cos(ang) * r * 0.78, Math.sin(ang) * r * 0.78);
    ctx.lineTo(-Math.cos(ang) * r * 0.78, -Math.sin(ang) * r * 0.78);
    ctx.stroke();
    ctx.restore();
  };

  RobotGuide.prototype.drawRobot = function () {
    var ctx = this.ctx;
    var bot = this.bot;
    var k = this.scale * 1.18;
    var heading = bot.heading;
    var front = Math.abs(Math.sin(heading));
    var side = Math.abs(Math.cos(heading));
    var coming = Math.sin(heading);
    var pitch = bot.pitch;
    var amp = bot.amp;
    var stride = bot.stride;
    var squash = 0.22 + 0.78 * side;
    var hx = 2.6 + 5.2 * front;
    var hz = 7.8 * side;
    var sway = Math.sin(stride) * amp * 2.15;
    var crouch = amp * 0.35;
    var bob = Math.max(0, -Math.sin(stride)) * amp * 0.7;

    function proj(x, yUp, z) {
      var hipY = 13.2;
      var dy = yUp - hipY;
      z += dy * pitch;
      x += yUp * bot.bank * 0.08;
      return {
        x: x * (0.3 + 0.7 * front) + z * side,
        y: -yUp + z * 0.08 * front + x * 0.06 * coming,
        d: z * coming + x * 0.35
      };
    }

    function limb(a, b, c, w) {
      var pa = proj(a[0], a[1], a[2]);
      var pb = proj(b[0], b[1], b[2]);
      var pc = proj(c[0], c[1], c[2]);
      ctx.strokeStyle = this.colBot;
      ctx.fillStyle = this.colBot;
      this.drawLimb(ctx, pa.x, pa.y, pb.x, pb.y, pc.x, pc.y, w);
    }

    function skate(phase, sideSign) {
      var sn = Math.sin(phase);
      var push = Math.max(0, -sn) * amp;
      var rec = Math.max(0, sn);
      rec = rec * rec * (3 - 2 * rec) * amp;
      var recY = rec * 2.5 - crouch * 0.12;
      var stance = sideSign * hx * 0.5 + sway;
      var az = -push * 8.4 + rec * 3.4;
      return {
        hip: [stance, 13.1 - crouch, sideSign * hz * 0.08],
        knee: [
          stance,
          7.3 - crouch + rec * 1.4 + push * 0.5,
          -push * 4.4 + rec * 1.6
        ],
        ankle: [stance, 5.55 + recY, az],
        wheel: [stance, 2.55 + recY, az]
      };
    }

    ctx.save();
    ctx.translate(bot.x, bot.y + 1.4 * k + bob * k);
    ctx.scale(bot.face * k * (1 + coming * 0.05), k * (1 + coming * 0.03));

    var L = skate(stride, -1);
    var R = skate(stride + Math.PI, 1);
    var arm = Math.sin(stride) * amp;
    var lSh = [-5.4 - 1.4 * front, 28.5 - crouch, 0];
    var rSh = [5.4 + 1.4 * front, 28.5 - crouch, 0];
    var lElb = [-7.1, 20.5 - crouch, 0.4 - arm * 2.5];
    var rElb = [7.1, 20.5 - crouch, 0.4 + arm * 2.5];
    var lHand = [-8.4 - 1.5 * front, 13.5 - crouch * 0.3, 0.6 - arm * 6];
    var rHand = [8.4 + 1.5 * front, 13.5 - crouch * 0.3, 0.6 + arm * 6];

    var lW = proj(L.wheel[0], L.wheel[1], L.wheel[2]);
    var rW = proj(R.wheel[0], R.wheel[1], R.wheel[2]);
    var wr = 2.55;

    var drawLeg = function (pose) {
      limb.call(this, pose.hip, pose.knee, pose.ankle, 2.45);
      var pw = proj(pose.wheel[0], pose.wheel[1], pose.wheel[2]);
      var boot = proj(pose.ankle[0], pose.ankle[1], pose.ankle[2]);
      var lifted = Math.max(0, pose.wheel[1] - 2.6);

      ctx.save();
      ctx.translate(pw.x, pw.y + wr + 0.35);
      ctx.scale(1.05, 0.24);
      ctx.beginPath();
      ctx.arc(0, 0, 4.2, 0, Math.PI * 2);
      ctx.fillStyle = lifted > 0.8 ? "rgba(0,0,0,0.03)" : "rgba(0,0,0,0.10)";
      ctx.fill();
      ctx.restore();

      this.drawWheel(ctx, pw.x, pw.y, wr * (pw.d > 0 ? 1.05 : 0.95), bot.wheel, squash);

      var bw = 2.15 + 1.35 * front;
      ctx.fillStyle = this.colBot;
      roundedRect(ctx, boot.x - bw / 2, boot.y - 0.2, bw, 2.4, 0.85);
      ctx.fill();
    }.bind(this);

    var leftFar = lW.d < rW.d;
    if (leftFar) {
      limb.call(this, lSh, lElb, lHand, 2.9);
      drawLeg(L);
    } else {
      limb.call(this, rSh, rElb, rHand, 2.9);
      drawLeg(R);
    }

    var shoulders = proj(sway * 0.15, 28.4 - crouch, 0);
    var pelvis = proj(sway * 0.3, 14.2 - crouch, 0);
    var tw = 8.1 + 7.4 * front;
    var torsoH = Math.max(10, pelvis.y - shoulders.y);
    ctx.fillStyle = this.colBody;
    ctx.strokeStyle = this.colBot;
    ctx.lineWidth = 1.6;
    roundedRect(ctx, shoulders.x - tw / 2, shoulders.y, tw, torsoH, 5);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = this.colBot;
    roundedRect(ctx, pelvis.x - tw * 0.36, pelvis.y - 3.5, tw * 0.72, 6.5, 2.4);
    ctx.fill();
    roundedRect(ctx, shoulders.x - 2.9, shoulders.y + torsoH * 0.38, 5.8, 6.2, 2);
    ctx.fill();

    var neck = proj(sway * 0.1, 31.4 - crouch, 0);
    ctx.fillStyle = this.colBot;
    roundedRect(ctx, neck.x - 1.45, neck.y - 1.4, 2.9, 4.0, 1.15);
    ctx.fill();

    var hp = proj(sway * 0.05, 34.8 - crouch * 0.15, 0.25);
    var hx = hp.x;
    var hy = hp.y;
    var hw = 5.2 + 2.5 * front;
    var hh = 4.85;

    ctx.save();
    ctx.translate(hx, hy + 0.2);
    ctx.scale(hw / 10.4, hh / 10.4);
    ctx.beginPath();
    ctx.arc(0, 0.2, 5.15, 0, Math.PI * 2);
    ctx.fillStyle = this.colBody;
    ctx.fill();
    ctx.lineWidth = 1.35;
    ctx.strokeStyle = this.colBot;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, -1.45, 3.55, Math.PI * 1.12, Math.PI * 1.88);
    ctx.strokeStyle = this.colBot;
    ctx.lineWidth = 1.05;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(-1.4, -1.8, 2.4, Math.PI * 1.15, Math.PI * 1.55);
    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.lineWidth = 0.7;
    ctx.stroke();
    ctx.restore();

    if (front > 0.38) {
      ctx.fillStyle = this.colBot;
      ctx.beginPath();
      ctx.arc(hx - hw * 0.5, hy + 0.35, 1.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(hx + hw * 0.5, hy + 0.35, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }

    var visorW = 3.3 + 4.5 * front;
    var visorX = hx + 0.8 * side;
    var visorY = hy + 0.4;
    ctx.fillStyle = "#0a1622";
    roundedRect(ctx, visorX - visorW / 2, visorY - 1.4, visorW, 2.8, 1.4);
    ctx.fill();
    ctx.fillStyle = "rgba(125, 211, 252, 0.3)";
    roundedRect(ctx, visorX - visorW / 2 + 0.32, visorY - 0.9, visorW - 0.64, 1.8, 0.95);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.22)";
    roundedRect(ctx, visorX - visorW / 2 + 0.55, visorY - 1.05, visorW - 1.4, 0.45, 0.22);
    ctx.fill();

    function cameraEye(ex, ey, r) {
      ctx.beginPath();
      ctx.fillStyle = "#05080c";
      ctx.arc(ex, ey, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.strokeStyle = this.colBot;
      ctx.lineWidth = 0.9;
      ctx.arc(ex, ey, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.fillStyle = "#3ec6ff";
      ctx.arc(ex + 0.12 * r, ey, r * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = "#dff6ff";
      ctx.arc(ex - 0.28 * r, ey - 0.3 * r, r * 0.2, 0, Math.PI * 2);
      ctx.fill();
    }

    if (front > 0.25) {
      var spread = 1.05 + 1.1 * front;
      cameraEye.call(this, hx - spread, visorY, 1.0);
      cameraEye.call(this, hx + spread, visorY, 1.0);
    } else {
      cameraEye.call(this, hx + 1.5, visorY, 1.1);
    }

    var glow = ctx.createRadialGradient(visorX + 1.2 * side, visorY, 0.5, visorX + 5 * side, visorY, 9);
    glow.addColorStop(0, "rgba(125, 211, 252, 0.16)");
    glow.addColorStop(1, "rgba(125, 211, 252, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(visorX + 2 * side, visorY, 8, 0, Math.PI * 2);
    ctx.fill();

    if (leftFar) {
      limb.call(this, rSh, rElb, rHand, 3.1);
      drawLeg(R);
    } else {
      limb.call(this, lSh, lElb, lHand, 3.1);
      drawLeg(L);
    }

    ctx.restore();
  };

  RobotGuide.prototype.draw = function () {
    var ctx = this.ctx;
    ctx.clearRect(0, 0, this.w, this.h);
    this.drawTrail();
    if (this.pointer.active) this.drawWaypoint();
    this.drawRobot();
    this.updateHud();
  };

  RobotGuide.prototype.updateHud = function () {
    var el = document.getElementById("field-hud");
    if (!el) return;
    var bot = this.bot;
    el.textContent =
      "nav  x " + (bot.x / this.w).toFixed(2) +
      "  y " + (bot.y / this.h).toFixed(2) +
      "  ·  v " + bot.speed.toFixed(2);
  };

  RobotGuide.prototype.tick = function (ts) {
    if (!this.running) return;
    var dt = Math.min(32, ts - (this.lastTs || ts));
    this.lastTs = ts;
    this.t += dt;
    this.steer(dt);
    this.draw();
    requestAnimationFrame(this.tick.bind(this));
  };

  RobotGuide.prototype.start = function () {
    if (this.running || this.enabled === false) return;
    this.running = true;
    this.lastTs = 0;
    this.canvas.style.display = "";
    requestAnimationFrame(this.tick.bind(this));
  };

  RobotGuide.prototype.stop = function () {
    this.running = false;
    this.ctx.clearRect(0, 0, this.w, this.h);
    var hud = document.getElementById("field-hud");
    if (hud) hud.textContent = "";
  };

  RobotGuide.prototype.setEnabled = function (on) {
    this.enabled = !!on;
    if (on) this.start();
    else {
      this.disableTilt();
      this.stop();
    }
  };

  RobotGuide.prototype.freeze = function () {
    this.draw();
  };

  /* ------------------------------------------------------------------ */
  /* Publications                                                         */
  /* ------------------------------------------------------------------ */
  function each(list, fn) {
    var i;
    for (i = 0; i < list.length; i++) fn(list[i], i);
  }

  function setPubs(mode) {
    each(document.querySelectorAll(".hiddenPubs"), function (el) {
      if (mode === "all") el.classList.add("is-shown");
      else el.classList.remove("is-shown");
    });
    var sel = document.getElementById("sel_pub_button");
    var all = document.getElementById("all_pub_button");
    if (sel) {
      if (mode === "highlighted") sel.classList.add("toggled");
      else sel.classList.remove("toggled");
    }
    if (all) {
      if (mode === "all") all.classList.add("toggled");
      else all.classList.remove("toggled");
    }
    if (mode === "all") {
      each(document.querySelectorAll(".hiddenPubs img[data-src]"), function (img) {
        img.src = img.getAttribute("data-src");
        img.removeAttribute("data-src");
      });
    }
  }

  window.pubs_off = function () { setPubs("highlighted"); };
  window.pubs_on = function () { setPubs("all"); };

  window.toggleDescription = function (id) {
    var desc = document.getElementById("toggleDescription" + id);
    var btn = document.querySelector('[data-desc="' + id + '"]');
    if (!desc) return;
    var on = !desc.classList.contains("is-open");
    if (on) desc.classList.add("is-open");
    else desc.classList.remove("is-open");
    if (btn) btn.setAttribute("aria-expanded", on ? "true" : "false");
  };

  function bindPaperHover() {
    var canHover = true;
    try { canHover = window.matchMedia("(hover: hover)").matches; } catch (_) {}
    each(document.querySelectorAll(".paper"), function (card) {
      var name = card.getAttribute("data-name");
      var img = document.getElementById(name + "_image");
      var gif = document.getElementById(name + "_gif");
      if (!gif) return;
      if (!canHover || !img) return;
      var start = function () {
        var src = img.getAttribute("data-gif");
        if (src && !img.querySelector("img")) {
          var el = document.createElement("img");
          el.className = "paper_img";
          el.alt = "";
          el.decoding = "async";
          el.src = src;
          img.appendChild(el);
        }
        img.style.opacity = "1";
        gif.style.opacity = "0";
      };
      var stop = function () {
        img.style.opacity = "0";
        gif.style.opacity = "1";
      };
      card.addEventListener("mouseenter", start);
      card.addEventListener("mouseleave", stop);
      card.addEventListener("focusin", start);
      card.addEventListener("focusout", stop);
      card.addEventListener("mouseenter", function () {
        if (window.__field) window.__field.setGoalFromElement(card);
      });
    });
  }

  function renderPapers() {
    var target = document.getElementById("mustache_target");
    var tplEl = document.getElementById("template");
    if (!target || !tplEl || typeof Handlebars === "undefined" || typeof jsyaml === "undefined") {
      if (target) target.textContent = "Could not load publications.";
      return;
    }
    var done = function (data) {
      try {
        var papers = jsyaml.load(data);
        var rendered = Handlebars.compile(tplEl.innerHTML)(papers);
        target.innerHTML = rendered;
        setPubs("highlighted");
        bindPaperHover();
      } catch (err) {
        target.textContent = "Could not load publications.";
      }
    };
    if (window.fetch) {
      fetch("./papers.yaml").then(function (res) { return res.text(); }).then(done).catch(function () {
        target.textContent = "Could not load publications.";
      });
    } else {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "./papers.yaml");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) done(xhr.responseText);
      };
      xhr.send();
    }
  }

  /* ------------------------------------------------------------------ */
  /* WeChat modal                                                         */
  /* ------------------------------------------------------------------ */
  function bindModal() {
    var modal = document.getElementById("popup-img");
    var img = document.getElementById("myImg");
    var modalImg = document.getElementById("img01");
    var close = modal && modal.querySelector(".close");
    if (!modal || !img || !modalImg) return;
    function show() {
      modal.classList.add("is-open");
      modalImg.src = "images/Wechat.jpeg";
    }
    img.addEventListener("click", show);
    img.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        show();
      }
    });
    function hide() { modal.classList.remove("is-open"); }
    if (close) close.addEventListener("click", hide);
    modal.addEventListener("click", function (e) { if (e.target === modal) hide(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") hide();
    });
  }

  try {
    console.log(
      "%cπθ  %cZichen \"Charles\" Zhang%c  ·  vision × learning × robotics\n%csource: github.com/zcczhang/zcczhang.github.io\n%cA navigator is just a policy that has not stopped yet.",
      "color:#1772d0;font-size:18px;font-weight:700;font-family:ui-monospace,monospace;",
      "color:#1772d0;font-size:13px;font-weight:700;font-family:ui-monospace,monospace;",
      "color:#6b7280;font-size:12px;font-family:ui-monospace,monospace;",
      "color:#6b7280;font-size:11px;font-family:ui-monospace,monospace;",
      "color:#9aa3b2;font-size:11px;font-style:italic;font-family:ui-monospace,monospace;"
    );
  } catch (_) {}

  bindModal();
  renderPapers();

  var robotBtn = document.getElementById("robot-toggle");

  function storedRobot() {
    try { return localStorage.getItem(coarseDevice ? "robot-mobile" : "robot"); } catch (_) { return null; }
  }

  function ensureField() {
    if (window.__field) return window.__field;
    var canvas = document.getElementById("field");
    if (!canvas) return null;
    window.__field = new RobotGuide(canvas);
    return window.__field;
  }

  function applyRobot(on, persist) {
    if (robotBtn) {
      robotBtn.setAttribute("aria-pressed", on ? "true" : "false");
      robotBtn.setAttribute("aria-label", on
        ? (coarseDevice ? "Disable tilt-steered robot" : "Disable following robot")
        : (coarseDevice ? "Enable tilt-steered robot" : "Enable following robot"));
      var label = robotBtn.querySelector(".robot-label");
      if (label) label.textContent = on ? "BOT ON" : "BOT OFF";
    }
    if (on) {
      var field = ensureField();
      if (!field) return;
      if (coarseDevice) {
        field.enableTilt(function (ok) {
          if (!ok) {
            applyRobot(false, true);
            return;
          }
          document.body.classList.remove("robot-off");
          field.setEnabled(true);
        });
      } else {
        document.body.classList.remove("robot-off");
        field.setEnabled(true);
      }
    } else {
      document.body.classList.add("robot-off");
      if (window.__field) window.__field.setEnabled(false);
    }
    if (persist) {
      try { localStorage.setItem(coarseDevice ? "robot-mobile" : "robot", on ? "on" : "off"); } catch (_) {}
    }
  }

  var robotPref = storedRobot();
  var needsOrientGesture = typeof DeviceOrientationEvent !== "undefined" &&
    typeof DeviceOrientationEvent.requestPermission === "function";
  var robotOn = coarseDevice
    ? (!needsOrientGesture && robotPref === "on" && !reducedMotion)
    : (robotPref ? robotPref === "on" : !reducedMotion);
  applyRobot(robotOn, false);

  if (robotBtn) {
    robotBtn.addEventListener("click", function () {
      applyRobot(document.body.classList.contains("robot-off"), true);
    });
  }
})();
