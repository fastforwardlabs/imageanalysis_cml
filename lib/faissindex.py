
import logging
import faiss
import os
logger = logging.getLogger(__name__)


class FaissIndex():
    def __init__(self, dim, index_type="flatl2"):
        print("faiss loaded")
        if (index_type == "flatl2"):
            self.index = faiss.IndexFlatL2(dim)

    def add(self, values):
        self.index.add(values)

    def search(self, query, k):
        distances, idx = self.index.search(query, k)
        return distances, idx

    def load(self, load_dir):
        faiss.write_index(self.index, os.path.join(load_dir, "faiss.index"))

    def save(self, save_dir):
        faiss.write_index(self.index, os.path.join(save_dir, "faiss.index"))
