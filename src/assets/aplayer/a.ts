!function () {
  function e(e) {
    this.isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i), this.isMobile && (e.autoplay = !1);
    var t = {
      element: document.getElementsByClassName("aplayer")[0],
      narrow: !1,
      autoplay: !1,
      showlrc: !1,
      theme: "#b7daff"
    };
    for (var a in t)t.hasOwnProperty(a) && !e.hasOwnProperty(a) && (e[a] = t[a]);
    this.playIndex = "[object Array]" === Object.prototype.toString.call(e.music) ? 0 : -1, this.option = e, this.audios = [], this.loop = !0
  }

  e.prototype.init = function () {
    function e(e) {
      var t = e || window.event, s = (t.clientX - a(o.bar)) / r;
      s = s > 0 ? s : 0, s = 1 > s ? s : 1, o.updateBar.call(o, "played", s, "width"), o.option.showlrc && o.updateLrc.call(o, parseFloat(o.playedBar.style.width) / 100 * o.audio.duration), o.element.getElementsByClassName("aplayer-ptime")[0].innerHTML = o.secondToTime(s * o.audio.duration)
    }

    function t() {
      document.removeEventListener("mouseup", t), document.removeEventListener("mousemove", e), o.audio.currentTime = parseFloat(o.playedBar.style.width) / 100 * o.audio.duration, o.play()
    }

    function a(e) {
      for (var t, a = e.offsetLeft, s = e.offsetParent; null !== s;)a += s.offsetLeft, s = s.offsetParent;
      return t = document.body.scrollLeft + document.documentElement.scrollLeft, a - t
    }

    function s(e) {
      for (var t, a = e.offsetTop, s = e.offsetParent; null !== s;)a += s.offsetTop, s = s.offsetParent;
      return t = document.body.scrollTop + document.documentElement.scrollTop, a - t
    }

    this.element = this.option.element, this.music = this.playIndex > -1 ? this.option.music[this.playIndex] : this.option.music;
    var i;
    if (this.option.showlrc) {
      var l = [];
      for (i = 0; i < this.element.getElementsByClassName("aplayer-lrc-content").length; i++)l.push(this.element.getElementsByClassName("aplayer-lrc-content")[i].innerHTML);
      this.lrcs = this.parseLrc(l)
    }
    var n = '<div class="aplayer-pic"><div class="aplayer-button aplayer-play"><i class="demo-icon aplayer-icon-play"></i></div></div><div class="aplayer-info"><div class="aplayer-music"><span class="aplayer-title"></span><span class="aplayer-author"></span></div><div class="aplayer-lrc"><div class="aplayer-lrc-contents" style="transform: translateY(0); -webkit-transform: translateY(0);"></div></div><div class="aplayer-controller"><div class="aplayer-bar-wrap"><div class="aplayer-bar"><div class="aplayer-loaded" style="width: 0"></div><div class="aplayer-played" style="width: 0; background: ' + this.option.theme + ';"><span class="aplayer-thumb" style="border: 1px solid ' + this.option.theme + ';"></span></div></div></div><div class="aplayer-time"> - <span class="aplayer-ptime">00:00</span> / <span class="aplayer-dtime">00:00</span><div class="aplayer-volume-wrap"><i class="demo-icon aplayer-icon-volume-down"></i><div class="aplayer-volume-bar-wrap"><div class="aplayer-volume-bar"><div class="aplayer-volume" style="height: 80%; background: ' + this.option.theme + ';"></div></div></div></div><i class="demo-icon aplayer-icon-loop"></i>' + (this.playIndex > -1 ? '<i class="demo-icon aplayer-icon-menu"></i>' : "") + "</div></div></div>";
    if (this.playIndex > -1) {
      for (n += '<div class="aplayer-list"><ol>', i = 0; i < this.option.music.length; i++)n += '<li><span class="aplayer-list-cur" style="background: ' + this.option.theme + ';"></span><span class="aplayer-list-index">' + (i + 1) + '</span><span class="aplayer-list-title">' + this.option.music[i].title + '</span><span class="aplayer-list-author">' + this.option.music[i].author + "</span></li>";
      n += "</ol></div>"
    }
    this.element.innerHTML = n, this.option.narrow && this.element.classList.add("aplayer-narrow");
    var o = this;
    if (this.button = this.element.getElementsByClassName("aplayer-button")[0], this.button.addEventListener("click", function () {
        this.classList.contains("aplayer-play") ? o.play.call(o) : this.classList.contains("aplayer-pause") && o.pause.call(o)
      }), this.playIndex > -1)for (i = 0; i < this.option.music.length; i++)this.element.getElementsByClassName("aplayer-list")[0].getElementsByTagName("li")[i].addEventListener("click", function () {
      var e = parseInt(this.getElementsByClassName("aplayer-list-index")[0].innerHTML) - 1;
      e !== o.playIndex && o.setMusic(e), o.play()
    });
    this.playedBar = this.element.getElementsByClassName("aplayer-played")[0], this.loadedBar = this.element.getElementsByClassName("aplayer-loaded")[0], this.thumb = this.element.getElementsByClassName("aplayer-thumb")[0], this.bar = this.element.getElementsByClassName("aplayer-bar")[0];
    var r;
    this.bar.addEventListener("click", function (e) {
      var t = e || window.event;
      r = o.bar.clientWidth;
      var s = (t.clientX - a(o.bar)) / r;
      o.updateBar.call(o, "played", s, "width"), o.element.getElementsByClassName("aplayer-ptime")[0].innerHTML = o.secondToTime(s * o.audio.duration), o.audio.currentTime = parseFloat(o.playedBar.style.width) / 100 * o.audio.duration
    }), this.thumb.addEventListener("mouseover", function () {
      this.style.background = o.option.theme
    }), this.thumb.addEventListener("mouseout", function () {
      this.style.background = "#fff"
    }), this.thumb.addEventListener("mousedown", function () {
      r = o.bar.clientWidth, clearInterval(o.playedTime), document.addEventListener("mousemove", e), document.addEventListener("mouseup", t)
    }), this.volumeBar = this.element.getElementsByClassName("aplayer-volume")[0];
    var d = this.element.getElementsByClassName("aplayer-volume-bar")[0], p = o.element.getElementsByClassName("aplayer-time")[0].getElementsByTagName("i")[0], c = 35;
    this.element.getElementsByClassName("aplayer-volume-bar-wrap")[0].addEventListener("click", function (e) {
      var t = e || window.event, a = (c - t.clientY + s(d)) / c;
      a = a > 0 ? a : 0, a = 1 > a ? a : 1, o.updateBar.call(o, "volume", a, "height"), o.audio.volume = a, o.audio.muted && (o.audio.muted = !1), 1 === a ? p.className = "demo-icon aplayer-icon-volume-up" : p.className = "demo-icon aplayer-icon-volume-down"
    }), p.addEventListener("click", function () {
      o.audio.muted ? (o.audio.muted = !1, p.className = 1 === o.audio.volume ? "demo-icon aplayer-icon-volume-up" : "demo-icon aplayer-icon-volume-down", o.updateBar.call(o, "volume", o.audio.volume, "height")) : (o.audio.muted = !0, p.className = "demo-icon aplayer-icon-volume-off", o.updateBar.call(o, "volume", 0, "height"))
    }), this.element.getElementsByClassName("aplayer-icon-loop")[0].addEventListener("click", function () {
      o.loop ? (this.classList.add("aplayer-noloop"), o.loop = !1, o.audio.loop = o.playIndex > -1 ? !1 : o.loop) : (this.classList.remove("aplayer-noloop"), o.loop = !0, o.audio.loop = o.playIndex > -1 ? !1 : o.loop)
    }), this.playIndex > -1 && this.element.getElementsByClassName("aplayer-icon-menu")[0].addEventListener("click", function () {
      var e = o.element.getElementsByClassName("aplayer-list")[0];
      e.classList.contains("aplayer-list-hide") ? e.classList.remove("aplayer-list-hide") : e.classList.add("aplayer-list-hide")
    }), this.setMusic(0)
  }, e.prototype.setMusic = function (e) {
    this.playIndex > -1 && "undefined" != typeof arguments[0] && (this.playIndex = arguments[0]);
    var t = this.playIndex;
    if (this.music = this.playIndex > -1 ? this.option.music[t] : this.option.music, this.music.pic && (this.element.getElementsByClassName("aplayer-pic")[0].style.backgroundImage = "url(" + encodeURI(this.music.pic) + ")"), this.element.getElementsByClassName("aplayer-title")[0].innerHTML = this.music.title, this.element.getElementsByClassName("aplayer-author")[0].innerHTML = " - " + this.music.author, this.playIndex > -1 && (this.element.getElementsByClassName("aplayer-list-light")[0] && this.element.getElementsByClassName("aplayer-list-light")[0].classList.remove("aplayer-list-light"), this.element.getElementsByClassName("aplayer-list")[0].getElementsByTagName("li")[t].classList.add("aplayer-list-light")), this.audio && (this.pause(), this.audio.currentTime = 0), this.playIndex > -1 && !this.audios[t] || -1 === this.playIndex) {
      this.audio = document.createElement("audio"), this.audio.src = this.music.url, this.audio.preload = this.isMobile ? "none" : "metadata";
      var a = this;
      this.audio.addEventListener("durationchange", function () {
        1 !== a.audio.duration && (a.element.getElementsByClassName("aplayer-dtime")[0].innerHTML = a.secondToTime(a.audio.duration))
      }), a.audio.addEventListener("progress", function () {
        var e = a.audio.buffered.length ? a.audio.buffered.end(a.audio.buffered.length - 1) / a.audio.duration : 0;
        a.updateBar.call(a, "loaded", e, "width")
      }), this.audio.addEventListener("error", function () {
        a.element.getElementsByClassName("aplayer-author")[0].innerHTML = " - Error happens ╥﹏╥"
      }), this.playIndex > -1 ? this.audio.addEventListener("ended", function () {
        a.playIndex < a.option.music.length - 1 ? a.setMusic(++a.playIndex) : a.loop ? a.setMusic(0) : a.loop || a.pause()
      }) : this.audio.addEventListener("ended", function () {
        a.loop || a.pause()
      }), this.audio.volume = parseInt(this.element.getElementsByClassName("aplayer-volume")[0].style.height) / 100, this.audio.loop = this.playIndex > -1 ? !1 : this.loop, this.playIndex > -1 && (this.audios[t] = this.audio)
    } else this.audio = this.audios[t], this.audio.volume = parseInt(this.element.getElementsByClassName("aplayer-volume")[0].style.height) / 100, this.audio.currentTime = 0;
    if (this.option.showlrc) {
      this.lrc = this.playIndex > -1 ? this.lrcs[t] : this.lrcs[0], this.element.classList.add("aplayer-withlrc");
      var s = "";
      this.lrcContents = this.element.getElementsByClassName("aplayer-lrc-contents")[0];
      for (var i = 0; i < this.lrc.length; i++)s += "<p>" + this.lrc[i][1] + "</p>";
      this.lrcContents.innerHTML = s, this.lrcIndex || (this.lrcIndex = 0), this.lrcContents.getElementsByTagName("p")[0].classList.add("aplayer-lrc-current"), this.lrcContents.style.transform = "translateY(0px)", this.lrcContents.style.webkitTransform = "translateY(0px)"
    }
    1 !== this.audio.duration && (this.element.getElementsByClassName("aplayer-dtime")[0].innerHTML = this.audio.duration ? this.secondToTime(this.audio.duration) : "00:00"), this.option.autoplay && !this.isMobile && this.play(), this.option.autoplay = !0, this.isMobile && this.pause()
  }, e.prototype.play = function () {
    var e = this;
    this.button.classList.remove("aplayer-play"), this.button.classList.add("aplayer-pause"), this.button.innerHTML = "", setTimeout(function () {
      e.button.innerHTML = '<i class="demo-icon aplayer-icon-pause"></i>'
    }, 100), this.audio.play(), this.playedTime && clearInterval(this.playedTime), this.playedTime = setInterval(function () {
      e.updateBar.call(e, "played", e.audio.currentTime / e.audio.duration, "width"), e.option.showlrc && e.updateLrc.call(e), e.element.getElementsByClassName("aplayer-ptime")[0].innerHTML = e.secondToTime(e.audio.currentTime)
    }, 100)
  }, e.prototype.pause = function () {
    var e = this;
    this.button.classList.remove("aplayer-pause"), this.button.classList.add("aplayer-play"), this.button.innerHTML = "", setTimeout(function () {
      e.button.innerHTML = '<i class="demo-icon aplayer-icon-play"></i>'
    }, 100), this.audio.pause(), clearInterval(this.playedTime)
  }, e.prototype.updateBar = function (e, t, a) {
    t = t > 0 ? t : 0, t = 1 > t ? t : 1, this[e + "Bar"].style[a] = 100 * t + "%"
  }, e.prototype.updateLrc = function (e) {
    if ("undefined" == typeof arguments[0] && (e = this.audio.currentTime), this.lrcIndex > this.lrc.length - 1 || e < this.lrc[this.lrcIndex][0] || !this.lrc[this.lrcIndex + 1] || e >= this.lrc[this.lrcIndex + 1][0])for (var t = 0; t < this.lrc.length; t++)e >= this.lrc[t][0] && (!this.lrc[t + 1] || e < this.lrc[t + 1][0]) && (this.lrcIndex = t, this.lrcContents.style.transform = "translateY(" + 20 * -this.lrcIndex + "px)", this.lrcContents.style.webkitTransform = "translateY(" + 20 * -this.lrcIndex + "px)", this.lrcContents.getElementsByClassName("aplayer-lrc-current")[0].classList.remove("aplayer-lrc-current"), this.lrcContents.getElementsByTagName("p")[t].classList.add("aplayer-lrc-current"))
  }, e.prototype.secondToTime = function (e) {
    var t = function (e) {
      return 10 > e ? "0" + e : "" + e
    }, a = parseInt(e / 60), s = parseInt(e - 60 * a);
    return t(a) + ":" + t(s)
  }, e.prototype.parseLrc = function (e) {
    for (var t = [], a = 0; a < e.length; a++) {
      for (var s = e[a].split("\n"), i = [], l = s.length, n = 0; l > n; n++) {
        var o = s[n].match(/\[(\d{2}):(\d{2})\.(\d{2,3})]/g), r = s[n].replace(/\[(\d{2}):(\d{2})\.(\d{2,3})]/g, "").replace(/^\s+|\s+$/g, "");
        if (null != o)for (var d = o.length, p = 0; d > p; p++) {
          var c = /\[(\d{2}):(\d{2})\.(\d{2,3})]/.exec(o[p]), u = 60 * c[1] + parseInt(c[2]) + parseInt(c[3]) / (2 === (c[3] + "").length ? 100 : 1e3);
          i.push([u, r])
        }
      }
      i.sort(function (e, t) {
        return e[0] - t[0]
      }), t.push(i)
    }
    return t
  }, "undefined" != typeof module && "undefined" != typeof module.exports ? module.exports = e : window.APlayer = e
}();
