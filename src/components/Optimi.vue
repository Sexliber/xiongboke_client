<template>
  <div>
    <div class="optimi-bar right-bar">
      <div>
        <div class="title white bg-black">
          <i aria-hidden="true" class="fa fa-list-ul"></i>
          <span>优选内容</span>
        </div>
        <div class="list" :class="{loading:!isGetData}">
          <ul>
            <li
              v-for="(item,key) in getData"
              :key="key"
              @mouseover="mouseover(key)"
              :class="{active:isActive[key]}"
            >
              <router-link :to="{path:`/writes/${item.id}`}">
                <div class="word container-fluid">
                  <div class="row">
                    <div class="title white col-xs-10 col-sm-10">
                      <span v-text="item.title"/>
                    </div>
                    <div class="date white col-xs-2 col-sm-2">
                      <span v-cloak>{{item.date | dateMod}}</span>
                    </div>
                  </div>
                </div>
                <div class="pic">
                  <img :src="item.thumbnail">
                  <div class="content">
                    <h3 class="title white line1" v-text="item.title"/>
                    <p class="date" v-cloak>{{item.date|dateMod}}</p>
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
      isGetData:false,
      isActive: [0]
    };
  },
  methods: {
    mouseover(key) {
      var i = 0;
      for (i in this.isActive) {
        if (i == key) this.isActive.splice(i, 1, true);
        else this.isActive.splice(i, 1, false);
      }
    }
  },
  created() {
    this.axios.get("getPublicData").then(response => {
      this.getData = response.data;
      this.isGetData = true;
      var i = 0;
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
.right-bar .title {
  padding: 20px;
  margin: 0;
  font-weight: 600;
}
.right-bar .title span {
  margin-left: 10px;
}
.right-bar .list {
  padding: 20px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.85));
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
  background: linear-gradient(left, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2));
}
.content .title {
  background-color: transparent;
  margin: 0;
  padding: 22px 20px;
  font-size: 16px;
  font-weight: 500;
}
.content .date {
  color: #ddd;
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
