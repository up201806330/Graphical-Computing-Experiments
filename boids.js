class Boid{
    constructor(){
        // Constants
        this.maxSpeed = 3;
        this.friendRadius = 60;
        this.crowdRadius = 50;
        this.cohesionRadius = 60;
        this.obstacleRadius = 10;

        // Coordinates of tip

        this.u = new vec2(Math.random()*canvas.width, Math.random()*canvas.height);

        this.v = new vec2(Math.random() * 2 - 1, Math.random() * 2 - 1);
        this.v.mult(this.maxSpeed);

        // Measurements
        this.d = 8;                                     // Side
        this.h = 4*this.d * Math.cos(Math.PI / 6);      // Height

        this.color = (Math.floor(Math.random()*2) ? "#000066" : "#00ccff");
        this.thinkTimer = Math.floor(Math.random()*10);
        this.friends = new Array();       
    }

    getFriends(){
        var nearby = new Array();
        for (var i = 0 ; i < boids.length ; i++){
            var other = boids[i];
            if (other==this) continue;
            if (this.u.dist(other.u) < this.friendRadius) nearby.push(other);
        }
        this.friends = nearby;
    }

    getAverageDirection(){
        var sum = new vec2(), count = 0;

        for (var i = 0 ; i < this.friends.length ; i++){
            var other = this.friends[i];
            var d = this.u.dist(other.u);
            if (d > 0 && d < this.friendRadius) {
                var copy = other.v.copy();
                copy.normalize();
                copy.div(d);
                sum.add(copy);
                count++;
            }
        }
        //if (count > 0) sum.div(count);
        return sum;
    }

    getAvoidDir(){
        var sum = new vec2(), count = 0;

        for (var i = 0 ; i < this.friends.length ; i++){
            var other = this.friends[i];
            var d = this.u.dist(other.u);
            if (d > 0 && d < this.crowdRadius) {
                var diff = this.u.copy();
                diff.sub(other.u);
                diff.normalize();
                diff.div(d);
                sum.add(diff);
                count++;
            }
        }
        //if (count > 0) sum.div(count);
        return sum
    }

    getCohesionDir(){
        var sum = new vec2(), count = 0;

        for (var i = 0 ; i < this.friends.length ; i++){
            var other = this.friends[i];
            var d = this.u.dist(other.u);
            if (d > 0 && d < this.cohesionRadius) {
                sum.add(other.u);
                count++
            }
        }
        if (count > 0) {
            sum.div(count);
            sum.sub(this.u);
            return sum;
        }
        else {
            return new vec2();
        }

    }

    getObstacleDir(){
        var sum = new vec2(), count = 0;

        for (var i = 0 ; i < obstacles.length ; i++){
            var other = obstacles[i];
            var d = this.u.dist(other.u);
            if (d > 0 && d < other.size*2) {
                var diff = this.u.copy();
                diff.sub(other.u);
                diff.normalize();
                diff.div(d);
                sum.add(diff);
                count++;
            }
        }
        //if (count > 0) sum.div(count);
        sum.mult(this.friends.length * 0.75);
        return sum
    }

    getNoiseDir(){
        return new vec2(Math.floor(Math.random() * 3) - 1, Math.floor(Math.random() * 3) - 1);
    }

    update(){
        this.thinkTimer = (this.thinkTimer + 1) % 5;
        if (this.thinkTimer == 0) this.getFriends(); // Expensive


        // Other factors
        var forces = new Array();
        forces.push(this.getAverageDirection(). mult(1));
        forces.push(this.getAvoidDir().         mult(1));
        forces.push(this.getCohesionDir().      mult(0.005));
        forces.push(this.getObstacleDir().      mult(3));
        forces.push(this.getNoiseDir().         mult(0.01));
        
        for (var i = 0 ; i < forces.length ; i++) this.v.add(forces[i]);
        this.v.limit(this.maxSpeed);
        this.u.add(this.v);

        // Map Bounds
        if (this.u.x>canvas.width)    this.u.x=0;
        if (this.u.x<0)               this.u.x=canvas.width;
        if (this.u.y>canvas.height)   this.u.y=0;
        if (this.u.y<0)               this.u.y=canvas.height;
    }

    draw(){
        ctx.save();
        
        ctx.translate(this.u.x - this.d/2, this.u.y - this.h / 2);
        ctx.rotate(Math.atan2(this.v.y, this.v.x) + Math.PI / 2);

        // Boid body
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(-this.d, this.h);
        ctx.lineTo(this.d, this.h);
        ctx.closePath();
        ctx.fill();
    
        ctx.restore();
    }
} 
var boids = new Array();
var obstacles = new Array();

class Obstacle{
    constructor(x, y, size, transparent = false){
        this.u = new vec2(x, y);
        if (!transparent) this.color = "#660000";
        else              this.color = "rgba(0,0,0,0)";
        this.size = size
    }

    draw(){
        ctx.save();

        // Boid body
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.u.x, this.u.y, this.size, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
        
        ctx.restore();
    }
}

function updateBoids(){
    for (var i = 0 ; i < boids.length ; i++) boids[i].update();
}

function drawBoids(){
    ctx.save();
    for (var i = 0 ; i < boids.length ; i++) boids[i].draw();
    for (var i = 0 ; i < obstacles.length ; i++) obstacles[i].draw();
    ctx.restore();
}

canvas.addEventListener("click", (event) => {
    var boid = new Boid(); boid.u.x = event.clientX; boid.u.y = event.clientY;
    boids.push(boid);
});
canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    obstacles.push(new Obstacle(event.clientX, event.clientY, 7));
    return false;
});