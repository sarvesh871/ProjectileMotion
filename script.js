const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');

let canvasWidth = window.innerWidth * 0.7 ;
let canvasHeight = window.innerHeight * 0.6 ;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

//components
let go = document.getElementById("go");
let rst = document.getElementById("reset");
let gravity = document.querySelector('#gravity').value;
let yz = document.getElementById("y").value;
let xz = document.getElementById("x").value;
let velocity = document.getElementById("velocity").value;
let angle = document.getElementById("angle").value;
let dragCoeff = document.getElementById("dragCoefficient").value;
let density = document.getElementById("airDensity").value;
let area = document.getElementById("crossSectionalArea").value;
let t = 0;

let yzComp = document.getElementById("y");
let xzComp = document.getElementById("x");
let velocityComp = document.getElementById("velocity");
let angleComp = document.getElementById("angle");
let gravityComp = document.getElementById("gravity");
let dragCoeffComp = document.getElementById("dragCoefficient");
let densityComp = document.getElementById("airDensity");
let areaComp = document.getElementById("crossSectionalArea");


var timeSlider = document.getElementById("timeSlider");
var currentTimeDisplay = document.getElementById("currentTime");

let zoomin = document.getElementById("more");
let zoomout = document.getElementById("less");


var table = document.querySelector('.table');


var tbody = table.querySelector('tbody');


var centerX = window.innerWidth * 0.7 / 2 
var centerY = (window.innerHeight * 0.6 / 2) - 2

let maxTime = (((velocity * Math.sin(angle * Math.PI / 180)) + Math.sqrt( Math.pow(velocity * Math.sin(angle * Math.PI / 180), 2) - 0 + 2*gravity*yz )) / gravity);

timeSlider.setAttribute("max", maxTime);


let fire = false
let size; 
let stop = false;

let velocityX = velocity * Math.cos(angle * Math.PI / 180);
let velocityY = velocity * Math.sin(angle * Math.PI / 180) - (gravity * t);

go.addEventListener('click', function() {
    gravity = document.getElementById("gravity").value;
    yz = document.getElementById("y").value;
    xz = document.getElementById("x").value;
    velocity = document.getElementById("velocity").value;
    angle = document.getElementById("angle").value;
    dragCoeff = document.getElementById("dragCoefficient").value;
    density = document.getElementById("airDensity").value;
    area = document.getElementById("crossSectionalArea").value;
    t = 0;
    velocityX = velocity * Math.cos(angle * Math.PI / 180);
    console.log(angle)
    fire = true
    effectSize = 5;
    effectOpacity = 0.3; 
    effectColor1 = `${(Math.random() * 255) + 186}, ${(Math.random() * 255) + 24}, ${(Math.random() * 255) + 27}`;
    effectColor2 = `${(Math.random() * 255) + 229}, ${(Math.random() * 255) + 56}, ${(Math.random() * 255) + 59}`;
    maxTime = (((velocity * Math.sin(angle * Math.PI / 180)) + Math.sqrt( Math.pow(velocity * Math.sin(angle * Math.PI / 180), 2) - 0 + 2*gravity*yz )) / gravity);

    timeSlider.setAttribute("max", maxTime);
});

rst.addEventListener('click', () => reset())

function reset() {
    gravity = 9.8;
    yz = 0;
    xz = 0;
    velocity = 50;
    angle = 45;
    dragCoeff = 0;
    density = 0;
    area = 0;
    t = 0;

    yzComp.value = 0;
    xzComp.value = 0;
    velocityComp.value = 50;
    angleComp.value = 45;
    gravityComp.value = 9.8;
    dragCoeffComp.value = 0.00;
    densityComp.value = 0.000;
    areaComp.value = 0.00;
    
    fire = false
    cameraZoom = 1
}
///time slider
timeSlider.addEventListener("input", function() {
    t = parseFloat(timeSlider.value);
    currentTimeDisplay.textContent = t.toFixed(2);
    draw() 
});

function updateTable() {

    var newData = [
        { x: ((particle.x - centerX + (window.innerWidth * 0.7 / 2)) ).toFixed(2), 
          y: (((- particle.y) + centerY - window.innerHeight * 0.6 / 2)).toFixed(2), 
          time: t.toFixed(2) ,
          vx: velocityX.toFixed(2),
          vy: velocityY.toFixed(2),
          v: this.vx + this.vy
        }
    ];

    let v =  (Math.sqrt( Math.pow(Number(newData[0].vx), 2) + Math.pow(Number(newData[0].vy), 2) )).toFixed(2)
    console.log(Math.pow(Number(newData[0].vx), 2), )
    tbody.innerHTML = '';
    
    var row = tbody.insertRow();
    newData.forEach(function (item) {

        var cellX = row.insertCell(0);
        cellX.textContent = item.x;

        var cellY = row.insertCell(1);
        cellY.textContent = item.y;

        var cellTime = row.insertCell(2);
        cellTime.textContent = item.time;

        var cellVx = row.insertCell(3);
        cellVx.textContent = item.vx;

        var cellVy = row.insertCell(4);
        cellVy.textContent = item.vy;

    });

    var cellV = row.insertCell(5);
    cellV.textContent = v;

    var cellV = row.insertCell(6);
    cellV.textContent = "0";

    let maxY = ((Math.pow(velocity, 2) * Math.pow(Math.sin(angle * Math.PI / 180), 2)) / (2 * gravity)) + Number(yz);
    let maxX = ((0 + velocity * Math.cos(angle * Math.PI / 180) * maxTime) ) + Number(xz); 
    
    var cellMaxY = row.insertCell(7);
    cellMaxY.textContent = maxY.toFixed(2);  
    
    var cellMaxX = row.insertCell(8);
    cellMaxX.textContent = maxX.toFixed(2); 

    var cellMaxT = row.insertCell(9);
    cellMaxT.textContent = maxTime.toFixed(2);
}

// Draw the axis
function drawAxis(){
    ctx.lineWidth = 0.7;
    ctx.strokeStyle = "#1c3332";
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-window.innerWidth * 0.7, 0);
    ctx.lineTo(window.innerWidth * 0.7, 0);
    ctx.stroke();


    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, window.innerHeight * 0.6);
    ctx.lineTo(0, -window.innerHeight * 0.6)
    ctx.stroke();

    
}
var width = ctx.canvas.width;
var height = ctx.canvas.height;
function draw() {
    ctx.save();
    img()

    ctx.translate( window.innerWidth * 0.7 / 2, window.innerHeight * 0.6 / 2 )
    ctx.scale(cameraZoom, cameraZoom)
    ctx.translate( -window.innerWidth * 0.7 / 2 + cameraOffset.x, -window.innerHeight * 0.6 / 2 + cameraOffset.y )

    drawAxis()

    particle.update()
    particle.draw()  
    if (fire) {
        fireEffect() 
    }
    ctx.restore()
}
function img () {

    const img = new Image();
    img.src = "1.png"; 

    const img4 = new Image(); 
    img4.src = "4.png"; 

    img.onload = function () {
        ctx.drawImage(img, 0, 0, window.innerWidth * 0.7 , window.innerHeight * 0.6 );
        ctx.drawImage(img4, 0, 0, window.innerWidth * 0.7, window.innerHeight * 0.6 ); 
    };
}
class Particle{
    constructor(x, y, s, size){
        this.x = x;
        this.y = y;
        this.size = 2;      
    }
    
    update(){ 
        this.y = (-(0 + velocity * Math.sin(angle * Math.PI / 180) * t - ((gravity * Math.pow(t, 2)) / 2)) ) + (centerY - ( yz)) - window.innerHeight * 0.6 / 2;
        this.x = ((0 + velocity * Math.cos(angle * Math.PI / 180) * t) ) + Number(centerX) + Number(xz) - window.innerWidth * 0.7 / 2; 
        
        if (fire && t + 0.02 <= maxTime) {
            t += 0.05;
        } else if (t + 0.02 > maxTime) {
            t = maxTime
        }
             
        timeSlider.value = t;
        currentTimeDisplay.textContent = t.toFixed(2);
        velocityY = (velocity * Math.sin(angle * Math.PI / 180) - gravity * t);

        updateTable()
        
        if (t >= maxTime) fire = false

    }

    draw(){  
        ctx.lineWidth = 0.2;
        ctx.strokeStyle = "#ff0000"; 
        ctx.fillStyle = "#000000";    
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill(); 
        ctx.stroke();    
    }
}

let particle
function init() {
    particle = new Particle(centerX, centerY - yz, size) 
    draw()
}

window.addEventListener('load', init);

let cameraOffset = { x: window.innerWidth * 0.7 / 2, y: window.innerHeight * 0.6 / 2}
let cameraZoom = 1
let MAX_ZOOM = 6
let MIN_ZOOM = 1
let SCROLL_SENSITIVITY = 0.005

function animate(){
    draw()

    requestAnimationFrame(animate);  

}

let effectSize = 5;
let effectOpacity = 0; 
let effectColor1 = `rgba(186, 24, 27, ${effectOpacity})`;
let effectColor2 = `rgba(229, 56, 59, ${effectOpacity})`;

function fireEffect() { 
     
    ctx.fillStyle = `rgba(${effectColor1}, ${effectOpacity})`;;  
    ctx.beginPath();
    ctx.arc(0, 0, effectSize * 3, 0, Math.PI * 2);
    ctx.fill(); 

    
    if (effectSize < 200) {
        effectSize *= 1.3
    } else if (effectSize > 200 && effectSize < 350){
        effectOpacity -= 0.08
        effectSize += 5
    }
}

function getEventLocation(e)
{
    if (e.touches && e.touches.length == 1)
    {
        return { x:e.touches[0].clientX, y: e.touches[0].clientY }
    }
    else if (e.clientX && e.clientY)
    {
        return { x: e.clientX, y: e.clientY }        
    }
}

function drawRect(x, y, width, height)
{
    ctx.fillRect( x, y, width, height )
}

let isDragging = false
let dragStart = { x: 0, y: 0 }

function onPointerDown(e)
{
    isDragging = true
    dragStart.x = getEventLocation(e).x/cameraZoom - cameraOffset.x
    dragStart.y = getEventLocation(e).y/cameraZoom - cameraOffset.y
}

function onPointerUp(e)
{
    isDragging = false
    initialPinchDistance = null
    lastZoom = cameraZoom
}

function onPointerMove(e)
{
    if (isDragging)
    {
        cameraOffset.x = getEventLocation(e).x/cameraZoom - dragStart.x
        cameraOffset.y = getEventLocation(e).y/cameraZoom - dragStart.y
    }
    
}

function handleTouch(e, singleTouchHandler)
{
    if ( e.touches.length == 1 )
    {
        singleTouchHandler(e)
    }
    else if (e.type == "touchmove" && e.touches.length == 2)
    {
        isDragging = false
        handlePinch(e)
    }
}

let initialPinchDistance = null
let lastZoom = cameraZoom

function handlePinch(e)
{
    e.preventDefault()
    
    let touch1 = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    let touch2 = { x: e.touches[1].clientX, y: e.touches[1].clientY }
    
    let currentDistance = (touch1.x - touch2.x)**2 + (touch1.y - touch2.y)**2
    
    if (initialPinchDistance == null)
    {
        initialPinchDistance = currentDistance
    }
    else
    {
        adjustZoom( null, currentDistance/initialPinchDistance )
    }
}

function adjustZoom(zoomAmount, zoomFactor)
{
    if (!isDragging)
    {
        if (zoomAmount)
        {
            cameraZoom += zoomAmount
        }
        else if (zoomFactor)
        {
            cameraZoom = zoomFactor*lastZoom
        }
        
        cameraZoom = Math.min( cameraZoom, MAX_ZOOM )
        cameraZoom = Math.max( cameraZoom, MIN_ZOOM )
        
    }
}

canvas.addEventListener('mousedown', onPointerDown)
canvas.addEventListener('touchstart', (e) => handleTouch(e, onPointerDown))
canvas.addEventListener('mouseup', onPointerUp)
canvas.addEventListener('touchend',  (e) => handleTouch(e, onPointerUp))
canvas.addEventListener('mousemove', onPointerMove)
canvas.addEventListener('touchmove', (e) => handleTouch(e, onPointerMove))
canvas.addEventListener( 'wheel', (e) => adjustZoom(e.deltaY*-SCROLL_SENSITIVITY))

init()
animate();