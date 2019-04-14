// 引入babel-polyfill模块
import 'babel-polyfill';

// 引入全局模块
import global from './VueGlobal';

// 引入Vue模块
import Vue from 'vue';




// *
// * 引入axios请求模块并配置到Vue全局属性
// *
import axios from 'axios';
// 设置默认请求域名地址
axios.defaults.baseURL = global.BASE_URL;
Vue.prototype.axios = axios;




// 引入Vuescroll模块并且全局配置参数<=S
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
// 引入Vuescroll模块并且全局配置参数=>E



// 引入vue进度条组件




// Vue全局过滤器<=S
// 过滤器,字数限制,去除换行符和空格
Vue.filter('textLength',
  function (value, length) {
    value = value + '';
    value = value.replace(/[\r\n]/g, "").replace(/[\n]/g, "").replace(/[\r]/g, "").replace(/[ ]/g, "");
    if (value.length <= length) {
      return value;
    } else {
      return value.substring(0, length) + '...';
    }
  });
//过滤器,时间修饰
Vue.filter('dateMod', function (value) {
  var oldDate = new Date(value);
  var newDate = new Date();
  var dif = newDate - oldDate;
  if (dif / 1000 / 60 / 60 / 24 / 30 > 1) {
    return `${parseInt(dif / 1000 / 60 / 60 / 24 / 30)}个月前`;
  } else {
    if (dif / 1000 / 60 / 60 / 24 > 1) {
      return `${parseInt(dif / 1000 / 60 / 60 / 24)}天前`;
    } else {
      if (dif / 1000 / 60 / 60 > 1) {
        return `${parseInt(dif / 1000 / 60 / 60)}个小时之前`;
      } else {
        if (dif / 1000 / 60 > 1) {
          return `${parseInt(dif / 1000 / 60)}分钟以前`;
        }
      }
    }
  }
});
// 过滤器,整数0占位到指定长度
Vue.filter('numPlace', function (value, length) {
  var mtp = length - value.toString().length;
  var numPlace = value.toString();
  for (var i = 0; i < mtp; i++) {
    numPlace = 0 + numPlace;
  }
  return numPlace;
});
// Vue全局过滤器=>E




// 引入并且渲染App视图<=S
import App from './App';
import { Number } from 'core-js';

Vue.config.productionTip = false;
new Vue({
  render: i => i(App)
}).$mount('#app')
// 引入并且渲染App视图=>E
