
const { fileListFilter } = require("../shared/filter")
const { getCurrentDirFiles } = require("../shared/path")
const { getSpecialCmds, getRunCmdResult } = require("../shared/special")
const { context, settings } = require("../shared/store")

module.exports = function search(_, text, setList) {
  if (!text) {
    getCurrentDirFiles().then(() => {
      setList(context.cachedList)
    })
    return
  }
  if (text === '\\') {
    // 指令模式
    setList(getSpecialCmds())
    return
  }
  if (text.startsWith('\\')) {
    // 执行指令模式
    setList(
      getRunCmdResult(text)
    )
    return
  }
  if (text === '..') {
    // 返回上级菜单
    setList([
      {
        title: '返回上一级',
        description: `当前路径：${context.currentPath}`,
        action: 'back'
      }
    ])
    return
  }
  // 搜索模式
  setList(
    context.cachedList.filter(fileListFilter(text))
  )
}
