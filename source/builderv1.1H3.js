var addedChilds = 0;
var platform = "";
var basicDebuggerVersion = "1.0";
var elementsHandlerVersion = "1.1.1";
var stylesHandlerVersion = "1.0";
//yes im adding a handler to each thing i start adding (events for example lmao)
var animationsHandlerVersion = "1.0";
var printedVersions = false;
var addedLogs = 0;
var addedDebugHeaders = 0; //?? sorry lol
var defaultElementID = ""; //asign it when changing the added childs var
var tickerElapsedInterval = null;
var elapsed = 0;
var updating = false;
var showingDebugger = false;

//only for the rainbow thingy, totally not based off kade engine fps rainbow thingy lol
var skipped = 0;
var curColor = 0;

var color1 = [148, 0, 211].toString();
var color2 = [75, 0, 130].toString();
var color3 = [0, 0, 255].toString();
var color4 = [0, 255, 0].toString();
var color5 = [255, 255, 0].toString();
var color6 = [255, 127, 0].toString();
var color7 = [255, 0, 0].toString();

var colors = [color1, color2, color3, color4, color5, color6, color7];
var rainbowyElement = "";

class Base
{
    checkPlatform()
    {
        const detectDeviceType = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            ? 'Mobile'
            : 'Desktop';
        platform = detectDeviceType();
        console.log("Platform: " + platform);
    }

    checkVersion()
    {
        var versionsFileGithub = fetch('https://raw.githubusercontent.com/SanicBTW/PageBuilder/master/versions.txt ');
        versionsFileGithub.then((resp) => {
            resp.text().then((text) => {
                var entries = text.trim().split("\n");
                for(var i in entries)
                {
                    if(printedVersions == false)
                    {
                        var gitBasicDebuggerVersion = entries[0];
                        var gitElementsHandlerVersion = entries[1];
                        var gitStylesHandlerVersion = entries[2];
                        var gitAnimationsHandlerVersion = entries[3];
        
                        console.log("GITHUB BASIC DEBUGGER VERSION: " + gitBasicDebuggerVersion);
                        console.log("CURRENT BASIC DEBUGGER VERSION: " + basicDebuggerVersion);
        
                        if(basicDebuggerVersion > gitBasicDebuggerVersion)
                        {
                            console.warn("[WARNING - Version checker - Basic Debugger]\nCurrent version is newer than the old version\nPush commit or check the Github version");
                        }
                        if(basicDebuggerVersion == gitBasicDebuggerVersion)
                        {
                            console.info("[INFO - Version checker - Basic Debugger]\nUp to date");
                        }
                        if(basicDebuggerVersion < gitBasicDebuggerVersion)
                        {
                            console.error("[ERROR - Version checker - Basic Debugger]\nGithub version is newer\nCheck the current version and check the Github version");
                        }
        
                        console.log("GITHUB ELEMENTS HANDLER VERSION: " + gitElementsHandlerVersion);
                        console.log("CURRENT ELEMENTS HANDLER VERSION: " + elementsHandlerVersion);
        
                        if(elementsHandlerVersion > gitElementsHandlerVersion)
                        {
                            console.warn("[WARNING - Version checker - Elements Handler]\nCurrent version is newer than the old version\nPush commit or check the Github version");
                        }
                        if(elementsHandlerVersion == gitElementsHandlerVersion)
                        {
                            console.info("[INFO - Version checker - Elements Handler]\nUp to date");
                        }
                        if(elementsHandlerVersion < gitElementsHandlerVersion)
                        {
                            console.error("[ERROR - Version checker - Elements Handler]\nGithub version is newer\nCheck the current version and check the Github version");
                        }
        
                        console.log("GITHUB STYLES HANDLER VERSION: " + gitStylesHandlerVersion);
                        console.log("CURRENT STYLES HANDLER VERSION: " + stylesHandlerVersion);
        
                        if(stylesHandlerVersion > gitStylesHandlerVersion)
                        {
                            console.warn("[WARNING - Version checker - Styles Handler]\nCurrent version is newer than the old version\nPush commit or check the Github version");
                        }
                        if(stylesHandlerVersion == gitStylesHandlerVersion)
                        {
                            console.info("[INFO - Version checker - Styles Handler]\nUp to date");
                        }
                        if(stylesHandlerVersion < gitStylesHandlerVersion)
                        {
                            console.error("[ERROR - Version checker - Styles Handler]\nGithub version is newer\nCheck the current version and check the Github version");
                        }

                        console.log("GITHUB ANIMATION HANDLER VERSION: " + gitAnimationsHandlerVersion);
                        console.log("CURRENT ANIMATION HANDLER VERSION: " + animationsHandlerVersion);
        
                        if(animationsHandlerVersion > gitAnimationsHandlerVersion)
                        {
                            console.warn("[WARNING - Version checker - Animations Handler]\nCurrent version is newer than the old version\nPush commit or check the Github version");
                        }
                        if(animationsHandlerVersion == gitAnimationsHandlerVersion)
                        {
                            console.info("[INFO - Version checker - Animations Handler]\nUp to date");
                        }
                        if(animationsHandlerVersion < gitAnimationsHandlerVersion)
                        {
                            console.error("[ERROR - Version checker - Animations Handler]\nGithub version is newer\nCheck the current version and check the Github version");
                        }
        
                        printedVersions = true;
                    }
                }
            })
        });    
    }

    /**
     * 
     * @param {string} id The Element ID you want to asign the click event
     * @param {function} exec The function you want to execute when element clicked
     */
    onClickHandler(id, exec)
    {
        var element = document.getElementById(id);
        element.addEventListener("click", (click) => {
            exec();
        })
    }

    /**
     * 
     * @param {function} exec The function you want to execute when key down
     */
    onKeydown(exec)
    {
        document.body.addEventListener("keydown", (key) => {
            exec(key);
        })
    }

    update()
    {
        updating = true;
        tickerElapsedInterval = setInterval(function(){
            console.log("Tick!");
            elapsed++;

            //rainbow
            if(updating && rainbowyElement != null && skipped >= 6)
            {
                if(curColor >= colors.length)
                {
                    curColor = 0;
                }
                rainbowyElement.style.color = 'rgb(' + colors[curColor] + ')';
                curColor ++;
                skipped = 0;
            }
            else
            {
                skipped++;
            }
        }, 2);
    }

    //just in case
    stopUpdate()
    {
        updating = false;
        clearInterval(tickerElapsedInterval);
        elapsed = 0;
        console.log("Stopped updating");
    }
}

class ElementsHandler extends Base
{
    constructor()
    {
        super();
        this.checkPlatform();
        this.checkVersion();
    }

    /**
     * 
     * @param {string} path The image path
     * @param {string} id The Element ID
     */
    addImage(path, id)
    {
        addedChilds++;

        var img = document.createElement("img");
        img.src = path;
        defaultElementID = `element${addedChilds}`;
        img.id =  `${id != null ? id : defaultElementID}`;
        document.body.append(img);
    }

    /**
     * 
     * @param {string} text The text to display
     * @param {string} type Type of heading (h1 - h2 - h3 - h4 - h5 - h6)
     * @param {string} id 
     */
    addHeader(text, type, id)
    {
        addedChilds++;

        var header = document.createElement(type);
        header.innerText = text;
        defaultElementID = `element${addedChilds}`;
        header.id = `${id != null ? id : defaultElementID}`;
        document.body.append(header);
    }

    /**
     * 
     * @param {string | string[]} text The text or array text to display
     * @param {string | string[]} id The Element ID or array of ids to assign to each paragraph
     */
    addParagraph(text, id)
    {
        if(Array.isArray(text) && Array.isArray(id))
        {
            basicDebugger.log("text and ids are arrays");
            if(id.length == text.length)
            {
                for(var i in text)
                {
                    addedChilds++;
                    var paragraph = document.createElement("p");
                    paragraph.innerText = text[i];
                    //we not setting a default element id as we have the same length of ids and texts
                    //defaultElementID = `element${addedChilds}`;
                    paragraph.id = id[i];
                    document.body.append(paragraph);
                }
            }
        }
        else if(Array.isArray(text) && !Array.isArray(id))
        {
            var localParagraphs = 0;
            var idFixed = "";
            for(var i in text)
            {
                addedChilds++;
                localParagraphs++;

                var paragraph = document.createElement("p");
                paragraph.innerText = text[i];
                defaultElementID = `element${addedChilds}`;
                idFixed = `${id}${localParagraphs}`;
                paragraph.id = `${id != null ? idFixed : defaultElementID}`;
                document.body.append(paragraph);
            }
        }
        else
        {
            addedChilds++;

            var paragraph = document.createElement("p");
            paragraph.innerText = text;
            defaultElementID = `element${addedChilds}`;
            paragraph.id = `${id != null ? id : defaultElementID}`;
            document.body.append(paragraph);
        }
    }

    /**
     * 
     * @param {string} path The audio path
     * @param {boolean} showControls Toggle controls
     * @param {string} id The Element ID
     */
    addAudio(path, showControls, id)
    {
        addedChilds++;

        var audio = document.createElement("audio");
        audio.src = path;
        audio.controls = showControls;
        defaultElementID = `element${addedChilds}`;
        audio.id = `${id != null ? id : defaultElementID}`;
        document.body.append(audio);
    }

    /**
     * 
     * @param {string} text Text to display
     * @param {function} onClick The click function you want to execute when button clicked
     * @param {string} id The Element ID
     */
    addButton(text, onClick, id)
    {
        addedChilds++;

        var button = document.createElement("button");
        button.addEventListener("click", (click) => {
            onClick();
        });
        button.type = "button";
        button.innerText = text;
        defaultElementID = `element${addedChilds}`;
        button.id = `${id != null ? id : defaultElementID}`;
        document.body.append(button);
    }

    /**
     * 
     * @param {string} link Where does the "A" redirects you to
     * @param {string} text Text to display
     * @param {string} id The Element ID
     */
    addAnchor(link, text, id)
    {
        addedChilds++;

        var anch = document.createElement("a");
        anch.href = link;
        anch.innerText = text;
        defaultElementID = `element${addedChilds}`;
        anch.id = `${id != null ? id : defaultElementID}`;
        document.body.append(anch);
    }

    /**
     * 
     * @param {string | string[]} toAppend What is going to be appended (as a child)
     * @param {string} where Where the element is going to be appended (as a child)
     */
    appendTo(toAppend, where)
    {
        if(Array.isArray(toAppend))
        {
            for(var i in toAppend)
            {
                var appendLoc = document.getElementById(where);
                var whatTo = document.getElementById(toAppend[i]);
                appendLoc.appendChild(whatTo);
            }
        }
        else
        {
            var appendLoc = document.getElementById(where);
            var whatTo = document.getElementById(toAppend);
            appendLoc.appendChild(whatTo);
        }
    }

    /**
     * 
     * @param {string} id The Element ID
     */
    addDiv(id)
    {
        addedChilds++;

        var newDiv = document.createElement("div");
        defaultElementID = `element${addedChilds}`;
        newDiv.id = `${id != null ? id : defaultElementID}`;
        document.body.append(newDiv);
    }

    /**
     * 
     * @param {string} id The Element ID you want to assign the class to
     * @param {string} className The element class
     */
    setClass(id, className)
    {
        var element = document.getElementById(id);
        element.className = className;
    }

    /**
     * 
     * @param {string} path The video path
     * @param {string} width The player width (in CSS)
     * @param {boolean} showControls Toggle controls
     * @param {boolean} autoPlay Auto play
     * @param {string} id The Element ID
     * @param {function} onFinished Executes function when finishing the video
     */
    addVideo(path, width, showControls, autoPlay, id, onFinished)
    {
        addedChilds++;

        var video = document.createElement("video");
        video.src = path;
        defaultElementID = `element${addedChilds}`;
        video.id = `${id != null ? id : defaultElementID}`;
        video.style.width = `${width != null ? width : "50%"}`;
        video.controls = showControls;
        video.autoplay = autoPlay;
        video.addEventListener("ended", (vid) => {
            onFinished();
        })
        document.body.append(video);
    }

    /**
     * 
     * @param {string} id The Element ID
     */
    addBreakline(id)
    {
        addedChilds++;

        var breakLine = document.createElement("br");
        defaultElementID = `element${addedChilds}`;
        breakLine.id = `${id != null ? id : defaultElementID}`;
        document.body.append(breakLine);
    }

    /**
     * 
     * @param {string | string[]} id The Element ID you want to set the attribue to
     * @param {string} property The property you want to asign
     * @param {string} value The value for the property
     */
    setAttribute(id, property, value)
    {
        if(Array.isArray(id))
        {
            for(var i in id)
            {
                var element = document.getElementById(id[i]);
                element.setAttribute(property, value);
            }
        }
        else
        {
            var element = document.getElementById(id);
            element.setAttribute(property, value);
        }
    }

    /**
     * 
     * @param {string} id The Element ID text you want to change
     * @param {string} newText The new text you want to assign to the element 
     */
    changeText(id, newText)
    {
        var element = document.getElementById(id);
        element.innerText = newText;
    }
}

class StylesHandler extends Base
{
    constructor()
    {
        super();
    }

    /**
     * 
     * @param {string} path The background path
     * @param {string} repeatStyle Sets the repeat style (repeat, no-repeat)
     * @param {string} sizeStyle Sets the size style (auto, contain, cover)
     */
    setBackground(path, repeatStyle, sizeStyle)
    {
        document.body.style = `background-image: url('${path}')`;

        //i forgot it was .cssText += but i have a function for it sooo
        this.setBodyStyle(`background-repeat: ${repeatStyle != null ? repeatStyle : 'repeat'};`);
        this.setBodyStyle(`background-size: ${sizeStyle != null ? sizeStyle : 'auto'};`);
    }

    /**
     * 
     * @param {string | string[]} id The Element ID to assign the style to
     * @param {string} style The style you want to assign to the element
     */
    setStyle(id, style)
    {
        if(Array.isArray(id))
        {
            for(var i in id)
            {
                var element = document.getElementById(id[i]);
                element.style.cssText += style;
            }
        }
        else
        {
            var element = document.getElementById(id);
            element.style.cssText += style;    
        }
    }

    /**
     * 
     * @param {string} style Add CSS styling to the body
     */
    setBodyStyle(style)
    {
        document.body.style.cssText += style;
    }

    /**
     * 
     * @param {string} className The element class name
     * @param {string} style What the class style should be
     */
    setClassStyle(className, style)
    {
        var newCSS = document.createElement("style");
        newCSS.innerHTML = `.${className} { ${style} }`;
        document.head.appendChild(newCSS);
    }

    /**
     * 
     * @param {string} path Favicon path
     */
    setFavicon(path)
    {
        var icon = document.createElement("link");
        icon.setAttribute('rel', "shortcut icon");
        icon.setAttribute("href", path);
        document.head.appendChild(icon);
    }


    /**
     * 
     * @param {string} style CSS styling to apply to the debug div
     */
    setDebugDivStyle(style)
    {
        if(showingDebugger)
        {
            var debugDiv = document.getElementById("debuggerDiv");
            debugDiv.style.cssText += style;
        }
    }

    /**
     * 
     * @param {string} style CSS styling to apply to the debug header div
     */
    setDebugHeaderStyle(style)
    {
        if(showingDebugger)
        {
            var debugHeader = document.getElementById("debuggerHeader");
            debugHeader.style.cssText += style;    
        }
    }

    /**
     * 
     * @param {string} style CSS styling to apply to the debug entries div
     */
    setDebugEntriesStyle(style)
    {
        if(showingDebugger)
        {
            var debugEntries = document.getElementById("debugger");
            debugEntries.style.cssText += style;    
        }
    }
}

class Debugger
{
    /**
     * 
     * @param {boolean} show If the debugger should show
     */
    constructor(show)
    {
        if(show == true)
        {
            showingDebugger = true;
            var debugDiv = document.createElement("div");
            debugDiv.id = "debuggerDiv";
            debugDiv.style = "position: fixed; bottom: 0; right: 0; background-color: black; color: white; opacity: 50%; margin: 1rem";
            document.body.appendChild(debugDiv);

            var debugHeader = document.createElement("div");
            debugHeader.id = "debuggerHeader";
            debugHeader.style = "margin: 1rem;";
            debugDiv.appendChild(debugHeader);

            var debugEntries = document.createElement("div");
            debugEntries.id = "debugger";
            debugEntries.style = "margin: 1rem;";
            debugDiv.appendChild(debugEntries);

            var initialized = document.createElement("p");
            initialized.innerText = "Initialized - Basic Debugger " + basicDebuggerVersion;
            debugHeader.appendChild(initialized);
        }
    }

    /**
     * 
     * @param {string} text What to log
     */
    log(text)
    {
        if(showingDebugger == true)
        {
            var entries = document.getElementById("debugger");
            var newLog = document.createElement("p");
            newLog.id = addedLogs;
            addedLogs++;
            newLog.innerText = text;
            analyzeAndSet(text, newLog);
            entries.appendChild(newLog);
        }
    }

    clear()
    {
        if(showingDebugger == true)
        {
            //code is subject to change
            var entries = document.getElementById("debugger");
            entries.childNodes.forEach(child => {
                entries.removeChild(child);
            });
            addedLogs = 0;
        }
    }

    /**
     * 
     * @param {string} text What to add to the header
     */
    addToHeader(text)
    {
        if(showingDebugger == true)
        {
            var header = document.getElementById("debuggerHeader");
            var newText = document.createElement("p");
            newText.id = `debugHeader${addedDebugHeaders}`;
            addedDebugHeaders++;
            newText.innerText = text;
            analyzeAndSet(text, newText);
            header.appendChild(newText);    
        }
    }
}

class AnimationHandler extends Base
{
    constructor()
    {
        super();
        this.update();
    }

    /**
     * 
     * @param {number[]} startcolor Array of RGB values
     * @param {number[]} endcolor Array of RGB values
     * @param {number} steps Amount of steps for each color to change
     * @param {number} timeElapsed The amount of time that it has to end the fade
     * @param {string} id The Element ID you want to asign this bg fade animation 
     */
    bgColorFade(startcolor, endcolor, steps, timeElapsed, id)
    {
        var element = document.getElementById(id);
        var red_change = (startcolor[0] - endcolor[0]) / steps;
        var green_change = (startcolor[1] - endcolor[1]) / steps;
        var blue_change = (startcolor[2] - endcolor[2]) / steps;

        var currentcolor = startcolor;
        var stepcount = 0;
        var timer = setInterval(function() {
            currentcolor[0] = parseInt(currentcolor[0] - red_change);
            currentcolor[1] = parseInt(currentcolor[1] - green_change);
            currentcolor[2] = parseInt(currentcolor[2] - blue_change);
            element.style.backgroundColor = 'rgb(' + currentcolor.toString() + ')';
            stepcount += 1;
            if (stepcount >= timeElapsed) {
                element.style.backgroundColor = 'rgb(' + endcolor.toString() + ')';
                clearInterval(timer);
            }
        }, 50);
    }

    rainbow(id)
    {
        var element = document.getElementById(id);
        rainbowyElement = element;
    }

    /**
     * 
     * @param {number[]} startcolor Array of RGB values
     * @param {number[]} endcolor Array of RGB values
     * @param {number} steps Amount of steps for each color to change
     * @param {number} timeElapsed The amount of time that it has to end the fade
     * @param {string} id The Element ID you want to asign this bg fade animation 
     */
    textColorFade(startcolor, endcolor, steps, timeElapsed, id)
    {
        var element = document.getElementById(id);
        var red_change = (startcolor[0] - endcolor[0]) / steps;
        var green_change = (startcolor[1] - endcolor[1]) / steps;
        var blue_change = (startcolor[2] - endcolor[2]) / steps;

        var currentcolor = startcolor;
        var stepcount = 0;
        var timer = setInterval(function() {
            currentcolor[0] = parseInt(currentcolor[0] - red_change);
            currentcolor[1] = parseInt(currentcolor[1] - green_change);
            currentcolor[2] = parseInt(currentcolor[2] - blue_change);
            element.style.color = 'rgb(' + currentcolor.toString() + ')';
            stepcount += 1;
            if (stepcount >= timeElapsed) {
                element.style.color = 'rgb(' + endcolor.toString() + ')';
                clearInterval(timer);
            }
        }, 50);
    }
}

function analyzeAndSet(text, element)
{
    var styling = "";
    if(text.toString().toLowerCase().includes("info"))
    {
        styling = "color: aqua; ";
    }
    if(text.toString().toLowerCase().includes("warning"))
    {
        styling = "color: yellow; ";
    }
    if(text.toString().toLowerCase().includes("error"))
    {
        styling = "color: red; ";
    }
    element.style.cssText += styling;
}