//import functions
import { $ } from "../script.js";
import {starterResults} from "./renderData.js";
import {searchResults} from "./renderData.js";
import {removeliafterLoad} from "./states.js";
import {searchLoader} from "./states.js";

import {searchPage} from "../script.js";

const exploreWrap = $('.explore ul');
const rijksAPI = 'https://www.rijksmuseum.nl/api/nl/collection?key=C21U7KQu&ps=10&imgonly=true&p=';
const searchAPI = 'https://www.rijksmuseum.nl/api/nl/collection?key=C21U7KQu&ps=10&imgonly=true&q=';
let page = 1;

export function getartistData() {
    page = page + 1;
    fetch(rijksAPI + page)
    .then(function(response) {
        return response.json();
    })
    .then(function(collection) {
        console.log(collection)
        starterResults(collection);
    })
    .then(function() {
        exploreWrap.insertAdjacentHTML('beforeend', 
            `<li class="loading">
                <h3></h3>
                <p></p>
                <figure></figure>
            </li>`
        );	
    })
}

export function getsearchData() {
    if(searchPage == 1) {
        removeliafterLoad()
    }
    searchLoader()
    fetch(searchAPI + window.location.hash.slice(1) + '&p=' + searchPage)
    .then(function(response) {
        return response.json();
    })
    .then(function(collection) {
        console.log(collection)
        searchResults(collection);
    })
}



