<template>
  <!-- *
    *  音乐播放器组件
  *-->
  <div id="music-player" v-if="isRender" v-show="isShow" v-getMusicUiDom>
    <!-- 音乐播放器界面<=S -->
    <div class="music-player-ui noselect">
      <!-- 播放器背景 -->
      <div class="bg" :style="{backgroundImage:`url(${playerBg})`}"></div>

      <!-- 播放器内容<=S -->
      <div class="player-container">
        <!-- 播放器头部搜索栏<=S -->
        <header class="bg-black">
          <div class="title line1">
            <span class="white">音乐播放器</span>
          </div>
          <div class="search">
            <input
              class="lightgray"
              type="text"
              v-model="searchContent"
              placeholder="搜索歌单/歌曲/歌手/专辑/MV"
              @keydown.enter="showLrc=false;resetSearch();searchMusic()"
            >
            <div class="do-search lightgray">
              <a
                class="fa fa-search lightgray"
                aria-hidden="true"
                @click.prevent="showLrc=false;resetSearch();searchMusic()"
              ></a>
            </div>
          </div>
          <div class="close" @click="isShow=false">
            <i class="fa fa-times white" aria-hidden="true"></i>
          </div>
          <div class="do-drag" @mousedown.self="headerMouseDown"/>
        </header>
        <!-- 播放器头部=>E -->

        <!-- 播放器内容展示部分<=S -->
        <div class="player-body">
          <div class="music-container container-fluid" v-show="!showLrc">
            <div class="row">
              <!-- 正在播放的歌单<=S -->
              <div class="col-md-4 music-list">
                <vue-scroll>
                  <ul>
                    <li
                      v-for="(item, key) in musicList"
                      :key="key"
                      :class="{active:key==musicListSub}"
                      @click="musicListSub=key"
                    >
                      <div class="row">
                        <div
                          class="pic"
                          :class="{'col-md-3':key==musicListSub}"
                          v-show="key==musicListSub"
                        >
                          <img :src="item.pic">
                        </div>
                        <div :class="{'col-md-9':key==musicListSub}">
                          <div class="row">
                            <div class="line1" :class="{'col-md-8':!(key==musicListSub)}">
                              <span
                                :class="{marquee:key==musicListSub}"
                                v-cloak
                              >{{item.name}}&nbsp;-&nbsp;{{item.singer}}</span>
                            </div>
                            <div class="line1" :class="{'col-md-4':!(key==musicListSub)}">
                              <span v-cloak>
                                <span
                                  v-show="key==musicListSub"
                                >{{parseInt(playProgressTime/60) | numPlace(2)}}:{{playProgressTime%60 | numPlace(2)}}/</span>
                                {{parseInt(item.time/60) | numPlace(2)}}:{{item.time%60 | numPlace(2)}}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </vue-scroll>
              </div>
              <!-- 正在播放的歌单=>E -->

              <!-- 搜索结果容器<=S -->
              <div class="col-md-8 s-finish-wrap">
                <div class="default-load" v-show="!showSearchView"></div>
                <div class="s-finish-view" v-show="showSearchView">
                  <nav class="clearboth">
                    <div class="search-type">
                      <a
                        href
                        class="white line1"
                        @click.prevent="searchType='song';resetSearch();searchMusic()"
                      >音乐</a>
                      <a
                        href
                        class="white line1"
                        @click.prevent="searchType='album';resetSearch();searchMusic()"
                      >专辑</a>
                      <a
                        href
                        class="white line1"
                        @click.prevent="searchType='list';resetSearch();searchMusic()"
                      >歌单</a>
                    </div>
                    <div class="search-origin">
                      <a
                        href
                        class="white line1"
                        @click.prevent="searchOrigin='netease';resetSearch();searchMusic()"
                      >网易云</a>
                      <a
                        href
                        class="white line1"
                        @click.prevent="searchOrigin='tencent';resetSearch();searchMusic()"
                      >QQ</a>
                    </div>
                  </nav>
                  <div class="content-wrap" ref="searchListWrap" :class="{loading:searchLoading}">
                    <vue-scroll @handle-scroll="refresh">
                      <ul ref="searchList">
                        <li v-for="(item, key) in searchList" :key="key" class="container-fluid">
                          <!-- 搜索音乐结果<=S -->
                          <div class="song" v-if="searchType=='song'">
                            <div class="row">
                              <div class="ico col-sm-1 col-xs-1">
                                <span class="sernumber lightgray" v-cloak>{{key+1 | numPlace(2)}}</span>
                              </div>
                              <div class="name col-sm-6 col-xs-6 line1">
                                <a
                                  class="white"
                                  href
                                  v-text="item.name"
                                  @click.prevent="musicList=searchList;musicListSub=key"
                                ></a>
                              </div>
                              <div class="singer col-sm-3 col-xs-3 line1 lightgray">
                                <span v-text="item.singer"></span>
                              </div>
                              <div class="time lightgray col-sm-2 col-xs-2">
                                <span
                                  v-cloak
                                >{{parseInt(item.time/60) | numPlace(2)}}:{{item.time%60 | numPlace(2)}}</span>
                              </div>
                            </div>
                          </div>
                          <!-- 搜索音乐结果=>E -->

                          <!-- 搜索专辑结果<=S -->
                          <div class="album" v-if="searchType=='album'">
                            
                          </div>
                          <!-- 搜索专辑结果=>E -->

                          <!-- 搜索歌单结果<=S -->
                          <div class="list" v-if="searchType=='list'">

                          </div>
                          <!-- 搜索歌单结果=>E -->
                        </li>
                      </ul>
                    </vue-scroll>
                  </div>
                </div>
              </div>
              <!-- 搜索结果容器=>E -->
            </div>
          </div>

          <!-- 正在播放的音乐歌词及详细信息展示<=S -->
          <div class="player-lrc container-fluid" v-show="showLrc">
            <div class="row">
              <div class="col-md-4"></div>
              <div class="col-md-8 lrc-container">
                <div class="lrc-wrap">
                  <ul :style="{marginTop:lrcWrapTop+'rem'}">
                    <li
                      v-for="(item, index) in playingMusicLrc"
                      :key="index"
                      class="line1"
                      :class="{active:lrcActive[index]}"
                    >
                      <span v-html="getOpt(item,'lrc')"></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!-- 正在播放的音乐歌词及详细信息展示=>E -->
        </div>
        <!-- 播放器内容展示部分=>E -->

        <!-- 播放器底部工具栏<=S -->
        <footer>
          <div class="progress-container" @click="setProgress">
            <div class="progress-bar" :style="{width:progressBarWidth+'px'}"></div>
          </div>
          <div class="user-handle container-fluid">
            <div class="row">
              <!-- 歌曲信息<=S -->
              <div class="info col-md-4">
                <div class="pic">
                  <img :src="playerHeadImg">
                </div>
                <div class="name line1">
                  <span class="white marquee" v-text="playingMusic.name"></span>
                </div>
                <div class="singer line1">
                  <span class="white" v-text="playingMusic.singer"/>
                </div>
              </div>
              <!-- 歌曲信息=>E -->

              <!-- 播放操作<=S -->
              <div class="player clearboth col-md-4">
                <i class="fa fa-fast-backward white" aria-hidden="true" @click="musicListSub--"></i>
                <i
                  class="fa fa-play white"
                  :class="{'fa-pause':!isPause}"
                  aria-hidden="true"
                  @click="isPause=!isPause"
                ></i>
                <i class="fa fa-fast-forward white" aria-hidden="true" @click="musicListSub++"></i>
              </div>
              <!-- 播放操作=>E -->

              <!-- 设置按钮<=S -->
              <div class="setting col-md-4">
                <div class="row">
                  <!-- 按钮<=S -->
                  <div class="col-md-offset-4 col-md-8">
                    <a class="white" @click.prevent="showLrc=!showLrc" style="margin-right:.1rem">词</a>
                    <i class="fa fa-volume-up white" aria-hidden="true" @click="volShow = !volShow"></i>
                    <i class="fa fa-download white" aria-hidden="true" @click="download"></i>
                  </div>
                  <!-- 按钮=>E -->

                  <!-- 音量控制<=S -->
                  <div class="volume" v-show="volShow">
                    <input type="range" min="0" max="100" defaultValue="100" v-model="volume">
                  </div>
                  <!-- 音量控制=>E -->
                </div>
              </div>
              <!-- 设置按钮=>E -->
            </div>
          </div>
        </footer>
        <!-- 播放器底部工具栏=>E -->
      </div>
      <!-- 播放器内容=>E -->
    </div>
    <!-- 音乐播放器界面=>E -->

    <!-- 音乐播放器实例<=S -->
    <div class="music-player-do">
      <audio controls name="media" v-getMusicDom>
        <source :src="playerUrl">
      </audio>
    </div>
    <!-- 音乐播放器实例=>E -->
  </div>
</template>



<script>
// 判断是否为移动设备
import isMobile from "../libs/isMobile";
// 引入音乐播放器数据广播站,用于接受音乐参数
import MusicPlayer from "../model/MusicPlayer";
// 引入歌词处理模块
import DoLrc from "../libs/musicLrc";
import VueGlobal from "../VueGlobal";

// 音乐播放器UI界面dom
var MusicPlayerUi = null;
// 音乐播放器实例dom
var MusicPlayerDom = null;

export default {
  name: "MusicPlayer",

  // *
  // * data数据组
  // * 用于播放器相关变量参数
  // * *
  data() {
    return {
      // *
      // * 控制播放器是否渲染,是否显示参数
      // * isRender通过isMobile模块判断当前设备是否为移动设备从而控制播放器是否渲染
      // * 如果是移动设备则不渲染,如不是则渲染
      // * isShow控制当前模块是否显示
      // * *
      // 通过是否为移动设备判断是否渲染该组件
      isRender: false,
      // 音乐播放器是否显示,默认为false
      isShow: false,

      // *
      // * 相关块显示隐藏
      // * *
      // 显示歌词
      showLrc: false,
      // 显示搜索结果模块
      showSearchView: false,

      // *
      // * 播放器拖动功能相关配置
      // * 如:鼠标是否在拖动头按下,鼠标是否在html元素中弹起,鼠标距离拖动头的上和左间距
      // * *
      // 头部是否跟随鼠标移动状态(及鼠标是否在头部元素上保持按下)
      isMouseDown: false,
      // 鼠标距离header的上间距
      cursorOffsetTop: 0,
      // 鼠标距离header的左间距
      cursorOffsetLeft: 0,

      // *
      // * 正在播放的音乐相关配置
      // * 码率,音乐清单,清单中的第几项
      // * *
      // 音乐码率
      codeRate: [999000, 320000, 192000, 128000, 192, 320, 128, 96, 48, 24],
      // 音乐清单
      musicList: "null",
      // 正在播放清单中的第几首音乐
      musicListSub: 99999,
      // 正在播放的音乐
      playingMusic: "null",
      // 正在播放音乐的歌词
      playingMusicLrc: [0],

      // *
      // * 音乐播放器相关设置
      // * 如:播放器背景,播放器头图,播放器音量,播放器是否未暂停状态
      // * *
      // 音乐播放器背景
      playerBg: "null",
      // 音乐播放器头图
      playerHeadImg: "null",
      // 是否设置为暂停状态(true为暂停,false为继续播放)
      isPause: false,
      // 音量调节工具是否可见
      volShow: false,
      // 播放地址
      playerUrl: "",
      // 下载地址
      downloadUrl: "",
      // 音乐格式
      musicType: ".mp3",
      // 音量
      volume: 100,
      // 搜索值
      searchContent: "",
      // 搜索类型
      searchType: "song",
      // 搜索源
      searchOrigin: "netease",
      // 搜索到的音乐数组
      searchList: [],
      // 搜索分页
      searchOffset: 0,
      // 搜索请求开关
      searchReqFlag: true,
      // 是否正在搜索中
      searchLoading: false,
      // 歌词容器上间距
      lrcWrapTop: 0,
      // 歌词的行高
      lrcLineHeight: 0.36,
      // 歌词active类控制器
      lrcActive: [0],
      lastLrcActiveId: 0,

      // *
      // * 播放器进度条相关变量
      // * *
      // 播放进度计时(整数)
      playProgressTime: 0,
      // 播放进度定时器
      playProgress: null,
      // 进度条容器宽度
      progressBarContainerWidth:
        (document.documentElement.offsetWidth / 19.2) * 8,
      // 进度条宽度
      progressBarWidth: 0,
      // 进度条长度单位
      progressBarWidthUnit: 0
    };
  },

  // *
  // * watch数据监听
  // * 此处用于监听data中数据的变异并执行相应方法
  // * *
  watch: {
    // *
    // * 监听musicList和musicListSub变动
    // * 当musicList和musicListSub变动时表明歌单中歌曲脚标发生变动
    // * 此时通过songList(当前播放歌单)和subListSub(当前播放的歌单中的第几项)来变动playingMusic触发歌曲切换
    // *
    musicList: function(newSub, oldSub) {
      this.playingMusic = this.musicList[this.musicListSub];
    },
    musicListSub: function(newSub, oldSub) {
      // 判断角标是否大于等于歌单长度,如是,则重置角标值为0
      if (newSub >= this.musicList.length) this.musicListSub = 0;
      else if (newSub < 0) this.musicListSub = this.musicList.length - 1;
      else this.playingMusic = this.musicList[newSub];
    },

    // *
    // * 监听playingMusic变动
    // * 当playingMusic变动时则表明用户已切换歌曲
    // * 此时重置播放器配置并重新播放音乐
    // *
    playingMusic: async function(newSong, oldSong) {
      // 重置歌词容器上间距为0
      this.lrcWrapTop = 0;

      // 切换按钮为播放状态
      this.isPause = true;

      // 更换背景图片
      this.playerBg = this.playingMusic.pic + "&param=800y600";

      // 更换头图
      this.playerHeadImg = this.playingMusic.pic + "&param=400y400";

      // 初始化播放进度条并开始计算进度<=S
      // 清除定时器
      clearInterval(this.playProgress);
      this.progressBarWidth = 0;
      //计算进度单位
      this.progressBarWidthUnit =
        this.progressBarContainerWidth / this.playingMusic.time;
      // 开始捕获播放进度时间
      this.playProgress = setInterval(this.catchProgressTime, 100);
      // 初始化播放进度条并开始计算进度=>E

      // *
      // * 请求歌词
      // * *
      this.axios
        .get(this.playingMusic.lrc + `&br=${this.codeRate[i]}`)
        .then(response => {
          // *
          // * 歌词处理
          // * 将处理好的歌词返回给playingMusicLrc数组
          // * *

          // 清理上一首音乐的歌词
          this.playingMusicLrc = [0];

          // 创建歌词处理对象
          var doLrc = new DoLrc();
          if (response.data.indexOf("暂无歌词") != -1) {
            this.playingMusicLrc = [].concat({ id: 0, lrc: "暂无歌词" });
          } else {
            let getListArr = doLrc.parse(response.data);
            this.playingMusicLrc = [].concat(getListArr);
            //清洗通道
            doLrc.flush();

            // 初始化歌词active控制器数组长度
            for (let i = 0; i < getListArr.length; i++) {
              if (i == 0) {
                this.lrcActive.splice(i, 1, true);
              } else {
                this.lrcActive.splice(i, 1, false);
              }
            }
          }
        });

      // *
      // * 播放验证方法
      // * 用于验证当前播放连接是否可用
      // * 如不可用则更换码率重新请求
      // * *
      var i = 0;
      var verify = () => {
        this.axios
          .head(this.playingMusic.url + `&br=${this.codeRate[i]}`)
          .then(response => {
            console.log(`码率${this.codeRate[i]}请求成功,开始播放`);
            this.playerUrl = this.playingMusic.url + `&br=${this.codeRate[i]}`;
            MusicPlayerDom.load();
            this.isPause = false;
            MusicPlayerDom.play();
            // 设置音乐格式以供下载时使用
            this.downloadUrl = response.request.responseURL;
            // this.musicType = this.downloadUrl.substring(
            //   this.downloadUrl.lastIndexOf(".")
            // );

            return;
          })
          .catch(error => {
            // *
            // * 请求失败,更换码率,重新发送请求
            // * *
            console.log(error);
            if (i < this.codeRate.length) {
              console.log(`码率${this.codeRate[i]}请求失败,更换码率`);
              i++;
              verify();
            } else {
              this.musicListSub++;
              console.log("无可用码率");
            }
            return;
          });
        return;
      };
      // 播放请求
      await verify();
      return;
    },

    // *
    // * 监听isPause数据
    // * 当isPause变动时,表明用户触发了暂停播放按钮,根据当前isPause值判断播放还是暂停
    // * 当为true时,表示此时应暂停播放
    // * 当为false时,表示此时应继续播放音乐
    // * 注意:暂停时清除播放计时器,继续播放时则重启播放计时器
    // * *
    isPause: function(newData, oldData) {
      // 判断是否暂停播放
      if (this.isPause) {
        //暂停播放
        MusicPlayerDom.pause();
        //清除定时器
        clearInterval(this.playProgress);
      } else {
        // 继续播放
        MusicPlayerDom.play();
        // 重启定时器
        this.playProgress = setInterval(this.catchProgressTime, 100);
      }
    },

    // *
    // * 监听volume变动更改音量大小
    // * *
    volume: function(newData, oldData) {
      MusicPlayerDom.volume = newData / 100;
    },

    // *
    // * 监听playProgressTime变动
    // * playProgressTime变动则说明音乐时间进度改变
    // * 此时重置歌词容器的上间距,实现歌词滚动
    // * 同时更改active类控制器,实现播放的歌词放大
    // * *
    playProgressTime: function(newData, oldData) {
      // 歌词容器上间距设置
      if (
        this.playingMusicLrc[newData] != undefined &&
        this.playingMusicLrc[newData].id != undefined
      ) {
        // active切换
        this.lrcActive.splice(this.lastLrcActiveId, 1, false);
        this.lrcActive.splice(newData, 1, true);
        this.lastLrcActiveId = newData;

        // 歌词容器上间距设置
        this.lrcWrapTop =
          -1 * (this.playingMusicLrc[newData].id - 1) * this.lrcLineHeight;
      }
    }
  },
  directives: {
    // 获取播放器的dom
    getMusicDom: {
      inserted: function(el) {
        MusicPlayerDom = el;
      }
    },
    // 获取播放器头部dom
    getMusicUiDom: {
      inserted: function(el) {
        MusicPlayerUi = el;
      }
    }
  },
  methods: {
    // *
    // * 播放器是否要跟随鼠标移动
    // * 鼠标按下则为true,弹起则为false
    // * 鼠标移出header则为false
    // *
    isMove(flag) {
      this.isMouseDown = flag;
    },

    // 鼠标按下事件
    headerMouseDown(el) {
      // 为body元素添加文本不可选中的类
      document.documentElement.classList.add("noselect");
      // 设置isMouseDown为true
      this.isMove(true);
      // 鼠标按下获取鼠标到header的上左间距
      this.cursorOffsetTop = el.offsetY;
      this.cursorOffsetLeft = el.offsetX;
    },

    // 鼠标移动事件<=S
    playerMove(e) {
      // 判断头部是否跟随鼠标移动
      if (this.isMouseDown) {
        if (MusicPlayerUi.offsetTop >= 0 && MusicPlayerUi.offsetLeft >= 0) {
          // 头部移动事件<=S
          var left = e.clientX - this.cursorOffsetLeft;
          var top = e.clientY - this.cursorOffsetTop;
          MusicPlayerUi.style.left = left + "px";
          MusicPlayerUi.style.top = top + "px";
          if (left < 0) MusicPlayerUi.style.left = 0;
          if (top < 0) MusicPlayerUi.style.top = 0;
          // 头部移动事件=>E
        }
      }
    },
    // 鼠标移动事件=>E

    // *
    // * 设置进度方法
    // *
    setProgress(e) {
      // 清除定时器
      clearInterval(this.playProgress);
      // 获取并设置播放时间进度
      MusicPlayerDom.currentTime = parseInt(
        e.offsetX / this.progressBarWidthUnit
      );
      //继续捕获播放进度
      this.playProgress = setInterval(this.catchProgressTime, 100);
    },

    // *
    // * 进度条时间捕获并赋值给playProgressTime和playProgressTimeFloat
    // * *
    catchProgressTime() {
      // 获取到的播放进度时间转化为毫秒
      this.playProgressTime = parseInt(MusicPlayerDom.currentTime);
      this.progressBarWidth = this.playProgressTime * this.progressBarWidthUnit;
      if (this.playProgressTime >= this.playingMusic.time) this.musicListSub++;
    },

    // *
    // * 获取对象内的参数
    // * *
    getOpt(obj, key) {
      if (obj != undefined && obj.lrc != "") {
        if (obj.id != -1 && obj.id != undefined && obj.lrc != "") {
          if (obj[key].id != undefined) return "-------";
          else return obj[key];
        } else {
          return "";
        }
      } else {
        return "";
      }
    },

    // *
    // * 文件下载
    // * *
    download() {
      this.axios({
        // 用axios发送get请求
        method: "get",
        url: this.downloadUrl, // 请求地址
        responseType: "blob" // 表明返回服务器返回的数据类型
      }).then(res => {
        // 将blob对象转换为域名结合式的url
        let blobUrl = window.URL.createObjectURL(res.data);
        let link = document.createElement("a");
        document.body.appendChild(link);
        link.style.display = "none";
        link.href = blobUrl;
        // 设置a标签的下载属性，设置文件名及格式，后缀名最好让后端在数据格式中返回
        link.download = this.playingMusic.name + this.musicType;
        // 自触发click事件
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      });
    },

    // *
    // * 搜索方法
    // * type参数为要搜索的类型
    // * *
    // 重置搜索参数
    resetSearch() {
      this.searchList = [];
      this.searchOffset = 0;
      this.searchReqFlag = true;
    },
    // 搜索方法
    searchMusic() {
      //开始搜索动画
      this.searchLoading = true;

      if (this.searchContent != "") {
        this.showSearchView = true;
        this.axios
          .get("musicApi", {
            params: {
              searchOrigin: this.searchOrigin,
              doWhat: "search",
              key: VueGlobal.MusicApiKey,
              s: this.searchContent,
              type: this.searchType,
              limit: 20,
              offset: this.searchOffset
            }
          })
          .then(res => {
            // 200:成功返回数据
            if (res.status == "200") {
              console.log(res.data)
              this.searchList = this.searchList.concat(res.data);
              this.searchOffset++;
              // 打开请求开关
              this.searchReqFlag = true;
            }
            // 非正常返回结果
            else {
              return;
            }

            // 关闭搜索动画
            this.searchLoading = false;
          });
      } else {
        this.showSearchView = false;
      }
    },

    // *
    // * 搜索内容刷新
    // *
    refresh(v, h, event) {
      let diff =
        this.$refs["searchList"].offsetHeight -
        this.$refs["searchListWrap"].offsetHeight;
      if (v.scrollTop >= diff) {
        if (this.searchReqFlag) {
          this.searchReqFlag = false;
          // 开始请求新内容
          this.searchMusic();
        }
      }
    }
  },

  // *
  // * 在实例创建完成后钩子函数,此时该组件还未被挂载
  // * *
  created() {
    // *
    // * 请求精品歌单信息
    // *
    this.axios.get().then();

    // *
    // * 给文档绑定鼠标移动,鼠标按钮弹起监听事件
    // * 鼠标移动时调用palyerMove方法
    // * 弹起时调用isMove(true),及不可移动
    // *
    document.documentElement.addEventListener(
      "mousemove",
      this.playerMove,
      false
    );
    document.documentElement.addEventListener(
      "mouseup",
      () => {
        this.isMove(false);
        document.documentElement.classList.remove("noselect");
      },
      false
    );

    // *
    // * 当实例创建完成后通过MusicPlayer广播站通知各接收站,并传递true值
    // * *
    MusicPlayer.$emit("renderFinished", true);
  },

  // *
  // * 组件已实例化并挂载钩子函数
  // * *
  mounted() {
    // 数据广播站接收数据监听<=S
    // 接收一首歌曲的相关参数
    MusicPlayer.$on("musicList", data => {
      // 切换音乐清单
      this.musicList = data.list;
      // 切换清单脚标
      this.musicListSub = data.sub;
      // 切换暂停状态为否
      this.isPause = false;
    });

    // 接收并设置音乐播放器是否渲染<=S
    MusicPlayer.$on("isRender", data => {
      // 控制音乐播放器渲染
      this.isRender = data;
    });
    // 接收并设置音乐播放器是否渲染=>E

    // 接收并设置音乐播放器是否显示
    MusicPlayer.$on("isShow", data => {
      this.isShow = data;
    });
    // 数据广播站接收数据监听=>E
  },

  // *
  // * 组件销毁后钩子函数
  // *
  destroyed() {
    // *
    // * 组件销毁后取消body绑定事件
    // *
    document.documentElement.removeEventListener("mousemove", this.playerMove);
    document.documentElement.removeEventListener("mouseup", () => {
      this.isMove(false);
      document.documentElement.classList.remove("noselect");
    });
  }
};
</script>



<style scoped>

/* 加载动画样式重置<=S */
.loading::before{
  background-color: rgba(255, 255, 255, 0.74);
}
.loading::after{
  color: #222;
  font-size: 24px;
}
/* 加载动画样式重置=>E*/

#music-player {
  position: fixed;
  z-index: 999;
  left: 70px;
  bottom: 0;
  width: 8rem;
  height: 6rem;
  overflow: hidden;
}

/* 播放器隐藏动画 <=S */
#music-player.shadow {
  animation: playerHidden 300ms ease-in-out;
  transform: scale(0);
}

@keyframes playerHidden {
  0% {
    transform: scale(1);
  }
  10% {
    transform: scale(1.2);
  }
  20% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(0);
  }
}
/* 播放器隐藏动画 =>E */

/* 隐藏音乐播放器实例 */
.music-player-do {
  display: none;
}

/* 音乐播放器UI界面<=S */

.music-player-ui {
  width: 100%;
  height: 100%;
  background-color: rgba(20, 20, 20, 0.9);
}

.music-player-ui .bg {
  position: absolute;
  z-index: 1;
  height: 100%;
  width: 100%;
  transform: scale(1.1);
  background-size: cover;
  background-repeat: no-repeat;
  filter: blur(9px);
}
.music-player-ui::after {
  content: "";
  position: absolute;
  z-index: 2;
  top: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(132deg, rgba(0, 0, 0, 0.54), rgba(0, 0, 0, 0.76));
}
.player-container {
  position: relative;
  z-index: 3;
}

/* 头部 */
header {
  position: relative;
  z-index: 1;
  height: 0.58rem;
  padding: 0.13rem;
  background-color: transparent;
}
header .do-drag {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 0;
}
header > div {
  float: left;
}
.search-container {
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
}
header .title {
  position: relative;
  margin: 0;
  padding: 0;
  font-size: 0.18rem;
  line-height: 0.32rem;
  z-index: -1;
}
header .search {
  position: relative;
  z-index: 1;
  height: 0.32rem;
  width: 3rem;
  margin-left: 1.3rem;
  padding: 0 0.2rem;
  background-color: rgba(255, 255, 255, 0.74);
  border-radius: 0.16rem;
}
header .search input {
  display: block;
  margin: 0;
  font-size: 0.16rem;
  width: 90%;
  line-height: 0.32rem;
  height: 0.32rem;
  border-width: 0;
  outline: none;
  background: transparent;
  float: left;
}
header .do-search {
  display: block;
  line-height: 0.32rem;
  font-size: 0.2rem;
  text-align: right;
  width: 10%;
  float: right;
}
header .do-search i {
  cursor: pointer;
}
header .close {
  position: relative;
  z-index: 1;
  float: right;
  line-height: 0.32rem;
  font-size: 0.26rem;
}
/* 内容显示区域 */
.player-body {
  height: 4.6rem;
}
.lrc-container {
  height: 4.6rem;
  padding: 0.4rem;
}
.lrc-wrap {
  padding-top: 1.4rem;
  overflow: hidden;
  height: 100%;
}
.lrc-wrap ul {
  transition: all 300ms linear;
}
.lrc-wrap li {
  color: rgba(255, 255, 255, 0.74);
  font-size: 0.14rem;
  line-height: 0.36rem;
  text-align: center;
}
.lrc-wrap li.active {
  color: #fff;
  font-size: 0.2rem;
  line-height: 0.42rem;
  white-space: normal;
}
.music-container .music-list {
  height: 4.6rem;
  overflow: hidden;
  border-right: 1px solid #888;
}
.music-container .music-list .pic img {
  width: 100%;
  height: auto;
}
.music-container .music-list .pic,
.music-container .music-list .col-md-9 {
  padding: 0.06rem;
}
.music-container .music-list .row .row {
  padding: 0.02rem 0.06rem;
}
.music-container .music-list li {
  padding: 0.06rem;
  cursor: pointer;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.2);
}
.music-container .music-list li:hover {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
}
.music-container .music-list li .col-md-4 {
  text-align: right;
}
.music-container .music-list li.active {
  color: #fff;
  padding: 0;
  background-color: rgba(255, 255, 255, 0.1);
}
.music-container .music-list .col-md-9 .row {
  padding: 0.04rem;
}
.music-container .music-list .col-md-9 .line1:first-child {
  margin-bottom: 0.04rem;
  font-size: 0.16rem;
}
.music-container .music-list .col-md-9 .line1:nth-child(2) {
  font-size: 0.14rem;
}
.s-finish-wrap {
  height: 4.6rem;
}
.s-finish-wrap .assort,
.s-finish-view nav > div {
  padding: 0.07rem 0.17rem;
  background-color: #222;
}
.s-finish-view nav,
.s-finish-view nav > div {
  background-color: #333;
}
.s-finish-wrap .assort a,
.s-finish-view nav a {
  font-size: 0.14rem;
  display: inline;
  padding: 0.01rem 0.13rem;
  border-radius: 0.2rem;
  color: #fff;
}
.s-finish-wrap .assort a:hover,
.s-finish-view nav a:hover {
  background-color: #000;
}
.s-finish-view nav a:hover {
  background-color: #222;
}
.s-finish-view nav .search-origin {
  float: right;
}
.s-finish-view nav .search-type {
  float: left;
}
.s-finish-view .content-wrap {
  padding: 0.1rem 0;
  height: 4.32rem;
  overflow: hidden;
}
.s-finish-view .content-wrap li {
  padding: 0.08rem 0.2rem;
}
.s-finish-view .content-wrap li:nth-child(2n) {
  background-color: rgba(255, 255, 255, 0.1);
}
.s-finish-view .content-wrap li .time {
  text-align: right;
}
/* 底部状态栏 */
footer {
  height: 0.82rem;
  background-color: transparent;
}
.progress-container {
  cursor: pointer;
  height: 0.02rem;
  background-color: #999999;
}
.progress-bar {
  position: relative;
  height: 100%;
  width: 60%;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
  background: linear-gradient(to right, #660099, #ff0066);
}
.user-handle .col-md-4 {
  height: 0.8rem;
}
.user-handle .player {
  font-size: 0.24rem;
  line-height: 0.8rem;
  text-align: center;
  padding: 0.28rem 0.36rem;
}
.user-handle .player .fa {
  display: block;
  width: 0.24rem;
  height: 0.24rem;
  float: left;
  margin: 0 0.2rem;
  cursor: pointer;
  text-align: center;
}
.setting {
  line-height: 0.8rem;
  text-align: center;
  font-size: 0.18rem;
}
.setting .fa {
  margin: 0 0.08rem;
  cursor: pointer;
}
.info {
  padding: 0.1rem 0 0.1rem 0.2rem;
}
.info .pic {
  float: left;
  height: 0.6rem;
  width: 0.6rem;
  overflow: hidden;
  border-radius: 50%;
}
.info .pic img {
  width: 100%;
}
.info .name,
.info .singer {
  width: 1.6rem;
  margin-left: 0.2rem;
}
.info .name {
  padding-top: 0.1rem;
  float: left;
  font-size: 0.18rem;
  line-height: 0.2rem;
}
.info .singer {
  float: left;
  line-height: 0.2rem;
  font-size: 0.14rem;
}
.playingList {
  position: absolute;
  bottom: 0.6rem;
  right: 0.22rem;
  height: 3rem;
  width: 2rem;
  overflow: hidden;
}
.playingList svg {
  height: 3rem;
  width: 2rem;
  position: absolute;
  top: 0;
  left: 0;
}
.playingList .meanlist {
  z-index: 4;
  overflow-y: scroll;
  height: 2.72rem;
  width: 2.06rem;
  margin: 0.1rem;
  position: relative;
}
.playingList li {
  position: relative;
  font-size: 0.16rem;
  line-height: 0.36rem;
  text-align: left;
  cursor: pointer;
}
.playingList li.active {
  color: #fff;
  text-overflow: inherit;
}
/* 滑动条 */
input[type="range"] {
  position: absolute;
  right: 0;
  margin-right: -0.3rem;
  bottom: 0;
  margin-bottom: 0.6rem;
  transform-origin: left center;
  transform: rotateZ(-90deg);
  /* 去除浏览器默认的样式 */
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 1.2rem;
  border-radius: 0.2rem;
}
input[type="range"]:focus {
  outline: none; /*原始的控件获取到焦点时，会显示包裹整个控件的边框，所以还需要把边框取消。*/
}
input[type="range"]::-webkit-slider-runnable-track {
  height: 0.04rem;
  border-radius: 0.2rem; /*将轨道设为圆角的*/
  background-color: #ffc815;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 0.1rem;
  height: 0.1rem;
  border-radius: 50%;
  position: relative;
  top: -0.03rem;
  background: #fff;
}
/* 音乐播放器UI界面=>E */
</style>
