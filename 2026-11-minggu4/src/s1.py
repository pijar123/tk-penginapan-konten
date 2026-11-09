import os; os.environ['DUR']='19'
from snd import *
bed(15.75)
k=2
while k*np.pi/12<2.2:
    if k*np.pi/12>=.3: step(k*np.pi/12)
    k+=1
rumble(.3,1.9)
for t in (0.1,3.0,7.0,9.2,13.6): pop(t)
bell(2.25)
for t in (2.95,6.55,9.15,13.15,15.75): whoosh(t)
for t in (3.6,4.4): notif(t)
tap(5.2); add(sfx,5.25,tone(midi(79),.2,d=.06),.2)
stamp(5.95,64); buzz(5.95,.6)
boing(6.95)
tap(10.0); 
for t,m in ((10.6,76),(11.1,72),(11.6,79)): stamp(t,m)
tap(12.4); ting(12.5)
jingle(13.9); chime(14.65)
tada(15.85)
write(sys.argv[1])
