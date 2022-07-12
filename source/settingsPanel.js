//totally not the old settings page
var daSettingsPanel = document.getElementById("settingsSidePanel");

var daProg = document.getElementById("timeProgress");
var daBar = document.getElementById("timeBar");
var daBackColorInput = document.getElementById("colorInput1");

function openSettingsPanel()
{
    daSettingsPanel.style.width = "100%";
}

function closeSettingsPanel()
{
    daSettingsPanel.style.width = "0%";
}

function applySettings(setting)
{
    switch(setting)
    {
        case "time bar background color":
            const color = daBackColorInput.value;
            const r = parseInt(color.substr(1,2), 16);
            const g = parseInt(color.substr(3,2), 16);
            const b = parseInt(color.substr(5,2), 16);
            daProg.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
            break;
    }
}