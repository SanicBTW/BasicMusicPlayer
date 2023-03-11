const content = document.getElementById('mainContent');
const audio = document.getElementById('player');
const headText = document.getElementById('headText');

const supportedTypes = [".mp3", ".ogg"];

function dropHandler(e)
{
    e.preventDefault();

    content.style.opacity = 0.85;

    if (e.dataTransfer.items)
    {
        [...e.dataTransfer.items].forEach((item, i) =>
        {
            if (item.kind === "file")
            {
                handleFile(item.getAsFile());
            }
        });
    }
    else
    {
        [...e.dataTransfer.files].forEach((file) =>
        {
            handleFile(file);
        });
    }
}

function handleFile(file)
{
    var fileExt = file.name.substring(file.name.indexOf("."));
    var fileName = file.name.substring(0, file.name.indexOf(fileExt));
    if (!supportedTypes.includes(fileExt))
        return alert(`${fileExt} not supported`);

    new Response(file.stream()).blob().then((blob) =>
    {
        audio.src = URL.createObjectURL(blob);
        content.style.opacity = 1;
        headText.innerText = fileName;
        document.getElementById('timeBar').style.backgroundColor = `rgb(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()})`;
    });
}

function getRandomColor()
{
    return Math.floor(Math.random() * 255);
}

function setProgress(amount)
{
    document.getElementById("timeBar").style.width = amount + "%";
}

audio.addEventListener('durationchange', () => setProgress(0));
audio.addEventListener('timeupdate', () => updateTime());

function updateTime()
{
    var lengthMin = Math.floor(audio.duration / 60);
    if(lengthMin >= 10)
    {
        lengthMin = Math.floor(audio.duration / 60);
    }
    else 
    {
        lengthMin = "0" + Math.floor(audio.duration / 60);
        if(lengthMin == "0NaN")
        {
            lengthMin = "00";
        }
        else
        {
            lengthMin = "0" + Math.floor(audio.duration / 60);
        }
    }

    var lengthSecs = Math.floor(audio.duration % 60); 
    if(lengthSecs >= 10)
    {
        lengthSecs = Math.floor(audio.duration % 60);
    }
    else
    {
        lengthSecs = "0" + Math.floor(audio.duration % 60);
        if(lengthSecs == "0NaN")
        {
            lengthSecs = "00";
        }
        else
        {
            lengthSecs = "0" + Math.floor(audio.duration % 60);
        }
    }

    var songPercent = (audio.currentTime / audio.duration);
    var curMin = Math.floor(audio.currentTime / 60) >= 10 ? Math.floor(audio.currentTime / 60) : "0" + Math.floor(audio.currentTime / 60);
    var curSecs = Math.floor(audio.currentTime % 60) >= 10 ? Math.floor(audio.currentTime % 60) : "0" + Math.floor(audio.currentTime % 60);

    var songCalc = (audio.duration - audio.currentTime);
    var minLeft = Math.floor(songCalc / 60);
    if(minLeft >= 10)
    {
        minLeft = Math.floor(songCalc / 60);
    }
    else
    {
        minLeft = "0" + Math.floor(songCalc / 60);
        if(minLeft == "0NaN")
        {
            minLeft = "00";
        }
        else
        {
            minLeft = "0" + Math.floor(songCalc / 60);
        }
    }

    var secsLeft = Math.floor(songCalc % 60);
    if(secsLeft >= 10)
    {
        secsLeft = Math.floor(songCalc % 60);
    }
    else
    {
        secsLeft = "0" + Math.floor(songCalc % 60);
        if(secsLeft == "0NaN")
        {
            secsLeft = "00";
        }
        else
        {
            secsLeft = "0" + Math.floor(songCalc % 60);
        }
    }

    document.getElementById('timeDisplay').innerText = `${curMin}:${curSecs}/${minLeft}:${secsLeft}`;

    setProgress(songPercent * 100);
}
