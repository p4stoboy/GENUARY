function setup() {
    let myCanvas = createCanvas(400, 400);
    myCanvas.parent("sketch");
    background(102);
}

function draw() {
    stroke(255);
    if (mouseIsPressed === true) {
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
}