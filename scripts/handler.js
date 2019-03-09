(function() {
    if (window.hasRun) {
      return;
    }
    window.hasRun = true;

    browser.runtime.onMessage.addListener((request, sender, sendResponse) =>
    {
      if (request.command === "gitmanikdownload")
      {
        sendResponse(document.location.pathname);
      }
    });

  })();