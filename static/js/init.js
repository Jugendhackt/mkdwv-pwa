
console.log("Loading webtest...");
const webtestResult = webtest();

if(!webtestResult) {
  console.error("Webtest failed! Response: " + webtestResult);
  //alert("You are not connected to the internet!");
} else console.log("Webtest success!");
