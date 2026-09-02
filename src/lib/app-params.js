// Static-site app params — no platform bootstrap values are read and no
// tokens are picked up. The site runs standalone; this module only exists
// because platform scaffolding imports it.
const isNode = typeof window === "undefined";

const clearStoredAccessToken = () => {
  window.localStorage.removeItem("base44_access_token");
  window.localStorage.removeItem("token");
};

if (!isNode) {
  if (new URLSearchParams(window.location.search).get("clear_access_token") === "true") {
    clearStoredAccessToken();
  }
}

export const appParams = {
  appId: null,
  token: null,
  functionsVersion: null,
  appBaseUrl: null,
};