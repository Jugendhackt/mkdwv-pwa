var modal = document.getElementsByClassName("modal")[0];

document.getElementById("butAdd").onclick = function() {
    modal.style.display = "block";
    //document.getElementById("content-add").innerHTML = "<h2>Hey!</h2>";
    document.getElementById("content-add").style.display = "block";
    document.getElementById("content-settings").style.display = "none";
    document.getElementById("content-highscore").style.display = "none";
}
document.getElementById("butSettings").onclick = function() {
    modal.style.display = "block";
    //document.getElementById("content-add").innerHTML = "<h2>Hey!</h2>";
    document.getElementById("content-add").style.display = "none";
    document.getElementById("content-settings").style.display = "block";
    document.getElementById("content-highscore").style.display = "none";
}
document.getElementById("butHighscore").onclick = function() {
    modal.style.display = "block";
    //document.getElementById("content-add").innerHTML = "<h2>Hey!</h2>";
    document.getElementById("content-add").style.display = "none";
    document.getElementById("content-settings").style.display = "none";
    document.getElementById("content-highscore").style.display = "block";
}

document.getElementsByClassName("close").onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
