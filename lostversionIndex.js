//what is this?
//i thought of making some version compatibility stuff
//but ended up discontinuing it due to a bunch of idk how to do this and that stuff
//here is the whole thing so i might continue it up some other time
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
var musicPath = './music/'; //v2 check support
var dataExt = ".json"; //v2 support
var listMusicFile = "listMusic.txt";
var curIdx = 0;
var repeatMusic = false;
var musicPlaying = false;
var musicPaused = false;
var doneSearchingFiles = false;
var changedMusicPath = false;
var dataVersion = 3;
var attempt = 0;
var whereIsIt = "idk";

//events go here
//what if we add an indicator for duration and vol

setupFiles();
//funcs
function setPlayerState(state)
{
    //add pause, resume, check, prev, next, setrepeat
    switch(state)
    {
        case "play":
            break;
    }
}

//filesys funcs
async function readFile(file, turnIntoArray = false) 
{
    var allText = "";
    var raw = await fetch(file);
    try{
        if(turnIntoArray)
        {
            allText = (await raw.text()).trim().split('\n');
        } 
        else 
        {
            allText = (await raw.text());
        }
    } catch (exception){
        alert(exception);
    }

    return allText;
}

//for compatibility for old versions
async function readFileJSON(file) 
{
    var allText;
    var raw = await fetch(file);
    try
    {
        allText = JSON.parse(await raw.text())
    } 
    catch (exp)
    {
        alert(exp)
    }
    return allText;
}

//setup stuff

async function setupFiles()
{
    cleanArrays();

    var details = [];
    if(!doneSearchingFiles)
    {
        try
        {
            switch(attempt)
            {
                case 0: //checks for the music list file on current dir (./)
                    details = await readFile("./" + listMusicFile, true);
                    whereIsIt = "current";
                    break;
                case 1: //checks for the music list file on old path
                    details = await readFile(musicPath + listMusicFile, true);
                    whereIsIt = "musicfolder";
                    break;
            }
        }
        catch(exception)
        {
            alert("oops code fucked up gotta try with default path man\nattempt: " + attempt + "\nerror: " + exception);
            musicPath = './music/' //v2 support??
            attempt ++;
            setupFiles();
        }
        for(var i in details)
        {
            if(details.includes(":") && whereIsIt == "current") //if the music list file includes : and the place is the current dir we go with ver 3
            {
                dataVersion = 3;
            }
            else if(!details.includes(":") && whereIsIt == "musicfolder") //if the music list file doesnt include : and is in the music folder we go with ver 2
            {
                dataVersion = 2.2;
                var testDir = musicPath + details[i] + "/"; //Format ex: ./music/expurgation/
                var dataDir = testDir + "data" + dataExt; // ./music/expurgation/data.json
                try
                {
                    var theJSON = await readFileJSON(dataDir); //we try to check if we can read the json in the current directory
                }
                catch (exception) //if we catch an error we go with 2.1
                {
                    dataVersion = 2.1;
                    try
                    {
                        //var secondCheck = 
                    }
                    catch (second)
                    {

                    }
                }
            }
            else if(!details.includes(":") && whereIsIt == "current") //if the music list file doesnt include : and is in the current directory we hit it with a ver 1
            {
                dataVersion = 1;
            }

            //music path should come formatted already
            switch(dataVersion)
            {
                case 3:
                    var advancedDetails = details[i].split(":");
                    /* info about this new thing
                    * advancedDetails[0] should be the fileName including .mp3
                    * advancedDetails[1] should be the name to be displayed
                    */
                    var musicDir = musicPath + advancedDetails[0];
                    musicArray.push(musicDir);
                    musicNameArray.push(advancedDetails[1]);
                    break;

                //will soon deprecate versions
                case 2.2:
                    var mainDir = musicPath + details[i] + "/"; //Format
                    var dataDir = mainDir + "data" + dataExt;
                    var theJSON = await readFileJSON(dataDir);
                    var musicDir = mainDir + theJSON['fileName'];
                    musicArray.push(musicDir);
                    musicNameArray.push(theJSON['name']);
                    break;
                case 2.1:
                    var mainDir = musicPath + details[i] + "/"; //Format
                    var dataDir = mainDir + details[i] + dataExt;
                    var theJSON = await readFileJSON(dataDir);
                    var musicDir = mainDir + theJSON['fileName'];
                    musicArray.push(musicDir);
                    musicNameArray.push(theJSON['name']);
                    break;
            }
        }
        daList.innerText = daList.innerText + "\n" + musicNameArray[i];
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
    daList.innerText = "Source: " + musicPath;
    musiclistLabel.innerText = "Available music: "
    if(musicArray.length > 0){
        musicArray = [];
    }
    if(musicNameArray.length > 0){
        musicNameArray = [];
    }
}
