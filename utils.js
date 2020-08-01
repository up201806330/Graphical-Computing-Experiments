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
        return this;
    }

    copy(){
        return new vec2(this.x, this.y);
    }

    static fromAngle(a){
        return new vec2(Math.cos(a * Math.PI/180), Math.sin(a * Math.PI/180));
    }
}

function p5Map(n, start1, stop1, start2, stop2) {
    return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
}
