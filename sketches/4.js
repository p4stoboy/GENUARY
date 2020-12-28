class Block{
    pos;
    tile;
    state;
    parent;

    constructor(_parent, _state, _x, _y, _block_size){
        this.parent = _parent;
        this.state = _state;
        this.pos = new p5.Vector();
        this.tile = new p5.Vector();
        this.pos.x = _parent.pos.x + _x * _block_size;
        this.pos.y = _parent.pos.y + _y * _block_size;
        this.tile.x = _x;
        this.tile.y = _y;
    }

    neighbours(){
        let x = this.tile.x;
        let y = this.tile.y;
        if((this.parent.cells[x][y].tile.x !=0 && this.parent.cells[x-1][y].state == 1) || (this.parent.cells[x][y].tile.x != this.parent.num_blocks-1 && this.parent.cells[x+1][y].state == 1) || (this.parent.cells[x][y].tile.y !=0 && this.parent.cells[x][y-1].state == 1) || (this.parent.cells[x][y].tile.y != this.parent.num_blocks-1 && this.parent.cells[x][y+1].state == 1)){
            return true;
        }
        else{
            return false;
        }
    }
}

class Dude{
    pos;
    size;
    num_blocks;
    block_size;
    body_color;
    outline_color;
    cells;

    constructor(_pos, _size, _num_blocks, _col){
        this.pos = _pos;
        this.size = _size;
        this.num_blocks = _num_blocks;
        this.block_size = this.size/this.num_blocks;
        this.body_color = _col;
        this.outline_color = color(hue(this.body_color), saturation(this.body_color) + 50, 50);
        this.cells = [];
        for (let i = 0; i < this.num_blocks; i++){
            this.cells[i] = [];
        }
    }
    generate(){
        for(let x = 0; x < floor((this.num_blocks+1)/2); x++){
            for(let y = 0; y < this.num_blocks; y++){
                let the_state = floor(random(0,1.9999));
                if(x == 0 || x == this.num_blocks -1 || y == 0 || y == this.num_blocks -1){
                    the_state = 0;
                }
                this.cells[x][y] = new Block(this, the_state, x, y, this.block_size);
                if(x != (this.num_blocks-1)/2.00){
                    this.cells[this.num_blocks-1-x][y] = new Block(this, this.cells[x][y].state, this.num_blocks-1-x, y, this.block_size);
                }
            }
        }
        for(let x = 0; x < this.num_blocks; x++){
            for(let y = 0; y < this.num_blocks; y++){
                if(this.cells[x][y].state == 0 && this.cells[x][y].neighbours()){
                    this.cells[x][y].state = 2;
                }
            }
        }
    }
    display(){
        noStroke();
        for(let x = 0; x < this.num_blocks; x++){
            for(let y = 0; y < this.num_blocks; y++){
                switch(this.cells[x][y].state){
                    case 1:
                        fill(this.body_color);
                        break;
                    case 2:
                        fill(this.outline_color);
                        break;
                    default:
                        fill(359);
                        break;
                }
                rect(this.cells[x][y].pos.x, this.cells[x][y].pos.y, this.block_size, this.block_size);
            }
        }
    }
}

let dudes;
let h;
function setup() {
    dudes = [];
    colorMode(HSB, 360, 100, 100);
    let myCanvas = createCanvas(605, 305);
    myCanvas.parent("sketch");
    background(359);
    stroke(0);
    h = 0;
    for(let x = 5; x < 600; x+=30){
        for(let y = 5; y < 300; y+=30){
            the_dude = new Dude(new p5.Vector(x,y), 25, 10, color(h % 359,random(35, 50),100));
            h+=random(1, 30);
            the_dude.generate();
            dudes.push(the_dude);
        }
    }
}

function draw(){
    stroke(0);
    strokeWeight(5);
    rect(0, 0, width, height);
    for(let dude of dudes) {
        dude.display();
    }
}

function mousePressed(){
    setup();
}