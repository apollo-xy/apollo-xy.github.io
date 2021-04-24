function fullScreen() {
    var checkBox = document.getElementById("fss");

    if (checkBox.checked == true){
        openFullscreen();
    } else {
        closeFullscreen();
    }
    
  }

var fs = document.documentElement;
function openFullscreen() {
  if (fs.requestFullscreen) {
    fs.requestFullscreen();
    
  } 
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
    
  }  
}
