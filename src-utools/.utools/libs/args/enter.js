const { getLogicDisk } = require('../shared/disk');
const { getCurrentDirFiles } = require('../shared/path');
const { context } = require('../shared/store');

module.exports = function enter(_, setList) {
  getCurrentDirFiles().then((access) => {
    if (access) {
      setList(context.cachedList)
    } else {
      setList([{
        title: '获取当前路径错误',
        description: '请检查当前路径是否可读或排查其他可能的原因'
      }]);
      utools.setSubInput(() => { }, '发送了错误')
    }
  })

  getLogicDisk().then(disks => {
    context.diskAreas = disks
  })
}
