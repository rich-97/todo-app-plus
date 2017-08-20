const { View, $ } = require('backbone')
const _ = require('underscore')

const TodoItem = require('../TodoItem')
const TodoListView = require('./TodoListView')
const helpers = require('../helpers')

module.exports = View.extend({
  events: {
    'submit form': 'onSubmitForm',
    'click .form-checkbox': 'showCompleted',
    'click .panel-complete': 'complete',
    'click .panel-delete': 'delete'
  },
  onSubmitForm: function (event) {
    const $input = this.$el.find('input[type=text]')
    const todoDesc = $input.val()
    const todoItem = new TodoItem({ description: todoDesc })

    todoItem.save()
    this.todoListView.collection.add(todoItem)

    $input.val('')
    event.preventDefault()
  },
  showCompleted: function (event) {
    helpers.cbxBehavior(event)

    const $cbx = $(event.target).prev()[0]

    if ($cbx.checked) {
      this.$el.find('.completed').show()
    } else {
      this.$el.find('.completed').hide()
    }
  },
  setPanelTotal: function () {
    this.listLength = this.todoListView.collection.length
    this.theCompleted = this.$el.find('.completed').length
    this.theIncompleted = Math.abs(this.theCompleted - this.listLength)
    const html = `
      <span>Incompleted: ${this.theIncompleted}</span><hr/>
      <span>Completed: ${this.theCompleted}</span>
    `

    if (!this.theIncompleted || !this.listLength) {
      this.setListMessage()
    }

    this.$el.find('.panel-total').html(html)
  },
  setListMessage: function () {
    if (!this.$el.find('.list-message').length) {
      this.$el.find('.todos').append(`
        <div class="list-message">
        Anything <b>todo</b> for the moment
        </div>
      `)
    }
  },
  hideListMessage: function () {
    this.$el.find('.list-message').remove()
  },
  getCbxChecked: function () {
    let $todosCbx = this.$el.find('.todo-checkbox input')

    return _.filter($todosCbx, function ($cbx) {
      return $cbx.checked
    })
  },
  complete: function () {
    this.getCbxChecked().forEach(function (todoChecked) {
      const $li = $(todoChecked).parents('li')
      const id = $li[0].id
      const model = this.todoListView.collection.get(id)

      if ($li.hasClass('completed')) {
        $li.removeClass('completed')
        model.set('completed', false)
      } else {
        model.set('completed', true)
        $li.addClass('completed')
      }

      model.save()
      todoChecked.checked = false
    }, this)
  },
  delete: function () {
    this.getCbxChecked().forEach(function (todoChecked) {
      const $li = $(todoChecked).parents('li')
      const id = $li[0].id
      const model = this.todoListView.collection.get(id)

      model.destroy()
    }, this)
  },
  render: function () {
    this.todoListView = new TodoListView()

    this.listenTo(this.todoListView.collection, 'all', this.setPanelTotal)
    this.listenTo(this.todoListView.collection, 'add', this.hideListMessage)
    this.$el.find('form').after(this.todoListView.el)
  }
})
