'use strict';

function Content(conn) {
  this._conn = conn;
}

Content.prototype = {
  list: function(options) {
    return this._conn.get('categories/', options)
  },
  retrieve: function(slug, options) {
    return this._conn.get('categories/'+slug+'/', options)
  }
}

module.exports = Content;