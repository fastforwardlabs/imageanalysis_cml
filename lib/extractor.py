
import logging
import os
import numpy as np
from lib.utils import image_array_from_dir, image_to_np_array


logger = logging.getLogger(__name__)


class Extractor():
    def __init__(self):
        self.valid_file_types = ["jpg", "png"]

    def extract(self, image_array, model):
        features = model.get_features(image_array)
        features = features.reshape(features.shape[0], -1)
        logger.info(">>> feature extraction complete.")
        return features

    def extract_from_dir(self, images_dir, model):
        logger.info(">>> Scanning folder to get files.")
        image_array, image_ids = image_array_from_dir(
            images_dir, model.image_size, self.valid_file_types)
        # print(image_array)
        features = self.extract(image_array, model)
        return features, image_ids
