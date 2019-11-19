<template>
  <!-- 页脚=>S -->
  <footer>
    <router-link :to="{path:'/contact', query:{}}" class="mail-link">
      <i class="fa fa-envelope" aria-hidden="true"></i>
    </router-link>

    <div class="footer-social">
      <ul>
        <li v-for="(item,i) in iconsHref" :key="i">
          <router-link :to="{path:'/'}" class="white">
            <i :class="item.icon"></i>
          </router-link>
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
        { icon: "fa fa-facebook" },
        { icon: "fa fa-twitter" },
        { icon: "fa fa-instagram" },
        { icon: "fa fa-pinterest" },
        { icon: "fa fa-tumblr" }
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
  -webkit-transform: translate3d(0, 0, 0);
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
  -webkit-transition: all 500ms linear;
  -moz-transition: all 500ms linear;
  -o-transition: all 500ms linear;
  -ms-transition: all 500ms linear;
  transition: all 500ms linear;
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
  -webkit-transition: all 400ms cubic-bezier(0.215, 0.61, 0.355, 1);
  -moz-transition: all 400ms cubic-bezier(0.215, 0.61, 0.355, 1);
  -o-transition: all 400ms cubic-bezier(0.215, 0.61, 0.355, 1);
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
  -webkit-transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
  -o-transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  transform: rotate(-90deg);
  -webkit-transform-origin: left top;
  -ms-transform-origin: left top;
  -moz-transform-origin: left top;
  -o-transform-origin: left top;
  transform-origin: left top;
}

/* 联系方式=>E */

/* 移动设备重置样式 */

@media screen and (max-width: 1064px) and (min-width: 0px) {
  /* 联系方式=>S */
  footer {
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
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
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

