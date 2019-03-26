<template>
  <div>
    <div class="optimi-bar right-bar">
      <div class="bg-white">
        <div class="title white">
          <i aria-hidden="true" class="fa fa-list-ul"></i>
          <span>优选内容</span>
        </div>
        <div class="list">
          <ul>
            <li v-for="(item,key) in getData" :key="key" @mouseover="mouseover" :class="{active:isActive[key]}">
              <router-link :to="{path:'/writes',query:{id:item.id}}">
                <div class="word container-fluid">
                  <div class="row">
                    <div class="title darkgray col-xs-10 col-sm-10">
                      <span v-text="item.title"/>
                    </div>
                    <div class="date lightgray col-xs-2 col-sm-2">
                      <span v-cloak>{{item.date}}</span>
                    </div>
                  </div>
                </div>
                <div class="pic">
                    <img :src="item.thumbnail"/>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import axios from "axios";
import global from "../VueGlobal";
export default {
  name: "Optimi",
  data: function() {
    return {
      getData: [0],
      isActive: [0]
    };
  },
  methods: {
      mouseover(el){
          el.getAttribute("key");
      }
  },
  created() {
    axios.get(global.webRoot + "virtualData/hot-demo.json").then(response => {
      this.getData = response.data;
      let i = 0;
      for (i in response.data) {
        if (i == 0) {
            this.isActive.splice(i,1,true);
        } else {
            this.isActive.splice(i,1,false);
        }
      }
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
.right-bar .list {
  padding: 20px;
}
.pic {
  display: none;
}
.active .pic {
  display: block;
}
.active .word {
  display: none;
}
.word .date {
  font-size: 14px;
}
.word .title {
  background-color: transparent;
  font-size: 16px;
  padding: 0;
  margin: 0;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 20px;
}
.word .title span{
    margin-left: 0;
}
.word .title,
.word .date {
  line-height: 40px;
}
.pic {
  height: 120px;
  overflow: hidden;
}
.pic img {
  width: 100%;
  display: block;
  height: auto;
}
</style>
