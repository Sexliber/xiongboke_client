<template>
  <router-link :to="{path:'writes',query:{id:WritesData.id}}">
    <div class="write">
      <div class="bg-pic">
        <img :src="WritesData.thumbnail">
        <div class="overlay"/>
      </div>
      <div class="content">
        <div class="info clearboth">
          <div class="date">
            <i class="fa fa-calendar"></i>
            <span v-cloak>{{WritesData.date}}</span>
          </div>
          <div class="visitors">
            <i class="fa fa-user"></i>
            <span v-cloak>{{WritesData.visitors}}</span>
          </div>
          <router-link
            :to="{path:'/search',query:{tag:WritesData.tag}}"
            class="tag bg-white"
            v-text="WritesData.tag"
          ></router-link>
        </div>
        <hr>
        <div class="title">
          <span v-cloak>{{WritesData.title | textLength(86)}}</span>
        </div>
        <div class="text">
          <span v-cloak>{{WritesData.text}}</span>
        </div>
      </div>
    </div>
  </router-link>
</template>



<script>
// url工具
import urlLib from "url";

export default {
  name: "Writes",
  data: function() {
    return {
      urlLib
    };
  },
  props: ["WritesData"]
};
</script>



<style scoped>
.overlay {
  background-color: rgba(0, 0, 0, 0.5);
}
.bg-pic {
  z-index: 0;
  position: relative;
}
img {
  position: relative;
  z-index: 0;
  display: block;
  width: 100%;
  height: auto;
}
.content {
  position: absolute;
  top: 0;
  z-index: 1;
  height: 100%;
  width: 100%;
  padding: 28px 34px;
}
.info {
  color: #fff;
  font-size: 14px;
}
.info i {
  margin-right: 6px;
}
.info > div {
  float: right;
}
.visitors {
  margin-right: 22px;
}
.tag {
  padding: 6px 10px;
  color: #404040;
  font-weight: bold;
}
.tag:hover{
  background-color: rgb(255, 200, 21);
  color:#fff;
}
hr {
  margin-top: 4px;
}
.title {
  color: #fff;
  padding: 36px 30px 0 0;
  font-size: 18px;
  word-break: break-all;
  line-height: 26px;
  overflow: visible;
  white-space: normal;
}
.text {
  color: #ddd;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

