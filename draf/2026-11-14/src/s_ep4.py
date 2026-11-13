import os, sys; os.environ['DUR']='21.4'
from snd import *
bed(6.4,vol=.85); soft_bed(6.5,12.3,1.3); bed(18.1,start=12.5,bpm=112); tada(18.3)
pop(0.1); boing(0.5); whoosh(2.4); pop(2.6); whoosh(2.9); stamp(3.6); buzz(4.5,0.4); stamp(5.5); whoosh(6.4); pop(6.5); stamp(7.2); buzz(8,0.5); boing(8.1); stamp(9); pop(10.3); whoosh(12.3); pop(12.6); whoosh(13.2); ting(13.9); ting(14.6); chime(14.8); pop(15.3); pop(16.7); whoosh(18.1)
write(sys.argv[1])
