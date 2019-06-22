# Simple script to download album covers from Spotify
# Using only albums authored by Spotify to simplfy the process

import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import requests
from authentication import client_id, client_secret

# Client Authentication
client_credentials_manager = SpotifyClientCredentials(client_id = client_id, client_secret = client_secret)
sp = spotipy.Spotify(client_credentials_manager = client_credentials_manager)

# URIs for Global and US Top 50 and Global and US Viral 50
# To create an new image set, just paste in the urls of playlists
# you want to scrape album artwork from
uris = ['spotify:playlist:37i9dQZEVXbLRQDuF5jeBp',
'spotify:playlist:37i9dQZEVXbMDoHDwVN2tF',
'spotify:playlist:37i9dQZEVXbLiRSasKsNU9',
'spotify:playlist:37i9dQZEVXbKuaTI1Z1Afx',
'spotify:playlist:37i9dQZF1DX1gRalH1mWrP',
'spotify:playlist:37i9dQZF1DX5Ozry5U6G0d',
'spotify:playlist:37i9dQZF1DXdbXrPNafg9d',
'spotify:playlist:37i9dQZF1DXa71eg5j9dKZ',
'spotify:playlist:37i9dQZF1DX6z20IXmBjWI']

# Download function assigns image name and saves to folder
def download(url, name):
    img_data = requests.get(url).content
    with open('images/' + str(name) + '.jpeg', 'wb') as handler:
        handler.write(img_data)

# Iterate through the URI's and download all the album artwork for each playlist
for uri in uris:
    results = sp.user_playlist('spotify', uri)
    for track in results['tracks']['items']:
        download(track['track']['album']['images'][0]['url'], track['track']['uri'])
