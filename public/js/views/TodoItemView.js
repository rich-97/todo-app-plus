const { View, $ } = require('backbone')
const _ = require('underscore')

const helpers = require('../helpers')

module.exports = View.extend({
  events: {
    'dblclick': 'update',
    'click .todo-delete': 'destroyModel',
    'click .todo-checkbox': 'cbxBehavior'
  },
  tagName: 'li',
  cbxBehavior: helpers.cbxBehavior,
  className: function () {
    const completed = this.model.get('completed')

    if (completed) {
      return 'completed'
    }
  },
  initialize: function () {
    this.template = _.template($('#todo-tmp').html())

    this.model.on('destroy', this.removeView, this)
  },
  removeView: function () {
    this.$el.remove()
  },
  destroyModel: function () {
    this.model.destroy()
  },
  update: function () {
    const oldDesc = this.model.get('description')
    const newDesc = window.prompt('Enter the new description:', oldDesc)

    if (newDesc) {
      this.model.set('description', newDesc)
      this.model.save()
      this.render()
    }
  },
  render: function () {
    const html = this.template(this.model.toJSON())

    this.$el.html(html)
  }
})
