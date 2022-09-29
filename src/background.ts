var count = 0;
function polling() {
  console.log(`Background polling ${count++}`);
  setTimeout(polling, 1000 * 10);
}
// polling();

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.tab) {
      sendResponse({name: 'yes!'});
    }
  }
);
