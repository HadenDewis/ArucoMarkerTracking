function getFPS(funcToCallAfter) {
    let startTime = performance.now();
    let times = [];


    function refreshLoop() {
        let checkRefreshRate = requestAnimationFrame(refreshLoop);
        const now = performance.now();
        while (times.length > 0 && times[0] <= now - 1000) {
            times.shift();
        }
        times.push(now);
        fps = times.length;
        let currentTime = performance.now() - startTime
        if (currentTime > 2500) {
            window.cancelAnimationFrame(checkRefreshRate)
            console.log(fps)
            funcToCallAfter();
        }
    }
    refreshLoop();
}

function testFPSOnTheFly(fpsVariableToChange){
    let frame = 0;
    let startTime = performance.now();
    
    function fpsLoop(){
        fpsID = requestAnimationFrame(fpsLoop)
        frame++
        if(frame > 300){
            processFPSData(fpsID,frame,startTime - performance.now(),fpsVariableToChange)
        }
    }

    function processFPSData(ID,frames,totalTime,previousFPS){
        cancelAnimationFrame(ID);
        totalTime = totalTime/1000;
        let fps = frames/totalTime
        console.log(fps);

        fpsVariableToChange = fps;
    }

    fpsLoop(fpsVariableToChange);
    
}