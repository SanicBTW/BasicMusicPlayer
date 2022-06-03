//type definitions my beloved
//simplified index? yessir
import docElements from './docElements';
import editableVars from './helperVariables';
import {setupFiles} from './fileSysOperations';

docElements.audioElement!.onended = function(){
    editableVars.musicPlaying = false;
    editableVars.musicPaused = false;
    if(editableVars.repeatMusic) //if its true
    {
        //setState("");
    }
    else
    {
        docElements.curPlayingInfo!.innerText = "Currently playing: nothing (ENDED)";
    }
}

docElements.audioElement!.onplaying = function(){
    editableVars.musicPlaying = true;
    editableVars.musicPaused = false;
    docElements.playButton!.innerText = "Pause";
}

docElements.audioElement!.onpause = function(){
    editableVars.musicPlaying = false;
    editableVars.musicPaused = false;
    docElements.playButton!.innerText = "Resume";
    docElements.curPlayingInfo!.innerText = "Currently playing: " + editableVars.musicNameArray[editableVars.curIdx] + " (PAUSED)";
}

//add the duration indicator and volume maybe

setupFiles();

function setPlayerState(state:string){
    switch(state)
    {
        case "play":
            docElements.audioElement.src = editableVars.musicPath[editableVars.curIdx];
            docElements.audioElement.load();
            docElements.audioElement.play();
            docElements.curPlayingInfo!.innerText = "Currently playing: " + editableVars.musicNameArray[editableVars.curIdx];
            break;
    }
}

docElements.audioElement.src = editableVars.musicPath[editableVars.curIdx];
docElements.audioElement.load();
docElements.audioElement.play();
docElements.curPlayingInfo!.innerText = "Currently playing: " + editableVars.musicNameArray[editableVars.curIdx];