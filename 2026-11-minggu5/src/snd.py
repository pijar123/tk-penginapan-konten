import os, sys
from sfxlib import *
import sfxlib as L
music=L.music; sfx=L.sfx
def bed(end, bpm=105, chords=None, roots=None, vol=1.0, start=0.0):
    beat=60/bpm; bar=4*beat
    chords=chords or [[60,64,67,72],[55,59,62,67],[57,60,64,69],[53,57,60,65]]
    roots=roots or [48,43,45,41]
    ph=((1,1),(2,.35),(3,.15),(4,.06)); t=start; i=0
    while t<end:
        c=chords[i%len(chords)]
        for k in range(8):
            tt=t+k*beat/2
            if tt>=end: break
            add(music,tt,tone(midi(c[[0,1,2,3,2,1,2,3][k]]+12),.5,d=.16,harm=ph),.16*vol)
        for k in range(4):
            tt=t+k*beat
            if tt>=end: break
            add(music,tt,tone(midi(roots[i%len(roots)]),.5,d=.25,harm=((1,1),(2,.3))),.30*vol)
            if k in (0,2):
                n=int(.18*SR); tk=np.arange(n)/SR; f=120*np.exp(-tk*30)+45
                add(music,tt,np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-tk*18),.45*vol)
            h=noise(.05); h=h-lowpass(h,.3); add(music,tt+beat/2,h*env(len(h),.001,.015),.10*vol)
        t+=bar; i+=1
def soft_bed(t0,t1,vol=1.0):
    # slow night pads/music box
    seq=[72,76,79,76,74,77,81,77]; t=t0; k=0
    while t<t1:
        add(music,t,tone(midi(seq[k%8]),1.0,d=.5,harm=((1,1),(3,.15)),a=.003),.10*vol)
        if k%4==0: add(music,t,tone(midi([48,53][(k//4)%2]),2.2,d=1.2,harm=((1,1),(2,.3)),a=.2),.18*vol)
        t+=.5; k+=1
def tada(t):
    for m in [60,64,67,72,76]: add(music,t,tone(midi(m),1.1,d=.6,harm=((1,1),(2,.5),(3,.3),(4,.15)),a=.01),.13)
    add(music,t,tone(midi(36),1.1,d=.5,harm=((1,1),(2,.4))),.3)
def step(t):
    s=lowpass(noise(.07),.08)*env(int(.07*SR),.002,.018)+tone(95,.07,d=.02)*.6; add(sfx,t,s,.9)
def rumble(t,d): 
    r=lowpass(noise(d),.04); n=len(r); r*=np.minimum(1,np.minimum(np.arange(n)/(.2*SR),(n-np.arange(n))/(.3*SR))); add(sfx,t,r,.35)
def _pop():
    n=int(.09*SR); tt=np.arange(n)/SR; f=380+900*tt/.09
    return np.sin(2*np.pi*np.cumsum(f)/SR)*env(n,.002,.03)
def pop(t,g=.55): add(sfx,t,_pop(),g)
def bell(t): add(sfx,t,tone(2093,1.6,d=.5,harm=((1,1),(2.76,.35),(5.4,.12)),a=.001),.32)
def whoosh(t,d=.45):
    x=noise(d); n=len(x); lp=lowpass(x,.15); b=lp-lowpass(lp,.02); add(sfx,t,b*np.sin(np.pi*np.arange(n)/n)**2,1.6)
def stamp(t,m=76):
    add(sfx,t+.05,tone(110,.12,d=.04),.9); add(sfx,t+.05,noise(.012)*env(int(.012*SR),.0005,.004),.5)
    add(sfx,t+.08,tone(midi(m),.25,d=.08,harm=((1,1),(2,.25))),.30)
def jingle(t):
    for i in range(9): add(sfx,t+rng.uniform(0,.65),tone(rng.uniform(3200,6200),.12,d=.03,harm=((1,1),(1.5,.4)),a=.0005),.12)
def chime(t):
    for i,m in enumerate((84,88,91,96)): add(sfx,t+i*.07,tone(midi(m),.6,d=.25,harm=((1,1),(3,.2)),a=.002),.14)
def ting(t): add(sfx,t,tone(midi(88),.5,d=.18,harm=((1,1),(2.4,.3)),a=.001),.3); add(sfx,t+.08,tone(midi(95),.5,d=.2),.22)
def tap(t): add(sfx,t,tone(1800,.03,d=.008),.35); add(sfx,t,noise(.01)*env(int(.01*SR),.0005,.003),.25)
def notif(t): add(sfx,t,tone(midi(81),.18,d=.06),.28); add(sfx,t+.11,tone(midi(86),.3,d=.1),.28)
def buzz(t,d=.5):
    n=int(d*SR); tt=np.arange(n)/SR; s=np.sign(np.sin(2*np.pi*150*tt))*(np.sin(2*np.pi*14*tt)>0)*env(n,.005,d); add(sfx,t,lowpass(s,.2),.25)
def boing(t):
    n=int(.35*SR); tt=np.arange(n)/SR; f=220+180*np.sin(2*np.pi*9*tt)*np.exp(-tt*6); add(sfx,t,np.sin(2*np.pi*np.cumsum(f)/SR)*env(n,.003,.15),.35)
def shutter(t):
    for o in (0,.06): add(sfx,t+o,lowpass(noise(.03),.5)*env(int(.03*SR),.0005,.008),.6)
def tick(t): add(sfx,t,tone(2400,.02,d=.004),.25)
def snore(t,d=1.4):
    n=int(d*SR); tt=np.arange(n)/SR; e=np.sin(np.pi*tt/d)**2; s=lowpass(noise(d),.03)*e*(1+.6*np.sin(2*np.pi*45*tt)); add(sfx,t,s,.5)
def rooster(t):
    n=int(.9*SR); tt=np.arange(n)/SR; f=np.interp(tt,[0,.15,.3,.6,.9],[500,900,800,950,600]); add(sfx,t,np.sin(2*np.pi*np.cumsum(f)/SR)*np.sin(np.pi*tt/.9)*.6+0,.25)
def write(path, fadeout=.4):
    fade=np.ones(N); fl=int(fadeout*SR); fade[-fl:]=np.linspace(1,0,fl)
    mix=(music*.75+sfx)*fade; mix/=np.max(np.abs(mix))/.89
    st=np.stack([mix,mix],1); st[:,0]+=np.roll(music,220)*.02; st[:,1]-=np.roll(music,220)*.02
    st=np.clip(st,-1,1)
    with wave.open(path,'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st*32767).astype('<i2').tobytes())
