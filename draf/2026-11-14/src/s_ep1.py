import os, sys; os.environ['DUR']='21.6'
from snd import *
bed(5.9,vol=.85); soft_bed(6.0,12.5,1.3); bed(18.3,start=12.7,bpm=112); tada(18.5)
pop(0.1); buzz(0.25,0.6); buzz(1.15,0.6); whoosh(2); pop(2.6); notif(2.75); notif(3.2); notif(3.6); notif(4); notif(4.4); whoosh(5.95); pop(6); pop(6.5); whoosh(8.4); pop(9.6); notif(9.75); boing(9.95); whoosh(12.5); pop(12.8); whoosh(13.3); tap(14.5); notif(15.2); chime(15.3); pop(15.4); pop(16.9); whoosh(18.3)
write(sys.argv[1])
