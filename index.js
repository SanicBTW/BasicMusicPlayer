var daMusicPlayerBoii = document.getElementById("audioPlayer")
var daMPsource = document.getElementById("audioPlayerSRC")
var daFunnyInfo = document.getElementById("curplayinginfo")

var text = document.getElementById("textarea");
var element = document.getElementById("text");

var thefunnypath = './music/';
var thefunnyext = '.mp3';

var jaja = funnyRead(thefunnypath + 'listMusic.txt', true);
var funnyIdx = 0;

var fileArray = [];
var fileNameArray = [];

var repeat = false;

daMusicPlayerBoii.onended = function() {
    if(repeat == true){
        playSong();
    }
}

for(var i in jaja)
{
    var thefunny = thefunnypath + jaja[i] + thefunnyext;
    fileArray.push(thefunny);
    fileNameArray.push(jaja[i]);
}

function nextButtonFct()
{
    if(funnyIdx == fileArray.length -1){
        element.innerHTML = ("theres no next song");   
    } else {
        funnyIdx +1;
        daMPsource.src = fileArray[funnyIdx];
    }
}

function prevButtonFct()
{
    if(funnyIdx == 0){
        element.innerHTML = ("theres no previous song");
    }else{
        funnyIdx -1;
        daMPsource.src = fileArray[funnyIdx];
    }
}

function playSong()
{
    daMPsource.src = fileArray[funnyIdx];
    daMusicPlayerBoii.load();
    daMusicPlayerBoii.play();
    daFunnyInfo.innerText = "Currently playing " + fileNameArray[funnyIdx];
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

function setRepeat()
{
    repeat = !repeat;
    var thefunnybutton = document.getElementById("funnyRepeatButton");
    if(repeat == true){
        thefunnybutton.innerText = "Repeat On";
    } else {
        thefunnybutton.innerText = "Repeat Off";
    }
}