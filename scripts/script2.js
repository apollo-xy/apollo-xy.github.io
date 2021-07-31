function changeT(){
    document.getElementById('inCon').style.display = "none";
    document.getElementById('terminalCont').style.display = "block";
    

    var txtinn = 0;
    var uName, hAcc;
        document.getElementsByTagName('form')[0].onsubmit = function(evt) {
          evt.preventDefault(); // Preventing the form from submitting
          checkWord(); // Do your magic and check the entered word/sentenc
        }
      
        // Getting the text from the input
        var textInputValue = document.getElementById('terminalTextInput').value.trim();

        // Clear text input
        var clearInput = function(){
          document.getElementById('terminalTextInput').value = "";
        }
      
        // Scrtoll to the bottom of the results div
        var scrollToBottomOfResults = function(){
          var terminalResultsDiv = document.getElementById('terminalReslutsCont');
          terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
        }
      
        // Scroll to the bottom of the results
        scrollToBottomOfResults();
      
        // Add text to the results div
        var addTextToResults = function(textToAdd){
          document.getElementById('userDataP').innerHTML +=  textToAdd;
          scrollToBottomOfResults();
        }
      
    
      // Main function to check the entered text and assign it to the correct function
        var checkWord = function() {
          textInputValue = document.getElementById('terminalTextInput').value.trim(); //get the text from the text input to a variable
          textInputValueLowerCase = textInputValue.toLowerCase(); //get the lower case of the string
      
          if (textInputValue != "" && txtinn == 0){ //checking if text was entered
            addTextToResults(textInputValue);
            uName = textInputValue;
            clearInput();
            txtinn = 1;
            typeWriter2();
           
          }
    
          if (textInputValue != "" && txtinn == 1 && textInputValueLowerCase == "y" || textInputValueLowerCase == "n"){ //checking if text was entered
            addTextToResults(textInputValueLowerCase);
            hAcc = textInputValueLowerCase
            clearInput();
            txtinn = 2;
            typeWriter3();
           
          }
        };

    
        var i = 0, j = 0, k = 0;
        var txt1 = `<----------------------------->
    ApolloXY - Get Started!
<----------------------------->

Hey there!
Enter your name: `;
    var txt2;
     
        var ip, timezone, lat, lon, country, city, postal,org, chargingStatus, batteryLvl, device, os, br, swidth, sheight;
        $.getJSON('https://ipapi.co/json/')
        .done (function(location) {
    
               ip = location.ip;
               timezone = location.timezone;
               lat = location.latitude;
               lon = location.longitude;
               country = location.country_name;
               city = location.city;
               postal = location.postal;
               org = location.org;
               swidth = screen.width;
               sheight = screen.height;

    
               $.getJSON('https://api.ipgeolocation.io/user-agent?apiKey=38fc2b67688e4eff853fc42f488b4181')
               .done (function(kk) {
                device = kk.device.name;
                os = kk.operatingSystem.name + " " +kk.operatingSystem.version;
                br = kk.name + "/" +kk.version;

               });
    
    
          
        
              });
    
    
        
           
      
            var speed = 20;
            typeWriter1();
            function typeWriter1() {
              if (i < txt1.length) {
                document.getElementById("userDataP").innerHTML += txt1.charAt(i);
                scrollToBottomOfResults();
                i++;
                setTimeout(typeWriter1, speed);
              }
            }
        
            function typeWriter2() {
              txt2 = '\nWelocome '+ uName + '!';
              txt2 = txt2 + '\nTracking your IP address.............';
              txt2 = txt2 + '\nIP4v: '+ ip;
              txt2 = txt2 + '\n';
              txt2 = txt2 + '\nFetching user info....................';
              txt2 = txt2 + '\nLat: '+ lat;
              txt2 = txt2 + '\nLon: '+ lon;
              txt2 = txt2 + '\nTimeZone: '+ timezone;
              txt2 = txt2 + '\nLocation: '+ city +', '+ country +' - '+ postal;
              txt2 = txt2 + '\nOrg: '+ org;
              txt2 = txt2 + '\n';
              txt2 = txt2 + '\nFetching device info....................';
              txt2 = txt2 + '\nDevice: '+ device;
              txt2 = txt2 + '\nOS: '+ os;
              txt2 = txt2 + '\nBrowser: '+ br;
              txt2 = txt2 + '\nCharging: ' + chargingStatus;
              txt2 = txt2 + '\nBattery: ' + batteryLvl;
              txt2 = txt2 + '\nScreen: ' + swidth +'x' + sheight;
              txt2 = txt2 + '\n';
      
              txt2 = txt2 + '\nHello '+ uName + '!';
              txt2 = txt2 + "\nWe're glad for using our platform.";
              txt2 = txt2 + '\nNow explore the world of digital';
              txt2 = txt2 + '\ntechnology through ApolloXY.';
              txt2 = txt2 + '\n';
              txt2 = txt2 + "\nLet's start with creating an";
              txt2 = txt2 + "\naccount.";
              txt2 = txt2 + '\nDo you have an account?(y/n): ';
              if (j < txt2.length) {
                document.getElementById("userDataP").innerHTML += txt2.charAt(j);
                scrollToBottomOfResults();
                j++;
                setTimeout(typeWriter2, speed);
              }
            }
    
    
            var txt3;
            function typeWriter3() {
              if(hAcc=="y"){
                txt3 = '\nLogin to ApolloXY!';
                txt3 = txt3 + '\n~Page will open in few seconds~';
               setTimeout(() => {window.location.href = "/login";}, 4000);
    
              }
              if(hAcc=="n"){
                txt3 = '\nSignUp free to ApolloXY!';
                txt3 = txt3 + '\n~Page will open in few seconds~';
                setTimeout(() => {window.location.href = "/signup"}, 4000);
              }
             
    
              if (k < txt3.length) {
                document.getElementById("userDataP").innerHTML += txt3.charAt(k);
                scrollToBottomOfResults();
                k++;
                setTimeout(typeWriter3, speed);
              }
            }
    
            navigator.getBattery().then(function(battery) {
              chargingStatus = battery.charging ? "Yes" : "No";
           batteryLvl = battery.level * 100 + "%";
    
     });
        
        
      
    
       }