const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');

// Canvas size
let canvasWidth = window.innerWidth * 0.8;
let canvasHeight = window.innerHeight * 0.7;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Components
let go = document.getElementById("go");
let rst = document.getElementById("reset");
let gravity = document.querySelector('#gravity').value;
let yz = document.getElementById("y").value;
let xz = document.getElementById("x").value;
let velocity = document.getElementById("velocity").value;
let angle = document.getElementById("angle").value;
let t = 0;

let yzComp = document.getElementById("y");
let xzComp = document.getElementById("x");
let velocityComp = document.getElementById("velocity");
let angleComp = document.getElementById("angle");
let gravityComp = document.getElementById("gravity");

// Position of axis
var centerX = canvasWidth / 2;
var centerY = (canvasHeight / 2) - 2;

let maxTime = (((velocity * Math.sin(angle * Math.PI / 180)) +
    Math.sqrt(Math.pow(velocity * Math.sin(angle * Math.PI / 180), 2) - 0 + 2 * gravity * yz)) / gravity);

// Variables
let fire = false;
let size;

// horizontal and vertical components of initial velocity
let velocityX = velocity * Math.cos(angle * Math.PI / 180);
let velocityY = velocity * Math.sin(angle * Math.PI / 180) - (gravity * t);

// Buttons
go.addEventListener('click', function () {
    gravity = document.getElementById("gravity").value;
    yz = document.getElementById("y").value;
    xz = document.getElementById("x").value;
    velocity = document.getElementById("velocity").value;
    angle = document.getElementById("angle").value;
    t = 0;
    velocityX = velocity * Math.cos(angle * Math.PI / 180);
    fire = true;
    maxTime = (((velocity * Math.sin(angle * Math.PI / 180)) +
        Math.sqrt(Math.pow(velocity * Math.sin(angle * Math.PI / 180), 2) - 0 + 2 * gravity * yz)) / gravity);
});

rst.addEventListener('click', () => reset());

function reset() {
    gravity = 9.8;
    yz = 0;
    xz = 0;
    velocity = 40;
    angle = 45;
    t = 0;

    yzComp.value = 0;
    xzComp.value = 0;
    velocityComp.value = 40;
    angleComp.value = 45;
    gravityComp.value = 9.8;

    fire = false;
}

// Draw the axis
function drawAxis() {
    ctx.lineWidth = 0.7;
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#000000";

    // x-axis
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvasWidth, centerY);
    ctx.stroke();

    // y-axis
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvasHeight);
    ctx.stroke();
}

// Draw the canvas
function draw() {

    ctx.save();
    img();  

    ctx.translate(0, 0);
    particle.update();
    particle.draw();

    drawAxis();

    ctx.restore();
}

function img() {
    const img = new Image();
    img.src = "1.png";

    const img4 = new Image();
    img4.src = "4.png";

    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img4, 0, 0, canvasWidth, canvasHeight);
    };
}

// Particle class
class Particle {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = 2;
    }

    update() {
        this.y = (-(0 + velocity * Math.sin(angle * Math.PI / 180) * t -
            ((gravity * Math.pow(t, 2)) / 2))) + (centerY - yz);
        this.x = ((0 + velocity * Math.cos(angle * Math.PI / 180) * t)) + Number(centerX) + Number(xz);

        if (fire && t + 0.02 <= maxTime) {
            t += 0.05;
        } else if (t + 0.02 > maxTime) {
            t = maxTime;
        }

        velocityY = (velocity * Math.sin(angle * Math.PI / 180) - gravity * t);

        if (t >= maxTime) fire = false;
    }

    draw() {
        ctx.lineWidth = 0.2;
        ctx.strokeStyle = "#ff0000";
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
}

// Animation loop
function animate() {
    draw();
    requestAnimationFrame(animate);
}

let particle;

function init() {
    particle = new Particle(centerX, centerY - yz, size);
    animate();
}

window.addEventListener('load', init);