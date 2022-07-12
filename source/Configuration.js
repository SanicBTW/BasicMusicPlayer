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
    var timeProgBackColor = "background-color: rgb(" +  daHelper.getValue("TimeBar.backgroundColor").toString() + "); ";
    var timeProgWidth = "width: " + daHelper.getValue("TimeBar.Width") + "%;";

    var timeBarBackColor = "background-color: rgb(" +  daHelper.getValue("TimeBar.Color").toString() + ");";
    var timeBarHeight = "height: " + daHelper.getValue("TimeBar.Height") + "px;";

    var timeProgStyle = document.createElement("style");
    timeProgStyle.innerHTML = `#timeProgress { ${timeProgBackColor} ${timeProgWidth} }`;
    document.head.appendChild(timeProgStyle);

    var timeBarStyle = document.createElement("style");
    timeBarStyle.innerHTML = `#timeBar { ${timeBarBackColor} ${timeBarHeight} }`;
    document.head.appendChild(timeBarStyle);

    setProgress(0);
}

function formatString(toFormat)
{
    return toFormat.toLowerCase().split(" ").join("-");
}