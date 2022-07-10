elements.addDiv("myProgress");
elements.addDiv("myBar");
elements.appendTo("myBar", "myProgress");

styles.setStyle("myProgress", "width: 50%; background-color:white;");
styles.setStyle("myBar", "width: 0%; height: 20px; background-color: aqua;");

var daProg = elements.getElement("myProgress");
var daBar = elements.getElement("myBar");

function setProgress(amount)
{
    daBar.style.width = amount + "%";
}