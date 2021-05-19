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
var checkBoxLoc = document.getElementById("loc");
function getLocation() {
   
    if (checkBoxLoc.checked == true){
    navigator.geolocation.getCurrentPosition(show_map, handle_error);  
    }     
  }
  function show_map(position) {
    $('#latitude').html(position.coords.latitude);
    $('#longitude').html(position.coords.longitude);
   // alert("Latitude: " + position.coords.latitude +"<br>Longitude: " + position.coords.longitude);
  }
  function handle_error(err) {
    if (err.code == 1) {

      checkBoxLoc.checked = false;
    }
  }

