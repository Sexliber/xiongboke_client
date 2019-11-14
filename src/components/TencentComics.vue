<template>
  <div>
    <div class="recom-bar right-bar">
      <div>
        <div class="title white bg-black">
          <i aria-hidden="true" class="fa fa-list-ul"></i>
          <span>腾讯漫画</span>
        </div>
        <div class="container-fluid">
          <div :class="{loading:!isGetData}">
            <div class="list padding0" v-for="(item, key) in getData" :key="key">
            <div class="row" v-if="key%2-1">
              <a
                v-for="n in 2"
                :key="n"
                target="_blank"
                :href="`https://ac.qq.com/Comic/comicInfo/id/${getValue(getData[key+n-1],'id')}`"
              >
                <li class="comic col-sm-6 col-md-6 col-xs-6">
                  <div class="pic bg-black">
                    <img :src="getValue(getData[key+n-1],'pic')">
                  </div>
                  <div class="content bg-black">
                    <h3 class="title white line1" v-text="getValue(getData[key+n-1],'less_title')"/>
                    <p class="intrd line1" v-text="getValue(getData[key+n-1],'intrd')"/>
                    <div class="tag">
                      <span
                        v-for="(tags,_key) in getValue(getData[key+n-1],'tags')"
                        :key="_key"
                        v-text="tags"
                        class="bg-yellow white"
                      />
                    </div>
                  </div>
                  <div class="border">
                    <div></div>
                  </div>
                </li>
              </a>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import global from "../VueGlobal";

export default {
  name: "CloudComics",
  data: function() {
    return {
      getData: [0],
      isGetData:false
    };
  },
  created() {
    // 获取腾讯漫画数据,adpos为必须项,num为请求的数据长度
    this.axios
      .get("http://api.pingcc.cn/?mhname", {
        params: {
          
        }
      })
      .then(response => {
        this.getData = response.data;
        this.isGetData = true;
        console.log(response.data);
      })
      .catch(error => {
        console.log("请求错误");
      });
  },
  methods: {
    getValue(obj, key) {
      if (obj != undefined) {
        return obj[key];
      } else return;
    }
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
.link {
  margin-left: 10px;
}
.link:hover {
  color: #339999;
}
.right-bar .list {
  position: relative;
  padding: 20px;
}
.comic {
  position: relative;
  z-index: 2;
  padding: 2px;
}
.comic .border {
  position: absolute;
  padding: 1px;
  top: 1px;
  left: 1px;
  right: 2px;
  bottom: 1px;
  border: 4px solid #ffc815;
  display: none;
}
.comic:hover .border {
  display: block;
}
.content .title {
  background-color: transparent !important;
  margin: 0 !important;
  padding: 6px 10px !important;
  font-weight: 500 !important;
}
img {
  width: 100%;
}
p {
  padding-left: 10px;
  color: #ccc;
  margin: 0;
}
.tag {
  padding: 12px 10px;
}
.tag span {
  padding: 4px 6px;
  margin-right: 4px;
}
.overlay {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.85));
}
.padding0 {
  padding: 0 !important;
}
</style>
