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
  const inputField = document.getElementById("userInput");
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
    synth.speak(utterance);

  } catch (error) {
    addMessage("System", "❌ Error: " + (error.response?.data?.error?.message || error.message));
  }
}

document.getElementById("sendBtn").addEventListener("click", sendMessage);
