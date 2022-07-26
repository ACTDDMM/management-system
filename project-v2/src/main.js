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

import * as echarts from 'echarts'
Vue.prototype.service = service;
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false;
// 路由导航守卫
router.beforeEach((to,form,next)=>{
  if(!localStorage.getItem('username')){
    if(to.path !== '/login'){
      next('/login')
    }else next()
  }next()
})


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
