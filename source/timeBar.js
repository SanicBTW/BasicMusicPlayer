elements.addDiv("timeProgress");
elements.addDiv("timeBar");
elements.appendTo("timeBar", "timeProgress");

//theres a visual bug where at the beginning of the song the bar doesnt display correctly
//border-radius: 0px 12px 12px 0px;
var daProg = elements.getElement("timeProgress");
var daBar = elements.getElement("timeBar");

function setProgress(amount)
{
    daBar.style.width = amount + "%";
}