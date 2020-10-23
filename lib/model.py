
from tensorflow.keras.applications import EfficientNetB0
import logging
import numpy as np
from tensorflow.keras.models import Model as TFModel

logger = logging.getLogger(__name__)


class Model():
    def __init__(self, model_name="efficientnetb0"):
        if (model_name == "efficientnetb0"):
            self.model = EfficientNetB0(include_top=False)
            self.image_size = 224

    def get_features(self, image_array):
        features = self.model.predict(image_array)
        return features

    def get_layers(self):
        layer_details = [{"name": layer.name, "type": layer.__class__.__name__,
                          "parametercount": layer.count_params(), "layer_index": i,
                          "totallayers": len(self.model.layers)}
                         for (i, layer) in enumerate(self.model.layers)]
        return layer_details

    def get_intermediate_model(self, layer_name):
        intermediate_model = TFModel(
            inputs=self.model.input, outputs=self.model.get_layer(layer_name).output)
        return intermediate_model
