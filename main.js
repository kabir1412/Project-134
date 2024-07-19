song = "";
status = "";
objects = [];

function preload(){
    song = loadSound("alarm.mp3")
}

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectIdentifier = ml5.objectDetector("cocossd", modalLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modalLoaded(){
console.log("Modal loaded!");
status = true;
}

function gotResults(error, results){
if(error){
console.log(error);
}
console.log(results);
objects = results;
}

function draw(){
image(video, 0, 0, 380, 380);

if(status != ""){
objectIdentifier.detect(video, gotResults)
r = random(255);
g = random(255);
b = random(255);

for(i = 0; i < objects.length; i++){
document.getElementById("status").innerHTML = "Status: Object Detected";

fill(r,g,b);
percent = floor(objects[i].confidence * 100);
text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
noFill();
stroke(r,g,b);
rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

if(objects[i].label == 'person'){
document.getElementById("baby").innerHTML = "Baby Detected";
song.stop();
}
else{
document.getElementById("baby").innerHTML = "Baby Not Detected";
song.play();    
}
}
if(objects.length == 0){
    document.getElementById("baby").innerHTML = "Baby Not Detected";
    song.play();  
    }
}
}