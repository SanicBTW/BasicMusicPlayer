const client = new PocketBase("https://pb.sancopublic.tk/");

var fileNameInput = document.getElementById("fileNameInput");
var musicList = document.getElementById('uploadedMusicList');
var input = document.createElement("input");
var openedSelection = false;

async function fileNameAlert() {
    const alert = document.createElement('ion-alert');
    alert.header = 'Error';
    alert.subHeader = 'File Name required';
    alert.message = 'Provided file name wasnt valid';
    alert.buttons = [
        {
            text: 'OK',
            role: 'confirm'
        }];

    document.body.appendChild(alert);
    await alert.present();
}

async function fileAlert() {
    const alert = document.createElement('ion-alert');
    alert.header = 'Error';
    alert.subHeader = 'File required';
    alert.message = 'Provided file wasnt valid or detected';
    alert.buttons = [
        {
            text: 'OK',
            role: 'confirm'
        }];

    document.body.appendChild(alert);
    await alert.present();
}

function openFileSelection()
{
    input.type = 'file';
    input.accept = "audio/*";
    input.click();
}

input.addEventListener('click', () => {
    openedSelection = true;
});

function uploadFile()
{
    var check1 = false;
    var check2 = false;
    var formData = new FormData();

    if(openedSelection && input.files != null)
    {
        var file = input.files[0];
        check1 = true;
        if(fileNameInput.value.length < 1)
        {
            fileNameAlert();
        }
        else
        {
            check2 = true;
        }
        if(check1 && check2)
        {
            formData.append("music_file", file);
            formData.append("music_name", fileNameInput.value);
    
            client.Records.create("music", formData).then(() => {
                window.location.reload(true);
            });
        }
    }
    else
    {
        fileAlert();
    }
}

//get file url after finishing list creation
function onLoad()
{
    axios.get('https://pb.sancopublic.tk/api/collections/music/records').then((resp) => {
        var musicItems = resp.data.items;
        for(var i in musicItems)
        {
            addMusicItem(musicItems[i].music_name, musicItems[i].music_file, musicItems[i].id);
        }
    });
}

function addMusicItem(musicName, musicFile, id)
{
    var fixedPath = 'https://pb.sancopublic.tk/api/files/music/' + id + "/" + musicFile; 
    var div = document.createElement('div');
    div.style.marginTop = "1rem";
    var newMusicItem = document.createElement('p');
    var audio = document.createElement('audio');
    audio.src = fixedPath;
    audio.controls = true;
    newMusicItem.innerText = musicName;
    div.appendChild(newMusicItem);
    div.appendChild(audio);
    musicList.appendChild(div);
}
