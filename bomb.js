var time, interval, siren;

document.addEventListener('DOMContentLoaded', function() {


  document.getElementById('reset').addEventListener('click', start);

});

function start() {
  addWireListeners();

  clearInterval(interval);
  time = 30;
  interval = setInterval(tick, 1000);

  this.textContent = "Try Again";

  document.getElementById('timer').textContent = time;
  document.getElementsByTagName('body')[0].classList.remove('exploded');
  document.getElementsByTagName('body')[0].classList.add('unexploded');

  document.getElementById('message').textContent = '';
  document.getElementById('timer').style.color = 'chartreuse';

  siren = document.getElementById('siren');
  siren.play();
}

function tick() {
  console.log('tick', time);
  time--;
  document.getElementById('timer').textContent = time;

  if (time === 4) {
    document.getElementById('timer').style.color = 'red';

  }

  if(time <= 0) {
    loseGame();
  }
}

function addWireListeners() {
  var wireImages = document.querySelectorAll('#box img');
  wireImages.forEach((wire) => {
    wire.addEventListener('click', clickWire);
    wire.setAttribute('data-cut', (Math.random() > 0.5).toString())
    console.log(wire);
    wire.src = './img/uncut-' + wire.id + '-wire.png';
  });

  if(checkWin()) {
    start();
  }
}

function removeWireListeners() {
  var wireImages = document.querySelectorAll('#box img');
  wireImages.forEach(wire => wire.removeEventListener('click', clickWire));
  }

function clickWire() {
  this.src = './img/cut-' + this.id + '-wire.png';
  this.removeEventListener('click', clickWire);

  if(this.getAttribute('data-cut') === 'true') {
    this.setAttribute('data-cut', 'false');
    document.getElementById('buzz').play();

    if(checkWin()){
      winGame();
    }

  } else {
    loseGame();
  }
}

function stopGame(message) {
  removeWireListeners();
  clearInterval(interval);
  siren.pause();
  document.getElementById('message').textContent = message;
}

function winGame() {
  stopGame('YAY, YOU SAVED US!!!');

  var cheer = document.getElementById('cheer');
  cheer.addEventListener('ended', function() {
    document.getElementById('success').play();
  });

  cheer.play();
}

function loseGame() {
  document.getElementsByTagName('body')[0].classList.remove('unexploded');
  document.getElementsByTagName('body')[0].classList.add('exploded');

  // play explosion noise
  var explodeSound = document.getElementById('explode');
  explodeSound.play();

  // Set some lose text
  stopGame('You have failed this city.');
}

function checkWin() {
  var wireImages = document.querySelectorAll('#box img');

  for( var i = 0; i < wireImages.length; i++) {
    if(wireImages[i].getAttribute('data-cut') === 'true') {
      return false;
    }
  }
  return true;
}
