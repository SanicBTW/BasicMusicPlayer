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

var colors = ["red", "green", "blue"];

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

function openTheFunny(videoURL, hash)
{
    document.getElementById("settingsSidePanelContent").style.opacity = 0;
    document.getElementById("funny").src = videoURL;
    window.location.hash = '#' + hash;
    document.getElementById('thefunny').style.width = '100%'; 
    document.getElementById("audioPlayer").pause();
    var the = setTimeout(() => {
        closeSettingsPanel();
        clearTimeout(the);
    }, 550);
    window.document.title = 'fuck you';
}

function openCreditsPanel()
{
    document.getElementById("creditsSidePanel").style.width = "100%";
    document.getElementById("creditsSidePanelContent").style.opacity = "1";
    window.document.title = "Basic Music Player - Credits";
}

function closeCreditsPanel()
{
    document.getElementById("creditsSidePanelContent").style.opacity = "0";
    document.getElementById("creditsSidePanel").style.width = "0%";
    window.document.title = "Basic Music Player";
}