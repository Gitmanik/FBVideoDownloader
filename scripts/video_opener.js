(function() {
    if (window.hasRun)
    {
      return;
    }
    window.hasRun = true;

    var markup = document.documentElement.innerHTML;
    var magic = "<a href=\"/video_redirect/?src=";
    if (markup.indexOf(magic) === -1)
    {
      window.close();
      return;
    }
    var a = markup.substring(markup.indexOf(magic) + magic.length);
    var b = a.substring(0,a.indexOf("\""))

    b = b.split("%2F").join("/");
    b = b.split("%3A").join(":");
    b = b.split("%3F").join("?");
    b = b.split("%26").join("&");
    b = b.split("%3D").join("=");

    browser.runtime.sendMessage({
      id: "GitmanikFBDownloader1",
      link: b
    });

  })();