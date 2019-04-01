<template>
  <div>
    <div class="recom-bar right-bar">
      <div class="bg-white">
        <div class="title white bg-black">
          <i aria-hidden="true" class="fa fa-list-ul"></i>
          <span>腾讯漫画</span>
        </div>
        <div class="container-fluid background" :style="{backgroundImage:`url(${background})`}">
          <ul class="row list">
            <a
              v-for="(item,key) in getData"
              :key="key"
              :href="'http://ac.qq.com/Comic/comicInfo/id/'+item.id"
              target="_blank"
            >
              <li class="comic col-sm-4 col-md-6 col-xs-6">
                <div class="pic bg-black">
                  <img :src="item.pic" alt>
                </div>
                <div class="content bg-black">
                  <h3 class="title white line1" v-text="item.less_title"/>
                  <p class="intrd line1" v-text="item.intrd"/>
                  <div class="tag">
                    <span
                      v-for="(tags,_key) in item.tags"
                      :key="_key"
                      v-text="tags"
                      class="bg-yellow white"
                    />
                  </div>
                </div>
                <div class="border">
                  <div></div>
                </div>
              </li>
            </a>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import global from "../VueGlobal";

export default {
  name: "CloudComics",
  data: function() {
    return {
      background:global.TencentComicBg,
      getData: [0]
    };
  },
  created() {
    // 获取腾讯漫画数据,adpos为必须项,num为请求的数据长度
    this.axios.get("tencentComic?num=12").then(response => {
      this.getData = response.data;
    });
  }
};
</script>



<style scoped>
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
.right-bar .list {
  padding: 20px;
}
.comic {
  position: relative;
  padding: 2px;
}
.comic .border {
  position: absolute;
  padding: 1px;
  top: 1px;
  left: 1px;
  right: 2px;
  bottom: 1px;
  border: 4px solid #ffc815;
  display: none;
}
.comic:hover .border {
  display: block;
}
.content .title {
  background-color: transparent !important;
  margin: 0 !important;
  padding: 6px 10px !important;
  font-weight: 500 !important;
}
p {
  padding-left: 10px;
  color: #ccc;
  margin: 0;
}
.tag {
  padding: 12px 10px;
}
.tag span {
  padding: 4px 6px;
  margin-right: 4px;
}
</style>
