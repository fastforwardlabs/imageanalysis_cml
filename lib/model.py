
from tensorflow.keras.applications import EfficientNetB0
import logging

logger = logging.getLogger(__name__)


class Model():
    def __init__(self, model_name="efficientnetb0"):
        print("extractor loaded")
        if (model_name == "efficientnetb0"):
            self.model = EfficientNetB0(
                include_top=False, weights='imagenet', input_tensor=None, input_shape=None,
            )
