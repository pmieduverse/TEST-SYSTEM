<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PMI EDUVERSE टेस्ट</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>

  <div class="container">
    <h1>PMI EDUVERSE टेस्ट</h1>

    <div class="login-section">
      <label for="roll-number">रोल नंबर:</label>
      <input type="text" id="roll-number" placeholder="रोल नंबर दर्ज करें">
      <button id="start-test">टेस्ट शुरू करें</button>
    </div>

    <div class="test-section" id="test-section" style="display: none;">
      <h2>टेस्ट शुरू हो चुका है!</h2>
      <p id="timer">समय: 10:00</p>
      <button id="submit-test">टेस्ट सबमिट करें</button>
    </div>
    
    <div id="result" style="display: none;">
      <h2>आपका परिणाम: <span id="score"></span></h2>
    </div>
  </div>

  <!-- Firebase SDK -->
  <script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
    import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

    const firebaseConfig = {
      apiKey: "AIzaSyCxp_ZmfhwWX6pGGm0EXHvqMQgedtoh4yY",
      authDomain: "pmi-eduverse-test-system.firebaseapp.com",
      databaseURL: "https://pmi-eduverse-test-system-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "pmi-eduverse-test-system",
      storageBucket: "pmi-eduverse-test-system.firebasestorage.app",
      messagingSenderId: "501987575489",
      appId: "1:501987575489:web:930b61e3ce28f9a3c37640",
      measurementId: "G-6NK936W3MN"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

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
      const rollNumber = document.getElementById('roll-number').value;
      const score = '100% (यह एक डेमो परिणाम है)';
      saveResult(rollNumber, score);  // Save result to Firebase
      showResult();  // Show result on screen
    });

    function showResult() {
      document.getElementById('test-section').style.display = 'none';
      document.getElementById('result').style.display = 'block';
      document.getElementById('score').textContent = '100% (यह एक डेमो परिणाम है)';
    }

    function saveResult(rollNumber, score) {
      const resultRef = ref(database, 'results/' + rollNumber);
      set(resultRef, {
        score: score,
        timestamp: new Date().toISOString()
      }).then(() => {
        console.log("Result saved successfully!");
      }).catch((error) => {
        console.error("Error saving result: ", error);
      });
    }
  </script>

  <script src="script.js"></script>
</body>
</html>
