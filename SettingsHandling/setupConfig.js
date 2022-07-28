//hardcode stuff
var cats = ["Time Bar"];
var saveVersion = "3.0 EARLY RELEASE";

if(getValue('save data version') != saveVersion)
{
    localStorage.clear();
    setupConfig();
    window.location.reload(true);
}

document.addEventListener('keydown', (key) => {
    if(key.altKey && key.key == "r")
    {
        localStorage.clear();
        setupConfig();
        window.location.reload(true);
    }
});

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
    setNewValue(`${cats[0]}.time left`, false);
}