var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

var slider = document.getElementById("speedSlider"), growing = true, speed = slider.value;
slider.addEventListener("change", function() { 
    speed = slider.value;  
})

function p5Map(n, start1, stop1, start2, stop2) {
    return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
}

function updateSpeed(lowB, upB){
    speed = Math.cos(Date.now()/5000)*(upB-lowB) + lowB;
}

class Star{
    constructor(){
        this.x = Math.floor(Math.random()*canvas.width*2)-canvas.width;
        this.y = Math.floor(Math.random()*canvas.height*2)-canvas.height;
        this.z = Math.floor(Math.random()*canvas.width);
    }

    draw(){
        ctx.save()
        ctx.translate(canvas.width/2, canvas.height/2);

        ctx.beginPath();

        var sx = p5Map(this.x/this.z, 0, 1, 0, canvas.width);
        var sy = p5Map(this.y/this.z, 0, 1, 0, canvas.height);
        var r = p5Map(this.z, 0, canvas.width, 5, 0);

        ctx.arc(sx, sy, 1, 0, r);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();

        ctx.closePath();
        ctx.restore();
    }

    update(){
        this.z -= speed;
        if (this.z<1){
            this.z=canvas.width;
            this.x = Math.floor(Math.random()*canvas.width*2)-canvas.width;
            this.y = Math.floor(Math.random()*canvas.height*2)-canvas.height;
        }
    }
}
var stars = new Array(); for (var i = 0 ; i < 600 ; i++) stars.push(new Star());

function updateStars(stars){
    for (i = 0 ; i < stars.length ; i++) stars[i].update();
}

function drawStars(stars){
    for (i = 0 ; i < stars.length ; i++) stars[i].draw();
}


function clear(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle="black";
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

class Ship{
    constructor(speed){
        this.x = Math.floor(Math.random()*canvas.width);
        this.y = Math.floor(Math.random()*canvas.height);
        this.d = 10;
        this.h = 4*this.d * Math.cos(Math.PI / 6);
        this.n = Math.floor(Math.random()*360);
        this.speed = speed;
        this.color = (Math.floor(Math.random()*2) ? "#00E2FF" : "#75EFFF");
    }

    update(){   
        this.y -= this.speed*Math.cos(this.n*Math.PI/180);
        this.x += this.speed*Math.sin(this.n*Math.PI/180);
        if (this.x>canvas.width)    this.x=0;
        if (this.x<0)               this.x=canvas.width;
        if (this.y>canvas.height)   this.y=0;
        if (this.y<0)               this.y=canvas.height;
    }

    draw(){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.n * Math.PI/180);

        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(-this.d, this.h);
        ctx.lineTo(this.d, this.h);
        ctx.closePath();

        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
}
var ships = new Array(); for (var i = 0 ; i < 40 ; i++) ships.push(new Ship(7));

function updateShips(ships){
    for (i = 0 ; i < ships.length ; i++) ships[i].update();
}

function drawShips(ships){
    for (i = 0 ; i < ships.length ; i++) ships[i].draw();
}

function hyperspace() {
    clear();
    updateStars(stars);
    drawStars(stars);
    
    updateShips(ships);
    drawShips(ships);

    window.requestAnimationFrame(hyperspace)
}
