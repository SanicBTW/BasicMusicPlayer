var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./docElements", "./fileSysOperations"], function (require, exports, docElements_1, fileSysOperations_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    docElements_1 = __importDefault(docElements_1);
    //type definitions my beloved
    //simplified index? yessir
    //var daMusic:Array<string[][]> = [[],[]];
    var musicArray = []; //gotta check what type is the thing
    var musicNameArray = [];
    var musicPath = './music/'; //old support???
    var dataExt = ".json";
    var listMusicFile = "listMusic.txt";
    var curIdx = 0; //might use a custom index in the index file instead of this one, idk
    var repeatMusic = false;
    var musicPlaying = false;
    var musicPaused = false;
    var doneSearchingFiles = false;
    var changedMusicPath = false;
    docElements_1.default.audioElement.onended = function () {
        musicPlaying = false;
        musicPaused = false;
        if (repeatMusic) //if its true
         {
            //setState("");
        }
        else {
            docElements_1.default.curPlayingInfo.innerText = "Currently playing: nothing (ENDED)";
        }
    };
    docElements_1.default.audioElement.onplaying = function () {
        musicPlaying = true;
        musicPaused = false;
        docElements_1.default.playButton.innerText = "Pause";
    };
    docElements_1.default.audioElement.onpause = function () {
        musicPlaying = false;
        musicPaused = false;
        docElements_1.default.playButton.innerText = "Resume";
        docElements_1.default.curPlayingInfo.innerText = "Currently playing: " + musicNameArray[curIdx] + " (PAUSED)";
    };
    //add the duration indicator and volume maybe
    setupFiles();
    function setPlayerState(state) {
        switch (state) {
            case "play":
                docElements_1.default.audioElement.src = musicArray[curIdx];
                docElements_1.default.audioElement.load();
                docElements_1.default.audioElement.play();
                docElements_1.default.curPlayingInfo.innerText = "Currently playing: " + musicNameArray[curIdx];
                break;
        }
    }
    docElements_1.default.audioElement.src = musicArray[curIdx];
    docElements_1.default.audioElement.load();
    docElements_1.default.audioElement.play();
    docElements_1.default.curPlayingInfo.innerText = "Currently playing: " + musicNameArray[curIdx];
    function setupFiles() {
        return __awaiter(this, void 0, void 0, function* () {
            cleanArrays();
            var details = [];
            if (doneSearchingFiles == false) {
                try {
                    details = yield (0, fileSysOperations_1.readFile)(musicPath + listMusicFile, true);
                }
                catch (exception) {
                    alert("oops code fucked up gotta try with default path man");
                    musicPath = './music/'; //old support??
                    yield setupFiles();
                }
                for (var i in details) {
                    //music path should come formatted already
                    var advancedDetails = details[i].split(":");
                    /* info about this new thing
                    * advancedDetails[0] should be the fileName including .mp3
                    * advancedDetails[1] should be the name to be displayed
                    */
                    var musicDir = musicPath + advancedDetails[0];
                    musicArray.push(musicDir);
                    alert(musicDir);
                    alert(musicArray[0]);
                    musicNameArray.push(advancedDetails[1]);
                    docElements_1.default.songList.innerText = docElements_1.default.songList.innerText + "\n" + musicNameArray[i];
                }
                doneSearchingFiles = true;
            }
        });
    }
    function cleanArrays() {
        docElements_1.default.songList.innerText = "Source: " + musicPath;
        docElements_1.default.songListLabel.innerText = "Available music: ";
        if (musicArray.length > 0) {
            musicArray = [];
        }
        if (musicNameArray.length > 0) {
            musicNameArray = [];
        }
    }
});
