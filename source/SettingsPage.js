//set the panel
elements.addDiv("settingsSidePanel");
elements.addParagraph("X", "closeSettingsSidePanel");
elements.appendTo("closeSettingsSidePanel", "settingsSidePanel");

styles.setClassStyle("sidenav", "height: 100%; width: 0%; position: fixed; z-index: 1; top: 0; left: 0; background-color: #111; overflow-x: hidden; padding-top: 60px; transition: 0.5s;");
elements.setClass("settingsSidePanel", "sidenav");

styles.setClassStyle("sidenav .closebtn", "position: absolute; top: 0; right: 25px; font-size: 36px; margin-left: 50px; cursor: pointer;");
elements.setClass("closeSettingsSidePanel", "closebtn");

elements.addButton("settings", function() { openNav() }, "openSettingsSidePanel");
styles.setStyle("openSettingsSidePanel", "margin-top: 1rem;")
elements.appendTo("openSettingsSidePanel", "mainDiv");

var daSettingsPanel = elements.getElement("settingsSidePanel");

var daCloseButton = elements.getElement("closeSettingsSidePanel");
daCloseButton.addEventListener("click", () => closeNav());

function openNav()
{
    daSettingsPanel.style.width = "100%";
}

function closeNav()
{
    daSettingsPanel.style.width = "0%";
}

//design
elements.addHeader("Settings", "h1", "settingsHeader");
styles.setStyle("settingsHeader", "margin-left: 1rem;");


//append
elements.appendTo(["settingsHeader"], "settingsSidePanel");