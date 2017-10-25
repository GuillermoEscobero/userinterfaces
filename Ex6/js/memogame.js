// Declare the variable timerId that will later be used as an Id for the timer
var timerId;

function startGame() {
    // Variable that will store the time spent by the user to complete the game
    var time;

    // We set the structure and functions that a memogame of this type will need
    var memogame = {

        /**
         * This function is called every time a new game is started, it creates the board, sets a timer, handles the
         * inputs, creates the cards and shuffles them randomly.
         */
        init: function () {
            // Clear the interval in case it has been previously set up -for example on a game restart-
            clearInterval(timerId);
            // Get the number of images and the time limit input by the user
            this.imagesNumber = $('#images-number').val();
            this.timeLimit = $('#time-limit').val();
            // Call the checkInput function and stop the game init in case there has been an error
            if(!this.checkInput()){ alert("Error in the input fields"); return;}
            // Query the board element
            this.$board = $("#board");
            // This selects the number of items from the array where we store our cards that has been
            // introduced by the user
            var cardsSubset = cards.slice(0, this.imagesNumber);
            // This merges twice the above created array in order to have two of each in the array -both pairs-
            this.cardsArray = $.merge(cardsSubset, cardsSubset);
            // Call shuffleCards function with the array containing the cards
            this.shuffleCards(this.cardsArray);
            // Call render board
            this.renderBoard();
            // Query all cards
            this.$memoryCards = $('.card');
            // Do the binding
            this.binding();
            // Set the timer
            this.timer();
        },

        /**
         * This function checks teh inputs by calling checkImagesNumber() and checkTimeLimit()
         * @returns {*} true if both fields are correct, false otherwise
         */
        checkInput: function () {
            return this.checkImagesNumber() && this.checkTimeLimit();
        },

        /**
         * This function checks the number of images set by the user on the web page
         * @returns {boolean} true if bigger or equal than 3 and smaller or equal than 10, false otherwise
         */
        checkImagesNumber: function () {
            return this.imagesNumber >= 3 && this.imagesNumber <= 10;
        },

        /**
         * This function checks teh tim elimit input by the user
         * @returns {boolean} true if bigger than 10 and less than 120, false otherwise
         */
        checkTimeLimit: function () {
            return this.timeLimit >= 10 && this.timeLimit <= 120;
        },

        /**
         * This function shuffles and stores the new cards in the @param array
         * @param cardsArray array where the cards to be shuffled are stored
         */
        shuffleCards: function (cardsArray) {
            this.$cards = $(this.shuffle(cardsArray));
        },

        /**
         * This function randomizes the elements of an array
         * @param array array to be shuffled
         * @returns {*} array already shuffled
         */
        shuffle: function (array) {
            var i = array.length, j, temp;
            while (--i > 0) {
                // Iterate through the array swapping the current index with one generated randomly
                j = Math.floor(Math.random() * (i + 1));
                temp = array[j];
                array[j] = array[i];
                array[i] = temp;
            }
            return array;
        },

        /**
         * This board generates the divs that contain each card with the images
         */
        renderBoard: function () {
            var boardHtml = '';
            this.$cards.each(function (i, card) {
                //
                boardHtml += '<div data-id="' + card.id + '" class="card"><div class="front"></div><div class="back"><img src="' + card.img + '" alt="' + card.name + '"></div></div>';
            });
            this.$board.html(boardHtml);
        },

        /**
         * This function adds a onclick listener to the cards, calling the function handleCardClick on each click, this
         * also updates the pairs-completed field below the board
         */
        binding: function () {
            this.$memoryCards.on('click', this.handleCardClick);
            $('button.start').html('RESET');
            $('#pairs-completed').html('Pairs completed: ' + 0);
        },

        /**
         * This function handles the click on every card during the game
         */
        handleCardClick: function () {
            // Query the clicked card
            var $selectedCard = $(this);
            // Query all cards that have been clicked
            var $selectedCards = $('.selected.card');
            // We check that the class "selected" is not in the clicked card
            if ($selectedCard.hasClass('selected') === false) {
                // We check that the max number of cards with the selected class is two -the user can only compare
                // two cards- if not, it means that the user has already tried with two cards and that they must be
                // flipped again because he failed, this is done by removing the class selected from all cards and
                // add it to the card clicked
                if ($selectedCards.length < 2) {
                    $selectedCard.addClass('selected');
                    var $selected = $selectedCards;
                    // This loop iterates through all the cards with the class selected to see if their id -if it is the
                    // same, they are a match- is the same
                    for (var index = 0; index < $selected.length; index++) {
                        var element = $selected[index];
                        if (element.getAttribute('data-id') === $selectedCard.attr('data-id') && element !== $selectedCard[0]) {
                            // Since it is a match, remove the class selected and add the class matched
                            element.classList.remove('selected');
                            element.classList.add('matched');
                            $selectedCard.removeClass('selected');
                            $selectedCard.addClass('matched');
                            // Increase the counter of pairs completed below the board
                            $('#pairs-completed').html('Pairs completed: ' + $('.matched').length / 2);
                        }
                    }
                } else {
                    $selectedCards.removeClass('selected');
                    $selectedCard.addClass('selected');
                }

            }
            // Check if the number of matched cards -correct ones- equals to the total number of cards, if true,
            // the user has won
            if ($('.matched').length === memogame.$memoryCards.length) {
                memogame.userWon();
            }
        },

        /**
         * This function sets a timer once the user clicks start, to end the game if it reaches the time limit the user
         * set as the input
         */
        timer: function () {
            // Parse the time string into an int
            time = parseInt(memogame.timeLimit);
            // Assign an interval to the timerId global variable and repeat the function inside it every 1000 milliseconds
            timerId = setInterval(function () {
                --time;

                // Calculate the number of minutes and seconds
                var minutes = Math.floor(time / (60));
                var seconds = Math.floor(time - minutes * 60);

                // Display the timer in the clock above the board
                $('#countdown').html(minutes + 'm ' + seconds + 's');

                // If the count down is finished, the user has lost
                if (time <= 0) {
                    // Clear the interval set and call the function userLost()
                    clearInterval(timerId);
                    memogame.userLost();
                }

            }, 1000);

        },

        /**
         * This function is called when the users wins, it stops the interval, quits the click listener of the cards and
         * shows an alert with the time the user spent completing the game
         */
        userWon: function () {
            clearInterval(timerId);
            this.$memoryCards.off('click');
            var minutes = Math.floor((memogame.timeLimit - time) / (60));
            var seconds = Math.floor((memogame.timeLimit - time)-minutes * 60);
            alert('You won in:\n' + minutes + 'm ' + seconds + 's');
        },

        /**
         * This function is called when the user lose the game, it flips all the remaining cards, quits the click
         * listener placed on the cards and shows an alert with a time expired
         */
        userLost: function () {
            $('#countdown').html('EXPIRED');
            this.$memoryCards.off('click');
            $('.card:not(.card.matched)').addClass('selected');
            alert('Time expired!\n');
        }

    };

    /*
     * This array stores all the different types of card with their images, id -which is an identifier- and the name
     */
    var cards = [
        {
            name: 'youtube',
            img: 'images/001-youtube.svg',
            id: 1
        },
        {
            name: 'yelp',
            img: 'images/002-yelp.svg',
            id: 2
        },
        {
            name: 'wordpress',
            img: 'images/003-wordpress.svg',
            id: 3
        },
        {
            name: 'wikipedia',
            img: 'images/004-wikipedia.svg',
            id: 4
        },
        {
            name: 'whatsapp',
            img: 'images/005-whatsapp.svg',
            id: 5
        },
        {
            name: 'vine',
            img: 'images/006-vine.svg',
            id: 6
        },
        {
            name: 'vimeo',
            img: 'images/007-vimeo.svg',
            id: 7
        },
        {
            name: 'twitter',
            img: 'images/008-twitter.svg',
            id: 8
        },
        {
            name: 'tumblr',
            img: 'images/009-tumblr.svg',
            id: 9
        },
        {
            name: 'trello',
            img: 'images/010-trello.svg',
            id: 10
        }
    ];

    // Call the init function that begins the construction of the game
    memogame.init();
}