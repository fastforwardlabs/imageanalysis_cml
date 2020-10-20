
from tensorflow.keras.applications import EfficientNetB0
import logging
import numpy as np

logger = logging.getLogger(__name__)


class Model():
    def __init__(self, model_name="efficientnetb0"):
        print("extractor loaded")

        if (model_name == "efficientnetb0"):
            self.model = EfficientNetB0(include_top=False)
            self.image_size = 224

    def get_features(self, img):
        features = self.model.predict(img)
        return features
