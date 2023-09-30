//jQuery code for play button
$("button").hover(function(){
    $("i").removeClass("bi bi-play-circle");
    $("i").addClass("bi bi-play-circle-fill");
  });

$("button").click(function(){
    $("i").removeClass("bi bi-play-circle");
    $("i").addClass("bi bi-play-circle-fill");
  });


//main JS code starts here
song = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

scoreRightWrist = 0;
scoreLeftWrist = 0;

function preload() {
  song = loadSound("music.mp3");
}

function setup() {
  canvas = createCanvas(600, 500);

  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses)
}

function modelLoaded() {
  console.log("The PoseNet model has been initialized");
}

function gotPoses(results) {
  if(results.length > 0) {
    console.log(results);
    
    //left wrist coordinates tracking
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("Left wrist: x = " + leftWristX + " | y = " + leftWristY);

    //right wrist coordinates tracking
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("Right wrist: x = " + rightWristX + " | y = " + rightWristY);

    //checking to see if the right and left wrists are visible
    scoreRightWrist = results[0].pose.keypoints[10].score;
    scoreLeftWrist = results[0].pose.keypoints[9].score;
  }
}

function draw() {
  image(video, 0, 0, 600, 500);

  fill("#6657AB");
  stroke("#6657AB");

  if(scoreRightWrist>0) {
    circle(rightWristX, rightWristY, 20);

    if(rightWristY > 0 && rightWristY <= 100) {
      document.getElementById("speed").innerHTML = "Speed: 0.5x";
      song.rate(0.5);
    }
    else if(rightWristY > 100 && rightWristY <= 200) {
      document.getElementById("speed").innerHTML = "Speed: 1x";
      song.rate(1);
    }
    else if(rightWristY > 200 && rightWristY <= 300) {
      document.getElementById("speed").innerHTML = "Speed: 1.5x";
      song.rate(1.5);
    }
    else if(rightWristY > 300 && rightWristY <= 400) {
      document.getElementById("speed").innerHTML = "Speed: 2x";
      song.rate(2);
    }
    else if(rightWristY > 400) {
      document.getElementById("speed").innerHTML = "Speed: 2.5x";
      song.rate(2.5);
    }
  }
}

function play() {
  song.play();
  song.setVolume(1);
  song.rate(1);
}

