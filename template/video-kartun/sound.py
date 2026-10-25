import numpy as np, wave, sys
SR = 44100
DUR = 9.0
N = int(SR * DUR)
rng = np.random.default_rng(7)
music = np.zeros(N)
sfx = np.zeros(N)

def add(buf, t0, sig, gain=1.0):
    i = int(t0 * SR)
    if i >= N: return
    j = min(N, i + len(sig))
    buf[i:j] += sig[: j - i] * gain

def env(n, a=0.005, d=0.3):
    t = np.arange(n) / SR
    e = np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / d)
    return e

def tone(freq, dur, d=0.3, harm=((1, 1),), a=0.004):
    n = int(dur * SR); t = np.arange(n) / SR
    s = sum(g * np.sin(2 * np.pi * freq * h * t) for h, g in harm)
    return s * env(n, a, d)

def lowpass(x, k):
    # simple one-pole lowpass, k in (0,1]
    y = np.zeros_like(x); acc = 0.0
    for i, v in enumerate(x):
        acc += k * (v - acc); y[i] = acc
    return y

def noise(dur):
    return rng.standard_normal(int(dur * SR))

def midi(m): return 440 * 2 ** ((m - 69) / 12)

# ---------- music bed: 105 bpm, C - G - Am - F ----------
bpm = 105; beat = 60 / bpm; bar = 4 * beat
chords = [[60, 64, 67, 72], [55, 59, 62, 67], [57, 60, 64, 69], [53, 57, 60, 65]]
roots = [48, 43, 45, 41]
pluck_h = ((1, 1), (2, 0.35), (3, 0.15), (4, 0.06))
t = 0.0; idx = 0
end_music = 7.85
while t < end_music:
    c = chords[idx % 4]
    for k in range(8):  # 8th-note arpeggio
        tt = t + k * beat / 2
        if tt >= end_music: break
        note = c[[0, 1, 2, 3, 2, 1, 2, 3][k]] + 12
        add(music, tt, tone(midi(note), 0.5, d=0.16, harm=pluck_h), 0.16)
    for k in range(4):
        tt = t + k * beat
        if tt >= end_music: break
        add(music, tt, tone(midi(roots[idx % 4]), 0.5, d=0.25, harm=((1, 1), (2, 0.3))), 0.30)
        if k in (0, 2):  # soft kick
            n = int(0.18 * SR); tk = np.arange(n) / SR
            f = 120 * np.exp(-tk * 30) + 45
            add(music, tt, np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tk * 18), 0.45)
        # hat on offbeat
        h = noise(0.05); h = h - lowpass(h, 0.3)
        add(music, tt + beat / 2, h * env(len(h), 0.001, 0.015), 0.10)
    t += bar; idx += 1

# ta-da at 7.9: bright C major chord, sustained
for m in [60, 64, 67, 72, 76]:
    add(music, 7.9, tone(midi(m), 1.1, d=0.6, harm=((1, 1), (2, 0.5), (3, 0.3), (4, 0.15)), a=0.01), 0.13)
add(music, 7.9, tone(midi(36), 1.1, d=0.5, harm=((1, 1), (2, 0.4))), 0.3)

# ---------- SFX ----------
# footsteps while guest walks (0.3-2.2), steps at zero crossings of sin(12t)
k = 2
while True:
    ts = k * np.pi / 12
    if ts > 2.2: break
    if ts >= 0.3:
        s = lowpass(noise(0.07), 0.08) * env(int(0.07 * SR), 0.002, 0.018)
        s += tone(95, 0.07, d=0.02) * 0.6
        add(sfx, ts, s, 0.9)
    k += 1
# suitcase wheel rumble during walk
r = lowpass(noise(1.9), 0.04)
r *= np.minimum(1, np.minimum(np.arange(len(r)) / (0.2 * SR), (len(r) - np.arange(len(r))) / (0.3 * SR)))
add(sfx, 0.3, r, 0.35)

# caption pops
def pop():
    n = int(0.09 * SR); tt = np.arange(n) / SR
    f = 380 + 900 * tt / 0.09
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.002, 0.03)
for ts in (0.1, 2.6, 5.2):
    add(sfx, ts, pop(), 0.55)

# desk bell
add(sfx, 2.25, tone(2093, 1.6, d=0.5, harm=((1, 1), (2.76, 0.35), (5.4, 0.12)), a=0.001), 0.32)

# whooshes
def whoosh(dur=0.4, rise=True):
    x = noise(dur); n = len(x)
    lp = lowpass(x, 0.15); band = lp - lowpass(lp, 0.02)
    e = np.sin(np.pi * np.arange(n) / n) ** 2
    return band * e
for ts in (2.55, 4.95, 7.35):
    add(sfx, ts, whoosh(0.45), 1.6)

# "Penuh" stamps: thump + rising blip
for ts, m in ((3.3, 76), (3.75, 79), (4.2, 83)):
    add(sfx, ts + 0.05, tone(110, 0.12, d=0.04), 0.9)
    clk = noise(0.012) * env(int(0.012 * SR), 0.0005, 0.004)
    add(sfx, ts + 0.05, clk, 0.5)
    add(sfx, ts + 0.08, tone(midi(m), 0.25, d=0.08, harm=((1, 1), (2, 0.25))), 0.30)

# key jingle
for i in range(9):
    ts = 5.5 + rng.uniform(0, 0.65)
    f = rng.uniform(3200, 6200)
    add(sfx, ts, tone(f, 0.12, d=0.03, harm=((1, 1), (1.5, 0.4)), a=0.0005), 0.12)

# sparkle chime
for i, m in enumerate((84, 88, 91, 96)):
    add(sfx, 6.25 + i * 0.07, tone(midi(m), 0.6, d=0.25, harm=((1, 1), (3, 0.2)), a=0.002), 0.14)

# ---------- mix ----------
fade = np.ones(N); fl = int(0.4 * SR); fade[-fl:] = np.linspace(1, 0, fl)
mix = (music * 0.75 + sfx) * fade
mix /= np.max(np.abs(mix)) / 0.89
st = np.stack([mix, mix], axis=1)
# tiny stereo width on music
st[:, 0] += np.roll(music, 220) * 0.02
st[:, 1] -= np.roll(music, 220) * 0.02
st = np.clip(st, -1, 1)
with wave.open(sys.argv[1], 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((st * 32767).astype('<i2').tobytes())
print('ok')
