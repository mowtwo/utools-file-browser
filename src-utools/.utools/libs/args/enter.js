const { getLogicDisk } = require('../shared/disk');
const { getCurrentDirFiles } = require('../shared/path');
const { context } = require('../shared/store');
const fs = require('fs')

module.exports = function enter(action, setList) {
  const { payload, type } = action;
  if (type !== 'text') {
    let enterPayload = ''

    if (type === 'regex') {
      enterPayload = payload
    } else if (type === 'files') {
      enterPayload = payload[0].path
    }

    try {
      const stat = fs.statSync(enterPayload)

      if (stat.isDirectory()) {
        context.currentPath = enterPayload
      } else {
        context.currentPath = path.dirname(enterPayload)
      }
    } catch { }
  }

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
