const express = require('express')
const db = require('../todo_list/config/mongoose')
const app = express()
const port = 3000

require('./config/mongoose')

app.get('/', (req, res) => {
  console.log('URL-shortener test')
})

app.listen(port, () => {
  console.log(`URL_Shortener is running on http://localhost:${port}`)
})
