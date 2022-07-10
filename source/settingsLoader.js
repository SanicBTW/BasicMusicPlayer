//thanks stack overflow
//gotta rework this one too
/*
var input = document.createElement("input");
input.type = 'file';
input.accept = "application/json";
elements.addButton("load settings", function() { 
    input.click()
}, "inputButton");

var daButton = elements.getElement("inputButton");

input.addEventListener("change", (e) => {
    var file = e.target.files[0];

    var reader = new FileReader();
    reader.readAsText(file, 'UTF-8');

    reader.addEventListener("load", (readerEvent) => 
    {
        var content = readerEvent.target.result;
        var daParsedFile = JSON.parse(content);

        //i have to implement checks and stuff just in case something breaks, maybe for the next commit lol
        var timeBarBackColor = daParsedFile.TimeBar.backgroundColor.toString();
        var timeBarColor = daParsedFile.TimeBar.Color.toString();
        var timeBarWidth = daParsedFile.TimeBar.Width.toString() + "%";
        var timeBarHeight = daParsedFile.TimeBar.Height.toString() + "px";

        var updateWindowTitle = daParsedFile.Window.updateWindowTitle;

        styles.setStyle("myProgress", "background-color: rgb(" + timeBarBackColor + ");");
        styles.setStyle("myBar", "background-color: rgb(" + timeBarColor + ");");

        styles.setStyle("myProgress", "width: " + timeBarWidth);
        styles.setStyle("myBar", "height: " + timeBarHeight);
        
        basicDebugger.log("Loaded settings!");
        daButton.hidden = true;

    });
});*/