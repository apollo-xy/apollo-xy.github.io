var sym ="";
var em = document.querySelectorAll("#sym-con span");
for (var ii = 0; ii < em.length; ii++) {
    em[ii].addEventListener('click', function() {
      sym += this.innerHTML;
      document.getElementById("recent").value=sym;
      navigator.clipboard.writeText(this.innerHTML);
      document.getElementById("copied").innerHTML = "Copied" + this.innerHTML;
      document.getElementById("copied").style.display = "block";
      setTimeout(() => {
        document.getElementById("copied").style.display = "none";
      }, 800);

  });
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

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
