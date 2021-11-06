

$(document).ready(function() {
        $("body").on("contextmenu", function(e) {
          return false;
      });

      var ra = 0
      if(window.pageYOffset > 100 && ra == 0){
        ra = 1;
        changeT();
      }
      window.addEventListener("scroll", ()=>{       
          if(window.pageYOffset > 100 && ra == 0){
              ra = 1;
              changeT();
          }
      });

  
});

  function changeT(){
    var txtinn = 0;
    var uName, hAcc, hVeri;
       document.getElementById("terBut").addEventListener('click', ()=>{
           checkWord();
       });
       document.getElementsByTagName('form')[0].onsubmit = function(evt) {
        evt.preventDefault(); // Preventing the form from submitting
        checkWord(); // Do your magic and check the entered word/sentenc
      }
    

        
        var textInputValue = document.getElementById('terminalTextInput').value.trim();

        // Clear text input
        var clearInput = function(){
            document.getElementById('terminalTextInput').value = "";
        }
        
        // Scrtoll to the bottom of the results div
        var scrollToBottomOfResults = function(){
            var terminalResultsDiv = document.getElementById('resultCon');
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
        var oopp =  replaceAl(ip, ".", "-");
        firebase.database().ref("VisiterIP/"+oopp).child(vUser).remove();
        vUser = textInputValue;
        localStorage.setItem("vUser", vUser);
        clearInput();
        txtinn = 1;
        console.log("1 Input")
        typeWriter2();
        return 0;
    
        
        }
            
        if (textInputValue != "" && txtinn == 1){ //checking if text was entered
        addTextToResults(textInputValue);
        hVeri = textInputValueLowerCase;
        clearInput();
        txtinn = 2;
        console.log("2 Input")
        typeWriter4();
        return 0;
        
        }

        if (textInputValue != "" && txtinn == 2 && textInputValueLowerCase == "y" || textInputValueLowerCase == "n"){ //checking if text was entered
        addTextToResults(textInputValueLowerCase);
        hAcc = textInputValueLowerCase;
        clearInput();
        txtinn = 3;
        console.log("3 Input")
        typeWriter3();
        
        }
    };
        
            
var i = 0, j = 0, k = 0, l = 0;
var txt1 = `<-------------------------------->
                          ApolloXY 
<-------------------------------->
        
Hey there!
Enter your name: `;

    var txt2;
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
        txt2 = '\n\nWelocome '+ uName + '!';
        txt2 = txt2 + '\nTracking your IP address...............';
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
        txt2 = txt2 + '\nhasTouch : ' + touch;
        txt2 = txt2 + '\nScreen: ' + swidth +'x' + sheight;
        txt2 = txt2 + '\n';


        txt2 = txt2 + '\nHuman Verification Needed:';
        txt2 = txt2 + "\n5 + 2 = ";

        if (j < txt2.length) {
            document.getElementById("userDataP").innerHTML += txt2.charAt(j);
            scrollToBottomOfResults();
            j++;
            setTimeout(typeWriter2, speed);
        }
    }
            
            
    var txt4;
    function typeWriter4() {
        if(hVeri=="7"){
        txt4 = hVeri;
        txt4 = '\nHuman Verification Success!';
        txt4 = txt4 + '\nAccess Acepted!!';
        
        txt4 = txt4 + '\n\nHello '+ uName + '!';
        txt4 = txt4 + "\nWe're glad for using our platform.";
        txt4 = txt4 + '\nNow explore the world of digital';
        txt4 = txt4 + '\ntechnology through ApolloXY.';
        txt4 = txt4 + '\n';
        txt4 = txt4 + '\nDo you have an account?(y/n): ';
 

        }
        if(hVeri!="7"){
        txt4 = '\nHuman Verification Failed!';
        txt4 = txt4 + '\nAccess Denied!!';
        }
        

        if (l < txt4.length) {
        document.getElementById("userDataP").innerHTML += txt4.charAt(l);
        scrollToBottomOfResults();
        l++;
        setTimeout(typeWriter4, speed);
        }
    }

    var txt3;
    function typeWriter3() {
        if(hAcc=="y"){
        txt3 = '\n\nWelcome back !';
        txt3 = txt3 + '\nLogin to ApolloXY!';
        txt3 = txt3 + '\n~Page will open in few seconds~';
        setTimeout(() => {window.location.href = "/auth/login";}, 4000);

        }
        if(hAcc=="n"){
        txt3 = "\n\nLet's start by creating an account!";
        txt3 = txt3 +'\nRegister free to ApolloXY!';
        txt3 = txt3 + '\n~Page will open in few seconds~';
        setTimeout(() => {window.location.href = "/auth/signup"}, 4000);
        }
        

        if (k < txt3.length) {
        document.getElementById("userDataP").innerHTML += txt3.charAt(k);
        scrollToBottomOfResults();
        k++;
        setTimeout(typeWriter3, speed);
        }
    }                
          
            
}

