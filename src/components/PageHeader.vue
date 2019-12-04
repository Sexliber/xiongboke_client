<template>
  <div>
    <!-- 导航栏=>S -->
    <header>
      <!-- logo=>S -->
      <router-link :to="{path:'/',query:''}" class="logo-holder">
        <img src="../assets/images/logo.png" alt="首页" />
      </router-link>
      <!-- logo=>E -->

      <!-- 菜单按钮=>S -->
      <div
        class="nav-button durate"
        id="open-button"
        :class="{active:meanIsActive}"
        @click="meanIsActive=!meanIsActive"
      >
        <span class="menu-global menu-top"></span>
        <span class="menu-global menu-middle"></span>
        <span class="menu-global menu-bottom"></span>
      </div>
      <!-- 菜单按钮=>E -->

      <!-- 联系按钮=>S -->
      <div
        class="show-share durate"
        id="contact"
        :class="{isShare:!contIsActive}"
        @click="contIsActive=!contIsActive"
      >
        <img src="../assets/images/share.png" alt="联系方式" />
      </div>
      <ul class="contact-container">
        <a href>
          <li class="contact" :class="{visible:contIsActive}">
            <i class="fa fa-qq" aria-hidden="true"></i>
          </li>
        </a>
        <a href>
          <li class="contact visible-1" :class="{visible:contIsActive}">
            <i class="fa fa-weixin" aria-hidden="true"></i>
          </li>
        </a>
        <a href>
          <li class="contact visible-2" :class="{visible:contIsActive}">
            <i class="fa fa-steam" aria-hidden="true"></i>
          </li>
        </a>
        <a href>
          <li class="contact visible-3" :class="{visible:contIsActive}">
            <i class="fa fa-facebook" aria-hidden="true"></i>
          </li>
        </a>
        <a href @click.prevent="doMusicPlayer">
          <li class="contact visible-4" :class="{visible:contIsActive}">
            <i class="fa fa-music" aria-hidden="true"></i>
          </li>
        </a>
      </ul>
      <!-- 联系按钮=>E -->
    </header>

    <!-- 菜单栏=>S -->
    <div class="mean-container" :class="{hide:!meanIsActive,show:meanIsActive}">
      <!-- 菜单logo=>S -->
      <div class="mean-logo">
        <img src="../assets/images/logo-title.png" />
      </div>
      <!-- 菜单logo=>E -->

      <!-- 菜单清单=>S -->
      <div id="mean" class="clearboth">
        <ul class="mean-list">
          <li class="mean-item" v-for="(item,i) in links" :key="i" @click="meanIsActive=false">
            <router-link :to="item.url" class="white" v-text="item.title"></router-link>
          </li>
        </ul>
      </div>
      <!-- 菜单清单=>E -->
    </div>
    <!-- 菜单栏=>E -->

    <!-- 导航栏=>E -->
  </div>
</template>



<script>
// 移动设备检测模块
import isMobile from "../libs/isMobile";
// 音乐播放器数据广播站
import MusicPlayer from "../model/MusicPlayer";

export default {
  name: "PageHeader",
  data() {
    return {
      //首选分类数据=>S
      links: [
        { url: { path: "/", query: {} }, title: "我的首页" },
        { url: { path: "/comic", query: {} }, title: "漫画区域" },
        { url: { path: "/video", query: {} }, title: "影视欣赏" },
        { url: { path: "/", query: {} }, title: "最新设计" },
        { url: { path: "/", query: {} }, title: "网站实例" },
        { url: { path: "/", query: {} }, title: "代码审计" }
      ],
      //首选分类数据=>E

      // 操作菜单响应
      meanIsActive: false,
      // 操作联系按钮响应
      contIsActive: false
    };
  },
  methods: {
    doMusicPlayer() {
      // 非移动设备下通过MusicPlayer数据广播站传递isShow的值为true使音乐播放器显示
      MusicPlayer.$emit("isShow", !isMobile);
    }
  }
};
</script>




<style scoped>
header {
  position: fixed;
  top: 0;
  height: 100vh;
  width: 70px;
  background-color: #222222;
}

header {
  z-index: 9999;
}

.logo-holder {
  position: absolute;
  top: 60px;
  left: 15px;
}

.logo-holder img {
  width: 40px;
  height: auto;
}

.nav-button {
  position: absolute;
  width: 30px;
  height: 30px;
  margin-top: -15px;
  top: 50%;
  left: 20px;
  z-index: 10;
  cursor: pointer;
}

.menu-global {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  position: absolute;
  left: 0;
  border-top: 3px solid #fff;
  width: 100%;
  -webkit-transition: 0.55s;
  transition: 0.55s;
}

.menu-top {
  top: 0;
}

.menu-middle {
  top: 10px;
}

.menu-bottom {
  top: 20px;
}

.nav-button.active .menu-top {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  top: 10px;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-transition: 0.55s 0.5s;
  transition: 0.55s 0.5s;
}

.nav-button.active .menu-middle {
  opacity: 0;
}

.nav-button.active .menu-bottom {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  top: 10px;
  -webkit-transform: rotate(-405deg);
  transform: rotate(-405deg);
  -webkit-transition: 0.55s 0.5s;
  transition: 0.55s 0.5s;
}
.nav-button:after {
  content: "mean";
  position: absolute;
  top: -36px;
  left: -4px;
  font-family: Georgia, "Times New Roman", Times, serif;
  float: left;
  text-align: center;
  font-style: italic;
  color: #fff;
  opacity: 0;
  visibility: hidden;
}

.nav-button:hover:after {
  top: -28px;
  opacity: 1;
  visibility: visible;
}

.show-share {
  position: absolute;
  bottom: 46px;
  left: 22px;
  cursor: pointer;
  width: 20px;
  height: 20px;
}

.show-share img {
  width: 20px;
  height: auto;
}

.show-share:after {
  content: "contact";
  position: absolute;
  top: -36px;
  left: -12px;
  font-family: Georgia, "Times New Roman", Times, serif;
  float: left;
  text-align: center;
  font-style: italic;
  color: #fff;
  opacity: 0;
  visibility: hidden;
}

.show-share:hover:after {
  top: -28px;
  opacity: 1;
  visibility: visible;
}

.show-share:before {
  content: "";
  position: absolute;
  top: 10px;
  left: -5px;
  width: 30px;
  height: 1px;
  z-index: 5;
  background-color: rgb(255, 200, 21);
}

.show-share.isShare:before {
  width: 0;
}

.contact-container {
  position: absolute;
  list-style: none;
  width: 500px;
  left: 80px;
  bottom: 34px;
}

.contact-container::after {
  display: block;
  content: "";
  clear: both;
}

.contact-container .contact {
  color: #000;
  float: left;
  height: 40px;
  width: 40px;
  background-color: rgb(255, 200, 21);
  font-size: 12px;
  line-height: 40px;
  text-align: center;
  opacity: 0;
  margin: -1000px -1000px;
  transition-property: opacity;
  transition-duration: 300ms;
  transition-timing-function: linear;
}

.contact-container .contact:hover {
  background-color: rgb(180, 139, 6);
}

.contact-container .visible {
  margin: 0;
  opacity: 1;
}
.visible-1 {
  transition-delay: 100ms;
}
.visible-2 {
  transition-delay: 200ms;
}
.visible-3 {
  transition-delay: 300ms;
}
.visible-4 {
  transition-delay: 400ms;
}

.mean-container {
  top: 0;
  z-index: 999;
  position: fixed;
  left: 70px;
  height: 100vh;
  width: 370px;
  background-color: rgba(0, 0, 0, 0.75);
  overflow: hidden;
  -webkit-animation-duration: 800ms;
  animation-duration: 800ms;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}

.mean-container.show {
  margin-left: 0;
  border-radius: 0;
  -webkit-animation-name: mean-container-show;
  animation-name: mean-container-show;
}

.mean-container.hide {
  margin-left: -370px;
  border-radius: 0;
  -webkit-animation-name: mean-container-hide;
  animation-name: mean-container-hide;
}

@keyframes mean-container-hide {
  from {
    margin-left: 0px;
    border-radius: 0;
  }
  to {
    margin-left: -370px;
    border-radius: 0;
  }
}

@-webkit-keyframes mean-container-hide {
  from {
    margin-left: 0px;
    border-radius: 0;
  }
  to {
    margin-left: -370px;
    border-radius: 0;
  }
}

@keyframes mean-container-show {
  0% {
    margin-left: -370px;
  }
  50% {
    border-radius: 50%;
    margin-left: -185px;
  }
  60% {
    border-radius: 0;
    margin-left: 0;
  }
  70% {
    margin-left: 0;
    border-top-right-radius: 8%;
    border-bottom-right-radius: 8%;
  }
  80% {
    margin-left: 0;
    border-radius: 0;
  }
  90% {
    margin-left: 0;
    border-top-right-radius: 8%;
    border-bottom-right-radius: 8%;
  }
  100% {
    margin-left: 0;
    border-radius: 0;
  }
}

@-webkit-keyframes mean-container-show {
  0% {
    margin-left: -370px;
  }
  50% {
    border-radius: 50%;
    margin-left: -185px;
  }
  60% {
    border-radius: 0;
    margin-left: 0;
  }
  70% {
    margin-left: 0;
    border-top-right-radius: 8%;
    border-bottom-right-radius: 8%;
  }
  80% {
    margin-left: 0;
    border-radius: 0;
  }
  90% {
    margin-left: 0;
    border-top-right-radius: 8%;
    border-bottom-right-radius: 8%;
  }
  100% {
    margin-left: 0;
    border-radius: 0;
  }
}

.mean-logo {
  margin: 54px 70px;
  text-align: center;
}

#mean {
  position: absolute;
  margin-top: -106px;
  top: 50%;
  left: 0;
  width: 1000%;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  -webkit-transition: all 300ms linear;
  transition: all 300ms linear;
  margin-left: 0;
}

.mean-list {
  width: 10%;
  float: left;
  list-style: none;
}

.mean-list a {
  color: #fff;
  text-decoration: none;
}

#mean li {
  position: relative;
  width: 100%;
  padding: 12px 0;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

/* 导航栏,联系方式=>E */

/* 移动设备重置样式 */

@media screen and (max-width: 1064px) and (min-width: 0px) {
  /* 导航栏,联系方式=>S */
  header,
  footer {
    width: 100vw;
    height: 42px;
  }
  .logo-holder {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .logo-holder img {
    width: 24px;
  }
  .show-share {
    top: 50%;
    left: auto;
    right: 30px;
    height: 24px;
    width: 24px;
    transform: translateY(-50%);
  }
  .show-share img {
    display: block;
    width: 24px;
  }
  .nav-button {
    top: 50%;
    margin-top: 0;
    left: 30px;
    transform: translateY(-50%);
    height: 20px;
    width: 24px;
  }
  .menu-global {
    border-width: 2px;
  }
  .menu-middle {
    top: 9px;
  }
  .menu-bottom {
    top: 18px;
    height: 0;
  }
  .nav-button:hover::after,
  .show-share:hover::after {
    visibility: hidden;
  }
  .contact-container {
    width: 40px;
    top: 80px;
    left: 100%;
    margin-left: -60px;
  }
  .mean-container {
    margin-left: -320px;
    top: 42px;
    left: 0;
    width: 320px;
    height: calc(100vh - 42px);
  }
  /* 导航栏,联系方式=>E */
}
</style>

