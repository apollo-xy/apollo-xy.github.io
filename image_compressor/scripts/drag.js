var holder = document.getElementById('holder'),
    tests = {
      dnd: 'draggable' in document.createElement('span'),

    }, 
    acceptedTypes = {
      'image/png': true,
      'image/jpeg': true,
      'image/gif': true
    };


function previewfile(file) {
  if (acceptedTypes[file.type] === true) {
    var reader = new FileReader();
    reader.fileName =  file.name.split(".")[0];
        reader.onload = function(event){
            var image = new Image();
            image.src = event.target.result;
            image.width = 250; // a fake resize
            holder.appendChild(image);
        
        compressImg(event.target.result, function(result){
 
            document.getElementById("dwZip").style.display = "inline-block";

        var div = document.createElement("div");
        div.innerHTML = "<div id='out'><img src='" +  result.url + "'/><p>" + event.target.fileName + ".png</p><p>" + result.oSize+"kb ➤ "+ result.cSize +"kb</p><br>" + "<button onclick='dL(this);'" + "fname='" + event.target.fileName + "' url='" + result.url + "'>Download</button><button id='remove' onclick='reMov(this);' fname='ApolloXY-"+ event.target.fileName  +".png'>❌</button>" +"</div>";
        document.getElementById("out-main").insertBefore(div, null);
        zip.folder("images").file("ApolloXY-"+event.target.fileName+".png", result.base64, {base64: true});
       
            
        });
        }
    reader.readAsDataURL(file);
  }  
}

function readfiles(files) {

    var formData =  new FormData();
    for (var i = 0; i < files.length; i++) {
      if (tests.formdata) formData.append('file', files[i]);
      previewfile(files[i]);
    }
}


  holder.ondragover = function () { this.className = 'hover'; return false; };
  holder.ondragend = function () { this.className = ''; return false; };
  holder.ondrop = function (e) {
    this.className = '';
    e.preventDefault();
    readfiles(e.dataTransfer.files);
  }
