var isLoad = "no";
window.addEventListener('load', (event) => {


    document.getElementById('error-msg').innerHTML = "Iframe Not Allowed!";
    document.getElementById('Mcheck').checked = false;
    isLoad = sessionStorage.getItem("isLoad");
    console.log(isLoad);

  
    if(window.parent.location.hostname == "apollo-xy.github.io"){
       // stopLoading();
        //showMain();
       if(window.innerWidth >300 && window.innerHeight >400){
        document.getElementById('error-msg').innerHTML = "Loading...";

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