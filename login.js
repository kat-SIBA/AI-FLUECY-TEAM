import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
  const firebaseConfig = {
    apiKey: "AIzaSyAGaZKB4VAmQRV-wsJanZhEmTz5QNLBfD0",
    authDomain: "ai-fluency-1cd86.firebaseapp.com",
    projectId: "ai-fluency-1cd86",
    storageBucket: "ai-fluency-1cd86.firebasestorage.app",
    messagingSenderId: "230668708493",
    appId: "1:230668708493:web:48ade94203de75fa94d0c4"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Import and initialize Firebase Authentication
  import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
  const auth = getAuth(app);
// submit button
const logIn = document.getElementById("logIn");
logIn.addEventListener("click", function (event) {
  event.preventDefault();

  // inputs
  const emailLink = document.getElementById("emailLink")?.value || "";
  const passwordLink = document.getElementById("passwordLink")?.value || "";

  signInWithEmailAndPassword(auth, emailLink, passwordLink)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert("Logging in...");
      window.location.href = "login.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
        });
    });