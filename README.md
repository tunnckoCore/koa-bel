# [koa-bel][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] [![npm downloads][downloads-img]][downloads-url] 

> View engine for `koa` without any deps, built to be used with `bel`. Any other engines that can be written in `.js` files would work, too.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]

## Install

```
npm i koa-bel --save
```

## Usage
> For more use-cases see the [tests](./test.js)

```js
const koaBel = require('koa-bel')
```

### [koaBel](index.js#L58)
> Javascript template views for [koa][]@2. You can use [koa-convert][] if you want to work in koa@1.x version.

> Cool thing about that, is it not requires your
templates to be [bel][] or something other like [yo-yo][],
or any other DOM thingy. You can simple return a stream
or buffer or anything that can be added to `ctx.body`.
By default it calls `.toString()` on the returned value, but
you can bypass that if you pass `opts.toString: false` option.

**Params**

* `<dir>` **{String|Buffer}**: directory to read the views    
* `[opts]` **{Object}**: optional options    
* `returns` **{Function}**: plugin for **[koa][] version 2**  

**Example**

```js
const Koa = require('koa')
const bel = require('koa-bel')
const app = new Koa()

const port = 4290

app.use(bel('./views'))
app.use((ctx, next) => {
  ctx.render('home', {
    heading: 'Welcome page',
    description: 'This is our cool landing page, man!',
    subhead: 'What we offer?',
    services: [
      'Realtime Web Apps',
      'Security and Simplicity',
      'Logo Design and Prototypes'
    ]
  })
  return next()
})

app.listen(port, (err) => {
  console.log(`Server start listening on http://localhost:${port}`)
})
```

**Example `views/home.js`**

> Here you can even use [yo-yo][], instead of [bel][]. Or just return
a buffer or stream and just pass `options.toString: false` option.

```js
'use strict'

var bel = require('bel')

module.exports = function home (state) {
  return bel`<section>
    <h1>${state.heading}</h1>
    <p>${state.description}</p>
    <h2>${state.subhead}</h2>
    <ul>${state.services.map((service) => {
      return bel`<li>${service}</li>`
    })}</ul>
  </section>`
}
```

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/koa-bel/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.

## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckoCore.tk][author-www-img]][author-www-url] [![keybase tunnckoCore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]

[bel]: https://github.com/shama/bel
[koa-convert]: https://github.com/gyson/koa-convert
[koa]: https://github.com/koajs/koa
[yo-yo]: https://github.com/maxogden/yo-yo

[npmjs-url]: https://www.npmjs.com/package/koa-bel
[npmjs-img]: https://img.shields.io/npm/v/koa-bel.svg?label=koa-bel

[license-url]: https://github.com/tunnckoCore/koa-bel/blob/master/LICENSE
[license-img]: https://img.shields.io/npm/l/koa-bel.svg

[downloads-url]: https://www.npmjs.com/package/koa-bel
[downloads-img]: https://img.shields.io/npm/dm/koa-bel.svg

[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/koa-bel
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/koa-bel.svg

[travis-url]: https://travis-ci.org/tunnckoCore/koa-bel
[travis-img]: https://img.shields.io/travis/tunnckoCore/koa-bel/master.svg

[coveralls-url]: https://coveralls.io/r/tunnckoCore/koa-bel
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/koa-bel.svg

[david-url]: https://david-dm.org/tunnckoCore/koa-bel
[david-img]: https://img.shields.io/david/tunnckoCore/koa-bel.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/ama
[new-message-img]: https://img.shields.io/badge/ask%20me-anything-green.svg

