var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./docElements", "./helperVariables", "./fileSysOperations"], function (require, exports, docElements_1, helperVariables_1, fileSysOperations_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    docElements_1 = __importDefault(docElements_1);
    helperVariables_1 = __importDefault(helperVariables_1);
    docElements_1.default.audioElement.onended = function () {
        helperVariables_1.default.musicPlaying = false;
        helperVariables_1.default.musicPaused = false;
        if (helperVariables_1.default.repeatMusic) //if its true
         {
            //setState("");
        }
        else {
            docElements_1.default.curPlayingInfo.innerText = "Currently playing: nothing (ENDED)";
        }
    };
    docElements_1.default.audioElement.onplaying = function () {
        helperVariables_1.default.musicPlaying = true;
        helperVariables_1.default.musicPaused = false;
        docElements_1.default.playButton.innerText = "Pause";
    };
    docElements_1.default.audioElement.onpause = function () {
        helperVariables_1.default.musicPlaying = false;
        helperVariables_1.default.musicPaused = false;
        docElements_1.default.playButton.innerText = "Resume";
        docElements_1.default.curPlayingInfo.innerText = "Currently playing: " + helperVariables_1.default.musicNameArray[helperVariables_1.default.curIdx] + " (PAUSED)";
    };
    //add the duration indicator and volume maybe
    (0, fileSysOperations_1.setupFiles)();
    alert(helperVariables_1.default.musicArray);
    alert(helperVariables_1.default.musicNameArray);
    function setPlayerState(state) {
        switch (state) {
            case "play":
                docElements_1.default.audioElement.src = helperVariables_1.default.musicPath[helperVariables_1.default.curIdx];
                docElements_1.default.audioElement.load();
                docElements_1.default.audioElement.play();
                docElements_1.default.curPlayingInfo.innerText = "Currently playing: " + helperVariables_1.default.musicNameArray[helperVariables_1.default.curIdx];
                break;
        }
    }
    docElements_1.default.audioElement.src = helperVariables_1.default.musicPath[helperVariables_1.default.curIdx];
    docElements_1.default.audioElement.load();
    docElements_1.default.audioElement.play();
    docElements_1.default.curPlayingInfo.innerText = "Currently playing: " + helperVariables_1.default.musicNameArray[helperVariables_1.default.curIdx];
});
