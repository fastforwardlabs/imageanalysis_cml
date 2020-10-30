from lib import Model
from lib import FaissIndex
from lib import Extractor
import numpy as np

fashion_images_dir = "app/build/assets/semsearch/datasets/fashion200/"
iconic_images_dir = "app/build/assets/semsearch/datasets/iconic200/"
efficientnet_model = Model(model_name="efficientnetb0")

extractor = Extractor()


def create_index(image_dir, index_dir):
    features, ids = extractor.extract_from_dir(image_dir, efficientnet_model)
    index = FaissIndex(features.shape[1])
    index.add(features, id_strings=ids)
    index.save(index_dir)


create_index(fashion_images_dir, "faiss/fashion200")
create_index(iconic_images_dir, "faiss/iconic200")
