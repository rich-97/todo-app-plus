const path = require('path')

module.exports = {
  entry: './public/js/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public/js')
  }
}
