function startGame() {
    var memogame = {

        init: function () {
            this.imagesNumber = $('#images-number').val();
            this.timeLimit = $('#time-limit').val();
            if(!this.checkInput()){ alert("Puto subnormal"); return;}
            this.$board = $("#board");
            this.$modal = $("#modal");
            var cardsSubset = cards.slice(0, $('#images-number').val());
            this.cardsArray = $.merge(cardsSubset, cardsSubset);
            this.shuffleCards(this.cardsArray);
            this.renderBoard();
            this.$memoryCards = $(".card");
            this.binding();
        },

        checkInput: function() {
            return this.checkImagesNumber() && this.checkTimeLimit();
        },

        checkImagesNumber: function() {
            if(this.imagesNumber >= 3 && this.imagesNumber <= 10) {
                return true;
            } else {
                return false;
            }
        },

        checkTimeLimit: function() {
            if(this.timeLimit >= 10 && this.timeLimit <= 120) {
                return true;
            } else {
                return false;
            }
        },

        shuffleCards: function (cardsArray) {
            this.$cards = $(this.shuffle(cardsArray));
        },

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

        renderBoard: function () {
            var boardHtml = "";
            this.$cards.each(function (i, card) {
                boardHtml += '<div data-id="' + card.id + '" class="card"><div class="front"></div><div class="back"><img src="' + card.img + '" alt="' + card.name + '"></div></div>';
            });
            this.$board.html(boardHtml);
        },

        binding: function () {
            this.$memoryCards.on("click", this.handleCardClick);
        },

        handleCardClick: function () {
            var $selectedCard = $(this);
            var $selectedCards = $(".selected.card");
            if ($selectedCard.hasClass("selected") === false) {
                if ($selectedCards.length < 2) {
                    $selectedCard.addClass("selected");
                    var $selected = $selectedCards;
                    for (var index = 0; index < $selected.length; index++) {
                        var element = $selected[index];
                        if (element.getAttribute("data-id") === $selectedCard.attr("data-id") && element !== $selectedCard[0]) {
                            element.classList.remove('selected');
                            element.classList.add('matched');
                            $selectedCard.removeClass('selected');
                            $selectedCard.addClass('matched');
                        }
                    }
                } else {
                    $selectedCards.removeClass('selected');
                    $selectedCard.addClass("selected");
                }

            }
            if ($(".matched").length === memogame.$memoryCards.length) {
                alert("Ganaste wey");
            }
        }


    };

    var cards = [
        {
            name: "youtube",
            img: "images/001-youtube.svg",
            id: 1
        },
        {
            name: "yelp",
            img: "images/002-yelp.svg",
            id: 2
        },
        {
            name: "wordpress",
            img: "images/003-wordpress.svg",
            id: 3
        },
        {
            name: "wikipedia",
            img: "images/004-wikipedia.svg",
            id: 4
        },
        {
            name: "whatsapp",
            img: "images/005-whatsapp.svg",
            id: 5
        },
        {
            name: "vine",
            img: "images/006-vine.svg",
            id: 6
        },
        {
            name: "vimeo",
            img: "images/007-vimeo.svg",
            id: 7
        },
        {
            name: "twitter",
            img: "images/008-twitter.svg",
            id: 8
        },
        {
            name: "tumblr",
            img: "images/009-tumblr.svg",
            id: 9
        },
        {
            name: "trello",
            img: "images/010-trello.svg",
            id: 10
        }
    ];

    memogame.init();
}


//TODO: timer, when win (restart button, time used), pairs found during game