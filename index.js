//audio stuff
var daMusicPlayerBoii = document.getElementById("audioPlayer")
var daMPsource = document.getElementById("audioPlayerSRC")
var daFunnyInfo = document.getElementById("curplayinginfo")

//info
var funnyinfo = document.getElementById("info");

//helper vars
var thefunnypath = './music/';
var thefunnyext = '.mp3';

var listMusic = funnyRead('listMusic.txt', true);
var funnyIdx = 0;

var fileArray = [];
var fileNameArray = [];

var repeat = false;

daMusicPlayerBoii.onended = function() {
    if(repeat == true){
        setState("play");
    }
}

setupFiles();

function nextButtonFct()
{
    if(funnyIdx == fileArray.length -1){
        document.getElementById("nextButton").hidden = true;
        funnyinfo.innerText = "There's no next song";
        doTheThing();
    } else {
        document.getElementById("prevButton").hidden = false;
        funnyIdx += 1;
        setState("play");
    }
}

function prevButtonFct()
{
    if(funnyIdx == 0){
        document.getElementById("prevButton").hidden = true;
        funnyinfo.innerText = "There's no previous song";
        doTheThing();
    }else{
        document.getElementById("nextButton").hidden = false;
        funnyIdx -= 1;
        setState("play");
    }
}
function setState(state)
{
    switch (state){
        case "play":
            daMPsource.src = fileArray[funnyIdx];
            daMusicPlayerBoii.load();
            daMusicPlayerBoii.play();
            daFunnyInfo.innerText = "Currently playing: " + fileNameArray[funnyIdx];
            break;
        case "pause":
            daMusicPlayerBoii.pause();
            break;
        case "resume":
            daMusicPlayerBoii.play();
            break;
    }
}

function setRepeat()
{
    repeat = !repeat;
    var thefunnybutton = document.getElementById("funnyRepeatButton");
    if(repeat == true){
        thefunnybutton.innerText = "Repeat On";
    } else {
        thefunnybutton.innerText = "Repeat Off";
    }
}

function doTheThing(){
    setInterval(function(){
        funnyinfo.innerText = "";
    }, 2000);
}

//file funcs
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
            }
        }
    }
    rawFile.send(null);
    return allText;
}

function setupFiles() {

    for(var i in listMusic)
    {
        var thefunny = thefunnypath + listMusic[i] + thefunnyext;
        fileArray.push(thefunny);
        fileNameArray.push(listMusic[i]);
    }    
}