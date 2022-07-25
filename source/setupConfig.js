//hardcode stuff
var cats = ["Time Bar", "Time Display", "Volume Tray"];
var saveVersion = "2.3";

if(getValue('save data version') != saveVersion)
{
    notify('Clearing local storage (Doesnt match version)', true, function() {
        localStorage.clear();
        setupConfig();
        window.location.reload(true);
    });
}

if(localStorage.length <= 0)
{
    setupConfig();
}

function setupConfig()
{
    setNewValue('save data version', saveVersion);

    //time bar
    setNewValue(`${cats[0]}.background color`, [112, 128, 144]);
    setNewValue(`${cats[0]}.color`, [30, 144, 255]);
    setNewValue(`${cats[0]}.width`, 100);
    setNewValue(`${cats[0]}.height`, 15);
    setNewValue(`${cats[0]}.time left`, false);

    //time display
    setNewValue(`${cats[1]}.time left`, false);
    setNewValue(`${cats[1]}.both times`, true);

    //volume tray
    setNewValue(`${cats[2]}.bar background color`, [192, 192, 192]);
    setNewValue(`${cats[2]}.bar color`, [30, 144, 255]);
}