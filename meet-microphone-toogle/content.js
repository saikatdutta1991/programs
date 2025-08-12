function getMicStatus() {
  const micButton = document.querySelector(
    'button[aria-label*="microphone"][data-is-muted]'
  );
  return micButton ? micButton.getAttribute("data-is-muted") : null;
}

function toggleMic() {
  const micButton = document.querySelector(
    'button[aria-label*="microphone"][data-is-muted]'
  );
  if (micButton) {
    micButton.click();
    return micButton.getAttribute("data-is-muted");
  }
  return null;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "toggleMic") {
    sendResponse({ status: "done", buttonStatus: toggleMic() });
  } else if (msg.action === "getMicStatus") {
    sendResponse({ status: "done", buttonStatus: getMicStatus() });
  }
});
