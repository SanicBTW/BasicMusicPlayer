//yessir new clean and fresh index sheesh
//doc elements
var audioPlayer = document.getElementById("audioPlayer");
var mpSource = document.getAnimations("audioPlayerSRC");
var curPlayingInfo = document.getElementById("curplayinginfo");
var playButton = document.getElementById("playButton");
var songList = document.getElementById("funnyList");
var songListLabel = document.getElementById("funnyListInfo");
var customServerInput = document.getElementById("funnyServer");
var infoThingy = document.getElementById("info"); //idk how to name this one lol
//vars
var musicArray = [];
var musicNameArray = [];
var customURL = './';
var listMusicFile = "listMusic.txt";
var curIdx = 0;
var repeatMusic = false;
var musicPlaying = false;
var musicPaused = false;
var doneSearchingFiles = false;
var changedCustomURL = false;

//events go here
//what if we add an indicator for duration and vol

setupFiles();

//funcs
function setPlayerState(state)
{
    //addsetrepeat
    switch(state)
    {
        case "play":
            audioPlayer.load();
            audioPlayer.play();
            curPlayingInfo.innerText = "Currently playing: " + musicNameArray[curIdx];
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
            }else{
                document.getElementById("nextButton").hidden = false;
                curIdx -= 1;
                setPlayerState("play");
            }
            break;
        case "next":
            if(curIdx == musicArray.length -1){
                document.getElementById("nextButton").hidden = true;
                infoThingy.innerText = "There's no next song";
            } else {
                document.getElementById("prevButton").hidden = false;
                curIdx += 1;
                setPlayerState("play");
            }
            break;
    }
}

//filesys funcs
async function readFile(file, turnIntoArray = false) 
{
    var allText = "";
    var raw = await fetch(file);
    try
    {
        if(turnIntoArray)
        {
            allText = (await raw.text()).trim().split('\n');
        } 
        else 
        {
            allText = (await raw.text());
        }
    } 
    catch (exception)
    {
        alert(exception);
        return raw.status;
    }

    return allText;
}

//setup stuff

async function setupFiles()
{
    cleanArrays();

    var details = [];
    if(doneSearchingFiles == false)
    {
        try
        {
            details = await readFile(customURL + listMusicFile, true)
        }
        catch(exception)
        {
            alert("oops code fucked up\nerror: " + exception);
            setupFiles();
        }
        for(var i in details)
        {
            //music path should come formatted already
            var advancedDetails = details[i].split("|");
            /* info about this new thing
            * advancedDetails[0] should be the fileName including .mp3 or directory
            * advancedDetails[1] should be the name to be displayed
            */
            var musicDir = customURL + advancedDetails[0];
            musicArray.push(musicDir);
            mpSource.src = musicDir;
            setPlayerState("play");
            musicNameArray.push(advancedDetails[1]);
            songList.innerText = songList.innerText + "\n" + musicNameArray[i];
        }
        doneSearchingFiles = true;
    }
}

//aka server
function setCustomFiles()
{

}

//to avoid problems
function cleanArrays()
{
    songList.innerText = "Source: " + customURL;
    songListLabel.innerText = "Available music: "
    if(musicArray.length > 0){
        musicArray = [];
    }
    if(musicNameArray.length > 0){
        musicNameArray = [];
    }
}
