var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

function p5Map(n, start1, stop1, start2, stop2) {
    return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
}

function clear(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle="grey";
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

var speedChanginOn = false;
function toggleSpeed(){
    var text = document.getElementById("speedText"), slider = document.getElementById("speedSlider");
    if (speedChanginOn){
        speedChanginOn = false;
        speedTick();
        text.style.display = "inline";
        slider.style.display = "inline";    
    }
    else{
        speedChanginOn = true;
        text.style.display = "none";
        slider.style.display = "none";
    }
}
var spaceOn = false;
function toggleSpace() {
    var speed = document.getElementById("speedButton");
    if (spaceOn){
        spaceOn = false;
        speed.style.display = "none"
    }    
    else{
        spaceOn = true;
        speed.style.display = "inline"
    }
}
var boidsOn = false;
function toggleBoids() {
    if (boidsOn)    boidsOn = false;
    else            boidsOn = true;
}

function main() {
    clear();

    if (spaceOn){
        if (speedChanginOn) updateSpeed(2, 20);
        updateStars(stars);
        drawStars(stars);
        drawSpeed();
    }
    
    if (boidsOn){
        updateBoids(boids);
        drawBoids(boids);
    }
    else{ // Resets if toggled off
        boids = new Array(); for (var i = 0 ; i < 100 ; i++) boids.push(new Boid(3));
    }

    squares.draw();

    window.requestAnimationFrame(main)
}
