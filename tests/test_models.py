
from lib.model import Model
from lib.utils import image_to_np_array
import numpy as np
from tensorflow.keras.models import Model as TFModel


def test_model():
    sample_image_path = "app/build/assets/semsearch/datasets/fashion200/0.jpg"
    efficientnet_model = Model()

    image_array = image_to_np_array(
        sample_image_path, efficientnet_model.image_size)
    features = efficientnet_model.get_features(np.asarray([image_array]))
    assert(features.shape == (1, 7, 7, 1280))


def test_intermediate_model():
    efficientnet_model = Model()
    layer_details = efficientnet_model.get_layers()
    layer_name = layer_details[len(layer_details)-2]["name"]
    intermediate_model = efficientnet_model.get_intermediate_model(layer_name)

    print(intermediate_model.__class__.__name__)
