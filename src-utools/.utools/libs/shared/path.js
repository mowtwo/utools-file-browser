const path = require('path');
const fs = require('fs');
const { context, settings } = require('./store');
const { fmtFileSize } = require('./size');

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
          console.log(stat)
          const isDirectory = stat.isDirectory();
          return {
            title: file,
            description: isDirectory ? '文件夹 - 选择进入' : '文件 - 以默认软件打开',
            icon: isDirectory ? utools.getFileIcon('folder') : icon,
            isDirectory,
            action: 'open',
            open: fullPath,
            size: stat.size,
            modified: stat.mtime.valueOf(),
          }
        } catch {
          return null
        }
      })
        .filter((item) => {
          if (settings.showHiddenFile) {
            return true
          } else {
            return !item.title.startsWith('.')
          }
        })
        .filter(Boolean)
        .map(item => {
          if (!item.isDirectory) {
            if (settings.showFileSize && typeof item.size === 'number') {
              return {
                ...item,
                description: `${item.description} - ${fmtFileSize(item.size)}`
              }
            }
          }
          return item
        })
        .sort((a, b) => {
          const sortBy = settings.sortBy
          if (sortBy === 'NameAsc') {
            return a.title.localeCompare(b.title)
          }
          if (sortBy === 'NameDesc') {
            return b.title.localeCompare(a.title)
          }
          if (sortBy === 'SizeAsc') {
            return a.size - b.size
          }
          if (sortBy === 'SizeDesc') {
            return b.size - a.size
          }
          if (sortBy === 'ModifyTimeAsc') {
            return a.modified - b.modified
          }
          if (sortBy === 'ModifyTimeDesc') {
            return b.modified - a.modified
          }
          // 根据文件或者文件夹类型排序，文件夹在前面，然后按文件名排序
          if (sortBy === 'TypeAsc') {
            if (a.isDirectory && !b.isDirectory) {
              return -1
            } else if (!a.isDirectory && b.isDirectory) {
              return 1
            } else {
              return a.title.localeCompare(b.title)
            }
          }
          if (sortBy === 'TypeDesc') {
            if (a.isDirectory && !b.isDirectory) {
              return 1
            } else if (!a.isDirectory && b.isDirectory) {
              return -1
            } else {
              return b.title.localeCompare(a.title)
            }
          }
        })
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
