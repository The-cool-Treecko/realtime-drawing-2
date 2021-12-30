x = (screen.width/2)
y = (screen.height/2)-255
x2 = ((screen.height/2)/2)-200
y2 = (screen.height/2)-220
var noseX;
var noseY;
var leftWristX;
var rightWristX;
var width;

function setup() {
    canvas = createCanvas(460, 460)
    canvas.position(x,y);
    video = createCapture();
    video.size(683,384);
    video.position(x2,y2);
    classifier = ml5.poseNet(video,modelLoaded);
    classifier.on('pose',gotResults);
}

function modelLoaded() {
    console.log("Model is Loaded");
}

function gotResults(results) {
    if (results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("nose X =" + noseX + ", nose Y =" + noseY);
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        width = leftWristX - rightWristX;
    } 
}

function draw() {
    background('blanchedalmond');
    stroke("red");
    fill("red");
    rectMode(CENTER);
    square(noseX, noseY, width);
    document.getElementById("size").innerHTML = "Current Square width and height = " + floor(width) + "px";
}
