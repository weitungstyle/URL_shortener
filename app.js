const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  console.log('URL-shortener test')
})

app.listen(port, () => {
  console.log(`URL_Shortener is running on http://localhost:${port}`)
})
