'use strict'

var axios = require('axios')
var config = require('../package.json')

var resources = {
  Post: require('./resources/Post'),
  Category: require('./resources/Category'),
  Tag: require('./resources/Tag'),
  Author: require('./resources/Author'),
  Feed: require('./resources/Feed'),
  Content: require('./resources/Content'),
  Page: require('./resources/Page')
}

function Beauty (apiToken, testMode, timeout) {
  if (!(this instanceof Beauty)) {
    return new Beauty(apiToken, testMode, timeout)
  }

  // 3000ms timeout by default
  var timeout = timeout || 3000

  var requestMethods = this._prepMethods(apiToken, testMode, timeout)

  this._prepResources(requestMethods)
}

Beauty.prototype = {
  _prepResources: function (requestMethods) {
    for (var name in resources) {
      console.log(name)
      this[
        name[0].toLowerCase() + name.substring(1)
      ] = new resources[name](requestMethods)
    }
  },
  _prepMethods: function (apiToken, testMode, timeout) {
    return {
      get: function (url, params) {
        var conn = axios.create({
          baseURL: '/static/data',
          timeout: timeout,
          headers: {'X-Butter-Client': 'JS/' + config.version}
        })

        var params = params || {}

        // Add api token to query string
        params.auth_token = apiToken

        // Append &test=1 query string
        if (testMode) {
          params.test = 1
        }

        return conn.get(url, {params: params})
      }
    }
  }
}

module.exports = Beauty
