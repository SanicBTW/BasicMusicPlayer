//from https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-72.php
const detectDeviceType = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? 'Mobile'
    : 'Desktop';
var platform = detectDeviceType();

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
    if(platform == "Desktop")
    {
        playButton.innerText = "Pause"
    }
}

audioPlayer.onpause = function() 
{
    musicPaused = true;
    musicPlaying = false;
    if(platform == "Desktop")
    {
        playButton.innerText = "Resume";
    }
    curPlayingInfo.innerText = "Currently playing: " + musicNameArray[curIdx] + " (PAUSED)";
}
