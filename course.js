const endpoint = "https://ai-jansibanyoni19249ai511706430474.openai.azure.com/";
const deploymentName = "gpt-4"; 
const apiKey =
"4EB4OyP21Rei0pdn8hkwqaVgYGmej9wScMNC3FWzwXbBPUQVvse8JQQJ99BEACHYHv6XJ3w3AAAAACOGa46T";
const version ="2023-05-15";

const url = `${endpoint}/openai/deployments/${deploymentName}/chat/completions?api-version=${version}`;


async function fetchCourse() {
  const interests = document.getElementById("interests").value;
  const skills = document.getElementById("skills").value;
  const cacheKey = `${interests}_${skills}`;

  // Helper: Cache setter
  function setCache(key, value) {
    const cacheItem = {
      value,
      timestamp: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(cacheItem));
  }

  // Helper: Cache getter with expiry (24 hours)
  function getCache(key, maxAgeMinutes = 1440) {
    const item = JSON.parse(localStorage.getItem(key));
    if (!item) return null;

    const age = (Date.now() - item.timestamp) / 1000 / 60;
    if (age > maxAgeMinutes) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }


  const cached = getCache(cacheKey);
  if (cached) {
    console.log("✅ Loaded from cache");
    displayCourses(cached);
    return;
  }

  const prompt = `Recommend online courses for someone interested in ${interests} with a skill in ${skills}, aiming to build a strong CV.`;

  try {
    const response = await axios.post(url, {
      messages: [
        { role: "system", content: "You recommend helpful online courses based on interest and skill." },
        { role: "user", content: prompt }
      ],
      max_tokens: 150
    }, {
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey
      }
    });

    
    const reply = response.data.choices[0].message.content.trim();

    setCache(cacheKey, reply); 
    displayCourses(reply);

  } catch (error) {
    console.error("❌ Error Fetching courses:", error);
    document.getElementById("courseResults").innerText = "⚠️ Error fetching course suggestions. Please try again later.";
  }
}

function displayCourses(text) {
  const results = document.getElementById("courseResults");
  results.innerText = text;
}

function displayCourses(text) {
  const results = document.getElementById("courseResults");
  results.innerHTML = ""; 


 const lines = text.split(/\n|\d+\.\s*/)
       .map(line => line.replace(/^\*+\s*/, '').replace(/\*+$/, '' ))
       .filter(line =>line.trim() !== "");

  lines.forEach(line => {
    const li = document.createElement("li");
    li.textContent = line.trim();
    results.appendChild(li);
  });
}
