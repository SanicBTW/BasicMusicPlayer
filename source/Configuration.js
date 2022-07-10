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

//i only needed to order the imports but guess ill just leave it like this
class ConfigHelper 
{
    getValue(index)
    {
        console.log("returning: " + Configuration[index.toLowerCase()]);
        return Configuration[index.toLowerCase()];
    }

    setNewValue(index, value)
    {
        Configuration[index.toLowerCase()] = value;
    }
}

var daHelper = new ConfigHelper();

function setupStuff()
{
    styles.setStyle("timeProgress", "background-color: rgb(" +  daHelper.getValue("TimeBar.backgroundColor").toString() + ")");
    styles.setStyle("timeBar", "background-color: rgb(" +  daHelper.getValue("TimeBar.Color").toString() + ")");

    styles.setStyle("timeProgress", "width: " + daHelper.getValue("TimeBar.Width") + "%");
    styles.setStyle("timeBar", "height: " + daHelper.getValue("TimeBar.Height") + "px");
    setProgress(0);
}