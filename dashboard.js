
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
  import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
  import {
    getFirestore,
    doc,
    getDoc,
    collection,
    getDocs
  } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyAGaZKB4VAmQRV-wsJanZhEmTz5QNLBfD0",
    authDomain: "ai-fluency-1cd86.firebaseapp.com",
    projectId: "ai-fluency-1cd86",
    storageBucket: "ai-fluency-1cd86.firebasestorage.app",
    messagingSenderId: "230668708493",
    appId: "1:230668708493:web:48ade94203de75fa94d0c4"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const userName = document.getElementById('userName');
  const progress = document.getElementById('progress'); 
  const progressText = document.getElementById('progress-text');
  const completedDays = document.getElementById('completedDays');
  const tasksList = document.getElementById('tasksList');
  const logoutButton = document.getElementById('logout');

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userId = user.uid;

      try {
        if (!userId) {
          console.error("User ID is undefined or null.");
          return;
        }
        const userDocRef = doc(db, 'users', userId);
        const userDocSnap = await getDoc(userDocRef);
        const userData = userDocSnap.data();

        userName.innerText = userData.fullName || "";

        
        const completedTasks = userData.completedTasks || 0;
        const totalTasks = 75;
        const progressPercentage = (completedTasks / totalTasks) * 100;
        progress.style.width = `${progressPercentage}%`;
        progressText.innerText = `You have completed ${completedTasks} out of ${totalTasks} days.`;
        completedDays.innerText = completedTasks;

            const tasksRef = collection(db, 'users', user.uid, 'tasks');
            const snapshot = await getDocs(tasksRef);
            snapshot.forEach(taskDoc => {
                const listItem = document.createElement('li');
                listItem.textContent = taskDoc.data().taskName;
                tasksList.appendChild(listItem);
            });
        }catch (error) {
          console.error("Error fetching user data:", error);
        }
    
    logoutButton.addEventListener('click', () =>{
        auth.signOut().then(() => {
            console.log("User logged Out"),
            window.location.href = "login.html";
        }) .catch(error => {
            console.error("Error logging out", error)
        });
    });
    }
  });
  
    let currentUser;

    onAuthStateChanged(auth, user => {
        if (user) {
            currentUser = user;
            loadMoodLog(currentUser.uid);
        }
    });

    async function loadMoodLog(uid){
        const moodRef = collection(db, 'users', uid, 'moods');
        const logContainer = document.getElementById('log-entries');
        logContainer.innerHTML = '';
        const snapshot = await getDocs(moodRef);
        snapshot.forEach(doc => {
            const entry = doc.data();
            const div = document.createElement('div')
            div.classList.add('entry');
            div.textContent = `${entry.mood} - ${entry.timestamp?.toDate().toLocaleString() || 'Just now'}`;
            logContainer.appendChild(div);
        
        });
    }