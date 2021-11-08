
const auth = firebase.auth();
const signBtn = document.getElementById("btnSignup");



window.addEventListener('load',()=>{
  //logOut()

    setTimeout(() => {
        const users = auth.currentUser;
        console.log(users);
        if(users){
            if(users.emailVerified ===false){
                window.location.replace("https://apollo-xy.github.io/verifyEmail");
            }else{
                window.location.replace("https://apollo-xy.github.io/home");
            }
        }
    }, 1700);
 

    signBtn.addEventListener('click', ()=>{
    
        const name = document.getElementById("txtName").value;
        const username = document.getElementById("txtUserName").value;
        const email = document.getElementById("txtEmail").value;
        const password = document.getElementById("txtPassword").value;
        const accCheck = document.getElementById("agree-box").checked ;
        console.log(accCheck);

        if(accCheck === true){
            if(name.length <= 1){
                document.getElementById("error").innerHTML = "Please enter your name.";
            }else{
                if(!ValidateEmail(email)){
                    document.getElementById("error").innerHTML = "Please enter your email.";
                }else{
                    if(password.length <6){
                        document.getElementById("error").innerHTML = "Passwrord must have 6 letters.";
                    }else{
                        if(username.length <=1){
                            document.getElementById("error").innerHTML = "Please enter username.";
                        }else{
                            var regEx = /^[0-9a-zA-Z_]+$/;
                            if (username.search(regEx) === -1){
                                document.getElementById("error").innerHTML = "Username can contain letters, numbers and underscores(_)";
                                }
                            else{
                               
                                document.getElementById("error").innerHTML = "Wait....";
                             

                                    const promise = auth.createUserWithEmailAndPassword(email, password);
                                    promise.then(function(e){
                                        firebase.database().ref("Email/"+username).update({
                                            "Email": email,
                                            
                                        })
                                        .then(function(firebaseUser) {
                                            document.getElementById("error").innerHTML = "Success!";
                                            console.log("Signup Successfully");
                                            const user = firebase.auth().currentUser;
                                            console.log(user.uid);
                                            firebase.database().ref("UserData/"+user.uid).update({
                                                "Email": email,
                                                "Password": password,
                                                "Name": name,
                                                "Username": username
                                                
                                            });
                                            user.updateProfile({
 
                                                displayName: name,
                                            
                                              }).then(() => {
                                                console.log("Profile Updated!");
                                                window.location.replace("https://apollo-xy.github.io/verifyEmail");
                                                // Update successful
                                                // ...
                                              })
                                        })
                                        .catch(function(error) {
                                            document.getElementById("error").innerHTML = "Username already taken!";

                                            const user = firebase.auth().currentUser;

                                            user.delete().then(() => {
                                              // User deleted.
                                              console.log(user.uid);
                                              console.log("Account Deleted Successfully!");
                                            });
                                            
                                        });
                                    });
                                    promise.catch(e =>{
                                        console.log(e.message);
                                        document.getElementById("error").innerHTML = "Email already registered.";
                                    });
                            }
                        
                    }
                }

            }
        }
        }else{
            document.getElementById("error").innerHTML = "Please accept our terms and conditions.";
        }


// auth.onAuthStateChanged(function(user) {
//         if (user) {
//         console.log("Logged in");
//         console.log(user.uid);
//         console.log(user);


//         setTimeout(() => {
//             if(user.emailVerified == true){
//                 window.location.replace("https://apollo-xy.github.io/home");
//             }else{
//                 window.location.replace("https://apollo-xy.github.io/verifyEmail");
//             }
//         }, 2000);


//         } else {
//             console.log("NOT Logged in");
//         }
//     });



    });


 
   
           
});


 

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


function ValidateEmail(inputText){
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,7})+$/;
    if(inputText.match(mailformat)){return true;}
    else{return false;}
}

function logOut(){
    auth.signOut();
    alert("Signed Out");
}
