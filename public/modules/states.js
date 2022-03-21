
import { $ } from "../script.js";
import { $$ } from "../script.js";


const searchWrap = $('.search ul');
const exploreSec = $('section:first-child');
const searchSec = $('.search');

export function searchLoader() {
    exploreSec.classList.add('hide');
    searchSec.classList.remove('hide');
    searchWrap.insertAdjacentHTML('beforeend', 
        `<li class="loading lastOne"></li>
        <li class="loading lastOne"></li>
        <li class="loading lastOne"></li>
        <li class="loading lastOne"></li>
        <li class="loading lastOne"></li>`
    );
}

export function removeLoader() {
    const loadingList = $$('.loading');
    for(let i = 0; i < loadingList.length; i++) {
        loadingList[i].remove();
    }
}

export function removeliafterLoad() {
    const listEl = $$('.search li');
    if(listEl != null) { 
        for(let i = 0; i < listEl.length; i++) {
            listEl[i].remove();
        }
    }
}