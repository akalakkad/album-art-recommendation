import {query, suggest} from './engine.js';
import {login, reqSong} from './song.js';

document.addEventListener('DOMContentLoaded', e => {
  let token = '';
  login.then(result => {
    token = result;
    query();

    let b = document.querySelector('button');
    let recs = document.getElementsByClassName('rec-img');

    for(let r of recs) {
      r.addEventListener('click', e => {
        let current = document.getElementById('current');
        current.src = e.target.src;
        current.alt = e.target.alt;
        current.setAttribute("data-uri", e.target.getAttribute("data-uri"));

        reqSong(e.target.getAttribute("data-uri").split(':')[2], token);


        let data = {index: e.target.alt};
        suggest(data);
      });
    }

    b.addEventListener('click', e => {
      query();
    });


  })
});
