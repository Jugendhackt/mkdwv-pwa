function webtest() {
  var request = new XMLHttpRequest();
  request.open('GET', 'https://api.webtest.net/', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var resp = request.responseText;
      if(resp == 'OK') {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  };

  request.onerror = function() {
    return false
  };

  request.send();
}
