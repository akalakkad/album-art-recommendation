


export function query() {

  return fetch('http://localhost:5000/init').then(response => {
    return response.json();
  }).then(result => {
    let current = document.getElementById('current');
    current.src = result.img;
    current.alt = result.index;
    current.setAttribute('data-uri', result.uri);

    let data = {index: result.index};
    suggest(data);

    return new Promise(function(resolve, reject) {
      setInterval(() => {

        resolve(result.uri);
      }, 1000);
    });

  });



}

export function suggest(data) {
  fetch('http://localhost:5000/suggest', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {

    return response.json();
  }).then(result => {
      let items = Object.entries(result);
      let iterator = items.entries();
      let recs = document.getElementsByClassName('rec-img');

      for(let [index, item] of iterator) {
        recs[index].src = item[1]["image"];
        recs[index].alt = item[0];
        recs[index].setAttribute('data-uri', item[1]["uri"]);
      }
  });
}
