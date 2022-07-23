const log = (msg) => {
    msg = (new Date()).toLocaleTimeString() + ": " + msg;
    console.log(msg);

    const logelement = document.getElementById("main-log");
    if (logelement != null)
    {
        logelement.innerHTML = msg + "<br>\n" + logelement.innerHTML;
    }
}