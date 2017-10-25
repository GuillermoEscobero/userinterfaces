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
            clearInterval(timerId);
            this.imagesNumber = $('#images-number').val();
            this.timeLimit = $('#time-limit').val();
            if(!this.checkInput()){ alert("Error in the input fields"); return;}
            this.$board = $("#board");
            var cardsSubset = cards.slice(0, this.imagesNumber);
            this.cardsArray = $.merge(cardsSubset, cardsSubset);
            this.shuffleCards(this.cardsArray);
            this.renderBoard();
            this.$memoryCards = $('.card');
            this.binding();
            this.timer();
        },

        /**
         *
         * @returns {*}
         */
        checkInput: function () {
            return this.checkImagesNumber() && this.checkTimeLimit();
        },

        /**
         *
         * @returns {boolean}
         */
        checkImagesNumber: function () {
            return this.imagesNumber >= 3 && this.imagesNumber <= 10;
        },

        /**
         *
         * @returns {boolean}
         */
        checkTimeLimit: function () {
            return this.timeLimit >= 10 && this.timeLimit <= 120;
        },

        /**
         *
         * @param cardsArray
         */
        shuffleCards: function (cardsArray) {
            this.$cards = $(this.shuffle(cardsArray));
        },

        /**
         *
         * @param array
         * @returns {*}
         */
        shuffle: function (array) {
            var i = array.length, j, temp;
            while (--i > 0) {
                j = Math.floor(Math.random() * (i + 1));
                temp = array[j];
                array[j] = array[i];
                array[i] = temp;
            }
            return array;
        },

        /**
         *
         */
        renderBoard: function () {
            var boardHtml = '';
            this.$cards.each(function (i, card) {
                boardHtml += '<div data-id="' + card.id + '" class="card"><div class="front"></div><div class="back"><img src="' + card.img + '" alt="' + card.name + '"></div></div>';
            });
            this.$board.html(boardHtml);
        },

        /**
         *
         */
        binding: function () {
            this.$memoryCards.on('click', this.handleCardClick);
            $('button.start').html('RESET');
            $('#pairs-completed').html('Pairs completed: ' + 0);
        },

        /**
         *
         */
        handleCardClick: function () {
            var $selectedCard = $(this);
            var $selectedCards = $('.selected.card');
            if ($selectedCard.hasClass('selected') === false) {
                if ($selectedCards.length < 2) {
                    $selectedCard.addClass('selected');
                    var $selected = $selectedCards;
                    for (var index = 0; index < $selected.length; index++) {
                        var element = $selected[index];
                        if (element.getAttribute('data-id') === $selectedCard.attr('data-id') && element !== $selectedCard[0]) {
                            element.classList.remove('selected');
                            element.classList.add('matched');
                            $selectedCard.removeClass('selected');
                            $selectedCard.addClass('matched');
                            $('#pairs-completed').html('Pairs completed: ' + $('.matched').length / 2);
                        }
                    }
                } else {
                    $selectedCards.removeClass('selected');
                    $selectedCard.addClass('selected');
                }

            }
            if ($('.matched').length === memogame.$memoryCards.length) {
                memogame.userWon();
            }
        },

        /**
         *
         */
        timer: function () {
            // Update the countdown every 1 second
            time = parseInt(memogame.timeLimit);
            timerId = setInterval(function () {
                //INFO: Esto va aqui porque si no tarda 1 segundo mas de lo que deberia (en lo que ejecuta la funcion y tal)
                --time;

                // Time calculations for minutes and seconds
                var minutes = Math.floor(time / (60));
                var seconds = Math.floor(time - minutes * 60);

                // Display the result
                $('#final-countdown-ninonino').html(minutes + 'm ' + seconds + 's');

                // If the count down is finished, do something
                if (time <= 0) {
                    clearInterval(timerId);
                    memogame.userLost();
                }

            }, 1000);

        },

        /**
         *
         */
        userWon: function () {
            clearInterval(timerId);
            this.$memoryCards.off('click');
            var minutes = Math.floor((memogame.timeLimit - time) / (60));
            var seconds = Math.floor((memogame.timeLimit - time)-minutes * 60);
            alert('You won in:\n' + minutes + 'm ' + seconds + 's');
        },

        /**
         *
         */
        userLost: function () {
            $('#final-countdown-ninonino').html('EXPIRED');
            this.$memoryCards.off('click');
            $('.card:not(.card.matched)').addClass('selected');
            alert('Time expired!\n');
        }

    };

    /*
     *
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

    memogame.init();
}