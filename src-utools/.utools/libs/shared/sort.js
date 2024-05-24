exports.filesSort = function (sortBy) {
  return (a, b) => {
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
  }
}
