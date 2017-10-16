var board = [$('#board-size').val()];
var timeLimit = $('#time-limit').val();
var n = 3;

function renderBoard() {
  n = $('#board-size').val();
  if(n >= 3 && n<=10) {
    document.getElementsByTagName('main')[0].innerHTML = "";
    for (var i = 0; i < n; i++) {
      document.getElementsByTagName('main')[0].innerHTML += '<div class="card"></div>';
    }
  }
}
