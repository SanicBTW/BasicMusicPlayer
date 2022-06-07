//events
audioPlayer.onended = function() 
{
    musicPlaying = false;
    musicPaused = false;
    if(repeatMusic == true){
        setPlayerState("play");
    } else {
        curPlayingInfo.innerText = "Currently playing: nothing (ENDED)";
    }
}

audioPlayer.onplaying = function() 
{
    musicPlaying = true;
    musicPaused = false;
    //playButton.innerText = "Pause"
}

audioPlayer.onpause = function() 
{
    musicPaused = true;
    musicPlaying = false;
    //playButton.innerText = "Resume";
    curPlayingInfo.innerText = "Currently playing: " + musicNameArray[curIdx] + " (PAUSED)";
}
