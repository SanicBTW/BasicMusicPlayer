var platform = "";

var controlsfield = document.getElementById("playerControlsField");
var controlsdiv = document.getElementById("playerControlsDiv");
var changelogfield = document.getElementById("changelogField");
var serverfield = document.getElementById("serverField");
var musicinfofield = document.getElementById("musicInfoField");

var playButton = document.getElementById("playButton");

var playIcon = document.createElement("i");
playIcon.className = "material-icons";
playIcon.innerText = "arrow_right"; //will change this one

var prevButton = document.getElementById("prevButton");

var prevIcon = document.createElement("i");
prevIcon.className = "material-icons";
prevIcon.innerText = "navigate_before";

var nextButton = document.getElementById("nextButton");

var nextIcon = document.createElement("i");
nextIcon.className = "material-icons";
nextIcon.innerText = "navigate_next";

var repeatButton = document.getElementById("funnyRepeatButton");

//from https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-72.php
const detectDeviceType = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? 'Mobile'
    : 'Desktop';
platform = detectDeviceType();

if(platform == "Mobile")
{
    controlsfield.style = "position:fixed; bottom: 0; margin-bottom: 1rem; margin-left: 1rem; margin-right: 1rem; width: 380px;";
    serverfield.style = "position: absolute; bottom: 0; margin-bottom: 0.6rem; margin-left: -0.1rem; width: 358px";
    musicinfofield.style = "position: absolute; bottom: 0; top: 0; width: 380px; margin-bottom: 6.3rem; margin-left: 1rem; margin-top: 1rem;";
    changelogfield.hidden = true;

    playButton.appendChild(playIcon);
    playButton.className = "waves-effect waves-teal btn-flat";
    playButton.style = "color:white;";

    prevButton.appendChild(prevIcon);
    prevButton.className = "waves-effect waves-teal btn-flat";
    prevButton.style = "color:white;";
    
    nextButton.appendChild(nextIcon);
    nextButton.className = "waves-effect waves-teal btn-flat";
    nextButton.style = "color:white;";

    repeatButton.className = "waves-effect waves-teal btn-flat";
    repeatButton.style = "color:white;";
}
else
{
    controlsfield.style = "position:absolute; bottom: 0; left: 0; right: 0; margin-bottom: 1rem; margin-left: 1rem; margin-right: 1rem;";
    controlsdiv.style = "margin-left: 37rem";
    changelogfield.style = "position: absolute; right: 0; bottom: 0; margin-bottom: 6.3rem; margin-left: 1rem; margin-right: 1rem; width: 448px;";
    serverfield.style = "position: absolute; bottom: 0; left: 0; right: 0; margin-bottom: 0.5rem; margin-left: 0.5rem; margin-right: 0.5rem;";
    musicinfofield.style = "position: absolute; left: 0; bottom: 0; top: 0; width: 50rem; margin-bottom: 6.3rem; margin-left: 1rem; margin-right: 1rem; margin-top: 1rem;";

    playButton.innerText = "Play";
    playButton.className = "waves-effect waves-light btn";

    prevButton.innerText = "Previous";
    prevButton.className = "waves-effect waves-light btn";
    
    nextButton.innerText = "Next";
    nextButton.className = "waves-effect waves-light btn";

    repeatButton.className = "waves-effect waves-light btn";
}

//alert(repeatMusic); wait what SINCE WHEN I CAN USE OTHER FILES VARS????