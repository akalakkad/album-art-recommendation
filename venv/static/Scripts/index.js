import {query, suggest} from './engine.js';

document.addEventListener('DOMContentLoaded', e => {

  query();
});

let b = document.querySelector('button');
let recs = document.getElementsByClassName('rec-img');


for(let r of recs) {
  r.addEventListener('click', e => {
    let current = document.getElementById('current');
    current.src = e.target.src;
    current.alt = e.target.alt;

    let data = {index: e.target.alt};
    suggest(data);
  });
}

b.addEventListener('click', e => {
  query();
});
