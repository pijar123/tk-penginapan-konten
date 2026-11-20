import os, sys; os.environ['DUR']='30'
from snd import *
bed(26.3,vol=.8,bpm=108); tada(26.5)
pop(0.1); whoosh(2.5); pop(2.7); pop(3); tap(5.2); whoosh(6.55); pop(6.7); tap(8.2); ting(8.25); tap(8.9); ting(8.95); tap(10); whoosh(10.75); pop(10.9); tap(12.8); ting(12.85); tap(14.2); whoosh(15.15); pop(15.3); tap(16.4); chime(18.2); whoosh(19.75); pop(19.9); stamp(21.3); chime(21.5); whoosh(24.4); pop(25); jingle(25.1); whoosh(26.3)
write(sys.argv[1])
