define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var musicPath = './music/';
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
    //make them editable, exported vars are not changeable for some reason, lets just export them to default
    exports.default = { musicPath, dataExt, listMusicFile, curIdx, musicArray, musicNameArray, repeatMusic, musicPlaying, musicPaused, doneSearchingFiles, changedMusicPath };
});
