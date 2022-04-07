var ip=0, timezone=0, lat=0, lon=0, country=0, city=0, state=0, postal=0, org=0, chargingStatus=0, batteryLvl=0, device=0, os=0, br=0, swidth=0, sheight=0, touch=0, date=0, time=0, networkType=0, networkBandwidth=0, vUser=0, vStatus = 0, vLastseen = 0, vTimeSpent = 0, vLastpage =0;
var unix = 0;
const firebaseConfig = {
    apiKey: "AIzaSyBywAtQQdOVOc6pma-EZJziYEvMGPDLzV0",
    authDomain: "apollo-xy.firebaseapp.com",
    databaseURL: "https://apollo-xy-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "apollo-xy",
    storageBucket: "apollo-xy.appspot.com",
    messagingSenderId: "266188073728",
    appId: "1:266188073728:web:1bcaccb7f61970d36b61e5"
  };

firebase.initializeApp(firebaseConfig);

function generateP(j) {
    var pass = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
            'abcdefghijklmnopqrstuvwxyz0123456789';
    
    for (i = 1; i <= j; i++) {
        var char = Math.floor(Math.random()
                    * str.length + 1);
        
        pass += str.charAt(char)
    }
    
    return pass;
}
$(document).ready(function() {


  if(window.location.hostname !== "apollo-xy.github.io"){
    window.location.replace("/notFound?error=Invalid Origin");
  
    }  

	if ( window.location !== window.parent.location )	{

	  if(window.location.href.indexOf("/embed") ===-1){
      window.location.replace("/notFound?error=Iframe Noy Allowed");
         
       
      
      }
    
    
    }
  
	else {
		
		// The page is not in an iFrame
		//document.write("The page is not in an iFrame");
	}


setTimeout(() => {
  firebase.database().ref("VisiterIP/"+replaceAl(String(ip), ".", "-")+"/"+vUser).once('value').then((snapshot) => {
    if (snapshot.exists()) {
      vLastseen = snapshot.val().vLastseen;

    } 

  });
}, 2000);

window.addEventListener("beforeunload", function(e){

  firebase.database().ref("VisiterIP/"+  ip.replaceAll(".", "-") +"/"+ vUser).update({

    "vStatus": "offline",
    "vLastseen": time,

    });
}, false);




  if(!localStorage.getItem("vUser")){
    vUser = generateP(8);
    localStorage.setItem("vUser", vUser);
}else{
  vUser = localStorage.getItem("vUser");

}





    setTimeout(console.log.bind(console, '%cApollo%cXY ',  "padding-bottom:20px;color:#ffe600;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold",  "color:aqua;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"));
    setTimeout(console.log.bind(console, "%cConnecting People & Technology", "padding-bottom:5px;color:red;font-family:system-ui;font-size:2em;"));
    setTimeout(console.log.bind(console, "%cWelcome to ApolloXY!", "padding-bottom:5px;color:black;font-family:system-ui;font-size:2em;font-weight:bold;"));

      vStatus = "online";
      if(!localStorage.getItem("vTimeSpent")){
        vTimeSpent = 0;
        localStorage.setItem("vTimeSpent", "0");
    }else{

        vTimeSpent = parseInt(localStorage.getItem("vTimeSpent"));
    }
  

      $.getJSON('https://ipapi.co/json/')
      .done (function(kk) {
        ip = kk.ip;
        timezone = kk.timezone;
        lat = kk.latitude;
        lon = kk.longitude;
        country = kk.country_name;
        city = kk.city;
        state = kk.region;
        postal = kk.postal;
        org = kk.org;

        $('#state').html(state);
        $('#city').html(city);
        $('#postal').html(postal);
        $('#timezone').html(timezone);
        $('#latitude').html(lat);
        $('#longitude').html(lon);
        $('#country').html(country);
        $('#ip').html(ip);
        $('#org').html(org);
             
      });

      swidth = screen.width;
      sheight = screen.height;

      var ht = is_touch()
      if(ht == 1){
        $('#hTouch').html("Yes");
        touch = "Yes";
      }else{
        $('#hTouch').html("No");
        touch = "No";
      }

      function is_touch() {
        return ( 'ontouchstart' in window ) ||
            ( navigator.maxTouchPoints > 0 ) ||
            ( navigator.msMaxTouchPoints > 0 );
      }
      $.getJSON('https://showcase.api.linx.twenty57.net/UnixTime/tounixtimestamp?datetime=now')
      .done (function(t) {
        unix =  parseInt(t.UnixTimeStamp);
                 
      });

      $.getJSON('https://api.ipgeolocation.io/user-agent?apiKey=38fc2b67688e4eff853fc42f488b4181')
      .done (function(pp) {
          device = pp.device.name;
          os = pp.operatingSystem.name + " " +pp.operatingSystem.version;
          br = pp.name + "/" +pp.version;
       $('#device').html(device);
       $('#os').html(os);
       $('#browser').html(br);
      });

  
  
});
setTimeout(() => {
    setTimeout(console.log.bind(console, " "));
    setTimeout(console.log.bind(console, "%cTracking IP Address....", "padding-bottom:5px;color:black;font-family:system-ui;font-size:1.5em;font-weight:bold;"));
    setTimeout(console.log.bind(console, "%cIPv4: "+ ip , "padding-bottom:5px;color:black;font-family:system-ui;font-size:1.5em;font-weight:normal;"));
    setTimeout(console.log.bind(console, "%cORG: "+ org , "padding-bottom:5px;color:black;font-family:system-ui;font-size:1.5em;font-weight:normal;"));

    setTimeout(console.log.bind(console, " "));
    setTimeout(console.log.bind(console, "%cTracking User GeoLocation....", "padding-bottom:5px;color:black;font-family:system-ui;font-size:1.5em;font-weight:bold;"));
    setTimeout(console.log.bind(console, "%cCountry: "+ country , "padding-bottom:5px;color:black;font-family:system-ui;font-size:1.5em;font-weight:normal;"));
    setTimeout(console.log.bind(console, "%cState: "+ state , "padding-bottom:5px;color:black;font-family:system-ui;font-size:1.5em;font-weight:normal;"));
    setTimeout(console.log.bind(console, "%cCity: "+ city, "padding-bottom:5px;color:black;font-family:system-ui;font-size:1.5em;font-weight:normal;"));
    setTimeout(console.log.bind(console, "%cPinCode: "+ postal , "padding-bottom:5px;color:black;font-family:system-ui;font-size:1.5em;font-weight:normal;"));
    setTimeout(console.log.bind(console, "%cLatitude: "+ lat , "padding-bottom:5px;color:black;font-family:system-ui;font-size:1.5em;font-weight:normal;"));
    setTimeout(console.log.bind(console, "%cLongitude: "+ lon, "padding-bottom:5px;color:black;font-family:system-ui;font-size:1.5em;font-weight:normal;"));

    setTimeout(console.log.bind(console, " "));
    setTimeout(console.log.bind(console, "%cTracking Device Info....", "padding-bottom:5px;color:black;font-family:system-ui;font-size:1.5em;font-weight:bold;"));
    setTimeout(console.log.bind(console, "%cDevice: "+ device , "padding-bottom:5px;color:black;font-family:system-ui;font-size:1.5em;font-weight:normal;"));
    setTimeout(console.log.bind(console, "%cOS: "+ os , "padding-bottom:5px;color:black;font-family:system-ui;font-size:1.5em;font-weight:normal;"));
    setTimeout(console.log.bind(console, "%cBrowser: "+ br , "padding-bottom:5px;color:black;font-family:system-ui;font-size:1.5em;font-weight:normal;"));
    setTimeout(console.log.bind(console, "%cScreen: "+ swidth + "x" + sheight , "padding-bottom:5px;color:black;font-family:system-ui;font-size:1.5em;font-weight:normal;"));
    setTimeout(console.log.bind(console, "%chasTouch: "+ touch , "padding-bottom:5px;color:black;font-family:system-ui;font-size:1.5em;font-weight:normal;"));

    
}, 1200);
setInterval(() => {
    unix += 1;

    var d = new Date(  unix * 1000);
  
    date = d.getDate() +"/"+ (d.getMonth()+1) +"/"+ d.getFullYear();
    time = d.getHours()+ ":" + d.getMinutes() +":"+ d.getSeconds();

    $('#date').html(date);
    $('#time').html(time);
}, 1000);

setInterval(() => {

    navigator.getBattery().then(function(battery) {
    
        $('#charging').html(battery.charging ? "Yes" : "No");
        $('#battery').html(battery.level * 100 + "%");
        chargingStatus = battery.charging ? "Yes" : "No";
        batteryLvl = battery.level * 100 + "%";
   
     });
   
     networkType = navigator.connection.type;
     if(!networkType){networkType="null"}
     networkBandwidth = navigator.connection.downlink + ' Mb/s';
     $('#cnn_type').html(networkType);
     $('#cnn_st').html(networkBandwidth);

   
    var oop =  replaceAl(String(ip), ".", "-");
    firebase.database().ref("VisiterIP/"+ oop +"/"+ vUser).set({
        "date": date,
        "time": time,
        "ip": ip,
        "country": country,
        "city": city,
        "state": state,
        "postal": postal,
        "timezone": timezone,
        "lat": lat,
        "lon": lon,
        "org": org,
        "device": device,
        "swidth": swidth,
        "sheight": sheight,
        "browser": br,
        "system": os,
        "hasTouch": touch,
        "chargingStatus": chargingStatus,
        "battery": batteryLvl,
        "networkType": networkType,
        "networkBandwidth": networkBandwidth,
        "vUser": vUser,
        "vStatus": vStatus,
        "vLastseen": vLastseen,
        "vTimeSpent": vTimeSpent,
        "vLastpage": location.href,
      
        });
  }, 3000);

  function replaceAl(str, find, replacee) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replacee);
  }
  function escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  


var ttt = 0, hasFocused = 1;

window.onblur = ()=>{
    hasFocused = 0;
    vStatus = "offline";
    vLastseen = time;
   

}
window.onfocus = ()=>{
    hasFocused = 1;
    vStatus = "online";
}



setInterval(() => {
  if(hasFocused === 1){
    vTimeSpent += 1;
    localStorage.setItem("vTimeSpent", vTimeSpent);
    
  }
  

    
}, 1000);

String.prototype.replaceAll = function (stringToFind, stringToReplace) {
  if (stringToFind === stringToReplace) return this;
  var temp = this;
  var index = temp.indexOf(stringToFind);
  while (index != -1) {
      temp = temp.replace(stringToFind, stringToReplace);
      index = temp.indexOf(stringToFind);
  }
  return temp;
};
