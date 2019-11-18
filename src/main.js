// 引入babel-polyfill模块
import 'babel-polyfill';

// 引入Vue模块
import Vue from 'vue';

// *
// * 将全局模块添加到Vue对象中
// *
import global from './Global';
Vue.prototype.global = global;

// *
// * 引入axios请求模块并配置到Vue全局属性
// *
import axios from 'axios';
axios.defaults.baseURL = global.BASE_URL;   // 设置默认请求域名地址
Vue.prototype.axios = axios;


// 引入Vuescroll模块并且全局配置参数
import vuescroll from 'vuescroll';
Vue.use(vuescroll, {
    ops: {
        vuescroll: {
            mode: 'native',
            sizeStrategy: Number,
            detectResize: true
        },
        scrollPanel: {
            initialScrollY: false,
            initialScrollX: false,
            scrollingX: false,
            scrollingY: true,
            easing: 'easeInOutQuint',
            verticalNativeBarPos: 'right'
        },
        bar: {
            showDelay: 500,
            onlyShowBarOnScroll: true,
            keepShow: false,
            background: '#ffc815',
            opacity: 1,
            hoverStyle: false,
            specifyBorderRadius: false,
            minSize: false,
            size: '6px',
            disable: false,
        }
    },
    name: 'vueScroll'
});


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
}).$mount('#app')