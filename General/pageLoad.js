//bruh bruh bruhuhuhuhuh

var serverStatusHeader = document.getElementById("serverStatusHeader");

const detectDeviceType = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
? 'Mobile'
: 'Desktop';

var timeProg = document.getElementById("timeProgress");
var timeBar = document.getElementById("timeBar");

var musicList = document.getElementById("uploadedMusicList");

var audioPlayer = document.getElementById("audioPlayer");

var curIndex = 0;

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

    axios.get('http://sancopublic.ddns.net:5430/api/collections/music/records')
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
}

//yes its a copy from my other code from song upload
function setupSongList()
{
    axios.get('http://sancopublic.ddns.net:5430/api/collections/music/records').then((resp) => {
        var musicItems = resp.data.items;
        for(var i in musicItems)
        {
            addMusicItem(musicItems[i].music_name, musicItems[i].music_file, musicItems[i].id, i);
        }
    });
}

function addMusicItem(musicName, musicFile, id, itemNum)
{
    var fixedPath = 'http://sancopublic.ddns.net:5430/api/files/music/' + id + "/" + musicFile;

    sessionStorage.setItem(musicName, fixedPath);

    var newMusicItem = document.createElement('ion-item');

    var musicItemLabel = document.createElement('ion-label');
    musicItemLabel.innerText = musicName + " - item " + itemNum;

    var musicPlayButton = document.createElement('ion-button');
    musicPlayButton.innerText = "Play";
    musicPlayButton.id = musicName + "_btn";
    musicPlayButton.setAttribute('slot', 'end');

    musicPlayButton.addEventListener('click', (e) => {
        var songName = musicPlayButton.id.replace("_btn", "");
        var songURL = sessionStorage.getItem(songName);

        curIndex = itemNum;

        setProgress(0);

        audioPlayer.src = songURL;
        audioPlayer.load();
        audioPlayer.play();
        curPlaying.innerText = "Playing: " + musicName;

        closeMainMenu();
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