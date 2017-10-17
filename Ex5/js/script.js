

/* Part 1 */

function onLoginSubmit() {
  // Obtain the user and password entered in the modal popup
  var userEmail = document.getElementById('login-email').value
  var userPassword = document.getElementById('login-password').value

  // Hide modal
  document.getElementById('login-modal').style.display = 'none'

  // Check if it's the first time the user logs in
  if (getCookie('email') !== userEmail) {
    // Create a new cookie with the information of the user
    setCookie('email', userEmail, 30)
    setCookie('password', userPassword, 30)
  } else {
    loadDataOnCookie()
  }
}

function setCookie(cookieName, cookieValue, expDays) {
  var d = new Date()
  d.setTime(d.getTime() + (expDays * 24 * 60 * 60 * 1000))
  var expires = 'expires=' + d.toGMTString()
  document.cookie = cookieName + '=' + cookieValue + ';' + expires + ';path=/'
}

function getCookie(cookieName) {
  var name = cookieName + '='
  var decodedCookie = decodeURIComponent(document.cookie)
  var ca = decodedCookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

function loadDataOnCookie() {
  // TODO: load the name and the profile picture
}


/* Part 2 */

function onIconClick(buttonId) {
  // TODO: check if it works in other web browsers -apart from firefox-
  var textNode = document.getElementById(buttonId).lastChild

  if (textNode.previousSibling.className === 'fa fa-heart-o') {
    textNode.textContent = ' ' + addOne(textNode.textContent) + ' Likes '
  } else {
    textNode.textContent = ' ' + addOne(textNode.textContent) + ' Times Shared '
  }
}

function addOne(textToIncrement) {
  var number = parseInt(textToIncrement)
  return number + 1
}


/* Part 3 */

function onDragStartCard(ev) {
  document.getElementById('iframe').style = "pointer-events: none"
  ev.dataTransfer.setData('text/plain', ev.target.id)
}

function onDropCard(ev) {
  ev.preventDefault()
  
  var data = ev.dataTransfer.getData('text')
  var origin = document.getElementById(data)
  var destination = document.getElementById('iframe')
  // TODO: swap the images/URLs and information -title, etc-
  // TODO: add the possibility to swap the iframe with the related videos 
  // Elimino el nodo de related videos
  origin.firstChild.removeChild(this)


  destination.style = "pointer-events: enable"
}

function allowDrop(ev) {
  ev.preventDefault()
}

// TODO: cookies part
// TODO: show description when button '+' clicked
