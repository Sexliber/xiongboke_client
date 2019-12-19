<template>
  <router-link :to="{path:'/writes',query:{url:WritesData.url}}">
    <div class="write">
      <div class="bg-pic">
        <img :src="WritesData.cover" />
      </div>
    </div>
    <div class="content bg-white">
      <div class="title darkgray">
        <h3 class="t-no-wrap t-over-hide" v-text="WritesData.title" />
      </div>
      <div class="text darkgray">
        <span v-text="WritesData.text" />
      </div>
      <div class="visitor lightgray">
        <span class="click">
          <i class="fa fa-eye" aria-hidden="true"></i>
          <span v-text="WritesData.visitors" />
        </span>
        <span class="comment">
          <i class="fa fa-commenting-o" aria-hidden="true"></i>
          <span v-text="WritesData.comments" />
        </span>
        <span class="assist">
          <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
          <span v-text="WritesData.assists" />
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
  margin: 0;
  font-size: 90px;
  line-height: 46px;
  text-align: left;
}
.title h3{
  font-size: 20px;
}
.text {
  display: -webkit-box;
  overflow: hidden;
  height: 80px;
  font-size: 16px;
  color: #828a92;
  text-overflow: hidden;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
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

