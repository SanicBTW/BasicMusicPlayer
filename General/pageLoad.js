//bruh bruh bruhuhuhuhuh

var serverStatusHeader = document.getElementById("serverStatusHeader");

const detectDeviceType = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
? 'Mobile'
: 'Desktop';

var timeProg = document.getElementById("timeProgress");
var timeBar = document.getElementById("timeBar");

var musicList = document.getElementById("uploadedMusicList");

var audioPlayer = document.getElementById("audioPlayer");

var loopToggle = document.getElementById("loopToggle");

loopToggle.addEventListener('ionChange', (e) => {
    audioPlayer.loop = e.target.checked;
});

function onLoad()
{

    var outerStyle = document.createElement("style");
    if(detectDeviceType() == "Desktop")
    {
        outerStyle.innerHTML = `.outer { 
            width: 100%; height: 97.9vh; display: flex; justify-content: center; align-items: center;
        }`;
    }
    else
    {
        outerStyle.innerHTML = `.outer { 
            width: 100%; height: 90vh; display: flex; justify-content: center; align-items: center;
        }`;
    }
    document.head.appendChild(outerStyle);

    axios.get('https://0d0b-81-61-195-120.eu.ngrok.io/api/collections/music/records')
    .then((resp) => {
        if(resp.status == 200)
        {
            serverStatusHeader.innerText = "Server status: Online";
        }
        if(resp.status == 400)
        {
            serverStatusHeader.innerText = "Server status: Offline (400)";
        }
        if(resp.status == 0)
        {
            serverStatusHeader.innerText = "Server status: Offline (0)";
        }
        if(resp.status == 404)
        {
            serverStatusHeader.innerText = "Server status: Not found (404)";
        }
    }).catch((e) => {
        serverStatusHeader.innerText = "Server status: Get Error, check URL";
    });

    timeProg.style.backgroundColor = 'rgb(' + getValue("time bar.background color").toString() + ")";

    timeBar.style.backgroundColor = 'rgb(' + getValue("time bar.color").toString() + ")";

    setProgress(0);

    setupSongList();
    /*
    var timeProg = document.getElementById("timeProgress");
    var timeBar = document.getElementById("timeBar");

    var volumeProg = document.getElementById("volProgress");
    var volumeBar = document.getElementById("volBar");

    timeProg.style.backgroundColor = 'rgb(' + getValue("time bar.background color").toString() + ")";
    timeProg.style.width = getValue("time bar.width", "int") + "%";

    timeBar.style.backgroundColor = 'rgb(' + getValue("time bar.color").toString() + ")";
    timeBar.style.height = getValue("time bar.height", "int") + "px";

    volumeProg.style.backgroundColor = 'rgb(' + getValue("volume tray.bar background color").toString() + ")";
    volumeBar.style.backgroundColor = 'rgb(' + getValue('volume tray.bar color').toString() + ")";

    document.getElementById("timeBarBGColorInput").value = getValue('time bar.background color', 'rgb');
    document.getElementById("timeBarColorInput").value = getValue('time bar.color', 'rgb');

    document.getElementById('timeBarWidthInput').value = getValue('time bar.width', 'int');
    document.getElementById("timeBarHeightInput").value = getValue('time bar.height', 'int');

    document.getElementById("timeBarDisplayTimeLeft").checked = getValue('time bar.time left', 'bool');

    document.getElementById("timeDisplayTimeLeft").checked = getValue('time display.time left', 'bool');
    document.getElementById("timeDisplayBothTimes").checked = getValue('time display.both times', 'bool');

    document.getElementById("volumeBarBGColorInput").value = getValue('volume tray.bar background color', 'rgb');
    document.getElementById("volumeBarColorInput").value = getValue('volume tray.bar color', 'rgb');

    document.getElementById('notificationsSlowerProgress').checked = getValue('notifications.slower progress', 'bool')

    setProgress(0);*/
}

//yes its a copy from my other code from song upload
function setupSongList()
{
    axios.get('https://0d0b-81-61-195-120.eu.ngrok.io/api/collections/music/records').then((resp) => {
        var musicItems = resp.data.items;
        for(var i in musicItems)
        {
            addMusicItem(musicItems[i].music_name, musicItems[i].music_file, musicItems[i].id);
        }
    });
}

function addMusicItem(musicName, musicFile, id)
{
    var fixedPath = 'https://0d0b-81-61-195-120.eu.ngrok.io/api/files/music/' + id + "/" + musicFile;

    sessionStorage.setItem(musicName, fixedPath);

    var newMusicItem = document.createElement('ion-item');

    var musicItemLabel = document.createElement('ion-label');
    musicItemLabel.innerText = musicName;

    var musicPlayButton = document.createElement('ion-button');
    musicPlayButton.innerText = "Select";
    musicPlayButton.id = musicName + "_btn";
    musicPlayButton.setAttribute('slot', 'end');

    musicPlayButton.addEventListener('click', (e) => {
        var songName = musicPlayButton.id.replace("_btn", "");
        var songURL = sessionStorage.getItem(songName);

        var timeBar = document.getElementById("timeBar");
        timeBar.classList.add('notransition');
        setProgress(0);
        timeBar.offsetHeight;
        timeBar.classList.remove('notransition');

        audioPlayer.src = songURL;
    });

    newMusicItem.appendChild(musicItemLabel);
    newMusicItem.appendChild(musicPlayButton);
    musicList.appendChild(newMusicItem);
}

/*
var openedVol = false;
var holdTime = 0.0;
var curkey;

//only allows a keypress once
document.addEventListener('keydown', (key) => {
    curkey = key.key;

    if(curkey == "-" && holdTime == 0.0)
    {
        holdTime += 0.1;

        document.getElementById("volumeTray").style.top = '0px';
        openedVol = true;
        volCheck(curkey);
    }

    if(curkey == "+" && holdTime == 0.0)
    {
        holdTime += 0.1;

        document.getElementById("volumeTray").style.top = '0px';
        openedVol = true;
        volCheck(curkey);
    }
});

document.addEventListener('keyup', () => {
    curkey = null;
    holdTime = 0.0;
});

document.getElementById("volBar").addEventListener("transitionend", () => {
    closeVolPanel();
});

function closeVolPanel(fromVolLimit = false)
{
    if(fromVolLimit)
    {
        if(openedVol == true)
        {
            var the = setTimeout(() => {
                document.getElementById("volumeTray").style.top = '-200px'; //-200
                clearTimeout(the);
                openedVol = false;
            }, 1000);
        }
    }
    else
    {
        if(openedVol == true)
        {
            var the = setTimeout(() => {
                document.getElementById("volumeTray").style.top = '-200px'; //-200
                clearTimeout(the);
                openedVol = false;
            }, 500);
        }
    }
}

function volCheck(keyPressed)
{
    switch(keyPressed)
    {
        case "+":
            if(parseVol() != 1.0)
            {
                document.getElementById("audioPlayer").volume += 0.1;
                document.getElementById("volBar").style.width = parseVolPercent();
                document.getElementById("volP").innerText = parseVolPercent();
            }
            else
            {
                closeVolPanel(true);
            }
            break;
        case "-":
            if(parseVol() != 0)
            {
                document.getElementById("audioPlayer").volume -= 0.1
                document.getElementById("volBar").style.width = parseVolPercent();
                document.getElementById("volP").innerText = parseVolPercent();
            }
            else
            {
                closeVolPanel(true);
            }
            break;
    }
}*/