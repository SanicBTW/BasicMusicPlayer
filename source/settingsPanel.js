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

//add if vol keys are pressed dont get input
document.getElementById("timeBarBGColorInput").addEventListener("keydown", (key) => {
    if(key.key == "Enter")
    {
        setNewValue('time bar.background color', document.getElementById("timeBarBGColorInput").value);
        document.getElementById("timeProgress").style.backgroundColor = "rgb(" + getValue('time bar.background color').toString() + ")";
        notify('Applied new background color!', true);
    }
});

document.getElementById("timeBarColorInput").addEventListener("keydown", (key) => {
    if(key.key == "Enter")
    {
        setNewValue('time bar.color', document.getElementById("timeBarColorInput").value);
        document.getElementById("timeBar").style.backgroundColor = "rgb(" + getValue('time bar.color').toString() + ")";
        notify('Applied new color!', true);
    }
});

document.getElementById("timeBarWidthInput").addEventListener("keydown", (key) => {
    if(key.key == "Enter")
    {
        setNewValue('time bar.width', document.getElementById("timeBarWidthInput").value);
        document.getElementById("timeProgress").style.width = getValue('time bar.width', 'int') + "%";
        notify('Applied new width!', true);
    }
});

document.getElementById("timeBarHeightInput").addEventListener("keydown", (key) => {
    if(key.key == "Enter")
    {
        setNewValue('time bar.height', document.getElementById("timeBarHeightInput").value);
        document.getElementById("timeBar").style.height = getValue('time bar.height', 'int') + "px";
        notify('Applied new height!', true);
    }
});

document.getElementById("timeBarDisplayTimeLeft").addEventListener('change', () => {
    setNewValue('time bar.time left', document.getElementById("timeBarDisplayTimeLeft").checked);
    if(getValue('time bar.time left', 'bool')){ notify('Time bar displays time left', true); }
    else{ notify('Time bar displays current time', true); }
});
document.getElementById("timeDisplayTimeLeft").addEventListener('change', () => {
    setNewValue('time display.time left', document.getElementById("timeDisplayTimeLeft").checked);
    document.getElementById('timeDisplayBothTimes').checked = false;
    setNewValue('time display.both times', document.getElementById('timeDisplayBothTimes').checked);
    //add notify for next update
});
document.getElementById("timeDisplayBothTimes").addEventListener('change', () => {
    setNewValue('time display.both times', document.getElementById('timeDisplayBothTimes').checked);
    //add notify for next update
});

document.getElementById("volumeBarBGColorInput").addEventListener("keydown", (key) => {
    if(key.key == "Enter")
    {
        setNewValue('volume tray.bar background color', document.getElementById("volumeBarBGColorInput").value);
        document.getElementById("volProgress").style.backgroundColor = "rgb(" + getValue('volume tray.bar background color').toString() + ")";
        notify('Applied new volume bar background color!', true);
    }
});

document.getElementById("volumeBarColorInput").addEventListener("keydown", (key) => {
    if(key.key == "Enter")
    {
        setNewValue('volume tray.bar color', document.getElementById("volumeBarColorInput").value);
        document.getElementById("volBar").style.backgroundColor = "rgb(" + getValue('volume tray.bar color').toString() + ")";
        notify('Applied new volume bar color!', true);
    }
});