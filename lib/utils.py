from tensorflow.keras.preprocessing import image as imageprep
import os
import numpy as np


def image_to_np_array(img_path, image_size):
    img = imageprep.load_img(img_path, target_size=(image_size, image_size))
    img = imageprep.img_to_array(img)
    return img


def mkdir(dir_path):
    os.makedirs(dir_path, exist_ok=True)


def image_array_from_dir(dir_path, image_size, valid_file_types):
    image_paths = os.listdir(dir_path)
    image_paths = [file_ for file_ in image_paths if file_.split(
        ".")[1] in valid_file_types]
    image_holder = []
    for img_path in image_paths:
        img_path = os.path.join(dir_path, img_path)
        image_holder.append(image_to_np_array(img_path, image_size))
    return np.asarray(image_holder), image_paths
