import os, sys; os.environ['DUR']='21'
from snd import *
bed(18.6,bpm=112,start=0.0,vol=.9)
pop(0.1); pop(0.5); pop(0.8); buzz(1.25,.5); whoosh(2.0)
pop(2.7); pop(3.6); tap(4.15); tap(4.6); ting(5.05); chime(5.1)
whoosh(6.0); pop(6.6); pop(7.6)
for t in (8.05,8.55,9.05): tap(t); tick(t+.05)
ting(9.3); chime(9.35); pop(9.45)
whoosh(10.5); notif(11.25); notif(11.85); ting(12.5); chime(12.55); pop(12.9)
whoosh(14.5); buzz(15.25,.5); pop(15.7)
whoosh(17.4); pop(17.95); pop(18.03); pop(18.11); whoosh(18.7); tada(18.8)
write(sys.argv[1])
