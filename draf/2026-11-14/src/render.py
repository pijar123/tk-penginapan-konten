"""python3 render.py ep1.html check | f     -> frame cek (chk/) atau semua frame (f_ep1/) + skrip suara"""
import sys, os
from playwright.sync_api import sync_playwright
html, mode = sys.argv[1], sys.argv[2]; name = html[:-5]
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={'width': 1080, 'height': 1920})
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto('file://' + os.path.abspath(html)); pg.wait_for_timeout(700)
    dur = pg.evaluate('DUR')
    if mode == 'check':
        os.makedirs('chk', exist_ok=True)
        ts = [float(x) for x in sys.argv[3].split(',')] if len(sys.argv) > 3 else [round(dur * (k + .5) / 12, 2) for k in range(12)]
        for t in ts: pg.evaluate(f'setT({t})'); pg.screenshot(path=f'chk/{name}_{t:05.2f}.jpg', type='jpeg', quality=70)
    else:
        out = 'f_' + name; os.makedirs(out, exist_ok=True)
        for i in range(int(sys.argv[3]) if len(sys.argv) > 3 else int(dur * 30)): pg.evaluate(f'setT({i/30})'); pg.screenshot(path=f'{out}/{i:04d}.png')
        open(f's_{name}.py', 'w').write(f"import os, sys; os.environ['DUR']='{dur}'\nfrom snd import *\n{pg.evaluate('MUSIK')}\n{pg.evaluate('H.cuesPy()')}\nwrite(sys.argv[1])\n")
    print(name, dur, 'ERR' if errs else 'ok', errs[:3]); b.close()
