const readline = require("readline");
const { default: axios } = require("axios");

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

const endpoint = "https://ai-jansibanyoni19249ai511706430474.openai.azure.com/";
const deploymentName = "gpt-4"; 
const apiKey =
"4EB4OyP21Rei0pdn8hkwqaVgYGmej9wScMNC3FWzwXbBPUQVvse8JQQJ99BEACHYHv6XJ3w3AAAAACOGa46T";
const version ="2023-05-15";
const url = `${endpoint}/openai/deployments/${deploymentName}/chat/completions?api-version=${version}`;

async function callAzureOpenAI() {
  const prompt = "Give me a short, inspiring motivational quote for someone recovering from addiction.";

  try {
    const response = await axios.post(url, {
      messages : [
        { role: 'user', 
          content: prompt}
      ],
      max_tokens: 100,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      }
    });



   
     const message = response.data.choices[0].message.content

    //  document.getElementById('motivatinalMessage').innerText =message;
    console.dir(response.data, { depth: null });

    //  console.log(response.data);
  }  catch (error) {
    if (error.response) {
      console.error("❌ Full Error Response:", JSON.stringify(error.response.data, null, 2));
    } else {
      console.error("❌ Error:", error.message);
    }
  }
  }
  
  
  const chatHistory = [
    {
      role: "system",
      content: "You are a kind and empathetic recovery sponsor helping someone stay clean. Be encouraging, non-judgmental, and supportive."
    }
  ];
  
  async function sendMessage(userInput) {
    chatHistory.push({ role: "user", content: userInput });
  
    try {
      const response = await axios.post(endpoint, {
        messages: chatHistory,
        max_tokens: 150
      }, {
        headers: {
          "Content-Type": "application/json",
          "api-key":apiKey
        }
      });
  
      const reply = response.data.choices[0].message.content.trim();
      chatHistory.push({ role: "assistant", content: reply });
      console.log(`\n🧠 Sponsor: ${reply}\n`);
  
      promptUser(); 
    } catch (error) {
      console.error("❌ Error:", error.response?.data || error.message);
      promptUser();  
    }
  }
  
  function promptUser() {
    rl.question("👤 You: ", (input) => {
      if (input.toLowerCase() === "exit") {
        rl.close();
      } else {
        sendMessage(input);
      }
    });
  }
  
  console.log("🤖 Sponsor Bot is here to support you. Type 'exit' to quit.");
 

callAzureOpenAI();

