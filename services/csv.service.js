const fs = require('fs')

function writeToCsv(str) {
  fs.writeFile('./data.csv', str, (err) => {
    console.log(err || 'done')
  })
}

module.exports = {
  writeToCsv,
}
