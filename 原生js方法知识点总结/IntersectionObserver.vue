
<template>
  <div>
    <div style="width: 100%">
      <div
        v-for="i in columnCount"
        :key="i"
        :ref="colNames[i] + tailSign"
        style="float: left; overflow-x: hidden"
        :style="{ width: colWidth, ...colStyle }"
        :id="colNames[i] + tailSign"
      >
        <template v-for="(item, index) in colListData[colNames[i] + tailSign]">
          <div :key="i + '-' + index">
            <slot :item="item" :columnIndex="i" :index="index" />
          </div>
        </template>
      </div>
    </div>
    <div ref="bottom" class="bottom">&nbsp;</div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "Waterfall",
  props: {
    // 列数
    columnCount: {
      type: Number,
      default: 2,
    },
    // 每页数据
    pageData: {
      type: Array,
      default: () => [],
    },
    // 重置
    resetSign: {
      type: Boolean,
      default: false,
    },
    // 立即检查
    immediateCheck: {
      type: Boolean,
      default: true,
    },
    // 偏移
    offset: {
      type: [Number, String],
      default: 300,
    },
    // 样式
    colStyle: {
      type: Object,
      default: () => ({}),
    },
    // 查询标识
    querySign: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      intersectionObserve: null,
      // 保存列表数据
      colListData: {},
      // 当前列的名称
      colNames: [
        "col",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
      ],
      // ref和列表名称后缀
      tailSign: "WfCol",
      // 监视的数据
      observeData: null,
      // 获取父级或以上的滚动元素
      scrollTarget: window,
      // 绑定滚动事件标识
      onceSign: true,
      // 触底发布信息标识，防止数据持续触底触发发布事件
      emitSign: true,
      // 均分标识
      averageSign: true,
    };
  },
  computed: {
    colWidth() {
      return 100 / Number(this.columnCount || 2) + "%";
    },
    _offset() {
      return Number(this.offset);
    },
  },
  watch: {
    columnCount: {
      immediate: true,
      handler: function (val) {
        for (let i = 1; i <= val; i++) {
          // 初始化每列数据
          this.$set(this.colListData, this.colNames[i] + this.tailSign, []);
        }
      },
    },
    pageData(value = []) {
      if (!value.length) return;
      if (IntersectionObserver) {
        // 判断当前是否需要重置
        if (this.resetSign) {
          // 重置断开当前全部监控数据
          this.intersectionObserve.disconnect();
          Object.keys(this.colListData).forEach((key) => {
            this.colListData[key] = [];
          });
          this.observeData = [...value];
          this.$nextTick(() => {
            this.insetData();
          });
        } else {
          this.observeData = [...(this.observeData || []), ...value];
          // 插入数据
          this.insetData();
        }
      } else {
        // 当 IntersectionObserver 不支持，每列数据均匀分配
        const val = (this.observeData = value);
        while (Array.isArray(val) && val.length) {
          let keys = null;
          // 尽量减小数据分配不均匀
          if (this.averageSign) {
            keys = Object.keys(this.colListData);
          } else {
            keys = Object.keys(this.colListData).reverse();
          }
          keys.forEach((key) => {
            const item = val.shift();
            item && this.colListData[key].push(item);
          });
          this.averageSign = !this.averageSign;
        }
      }
    },
    observeData(val) {
      if (!val) return;
      if (val.length === 0) {
        if (this.onceSign) {
          // 监视数组数据分发完了，在进行首次的祖先滚动元素的查找
          this.onceSign = false;
          this.scrollTarget = this.getScrollParentNode(this.$el);
          this.scrollTarget.addEventListener("scroll", this.check);
        }
        // 数据更新，修改触发触底标识
        this.emitSign = true;
      }
      this.$emit("ObserveDataTotal", val.length);
    },
  },
  created() {
    if (IntersectionObserver) {
      this.intersectionObserve = new IntersectionObserver(
        (entries) => {
          if (this.observeData.length) {
            entries.forEach((e, index) => {
              // 未触发过的节点，触发dom数据新增，防止同一节点反复触发数据新增
              if (e.isIntersecting && !e.target.getAttribute("data-observe")) {
                // 避免同时触发新增，dom未加载，数据一边偏
                setTimeout(() => {
                  this.insetData();
                }, index * 20 + 6);
                // 打上触发标记
                e.target.setAttribute("data-observe", true);
              }
            });
          }
        },
        {
          threshold: [0.1, 1],
        }
      );
    }
  },
  mounted() {
    if (this.immediateCheck) {
      this.check();
    }
  },
  methods: {
    // 获取最小高度最小的标识
    getMinColSign() {
      let minHeight = -1;
      let sign = null;
      Object.keys(this.colListData).forEach((key) => {
        const div = this.$refs[key][0];
        if (div) {
          const height = div.offsetHeight;
          if (minHeight === -1 || minHeight > height) {
            minHeight = height;
            sign = key;
          }
        }
      });
      return sign;
    },
    // 获取滚动的父级元素
    getScrollParentNode(el) {
      let node = el;
      while (
        node.nodeName !== "HTML" &&
        node.nodeName !== "BODY" &&
        node.nodeType === 1
      ) {
        const parentNode = node.parentNode;
        const { overflowY } = window.getComputedStyle(parentNode);
        if (
          (overflowY === "scroll" || overflowY === "auto") &&
          parentNode.clientHeight != parentNode.scrollHeight
        ) {
          return parentNode;
        }
        node = parentNode;
      }
      return window;
    },
    // 滚动检查
    check() {
      this.intersectionObserve && this.checkObserveDom();
      // 触底标识为false直接跳过
      if (!this.emitSign) {
        return;
      }
      const { scrollTarget } = this;
      let bounding = {
        top: 0,
        bottom: scrollTarget.innerHeight || 0,
      };
      if (this.$refs.bottom.getBoundingClientRect) {
        bounding = this.$refs.bottom.getBoundingClientRect();
      }
      // 元素所在视口容器的高度
      let height = bounding.bottom - bounding.top;
      if (!height) {
        return;
      }
      const container = scrollTarget.innerHeight || scrollTarget.clientHeight;
      const distance = bounding.bottom - container - this._offset;
      if (distance < 0) {
        // 发布事件
        this.$emit("wfLoad");
        // 发布事件触发修改触底标识
        this.emitSign = false;
      }
    },
    // 插入数据
    insetData() {
      const sign = this.getMinColSign();
      const divData = this.observeData && this.observeData.shift();
      if (!divData || !sign) {
        return null;
      }
      this.colListData[sign].push(divData);
      this.checkObserveDom();
    },
    // 检查dom是否全部被监控
    checkObserveDom() {
      const divs = document.querySelectorAll(this.querySign);
      if (!divs || divs.length === 0) {
        // 防止数据插入dom未渲染，监听函数无数据
        setTimeout(() => {
          // 每次新数据的首个数据无法监控，需要延迟触发
          this.insetData();
        }, 100);
      }
      divs.forEach((div) => {
        if (!div.getAttribute("data-intersectionobserve")) {
          // 避免重复监听
          this.intersectionObserve.observe(div);
          div.setAttribute("data-intersectionobserve", true);
        }
      });
    },
  },
  beforeDestroy() {
    this.scrollTarget.removeEventListener("scroll", this.check);
    this.mutationObserve && this.mutationObserve.disconnect();
    this.mutationObserve = null;
  },
};
</script>