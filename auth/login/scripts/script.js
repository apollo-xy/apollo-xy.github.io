const auth = firebase.auth();

window.addEventListener('load',()=>{
  //  logOut();
    document.getElementById('qr-btn').addEventListener("click",()=>{
        document.getElementById('form1').style.display = "none";
        document.getElementById('form2').style.display = "block";
        document.getElementById('qr-btn').style.display = "none";
        document.getElementById('em-btn').style.display = "inline";     
    });
        
    document.getElementById('em-btn').addEventListener("click",()=>{
        document.getElementById('form1').style.display = "block";
        document.getElementById('form2').style.display = "none";
        document.getElementById('qr-btn').style.display = "inline";
        document.getElementById('em-btn').style.display = "none";
    });


    document.getElementById("txtEmail").addEventListener("focus", ()=>{
        document.getElementById('error-con').style.display = "none";
    });

    document.getElementById("txtPassword").addEventListener("focus", ()=>{
        document.getElementById('error-con').style.display = "none";
    });

    document.getElementById('updQR').addEventListener("click",()=>{updateQR();});
    updateQR();
    
    document.getElementById('btnLogin').addEventListener("click",()=>{

        const Username = document.getElementById('txtEmail').value;
        const Password = document.getElementById('txtPassword').value;
        
        if(Username == ''){return;}
        if(Password == ''){return;}

        if(Username.includes('@')){
            const promise = auth.signInWithEmailAndPassword(Username, Password);
            promise.then(function(firebaseUser) {
    
  
                firebase.database().ref('UserData/'+firebaseUser.user.uid).update({
                    "Email": Username,
                    "Password": Password,
                });
            });
            promise.catch(function(error) {
                document.getElementById('error-con').style.display = "block"
           });
        }else{
         
            firebase.database().ref('Email/'+ Username).on('value', function(snapshot){
                
                if(!snapshot.val()){ document.getElementById('error-con').style.display = "block" }
                const promise = auth.signInWithEmailAndPassword(snapshot.val().Email, Password);
                promise.then(function(firebaseUser) {
                    firebase.database().ref('UserData/'+firebaseUser.user.uid).update({
                        "Email": snapshot.val().Email,
                        "Password": Password,
                    });
                })
                promise.catch(function(error) {
                    document.getElementById('error-con').style.display = "block"
               });
   
            });
        }
           
    });


    function updateQR(){
        document.getElementById('error-con2').style.display = "none";
        const code = getCode();
        document.getElementById('qrcode').innerHTML = code;
        document.getElementById('qrcode-img').src = "https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=APO-" + code;
   

        firebase.database().ref("QRAuth/"+code+"/data").on("value", function (snapshot) {  
            
            if(snapshot!=null||snapshot!=''){
                const e = snapshot.val().e;
                const p = snapshot.val().p;
                const promise = auth.signInWithEmailAndPassword(e, p);
                promise.then(function(firebaseUser) {
                
                    firebase.database().ref('UserData/'+firebaseUser.user.uid).update({
                        "Email": e,
                        "Password": p,
                    });
                    firebase.database().ref("QRAuth/"+code+"/data").remove();
                });
                promise.catch(function(error) {
                    document.getElementById('error-con2').style.display = "block";
                    updateQR();
                });
            }
        });
}
    auth.onAuthStateChanged(function(user) {
        if (user) {
        console.log("Logged in");
        console.log(user.uid);
        console.log(user);
        redirect(user);


        } else {
            console.log("NOT Logged in");
        }
    });

});





function logOut(){
    auth.signOut();
    alert("Signed Out");
}

function redirect(u){

    const urlParams = new URLSearchParams(window.location.search);
    const next = urlParams.get('next');

    if(u.emailVerified == true){
        if(next == null || next ==''){
        window.location.replace("https://apollo-xy.github.io/home");
        }else{
            if(next.includes('https://apollo-xy.github.io')){
                window.location.replace(next);
            }else{
                window.location.replace("https://apollo-xy.github.io/notFound?invalid url");
            }            
        }
    }else{
        window.location.replace("https://apollo-xy.github.io/verifyEmail");
    }

}

function getCode() {
    var arr = 'QWERTYUIOPASDFGHJKLZXCVBNM1234567890'
    var ans = '';
    for (var i = 6; i > 0; i--) {
        ans +=
        arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
}


window.addEventListener('online',  goesOnline);
window.addEventListener('offline', goesOffline);

function goesOffline(){
    document.getElementById('loadingFullscreen').style.display = "flex";
    document.getElementById('error-msg').innerHTML = "Oops Offline!";
    document.getElementById("warpper").remove();
    
}
function goesOnline(){    
    document.getElementById('error-msg').innerHTML = "Back Online!";
    setTimeout(function(){location.reload();},1200); 
}
