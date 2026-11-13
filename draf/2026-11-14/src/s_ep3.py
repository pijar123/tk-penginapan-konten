import os, sys; os.environ['DUR']='21.4'
from snd import *
soft_bed(0,2.4,1.3); bed(9.2,start=2.5,vol=.85); soft_bed(9.3,12.4,1.3); bed(18.1,start=12.6,bpm=112); tada(18.3)
pop(0.1); notif(0.15); boing(0.4); whoosh(2.3); pop(2.5); pop(2.9); notif(3.3); whoosh(5.9); pop(6); tick(6.5); tick(6.68); tick(6.86); notif(7); tick(7.04); tick(7.22); tick(7.4); tick(7.58); tick(7.76); tick(7.94); notif(8); tick(8.12); tick(8.3); tick(8.48); whoosh(9.2); pop(9.3); tap(9.9); pop(10); notif(10.8); boing(11); whoosh(12.4); pop(12.7); whoosh(13.3); tap(14.2); tap(14.8); notif(15.2); chime(15.3); pop(15.4); pop(16.7); whoosh(18.1)
write(sys.argv[1])
