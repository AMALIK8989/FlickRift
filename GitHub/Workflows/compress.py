from PIL import Image
import os

image_formats = ('.png', '.jpg', '.jpeg', '.tiff')

def compress_image(file_path, quality=80):
    with Image.open(file_path) as img:
        img.save(file_path, quality=quality, optimize=True)

for root, _, files in os.walk('.'):
    for file in files:
        if file.lower().endswith(image_formats):
            file_path = os.path.join(root, file)
            compress_image(file_path)

print("Image compression completed.")
