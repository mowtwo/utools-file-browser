const path = require('path');
const fs = require('fs');
const { context } = require('./store');

exports.getCurrentDirFiles = async function getCurrentDirFiles() {
  try {
    const dir = (context.currentPath ||= (await utools.readCurrentFolderPath().then(dir => {
      return dir
    }).catch(() => {
      return utools.getPath('home')
    })))

    const files = fs.readdirSync(dir);
    context.cachedList = [
      ...files.map(file => {
        const fullPath = path.join(dir, file);
        const icon = utools.getFileIcon(fullPath)
        try {
          const stat = fs.statSync(path.join(dir, file));
          const isDirectory = stat.isDirectory();
          return {
            title: file,
            description: isDirectory ? '文件夹 - 选择进入' : '文件 - 以默认软件打开',
            icon,
            isDirectory,
            action: 'open',
            open: fullPath
          }
        } catch {
          const isDirectory = false
          return {
            title: file,
            description: isDirectory ? '文件夹 - 选择进入' : '文件 - 以默认软件打开',
            icon,
            isDirectory,
            action: 'open',
            open: fullPath
          }
        }
      }).filter(Boolean)
    ]
    // 判断当前路径是不是根路径
    if (dir !== path.parse(dir).root) {
      context.cachedList = [
        {
          title: '返回上一级',
          description: `当前路径：${dir}`,
          action: 'back'
        },
        ...context.cachedList
      ]
    } else {
      context.cachedList = [
        {
          title: '切换盘符',
          description: `当前路径：${dir}，点击进入盘符选择`,
          action: 'input',
          input: '\\!'
        },
        ...context.cachedList
      ]
    }
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}
