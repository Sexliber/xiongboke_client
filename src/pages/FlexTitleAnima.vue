<template>
  <div class="clearboth">
    <!-- 浮动标题=>S -->
    <div class="flex-title">
      <div class="pic">
        <div class="bg bg-scroll" :style="{backgroundImage:`url(${backgroundImg})`}"></div>
        <div class="overlay" :class="{animated:isAnimated}"></div>
      </div>
      <div class="title">
        <span v-cloak v-for="(item,i) in word" :key="i">{{word[i] | toWord}}</span>
      </div>
      <div class="progress-bar-wrap" v-barwrapwidth>
        <div class="progress-bar" :style="{width: proBarWidth[0]+'px'}"></div>
      </div>
    </div>
    <!-- 占位块<=S -->
    <div class="placeholder"></div>
    <!-- 占位块=>E -->
    <!-- 浮动标题=> -->
    <!-- 浮动导航=>S -->
    <nav class="bg-black flexNavbar" v-for="(item,key) in isFlex" :key="key" :class="{isFlex:item}">
      <div class="container-fluid">
        <div class="row">
          <ul class="clearboth">
            <li v-for="(item,key) in navName" :key="key" :style="{width:1/navName.length*100+'%'}">
              <a
                class="white title"
                :class="{active:isActive[key]}"
                :href="`#${item.en}`"
                @click.prevent="changeWord(key);changeNavbar(key)"
              >
                <span v-text="item.zh"></span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- 浮动导航=>E -->
    <!-- 内容块<=S -->
    <div class="content-container">
      <!-- 最新文章<=S -->
      <div :id="navName[0].en" v-offsettop class="padding1">
        <div class="container-fluid padding1">
          <router-link :to="{path:'search'}">
            <div class="title-class">
              <div class="overlay"></div>
              <h3 class="zh" v-text="navName[0].zh"></h3>
              <h5 class="en" v-text="navName[0].en.toUpperCase()"></h5>
            </div>
          </router-link>
        </div>
        <div class="container-fluid">
          <transition-group appear tag="div" class="row">
            <div
              v-for="(item,key) in writesArr"
              :key="key"
              class="col-md-3 col-sm-4 col-xs-6 padding1"
            >
              <writes-block :writes-data="item"/>
            </div>
          </transition-group>
        </div>
      </div>
      <!-- 最新文章<=E -->
      <!-- 实用软件<=S -->
      <div :id="navName[1].en" v-offsettop class="padding1 v100">
        <!-- 标题<=S -->
        <div class="container-fluid padding1">
          <div class="row">
            <router-link :to="{path:'search',query:{class:'softs'}}">
              <div class="title-class">
                <div class="overlay"></div>
                <h3 class="zh" v-text="navName[1].zh"></h3>
                <h5 class="en" v-text="navName[1].en.toUpperCase()"></h5>
              </div>
            </router-link>
          </div>
        </div>
        <!-- 标题=>E-->
        <!-- 内容<=S -->
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-8">
              <transition>
                <!-- 轮播图组件 -->
                <image-replay-banner class="padding1"/>
              </transition>
              <!-- 软件<=S -->
              <transition-group tag="div">
                <div v-for="(item,key) in softsArr" :key="key" class="padding1">
                  <writes-banner :data-softs="item"/>
                </div>
              </transition-group>
              <!-- 软件=>E -->
            </div>
            <div class="col-md-4">
              <div class="row">
                <!-- 标签菜单<=S -->
                <transition>
                  <div class="col-sm-6 col-md-12 padding1">
                    <tags-mean/>
                  </div>
                </transition>
                <!-- 标签菜单=>E -->
                <!-- 推荐菜单<=S -->
                <transition>
                  <div class="col-sm-6 col-md-12 padding1">
                    <recommend/>
                  </div>
                </transition>
                <!-- 推荐菜单=>E -->
                <!-- 优选内容<=S -->
                <transition>
                  <div class="col-sm-6 col-md-12 padding1">
                    <optimi/>
                  </div>
                </transition>
                <!-- 优选内容=>E -->
                <!-- 网易云漫画<=S -->
                <transition>
                  <div class="col-sm-6 col-md-12 padding1">
                    <tencent-comics/>
                  </div>
                </transition>
                <!-- 网易云漫画=>E -->
              </div>
            </div>
          </div>
        </div>
        <!-- 内容=>E -->
      </div>
      <!-- 实用软件=>E -->
      <div :id="navName[2].en" v-offsettop class="v100"></div>
      <div :id="navName[3].en" v-offsettop class="v100"></div>
      <div :id="navName[4].en" v-offsettop class="v100"></div>
    </div>
    <!-- 内容块=>E -->
  </div>
</template>



<script>
// 引入组件<=S
import WritesBlock from "../components/WritesBlock";
import ImageReplayBanner from "../components/ImageReplayBanner";
import WritesBanner from "../components/WritesBanner";
import TagsMean from "../components/TagsMean";
import Recommend from "../components/Recommend";
import Optimi from "../components/Optimi";
import TencentComics from "../components/TencentComics";
// 引入组件=>E

// 内容块里面每个类元素距离的offsetTop值
export let classEleTop = new Array();
// 被点击的导航栏角标号
export let navbarSubId = new Array(0);
//滚动指示器容器宽度
export let barWrapWidth = 0;

export default {
  name: "FlexTitleAnima",
  data() {
    return {
      //待渲染数组
      word: [23, 18, 9, 20, 5, 19, 0, 0, 0, 0],
      //浮动标题块背景
      backgroundImg: "../assets/images/homepage/flex-title-0.jpg",
      //浮动标题块动画
      isAnimated: false,
      //浮动标题快动画清除器
      titleFlexClear: null,
      // active类控制器
      isActive: this.getIsActive,
      // 浮动导航栏
      isFlex: [true, false],
      // 进度指示条长度
      proBarWidth: this.progressBarWidth,
      // 请求到的文章数据数组
      writesArr: [0],
      // 请求到的软件数据
      softsArr: [0]
    };
  },
  //接收父组件参数
  props: {
    //导航栏名称数组
    navName: Array,
    // 导航栏动画数组
    getIsActive: Array,
    //进度指示条长度
    progressBarWidth: Array
  },
  // 监听器
  watch: {
    // 监听isActive数组变化
    getIsActive: function(oldData, newData) {
      // 遍历isActive数组查看true值的脚标号
      let i = 0;
      for (i in newData) {
        if (newData[i]) {
          // 传入角标执行导航栏动画
          this.changeWord(i);
        }
      }
    }
  },
  //方法
  methods: {
    // 传入导航栏组角标号执行导航栏动画
    changeNavbar(id) {
      // 传递导航按钮角标给父组件
      navbarSubId.splice(0, 1, id);
      // active类控制器重新分配
      let m = 0;
      for (m in this.isActive) {
        this.isActive.splice(m, 1, false);
      }
      this.isActive.splice(id, 1, true);
    },
    //传入导航栏数组角标号执行标题栏动画
    changeWord(id) {
      // 判断上一个动画是否已完成,未完成则清除定时器
      if (this.titleFlexClear != null) {
        clearInterval(this.titleFlexClear);
        this.titleFlexClear = null;
      }

      //浮动标题块动画开始
      this.isAnimated = true;

      // 浮动标题更换
      let value = this.navName[id].en.toUpperCase();
      let word = [0];
      let i = 0;
      for (i = 0; i < this.word.length; i++) {
        //循环截取value并且转化为ASCII码-64得到对应1~26的字母值
        if (i >= value.length) {
          word[i] = 0;
        } else {
          word[i] = value.substr(i, 1).charCodeAt() - 64;
        }
      }

      //数组内容加减

      this.titleFlexClear = setInterval(() => {
        let flag = this.calc(this.word, word);
        if (flag) {
          clearInterval(this.titleFlexClear);
          //浮动标题块动画结束
          this.isAnimated = false;
          this.backgroundImg = `../assets/images/homepage/flex-title-${id}.jpg`;
        }
      }, 60);
    },
    //数组内容加减法,小于目标数则加,大于则减,相等则不做计算
    calc(oldArr, newArr) {
      let allEqual = true;
      let i = 0;
      for (i = 0; i < oldArr.length; i++) {
        if (oldArr[i] > newArr[i]) {
          this.word.splice(i, 1, oldArr[i] - 1);
          allEqual = false;
        } else if (oldArr[i] < newArr[i]) {
          this.word.splice(i, 1, oldArr[i] + 1);
          allEqual = false;
        } else continue;
      }
      return allEqual;
    }
  },
  //过滤器
  filters: {
    // 数字通过ASCII码过滤为字母
    toWord: function(value) {
      value = parseInt(value);
      if ((value >= 1) & (value <= 26)) {
        //此处+64的原因是因为ASCII码A~Z的十进制值为65~90
        value += 64;
        return String.fromCharCode(value);
      } else return "";
    }
  },
  // 自定义指令
  directives: {
    //获取当前元素与浏览器顶部上间距
    offsettop: {
      inserted: function(el) {
        resetClassEleTop(el);
      },
      update: function(el) {
        resetClassEleTop(el);
      }
    },
    //获取当前元素宽度
    barwrapwidth: {
      inserted: function(el) {
        barWrapWidth = el.offsetWidth;
      },
      update: function(el) {
        barWrapWidth = el.offsetWidth;
      }
    }
  },
  // 组件注册
  components: {
    WritesBlock,
    ImageReplayBanner,
    WritesBanner,
    TagsMean,
    Recommend,
    Optimi,
    TencentComics
  },
  // 该组件data对象加载完毕后开始请求数据
  created() {
    // 请求最新文章数据
    // 需要的列名参数:id,tag,thumbnail,title,date,visitors,comments,assists,chathead,username
    this.axios.get("virtualData/data-demo.json").then(response => {
      this.writesArr = response.data;
    });
    //请求实用软件数据
    this.axios.get("virtualData/data-demo.json").then(response => {
      this.softsArr = response.data;
    });
  }
};

// 通过dom重置offsetTop数组
var resetClassEleTop = function(el) {
  // 滚动监听上间距
  let id = el.getAttribute("id");
  let offsetHeadTop =
    el.offsetTop + document.querySelector("body").offsetHeight;
  let offsetHeight = el.offsetHeight;
  let offsetFootTop = offsetHeadTop + offsetHeight;
  classEleTop[id] = { offsetHeadTop, offsetFootTop, offsetHeight };
};
</script>



<style scoped>
/* 响应式浮动标题栏=>S */
.padding1 {
  padding: 1px;
}

.placeholder {
  position: relative;
  float: left;
  height: 100vh;
  width: 460px;
}

.flex-title {
  top: 0;
  position: fixed;
  overflow: hidden;
  height: 100vh;
  width: 460px;
  background-color: #000000;
}

.flex-title .pic {
  -webkit-transition: all 600ms;
  transition: all 600ms;
  height: 100%;
  float: left;
  width: 100%;
  position: relative;
}

.flex-title .bg {
  position: relative;
  height: 100%;
  background-size: cover;
  background-color: rgba(255, 200, 21, 0);
}

.flex-title .overlay {
  transition: background-color 300ms linear;
}

.flex-title .overlay.animated {
  background-color: rgba(255, 200, 21, 1);
  background-image: none !important;
  z-index: 1;
}

.flex-title .title {
  position: absolute;
  z-index: 1;
  width: 100vh;
  height: 460px;
  text-align: center;
  line-height: 460px;
  top: 100%;
  -webkit-transform-origin: left top;
  transform-origin: left top;
  -webkit-transform: rotateZ(-90deg);
  transform: rotateZ(-90deg);
  -ms-transform: rotate(-90deg);
  font-family: inherit;
  font-weight: 900;
  font-size: 92px;
  color: #fff;
}

.flex-title .title span {
  -webkit-animation-duration: 300ms;
  animation-duration: 300ms;
}

.progress-bar-wrap {
  position: absolute;
  z-index: 1 !important;
  top: 20px;
  left: 30px;
  right: 30px;
  height: 20px;
  z-index: 20;
}

.progress-bar-wrap:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.51);
  z-index: 1;
}

.progress-bar {
  position: relative;
  height: 5px;
  width: 0%;
  border-radius: 3px;
  z-index: 2;
  top: 8px;
  background-color: #ffc815;
}

/* 响应式浮动标题栏=>E */

/* 浮动导航栏=>S */
.flexNavbar {
  position: relative;
  z-index: 9;
  width: calc(100% - 460px);
  float: left;
}

.flexNavbar.isFlex {
  position: fixed;
  z-index: 8;
  width: calc(100% - 140px - 460px);
  right: 70px;
  top: 0;
}

.flexNavbar ul {
  margin: 0 -1px 0 0;
}

.flexNavbar li {
  float: left;
  border-right: 1px solid rgba(255, 255, 255, 0.4);
}

.flexNavbar li a {
  position: relative;
  display: block;
  padding: 34px 0;
  text-align: center;
  line-height: 0;
  margin-bottom: 0;
  text-decoration: none;
  color: #fff !important;
}

.flexNavbar li a::before,
.flexNavbar li a::after {
  content: "";
  position: absolute;
  width: 51%;
  height: 0;
  background-color: #ffc815;
  z-index: 0;
  transition: height 300ms linear;
}

.flexNavbar li a::before {
  bottom: 0;
  left: 0;
}

.flexNavbar li a::after {
  right: 0;
  top: 0;
}

.flexNavbar a.active::before,
.flexNavbar a.active::after {
  height: 100%;
}

.flexNavbar li a span {
  position: relative;
  z-index: 1;
}

/* 浮动导航栏=>E */

/* 内容<=S */
.content-container {
  float: left;
  width: calc(100% - 460px);
  margin: 0;
  overflow: visible;
  height: auto;
  background-color: #eee;
}

.content-container > div {
  padding-top: 0;
  padding-bottom: 0;
}

.content-container > div:nth-child(1) {
  padding-top: 1px;
}

.content-container .v100 {
  min-height: 100vh;
}

.title-class {
  position: relative;
  z-index: 0;
  padding: 20px 0;
  margin: auto;
  overflow: hidden;
  background: url(../assets/images/homepage/title-class.png) no-repeat;
  background-size: cover;
  text-align: center;
  color: #fff;
}
.title-class .zh {
  font-size: 30px;
  margin: 0;
  position: relative;
  z-index: 20;
}
.title-class .en {
  position: relative;
  z-index: 20;
  font-size: 18px;
  margin-top: 4px;
  margin-bottom: 0;
}
/* 内容=>E */

@media screen and (max-width: 1400px) and (min-width: 0) {
  /* 浮动导航栏=>S */
  .flexNavbar {
    width: calc(100% - 300px);
    float: left;
  }

  .flexNavbar.isFlex {
    position: fixed;
    width: calc(100% - 140px - 300px);
    right: 70px;
    top: 0;
  }

  .flex-title,
  .placeholder {
    width: 300px;
  }
  .flex-title .title {
    height: 300px;
    line-height: 300px;
  }
  .content-container {
    width: calc(100% - 300px);
  }
  .flexNavbar.flex {
    width: calc(100% - 140px - 300px);
  }
  /* 浮动导航栏=>E */
  /* 内容<=S */
  .content-container {
    width: calc(100% - 300px);
  }
  /* 内容=>E */
}
@media screen and (max-width: 1064px) and (min-width: 0px) {
  .flexNavbar {
    width: 100%;
  }

  .flexNavbar.isFlex {
    top: 70px;
    right: 0;
    width: 100%;
  }

  .flexNavbar.flex {
    top: 70px;
  }
  .flexNavbar li a {
    padding: 20px 0;
  }
  .flex-title,
  .placeholder {
    display: none;
  }
  /* 内容<=S */
  .content-container {
    width: 100%;
  }
  .title-class {
    padding: 12px 0;
  }
  .title-class .zh {
    font-size: 20px;
  }
  .title-class .en {
    font-size: 14px;
    margin-top: 2px;
  }
  /* 内容=>E */
}
@media screen and (max-width: 760px) and (min-width: 0px) {
  .flexNavbar a {
    font-size: 14px;
    line-height: 46px;
  }
}
</style>


