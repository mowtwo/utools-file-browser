const { SortTypeKeys } = require("./constant")
const { mountDbSynProperties } = require("./db")

const context = {
  currentPath: '',
  cachedList: [],
  diskAreas: [],
}

const settings = mountDbSynProperties({}, {
  sortBy: SortTypeKeys[0],
  showFileType: false,
  showHiddenFile: false,
  showFileSize: false,
})

const version = '1.0.0'

const author = 'Mowtwo'

module.exports = {
  context,
  version,
  author,
  settings
}
