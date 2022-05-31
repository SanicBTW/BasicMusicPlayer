var daMusicPlayerBoii = document.getElementById("audioPlayer")
var daMPsource = document.getElementById("audioPlayerSRC")
var daFunnyInfo = document.getElementById("curplayinginfo")
var nextButt = document.getElementById("nextButton");
var prevButt = document.getElementById("prevButton");
var playButt = document.getElementById("playButton");
var text = document.getElementById("textarea");
var element = document.getElementById("text");

var jaja = funnyRead('./music/listMusic.txt', true);
var funnyIdx = 0;

function nextButtonFct()
{
    funnyIdx ++;

    text.value = fileArray;

    if(funnyIdx == fileArray.length){
        element.innerHTML = ("theres no next song");   
    }
}

function prevButtonFct()
{
 if(funnyIdx == 0){
    element.innerHTML = ("theres no previous song");
 }else{
    funnyIdx --;
 }

}

function playSong()
{
    daMPsource.src = fileArray[funnyIdx];
    daMusicPlayerBoii.load();
    daMusicPlayerBoii.play();
    daFunnyInfo.innerText = "Currently playing " + daMusicPlayerBoii.currentSrc;
}

function funnyRead(file, turnIntoFunnyArray)
{
    var allText = null;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                if(turnIntoFunnyArray == true){
                    allText = rawFile.responseText.trim().split('\n');
                } else {
                    allText = rawFile.responseText;
                }
                return allText;
            }
        }
    }
    rawFile.send(null);
    return allText;
}