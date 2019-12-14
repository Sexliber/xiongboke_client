<template>
  <!-- *
    * 电影
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
              placeholder="输入影视名称"
            />
            <span class="input-group-btn">
              <button class="btn btn-default" type="button" @click="toLink">
                <span class="glyphicon glyphicon-search"></span>
              </button>
            </span>
          </div>
        </div>
        <!-- 搜索框E=> -->

        <!-- 电影封面浏览<=S -->
        <div class="row">
          <div
            v-for="(item,key) in videoCoverData"
            :key="key"
            class="col-lg-2 col-md-2 col-sm-3 col-xs-6"
          >
            <div>
              <router-link
                :to="{path:'/videodetails',query:{url:item.url}}"
                class="video_pic"
                v-resetHeight
              >
                <img
                  :title="item.name"
                  v-lazy="item.cover"
                  :onerror="img403"
                  @load="imgShow.splice(key,1,1)"
                  v-show="imgShow[key]"
                />
              </router-link>
              <router-link
                :to="{path:'/videodetails',query:{url:item.url}}"
                class="video_tit"
                v-text="item.name"
              ></router-link>
            </div>
          </div>
        </div>
        <!-- 电影封面浏览E=> -->
      </vue-scroll>
    </div>
  </div>
</template>

<script>
export default {
  name: "Video",

  data() {
    return {
      // 页面加载状态
      isLoading: true,
      // 搜索内容
      search: this.$route.query.search || "",
      // 电影封面数组
      videoCoverData: [0],
      // 403图片路径
      img403: this.global.img403,
      // 图片开关组
      imgShow: []
    };
  },

  metaInfo() {
    return {
      title: `${
        this.$route.query.search == undefined ? "" : this.$route.query.search
      }${this.videoCoverData.length}个搜索结果`
    };
  },

  watch: {
    // 监听路由
    $route: function(route, oldRoute) {
      // 路由变动重新请求数据
      this.reqVideoCoverData();
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

    // 用获取到的电影封面数组传递给videoCoverData变量
    reqVideoCoverData() {
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

      //请求电影封面数据
      this.axios({
        url: this.global.ComicVideoApi + this.global.VideoCover + search
      }).then(res => {
        // 清除原有数组
        this.videoCoverData = [];
        // 请求到的电影封面信息传递给videoCoverData
        this.videoCoverData = res.data.list;
        // 填充封面图片开关组
        this.imgShow = new Array(res.data.list.length).fill(0);
        // 去除页面加载动画
        this.isLoading = false;
        // 请求封面图片链接并添加到封面组中
        this.videoCoverData.forEach((current, index) => {
          this.axios({
            url: this.global.ComicVideoApi + this.global.VideoUrl + current.url
          }).then(respon => {
            // 在当前数组中添加cover键值并将更新应用到封面数组中
            let itemArr = current;
            itemArr["cover"] = respon.data.data.cover;
            this.videoCoverData.splice(index, 1, itemArr);
          });
        });
      });
    }
  },

  created() {
    // 请求数据
    this.reqVideoCoverData();
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
  background: #1c1c17;
  overflow: hidden;
  padding: 0 10px;
}
#container {
  height: 100%;
  width: 100%;
}
.col-lg-2 {
  padding: 0 10px;
  margin-bottom: 42px;
}
.col-lg-2 > div {
  background-color: #fff;
}
.video_pic {
  position: relative;
  display: block;
  overflow: hidden;
  width: 100%;
}
.video_pic img {
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
.video_tit {
  display: block;
  line-height: 60px;
  color: #edece9;
  font-size: 18px;
  white-space: nowrap;
}
.video_type {
  padding-bottom: 4px;
  white-space: nowrap;
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
.input-group .form-control:focus {
  border-color: #ffc815;
  box-shadow: #ffc815 0 0 4px;
}
.input-group .btn {
  color: #888;
}
</style>