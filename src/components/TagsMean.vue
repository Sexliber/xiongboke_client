<template>
  <div>
    <div class="mean-bar right-bar">
      <div>
        <div class="title white bg-black">
          <i class="fa fa-list-ul" aria-hidden="true"></i>
          <span>内容导航</span>
        </div>
        <div class="list">
          <ul class="clearboth">
            <li v-for="(item,key) in itemList" :key="key">
              <router-link :to="item.routerLink" class="white" v-text="item.title" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      itemList: [
        {
          id: 1,
          title: "免费资源",
          routerLink: { path: "search", query: { tag: "免费资源" } }
        },
        {
          id: 2,
          title: "实用软件",
          routerLink: { path: "search", query: { tag: "实用软件" } }
        },
        {
          id: 3,
          title: "业界资讯",
          routerLink: { path: "search", query: { tag: "业界资讯" } }
        },
        {
          id: 4,
          title: "开发工具",
          routerLink: { path: "search", query: { tag: "开发工具" } }
        },
        {
          id: 5,
          title: "设计工具",
          routerLink: { path: "search", query: { tag: "设计工具" } }
        },
        {
          id: 6,
          title: "影视动漫",
          routerLink: { path: "search", query: { tag: "影视动漫" } }
        },
        {
          id: 7,
          title: "代码审计",
          routerLink: { path: "search", query: { tag: "代码审计" } }
        },
        {
          id: 8,
          title: "设计心得",
          routerLink: { path: "search", query: { tag: "设计心得" } }
        },
        {
          id: 9,
          title: "摄影美图",
          routerLink: { path: "search", query: { tag: "摄影美图" } }
        },
        {
          id: 10,
          title: "小技巧",
          routerLink: { path: "search", query: { tag: "小技巧" } }
        },
        {
          id: 11,
          title: "浏览器插件",
          routerLink: { path: "search", query: { tag: "浏览器插件" } }
        },
        {
          id: 12,
          title: "hosts",
          routerLink: { path: "search", query: { tag: "hosts" } }
        }
      ]
    };
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
.mean-bar ul {
  padding: 1px 0 0 1px;
}
.mean-bar li {
  width: 50%;
  float: left;
  font-size: 16px;
  border: 1px solid #ddd;
  margin: -1px 0 0 -1px;
}
.mean-bar li:hover {
  border-color: rgba(0, 0, 0, 0);
  background-color: #ffc815;
}
.mean-bar li a {
  display: block;
  padding: 20px 0;
  text-align: center;
  text-decoration: none;
  height: 100%;
  width: 100%;
}
.mean-bar li:hover a {
  color: #fff;
}
</style>

