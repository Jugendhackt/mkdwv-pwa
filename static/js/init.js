
console.log("Loading webtest...");
const webtest = webtest();

if(!webtest) {
  console.error("Webtest failure! Not connected!");
  alert("You are not connected to the internet!");
} else console.log("Webtest success!");
