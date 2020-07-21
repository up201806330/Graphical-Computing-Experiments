var resolution = 25;
var cols = Math.floor(canvas.width / resolution) + 1, rows = Math.floor(canvas.height / resolution) + 1;

class Squares{
    constructor(){
        this.field = new Array(cols); for (var i = 0 ; i < cols ; i++) this.field[i] = new Array(rows);
        for (var i = 0 ; i < cols ; i++)
            for (var j = 0 ; j < rows ; j++){
                this.field[i][j] = Math.random();
            }
    }

    getState(a, b, c, d){
        return Math.round(a) * 8 + Math.round(b) * 4 + Math.round(c) * 2 + Math.round(d) * 1;
    }

    draw(){
        for (var i = 0 ; i < cols ; i++){
            for (var j = 0 ; j < rows ; j++){
                ctx.beginPath();
                ctx.arc(i*resolution, j*resolution, 5, 0, 2*Math.PI);
                ctx.fillStyle = "rgb(" + 255*this.field[i][j] + "," + 255*this.field[i][j] + "," + 255*this.field[i][j] + ")";
                ctx.fill();
                ctx.closePath();
            }
        }

        for (var i = 0 ; i < cols - 1 ; i++){
            var x = i * resolution;
            for (var j = 0 ; j < rows - 1 ; j++){
                var y = j * resolution;
                
                var state = this.getState(this.field[i][j], this.field[i + 1][j], this.field[i + 1][j + 1], this.field[i][j + 1]);
                var ax = x + resolution * 0.5,  ay = y;
                var bx = x + resolution,        by = y + resolution * 0.5;
                var cx = x + resolution * 0.5,  cy = y + resolution;
                var dx = x,                     dy = y + resolution * 0.5;

                ctx.save();
                ctx.beginPath();
                ctx.strokeStyle = "black";

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