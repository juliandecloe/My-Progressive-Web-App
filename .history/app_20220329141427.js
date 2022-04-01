const http = require('http');
const express = require('express');
const app = express();
const fetch = require('node-fetch');
const port = 42069;

// Stel ejs in als template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Stel een static map in
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

let rijksAPI = 'https://www.rijksmuseum.nl/api/nl/collection?key=C21U7KQu&ps=10&imgonly=true&p=';
let page;

app.get('/', (req, res) => {
  page = 1;
  fetch(rijksAPI + page)
    .then(response => {
      return response.json()
    })
    .then(collection => {
      page++;
      res.render('index', {
        pageTitle: 'Rijksflix',
        data: collection.artObjects,
        page: page,
      });
    })
    .catch(err => res.send(err))
})

app.get('/search', (req, res) => {
  rijksAPI = 'https://www.rijksmuseum.nl/api/nl/collection?key=C21U7KQu&ps=10&imgonly=true&q=' + req.query.q +'&p=';
  fetch(rijksAPI + page)
    .then(response => {
      return response.json()
    })
    .then(collection => {
      if(req.query.q == 0 || req.query.q == '') {
        res.render('index', {
          pageTitle: 'Rijksflix',
          data: collection.artObjects,
          page: page,
        });
      } else {
        res.render('search', {
          pageTitle: 'Rijksflix',
          data: collection.artObjects,
          page: page,
        });
      }  
    })
    .catch(err => res.send(err))
})

app.get(`/page`, (req, res) => {
  console.log(page)
  fetch(rijksAPI + req.params)
    .then(async response => {
      page++;
      const collection = await response.json();
      res.render('index', {
        pageTitle: 'Rijksflix',
        data: collection.artObjects,
        page: page,
      });
    })
    .catch(err => res.send(err))
})



