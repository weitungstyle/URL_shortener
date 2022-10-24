const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const urlPair = require('./models/url')
const generateUrl = require('./generate_url')
const url = require('./models/url')
const app = express()
const port = process.env.PORT || 3000

app.engine('hbs', exphbs.engine({ defaultLatout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

require('./config/mongoose')

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const url = req.body.url
  let shortenUrl = ''
  urlPair.find({ url: url })
    .lean()
    .then(searchResult => {
      //input same website return same url
      if (searchResult == '') {
        shortenUrl = generateUrl()
        urlPair.create({ url, shortenUrl })
          .then(res.render('index', { shortenUrl }))
          .catch(error => console.log(error))
      }
      else {
        shortenUrl = searchResult[0].shortenUrl
        res.render('index', { shortenUrl })
      }
    })
    .catch(error => console.log(error))
})

app.get('/:id', (req, res) => {
  const url = req.params.id
  urlPair.find({ shortenUrl: url })
    .lean()
    .then(searchResult => res.redirect(`${searchResult[0].url}`))
})

app.listen(port, () => {
  console.log(`URL_Shortener is running on http://localhost:${port}`)
})
