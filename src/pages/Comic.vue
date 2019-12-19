<template>
  <!-- *
    * 漫画
  * *-->
  <div class="background" :class="{loading:isLoading}">
    <div id="container">
      <vue-scroll ref="vuescroll" @handle-scroll="handleScroll">
        <!-- 搜索框<=S -->
        <div class="row search-container">
          <div class="input-group col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
            <input
              v-model="search"
              @keyup.enter="toLink"
              type="text"
              class="form-control"
              placeholder="输入漫画名"
            />
            <span class="input-group-btn">
              <button class="btn btn-default" type="button" @click="toLink">
                <span class="glyphicon glyphicon-search"></span>
              </button>
            </span>
          </div>
        </div>
        <!-- 搜索框E=> -->

        <!-- 漫画封面浏览<=S -->
        <div class="comic-cover-container row">
          <div
            v-for="(item,key) in comicCoverData"
            :key="key"
            class="col-lg-2 col-md-2 col-sm-3 col-xs-6"
          >
            <router-link :to="{path:'/comic/comiccatalog',query:{url:item.url}}">
              <div class="comic-cover">
                <div class="comic-pic" v-resetHeight>
                  <img :title="item.name" v-lazy="item.cover" :onerror="img403" />
                </div>
                <h1 class="comic-tit t-no-wrap t-over-hide" v-text="item.name"></h1>
                <h2
                  class="comic-author t-no-wrap t-over-hide"
                  v-cloak
                >{{item.author | undefinedTo("未知作者")}}</h2>
              </div>
            </router-link>
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
      search: "",
      // 漫画封面数组
      comicCoverData: [],
      // 403图片路径
      img403: this.global.img403
    };
  },

  metaInfo() {
    return {
      title: `${
        this.$route.query.search == undefined ? "" : this.$route.query.search
      }${this.comicCoverData.length}个搜索结果`
    };
  },

  watch: {
    // 监听路由
    $route: function(route, oldRoute) {
      // 路由变动重新请求数据
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
      var search = "";
      if (
        this.$route.query.search == undefined ||
        this.$route.query.search == ""
      ) {
        search = 1;
      } else {
        search = this.$route.query.search;
      }

      // 请求地址
      let reqUrl = this.global.ComicVideoApi + this.global.ComicCover + search;

      //请求漫画封面数据
      this.axios.get("/getComic", {  params: { url: reqUrl }  }).then(res => {
        // 清除原有数组
        this.comicCoverData = [];
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
        el.style.height = el.offsetWidth * 1.3 + "px";
      }
    }
  }
};
</script>

<style scoped>
.background {
  height: 100%;
  background: #1c1c17;
  overflow: hidden;
  padding: 0 26px;
}
#container {
  height: 100%;
  width: 100%;
}
.comic-cover-container {
  padding-top: 16px;
}
.col-lg-2 {
  padding: 0 26px;
  margin-bottom: 62px;
}
.col-lg-2 > div {
  background-color: #fff;
}
.comic-cover:hover {
  animation: aa_bounce-up 1000ms linear both;
}
.comic-pic {
  position: relative;
  display: block;
  overflow: hidden;
  width: 100%;
}
.comic-pic img {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
}

.col-lg-2 > div {
  overflow: hidden;
  box-sizing: border-box;
  background-color: #2c2c25;
  text-align: center;
  color: #edece9;
  border-radius: 10px;
}
.col-lg-2 > div:hover {
  box-shadow: #fff 0 0 4px;
}
.comic-tit,
.comic-author {
  margin: 0;
}
.comic-tit {
  display: block;
  margin: 0;
  line-height: 60px;
  color: #edece9;
  font-size: 20px;
  white-space: nowrap;
}
.comic-type {
  padding-bottom: 4px;
  white-space: nowrap;
}
.comic-author {
  font-size: 16px;
  color: #aaa;
}
/* 搜索框 */
.search-container {
  margin: 20px 0;
}
.input-group .form-control,
.input-group .btn {
  border-color: #2c2c25;
  background-color: #000;
  height: 46px;
}
.input-group .form-control {
  color: #edece9;
}
.input-group .form-control:focus,
.input-group .btn:focus {
  border-color: #ffc815;
  box-shadow: #ffc815 0 0 3px;
  outline-color: transparent;
}
.input-group .btn {
  color: #888;
}
</style>