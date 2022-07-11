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
                var setting = j;
                var settingValue = catSets[j];
                var indexer = `${category}.${setting}`;

                console.log(formatString(indexer));
                
                Configuration[formatString(indexer)] = settingValue;
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
        console.log("returning: " + Configuration[formatString(index)]);
        return Configuration[formatString(index)];
    }

    setNewValue(index, value)
    {
        Configuration[formatString(index)] = value;
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

function formatString(toFormat)
{
    return toFormat.toLowerCase().split(" ").join("-");
}