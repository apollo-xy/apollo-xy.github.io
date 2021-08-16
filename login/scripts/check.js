window.addEventListener('DOMContentLoaded', (event) => {
    
    if ( window.location !== window.parent.location ){
        window.location.replace("https://apolloxy.github.io/notFound");
    }
    setTimeout(console.log.bind(console, '%cApollo%cXY ',  "padding-bottom:20px;color:#ffe600;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold",  "color:aqua;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"));
    setTimeout(console.log.bind(console, "%cConnecting People to Digital Network...", "padding-bottom:5px;color:red;font-family:system-ui;font-size:2em;"));
    setTimeout(console.log.bind(console, "%cWelcome to ApolloXY!", "padding-bottom:5px;color:black;font-family:system-ui;font-size:2em;font-weight:bold;"));
    setInterval(() => {
        debugger;
    }, 10);
});


