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
  import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
  const auth = getAuth(app);

// submit button
const createAccount = document.getElementById("createAccount");
createAccount.addEventListener("click", function (event) {
  event.preventDefault();

  // inputs
  const fullName = document.getElementById("fullName").value;
  const emailLink = document.getElementById("emailLink").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const username = document.getElementById("username").value;
  const passwordLink = document.getElementById("passwordLink").value;

  createUserWithEmailAndPassword(auth, emailLink, passwordLink)
    .then((userCredential) => {
      // Signed up
        const user = userCredential.user;
        setDoc(doc(db, "users", user.uid), {
            fullName: fullName,
            phoneNumber: phoneNumber,
            username: username,
            emailLink: emailLink
        })
            .then(() => {
                alert("Creating Account...");
                window.location.href = "index.html";
            })
            .catch((error) => {
                console.error("Error storing user data. Please try again later")
            });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
});