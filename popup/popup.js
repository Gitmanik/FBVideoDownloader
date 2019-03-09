function listenForClicks() {
    document.addEventListener("click", (e) => {

      function startdownload(tabs) {
        var mess = browser.tabs.sendMessage(tabs[0].id, {
          command: "gitmanikdownload",
        });
        mess.then(handleResponse, printError);
      }

      function handleResponse(message) {
        console.log(`Message from the background script:  ${message}`);
        var creating = browser.tabs.create({
          url: "https://d.facebook.com/" + message
        });
        creating.then(onCreated, printError);
      }

      function onCreated(tab) {
        console.log(`Created new tab: ${tab.id}`)
        tabid = tab;
      }

      if (e.target.classList.contains("download")) {
        browser.tabs.query({active: true, currentWindow: true})
          .then(startdownload)
          .catch(printError);
      }
    });
  }

  function handleMessage(request) {
    if (request.id === "GitmanikFBDownloader1")
    {
      console.log("Downloading: " + request.link);
      browser.downloads.download({
        url : request.link,
        filename : 'gitmanik.mp4',
        conflictAction : 'uniquify'
      });

      function destroyTabs(tabs) {
        for (let tab of tabs) {
          // tab.url requires the `tabs` permission
          console.log(tab.url);
          console.log("Removing: "+ tab.id);
          var removing = browser.tabs.remove(tab.id);
          removing.then(onRemoved, printError);
        }
      }

      var querying = browser.tabs.query({url: "*://d.facebook.com/*"});
      querying.then(destroyTabs, printError);

      function onRemoved() {}

    }
  }

  browser.runtime.onMessage.addListener(handleMessage);

  //#region Injector

  /**
   * When the popup loads, inject a content script into the active tab,
   * and add a click handler.
   * If we couldn't inject the script, handle the error.
   */

  browser.tabs.executeScript({file: "/scripts/handler.js"})
  .then(listenForClicks)
  .catch(printError);

   /**
   * There was an error executing the script.
   * Display the popup's error message, and hide the normal UI.
   */
  function printError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to download!: ${error.message}`);
  }

    //#endregion