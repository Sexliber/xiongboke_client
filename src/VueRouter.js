// 组件引入<=S
import HomePage from "./pages/HomePage";
import divC from "./pages/DivC";
import HeadReplayBanner from "./components/HeadReplayBanner";
// 组件引入=>E

// 引入路由器模块
import VueRouter from "vue-router";

export default new VueRouter({
    mode: "history",
    base: __dirname,
    routes: [
        { path: "/", component: HomePage },
        {
            path: "/contact", component: divC, children: [{ path: "laji", component: HeadReplayBanner }]
        }
    ]
});