<template>
  <div class="home">
    <!-- <div class="wrapper">
      <i></i>
      <i></i>
    </div> -->
    <img src="../assets/images/1.jpg" class="marray" :class="{ marrayed: showData }" />
    <div class="box"></div>
    <div class="canvas">
      <div class="half"></div>
      <!-- <div class="half"></div> -->
    </div>
    <div class="heng"></div>
  </div>
</template>

<script lang='js'>
export default {
  name: "Home",
  data() {
    return {
      showData: false
    };
  },
  components: {},
  mounted() {
    let that = this;
    this.getInfo();
    setTimeout(function() {
      console.log(111)
      that.showData = true;
    }, 200);
  },
  methods: {
    getInfo() {
      console.log("asdfasdf");
    }
  }
};
</script>

<style lang="less">
.home {
  background: #3e6fa3;
  height: 100vh;
  width: 100%;

  .heng {
    width: 20px;
    height: 100px;
    background: #c00;
    position: relative;
    left: 100px;
    animation: rotates 2s infinite linear;
  }
  @keyframes rotates {
    from {
      opacity: 0;
      background: white;
    }

    to {
      opacity: 0.6;
      background: red;
      transform: rotate(40deg);
    }
  }

  // .heng:hover {
  //   transform: rotate(40deg);
  // }

  .wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    -moz-perspective: 500px;
    perspective: 500px;

    i:nth-child(1) {
      transform: rotate(11.6129deg) translate3d(80px, 0, 0);
      animation-delay: 0.04839s;
    }

    i:nth-child(2) {
      transform: rotate(14.6129deg) translate3d(180px, 0, 0);
      animation-delay: 0.04839s;
    }

    i {
      display: block;
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 8px;
      opacity: 0;
      background: rgba(255, 255, 255, 0.5);
      box-shadow: 0 0 10px white;
      animation-name: spin;
      animation-duration: 3s;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
    }
  }
  @keyframes spin {
    from {
      opacity: 0;
      background: white;
    }

    to {
      opacity: 0.6;
      background: red;
      transform: translate3d(-4px, -4px, 570px);
    }
  }

  .marray {
    transition: width 1s;
  }

  .marrayed {
    width: 10%;
  }

  .box {
    width: 100px;
    height: 100px;
  }

  .box:hover {
    animation: 1s rainbow infinite ease-in-out;
  }
  @keyframes rainbow {
    0% {
      background: #c00;
    }

    50% {
      background: orange;
    }

    100% {
      background: yellowgreen;
    }
  }

  .canvas {
    width: 500px;
    height: 500px;
    perspective: 600px;
  }

  @keyframes hole-top {
    0%,
    15%,
    100% {
      transform: rotateX(80deg);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }

    30%,
    85% {
      transform: rotateX(90deg);
      // animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
  }

  @keyframes circle {
    0%,
    15%,
    100% {
      transform: translate3d(-50%, -60%, 0);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }

    30%,
    85% {
      transform: translate3d(-50%, 210%, 0) scale(0.75);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
  }

  @keyframes hole-bottom {
    0%,
    30%,
    85%,
    100% {
      transform: rotateX(-90deg);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    45%,
    70% {
      transform: rotateX(-80deg);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
  }

  @keyframes square {
    0%,
    30%,
    85%,
    100% {
      border-radius: 50%;
      transform: translate3d(-50%, -310%, 0) rotate(0deg) scale(0.75);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    45% {
      border-radius: 0;
      transform: translate3d(-50%, -40%, 0) rotate(360deg);
      animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    70% {
      border-radius: 35%;
      transform: translate3d(-50%, -40%, 0) rotate(0deg);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
  }

  .half {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    width: 100%;
    height: 50%;
    overflow: hidden;
    transform-style: preserve-3d;
  }

  .half::before,
  .half::after {
    content: "";
    display: block;
  }

  .half::before {
    width: 250px;
    height: 250px;
    border-radius: 50%;
  }

  .half::after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80px;
    height: 80px;
  }

  .half:nth-child(1) {
    -ms-flex-align: end;
    align-items: flex-end;
  }

  .half:nth-child(1)::before {
    background-color: aqua;
    transform-origin: 50% 100%;
    animation: hole-top 3s infinite;
  }

  // .half:nth-child(1)::after {
  //   border-radius: 50%;
  //   background-color: gold;
  //   animation: circle 3s infinite;
  // }

  .half:nth-child(2)::before {
    background-color: gold;
    transform-origin: 50% 0;
    animation: hole-bottom 3s infinite;
  }

  .half:nth-child(2)::after {
    background-color: tomato;
    animation: square 3s infinite;
  }
}
</style>