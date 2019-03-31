<template>
  <div>
    <div class="music-bar right-bar">
      <div class="bg-white">
        <div class="title white">
          <i aria-hidden="true" class="fa fa-list-ul"></i>
          <span>我的歌单</span>
        </div>
        <div class="list">
          <ul>
            <li v-for="(item,key) in getData" :key="key">
              
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "NeteaseMusic",
  data: function() {
    return {
      // 接收所有歌曲信息
      getData: [0],
      // 设置所有歌曲进度
      progress: [0],
      // 所有歌曲播放定时器
      interval: [0]
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

        let i = 0;
        for (i in response.data) {
          // 初始化progress变量长度
          this.progress.splice(i, 1, 0);
          // 初始化定时器变量长度
          this.interval.splice(i, 1, 0);
        }

        console.log(this.getData);
      });
  }
};
</script>



<style scoped>
.bg-white {
  border: 1px solid #ddd;
}
.right-bar .title {
  background-color: #404040;
  padding: 20px;
  margin: -1px -1px 1px -1px;
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
.music-bar li {
  position: relative;
  background-color: #404040;
}
</style>
