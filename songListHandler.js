function setupNewListItem(newId) //newid its literally the i from the for function of the setup files
{
    var newSongListItem = document.createElement("a");
    newSongListItem.className = "collection-item";
    newSongListItem.textContent = musicNameArray[newId];
    newSongListItem.id = newId;
    newSongListItem.addEventListener("click", () => {
        listItemClickEvent(newSongListItem.id);
    })
    songList.appendChild(newSongListItem);
}

function setActiveButton()
{
    var currentActive = document.getElementById(curIdx);
    currentActive.className = "collection-item active";
    if(firstTime == false){
        var previtem = document.getElementById(oldIdx);
        previtem.className = "collection-item";
    }
}

function listItemClickEvent(itemId)
{
    //alert("ONLY MEANT FOR DEBUGGING, clicked, button id " + itemId + " trying to play cur song");
    selectedFromList = true;
    oldIdx = curIdx;
    curIdx = itemId;
    setActiveButton();
    setPlayerState("play");
}
