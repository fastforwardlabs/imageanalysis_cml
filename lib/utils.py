from tensorflow.keras.preprocessing import image as imageprep


def image_to_array(img_path, image_size):
    img = imageprep.load_img(img_path, target_size=(image_size, image_size))
    img = imageprep.img_to_array(img)
    return img
