import sys, os
from playwright.sync_api import sync_playwright
html,dur,out=sys.argv[1],float(sys.argv[2]),sys.argv[3]; ts=sys.argv[4:]
here=os.path.dirname(os.path.abspath(html))
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1080,'height':1920})
    pg.goto('file://'+os.path.abspath(html)); pg.wait_for_timeout(500)
    os.makedirs(out,exist_ok=True)
    if ts:
        for t in ts: pg.evaluate(f'setT({t})'); pg.screenshot(path=f'{out}/c_{t}.png')
    else:
        for i in range(int(dur*30)): pg.evaluate(f'setT({i/30})'); pg.screenshot(path=f'{out}/{i:04d}.png')
    b.close()
