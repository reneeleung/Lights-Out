document.addEventListener('DOMContentLoaded', domloaded, false);
function domloaded() {
var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext('2d');
var moves = 0;
function isWon() {
        for (var i = 0, len = rects.length; i < len; i++) {
                if (colors[i] == 1) return false;
        }
        return true;
}
function clicked(rects, x, y) {
        var isClicked = false;
        for (var i = 0, len = rects.length; i < len; i++) {
                var left = rects[i].x, right = rects[i].x+rects[i].w;
                var top = rects[i].y, bottom = rects[i].y+rects[i].h;
                if (right >= x && left <= x && bottom >= y && top <= y) {
                        isClicked = rects[i];
                        toggle(rects, colors, i);
                        if (i - Math.sqrt(len) >= 0) toggle(rects, colors, i- Math.sqrt(len));
                        if (i + Math.sqrt(len) < len) toggle(rects, colors, i + Math.sqrt(len));
                        if (i%Math.sqrt(len) - 1 >= 0) toggle(rects, colors, i - 1);
                        if (i%Math.sqrt(len) + 1 < Math.sqrt(len)) toggle(rects, colors, i + 1);
                        moves++;
                        if (isWon() == true) {
                                alert("Solved in "+moves+" moves");
                                moves = 0;
                        }

                }
        }
        return isClicked;
}
function toggle(rects, colors, i) {
        if (colors[i] == 0) {
                colors[i] = 1;
                ctx.fillStyle = '#FFFF00';
        } else {
                colors[i] = 0;
                ctx.fillStyle = '#000080';
        }
        ctx.fillRect(rects[i].x, rects[i].y, rects[i].w, rects[i].h);
}

var rects = [{x: 0, y: 0, w: 120, h: 120},
             {x: 120, y: 0, w: 120, h: 120},
             {x: 240, y: 0, w: 120, h: 120},
             {x: 0, y: 120, w: 120, h: 120},
             {x: 120, y: 120, w: 120, h: 120},
             {x: 240, y: 120, w: 120, h: 120},
             {x: 0, y: 240, w: 120, h: 120},
             {x: 120, y: 240, w: 120, h: 120},
             {x: 240, y: 240, w: 120, h: 120}];
var colors = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function printGrid() {
        for (var i = 0, len = rects.length; i < len; i++) {
            if (colors[i] == 0) { ctx.fillStyle = '#000080'; } 
            if (colors[i] == 1) { ctx.fillStyle = '#FFFF00'; }
            ctx.fillRect(rects[i].x, rects[i].y, rects[i].w, rects[i].h);
        }
}

printGrid();

        
canvas.addEventListener('click', function (e) {
    console.log('click: ' + e.offsetX + '/' + e.offsetY);
    var rect = clicked(rects, e.offsetX, e.offsetY);
    if (rect) {
            console.log('collision: '+rect.x + '/' + rect.y);
    } else {
            console.log('no collision');
    }
}, false);

document.getElementById('shuffle').addEventListener('click', function(event){
        for (var i = 0, len = rects.length; i < len; i++) {
               var rand = Math.random();
              if (rand <= 0.5) {
                  colors[i] = 1;
              } else {
                  colors[i] = 0;
              }
        }
        moves = 0;
        printGrid();
});
document.getElementById('unsolve').addEventListener('click', function(event){
        printGrid();
});
document.getElementById('solve').addEventListener('click', function(event){
        var solutions = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        solutions[0] = colors[0] + colors[2] + colors[5] + colors[6] + colors[7];
        solutions[1] = colors[4] + colors[6] + colors[7] + colors[8];
        solutions[2] = colors[0] + colors[2] + colors[3] + colors[7] + colors[8];
        solutions[3] = colors[2] + colors[4] + colors[5] + colors[8];
        solutions[4] = colors[1] + colors[3] + colors[4] + colors[5] + colors[7];
        solutions[5] = colors[0] + colors[3] + colors[4] + colors[6];
        solutions[6] = colors[0] + colors[1] + colors[5] + colors[6] + colors[8];
        solutions[7] = colors[0] + colors[1] + colors[2] + colors[4];
        solutions[8] = colors[1] + colors[2] + colors[3] + colors[6] + colors[8];
        for (var i = 0, len = solutions.length; i < len; i++) {
                solutions[i] = solutions[i] % 2;
                if (solutions[i] == 1) {
                        ctx.strokeStyle = '#FF00FF';
                        ctx.lineWidth = 5;
                        ctx.strokeRect(rects[i].x, rects[i].y, rects[i].w-0.2, rects[i].h-0.2);
                }
        }
});
}
