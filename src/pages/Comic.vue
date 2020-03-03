<template>
  <!-- *
    * 漫画
  * *-->
  <div class="background" :class="{loading:isLoading}">
    <div id="container">
      <vue-scroll ref="vuescroll" @handle-scroll="handleScroll">
        <!-- 搜索框<=S -->
        <div class="search-container">
          <div class="input-group" :class="{focus:focus}">
            <input
              v-model="search"
              @focus="focus=true"
              @blur="focus=false"
              @keyup.enter="toLink"
              type="text"
              placeholder="输入漫画名"
            />
            <span class="submit" @click="toLink">
              <span class="icon icon-search"></span>
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
                  <img
                    :title="item.name"
                    v-lazy="item.cover?item.cover.replace('http://','//'):''"
                    :onerror="img403"
                  />
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
      search: this.$route.query.search,
      // 漫画封面数组
      comicCoverData: [],
      // 403图片路径
      img403: this.global.img403,
      // 搜索框焦点
      focus: false
    };
  },

  metaInfo() {
    return {
      title: `${
        this.$route.query.search == undefined ? "" : this.$route.query.search
      }${this.comicCoverData.length}个搜索结果`
    };
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
      var search =
        this.$route.query.search === undefined ? "" : this.$route.query.search;

      //请求漫画封面数据
      this.axios.get(this.global.ComicCover + search).then(res => {
        // 清除原有数组
        this.comicCoverData.splice(0, this.comicCoverData.length);
        // 请求到的漫画封面信息传递给comicCoverData
        this.comicCoverData = res.data.list;
        // 去除页面加载动画
        this.isLoading = false;
      });
    }
  },

  // 数据池初始化完毕后开始请求漫画封面数据
  created() {
    this.reqComicCoverData();
  },

  // 检测search查询参数的改变
  beforeRouteUpdate(to, from, next) {
    next(true);
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
  display: flex;
  justify-content: space-around;
}
.input-group {
  flex: none;
  width: 40%;
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #000;
}
.input-group.focus{
  box-shadow: #ffc815 0 0 3px;
}
.input-group input,
.input-group .submit {
  border-color: #2c2c25;
}
.input-group input {
  flex: 5 0 0;
  width: 0;
  height: 28px;
  background-color: transparent;
  outline-color: transparent;
  border-width: 0;
  border-right: 1px solid rgba(255, 255, 255, 0.51);
  box-sizing: border-box;
  padding: 0 8px;
  color: #edece9;
}
.input-group .submit {
  flex: 1 0 0;
  width: 0;
  display: block;
  text-align: center;
  line-height: 46px;
  color: #888;
  cursor: pointer;
}
.input-group .submit .icon {
  font-size: 18px;
}
</style>