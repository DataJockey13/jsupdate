const isUpdateAvailable = async () => {
    const version = await fetch(versionFile)
        .then((data) => data.text())
        .catch((error) => {
            console.log(error);
        });   

    return version != currentVersion;
}

const check4update = async (event) => {
    const updateAvailable = await isUpdateAvailable();
    const updateButton = document.getElementById("update");
    if (updateButton != null)
    {
        if (updateAvailable)
        {
            updateButton.style.visibility = "visible";
        }
        else
        {
            updateButton.style.visibility = "hidden";
        }        
    }
}

window.onfocus = check4update;