const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const urlPair = require('./models/url')
const generateUrl = require('./generate_url')
const app = express()
const port = process.env.port || 3000

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
        res.render('index', { shortenUrl })
      }
      else {
        shortenUrl = searchResult[0].shortenUrl
        res.render('index', { shortenUrl })
      }
    })
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`URL_Shortener is running on http://localhost:${port}`)
})
