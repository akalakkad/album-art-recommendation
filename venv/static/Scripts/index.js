import {query, suggest} from './engine.js';
import {login, reqSong} from './song.js';

document.addEventListener('DOMContentLoaded', e => {
  let token = '';
  let player = new Audio();


  login.then(result => {
    let b = document.querySelector('button');
    let recs = document.getElementsByClassName('rec-img');

    token = result;
    query();


    for(let r of recs) {
      r.addEventListener('click', e => {

        let current = document.getElementById('current');
        current.src = e.target.src;
        current.alt = e.target.alt;
        current.setAttribute("data-uri", e.target.getAttribute("data-uri"));

        let song = reqSong(e.target.getAttribute("data-uri").split(':')[2], token);
        song.then(result => {
          player.src = result;
          player.play();
        });

        let data = {index: e.target.alt};
        suggest(data);
      });
    }

    b.addEventListener('click', e => {
      query();
    });


  })
});
