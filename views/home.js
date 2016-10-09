'use strict'

var bel = require('bel')

module.exports = function home (state) {
  return bel`<h1>${state.name}</h1>`
}
