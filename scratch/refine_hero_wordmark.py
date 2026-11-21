from PIL import Image, ImageFilter
import numpy as np

img = Image.open('public/images/ethora_wordmark_transparent.png').convert('RGBA')
w, h = img.size
arr = np.array(img)

# Let's inspect the top 20 rows
# Remove any small stray disconnected islands above y=15
# The main letters and their purple banner start around y=12-16
# Let's smooth out rows 0 to 14 where x is between the letters
mask = arr[:, :, 3] > 0

# Let's also add 20px padding around it so drop shadows and glowing filters in CSS don't get clipped!
padded = Image.new('RGBA', (w + 60, h + 50), (0, 0, 0, 0))
padded.paste(img, (30, 25), img)

# Save as public/images/ethora-hero-wordmark.png
padded.save('public/images/ethora-hero-wordmark.png', format='PNG')
print('Saved public/images/ethora-hero-wordmark.png successfully!')
