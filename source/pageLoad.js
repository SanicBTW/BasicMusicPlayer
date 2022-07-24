//bruh bruh bruhuhuhuhuh
function onLoad()
{
    checkSpecialURL();

    var daProg = document.getElementById("timeProgress");
    var daBar = document.getElementById("timeBar");

    daProg.style.backgroundColor = 'rgb(' + getValue("timebar.backgroundcolor").toString() + ")";
    daProg.style.width = getValue("timebar.width", "int") + "%";

    daBar.style.backgroundColor = 'rgb(' + getValue("timebar.color").toString() + ")";
    daBar.style.height = getValue("timebar.height", "int") + "px";

    //time bar
    document.getElementById("timeBarBackColorInputR").value = getValue("timebar.backgroundcolor", 'rgb')[0];
    document.getElementById("timeBarBackColorInputG").value = getValue("timebar.backgroundcolor", 'rgb')[1];
    document.getElementById("timeBarBackColorInputB").value = getValue("timebar.backgroundcolor", 'rgb')[2];

    document.getElementById("timeBarColorInputR").value = getValue("timebar.color", 'rgb')[0];
    document.getElementById("timeBarColorInputG").value = getValue("timebar.color", 'rgb')[1];
    document.getElementById("timeBarColorInputB").value = getValue("timebar.color", 'rgb')[2];

    document.getElementById("timeBarWidthInput").value = getValue("timebar.width", 'int');
    document.getElementById("timeBarHeightInput").value = getValue("timebar.height", 'int');

    document.getElementById('timeBarDisplayTimeLeft').checked = getValue("timebar.display time left instead of cur time", 'bool');

    //time display
    document.getElementById("timedisplayDisplayTimeLeft").checked = getValue("timedisplay.display time left instead of cur time", 'bool');
    document.getElementById("timedisplayDisplayBothTimes").checked = getValue("timedisplay.display both times", 'bool');

    //window
    document.getElementById('windowUpdateWindowTitle').checked = getValue("window.update window title", 'bool');
    document.getElementById('windowDisplaySongName').checked = getValue("window.display song name", 'bool');
    document.getElementById('windowDisplayTimeLeft').checked = getValue("window.display time left", 'bool');

    setProgress(0);
}

var allInputs = document.querySelectorAll(".applyOnChange");

var checkBoxes = [
    {id: "timeBarDisplayTimeLeft", prop: 'timebar.display time left instead of cur time'},
    {id: "timedisplayDisplayTimeLeft", prop: 'timedisplay.display time left instead of cur time'},
    {id: "windowUpdateWindowTitle", prop: 'window.update window title'},
    {id: "windowDisplaySongName", prop: 'window.display song name'},
    {id: "windowDisplayTimeLeft", prop: 'window.display time left'},
    {id: "timedisplayDisplayBothTimes", prop: 'timedisplay.display both times'}
]

var textBoxes = [
    {id: "timeBarBackColorInputR"},
    {id: "timeBarBackColorInputG"},
    {id: "timeBarBackColorInputB"},
    {id: "timeBarColorInputR"},
    {id: "timeBarColorInputG"},
    {id: "timeBarColorInputB"},
    {id: "timeBarWidthInput"},
    {id: "timeBarHeightInput"},
]

allInputs.forEach(daInput => 
{
    daInput.addEventListener("change", function(event) 
    {
        if(daInput.type == "checkbox")
        {
            for(const checkBox of checkBoxes)
            {
                if(checkBox.id == daInput.id)
                {
                    var the = Reflect.get(document.getElementById(checkBox.id), 'checked');
                    setNewValue(checkBox.prop, the);
                }
            }
        }
        else if(daInput.type == "text")
        {
            for(const textBox of textBoxes)
            {
                if(textBox.id == daInput.id)
                {
                    if(textBox.id.startsWith("timeBarBackColorInput"))
                    {
                        var r = Reflect.get(document.getElementById("timeBarBackColorInputR"), 'value');
                        var g = Reflect.get(document.getElementById("timeBarBackColorInputG"), 'value');
                        var b = Reflect.get(document.getElementById("timeBarBackColorInputB"), 'value');
                        document.getElementById("timeProgress").style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
                        setNewValue('timebar.backgroundcolor', [r, g, b]);
                    }
                    if(textBox.id.startsWith("timeBarColorInput"))
                    {
                        var r = Reflect.get(document.getElementById("timeBarColorInputR"), 'value');
                        var g = Reflect.get(document.getElementById("timeBarColorInputG"), 'value');
                        var b = Reflect.get(document.getElementById("timeBarColorInputB"), 'value');
                        document.getElementById("timeBar").style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
                        setNewValue('timebar.color', [r, g, b]);
                    }
                    if(textBox.id == "timeBarWidthInput")
                    {
                        var danew = Reflect.get(document.getElementById(textBox.id), 'value');
                        document.getElementById("timeProgress").style.width = danew + "%";
                        setNewValue('timebar.width', danew);
                    }
                    if(textBox.id == "timeBarHeightInput")
                    {
                        var danew = Reflect.get(document.getElementById(textBox.id), 'value');
                        document.getElementById("timeBar").style.height = danew + "px";
                        setNewValue('timebar.height', danew);
                    }
                }
            }
        }
    });
});

var specialURLS = [
    {requiredHash: '#StartOnSettings', do: function(){ openSettingsPanel(); }},
]

function checkSpecialURL()
{
    for(const special of specialURLS)
    {
        if(special.requiredHash == window.location.hash)
        {
            special.do();
        }
    }
}