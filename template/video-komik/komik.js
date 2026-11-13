/* komik.js — bahan "komik bergerak" untuk video @tk.penginapan.
 * Butuh hidup.js. Semua fungsi mengembalikan string SVG dan bergantung pada t (detik).
 *
 *   K.defs()                  filter garis tepi tebal (#Kol) + pola titik halftone. Tempel sekali di <svg>.
 *   K.panel(el, t, tempat, isi)  satu panel komik 960x1180: bingkai, isi terpotong rapi, balon boleh keluar bingkai.
 *        tempat = {x, y, s, r, blur}   posisi tengah panel di layar
 *        isi    = {bg, ch, fg, fokus, cx, cy}
 *                 bg = latar (jadi buram saat fokus), ch = tokoh (tajam + garis tepi), fg = balon/kartu/SFX
 *                 fokus 0..1 = seberapa kuat latar diburamkan dan kamera mendekat ke titik (cx, cy)
 *   K.balon(t, mulai, selesai, {x, y, lines, tail:[x,y]})   balon kata, kata muncul satu per satu
 *   K.narasi(t, mulai, selesai, {x, y, text})               kotak narasi kuning
 *   K.sfx(t, mulai, durasi, {x, y, text})                   tulisan efek ala komik: "TAP!", "TING!", "BZZT!"
 *   K.garisFokus(t, {cx, cy})                               garis aksi yang mengarah ke satu titik
 *   K.cincin(t, mulai, x, y, r, warna)                      cincin ketukan
 */
(function () {
  const K = {}, NAVY = '#16202A';
  K.W = 960; K.H = 1180;
  K.txt = (x, y, s, str, fill = NAVY, anchor = 'start', w = 700, extra = '') => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="P" font-weight="${w}" font-size="${s}" fill="${fill}" ${extra}>${str}</text>`;

  K.defs = () => `<defs>
    <filter id="Kol" x="-15%" y="-15%" width="130%" height="130%"><feMorphology in="SourceAlpha" operator="dilate" radius="4.5" result="d"/><feFlood flood-color="${NAVY}"/><feComposite in2="d" operator="in" result="o"/><feMerge><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <pattern id="Kht" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><circle cx="14" cy="14" r="5.5" fill="#fff" opacity=".07"/></pattern>
    <pattern id="KhtD" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><circle cx="10" cy="10" r="3.2" fill="${NAVY}" opacity=".07"/></pattern>
    <pattern id="Kkw" width="88" height="88" patternUnits="userSpaceOnUse"><g fill="#000" opacity=".045"><ellipse cx="44" cy="20" rx="10" ry="18"/><ellipse cx="44" cy="68" rx="10" ry="18"/><ellipse cx="20" cy="44" rx="18" ry="10"/><ellipse cx="68" cy="44" rx="18" ry="10"/></g></pattern>
  </defs>`;

  K.panel = (el, t, p, c) => {
    if (!p) { el.setAttribute('display', 'none'); el.innerHTML = ''; return; }
    el.removeAttribute('display');
    el.setAttribute('transform', `translate(${p.x},${p.y}) rotate(${p.r || 0}) scale(${p.s}) translate(${-K.W / 2},${-K.H / 2})`);
    el.style.filter = p.blur > .4 ? `blur(${p.blur.toFixed(1)}px)` : 'none';
    const id = 'Kc' + el.id, f = c.fokus || 0, z = 1 + .07 * f, cx = c.cx || 480, cy = c.cy || 590;
    el.innerHTML = `<clipPath id="${id}"><rect width="${K.W}" height="${K.H}" rx="30"/></clipPath>
      <rect x="16" y="20" width="${K.W}" height="${K.H}" rx="30" fill="#000" opacity=".38"/>
      <g clip-path="url(#${id})"><g transform="translate(${cx},${cy}) scale(${z}) translate(${-cx},${-cy})">
        <g ${f > .05 ? `style="filter:blur(${(6 * f).toFixed(1)}px)"` : ''}>${c.bg}</g>
        <rect width="${K.W}" height="${K.H}" fill="url(#KhtD)"/>
        ${f > .05 ? `<rect width="${K.W}" height="${K.H}" fill="${NAVY}" opacity="${.12 * f}"/>` : ''}
        <g filter="url(#Kol)">${c.ch}</g></g>${c.mid || ''}</g>
      <rect width="${K.W}" height="${K.H}" rx="30" fill="none" stroke="${NAVY}" stroke-width="18"/>
      <rect x="9" y="9" width="${K.W - 18}" height="${K.H - 18}" rx="22" fill="none" stroke="#FCF5EB" stroke-width="5"/>
      ${c.fg || ''}`;
  };

  K.balon = (t, a, b, o) => {
    if (t < a || t > b) return '';
    const { x, y, lines, size = 46, tail, fill = '#fff' } = o;
    const kin = H.elastic(H.seg(t, a, a + .5)), k = kin * (1 - H.inn(H.seg(t, b - .18, b)));
    if (k <= 0.01) return '';
    const w = Math.max(...lines.map(l => l.length)) * size * .58 + 84, h = lines.length * size * 1.22 + 58;
    const total = lines.join(' ').split(' ').length, shown = H.seg(t, a + .1, a + .1 + total * .085) * total;
    let n = 0;
    const tx = lines.map((l, i) => `<text x="0" y="${-h / 2 + 29 + size * .86 + i * size * 1.22}" text-anchor="middle" font-family="P" font-weight="700" font-size="${size}" fill="${NAVY}" style="white-space:pre">${l.split(' ').map(wd => `<tspan fill-opacity="${n++ < shown ? 1 : 0}">${wd} </tspan>`).join('')}</text>`).join('');
    let tl = '';
    if (tail) {
      const dx = tail[0] - x, dy = tail[1] - y, below = dy > 0, ey = below ? h / 2 : -h / 2, bx = H.cl(dx * .45, -w / 2 + 60, w / 2 - 60);
      tl = `<path d="M${bx - 26} ${ey} L${dx * .8} ${dy * .8} L${bx + 26} ${ey}" fill="${fill}" stroke="${NAVY}" stroke-width="8" stroke-linejoin="round"/><line x1="${bx - 21}" y1="${ey + (below ? -5 : 5)}" x2="${bx + 21}" y2="${ey + (below ? -5 : 5)}" stroke="${fill}" stroke-width="12"/>`;
    }
    return `<g transform="translate(${x},${y}) scale(${k}) rotate(${(1 - kin) * -8 + Math.sin(t * 2.2 + x) * .8})"><rect x="${-w / 2 + 8}" y="${-h / 2 + 10}" width="${w}" height="${h}" rx="44" fill="${NAVY}" opacity=".25"/><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="44" fill="${fill}" stroke="${NAVY}" stroke-width="8"/>${tl}${tx}</g>`;
  };

  K.narasi = (t, a, b, o) => {
    if (t < a || t > b) return '';
    const { x, y, text, size = 32, rot = -2 } = o, w = text.length * size * .58 + 48;
    const k = H.back(H.seg(t, a, a + .4)) * (1 - H.seg(t, b - .15, b));
    return `<g transform="translate(${x - (1 - k) * 500},${y}) rotate(${rot})" opacity="${H.cl(k * 2)}"><rect x="6" y="8" width="${w}" height="${size * 1.75}" fill="${NAVY}" opacity=".3"/><rect width="${w}" height="${size * 1.75}" fill="#FFD45C" stroke="${NAVY}" stroke-width="6"/>${K.txt(24, size * 1.22, size, text)}</g>`;
  };

  K.sfx = (t, a, dur, o) => {
    const k = H.seg(t, a, a + dur); if (k <= 0 || k >= 1) return '';
    const { x, y, text, size = 120, color = '#FFD45C', rot = -10, burst = '#FD5B35' } = o;
    const s = H.elastic(H.cl(k / .35)) * (1 + .04 * Math.sin(t * 40)), op = 1 - H.seg(k, .75, 1);
    let st = '';
    if (burst) { const n = 14, R = text.length * size * .36 + 70, p = []; for (let i = 0; i < n * 2; i++) { const an = Math.PI * i / n + t * .6, r = i % 2 ? R * .72 : R; p.push((Math.cos(an) * r).toFixed(1) + ',' + (Math.sin(an) * r * .62).toFixed(1)); } st = `<polygon points="${p.join(' ')}" fill="${burst}" stroke="${NAVY}" stroke-width="8" stroke-linejoin="round"/>`; }
    return `<g transform="translate(${x + H.noise(t * 30, 3) * 5 * (1 - k)},${y}) rotate(${rot}) scale(${s})" opacity="${op}">${st}<text x="0" y="${size * .34}" text-anchor="middle" font-family="P" font-weight="700" font-style="italic" font-size="${size}" fill="${color}" stroke="${NAVY}" stroke-width="16" stroke-linejoin="round" paint-order="stroke">${text}</text></g>`;
  };

  K.garisFokus = (t, o = {}) => {
    const { cx = 480, cy = 590, n = 30, op = .5, color = '#fff' } = o; let s = '';
    for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2 + H.noise(i * 3.1, 5) * .15, fl = .5 + .5 * H.noise(t * 14 + i * 7, i), r0 = 430 + 160 * fl, r1 = 1100, wd = .028 + .02 * H.noise(i, 9); s += `<polygon points="${cx + Math.cos(a) * r0},${cy + Math.sin(a) * r0 * 1.1} ${cx + Math.cos(a - wd) * r1},${cy + Math.sin(a - wd) * r1} ${cx + Math.cos(a + wd) * r1},${cy + Math.sin(a + wd) * r1}" fill="${color}"/>`; }
    return `<g opacity="${op}">${s}</g>`;
  };

  K.cincin = (t, a, x, y, r = 60, color = '#FD5B35', dur = .45) => {
    const k = H.seg(t, a, a + dur); if (k <= 0 || k >= 1) return '';
    return `<circle cx="${x}" cy="${y}" r="${r * H.out(k)}" fill="${color}" fill-opacity="${.25 * (1 - k)}" stroke="${color}" stroke-width="${8 * (1 - k) + 1}" opacity="${1 - k}"/>`;
  };
  // kartu putih bergaris tepi (untuk sisipan layar HP, daftar langkah, notifikasi)
  K.kartu = (x, y, w, h, isi, k = 1, rot = 0) => k <= 0.01 ? '' : `<g transform="translate(${x + w / 2},${y + h / 2}) rotate(${rot + (1 - k) * -10}) scale(${k}) translate(${-w / 2},${-h / 2})"><rect x="10" y="12" width="${w}" height="${h}" rx="30" fill="${NAVY}" opacity=".3"/><rect width="${w}" height="${h}" rx="30" fill="#fff" stroke="${NAVY}" stroke-width="8"/>${isi}</g>`;
  K.centang = (x, y, r, k) => k <= 0.01 ? '' : `<g transform="translate(${x},${y}) scale(${k})"><circle r="${r}" fill="#2DBE78"/><path d="M${-r * .45} 0 L${-r * .1} ${r * .36} L${r * .5} ${-r * .34}" stroke="#fff" stroke-width="${r * .26}" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;

  window.K = K;
})();
