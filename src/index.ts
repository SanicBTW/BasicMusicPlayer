//type definitions my beloved
//simplified index? yessir
//var daMusic:Array<string[][]> = [[],[]];
var musicArray:any = []; //gotta check what type is the thing
var musicNameArray:Array<string> = [];
var musicPath:string = './music/'; //old support???
var dataExt:string = ".json";
var listMusicFile:string = "listMusic.txt";
var curIdx:number = 0; //might use a custom index in the index file instead of this one, idk
var repeatMusic:boolean = false;
var musicPlaying:boolean = false;
var musicPaused:boolean = false;
var doneSearchingFiles:boolean = false;
var changedMusicPath:boolean = false;
import docElements from './docElements';
import {readFile, readFileJSON} from './fileSysOperations';

docElements.audioElement!.onended = function(){
    musicPlaying = false;
    musicPaused = false;
    if(repeatMusic) //if its true
    {
        //setState("");
    }
    else
    {
        docElements.curPlayingInfo!.innerText = "Currently playing: nothing (ENDED)";
    }
}

docElements.audioElement!.onplaying = function(){
    musicPlaying = true;
    musicPaused = false;
    docElements.playButton!.innerText = "Pause";
}

docElements.audioElement!.onpause = function(){
    musicPlaying = false;
    musicPaused = false;
    docElements.playButton!.innerText = "Resume";
    docElements.curPlayingInfo!.innerText = "Currently playing: " + musicNameArray[curIdx] + " (PAUSED)";
}

//add the duration indicator and volume maybe
setupFiles();

function setPlayerState(state:string){
    switch(state)
    {
        case "play":
            docElements.audioElement.src = musicArray[curIdx];
            docElements.audioElement.load();
            docElements.audioElement.play();
            docElements.curPlayingInfo!.innerText = "Currently playing: " + musicNameArray[curIdx];
            break;
    }
}

docElements.audioElement.src = musicArray[curIdx];
docElements.audioElement.load();
docElements.audioElement.play();
docElements.curPlayingInfo!.innerText = "Currently playing: " + musicNameArray[curIdx];

async function setupFiles(){
    cleanArrays();

    var details:Array<string> = [];
    if(doneSearchingFiles == false)
    {
        try
        {
            details = await readFile(musicPath + listMusicFile, true);
        } 
        catch (exception) 
        {
            alert("oops code fucked up gotta try with default path man");
            musicPath = './music/' //old support??
            await setupFiles();
        }
        for(var i in details)
        {
            //music path should come formatted already
            var advancedDetails = details[i].split(":");
            /* info about this new thing
            * advancedDetails[0] should be the fileName including .mp3
            * advancedDetails[1] should be the name to be displayed
            */
            var musicDir = musicPath + advancedDetails[0];
            musicArray.push(musicDir);
            alert(musicDir);
            alert(musicArray[0])
            musicNameArray.push(advancedDetails[1]);
            docElements.songList!.innerText = docElements.songList!.innerText + "\n" + musicNameArray[i];
        }
        doneSearchingFiles = true;
    }
}

function cleanArrays(){
    docElements.songList!.innerText = "Source: " + musicPath;
    docElements.songListLabel!.innerText = "Available music: ";
    if(musicArray.length > 0){
        musicArray = [];
    }
    if(musicNameArray.length > 0){
        musicNameArray = [];
    }
}