/*!
 * koa-bel <https://github.com/tunnckoCore/koa-bel>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var path = require('path')

module.exports = function koaBel (dir, opts) {
  dir = Buffer.isBuffer(dir) ? dir.toString() : dir

  if (typeof dir !== 'string') {
    throw new TypeError('koa-bel: expect `dir` to be string or Buffer')
  }

  opts = typeof opts === 'object' ? opts : {}
  opts.toString = typeof opts.toString === 'boolean' ? opts.toString : true
  opts.cwd = typeof opts.cwd === 'string'
    ? path.resolve(opts.cwd)
    : process.cwd()

  dir = path.join(opts.cwd, dir)

  return function (ctx, next) {
    ctx.render = function render (fp, state) {
      // allows `views/home.js` and `views/home/index.js`
      var view = require(path.join(dir, fp))
      ctx.body = opts.toString
        ? view(state).toString(opts.encoding)
        : view(state)

      return ctx
    }
    return next()
  }
}

