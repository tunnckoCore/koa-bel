/*!
 * koa-bel <https://github.com/tunnckoCore/koa-bel>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var path = require('path')

/**
 * > Javascript template views for [koa][]@2. You can
 * use [koa-convert][] if you want to work in koa@1.x version.
 *
 * > Cool thing about that, is it not requires your
 * templates to be [bel][] or something other like [yo-yo][],
 * or any other DOM thingy. You can simple return a stream
 * or buffer or anything that can be added to `ctx.body`.
 * By default it calls `.toString()` on the returned value, but
 * you can bypass that if you pass `opts.toString: false` option.
 *
 * **Example**
 *
 * ```js
 * const Koa = require('koa')
 * const bel = require('koa-bel')
 * const app = new Koa()
 *
 * const port = 4290
 *
 * app.use(bel('./views'))
 * app.use((ctx, next) => {
 *   ctx.render('home', {
 *     heading: 'Welcome page',
 *     description: 'This is our cool landing page, man!',
 *     subhead: 'What we offer?',
 *     services: [
 *       'Realtime Web Apps',
 *       'Security and Simplicity',
 *       'Logo Design and Prototypes'
 *     ]
 *   })
 *   return next()
 * })
 *
 * app.listen(port, (err) => {
 *   console.log(`Server start listening on http://localhost:${port}`)
 * })
 * ```
 *
 * @param  {String|Buffer} `<dir>` directory to read the views
 * @param  {Object} `[opts]` optional options
 * @return {Function} plugin for **[koa][] version 2**
 * @api public
 */

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

