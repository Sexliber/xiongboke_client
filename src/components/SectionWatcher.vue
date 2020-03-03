<template>
  <!-- @type:components
         @message:section块监视组件,该组件中滚动条触发时执行相关操作
         自动生成脉冲动画标题以及导航栏
         @params: 
              props传值:
              hide-aside:布尔值,是否隐藏侧边栏

              v-on监听:
              viewId: 当视图内seciton块变动返回当前块的id值

              section块标签的属性值:
              id: 用于该组件监听注册
              nav-name: 该组件读取这个值来动态创建nav导航栏
              bg: 组件滚动到当前元素节点时,侧边栏的背景替换为此值
              icon-name: 图标类名
  -->
  <div class="container-fluid">
    <!-- @type: 元素
         @message: 用于展示当前浏览区域中section块的id值
    -->
    <aside :class="{hide:hideAside}" :style="{backgroundImage:`url(${bgImageUrl})`}">
      <!-- 遮罩 -->
      <div class="overlay"></div>
      <!-- 浏览区域提示 -->
      <div class="text-wrap" :style="{backgroundImage:`url(${bgImageUrl})`}" ref="show-id-name"></div>
      <!-- 左侧导航栏 -->
      <nav>
        <ul>
          <li
            v-for="(item, index) in sectionList"
            :key="index"
            :class="{active:viewId==item.id}"
            @click="scrollTo(item.id,scrollToTime)"
          >
            <p>
              <i class="icon" :class="item.iconName"></i>
              <br />
              <span v-text="item.navName"></span>
            </p>
          </li>
        </ul>
      </nav>
      <!-- 浏览进度提示 -->
      <div class="progress">
        <div class="bar bg-yellow" :style="{width:`${progress*100}%`}"></div>
      </div>
    </aside>

    <article>
      <vue-scroll ref="scroll" @handle-resize="handleResize" @handle-scroll="handleScroll">
        <slot name="article">
          <!--  
        @type:插槽
        @message:用于放置以section组成的内容
        @e.g.:
        <section id="cartoon"></section>
        <section id="software"></section>
        <section id="codes"></section>
        <section id="design"></section>
        <section id="webpages"></section>
          -->
        </slot>
      </vue-scroll>
    </article>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 以section的id值为键名的元素对象
      section: {},
      // 当前显示的id名
      viewId: "header",
      showId: [0, 0, 0],
      // section组
      sectionList: [],
      // 滚动进度条
      progress: 0,
      // title缓冲动画定时器及周期时长
      animaTimer: null,
      // 数字脉冲动画每一帧间隔时长
      timelong: 60,
      // title文字长度
      wordLenth: 10,
      // 滚动条的vue实例
      scroll$vm: null,
      // 定位跳转到section节点的动画时长
      scrollToTime: 1200,
      // 动画块的背景
      bgImageUrl: ""
    };
  },
  props: {
    hideAside: {
      type: Boolean | Number,
      default: () => false
    }
  },
  watch: {
    // @params:  newValue:当前值;
    //           oldValue:上一个值;
    // @message: 监听数据池中的viewId变量
    // 1.当其改变时重新调用标题脉冲动画方法
    // 2.更改动画块背景URL
    // 3.将改变的id属性值报告给父组件
    viewId(newValue, oldValue) {
      // 步骤1
      this.titleAnima(newValue, oldValue);
      // 步骤2
      this.bgImageUrl = this.getBgImage();
      // 步骤3
      this.$emit("viewId", this.viewId);
    },

    // @message: 因为vue的订阅器与background-clip:text样式属性的兼容问题,需要手动获取
    //            dom对象来挂载this.showId的值,当监听到this.showId变动时,通过$refs
    //            获取动画模块的dom节点更改节点内容,并且该节点必须是background-clip样式
    //            所绑定的直接元素
    showId(newValue) {
      this.$refs["show-id-name"].setAttribute(
        "data-text",
        this.showId.numberToWord()
      );
    }
  },
  // @message: 元素节点挂载完成后执行此方法
  //        1: 设置String中[A-Z]转[1-26]数字码数组的原型方法;
  //        2: 设置[1-26]数字码数组转String[A-Z]的原型方法;
  //        3: 初始化滚动条的vue实例;
  //        4: 执行初始化操作;
  mounted() {
    // 步骤1: 设置String中[A-Z]转[1-26]数字码数组的原型方法;
    let $vm = this;
    String.prototype.wordToNumber = function() {
      let arr = this.toUpperCase()
        .split("")
        .map(item => item.charCodeAt() - 64);
      for (let m = arr.length; m < $vm.wordLenth; m++) {
        arr[m] = 0;
      }
      return arr;
    };
    // 步骤2: 设置[1-26]数字码数组转String[A-Z]的原型方法;
    Array.prototype.numberToWord = function() {
      return this.join()
        .match(/\d{1,2}/gi)
        .map(item => {
          if (item == 0) {
            return "";
          } else {
            return String.fromCharCode(parseInt(item) + 64);
          }
        })
        .join("");
    };

    // 步骤3: 初始化滚动条的vue实例;
    this.scroll$vm = this.$refs.scroll;

    // 步骤4: 执行初始化操作;
    this.init();
  },
  // @message: 该组件销毁时
  //        1: 销毁定义的String原型方法
  //        1: 销毁定义的Array原型方法
  destroyed() {
    // 步骤1
    delete String.prototype.wordToNumber;
    delete Array.prototype.numberToWord;
  },
  methods: {
    // @message: 初始化操作
    //        1: 获取section插槽中的所有section节点,并以{属性名:属性值}的
    //        格式将数据对象传递给sectionList;
    //        2: 将处在当前视图窗口中的section的id值发送给this.viewId;
    init() {
      // 步骤1
      this.sectionList = [].map.call(
        this.scroll$vm.scrollPanelElm.querySelectorAll("section[id]"),
        element => {
          let obj = {};
          obj[element.id] = element;
          return {
            id: element.id,
            navName: element.getAttribute("nav-name"),
            bgImage: element.getAttribute("bg"),
            node: element,
            iconName: element.getAttribute("icon-name")
          };
        }
      );

      // 步骤2
      this.viewId = this.getCurrentviewSectionId();
    },

    // @message: 根据当前viewId获取sectionList中对象的bgImage的值
    getBgImage() {
      let bgImage = "";
      this.sectionList.forEach(item => {
        if (item.id != this.viewId) return;
        bgImage = item.bgImage;
      });
      return bgImage;
    },

    // @message: 获取当前窗口视图中的section元素的id值
    getCurrentviewSectionId() {
      let element = this.scroll$vm.getCurrentviewDom();
      while (
        !element[0].getAttribute("id") ||
        element[0].localName != "section"
      ) {
        element.shift();
      }
      return element[0].id ? element[0].id : this.viewId;
    },

    // @params:  vertical:垂直滚动条的信息;
    //           horizontal:水平滚动条的信息;
    //           NativeEvent原生滚动条事件;
    // @message: 监听vuescroll组件内容盒子的滚动事件,
    //           1.获取滚动进度并传递给progress
    //           2.获取当前正在显示的section块的id值并传递给this.viewId
    //           3.滚动到一定距离时将nav导航栏设置为窗口浮动
    handleScroll(v, h, event) {
      // 步骤1
      this.progress = v.process;

      // 步骤2
      this.viewId = this.getCurrentviewSectionId();
    },

    // @params:  vertical:垂直滚动条的信息;
    //           horizontal:水平滚动条的信息;
    //           NativeEvent原生滚动条事件;
    // @message: 监听vuescroll组件内容尺寸变化
    //           1.重新执行初始化操作
    //           2.滚动时设置滚动进度
    handleResize(v, h, evnt) {
      // 步骤1
      this.init();
      // 步骤2
      this.progress = v.progress;
    },

    // @params:  id:section的id属性值;time:滚动时长/ms
    // @message: 窗口滚动到指定id属性值section上
    scrollTo(id, time) {
      this.scroll$vm.scrollIntoView(`#${id}`, time);
    },

    // @params:  newValue:将要替换的文字;
    //           oldValue:上一个文字;
    // @message: 执行title文字脉冲动画
    titleAnima(newValue, oldValue) {
      // 文字动画是否还存在,是则清除定时器重新开始动画
      if (this.animaTimer) window.clearInterval(this.animaTimer);

      // 新旧值转化为字母代码
      newValue = newValue.wordToNumber();
      oldValue = oldValue.wordToNumber();

      // 设置动画定时器
      this.animaTimer = window.setInterval(() => {
        /* isEqual变量用于判断两个数组内容是否相等,如果
         一个循环后该值没有被重新设置,则证明两个数组相等 */
        let isEqual = 1;

        oldValue.forEach((item, index) => {
          if (item === newValue[index]) return;
          isEqual = 0;
          if (item > newValue[index]) oldValue[index]--;
          else oldValue[index]++;
        });

        // 新旧字母代码数组是否相等,是则清除定时器并且退出当前方法
        if (isEqual === 1) {
          window.clearInterval(this.animaTimer);
          return;
        }

        // 替换字母代码数组
        this.showId.splice(0, this.showId.length);
        this.showId.push(...oldValue);
      }, this.timelong);
    }
  }
};
</script>

<style scoped>
.container-fluid {
  display: flex;
  height: 100%;
  flex-flow: row nowrap;
  overflow: hidden auto;
}

/* @message: 侧边栏,用于显示当前视图窗口中section节点的id属性值 */
aside,
.text-wrap {
  background-size: cover;
}
aside {
  position: relative;
  overflow: hidden;
  flex: 1 0 0;
  width: 0;
  display: flex;
  flex-flow: row wrap;
  align-content: space-evenly;
  transition: all 200ms linear;
}
aside.hide {
  flex: 0 0 0;
}
.text-wrap {
  position: relative;
  z-index: 2;
  width: 100%;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 900;
  text-align: center;
  transition: all 600ms linear;
}
.text-wrap::before {
  content: attr(data-text);
}
.overlay {
  background-color: rgba(0, 0, 0, 0.8);
}

/* 
  @message: nav导航栏
*/
aside nav {
  z-index: 2;
}
aside nav ul {
  margin-top: 1px;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
}
aside nav ul li {
  margin: -1px 0 0 -1px;
  flex: auto;
  width: 33.3333333333%;
  height: 2.1rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid #888;
  color: #fff;
}
aside nav ul li > * {
  width: 100%;
  text-align: center;
  background-color: rgba(255, 255, 255, 0);
  transition: all 600ms linear;
}
aside nav ul li.active {
  background-color: rgba(255, 255, 255, 0.14);
  color: #ffc815;
}
aside nav ul li:hover {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.06);
}
aside nav ul li .icon {
  font-size: 0.46rem;
  line-height: 0.74rem;
}
/* 
  @message: nav导航栏
*/
article {
  position: relative;
  flex: 2.618 0 0;
  width: 0;
}
nav,
nav .bar-wrap {
  display: flex;
  overflow: hidden;
  width: 100%;
}
nav .bar-wrap {
  align-items: stretch;
  width: 100%;
}
nav .bar {
  position: relative;
  flex: auto;
  box-sizing: border-box;
  border-right: #fff solid 1px;
  line-height: 70px;
  cursor: pointer;
}
nav .bar:last-of-type {
  border-right: none;
}
nav .bar span {
  position: relative;
  z-index: 2;
}
nav .bar::before,
nav .bar::after {
  position: absolute;
  top: 0;
  background-color: #ffc815;
  width: 50%;
  height: 100%;
  content: "";
  z-index: 1;
  transition: all 600ms ease-in-out;
}
nav .bar::before {
  left: 0;
  transform: translateY(100%);
}
nav .bar::after {
  right: 0;
  transform: translateY(-100%);
}
nav .bar.active::before {
  transform: translateY(0);
}
nav .bar.active::after {
  transform: translateY(0);
}
nav.fixed {
  position: fixed;
  z-index: 1;
  top: 0;
  width: calc((100% - 140px) * (2.618 / 3.618));
}
/* *
* 浏览进度条
* */
.progress {
  flex: auto;
  z-index: 3;
  margin: 0 20px;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.51);
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.progress .bar{
  height: 5px;
  border-radius: 3px;
  transition: width 600ms ease-out;
}
</style>