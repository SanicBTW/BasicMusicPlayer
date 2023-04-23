// updated to match https://github.com/SanicBTW/sanicbtw/blob/testing/src/scripts/FPSLoop.js
class FPSLoop
{
    onUpdate = 
    {
        listeners: [],
        add: function(cb) { return this.listeners.push(cb); },
        dispatch: function(data)
        {
            this.listeners.forEach((cb) => cb(data));
        },
        remove: function(id) { this.listeners.splice(this.listeners.indexOf(id), 1); }
    }

    #isRunning = false;

    #prevTime = Date.now();
    #frames = 0;
    #fps = 0;
    #elapsed = 0;

    persistentUpdate = true;

    constructor()
    {
        if (this.#isRunning) return;
        this.#isRunning = true;

        var self = this;

        function loop()
        {
            if (!self.#isRunning || !self.persistentUpdate) return;

            self.#update();

            self.onUpdate.dispatch({elapsed: self.#elapsed, fps: self.#fps});

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
            this.#elapsed = ((time - prevTime) / 1000) / 100;
            this.#fps = (this.#frames * 1000) / (time - prevTime);
            this.#prevTime = time;
            this.#frames = 0;
        }
    }

    static boundTo(value, min, max)
    {
        return Math.max(min, Math.min(max, value));
    }

    static lerp(a, b, ratio)
    {
        return a + ratio * (b - a);
    }
}