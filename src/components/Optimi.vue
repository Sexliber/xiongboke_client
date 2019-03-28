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
            <li
              v-for="(item,key) in getData"
              :key="key"
              @mouseover="mouseover(key)"
              :class="{active:isActive[key]}"
            >
              <router-link :to="{path:'/writes',query:{id:item.id}}">
                <div class="word container-fluid">
                  <div class="row">
                    <div class="title darkgray col-xs-10 col-sm-10">
                      <span v-text="item.title"/>
                    </div>
                    <div class="date lightgray col-xs-2 col-sm-2">
                      <span v-cloak>{{item.date | dateMod}}</span>
                    </div>
                  </div>
                </div>
                <div class="pic">
                  <img :src="item.thumbnail">
                  <div class="content">
                    <h3 class="title white line1" v-text="item.title"/>
                    <p class="date">{{item.date|dateMod}}</p>
                  </div>
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
export default {
  name: "Optimi",
  data: function() {
    return {
      getData: [0],
      isActive: [0]
    };
  },
  methods: {
    mouseover(key) {
      let i = 0;
      for (i in this.isActive) {
        if (i == key) this.isActive.splice(i, 1, true);
        else this.isActive.splice(i, 1, false);
      }
    }
  },
  created() {
    this.axios.get("virtualData/hot-demo.json").then(response => {
      this.getData = response.data;
      let i = 0;
      for (i in response.data) {
        if (i == 0) {
          this.isActive.splice(i, 1, true);
        } else {
          this.isActive.splice(i, 1, false);
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
.right-bar .title span {
  margin-left: 10px;
}
.right-bar .list {
  padding: 20px;
}
.pic {
  position: relative;
  display: none;
  height: 120px;
  overflow: hidden;
}
.pic img {
  position: absolute;
  top: 0;
  z-index: 0;
  width: 100%;
  display: block;
  height: auto;
}
.content {
  position: relative;
  height: 100%;
  background: linear-gradient(left, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2));
}
.content .title {
  background-color: transparent;
  margin: 0;
  padding: 22px 20px;
  font-size: 16px;
  font-weight: 500;
}
.content .date {
  color: #888;
  padding-left: 20px;
}
.active .pic {
  display: block;
}
.active .word {
  display: none;
}
.word .date {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
.word .title span {
  margin-left: 0;
}
.word .title,
.word .date {
  line-height: 40px;
}
</style>
