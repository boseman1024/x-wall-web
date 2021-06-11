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
                    config: {
                      carousel: 'single',
                      rowNum: 5,
                      index: false,
                      indexHeader: '#',
                      headerBGC: '#00BAFF',
                      oddRowBGC: '#003B51',
                      evenRowBGC: '#0A2732',
                    },
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
                :class="setActive('DvPercentPond')"
                @click="
                  selectComponentItem('DvPercentPond', {
                    hasForm: true,
                    config: {
                      colors: ['#3DE7C9', '#00BAFF'],
                      textColor: '#fff',
                      formatter: '{value}%',
                      value: 0,
                    },
                  })
                "
              >
                进度池
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
          <el-row>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvWaterLevelPond')"
                @click="
                  selectComponentItem('DvWaterLevelPond', {
                    hasForm: true,
                    config: {
                      colors: ['#3DE7C9', '#00BAFF'],
                      formatter: '{value}%',
                    },
                  })
                "
              >
                水位图
              </div>
            </el-col>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvCapsuleChart')"
                @click="
                  selectComponentItem('DvCapsuleChart', {
                    hasForm: true,
                    config: {
                      showValue: true,
                      unit: '',
                      colors: [
                        '#37a2da',
                        '#32c5e9',
                        '#67e0e3',
                        '#9fe6b8',
                        '#ffdb5c',
                        '#ff9f7f',
                        '#fb7293',
                      ],
                    },
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
                :class="setActive('DvActiveRingChart')"
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
            <el-radio
              :label="1"
              v-if="selectedComponentItem !== 'DvPercentPond'"
              >JSON</el-radio
            >
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
        <el-form-item
          label="周期(ms)："
          v-if="
            selectedComponentItemParams.sourceType === 2 ||
            selectedComponentItemParams.sourceType === 3
          "
        >
          <el-input v-model="selectedComponentItemParams.period"></el-input>
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
        <!--        表格轮播表-->
        <template v-if="selectedComponentItem === 'DvScrollBoard'">
          <el-form-item label="滚动范围：">
            <el-radio-group
              v-model="selectedComponentItemParams.config.carousel"
            >
              <el-radio :label="'single'">单条</el-radio>
              <el-radio :label="'page'">整页</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="显示行号：">
            <el-switch
              v-model="selectedComponentItemParams.config.index"
              active-text="显示"
              inactive-text="隐藏"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="行号表头：">
            <el-input
              v-model="selectedComponentItemParams.config.indexHeader"
            ></el-input>
          </el-form-item>
          <el-form-item label="行数：">
            <el-input
              v-model="selectedComponentItemParams.config.rowNum"
            ></el-input>
          </el-form-item>
          <el-form-item label="表头背景色：">
            <el-input
              v-model="selectedComponentItemParams.config.headerBGC"
            ></el-input>
          </el-form-item>
          <el-form-item label="奇数行背景色：">
            <el-input
              v-model="selectedComponentItemParams.config.oddRowBGC"
            ></el-input>
          </el-form-item>
          <el-form-item label="偶数行背景色：">
            <el-input
              v-model="selectedComponentItemParams.config.evenRowBGC"
            ></el-input>
          </el-form-item>
        </template>
        <!--        进度池-->
        <template v-if="selectedComponentItem === 'DvPercentPond'">
          <el-form-item label="数值：">
            <el-input-number
              v-model="selectedComponentItemParams.config.value"
              :min="0"
              :max="100"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="进度池配色1：">
            <el-input
              v-model="selectedComponentItemParams.config.colors[0]"
            ></el-input>
          </el-form-item>
          <el-form-item label="进度池配色2：">
            <el-input
              v-model="selectedComponentItemParams.config.colors[1]"
            ></el-input>
          </el-form-item>
          <el-form-item label="文字颜色：">
            <el-input
              v-model="selectedComponentItemParams.config.textColor"
            ></el-input>
          </el-form-item>
          <el-form-item label="信息格式化：">
            <el-input
              v-model="selectedComponentItemParams.config.formatter"
            ></el-input>
          </el-form-item>
        </template>
        <!--        水位图-->
        <template v-if="selectedComponentItem === 'DvWaterLevelPond'">
          <el-form-item label="形状：">
            <el-radio-group v-model="selectedComponentItemParams.config.shape">
              <el-radio :label="'rect'">矩形</el-radio>
              <el-radio :label="'roundRect'">圆角矩形</el-radio>
              <el-radio :label="'round'">圆形</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="信息格式化：">
            <el-input
              v-model="selectedComponentItemParams.config.formatter"
            ></el-input>
          </el-form-item>
          <el-form-item label="水位图配色1：">
            <el-input
              v-model="selectedComponentItemParams.config.colors[0]"
            ></el-input>
          </el-form-item>
          <el-form-item label="水位图配色2：">
            <el-input
              v-model="selectedComponentItemParams.config.colors[1]"
            ></el-input>
          </el-form-item>
        </template>
        <!--        胶囊柱图-->
        <template v-if="selectedComponentItem === 'DvCapsuleChart'">
          <el-form-item label="单位：">
            <el-input
              v-model="selectedComponentItemParams.config.unit"
            ></el-input>
          </el-form-item>
          <el-form-item label="显示数值：">
            <el-switch
              v-model="selectedComponentItemParams.config.showValue"
              active-text="显示"
              inactive-text="隐藏"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="环颜色1：">
            <el-input
              v-model="selectedComponentItemParams.config.colors[0]"
            ></el-input>
          </el-form-item>
          <el-form-item label="环颜色2：">
            <el-input
              v-model="selectedComponentItemParams.config.colors[1]"
            ></el-input>
          </el-form-item>
          <el-form-item label="环颜色3：">
            <el-input
              v-model="selectedComponentItemParams.config.colors[2]"
            ></el-input>
          </el-form-item>
          <el-form-item label="环颜色4：">
            <el-input
              v-model="selectedComponentItemParams.config.colors[3]"
            ></el-input>
          </el-form-item>
          <el-form-item label="环颜色5：">
            <el-input
              v-model="selectedComponentItemParams.config.colors[4]"
            ></el-input>
          </el-form-item>
          <el-form-item label="环颜色6：">
            <el-input
              v-model="selectedComponentItemParams.config.colors[5]"
            ></el-input>
          </el-form-item>
          <el-form-item label="环颜色7：">
            <el-input
              v-model="selectedComponentItemParams.config.colors[6]"
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
      if (this.selectedComponentItemParams.period) {
        this.selectedComponentItemParams.realComp = this.selectedComponentItem;
        this.$emit(
          "appendIntoGrid",
          "DynamicWrapper",
          this.selectedComponentItemParams
        );
      } else {
        this.$emit(
          "appendIntoGrid",
          this.selectedComponentItem,
          this.selectedComponentItemParams
        );
      }

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
