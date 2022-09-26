function injectTimer() {
  workspaceContainer = document.getElementsByClassName("zh-app__workspace")[0];
  timerIframe = document.createElement("iframe");
  timerIframe.style.width = "100%";
  timerIframe.src = "https://scrum-watch-next.vercel.app/";
  console.log(workspaceContainer);
  console.log(timerIframe);
  if (workspaceContainer) {
    console.log("injecting", workspaceContainer.firstChild);
    workspaceContainer.insertBefore(timerIframe, workspaceContainer.firstChild);
  }
}

chrome.action.onClicked.addListener((tab) => {
  console.log(tab);
  if (tab?.url?.includes("#workspaces")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: injectTimer,
    });
  }
});
