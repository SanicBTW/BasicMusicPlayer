var file = fetch('./defaultSettings.json');
file.then((m) => 
{
    m.text().then((text) => 
    {
        var daParsedFile = JSON.parse(text);

        //i have to implement checks and stuff just in casa something breaks
        var timeBarBackColor = daParsedFile.TimeBar.backgroundColor.toString();
        var timeBarColor = daParsedFile.TimeBar.Color.toString();
        var timeBarWidth = daParsedFile.TimeBar.Width.toString() + "%";
        var timeBarHeight = daParsedFile.TimeBar.Height.toString() + "px";

        styles.setStyle("myProgress", "background-color: rgb(" + timeBarBackColor + ");");
        styles.setStyle("myBar", "background-color: rgb(" + timeBarColor + ");");

        styles.setStyle("myProgress", "width: " + timeBarWidth);
        styles.setStyle("myBar", "height: " + timeBarHeight);
        setProgress(0);
    });
});
