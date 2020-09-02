<template>
  <div>
    <!-- 霓虹灯效果 -->
    <!-- <div id="neon-btn">
      <button class="btn one">Hover me</button>
      <button class="btn two">Hover me</button>
      <button class="btn three">Hover me</button>
    </div> -->

    <!-- 边框动画 -->
    <!-- <div id="draw-border">
      <button>Hover me</button>
    </div> -->

    <!-- 原型效果 -->
    <!-- <div id="circle-btn">
      <div class="btn-container">
        <button>Hover me</button>
      </div>
    </div> -->

    <!-- 圆角效果 -->
    <!-- <div id="border-btn">
      <button>Hover me</button>
    </div> -->

    <!-- 冰冻效果 -->
    <div id="frozen-btn">
      <button class="green">Hover me</button>
      <button class="purple">Hover me</button>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src

export default {
  name: "About",
  components: {},
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      console.log("asdfasdf");
    }
  }
};
</script>

<style lang="less" scoped>
#neon-btn {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
  background: #031628;

  .btn {
    border: solid;
    background: transparent;
    text-transform: uppercase;
    font-size: 14px;
    padding: 10px 20px;
    font-weight: 300;
    box-sizing: border-box;
  }

  .one {
    color: #4cc9f0;
  }

  .two {
    color: #f038ff;
  }

  .three {
    color: #b9e769;
  }

  .btn:hover {
    color: white;
    border: none;
  }

  .one:hover {
    background-color: #4cc9f0;
    box-shadow: 10px 10px 99px 6px rgba(76, 201, 240, 1);
  }

  .two:hover {
    background-color: #f038ff;
    -webkit-box-shadow: 10px 10px 99px 6px rgba(240, 56, 255, 1);
    -moz-box-shadow: 10px 10px 99px 6px rgba(240, 56, 255, 1);
    box-shadow: 10px 10px 99px 6px rgba(240, 56, 255, 1);
  }

  .three:hover {
    background-color: #b9e769;
    -webkit-box-shadow: 10px 10px 99px 6px rgba(185, 231, 105, 1);
    -moz-box-shadow: 10px 10px 99px 6px rgba(185, 231, 105, 1);
    box-shadow: 10px 10px 99px 6px rgba(185, 231, 105, 1);
  }
}
// ---------------------------------
#draw-border {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  button {
    border: 0;
    background: none;
    text-transform: uppercase;
    color: #4361ee;
    font-weight: bold;
    position: relative;
    outline: none;
    padding: 10px 20px;
    box-sizing: border-box;
  }

  button::before,
  button::after {
    box-sizing: inherit;
    position: absolute;
    content: "";
    border: 2px solid transparent;
    width: 0;
    height: 0;
  }

  button::after {
    bottom: 0;
    right: 0;
  }

  button::before {
    top: 0;
    left: 0;
  }

  button:hover::before,
  button:hover::after {
    width: 100%;
    height: 100%;
  }
  // 使用transition的第四个参数为延时加载的属性执行 先将宽变大  在将高变大
  button:hover::before {
    border-top-color: #4361ee;
    border-right-color: #4361ee;
    transition: width 0.3s ease-out, height 0.3s ease-out 0.3s;
  }

  button:hover::after {
    border-bottom-color: #4361ee;
    border-left-color: #4361ee;
    // 等上和右加载完毕 延时0.6秒 将after的宽和高变大
    transition: border-color 0s ease-out 0.6s, width 0.3s ease-out 0.6s, height 0.3s ease-out 0.9s;
  }
}
// ------------------------------------
#circle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .btn-container {
    position: relative;
  }
  // 使用background 的linear-gradient 属性 从左向右 将背景颜色分为两个颜色
  // 同时使用background-size属性  将背景颜色的宽设为二倍  所以现在两个颜色各是一半
  // 使用background-position d
  button {
    border: 0;
    border-radius: 50px;
    color: white;
    // background: #5f55af;
    padding: 15px 20px 16px 60px;
    text-transform: uppercase;
    background: linear-gradient(to right, #f72585 50%, #5f55af 50%);
    background-size: 200% 100%;
    background-position: right top;
    transition: all 2s ease;
  }

  svg {
    background: #f72585;
    padding: 8px;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 0%;
  }

  button:hover {
    background-position: left top;
  }
}
// ----------------------------
// #border-btn {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
// }

// button {
//   border: 0;
//   border-radius: 10px;
//   background: #2ec4b6;
//   text-transform: uppercase;
//   color: white;
//   font-size: 16px;
//   font-weight: bold;
//   padding: 15px 30px;
//   outline: none;
//   position: relative;
//   transition: border-radius 3s;
//   -webkit-transition: border-radius 3s;
// }

// button:hover {
//   border-bottom-right-radius: 50px;
//   border-top-left-radius: 50px;
//   border-bottom-left-radius: 10px;
//   border-top-right-radius: 10px;
// }
// -----------------------------
#frozen-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

button {
  border: 0;
  margin: 20px;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: bold;
  padding: 15px 50px;
  border-radius: 50px;
  color: white;
  outline: none;
  position: relative;
}
// 设置button：before伪类的样式
// 从右往左 背景颜色是一半透明 一半0.4透明度的白色  宽度是是元素的两倍宽 hover之前展示的right部分的透明部分hover之后往右移展示左边不透明部分
button::before {
  content: "";
  display: block;
  background: linear-gradient(to left, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.4) 50%);
  background-size: 210% 100%;
  background-position: right bottom;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  border-radius: 50px;
  transition: all 1s;
  -webkit-transition: all 1s;
}

.green {
  background-image: linear-gradient(to right, #25aae1, #40e495);
  box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);
}

.purple {
  background-image: linear-gradient(to right, #6253e1, #852d91);
  box-shadow: 0 4px 15px 0 rgba(236, 116, 149, 0.75);
}

.purple:hover::before {
  background-position: left bottom;
}

.green:hover::before {
  background-position: left bottom;
}
</style>
