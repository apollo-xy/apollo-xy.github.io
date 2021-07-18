
    var checkBox = document.getElementById("Mcheck");
    var sideNav = document.getElementById("nav");
    function menu() { 
    if (checkBox.checked == true){
      sideNav.style.width = "500px";
      document.body.style.overflow = "hidden";
      document.getElementById("null-1").style.width = "500px";
      document.getElementById("acc-button-con").style.display = "none";

    } else {
      sideNav.style.width = "0px";
      document.body.style.overflow = "auto";
      document.getElementById("null-1").style.width = "0px";      
      document.getElementById("acc-button-con").style.display = "block";
    }
    
  }


function fullScreen() {
    var checkBox = document.getElementById("fss");

    if (checkBox.checked == true){
        openFullscreen();
    } else {
        closeFullscreen();
    }
    
  }
function openFullscreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
    
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



  setTimeout(function(){
    var country ="";
    $.getJSON('https://ipapi.co/json/')
    .done (function(location) {
       $('#country').html(location.country_name);
       $('#state').html(location.region);
       $('#city').html(location.city);
       $('#postal').html(location.postal);
       $('#timezone').html(location.timezone);
       $('#latitude').html(location.latitude);
       $('#longitude').html(location.longitude);
       $('#ip').html(location.ip);
       $('#org').html(location.org);
      
       country = location.country_name;
       country = country.toLocaleLowerCase();
       country = country.replace(" ", "-");
       document.getElementById("flag").src = "https://img.icons8.com/emoji/30/000000/" + String(country) +"-emoji.png";
    });
    
    $.getJSON('https://apollo-xy.000webhostapp.com/ip/')
    .done (function(kk) {
       $('#browser').html(kk.browser);
       $('#os').html(kk.os);

    });

    navigator.getBattery().then(function(battery) {
      
       $('#charging').html(battery.charging ? "Yes" : "No");
       $('#battery').html(battery.level * 100 + "%");
 
    });

      $('#cnn_type').html(navigator.connection.type);
       $('#cnn_st').html(navigator.connection.downlink + ' Mb/s');
   

    var d = new Date();
    $('#date').html(d.getDate()+ "/" + (d.getMonth()+1) +"/"+ d.getFullYear());
    $('#time').html(d.getHours()+ ":" + d.getMinutes() +":"+ d.getSeconds());

    
    var lang = $("select.goog-te-combo option:selected").text();
    if(lang=="Select Language"){ $('#lang').html("English");}
    else{ $('#lang').html(lang);
 }

  }, 1000);

  