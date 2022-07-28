var daProg = document.getElementById("timeProgress");
var daBar = document.getElementById("timeBar");

function setProgress(amount)
{
    daBar.style.width = amount + "%";
}

/**
 * 
 * @param {string} index Index to get value from
 * @param {string} type The type of value that should be returned (bool - int - float - rgb - string = DEFAULT)
 * @returns The desired type
 */
function getValue(index, type = 'string')
{
    var theItem = localStorage.getItem(formatString(index));
    switch(type)
    {
        case 'bool':
            return parseBool(theItem);
        case 'int':
            return parseInt(theItem);
        case 'float':
            return parseFloat(theItem);
        case 'rgb':
            return theItem.toString().split(",");
        default:
            return theItem;
    }
}

/**
 * 
 * @param {string} index Index to save the value to
 * @param {any} value The value to save on that index
 */
function setNewValue(index, value)
{
    localStorage.setItem(formatString(index), value);
}

function removeValue(index)
{
    localStorage.removeItem(formatString(index));
}

function formatString(toFormat)
{
    return toFormat.toLowerCase().split(" ").join("-");
}

//lol
function parseBool(parse)
{
    switch(parse)
    {
        case "true":
            return true;
        case "false":
            return false;
    }
    return undefined;
}

function parseVol()
{
    var vol = document.getElementById("audioPlayer").volume;
    switch(vol)
    {
        case 1:
            return 1;
        case 0.9:
            return 0.9;
        case 0.8:
            return 0.8;
        case 0.7000000000000001:
            return 0.7;
        case 0.6000000000000001:
            return 0.6;
        case 0.5000000000000001:
            return 0.5;
        case 0.40000000000000013:
            return 0.4;
        case 0.30000000000000016:
            return 0.3;
        case 0.20000000000000015:
            return 0.2;
        case 0.10000000000000014:
            return 0.1;
    }
    return 0.0;
}

var sideMainMenu = document.getElementById('sideMainMenu');
var sideMainMenuContent = document.getElementById('sideMainMenuContent');
var mainContent = document.getElementById('mainContent');

function openMainMenu()
{
    mainContent.style.opacity = "0.25";
    if(detectDeviceType() == "Desktop")
    {
        sideMainMenu.style.width = "25%";
    }
    else
    {
        sideMainMenu.style.width = "50%";
    }
    sideMainMenuContent.style.opacity = "1";
}

function closeMainMenu()
{
    sideMainMenuContent.style.opacity = "0";
    sideMainMenu.style.width = "0%";
    mainContent.style.opacity = "1";
}