var modal = document.getElementsByClassName("modal")[0];

document.getElementById("butAdd").onclick = () => {
  modal.style.display = "block";
  document.getElementById("content-add").style.display = "block";
  document.getElementById("content-settings").style.display = "none";
  document.getElementById("content-highscore").style.display = "none";
}
document.getElementById("butSettings").onclick = () => {
  modal.style.display = "block";
  document.getElementById("content-add").style.display = "none";
  document.getElementById("content-settings").style.display = "block";
  document.getElementById("content-highscore").style.display = "none";
}
document.getElementById("butHighscore").onclick = () => {
  modal.style.display = "block";
  document.getElementById("content-add").style.display = "none";
  document.getElementById("content-settings").style.display = "none";
  document.getElementById("content-highscore").style.display = "block";
};

// When the user clicks on <span> (x), close the modal
document.getElementsByClassName("close")[0].onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
