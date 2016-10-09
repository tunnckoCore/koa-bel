/*!
 * koa-bel <https://github.com/tunnckoCore/koa-bel>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var test = require('mukla')
var views = require('./index')
var request = require('supertest')
var Koa = require('koa')

function middleware (fn) {
  var app = new Koa()
  return app.use(views('./views')).use(fn)
}

test('should throw TypeError if `dir` not a string or buffer', function (done) {
  function fixture () {
    views(123)
  }

  test.throws(fixture, TypeError)
  test.throws(fixture, /expect `dir` to be string or Buffer/)
  done()
})

test('should next middleware have `ctx.render` method', function (done) {
  var app = middleware(function (ctx, next) {
    test.strictEqual(typeof ctx.render, 'function')
    ctx.body = 'okeyyyyy:' + (typeof ctx.render === 'function')
    return next()
  })

  request(app.callback())
    .get('/ctx-render')
    .expect('okeyyyyy:true')
    .expect(200, done)
})

test('should ctx.render("home", state) use js file `views/home.js`', function (done) {
  var app = middleware(function (ctx, next) {
    ctx.render('home', {
      name: 'Charlike'
    })
    return next()
  })

  request(app.callback())
    .get('/')
    .expect(200, '<h1>Charlike</h1>')
    .end(done)
})

test('should ctx.render("about", state) use js file `views/about/index.js`', function (done) {
  var app = middleware(function (ctx, next) {
    ctx.render('about', {
      heading: 'About',
      items: [
        'awesome template engine',
        'no dependencies',
        'works not only for `bel`'
      ]
    })
    return next()
  })

  request(app.callback())
    .get('/')
    .expect(/<h1>About<\/h1>/)
    .expect(/<li>no dependencies<\/li>/)
    .expect(200, done)
})

test('should be able to change cwd from `opts.cwd`', function (done) {
  var app = new Koa()
  var server = app.use(views('./templates', {
    cwd: './views/nested-cwd',
    toString: false
  }))
  server.use(function (ctx, next) {
    ctx.render('foo', { bar: 'qux' })
    return next()
  })

  request(server.callback())
    .get('/streaming-html-file')
    .expect(200, /Welcome HTML/)
    .end(done)
})
