import {query, suggest} from './engine.js';
import {login, reqSong} from './song.js';

document.addEventListener('DOMContentLoaded', e => {
  let token = '';
  let player = new Audio();

  login.then(result => {
    let play = document.getElementById('play');
    let pause = document.getElementById('pause');
    let shuffle = document.getElementById('shuffle');
    let recs = document.getElementsByClassName('rec-img');
    let current = document.getElementById('current');

    token = result;
    query().then(uri => {
      let s = reqSong(uri.split(':')[2], token);
      s.then(result => {
        player.src = result;
      });
    });


    for(let r of recs) {
      r.addEventListener('click', e => {


        current.src = e.target.src;
        current.alt = e.target.alt;
        current.setAttribute("data-uri", e.target.getAttribute("data-uri"));

        let song = reqSong(e.target.getAttribute("data-uri").split(':')[2], token).then(result => {
          player.src = result;
          player.play();
        });

        let data = {index: e.target.alt};
        suggest(data);
      });
    }

    shuffle.addEventListener('click', e => {
      query().then(uri => {
        let s = reqSong(uri.split(':')[2], token).then(result => {
          player.src = result;
          player.play();
        });
      });
    });

    play.addEventListener('click', e => {
      if(player.src == '') {
        let s = reqSong(current.getAttribute('data-uri').split(':')[2], token).then(result => {
          player.src = result;
          player.play();
        });
      } else {
        player.play();
      }
    });

    pause.addEventListener('click', e => {
      player.pause();
    });

  })
});
