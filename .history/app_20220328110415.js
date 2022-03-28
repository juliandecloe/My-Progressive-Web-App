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


app.get('/quotes', function (req, res) {
  fetchJson('https://quote.api.fdnd.nl/v1/quote').then(function (jsonData) {
    res.render('quotes', {
      pageTitle: 'Dit is de quotes pagina',
      data: jsonData,
    })
  })
})

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */
 async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .then((body) => body.data)
    .catch((error) => error)
}