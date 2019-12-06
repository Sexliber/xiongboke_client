<template>
  <!-- 
  影视目录页面
  -->
  <div class="container" :class="{loading:isLoading}">
    <vue-scroll ref="vuescroll">
      <!-- 请求失败展示画面 -->
      <div v-if="reqErr">对不起,暂无此影视源!</div>

      <!-- 影视封面 -->
      <div class="videoCover" v-if="!reqErr">
        <div class="cover">
          <img :src="videoInfo.cover" :onerror="img403" :alt="videoInfo.name" />
        </div>
        <div v-cloak>名称：{{videoInfo.name}}</div>
        <div v-cloak>导演：{{videoInfo.director | undefinedTo("未知")}}</div>
        <div v-cloak>剧情：{{videoInfo.introduce | undefinedTo("保密")}}</div>
        <div v-cloak>上映日期：{{videoInfo.Release | undefinedTo("未知时间段")}}</div>
        <div v-cloak>分类：{{videoInfo.genre | undefinedTo("未知分类")}}</div>
        <div v-cloak>主演:{{videoInfo.performer | undefinedTo("未知")}}</div>
        <div v-cloak>区域:{{videoInfo.region | undefinedTo("未知")}}</div>
      </div>

      <!-- 影视目录 -->
      <div class="videoCatalog row" v-if="!reqErr">
        <div class="chapter col-md-2 col-sm-3" v-for="(item,key) in videoCatalog" :key="key">
          <a
            v-text="item.num"
            target="_blank"
            :href="item.onlineurl.indexOf('.m3u8')==-1?item.onlineurl:item.m3u8url"
          ></a>
        </div>
      </div>
    </vue-scroll>
  </div>
</template>



<script>
export default {
  data() {
    return {
      // 影视目录数据组
      videoCatalog: [0],
      // 影视信息
      videoInfo: [0],
      // 页面加载动画开关
      isLoading: true,
      // 请求失败开关
      reqErr: false,
      // 403图片地址
      img403: this.global.img403
    };
  },
  metaInfo() {
    return {
      title: `${
        this.videoInfo.name == undefined ? "" : this.videoInfo.name
      }|选集`
    };
  },
  created() {
    //请求影视目录数据和影视信息
    this.axios({
      url:
        this.global.ComicVideoApi + this.global.VideoUrl + this.$route.query.url
    }).then(res => {
      // 请求失败
      if (res.data.code == 1) {
        this.reqErr = true;
      } else {
        // 请求成功
        // 请求到的影视目录数据传递给videoCatalog
        this.videoCatalog = res.data.list;
        // 请求到的影视信息传递给videoInfo
        this.videoInfo = res.data.data;
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
.videoCatalog {
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