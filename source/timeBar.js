//this handles the time bar
var daProg = document.getElementById("timeProgress");
var daBar = document.getElementById("timeBar");
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