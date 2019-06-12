# Reccomendation engine for selecting similar album covers

# Importing modules
import os
import numpy as np
from scipy.spatial import distance
import matplotlib.pyplot as plt
import random
from PIL import Image

# Load images from image set, ignoring .DS_Store
def load_images(p):
    images = []

    for img in sorted(os.listdir(p)):
        img_path = os.path.join(p, img)
        if(img_path != 'images/.DS_Store'):
            images.append(img_path)

    return images

# Query function selects random image returns index of image and image itself
def query(set):
    query_idx = int(len(set) * random.random())
    img = Image.open(set[query_idx])
    img.resize((int(img.width * 100 / img.height), 100))

    return query_idx,img

# Recommend function references query image's feature vector from pca feature set
# Calculates distance between query features and features of all other images
# Sorts and returns the closest five album covers
def recommend(idx, q, set):

    rec_idx = [distance.cosine(pca_features[idx], feat) for feat in pca_features]
    idx_closest = sorted(range(len(rec_idx)), key=lambda k: rec_idx[k])[1:6]

    thumbs = []
    thumbs.append(q)

    for i in idx_closest:
        img = Image.open(set[i])
        img.resize((int(img.width * 100 / img.height), 100))
        thumbs.append(img)

    concat_img = np.concatenate([np.asarray(t) for t in thumbs], axis=1)
    plt.figure(figsize=(16,12))
    plt.imshow(concat_img)
    plt.show()

# Loading pca_features
pca_features = np.load('album_pca_features.npy')

# Loading images
img_set = load_images("images")

# Querying image and recommending new album covers
q,img = query(img_set)
recommend(q, img, img_set)
