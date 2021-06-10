import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import dataV from "@jiaminghi/data-view";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

axios.defaults.baseURL = "/api/v1";
axios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("_token");
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
axios.interceptors.response.use(
  (response) => {
    if (response.data.Code) {
      switch (response.data.Code) {
        case 1000:
        case 1001:
          store.dispatch("logout");
          router.replace("/login");
      }
    }
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);

Vue.use(ElementUI);

Vue.use(dataV);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
