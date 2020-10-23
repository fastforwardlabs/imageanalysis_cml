from lib import Extractor
from lib import Model
import numpy as np


def test_extract():
    efficientnet_model = Model(model_name="efficientnetb0")
    sample_image_path = "app/build/assets/semsearch/datasets/fashion200/0.jpg"
    images_dir = "app/build/assets/semsearch/datasets/fashion200/"
    extractor = Extractor()

    features, ids = extractor.extract_from_dir(images_dir, efficientnet_model)
    print(ids)
