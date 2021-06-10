<template>
  <div class="staticComp">
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
                :class="setActive('TextLabel')"
                @click="
                  selectComponentItem('TextLabel', {
                    hasForm: true,
                    text: '文本',
                    styleText: '',
                  })
                "
              >
                文本
              </div>
            </el-col>
            <el-col :span="12"> </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="边框" name="border">
        <div class="wrapper" v-if="activeTab === 'border'">
          <el-row>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvBorderBox1')"
                @click="selectComponentItem('DvBorderBox1', {})"
              >
                <dv-border-box-1></dv-border-box-1>
              </div>
            </el-col>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvBorderBox2')"
                @click="selectComponentItem('DvBorderBox2', {})"
              >
                <dv-border-box-2></dv-border-box-2>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvBorderBox3')"
                @click="selectComponentItem('DvBorderBox3', {})"
              >
                <dv-border-box-3></dv-border-box-3>
              </div>
            </el-col>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvBorderBox4')"
                @click="selectComponentItem('DvBorderBox4', {})"
              >
                <dv-border-box-4></dv-border-box-4>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvBorderBox4-r')"
                @click="
                  selectComponentItem('DvBorderBox4-r', { reverse: true })
                "
              >
                <dv-border-box-4 :reverse="true"></dv-border-box-4>
              </div>
            </el-col>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvBorderBox5')"
                @click="selectComponentItem('DvBorderBox5', {})"
              >
                <dv-border-box-5></dv-border-box-5>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvBorderBox5-r')"
                @click="
                  selectComponentItem('DvBorderBox5-r', { reverse: true })
                "
              >
                <dv-border-box-5 :reverse="true"></dv-border-box-5>
              </div>
            </el-col>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvBorderBox6')"
                @click="selectComponentItem('DvBorderBox6', {})"
              >
                <dv-border-box-6></dv-border-box-6>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvBorderBox7')"
                @click="selectComponentItem('DvBorderBox7', {})"
              >
                <dv-border-box-7></dv-border-box-7>
              </div>
            </el-col>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvBorderBox8')"
                @click="selectComponentItem('DvBorderBox8', {})"
              >
                <dv-border-box-8></dv-border-box-8>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvBorderBox9')"
                @click="selectComponentItem('DvBorderBox9', {})"
              >
                <dv-border-box-9></dv-border-box-9>
              </div>
            </el-col>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvBorderBox10')"
                @click="selectComponentItem('DvBorderBox10', {})"
              >
                <dv-border-box-10></dv-border-box-10>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvBorderBox11')"
                @click="
                  selectComponentItem('DvBorderBox11', {
                    hasForm: true,
                    text: '文本',
                  })
                "
              >
                <dv-border-box-11></dv-border-box-11>
              </div>
            </el-col>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvBorderBox12')"
                @click="selectComponentItem('DvBorderBox12', {})"
              >
                <dv-border-box-12></dv-border-box-12>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvBorderBox13')"
                @click="selectComponentItem('DvBorderBox13', {})"
              >
                <dv-border-box-13></dv-border-box-13>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="装饰" name="decoration">
        <div class="wrapper" v-if="activeTab === 'decoration'">
          <el-row>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvDecoration1')"
                @click="selectComponentItem('DvDecoration1', {})"
              >
                <dv-decoration-1 />
              </div>
            </el-col>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvDecoration2')"
                @click="selectComponentItem('DvDecoration2', {})"
              >
                <dv-decoration-2 />
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvDecoration2-r')"
                @click="selectComponentItem('DvDecoration2-r', {})"
              >
                <dv-decoration-2 :reverse="true" />
              </div>
            </el-col>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvDecoration3')"
                @click="selectComponentItem('DvDecoration3', {})"
              >
                <dv-decoration-3 />
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvDecoration4-r')"
                @click="
                  selectComponentItem('DvDecoration4-r', { reverse: true })
                "
              >
                <dv-decoration-4 />
              </div>
            </el-col>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvDecoration4')"
                @click="selectComponentItem('DvDecoration4', {})"
              >
                <dv-decoration-4 :reverse="true" />
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvDecoration5')"
                @click="selectComponentItem('DvDecoration5', {})"
              >
                <dv-decoration-5 />
              </div>
            </el-col>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvDecoration6')"
                @click="selectComponentItem('DvDecoration6', {})"
              >
                <dv-decoration-6 />
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvDecoration12')"
                @click="selectComponentItem('DvDecoration12', {})"
              >
                <dv-decoration-12></dv-decoration-12>
              </div>
            </el-col>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvDecoration8')"
                @click="selectComponentItem('DvDecoration8', {})"
              >
                <dv-decoration-8 />
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvDecoration8-r')"
                @click="
                  selectComponentItem('DvDecoration8-r', { reverse: true })
                "
              >
                <dv-decoration-8 :reverse="true"></dv-decoration-8>
              </div>
            </el-col>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvDecoration9')"
                @click="selectComponentItem('DvDecoration9', {})"
              >
                <dv-decoration-9 />
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvDecoration10')"
                @click="selectComponentItem('DvDecoration10', {})"
              >
                <dv-decoration-10></dv-decoration-10>
              </div>
            </el-col>
            <el-col :span="12">
              <div
                class="component-item"
                :class="setActive('DvDecoration11')"
                @click="selectComponentItem('DvDecoration11', {})"
              >
                <dv-decoration-11 />
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
      <el-form label-width="80px">
        <el-form-item label="文本：">
          <el-input v-model="selectedComponentItemParams.text"></el-input>
        </el-form-item>
        <el-form-item
          label="CSS样式："
          v-if="selectedComponentItemParams.styleText != null"
        >
          <el-input
            v-model="selectedComponentItemParams.styleText"
            type="textarea"
            :rows="3"
          ></el-input>
        </el-form-item>
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
  name: "staticComp",
  props: [],
  components: {},
  data() {
    return {
      activeTab: "border",
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
      let name = this.selectedComponentItem;
      if (this.selectedComponentItem.indexOf("-r") > -1) {
        name = name.substring(0, name.indexOf("-r"));
      }
      this.$emit("appendIntoGrid", name, this.selectedComponentItemParams);
      this.showParamsForm = false;
    },
  },
  mounted() {},
};
</script>
<style lang="less">
.staticComp {
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
