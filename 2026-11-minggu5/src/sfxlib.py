import numpy as np, wave, sys
SR = 44100
DUR = float(__import__("os").environ.get("DUR","9"))
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

