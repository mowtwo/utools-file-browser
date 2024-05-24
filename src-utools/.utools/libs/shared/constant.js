const SortType = Object.freeze({
  // 根据文件名升序
  NameAsc: '文件名升序',
  // 根据文件名降序
  NameDesc: '文件名降序',
  // 根据文件大小升序
  SizeAsc: '文件大小升序',
  // 根据文件大小降序
  SizeDesc: '文件大小降序',
  // 根据文件修改时间升序
  ModifyTimeAsc: '修改时间升序',
  // 根据文件修改时间降序
  ModifyTimeDesc: '修改时间降序',
})

const SortTypeReverse = Object.freeze(
  Object.fromEntries(
    Object.entries(SortType).map(([key, value]) => [value, key])
  )
)

const SortTypeKeys = Object.freeze(Object.keys(SortType))

const SortTypeValues = Object.freeze(Object.values(SortType))

module.exports = {
  SortType,
  SortTypeKeys,
  SortTypeReverse,
  SortTypeValues
}
