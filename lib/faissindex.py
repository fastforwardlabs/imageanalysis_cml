
from lib.utils import mkdir
import logging
import faiss
import os
logger = logging.getLogger(__name__)


class FaissIndex():
    def __init__(self, dim, index_type="flatip", index_filename=None):
        self.index_type = index_type

        if (index_filename):
            self.load(index_filename)
        else:
            if (index_type == "flatip"):
                # self.index = faiss.IndexFlatL2(dim)
                self.index = faiss.IndexIDMap(faiss.IndexFlatIP(dim))
            if (index_type == "flatl2"):
                self.index = faiss.IndexFlatL2(dim)

    def add(self, values, ids=None):
        if self.index_type == "flatl2":
            self.index.add(values)
        elif self.index_type == "flatip":
            self.index.add_with_ids(values, ids)

    def search(self, query, k):
        distances, idx = self.index.search(query, k)
        return distances, idx

    def load(self, file_name, load_dir="faiss"):
        self.index = faiss.read_index(os.path.join(load_dir, file_name))

    def save(self, file_name, save_dir="faiss"):
        mkdir(save_dir)
        faiss.write_index(self.index, os.path.join(save_dir, file_name))
