var modal = document.getElementsByClassName("modal")[0];


function displaySearch() {
    modal.style.display = "block";
    //document.getElementById("content-add").innerHTML = "<h2>Hey!</h2>";
    document.getElementById("content-search").style.display = "block";
    document.getElementById("content-add").style.display = "none";
    document.getElementById("content-settings").style.display = "none";
    document.getElementById("content-highscore").style.display = "none";
}
document.getElementById("butSearch").onclick = displaySearch;


function displayAdd() {
    modal.style.display = "block";
    //document.getElementById("content-add").innerHTML = "<h2>Hey!</h2>";
    document.getElementById("content-search").style.display = "none";
    document.getElementById("content-add").style.display = "block";
    document.getElementById("content-settings").style.display = "none";
    document.getElementById("content-highscore").style.display = "none";
}
document.getElementById("butAdd").onclick = displayAdd;

function displaySettings() {
    modal.style.display = "block";
    //document.getElementById("content-add").innerHTML = "<h2>Hey!</h2>";
    document.getElementById("content-search").style.display = "none";
    document.getElementById("content-add").style.display = "none";
    document.getElementById("content-settings").style.display = "block";
    document.getElementById("content-highscore").style.display = "none";
}
document.getElementById("butSettings").onclick = displaySettings;

function displayHighscore() {
    modal.style.display = "block";
    //document.getElementById("content-add").innerHTML = "<h2>Hey!</h2>";
    document.getElementById("content-search").style.display = "none";
    document.getElementById("content-add").style.display = "none";
    document.getElementById("content-settings").style.display = "none";
    document.getElementById("content-highscore").style.display = "block";
}
document.getElementById("butHighscore").onclick = displayHighscore;

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
