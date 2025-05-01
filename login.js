import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
  const firebaseConfig = {
    apiKey: "process.env.API_KEY",
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: "process.env.STORAGE_BUCKET",
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
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
      window.location.href = "index.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
        });
    });