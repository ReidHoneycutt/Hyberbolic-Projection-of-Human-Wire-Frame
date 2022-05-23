let W = window.innerWidth;
let H = window.innerHeight;
let L;

let R = 100;
let x;
let y;
let x1;
let y1;
let x2;
let y2;


let w;
let h;
let temp_x = [];
let temp_y = [];
let scaled = [];

let D;

function setup() {
    createCanvas(W, H);
    background(0);
    L = wire_frame.length;
    D = new Disc(W/2, H/2, R);
    for (let k = 0; k < L; k++) {
        scaled[k] = [];
        for (let l = 0; l < 33; l++) {
            temp_x[l] = wire_frame[k][l][1];
            temp_y[l] = wire_frame[k][l][2];
        }
        w = abs(max(temp_x) - min(temp_x));
        h = abs(max(temp_y) - min(temp_y));
        for (let m = 0; m < 33; m++) {
            x = (5/6)*W*abs(wire_frame[k][m][1]-min(temp_x))/w+(1/12)*W;
            y = (5/6)*H*abs(wire_frame[k][m][2]-min(temp_y))/h+(1/12)*H;
            scaled[k][m] = createVector(x, y);
        }
    }
    console.log('SETUP COMPLETE');
}

function draw() {
    background(0);
    colorMode(HSB, 1, 1, 1);
    let i = frameCount % L;

    let mean_x = (scaled[i][11].x+scaled[i][12].x+scaled[i][23].x+scaled[i][24].x)/4;
    let mean_y = (scaled[i][11].y+scaled[i][12].y+scaled[i][23].y+scaled[i][24].y)/4;
    let d1 = dist(mean_x, mean_y, scaled[i][11].x, scaled[i][11].y);
    let d2 = dist(mean_x, mean_y, scaled[i][12].x, scaled[i][12].y);
    let d3 = dist(mean_x, mean_y, scaled[i][23].x, scaled[i][23].y);
    let d4 = dist(mean_x, mean_y, scaled[i][24].x, scaled[i][24].y);
    R = min([d1, d2, d3, d4]);
    R = R-0.2*R;

    D = new Disc(mouseX, mouseY, R);

    strokeWeight(0.2);
    stroke(1, 0, 1);
    noFill();
    ellipse(D.o_x, D.o_y, 2*R);
        
    for (let j = 0; j < 33; j++) {
        x = scaled[i][j].x;
        y = scaled[i][j].y;

        fill(1, 0, 1);
        noStroke();
        ellipse(x, y, 10);
        strokeWeight(0.2);
        stroke(1, 0, 1);

        let C = connecs[j];
        for (let k = 0; k < C.length; k++) {
            x1 = scaled[i][C[k]].x
            y1 = scaled[i][C[k]].y;
            line(x, y, x1, y1);
        }

        x1 = (x-D.o_x) / R;
        y1 = (-y+D.o_y) / R;

        x2 = x1 / (x1*x1+y1*y1);
        y2 = y1 / (x1*x1+y1*y1);

        x = x2*R+D.o_x;
        y = -y2*R+D.o_y;

        fill(map(i, 0, L, 0, 1), 1, 1);
        noStroke();
        ellipse(x, y, 5);
        
        for (let k = 0; k < C.length; k++) {
            x1 = (scaled[i][C[k]].x-D.o_x) / R;
            y1 = (-scaled[i][C[k]].y+D.o_y) / R;
            x2 = x1 / (x1*x1+y1*y1);
            y2 = y1 / (x1*x1+y1*y1);

            let new_x = x2*R+D.o_x;
            let new_y = -y2*R+D.o_y;
            D.line(x, y, new_x, new_y, i);
        }
        
    }
    /*
    bezier(scaled[i][23].x, scaled[i][23].y, scaled[i][21].x, scaled[i][21].y+100, scaled[i][15].x, scaled[i][15].y, scaled[i][19].x, scaled[i][19].y);

    bezier(scaled[i][24].x, scaled[i][24].y, scaled[i][22].x, scaled[i][22].y-100, scaled[i][16].x, scaled[i][16].y, scaled[i][20].x, scaled[i][20].y);

    bezier(scaled[i][7].x, scaled[i][7].y, scaled[i][21].x, scaled[i][21].y+100, scaled[i][15].x, scaled[i][15].y, scaled[i][19].x, scaled[i][19].y);

    bezier(scaled[i][8].x, scaled[i][8].y, scaled[i][22].x, scaled[i][22].y-100, scaled[i][16].x, scaled[i][16].y, scaled[i][20].x, scaled[i][20].y);*/
}

function doubleClicked() {
    noLoop();
}