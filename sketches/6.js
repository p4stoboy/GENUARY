let target;
let line_no;
let start;
let pos;
let count = 0;
let ang;
let x_off;
let y_off;
let points;
let loops = 1;
let cutoff;
let transparency;
let sw;
let dafont;

function setup() {
    const myCanvas = createCanvas(500, 700, P2D);
    myCanvas.parent("sketch");
    dafont = loadFont('./Imagine_Font.ttf');
    textFont(dafont);
    init(65, 6);
}

function init(t, _sw) {
    textSize(19);
    cutoff = 500;
    start = createVector(floor(random(width)), floor(random(100, cutoff)));
    target = createVector(floor(random(width)), floor(random(100, cutoff)));
    pos = start.copy();
    background(255);
    line_no = 1;
    strokeWeight(sw);
    points = [start.copy()];
    colorMode(HSB, 359, 100, 100, 100);
    frameRate(60);
    transparency = t;
    sw = _sw;
}

function draw(){
    strokeWeight(sw);
    // background(359, 0, 100, 5);
    fill(color(frameCount % 360, 100, 100, transparency));
    // stroke(color(frameCount % 360, 100, 100, 100));
    if (dist(x_off, y_off, target.x, target.y) < 8) {
        pos.set(x_off, y_off);
        line_no++;
        points.push(target.copy());
        if (line_no % 3 === 0) {
            target = start.copy();
        } else {
            target = createVector(floor(random(width)), floor(random(100, cutoff)));
        }
        count = 0;
        if (line_no % 3 === 1) {
            draw_tris(points);
            // triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y);
            points = [];
            pos = createVector(floor(random(width)), floor(random(100, cutoff)));
            target = createVector(floor(random(width)), floor(random(100, cutoff)));
            start = pos.copy();
            points.push(pos.copy());
            if (frameCount > 900 * loops) {
                loops++;
                init(transparency, sw);
            }
        }
    }
    count+=8;
    ang = atan2(target.y - pos.y, target.x - pos.x);
    x_off = pos.x + (cos(ang) * count);
    y_off = pos.y + (sin(ang) * count);
    // line(pos.x, pos.y, x_off, y_off);
    stroke(0);
    draw_lines(pos, x_off, y_off);
    noFill();
    rect(0, 0, width, height);
    noStroke();
    fill(255);
    rect(10, 630, width- 30, 30);
    rect(10, 30, width- 30, 30);
    fill(0);
    text(`transparency: ${transparency}`, 20, 650);
    text(`press UP or DOWN to adjust transparency.`, 20, 680);
    text(`thickness: ${sw}`, 20, 50);
    text(`press LEFT or RIGHT to adjust thickness.`, 20, 80);
}
function draw_tris(points) {
    stroke(0);
    triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y);
    triangle(width - points[0].x, points[0].y, width - points[1].x, points[1].y, width - points[2].x, points[2].y);
    triangle(points[0].x, height - points[0].y, points[1].x, height - points[1].y, points[2].x, height - points[2].y);
    triangle(width - points[0].x, height - points[0].y, width - points[1].x, height - points[1].y, width - points[2].x, height - points[2].y);
}

function draw_lines(pos, x_off, y_off) {
    stroke(0);
    line(pos.x, pos.y, x_off, y_off);
    line(width - pos.x, pos.y, width - x_off, y_off);
    line(pos.x, height - pos.y, x_off, height - y_off);
    line(width - pos.x, height - pos.y, width - x_off, height - y_off);
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        transparency = constrain(transparency + 5, 0, 100);
    }
    if (keyCode === DOWN_ARROW) {
        transparency = constrain(transparency - 5, 0, 100);
    }
    if (keyCode === LEFT_ARROW) {
        sw = constrain(sw - 1, 1, 10);
    }
    if (keyCode === RIGHT_ARROW) {
        sw = constrain(sw + 1, 1, 10);
    }
}
