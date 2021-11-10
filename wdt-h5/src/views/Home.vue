<script setup lang="ts">
interface VideoInfo {
  vid: string;
  cover: string;
  video: string;
  title: string;
  share_img: string;
  create_time: string;
  status: string;
  video_img: string;
  video_jump: string;
  subtitle: string;
  recommend_title: string;
  sort: string;
  share_title: string;
  share_friend_img: string;
  type: string;
  content: string;
  moreList: any;
  video_wnum: string;
  video_lnum: string;
}

import { ref } from '@vue/reactivity';
import Swiper, { Autoplay, EffectCoverflow, EffectCube, Navigation, Pagination } from 'swiper';
import { onMounted } from 'vue';

import videoListRes from './videoList.json';
Swiper.use([Autoplay, EffectCoverflow, EffectCube, Pagination, Navigation]);

// swiper-bundle.min.css 决定了小圆点和左右翻页标签，如果不需要可以不引用
import 'swiper/swiper-bundle.min.css';
// swiper.less/sass/css 决定了基础的样式
import 'swiper/swiper.scss';

let allReadCount = ref<number>(0);
let readBuyList = ref<VideoInfo[]>([]);
onMounted(() => {
  new Swiper('.swiper1', {
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      hideOnClick: true,
    },
    autoplay: {
      delay: 3000,
      stopOnLastSlide: false,
      disableOnInteraction: false,
    },
    on: {
      navigationShow: function () {
        console.log('按钮显示了');
      },
    },
  });
  getVideoList();
});

const getVideoList = () => {
  if (videoListRes && videoListRes.result == '0' && videoListRes.list.length > 0) {
    // 总阅读量
    allReadCount.value = Number(videoListRes.video_total || 0);
    readBuyList.value = videoListRes.list;
    console.log(readBuyList);
  }
};
</script>

<template>
  <div class="home">
    <div class="swiper-container swiper1">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="../assets/logo.svg" alt="" />
        </div>
        <div class="swiper-slide">
          <img src="../assets/logo.svg" alt="" />
        </div>
        <div class="swiper-slide">
          <img src="../assets/logo.svg" alt="" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <div class="swiper-button-prev"></div>
      <!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
      <div class="swiper-button-next"></div>
      <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
    </div>
  </div>
  <div class="moiveList">
    <div
      v-for="(item, index) in readBuyList"
      :key="index"
      class="moiveTab"
      :class="index == 0 ? 'firstTba' : ''"
    >
      <img :src="item.cover" class="coverImg" />
      <div class="introsBox">
        <p class="moiveDate">{{ item.create_time }}</p>
        <p class="moiveIntros">{{ item.title }}</p>
        <p class="bannelBox">
          <span class="bannel">
            <span class="contrlbox">
              <img class="look" src="@@/look2.png" />
              <span class="count">{{ item.video_wnum }}</span>
            </span>
            <span class="contrlbox">
              <img class="zan" src="@@/like.png" />
              <span class="count">{{ Number(item.video_lnum) }}</span>
            </span>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.title {
  text-align: center;
  line-height: 50px;
  font-size: 12px;
  width: 200px;
  position: relative;
  height: 100px;
}

.swiper-slide {
  img {
    width: 100%;
    height: 100px;
  }
}
.moiveList {
  margin-top: 15px;
  padding: 0 20px;

  .moiveTab {
    width: 335px;
    height: 105px;
    border: 1px solid #f3f3f3;
    display: flex;
    margin-top: 5px;
    &.firstTba {
      margin-top: 0;
    }
    .coverImg {
      width: 160px;
      overflow: hidden;
      // max-width: 160px;
      // height: 105px;
    }
    .introsBox {
      padding: 13px 15px 14px 14px;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      .contrlbox {
        display: flex;
        align-items: center;
      }
      .moiveDate {
        color: #999999;
        font-size: 10px;
        margin-bottom: 6px;
      }
      .moiveIntros {
        color: #000000;
        font-size: 13px;
        height: 36px;
        min-width: 141px;
        margin-bottom: 6px;
        font-weight: bold;
        overflow-y: hidden;
      }
      .bannelBox {
        display: flex;
        justify-content: flex-end;
        .bannel {
          width: 120px;
          display: flex;
          .contrlbox {
            width: 60px;
            text-align: left;
            justify-content: flex-start;
            .zan {
              width: 16px;
              height: 16px;
              margin-left: 7px;
            }
            .look {
              width: 16px;
              height: 16px;
            }
            .count {
              font-size: 10px;
              color: #999;
              line-height: 12px;
              margin-left: 4px;
              margin-top: 2px;
            }
          }
          &.isJqr {
            width: 50px;
          }
        }
      }
    }
  }
}
</style>
