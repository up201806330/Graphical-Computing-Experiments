var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

function p5Map(n, start1, stop1, start2, stop2) {
    return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
}

function clear(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

function main() {
    clear();

    if (spaceOn){
        if (autoSpeedOn) updateSpeed(2, 20);
        updateStars(stars);
        drawStars(stars);
    }
    
    if (squaresOn) squares.draw();

    if (boidsOn){
        updateBoids(boids);
        drawBoids(boids);
    }
    else{ // Resets if toggled off
        boids = new Array(); for (var i = 0 ; i < 100 ; i++) boids.push(new Boid(3));
    }

    if (cardioidOn) {
        updateFactor(1, 20);
        cardioid.draw();
    }

    if (spaceOn) drawSpeed();

    window.requestAnimationFrame(main);
}
