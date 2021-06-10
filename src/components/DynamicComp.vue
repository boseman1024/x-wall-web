<template>
  <div class="dynamicComp">
    <div class="op-wrapper">
      <el-button type="primary" @click="appendWay">添加组件</el-button>
    </div>
    <el-tabs v-model="activeTab" type="card">
      <el-tab-pane label="控件" name="comp">
        <div class="wrapper" v-if="activeTab === 'comp'">
          <el-row>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvScrollBoard')"
                @click="
                  selectComponentItem('DvScrollBoard', {
                    hasForm: true,
                    config: {},
                  })
                "
              >
                表格轮播表
              </div>
            </el-col>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvScrollRankingBoard')"
                @click="
                  selectComponentItem('DvScrollRankingBoard', {
                    hasForm: true,
                    config: {
                      carousel: 'single',
                      unit: '',
                      rowNum: 5,
                    },
                  })
                "
              >
                排名轮播表
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvDigitalFlop')"
                @click="
                  selectComponentItem('DvDigitalFlop', {
                    hasForm: true,
                    config: {},
                  })
                "
              >
                数字翻牌器
              </div>
            </el-col>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('TextLabel')"
                @click="
                  selectComponentItem('DvPercentPond', {
                    hasForm: true,
                    config: {},
                  })
                "
              >
                进度池
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('TextLabel')"
                @click="
                  selectComponentItem('DvWaterLevelPond', {
                    hasForm: true,
                    config: {},
                  })
                "
              >
                水位图
              </div>
            </el-col>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('TextLabel')"
                @click="
                  selectComponentItem('DvCapsuleChart', {
                    hasForm: true,
                    config: {},
                  })
                "
              >
                胶囊柱图
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('TextLabel')"
                @click="
                  selectComponentItem('DvActiveRingChart', {
                    hasForm: true,
                    config: {},
                  })
                "
              >
                动态环图
              </div>
            </el-col>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('TextLabel')"
                @click="
                  selectComponentItem('TextLabel', {
                    hasForm: true,
                    config: {},
                  })
                "
              >
                图表
              </div>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      :visible.sync="showParamsForm"
      :show-close="false"
      :close-on-click-modal="false"
      append-to-body
    >
      <el-form label-width="120px">
        <el-form-item label="数据源：">
          <el-radio-group v-model="selectedComponentItemParams.sourceType">
            <el-radio :label="1">JSON</el-radio>
            <el-radio :label="2">SQL</el-radio>
            <el-radio :label="3">API</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="JSON："
          v-if="selectedComponentItemParams.sourceType === 1"
        >
          <el-input
            v-model="selectedComponentItemParams.jsonStr"
            type="textarea"
            :rows="5"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="SQL："
          v-if="selectedComponentItemParams.sourceType === 2"
        >
          <el-input
            v-model="selectedComponentItemParams.sql"
            type="textarea"
            :rows="3"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="API："
          v-if="selectedComponentItemParams.sourceType === 3"
        >
        </el-form-item>
        <!--        排名轮播表-->
        <template v-if="selectedComponentItem === 'DvScrollRankingBoard'">
          <el-form-item label="滚动范围：">
            <el-radio-group
              v-model="selectedComponentItemParams.config.carousel"
            >
              <el-radio :label="'single'">单条</el-radio>
              <el-radio :label="'page'">整页</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="单位：">
            <el-input
              v-model="selectedComponentItemParams.config.unit"
            ></el-input>
          </el-form-item>
          <el-form-item label="行数：">
            <el-input
              v-model="selectedComponentItemParams.config.rowNum"
            ></el-input>
          </el-form-item>
        </template>
      </el-form>
      <span slot="footer">
        <el-button @click="showParamsForm = false">取 消</el-button>
        <el-button type="primary" @click="appendIntoGrid">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "dynamicComp",
  props: [],
  components: {},
  data() {
    return {
      activeTab: "comp",
      selectedComponentItem: null,
      selectedComponentItemParams: {},
      showParamsForm: false,
    };
  },
  methods: {
    setActive(label) {
      return this.selectedComponentItem && this.selectedComponentItem === label
        ? "active-component-item"
        : "";
    },
    selectComponentItem(key, params) {
      this.selectedComponentItem = key;
      this.selectedComponentItemParams = params;
    },
    appendWay() {
      if (this.selectedComponentItemParams.hasForm) {
        this.showParamsForm = true;
        return;
      }
      this.appendIntoGrid();
    },
    appendIntoGrid() {
      if (this.selectedComponentItemParams.sourceType === 1) {
        try {
          let json = this.selectedComponentItemParams.jsonStr;
          json = json.replace(/[\r\n]/g, "").replace(/ +/g, "");
          this.selectedComponentItemParams.config.data = JSON.parse(json);
        } catch (e) {
          this.$notify.error({
            title: "失败",
            message: "JSON格式错误",
          });
          return;
        }
      }
      this.$emit(
        "appendIntoGrid",
        this.selectedComponentItem,
        this.selectedComponentItemParams
      );
      this.showParamsForm = false;
    },
  },
  mounted() {},
};
</script>
<style lang="less">
.dynamicComp {
  position: fixed;
  z-index: 99999;
  top: 0px;
  left: 0px;
  bottom: 0px;
  width: 500px;
  border: 1px solid #e3e3e3;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 0 10px;
  .op-wrapper {
    height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .component-item {
    height: 100px;
    margin-bottom: 20px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
  .active-component-item {
    background-color: rgba(0, 0, 0, 0.2);
  }
  .wrapper {
    height: 800px;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
