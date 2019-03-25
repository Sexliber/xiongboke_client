<template>
  <div>
    <div class="recom-bar right-bar">
      <div class="bg-white">
        <div class="title white">
          <i aria-hidden="true" class="fa fa-list-ul"></i>
          <span>推荐内容</span>
        </div>
        <div class="list">
          <ul>
            <li v-for="(item,key) in getData" :key="key">
              <i aria-hidden="true" class="fa fa-link"></i>
              <router-link :to="{ptah:'writes',query:{id:item.id}}" v-text="item.title" class="darkgray link"/>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
// 请求模块
import axios from "axios";
//全局模块
import global from "../VueGlobal";

export default {
  name: "Recommend",
  data: function() {
    return {
      getData: [0]
    };
  },
  created() {
    axios.get(global.webRoot + "virtualData/recom-demo.json").then(response => {
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
  background-color: #404040;
  padding: 20px;
  margin: -1px -1px 1px -1px;
  border: 1px solid #ddd;
  font-weight: 600;
}
.right-bar .title span{
  margin-left: 10px;
}
.link{
  margin-left: 10px;
}
.link:hover{
  color: #339999;
}
.right-bar .list {
  padding: 20px;
}
.recom-bar li {
  padding: 6px 0;
  font-size: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
