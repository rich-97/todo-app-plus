const { Collection } = require('backbone')

const TodoItem = require('./TodoItem')

module.exports = Collection.extend({
  url: '/todos',
  model: TodoItem
})
