<template>
  <!-- 首屏轮播页=>S -->
  <div id="head-replay-banner" class="carousel slide">
    <ol class="carousel-indicators">
      <li data-target="#head-replay-banner" data-slide-to="0" class="active"></li>
      <li data-target="#head-replay-banner" data-slide-to="1"></li>
      <li data-target="#head-replay-banner" data-slide-to="2"></li>
      <li data-target="#head-replay-banner" data-slide-to="3"></li>
    </ol>
    <!-- Carousel items -->
    <div class="carousel-inner">
      <div class="active item">
        <div class="pic">
          <img src="../assets/images/homepage/advert-bg-1.jpg">
        </div>
        <div class="overlay"></div>
        <div class="hero-unit animated" :class="{fadeInUp:!isClass,fadeInDown:isClass}">
          <h1>New Works</h1>
          <p>Here are some of my works.</p>
          <p>
            <router-link :to="{path:'/designs'}" class="btn btn-large">最新作品</router-link>
          </p>
        </div>
      </div>
      <div class="item">
        <div class="pic">
          <img src="../assets/images/homepage/advert-bg-2.jpg">
        </div>
        <div class="overlay"></div>
        <div class="hero-unit animated" :class="{fadeInUp:!isClass,fadeInDown:isClass}">
          <h1>Soft and Tools</h1>
          <p>Here are some of my soft and tools.</p>
          <p>
            <router-link :to="{path:'/softs'}" class="btn btn-large">工具软件</router-link>
          </p>
        </div>
      </div>
      <div class="item">
        <div class="pic">
          <img src="../assets/images/homepage/advert-bg-3.jpg">
        </div>
        <div class="overlay"></div>
        <div class="hero-unit animated" :class="{fadeInUp:!isClass,fadeInDown:isClass}">
          <h1>Code Record</h1>
          <p>There is my code.</p>
          <p>
            <router-link :to="{path:'/codes'}" class="btn btn-large">代码审计</router-link>
          </p>
        </div>
      </div>
      <div class="item">
        <div class="pic">
          <img src="../assets/images/homepage/advert-bg-4.jpg">
        </div>
        <div class="overlay"></div>
        <div class="hero-unit animated" :class="{fadeInUp:!isClass,fadeInDown:isClass}">
          <h1>Cartoons</h1>
          <p>Here are some of movie and cartoons.</p>
          <p>
            <router-link :to="{path:'/cartoon'}" class="btn btn-large">影视动漫</router-link>
          </p>
        </div>
      </div>
    </div>
    <!-- Carousel nav -->
    <a
      class="carousel-control left"
      href="#head-replay-banner"
      data-slide="prev"
      @click="titleAnima"
    >
      <span class="glyphicon glyphicon-chevron-left"></span>
    </a>
    <a
      class="carousel-control right"
      href="#head-replay-banner"
      data-slide="next"
      @click="titleAnima"
    >
      <span class="glyphicon glyphicon-chevron-right"></span>
    </a>
  </div>
  <!-- 首屏轮播页=>E -->
</template>



<script>
import global from "../VueGlobal";
import { setInterval, clearInterval } from "timers";

export default {
  name: "HeadReplayBanner",
  data() {
    return {
      // banner文字动画类控制
      isClass: false,
      interval: null
    };
  },
  methods: {
    // 文字动画
    titleAnima() {
      if (this.interval != null) {
        clearInterval(this.interval);
      }
      this.isClass = true;
      setInterval(function() {
        this.isClass = false;
        this.interval = null;
      }, 300);
    }
  },
  props: {
    headBannerArr: Array
  }
};
</script>



<style scoped>
/* 首屏轮播页=>S */

#head-replay-banner {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100vh;
}

#head-replay-banner .animated {
  animation-duration: 300ms;
  -webkit-animation-duration: 300ms;
}

#head-replay-banner .animated.fadeInDown {
  animation-delay: 300ms;
}

.carousel-indicators {
  z-index: 40;
}

.carousel-inner,
.carousel-inner .item,
.carousel-inner .pic {
  height: 100%;
  overflow: hidden;
}

.carousel-inner .pic {
  width: 10000px;
  position: relative;
  left: 50%;
  margin-left: -5000px;
}

.carousel-inner .pic img {
  display: block;
  z-index: -1;
  height: 100%;
  width: auto;
  margin: 0 auto;
}

.carousel-inner .text {
  position: absolute;
}

.carousel-control {
  line-height: 100vh;
  width: 10%;
  -webkit-transition: all 300ms linear;
  transition: all 300ms linear;
}

.carousel-control .glyphicon {
  opacity: 0;
  -webkit-transition: all 300ms linear;
  transition: all 300ms linear;
}

.carousel-control:hover .glyphicon {
  opacity: 1;
}

.overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
  -webkit-transition: all 600ms linear;
  transition: all 600ms linear;
}

#head-replay-banner .hero-unit {
  position: absolute;
  font-family: fantasy;
  top: 36%;
  left: 14%;
  color: #fff;
  border-left: 1px solid rgba(255, 255, 255, 0.4);
  padding: 36px;
}

#head-replay-banner .hero-unit > h1 {
  font-size: 64px;
}

#head-replay-banner .hero-unit > p {
  line-height: 24px;
  font-size: 20px;
  margin: 20px 0;
}

#head-replay-banner .hero-unit a {
  font-size: 20px;
  padding: 10px 60px;
  color: #fff;
  background-color: rgb(255, 200, 21);
  border-color: rgb(255, 200, 21);
}

#head-replay-banner .hero-unit a:hover {
  color: #fff;
}

ol li {
  position: relative;
  width: 12px;
  border-radius: 0;
  padding: 0 20px;
  height: 4px !important;
  margin: 0 4px !important;
  word-break: break-all;
  overflow: hidden;
}

ol li::before {
  position: absolute;
  display: block;
  content: "";
  width: 0;
  height: 4px;
  background-color: rgb(255, 200, 21);
  top: 0;
  left: 0;
  transition: width 300ms linear;
}

ol li.active {
  border-color: rgb(255, 200, 21);
  background-color: transparent;
}

ol li.active::before {
  width: 120%;
}

@media screen and (max-width: 1064px) and (min-width: 0px) {
  /* 轮播页=>S */
  #head-replay-banner {
    width: 100%;
    height: calc(100vh - 70px);
  }
  .carousel-indicators {
    z-index: 2;
  }
  .carousel-inner .pic img {
    height: 100%;
    width: auto;
  }
  .carousel-control .glyphicon {
    opacity: 1;
  }
  /* 轮播页=>E */
}

@media screen and (max-width: 760px) and (min-width: 0px) {
  /* 轮播页=>S */
  #head-replay-banner .hero-unit {
    top: 26%;
  }
  #head-replay-banner .hero-unit > h1 {
    font-size: 42px;
  }
  #head-replay-banner .hero-unit > p {
    margin: 10px 0;
  }
  /* 轮播页=>E */
}

/* 首屏轮播页=>E */
</style>

