from lib import FaissIndex
import numpy as np


def test_faiss():
    d = 64                           # dimension
    nb = 100000                      # database size
    nq = 10000                       # nb of queries
    np.random.seed(1234)             # make reproducible
    xb = np.random.random((nb, d)).astype('float32')
    xb[:, 0] += np.arange(nb) / 1000.
    xq = np.random.random((nq, d)).astype('float32')
    xq[:, 0] += np.arange(nq) / 1000.

    index = FaissIndex(dim=d)
    index.add(xb, ids=np.arange(xb.shape[0]))
    k = 6
    distances, idx = index.search(xb[:5], k)
    print(distances.shape, idx.shape)
    assert(distances.shape == (5, 6) and idx.shape == (5, 6))
