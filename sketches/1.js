let size;
let rows;
let cols;
let step = 0;

function setup() {
    let myCanvas = createCanvas(400, 400);
    myCanvas.parent("sketch");    const w = myCanvas.width;
    init();
}

function init() {
    const h = height;
    const w = width;
    size = 40;
    rows = w / size;
    cols = h / size
    console.log(rows);
}

function draw() {
    stroke(0);
    strokeWeight(3);
    colorMode(HSB, 255);
    step++;
    for (let x = 0; x < width; x += size) {
        for (let y = 0; y < height; y += size) {
            for (let z = 1; z < 3; z++){
                let c2 = color(((step + 255/z) / 2) % 255, 255, 255, 150);
                fill(c2);
                rectMode(CENTER);
                rect(x + size / 2,
                    y + size / 2,
                    step % (size / z),
                    step % (size / z));
            }
        }
    }
}