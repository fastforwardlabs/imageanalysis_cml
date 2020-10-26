from lib import Model
from lib import FaissIndex
from lib import Extractor
import numpy as np

fashion_images_dir = "app/build/assets/semsearch/datasets/fashion200/"
iconic_images_dir = "app/build/assets/semsearch/datasets/iconic200/"
efficientnet_model = Model(model_name="efficientnetb0")

extractor = Extractor()


def create_index(image_dir, index_filename):
    features, ids = extractor.extract_from_dir(image_dir, efficientnet_model)
    index = FaissIndex(features.shape[1])
    index.add(features, ids=np.array(range(0, len(ids))))
    index.save(index_filename)


create_index(fashion_images_dir, "fashion200.index")
create_index(iconic_images_dir, "iconic200.index")
