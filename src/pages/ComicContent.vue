<template>
  <div class="container" :class="{loading:isLoading}">
    <div class="mean"></div>
    <vue-scroll ref="vuescroll" @handle-scroll="handleScroll" @handle-resize="handleResize">
      <div class="toPreChapter" @click="rechapter('top')" v-show="toPreChapterFlag">上一章</div>
      <div class="slot-load" slot="load-start"></div>
      <div class="pic" v-for="(item, index) in pic" :key="index">
        <img :src="item.img" :onerror="img403" alt="加载失败" />
      </div>
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
      toPreChapterFlag: false
    };
  },
  watch: {
    $route: function(newRoute, oldRoute) {
      this.reqComicPic();
      this.$refs["vuescroll"].scrollTo({ y: 0 }, 0);
    }
  },
  methods: {
    // 请求漫画图片和目录
    reqComicPic() {
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
.toPreChapter,.toNextChapter{
  padding: 10px;
  background-color: #ffc815;
  color: #fff;
  text-align: center;
  cursor: pointer;
}
</style>