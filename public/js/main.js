const { $ } = require('backbone')

const TodoAppView = require('./views/TodoAppView')

$(function () {
  const todoAppView = new TodoAppView({
    el: $('#todo-app')
  })

  todoAppView.render()

  $('.change-theme span').click(function (event) {
    $('html')[0].className = event.target.textContent
  })
})
