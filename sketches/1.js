let size;
let rows;
let cols;
let step = 0;

function setup() {
    const myCanvas = createCanvas(400, 400);
    myCanvas.parent("sketch");
    size = 40;
    rows = width / size;
    cols = height / size;
    rectMode(CENTER);
    stroke(0);
    strokeWeight(3);
    colorMode(HSB, 255);
}

function draw() {
    step++;
    for (let x = 0; x < width; x += size) {
        for (let y = 0; y < height; y += size) {
            for (let z = 1; z < 3; z++){
                let c2 = color(((step + 255/z) / 2) % 255, 255, 255, 150);
                fill(c2);
                rect(x + size / 2,
                    y + size / 2,
                    step % (size / z),
                    step % (size / z));
            }
        }
    }
}