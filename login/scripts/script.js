
window.addEventListener('load',()=>{
const firebaseConfig = {
    apiKey: "AIzaSyANtN0D5DLcRTOEZr3tQBBn7e6nePQAVSU",
    authDomain: "chat-c565a.firebaseapp.com",
    databaseURL: "https://chat-c565a.firebaseio.com",
    projectId: "chat-c565a",
    storageBucket: "chat-c565a.appspot.com",
    messagingSenderId: "582626485202",
    appId: "1:582626485202:web:04cb2b68cea057a9949e0b"
};
     
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

    checkAuth();     
    updateQR();

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
                redirect(firebaseUser.user);
                
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
                    redirect(firebaseUser.user);
                });
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
                    redirect(firebaseUser.user);
                });
                promise.catch(function(error) {
                    document.getElementById('error-con2').style.display = "block";
                    updateQR();
                });
            }
        });
}

function checkAuth(){
    setTimeout(() => {
    const user = firebase.auth().currentUser;
    if (user) {
        redirect(user);
      } else {
     
      }
        
    }, 500);
    
}



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
                window.location.replace("https://apollo-xy.github.io/notFound");
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
    
}
function goesOnline(){    
    document.getElementById('error-msg').innerHTML = "Back Online!";
    setTimeout(function(){location.reload();},1200); 
}
});
