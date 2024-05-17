const { context, version, author } = require("./store")
const path = require("path")

exports.getSpecialCmds = function getSpecialCmds() {
  return [
    {
      title: '返回文件浏览模式',
      description: `当前路径：${context.currentPath}，选择下面指令进行其他操作`
    },
    {
      title: '\\?',
      description: '获取特殊路径帮助',
      action: 'input',
      input: '\\?'
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
    }
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
      console.log('search',text)
      return item.title.toLowerCase().includes(text.toLowerCase())
    }
  )
}

function getSystemLogicDisks() {
  return context.diskAreas.map(disk => {
    const isCurrent = path.parse(context.currentPath).root.startsWith(disk)
    console.log(disk)
    return {
      title: disk,
      description: isCurrent ? '当前分区，点击进入分区根目录' : '点击切换分区，进入分区根目录',
      action: 'switchDisk',
      switchDisk: disk + '/'
    }
  })
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

  if (cmd === '!') {
    return getSystemLogicDisks()
  }

  return [
    {
      title: '未知的指令：' + cmd,
      description: '请检查输入的指令是否正确，点击返回返回文件浏览模式'
    }
  ]
}

