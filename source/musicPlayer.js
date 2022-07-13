var audioPlayer = document.getElementById("audioPlayer");
var daRatings = document.getElementById('playbackRates');

function setState(newState)
{
    switch(newState)
    {
        case "play":
            audioPlayer.src = "./Fight_or_flight.mp3";
            audioPlayer.load();
            audioPlayer.play();
            setNewValue("playing music", true);
            audioPlayer.loop = true;
            break;
        case "stop":
            //we set the playback rate at 0 to not lose the cache or preload lol
            audioPlayer.playbackRate = 0.0;
            setNewValue("playing music", false);
            break;
        case "resume":
            //we set the playback rate at 1x to continue playing it
            audioPlayer.playbackRate = 1.0;
            daRatings.selectedIndex = 0;
            setNewValue("playing music", true);
            break;
    }
}

//add an event listener to the selection box and change the playback rate to that speed
daRatings.addEventListener("change", (selected) => { audioPlayer.playbackRate = selected.target.value; });