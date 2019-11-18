<template>
  <div class="container" :class="{loading:isLoading}">
    <vue-scroll ref="vuescroll" @handle-scroll="handleScroll" @handle-resize="handleResize">
      <div class="slot-load" slot="load-start"></div>
      <div class="pic" v-for="(item, index) in pic" :key="index">
        <img :src="item.img" :onerror="img403" alt="加载失败" />
      </div>
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
      pageHeight: 0
    };
  },
  methods: {
    // 请求漫画图片
    reqComicPic() {
      this.axios({
        url:
          this.global.ComicVideoApi +
          this.global.ComicPic +
          this.$route.query.url
      }).then(res => {
        this.pic = res.data.list;
        this.isLoading = false;
      });
    },
    // 滚动事件
    handleScroll(v, h, e) {
      if (v.scrollTop <= 0) {
        console.log("到顶了");
      } else if (v.scrollTop >= this.pageHeight - e.path[2].offsetHeight) {
        console.log("到底了");
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
        if (this.comicCatalog[index].url == this.$route.url) {
          sub = index;
          break;
        }
      }

      // *
      // * 章节切换
      // * *
      let refresh = {
        // 切换到上一个章节
        top: () => {
          if (sub > 0) {
            this.$router.push({
              path: "/comicctt",
              query: { url: this.comicCatalog[index - 1].url }
            });
          }
        },
        // 切换到下一个章节
        bottom: () => {
          if (sub < this.comicCatalog.length) {
            this.$router.push({
              path: "/comicctt",
              query: { url: this.comicCatalog[index + 1].url }
            });
          }
        },
        // 跳转到指定章节
        link: () => {}
      };
      refresh[action]();
    }
  },
  created() {
    this.comicCatalog = this.$route.params.catalog;
    this.reqComicPic();
    this.axios({
      url:
        this.global.ComicVideoApi +
        this.global.ComicCatalog +
        this.$route.query.catalogUrl
    }).then(res => {
      this.comicCatalog = res.data.list;
    });
  }
};
</script>



<style scoped>
.container {
  height: 100%;
  width: 100%;
  background-color: #333333;
}
.pic {
  text-align: center;
}
</style>