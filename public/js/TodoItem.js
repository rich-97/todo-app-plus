const { Model } = require('backbone')

module.exports = Model.extend({
  defaults: {
    completed: false
  },
  urlRoot: '/todos'
})
