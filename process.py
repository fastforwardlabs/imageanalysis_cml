from lib import Model
from lib import FaissIndex


index = FaissIndex(0, index_dir="faiss/fashion200")
print(index.id_map["168"])
