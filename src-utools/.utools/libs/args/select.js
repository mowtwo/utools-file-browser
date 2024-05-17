const { execSync, exec } = require("child_process")
const { getCurrentDirFiles } = require("../shared/path")
const { context } = require("../shared/store")
const path = require("path")

module.exports = function select(_, item, setList) {
  const { action, isDirectory, fullPath } = item

  // 清空utools输入框
  if (action === 'input') {
    utools.setSubInputValue(item.input)
    return
  } else {
    utools.setSubInputValue('')
  }

  if (action === 'copy') {
    utools.hideMainWindow()
    utools.copyText(item.copy)
    return
  }

  if (action === 'back') {
    const backPath = path.join(context.currentPath, '..')
    context.currentPath = backPath
    getCurrentDirFiles().then(() => {
      setList(context.cachedList)
    })
    return
  }

  if (action === 'systemCmd') {
    utools.hideMainWindow()
    // 启动外部cmd
    exec(
      'start cmd.exe /K ' + '"cd ' + context.currentPath + ' && ' + item.systemCmd + '"'
    )
    return
  }

  if (action === 'switchDisk') {
    context.currentPath = item.switchDisk
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
  }

  if (action === 'open') {
    if (isDirectory) {
      context.currentPath = item.open
      getCurrentDirFiles().then(() => {
        setList(context.cachedList)
      })
      return
    }

    utools.hideMainWindow()
    utools.shellOpenItem(item.open)
  }

  if (action === 'systemOpen') {
    utools.shellShowItemInFolder(item.systemOpen)
  }
}
