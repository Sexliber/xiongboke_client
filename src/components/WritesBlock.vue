<template>
  <router-link :to="{name:'writes',params:{url:data.url}}">
    <div class="write" ref="write" @mouseleave="mousePassedDire" @mouseenter="mousePassedDire">
      <div class="bg-pic">
        <img :src="data.cover" />
      </div>
      <div ref="content" class="content-wrap" :class="className">
        <div class="align-center">
          <div class="title darkgray">
            <h3 v-text="data.title" />
          </div>
          <div class="text">
            <span v-text="data.text"></span>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>



<script>
export default {
  name: "WritesBlock",
  props: ["data"],
  data() {
    return {
      // 文章块元素的dom对象
      writeBlockDom: null,
      // 获取正文区块dom
      contentDom: null,
      // 鼠标移入移出class属性操作
      className: "",
      // 鼠标移入移出方向
      dire: ["top", "right", "bottom", "left"]
    };
  },
  methods: {
    // 清除执行动画的class类名
    clearAnima() {
      this.contentDom.className = "content-wrap";
    },
    mousePassedDire(e) {
      // 清除上一个执行的动画
      this.clearAnima();

      // 获取文章块元素宽高
      let h = this.writeBlockDom.offsetHeight,
        w = this.writeBlockDom.offsetWidth;

      // 获取x,y判断点
      let x = (e.offsetX - w / 2) * (w > h ? h / w : 1),
        y = (e.offsetY - h / 2) * (h > w ? w / h : 1);

      // 判断方向
      let direction =
        Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90 + 3) % 4;

      // 添加动画类名
      this.className = e.type === "mouseleave" ? "fadeout" : "fadein";
      this.className += " " + this.dire[direction];
    }
  },
  mounted() {
    // 获取文章块元素的dom
    this.writeBlockDom = this.$refs["write"];
    // 获取正文块dom
    this.contentDom = this.$refs["content"];
  }
};
</script>



<style scoped>
.write {
  position: relative;
  overflow: hidden;
  perspective: 500px;
}

img {
  display: block;
  width: 100%;
  transition: transform 300ms linear;
}

/* 获取光标后图片放大 */
.write:hover img {
  transform: translateZ(60px);
}

/* *
* 鼠标移入移出动画
* */
.content-wrap {
  position: absolute;
  overflow: hidden;
  transform: translate3d(0, -100%, 0);
  top: 0;
  width: 100%;
  height: 100%;
  animation-name: none;
  animation-duration: 300ms;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
}
.align-center {
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  height: 100%;
}
.align-center > div {
  flex: 0 0 100%;
  background-color: rgba(255, 255, 255, 0.84);
}
/* 鼠标在盒子顶部移入移出 */
.fadein.top,
.fadeout.top {
  animation-name: fade-top;
}
.fadeout.top {
  animation-direction: reverse;
}
@keyframes fade-top {
  0% {
    transform: translate3d(0, -100%, 0);
  }
  50% {
    transform: translate3d(0, -50%, 0);
  }
  100% {
    transform: translate3d(0, 0, -60px);
  }
}
/* 鼠标在盒子底部移入移出 */
.fadein.bottom,
.fadeout.bottom {
  animation-name: fade-bottom;
}
.fadeout.bottom {
  animation-direction: reverse;
}
@keyframes fade-bottom {
  0% {
    transform: translate3d(0, 100%, 0);
  }
  50% {
    transform: translate3d(0, 50%, 0);
  }
  100% {
    transform: translate3d(0, 0, -60px);
  }
}
/* 鼠标在盒子左侧移入移出 */
.fadein.left,
.fadeout.left {
  animation-name: fade-left;
}
.fadeout.left {
  animation-direction: reverse;
}
@keyframes fade-left {
  0% {
    transform: translate3d(-100%, 0, 0);
  }
  50% {
    transform: translate3d(-50%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, -60px);
  }
}
/* 鼠标在盒子右侧移入移出 */
.fadein.right,
.fadeout.right {
  animation-name: fade-right;
}
.fadeout.right {
  animation-direction: reverse;
}
@keyframes fade-right {
  0% {
    transform: translate3d(100%, 0, 0);
  }
  50% {
    transform: translate3d(50%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, -60px);
  }
}

/* *
* 文字内容
* */

/* 标题 */
.align-center .title {
  margin: 0;
  padding: 0;
  background-color: #ffffff;
  border-bottom: 3px solid #ffc815;
}
.title h3 {
  margin: 14px 0;
  padding: 0 14px;
  font-size: 18px;
  line-height: 20px;
}
/* 正文 */
.text {
  padding: 16px;
  color: #777777;
}
</style>

