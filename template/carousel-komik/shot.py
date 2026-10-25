import os
from playwright.sync_api import sync_playwright
from PIL import Image
here=os.path.dirname(os.path.abspath(__file__))
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1080,'height':1350})
    pg.goto('file://'+here+'/komik.html'); pg.wait_for_timeout(400)
    for n in range(1,8):
        pg.evaluate(f'show({n})'); pg.wait_for_timeout(150)
        pg.screenshot(path=f'{here}/komik_{n}.png')
    b.close()
ims=[Image.open(f'{here}/komik_{n}.png').resize((432,540)) for n in range(1,8)]
W=Image.new('RGB',(432*4,540*2),'white')
for k,i in enumerate(ims): W.paste(i,((k%4)*432,(k//4)*540))
W.save(f'{here}/sheet.jpg')
