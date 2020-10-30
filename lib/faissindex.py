
from lib.utils import mkdir, load_json_file, save_json_file
import logging
import faiss
import os
import numpy as np
logger = logging.getLogger(__name__)


class FaissIndex():
    def __init__(self, dim, index_type="flatip", index_dir=None):
        self.index_type = index_type
        self.id_map = {}

        if (index_dir):
            self.load(index_dir)
        else:
            if (index_type == "flatip"):
                # self.index = faiss.IndexFlatL2(dim)
                self.index = faiss.IndexIDMap(faiss.IndexFlatIP(dim))
            if (index_type == "flatl2"):
                self.index = faiss.IndexFlatL2(dim)

    def add(self, values, id_strings=None):
        if self.index_type == "flatl2":
            self.index.add(values)
        elif self.index_type == "flatip":
            id_keys = range(self.index.ntotal, len(id_strings))
            self.index.add_with_ids(values, np.array(id_keys))
            self.update_id_map(id_keys, id_strings)

    def update_id_map(self, id_keys, id_strings):
        new_id_map = dict(zip(id_keys, id_strings))
        self.id_map = {**self.id_map, **new_id_map}

    def decode_ids(self, ids):
        id_strings = [self.id_map[str(id)] for id in ids]
        return id_strings

    def search(self, query, k):
        distances, idx = self.index.search(query, k)
        return distances, idx

    def load(self, load_dir="faiss"):
        self.index = faiss.read_index(os.path.join(load_dir, "faiss.index"))
        self.id_map = load_json_file(
            os.path.join(load_dir, "faiss.map"))

    def save(self, save_dir="faiss"):
        mkdir(save_dir)
        faiss.write_index(self.index, os.path.join(save_dir, "faiss.index"))
        save_json_file(os.path.join(save_dir,  "faiss.map"), self.id_map)
