<template>
  <!-- *
  * 漫画内容页面
  **-->
  <div class="container" :class="{loading:isLoading}">
    <!-- 菜单栏按钮 -->
    <div class="mean-button" v-show="meanButtonShow" @click="showMean=!showMean">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
    <!-- 菜单栏 -->
    <div class="mean" :class="{showMean:showMean}">
      <div class="link">
        <router-link to="/comic" class="fa fa-home"></router-link>
      </div>
      <div class="link">
        <a to="/comic" class="fa fa-bars" @click="showCatalog=!showCatalog"></a>
      </div>
      <div class="link"></div>
    </div>
    <!-- 目录 -->
    <div class="catalog" :class="{show:showCatalog}">
      <vue-scroll>
        <router-link
          v-for="(item, index) in comicCatalog"
          :key="index"
          v-text="item.num"
          :to="{path:'/comicctt',query:{url:item.url,catalogUrl: $route.query.catalogUrl}}"
        ></router-link>
      </vue-scroll>
    </div>

    <vue-scroll ref="vuescroll" @handle-scroll="handleScroll" @handle-resize="handleResize">
      <!-- 前往上个章节按钮 -->
      <div class="toPreChapter" @click="rechapter('top')" v-show="toPreChapterFlag">上一章</div>
      <!-- 漫画图片 -->
      <div @click="meanButtonShow=!meanButtonShow">
        <div class="pic" v-for="(item, index) in pic" :key="index">
          <img :src="item.img" :onerror="img403" alt="加载失败" />
        </div>
      </div>
      <!-- 前往下个章节按钮 -->
      <div class="toNextChapter" @click="rechapter('bottom')">下一章</div>
    </vue-scroll>
  </div>
</template>



<script>
export default {
  data() {
    return {
      // 漫画图片
      pic: [0],
      // 漫画目录
      comicCatalog: [0],
      //   页面加载动画开关
      isLoading: true,
      // 403图片地址
      img403: this.global.img403,
      // 页面高度
      pageHeight: 0,
      // 章节跳转开关
      toPreChapterFlag: false,
      // 菜单按钮显示开关
      meanButtonShow: false,
      // 菜单开关
      showMean: false,
      // 目录开关
      showCatalog: false
    };
  },
  watch: {
    // 监听路由变化
    $route: function(newRoute, oldRoute) {
      // 请求漫画资源
      this.reqComicPic();
      // 滚动条归零
      this.$refs["vuescroll"].scrollTo({ y: 0 }, 0);
      // 隐藏菜单和按钮
      this.meanButtonShow = this.showMean = this.showCatalog = false;
    }
  },
  methods: {
    // 请求漫画图片和目录
    reqComicPic() {
      // 刷新数组
      this.pic = [0];
      // 开启加载动画
      this.isLoading = true;
      // 请求漫画图片
      this.axios({
        url:
          this.global.ComicVideoApi +
          this.global.ComicPic +
          this.$route.query.url
      }).then(res => {
        this.pic = res.data.list;
        this.isLoading = false;
      });
      // 请求漫画目录
      this.axios({
        url:
          this.global.ComicVideoApi +
          this.global.ComicCatalog +
          this.$route.query.catalogUrl
      }).then(res => {
        this.comicCatalog = res.data.list;
      });
    },
    // 滚动事件
    handleScroll(v, h, e) {
      if (v.scrollTop <= 0) {
        this.toPreChapterFlag = true;
      } else {
        this.toPreChapterFlag = false;
      }
    },
    // 页面尺寸改变事件
    handleResize(v, h, e) {
      this.pageHeight = e.height;
    },
    // 漫画章节切换
    rechapter(action) {
      // 获取当前章节在目录数组中的脚标号
      let sub = 0;

      for (let index in this.comicCatalog) {
        if (this.comicCatalog[index].url == this.$route.query.url) {
          sub = index;
          break;
        }
      }

      // *
      // * 章节切换
      // * *
      switch (action) {
        case "top":
          if (sub > 0) sub--;
          break;

        case "bottom":
          if (sub < this.comicCatalog.length) sub++;
          break;

        default:
          break;
      }
      this.$router.push({
        path: "/comicctt",
        query: {
          url: this.comicCatalog[sub].url,
          catalogUrl: this.$route.query.catalogUrl
        }
      });
    }
  },
  created() {
    this.reqComicPic();
  }
};
</script>



<style scoped>
.container {
  padding: 0;
  height: 100%;
  width: 100%;
  background-color: #333333;
}
.pic {
  text-align: center;
}
.pic > img {
  max-width: 100%;
}
.toPreChapter,
.toNextChapter {
  padding: 10px;
  background-color: #ffc815;
  color: #fff;
  text-align: center;
  cursor: pointer;
}
/* 菜单栏 */
.mean,
.mean-button {
  position: absolute;
  left: 0;
  top: 50%;
  height: 50px;
  background-color: rgba(34, 34, 34, 0.4);
  transform: translate(-50%, -50%);
  border-radius: 25px;
  transition-duration: 400ms;
}
.mean-button {
  padding: 14px 0px 14px 42px;
  width: 70px;
  cursor: pointer;
  z-index: 4;
}
.mean-button .bar {
  width: 14px;
  height: 2px;
  background-color: #ffffff;
  margin: 4px 0;
}
.mean {
  width: 0;
  height: 0;
  border-radius: 0;
  z-index: 3;
  overflow: hidden;
}
.showMean {
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: rgba(34, 34, 34, 0.6);
}
.link {
  position: absolute;
  width: 24px;
  color: #fff;
  font-size: 24px;
}
.link a {
  color: #fff;
}
.link:first-child {
  top: 25%;
  left: 50%;
  transform: translate(40%, -50%);
}
.link:nth-child(2) {
  top: 50%;
  right: 25%;
  transform: translate(80%, -50%);
}
/* 目录 */
.catalog {
  position: absolute;
  z-index: 3;
  right: 0;
  top: 0;
  width: 240px;
  height: 100%;
  background-color: rgba(34, 34, 34, 0.6);
  transform: translateX(100%);
  transition-duration: 400ms;
}
.catalog.show {
  transform: translateX(0);
}
.catalog a {
  overflow: hidden;
  display: block;
  padding: 10px 20px;
  border-bottom: #777 solid 1px;
  color: #fff;
  white-space: nowrap;
}
</style>