

/* Part 1 */

function setCookie(cookieName, cookieValue, expDays) {
  var d = new Date();
  d.setTime(d.getTime() + (expDays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires;
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

function submitLogin() {
  var userEmail = document.getElementById('login-email').value;
  
  if (getCookie("email") == userEmail) {
    loadCookiesData();
    document.getElementById('login-modal').style.display = "none";
  } else {
    window.location = "Ex4/index.html";
  }
}

function loadCookiesData() {
  $('#username').text(getCookie('username'));
  if (getCookie('photo-path') !== "" && getCookie('photo-path') != null) {
    $('#user-photo').attr('src', getCookie('photo-path'));
  }
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
  ev.dataTransfer.setData('text/plain', ev.target.id)
  // FIXME: temporal call to the function, it is supposed to be in the onload part
  deactivateIframePointerEvents()
}

function onDropCard(ev) {
  ev.preventDefault()

  var data = ev.dataTransfer.getData('text') //related video id
  var nodeToInsert = document.getElementById(data) //node of the related video
  var nodeToRemove = ev.target.firstElementChild //node of the iframe

  // TODO: swap the images/URLs and information -title, etc-
  // TODO: add the possibility to swap the iframe with the related videos 
  var nodeToInsertCopy = nodeToInsert

  nodeToInsert.src = convertToImg(nodeToRemove)
  nodeToRemove.src = convertToVideo(nodeToInsertCopy)
  swapIds(nodeToRemove, nodeToInsert)

}

function allowDrop(ev) {
  ev.preventDefault()
}

function convertToImg(node) {
  if (node.src == 'https://www.youtube.com/embed/RLyw-_MLLTo') {
    return '/images/hqdefault.jpg'
  } else if (node.src == 'https://www.youtube.com/embed/YbF8Q8LxAJs') {
    return '/images/hqdefault-2.jpg'
  } else if (node.src == 'https://www.youtube.com/embed/Q8TXgCzxEnw') {
    return '/images/hqdefault-3.jpg'
  } else {
    return '/images/idphoto.png'
  }
}

function convertToVideo(node) {
  if (node.src == 'images/hqdefault.jpg') {
    return 'https://www.youtube.com/embed/RLyw-_MLLTo'
  } else if (node.src == 'images/hqdefault-2.jpg') {
    return 'https://www.youtube.com/embed/YbF8Q8LxAJs'
  } else if (node.src == 'images/hqdefault-3.jpg') {
    return 'https://www.youtube.com/embed/Q8TXgCzxEnw'
  } else {
    return 'https://www.youtube.com/embed/w3jLJU7DT5E'
  }
}

  function swapIds(nodeA, nodeB) {
    nodeA.setAttribute("id", nodeB.id)
    nodeB.setAttribute("id", nodeA.id) //javascript pasa por referencia
  }

  function deactivateIframePointerEvents() {
    document.getElementById('iframe').style = 'pointer-events: none'
  }

/* Part 4 */

function openVideoInfo(ev){
  ev
}
