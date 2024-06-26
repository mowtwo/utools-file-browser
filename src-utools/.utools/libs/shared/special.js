const { SortTypeKeys, SortType, SortTypeReverse, SortTypeValues } = require("./constant")
const { fileListFilter } = require("./filter")
const { filesSort } = require("./sort")
const { context, version, author, settings } = require("./store")
const path = require("path")

exports.getSpecialCmds = function getSpecialCmds() {
  return [
    {
      title: '返回文件浏览模式',
      description: `当前路径：${context.currentPath}，选择下面指令进行其他操作`,
    },
    {
      title: '\\+',
      description: '正则表达查询模式',
      action: 'input',
      input: '\\+'
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
      action: 'systemCmdBack',
      systemCmdBack: 'start https://github.com/mowtwo/utools-file-browser'
    }
  ]
}

function getSystemCmdRun(systemCmd) {

  const cmds = []

  if (settings.cmdAlawyBack) {
    cmds.push(
      {
        title: '静默执行：' + systemCmd,
        description: '执行当前命令，但是不会打开一个cmd窗口',
        action: 'systemCmdBack',
        systemCmdBack: systemCmd
      },
      {
        title: '开始执行：' + systemCmd,
        description: '执行当前命令，将会打开一个cmd窗口',
        action: 'systemCmd',
        systemCmd
      }
    )

  } else {
    cmds.push(
      {
        title: '开始执行：' + systemCmd,
        description: '执行当前命令，将会打开一个cmd窗口',
        action: 'systemCmd',
        systemCmd
      },
      {
        title: '静默执行：' + systemCmd,
        description: '执行当前命令，但是不会打开一个cmd窗口',
        action: 'systemCmdBack',
        systemCmdBack: systemCmd
      }
    )
  }

  return cmds
}

function getSystemExploererList(text) {
  return [
    {
      title: '退出文件管理器启动模式',
      description: '返回指令选择',
      action: 'input',
      input: '\\'
    },
    ...context.cachedList
      .filter(
        item => {
          return item.action === 'open'
        }
      )
      .map(item => {
        if (item.action && item.open) {
          return {
            ...item,
            action: 'systemOpen',
            systemOpen: item.open,
            description: '将以系统文件管理器打开'
          }
        }
        return item
      }).filter(fileListFilter(text))]
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
      return item.title.toLowerCase().includes(text.toLowerCase())
    })
}

function getPluginSettings() {

  const {
    showFileType,
    showHiddenFile,
    showFileSize,
    forceRegexSearch,
    caseSensitive,
    cmdAlawyBack
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
    },
    {
      title: `搜索启用正则模式：${forceRegexSearch ? '是' : '否'}`,
      description: `点击${forceRegexSearch ? '关闭' : '开启'}`,
      action: 'settings',
      settings: {
        forceRegexSearch: !forceRegexSearch
      }
    },
    {
      title: `搜索大小写敏感：${caseSensitive ? '是' : '否'}`,
      description: `点击${caseSensitive ? '关闭' : '开启'}`,
      action: 'settings',
      settings: {
        caseSensitive: !caseSensitive
      }
    },
    {
      title: `cmd是否优先静默执行：${cmdAlawyBack ? '是' : '否'}`,
      description: `点击${cmdAlawyBack ? '关闭' : '开启'}`,
      action: 'settings',
      settings: {
        cmdAlawyBack: !cmdAlawyBack
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
    }),
    {
      title: '\\^+',
      description: '进入局部排序模式，仅在当前文件夹应用排序规则',
      action: 'input',
      input: '\\^+'
    }
  ]
}

function getPluginFileTempSortTypes() {

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
      title: '退出局部排序',
      description: '返回排序设置，当前路径：' + context.currentPath,
      action: 'input',
      input: '\\^'
    },
    ...sortTypeKeysSorted.map(key => {

      const S = SortType[key]

      return {
        title: `\\^+${S}`,
        description: '点击以此模式进行排序',
        action: 'input',
        input: `\\^+${S} `
      }
    })
  ]
}

function getPluginFileTempSorted(text) {

  const [sortByName, _search] = text.split(' ')


  if (!Reflect.has(SortTypeReverse, sortByName)) {
    return [
      {
        title: '暂不支持的排序方式',
        description: '请检查输入的排序方式是否正确，点击返回返回局部排序方式选择',
        action: 'input',
        input: '\\^+'
      }
    ]
  }

  const search = _search?.trim()
  const sortBy = SortTypeReverse[sortByName]

  return [
    {
      title: '返回局部排序选择',
      description: '返回排序设置，当前排序方式' + sortByName + '，当前路径：' + context.currentPath,
      action: 'input',
      input: '\\^+'
    },
    ...context.cachedList.filter(item => {
      if (item.action === 'back') {
        return false
      }

      return true
    }).filter(fileListFilter(search)).sort(filesSort(sortBy))
  ]

}

function getFileListWithRegex(text) {
  const regex = new RegExp(text, 'i')

  return [
    {
      title: '退出正则表达查询模式',
      description: '返回指令选择',
      action: 'input',
      input: '\\'
    },
    ...context.cachedList.filter(item => {
      if (item.action === 'back') {
        return false
      }

      return regex.test(item.title)
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

  if (cmd === '^+') {
    return getPluginFileTempSortTypes()
  }

  if (cmd.startsWith('^+')) {
    return getPluginFileTempSorted(cmd.slice(2).trim())
  }

  if (cmd.startsWith('+')) {
    return getFileListWithRegex(cmd.slice(1))
  }


  return [
    {
      title: '未知的指令：' + cmd,
      description: '请检查输入的指令是否正确，点击返回返回文件浏览模式'
    }
  ]
}

