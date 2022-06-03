define(["require", "exports", "./docElements"], function (require, exports, docElements_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.cleanArrays = void 0;
    var musicPath = './music/'; //old support???
    var dataExt = ".json";
    var listMusicFile = "listMusic.txt";
    var curIdx = 0; //might use a custom index in the index file instead of this one, idk
    var musicArray = []; //gotta check what type is the thing
    var musicNameArray = [];
    var repeatMusic = false;
    var musicPlaying = false;
    var musicPaused = false;
    var doneSearchingFiles = false;
    var changedMusicPath = false;
    exports.default = { musicPath, dataExt, listMusicFile, curIdx, musicArray, musicNameArray, repeatMusic, musicPlaying, musicPaused, doneSearchingFiles, changedMusicPath };
    //why not, lets just put it here
    function cleanArrays() {
        docElements_1.songList.innerText = "Source: " + musicPath;
        docElements_1.songListLabel.innerText = "Available music: ";
        if (musicArray.length > 0) {
            musicArray = [];
        }
        if (musicNameArray.length > 0) {
            musicNameArray = [];
        }
    }
    exports.cleanArrays = cleanArrays;
});
