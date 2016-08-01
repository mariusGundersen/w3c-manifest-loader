# w3c-manifest-loader

[![npm Version][npm-image]][npm]
[![MIT License][license-image]][LICENSE]

> Load a [W3C manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) file into the page

## Install

```sh
$ npm install w3c-manifest-loader --save-dev
```

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

Import the manifest.json file in your main file (probably where you import your css).

``` javascript
// using ES2015
import './manifest.json';

// or using CommonJS
require('./manifest.json');
```

And configure the loader for `manifest.json` files in your webpack config file:

```javascript
{
  module: {
    loaders: [
      {
        test: /manifest\.json$/,
        loader: 'w3c-manifest?name=[name].[hash].[ext]&legacyAppleSupport=true'
      }
    ]
  }
}
```

### Query Parameters

These are common options you can specify in the `require` or `loaders` config.

* `name` - Name of the output, defaults to `[hash].[ext]`. See [file-loader](https://github.com/webpack/file-loader) for more info.
* `legacyAppleSupport` Use the [legacy proprietary Apple elements](https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html) for WebApps.

## License

This software is free to use under the MIT license. See the [LICENSE-MIT file][LICENSE] for license text and copyright information.

[npm]: https://www.npmjs.org/package/w3c-manifest-loader
[npm-image]: https://img.shields.io/npm/v/w3c-manifest-loader.svg
[license-image]: https://img.shields.io/npm/l/w3c-manifest-loader.svg
[LICENSE]: https://github.com/mariusgundersen/w3c-manifest-loader/blob/master/LICENSE-MIT
