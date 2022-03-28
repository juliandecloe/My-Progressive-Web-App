const http = require('http');
const express = require('express')
const app = express()
const port = 42069

// Stel ejs in als template engine
app.set('view engine', 'ejs')
app.set('views', 'views')

// Stel een static map in
app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get("/", renderPage)

function renderPage(req, res) {
  res.render('index', {
    pageTitle: 'Dit is een express pagina'
  })
}

const rijksAPI = 'https://www.rijksmuseum.nl/api/nl/collection?key=C21U7KQu&ps=10&imgonly=true&p=';
let page = 1;

app.get('/explore', function (req, res) {
  fetchJson(rijksAPI + page).then(function (jsonData) {
    res.render('explore', {
      pageTitle: 'Explore',
      data: jsonData,
    })
  })
})