//v1
const tosBut = document.querySelector(".con1-foot button");
const sendBut = document.querySelector("#send-but");
const pre1 = document.querySelector("#pre1");
const next1 = document.querySelector("#next1");

var Sname = "";
tosBut.addEventListener("click", ()=>{
document.getElementById('con1').style.display = "none";
document.getElementById('con2').style.display = "block";
});

sendBut.addEventListener("click", ()=>{
  document.getElementById('con2').style.display = "none";
  document.getElementById('con3').style.display = "block";
  });

pre1.addEventListener("click", ()=>{
  document.getElementById('con2').style.display = "block";
  document.getElementById('con3').style.display = "none";
  });
next1.addEventListener("click", ()=>{
    if(document.getElementById("space-name").value === ''){return}
    document.getElementById('con3').style.display = "none";
    document.getElementById('con4').style.display = "block";
    Sname = document.getElementById("space-name").value;

    document.getElementById('sname').innerHTML = Sname;
    document.getElementById('sname2').innerHTML = Sname;
    window.history.pushState("/", "", "/FileTransfer/?s="+encodeURI(Sname));
    sessionStorage.setItem("sname", Sname);

});


window.addEventListener("load", ()=>{

  Sname = sessionStorage.getItem("sname");

var url = new URL(window.location.href);
var s = decodeURI(url.searchParams.get("s"));
var r = decodeURI(url.searchParams.get("r"));

if(url.search.includes("?s=")&& s!=""){
  Sname = s;
  sessionStorage.setItem("sname", s);

  document.getElementById('sname').innerHTML = Sname;
  document.getElementById('sname2').innerHTML = Sname;

  document.getElementById('con2').style.display = "none";
  document.getElementById('con4').style.display = "block";

}
if(url.search.includes("?r=")){
  Sname = r;
  sessionStorage.setItem("sname", r);

  document.getElementById('sname').innerHTML = Sname;
  document.getElementById('sname2').innerHTML = Sname;

  document.getElementById('con2').style.display = "none";
  document.getElementById('con9').style.display = "block";

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
}

if(Sname  === null){

$.getJSON('https://random-words-api.vercel.app/word').done (function(data) {
  var word = data[0].word + Math.floor(Math.random() * 99);
  document.getElementById('space-name').value = word;
  document.getElementById('space-name2').value = word;
  sessionStorage.setItem("sname", word);

  });
}else{
  document.getElementById('space-name').value = Sname;
  document.getElementById('space-name2').value = Sname;
}

})


  var totalFiles = 0;
  var pp1 = 0, pp2 = 0;
  updateList = function() {
  

    var input = document.getElementById('file');
    var output = document.getElementById('fileList');
    var children = "";
    var totalSize = 0;
    if(input.files.length===0){return;}
    for (var i = 0; i < input.files.length; ++i) {

       children +=  '<li>'+ input.files[i].name + '</li>';
       
       totalSize += input.files[i].size;

        
    }
    pp1 = input.files.length;
    totalFiles += pp1;
    totalFiles = totalFiles - pp2;
    pp2 = pp1;

    document.getElementById('tf').innerHTML = totalFiles;
    document.getElementById('ts').innerHTML = (totalSize/(1024*1024)).toFixed(4)+"Mb";
    output.innerHTML = children;
}

const textBox  = document.getElementById("text-box");
$("#text-box").on("change keyup paste", function() {

  if(textBox.value.trim().length >= 1){
    
    document.getElementById('tf').innerHTML = totalFiles+1;
  }else{
    document.getElementById('tf').innerHTML = totalFiles;
  }
});

function upload(){


 if(textBox.value.trim().length > 1){
  totalFiles += 1;

    var textBlob = new Blob([textBox.value], {type:'text/plain'});
    var textFile = new File([textBlob], "unname.txt");
    uploadFile(textFile);
    document.getElementById('con4').style.display = "none";
    document.getElementById('con5').style.display = "block";
  
}

  var input = document.getElementById('file');
   if(input.files.length===0){return;}
  document.getElementById('con4').style.display = "none";
  document.getElementById('con5').style.display = "block";


  
  for (var i = 0; i < input.files.length; ++i) {
    uploadFile(input.files[i]);
    
  }

}


var j = 0;
function uploadFile(file) {



  const cloudName = 'apollo-xy';
  const unsignedUploadPreset = 'vhamm9dw';
  var xhr = new XMLHttpRequest();

  var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
 
  var fd = new FormData();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  // Reset the upload progress bar
   document.getElementById('progress').value = 0;
   document.getElementById('proF').max = totalFiles;
  
  // Update progress (can be used to show progress indicator)
  xhr.upload.addEventListener("progress", function(e) {
    var progress = Math.round((e.loaded * 100.0) / e.total);
    document.getElementById('progress').value = progress;

    console.log(`fileuploadprogress data.loaded: ${e.loaded},
  data.total: ${e.total}`);
  });

  xhr.onreadystatechange = function(e) {
//     if (xhr.readyState == 0 ||xhr.status == 413) {
// console.log("Limit Exceed!")

//     }
    if (xhr.readyState == 4 && xhr.status == 200) {
      j = j + 1;
      document.getElementById('proF').value = j;
      console.log(j)
      if(j === totalFiles){
        done();
        console.log("done");
        j = 0;
      }
      // File uploaded successfully
      var response = JSON.parse(xhr.responseText);
      console.log(response.secure_url);
      //secure_url
      //resource_type
      // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
      var url = response.secure_url;
      var res_type = response.resource_type;

      firebase.database().ref("FileTransfer/"+ Sname).push().set({
        "url": url,
        "type": res_type,
      
    });
      // Create a thumbnail of the uploaded image, with 150px width
      var tokens = url.split('/');
      tokens.splice(-2, 0, '');
      var img = new Image(); // HTML5 Constructor
      img.src = tokens.join('/');
      img.alt = response.public_id;

    }
  };
  xhr.onerror = function () {
    console.log("File size exceed than 100Mb");
    alert("File size exceed than 100Mb");
    done();
  };
  fd.append('upload_preset', unsignedUploadPreset);
  fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
  fd.append('file', file);
  xhr.send(fd);

  document.getElementById('cancel').addEventListener("click", ()=>{
    if (xhr) {
      xhr.abort();  
      xhr = null;
      console.log("Canceled");
  }
done();
  return false;
  });
}

function done(){
  document.getElementById('file').value = "";
  document.getElementById('text-box').value = "";
  document.getElementById("fileList").innerHTML ="";
  totalFiles = 0;
  document.getElementById('tf').innerHTML = 0;
  document.getElementById('ts').innerHTML = 0;

  window.history.pushState("/", "", "/FileTransfer");

  document.getElementById('con5').style.display = "none";
  document.getElementById('con6').style.display = "block";

  var strr = window.location.href;
  strr = strr.substring(0, strr.lastIndexOf("/"));
  
  document.getElementById("space-link-box").value = strr +"/FileTransfer?r=" + encodeURI(document.getElementById("space-name").value);

}
function copyLink(){
  var copyText = document.getElementById("space-link-box");
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
     /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);


 }

 function back2(){
  document.getElementById('con6').style.display = "none";
  document.getElementById('con2').style.display = "block";
 }



