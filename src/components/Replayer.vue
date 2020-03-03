<template>
  <!-- *
  @message 轮播组件
           1.view-panel插槽用于方式视图块
           2.control-panel插槽用于放置轮播操纵控件
  *-->
  <!-- *
        * 控件的control属性值用于控制该控件被点击后视图面板的样式和效果
        * pre: 切换到上一个视图块
        * next: 切换到下一个视图块
        * to-视图块的索引号: 切换到下一个试图块
        * 
        * e.g.:
        * <a control="to-1"></a>
  *-->
  <div ref="container" class="replayer-container">
    <!-- *
    * @message 视图面板,用于显示视图块
    *-->
    <div class="view-panel">
      <slot name="view-panel"></slot>
    </div>

    <!-- *
    * @message 控制面板,用于操纵视图显示
    *-->
    <div class="control-panel">
      <slot name="control-panel"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 动画时长
    duration: {
      type: Number | String,
      default: _ => "800"
    },
    // 停顿间隔时长
    waits: {
      type: Number | String,
      default: _ => 5000
    }
  },
  mounted() {
    // *
    // * @message dom节点挂载完成后定义一个轮播处理类然后实例化
    // * @params 构造函数参数
    // *         container: 轮播盒子容器的dom节点
    // *         duration: 动画时长
    // *         waits: 等待时长
    // * *
    class Replayer {
      constructor(container, duration, waits) {
        // *
        // * 初始化参数
        // * *
        this.container = container; //轮播容器
        this.duration = duration + "ms"; //动画时长
        this.waits = waits; //等待时长

        // 初始化数据
        this.init();

        // 为控件绑定事件
        this.bindEvent();

        // 开始轮播
        this.replayer();
      }

      // 监听视图索引号
      set viewIndex(value) {
        this.watchIndex(value, this._viewIndex);
        this._viewIndex = value;
      }
      get viewIndex() {
        return this._viewIndex;
      }

      // *
      // * @message 动画方法
      // * @params  oldIndex:旧索引号
      // *          newIndex:新索引号
      // *          dire:方向
      // * *
      animating(newIndex, oldIndex) {
        // 替换to控件的类名
        this.controlNode
          .querySelectorAll("[control=to]")
          [oldIndex].classList.remove("active");
        this.controlNode
          .querySelectorAll("[control=to]")
          [newIndex].classList.add("active");

        // 添加出入类名
        this.viewNodeList[newIndex].classList.add("in");
        this.viewNodeList[oldIndex].classList.add("out");
        // 判断方向执行动画
        if (this.animaDire == "right") {
          this.viewNodeList[newIndex].classList.add("left");
          this.viewNodeList[oldIndex].classList.add("right");
        } else if (this.animaDire == "left") {
          this.viewNodeList[newIndex].classList.add("right");
          this.viewNodeList[oldIndex].classList.add("left");
        }
      }

      // *
      // * 监听当前轮播的索引号,当值变动时调用动画方法
      // * *
      watchIndex(newIndex, oldIndex) {
        // 清除动画类名
        this.clearClassName(newIndex, oldIndex);

        // 执行动画
        requestAnimationFrame(time => {
          this.animating(newIndex, oldIndex);
        });
      }

      // *
      // * 初始化
      // * *
      init() {
        // 获取轮播容器,视图列表,控件列表的dom节点组
        this.viewNodeList = this.container.getElementsByClassName(
          "view-panel"
        )[0].children;
        this.controlNode = this.container.getElementsByClassName(
          "control-panel"
        )[0];

        // 初始化动画方向
        this.animaDire = "left";

        // 初始化被监听的视图索引号
        this._viewIndex = 0;

        // 初始化轮播动画定时器
        this.animaTimer = null;

        // 保存视图块原有class类名,并且为视图块添加过渡时间的样式
        this.selfClassName = [];
        [].forEach.call(this.viewNodeList, element => {
          this.selfClassName.push(element.className);
          element.style.animationDuration = this.duration;
        });

        // 为第一个视图块添加out样式
        this.viewNodeList[0].classList.add('out');
      }

      // *
      // * 为控件绑定事件
      // * *
      bindEvent() {
        // pre按钮
        [].forEach.call(
          this.controlNode.querySelectorAll("[control=pre]"),
          element => {
            element.onclick = e => {
              this.clearInterval();
              this.animaDire = "right";
              if (this.viewIndex === 0) {
                this.viewIndex = this.viewNodeList.length - 1;
              } else this.viewIndex--;
              this.replayer();
            };
          }
        );

        // next按钮
        [].forEach.call(
          this.controlNode.querySelectorAll("[control=next]"),
          element => {
            element.onclick = e => {
              this.clearInterval();
              this.animaDire = "left";
              if (this.viewIndex === this.viewNodeList.length - 1) {
                this.viewIndex = 0;
              } else this.viewIndex++;
              this.replayer();
            };
          }
        );

        // to-$num按钮
        [].forEach.call(
          this.controlNode.querySelectorAll("[control=to]"),
          (element, index) => {
            element.onclick = e => {
              if (this.viewIndex !== index) {
                this.clearInterval();
                if (this.viewIndex > index) {
                  this.animaDire = "right";
                } else if (this.viewIndex < index) {
                  this.animaDire = "left";
                }
                this.viewIndex = index;
                this.replayer();
              }
            };
          }
        );
      }

      // *
      // * 清除定时器
      // * *
      clearInterval() {
        if (this.animaTimer) window.clearInterval(this.animaTimer);
      }

      // *
      // * 清除动画类名
      // * *
      clearClassName(newIndex, oldIndex) {
        [].forEach.call(this.viewNodeList, element => {
          ["in", "out", "left", "right"].forEach(className => {
            element.classList.remove(className);
            element.classList.remove(className);
          });
        });
      }

      // *
      // * 设置为轮播
      // * *
      replayer() {
        this.animaTimer = window.setInterval(() => {
          this.animaDire = "left";
          if (this.viewIndex >= this.viewNodeList.length - 1)
            this.viewIndex = 0;
          else this.viewIndex++;
        }, parseInt(this.waits));
      }
    }

    // 实例化轮播对象
    let replayer = new Replayer(
      this.$refs.container,
      parseInt(this.duration),
      parseInt(this.waits)
    );
  }
};
</script>

<style scoped>
/* *
* 轮播盒子及面板样式
* */
.replayer-container,
.view-panel,
.view-panel > * {
  height: 100%;
}
.replayer-container {
  position: relative;
}
.view-panel {
  position: relative;
  z-index: 1;
}
.view-panel > *,
.control-panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.control-panel {
  position: static;
  overflow: visible;
}
.control-panel > * {
  position: absolute;
  z-index: 2;
}

/* *
* 轮播动画
* */
.view-panel > * {
  display: none;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
}

.in {
  transform: translateX(100%);
}

.out {
  transform: translateX(0);
}

.in,
.out {
  display: block;
  z-index: 3;
}

.left.in,
.left.out {
  animation-name: left-in;
}
.left.out {
  animation-direction: reverse;
}

.right.in,
.right.out {
  animation-name: right-in;
}
.right.out {
  animation-direction: reverse;
}
@keyframes left-in {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes right-in {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>