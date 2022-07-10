//well guess the config stuff is gonna be here now
var elements = new ElementsHandler();
var styles = new StylesHandler();
var basicDebugger = new Debugger(true);
basicDebugger.addToHeader("Developer Build");
basicDebugger.addToHeader("V2 Rewrite");
styles.setBodyStyle("font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: black; color: white;");

var Configuration = new Object();

var file = fetch('./defaultSettings.json');
file.then((resp) => 
{
    resp.text().then((text) => 
    {
        var daParsedText = JSON.parse(text);
        var availCats = daParsedText.categories;
        for(var i in availCats)
        {
            var category = availCats[i];
            var catSets = daParsedText.configuration[category];
            for(var j in catSets)
            {
                var setting = j;
                var settingValue = catSets[j];
                
                Configuration[setting] = settingValue;
            }
        }
        //works here
        setupStuff();

    });
});

//config stuff now stays here, sorry
function getValue(index)
{
    return Configuration[index];
}

function setNewValue(index, value)
{
    Configuration[index] = value;
}

function setupStuff()
{
    styles.setStyle("myProgress", "background-color: rgb(" +  getValue("backgroundColor").toString() + ")");
    styles.setStyle("myBar", "background-color: rgb(" +  getValue("Color").toString() + ")");

    styles.setStyle("myProgress", "width: " + getValue("Width") + "%");
    styles.setStyle("myBar", "height: " + getValue("Height") + "px");
    setProgress(0);
}
