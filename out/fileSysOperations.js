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
define(["require", "exports", "./helperVariables", "./helperVariables", "./docElements"], function (require, exports, helperVariables_1, helperVariables_2, docElements_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.setupFiles = exports.readFileJSON = exports.readFile = void 0;
    helperVariables_2 = __importDefault(helperVariables_2);
    function readFile(file, turnIntoArray = false) {
        return __awaiter(this, void 0, void 0, function* () {
            var allText = "";
            var raw = yield fetch(file);
            try {
                if (turnIntoArray) {
                    var theList = [];
                    theList = (yield raw.text()).trim().split('\n');
                    return theList;
                }
                else {
                    allText = (yield raw.text());
                }
            }
            catch (exception) {
                alert(exception);
            }
            return allText;
        });
    }
    exports.readFile = readFile;
    function readFileJSON(file) {
        return __awaiter(this, void 0, void 0, function* () {
            var allText = {
                "name": "hola",
                "fileName": "hola"
            };
            var raw = yield fetch(file);
            try {
                allText = JSON.parse(yield raw.text()); //??
            }
            catch (exp) {
                alert(exp);
            }
            return allText;
        });
    }
    exports.readFileJSON = readFileJSON;
    function setupFiles() {
        return __awaiter(this, void 0, void 0, function* () {
            (0, helperVariables_1.cleanArrays)();
            if (!helperVariables_2.default.doneSearchingFiles) //if false ig
             {
                var listMusic = [];
                try {
                    listMusic = yield readFile(helperVariables_2.default.musicPath + helperVariables_2.default.listMusicFile, true);
                }
                catch (exception) {
                    alert("oops code fucked up gotta try with default path man");
                    helperVariables_2.default.musicPath = './music/'; //old support??
                    yield setupFiles();
                }
                for (var i in listMusic) {
                    //music path should come formatted already
                    var mainDir = helperVariables_2.default.musicPath + listMusic[i] + "/"; //format it just in case
                    var dataDir = mainDir + "data" + helperVariables_2.default.dataExt; //yo i just had an idea, what if we just specify the details in the listMusic file (song:songname:filename) it should be epic
                    var theJSON = yield readFileJSON(dataDir);
                    var musicDir = mainDir + theJSON.fileName;
                    helperVariables_2.default.musicArray.push(musicDir);
                    helperVariables_2.default.musicNameArray.push(theJSON.name);
                    docElements_1.songList.innerText = docElements_1.songList.innerText + "\n" + helperVariables_2.default.musicNameArray[i];
                }
                helperVariables_2.default.doneSearchingFiles = true;
            }
        });
    }
    exports.setupFiles = setupFiles;
});
