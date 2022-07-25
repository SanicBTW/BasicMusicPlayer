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

function parseVol(comingFromSettings = false)
{
    var vol = document.getElementById("audioPlayer").volume;
    if(comingFromSettings)
    {
        switch(vol)
        {
            case 1:
                return 1;
            case 0.9:
                return 0.9;
            case 0.8:
                return 0.8;
            case 0.7:
                return 0.7;
            case 0.6:
                return 0.6;
            case 0.5:
                return 0.5;
            case 0.4:
                return 0.4;
            case 0.3:
                return 0.3;
            case 0.2:
                return 0.2;
            case 0.1:
                return 0.1;
        }
    }
    else
    {
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
    }
    return 0.0;
}

function parseVolPercent(comingFromSettings)
{
    var vol = parseVol(comingFromSettings);
    var fixedReturn = "0%";
    switch(vol)
    {
        case 1:
            return fixedReturn = "100%";
        case 0.9:
            return fixedReturn = "90%";
        case 0.8:
            return fixedReturn = "80%";
        case 0.7:
            return fixedReturn = "70%";
        case 0.6:
            return fixedReturn = "60%";
        case 0.5:
            return fixedReturn = "50%";
        case 0.4:
            return fixedReturn = "40%";
        case 0.3:
            return fixedReturn = "30%";
        case 0.2:
            return fixedReturn = "20%";
        case 0.1:
            return fixedReturn = "10%";
        case 0.0:
            return fixedReturn = "0%";
    }
    return null;
}

//goofy code, might improve it in future updates lol
var dismissTime = 0.0;
var increaseTimer;
var notifying = false;

function notify(text, override = false)
{
    if(!notifying)
    {
        notifying = true;
        document.getElementById("notificationText").innerText = text;
        document.getElementById("notificationsPanel").style.top = "0px";

        increaseTimer = setInterval(() => {
            dismissTime += 0.1;
            document.getElementById("dismissProgress").style.width = dismissTime + "%";
            if(Math.floor(dismissTime) == 160)
            {
                closeNotification();
            }
        }, 2);
    }
    else if(notifying && override)
    {
        closeNotification(true, text);
    }
}

function closeNotification(isOverriden = false, text = null)
{
    if(!isOverriden)
    {
        dismissTime = 0.0;
        document.getElementById("dismissProgress").style.width = "0%";
        document.getElementById("notificationsPanel").style.top = "-200px";
        notifying = false;
        clearInterval(increaseTimer);
    }
    else
    {
        dismissTime = 0.0;
        document.getElementById("dismissProgress").style.width = "0%";
        document.getElementById("notificationsPanel").style.top = "-200px";
        document.getElementById("dismissProgress").classList.add('notransition');
        document.getElementById("dismissProgress").offsetHeight;
        document.getElementById("dismissProgress").classList.remove('notransition');
        notifying = false;
        clearInterval(increaseTimer);
        setTimeout(() => {
            notify(text);
        }, 200);
    }
}

//br
function parsePercent(percent)
{
    switch(percent)
    {
        case 1:
            return 100;
        case 0.9:
            return 90;
        case 0.8:
            return 80;
        case 0.7:
            return 70;
        case 0.6:
            return 60;
        case 0.5:
            return 50;
        case 0.4:
            return 40;
        case 0.3:
            return 30;
        case 0.2:
            return 20;
        case 0.1:
            return 10;
        case 0.0:
            return 0;
    }
    return 0;
}

//only supports spaces lol, formats query argument on search
function formatSpaces(toFormat)
{
    return toFormat.split("%20").join(" ");
}