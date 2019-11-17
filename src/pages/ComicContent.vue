<template>
  <div class="container" :class="{loading:isLoading}">
    <vue-scroll>
      <div class="pic" v-for="(item, index) in pic" :key="index">
        <img :src="item.img" alt="加载失败" />
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
      isLoading: true
    };
  },
  created() {
    this.comicCatalog = this.$route.params.catalog;
    this.axios({
      url:
        this.global.ComicVideoApi + this.global.ComicPic + this.$route.query.url
    }).then(res => {
      this.pic = res.data.list;
      this.isLoading = false;
    });
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
}
.pic {
  text-align: center;
}
</style>