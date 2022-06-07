async function readFile(file, TurnIntoArray)
{
    var allText = null;
    var rawFile = await fetch(file);
    if(TurnIntoArray == true)
    {
        allText = (await rawFile.text()).trim().split('\n')
    } else {
        allText = (await rawFile.text())
    }
    return allText;
}

//this isnt exactly a filesys operation but it counts maybe
function check(path)
{
    if(path.startsWith("https://"))
    {
        if(!path.endsWith("/"))
        {
            customURL = path + "/";
            return true;
        }
        else
        {
            customURL = path;
            return true;
        }
    }
    else
    {
        return false;
    }
}