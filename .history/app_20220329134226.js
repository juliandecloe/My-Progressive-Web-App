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
let page = 1;

app.get('/', (req, res) => {
  fetch(rijksAPI + page)
    .then(response => {
      return response.json()
    })
    .then(collection => {
      collection.artObjects.forEach(objects => {
        console.log(objects.objectNumber)
      })
      console.log(collection.artObjects[1].objectNumber)
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
      // page++;
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

app.get(`/page=${page}`, (req, res) => {
  fetch(rijksAPI + req.query.q)
    .then(async response => {
      const collection = await response.json();
      page++;
      res.render('index', {
        pageTitle: 'Rijksflix',
        data: collection.artObjects,
        page: page,
      });
    })
    .catch(err => res.send(err))
})



