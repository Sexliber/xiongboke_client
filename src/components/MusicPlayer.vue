<template>
  <!-- *
    *  音乐播放器组件
  *-->
  <div v-if="isShow">
    <div id="music-player"></div>
  </div>
</template>



<script>
// 判断是否为移动设备
import isMobile from "../libs/isMobile";
// 引入音乐播放器数据广播站
import MusicPlayer from "../model/MusicPlayer";

export default {
  name: "MusicPlayer",
  data() {
    return {
      // 通过是否为移动设备判断该组件是否显示
      isShow: isMobile,
      // 音乐清单
      songList: null
    };
  },
  mounted() {
    MusicPlayer.$on("songId", data => {
      console.log(data);
    });
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
</style>
