/*
* This constant variables store the path to the photos used in the recent section of the videos and the youtube sources
* to play them in the iframe when dragged into it.
*/
var FLUTTER_VID = 'https://www.youtube.com/embed/RLyw-_MLLTo';
var KOTLIN_VID = 'https://www.youtube.com/embed/YbF8Q8LxAJs';
var MATERIAL_VID = 'https://www.youtube.com/embed/Q8TXgCzxEnw';
var GITHUB_VID = 'https://www.youtube.com/embed/w3jLJU7DT5E';
var FLUTTER_IMG = "images/hqdefault.jpg";
var KOTLIN_IMG = "images/hqdefault-2.jpg";
var MATERIAL_IMG = "images/hqdefault-3.jpg";
var GITHUB_IMG = "images/hqdefault-4.jpg";

/* Part 1 */
/**
 * This function gets the cookie identified by the @param
 * @param cookieName name of the identifier of th cookie being get
 * @returns {*} empty string if not found or all the fields stored in it
 */
function getCookie(cookieName) {
    var name = cookieName + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ''
}

/**
 * This function is called when the submit button is pressed on the modal, handling the cookies
 */
function submitLogin() {
    var userEmail = document.getElementById('login-email').value;
    // If this email is known, loads the data of the cookies and hide the modal
    if (getCookie("email") === userEmail) {
        loadCookiesData();
        document.getElementById('login-modal').style.display = "none";
    } else {
        // If not, user is redirected to exercise 1
        window.location = "Ex1/index.html";
    }
}

/**
 * This function loads the cookies and sets the profile picture and the username previously set
 */
function loadCookiesData() {
    $('#username').text(getCookie('username'));
    if (getCookie('photo-path') !== "" && getCookie('photo-path') !== null) {
        $('#user-photo').attr('src', getCookie('photo-path'));
    }
}

/* Part 2 */
/**
 * This function is called every time the fav icon or the share button is clicked.
 * It increases the counter next to it on the web page.
 * @param buttonId id of the icon calling this function on the html
 */
function onIconClick(buttonId) {
    /*Get the DOM node where the text and the number is displayed*/
    var textNode = document.getElementById(buttonId).lastChild;

    /*Check if the sibling of the text (the icon of it) is the fav button or the share button */
    if (textNode.previousSibling.className === 'fa fa-heart-o') {
        //Call the function addOne(string) -which returns an integer with the number of likes + 1-
        //and set the rest of the text
        textNode.textContent = ' ' + addOne(textNode.textContent) + ' Likes '
    } else {
        textNode.textContent = ' ' + addOne(textNode.textContent) + ' Times Shared '
    }
}

/**
 * Function that increases by one the number in the string passed as @param.
 * @param textToIncrement string containing the number to increase
 * @returns {number} integer with the number increase by one
 */
function addOne(textToIncrement) {
    var number = parseInt(textToIncrement);
    return number + 1
}

/* Part 3 */
$(function () {
    /**
     * JQuery selector that appends the property draggable to the class .video-suggested-card.
     * See JQuery API.
     */
    $(".video-suggested-card").draggable({
        // Property to make the draggable item to return to the initial position if not dropped in a droppable item
        revert: true,
        // Property that allows the dragged item to be dropped in an iframe -since the mouse events are handled
        // by default by the iframe-
        iframeFix: true,
        cursor: "crosshair"
    });

    $(".video-player").droppable({
        /**
         * Function that sets the property droppable to the item resultant of the query made.
         * @param event object that is being dropped into the droppable item
         * @param ui object that is receiving the element -the droppable item-
         */
        drop: function (event, ui) {
            // Call the function swapSrc() with the iframe node and the suggested video card node
            swapSrc(event.target.firstElementChild, ui.draggable.context.firstElementChild.firstElementChild);
            // Call the function swapInfo() with the container of the iframe, header and description and the card dragged
            swapInfo(event.target.parentElement.previousElementSibling, ui.draggable.context);
        }
    });
});

/**
 * This function swap the image of the dragged item with the image of the dropped item, while putting the youtube source
 * of the dragged item into the dropped item.
 * @param video node storing the iframe wrapper
 * @param image node storing the img wrapper
 */
function swapSrc(video, image) {
    /*
     * This switch handles all the possible cases of the current video being played on the iframe
     */
    switch (video.src) {
        case FLUTTER_VID:
            // Inside each case, the id of the element dragged is checked against all 4 possibilities
            if (image.id === "img-kotlin") {
                // Once found the id of the draggable, the video on the iframe is changed with the variable storing the
                // youtube video of it
                video.src = KOTLIN_VID;
            } else if (image.id === "img-github") {
                video.src = GITHUB_VID;
            } else {
                video.src = MATERIAL_VID;
            }
            // Set now the image of the draggable item to the one corresponding to the iframe from our variables
            image.src = FLUTTER_IMG;
            // Finally change the id to allow future swaps to be correctly handled
            image.id = "img-flutter";

            break;
        case KOTLIN_VID:
            if (image.id === "img-material") {
                video.src = MATERIAL_VID;
            } else if (image.id === "img-github") {
                video.src = GITHUB_VID;
            } else {
                video.src = FLUTTER_VID;
            }
            image.src = KOTLIN_IMG;
            image.id = "img-kotlin";

            break;
        case MATERIAL_VID:
            if (image.id === "img-github") {
                video.src = GITHUB_VID;
            } else if (image.id === "img-flutter") {
                video.src = FLUTTER_VID;
            } else {
                video.src = KOTLIN_VID;
            }
            image.src = MATERIAL_IMG;
            image.id = "img-material";
            break;
        case GITHUB_VID:
            if (image.id === "img-flutter") {
                video.src = FLUTTER_VID;
            } else if (image.id === "img-material") {
                video.src = MATERIAL_VID;
            } else {
                video.src = KOTLIN_VID;
            }
            image.src = GITHUB_IMG;
            image.id = "img-github";
            break;

        default:
            console.log("Error with img/vid swap!");
    }
}

/**
 * This function swaps the information of the title, the number of likes, the description and the number of shares
 * @param droppableElement div node containing all the sections with the information
 * @param draggableElement div with the card being dragged into the iframe
 */
function swapInfo(droppableElement, draggableElement) {
    // Create an aux variable storing the information of the iframe sections to use it to swap the info
    var mainTitle = droppableElement.children[0].innerText; //Title of the iframe section
    var mainFav = droppableElement.children[1].firstElementChild.innerText; //Fav section
    var mainText = droppableElement.children[1].lastElementChild.innerText; //Description section
    var mainShares = droppableElement.children[1].lastElementChild.previousElementSibling.innerText; //Shares section

    // Set the new information of the iframe
    droppableElement.children[0].innerText = draggableElement.children[1].innerText; //Title
    droppableElement.children[1].firstElementChild.childNodes[2].textContent = draggableElement.children[3].innerText; //Fav section
    droppableElement.children[1].lastElementChild.firstElementChild.innerText = draggableElement.children[2].innerText; //Description section
    droppableElement.children[1].lastElementChild.previousElementSibling.childNodes[2].textContent = draggableElement.children[4].innerText; //Shares section

    // Set the previously stored information to the cards sections
    draggableElement.children[1].firstChild.data = mainTitle;
    draggableElement.children[2].innerText = mainText;
    draggableElement.children[3].innerText = mainFav;
    draggableElement.children[4].innerText = mainShares;
}

/* Part 4 */
/**
 * This function is called when the plus icon on the suggested video cards is clicked, it displays the
 * description of the video
 * @param event object being clicked
 */
function openVideoInfo(event) {
    // Check the class of the item clicked (classes are the icons in this case) -a plus if the information is
    // undisplayed, or a minus if it is already displayed
    if (event.target.getAttribute("class") === "fa fa-minus-square-o") {
        // Hide the information setting the display property to none
        event.target.offsetParent.children[2].style.display = "none";
        // Change the icon to a plus, since the info is hidden
        event.target.setAttribute("class", "fa fa-plus-square-o");
    } else {
        // Show the description by changing the display type to block
        event.target.offsetParent.children[2].style.display = "block";
        // Change the icon to a minus, since the info is displayed
        event.target.setAttribute("class", "fa fa-minus-square-o");
    }
}
