from flask import Flask, request, jsonify, send_file
from rec_engine import pca_features, img_set, query, recommend, prep_image
from PIL import Image
import json


app = Flask(__name__, static_url_path='')

@app.route('/')
def root():
    return app.send_static_file('index.html')

@app.route('/init')
def init():
    q = query(img_set)
    img = Image.open(img_set[q])
    imgURL = prep_image(img)
    return jsonify(index=q, img=imgURL)


@app.route('/suggest', methods=['POST'])
def suggest():
    data = json.loads(request.data)
    idx = int(data["index"])
    data = recommend(idx, img_set)
    return jsonify(data)

@app.after_request
def add_header(response):
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response
