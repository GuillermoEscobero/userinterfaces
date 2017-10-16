

/* Part 1 */

function submitLogin() {
  var userEmail = document.getElementById('login-email').value;
  document.getElementById('login-modal').style.display =  "none";
  if (getCookie("email") != userEmail) {
    window.location = "../Ex4/index.html";
  } else {
    loadCookiesData();
  }
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

function loadCookiesData() {
  document.getElementById('username').innerHTML = getCookie('username');
  $('#user-photo').attr('src', getCookie('photo-path'));
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


  destination.style = "pointer-events: enable"
}

function allowDrop(ev) {
  ev.preventDefault()
}

function setSrc(element, URL) {
  if (element.id === 'img-flutter') {

  }
  element.src = URL
}

function getSrc (element) {
  return element.src
}


// TODO: show description when button '+' clicked
