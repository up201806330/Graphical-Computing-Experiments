var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

function clear(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

function main() {
    clear();

    if (spaceOn){
        if (autoSpeedOn) updateSpeed(2, 20);
        updateStars();
        drawStars();
    }
    
    if (squaresOn) squares.draw();

    if (boidsOn){
        updateBoids();
        drawBoids();
    }
    else{ // Resets if toggled off
        boids = new Array(); for (var i = 0 ; i < 100 ; i++) boids.push(new Boid());
        obstacles = new Array();
    }

    if (cardioidOn) {
        updateFactor(1, 20);
        cardioid.draw();
    }

    if (flowFieldOn){
        flowField.draw();
    }

    if (spaceOn)    drawSpeed();
    if (cardioidOn) drawFactor();

    window.requestAnimationFrame(main);
}
