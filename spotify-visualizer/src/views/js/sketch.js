export default function sketch(p) {

let analysis = {};
let features = {};
var diameter;

//vars for animation demoing
let firstSizeIncrement, smoothing, fragment;
const test = {
    "BPM": 60,
}

p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.colorMode(p.HSB, 360, 100, 100);
    p.noStroke();
    p.ellipseMode(p.RADIUS);
    p.frameRate(60);
}


/**
 * draw function should take the audio analysis
 * on every half beat (tatum) change circle radius
 * have like a mild gradient from last radius to current radius 
 * change circle colour every beat
 * change size according to volume
 * beat circle to tempo from API
 */
p.draw = function() {
    var r = p.millis() / (1000 / (test.BPM / 60.0));
    r -= p.int(r);
    diameter = p.map(r,0,2.5,400,0); //map the bpm to diameter, and then change diameter each frame to increase/decrease based on tatums
    console.log(diameter)
    p.background("#eeeeee");
    // *slightly* slow down the seizure-inducing radial gradient effects
    for (var i = 0; i < 7; i++) {
        p.drawGradient(p.windowWidth/2, p.windowHeight/2)    
    }
}

p.getR = function(props) {
    return props.tempo
}

p.getDanceability = function(props) {
    return props.danceability
}

//makes it look like a speaker driver bouncing around in a weird way
p.drawGradient = function(x, y) {
    var radius = diameter / 2;
    var randColor = p.random(0, 360);
    for (var r = radius; r > 0; --r) {
        p.fill(200, randColor, 120); //blue
        p.ellipse(x, y, r, r);
        randColor = (randColor + 1) % 69; //tried random numbers until it looked good
        }
    }
}
