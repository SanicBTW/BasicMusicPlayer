//might need to check formatting properly just in case, 
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
                //just in case some formatting error or i fuck up
                var setting = j.toLowerCase();
                var settingValue = catSets[j]; //idk if to lower case works here
                var indexer = `${category}.${setting}`.toLowerCase(); 
                
                Configuration[indexer] = settingValue;
            }
        }
        //works here
        setupStuff();

    });
});

function getValue(index)
{
    return Configuration[index.toLowerCase()];
}

function setNewValue(index, value)
{
    Configuration[index.toLowerCase()] = value;
}

function setupStuff()
{
    styles.setStyle("timeProgress", "background-color: rgb(" +  getValue("TimeBar.backgroundColor").toString() + ")");
    styles.setStyle("timeBar", "background-color: rgb(" +  getValue("TimeBar.Color").toString() + ")");

    styles.setStyle("timeProgress", "width: " + getValue("TimeBar.Width") + "%");
    styles.setStyle("timeBar", "height: " + getValue("TimeBar.Height") + "px");
    setProgress(0);
}