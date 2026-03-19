import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import { notebookStore } from "./store";

const app = createApp(App);
app.use(router);
app.use(notebookStore);
app.use(ElementPlus, { size: "default", zIndex: 300 });
app.mount("#app");
