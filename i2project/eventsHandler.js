//event list for info
let colorBlue = getComputedStyle(document.documentElement).getPropertyValue('--color-blue');
let colorPurple = getComputedStyle(document.documentElement).getPropertyValue('--color-purple');
let colorGray = getComputedStyle(document.documentElement).getPropertyValue('--color-gray');

let buttonReadme = document.getElementById('buttonInfo');
buttonReadme.addEventListener("mouseover", function () {
  buttonReadme.classList.remove('button');
  buttonReadme.classList.add('buttonHover');
});

buttonReadme.addEventListener("mouseout", function () {
  buttonReadme.classList.remove('buttonHover');
  buttonReadme.classList.add('button');
});

buttonReadme.addEventListener("click", function() {
	document.querySelectorAll('.bkgBlur')[0].style.display = "flex";
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

let buttonReset = document.getElementById('buttonwReset');

buttonReset.addEventListener("mouseover", function () {
  buttonReset.classList.remove('button');
  buttonReset.classList.add('buttonHover');
});

buttonReset.addEventListener("mouseout", function () {
  buttonReset.classList.remove('buttonHover');
  buttonReset.classList.add('button');
});

buttonReset.addEventListener("click", function() {
  document.querySelectorAll('.bkgBlur')[1].style.display = "flex";
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("cc").innerHTML =
      this.responseText;
    }
  };
  xhttp.open("GET", "../instructions.md", true);
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

document.querySelectorAll('.close')[1].addEventListener("mouseout", function() {
	document.querySelectorAll('.close')[1].style.color = '#333';
});

document.querySelectorAll('.close')[1].addEventListener("click", function() {
	document.querySelectorAll('.bkgBlur')[1].style.display = "none";
});


document.onkeydown = function(e) {
    if (e.keyCode == 27 && document.querySelector('.bkgBlur').style.display == "flex") {
        document.querySelector('.bkgBlur').style.display = "none";
    }
};
