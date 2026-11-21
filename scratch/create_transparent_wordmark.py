from PIL import Image, ImageFilter
import numpy as np
from collections import deque

img = Image.open('public/images/ethora_tight_wordmark.png').convert('RGBA')
w, h = img.size
pixels = np.array(img)

# R, G, B, A
r = pixels[:, :, 0]
g = pixels[:, :, 1]
b = pixels[:, :, 2]

# Compute brightness / distance from dark background
# The purple glow border has high B or R (B > 60 or R > 40)
# Dark background has max(r, g, b) < 32 and (r + g + b) < 70
is_dark = (pixels[:, :, 0] < 35) & (pixels[:, :, 1] < 28) & (pixels[:, :, 2] < 45)

# BFS floodfill from all 4 borders to only remove OUTER dark pixels
visited = np.zeros((h, w), dtype=bool)
queue = deque()

# Add all 4 borders
for x in range(w):
    if is_dark[0, x]:
        queue.append((0, x))
        visited[0, x] = True
    if is_dark[h - 1, x]:
        queue.append((h - 1, x))
        visited[h - 1, x] = True

for y in range(h):
    if is_dark[y, 0]:
        queue.append((y, 0))
        visited[y, 0] = True
    if is_dark[y, w - 1]:
        queue.append((y, w - 1))
        visited[y, w - 1] = True

while queue:
    cy, cx = queue.popleft()
    for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
        ny, nx = cy + dy, cx + dx
        if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx]:
            if is_dark[ny, nx]:
                visited[ny, nx] = True
                queue.append((ny, nx))

# visited now marks all outer background pixels!
alpha = np.ones((h, w), dtype=np.uint8) * 255
alpha[visited] = 0

# Apply alpha mask
pixels[:, :, 3] = alpha

out_img = Image.fromarray(pixels, 'RGBA')

# Feather alpha slightly for smooth antialiasing
alpha_channel = out_img.split()[3].filter(ImageFilter.GaussianBlur(radius=0.7))
out_img.putalpha(alpha_channel)

out_img.save('public/images/ethora_wordmark_transparent.png')
print('Successfully saved ethora_wordmark_transparent.png!')
