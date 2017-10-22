/* Part 1 */

function setCookie(cookieName, cookieValue, expDays) {
  var d = new Date();
  d.setTime(d.getTime() + (expDays * 24 * 60 * 60 * 1000));
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
// Hacer dragable video-player
$(function () {
  $(".video-suggested-card").draggable({
    revert: true,
    iframeFix: true,
    cursor: "crosshair"
  });

  $(".video-player").droppable({
    drop: function (event, ui) {
      swapSrc(event.target.firstElementChild, ui.draggable.context.firstElementChild.firstElementChild)
      // Con draggable.context tenemos el div con el img y la description
      // Con event.target.parentElement.parentElement tenemos la descripcion, el titulo y el iframe
      swapInfo(event.target.parentElement.previousElementSibling, ui.draggable.context)
    }
  });
});

function swapSrc(video, image) {
  var flutterVid = 'https://www.youtube.com/embed/RLyw-_MLLTo'
  var kotlinVid = 'https://www.youtube.com/embed/YbF8Q8LxAJs'
  var materialVid = 'https://www.youtube.com/embed/Q8TXgCzxEnw'
  var githubVid = 'https://www.youtube.com/embed/w3jLJU7DT5E'
  var flutterImg = "images/hqdefault.jpg"
  var kotlinImg = "images/hqdefault-2.jpg"
  var materialImg = "images/hqdefault-3.jpg"
  var githubImg = "images/hqdefault-4.jpg"

  switch (video.src) {
    case flutterVid:
      if (image.id === "img-kotlin") {
        video.src = kotlinVid
        video.parentNode
      } else if (image.id === "img-github") {
        video.src = githubVid
      } else {
        video.src = materialVid
      }
      image.src = flutterImg
      image.id = "img-flutter"

      break;
    case kotlinVid:
      if (image.id === "img-material") {
        video.src = materialVid
      } else if (image.id === "img-github") {
        video.src = githubVid
      } else {
        video.src = flutterVid
      }
      image.src = kotlinImg
      image.id = "img-kotlin"

      break;
    case materialVid:
      if (image.id === "img-github") {
        video.src = githubVid
      } else if (image.id === "img-flutter") {
        video.src = flutterVid
      } else {
        video.src = kotlinVid
      }
      image.src = materialImg
      image.id = "img-material"
      break;
    case githubVid:
      if (image.id === "img-flutter") {
        video.src = flutterVid
      } else if (image.id === "img-material") {
        video.src = materialVid
      } else {
        video.src = kotlinVid
      }
      image.src = githubImg
      image.id = "img-github"
      break;

    default:
      console.log("Error with img/vid swap!")
  }
}

function swapInfo(droppableElement, draggableElement) {
  var mainTitle = droppableElement.children[0].innerText //Title of the iframe section
  var mainFav = droppableElement.children[1].firstElementChild.innerText //Fav section 
  var mainText = droppableElement.children[1].lastElementChild.innerText //Description section
  var mainShares = droppableElement.children[1].lastElementChild.previousElementSibling.innerText //Shares section

  droppableElement.children[0].innerText = draggableElement.children[1].innerText //Title  
  droppableElement.children[1].firstElementChild.childNodes[2].textContent = draggableElement.children[3].innerText //Fav section 
  droppableElement.children[1].lastElementChild.firstElementChild.innerText = draggableElement.children[2].innerText//Description section
  droppableElement.children[1].lastElementChild.previousElementSibling.childNodes[2].textContent = draggableElement.children[4].innerText //Shares section
  
  draggableElement.children[1].firstChild.data = mainTitle
  draggableElement.children[2].innerText = mainText
  draggableElement.children[3].innerText = mainFav
  draggableElement.children[4].innerText = mainShares
}

/* Part 4 */

function openVideoInfo(event) {
  if (event.target.getAttribute("class") === "fa fa-minus-square-o") {
    event.target.offsetParent.children[2].style.display = "none"
    event.target.setAttribute("class", "fa fa-plus-square-o")
  } else {
    event.target.offsetParent.children[2].style.display = "block"
    //change the icon to a minus 
    event.target.setAttribute("class", "fa fa-minus-square-o")
  }
}
