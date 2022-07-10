elements.addAudio(null, false, "audioPlayer");
var audioPlayer = elements.getElement("audioPlayer");
audioPlayer.preload = "auto";

elements.addButton("stop", function()
{
    audioPlayer.pause();
}, "stopButton");

elements.addButton("resume", function()
{
    audioPlayer.play();
}, "resumeButton");

elements.addButton("set speed rate", function()
{
    audioPlayer.playbackRate = 5.0;
}, "speedrateButton");

elements.addButton("default speed rate", function()
{
    audioPlayer.playbackRate = 1.0;
}, "defaultspeedrateButton");

elements.addHeader("", "h1", "audioTime");

audioPlayer.addEventListener("durationchange", () => setProgress(0));
audioPlayer.addEventListener("timeupdate", () => updateProgress());

elements.onKeydown(function(key)
{
    if(key.key == "1")
    {
        audioPlayer.src = "./Fight_or_flight.mp3";
        setNewValue("fileName", "Fight or flight");
        audioPlayer.load();
        audioPlayer.play();
        audioPlayer.loop = true;
    }
    if(key.key == "2")
    {
        audioPlayer.src = "./fallgays.mp3";
        setNewValue("fileName", "Fall Guys");
        audioPlayer.load();
        audioPlayer.play();
    }
});

function updateProgress()
{
    //thanks psych engine for the time stuff lmaoo
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
    elements.changeText("audioTime", curMin + ":" + curSecs + "/" + lengthMin + ":" + lengthSecs);

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

    //NOW IT WORKS???
    if(getValue("updateWindowTitle"))
    {
        var newTitle = "";
        if(getValue("displaySongName"))
        {
            newTitle = getValue("fileName");
        }
        if(getValue("displayTimeLeft"))
        {
            if(getValue("displaySongName")) 
            {
                newTitle += " - " + minLeft + ":" + secsLeft;
            }
            else
            {
                newTitle = minLeft + ":" + secsLeft;
            }
        }
        window.document.title = newTitle;
    }

    setProgress(songPercent * 100);
}