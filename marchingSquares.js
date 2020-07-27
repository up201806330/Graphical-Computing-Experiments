var resolution = 15;
var increment = 0.045;
var zOffset = 0; // Time
noise.seed(Math.random());
var cols = Math.floor(canvas.width / resolution) + 1, rows = Math.floor(canvas.height / resolution) + 1;

function lerp(a, b, t){
    return  a + (b - a) * t;
}

class Squares{
    constructor(){
        this.field = new Array(cols); for (var i = 0 ; i < cols ; i++) this.field[i] = new Array(rows);
    }

    getState(a, b, c, d){
        return Math.round(a) * 8 + Math.round(b) * 4 + Math.round(c) * 2 + Math.round(d) * 1;
    }

    draw(){

        var xOffset = 0;
        for (var i = 0 ; i < cols ; i++){
            var yOffset = 0;
            xOffset  += increment;
            for (var j = 0 ; j < rows ; j++){
                this.field[i][j] = noise.simplex3(xOffset, yOffset, zOffset);
                yOffset += increment;
            }
        }
        zOffset += 0.01;

        for (var i = 0 ; i < cols - 1 ; i++){
            var x = i * resolution;
            for (var j = 0 ; j < rows - 1 ; j++){
                var y = j * resolution;

                if (dotsOn){
                    ctx.beginPath();
                    ctx.arc(i*resolution, j*resolution, 5, 0, 2*Math.PI);
                    ctx.fillStyle = "rgb(" + 255*this.field[i][j] + "," + 255*this.field[i][j] + "," + 255*this.field[i][j] + ")";
                    ctx.fill();
                    ctx.closePath(); 
                }

                
                var state = this.getState(Math.ceil(this.field[i][j]), Math.ceil(this.field[i + 1][j]), Math.ceil(this.field[i + 1][j + 1]), Math.ceil(this.field[i][j + 1]));
                
                if (interpolationOn){ 
                    var aVal = this.field[i    ][j    ] + 1;
                    var bVal = this.field[i + 1][j    ] + 1;
                    var cVal = this.field[i + 1][j + 1] + 1;
                    var dVal = this.field[i    ][j + 1] + 1;

                    var t = (1 - aVal) / (bVal - aVal);
                    var ax = lerp(x, x + resolution, t), ay = y;

                    t = (1 - bVal) / (cVal - bVal);
                    var bx = x + resolution, by = lerp(y, y + resolution, t);

                    t = (1 - dVal) / (cVal - dVal);
                    var cx = lerp(x, x + resolution, t), cy = y + resolution;

                    t = (1 - aVal) / (dVal - aVal);
                    var dx = x, dy = lerp(y, y + resolution, t);
                } 
                else {
                    var ax = x + resolution * 0.5,  ay = y;
                    var bx = x + resolution,        by = y + resolution * 0.5;
                    var cx = x + resolution * 0.5,  cy = y + resolution;
                    var dx = x,                     dy = y + resolution * 0.5;
                }
                
                ctx.save();
                ctx.beginPath();
                ctx.lineWidth = 4;
                ctx.strokeStyle = "grey";

                switch(Math.round(state)){
                    case 1:
                        ctx.moveTo(cx, cy);
                        ctx.lineTo(dx, dy);
                        break;
                    case 2:
                        ctx.moveTo(bx, by);
                        ctx.lineTo(cx, cy);
                        break;
                    case 3:
                        ctx.moveTo(bx, by);
                        ctx.lineTo(dx, dy);
                        break;
                    case 4:
                        ctx.moveTo(ax, ay);
                        ctx.lineTo(bx, by);
                        break;
                    case 5:
                        ctx.moveTo(ax, ay);
                        ctx.lineTo(dx, dy);
                        ctx.moveTo(bx, by);
                        ctx.lineTo(cx, cy);
                        break;
                    case 6:
                        ctx.moveTo(ax, ay);
                        ctx.lineTo(cx, cy);
                        break;
                    case 7:
                        ctx.moveTo(ax, ay);
                        ctx.lineTo(dx, dy);
                        break;
                    case 8:
                        ctx.moveTo(ax, ay);
                        ctx.lineTo(dx, dy);
                        break;
                        break;
                    case 9:
                        ctx.moveTo(ax, ay);
                        ctx.lineTo(cx, cy);
                        break;
                    case 10:
                        ctx.moveTo(ax, ay);
                        ctx.lineTo(bx, by);
                        ctx.moveTo(cx, cy);
                        ctx.lineTo(dx, dy);
                        break;
                    case 11:
                        ctx.moveTo(ax, ay);
                        ctx.lineTo(bx, by);
                        break;
                    case 12:
                        ctx.moveTo(bx, by);
                        ctx.lineTo(dx, dy);
                        break;
                    case 13:
                        ctx.moveTo(bx, by);
                        ctx.lineTo(cx, cy);
                        break;
                    case 14:
                        ctx.moveTo(cx, cy);
                        ctx.lineTo(dx, dy);
                        break;
                }

                ctx.stroke();

                ctx.closePath();
                ctx.restore();
            }
        }
    }
}
var squares = new Squares();