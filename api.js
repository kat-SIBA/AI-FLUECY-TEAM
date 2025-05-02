const endpoint = "https://ai-jansibanyoni19249ai511706430474.openai.azure.com/";
const deploymentName = "gpt-4"; 
const apiKey =
"4EB4OyP21Rei0pdn8hkwqaVgYGmej9wScMNC3FWzwXbBPUQVvse8JQQJ99BEACHYHv6XJ3w3AAAAACOGa46T";
const version ="2023-05-15";
const url = `${endpoint}/openai/deployments/${deploymentName}/chat/completions?api-version=${version}`;

function getTodayKey(userId) {
  const date = new Date().toISOString().split("T")[0];
  return `Motivation_${userId}_${date}`;
}

async function getMotivationalMessage(userId) {
  const storageKey = getTodayKey(userId);
  const cached = localStorage.getItem(storageKey);

  if (cached) {
    document.getElementById("motivationalMessage").innerText = cached;
    console.log("✅ Loaded from localStorage");
    return;
  }

  // Not cached, fetch from Azure
  await callAzureOpenAI(userId, storageKey);
}

async function callAzureOpenAI(userId, storageKey) {
  const prompt = "Give me a short, inspiring motivational quote for someone recovering from addiction.";

  try {
    const response = await axios.post(
      url,
      {
        messages: [{ role: "user", content: prompt }],
        max_tokens: 100,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      }
    );

    const message = response.data.choices[0].message.content.trim();
    document.getElementById("motivatinalMessage").innerText = message;
    localStorage.setItem(storageKey, message);
    console.log("💬 Message fetched and stored");
  } catch (error) {
    if (error.response) {
      console.error("❌ Full Error Response:", JSON.stringify(error.response.data, null, 2));
    } else {
      console.error("❌ Error:", error.message);
    }
    
  }
  }
  
  
  callAzureOpenAI();
