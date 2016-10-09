'use strict'

var bel = require('bel')

module.exports = function about (state) {
  return bel`<main>
    <h1>${state.heading}</h1>
    <ul>${state.items.map((item) => {
      return bel`<li>${item}</li>`
    })}</ul>
  </main>`
}
