function setCookie(cookieName, cookieValue, expDays) {
  var d = new Date();
  d.setTime(d.getTime() + (expDays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

function getCookie(cookieName) {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookies() {
  var userEmail = getCookie("email");
  if (userEmail != "") {
    document.getElementById('login-modal').style.display =  "none";
    loadCookiesData();
  }
}

function submitLogin() {
  var loginInputs = document.getElementById('login-modal');
  var userEmail = loginInputs.getElementsByName('email');
  var userPassword = loginInputs.getElementsByName('password');
  setCookie("email", userEmail, 30);
  setCookie("password", userPassword, 30);
  loadCookiesData();
}

function loadCookiesData() {
  var fields = ['username', 'password', 'fullname', 'email', 'bday',
   'language', 'photo-path', 'address', 'payment-method', 'card-number',
   'card-valid', 'card-csv'];
  var formFields = document.getElementsByClassName('sections-container')[0].getElementsByTagName('input');
  console.log(formFields);
  for (var field in fields) {
    formFields.getElementsByName(field)[0].value = getCookie(field);
  }
}
