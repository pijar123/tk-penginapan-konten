import os, sys; os.environ['DUR']='21.4'
from snd import *
bed(6.4,vol=.85); soft_bed(6.5,12.3,1.3); bed(18.1,start=12.5,bpm=112); tada(18.3)
pop(0.1); tick(0.6); tick(1.6); whoosh(2.4); pop(2.6); whoosh(2.9); tap(3.5); tap(3.7); stamp(3.9); tap(4.4); stamp(4.7); buzz(5.4,0.4); boing(5.5); whoosh(6.4); pop(6.6); rumble(7,1.6); pop(7.7); whoosh(9.6); pop(10.3); snore(10.8,1.4); whoosh(12.3); pop(12.6); whoosh(13.2); ting(13.9); ting(14.3); ting(14.7); chime(15); pop(15.3); pop(16.7); whoosh(18.1)
write(sys.argv[1])
