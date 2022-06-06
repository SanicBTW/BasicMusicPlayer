//yessir new clean and fresh index sheesh
//doc elements
var audioPlayer = document.getElementById("audioPlayer");
var curPlayingInfo = document.getElementById("curplayinginfo");
var playButton = document.getElementById("playButton");
var songList = document.getElementById("funnyList");
var songListSourceITM = document.getElementById("source");
var customServerInput = document.getElementById("funnyServer");
var infoThingy = document.getElementById("info"); //idk how to name this one lol
//vars
var musicArray = [];
var musicNameArray = [];
var customURL = './';
var musicListFile = "musicList.txt";
var curIdx = 0;
//helper for the song playlist items
var oldIdx = 0;
var repeatMusic = false;
var musicPlaying = false;
var musicPaused = false;
var doneSearchingFiles = false;
var changedCustomURL = false;
//helper for the set active list item
var firstTime = true;
var clean = false;

//events
audioPlayer.onended = function() 
{
    musicPlaying = false;
    musicPaused = false;
    if(repeatMusic == true){
        setPlayerState("play");
    } else {
        curPlayingInfo.innerText = "Currently playing: nothing (ENDED)";
    }
}

audioPlayer.onplaying = function() 
{
    musicPlaying = true;
    musicPaused = false;
    //playButton.innerText = "Pause"
}

audioPlayer.onpause = function() 
{
    musicPaused = true;
    musicPlaying = false;
    //playButton.innerText = "Resume";
    curPlayingInfo.innerText = "Currently playing: " + musicNameArray[curIdx] + " (PAUSED)";
}

//sets up the files (songs and data)
setupFiles();

//functions
function setPlayerState(state)
{
    switch (state)
    {
        case "play":
            audioPlayer.src = musicArray[curIdx];
            audioPlayer.load();
            audioPlayer.play();
            curPlayingInfo.innerText = "Currently playing: " + musicNameArray[curIdx];
            if(firstTime == false){
                setActiveButton();
            }
            firstTime = false;
            break;
        case "pause":
            audioPlayer.pause();
            break;
        case "resume":
            audioPlayer.play();
            curPlayingInfo.innerText = "Currently playing: " + musicNameArray[curIdx];
            break;
        case "check":
            if(musicPlaying == true && musicPaused == false){
                setPlayerState("pause");
            } else if (musicPlaying == false && musicPaused == true){
                setPlayerState('resume');
            } else if (musicPlaying == false && musicPaused == false){
                setPlayerState("play");
            }
            break;
        case "prev":
            if(curIdx == 0){
                document.getElementById("prevButton").hidden = true;
                infoThingy.innerText = "There's no previous song";
                doTheThing();
            }else{
                document.getElementById("nextButton").hidden = false;
                oldIdx = curIdx;
                curIdx -= 1;
                setPlayerState("play");
            }
            break;
        case "next":
            if(curIdx == musicArray.length -1){
                document.getElementById("nextButton").hidden = true;
                infoThingy.innerText = "There's no next song";
                doTheThing();
            } else {
                document.getElementById("prevButton").hidden = false;
                oldIdx = curIdx;
                curIdx += 1;
                setPlayerState("play");
            }
            break;
        case "repeat":
            repeatMusic = !repeatMusic;
            var thefunnybutton = document.getElementById("funnyRepeatButton");
            if(repeatMusic == true){
                thefunnybutton.innerText = "Repeat On";
            } else {
                thefunnybutton.innerText = "Repeat Off";
            }
            break;
        case "server":
            //just the set server function from older versions but moved to the set player state
            setPlayerState("pause");
            musicPaused = false;
            musicPlaying = false;
            //playButton.innerText = "Play";

            if(customServerInput.value.length > 0 && customServerInput.value.startsWith("https://")){
                if(!check(customServerInput.value))
                {
                    alert("There was an error checking the URL, check it and try again");
                }
                doneSearchingFiles = false;
                changedCustomURL = true;
                clean = true;
                cleanArrays(); //just in case
                setupFiles();
            }
            else 
            {
                customURL = "./";
                doneSearchingFiles = false;
                clean = true; //just in case
                cleanArrays();
                setupFiles();
            }
            break;
    }
}

function doTheThing()
{
    setInterval(function(){
        infoThingy.innerText = "";
    }, 2000);
}

async function readFile(file, TurnIntoArray)
{
    var allText = null;
    var rawFile = await fetch(file);
    if(TurnIntoArray == true)
    {
        allText = (await rawFile.text()).trim().split('\n')
    } else {
        allText = (await rawFile.text())
    }
    return allText;
}

async function setupFiles() 
{
    cleanArrays();

    if(doneSearchingFiles == false){
        var listMusic = null;
        try
        {
            listMusic = await readFile(customURL + musicListFile, true)
        } 
        catch(exc)
        {
            alert("oops code fucked up\nerr: " + exc);
        }
        for(var i in listMusic)
        {
            var advancedDetails = listMusic[i].split("|");
            var musicDir = customURL + advancedDetails[0];
            if((await fetch(musicDir)).ok){ //checks if the file exists, if it does then we add it
                musicArray.push(musicDir);
            }
            musicNameArray.push(advancedDetails[1]);
            setupNewListItem(i);
        }
        doneSearchingFiles = true;
    } 
}

function cleanArrays()
{
    songListSourceITM.innerText = "Source: " + (customURL == "./" || customURL == "./music/" /*what*/ ? "LOCAL" : customURL)
    if(musicArray.length > 0){
        musicArray = [];
    }
    if(musicNameArray.length > 0){
        musicNameArray = [];
    }
    if(clean == true){
        songList.childNodes.forEach(child => {
            songList.removeChild(child);
        });
    }
}

function check(path)
{
    if(path.startsWith("https://"))
    {
        if(!path.endsWith("/"))
        {
            customURL = path + "/";
            return true;
        }
        else
        {
            customURL = path;
            return true;
        }
    }
    else
    {
        return false;
    }
}

function setupNewListItem(newId) //newid its literally the i from the for function of the setup files
{
    var newSongListItem = document.createElement("a");
    if(newId == 0){
        newSongListItem.className = "collection-item active";
    } else {
        newSongListItem.className = "collection-item";
    }
    newSongListItem.textContent = musicNameArray[newId];
    newSongListItem.id = newId;
    newSongListItem.addEventListener("click", () => {
        listItemClickEvent(newSongListItem.id);
    })
    songList.appendChild(newSongListItem);
}

function setActiveButton()
{
    var currentActive = document.getElementById(curIdx);
    currentActive.className = "collection-item active";
    if(firstTime == false){
        var previtem = document.getElementById(oldIdx);
        previtem.className = "collection-item";
    }
}

function listItemClickEvent(itemId)
{
    //alert("ONLY MEANT FOR DEBUGGING, clicked, button id " + itemId + " trying to play cur song");
    oldIdx = curIdx;
    curIdx = itemId;
    setActiveButton();
    setPlayerState("play");
}