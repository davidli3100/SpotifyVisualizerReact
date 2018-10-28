let analysis = {};
let features = {};
var diameter;

//vars for animation demoing
let firstSizeIncrement, smoothing, fragment;
const test = {
    "BPM": 60,
}

function setup() {
    createCanvas(windowWidth, windowHeight, P2D);
    colorMode(HSB, 360, 100, 100);
    noStroke();
    ellipseMode(RADIUS);
    frameRate(60);
}


/**
 * draw function should take the audio analysis
 * on every half beat (tatum) change circle radius
 * have like a mild gradient from last radius to current radius 
 * change circle colour every beat
 * change size according to volume
 * beat circle to tempo from API
 */
function draw() {
    var r = millis() / (1000 / (test.BPM / 60.0));
    r -= int(r);
    diameter = map(r,0,2.5,400,0); //map the bpm to diameter, and then change diameter each frame to increase/decrease based on tatums
    console.log(diameter)
    background("#eeeeee");
    // *slightly* slow down the seizure-inducing radial gradient effects
    for (var i = 0; i < 7; i++) {
        drawGradient(windowWidth/2, windowHeight/2)    
    }
}

//makes it look like a speaker driver bouncing around in a weird way
function drawGradient(x, y) {
    var radius = diameter / 2;
    var randColor = random(0, 360);
    for (var r = radius; r > 0; --r) {
        fill(200, randColor, 120); //blue
        ellipse(x, y, r, r);
        randColor = (randColor + 1) % 69; //tried random numbers until it looked good
    }
}

// function drawRotatingLineThings(x)


