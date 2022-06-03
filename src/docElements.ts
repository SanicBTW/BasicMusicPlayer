//gonna test if this works, just exports the required doc elements
var musicPlayer = document.getElementById("audioPlayer");
var mpSource = document.getElementById("audioPlayerSRC");
var curPlayingInfo = document.getElementById("curplayinginfo");
var playButton = document.getElementById("playButton");
var songList = document.getElementById("funnyList");
var songListLabel = document.getElementById("funnyListInfo");
var customServerInput = document.getElementById("funnyServer");
var infoThingy = document.getElementById("info"); //idk how to name this one lol

export default {musicPlayer, mpSource, curPlayingInfo, playButton, songList, songListLabel, customServerInput, infoThingy};

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