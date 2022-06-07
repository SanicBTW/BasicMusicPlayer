//yessir new clean and fresh index sheesh, nah gotta clean it again
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
var selectedFromList = false;

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
            if(firstTime == true && selectedFromList == false){
                var idx0fromlist = document.getElementById("0");
                idx0fromlist.className = "collection-item active"
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
                //get the old value of current index before changing it
                oldIdx = curIdx;
                //is it gonna work properly?
                curIdx = musicArray.length -1;
                setPlayerState("play");
            }else{
                oldIdx = curIdx;
                curIdx -= 1;
                setPlayerState("play");
            }
            break;
        case "next":
            if(curIdx == musicArray.length -1){
                oldIdx = curIdx;
                //it goes to the item 0 of the playlist
                curIdx = 0;
                setPlayerState("play");
            } else {
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
            //we set the indexes to 0 in order to aoid problems with new list items
            //idk if it works
            oldIdx = 0;
            curIdx = 0;
            firstTime = true;
            //playButton.innerText = "Play";

            if(customServerInput.value.length > 0 && customServerInput.value.startsWith("https://")){
                if(!check(customServerInput.value))
                {
                    alert("There was an error while checking the URL, check it and try again, ");
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