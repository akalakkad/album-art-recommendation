# Feature Extraction Script based on Python Notebook
# Referencing ML4A Feature Extraction/Reverse Image Search Tutorial

# import dependancies
import os
import keras
import numpy as np
import matplotlib.pyplot as plt
from keras.preprocessing import image
from keras.applications.imagenet_utils import decode_predictions, preprocess_input
from keras.models import Model
from PIL import Image

import random
from scipy.spatial import distance
from sklearn.decomposition import PCA

# Create VGG model with imagenet weights
model = keras.applications.VGG16(weights='imagenet', include_top=True)
model.summary()

# Function for loading and preprocessing imageset
def load_image(path):
  img = image.load_img(path, target_size=model.input_shape[1:3])
  x = image.img_to_array(img)
  x = np.expand_dims(x, axis=0)
  x = preprocess_input(x)
  return img, x

# Create feature extractor from fc2 activations
feat_extractor = Model(inputs=model.input, outputs=model.get_layer("fc2").output)
feat_extractor.summary()

# Image url array
path = "images"
images = []

# Iterate through images and append full path to image array
for img in sorted(os.listdir(path)):
  img_path = os.path.join(path,img)
  images.append(img_path)

# Feature array for extracted features
features = []

# Load each image from url array and extract features, append to feature array
for img in images:
  img,x = load_image(img)
  feat = feat_extractor.predict(x)[0]
  features.append(feat)

# Convert to np array and perform PCA analysis with size 300 components
features = np.array(features)
pca = PCA(n_components=300)
pca.fit(features)

# Transform feature array to 300 feature space
pca_features = pca.transform(features)

# save the pca feature vector
np.save('album_pca_features', pca_features)
