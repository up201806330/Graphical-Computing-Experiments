var resolution = 15;
var increment = 0.045;
var zOffset = 0;
var colorOffset = 0;
noise.seed(Math.random());
var cols = Math.floor(canvas.width / resolution) + 1, rows = Math.floor(canvas.height / resolution) + 1;

var particleSpeedSlider = document.getElementById("particleSpeedSlider"), particleSpeed = particleSpeedSlider.value;
function particleSpeedTick(){
    particleSpeed = particleSpeedSlider.value;
}

var timeIncrementSlider = document.getElementById("timeIncrementSlider"), timeIncrement = timeIncrementSlider.value;
function timeIncrementTick(){
    timeIncrement = timeIncrementSlider.value;
}

class FlowField{
    constructor(){
        this.field = new Array(cols * rows);

        var xOffset = 0;
        for (var i = 0 ; i < cols ; i++){
            var yOffset = 0;
            xOffset  += increment;
            for (var j = 0 ; j < rows ; j++){
                var index = i + j * cols;
                this.field[index] = vec2.fromAngle(noise.simplex3(xOffset, yOffset, zOffset)*360).mult(1);
                yOffset += increment;
            }
        }
    }

    draw(){
        var xOffset = 0;
        for (var i = 0; i < cols; i++) {
            let x = i * resolution;
            var yOffset = 0;
            xOffset += increment;
            for (var j = 0; j < rows; j++) {
                var index = i + j * cols;
                let y = j * resolution;

                if (timeIncrement > 0) this.field[index] = vec2.fromAngle(noise.simplex3(xOffset, yOffset, zOffset)*360).mult(1);

                if (vectorsOn){
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + this.field[index].x * resolution, y + this.field[index].y * resolution);
                    ctx.strokeStyle = "rgba(" + 255 + "," + 255 + "," + 255 + "," + 0.3 + ")";
                    ctx.stroke();
                    ctx.closePath();
                }

                yOffset += increment;
            }
        }
        zOffset += parseFloat(timeIncrement);
        colorOffset += 0.04

        for (var i = 0 ; i < particles.length ; i++){
            particles[i].update();
            particles[i].draw();
        }
    }
}
var flowField = new FlowField();

class Particle{
    constructor(){
        this.pos = new vec2(Math.floor(Math.random()*canvas.width), Math.floor(Math.random()*canvas.height));
        this.vel = new vec2();
        this.acc = new vec2();
        this.history = new Array();
    }

    edges(){
        if (this.pos.x > canvas.width)  this.pos.x = 0;
        if (this.pos.x < 0)             this.pos.x = canvas.width;
        if (this.pos.y > canvas.height) this.pos.y = 0;
        if (this.pos.y < 0)             this.pos.y = canvas.height;
    }

    update(){
        this.history.push(this.pos.copy());
        if (this.history.length > 500) this.history.splice(0,1);

        this.acc = flowField.field[Math.floor(this.pos.x/resolution) + Math.floor(this.pos.y/resolution)*cols];
        this.vel.add(this.acc);
        this.vel.limit(particleSpeed);
        this.pos.add(this.vel);
        this.edges();
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 5, 0, 2*Math.PI);
        ctx.fillStyle = "rgb(" + (255 * this.pos.x/canvas.width) + "," + (Math.cos(colorOffset)*(255/2) + (255/2)) + "," + (255 * this.pos.y/canvas.height) + ")";;
        ctx.fill();
        ctx.closePath();

        if (tracesOn){
            for (var i = 0 ; i < this.history.length ; i++){
                var pos = this.history[i];
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, 1, 0, 2*Math.PI);
                ctx.fillStyle = "rgba(255,255,255,0.2)";
                ctx.fill();
                ctx.closePath();
            }
        }  
    }
}
var particles = new Array(); 

function newField(){
    noise.seed(Math.random());
    flowField = new FlowField();
    particles = new Array(); for (var i = 0 ; i < 800 ; i++) particles[i] = new Particle();
}

var down;
canvas.addEventListener("mousedown", function(event) {
    down = true;
    var p = new Particle(); p.pos.x = event.clientX; p.pos.y = event.clientY;
    particles.push(p); 
});

canvas.addEventListener("mousemove", function(event) {
    if (down){
        var p = new Particle(); p.pos.x = event.clientX; p.pos.y = event.clientY;
        particles.push(p); 
    }
});

document.body.addEventListener("mouseup", function() {
    down = false;
});