function onLoginSubmit() {
    //Obtain the user and password entered in the modal popup
    var userEmail = document.getElementById("login-email").value;
    var userPassword = document.getElementById("login-password").value;

    //Hide modal
    document.getElementById("login-modal").style.display = "none";

    //Check if it's the first time the user logs in
    if (getCookie("email") != userEmail) {
        //Create a new cookie with the information of the user
        setCookie("email", userEmail, 30);
        setCookie("password", userPassword, 30);
    }
    else {
        loadDataOnCookie();
    }
     
}

function setCookie(cookieName, cookieValue, expDays) {
    var d = new Date();
    d.setTime(d.getTime() + (expDays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
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

function loadDataOnCookie() {
    //TODO: load the name and the profile picture
}

function onButtonClick (buttonId) {
    //FIXME: esto han sido unos triplitos
    document.getElementById("fav-button").addEventListener("click",this,true);
    onclick(document.getElementById("fav-button").display = "none");
}