var daMusicPlayerBoii = document.getElementById("audioPlayer")
var daMPsource = document.getElementById("audioPlayerSRC")
var daFunnyInfo = document.getElementById("curplayinginfo")
var nextButt = document.getElementById("nextButton");
var prevButt = document.getElementById("prevButton");
var playButt = document.getElementById("playButton");
var text = document.getElementById("textarea");
var element = document.getElementById("text");

const testFolder = './music/';

const fs = require('fs');

var fileArray = fs.readdirSync(testFolder)
var fileArray1 = new Int[fileArray.lenght]


function nextButtonFct()
{
    if(fileArray1 = fileArray1.lenght){
        element.innerHTML = ("theres no next song");   

    }else{
    fileArray1 ++;
    }
}

function prevButtonFct()
{
 
 if(fileArray1 = 0){
    element.innerHTML = ("theres no previous song");
 }else{
    fileArray1 --;
 }

}

function playSong()
{

    daMPsource.src = fileArray;
    daMusicPlayerBoii.load();
    daMusicPlayerBoii.play();
    daFunnyInfo.innerText = "Currently playing " + daMusicPlayerBoii.currentSrc;
}

setInterval(function () {text.value = fileArray1}, 200);
