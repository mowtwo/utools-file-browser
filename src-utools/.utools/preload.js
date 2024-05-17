const enter = require("./libs/args/enter");
const search = require("./libs/args/search");
const select = require("./libs/args/select");

window.exports = {
  "file-browser": {
    mode: "list",
    args: {
      enter,
      search,
      select,
      placeholder: '输入`..`返回上一级文件夹，输入`\\`获取更多指令'
    }
  }
}
