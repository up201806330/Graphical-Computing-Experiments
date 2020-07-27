var speedSlider = document.getElementById("speedSlider"), speed = speedSlider.value;
function speedTick(){
    speed = speedSlider.value;
}
    
function updateSpeed(lowB, upB){
    speed = Math.cos(Date.now()/6000)*(upB-lowB)/2 + (upB+lowB)/2;
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
        var r  = p5Map(this.z, 0, canvas.width, 5, 0);

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

function drawSpeed(){ 
    var ctx = canvas.getContext("2d");
    ctx.font = "25px Times New Roman";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText(Math.round(speed*100)/100, canvas.width - 70, 30);   
}