const worker = new Worker("js/worker.js");

worker.onmessage = (event) => {
    const msg = event.data;
    if (event.data == "update")
    {
        const updateButton = document.getElementById("update");
        if (updateButton != null)
        {
            updateButton.style.visibility = "visible";
            log("worker: update available");
            worker.postMessage("stop");
        }                    
    } else {
        log("worker: " + event.data);    
    }
    
}

worker.postMessage("start");