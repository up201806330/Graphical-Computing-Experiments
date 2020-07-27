var factor = 2;
var r = canvas.width/4;

var slider = document.getElementById("totalSlider"), total = slider.value;
function totalTick(){
    total = slider.value;
}
slider.addEventListener("change", totalTick);   

function updateFactor(lowB, upB){
    factor = Math.cos(Date.now()/10000)*(upB-lowB)/2 + (upB+lowB)/2;
}

class Cardioid{
    draw(){
        ctx.save();
        ctx.fillStyle = "white";
        ctx.strokeStyle = "white";

        ctx.translate(canvas.width/2, canvas.height/2);
        for (var i = 0 ; i < total ; i++){
            ctx.beginPath();

            var angleA = p5Map(i, 0, total, 0, Math.PI*2);
            var angleB = p5Map((i * factor) % total, 0, total, 0, Math.PI*2);
            var xA = Math.cos(angleA + Math.PI) * r, yA = Math.sin(angleA + Math.PI) * r;
            var xB = Math.cos(angleB + Math.PI) * r, yB = Math.sin(angleB + Math.PI) * r;

            ctx.arc(xA, yA, 5, 0, Math.PI*2); 
            ctx.fill();

            ctx.moveTo(xA, yA);
            ctx.lineTo(xB, yB);
            ctx.stroke();

            ctx.closePath();
        }
        
        ctx.restore();
    }
}
cardioid = new Cardioid();