![pwa](https://user-images.githubusercontent.com/3104648/28351989-7f68389e-6c4b-11e7-9bf2-e9fcd4977e7a.png)

# Rijksflix - Progressive Web App

## Table of contents
- [Client-side vs Server-side](#client-side-vs-server-side)
- [Starting a local host](#starting-a-local-host)
- [Server-side rendering](#server-side-rendering)

## Client-side vs Server-side

### Client-side
Client-side is the side of the website that the user (client) has acces to. A client-side website normally contains static HTML, CSS and Javascript. The benefits of client-side scripts is that you have acces to the DOM. So you can fully controll almost everything the user does and use everything what the client browser offers.

### Server-side
Server-side is the side of the website that the user (client) can't control or has acces to. The down part is that you also can't controll what the user does and what the client browser offers. Server-side scripts process information on the web server when the user requests this information. The benefits of server-side is that it can load scripts before the web page is loaded. This gives you the opportunity to make login systems and cache some important files so that the page performance is good and the user can even use your website offline.

## Starting a local host
This is how I started with server-side rendering. Make sure to install `Node.js` on your device. After that make a project folder. Create for your project folder an `app.js` file and a `public` folder (this is the folder where you can put all your static files like your html, css and images).

### Now follow these steps:
1. Go to your command prompt and direct to your project folder
2. $ npm install
3. $ npm init
4. $ npm install express
5. fill out the information and press enter

If you want to automatically reload your local host on save you can also do: $ npm install nodemon. In your package.json file you can set the scripts to:

```
"scripts": {
    "start": "nodemon app.js"
  },
```

### Using the `app.js` you can start your own local host

```
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

**That's it! Now you can acces your site with [http://localhost:3000](http://localhost:3000)**

## Server-side rendering
I use `ejs` frameworks to render html (and eventually some javascript).

### My ejs folder structure
```
.
├── ...
├── views
│   ├── partials            *folder with reusable ejs files*
│   │   ├── head.ejs        *head of html*
│   │   ├── foot.ejs        *ending of html*
│   │   └── header.ejs      *the header of the page*
│   ├── index.ejs           *general ejs file*
│   ├── search.ejs          *specific section for searching*
│   └── explore.ejs         *specific section for the starterpage*
└── ...
```

### Loading explore page
```
app.get('/', (req, res) => {
  page = 1;
  fetch(rijksAPI + page)
    .then(response => response.json())
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
```

### Searching server side
```
app.get('/search', (req, res) => {
  rijksAPI = 'https://www.rijksmuseum.nl/api/nl/collection?key=C21U7KQu&ps=5&imgonly=true&q=' + req.query.q + '&p=';
  fetch(rijksAPI + page)
    .then(response => response.json())
    .then(collection => {
      if (req.query.q == 0 || req.query.q == '') {
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
```

### Paging on horizontal slider server side
This part is a bit tricky. I used `Promise.all` to first fetch all API's before rendering them.

```
app.get('/:page', (req, res) => {
  page = req.params.page;
  const range = [...Array(page - 1 + 1).keys()].map(x => x + 1);
  Promise.all(
    range.map(item => { 
      return fetch(rijksAPI + item).then(response => response.json())
    })
  )
  .then(collections => {
    const artObjects = collections.map(item => {
      return item.artObjects;
    }).flat();
    page++;
    res.render('index', {
      pageTitle: 'Rijksflix',
      data: artObjects,
      page: page,
    });
  })
  .catch(err => res.send(err))
})
```

## Service Worker
A service worker is a type of web worker. It's a JavaScript file that runs separately from the main browser thread, intercepting network requests and caching or getting resources from the caches.

### My Service Worker

#### Install Event

I used this event for adding files to the cache.
```
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            cache.addAll(cacheAssets);
        })
    )
})
```

#### Activate Event

Used this event for removing old caches so a newer version can be added.
```
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== cacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            )
        })
    );
});
```

#### Fetch Event

Used for sending the files from the cache to the client.
```
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(event.request.url, fetchRes.clone());
                    return fetchRes;
                })
            });
        })
    );
});
```

### Activity Diagram
![Activity Diagram](proces/activity-diagram.png)
 
## Enhancements for the critical rendering path

### Lighthouse
I started to generate a Lighthouse report to check the loading time. Here are a few points for improvement.

Image size I wanted to show large images on the homepage so I didn't resize them first. Because I wanted to show 25 images on the homepage, this was not really useful. I chose to shrink the images in the API with `.slice()` and `s=600` pixels.

I have a header image that ran quite large. I reduced it with [TinyPNG](https://tinypng.com/) and then reduced the resolution via Photoshop. This lowered the Largest Contentful Paint by a good 4 seconds.

### Compression package
At NPM you can download a Compression package. This packet ensures that the response body of the server is compressed so that it loads faster from the server to the client, and the user does not have to wait as long. I implemented this by requiring the package and app.use(compression).


![Performance at 99%](proces/performance.png)