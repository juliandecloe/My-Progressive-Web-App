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
    pageTitle: 'Rijksflix'
  })
}

// app.get('/', async (req, res) => {
//   const rijksAPI = 'https://www.rijksmuseum.nl/api/nl/collection?key=C21U7KQu&ps=10&imgonly=true&p=';
//   let page = 1; 
//   const options = {
//     method: 'GET'
//   }

//   const response = await fetch(rijksAPI + page, options)
//     .then(res => res.json())
//     .catch(e => {
//       console.error({
//         'message': 'oh no',
//         error: e,
//       })
//     })
//     console.log(response)
//     res.render('index', {
//       pageTitle: 'Rijks'
//       data: response.artObjects
//     })
// })