TWINKLE_FRAME_RATE = 5;
setAnimationRoutines = function () {
    for (var b = ["webkit", "moz", "ms"], e = 0; e < b.length && !window.requestAnimationFrame; e++) window.requestAnimationFrame = window[b[e] + "RequestAnimationFrame"]
}();
Math.sign = Math.sign || function (b) {
    b = +b;
    return 0 === b || isNaN(b) ? b : 0 < b ? 1 : -1
};
crypto = window.crypto || window.mscrypto;
SecureRandom = function () {
    return window.crypto.getRandomValues ? function (b, e) {
        var g = window.Math.random() + "",
            k = e - b + 1;
        return window.parseInt(g.slice(-9)) % k + b
    } : function (b, e) {
        var g = new Uint32Array(1);
        window.crypto.getRandomValues(g);
        return g[0] % (e - b + 1) + b
    }
}();
var sky = {
    stars: 213,
    twinklers: .1,
    shooters: .1,
    shapesky: {},
    shapetwinkle: {},
    shapeshooting: {},
    init: function () {
        function b(b) {
            sky[b].buffer = [];
            sky[b].canvas = document.getElementById(b);
            sky[b].context = sky[b].canvas.getContext("2d")
        }

        this.twinklers *= this.stars;
        this.shooters *= this.stars;
        b("shapesky");
        b("shapetwinkle");
        b("shapeshooting");
        this.reininitialize()
    },
    reininitialize: function () {
        this.setDimensions();
        this.shapesky.generate();
        this.shapetwinkle.generate();
        this.shapesky.render()
    },
    setDimensions: function () {
        function b(b) {
            sky[b].canvas.width = sky.w;
            sky[b].canvas.height = sky.h
        }

        this.w = window.innerWidth;
        this.h = window.innerHeight;
        b("shapesky");
        b("shapetwinkle");
        b("shapeshooting");
    }
};

function _generateSkyObject(b) {
    for (var e = b.buffer || [], g = 0; g < b.count; g++) e.push({
        position: {
            x: SecureRandom(0, sky.w),
            y: SecureRandom(sky.h * (b.positionY ? b.positionY[0] : 0), sky.h * (b.positionY ? b.positionY[1] : 1))
        },
        delta: {
            x: SecureRandom(0, 1E3) / 50 - 10,
            y: SecureRandom(1, 3)
        },
        hue: SecureRandom(0, 360),
        size: SecureRandom(1E3 * b.size[0], 1E3 * b.size[1]) / 1E3,
        decay: SecureRandom(0, 1E3) / 500 + .5,
        opacity: SecureRandom(b.opacity[0], b.opacity[1]),
        saturation: SecureRandom(b.saturation[0], b.saturation[1]) + "%",
        color: "255,235,255"
    });
    return e
}
sky.shapesky.generate = function () {
    this.buffer = _generateSkyObject({
        count: sky.stars,
        size: [1, 1],
        opacity: [0, 70],
        saturation: [0, 30]
    })
};
sky.shapetwinkle.generate = function () {
    this.buffer = _generateSkyObject({
        count: sky.twinklers,
        size: [0, 1],
        opacity: [60, 100],
        saturation: [70, 100]
    })
};
sky.shapeshooting.generate = function () {
    SecureRandom(0, sky.stars) < sky.shooters && (this.buffer = _generateSkyObject({
        buffer: this.buffer,
        count: 1,
        positionY: [0, .33],
        size: [0, 1],
        opacity: [.2, .2],
        saturation: [70, 100]
    }))
};
sky.shapesky.render = function () {
    for (var b = this.buffer.length, e = 0; e < b; e++) {
        var g = this.buffer[e];
        this.context.beginPath();
        this.context.shadowBlur = Math.floor(5 * Math.random() + 2);
        this.context.shadowColor = "white";
        this.context.fillStyle = "hsla(" + g.hue + ", " + g.saturation + ", 80%, ." + g.opacity + ")";
        this.context.fillRect(g.position.x, g.position.y, g.size, g.size)
    }
};
sky.shapetwinkle.render = function () {
    this.context.clearRect(0, 0, sky.w, sky.h);
    for (var b = this.buffer.length, e = 0; e < b; e++) {
        this.buffer[e].hue += SecureRandom(-30, 30);
        var g = this.buffer[e].opacity - SecureRandom(1, 30),
            k = this.buffer[e];
        this.context.beginPath();
        this.context.shadowBlur = Math.floor(5 * Math.random() + 5);
        this.context.shadowColor = "white";
        this.context.fillStyle = "hsla(" + k.hue + ", " + k.saturation + ", 85%, ." + g + ")";
        this.context.arc(k.position.x, k.position.y, k.size, 0, 2 * Math.PI);
        this.context.fill()
    }
};
sky.shapeshooting.render = function () {
    this.context.clearRect(0, 0, sky.w, sky.h);
    for (var b = this.buffer.length, e = 0; e < b - 1; e++) {
        var g = this.buffer[e];
        g ? (0 < g.decay && (2 > Math.abs(g.delta.x) && (g.delta.x = 8 * Math.sign(g.delta.x), g.color = "255,200,220"), this.context.beginPath(), this.context.fillStyle = "rgba(" + g.color + "," + g.opacity + ")", this.context.arc(g.position.x, g.position.y, 1, 0, 2 * Math.PI), this.context.fill(), this.context.fillStyle = "rgba(" + g.color + "," + .6 * g.opacity + ")", this.context.arc(g.position.x - g.delta.x, g.position.y -
            g.delta.y, 1, 0, 2 * Math.PI), this.context.fill(), this.context.fillStyle = "rgba(" + g.color + "," + .3 * g.opacity + ")", this.context.arc(g.position.x - 2 * g.delta.x, g.position.y - 2 * g.delta.y, 1, 0, 2 * Math.PI), this.context.fill(), sky.shapeshooting.buffer[e].decay -= .01, sky.shapeshooting.buffer[e].position.x += sky.shapeshooting.buffer[e].delta.x, sky.shapeshooting.buffer[e].position.y += sky.shapeshooting.buffer[e].delta.y), 1 > g.decay ? sky.shapeshooting.buffer[e].opacity -= .01 : 1 > g.opacity && (sky.shapeshooting.buffer[e].opacity += .05)) : this.buffer.splice(e, 1)
    }
};
var frame = 0;

function animationLoop() {
    window.requestAnimationFrame(animationLoop);
    frame = ++frame % TWINKLE_FRAME_RATE;
    sky.shapeshooting.render();
    frame || (sky.shapeshooting.generate(), sky.shapetwinkle.render())
}
sky.init();
animationLoop();
window.addEventListener("resize", function () {
    (window.innerWidth >= sky.w || window.innerHeight >= sky.h) && sky.reininitialize()
}, !1);

window.onload = function () {
    var elem = document.getElementsByClassName('block-main-screen')[0];
    elem.style.top = 'calc(50% - ' + elem.offsetHeight / 2 + 'px)'
}