<template>
  <div id="image-banner" data-ride="carousel" class="carousel slide">
    <ol class="carousel-indicators">
      <li
        v-for="(item,key) in getData"
        :key="key"
        data-target="#image-banner"
        :data-slide-to="key"
        v-active="key"
      ></li>
    </ol>
    <div role="listbox" class="carousel-inner">
      <div v-for="(item,key) in getData" :key="key" class="item" v-active="key">
        <a href>
          <img :src="item.thumbnail">
        </a>
      </div>
    </div>
    <a href="#image-banner" role="button" data-slide="prev" class="left carousel-control">
      <span aria-hidden="true" class="glyphicon glyphicon-chevron-left"></span>
    </a>
    <a href="#image-banner" role="button" data-slide="next" class="right carousel-control">
      <span aria-hidden="true" class="glyphicon glyphicon-chevron-right"></span>
    </a>
  </div>
</template>



<script>
// axios请求模块
import axios from "axios";
// 全局配置模块
import global from "../VueGlobal";

export default {
  name: "ImageReplayBanner",
  data: function() {
    return {
      getData: [0]
    };
  },
  directives: {
    active: {
      inserted: function(el,binding) {
        if(binding.value == 0){
          el.classList.add('active');
        }
      }
    }
  },
  created() {
    // 请求热门软件数据
    axios.get(global.webRoot + "virtualData/hot-demo.json").then(response => {
      this.getData = response.data;
    });
  }
};
</script>



<style>
img {
  display: block;
  width: 100%;
  height: auto;
}
</style>
