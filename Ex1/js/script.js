/*
 * Sets a new cookie, with name, value and days given.
 * W3Schools ©
 */
function setCookie(cookieName, cookieValue, expDays) {
  var d = new Date();
  d.setTime(d.getTime() + (expDays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires;
}

/*
 * Retuns the value of the cookie with the name given.
 * W3Schools ©
 */
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

/*
 * Deletes all the cookies stored of the document.
 * W3Schools ©
 */
function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

/*
 * Manages the login part. Gets the email and password and check if the email
 * is already in the cookies. If it is stored in the cookie, the form is filled,
 * if not, a new cookie with the email and password introduced is created.
 */
function submitLogin() {
  // Get email entered
  var userEmail = document.getElementById('login-email').value;
  // Get password entered
  var userPassword = document.getElementById('login-password').value;
  // Hide login modal
  document.getElementById('login-modal').style.display =  "none";
  // Check if email entered is known
  if (getCookie("email") != userEmail) {
    // New user! Delete old cookies
    deleteAllCookies();
    // Store new cookie for email
    setCookie("email", userEmail, 30);
    // Store new cookie for password
    setCookie("password", userPassword, 30);
  }
  // Load cookies data and fill the fotm
  loadCookiesData();
  // Update payment section
  changePaymentMethod();
}

/*
 * Fills the form with the data stored in the cookies.
 */
function loadCookiesData() {
  // Get the input and select elements of the form
  var formFields = document.getElementsByClassName('sections-container')[0].querySelectorAll('input, select');
  // Go through all the fields and change its value with the cookie data
  for (var i = 0; i < formFields.length; i++) {
    // Get the cookie with the same name as the field and change the value field
    formFields[i].value = getCookie(formFields[i].name);
    /* This is done for 'photo-path' field, as we want to show the photo itself
     * on the form, we have to change the source of 'profile-photo'. */
    if (formFields[i].name === "photo-path" && getCookie("photo-path") !== "") {
      $('#profile-photo').attr('src', getCookie("photo-path"));
    }
  }
}

/*
 * Stores the new data entered by the user in the form in new cookies, and alert
 * the user about the fields modified.
 */
function submitChanges() {
  // Get the input and select elements of the form
  var formFields = document.getElementsByClassName('sections-container')[0].querySelectorAll('input, select');
  // This will be store the name of the fields modified
  var changes = "";
  // Go through all the form fields
  for (var i = 0; i < formFields.length; i++) {
    // Check if it has been modified
    if (getCookie(formFields[i].name) != formFields[i].value) {
      // If so, save the name of the field modified...
      changes += "- " + formFields[i].name.capitalize() + "\n";
      // ...and store the new value
      setCookie(formFields[i].name, formFields[i].value, 30);
    }
  }
  // Show the modified fields to the user
  alert("Fields modified:\n" + changes);
  // Load the new data
  loadCookiesData();
}

/*
 * Changes the 'required' attribute to the credit card form fields.
 * True/False
 */
function toggleRequiredCreditCard(boolean) {
  var fields = document.getElementById('form-credit-card').getElementsByTagName('input');
  for (var i = 0; i < fields.length; i++) {
    fields[i].required = boolean;
  }
}

/*
 * Updates the payment icon and fields shown on the form.
 */
function changePaymentMethod() {
  // Resets the modal by removing the icon and hiding the fields
  $('#payment-icon').removeClass("fa-credit-card-alt");
  $('#payment-icon').removeClass("fa-cc-paypal");
  $('#payment-icon').removeClass("fa-bank");
  $('#form-credit-card').hide();
  $('#form-paypal').hide();
  $('#form-bank-transfer').hide();
  // Based on the method chosen, an icon and an element are shown
  switch ($('#payment-method').val()) {
    case "credit-card":
      $('#form-credit-card').show();
      $('#payment-icon').addClass("fa-credit-card-alt");
      toggleRequiredCreditCard(true);
      break;
    case "paypal":
      $('#form-paypal').show();
      $('#payment-icon').addClass("fa-cc-paypal");
      toggleRequiredCreditCard(false);
      break;
    case "bank-transfer":
      $('#form-bank-transfer').show();
      $('#payment-icon').addClass("fa-bank");
      toggleRequiredCreditCard(false);
      break;
    default:
  }
}

/*
 * Capitalizes a string.
 */
String.prototype.capitalize = function() {
  return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};
