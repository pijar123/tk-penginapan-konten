import os, sys; os.environ['DUR']='21.4'
from snd import *
bed(5.9,vol=.85); soft_bed(6.0,12.3,1.3); bed(18.1,start=12.5,bpm=112); tada(18.3)
pop(0.1); whoosh(2.4); whoosh(2.8); pop(2.9); tick(3.6); tick(4.2); tick(4.8); whoosh(5.6); pop(6); pop(6.6); tap(7); tap(7.31); tap(7.63); tap(7.94); tap(8.26); pop(9.5); pop(9.7); boing(10.7); pop(10.7); whoosh(12.3); pop(12.6); whoosh(13.2); tick(14.3); stamp(14.85); chime(15); pop(15.3); notif(15.6); pop(16.7); whoosh(18.1)
write(sys.argv[1])
