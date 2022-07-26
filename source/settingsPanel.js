//totally not the old settings page
var daSettingsPanel = document.getElementById("settingsSidePanel");
var daSettingsPanelContent = document.getElementById("settingsSidePanelContent");
var daBottomPanel = document.getElementById("bottomSettingsPanel");

var daProg = document.getElementById("timeProgress");
var daBar = document.getElementById("timeBar");

var optionsNotif = new CustomNotification();

function openSettingsPanel()
{
    daSettingsPanel.style.width = "100%";
    daSettingsPanelContent.style.opacity = "1";
    daBottomPanel.style.bottom = "0px";
    window.document.title = "Basic Music Player - Settings";
}

function closeSettingsPanel()
{
    daBottomPanel.style.bottom = "-200px";
    daSettingsPanelContent.style.opacity = "0";
    daSettingsPanel.style.width = "0%";
    window.document.title = "Basic Music Player";
}

document.addEventListener("keydown", (key) => 
{
    if(key.key == "Escape" && daSettingsPanel.style.width == "100%")
    {
        closeSettingsPanel();
    }
});

//For inputs stuff
class SettingsApplier
{
    constructor(type)
    {
        switch(type)
        {
            case "timebarbgcolor":
                setNewValue('time bar.background color', document.getElementById("timeBarBGColorInput").value);
                document.getElementById("timeProgress").style.backgroundColor = "rgb(" + getValue('time bar.background color').toString() + ")";
                optionsNotif.mainText = 'Applied!';
                optionsNotif.subText = "New time bar background color";
                optionsNotif.notify();
                break;
            case "timebarcolor":
                setNewValue('time bar.color', document.getElementById("timeBarColorInput").value);
                document.getElementById("timeBar").style.backgroundColor = "rgb(" + getValue('time bar.color').toString() + ")";
                optionsNotif.mainText = 'Applied!';
                optionsNotif.subText = "New time bar color";
                optionsNotif.notify();
                break;
            case 'timebarwidth':
                setNewValue('time bar.width', document.getElementById("timeBarWidthInput").value);
                document.getElementById("timeProgress").style.width = getValue('time bar.width', 'int') + "%";
                optionsNotif.mainText = 'Applied!';
                optionsNotif.subText = "New time bar width";
                optionsNotif.notify();
                break;
            case "timebarheight":
                setNewValue('time bar.height', document.getElementById("timeBarHeightInput").value);
                document.getElementById("timeBar").style.height = getValue('time bar.height', 'int') + "px";
                optionsNotif.mainText = 'Applied!';
                optionsNotif.subText = "New time bar height";
                optionsNotif.notify();
                break;
            case "volumebarbgcolor":
                setNewValue('volume tray.bar background color', document.getElementById("volumeBarBGColorInput").value);
                document.getElementById("volProgress").style.backgroundColor = "rgb(" + getValue('volume tray.bar background color').toString() + ")";
                optionsNotif.mainText = 'Applied!';
                optionsNotif.subText = 'New volume bar background color';
                optionsNotif.notify();
                break;
            case "volumebarcolor":
                setNewValue('volume tray.bar color', document.getElementById("volumeBarColorInput").value);
                document.getElementById("volBar").style.backgroundColor = "rgb(" + getValue('volume tray.bar color').toString() + ")";
                optionsNotif.mainText = 'Applied!';
                optionsNotif.subText = 'New volume bar color';
                optionsNotif.notify();
                break;
        }
    }
}

var blockInputs = document.querySelectorAll('.materialInput');

blockInputs.forEach(daInput => {
    daInput.addEventListener('keydown', (key) => {
        return (key.key != "-" || key.key != "+");
    });
});

document.getElementById("timeBarDisplayTimeLeft").addEventListener('change', () => {
    setNewValue('time bar.time left', document.getElementById("timeBarDisplayTimeLeft").checked);
    if(getValue('time bar.time left', 'bool'))
    {
        optionsNotif.mainText = "Time bar displays";
        optionsNotif.subText = 'Time left';
        optionsNotif.notify();
    }
    else
    {
        optionsNotif.mainText = "Time bar displays";
        optionsNotif.subText = 'Current time';
        optionsNotif.notify();
    }
});

document.getElementById("timeDisplayTimeLeft").addEventListener('change', () => {
    setNewValue('time display.time left', document.getElementById("timeDisplayTimeLeft").checked);
    document.getElementById('timeDisplayBothTimes').checked = false;
    setNewValue('time display.both times', document.getElementById('timeDisplayBothTimes').checked);
    if(getValue('time display.time left', 'bool'))
    {
        optionsNotif.mainText = "Time Display";
        optionsNotif.subText = 'Time left';
        optionsNotif.notify();
    }
    else
    {
        optionsNotif.mainText = "Time Display";
        optionsNotif.subText = 'Current time';
        optionsNotif.notify();
    }
});

document.getElementById("timeDisplayBothTimes").addEventListener('change', () => {
    setNewValue('time display.both times', document.getElementById('timeDisplayBothTimes').checked);
    if(getValue('time display.both times', 'bool'))
    {
        optionsNotif.mainText = "Time Display";
        optionsNotif.subText = 'Both times';
        optionsNotif.notify();
    }
    else
    {
        if(getValue('time display.time left', 'bool'))
        {
            optionsNotif.mainText = "Time Display";
            optionsNotif.subText = 'Time left';
            optionsNotif.notify();
        }
        else
        {
            optionsNotif.mainText = "Time Display";
            optionsNotif.subText = 'Current time';
            optionsNotif.notify();
        }
    }
});

//might change it
document.getElementById('notificationsSlowerProgress').addEventListener('change', () => {
    setNewValue('notifications.slower progress', document.getElementById('notificationsSlowerProgress').checked);
    if(getValue('notifications.slower progress', 'bool'))
    {
        optionsNotif.mainText = "Dismiss notification timer";
        optionsNotif.subText = 'Progress will increase slower';
        optionsNotif.notify();
    }
    else
    {
        optionsNotif.mainText = "Dismiss notification timer";
        optionsNotif.subText = 'Progress will increase faster';
        optionsNotif.notify();
    }

});