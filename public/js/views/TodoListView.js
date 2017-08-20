const { View } = require('backbone')

const TodoList = require('../TodoList')
const TodoItemView = require('./TodoItemView')

module.exports = View.extend({
  tagName: 'ul',
  className: 'todos',
  initialize: function () {
    this.collection = new TodoList()

    this.collection.fetch({ reset: true })
    this.collection.on('reset', this.addAll, this)
    this.collection.on('add', this.addOne, this)
  },
  addAll: function () {
    this.collection.forEach(this.addOne, this)
  },
  addOne: function (todoItem) {
    const length = this.collection.length
    const prevModel = this.collection.at(length - 2)

    let id

    if (!todoItem.id) {
      if (!prevModel.id) {
        id = parseInt(window.localStorage.lastId) + 1
      } else {
        id = prevModel.id + 1
      }
    } else {
      id = todoItem.id
    }

    window.localStorage.setItem('lastId', id)

    const todoItemView = new TodoItemView({
      model: todoItem,
      id: id
    })

    todoItemView.model.set('id', id)
    todoItemView.render()
    this.$el.append(todoItemView.el)
  }
})
