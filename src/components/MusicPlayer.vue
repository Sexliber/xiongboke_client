<template>
  <!-- *
    *  音乐播放器组件
  *-->
  <div id="music-player" v-if="isRender" v-show="isShow" v-getMusicUiDom>
    <!-- 音乐播放器界面<=S -->
    <div class="music-player-ui noselect">
      <div class="bg" :style="{backgroundImage:`url(${playerBg})`}"></div>
      <div class="player-container">
        <header @mousedown="headerMouseDown">
          <div class="search bg-black"></div>
        </header>

        <div class="player-body"></div>

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
                  <marquee
                    class="white"
                    behavior="scroll"
                    width="80%"
                    direction="left"
                    v-text="playingMusic.name"
                  ></marquee>
                </div>
                <div class="singer line1">
                  <span class="white" v-text="playingMusic.singer"/>
                </div>
              </div>
              <!-- 歌曲信息=>E -->

              <!-- 播放操作<=S -->
              <div class="player clearboth col-md-4">
                <i class="fa fa-fast-backward white" aria-hidden="true"></i>
                <i
                  class="fa fa-play white"
                  :class="{'fa-pause':!isPause}"
                  aria-hidden="true"
                  @click="isPause=!isPause"
                ></i>
                <i class="fa fa-fast-forward white" aria-hidden="true"></i>
              </div>
              <!-- 播放操作=>E -->

              <!-- 设置按钮<=S -->
              <div class="setting col-md-4">
                <div class="row">
                  <div class="col-md-offset-4 col-md-8">
                    <i class="fa fa-th-list white" aria-hidden="true"></i>
                    <i class="fa fa-volume-up white" aria-hidden="true" @click="volShow = !volShow"></i>
                    <i class="fa fa-undo white" aria-hidden="true"></i>
                  </div>
                  <div class="volume" v-show="volShow">
                    <input type="range" min="0" max="100" defaultValue="100" v-model="volume">
                  </div>
                </div>
              </div>
              <!-- 设置按钮=>E -->
            </div>
          </div>
        </footer>
      </div>
    </div>
    <!-- 音乐播放器界面=>E -->

    <!-- 音乐播放器实例<=S -->
    <div class="music-player-do">
      <audio controls name="media" v-getMusicDom>
        <source>
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

// 音乐播放器UI界面dom
var MusicPlayerUi = null;
// 音乐播放器实例dom
var MusicPlayerDom = null;

export default {
  name: "MusicPlayer",
  data() {
    return {
      // 通过是否为移动设备判断是否渲染该组件
      isRender: !isMobile,
      // 音乐播放器是否显示,默认为false
      isShow: false,
      // 头部是否跟随鼠标移动状态(及鼠标是否在头部元素上保持按下)
      isMouseDown: false,
      // 鼠标距离header的上间距
      cursorOffsetTop: 0,
      // 鼠标距离header的左间距
      cursorOffsetLeft: 0,
      // 音量调节工具是否可见
      volShow: false,
      // 音乐码率
      codeRate: 999000,
      // 音乐清单
      songList: null,
      // 正在播放的音乐
      playingMusic: "",
      // 音乐播放器背景
      playerBg: "null",
      // 音乐播放器头图
      playerHeadImg: "null",
      // 是否设置为暂停状态(true为暂停,false为继续播放)
      isPause: false,
      // 音量
      volume: 100,
      // 播放进度计时
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
  watch: {
    // 监听到playingMusic变动(及切换歌曲),重置播放器配置并重新播放音乐
    playingMusic: async function(newSong, oldSong) {
      // 重置音乐播放器配置并重新播放音乐
      MusicPlayerDom.src = this.playingMusic.url + `&br=${this.codeRate}`;
      MusicPlayerDom.load();
      MusicPlayerDom.play();

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

      // 播放请求验证
      var codeRate = [999000, 320000, 192000, 128000];
      var i = 0;
      for (i in codeRate) {
        var isBreak = false;

        await this.axios
          .get(this.playingMusic.url + `&br=${codeRate[i]}`)
          .then(() => {
            console.log("请求成功,开始播放");
            if (i != 0) {
              MusicPlayerDom.src = this.playingMusic.url + `&br=${codeRate[i]}`;
              MusicPlayerDom.load();
              MusicPlayerDom.play();
            }
            isBreak = true;
          })
          .catch(error => {
            console.log("请求失败,更换码率");
          });

        if (isBreak) break;
      }
    },

    // 监听isPause变动实现暂停播放功能
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

    // 监听volume变动更改音量大小
    volume: function(newData, oldData) {
      MusicPlayerDom.volume = newData / 100;
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
    // * 播放器跟随鼠标移动开关
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

    // 进度条时间捕获并赋值给playProgressTime
    catchProgressTime() {
      this.playProgressTime = parseInt(MusicPlayerDom.currentTime);
      this.progressBarWidth = this.playProgressTime * this.progressBarWidthUnit;
    }
  },
  mounted() {
    // 数据广播站接收数据监听<=S
    // 接收一首歌曲的相关参数
    MusicPlayer.$on("songId", data => {
      this.playingMusic = data;
      this.isPause = false;
    });
    // 接收并设置音乐播放器是否显示
    MusicPlayer.$on("isShow", data => {
      this.isShow = data;
    });
    // 数据广播站接收数据监听=>E
  },
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
  },
  destroyed() {
    // *
    // * 组件销毁后取消body绑定事件
    // *
    document.documentElement.removeEventListener("mouseup", () =>
      this.isMove(false)
    );
    document.documentElement.removeEventListener("mouseup", () => {
      this.isMove(false);
      document.documentElement.classList.remove("noselect");
    });
  }
};
</script>



<style scoped>
#music-player {
  position: fixed;
  z-index: 999;
  left: 70px;
  bottom: 0;
  width: 8rem;
  height: 6rem;
  overflow: hidden;
}

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
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.76), rgba(0, 0, 0, 0.88));
}
.player-container {
  position: relative;
  z-index: 3;
}

/* 头部 */
header {
  height: 0.58rem;
}
.search {
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
}
.player-body {
  height: 4.6rem;
}
footer {
  height: 0.82rem;
  background-color: rgba(0, 0, 0, 0.9);
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
.user-handle .info {
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
  padding-left: 0.2rem;
}
.info .name {
  padding-top: 0.1rem;
  float: left;
  font-size: 18px;
  line-height: 0.2rem;
}
.info .singer {
  float: left;
  line-height: 0.2rem;
  font-size: 14px;
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
