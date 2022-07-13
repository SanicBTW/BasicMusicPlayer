//totally not the old settings page
var daSettingsPanel = document.getElementById("settingsSidePanel");
var daSettingsPanelContent = document.getElementById("settingsSidePanelContent");

var daProg = document.getElementById("timeProgress");
var daBar = document.getElementById("timeBar");

var colors = ["red", "green", "blue"];

function openSettingsPanel()
{
    setupValues();
    daSettingsPanel.style.width = "100%";
    daSettingsPanelContent.style.opacity = "1";
    window.document.title = "Basic Music Player - Settings";
}

function closeSettingsPanel()
{
    daSettingsPanelContent.style.opacity = "0";
    daSettingsPanel.style.width = "0%";
    window.document.title = "Basic Music Player";
}

document.body.addEventListener("keydown", (key) => 
{
    if(key.key == "Escape")
    {
        closeSettingsPanel();
    }
});

function applyNewTimeBarBackColor()
{
    var daInfoHeader = document.getElementById("timeBarBackColorInfo");
    var r = document.getElementById("timeBarBackColorInputR").value;
    var g = document.getElementById("timeBarBackColorInputG").value;
    var b = document.getElementById("timeBarBackColorInputB").value;

    daProg.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    daInfoHeader.innerText = "Change time bar background color - New color applied!";

    setTimeout(function() 
    {
        daInfoHeader.innerText = "Change time bar background color";
    }, 1500);
    setNewValue("changed timebar background color", true);
}

function applyNewTimeBarColor()
{
    var daInfoHeader = document.getElementById("timeBarColorInfo");
    var r = document.getElementById("timeBarColorInputR").value;
    var g = document.getElementById("timeBarColorInputG").value;
    var b = document.getElementById("timeBarColorInputB").value;

    daBar.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    daInfoHeader.innerText = "Change time bar color - New color applied!";

    setTimeout(function() 
    {
        daInfoHeader.innerText = "Change time bar color";
    }, 1500);
    setNewValue("changed timebar color", true);
}

//dumb ass way to get some simple values lol
function formatRGBString(toFormat)
{
    var toReturn = null;
    var the = toFormat.toLowerCase();
    var help = [];
    var ignore = ["r", "g", "b", "(", ","];
    var helpAgain = [];
    var helpmee = [];

    var final = new Object();
    var select = 0;
    var tempArr = [];

    for(var i in the)
    {
        help.push(the[i]);
    }

    for(var i in help)
    {
        for(var j in ignore)
        {
            if(help[i] == ignore[j])
            {
                help.shift();
            }
        }
        if(help[help.length -1] == ")")
        {
            help[help.length -1] = "-";
        }

        helpAgain.push(help[i]);
    }

    //im this dumb?
    for(var i in helpAgain)
    {
        if(helpAgain[i] == " ")
        {
            helpAgain[i] = "-";
        }

        helpmee.push(helpAgain[i]);
    }

    for(var i in helpmee)
    {
        if(helpmee[i] == "-")
        {
            select++;
            tempArr = [];
        }
        if(helpmee[i] != "-")
        {
            tempArr.push(helpmee[i]);
            final[colors[select]] = tempArr;
        }
    }

    toReturn = final;
    return toReturn;
}

function setupValues()
{
    if(!getValue("changed timebar background color"))
    {
        document.getElementById("timeBarBackColorInputR").value = getValue("timebar.backgroundcolor").toString().split(",")[0];
        document.getElementById("timeBarBackColorInputG").value = getValue("timebar.backgroundcolor").toString().split(",")[1];
        document.getElementById("timeBarBackColorInputB").value = getValue("timebar.backgroundcolor").toString().split(",")[2];
    }
    else
    {
        document.getElementById("timeBarBackColorInputR").value = formatRGBString(daProg.style.backgroundColor)[colors[0]].toString().split(",").join("");
        document.getElementById("timeBarBackColorInputG").value = formatRGBString(daProg.style.backgroundColor)[colors[1]].toString().split(",").join("");
        document.getElementById("timeBarBackColorInputB").value = formatRGBString(daProg.style.backgroundColor)[colors[2]].toString().split(",").join("");
    }

    if(!getValue("changed timebar color"))
    {
        document.getElementById("timeBarColorInputR").value = getValue("timebar.color").toString().split(",")[0];
        document.getElementById("timeBarColorInputG").value = getValue("timebar.color").toString().split(",")[1];
        document.getElementById("timeBarColorInputB").value = getValue("timebar.color").toString().split(",")[2];
    }
    else
    {
        document.getElementById("timeBarColorInputR").value = formatRGBString(daBar.style.backgroundColor)[colors[0]].toString().split(",").join("");
        document.getElementById("timeBarColorInputG").value = formatRGBString(daBar.style.backgroundColor)[colors[1]].toString().split(",").join("");
        document.getElementById("timeBarColorInputB").value = formatRGBString(daBar.style.backgroundColor)[colors[2]].toString().split(",").join("");
    }
}