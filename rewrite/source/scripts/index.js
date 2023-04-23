// Funny vars
const fpsLoop = new FPSLoop();
const content = document.getElementById('mainContent');
const audio = document.getElementById('player');
const headText = document.getElementById('headText');

// yoo
const boundTo = FPSLoop.boundTo;
const lerp = FPSLoop.lerp;

// Volume tray vars
const volTray = document.getElementById('volumeTray');
const volBar = document.getElementById('volBar');

var visibleTime = 0;
var targetPos = -200;

// Time info vars
const timeBar = document.getElementById('timeBar');

// Supported audio types )?
const supportedTypes = [".mp3", ".ogg"];

// Volume stuff
const volumeValues = 
{
    1: "100%",
    0.9: "90%",
    0.8: "80%",
    0.7: "70%",
    0.6: "60%",
    0.5: "50%",
    0.4: "40%",
    0.3: "30%",
    0.2: "20%",
    0.1: "10%",
    0: "0%"
};

function getVolume()
{
    switch(audio.volume)
    {
        case 1:
            return 1;
        case 0.9:
            return 0.9;
        case 0.8:
            return 0.8;
        case 0.7000000000000001:
            return 0.7;
        case 0.6000000000000001:
            return 0.6;
        case 0.5000000000000001:
            return 0.5;
        case 0.40000000000000013:
            return 0.4;
        case 0.30000000000000016:
            return 0.3;
        case 0.20000000000000015:
            return 0.2;
        case 0.10000000000000014:
            return 0.1;
    }
    return 0;
}

// Handles drop
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

// Handles file
function handleFile(file)
{
    var fileExt = file.name.substring(file.name.lastIndexOf("."));
    var fileName = file.name.substring(0, file.name.indexOf(fileExt));
    if (!supportedTypes.includes(fileExt))
        return alert(`${fileExt} not supported`);

    new Response(file.stream()).blob().then((blob) =>
    {
        audio.src = URL.createObjectURL(blob);
        content.style.opacity = 1;
        headText.innerText = fileName;
        timeBar.style.backgroundColor = `rgb(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()})`;
    });
}

// Set audio listener
audio.addEventListener('durationchange', () => timeBar.style.width = "0%");

// Set the FPS Loop update
fpsLoop.onUpdate.add(({elapsed}) =>
{
    var lerpVal = boundTo(1 - (elapsed * 8.6), 0, 1);
    // Volume tray Y position
    var volTY = volTray.style.top.substring(0, volTray.style.top.indexOf("px"));
    // Number of the volume bar width
    var volTar = volBar.style.width.substring(0, volBar.style.width.indexOf("%"));
    // Number of the time bar width
    var timeTar = timeBar.style.width.substring(0, timeBar.style.width.indexOf("%"));

    // Funny tray position
    if (visibleTime > 0)
    {
        visibleTime -= elapsed;
    }
    else if (volTY > -200)
    {
        targetPos -= elapsed * window.visualViewport.height * (window.visualViewport.width / window.visualViewport.height);
    }

    // Lerps
    volTray.style.top = `${lerp(targetPos, volTY, lerpVal)}px`;
    volBar.style.width = `${lerp(audio.volume * 100, volTar, lerpVal)}%`;
    timeBar.style.width = `${lerp((audio.currentTime / audio.duration) * 100, timeTar, lerpVal)}%`;

    // Set info
    document.getElementById("volP").innerText = `${Math.round(volTar)}%`;
    document.getElementById('timeDisplay').innerText = `${getCurrentTime()}/${getDuration()}`;
});

// Helper functions
function getRandomColor()
{
    return Math.floor(Math.random() * 255);
}

function getDuration()
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

    return `${lengthMin}:${lengthSecs}`;
}

function getCurrentTime()
{
    var curMin = Math.floor(audio.currentTime / 60) >= 10 ? Math.floor(audio.currentTime / 60) : "0" + Math.floor(audio.currentTime / 60);
    var curSecs = Math.floor(audio.currentTime % 60) >= 10 ? Math.floor(audio.currentTime % 60) : "0" + Math.floor(audio.currentTime % 60);

    return `${curMin}:${curSecs}`;
}

// More listeners
document.addEventListener('keydown', (key) =>
{
    if (key.key == "+" || key.key == "-")
    {
        key.preventDefault();
        visibleTime = 1.5;
        targetPos = 0;

        switch(key.key)
        {
            case "+":
                if (getVolume() != 1.0)
                    audio.volume += 0.1;
                break;
            case "-":
                if (getVolume() != 0.0)
                    audio.volume -= 0.1;
                break;
        }
    }
});