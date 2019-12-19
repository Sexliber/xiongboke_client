// 引入babel-polyfill模块
import 'babel-polyfill';

// 引入Vue模块
import Vue from 'vue';



// *
// * 引入VueRouter路由器
// *
import VueRouter from "vue-router";
Vue.use(VueRouter);

// *
// * 将全局变量添加到Vue对象中
// *
import global from './Global';
Vue.prototype.global = global;

// *
// * 引入vue-meta头管理
// *
import VueMeta from 'vue-meta';
Vue.use(VueMeta, {
    // 导航时刷新一次
    refreshOnceOnNavigation: true
});

// *
// * 引入vue-lazyload懒加载
// *
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, global.VueLazyConfig);

// *
// * 引入axios请求模块并配置到Vue全局属性
// *
import axios from 'axios';
axios.defaults.baseURL = global.BASE_URL; // 设置默认请求域名地址
Vue.prototype.axios = axios;

// 引入Vuescroll模块并且全局配置参数
import vuescroll from 'vuescroll';
Vue.use(vuescroll, global.VueScrollConfig);


// *
// * 引入全局过滤器
// *
import filters from './Filters';
for (let key in filters) {
    Vue.filter(key, filters[key]);
}


// *
// * 创建VUE实例并且渲染App视图
// *
import App from './App';
import { Number } from 'core-js';

Vue.config.productionTip = false;
new Vue({
    render: i => i(App)
}).$mount('#app');