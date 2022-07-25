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
            audioPlayer.loop = true;
            break;
        case "stop":
            audioPlayer.pause();
            break;
        case "resume":
            audioPlayer.play();
            break;
    }
}

//add an event listener to the selection box and change the playback rate to that speed
daRatings.addEventListener("change", (selected) => { audioPlayer.playbackRate = selected.target.value; });