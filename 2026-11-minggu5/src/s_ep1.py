import os, sys; os.environ['DUR']='21.4'
from snd import *
bed(6.0,vol=.85); soft_bed(6.1,12.3,1.3); bed(18.1,start=12.5,bpm=112); tada(18.3)
pop(0.1); buzz(0.4,0.5); whoosh(2.4); notif(2.95); tap(3.2); pop(3.2); notif(3.45); tap(3.7); notif(3.95); tap(4.2); notif(4.45); tap(4.7); whoosh(6); bell(7.5); pop(7.6); pop(9.5); buzz(9.9,0.4); boing(10.6); pop(10.6); whoosh(12.3); pop(12.6); whoosh(13.2); stamp(13.9); stamp(14.3); stamp(14.7); chime(15); pop(15.3); bell(15.6); jingle(15.9); pop(16.7); whoosh(18.1)
write(sys.argv[1])
