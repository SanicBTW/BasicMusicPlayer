//hardcode stuff
var cats = ["Time Bar", "Time Display", "Volume Tray"];
//localStorage.clear();
if(localStorage.length <= 0)
{
    //time bar
    setNewValue(`${cats[0]}.background color`, [112, 128, 144]);
    setNewValue(`${cats[0]}.color`, [30, 144, 255]);
    setNewValue(`${cats[0]}.width`, 100);
    setNewValue(`${cats[0]}.height`, 15);
    setNewValue(`${cats[0]}.time left`, false);

    //time display
    setNewValue(`${cats[1]}.time left`, false);
    setNewValue(`${cats[1]}.both times`, true);

    //volume tray
    setNewValue(`${cats[2]}.bar background color`, [192, 192, 192]);
    setNewValue(`${cats[2]}.bar color`, [30, 144, 255]);
}