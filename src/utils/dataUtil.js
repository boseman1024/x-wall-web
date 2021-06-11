const dataUtil = {
  getObjKeyArr(obj) {
    return Object.keys(obj);
  },
  getObjValueArr(obj) {
    return Object.values(obj);
  },
  objArr2ValueArr(objArr) {
    let arr = [];
    objArr.forEach((item) => {
      arr.push(dataUtil.getObjValueArr(item));
    });
    return arr;
  },
};

export default dataUtil;
