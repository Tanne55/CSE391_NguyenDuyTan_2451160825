let randomNumber;
let attempts;

function startGame() {
  const roundsInput = prompt("Nhập số lần bạn muốn chơi:");
  const rounds = parseInt(roundsInput);

  if (roundsInput === null) {
    return; // User cancelled
  }

  if (isNaN(rounds) || rounds <= 0) {
    alert("Vui lòng nhập một số hợp lệ!");
    return;
  }

  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;

  playGame(rounds);
}

function playGame(maxAttempts) {
  while (attempts < maxAttempts) {
    const guessInput = prompt(
      `Nhập số bạn đoán (lần ${attempts + 1}/${maxAttempts}):`,
    );

    if (guessInput === null) {
      alert("Bạn đã hủy trò chơi!");
      return;
    }

    const userGuess = parseInt(guessInput);

    if (isNaN(userGuess)) {
      alert("Vui lòng nhập một số hợp lệ!");
      continue;
    }

    attempts++;

    if (userGuess === randomNumber) {
      alert(
        `Chúc mừng! Bạn đã đoán đúng số ${randomNumber} sau ${attempts} lần đoán.`,
      );
      return;
    } else if (userGuess < randomNumber) {
      alert("Số bạn đoán quá nhỏ. Hãy thử lại!");
    } else {
      alert("Số bạn đoán quá lớn. Hãy thử lại!");
    }
  }

  alert(`Bạn đã hết lượt đoán! Số đúng là ${randomNumber}.`);
}
function ResetGame() {
  const resetButton = document.getElementById("resetButton");
  resetButton.addEventListener("click", function () {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    alert("Trò chơi đã được đặt lại! Hãy bắt đầu đoán số mới.");
  });
}
window.addEventListener("load", function () {
  startGame();
});
