function rectangularCollision({rectangular1, rectangular2}) {
    return (
        rectangular1.attackBox.position.x + rectangular1.attackBox.width >= rectangular2.position.x && 
        rectangular1.attackBox.position.x <= rectangular2.position.x + rectangular2.attackBox.width &&
        rectangular1.attackBox.position.y + rectangular1.attackBox.height >= rectangular2.position.y &&
        rectangular1.attackBox.position.y <= rectangular2.position.y + rectangular2.attackBox.height 
    );
};

function determineWinner({ player, enemy, timerId }) {
    clearTimeout(timerId)
    audio.pause();
    soundWinner.play();
    document.querySelector('#displayText').style.display = 'flex'
    if (player.health === enemy.health) {
      document.querySelector('#displayText').innerHTML = 'Time Out'
    } else if (player.health > enemy.health) {
      document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
    } else if (player.health < enemy.health) {
      document.querySelector('#displayText').innerHTML = 'Player 2 Wins'
    }
  }
  
  let timer = 60
  let timerId
  function decreaseTimer() {
    if (timer > 0) {
      timerId = setTimeout(decreaseTimer, 1000)
      timer--
      document.querySelector('#timer').innerHTML = timer
    }
  
    if (timer === 0) {
      determineWinner({ player, enemy, timerId })
    }
  }