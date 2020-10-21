from lib import Model
from lib import FaissIndex
from lib import Extractor
import numpy as np

images_dir = "app/build/assets/semsearch/datasets/fashion200/"
efficientnet_model = Model(model_name="efficientnetb0")

extractor = Extractor()
features, ids = extractor.extract(images_dir, efficientnet_model)

index = FaissIndex(features.shape[1])
index.add(features, ids=np.array(range(0, len(ids))))
index.save("faiss")
