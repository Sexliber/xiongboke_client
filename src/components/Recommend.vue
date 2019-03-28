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
              <router-link :to="{path:'/writes',query:{id:item.id}}" v-text="item.title" class="darkgray link"/>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>



<script>

export default {
  name: "Recommend",
  data: function() {
    return {
      getData: [0]
    };
  },
  created() {
    this.axios.get("virtualData/recom-demo.json").then(response => {
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
