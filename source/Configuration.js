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
                var indexer = `${category}.${setting}`;
                
                Configuration[indexer] = settingValue;
                done = true;
            }
        }
        //works here
        setupStuff();

    });
});

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
    styles.setStyle("timeProgress", "background-color: rgb(" +  getValue("TimeBar.backgroundColor").toString() + ")");
    styles.setStyle("timeBar", "background-color: rgb(" +  getValue("TimeBar.Color").toString() + ")");

    styles.setStyle("timeProgress", "width: " + getValue("TimeBar.Width") + "%");
    styles.setStyle("timeBar", "height: " + getValue("TimeBar.Height") + "px");
    setProgress(0);
}