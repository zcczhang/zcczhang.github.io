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
    var wheelR = 3.4 * (this.scale * 1.22);
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

    var wantAmp = Math.min(1, bot.speed / 2.2);
    bot.amp += (wantAmp - bot.amp) * 0.08 * s;
    bot.stride += (0.35 + bot.speed) * s * 0.07;

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

  RobotGuide.prototype.drawWheel = function (ctx, x, y, r, ang, squash, fill, rim, hub) {
    squash = squash == null ? 1 : Math.max(0.16, squash);
    fill = fill || this.colWheel;
    rim = rim || this.colBot;
    hub = hub || this.colBody;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(squash, 1);
    ctx.fillStyle = fill;
    ctx.strokeStyle = rim;
    ctx.lineWidth = 0.85 / squash;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.55, 0, Math.PI * 2);
    ctx.fillStyle = hub;
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = fill;
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
    var k = this.scale * 1.22;
    var heading = bot.heading;
    var front = Math.abs(Math.sin(heading));
    var side = Math.abs(Math.cos(heading));
    var coming = Math.sin(heading);
    var pitch = bot.pitch;
    var amp = bot.amp;
    var stride = bot.stride;
    var squash = 0.22 + 0.78 * side;
    var lookYaw = bot.bank * 0.7 + Math.sin(this.t * 0.0015) * 0.16;
    var lookPitch = 0.16 + pitch * 1.6 + Math.sin(this.t * 0.00105) * 0.08;
    var extend = 0.62 + 0.38 * (1 - Math.min(1, bot.speed / 2.15));
    var armSwing = Math.sin(stride) * (0.35 + amp * 0.55);
    var bob = Math.abs(Math.sin(bot.wheel * 0.55)) * Math.min(0.4, bot.speed * 0.16);
    var pal = {
      yellow: "#E3B12A",
      yellowShadow: "#C08E12",
      rust: "#7A4E28",
      tread: "#2B221C",
      treadMid: "#4A3B30",
      metal: "#A8AEB4",
      metalDark: "#5E646A",
      metalLight: "#D8DCE0",
      panel: "#1A2226",
      lens: "#12161A",
      iris: "#F2D56B",
      glint: "#FFF6D4"
    };

    function proj(x, yUp, z) {
      var hipY = 8.2;
      var dy = yUp - hipY;
      z += dy * pitch;
      x += yUp * bot.bank * 0.07;
      return {
        x: x * (0.28 + 0.72 * front) + z * side,
        y: -yUp + z * 0.08 * front + x * 0.06 * coming,
        d: z * coming + x * 0.4
      };
    }

    function joint(p, r) {
      ctx.beginPath();
      ctx.fillStyle = pal.metalDark;
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = pal.metalLight;
      ctx.arc(p.x, p.y, r * 0.42, 0, Math.PI * 2);
      ctx.fill();
    }

    function link(a, b, w) {
      ctx.strokeStyle = pal.metal;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = w;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    ctx.save();
    ctx.translate(bot.x, bot.y + 1.15 * k + bob * k);
    ctx.scale(bot.face * k * (1 + coming * 0.05), k * (1 + coming * 0.03));

    var bodyW = 9.4 + 6.8 * front;
    var bodyH = 8.6;
    var bodyY = 8.35;
    var treadX = 5.35 + 2.55 * front;
    var body = proj(0, bodyY, 0);

    var drawTread = function (sx) {
      var a = proj(sx, 2.2, -4.7);
      var b = proj(sx, 2.2, 4.7);
      var mid = proj(sx, 2.2, 0);
      ctx.save();
      ctx.translate(mid.x, mid.y + 2.5);
      ctx.scale(1.2 + 0.55 * side, 0.22);
      ctx.beginPath();
      ctx.arc(0, 0, 5.1, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.10)";
      ctx.fill();
      ctx.restore();

      ctx.lineCap = "round";
      ctx.strokeStyle = pal.tread;
      ctx.lineWidth = 5.1;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
      ctx.strokeStyle = pal.treadMid;
      ctx.lineWidth = 3.2;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();

      var i;
      for (i = -2; i <= 2; i++) {
        var wp = proj(sx, 2.2, i * 2.15);
        this.drawWheel(ctx, wp.x, wp.y, 1.32, bot.wheel + i * 0.45, squash, pal.treadMid, pal.metalDark, pal.metal);
      }
      ctx.strokeStyle = pal.yellowShadow;
      ctx.lineWidth = 1.05;
      for (i = 0; i < 7; i++) {
        var u = (bot.wheel * 0.28 + i / 7) % 1;
        if (u < 0) u += 1;
        var cz = -4.7 + u * 9.4;
        var c0 = proj(sx, 0.7, cz);
        var c1 = proj(sx, 3.6, cz);
        ctx.beginPath();
        ctx.moveTo(c0.x, c0.y);
        ctx.lineTo(c1.x, c1.y);
        ctx.stroke();
      }
    }.bind(this);

    var drawArm = function (sign) {
      var sh = proj(sign * (5.7 + 1.9 * front), 11.1, 1.1);
      var el = proj(sign * (8.4 + 2.4 * front), 7.2 - amp * 0.5, 2.6 + Math.abs(armSwing) * 2);
      var hd = proj(sign * (7.2 + 1.5 * front), 4.4 - amp * 0.35, 5.1 + armSwing * 3.2);
      link.call(this, sh, el, 2.4);
      link.call(this, el, hd, 1.95);
      joint.call(this, sh, 1.55);
      joint.call(this, el, 1.22);
      var fx = hd.x - el.x;
      var fy = hd.y - el.y;
      var fl = Math.sqrt(fx * fx + fy * fy) || 1;
      fx /= fl;
      fy /= fl;
      var px = -fy;
      var py = fx;
      ctx.strokeStyle = pal.metalDark;
      ctx.lineCap = "round";
      ctx.lineWidth = 1.35;
      ctx.beginPath();
      ctx.moveTo(hd.x, hd.y);
      ctx.lineTo(hd.x + fx * 2.5 + px * 1.2, hd.y + fy * 2.5 + py * 1.2);
      ctx.moveTo(hd.x, hd.y);
      ctx.lineTo(hd.x + fx * 2.5 - px * 1.2, hd.y + fy * 2.5 - py * 1.2);
      ctx.stroke();
      joint.call(this, hd, 1.08);
    }.bind(this);

    var neckPt = function (seg) {
      return proj(
        lookYaw * seg * 2.85,
        13.15 + seg * 3.05 * extend,
        lookPitch * seg * 2.35 + 0.45
      );
    };

    var drawNeck = function () {
      var n0 = neckPt(0);
      var n1 = neckPt(1);
      var n2 = neckPt(2);
      var n3 = neckPt(2.65);
      link.call(this, n0, n1, 2.15);
      link.call(this, n1, n2, 1.85);
      link.call(this, n2, n3, 1.55);
      joint.call(this, n0, 1.7);
      joint.call(this, n1, 1.35);
      joint.call(this, n2, 1.2);
      joint.call(this, n3, 1.05);
    }.bind(this);

    var drawEyes = function () {
      var spread = 2.55 + 3.15 * front;
      var yUp = 13.15 + 2.65 * 3.05 * extend;
      var z = lookPitch * 2.65 * 2.35 + 1.05;
      var x0 = lookYaw * 2.65 * 2.85;
      var left = proj(x0 - spread, yUp, z);
      var right = proj(x0 + spread, yUp, z);
      var brow = proj(x0, yUp + 0.15, z - 0.15);
      ctx.strokeStyle = pal.metal;
      ctx.lineCap = "round";
      ctx.lineWidth = 2.15;
      ctx.beginPath();
      ctx.moveTo(left.x, left.y);
      ctx.lineTo(right.x, right.y);
      ctx.stroke();
      joint.call(this, brow, 1.25);

      function eye(p, dir) {
        var ew = 3.35 + 2.2 * front;
        var eh = 3.55;
        ctx.fillStyle = pal.metalLight;
        roundedRect(ctx, p.x - ew / 2, p.y - eh / 2, ew, eh, 1.35);
        ctx.fill();
        ctx.strokeStyle = pal.metalDark;
        ctx.lineWidth = 0.85;
        ctx.stroke();
        ctx.fillStyle = pal.lens;
        roundedRect(ctx, p.x - ew * 0.36, p.y - eh * 0.36, ew * 0.72, eh * 0.72, 1.05);
        ctx.fill();
        var ix = p.x + lookYaw * 0.55 * dir + 0.15 * coming;
        var iy = p.y + lookPitch * 0.45;
        ctx.beginPath();
        ctx.fillStyle = pal.iris;
        ctx.arc(ix, iy, Math.max(0.85, 0.7 + 0.4 * front), 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = pal.glint;
        ctx.arc(ix - 0.32, iy - 0.36, 0.32, 0, Math.PI * 2);
        ctx.fill();
      }
      if (left.d < right.d) {
        eye.call(this, left, -1);
        eye.call(this, right, 1);
      } else {
        eye.call(this, right, 1);
        eye.call(this, left, -1);
      }
      var glow = ctx.createRadialGradient(brow.x, brow.y, 0.6, brow.x + 3 * coming, brow.y, 10);
      glow.addColorStop(0, "rgba(242, 213, 107, 0.22)");
      glow.addColorStop(1, "rgba(242, 213, 107, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(brow.x, brow.y, 9, 0, Math.PI * 2);
      ctx.fill();
    }.bind(this);

    var drawBody = function () {
      ctx.fillStyle = pal.yellow;
      ctx.strokeStyle = pal.yellowShadow;
      ctx.lineWidth = 1.55;
      roundedRect(ctx, body.x - bodyW / 2, body.y - bodyH / 2, bodyW, bodyH, 1.35);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = pal.yellowShadow;
      roundedRect(ctx, body.x - bodyW * 0.42, body.y + bodyH * 0.08, bodyW * 0.84, bodyH * 0.28, 0.7);
      ctx.fill();
      var pw = bodyW * 0.62;
      var ph = bodyH * 0.38;
      var px = body.x - pw / 2;
      var py = body.y - bodyH * 0.36;
      ctx.fillStyle = pal.panel;
      roundedRect(ctx, px, py, pw, ph, 0.55);
      ctx.fill();
      ctx.strokeStyle = pal.metalDark;
      ctx.lineWidth = 0.45;
      var r;
      var c;
      for (r = 1; r < 4; r++) {
        ctx.beginPath();
        ctx.moveTo(px + 0.4, py + (ph * r) / 4);
        ctx.lineTo(px + pw - 0.4, py + (ph * r) / 4);
        ctx.stroke();
      }
      for (c = 1; c < 5; c++) {
        ctx.beginPath();
        ctx.moveTo(px + (pw * c) / 5, py + 0.35);
        ctx.lineTo(px + (pw * c) / 5, py + ph - 0.35);
        ctx.stroke();
      }
      ctx.fillStyle = pal.rust;
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.arc(body.x + bodyW * 0.28, body.y + bodyH * 0.22, 1.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      var collar = proj(0, 13.05, 0.55);
      ctx.fillStyle = pal.metalDark;
      roundedRect(ctx, collar.x - 2.1, collar.y - 1.05, 4.2, 2.3, 0.9);
      ctx.fill();
      ctx.fillStyle = pal.metal;
      roundedRect(ctx, collar.x - 1.35, collar.y - 0.55, 2.7, 1.3, 0.55);
      ctx.fill();
    }.bind(this);

    var lT = proj(-treadX, 2.2, 0);
    var rT = proj(treadX, 2.2, 0);
    var leftFar = lT.d < rT.d;
    if (leftFar) {
      drawTread(-treadX);
      drawArm(-1);
    } else {
      drawTread(treadX);
      drawArm(1);
    }

    drawBody();
    drawNeck();
    drawEyes();

    if (leftFar) {
      drawArm(1);
      drawTread(treadX);
    } else {
      drawArm(-1);
      drawTread(-treadX);
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
