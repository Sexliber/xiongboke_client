<template>
  <div class="neteaseMusic">
    <div class="music-bar right-bar">
      <div class="bg-white">
        <div class="title white bg-black">
          <i aria-hidden="true" class="fa fa-list-ul"></i>
          <span>我的歌单</span>
        </div>
        <div class="list" :style="{backgroundImage:`url(${background})`}">
          <vue-scroll>
            <ul>
              <li v-for="(item,key) in getData" :key="key" class="clearboth">
                <a :href="`https://music.163.com/#/song?id=${item.id}`" target="_blank">
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
                      >
                      {{parseInt(item.time/60) | numPlace(2)}}:{{item.time%60 | numPlace(2)}}
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </vue-scroll>
          <div class="overlay"/>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import global from "../VueGlobal";

export default {
  name: "NeteaseMusic",
  data: function() {
    return {
      // 歌曲面板背景
      background: global.NeteaseMusicBg,
      // 接收所有歌曲信息
      getData: [0]
    };
  },
  created() {
    this.axios
      .get("neteaseMusic", {
        params: {
          // 网易云歌单id号
          id: 150994526
        }
      })
      .then(response => {
        // 获取到到所有数据传递给getData
        this.getData = response.data;
        console.log(this.getData);
      });
  }
};
</script>



<style scoped>
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
.bg-white {
  border: 1px solid #ddd;
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
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #404040;
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
  text-align: right;
  padding-right: 10px;
}
.__rail-is-vertical{
  z-index: 6 !important;
}
</style>
