//totally not the old settings page
var daSettingsPanel = document.getElementById("settingsSidePanel");
var daSettingsPanelContent = document.getElementById("settingsSidePanelContent");

var daProg = document.getElementById("timeProgress");
var daBar = document.getElementById("timeBar");

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
                }
            }
            refreshValues();
        });
    });
}

function refreshValues()
{
    //time bar
    document.getElementById("timeBarBackColorInputR").value = getValue("timebar.backgroundcolor", 'rgb')[0];
    document.getElementById("timeBarBackColorInputG").value = getValue("timebar.backgroundcolor", 'rgb')[1];
    document.getElementById("timeBarBackColorInputB").value = getValue("timebar.backgroundcolor", 'rgb')[2];

    document.getElementById("timeBarColorInputR").value = getValue("timebar.color", 'rgb')[0];
    document.getElementById("timeBarColorInputG").value = getValue("timebar.color", 'rgb')[1];
    document.getElementById("timeBarColorInputB").value = getValue("timebar.color", 'rgb')[2];

    document.getElementById("timeBarWidthInput").value = getValue("timebar.width", 'int');
    document.getElementById("timeBarHeightInput").value = getValue("timebar.height", 'int');

    document.getElementById('timeBarDisplayTimeLeft').checked = getValue("timebar.display time left instead of cur time", 'bool');

    //time display
    document.getElementById("timedisplayDisplayTimeLeft").checked = getValue("timedisplay.display time left instead of cur time", 'bool');

    //window
    document.getElementById('windowUpdateWindowTitle').checked = getValue("window.update window title", 'bool');
    document.getElementById('windowDisplaySongName').checked = getValue("window.display song name", 'bool');
    document.getElementById('windowDisplayTimeLeft').checked = getValue("window.display time left", 'bool');
}

function resetSettings()
{
    localStorage.clear();
    window.location.reload(true);
}