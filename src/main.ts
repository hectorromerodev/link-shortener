import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";

// Add toast to the app
import Toast, { type PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";

const options: PluginOptions = {
  // You can set your default options here
};

createApp(App).use(Toast, options).mount("#app");
