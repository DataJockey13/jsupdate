importScripts("globals.js");
let running = false;

const  isUpdateAvailable = async () => {
    const version = await fetch(versionFile, {cache: "no-cache"})
        .then((data) => data.text())
        .catch((error) => {
            postMessage(error);
        });   

    return version != currentVersion;
}

async function check() {
    if (running)
    {
        const updateAvailable = await isUpdateAvailable().then((result) => result);
        if (updateAvailable === true)
        {
            postMessage("update");
        }

        //postMessage("checked");
        setTimeout("check()", workertimeout);
    }
}

onmessage = (msg) => {
    if (!running && msg.data == "start")
    {
        running = true;
        check();
        postMessage("started");
    }

    if (running && msg.data == "stop")
    {
        running = false;
        postMessage("stopped");
    }
}