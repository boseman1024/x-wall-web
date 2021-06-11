import dataUtil from "./dataUtil";

const chartUtil = {
  //表格轮播表
  initScrollBoard(config) {
    let header = [];
    let data = [];
    if (config.data && config.data.length > 0) {
      header = dataUtil.getObjKeyArr(config.data[0]);
      data = dataUtil.objArr2ValueArr(config.data);
    }
    config.data = data;
    config.header = header;
  },
  //进度池
  initPercentPond(config) {
    config.value = config.data;
  },
};

export default chartUtil;
