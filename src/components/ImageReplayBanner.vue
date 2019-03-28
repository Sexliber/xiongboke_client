<template>
  <div>
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
          <router-link :to="{path:'/writes',query:{id:item.id}}">
            <img :src="item.thumbnail">
          </router-link>
        </div>
      </div>
      <a href="#image-banner" role="button" data-slide="prev" class="left carousel-control">
        <span aria-hidden="true" class="glyphicon glyphicon-chevron-left"></span>
      </a>
      <a href="#image-banner" role="button" data-slide="next" class="right carousel-control">
        <span aria-hidden="true" class="glyphicon glyphicon-chevron-right"></span>
      </a>
    </div>
  </div>
</template>



<script>

export default {
  name: "ImageReplayBanner",
  data: function() {
    return {
      getData: [0]
    };
  },
  directives: {
    active: {
      inserted: function(el, binding) {
        if (binding.value == 0) {
          el.classList.add("active");
        }
      }
    }
  },
  created() {
    // 请求热门软件数据
    this.axios.get("virtualData/hot-demo.json").then(response => {
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
ol li {
  margin: 0 2px !important;
}
</style>
