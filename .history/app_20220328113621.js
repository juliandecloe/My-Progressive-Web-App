const http = require('http');
const express = require('express')
const app = express()
const port = 42069

import fetch from 'node-fetch';

// Stel ejs in als template engine
app.set('view engine', 'ejs')
app.set('views', 'views')

// Stel een static map in
app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// app.get("/", renderPage)

// function renderPage(req, res) {
//   res.render('index', {
//     pageTitle: 'Rijksflix'
//   })
// }

app.get('/', (req, res) => {
  const rijksAPI = 'https://www.rijksmuseum.nl/api/nl/collection?key=C21U7KQu&ps=10&imgonly=true&p=';
  let page = 1;
  fetch(rijksAPI + page)
    .then(async response => {
      const artWorks = await response.json()
      res.render('index', {
        title: 'Art Museum',
        data: artWorks.artObjects,
      });
    })
    .catch(err => res.send(err))
})