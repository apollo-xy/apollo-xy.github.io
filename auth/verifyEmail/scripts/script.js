
const auth = firebase.auth();


window.addEventListener('load',()=>{
  //logOut()
//   auth.signOut();

const promise = auth.signInWithEmailAndPassword("fake2@zetmail.com", "1234567890");
promise.then(function(firebaseUser) {

   console.log(firebaseUser.user.uid)
});


    auth.onAuthStateChanged(function(user) {
        if (user) {
        console.log("Logged in");
        console.log(user.uid);
        console.log(user.emailVerified);

        if(!user.emailVerified){
            document.getElementById("mail").innerHTML = user.email;
            auth.currentUser.sendEmailVerification()
            .then(() => {
              console.log("Email verification sent!")
              // ...
            }).catch(function(error) {
                document.getElementById("errorr4").style.display = "block";
                document.getElementById("mss1").style.display = "none";
              });
        }else{
            window.location.replace("https://apollo-xy.github.io/home");
        }
        document.getElementById("resentBtn").addEventListener("click", ()=>{
            document.getElementById("errorr4").style.display = "none";
            document.getElementById("mss1").style.display = "block";
            document.getElementById("resentBtn").disabled = true;
            auth.currentUser.sendEmailVerification()
            .then(() => {
              console.log("Email verification sent!")
              // ...
            }).catch(function(error) {
                document.getElementById("errorr4").style.display = "block";
                document.getElementById("mss1").style.display = "none";
              });
            setTimeout(() => {
                document.getElementById("mss1").style.display = "none";
                document.getElementById("resentBtn").disabled = false;
            }, 60000);
        });

        setInterval(() => {
            console.log("listening...");
            const userr = firebase.auth().currentUser;
            firebase.auth().currentUser.reload();
            console.log(userr.emailVerified);
            if(userr.emailVerified){
                window.location.replace("https://apollo-xy.github.io/home");
            }
           
        
        }, 2000);
      



        } else {
            console.log("NOT Logged in");
            // window.location.replace("https://apollo-xy.github.io/notFound?error=Broken url");

        }
    });
});
