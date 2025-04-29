document.addEventListener("DOMContentLoaded", function () {
  const signupBtn = document.getElementById("signUpbtn");

  if (!signupBtn) {
    console.error("signupBtn not found");
    return;
  }

  signupBtn.addEventListener("click", function () {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
  
    console.log("Email:",email);
    console.log("Password:",password);
    console.log("Confirmitory Password:",confirmPassword);





    if (password !== confirmPassword) {
      const errorMessage = document.getElementById("SignUpmessage");
      errorMessage.textContent = "Password does not match"
      errorMessage.classList.add("errorMessage")
      alert("Passwords do not match.");
      return;
    
    }else{
      alert ("Password Matches");
     const successMessage = document.getElementById("SignUpmessage");
      successMessage.textContent = "Passwords Matches";
      successMessage.classList.add("successMessage")

    }




    // auth.createUserWithEmailAndPassword(email, password)
    //   .then(() => {
    //     alert("Account created!");
    //     window.location.href = "dashboard.html";
    //   })
    //   .catch((error) => {
    //     alert(error.message);
    //   });
  });
});