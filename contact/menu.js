function menu() {
    var checkBox = document.getElementById("check");
    var sideNav = document.getElementById("nnav");
    var conB = document.getElementById("conb");
    if (checkBox.checked == true){
      sideNav.style.width = "500px";
      comB.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      sideNav.style.width = "0px";
      comB.style.width = "0";
      document.body.style.overflow = "scroll";
    }
  }