<template>
  <div class="bg-white softs">
    <div class="col-sm-4 col-xs-6">
      <div class="pic">
        <router-link :to="{path:`/writes/${DataSofts.id}`}">
          <img :src="DataSofts.thumbnail">
          <p class="tag white bg-black" v-text="DataSofts.tag">
            <!-- 标签名 -->
          </p>
        </router-link>
      </div>
    </div>
    <div class="col-sm-8 col-xs-6">
      <h3 class="title" v-cloak>
        <!-- 标题 -->
        {{DataSofts.title | textLength(32)}}
      </h3>
      <p class="text hidden-xs lightgray" v-cloak>
        <!-- 正文 -->
        {{DataSofts.text | textLength(240)}}
      </p>
      <div class="info clearboth">
        <div class="date">
          <i class="fa fa-clock-o" aria-hidden="true"></i>
          <span>
            <!-- 日期 -->
            {{DataSofts.date | dateMod}}
          </span>
        </div>
        <div class="visitors">
          <i class="fa fa-comment" aria-hidden="true"></i>
          <span v-text="DataSofts.visitors">
            <!-- 浏览数量 -->
          </span>
        </div>
        <router-link :to="{path:`/writes/${DataSofts.id}`}" class="more hidden-xs white bg-black">
          <span class="fa fa-eye clearboth">
            <span>查看更多</span>
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "WritesBanner",
  props: ["DataSofts"]
};
</script>



<style scoped>
.fa {
  margin-right: 4px;
}
.title {
  white-space: nowrap;
  font-size: 18px;
  font-weight: 600;
}
.softs {
  position: relative;
  padding: 24px 0;
  overflow: hidden;
}
.bg-white {
  border: 1px solid #ddd;
}
.softs .col-sm-4 {
  padding: 0 24px;
}
.softs .col-sm-4::before {
  content: "0";
  position: absolute;
  left: 0;
  padding: 8px 0;
  color: #222222;
  background-color: #222222;
}
.softs .pic {
  position: relative;
  overflow: hidden;
}
.softs .pic img {
  display: block;
  max-width: 100%;
  min-height: 100%;
  -webkit-transition: all 300ms linear;
  transition: all 300ms linear;
}
.softs .pic .tag {
  position: absolute;
  top: 0;
  left: 0;
  padding: 8px 10px;
}

.softs .col-sm-8 {
  position: absolute;
  right: 0;
  top: 24px;
  bottom: 24px;
}
.softs .text {
  padding: 10px 0;
  font-size: 14px;
  line-height: 22px;
  text-align: left;
  height: 80px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.softs .info {
  position: relative;
  width: 100%;
  margin-bottom: -16px;
}
.softs .info .date,
.softs .info .visitors {
  float: left;
  margin-right: 20px;
  padding: 8px 0;
}
.softs .info .date,
.softs .info .visitors {
  float: left;
  margin-right: 20px;
  padding: 8px 0;
}
.softs .info .more {
  display: block;
  float: right;
  margin-right: 0;
  width: 112px;
  overflow: hidden;
}
.softs .info .more > span {
  display: block;
  height: 100%;
  width: auto;
}
.softs .info .more > span::before {
  display: block;
  float: left;
  height: 100%;
  padding: 12px 0;
  width: 0;
  text-align: center;
  color: #fff;
  overflow: hidden;
  background-color: #ffc815;
  transition: all 100ms linear;
}
.softs .info .more > span > span {
  display: block;
  padding: 12px 0;
  text-align: center;
  float: left;
  width: 100%;
  transition: all 100ms linear;
}
.softs .info .more > span:hover::before {
  width: 30%;
}
.softs .info .more > span:hover span {
  width: 70%;
}
@media screen and (max-width: 500px) and (min-width: 0) {
  .title {
    white-space: normal;
    font-size: 14px;
    line-height: 20px;
    text-align: left;
    height: 62px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    margin-bottom: 0;
  }
}
</style>


