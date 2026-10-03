/* Shared data bridge. The pages use the API when served by server.js and
   fall back to the bundled JSON file when opened as a static site. */
(function () {
  window.siteDataFetch = async function (fallbackUrl) {
    var api = location.protocol === "file:" ? null : "/api/site-data";
    if (api) {
      try {
        var response = await fetch(api, { cache: "no-store" });
        if (response.ok) return response;
      } catch (error) { /* use the bundled file below */ }
    }
    return fetch(fallbackUrl, { cache: "no-store" });
  };
})();
