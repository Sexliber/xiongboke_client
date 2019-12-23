<template>
  <router-link :to="{path:'/writes',query:{url:WritesData.url}}">
    <div class="write">
      <div class="bg-pic">
        <img :src="WritesData.cover" />
      </div>
    </div>
    <div class="content bg-white">
      <div class="title darkgray">
        <h3 v-text="WritesData.title" />
      </div>
      <div class="visitor lightgray t-no-wrap t-over-hide">
        <span class="click">
          <i class="fa fa-eye" aria-hidden="true"></i>
          <span v-text="WritesData.click" />
        </span>
        <span class="assist">
          <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
          <span v-text="WritesData.assist" />
        </span>
        <span class="time">
          <i class="fa fa-clock-o" aria-hidden="true"></i>
          <span v-text="WritesData.time" />
        </span>
      </div>
    </div>
  </router-link>
</template>



<script>
export default {
  name: "WritesBlock",
  props: ["WritesData"]
};
</script>



<style scoped>
.date {
  color: #888;
  margin-left: 14px;
}
.info > span,
.chathead {
  display: inline-block;
  line-height: 48px;
  margin-right: 4px;
}
.info {
  padding-left: 10px;
}
.write {
  overflow: hidden;
}
.bg-pic {
  z-index: 0;
  position: relative;
}
.bg-pic > img {
  position: relative;
  z-index: 0;
  display: block;
  width: 100%;
  height: auto;
}
.content {
  position: relative;
  z-index: 1;
}
.tag {
  padding: 0 10px;
  color: #888;
  font-size: 14px;
}
.title,
.text {
  padding: 0 15px;
}
.title {
  display: -webkit-box;
  overflow: hidden;
  margin: 0;
  height: 90px;
  line-height: 46px;
  text-align: left;
  text-overflow: hidden;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
.title h3{
  font-size: 20px;
}
.visitor {
  padding-left: 10px;
  font-size: 14px;
}
.visitor > span {
  line-height: 46px;
}
.visitor > span > span {
  margin-right: 20px;
}
i {
  margin-right: 4px;
}
.chathead {
  height: 24px;
  width: 24px;
  border-radius: 50%;
  overflow: hidden;
}
@media screen and (max-width: 1024px) {
  .text{
    display: none;
  }
}
</style>

