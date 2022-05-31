var daMusicPlayerBoii = document.getElementById("audioPlayer")
var daMPsource = document.getElementById("audioPlayerSRC")
var daFunnyInfo = document.getElementById("curplayinginfo")
var nextButt = document.getElementById("nextButton");
var prevButt = document.getElementById("prevButton");
var playButt = document.getElementById("playButton");
var text = document.getElementById("textarea");
var element = document.getElementById("text");

var thefunnypath = './music/';
var thefunnyext = '.mp3';

var jaja = funnyRead(thefunnypath + 'listMusic.txt', true);
var funnyIdx = 0;

var fileArray = [];
for(var i in jaja)
{
    var thefunny = thefunnypath + jaja[i] + thefunnyext;
    fileArray.push(thefunny);
}

function nextButtonFct()
{
    alert(fileArray.length)
    if(funnyIdx == fileArray.length){
        element.innerHTML = ("theres no next song");   
    }
}

function prevButtonFct()
{
    if(funnyIdx == 0){
        element.innerHTML = ("theres no previous song");
    }else{
        funnyIdx --;
    }
}

function playSong()
{
    daMPsource.src = fileArray[funnyIdx];
    daMusicPlayerBoii.load();
    daMusicPlayerBoii.play();
    daFunnyInfo.innerText = "Currently playing " + daMusicPlayerBoii.currentSrc;
}

function funnyRead(file, turnIntoFunnyArray)
{
    var allText = null;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                if(turnIntoFunnyArray == true){
                    allText = rawFile.responseText.trim().split('\n');
                } else {
                    allText = rawFile.responseText;
                }
                return allText;
            }
        }
    }
    rawFile.send(null);
    return allText;
}

function pauseSong()
{
    daMusicPlayerBoii.pause();
}
function resumeSong()
{
    daMusicPlayerBoii.play();
}