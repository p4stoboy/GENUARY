// YOINK: https://processing.org/examples/wolfram.html

class CA {
    cells;
    gen;
    scale;
    rules;
    length;

    constructor(width, r = [0,0,0,1,1,1,1,0]) {
        this.rules = r;
        this.scale = 20;
        this.cells = []
        this.length = width / this.scale;
        this.gen = 0;
        this.seed_cells();
    }

    seed_cells() {
        for (let i = 0; i < this.length; i++) {
            this.cells[i] = 0;
        }
        this.cells[this.length / 2] = 1;
    }

    restart() {
        this.cells = [];
        this.seed_cells();
        this.cells[this.length / 2] = 1;
        this.gen = 0;
    }

    generate() {
        let nextgen = [];
        for (let i = 1; i < this.cells.length-1; i++) {
            let left = this.cells[i-1];
            let curr = this.cells[i];
            let right = this.cells[i+1];
            nextgen[i] = this.executeRules(left, curr, right);
        }
        for (let i = 1; i < this.cells.length-1; i++) {
            this.cells[i] = nextgen[i];
        }
        this.gen++;
    }

    render() {
        let c = random(100) > 90 ? color(random(255), 255, 255) : color(counter % 255, 255, 255);
        for (let i = 0; i < this.cells.length; i++) {
            colorMode(HSB, 255);
            if (this.cells[i] == 1) {
                strokeWeight(5); //color(255 / height * this.gen * this.scale, 255, 255);
                fill(c);
                rect(i * this.scale, this.gen * this.scale + 2, this.scale, this.scale);
            }
        }
    }

    executeRules (a, b, c) {
        if (a == 1 && b == 1 && c == 1) { return this.rules[0]; }
        if (a == 1 && b == 1 && c == 0) { return this.rules[1]; }
        if (a == 1 && b == 0 && c == 1) { return this.rules[2]; }
        if (a == 1 && b == 0 && c == 0) { return this.rules[3]; }
        if (a == 0 && b == 1 && c == 1) { return this.rules[4]; }
        if (a == 0 && b == 1 && c == 0) { return this.rules[5]; }
        if (a == 0 && b == 0 && c == 1) { return this.rules[6]; }
        if (a == 0 && b == 0 && c == 0) { return this.rules[7]; }
        return 0;
    }

    finished() {
        if (this.gen > height / this.scale) {
            return true;
        } else {
            return false;
        }
    }

}

//////////////////////

let ca = new CA(800);
let ca2 = new CA(400);
let ca3 = new CA(1200);
let counter = 0;

function setup() {
    let myCanvas = createCanvas(800, 400);
    myCanvas.parent("sketch");
    background(255);
    stroke(0);
}

function draw() {
    if (counter % 3 === 0) {
        ca.render();
        ca.generate();
        if (ca.finished()) {
            ca.restart();
        }
    }
    if (counter % 4 === 0) {
        ca2.render();
        ca2.generate();
        if (ca2.finished()) {
            ca2.restart();
        }
    }
    if (counter % 5 === 0) {
        ca3.render();
        ca3.generate();
        if (ca3.finished()) {
            ca3.restart();
        }
    }
    noFill();
    strokeWeight(40);
    rect(0,0,width,height);
    counter++;
}

function mousePressed() {
    background(255);
    ca.restart();
    ca2.restart();
    ca3.restart();
}

