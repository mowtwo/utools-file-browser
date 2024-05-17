const { exec } = require('child_process')

exports.getLogicDisk = function getLogicDisk() {
  return new Promise(resolve => {
    exec('wmic logicaldisk get name', (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      let arr = stdout.split('\r\r\n')
        .filter(value => {
          return /[A-Za-z]:/.test(value)
        })
        .map(value => value.trim())
      resolve(arr)
    })
  })
}
