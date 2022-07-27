//ver 2.1
var dismissTime = 0.0;
var increaseTimer;
var notifying = false;

var header = document.getElementById("notificationText");
var subHeader = document.getElementById("notificationSubText");
var notifPanel = document.getElementById("notificationsPanel");
var dismissProgress = document.getElementById("dismissProgress");

//its just the notification code on utils but improved?
class CustomNotification
{
    notify()
    {
        if(!notifying)
        {
            notifying = true;
            header.innerText = this.mainText;
            subHeader.innerText = this.subText;
            notifPanel.style.top = "0px";

            increaseTimer = setInterval(() => {
                if(getValue('notifications.slower progress', 'bool')){ dismissTime += 0.1; }
                else{ dismissTime += 1; }

                dismissProgress.style.width = dismissTime + "%";

                if(getValue('notifications.slower progress', 'bool') ? Math.floor(dismissTime) == 160 : dismissTime == 460)
                {
                    this.#closeNotification();
                    this.onFinish();
                }
            }, 2);
        }
        else
        {
            this.#closeNotification(true);
        }
    }

    #closeNotification(overriden = false)
    {
        if(overriden)
        {
            dismissTime = 0.0;
            dismissProgress.style.width = "0%";
            notifPanel.style.top = "-200px";
            dismissProgress.classList.add('notransition');
            dismissProgress.offsetHeight;
            dismissProgress.classList.remove('notransition');
            notifying = false;
            clearInterval(increaseTimer);
            setTimeout(() => {
                var newNotif = new CustomNotification();
                newNotif.mainText = this.mainText;
                newNotif.subText = this.subText;
                newNotif.onFinish = this.onFinish;
                newNotif.notify();
            }, 200);
        }
        dismissTime = 0.0;
        dismissProgress.style.width = "0%";
        notifPanel.style.top = "-200px";
        notifying = false;
        clearInterval(increaseTimer);
    }

    onFinish = function(){
        console.log('Finished Notifying');
    }

    mainText
    subText
}