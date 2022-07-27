const client = new PocketBase("https://0d0b-81-61-195-120.eu.ngrok.io/");

var fileNameInput = document.getElementById("fileNameInput");
var musicList = document.getElementById('uploadedMusicList');

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

    return await alert.onDidDismiss();
}

function openFileSelection()
{
    var formData = new FormData();
    var input = document.createElement("input");
    input.type = 'file';
    input.accept = "audio/mpeg";
    input.click();

    input.addEventListener('change', (e) => {
        var file = e.target.files[0];
        if(fileNameInput.value.length < 1)
        {
            fileNameAlert().then(async(e) => {
                if(e.role === "confirm"){ window.location.reload(true); }
            })
        }
        else
        {
            formData.append("music_file", file);
            formData.append("music_name", fileNameInput.value);

            client.Records.create("music", formData).then(() => {
                window.location.reload(true);
            });
        }
    });
}

//get file url after finishing list creation
function onLoad()
{
    axios.get('https://0d0b-81-61-195-120.eu.ngrok.io/api/collections/music/records').then((resp) => {
        var musicItems = resp.data.items;
        for(var i in musicItems)
        {
            addMusicItem(musicItems[i].music_name, musicItems[i].music_file, musicItems[i].id);
        }
    });
}

function addMusicItem(musicName, musicFile, id)
{
    var fixedPath = 'https://0d0b-81-61-195-120.eu.ngrok.io/api/files/music/' + id + "/" + musicFile; 
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