
#
# @license
# Copyright 2020 Cloudera Fast Forward. https://github.com/fastforwardlabs
# DeepAd: Experiments detecting Anomalies with Deep Neural Networks https://ff12.fastforwardlabs.com/.
# Licensed under the MIT License (the "License");
# =============================================================================
#

import argparse
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS, cross_origin
import logging
import os
from lib import Model
from lib import FaissIndex
from lib import Extractor
from lib.utils import upload_to_np_array
import numpy as np
from PIL import Image

logging.basicConfig(level=logging.INFO)
index = {}
index["fashion200"] = FaissIndex(0, index_filename="fashion200.index")
index["iconic200"] = FaissIndex(0, index_filename="iconic200.index")

efficientnet_model = Model(model_name="efficientnetb0")
extractor = Extractor()
# Point Flask to the front end directory

root_file_path = os.getcwd() + "/app"
print(root_file_path, os.getcwd())
static_folder_root = os.path.join(root_file_path, "build")
print(static_folder_root)

app = Flask(__name__, static_url_path='',
            static_folder=static_folder_root, template_folder=static_folder_root)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

image_size = 224
k = 10


def get_similar(file, dataset_name):
    image_array = upload_to_np_array(file, image_size)
    image_array = np.asarray([image_array])
    features = extractor.extract(image_array, efficientnet_model)
    distances, idx = index[dataset_name].search(features, k)
    return distances, idx


@app.route('/')
def hello():
    return render_template('index.html')


@app.route('/search', methods=["GET", "POST"])
def search():
    result = {"distances": [], "ids": []}
    if request.method == 'POST':
        # check if the post request has the file part
        print(request.form)
        if 'file' in request.files:
            file = request.files['file']
            print(file)
            print(file.filename)
            distances, idx = get_similar(file, request.form["dataset"])
            print(distances, idx)
            result["distances"] = distances.tolist()[0]
            result["ids"] = idx.tolist()[0]
        else:
            print("no file found")

    return jsonify(result)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Application parameters')
    parser.add_argument('-p', '--port', dest='port', type=int,
                        help='port to run model', default=os.environ.get("CDSW_READONLY_PORT"))

    args, unknown = parser.parse_known_args()
    port = args.port
    app.run(port=port, debug=True)
