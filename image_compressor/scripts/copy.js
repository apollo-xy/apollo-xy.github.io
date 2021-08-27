window.addEventListener('paste', (event)=>{
  var items = (event.clipboardData || event.originalEvent.clipboardData).items; 
  for(var i=0; i<items.length; i++){
    var blob = items[i].getAsFile();
    var reader = new FileReader();
    reader.fileName = "image_"+i+new Date().getTime();
    reader.readAsDataURL(blob);
    reader.onload = function(event){
        
    compressImg(event.target.result, function(result){
      document.getElementById("dwZip").style.display = "inline-block";

      var div = document.createElement("div");
      div.innerHTML = "<div id='out'><img src='" +  result.url + "'/><p>" + event.target.fileName + ".png</p><p>" + result.oSize+"kb ➤ "+ result.cSize +"kb</p><br>" + "<button onclick='dL(this);'" + "fname='" + event.target.fileName + "' url='" + result.url + "'>Download</button><button id='remove' onclick='reMov(this);' fname='ApolloXY-"+ event.target.fileName  +".png'>❌</button>" +"</div>";
      document.getElementById("out-main").insertBefore(div, null);
      zip.folder("images").file("ApolloXY-"+event.target.fileName+".png", result.base64, {base64: true});
       
            
      });
    }
  }
        
});
