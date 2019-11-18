<template>
  <div class="background" :class="{loading:isLoading}">
    <div id="container">
      <vue-scroll ref="vuescroll" @handle-scroll="handleScroll">
        <!-- 搜索框<=S -->
        <input v-model="search" type="text" @keyup.enter="toLink" />
        <button @click="toLink">搜索</button>
        <!-- 搜索框E=> -->

        <!-- 漫画封面浏览<=S -->
        <div class="row">
          <div
            v-for="(item,key) in comicCoverData"
            :key="key"
            class="col-xm-1 col-md-2 col-sm-3 col-xs-6"
          >
            <div>
              <router-link
                :to="{path:'/comic/comiccatalog',query:{url:item.url}}"
                class="comic_pic"
                v-resetHeight
              >
                <img :title="item.name" :src="item.cover" :onerror="img403" />
              </router-link>
              <router-link
                :to="{path:'/comic/comiccatalog',query:{url:item.url}}"
                class="comic_tit"
                v-text="item.name"
              ></router-link>
              <section class="comic_type" v-cloak>{{item.author | undefinedTo('未知作者')}}</section>
            </div>
          </div>
        </div>
        <!-- 漫画封面浏览E=> -->
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
      comicCoverData: [0],
      // 403图片路径
      img403: this.global.img403
    };
  },

  watch: {
    // 监听路由
    $route: function(route, oldRoute) {
      this.reqComicCoverData();
    }
  },

  methods: {
    // 滚动条事件
    handleScroll(e) {},

    // 跳转页面实现搜索
    toLink() {
      let path = this.$route.path;
      let location = {
        path,
        query: {
          search: this.search
        }
      };
      this.$router.push(location);
    },

    // 用获取到的漫画封面数组传递给comicCoverData变量
    reqComicCoverData() {
      // 添加页面加载动画
      this.isLoading = true;

      // 将要搜索的内容传递给search变量
      if (
        this.$route.query.search == undefined ||
        this.$route.query.search == ""
      ) {
        this.search = "最新";
      } else {
        this.search = this.$route.query.search;
      }

      //请求漫画封面数据
      this.axios({
        url: this.global.ComicVideoApi + this.global.ComicCover + this.search
      }).then(res => {
        // 请求到的漫画封面信息传递给comicCoverData
        this.comicCoverData = res.data.list;
        // 去除页面加载动画
        this.isLoading = false;
      });
    }
  },

  created() {
    this.reqComicCoverData();
  },

  directives: {
    // 获取图片宽度,并设置图片的高度为宽度的1.2倍
    resetHeight: {
      inserted(el) {
        el.style.height = el.offsetWidth * 1.2 + "px";
      }
    }
  }
};
</script>

<style scoped>
.background {
  height: 100%;
  background: #f8f8f8;
  overflow: hidden;
  padding: 8px;
}
#container {
  height: 100%;
  width: 100%;
}
.col-xm-1 {
  padding: 8px;
}
.col-xm-1 > div {
  background-color: #fff;
}
.comic_pic {
  position: relative;
  display: block;
  overflow: hidden;
  width: 100%;
}
.comic_pic img {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
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