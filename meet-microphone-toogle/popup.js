const micButton = document.getElementById("micButton");
const micIcon = document.getElementById("micIcon");
const errorMessage = document.getElementById("errorMessage");

function updateMicIcon(isMuted) {
  if (isMuted === "true") {
    micIcon.src = "mic_muted.png";
    micButton.title = "Unmute Mic";
  } else if (isMuted === "false") {
    micIcon.src = "mic.png";
    micButton.title = "Mute Mic";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    console.log(`Active tab URL: ${activeTab.url}`);

    if (activeTab.url.includes("meet.google.com")) {
      micButton.disabled = false;
      errorMessage.textContent = "";

      chrome.tabs.sendMessage(
        activeTab.id,
        { action: "getMicStatus" },
        (response) => {
          console.log(
            `Response from content script after getMicStatus: ${JSON.stringify(
              response
            )}`
          );
          if (response && response.buttonStatus !== null) {
            updateMicIcon(response.buttonStatus);
          }
        }
      );

      micButton.addEventListener("click", () => {
        chrome.tabs.sendMessage(
          activeTab.id,
          { action: "toggleMic" },
          (response) => {
            console.log(
              `Response from content script on mic toggle after toggleMic: ${JSON.stringify(
                response
              )}`
            );
            if (response && response.buttonStatus !== null) {
              updateMicIcon(response.buttonStatus);
            }
          }
        );
      });
    } else {
      micButton.disabled = true;
      errorMessage.textContent = "Open Google Meet to control mic";
    }
  });
});
