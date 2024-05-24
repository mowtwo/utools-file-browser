// 编写一个函数，传入文件大小，帮忙把文件大小转换为可读的格式，最大显示TB
exports.fmtFileSize = function fmtFileSize(size) {
  if (size < 1024) {
    return size + 'B'
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + 'KB'
  } else if (size < 1024 * 1024 * 1024) {
    return (size / (1024 * 1024)).toFixed(2) + 'MB'
  } else if (size < 1024 * 1024 * 1024 * 1024) {
    return (size / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
  } else {
    return (size / (1024 * 1024 * 1024 * 1024)).toFixed(2) + 'TB'
  }
}
