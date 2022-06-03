//gonna test if this works, just exports the required doc elements
export var musicPlayer = document.getElementById("audioPlayer");
export var mpSource = document.getElementById("audioPlayerSRC");
export var curPlayingInfo = document.getElementById("curplayinginfo");
export var playButton = document.getElementById("playButton");
export var songList = document.getElementById("funnyList");
export var songListLabel = document.getElementById("funnyListInfo");
export var customServerInput = document.getElementById("funnyServer");
export var infoThingy = document.getElementById("info"); //idk how to name this one lol

import editableVars from './helperVariables';

//events go here aswell ig
musicPlayer!.onended = function(){
    editableVars.musicPlaying = false;
    editableVars.musicPaused = false;
    if(editableVars.repeatMusic) //if its true
    {
        //setState("");
    }
    else
    {
        curPlayingInfo!.innerText = "Currently playing: nothing (ENDED)";
    }
}
musicPlayer!.onplaying = function(){
    editableVars.musicPlaying = true;
    editableVars.musicPaused = false;
    playButton!.innerText = "Pause";
}
musicPlayer!.onpause = function(){
    editableVars.musicPlaying = false;
    editableVars.musicPaused = false;
    playButton!.innerText = "Resume";
    curPlayingInfo!.innerText = "Currently playing: " + editableVars.musicNameArray[editableVars.curIdx] + " (PAUSED)";
}