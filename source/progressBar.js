elements.addDiv("myProgress");
elements.addDiv("myBar");
elements.appendTo("myBar", "myProgress");

//theres a visual bug where at the beginning of the song the bar doesnt display correctly
//border-radius: 0px 12px 12px 0px;
styles.setStyle("myProgress", "width: 100%; background-color:white; border: none; ");
styles.setStyle("myBar", "width: 0%; height: 20px; background-color: aqua; border: none; ");

var daProg = elements.getElement("myProgress");
var daBar = elements.getElement("myBar");

function setProgress(amount)
{
    daBar.style.width = amount + "%";
}