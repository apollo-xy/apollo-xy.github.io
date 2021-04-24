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
  } else if (fs.webkitRequestFullscreen) { /* Safari */
    fs.webkitRequestFullscreen();
  } else if (fs.msRequestFullscreen) { /* IE11 */
    fs.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}