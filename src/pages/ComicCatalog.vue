<template>
  <!-- 
  漫画目录页面
  -->
  <div class="container" :class="{loading:isLoading}">
    <vue-scroll ref="vuescroll">
      <!-- 请求失败展示画面 -->
      <div v-if="reqErr">对不起,暂无此漫画源!</div>
      
      <!-- 漫画封面 -->
      <div class="comicCover" v-if="!reqErr">
        <div class="cover">
          <img :src="comicInfo.cover" :onerror="img403" :alt="comicInfo.name" />
        </div>
        <div v-cloak>{{comicInfo.name}}</div>
        <div v-cloak>{{comicInfo.author | undefinedTo("未知来源")}}</div>
        <div v-cloak>{{comicInfo.introduce | undefinedTo("这个作者很懒什么也没写")}}</div>
        <div v-cloak>{{comicInfo.time | undefinedTo("未知时间段")}}</div>
        <div v-cloak>{{comicInfo.tag | undefinedTo("未知分类")}}</div>
        <div v-cloak>{{comicInfo.status | undefinedTo("更新状态未知")}}</div>
      </div>

      <!-- 漫画目录 -->
      <div class="comicCatalog row" v-if="!reqErr">
        <div class="chapter col-md-2 col-sm-3" v-for="(item,key) in comicCatalog" :key="key">
          <router-link
            :to="{path:'/comicctt',query:{chaperName:item.num,url:item.url,catalogUrl:$route.query.url}}"
            v-text="item.num"
          ></router-link>
        </div>
      </div>
    </vue-scroll>
  </div>
</template>



<script>
export default {
  data() {
    return {
      // 漫画目录数据组
      comicCatalog: [0],
      // 漫画信息
      comicInfo: [0],
      // 页面加载动画开关
      isLoading: true,
      // 请求失败开关
      reqErr: false,
      // 403图片地址
      img403: this.global.img403
    };
  },
  created() {
    //请求漫画目录数据和漫画信息
    this.axios({
      url:
        this.global.ComicVideoApi +
        this.global.ComicCatalog +
        this.$route.query.url
    }).then(res => {
      // 请求失败
      if (res.data.code == 1) {
        this.reqErr = true;
      } else {
        // 请求成功
        // 请求到的漫画目录数据传递给comicCatalog
        this.comicCatalog = res.data.list;
        // 请求到的漫画信息传递给comicInfo
        this.comicInfo = res.data.data;
      }
      // 去除页面加载动画
      this.isLoading = false;
    });
  }
};
</script>



<style scoped>
.container {
  height: 100%;
  width: 100%;
}
.cover {
  height: 424px;
  overflow: hidden;
}
.cover > img {
  display: block;
  margin: 0;
  height: 100%;
}
.comicCatalog {
  padding-bottom: 70px;
}
.chapter {
  position: relative;
  height: 48px;
}
.chapter > a {
  position: absolute;
  display: block;
  top: 10px;
  bottom: 10px;
  left: 30px;
  right: 30px;
  overflow: hidden;
  border: 1px solid #222;
  color: #222222;
  line-height: 28px;
  text-align: center;
}
.chapter:hover > a {
  background-color: #222;
  color: #fff;
}
</style>