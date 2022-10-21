const url = require('../url')
const db = require('../../config/mongoose')

db.once('open', () => {
  for (i = 0; i < 5; i++) {
    url.create()
  }
  console.log('done.')
})
