//audio stuff
var daMusicPlayerBoii = document.getElementById("audioPlayer")
var daMPsource = document.getElementById("audioPlayerSRC")
var daFunnyInfo = document.getElementById("curplayinginfo")
var daButton = document.getElementById("playButton")
var daList = document.getElementById("funnyList")

//server stuff
var daInput = document.getElementById("funnyServer");

//info
var funnyinfo = document.getElementById("info");
var daVersion = document.getElementById("version"); //why??

//helper vars
var thefunnypath = './music/';
var thefunnyext = '.mp3';
var thefunnydataext = ".json";

var listMusic = funnyRead(thefunnypath + 'listMusic.txt', true);
var funnyIdx = 0;

var musicArray = [];
var musicNameArray = [];

var repeat = false;
var playing = false;
var paused = false;

var doneSearchingFiles = false;

daMusicPlayerBoii.onended = function() {
    playing = false;
    paused = false;
    daFunnyInfo.innerText = "Currently playing: nothing (ENDED)";
    if(repeat == true){
        setState("play");
    }
}

daMusicPlayerBoii.onplaying = function() {
    playing = true;
    paused = false;
    daButton.innerText = "Pause"
}

daMusicPlayerBoii.onpause = function() {
    paused = true;
    playing = false;
    daButton.innerText = "Resume";
    daFunnyInfo.innerText = "Currently playing: " + musicNameArray[funnyIdx] + " (PAUSED)";
}

setupFiles();

function nextButtonFct()
{
    if(funnyIdx == musicArray.length -1){
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
            daMPsource.src = musicArray[funnyIdx];
            daMusicPlayerBoii.load();
            daMusicPlayerBoii.play();
            daFunnyInfo.innerText = "Currently playing: " + musicNameArray[funnyIdx];
            break;
        case "pause":
            daMusicPlayerBoii.pause();
            break;
        case "resume":
            daMusicPlayerBoii.play();
            daFunnyInfo.innerText = "Currently playing: " + musicNameArray[funnyIdx];
            break;
        case "check":
            if(playing == true && paused == false){
                setState("pause");
            } else if (playing == false && paused == true){
                setState('resume');
            } else if (playing == false && paused == false){
                setState("play");
            }
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

function setServer(){
    if(daInput.value.length > 0){
        if(!daInput.value.endsWith("/")){
            thefunnypath = daInput.value + "/";
        } else {
            thefunnypath = daInput.value;
        }
        doneSearchingFiles = false;
        cleanArrays(); //just in case
        setupFiles();
    } else {
        thefunnypath = "./music/";
        doneSearchingFiles = false;
        cleanArrays();
        setupFiles();
    }

}

//file funcs
function funnyRead(file, turnIntoFunnyArray, isJson)
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
                } else if (isJson == true){
                    allText = JSON.parse(rawFile.responseText)
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
    //clean arrays 
    cleanArrays();

    daList.innerText = "Available music: "

    if(doneSearchingFiles == false){
        for(var i in listMusic)
        {
            var dir1 = thefunnypath + listMusic[i] + "/";
            var musicDir = dir1 +  listMusic[i] + thefunnyext;
            var dataDir = dir1 + listMusic[i] + thefunnydataext;
            var theJson = funnyRead(dataDir, false, true);
            musicArray.push(musicDir);
            musicNameArray.push(theJson['name']);
            daList.innerText = daList.innerText + "\n" + musicNameArray[i];
        }
        doneSearchingFiles = true;
    }
}

function cleanArrays(){
    if(musicArray.length > 0){
        musicArray = [];
    }
    if(musicNameArray.length > 0){
        musicNameArray = [];
    }
}