<template>
  <!-- *
    *  音乐播放器组件
  *-->
  <div id="music-player" v-if="isRender" v-show="isShow">
    <!-- 音乐播放器界面<=S -->
    <div class="music-player-ui"></div>
    <!-- 音乐播放器界面=>E -->
    <!-- 音乐播放器实例<=S -->
    <div class="music-player-do">
      <video controls name="media" v-getDom>
        <source>
      </video>
    </div>
    <!-- 音乐播放器实例=>E -->
  </div>
</template>



<script>
// 判断是否为移动设备
import isMobile from "../libs/isMobile";
// 引入音乐播放器数据广播站
import MusicPlayer from "../model/MusicPlayer";

// 音乐播放器dom
let MusicPlayerDom = null;

export default {
  name: "MusicPlayer",
  data() {
    return {
      // 通过是否为移动设备判断是否渲染该组件
      isRender: !isMobile,
      // 音乐播放器是否显示,默认为false
      isShow: false,
      // 音乐清单
      songList: null,
      // 正在播放的音乐
      playingMusic: ""
    };
  },
  watch: {
    // 监听到playingMusic变动,重置播放器配置
    playingMusic: function(newSong, oldSong) {
      let codeRate = [999000, 320000, 192000, 128000];
      for (let i in codeRate) {
        MusicPlayerDom.src = this.playingMusic.url + `&br=${codeRate[i]}`;
        MusicPlayerDom.load();
      }
      MusicPlayerDom.play();
    }
  },
  directives: {
    getDom: {
      inserted: function(el) {
        MusicPlayerDom = el;
      }
    }
  },
  mounted() {
    // 数据广播站接收数据监听<=S
    // 接收一首歌曲的相关参数
    MusicPlayer.$on("songId", data => {
      this.playingMusic = data;
    });
    // 接收并设置音乐播放器是否显示
    MusicPlayer.$on("isShow", data => {
      this.isShow = data;
    });
    // 数据广播站接收数据监听=>E
  }
};
</script>



<style scoped>
#music-player {
  position: fixed;
  z-index: 999;
  height: 300px;
  width: 200px;
  background-color: #fff;
}
.music-player-do {
  display: none;
}
</style>
