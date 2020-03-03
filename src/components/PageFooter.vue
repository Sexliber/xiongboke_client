<template>
  <!-- 页脚=>S -->
  <footer>
    <router-link :to="{path:'/contact', query:{}}" class="mail-link">
      <i class="icon icon-user" aria-hidden="true"></i>
    </router-link>

    <div class="footer-social">
      <ul>
        <li v-for="(item,index) in iconsHref" :key="index">
          <a :href="item.link">
            <i :class="item.icon"></i>
          </a>
        </li>
      </ul>
    </div>

    <div class="copyright">© Works 2019 . All rights reserved.</div>
  </footer>
  <!-- 页脚=>E -->
</template>



<script>
export default {
  name: "PageFooter",
  data() {
    return {
      iconsHref: [
        {
          icon: "icon icon-qq",
          link: "http://wpa.qq.com/msgrd?v=3&uin=1162842690&site=qq&menu=yes"
        },
        {
          icon: "icon icon-wechat",
          link: ""
        },
        {
          icon: "icon icon-bilibili",
          link: "https://live.bilibili.com/58821"
        },
        {
          icon: "icon icon-steam",
          link: ""
        },
        {
          icon: "icon icon-origin",
          link: ""
        }
      ]
    };
  }
};
</script>



<style scoped>
/* 联系方式=>S */

footer {
  right: 0;
  z-index: 9999;
  position: fixed;
  width: 70px;
  height: 100%;
  background: #222222;
  border-left: 1px solid rgba(255, 255, 255, 0.21);
  top: 0;
  right: 0;
  transform: translate3d(0, 0, 0);
}

.mail-link {
  position: absolute;
  height: 60px;
  line-height: 60px;
  width: 100%;
  left: 0;
  font-size: 14px;
  text-align: center;
  color: rgba(255, 255, 255, 0.51);
  transition: all 500ms linear;
}

.mail-link .icon{
  font-size: 26px;
}

.mail-link:hover {
  color: rgb(255, 200, 21);
}

.mail-link::after {
  content: "";
  width: 56px;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.21);
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -28px;
}

.footer-social {
  position: absolute;
  top: 80px;
  width: 100%;
  z-index: 2;
  left: 0;
}

.footer-social li {
  float: left;
  width: 100%;
  margin-bottom: 8px;
}

.footer-social li a {
  width: 30px;
  margin-left: 18px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  float: left;
  line-height: 30px;
  border-radius: 100%;
  color: #383838;
  background: #f2f2f2;
  transition: all 400ms cubic-bezier(0.215, 0.61, 0.355, 1);
}

.footer-social li a:hover {
  background-color: rgb(255, 200, 21);
  color: #fff;
}

.copyright {
  position: absolute;
  bottom: 30px;
  left: 30px;
  width: 400px;
  text-align: left;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  transform: rotate(-90deg);
  transform-origin: left top;
}

/* 联系方式=>E */

/* 移动设备重置样式 */

@media screen and (max-width: 1064px) and (min-width: 0px) {
  /* 联系方式=>S */
  footer {
    display: none;
    width: 100vw;
    height: 42px;
  }
  footer {
    position: relative;
  }
  .mail-link {
    left: 100%;
    margin-left: -60px;
    height: 42px;
    line-height: 42px;
    width: 60px;
  }
  .mail-link::after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    margin-left: 0;
    height: 70px;
    width: 1px;
  }
  .footer-social {
    position: relative;
    top: 6px;
    width: auto;
    z-index: 2;
    float: right;
    margin-right: 90px;
  }
  .footer-social li {
    float: left;
    width: auto;
  }
  .copyright {
    position: absolute;
    top: 13px;
    left: 30px;
    width: auto;
    text-align: left;
    color: #fff;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1px;
    transform: rotate(0deg);
  }
  /* 联系方式=>E */
}

@media screen and (min-width: 0px) and (max-width: 760px) {
  /* 联系方式=>S */
  .footer-social {
    float: left;
    margin-right: 0;
    margin-left: 20px;
  }
  .copyright {
    display: none;
  }
  /* 联系方式=>E */
}
</style>

