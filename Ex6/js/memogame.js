var timeLimit = $('#time-limit').val();
var n;
var clicks = 0;
var icons = ["fa-rocket","fa-rocket", "fa-cloud", "fa-cloud", "fa-car", "fa-car", "fa-bolt", "fa-bolt", "fa-bomb", "fa-bomb", "fa-bug", "fa-bug", "fa-gift", "fa-gift", "fa-eye", "fa-eye", "fa-coffee", "fa-coffee", "fa-bell", "fa-bell"];
var previousCard;

Array.prototype.shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

function renderBoard() {
  n = $('#images-number').val();
  if(n >= 3 && n<=10) {
    n *= 2;
    var tiles = icons.slice(0, n);
    document.getElementsByTagName('main')[0].innerHTML = "";
    icons.shuffle();
    for (var i = 0; i < n; i++) {
      document.getElementsByTagName('main')[0].innerHTML += '<div id="' + i + '" onclick="handleCardClick()" class="card"><div class="front"></div><div class="back"><i class="icon fa ' + icons[i] + '"></i></div> </div>';
    }
    $(".card").flip();
  }
}

function handleCardClick() {
  if($(this).find('i.icon')[0].attr('class') == $('#' + previousCard).find('i.icon')[0].attr('class')) {
    $(this).flip(true);
    $('#' + previousCard).flip(true);
    $(this).attr('disabled', true);
    $('#' + previousCard).attr('disabled', true);
  }
  if(clicks <= 1) {
    $(".card").flip();
    previousCard = this.id;
  }else{
    $(".card").flip(false);
    clicks = 0;
    previousCard = null;
  }
  clicks++;
}
