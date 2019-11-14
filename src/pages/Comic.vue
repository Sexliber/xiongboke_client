<template>
  <div class="background">
    <div id="container" :class="{loading:isLoading}">
      <vue-scroll ref="vuescroll" @handle-scroll="handleScroll">
        <div class="row">
          <div
            v-for="(item,key) in comicCatalogData"
            :key="key"
            class="col-xm-1 col-md-2 col-sm-3 col-xs-6"
          >
            <div>
              <a :href="item.url" class="comic_pic" target="_blank" v-resetHeight>
                <img :title="item.name" :src="item.cover" />
              </a>
              <a :href="item.url" class="comic_tit" v-text="item.name"></a>
              <section class="comic_type" v-text="item.author"></section>
            </div>
          </div>
        </div>
      </vue-scroll>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comic",

  data() {
    return {
      // 页面加载状态
      isLoading: true,
      // 搜索内容
      search: "最新",
      // 漫画封面数组
      comicCatalogData: [0]
    };
  },

  methods: {
    // 滚动条事件
    handleScroll(e) {}
  },
  created() {
    this.axios({
      url: this.global.ComicVideoApi + this.global.ComicCover + this.search
    }).then(res => {
      // 请求到的漫画封面信息传递给comicCatalogData
      this.comicCatalogData = res.data.list;
      // 去除页面加载动画
      this.isLoading = false;
    });
  },

  directives: {
    // 获取图片宽度,并设置图片的高度为宽度的1.4倍
    resetHeight: {
      inserted(el) {
        console.log(el.offsetWidth);
        el.style.height = el.offsetWidth * 1.2 + "px";
      }
    }
  }
};
</script>

<style scoped>
.background {
  background: #f8f8f8;
  overflow: hidden;
}
#container {
  height: 100vh;
  margin: 8px;
}
.col-xm-1 {
  padding: 8px;
}
.col-xm-1 > div {
  background-color: #fff;
}
.comic_pic {
  display: block;
  overflow: hidden;
  width: 100%;
}
.comic_pic img {
  width: 100%;
}

.col-xm-1 > div {
  text-align: center;
  color: #888;
}
.comic_tit {
  display: block;
  padding: 4px 0 2px 0;
  color: #515151;
  font-size: 18px;
  white-space: nowrap;
}
.comic_type {
  padding-bottom: 4px;
  white-space: nowrap;
}
</style>