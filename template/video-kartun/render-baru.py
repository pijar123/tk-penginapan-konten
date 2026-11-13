"""Render template baru (hidup.js + tokoh.js + latar.js).
Pakai:  python3 render-baru.py scene-baru.html 9 check      -> 6 frame cek (chk_*.png)
        python3 render-baru.py scene-baru.html 9 f          -> semua frame ke folder f/
Lalu:   ffmpeg -framerate 30 -i f/%04d.png -i out.wav ...   (lihat AI.md)"""
import sys, os
from playwright.sync_api import sync_playwright
html, dur, out = sys.argv[1], float(sys.argv[2]), sys.argv[3]
here = os.path.dirname(os.path.abspath(html))
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={'width': 1080, 'height': 1920})
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto('file://' + os.path.abspath(html)); pg.wait_for_timeout(600)
    if out == 'check':
        for k in range(6):
            t = round(dur * (k + .5) / 6, 2); pg.evaluate(f'setT({t})'); pg.screenshot(path=f'{here}/chk_{t}.png')
    else:
        os.makedirs(out, exist_ok=True)
        for i in range(int(dur * 30)):
            pg.evaluate(f'setT({i/30})'); pg.screenshot(path=f'{out}/{i:04d}.png')
    if errs: print('ERROR:', errs[:3])
    b.close()
