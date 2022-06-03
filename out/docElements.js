var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./helperVariables"], function (require, exports, helperVariables_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    helperVariables_1 = __importDefault(helperVariables_1);
    //gonna test if this works, just exports the required doc elements
    var musicPlayer = document.getElementById("audioPlayer");
    var mpSource = document.getElementById("audioPlayerSRC");
    var curPlayingInfo = document.getElementById("curplayinginfo");
    var playButton = document.getElementById("playButton");
    var songList = document.getElementById("funnyList");
    var songListLabel = document.getElementById("funnyListInfo");
    var customServerInput = document.getElementById("funnyServer");
    var infoThingy = document.getElementById("info"); //idk how to name this one lol
    exports.default = { musicPlayer, mpSource, curPlayingInfo, playButton, songList, songListLabel, customServerInput, infoThingy };
    //events go here aswell ig
    musicPlayer.onended = function () {
        helperVariables_1.default.musicPlaying = false;
        helperVariables_1.default.musicPaused = false;
        if (helperVariables_1.default.repeatMusic) //if its true
         {
            //setState("");
        }
        else {
            curPlayingInfo.innerText = "Currently playing: nothing (ENDED)";
        }
    };
    musicPlayer.onplaying = function () {
        helperVariables_1.default.musicPlaying = true;
        helperVariables_1.default.musicPaused = false;
        playButton.innerText = "Pause";
    };
    musicPlayer.onpause = function () {
        helperVariables_1.default.musicPlaying = false;
        helperVariables_1.default.musicPaused = false;
        playButton.innerText = "Resume";
        curPlayingInfo.innerText = "Currently playing: " + helperVariables_1.default.musicNameArray[helperVariables_1.default.curIdx] + " (PAUSED)";
    };
});
