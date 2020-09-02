import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
const VConsole = require("vconsole");
new VConsole();
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
