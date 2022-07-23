const routes = {
    404 : "pages/404.html",
    "/" : "/pages/index.html",
    "/home" : "/pages/index.html",
    "/about" : "/pages/about.html",
}

var buffer = new Array();

const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
    //check4update();
}

function getChachedRoute(route) {
    return buffer[route];     
}

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];

    let html = getChachedRoute(route);
    
    if (html == null)
    {
        html = await fetch(route).then((data) => data.text());
        buffer[route] = html;
    }

    document.getElementById("main-page").innerHTML = html;    
}

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
