<template>
  <div class="neteaseMusic">
    <div class="music-bar right-bar">
      <div class="title white bg-black">
        <i aria-hidden="true" class="fa fa-list-ul"></i>
        <span>我的歌单</span>
      </div>
      <div class="list">
        <vue-scroll>
          <ul>
            <li
              v-for="(item,key) in getData"
              :key="key"
              class="clearboth"
              :class="{active:isActive[key],pause:isClassPause[key]}"
            >
              <a
                :href="`https://music.163.com/#/song?id=${item.id}`"
                target="_blank"
                @click.prevent="excSong(key)"
              >
                <div class="row">
                  <div class="ico col-sm-1 col-xs-1">
                    <i class="fa fa-play-circle-o white" aria-hidden="true"></i>
                    <span class="sernumber white" v-cloak>{{key+1 | numPlace(3)}}</span>
                  </div>
                  <div class="name col-sm-6 col-xs-6 line1 white">
                    <span v-text="item.name"></span>
                  </div>
                  <div class="singer col-sm-3 col-xs-3 line1 white">
                    <span v-text="item.singer"></span>
                  </div>
                  <div class="time white col-sm-2 col-xs-2">
                    <span
                      v-cloak
                    >{{parseInt(item.time/60) | numPlace(2)}}:{{item.time%60 | numPlace(2)}}</span>
                    <!-- 伪均衡器 -->
                    <ul class="equalizer">
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </vue-scroll>
        <div class="overlay"/>
      </div>
    </div>
    <!-- 音乐播放器实例<=S -->
    <div id="netease-player" v-if="isRender">
      <audio controls name="media" v-getDom>
        <source :src="playingMusic.url+'&br=320000'">
      </audio>
    </div>
    <!-- 音乐播放器实例=>E -->
  </div>
</template>



<script>
// 全局配置
import global from "../VueGlobal";
// 检测当前设备是否为移动设备
import isMobile from "../libs/isMobile";
// 引入音乐播放器数据广播站
import MusicPlayer from "../model/MusicPlayer";

// 移动端播放器dom
let mobilePlayer = null;

export default {
  name: "NeteaseMusic",
  data: function() {
    return {
      // 歌曲面板背景
      background: global.NeteaseMusicBg,
      // 网易云歌单ID号
      neteaseListId: 150994526,
      // active,isClassPause数组
      isActive: [false],
      isClassPause: [false],
      // 上一个获取active类的元素key值
      lastActiveKey: 0,
      // 接收所有歌曲信息
      getData: [0],
      // 是否渲染移动端播放器
      isRender: isMobile,
      // 移动端播放器正在播放歌曲参数
      playingMusic: "",
      // 移动端播放器是否为暂停状态
      isPause: false
    };
  },
  watch: {
    // 监听播放歌曲参数变动切换播放器歌曲
    playingMusic: function(newSong, oldSong) {
      this.isClassPause.splice(this.lastActiveKey, 1, false);
      let codeRate = [999000, 320000, 192000, 128000];
      for (let i in codeRate) {
        mobilePlayer.src = this.playingMusic.url + `&br=${codeRate[i]}`;
        mobilePlayer.load();
      }
      mobilePlayer.play();
    }
  },
  methods: {
    // 每一个item被点击后将值传递给音乐播放器数据广播站
    excSong(key) {
      // 非移动设备则传递歌曲参数并显示播放器
      if (!isMobile) {
        MusicPlayer.$emit("songId", this.getData[key]);
        MusicPlayer.$emit("isShow", true);
      }
      // 移动设备则直接播放音乐
      else {
        // 切换active状态
        this.isActive.splice(this.lastActiveKey, 1, false);
        this.isActive.splice(key, 1, true);
        this.lastActiveKey = key;
        // 点击了正在播放的音乐,则停止播放
        if (this.playingMusic == this.getData[key]) {
          this.isPause = !this.isPause;
          // 停止播放
          if (this.isPause) {
            mobilePlayer.pause();
            this.isClassPause.splice(key, 1, true);
          }
          // 播放音乐
          else {
            mobilePlayer.play();
            this.isClassPause.splice(key, 1, false);
          }
        }
        this.playingMusic = this.getData[key];
      }
    }
  },
  directives: {
    // 获取当前元素的dom
    getDom: {
      inserted: function(el) {
        //将获取到的dom传递给mobilePlayer变量
        mobilePlayer = el;
      }
    }
  },
  created() {
    // 请求网易云歌单
    this.axios
      .get("neteaseMusic", {
        params: {
          // 网易云歌单id号
          id: this.neteaseListId
        }
      })
      .then(response => {
        // 获取到到所有数据传递给getData
        this.getData = response.data;
        // 初始化isActive和isClassPause长度
        for (let i in response.data) {
          this.isActive.splice(i, 1, false);
          this.isClassPause.splice(i, 1, false);
        }
        console.log(this.getData);
      });
  }
};
</script>



<style scoped>
#netease-player {
  display: none;
}
.overlay {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.85));
}
.neteaseMusic {
  height: calc(100vh - 70px);
}
.music-bar,
.bg-white,
.list {
  height: 100%;
}
.right-bar .title {
  padding: 20px;
  margin: 0;
  font-weight: 600;
}
.right-bar .title span {
  margin-left: 10px;
}
.link {
  margin-left: 10px;
}
.link:hover {
  color: #339999;
}
.list {
  overflow: hidden;
  position: relative;
  padding: 20px;
}
.music-bar li {
  position: relative;
  z-index: 2;
  padding: 10px 0;
}
.sernumber {
  text-align: center;
}
.ico {
  text-align: center;
}
.ico .fa {
  display: none;
}
li:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
li:hover .fa {
  font-size: 18px;
  display: inline-block;
}
li:hover .sernumber {
  display: none;
}
.name {
  padding: 0 10px;
}
.time {
  position: relative;
  text-align: right;
  padding-right: 10px;
}
.equalizer {
  height: 100%;
  display: none;
}
.equalizer li {
  display: inline-block;
  width: 4px;
  height: 100%;
  margin: 1px;
  border-radius: 2px;
  background-color: #fff;
  animation: equalizer 300ms ease-in infinite alternate;
}
.equalizer li:nth-child(2) {
  animation-delay: 100ms;
}
.equalizer li:nth-child(3) {
  animation-delay: 200ms;
}
.equalizer li:nth-child(4) {
  animation-delay: 300ms;
}
.equalizer li:nth-child(5) {
  animation-delay: 400ms;
}
.equalizer li:nth-child(6) {
  animation-delay: 500ms;
}
@keyframes equalizer {
  0% {
    transform: scaleY(0);
  }
  50% {
    transform: scaleY(0.5);
  }
  100% {
    transform: scaleY(1);
  }
}
/* 被点击后的状态 */
.active .fa::before {
  content: "\f28c";
}
.active .time span {
  display: none;
}
.active .equalizer {
  display: block;
  position: absolute;
  display: block;
  left: 50%;
  margin-left: -16px;
}
.active.pause .fa::before {
  content: "\f01d";
}
.active.pause .time span {
  display: block;
}
.active.pause .equalizer {
  display: none;
}
.__rail-is-vertical {
  z-index: 6 !important;
}
</style>
