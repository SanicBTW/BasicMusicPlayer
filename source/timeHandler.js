var audioPlayer = document.getElementById("audioPlayer");
var audioTime = document.getElementById("audioTime");

audioPlayer.addEventListener("durationchange", () => setProgress(0));
audioPlayer.addEventListener("timeupdate", () => updateProgress());

function updateProgress()
{
    var lengthMin = Math.floor(audioPlayer.duration / 60);
    if(lengthMin >= 10)
    {
        lengthMin = Math.floor(audioPlayer.duration / 60);
    }
    else 
    {
        lengthMin = "0" + Math.floor(audioPlayer.duration / 60);
        if(lengthMin == "0NaN")
        {
            lengthMin = "00";
        }
        else
        {
            lengthMin = "0" + Math.floor(audioPlayer.duration / 60);
        }
    }

    var lengthSecs = Math.floor(audioPlayer.duration % 60); 
    if(lengthSecs >= 10)
    {
        lengthSecs = Math.floor(audioPlayer.duration % 60);
    }
    else
    {
        lengthSecs = "0" + Math.floor(audioPlayer.duration % 60);
        if(lengthSecs == "0NaN")
        {
            lengthSecs = "00";
        }
        else
        {
            lengthSecs = "0" + Math.floor(audioPlayer.duration % 60);
        }
    }

    var songPercent = (audioPlayer.currentTime / audioPlayer.duration);
    var curMin = Math.floor(audioPlayer.currentTime / 60) >= 10 ? Math.floor(audioPlayer.currentTime / 60) : "0" + Math.floor(audioPlayer.currentTime / 60);
    var curSecs = Math.floor(audioPlayer.currentTime % 60) >= 10 ? Math.floor(audioPlayer.currentTime % 60) : "0" + Math.floor(audioPlayer.currentTime % 60);

    //this is for the time left ig
    var songCalc = (audioPlayer.duration - audioPlayer.currentTime);
    var minLeft = Math.floor(songCalc / 60);
    if(minLeft >= 10)
    {
        minLeft = Math.floor(songCalc / 60);
    }
    else
    {
        minLeft = "0" + Math.floor(songCalc / 60);
        if(minLeft == "0NaN")
        {
            minLeft = "00";
        }
        else
        {
            minLeft = "0" + Math.floor(songCalc / 60);
        }
    }

    var secsLeft = Math.floor(songCalc % 60);
    if(secsLeft >= 10)
    {
        secsLeft = Math.floor(songCalc % 60);
    }
    else
    {
        secsLeft = "0" + Math.floor(songCalc % 60);
        if(secsLeft == "0NaN")
        {
            secsLeft = "00";
        }
        else
        {
            secsLeft = "0" + Math.floor(songCalc % 60);
        }
    }

    if(!getValue("time display.both times", 'bool') && getValue("time display.time left", 'bool'))
    {
        audioTime.innerText = minLeft + ":" + secsLeft + " / " + lengthMin + ":" + lengthSecs;
    }
    else if(!getValue("time display.both times", 'bool') && !getValue("time display.time left", 'bool'))
    {
        audioTime.innerText = curMin + ":" + curSecs + " / " + lengthMin + ":" + lengthSecs;
    }
    else if(getValue("time display.both times", 'bool'))
    {
        audioTime.innerText = curMin + ":" + curSecs + " / -" + minLeft + ":" + secsLeft;
    }

    if(getValue("time bar.time left", 'bool'))
    {
        setProgress(100 - (songPercent * 100));
    }
    else
    {
        setProgress(songPercent * 100);
    }
}