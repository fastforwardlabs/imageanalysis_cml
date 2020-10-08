
import logging
import os
import numpy as np

logger = logging.getLogger(__name__)


class Loader():
    def __init__(self, num_workers=5):
        print("data loaded loaded")
        self.valid_types = ["jpg", "png"]

    def from_dir(self, dir_path):
        files = os.listdir(dir_path)
        files = [file_ for file_ in files if file_.split(
            ".")[1] in self.valid_types]
