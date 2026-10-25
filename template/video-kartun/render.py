import sys, subprocess, os
from playwright.sync_api import sync_playwright
mode=sys.argv[1]; here=os.path.dirname(os.path.abspath(__file__))
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1080,'height':1920})
    pg.goto('file://'+here+'/scene.html'); pg.wait_for_timeout(500)
    if mode=='check':
        for t in [1.2,2.4,4.6,6.3,8.5]:
            pg.evaluate(f'setT({t})'); pg.screenshot(path=f'{here}/chk_{t}.png')
    else:
        os.makedirs(here+'/f',exist_ok=True); fps=30; N=int(9.0*fps)
        for i in range(N):
            pg.evaluate(f'setT({i/fps})'); pg.screenshot(path=f'{here}/f/{i:04d}.png')
    b.close()
