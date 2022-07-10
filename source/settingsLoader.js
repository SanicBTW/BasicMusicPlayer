//thanks stack overflow
var input = document.createElement("input");
input.type = 'file';
input.accept = "application/json";
elements.addButton("load settings.json", function() { input.click() }, "inputButton");

input.addEventListener("change", (e) => {
    var file = e.target.files[0];

    var reader = new FileReader();
    reader.readAsText(file, 'UTF-8');

    reader.addEventListener("load", (readerEvent) => {
        var content = readerEvent.target.result;
        var daParsedFile = JSON.parse(content);

        var newTimeBarBackColor = daParsedFile.timeBarBackgroundColor.toString();
        var newTimeBarColor = daParsedFile.timeBarColor.toString();

        styles.setStyle("myProgress", "background-color: rgb(" + newTimeBarBackColor + ");");
        styles.setStyle("myBar", "background-color: rgb(" + newTimeBarColor + ");");
        basicDebugger.log("Changed settings!");
    });
});