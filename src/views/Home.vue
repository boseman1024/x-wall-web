<template>
  <div class="home" :style="{ background: background }">
    <dv-full-screen-container :style="{ background: background }">
      <VueDragResize
        v-for="(item, index) in layout"
        :key="index"
        :isActive="true"
        :z="item.z"
        :w="item.w"
        :h="item.h"
        :isResizable="item.isResizable"
        :isDraggable="item.isDraggable"
        @resizing="onResizing($event, index)"
      >
        <div
          class="grid-item"
          @click="selectGridItem(index)"
          :class="
            !item.isEdit
              ? 'preview-mode'
              : selectedIndex != null && index === selectedIndex
              ? 'active-grid-item'
              : ''
          "
        >
          <template v-if="item.component">
            <component
              :ref="'component_' + index"
              :is="item.component"
              :reverse="item.reverse"
              :title="item.title"
              :text="item.text"
              :styleText="item.styleText"
              :config="item.config"
              :period="item.period"
              :realComp="item.realComp"
              :sourceType="item.sourceType"
              :sql="item.sql"
            ></component>
          </template>
        </div>
      </VueDragResize>
    </dv-full-screen-container>
    <toolbar
      @changeMode="changeMode"
      @setBg="setBg"
      @addGrid="addGrid"
      @delGrid="delGrid"
      @addLev="addLev"
      @delLev="delLev"
      @appendIntoGrid="appendIntoGrid"
      :selectedIndex="selectedIndex"
    ></toolbar>
  </div>
</template>

<script>
import DynamicWrapper from "../components/DynamicWrapper";
import TextLabel from "../components/TextLabel";
import VueDragResize from "vue-drag-resize";
import Toolbar from "../components/Toolbar";
export default {
  name: "Home",
  components: {
    Toolbar,
    VueDragResize,
    TextLabel,
    DynamicWrapper,
  },
  data() {
    return {
      background: "",
      selectedIndex: null,
      layout: [],
    };
  },
  methods: {
    changeMode(val) {
      this.layout.forEach((data) => {
        data.isDraggable = val;
        data.isResizable = val;
        data.isEdit = val;
      });
    },
    setBg(style) {
      this.background = style;
    },
    selectGridItem(index) {
      this.selectedIndex = index;
    },
    addGrid() {
      this.layout.push({
        w: 400,
        h: 400,
        z: 1,
        isDraggable: true,
        isResizable: true,
        isEdit: true,
        component: null,
      });
    },
    delGrid() {
      this.layout.splice(this.selectedIndex, 1);
      this.selectedIndex = null;
    },
    addLev() {
      this.layout[this.selectedIndex].z++;
    },
    delLev() {
      this.layout[this.selectedIndex].z--;
    },
    appendIntoGrid(instance, params) {
      this.layout[this.selectedIndex].reverse = params.reverse; //边框反转
      this.layout[this.selectedIndex].title = params.text; //文本
      this.layout[this.selectedIndex].text = params.text; //文本
      this.layout[this.selectedIndex].styleText = params.styleText; //css样式
      this.layout[this.selectedIndex].period = params.period; //sql、api请求方式定时周期
      this.layout[this.selectedIndex].sourceType = params.sourceType; //json、sql、api请求方式
      this.layout[this.selectedIndex].sql = params.sql; //sql内容
      this.layout[this.selectedIndex].realComp = params.realComp; //动态组件真实组件
      this.layout[this.selectedIndex].config = params.config; //图表配置
      this.layout[this.selectedIndex].component = instance;
      console.warn("layout", this.layout[this.selectedIndex]);
    },
    onResizing(e, index) {
      if (this.$refs["component_" + index]) {
        const el = this.$refs["component_" + index][0];
        if (el.initWH) {
          el.initWH();
        }
      }
    },
  },
};
</script>
<style lang="less">
.home {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  color: #fff;

  .grid-item {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
  }
  .active-grid-item {
    background: rgba(0, 0, 0, 0.3);
  }
  .preview-mode {
    background: rgba(0, 0, 0, 0);
  }
}
.vdr.active:before {
  outline: 0px;
}
</style>
