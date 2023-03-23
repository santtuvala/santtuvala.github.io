
const images = ['7.png', 'apple.png', 'cherry.png', 'melon.png', 'pear.png'];

const moneyDisplay = document.getElementById('money');
const betInput = document.getElementById('bet');
const playButton = document.getElementById('play');
const slot1 = document.getElementById('slot1');
const slot2 = document.getElementById('slot2');
const slot3 = document.getElementById('slot3');
const slot4 = document.getElementById('slot4');
const resultDisplay = document.getElementById('result');
let hasWon = false;

const lockButtons = document.querySelectorAll('button[id^="lock"]');
const lockedImages = [];

window.addEventListener('load', function () {
  const slotIndices = [];
  for (let i = 0; i < 4; i++) {
    const index = Math.floor(Math.random() * images.length);
    slotIndices.push(index);
  }
  slot1.src = images[slotIndices[0]];
  slot2.src = images[slotIndices[1]];
  slot3.src = images[slotIndices[2]];
  slot4.src = images[slotIndices[3]];
});

function toggleLock(event) {
  const button = event.currentTarget;
  const slotId = button.previousElementSibling.id;
  const slotIndex = slotId.replace('slot', '') - 1;
  const isLocked = lockedImages.includes(slotIndex);
  if (isLocked) {
    const index = lockedImages.indexOf(slotIndex);
    lockedImages.splice(index, 1);
    button.textContent = 'Lock';
  } else {
    lockedImages.push(slotIndex);
    button.textContent = 'Unlock';
  }
}

lockButtons.forEach(button => button.addEventListener('click', toggleLock));

function spin() {
  const bet = parseInt(betInput.value);
  let money = parseInt(moneyDisplay.textContent);

  money -= bet;
  moneyDisplay.textContent = money;
  let spin1, spin2, spin3;
  if (lockedImages.includes(0)) {
    spin1 = images.indexOf(slot1.src.split('/').pop());
  } else {
    spin1 = Math.floor(Math.random() * images.length);
    slot1.src = images[spin1];
  }
  if (lockedImages.includes(1)) {
    spin2 = images.indexOf(slot2.src.split('/').pop());
  } else {
    spin2 = Math.floor(Math.random() * images.length);
    slot2.src = images[spin2];
  }
  if (lockedImages.includes(2)) {
    spin3 = images.indexOf(slot3.src.split('/').pop());
  } else {
    spin3 = Math.floor(Math.random() * images.length);
    slot3.src = images[spin3];
  }

  let spin4;
  if (lockedImages.includes(3)) {
    spin4 = images.indexOf(slot4.src.split('/').pop());
  } else {
    spin4 = Math.floor(Math.random() * images.length);
    slot4.src = images[spin4];
  }

  lockedImages.length = 0;
  lockButtons.forEach(button => button.textContent = 'Lock');

  let winAmount = 0;
  if (spin1 === spin2 && spin2 === spin3 && spin3 === spin4) {
    switch (spin1) {
      case 0: // 7
        winAmount = 10 * bet;
        break;
      case 1: // apple
        winAmount = 6 * bet;
        break;
      case 2: // cherry
        winAmount = 3 * bet;
        break;
      case 3: // melon
        winAmount = 5 * bet;
        break;
      case 4: // pear
        winAmount = 4 * bet;
        break;

    }

    money += winAmount;
    moneyDisplay.textContent = money;
    resultDisplay.textContent = `You won $${winAmount}!`;
    hasWon = true;
    lockButtons.forEach(button => {
      button.disabled = true;
    });
  } else {
    resultDisplay.textContent = 'Sorry, you did not win this time.';
    hasWon = false;
    lockButtons.forEach(button => {
      button.disabled = false;
    });
  }
}


playButton.addEventListener('click', spin);