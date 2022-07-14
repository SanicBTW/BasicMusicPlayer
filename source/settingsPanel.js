//totally not the old settings page
var daSettingsPanel = document.getElementById("settingsSidePanel");
var daSettingsPanelContent = document.getElementById("settingsSidePanelContent");

var daProg = document.getElementById("timeProgress");
var daBar = document.getElementById("timeBar");

var colors = ["red", "green", "blue"];

function openSettingsPanel()
{
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
    if(key.key == "Escape" && daSettingsPanel.style.width == "100%")
    {
        closeSettingsPanel();
    }
});

function applyNewTimeBarBackColor()
{
    var r = document.getElementById("timeBarBackColorInputR").value;
    var g = document.getElementById("timeBarBackColorInputG").value;
    var b = document.getElementById("timeBarBackColorInputB").value;

    daProg.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
}

function applyNewTimeBarColor()
{
    var r = document.getElementById("timeBarColorInputR").value;
    var g = document.getElementById("timeBarColorInputG").value;
    var b = document.getElementById("timeBarColorInputB").value;

    daBar.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
}

function applyNewTimeBarWidth()
{
    var daNew = document.getElementById("timeBarWidthInput").value;

    daProg.style.width = daNew + "%";
}

function applyNewTimeBarHeight()
{
    var daNew = document.getElementById("timeBarHeightInput").value;

    daBar.style.height = daNew + "px";
}

function exportSettings()
{
    //time bar
    var timeBarBackColorR = parseInt(document.getElementById("timeBarBackColorInputR").value);
    var timeBarBackColorG = parseInt(document.getElementById("timeBarBackColorInputG").value);
    var timeBarBackColorB = parseInt(document.getElementById("timeBarBackColorInputB").value);

    var timeBarColorR = parseInt(document.getElementById("timeBarColorInputR").value);
    var timeBarColorG = parseInt(document.getElementById("timeBarColorInputG").value);
    var timeBarColorB = parseInt(document.getElementById("timeBarColorInputB").value);

    var timeBarWidth = parseInt(document.getElementById("timeBarWidthInput").value);
    var timeBarHeight = parseInt(document.getElementById("timeBarHeightInput").value);

    var timeBarDisplayTimeLeft = document.getElementById('timeBarDisplayTimeLeft').checked;

    //time display
    var timedisplayDisplayTimeLeft = document.getElementById("timedisplayDisplayTimeLeft").checked;

    //window
    var windowUpdateWindowTitle = document.getElementById('windowUpdateWindowTitle').checked;
    var windowDisplaySongName = document.getElementById('windowDisplaySongName').checked;
    var windowDisplayTimeLeft = document.getElementById('windowDisplayTimeLeft').checked;

    var toExport = {
        "categories": ["TimeBar", "TimeDisplay", "Window"],
        "configuration": 
        {
            "TimeBar": 
            {
                "backgroundColor": [timeBarBackColorR, timeBarBackColorG, timeBarBackColorB],
                "Color": [timeBarColorR, timeBarColorG, timeBarColorB],
                "Width": timeBarWidth,
                "Height": timeBarHeight,
                "display time left instead of cur time": timeBarDisplayTimeLeft
            },
            "TimeDisplay":
            {
                "display time left instead of cur time": timedisplayDisplayTimeLeft
            },
            "Window":
            {
                "update window title": windowUpdateWindowTitle,
                "display song name": windowDisplaySongName,
                "display time left": windowDisplayTimeLeft
            }
        }
    }

    var haha = JSON.stringify(toExport, null, 4);

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(haha));
    element.setAttribute('download', "exportedSettings.json");

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function applyAll()
{
    applyNewTimeBarBackColor();
    applyNewTimeBarColor();
    applyNewTimeBarWidth();
    applyNewTimeBarHeight();
    setNewValue("timebar.display time left instead of cur time", document.getElementById('timeBarDisplayTimeLeft').checked);
    setNewValue("timedisplay.display time left instead of cur time", document.getElementById("timedisplayDisplayTimeLeft").checked);
    setNewValue("Window.update window title", document.getElementById('windowUpdateWindowTitle').checked);
    setNewValue("Window.display song name", document.getElementById('windowDisplaySongName').checked);
    setNewValue("Window.display time left", document.getElementById('windowDisplayTimeLeft').checked);
    alert("Applied!");
}

function loadSettings()
{
    var input = document.createElement("input");
    input.type = 'file';
    input.accept = 'application/json';
    input.click();

    input.addEventListener("change", (e) => 
    {
        var file = e.target.files[0];

        var reader = new FileReader();
        reader.readAsText(file, 'UTF-8');

        reader.addEventListener("load", (readerEvent) => 
        {
            var content = readerEvent.target.result;
            var daParsedText = JSON.parse(content);
            var availCats = daParsedText.categories;
            for(var i in availCats)
            {
                var category = availCats[i];
                var catSets = daParsedText.configuration[category];
                for(var j in catSets)
                {
                    var setting = j;
                    var settingValue = catSets[j];
                    var indexer = `${category}.${setting}`;

                    setNewValue(indexer, settingValue);
                    //document.getElementById("loadSettingsBtn").disabled = true;
                }
            }
            refreshValues();
        });
    });
}

function refreshValues()
{
    //time bar
    document.getElementById("timeBarBackColorInputR").value = getValue("timebar.backgroundcolor").toString().split(",")[0];
    document.getElementById("timeBarBackColorInputG").value = getValue("timebar.backgroundcolor").toString().split(",")[1];
    document.getElementById("timeBarBackColorInputB").value = getValue("timebar.backgroundcolor").toString().split(",")[2];

    document.getElementById("timeBarColorInputR").value = getValue("timebar.color").toString().split(",")[0];
    document.getElementById("timeBarColorInputG").value = getValue("timebar.color").toString().split(",")[1];
    document.getElementById("timeBarColorInputB").value = getValue("timebar.color").toString().split(",")[2];

    document.getElementById("timeBarWidthInput").value = getValue("timebar.width");
    document.getElementById("timeBarHeightInput").value = getValue("timebar.height");

    document.getElementById('timeBarDisplayTimeLeft').checked = getValue("timebar.display time left instead of cur time");

    //time display
    document.getElementById("timedisplayDisplayTimeLeft").checked = getValue("timedisplay.display time left instead of cur time");

    //window
    document.getElementById('windowUpdateWindowTitle').checked = getValue("window.update window title");
    document.getElementById('windowDisplaySongName').checked = getValue("window.display song name");
    document.getElementById('windowDisplayTimeLeft').checked = getValue("window.display time left");

    applyAll();
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