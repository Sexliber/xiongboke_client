// 引入babel-polyfill模块
import 'babel-polyfill';

// 引入Vue模块
import Vue from 'vue';

// 引入Vuescroll模块并且全局配置参数<=S
import vuescroll from 'vuescroll';
Vue.use(vuescroll, {
  ops: {
    vuescroll: {
      mode: 'native',
      sizeStrategy: 'number',
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

// Vue全局配置<=S
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
// Vue全局配置=>E

// 引入并且渲染App视图<=S
import App from './App';

Vue.config.productionTip = false;
new Vue({
  render: i => i(App)
}).$mount('#app')
// 引入并且渲染App视图=>E
