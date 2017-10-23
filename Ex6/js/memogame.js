// var timeLimit = $('#time-limit').val();
// var n;
// var clicks = 0;

// var cards = [
//   {
//     name: "youtube",
//     img: "images/001-youtube.svg",
//     id: 1
//   },
//   {
//     name: "yelp",
//     img: "images/002-yelp.svg",
//     id: 2
//   },
//   {
//     name: "wordpress",
//     img: "images/003-wordpress.svg",
//     id: 3
//   },
//   {
//     name: "wikipedia",
//     img: "images/004-wikipedia.svg",
//     id: 4
//   },
//   {
//     name: "whatsapp",
//     img: "images/005-whatsapp.svg",
//     id: 5
//   },
//   {
//     name: "vine",
//     img: "images/006-vine.svg",
//     id: 6
//   },
//   {
//     name: "vimeo",
//     img: "images/007-vimeo.svg",
//     id: 7
//   },
//   {
//     name: "twitter",
//     img: "images/008-twitter.svg",
//     id: 8
//   },
//   {
//     name: "tumblr",
//     img: "images/009-tumblr.svg",
//     id: 9
//   },
//   {
//     name: "trello",
//     img: "images/010-trello.svg",
//     id: 10
//   }
// ];

// Array.prototype.shuffle = function(){
//     var i = this.length, j, temp;
//     while(--i > 0){
//         j = Math.floor(Math.random() * (i+1));
//         temp = this[j];
//         this[j] = this[i];
//         this[i] = temp;
//     }
// };

// function renderBoard() {
//   n = $('#images-number').val();
//   if(n >= 3 && n <=10) {
//     var cardsSubset = cards.slice(0, n);
//     var tiles = $.merge(cardsSubset, cardsSubset);
//     tiles.shuffle();
//     document.getElementById('game').innerHTML = "";
//     for (var i = 0; i < tiles.length; i++) {
//       document.getElementById('game').innerHTML += '<div data-id="' + tiles[i].id + '" onclick="handleCardClick(this)" class="card"><div class="front"></div><div class="back"><img src="' + tiles[i].img + '" alt="' + tiles[i].name + '"></div></div>';
//     }
//     $(".card").flip({trigger: 'manual'});
//   }
// }

// $(document).ready(function () {
//   this.$(".card").on('click', handleCardClick());
// });

// function handleCardClick() { // TODO: Por que no le pasas el evento?
//   var card = $(this);
//   if (card.attr('class') != "selected") {
//     $(this).flip(true);
//     $(this).addClass('selected');
//   } else {
//     $(this).flip(false);
//     $(this).removeClass('selected');
//   }

//   if (card.attr(data-id) == $('.selected').attr(data-id)) {
//     card.addClass('matched');
//     $('.selected').addClass('matched');
//     card.removeClass('selected');
//     $('.selected').removeClass('selected');
//   }
// }

// function handleCardClick() {
//   if($(this).find('i.icon')[0].attr('class') == $('#' + previousCard).find('i.icon')[0].attr('class')) {
//     $(this).flip(true);
//     $('#' + previousCard).flip(true);
//     $(this).attr('disabled', true);
//     $('#' + previousCard).attr('disabled', true);
//   }
//   if(clicks <= 1) {
//     $(".card").flip();
//     previousCard = this.id;
//   }else{
//     $(".card").flip(false);
//     clicks = 0;
//     previousCard = null;
//   }
//   clicks++;
// }

function startGame() {
  var memogame = {

    init: function() {
      this.$board = $("#board");
      this.$modal = $("#modal");
      var cardsSubset = cards.slice(0, $('#images-number').val());
      this.cardsArray = $.merge(cardsSubset, cardsSubset);
      this.shuffleCards(this.cardsArray);
      this.renderBoard();
      this.$memoryCards = $(".card");
      this.binding();
    },

    shuffleCards: function(cardsArray) {
      this.$cards = $(this.shuffle(this.cardsArray));
    },

    shuffle: function(array) {
      var i = array.length, j, temp;
      while(--i > 0){
          j = Math.floor(Math.random() * (i+1));
          temp = array[j];
          array[j] = array[i];
          array[i] = temp;
      }
      return array;
    },

    renderBoard: function() {
      var boardHtml = "";
      this.$cards.each(function(i, card) {
        boardHtml += '<div data-id="' + card.id + '" class="card"><div class="front"></div><div class="back"><img src="' + card.img + '" alt="' + card.name + '"></div></div>';
      });
      this.$board.html(boardHtml);
    },

    binding: function() {
      this.$memoryCards.on("click", this.handleCardClick);
    },

    handleCardClick: function () {
      this
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
