var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
ctx.translate(canvas.width/2, canvas.height/2);
var speed = 20, growing = true;

function p5Map(n, start1, stop1, start2, stop2) {
    return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
}

function updateSpeed(){
    speed = Math.cos(Date.now()/5000)*15 + 20;
}

class Star{
    constructor(){
        this.x = Math.floor(Math.random()*canvas.width*2)-canvas.width;
        this.y = Math.floor(Math.random()*canvas.height*2)-canvas.height;
        this.z = Math.floor(Math.random()*canvas.width);
        this.pz = this.z;
    }

    draw(){
        ctx.beginPath();

        var sx = p5Map(this.x/this.z, 0, 1, 0, canvas.width);
        var sy = p5Map(this.y/this.z, 0, 1, 0, canvas.height);
        var r = p5Map(this.z, 0, canvas.width, 5, 0);

        ctx.arc(sx, sy, 1, 0, r);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        ctx.closePath();
    }

    update(constantSpeed){
        this.z -= speed;
        if (this.z<1){
            this.z=canvas.width;
            this.x = Math.floor(Math.random()*canvas.width*2)-canvas.width;
            this.y = Math.floor(Math.random()*canvas.height*2)-canvas.height;
            this.pz=this.z;
        }
        if (!constantSpeed) updateSpeed();
    }
}
var stars = new Array(); for (var i = 0 ; i < 600 ; i++) stars.push(new Star());

function update(stars, constantSpeed){
    for (i = 0 ; i < stars.length ; i++) stars[i].update(constantSpeed);
}

function draw(stars){
    for (i = 0 ; i < stars.length ; i++) stars[i].draw();
}

function clear(){
    ctx.translate(-canvas.width/2, -canvas.height/2);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle="black";
    ctx.fillRect(0,0, canvas.width, canvas.height);
    ctx.translate(canvas.width/2, canvas.height/2);
}

function hyperspace(constantSpeed) {
    clear();
    update(stars, constantSpeed);
    draw(stars);
    window.requestAnimationFrame(hyperspace)
}
