//elements
var daMusicPlayerBoii = document.getElementById("audioPlayer")
var daMPsource = document.getElementById("audioPlayerSRC")
var daFunnyInfo = document.getElementById("curplayinginfo")
var daButton = document.getElementById("playButton")
var daList = document.getElementById("funnyList")
var musiclistLabel = document.getElementById("funnyListInfo")
var daInput = document.getElementById("funnyServer");
var funnyinfo = document.getElementById("info");
var logArea = document.getElementById("logs")

//helper variables
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

//events
daMusicPlayerBoii.onended = function() {
    playing = false;
    paused = false;
    if(repeat == true){
        setState("play");
    } else {
        daFunnyInfo.innerText = "Currently playing: nothing (ENDED)";
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

//sets up the files (songs and data)
setupFiles();

//functions
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
            break;
        case "prev":
            if(funnyIdx == 0){
                document.getElementById("prevButton").hidden = true;
                funnyinfo.innerText = "There's no previous song";
                doTheThing();
            }else{
                document.getElementById("nextButton").hidden = false;
                funnyIdx -= 1;
                setState("play");
            }
            break;
        case "next":
            if(funnyIdx == musicArray.length -1){
                document.getElementById("nextButton").hidden = true;
                funnyinfo.innerText = "There's no next song";
                doTheThing();
            } else {
                document.getElementById("prevButton").hidden = false;
                funnyIdx += 1;
                setState("play");
            }
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

function setServer(){
    paused = false;
    playing = false;
    daButton.innerText = "Play";

    if(daInput.value.length > 0 && daInput.value.startsWith("https://")){ //to avoid any error, should i make it http compatible?? idk if its possible
        if (!daInput.value.includes("music")){ //first check if it includes music
            if(!daInput.value.endsWith("/")){ //if the current url doesnt ends with a slash we add the slash and the music string
                musicPath = daInput.value + "/music/"
            } else { //if it does end with a slash we just add music
                musicPath = daInput.value + "music/"
            }
        } else if(!musicPath.endsWith("/")){ //we check if the current music path which was set earlier doesnt end with a slash
            musicPath = musicPath + "/";
        } else { //if it meets all the requirements we go without anycheck ig
            musicPath = daInput.value;
        }
        doneSearchingFiles = false;
        changedMusicPath = true;
        cleanArrays(); //just in case
        setupFiles();
    } else {
        musicPath = "./music/";
        doneSearchingFiles = false;
        cleanArrays();
        setupFiles();
    }
}

async function readFile(file, TurnIntoArray)
{
    var allText = null;
    var rawFile = await fetch(file);
    if(TurnIntoArray == true){
        allText = (await rawFile.text()).trim().split('\n')
    } else {
        allText = (await rawFile.text())
    }
    return allText;
}

async function readFileJSON(file)
{
    var allText = null;
    var rawFile = await fetch(file);
    try{
        allText = JSON.parse(await rawFile.text())
    } catch (exp){
        alert(exp)
    }
    return allText;
}

async function setupFiles() {
    cleanArrays();

    if(doneSearchingFiles == false){
        var listMusic = null;
        try{
            listMusic = await readFile(musicPath + listMusicFile, true)
        } catch(exc){
            musicPath = "./music/"
            await setupFiles();
        }
        for(var i in listMusic)
        {
            var mainDir = musicPath + listMusic[i] + "/"
            var dataDir = mainDir + "data" + dataExt;
            var theJson = await readFileJSON(dataDir);
            var musicDir = mainDir + theJson['fileName']
            musicArray.push(musicDir);
            musicNameArray.push(theJson['name']);
            daList.innerText = daList.innerText + "\n" + musicNameArray[i];
        }
        doneSearchingFiles = true;
    } 
}

function cleanArrays(){
    daList.innerText = "Source: " + musicPath;
    musiclistLabel.innerText = "Available music: "
    if(musicArray.length > 0){
        musicArray = [];
    }
    if(musicNameArray.length > 0){
        musicNameArray = [];
    }
}