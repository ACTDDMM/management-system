import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入element
// import "../plugin/element";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
// 引入 font-awesome
import "font-awesome/css/font-awesome.min.css";
// 引入axios
// import axios from "axios";
// import VueAxios from "vue-axios";
// Vue.use(VueAxios, axios);
import service from "../service";

Vue.prototype.service = service;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
