'use strict'

var fs = require('fs')
var path = require('path')

module.exports = function streaming (state) {
  var fp = path.join(__dirname, 'index.html')
  return fs.createReadStream(fp)
}
