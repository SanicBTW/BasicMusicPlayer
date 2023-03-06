//hardcode stuff
var cats = ["Time Bar"];
var saveVersion = "3.0 EDPR2";

if(getValue('save data version') != saveVersion)
{
    localStorage.clear();
    setupConfig();
    window.location.reload(true);
}

document.addEventListener('keydown', (key) => {
    if(key.altKey && key.key == "r")
    {
        localStorage.clear();
        setupConfig();
        window.location.reload(true);
    }
});

if(localStorage.length <= 0)
{
    setupConfig();
}

function setupConfig()
{
    setNewValue('save data version', saveVersion);

    //time bar
    setNewValue(`${cats[0]}.background color`, [112, 128, 144]);
    setNewValue(`${cats[0]}.color`, [30, 144, 255]);
    setNewValue(`${cats[0]}.time left`, false);
}


var audioPlayer = document.getElementById("audioPlayer");
var currentTimeTxt = document.getElementById("currentTime");
var timeLeftTxt = document.getElementById("timeLeft");
var curPlaying = document.getElementById('curPlaying');

audioPlayer.addEventListener("durationchange", () => setProgress(0));
audioPlayer.addEventListener("timeupdate", () => updateProgress());
audioPlayer.addEventListener('ended', () => {
    if(audioPlayer.loop == false){ nextSong(); }
});

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

    currentTimeTxt.innerText = curMin + ":" + curSecs;
    timeLeftTxt.innerText = minLeft + ":" + secsLeft;

    if(getValue("time bar.time left", 'bool'))
    {
        setProgress(100 - (songPercent * 100));
    }
    else
    {
        setProgress(songPercent * 100);
    }
}

function nextSong()
{
    curIndex ++;
    axios.get('https://pb.sancopublic.tk/api/collections/music/records').then((resp) => {
        var musicItem = resp.data.items[curIndex];
        if(musicItem != undefined)
        {
            audioPlayer.src = sessionStorage.getItem(musicItem.music_name);
            audioPlayer.load();
            audioPlayer.play();
            curPlaying.innerText = "Playing: " + musicItem.music_name;
        }
        else
        {
            curIndex = 0;
            musicItem = resp.data.items[curIndex];
            audioPlayer.src = sessionStorage.getItem(musicItem.music_name);
            audioPlayer.load();
            audioPlayer.play();
            curPlaying.innerText = "Playing: " + musicItem.music_name;
        }
    });
}


function prevSong()
{
    curIndex --;
    axios.get('https://pb.sancopublic.tk/api/collections/music/records').then((resp) => {
        var musicItem = resp.data.items[curIndex];
        if(musicItem != undefined)
        {
            audioPlayer.src = sessionStorage.getItem(musicItem.music_name);
            audioPlayer.load();
            audioPlayer.play();
            curPlaying.innerText = "Playing: " + musicItem.music_name;
        }
        else
        {
            curIndex = resp.data.totalItems -1;
            musicItem = resp.data.items[curIndex];
            audioPlayer.src = sessionStorage.getItem(musicItem.music_name);
            audioPlayer.load();
            audioPlayer.play();
            curPlaying.innerText = "Playing: " + musicItem.music_name;
        }
    });
}
