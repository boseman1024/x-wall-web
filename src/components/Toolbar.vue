<template>
  <div class="toolbar" :style="!mode ? 'height:40px' : ''">
    <el-form label-width="120px">
      <el-form-item label="模式：">
        <el-switch
          @change="changeMode"
          v-model="mode"
          active-text="编辑"
          inactive-text="预览"
        >
        </el-switch>
      </el-form-item>
      <template v-if="mode">
        <el-form-item label="背景颜色：">
          <el-input v-model="form.background" @change="setBg"></el-input>
        </el-form-item>
        <el-form-item label="组件模块：">
          <el-radio-group v-model="compType">
            <el-radio :label="0">隐藏</el-radio>
            <el-radio :label="1">静态组件</el-radio>
            <el-radio :label="2">动态组件</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addGrid">添加图层</el-button>
          <el-button v-if="selectedIndex != null" type="danger" @click="delGrid"
            >删除图层</el-button
          >
        </el-form-item>
        <el-form-item v-if="selectedIndex != null">
          <el-button type="primary" @click="addLev">提升层级</el-button>
          <el-button type="primary" @click="delLev">降低层级</el-button>
        </el-form-item>
        <el-form-item label="数据库名称：">
          <el-input v-model="database.name"></el-input>
        </el-form-item>
        <el-form-item label="数据库主机：">
          <el-input v-model="database.host"></el-input>
        </el-form-item>
        <el-form-item label="数据库端口：">
          <el-input v-model="database.port"></el-input>
        </el-form-item>
        <el-form-item label="数据库用户名：">
          <el-input v-model="database.username"></el-input>
        </el-form-item>
        <el-form-item label="数据库密码：">
          <el-input
            v-model="database.password"
            type="password"
            :show-password="true"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            v-loading="dbLoading"
            :disabled="dbConnection"
            type="primary"
            @click="dbConnect"
            >连接数据库</el-button
          >
          <el-button
            v-loading="dbLoading"
            :disabled="!dbConnection"
            type="danger"
            @click="dbDisconnect"
            >断开连接</el-button
          >
        </el-form-item>
      </template>
    </el-form>
    <template v-if="mode && selectedIndex != null">
      <static-comp
        v-if="compType === 1"
        @appendIntoGrid="appendIntoGrid"
      ></static-comp>
      <dynamic-comp
        v-if="compType === 2"
        @appendIntoGrid="appendIntoGrid"
      ></dynamic-comp>
    </template>
  </div>
</template>

<script>
import DynamicComp from "./DynamicComp";
import StaticComp from "./StaticComp";
import db from "@/api/db";
export default {
  name: "Toolbar",
  props: ["selectedIndex"],
  components: {
    StaticComp,
    DynamicComp,
  },
  data() {
    return {
      activeTab: "border",
      mode: true,
      compType: 0,
      form: {
        background: "#272844",
      },
      dbLoading: false,
      dbConnection: false,
      database: {
        name: "",
        host: "",
        port: "",
        username: "",
        password: "",
      },
    };
  },
  methods: {
    changeMode(val) {
      this.$emit("changeMode", val);
    },
    setBg(style) {
      this.$emit("setBg", style);
    },
    addGrid() {
      this.$emit("addGrid");
    },
    delGrid() {
      this.$emit("delGrid");
    },
    addLev() {
      this.$emit("addLev");
    },
    delLev() {
      this.$emit("delLev");
    },
    appendIntoGrid(instance, params) {
      this.$emit("appendIntoGrid", instance, params);
    },
    dbConnect() {
      this.dbLoading = true;
      db.connect(this.database).then((res) => {
        console.log(res);
        if (res.data) {
          this.dbConnection = true;
          this.$notify({
            title: "成功",
            message: "数据库连接成功",
            type: "success",
          });
        } else {
          this.dbConnection = false;
          this.$notify.error({
            title: "失败",
            message: "数据库连接失败",
          });
        }
        this.dbLoading = false;
      });
    },
    dbDisconnect() {
      this.dbLoading = true;
      db.disconnect().then((res) => {
        console.log(res);
        this.dbConnection = false;
        this.$notify({
          title: "成功",
          message: "数据库连接已断开",
          type: "success",
        });
        this.dbLoading = false;
      });
    },
  },
  mounted() {
    this.$emit("setBg", this.form.background);
  },
  destroyed() {
    this.dbDisconnect();
  },
};
</script>
<style lang="less">
.toolbar {
  position: fixed;
  z-index: 1000;
  top: 0px;
  bottom: 0px;
  right: 0px;
  width: 400px;
  border: 1px solid #e3e3e3;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 20px;
}
</style>
