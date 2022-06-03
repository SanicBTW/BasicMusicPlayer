var musicPath:string = './music/'; //old support???
var dataExt:string = ".json";
var listMusicFile:string = "listMusic.txt";
var curIdx:number = 0; //might use a custom index in the index file instead of this one, idk
var musicArray:Array<any> = []; //gotta check what type is the thing
var musicNameArray:Array<string> = [];
var repeatMusic:boolean = false;
var musicPlaying:boolean = false;
var musicPaused:boolean = false;
var doneSearchingFiles:boolean = false;
var changedMusicPath:boolean = false;

export default {musicPath, dataExt, listMusicFile, curIdx, musicArray, musicNameArray, repeatMusic, musicPlaying, musicPaused, doneSearchingFiles, changedMusicPath};

//we importing after exportin lmfaoo
import { songList, songListLabel } from "./docElements";

//why not, lets just put it here
export function cleanArrays(){
    songList!.innerText = "Source: " + musicPath;
    songListLabel!.innerText = "Available music: ";
    if(musicArray.length > 0){
        musicArray = [];
    }
    if(musicNameArray.length > 0){
        musicNameArray = [];
    }
}