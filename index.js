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
var musicPath = './music/';
var musicExt = '.mp3';
var dataExt = ".json";
var listMusicFile = 'listMusic.txt';

var funnyIdx = 0;

var musicArray = [];
var musicNameArray = [];

var repeat = false;
var playing = false;
var paused = false;

var doneSearchingFiles = false;
var changedMusicPath = false;

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
        changedMusicPath = true;
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
function readFile(file, isOnline, TurnIntoArray)
{
    if(isOnline == false){
        var allText = null;
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    if(TurnIntoArray == true){
                        allText = rawFile.responseText.trim().split('\n');
                    } else {
                        allText = rawFile.responseText;
                    }
                }
            }
        }
        rawFile.send(null);
        return allText;
    } else {
        
    }
}

function readFileJSON(file, isOnline)
{
    if(isOnline == false){
        var allText = null;
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    allText = JSON.parse(rawFile.responseText)
                }
            }
        }
        rawFile.send(null);
        return allText;
    }
}

function setupFiles() {
    cleanArrays();


    if(doneSearchingFiles == false && musicPath == "./music/" && changedMusicPath == false){
        var listMusic = readFile(musicPath + listMusicFile, false, true)
        for(var i in listMusic)
        {
            var dir1 = musicPath + listMusic[i] + "/";
            var musicDir = dir1 +  listMusic[i] + musicExt;
            var dataDir = dir1 + listMusic[i] + dataExt;
            var theJson = readFileJSON(dataDir, false);
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