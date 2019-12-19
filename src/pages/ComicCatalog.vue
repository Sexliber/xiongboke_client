<template>
  <!-- 
  漫画目录页面
  -->
  <div class="container" :class="{loading:isLoading}">
    <vue-scroll ref="vuescroll">
      <div class="content">
        <!-- 请求失败展示画面 -->
        <div v-if="reqErr">对不起,暂无此漫画源!</div>

        <div v-if="!reqErr">
          <!-- 漫画封面 -->
          <div class="comicCover clearboth">
            <div class="cover">
              <img :src="comicInfo.cover" :onerror="img403" :alt="comicInfo.name" />
            </div>
            <div class="info">
              <div class="name t-no-wrap t-over-hide" v-cloak>{{comicInfo.name}}</div>
              <div
                class="author t-no-wrap t-over-hide"
                v-cloak
              >{{comicInfo.author | undefinedTo("未知来源")}}</div>
              <div class="tag t-no-wrap t-over-hide" v-cloak>
                <i class="fa fa-tag" aria-hidden="true"></i>
                &nbsp;
                {{comicInfo.tag | undefinedTo("未知分类")}}
              </div>
              <div class="status" v-cloak>
                <i class="fa fa-calendar" aria-hidden="true"></i>
                &nbsp;
                {{comicInfo.status | undefinedTo("更新状态未知")}}
              </div>
              <div class="time" v-cloak>
                <i class="fa fa-clock-o" aria-hidden="true"></i>
                &nbsp;
                {{comicInfo.time | undefinedTo("未知时间段")}}
              </div>
              <div class="introduce" v-cloak>{{comicInfo.introduce | undefinedTo("这个作者很懒什么也没写")}}</div>
              <div class="bt-group">
                <router-link
                  :to="{path:'/comicctt',query:{chaperName:localStorage.chaperName,url:localStorage.picUrl,catalogUrl:$route.query.url}}"
                  class="bt-read t-no-wrap t-over-hide bg-yellow white"
                  :title="localStorage.chaperName"
                >
                  <span>{{localStorage.picUrl==comicCatalog[0].url?'开始阅读':'继续阅读'}}</span>&nbsp;
                  <span>{{localStorage.chaperName}}</span>
                </router-link>
              </div>
            </div>
          </div>

          <!-- 目录标题及其工具栏 -->
          <div class="catalog-title clearboth">
            <!-- 章节计数器 -->
            <div class="chapter-num" v-cloak>{{`全部章节 (${comicCatalog.length})`}}</div>
            <!-- 章节排序 -->
            <div class="sort noselect">
              <span v-show="desc" @click="catalogSort">
                降序
                <i class="fa fa-sort-amount-desc" aria-hidden="true"></i>
              </span>
              <span v-show="!desc" @click="catalogSort">
                升序
                <i class="fa fa-sort-amount-asc" aria-hidden="true"></i>
              </span>
            </div>
          </div>

          <!-- 漫画目录 -->
          <section class="comicCatalog row" v-if="!reqErr">
            <div
              class="chapter col-md-2 col-sm-3 fadeInUp animated"
              v-for="(item,key) in comicCatalog"
              :key="key"
            >
              <router-link
                :to="{path:'/comicctt',query:{chaperName:item.num,url:item.url,catalogUrl:$route.query.url}}"
                class="t-no-wrap t-over-hide"
                v-text="item.num"
              ></router-link>
            </div>
          </section>
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
      // 目录是否降序排列
      desc: false,
      // 漫画信息
      comicInfo: [0],
      // 页面加载动画开关
      isLoading: true,
      // 请求失败开关
      reqErr: false,
      // 403图片地址
      img403: this.global.img403,
      // 浏览器用户存储数据
      localStorage: {}
    };
  },
  metaInfo() {
    return {
      title: `${
        this.comicInfo.name == undefined ? "" : this.comicInfo.name
      }|目录`
    };
  },
  methods: {
    // 升序降序排列目录
    catalogSort() {
      this.desc = !this.desc;
      this.comicCatalog.reverse();
    },
    // *
    // * 浏览器用户存储数据读取
    // * *
    userInfoRead() {
      // 读取浏览器保存的用户数据
      let json = JSON.parse(localStorage.getItem("comicCache"));
      // 检测历史数据是否存在
      if (json) {
        // 匹配到的索引号,匹配到后会改变,用于判定是否匹配到数据
        let sub = -1;
        json.history.forEach((item, index) => {
          if (item.catalogUrl == this.$route.query.url) sub = index;
        });
        if (sub != -1) {
          // 存在历史记录则按匹配到的索引号读取
          return json.history[sub];
        } else {
          // 历史记录不存在则读取第一章节的信息
          let obj = this.readFirstChapter();
          return obj;
        }
      } else {
        let obj = this.readFirstChapter();
        return obj;
      }
    },
    // 读取第一个章节
    readFirstChapter() {
      let obj = this.comicInfo;
      obj.catalogUrl = this.$route.query.url;
      obj.chaperName = this.comicCatalog[0].num;
      obj.picUrl = this.comicCatalog[0].url;
      return obj;
    }
  },
  created() {
    //请求漫画目录数据和漫画信息
    this.axios
      .get("/getComic", {
        params: {
          url:
            this.global.ComicVideoApi + this.global.ComicCatalog + this.$route.query.url
        }
      })
      .then(res => {
        if (res.data.code == 1) {
          // 请求失败,替换为致歉页面
          this.reqErr = true;
        } else {
          // 请求成功,开始传递数据
          // 请求到的漫画目录数据传递给comicCatalog
          this.comicCatalog = res.data.list;
          // 请求到的漫画信息传递给comicInfo
          this.comicInfo = res.data.data;

          // 获取浏览器记录的用户数据
          this.localStorage = this.userInfoRead();
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
  padding: 0;
}
.content {
  padding: 40px 48px;
}
.cover {
  position: relative;
  height: 424px;
  overflow: hidden;
}
.cover > img {
  position: absolute;
  display: block;
  margin: 0;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
}
.comicCatalog {
  margin: 10px -30px;
  padding-bottom: 70px;
}
.chapter {
  position: relative;
  height: 64px;
}
.chapter > a {
  position: absolute;
  display: block;
  top: 10px;
  bottom: 10px;
  left: 30px;
  right: 30px;
  padding: 0 20px;
  overflow: hidden;
  color: #222222;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  line-height: 44px;
  text-align: left;
}
.chapter:hover > a {
  background-color: #fff2c7;
}
.comicCover .cover {
  float: left;
  width: 240px;
  height: 320px;
}
.comicCover .cover img {
  display: block;
  height: 100%;
}
.comicCover .info {
  position: relative;
  float: left;
  padding-left: 28px;
  width: calc(100% - 240px);
  height: 320px;
}
.name {
  margin: 0 0 11px;
  font-size: 28px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.87);
}
.author {
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.56);
}
.tag,
.status,
.time {
  font-size: 14px;
  line-height: 2;
  color: rgba(0, 0, 0, 0.34);
}
.tag {
  margin-top: 14px;
}
.introduce {
  margin-top: 8px;
  font-size: 14px;
  white-space: normal;
  color: rgba(0, 0, 0, 0.56);
}
.bt-group {
  position: absolute;
  bottom: 0;
}
.bt-read {
  display: block;
  width: 200px;
  height: 44px;
  margin-right: 16px;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 3px;
  border: 1px solid transparent;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;
}
.bt-read:hover {
  color: #fff;
}
.catalog-title {
  margin: 46px 0 0;
}
.chapter-num {
  float: left;
  font-size: 18px;
}
.sort {
  float: right;
  cursor: pointer;
  font-size: 14px;
  color: #505050;
}
.sort:hover {
  color: #ffc815;
}
@media screen and (max-width: 1064px) {
  .content {
    padding: 0;
  }
  .comicCover {
    height: auto;
  }
  .comicCover .cover,
  .comicCover .info {
    float: none;
  }
  .comicCover .cover {
    width: 100%;
    height: 32vh;
  }
  .comicCover .cover img {
    height: auto;
    width: 100%;
    top: 0;
  }
  .comicCover .info {
    padding-left: 16px;
    width: 100%;
    height: auto;
    margin-top: -60px;
  }
  .name,
  .author,
  .tag {
    color: #ffffff;
  }
  .name {
    font-size: 20px;
    margin-bottom: 6px;
  }
  .author,
  .tag {
    font-size: 12px;
    line-height: 12px;
  }
  .author {
    float: left;
  }
  .tag {
    float: left;
    margin: 0 auto auto 12px;
  }
  .status,
  .time {
    display: none;
  }
  .introduce {
    clear: both;
    margin-top: 52px;
  }
  .bt-group {
    position: relative;
    margin: 20px 0 0 -16px;
  }
  .bt-group a {
    margin: auto;
  }
  .catalog-title {
    margin-top: 24px;
    padding: 0 16px;
  }
  .comicCatalog {
    margin: 10px 0;
  }
  .chapter > a {
    left: 16px;
    right: 16px;
  }
}
</style>