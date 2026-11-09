import os
from playwright.sync_api import sync_playwright
from PIL import Image
here=os.path.dirname(os.path.abspath(__file__)); os.makedirs(here+'/k19',exist_ok=True)
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1080,'height':1350})
    pg.goto('file://'+here+'/komik19.html'); pg.wait_for_timeout(400)
    for n in range(1,6):
        pg.evaluate(f'show({n})'); pg.wait_for_timeout(150); pg.screenshot(path=f'{here}/k19/19nov_{n}.png')
    b.close()
ims=[Image.open(f'{here}/k19/19nov_{n}.png') for n in range(1,6)]
for n,i in enumerate(ims,1): i.convert('RGB').save(f'{here}/k19/19nov_{n}.jpg',quality=92)
W=Image.new('RGB',(540*3,675*2),'white')
for k,i in enumerate(ims): W.paste(i.resize((540,675)),((k%3)*540,(k//3)*675))
W.save(f'{here}/k19/sheet.jpg')
