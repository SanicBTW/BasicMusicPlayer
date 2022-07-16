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

                localStorage.setItem(formatString(indexer), settingValue);
            }
        }
    });
});