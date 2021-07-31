var isLoad = "no";

window.addEventListener('load', (event) => {


    document.getElementById('error-msg').innerHTML = "Iframe Not Allowed!";
    document.getElementById('Mcheck').checked = false;
    isLoad = sessionStorage.getItem("isLoad");

    if(!navigator.onLine){
      //  window.location.replace("/offline.html");
      goesOffline();
    }else{

    if(window.parent.location.hostname == "127.0.0.1" || window.parent.location.hostname == "apo77.loca.lt"){
       // stopLoading();
        //showMain();
       if(window.innerWidth >300 && window.innerHeight >400){
        document.getElementById('error-msg').innerHTML = "Loading...";
        setTimeout(console.log.bind(console, '%cApollo%cXY ',  "padding-bottom:20px;color:#ffe600;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold",  "color:aqua;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"));
        setTimeout(console.log.bind(console, "%cConnecting People to Digital Network...", "padding-bottom:5px;color:red;font-family:system-ui;font-size:2em;"));
        setTimeout(console.log.bind(console, "%cWelcome to ApolloXY!", "padding-bottom:5px;color:black;font-family:system-ui;font-size:2em;font-weight:bold;"));
       if(isLoad == "yes"){
        stopLoading();
        showMain();
        } else{
            setTimeout(stopLoading,1500); 
            setTimeout(showMain,1500);
            sessionStorage.setItem("isLoad", "yes");
            }
   
       }else{
           document.getElementById('error-msg').innerHTML = "Device not supported!";
            }
 
        } 
    }
    
  
});

function stopLoading(){
    document.getElementById('loadingFullscreen').style.display = "none";
    
}
function showMain(){
    document.getElementById('main-con').style.display = "block";
}
function hideMain(){
    document.getElementById('main-con').style.display = "none";
}

window.addEventListener('online',  goesOnline);
window.addEventListener('offline', goesOffline);

function goesOffline(){
    hideMain();
    document.getElementById('loadingFullscreen').style.display = "flex";
    document.getElementById('error-msg').innerHTML = "Oops Offline!";
    
    
}
function goesOnline(){
    
    document.getElementById('error-msg').innerHTML = "Back Online!";
    setTimeout(stopLoading,1200); 
    setTimeout(function(){location.reload();},1200); 

    
}