// sorry its like 2 am rn and got too lazy to think on new code instead of just copying the old code lol

function parseVol()
{
    var vol = document.getElementById("player").volume;
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

function parseVolPercent()
{
    var vol = parseVol();
    switch(vol)
    {
        case 1:
            return "100%";
        case 0.9:
            return "90%";
        case 0.8:
            return "80%";
        case 0.7:
            return "70%";
        case 0.6:
            return "60%";
        case 0.5:
            return "50%";
        case 0.4:
            return "40%";
        case 0.3:
            return "30%";
        case 0.2:
            return "20%";
        case 0.1:
            return "10%";
        case 0.0:
            return "0%";
    }
    return "0%";
}

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

var openedVol = false;
var holdTime = 0.0;
var curkey;

document.addEventListener('keydown', (key) =>
{
    curkey = key.key;

    if(curkey == "-" && holdTime == 0.0)
    {
        holdTime += 0.1;

        document.getElementById("volumeTray").style.top = '0px';
        openedVol = true;
        volCheck(curkey);
    }

    if(curkey == "+" && holdTime == 0.0)
    {
        holdTime += 0.1;

        document.getElementById("volumeTray").style.top = '0px';
        openedVol = true;
        volCheck(curkey);
    }
});

document.addEventListener('keyup', () =>
{
    curkey = null;
    holdTime = 0.0;
});

document.getElementById("volBar").addEventListener("transitionend", () => 
{
    closeVolPanel();
});

function closeVolPanel(fromVolLimit = false)
{
    if(fromVolLimit)
    {
        if(openedVol == true)
        {
            var the = setTimeout(() => {
                document.getElementById("volumeTray").style.top = '-200px'; //-200
                clearTimeout(the);
                openedVol = false;
            }, 1000);
        }
    }
    else
    {
        if(openedVol == true)
        {
            var the = setTimeout(() => {
                document.getElementById("volumeTray").style.top = '-200px'; //-200
                clearTimeout(the);
                openedVol = false;
            }, 500);
        }
    }
}

function volCheck(keyPressed)
{
    switch(keyPressed)
    {
        case "+":
            if(parseVol() != 1.0)
            {
                document.getElementById("player").volume += 0.1;
                document.getElementById("volBar").style.width = parseVolPercent();
                document.getElementById("volP").innerText = parseVolPercent();
            }
            else
            {
                closeVolPanel(true);
            }
            break;
        case "-":
            if(parseVol() != 0)
            {
                document.getElementById("player").volume -= 0.1
                document.getElementById("volBar").style.width = parseVolPercent();
                document.getElementById("volP").innerText = parseVolPercent();
            }
            else
            {
                closeVolPanel(true);
            }
            break;
    }
}