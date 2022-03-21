//import functions
import { $ } from "../script.js";


const searchInput = $('header input');
const routerDirect = $('.search h2');

export function resultsRouter() {
    routerDirect.id = searchInput.value;
    window.location.hash = routerDirect.id;
}