var hover = document.getElementById("sfxHover");
var audioPlayer = document.getElementById("audioPlayer");
var allowed = getValue("General.sound effects on hovering");
console.log(allowed);

function playHover()
{
    if(allowed)
    {
        if(getValue("playing music") == true)
        {
            audioPlayer.volume = 0.3;
        }
        hover.loop = false;
        hover.play();
    }
}

hover.onended = function() { if(allowed){ audioPlayer.volume = 1; } }