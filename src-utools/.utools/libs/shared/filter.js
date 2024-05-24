const { settings } = require("./store")

exports.fileListFilter = (text) => {

  if (!text) {
    return () => true
  }

  const {
    forceRegexSearch,
    caseSensitive
  } = settings

  if (!caseSensitive) {
    text = text.toLowerCase()
  }

  return (item) => {
    let title = item.title
    if (!caseSensitive) {
      title = title.toLowerCase()
    }
    if (forceRegexSearch) {
      const regex = new RegExp(text, 'i')

      return regex.test(title)
    }
    return title.includes(text)
  }
}
