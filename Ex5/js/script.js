

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
// Hacer dragable video-player
$(function () {
  $(".video-suggested-card").draggable({
    revert: true,
    iframeFix: true,
    cursor: "crosshair"
  });

  $(".video-player").droppable({
    drop: function (event, ui) {
      console.log(" " + event.target.firstElementChild.src + "\n" + ui.draggable.context.firstElementChild.firstElementChild.src);
      swapSrc(event.target.firstElementChild, ui.draggable.context.firstElementChild.firstElementChild)
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
// TODO: Change the information too
/* Part 4 */
