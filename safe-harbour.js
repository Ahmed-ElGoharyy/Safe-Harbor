const supportedDomains = {
  "chat.openai.com": true,
  "chatgpt.com": true,
  "claude.ai": true,
  "www.claude.ai": true,
  "deepseek.com": true,
  "chat.deepseek.com": true
};

let isEnabled = false;

const btn = document.getElementById("toggleBtn");
const status = document.getElementById("status");

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (!tabs[0]) return;

  try {
    const hostname = new URL(tabs[0].url).hostname.toLowerCase();

    if (supportedDomains[hostname]) {
      btn.disabled = false;
      status.textContent = "DISABLED";
    } else {
      btn.disabled = true;
      status.textContent = "Not supported";
    }
  } catch (e) {
    btn.disabled = true;
    status.textContent = "Not supported";
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
