var musicPath:string = './music/';
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

//make them editable, exported vars are not changeable for some reason, lets just export them to default
export default {musicPath, dataExt, listMusicFile, curIdx, musicArray, musicNameArray, repeatMusic, musicPlaying, musicPaused, doneSearchingFiles, changedMusicPath};