//thanks stack overflow
var input = document.createElement("input");
input.type = 'file';
elements.addButton("load settings.json", function() { input.click() }, "inputButton");

input.addEventListener("change", (e) => {
    var file = e.target.files[0];

    basicDebugger.log(file.name);
    basicDebugger.log(file.size);
    basicDebugger.log(file.type);

    var reader = new FileReader();
    reader.readAsText(file, 'UTF-8');

    reader.addEventListener("load", (readerEvent) => {
        var content = readerEvent.target.result;
        basicDebugger.log(content);
    });
});