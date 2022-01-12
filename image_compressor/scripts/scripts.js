document.querySelector("#fileInput").addEventListener("change", function(e){
    var files = this.files;
    document.getElementById('total-img').innerHTML = files.length;

    if(files.length==0){
        document.getElementById("progress").value = "0";
        document.getElementById('status').innerHTML = "Status: No image selected!";
    }
    if(files.length>0){
        document.getElementById("com").style.display = "inline-block";
        document.getElementById('status').innerHTML = "Status: Computing";
        document.getElementById("progress").style.display = "inline-block";
        
    }
    for (var i = 0; i < files.length; i++){
        var file = files[i];
        const reader = new FileReader();
        reader.readAsDataURL(file);  
        reader.onloadend = function () {
          document.getElementById('status').innerHTML = "Status: Ready to Compress";
          document.getElementById("progress").value = "0";
          };
    }


});

document.getElementById('com').addEventListener("click", compress);
document.getElementById('dwZip').addEventListener("click", saveALL);
document.getElementById('dwPDF').addEventListener("click", savePDF);

var zip = new JSZip();


function compressImg(base64, callback){

    const img = new Image();
    img.src = base64;

    img.onload = () => {
    const width = img.width;
    const height = img.height;
    const elem = document.createElement("canvas");
    elem.width = width;
    elem.height = height;
    const ctx = elem.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);

    var webp;
    webp = ctx.canvas.toDataURL("image/webp", 0.4);

    const he = base64.split(",")[0] + ',';
    const size = (Math.round((base64.length - he.length)*3/4) / (1024)).toFixed(2);
    const imgFileSize = (Math.round((webp.length - 'data:image/webp;base64,'.length)*3/4) / (1000)).toFixed(2);

   
    function b64toBlob(dataURI) {
    
        var byteString = atob(dataURI.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/png' });
    }

    const blobUrl = URL.createObjectURL(b64toBlob(webp));

     webp = webp.replace("data:image/webp;base64,", "");
        var res = {
            base64:webp,
            url:blobUrl,
            oSize:size,
            cSize:imgFileSize,
            
        }
   
    callback(res);
   
    
   
    }

}


function compress(){
  
    var fileInput = document.getElementById("fileInput");
    let files = fileInput.files;
    if(files.length>0){
        document.getElementById('status').innerHTML = "Status: Processing...";
        }else{
        document.getElementById('status').innerHTML = "Status: No image selected!";
    }
     document.getElementById('progress').max = files.length;
     if(files.length>=10){document.getElementById('ple').style.display = "inline-block";  }

    for (var i = 0; i < files.length; i++){
        var file = files[i];

        const reader = new FileReader();
        reader.readAsDataURL(file);  
       var aa = 0;
        reader.fileName = file.name.split(".")[0];
        reader.onload = event => {
            
         base64 = event.target.result;

            compressImg(base64, function(result){
              
                console.log(aa);
                aa = aa + 1;
                document.getElementById('progress').value = aa;
            if(aa == files.length){
                fileInput.value = null;
                document.getElementById('total-img').innerHTML = files.length;
                document.getElementById('status').innerHTML = "Status: Done!";
                document.getElementById("dwZip").style.display = "inline-block";
                document.getElementById("dwPDF").style.display = "inline-block";
              
             }


            var div = document.createElement("div");
            div.innerHTML = "<div id='out'><img src='" +  result.url + "'/><p>" + event.target.fileName + ".png</p><p>" + result.oSize+"kb ➤ "+ result.cSize +"kb</p><br>" + "<button onclick='dL(this);'" + "fname='" + event.target.fileName + "' url='" + result.url + "'>Download</button><button id='remove' onclick='reMov(this);' fname='ApolloXY-"+ event.target.fileName  +".png'>❌</button>" +"</div>";
            document.getElementById("out-main").insertBefore(div, null);
            zip.folder("images").file("ApolloXY-"+event.target.fileName+".png", result.base64, {base64: true});
                      
            });

        }  
    }

}

  function dL(self){
   var Fnam  = self.getAttribute("fname");
   var url  = self.getAttribute("url");
    var link = document.createElement('a');
    link.download =  'ApolloXY-' + Fnam + '.png';
    link.href = url;
    link.click();
  }


  function reMov(self){
    var Fnam  = self.getAttribute("fname");
    zip.remove("images/"+Fnam);
    //var btn = document.getElementById('remove')
    self.parentNode.parentNode.parentNode.removeChild(self.parentNode.parentNode);

   }

  function saveALL(){
    zip.generateAsync({type:"blob"}).then(function(content) {
        saveAs(content, "Compressed_Images_ApolloXY.zip");
    });
  }


  function savePDF(){
    document.getElementById("progressPDF").style.display = "inline-block";
    var count = 0;
    document.getElementById('progressPDF').value = count;
    var outCons = document.querySelectorAll('#out img');
    var pdf = new jsPDF();
    document.getElementById('progressPDF').max = outCons.length;

    for (var j = 0; j < outCons.length; j++) {

      const img = new Image();
      img.src =  outCons[j].src ;
           
      img.onload = (function(imga) {
          return function() {
          count++;
          document.getElementById('progressPDF').value = count;

          const width = imga.width;
          const height = imga.height;

          const elem = document.createElement("canvas");
          elem.width = width;
          elem.height = height;
          const ctx = elem.getContext('2d');
          ctx.drawImage(imga, 0, 0, width, height);
          var png = ctx.canvas.toDataURL("image/png", 1.0);
   
          if((width/height)>1.15){
            pdf.addPage([160, 90], "l");
            pdf.setPage(j + 1);
            pdf.addImage(png, 'PNG', 0, 0, 160, 90);
    
          }if((width/height)<0.85){
            pdf.addPage([160, 213.33], "p");
            pdf.setPage(j + 1);
            pdf.addImage(png, 'PNG', 0, 0, 160, 213.33);
          }
          if((width/height)>0.85 && (width/height)<1.15){
            pdf.addPage([160, 160], "p");
            pdf.setPage(j + 1);
            pdf.addImage(png, 'PNG', 0, 0, 160, 160);
          }

          if (count === outCons.length) {
            setTimeout(function() {
          //  pdf.deletePage(pdf.internal.getNumberOfPages())
          pdf.deletePage(1)
              pdf.save("Compressed_Images_ApolloXY.pdf");
            }, 100);
          }
       
        }
      })(img);
          
    }

  }

  var topBtn = document.getElementById("top-btn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

window.onbeforeunload = confirmExit;
  function confirmExit() {
    
    if(document.getElementById("out-main").childElementCount == 0){ return;}
      return "You have attempted to leave this page. Are you sure?";

  }
