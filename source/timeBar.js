elements.addDiv("timeProgress");
elements.addDiv("timeBar");
elements.appendTo("timeBar", "timeProgress");
elements.appendTo("timeProgress", "mainDiv")

var daProg = elements.getElement("timeProgress");
var daBar = elements.getElement("timeBar");
var mouseDown = false;

function setProgress(amount)
{
    daBar.style.width = amount + "%";
}

daProg.addEventListener("mousemove", (mouse) => 
{
    if(mouseDown)
    {
        //have to translate mouse movements to percent
    }
});

daProg.addEventListener("mousedown", () => { mouseDown = true; });

daProg.addEventListener("mouseup", () => { mouseDown = false; });