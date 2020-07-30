class vec2{
    constructor(x = 0, y = 0){
        this.x = x;
        this. y = y;
    }

    add(other){
        this.x += other.x;
        this.y += other.y;
        return this;
    }

    sub(other){
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }

    mag(){
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    magSq(){
        return this.x*this.x + this.y*this.y;
    }

    mult(a){
        this.x *= a;
        this.y *= a;
        return this;
    }

    div(a){
        this.x /= a;
        this.y /= a;
        return this;
    }

    normalize(){
        if (this.x != 0) this.x /= Math.sqrt(this.x*this.x + this.y*this.y);
        if (this.y != 0) this.y /= Math.sqrt(this.x*this.x + this.y*this.y);
        return this;
    }

    dist(other){
        return Math.sqrt((other.x - this.x)*(other.x - this.x) + (other.y - this.y)*(other.y - this.y));
    }

    limit(max){
        var mgsq = this.magSq();
        if (mgsq > max*max){
            this.div(Math.sqrt(mgsq));
            this.mult(max);
        }
    }

    copy(){
        return new vec2(this.x, this.y);
    }
}

class Boid{
    constructor(x = 0, y = 0){
        // Constants
        this.maxSpeed = 3;
        this.friendRadius = 60;
        this.crowdRadius = 23;
        this.cohesionRadius = 60;

        // Coordinates of tip
        if (x == 0 && y == 0)
            this.u = new vec2(Math.floor(Math.random()*canvas.width), 
                Math.floor(Math.random()*canvas.height));
        else 
            this.u = new vec2(x, y);

        this.v = new vec2(Math.floor(Math.random() * 2 - 1), Math.floor(Math.random() * 2 - 1));
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

        for (var i = 0 ; i < boids.length ; i++){
            var other = boids[i];
            var d = this.u.dist(other.u);
            if (d > 0 && d < this.friendRadius) {
                var copy = other.v.copy();
                copy.normalize();
                copy.div(d);
                sum.add(copy);
                count++;
            }
        }
        if (count > 0) sum.div(count);
        return sum;
    }

    getAvoidDir(){
        var sum = new vec2(), count = 0;

        for (var i = 0 ; i < boids.length ; i++){
            var other = boids[i];
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
        if (count > 0) sum.div(count);
        return sum
    }

    getCohesionDir(){
        var sum = new vec2(), count = 0;

        for (var i = 0 ; i < boids.length ; i++){
            var other = boids[i];
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

    update(){
        this.thinkTimer = (this.thinkTimer + 1) % 5;
        if (this.thinkTimer == 0) this.getFriends(); // Expensive


        // Other factors
        var avgDir = this.getAverageDirection();                avgDir.mult(1)
        var avoidDir = this.getAvoidDir();                      avoidDir.mult(2);
        var cohesionDir = this.getCohesionDir();                cohesionDir.mult(0.005);
        var noise = new vec2(Math.floor(Math.random() * 3) - 1, 
        Math.floor(Math.random() * 3) - 1);                     noise.mult(0.01);
        
        this.v.add(avgDir); 
        this.v.add(avoidDir); this.v.add(noise);
        this.v.add(cohesionDir);
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
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(-this.d, this.h);
        ctx.lineTo(this.d, this.h);
        ctx.closePath();
        
        ctx.restore();
    }
} 
var boids = new Array(); for (var i = 0 ; i < 100 ; i++) boids.push(new Boid());

function updateBoids(){
    for (var i = 0 ; i < boids.length ; i++) boids[i].update();
}

function drawBoids(){
    for (var i = 0 ; i < boids.length ; i++) boids[i].draw();
}

canvas.addEventListener("click", (event) => {
    boids.push(new Boid(event.clientX, event.clientY));
});
canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    
    return false;
});