const { SortTypeKeys, SortType } = require("./constant")
const { context, version, author, settings } = require("./store")
const path = require("path")

exports.getSpecialCmds = function getSpecialCmds() {
  return [
    {
      title: '返回文件浏览模式',
      description: `当前路径：${context.currentPath}，选择下面指令进行其他操作`,
    },
    {
      title: '\\^',
      description: '切换排序方式',
      action: 'input',
      input: '\\^'
    },
    {
      title: '\\>',
      description: '使用cmd执行系统命令，执行路径为当前文件路径',
      action: 'input',
      input: '\\>'
    },
    {
      title: '\\@',
      description: '文件管理器启动模式，此模式下的启动文件都将在系统文件管理器中打开',
      action: 'input',
      input: '\\@'
    },
    {
      title: '\\!',
      description: '切换盘符，将会读取所有的分区盘符',
      action: 'input',
      input: '\\!'
    },
    {
      title: '\\,',
      description: '显示设置',
      action: 'input',
      input: '\\,'
    },
    {
      title: '\\?',
      description: '查看插件详情',
      action: 'input',
      input: '\\?'
    },
  ]
}

function getCmdHelp() {
  return [
    {
      title: '帮助信息',
      description: '获取cmd帮助信息'
    },
    {
      title: '作者',
      description: author,
      action: 'copy',
      copy: author
    },
    {
      title: '版本号',
      description: version,
      action: 'copy',
      copy: version
    },
    {
      title: '开源地址',
      description: '在默认浏览器打开：https://github.com/mowtwo/utools-file-browser',
      action: 'systemCmd',
      systemCmd: 'start https://github.com/mowtwo/utools-file-browser'
    }
  ]
}

function getSystemCmdRun(systemCmd) {
  return [
    {
      title: '开始执行：' + systemCmd,
      description: '执行当前命令，将会打开一个cmd窗口',
      action: 'systemCmd',
      systemCmd
    }
  ]
}

function getSystemExploererList(text) {
  return context.cachedList.map(item => {
    if (item.action && item.open) {
      return {
        ...item,
        action: 'systemOpen',
        systemOpen: item.open,
        description: '将以系统文件管理器打开'
      }
    }
    return item
  }).filter(
    item => {
      if (!text) {
        return true
      }
      console.log('search', text)
      return item.title.toLowerCase().includes(text.toLowerCase())
    }
  )
}

function getSystemLogicDisks(text) {
  return context.diskAreas.map(disk => {
    const isCurrent = path.parse(context.currentPath).root.startsWith(disk)
    console.log(disk)
    return {
      title: disk,
      description: isCurrent ? '当前分区，点击进入分区根目录' : '点击切换分区，进入分区根目录',
      action: 'switchDisk',
      switchDisk: disk + '/'
    }
  }).filter(
    item => {
      if (!text) {
        return true
      }
      console.log('search', text)
      return item.title.toLowerCase().includes(text.toLowerCase())
    })
}

function getPluginSettings() {

  const {
    showFileType,
    showHiddenFile,
    showFileSize
  } = settings

  return [
    {
      title: '退出设置',
      description: '返回指令选择',
      action: 'input',
      input: '\\'
    },
    // {
    //   title: `显示文件类型：${showFileType ? '是' : '否'}`,
    //   description: `点击${showFileType ? '关闭' : '开启'}`,
    //   action: 'settings',
    //   settings: {
    //     showFileType: !showFileType
    //   }
    // },
    {
      title: `显示文件大小：${showFileSize ? '是' : '否'}`,
      description: `点击${showFileSize ? '关闭' : '开启'}`,
      action: 'settings',
      settings: {
        showFileSize: !showFileSize
      }
    },
    {
      title: `显示隐藏文件：${showHiddenFile ? '是' : '否'}`,
      description: `点击${showHiddenFile ? '关闭' : '开启'}`,
      action: 'settings',
      settings: {
        showHiddenFile: !showHiddenFile
      }
    }
  ]
}

function getPluginFileSortTypes() {

  const { sortBy } = settings

  const sortTypeKeysSorted = [
    ...SortTypeKeys
  ].sort((a, b) => {
    if (sortBy === a) {
      return -1
    }
    if (sortBy === b) {
      return 1
    }
    return 0
  })

  console.log(sortTypeKeysSorted)


  return [
    {
      title: '退出设置',
      description: '返回指令选择',
      action: 'input',
      input: '\\'
    },
    ...sortTypeKeysSorted.map(key => {
      return {
        title: `排序方式：${SortType[key]}`,
        description: sortBy === key ? '当前排序方式' : '点击切换',
        action: 'sortBy',
        sortBy: key
      }
    })
  ]
}


exports.getRunCmdResult = function getRunCmdResult(text) {
  const cmd = text.slice(1)
  if (cmd === '?') {
    return getCmdHelp()
  }

  if (cmd.startsWith('>')) {
    return getSystemCmdRun(cmd.slice(1).trim())
  }

  if (cmd.startsWith('@')) {
    return getSystemExploererList(cmd.slice(1).trim())
  }

  if (cmd.startsWith('!')) {
    return getSystemLogicDisks(
      cmd.slice(1).trim()
    )
  }

  if (cmd === ',') {
    return getPluginSettings()
  }

  if (cmd === '^') {
    return getPluginFileSortTypes()
  }


  return [
    {
      title: '未知的指令：' + cmd,
      description: '请检查输入的指令是否正确，点击返回返回文件浏览模式'
    }
  ]
}

