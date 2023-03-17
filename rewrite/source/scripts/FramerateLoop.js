class FramerateLoop
{
    #isRunning = false;
    #prevTime = Date.now();
    #frames = 0;
    elapsed = 0;
    currentFramerate = 0;
    customUpdate = undefined;

    constructor()
    {
        if (this.#isRunning) return;
        var self = this;
        this.#isRunning = true;

        function loop()
        {
            if (!self.#isRunning) return;

            self.#update();
            if (self.customUpdate != undefined)
                self.customUpdate();

            requestAnimationFrame(loop);
        }

        loop();
    }

    #update()
    {
        this.#frames++;

        var prevTime = this.#prevTime, time = Date.now();

        if (time > prevTime + 1000)
        {
            this.elapsed = ((time - prevTime) / 1000) / 100;
            this.currentFramerate = (this.#frames * 1000) / (time - prevTime);
            this.#prevTime = time;
            this.#frames = 0;
        }
    }
}