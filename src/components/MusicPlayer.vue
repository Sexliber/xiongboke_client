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
                    <i
                      class="fa fa-th-list white"
                      aria-hidden="true"
                      @click="musicListShow = !musicListShow"
                    ></i>
                    <i class="fa fa-volume-up white" aria-hidden="true" @click="volShow = !volShow"></i>
                    <i class="fa fa-undo white" aria-hidden="true"></i>
                  </div>
                  <!-- 按钮=>E -->

                  <!-- 正在播放的音乐清单<=S -->
                  <div class="playingList" v-show="musicListShow">
                    <svg>
                      <path
                        fill-rule="evenodd"
                        opacity="0.741"
                        fill="rgb(255, 255, 255)"
                        d="M196.000,292.000 L107.486,292.000 L101.910,298.971 C100.846,300.301 99.121,300.301 98.057,298.971 L92.480,292.000 L4.000,292.000 C1.791,292.000 -0.000,290.209 -0.000,288.000 L-0.000,4.000 C-0.000,1.791 1.791,0.000 4.000,0.000 L196.000,0.000 C198.209,0.000 200.000,1.791 200.000,4.000 L200.000,288.000 C200.000,290.209 198.209,292.000 196.000,292.000 Z"
                      ></path>
                    </svg>
                    <div class="meanlist">
                      <ul>
                        <li
                          class="darkgray"
                          v-for="(item,key) in musicList"
                          :key="key"
                          @click="musicListSub = key"
                        >{{item.name}}</li>
                      </ul>
                    </div>
                  </div>
                  <!-- 正在播放的音乐清单=>E -->

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
      </div>
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
      // * isRender通过isMobile模块判断当前设备是否为移动设备从而控制播放器是否渲染,如不是则渲染,反之则不渲染
      // * isShow控制当前模块是否显示
      // * *
      // 通过是否为移动设备判断是否渲染该组件
      isRender: !isMobile,
      // 音乐播放器是否显示,默认为false
      isShow: false,

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
      codeRate: [999000, 320000, 192000, 128000],
      // 音乐清单
      musicList: "null",
      // 正在播放清单中的第几首音乐
      musicListSub: 99999,
      // 正在播放的音乐
      playingMusic: "null",

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
      // 音乐清单工具是否可见
      musicListShow: false,
      // 播放地址
      playerUrl: "",
      // 音量
      volume: 100,

      // *
      // * 播放器进度条相关变量
      // * *
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
      this.playingMusic = this.musicList[newSub];
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
      // 重置音乐播放器配置并重新播放音乐
      this.playerUrl = this.playingMusic.url + `&br=${this.codeRate[0]}`;
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

      // 播放请求验证,是否能获取到该歌曲,否则切换码率重新请求
      var i = 0;
      for (i in this.codeRate) {
        var isBreak = false;

        await this.axios
          .get(this.playingMusic.url + `&br=${this.codeRate[i]}`)
          .then(() => {
            console.log("请求成功,开始播放");
            if (i != 0) {
              this.playerUrl =
                this.playingMusic.url + `&br=${this.codeRate[i]}`;
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
      if (this.playProgressTime >= this.playingMusic.time) this.musicListSub++;
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
  height: 0.58rem;
}
.search {
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
}
/* 内容显示区域 */
.player-body {
  height: 4.6rem;
}
/* 底部状态栏 */
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
  padding: 0.1rem;
  z-index: 4;
  overflow: hidden scroll;
  height: 3rem;
  position: relative;
  margin-right: -17px;
}
.playingList li {
  position: relative;
  font-size: 0.16rem;
  line-height: 0.36rem;
  text-align: center;
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
