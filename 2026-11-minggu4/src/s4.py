import os; os.environ['DUR']='20'
from snd import *
soft_bed(0.0,3.7,1.0); soft_bed(3.6,11.2,.8)
bed(16.25,bpm=110,start=11.6)
pop(0.1); snore(0.4,1.4); snore(2.2,1.4)
for i in range(4): tick(0.2+i*.9)
whoosh(3.55); pop(3.6); notif(4.1)
for t in (4.6,5.1,5.6,6.7,7.4,8.9): tap(t)
whoosh(5.95,.3); whoosh(7.75,.3); ting(9.4); chime(9.5)
whoosh(11.1,.7); rooster(11.7); pop(11.6); boing(12.0)
notif(12.6); ting(13.0); chime(13.05)
pop(14.8); whoosh(16.25); tada(16.35)
write(sys.argv[1])
