document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggleButton");
  const buttonText = document.getElementById("buttonText");
  const statusDot = document.getElementById("statusDot");
  const statusText = document.getElementById("statusText");
  const domainLogo = document.getElementById("domainLogo");
  const domainInfo = document.getElementById("domainInfo");
  const domainTextEl = document.getElementById("domainText");

  const domainLogos = {
    "chat.openai.com": { logo: "chatgpt_logo.png", name: "ChatGPT" },
    "chatgpt.com": { logo: "chatgpt_logo.png", name: "ChatGPT" },
    "claude.ai": { logo: "claude_logo.png", name: "Claude" },
    "www.claude.ai": { logo: "claude_logo.png", name: "Claude" },
    "deepseek.com": { logo: "deepseek_logo.png", name: "DeepSeek" },
    "chat.deepseek.com": { logo: "deepseek_logo.png", name: "DeepSeek" }
  };

  let isEnabled = false;
  let matchedDomain = null;

  toggleButton.disabled = true;
  domainInfo.classList.remove("visible");

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || !tabs.length) return;

    try {
      const url = new URL(tabs[0].url);
      const hostname = url.hostname.toLowerCase();

      if (domainLogos[hostname]) {
        matchedDomain = domainLogos[hostname];
        toggleButton.disabled = false;
        domainLogo.src = matchedDomain.logo;
        domainTextEl.textContent = matchedDomain.name;
        domainInfo.classList.add("visible");
      } else {
        toggleButton.disabled = true;
      }
    } catch (err) {
      console.error("Error parsing tab URL:", err);
    }
  });

  toggleButton.addEventListener("click", () => {
    if (!matchedDomain) return;

    toggleButton.classList.add("loading");

    setTimeout(() => {
      isEnabled = !isEnabled;

      if (isEnabled) {
        toggleButton.classList.add("enabled");
        toggleButton.classList.remove("loading");
        buttonText.textContent = "DISABLE";
        statusDot.classList.add("active");
        statusText.classList.add("active");
        statusText.textContent = "ENABLED";
      } else {
        toggleButton.classList.remove("enabled");
        toggleButton.classList.remove("loading");
        buttonText.textContent = "ENABLE";
        statusDot.classList.remove("active");
        statusText.classList.remove("active");
        statusText.textContent = "DISABLED";
      }
    }, 500);
  });
});
