document.addEventListener("DOMContentLoaded", () => {
  const toggleSwitch = document.getElementById("toggleSwitch");
  const spinner = document.getElementById("spinner");
  const domainLogo = document.getElementById("domainLogo");

  // Supported domain -> logo map
  const domainLogos = {
    "chat.openai.com": "chatgpt_logo.png",
    "chatgpt.com":"chatgpt_logo.png",
    "claude.ai": "claude_logo.png",
    "www.claude.ai": "claude_logo.png",
    "deepseek.com": "deepseek_logo.png",
    "chat.deepseek.com": "deepseek_logo.png"
  };

  let matchedFile = null;

  // Reset UI
  spinner.classList.remove("active");
  domainLogo.style.display = "none";
  toggleSwitch.disabled = true;
  toggleSwitch.checked = false;

  // Get active tab hostname
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || !tabs.length) return;

    try {
      const url = new URL(tabs[0].url);
      const hostname = url.hostname.toLowerCase();

      console.log("DEBUG: Active tab hostname =", hostname); // 👈 check this in Console

      if (domainLogos[hostname]) {
        matchedFile = domainLogos[hostname];
        toggleSwitch.disabled = false;
      } else {
        toggleSwitch.disabled = true;
        toggleSwitch.checked = false;
      }
    } catch (err) {
      console.error("popup: error parsing tab URL:", err);
    }
  });

  // Toggle ON/OFF
  toggleSwitch.addEventListener("change", () => {
    if (!matchedFile) {
      toggleSwitch.checked = false;
      return;
    }

    if (toggleSwitch.checked) {
      domainLogo.src = matchedFile;
      domainLogo.style.display = "inline-block";
    } else {
      domainLogo.style.display = "none";
    }
  });
});
