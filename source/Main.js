//runs first, to set stuff or something lol
var elements = new ElementsHandler();
var styles = new StylesHandler();
styles.setBodyStyle("font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: black; color: white;");

if(platform == "Desktop")
{
    styles.setClassStyle("outer", `width: 100%; height: 97.9vh; display: flex; justify-content: center; align-items: center;`);
}
else
{
    styles.setClassStyle("outer", `width: 100%; height: 90vh; display: flex; justify-content: center; align-items: center; `);
}

elements.addDiv("first");
elements.addDiv("mainDiv");
elements.setClass("first", "outer");

styles.setStyle("mainDiv", "width: 100%;");

elements.appendTo("mainDiv", "first");