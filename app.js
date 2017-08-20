const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')

const port = process.env.PORT || 8000
const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use('/todos', router)

app.listen(port, function () {
  console.log(`Server running on *:${port}`)
})
