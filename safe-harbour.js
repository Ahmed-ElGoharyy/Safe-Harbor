const supportedDomains = {
  "chat.openai.com": "ChatGPT",
  "chatgpt.com": "ChatGPT",
  "claude.ai": "Claude",
  "www.claude.ai": "Claude",
  "deepseek.com": "DeepSeek",
  "chat.deepseek.com": "DeepSeek",
  "gemini.google.com": "Gemini",
  "www.gemini.google.com": "Gemini"
};

let isEnabled = false;

const btn = document.getElementById("toggleBtn");
const status = document.getElementById("status");
const detectedMode = document.getElementById("detectedMode");

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (!tabs[0]) return;

  try {
    const hostname = new URL(tabs[0].url).hostname.toLowerCase();
    const detectedModel = supportedDomains[hostname];

    if (detectedModel) {
      btn.disabled = false;
      status.textContent = "DISABLED";
      detectedMode.textContent = `Detected model : ${detectedModel}`;
    } else {
      btn.disabled = true;
      status.textContent = "Not supported";
      detectedMode.textContent = "";
    }
  } catch (e) {
    btn.disabled = true;
    status.textContent = "Not supported";
    detectedMode.textContent = "";
  }
});

btn.addEventListener("click", () => {
  isEnabled = !isEnabled;

  if (isEnabled) {
    btn.textContent = "DISABLE";
    btn.classList.add("enabled");
    status.classList.add("active");
    status.textContent = "ENABLED";
  } else {
    btn.textContent = "ENABLE";
    btn.classList.remove("enabled");
    status.classList.remove("active");
    status.textContent = "DISABLED";
  }
});
