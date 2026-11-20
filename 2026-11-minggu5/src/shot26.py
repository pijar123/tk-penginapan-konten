import os
from playwright.sync_api import sync_playwright
from PIL import Image
here=os.path.dirname(os.path.abspath(__file__)); out=os.path.dirname(here); N=7
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1080,'height':1350})
    pg.goto('file://'+here+'/komik26.html'); pg.wait_for_timeout(400)
    for n in range(1,N+1):
        pg.evaluate(f'show({n})'); pg.wait_for_timeout(150); pg.screenshot(path=f'{here}/k.png'); Image.open(f'{here}/k.png').convert('RGB').save(f'{out}/26nov_{n}.jpg',quality=92)
    b.close()
ims=[Image.open(f'{out}/26nov_{n}.jpg') for n in range(1,N+1)]
W=Image.new('RGB',(540*4,675*2),'white')
for k,i in enumerate(ims): W.paste(i.resize((540,675)),((k%4)*540,(k//4)*675))
W.save(f'{here}/sheet26.jpg'); os.remove(f'{here}/k.png')
