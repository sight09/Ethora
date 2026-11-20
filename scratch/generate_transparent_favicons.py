import os
from PIL import Image

src_path = "public/ethora-logo.png"
if not os.path.exists(src_path):
    raise FileNotFoundError("Source logo not found at " + src_path)

img = Image.open(src_path).convert("RGBA")

# 1. Generate icon.png (512x512)
icon_512 = img.resize((512, 512), Image.Resampling.LANCZOS)
icon_512.save("public/icon.png", format="PNG")
icon_512.save("src/app/icon.png", format="PNG")
print("Saved 512x512 icon.png to public/ and src/app/")

# 2. Generate apple-icon.png (180x180)
icon_180 = img.resize((180, 180), Image.Resampling.LANCZOS)
icon_180.save("src/app/apple-icon.png", format="PNG")
print("Saved 180x180 apple-icon.png to src/app/")

# 3. Generate favicon.ico with multiple sizes (16, 32, 48, 64)
# Pillow supports writing multi-size ICO directly
img.save("public/favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
img.save("src/app/favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
print("Saved multi-size favicon.ico to public/ and src/app/")
