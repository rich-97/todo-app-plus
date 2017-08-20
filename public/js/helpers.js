const { $ } = require('backbone')

module.exports = {
  cbxBehavior: function (event) {
    const $cbx = $(event.target).prev()[0]

    if ($cbx.checked) {
      $cbx.checked = false
    } else {
      $cbx.checked = true
    }
  }
}

// Resolve the problem with the context (is by webpack).
Object.keys(module.exports).forEach(function (key) {
  if (typeof module.exports[key] === 'function') {
    module.exports[key] = module.exports[key].bind(module.exports)
  }
})
