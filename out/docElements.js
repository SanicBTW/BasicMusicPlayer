var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./helperVariables"], function (require, exports, helperVariables_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.infoThingy = exports.customServerInput = exports.songListLabel = exports.songList = exports.playButton = exports.curPlayingInfo = exports.mpSource = exports.musicPlayer = void 0;
    helperVariables_1 = __importDefault(helperVariables_1);
    //gonna test if this works, just exports the required doc elements
    exports.musicPlayer = document.getElementById("audioPlayer");
    exports.mpSource = document.getElementById("audioPlayerSRC");
    exports.curPlayingInfo = document.getElementById("curplayinginfo");
    exports.playButton = document.getElementById("playButton");
    exports.songList = document.getElementById("funnyList");
    exports.songListLabel = document.getElementById("funnyListInfo");
    exports.customServerInput = document.getElementById("funnyServer");
    exports.infoThingy = document.getElementById("info"); //idk how to name this one lol
    //events go here aswell ig
    exports.musicPlayer.onended = function () {
        helperVariables_1.default.musicPlaying = false;
        helperVariables_1.default.musicPaused = false;
        if (helperVariables_1.default.repeatMusic) //if its true
         {
            //setState("");
        }
        else {
            exports.curPlayingInfo.innerText = "Currently playing: nothing (ENDED)";
        }
    };
    exports.musicPlayer.onplaying = function () {
        helperVariables_1.default.musicPlaying = true;
        helperVariables_1.default.musicPaused = false;
        exports.playButton.innerText = "Pause";
    };
    exports.musicPlayer.onpause = function () {
        helperVariables_1.default.musicPlaying = false;
        helperVariables_1.default.musicPaused = false;
        exports.playButton.innerText = "Resume";
        exports.curPlayingInfo.innerText = "Currently playing: " + helperVariables_1.default.musicNameArray[helperVariables_1.default.curIdx] + " (PAUSED)";
    };
});
