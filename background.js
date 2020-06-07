const sites = [];

//Tabs On Updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status == "complete") {
    let currentURL = tab.url;
    console.log('Current url', currentURL);
    var date=Date.now()/1000;
    var time=0;
    console.log("Tab id is "+tabId);
    sites.push({"tabId":tabId,"CurrentURl":currentURL,"Time":time});
    setInterval(()=>{
      chrome.tabs.onRemoved.addListener((tabId,removeInfo)=>{
        console.log("Removed Tag is"+ tabId);
        var i;
        
        for(i=0;i<sites.length;i++)
        {
          if(sites[i]["tabId"]===tabId)
          {
            sites[i]["Time"]=Date.now()/1000-date;;
            console.log("Value of i is"+i);
            console.log("time spent"+ time);
            console.log("value of sites[i][Time] is" + sites[i]["Time"]);
          }
        }
      });
    },1000);
    chrome.tabs.onRemoved.addListener(()=>{
    console.log("final time"+sites[0]["Time"]);})
    
  }
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
