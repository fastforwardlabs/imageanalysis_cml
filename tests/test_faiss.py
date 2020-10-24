from lib import FaissIndex
import numpy as np


d = 64                           # dimension
nb = 100000                      # database size
nq = 10000                       # nb of queries
np.random.seed(1234)             # make reproducible
xb = np.random.random((nb, d)).astype('float32')
xb[:, 0] += np.arange(nb) / 1000.
xq = np.random.random((nq, d)).astype('float32')
xq[:, 0] += np.arange(nq) / 1000.

index = FaissIndex(dim=d)


def test_faiss_create():
    index.add(xb, ids=np.arange(xb.shape[0]))
    k = 6
    distances, idx = index.search(xb[:5], k)
    print(distances.shape, idx.shape)
    assert(distances.shape == (5, 6) and idx.shape == (5, 6))


def test_faiss_save():
    index.save("faiss_test.index")


def test_faiss_load():
    index.save("faiss_test.index")
