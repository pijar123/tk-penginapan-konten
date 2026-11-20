import sys, glob
from PIL import Image
fs = sorted(glob.glob(f'chk/{sys.argv[1]}_*.jpg')); n = len(fs); cols = 6; rows = (n + cols - 1) // cols
W, Hh = 270, 480; im = Image.new('RGB', (cols * W, rows * Hh), '#000')
for i, f in enumerate(fs): im.paste(Image.open(f).resize((W, Hh)), ((i % cols) * W, (i // cols) * Hh))
im.save(f'chk/sheet_{sys.argv[1]}.jpg', quality=80)
