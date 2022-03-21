//Import functions
import { $ } from "../script.js";
import {removeLoader} from "./states.js";
import {getsearchData} from "./getData.js";

//Import variables
import { rectChecker, updateSearchPageNr } from "../script.js";


const exploreWrap = $('.explore ul');
const searchWrap = $('.search ul');
const noResults = $('.no-results');


export let listChecker;

export function starterResults(collection) {
    removeLoader();
    for(let i = 0; i < collection.artObjects.length; i++) {
        exploreWrap.insertAdjacentHTML('beforeend', 
            `<li>
                <h3>${collection.artObjects[i].title}</h3>
                <p>${collection.artObjects[i].principalOrFirstMaker}</p>
                <img src="${collection.artObjects[i].webImage.url.slice(0, -3)+"=s1000"}" alt="${collection.artObjects[i].title}">
            </li>`
        );
        exploreWrap.classList.remove('antiscroll');
    }
    listChecker = setInterval(rectChecker, 50);
}

export function searchResults(collection) {
    removeLoader();
    if(collection.artObjects.length == 0) {
        noResults.classList.remove('hide');
    } else {
        if(!noResults.classList.contains('hide')) {
            noResults.classList.add('hide');
        }
        for(let i = 0; i < collection.artObjects.length; i++) {
            searchWrap.insertAdjacentHTML('beforeend', 
                `<li>
                    <img src="${collection.artObjects[i].webImage.url.slice(0, -3)+"=s1000"}" alt="${collection.artObjects[i].title}">
                    <h3>${collection.artObjects[i].title}</h3>
                    <p>${collection.artObjects[i].principalOrFirstMaker}</p>
                </li>`
            );
        }
        searchWrap.insertAdjacentHTML('beforeend', 
            `<li class="loadmore">
                <img src="img/cross.png">
                <p>Load more results!</p>
            </li>`
        );  

        const loadMore = document.querySelector('.loadmore');

        console.log('loadmore excists')
        loadMore.addEventListener('click', function() {
            loadMore.remove()
            updateSearchPageNr(1);
            getsearchData()
        });
    }  
}