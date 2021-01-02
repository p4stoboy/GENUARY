let base = 25
let step = 1;
let big_step = 0;
let step_val = 6;
let dafont;
const datext =
    "background(color((big_step + 180) % 360, 200, 100));" +
    "for(let i = -width/2; i < width/2; i += base) {" +
    "for(let j = -height/2; j < height/2; j += base) {" +
    "fill(color(big_step % 360, step % 401, 100));" +
    "push();" +
    "translate(i, j, (step % 401) / 4);" +
    "box(base, base, (step % 401) / 2);" +
    "pop();" +
    "step += step_val;" +
    "}" +
    "}" +
    "step_val = frameCount % 20 === 0 ? step_val % 25 + 1 : step_val;" +
    "big_step++;"
function setup() {
    const myCanvas = createCanvas(500, 500, WEBGL);
    myCanvas.parent("sketch");
    stroke(0);
    strokeWeight(5);
    camera(width / 2 + 100, height / 2 + 100, 800, 0, 1, 0, 1, 1, 1);
    colorMode(HSB, 360, 400, 100);
    frameRate(10);
    dafont = loadFont('./Imagine_Font.ttf');
    textFont(dafont);
    textSize(19);
}

function draw(){
    //draw sketch
    background(color((big_step + 180) % 360, 200, 100));
    for(let i = -width/2; i < width/2; i += base) {
        for(let j = -height/2; j < height/2; j += base) {
            fill(color(big_step % 360, step % 401, 100));
            push();
            translate(i, j, (step % 401) / 4);
            box(base, base, (step % 401) / 2);
            pop();
            step += step_val;
        }
    }
    step_val = frameCount % 40 === 0 ? step_val % 25 + 1 : step_val;
    big_step++;
    // draw code
    push();
    fill(0);
    translate(-width/2, -height/2, 0);
    rotateZ(radians(-90));
    text(datext, -width/1.1, 500, 500, 400);
    pop();
}

