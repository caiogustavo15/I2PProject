//event list for info
let colorBlue = getComputedStyle(document.documentElement).getPropertyValue('--color-blue');
let colorPurple = getComputedStyle(document.documentElement).getPropertyValue('--color-purple');
let colorGray = getComputedStyle(document.documentElement).getPropertyValue('--color-gray');

let button = document.getElementById('button');
button.addEventListener("mouseover", function () {
  button.style.fontSize = '16px';
  button.style.backgroundColor = colorPurple;
  button.style.color = 'white';
});

button.addEventListener("mouseout", function () {
  button.style.fontSize = '10px';
  button.style.backgroundColor = colorBlue;
  button.style.color = 'white';
});

button.addEventListener("click", function() {
	document.querySelector('.bkgBlur').style.display = "flex";
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("content").innerHTML =
      this.responseText;
    }
  };
  xhttp.open("GET", "../README.md", true);
  xhttp.send();

});

document.querySelector('.close').addEventListener("mouseover", function() {
	document.querySelector('.close').style.color = colorGray;
});

document.querySelector('.close').addEventListener("mouseout", function() {
	document.querySelector('.close').style.color = '#333';
});

document.querySelector('.close').addEventListener("click", function() {
	document.querySelector('.bkgBlur').style.display = "none";
});

document.onkeydown = function(e) {
  // e = e || window.event;
    if (e.keyCode == 27 &&
        document.querySelector('.bkgBlur').style.display == "flex"
      ) {
      document.querySelector('.bkgBlur').style.display = "none";
    }
};
