from lib import Extractor
from lib import Model
from lib.utils import image_to_np_array
import numpy as np


images_dir = "app/build/assets/semsearch/datasets/fashion200/"
sample_image_path = images_dir + "/0.jpg"
efficientnet_model = Model(model_name="efficientnetb0")
extractor = Extractor()


def test_extract_dir():
    features, ids = extractor.extract_from_dir(images_dir, efficientnet_model)
    print(features.shape)
    assert len(ids) == 200 and features.shape == (200, 62720)


def test_extract():
    image_array = image_to_np_array(sample_image_path, 224)
    image_array = np.asarray([image_array])
    features = extractor.extract(image_array, efficientnet_model)
    assert features.shape == (1, 62720)
