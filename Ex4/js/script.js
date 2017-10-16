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

function submitLogin() {
  var userEmail = document.getElementById('login-email').value;
  var userPassword = document.getElementById('login-password').value;
  document.getElementById('login-modal').style.display =  "none";
  if (getCookie("email") != userEmail) {
    setCookie("email", userEmail, 30);
    setCookie("password", userPassword, 30);
  }
  loadCookiesData();
  changePaymentMethod();
}

function loadCookiesData() {
  var formFields = document.getElementsByClassName('sections-container')[0].querySelectorAll('input, select');
  for (var i = 0; i < formFields.length; i++) {
    formFields[i].value = getCookie(formFields[i].name);
  }
}

function submitChanges() {
  var formFields = document.getElementsByClassName('sections-container')[0].querySelectorAll('input, select');
  var changes = "";
  for (var i = 0; i < formFields.length; i++) {
    if (getCookie(formFields[i].name) != formFields[i].value) {
      changes += "- " + formFields[i].name + "\n";
      setCookie(formFields[i].name, formFields[i].value, 30);
    }
  }
  alert("Fields modified:\n" + changes);
}

function changePaymentMethod() {
    $('#payment-icon').removeClass("fa-credit-card-alt");
    $('#payment-icon').removeClass("fa-cc-paypal");
    $('#payment-icon').removeClass("fa-bank");
    $('#form-credit-card').hide();
    $('#form-paypal').hide();
    $('#form-bank-transfer').hide();
    switch ($('#payment-method').val()) {
      case "credit-card":
        $('#form-credit-card').show();
        $('#payment-icon').addClass("fa-credit-card-alt");
        break;
      case "paypal":
        $('#form-paypal').show();
        $('#payment-icon').addClass("fa-cc-paypal");
        var fields = $('#form-credit-card').getElementsByTagName('input');
        for (var i = 0; i < fields.length; i++) {
          fields[i].prop('required', false);
        }
        break;
      case "bank-transfer":
        $('#form-bank-transfer').show();
        $('#payment-icon').addClass("fa-bank");
        break;
      default:
    }
  }
