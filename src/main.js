const loadConfig = async () => {
  const GLOBAL = {
    baseURL: import.meta.env.VITE_PROJECT_API_baseURL,
  };
  const windowGlobal = window.$global || {};
  window.$global = {
    ...GLOBAL,
    ...windowGlobal,
  };
  import("./setup");
};
if (import.meta.env.VITE_PROJECT_ENV === "development") {
  // 调接口可以去掉
  import("../mock").then(() => {
    loadConfig();
  });
} else {
  loadConfig();
}
