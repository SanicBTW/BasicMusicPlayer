import { cleanArrays } from "./helperVariables";
import editableVars from './helperVariables';
import {songList} from "./docElements";


export async function readFile(file:string, turnIntoArray:boolean = false):Promise<any> { //lets just change it to any, kind of lazy to deal with type shit lol
    var allText:string = "";
    var raw:Response = await fetch(file);
    try{
        if(turnIntoArray){
            var theList:Array<string> = [];
            theList = (await raw.text()).trim().split('\n');
            return theList;
        } else {
            allText = (await raw.text());
        }
    } catch (exception){
        alert(exception);
    }

    return allText;
}

export async function readFileJSON(file:string):Promise<JSONData> {
    var allText:JSONData = { //dummy
        "name": "hola",
        "fileName": "hola"
    }
    var raw:Response = await fetch(file);
    try
    {
        allText = JSON.parse(await raw.text()) //??
    } 
    catch (exp)
    {
        alert(exp)
    }
    return allText;
}

export async function setupFiles(){
    cleanArrays();

    if(!editableVars.doneSearchingFiles) //if false ig
    {
        var listMusic:Array<string> = [];
        try
        {
            listMusic = await readFile(editableVars.musicPath + editableVars.listMusicFile, true);
        } 
        catch (exception) 
        {
            alert("oops code fucked up gotta try with default path man");
            editableVars.musicPath = './music/' //old support??
            await setupFiles();
        }
        for(var i in listMusic)
        {
            //music path should come formatted already
            var mainDir = editableVars.musicPath + listMusic[i] + "/"; //format it just in case
            var dataDir = mainDir + "data" + editableVars.dataExt; //yo i just had an idea, what if we just specify the details in the listMusic file (song:songname:filename) it should be epic
            var theJSON:JSONData = await readFileJSON(dataDir);
            var musicDir = mainDir + theJSON.fileName;
            editableVars.musicArray.push(musicDir);
            editableVars.musicNameArray.push(theJSON.name);
            songList!.innerText = songList!.innerText + "\n" + editableVars.musicNameArray[i];
        }
        editableVars.doneSearchingFiles = true;
    }
}

//ily typescript
type JSONData =
{
    name: string,
    fileName: string
}