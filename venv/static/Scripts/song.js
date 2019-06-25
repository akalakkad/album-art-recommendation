export let login = new Promise(function(resolve, reject) {
  const scope = encodeURIComponent('user-read-email');

    let client_id = 'b96ccf539ef440dc8c9afc665890dc87';
    let redirect = encodeURIComponent('http://localhost:5000/auth');

    let url = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect}&scope=${scope}&response_type=token`;


    let w = window.open(url,
      'Spotify',
      'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + 450 + ', height=' + 730
    );

    let accessToken = '';

    w.onload = e => {
      let hash = e.currentTarget.location.hash;
      let elts = hash.split('&');
      accessToken = elts[0].split('=')[1];
    }

    setInterval(() => {
      resolve(accessToken);

    }, 1000);
});

export function reqSong(uri, token) {

  let url = `https://api.spotify.com/v1/tracks/${uri}`;

  return fetch(url, {method: 'GET', mode: 'cors', headers: {'Authorization': 'Bearer ' + token}})
              .then(response => {

                return response.json();
              })
              .then(result => {
                console.log({
                  track: result.name,
                  artist: result.artists[0].name,
                  url: result.preview_url
                });

                return new Promise(function(resolve, reject) {

                  setInterval(() => {
                    resolve(result.preview_url);
                  }, 1000);
                });
              });
}
