import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
  const firebaseConfig = {
    apiKey: "AIzaSyAGaZKB4VAmQRV-wsJanZhEmTz5QNLBfD0",
    authDomain: "ai-fluency-1cd86.firebaseapp.com",
    projectId: "ai-fluency-1cd86",
    storageBucket: "ai-fluency-1cd86.firebasestorage.app",
    messagingSenderId: "230668708493",
    appId: "1:230668708493:web:48ade94203de75fa94d0c4"
  };

  const app = initializeApp(firebaseConfig);

  // Import and initialize Firestore
  import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
  const db = getFirestore(app);

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
                window.location.href = "dashboard.html";
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