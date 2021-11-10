
const auth = firebase.auth();


window.addEventListener('load',()=>{


  document.getElementById("sentBtn").addEventListener('click', e =>{
    var email = document.getElementById("emailBox").value;
    if(!ValidateEmail(email)){ document.getElementById("mss1").innerHTML = "Invalid Email!!"; return}
    auth.sendPasswordResetEmail(email)
    .then(() => {
      console.log("Password reset email sent!")
      document.getElementById("mss1").innerHTML = "Password reset email sent!";
      // ...
    }).catch((error) => {
      document.getElementById("mss1").innerHTML = "User not found!";
    }); 
  });

 

});
function ValidateEmail(inputText){
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,7})+$/;
  if(inputText.match(mailformat)){return true;}
  else{return false;}
}

