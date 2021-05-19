

      
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
               console.log("Battery charging? " + (battery.charging ? "Yes" : "No"));
               $('#charging').html(battery.charging ? "Yes" : "No");
   
               console.log("Battery level: " + battery.level * 100 + "%");
               $('#battery').html(battery.level * 100 + "%");
         
            });
   
   
            var d = new Date();
            $('#date').html(d.getDate()+ "/" + d.getMonth() +"/"+ d.getFullYear());
            $('#time').html(d.getHours()+ ":" + d.getMinutes() +":"+ d.getSeconds());
   
            
            var lang = $("select.goog-te-combo option:selected").text();
            if(lang=="Select Language"){ $('#lang').html("English");}
            else{ $('#lang').html("English");
         }

   
          }, 1000);
      

