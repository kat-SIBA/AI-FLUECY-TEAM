// const { default: axios } = require("axios");
const endpoint = "https://ai-jansibanyoni19249ai511706430474.openai.azure.com/";
const deploymentName = "gpt-4"; 
const apiKey =
"4EB4OyP21Rei0pdn8hkwqaVgYGmej9wScMNC3FWzwXbBPUQVvse8JQQJ99BEACHYHv6XJ3w3AAAAACOGa46T";
const version ="2023-05-15";

const url = `${endpoint}/openai/deployments/${deploymentName}/chat/completions?api-version=${version}`;


const chatHistory = [
  {
    role: "system",
    content: "You are a kind and empathetic recovery sponsor helping someone stay clean. Be encouraging, non-judgmental, and supportive."
  }
];

function addMessage(sender, message) {
  const chat = document.getElementById("chatMessages");
  const p = document.createElement("p");
  p.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chat.appendChild(p);
  chat.scrollTop = chat.scrollHeight; 
}

async function sendMessage() {
  console.log('Message sent');
  const inputField = document.getElementById("userinput");
  const userInput = inputField.value.trim();
  if (!userInput) return;

  addMessage("You", userInput);
  chatHistory.push({ role: "user", content: userInput });
  inputField.value = "";

  try {
    const response = await axios.post(url, {
      messages: chatHistory,
      max_tokens: 100
    }, {
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey
      }
    });

    const reply = response.data.choices[0].message.content.trim();
    chatHistory.push({ role: "assistant", content: reply });
    addMessage("RecoveryBot", reply);

    
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(reply);

    let hasSpoken = false;
    
    // Ensure voices are loaded
    let setVoiceAndSpeak = () => {
      if (hasSpoken) return; 
      const voices = synth.getVoices();
      
      const preferredVoice = voices.find(voice =>
        voice.name.toLowerCase().includes("female") ||
        voice.name.toLowerCase().includes("woman") ||
        voice.name.toLowerCase().includes("google us english") ||
        (voice.name.toLowerCase().includes("zira") && voice.lang === "en-US")
      );
    
      utterance.voice = preferredVoice || voices.find(v => v.lang === "en-US");
    
      utterance.rate = 0.95;   // Speed
      utterance.pitch = 1.05;  // Slightly more natural
      utterance.volume = 1;    // Full volume
      
      hasSpoken = true;
      synth.speak(utterance);
    };
    
    // If voices are loaded already
    if (synth.getVoices().length > 0) {
      setVoiceAndSpeak();
    } else {
      // Wait for voices to load
      synth.onvoiceschanged = setVoiceAndSpeak;
    }
    

  } catch (error) {
    addMessage("System", "❌ Error: " + (error.response?.data?.error?.message || error.message));
  }
}

document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM is fully loaded");

  // Ensure elements exist before adding event listeners
  const openChatBtn = document.querySelector("#openChatBtn");
  const closeChatBtn = document.querySelector("#closeChatBtn");
  const chatPopup = document.querySelector("#chatPopup");

  // Log to check if buttons and popup are found
  console.log("openChatBtn:", openChatBtn);
  console.log("closeChatBtn:", closeChatBtn);
  console.log("chatPopup:", chatPopup);

  sendBtn.addEventListener("click", sendMessage);

  // Open chat functionality
  openChatBtn.addEventListener("click", function() {
    console.log("Open chat clicked");
    chatPopup.classList.remove("hidden");
  });

  // Close chat functionality
  closeChatBtn.addEventListener("click", function() {
    console.log("Close chat clicked");
    chatPopup.classList.add("hidden");
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
});


