<template>
  <!-- 首屏轮播页=>S -->
  <div id="replay-banner">
    <ul class="click-circle">
      <li
        v-for="(item, key) in GetData"
        :key="key"
        :class="{active:isActive[key]}"
        @click="toItem(key)"
      />
    </ul>
    <!-- 轮播项目 -->
    <div class="item-container">
      <div
        v-for="(item, key) in GetData"
        :key="key"
        class="item"
        :class="{active:isActive[key],next:isNext[key],left:isLeft[key],right:isRight[key]}"
      >
        <div class="pic" :style="{backgroundImage:`url(${item.thumbnail})`}"/>
        <div class="overlay"></div>
        <div class="hero-unit animated">
          <h1 v-text="item.en"></h1>
          <p v-text="item.entext"></p>
          <p>
            <router-link :to="{path:item.path}" class="btn btn-large" v-text="item.zh"></router-link>
          </p>
        </div>
      </div>
    </div>
    <!-- 左右切换按钮 -->
    <a class="to-left" @click="leftAndRight('left')">
      <span class="glyphicon glyphicon-chevron-left"></span>
    </a>
    <a class="to-right" @click="leftAndRight('right')">
      <span class="glyphicon glyphicon-chevron-right"></span>
    </a>
  </div>
  <!-- 首屏轮播页=>E -->
</template>



<script>
export default {
  name: "HeadReplayBanner",
  data() {
    return {
      // active类控制器
      isActive: [false],
      // 上一个获取到active类的key值
      lastActiveKey: 0,
      // next类控制器
      isNext: [false],
      // 上一个获取到next类的key值
      lastNextKey: 0,
      // left类控制器
      isLeft: [false],
      // right类控制器
      isRight: [false],
      // 定时器
      timer: null,
      // 轮播定时器
      replayTimer: null,
      //   轮播间隔时间
      intervalTime: 5000,
      //   可切换状态
      isReplay: true
    };
  },
  props: {
    GetData: Array
  },
  watch: {
    GetData: function(newData, oldData) {
      this.initArrLength();
    }
  },
  methods: {
    // 切换到指定轮播图
    toItem(key, forceLeft, forceRight) {
      this.isReplay = false;
      // 清除未完成动画
      clearTimeout(this.timer);
      //   清除轮播定时器
      clearTimeout(this.replayTimer);

      // 判断是否强制移动方向
      if (forceLeft == undefined) forceLeft = false;
      if (forceRight == undefined) forceRight = false;

      //   *
      //   *如果跳转的项目key值大于上一个获取到active的key值,
      //   * 则这两个项目都获得left类,
      //   * 并且跳转的项目添加一个next类
      //   *
      if (key != this.lastActiveKey) {
        // 左移
        var left = () => {
          this.isNext.splice(key, 1, true);
          this.isLeft.splice(key, 1, true);
          this.isLeft.splice(this.lastActiveKey, 1, true);
        };
        // 右移
        var right = () => {
          this.isNext.splice(key, 1, true);
          this.isRight.splice(key, 1, true);
          this.isRight.splice(this.lastActiveKey, 1, true);
        };
        if (forceLeft) {
          right();
        } else if (forceRight) {
          left();
        } else {
          if (key > this.lastActiveKey) {
            left();
          } else if (key < this.lastActiveKey) {
            right();
          }
        }
        this.timer = setTimeout(() => {
          this.isActive.splice(this.lastActiveKey, 1, false);
          this.isActive.splice(key, 1, true);
          this.lastActiveKey = key;
          var i = 0;
          for (i in this.isNext) {
            this.isNext.splice(i, 1, false);
            this.isLeft.splice(i, 1, false);
            this.isRight.splice(i, 1, false);
          }
          clearTimeout(this.timer);
          this.isReplay = true;

          //   继续轮播
          this.replayTimer = setTimeout(() => {
            this.replay();
          }, this.intervalTime);
        }, 600);
      }
    },
    // 左右切换按钮
    leftAndRight(dire) {
      if (this.isReplay) {
        var key = 0;
        if (dire == "left") {
          key = this.lastActiveKey - 1;
          if (key < 0) key = this.isActive.length - 1;
          this.toItem(key, true, undefined);
        } else if (dire == "right") {
          key = this.lastActiveKey + 1;
          if (key >= this.isActive.length) key = 0;
          this.toItem(key, undefined, true);
        } else return;
      }
    },
    // 轮播
    replay() {
      var key = this.lastActiveKey + 1;
      if (key >= this.isActive.length) key = 0;
      this.toItem(key, undefined, true);
    },
    // 初始化数组控制器长度
    initArrLength() {
      //  初始化类控制器长度
      var i = 0;
      for (i in this.GetData) {
        if (i == 0) {
          this.isActive.splice(i, 1, true);
        } else {
          this.isActive.splice(i, 1, false);
        }
        this.isNext.splice(i, 1, false);
        this.isLeft.splice(i, 1, false);
        this.isRight.splice(i, 1, false);
      }
    }
  },
  created() {
    this.initArrLength();
  },
  mounted() {
    this.replayTimer = setTimeout(() => {
      this.replay();
    }, this.intervalTime);
  }
};
</script>



<style scoped>
#replay-banner {
  position: relative;
  height: 100%;
  overflow: hidden;
}
.click-circle {
  position: absolute;
  z-index: 2;
  width: 60%;
  padding-left: 0;
  margin-left: -30%;
  text-align: center;
  list-style: none;
  left: 50%;
  bottom: 2%;
}
.click-circle li {
  display: inline-block;
  height: 4px;
  width: 42px;
  box-sizing: border-box;
  border: 1px solid #fff;
  margin: 0 4px;
  cursor: pointer;
}
.click-circle li.active {
  background-color: #ffc815;
  border-width: 0;
}
.item-container {
  position: relative;
  height: 100%;
}
.to-left,
.to-right {
  position: absolute;
  top: 0;
  height: 100%;
  line-height: 100%;
  text-align: center;
  width: 10%;
  transition: all 0.3s linear;
}
.to-left span,
.to-right span {
  position: absolute;
  display: none;
  font-size: 0.32rem;
  height: 0.32rem;
  width: 0.32rem;
  color: #fff;
  top: 50%;
  margin-top: -0.16rem;
  left: 50%;
  margin-left: -0.16rem;
}
.to-left:hover span,
.to-right:hover span {
  display: block;
}
.to-left {
  left: 0;
}
.to-left:hover {
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.5) 0,
    rgba(0, 0, 0, 0.0001) 100%
  );
}
.to-right {
  right: 0;
}
.to-right:hover {
  background: linear-gradient(
    to left,
    rgba(0, 0, 0, 0.5) 0,
    rgba(0, 0, 0, 0.0001) 100%
  );
}
.item {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: none;
  background-color: #222222;
}
.item .pic {
  position: relative;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.hero-unit {
  position: absolute;
  z-index: 2;
  font-family: fantasy;
  top: 36%;
  left: 14%;
  color: #fff;
  border-left: 1px solid hsla(0, 0%, 100%, 0.4);
  padding: 36px;
}
.hero-unit h1 {
  font-size: 64px;
}
.hero-unit > p {
  line-height: 24px;
  font-size: 20px;
  margin: 20px 0;
}
.hero-unit a {
  font-size: 20px;
  padding: 10px 60px;
  color: #fff;
  background-color: #ffc815;
  border-color: #ffc815;
}
.active {
  display: block;
  left: 0;
}
.next {
  display: block;
  left: 0;
}
.active.left {
  left: -100%;
  transition: all 600ms ease-in-out;
}
.next.left {
  animation: left 600ms ease-in-out;
}
.active.right {
  left: 100%;
  transition: all 600ms ease-in-out;
}
.next.right {
  animation: right 600ms ease-in-out;
}
@keyframes left {
  from {
    left: 100%;
  }
  to {
    left: 0;
  }
}
@keyframes right {
  from {
    left: -100%;
  }
  to {
    left: 0;
  }
}
@media screen and (max-width: 500px) {
  .hero-unit {
    top: 24%;
    left: 14%;
  }
  .hero-unit h1 {
    font-size: 42px;
  }
}
</style>
