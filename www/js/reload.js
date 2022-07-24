const reload = () => {
    serviceWorkerMessage("reload");
    navigator.serviceWorker.getRegistration()
        .then( (reg) => {
            if (reg) {
                reg.unregister().then(() => window.location.reload(true));
            } else {
                window.location.reload(true);
            }
        });
    log("reloaded");
}