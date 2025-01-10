let timer;
let countdown = 10 * 60; // 10 minutes in seconds

document.getElementById('start-test').addEventListener('click', function() {
  const rollNumber = document.getElementById('roll-number').value;
  if (rollNumber) {
    document.querySelector('.login-section').style.display = 'none';
    document.getElementById('test-section').style.display = 'block';
    startTimer();
  } else {
    alert('कृपया रोल नंबर दर्ज करें');
  }
});

function startTimer() {
  timer = setInterval(function() {
    let minutes = Math.floor(countdown / 60);
    let seconds = countdown % 60;
    document.getElementById('timer').textContent = `समय: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    countdown--;

    if (countdown < 0) {
      clearInterval(timer);
      alert('समय समाप्त हो गया!');
      showResult();
    }
  }, 1000);
}

document.getElementById('submit-test').addEventListener('click', function() {
  clearInterval(timer);
  showResult();
});

function showResult() {
  document.getElementById('test-section').style.display = 'none';
  document.getElementById('result').style.display = 'block';
  document.getElementById('score').textContent = '100% (यह एक डेमो परिणाम है)';
}
