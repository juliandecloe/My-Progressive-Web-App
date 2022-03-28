const http = require('http');
const express = require('express')
const app = express()
const port = 3000

// app.use(express.static(__dirname + '/public'));

// Stel ejs in als template engine
app.set('view engine', 'ejs')
app.set('views', './views')

// Stel een static map in
app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get("/", renderPage)

function renderPage(req, res) {
  // res.sendFile(__dirname + "/public/index.html");
  pageTitle: 'Rijksmuseum';
}