<template>
  <component :ref="ref" :is="component" :config="config_"></component>
</template>

<script>
import db from "../api/db";
import chartUtil from "../utils/chartUtil";

export default {
  name: "dynamicWrapper",
  props: ["config", "period", "realComp", "sql", "sourceType"],
  components: {},
  data() {
    return {
      ref: "component_real_" + Math.random(),
      timer: null,
      component: "",
      config_: "",
    };
  },
  methods: {
    initWH() {
      const el = this.$refs[this.ref];
      if (el.initWH) {
        el.initWH();
      }
    },
    execSql() {
      db.exec({ sqlText: this.sql }).then((res) => {
        this.config_.data = res.data || [];
        if (this.realComp === "DvScrollBoard") {
          chartUtil.initScrollBoard(this.config_);
        }
        if (this.realComp === "DvPercentPond") {
          chartUtil.initPercentPond(this.config_);
        }
        console.log(this.config_ )
        this.config_ = { ...this.config_ };
      });
    },
    execApi() {},
    execType() {
      if (this.sourceType === 2) {
        this.execSql();
      }
      if (this.sourceType === 3) {
        this.execApi();
      }
    },
    init() {
      this.execType();
      if (this.period) {
        this.timer = setInterval(() => {
          this.execType();
        }, this.period);
      }
    },
  },
  mounted() {
    this.component = this.realComp;
    this.config_ = this.config;
    this.init();
  },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>
<style lang="less">
.dynamicWrapper {
}
</style>
