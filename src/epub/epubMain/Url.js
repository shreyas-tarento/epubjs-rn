import React from 'react';

var _path = _interopRequireDefault(require("epubjs/lib/utils/path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Url {
  constructor(urlString, baseString) {
    var absolute = urlString.indexOf("://") > -1;
    var pathname = urlString;
    var basePath;
    this.Url = undefined;
    this.href = urlString;
    this.protocol = "";
    this.origin = "";
    this.hash = "";
    this.hash = "";
    this.search = "";
    this.base = baseString;

    if (!absolute && baseString !== false && typeof baseString !== "string" && window && window.location) {
      this.base = window.location.href;
    } // URL Polyfill doesn't throw an error if base is empty


    if (absolute || this.base) {
      try {
        if (this.base) {
          // Safari doesn't like an undefined base
          this.Url = new URL(urlString, this.base);
        } else {
          this.Url = new URL(urlString);
        }

        this.href = this.Url.href;
        this.protocol = this.Url.protocol;
        this.origin = this.Url.origin;
        this.hash = this.Url.hash;
        this.search = this.Url.search;
        pathname = this.Url.pathname + (this.Url.search ? this.Url.search : '');
      } catch (e) {
        // Skip URL parsing
        this.Url = undefined; // resolve the pathname from the base

        if (this.base) {
          basePath = new _path.default(this.base);
          pathname = basePath.resolve(pathname);
        }
      }
    }

    this.Path = new _path.default(pathname);
    this.directory = this.Path.directory;
    this.filename = this.Path.filename;
    this.extension = this.Path.extension;
  }

}

export default Url