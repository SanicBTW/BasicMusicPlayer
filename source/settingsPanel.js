//totally not the old settings page
var daSettingsPanel = document.getElementById("settingsSidePanel");
var daSettingsPanelContent = document.getElementById("settingsSidePanelContent");

var daProg = document.getElementById("timeProgress");
var daBar = document.getElementById("timeBar");

function openSettingsPanel()
{
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
}