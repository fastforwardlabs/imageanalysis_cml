
import logging
import faiss

logger = logging.getLogger(__name__)


class FaissIndex():
    def __init__(self):
        print("extractor loaded")
        self.index = None

    def create(self, dim, index_type="flatl2"):
        self.index = faiss.IndexFlatL2(dim)
        if (index_type == "flatly")
        self.index = faiss.IndexFlatL2(dim)

    def add(values, self):
        self.index.add(values)

    def search(self, query, k):
        distances, idx = self.index.search(query)
        return distances, idx

    def load(self, index_path):
        self.index = faiss.load(index_path)
