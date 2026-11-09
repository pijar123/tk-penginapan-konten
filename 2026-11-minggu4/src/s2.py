import os; os.environ['DUR']='21'
from snd import *
bed(17.35, bpm=100, chords=[[60,64,67,72],[57,60,64,69],[53,57,60,65],[55,59,62,67]], roots=[48,45,41,43])
whoosh(0.0,.4); buzz(0.9,.35)
for t in (0.1,2.8,6.6,10.4,14.0): pop(t)
# curtain swish
x=noise(1.2); add(sfx,3.4,(x-lowpass(x,.05))*np.sin(np.pi*np.arange(len(x))/len(x))*.25,1)
chime(4.5); ting(4.7)
whoosh(7.2,.9); ting(8.5)
for i in range(6): tick(11.0+i*.18)
ting(12.1); shutter(12.8)
whoosh(13.95); tap(15.8); notif(15.95); chime(16.0)
whoosh(17.35); tada(17.45)
write(sys.argv[1])
