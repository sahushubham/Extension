const sites = [];

//Tabs On Updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status == "complete") {
    let currentURL = tab.url;
    console.log('Current url', currentURL);
    sites.push(currentURL);
  }
});



chrome.tabs.query({
  "currentWindow": true, "active": true, status: "complete",
  windowType: "normal",
}, function (tabs) {
  let tab = tabs[0];
  let currenttaburl = tab.url;
  console.log('active tab url', currenttaburl)
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message == "handshake") {
    chrome.runtime.sendMessage({ sites });
  }
});


// chrome.windows.remove()
// setInterval(() => {
//   chrome.storage.sync.set({ 'History': urls, });
//   console.log("URLS", urls);
// }, 10000);

chrome.runtime.onStartup.addListener(() => {
  console.log('Extension loaded')
});

chrome.windows.onRemoved.addListener(function () {

  // chrome.windows.getAll(function (windows) {
  // alert(windows.length);
  // if (windows.length == 0) {

  // console.log('wind', windows);
  // chrome.storage.sync.set({ winlen: windows.length });

  // }

  // });
})




chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "install") {
    // UUID is generated and saved

  } else if (details.reason == "update") {

  }
});
