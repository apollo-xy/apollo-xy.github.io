const pre2 = document.querySelector("#pre2");
const next2 = document.querySelector("#next2");

const pre3 = document.querySelector("#pre3");
const pre4 = document.querySelector("#pre4");
const pre5 = document.querySelector("#pre5");
const next3 = document.querySelector("#next3");

const recBut = document.querySelector("#receive-but");


recBut.addEventListener("click", ()=>{
  document.getElementById('con2').style.display = "none";
  document.getElementById('con7').style.display = "block";
  });


pre2.addEventListener("click", ()=>{
    document.getElementById('con2').style.display = "block";
    document.getElementById('con7').style.display = "none";
    });


pre3.addEventListener("click", ()=>{
    document.getElementById('con2').style.display = "block";
    document.getElementById('con8').style.display = "none";
    });

    
pre4.addEventListener("click", ()=>{
    document.getElementById('con2').style.display = "block";
    document.getElementById('con9').style.display = "none";
    document.getElementById('items-con').innerHTML = "";
    window.history.pushState("/", "", "/FileTransfer");
 

});
pre5.addEventListener("click", ()=>{
    document.getElementById('con2').style.display = "block";
    document.getElementById('con4').style.display = "none";
    window.history.pushState("/", "", "/FileTransfer");
    document.getElementById('text-box').value = "";


});

next3.addEventListener("click", ()=>{
    if(document.getElementById("space-pwd").value === ''){return}
    document.getElementById('con8').style.display = "none";
    document.getElementById('con9').style.display = "block";

});

next2.addEventListener("click", ()=>{
        if(document.getElementById("space-name2").value === ''){return}
        document.getElementById('con7').style.display = "none";
        document.getElementById('con9').style.display = "block";

        Sname =  document.getElementById("space-name2").value;
        window.history.pushState("/", "", "FileTransfer/?r="+encodeURI(Sname));

        document.getElementById('sname').innerHTML = Sname;
        document.getElementById('sname2').innerHTML = Sname;
        
        sessionStorage.setItem("sname", Sname);

       
    

    firebase.database().ref("FileTransfer/"+Sname).on("child_added", function (snapshot) {
        var html = "";
        // give each message a unique ID
               // show delete button if message is sent by me
        // if (snapshot.val().sender == myName) {
        //     html += "<button data-id='" + snapshot.key + "' onclick='deleteMessage(this);'>";
        //         html += "Delete";
        //     html += "</button>";
        // }
        var type = snapshot.val().type
   
            fetch(snapshot.val().url)
                .then(function(response) {
                    response.text().then(function(text) {
                if(type === "raw"){
                    html += "<div class='item-c' id='item-" + snapshot.key + "'>";
                    html += "<pre>" + text + "</pre>";
                    html += "<button item-id='" + snapshot.key + "' onclick='deleteItem(this);'>";
                    html += "Delete";
                    html += "</button>";
                    html += "</div>";       
                    document.getElementById("items-con").innerHTML += html;
                }
                if(type === "image"){
                    html += "<div class='item-c' id='item-" + snapshot.key + "'>";
                    html += "<img src='" + snapshot.val().url + "' >";
                    html += "<button item-id='" + snapshot.key + "' onclick='deleteItem(this);'>";
                    html += "Delete";
                    html += "</button>";
                    html += "</div>";       
                    document.getElementById("items-con").innerHTML += html;
            
                }
                if(type === "video"){
                    html += "<div class='item-c' id='item" + snapshot.key + "'>";
                    html += "<video src='" + snapshot.val().url + "' controls> </video>";
                    html += "<button item-id='" + snapshot.key + "' onclick='deleteItem(this);'>";
                    html += "Delete";
                    html += "</button>";
                    html += "</div>";       
                    document.getElementById("items-con").innerHTML += html;
            
                }
                });
            });       
            console.log(snapshot.val().url);
        
       
    });

  });



 
// attach listener for delete message
// firebase.database().ref("FileTransfer/"+Sname2).on("child_removed", function (snapshot) {
//     console.log("fRemoved")
//     // remove message node
//     document.getElementById("item-" + snapshot.key).remove();
// });

function deleteItem(self) {

    var messageId = self.getAttribute("item-id");
 
    // delete message
    firebase.database().ref("FileTransfer/"+Sname).child(messageId).remove();
    document.getElementById("item-" + messageId).remove();

}