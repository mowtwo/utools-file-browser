exports.mountDbSynProperties = function mountDbSynProperties(target, initRecords) {
  const keys = Object.keys(initRecords);

  const records = {}

  for (const key of keys) {
    const value = utools.dbStorage.getItem('_m2:' + key) ?? initRecords[key];
    records[key] = value
    Object.defineProperty(
      target, key, {
      get() {
        return records[key]
      },
      set(value) {
        records[key] = value
        utools.dbStorage.setItem('_m2:' + key, value)
      }
    })
  }

  return target;
}
