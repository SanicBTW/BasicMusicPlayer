//totally not the old settings page
var daSettingsPanel = document.getElementById("settingsSidePanel");
var daSettingsPanelContent = document.getElementById("settingsSidePanelContent");

var daProg = document.getElementById("timeProgress");
var daBar = document.getElementById("timeBar");

var colors = ["red", "green", "blue"];

function openSettingsPanel()
{
    if(!getValue("changed timebar background color"))
    {
        document.getElementById("backColorInputR").value = getValue("timebar.backgroundcolor").toString().split(",")[0];
        document.getElementById("backColorInputG").value = getValue("timebar.backgroundcolor").toString().split(",")[1];
        document.getElementById("backColorInputB").value = getValue("timebar.backgroundcolor").toString().split(",")[2];
    }
    else
    {
        document.getElementById("backColorInputR").value = formatRGBString(daProg.style.backgroundColor)[colors[0]].toString().split(",").join("");
        document.getElementById("backColorInputG").value = formatRGBString(daProg.style.backgroundColor)[colors[1]].toString().split(",").join("");
        document.getElementById("backColorInputB").value = formatRGBString(daProg.style.backgroundColor)[colors[2]].toString().split(",").join("");
    }
    daSettingsPanel.style.width = "100%";
    daSettingsPanelContent.style.opacity = "1";
}

function closeSettingsPanel()
{
    daSettingsPanelContent.style.opacity = "0";
    daSettingsPanel.style.width = "0%";
}

document.body.addEventListener("keydown", (key) => 
{
    if(key.key == "Escape")
    {
        closeSettingsPanel();
    }
});

function applyNewBackColor()
{
    var daInfoHeader = document.getElementById("backColorCatInfo");
    var r = document.getElementById("backColorInputR").value;
    var g = document.getElementById("backColorInputG").value;
    var b = document.getElementById("backColorInputB").value;

    daProg.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    daInfoHeader.innerText = "Change time bar background color - New color applied!";

    setTimeout(function() 
    {
        daInfoHeader.innerText = "Change time bar background color";
    }, 1500);
    setNewValue("changed timebar background color", true);
}

//dumb ass way to get some simple values lol
//FINALLY AFTER 2 HOURSSSSSSSSS, THIS LOOKS LIKE SHIT BUT AT LEAST ITS WORKING
//WAIT ITS ACTUALLY USELESS FUCK
//I FOUND A USAGE FOR IT LETS GOO
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