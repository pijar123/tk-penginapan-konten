/* latar.js — set latar berlapis untuk video kartun @tk.penginapan.
 *
 * Set pertama: RESEPSIONIS (dinding kawung, jendela pantai, tirai, lampu rotan, papan kunci, tanaman).
 * Tiga lapis supaya ada kedalaman:
 *   L.resepsionis.belakang()  dinding, jendela, cahaya, lantai, tanaman   -> taruh paling bawah
 *   L.resepsionis.meja()      meja resepsionis + bel + cangkir             -> di depan Rara, di belakang tamu
 *   L.resepsionis.depan()     daun di depan kamera + tepi gelap            -> paling atas
 * Lalu panggil L.resepsionis.hidup(t) di setiap frame: awan, ombak, tirai, kunci,
 * lampu, daun, dan uap kopi ikut bergerak pelan.
 *
 * Aturan warna: latar sengaja lebih pucat dari tokoh. Oranye dan kuning terang
 * disimpan untuk benda yang harus dilihat (kunci, koper, tombol).
 */
(function () {
  const L = {};
  const leaf = (x, y, r, s, c, c2, id) => `<g ${id ? `id="${id}"` : ''} transform="translate(${x},${y}) rotate(${r}) scale(${s})" data-b="${x},${y},${r},${s}"><path d="M0 0 C40 -70 150 -80 210 -8 C150 56 40 50 0 0Z" fill="${c}"/><path d="M6 0 C70 -14 140 -14 200 -8" stroke="${c2}" stroke-width="6" fill="none"/><path d="M60 -8 L84 -42 M110 -11 L138 -44 M70 -4 L92 26 M120 -8 L146 22" stroke="${c2}" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;
  const sway = (id, t, amp, sp, ph) => { const e = document.getElementById(id); if (!e) return; const [x, y, r, s] = e.dataset.b.split(',').map(Number); e.setAttribute('transform', `translate(${x},${y}) rotate(${r + Math.sin(t * sp + ph) * amp}) scale(${s})`); };

  L.resepsionis = {
    belakang() {
      let planks = ''; for (let i = 0; i < 7; i++) planks += `<line x1="0" y1="${1680 + i * 40}" x2="1080" y2="${1680 + i * 40}" stroke="#C39A62" stroke-width="3" opacity=".5"/>`;
      [[140, 1640, 1720], [520, 1720, 1800], [860, 1640, 1680], [300, 1800, 1880], [700, 1760, 1840]].forEach(([x, a, b]) => planks += `<line x1="${x}" y1="${a}" x2="${x}" y2="${b}" stroke="#C39A62" stroke-width="3" opacity=".5"/>`);
      return `<defs>
    <pattern id="Lkawung" width="88" height="88" patternUnits="userSpaceOnUse"><g fill="#EEE0C6"><ellipse cx="44" cy="20" rx="10" ry="18"/><ellipse cx="44" cy="68" rx="10" ry="18"/><ellipse cx="20" cy="44" rx="18" ry="10"/><ellipse cx="68" cy="44" rx="18" ry="10"/><circle cx="0" cy="0" r="5"/><circle cx="88" cy="0" r="5"/><circle cx="0" cy="88" r="5"/><circle cx="88" cy="88" r="5"/></g></pattern>
    <linearGradient id="Lsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9FDCE8"/><stop offset="1" stop-color="#E4F6F1"/></linearGradient>
    <radialGradient id="Lglow"><stop offset="0" stop-color="#FFD45C" stop-opacity=".55"/><stop offset="1" stop-color="#FFD45C" stop-opacity="0"/></radialGradient>
    <radialGradient id="Lvig" cx=".5" cy=".55" r=".75"><stop offset=".55" stop-color="#16202A" stop-opacity="0"/><stop offset="1" stop-color="#16202A" stop-opacity=".3"/></radialGradient>
    <linearGradient id="Lshaft" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <clipPath id="Lwc"><rect x="96" y="566" width="308" height="388" rx="18"/></clipPath>
  </defs>
  <rect x="-200" y="-200" width="1480" height="2320" fill="#F6EAD6"/><rect x="-200" y="-200" width="1480" height="1840" fill="url(#Lkawung)"/>
  <rect x="-200" y="1250" width="1480" height="390" fill="#EAD9BC"/><rect x="-200" y="1238" width="1480" height="22" fill="#C9955A"/>
  <rect x="-200" y="1600" width="1480" height="40" fill="#B77B4A"/>
  <g clip-path="url(#Lwc)"><rect x="96" y="566" width="308" height="388" fill="url(#Lsky)"/>
    <circle id="LsunG" cx="330" cy="640" r="54" fill="#FFD45C" opacity=".25"/><circle cx="330" cy="640" r="34" fill="#FFD45C"/>
    <g id="Lcloud" fill="#fff" opacity=".9"><ellipse cx="170" cy="650" rx="44" ry="16"/><ellipse cx="200" cy="638" rx="30" ry="16"/><ellipse cx="300" cy="720" rx="34" ry="12"/><ellipse cx="-60" cy="690" rx="40" ry="14"/></g>
    <path d="M96 830 Q170 730 250 800 Q300 760 404 820 V954 H96Z" fill="#6FB58A"/><path d="M96 850 Q160 790 230 840 L96 900Z" fill="#5AA078"/>
    <rect x="96" y="850" width="308" height="104" fill="#5CBFC0"/>
    <path id="Lwave" d="M60 876 q20 -10 40 0 t40 0 M200 900 q20 -10 40 0 t40 0 M110 926 q20 -10 40 0 t40 0 M300 880 q20 -10 40 0 t40 0" stroke="#fff" stroke-width="5" fill="none" opacity=".8"/>
    <path d="M96 918 Q250 890 404 930 V954 H96Z" fill="#F3DDAE"/></g>
  <rect x="90" y="560" width="320" height="400" rx="24" fill="none" stroke="#15787D" stroke-width="14"/><line x1="250" y1="560" x2="250" y2="960" stroke="#15787D" stroke-width="10"/>
  <rect x="70" y="952" width="360" height="24" rx="10" fill="#0F5C60"/>
  <rect x="60" y="530" width="380" height="18" rx="9" fill="#B77B4A"/>
  <g id="Lcurt"><path d="M70 548 H170 Q180 760 120 800 Q140 900 150 1010 H70Z" fill="#FFFAF0"/><path d="M100 548 Q110 700 96 800 M136 548 Q150 700 118 800" stroke="#E6D8BF" stroke-width="5" fill="none"/><rect x="70" y="786" width="62" height="20" rx="8" fill="#FD5B35" opacity=".85"/></g>
  <polygon id="Lshaft1" points="410,560 410,960 980,1640 620,1640" fill="url(#Lshaft)" opacity=".5"/>
  <g transform="translate(700,650)"><rect x="-140" y="-70" width="280" height="190" rx="18" fill="#C9955A"/><rect x="-140" y="-70" width="280" height="54" rx="18" fill="#B77B4A"/>
    <text x="0" y="-32" text-anchor="middle" font-family="P" font-weight="700" font-size="26" fill="#FCF5EB">KUNCI</text>
    ${[-84, -28, 28, 84].map((x, i) => `<circle cx="${x}" cy="14" r="9" fill="#5B4636"/>${i == 1 ? '' : `<g id="Lkey${i}" data-x="${x}"><line x1="${x}" y1="20" x2="${x}" y2="54" stroke="#E2B33F" stroke-width="6"/><rect x="${x - 16}" y="54" width="32" height="38" rx="7" fill="${['#15787D', '', '#D9774F', '#15787D'][i]}"/></g>`}`).join('')}</g>
  <circle id="Llamp" cx="950" cy="690" r="220" fill="url(#Lglow)"/>
  <g transform="translate(950,640)"><rect x="-8" y="-70" width="16" height="50" fill="#5B4636"/><path d="M-62 60 Q-70 -30 0 -30 Q70 -30 62 60Z" fill="#D9A566"/><path d="M-50 60 Q-40 -10 0 -30 M0 -30 Q40 -10 50 60 M-64 20 H64 M-58 -6 H58 M0 -30 V60" stroke="#B77B4A" stroke-width="5" fill="none"/><ellipse cx="0" cy="62" rx="62" ry="10" fill="#FFE9A8"/></g>
  <g transform="translate(965,1010) rotate(3) scale(.85)"><rect x="-64" y="-80" width="128" height="160" rx="8" fill="#FCF5EB" stroke="#5B4636" stroke-width="10"/><rect x="-46" y="-62" width="92" height="124" fill="#BFE3E0"/><path d="M-46 30 Q-10 -20 20 20 Q34 4 46 24 V62 H-46Z" fill="#15787D"/><circle cx="22" cy="-30" r="14" fill="#F2A07E"/></g>
  <rect x="-200" y="1640" width="1480" height="480" fill="#D9B98C"/>${planks}
  <g transform="translate(1010,1640)"><ellipse cx="-10" cy="4" rx="110" ry="16" fill="#173336" opacity=".18"/>
    ${leaf(-20, -190, -120, 1.25, '#1E8A6E', '#14664F', 'Lp1')}${leaf(-10, -190, -70, 1.35, '#2A9D7C', '#14664F', 'Lp2')}${leaf(-30, -180, -160, 1.05, '#177A5F', '#0F5745', 'Lp3')}${leaf(-6, -200, -95, 1.5, '#1E8A6E', '#14664F', 'Lp4')}${leaf(0, -180, -40, 1.0, '#177A5F', '#0F5745', 'Lp5')}
    <path d="M-84 -190 H64 L46 0 H-66Z" fill="#D9A566"/><path d="M-80 -150 H60 M-76 -110 H56 M-72 -70 H52 M-68 -30 H48 M-50 -190 L-40 0 M-10 -190 V0 M30 -190 L20 0" stroke="#B77B4A" stroke-width="5" fill="none"/><rect x="-92" y="-204" width="164" height="24" rx="10" fill="#B77B4A"/></g>`;
    },
    meja() {
      return `<ellipse cx="360" cy="1716" rx="330" ry="20" fill="#173336" opacity=".2"/>
  <rect x="70" y="1412" width="580" height="300" rx="20" fill="#173336"/><rect x="70" y="1412" width="580" height="60" fill="#0C1F21" opacity=".45"/>
  <rect x="110" y="1500" width="500" height="150" rx="16" fill="none" stroke="#2A5357" stroke-width="6"/>
  <text x="360" y="1596" text-anchor="middle" font-family="P" font-weight="700" font-size="46" fill="#FCF5EB">RESEPSIONIS</text>
  <rect x="46" y="1384" width="628" height="46" rx="16" fill="#C9955A"/><rect x="46" y="1412" width="628" height="18" rx="9" fill="#9C6A3C"/>
  <ellipse cx="560" cy="1386" rx="52" ry="8" fill="#173336" opacity=".25"/>
  <g id="Lbell" transform="translate(560,1384)"><path d="M-36 0 A36 36 0 0 1 36 0 Z" fill="#FFD45C"/><path d="M6 -34 A36 36 0 0 1 36 0 H14 Z" fill="#E2B33F"/><rect x="-44" y="-4" width="88" height="9" rx="4" fill="#E2B33F"/><circle cy="-40" r="8" fill="#E2B33F"/><path d="M-22 -10 A26 26 0 0 1 -6 -26" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8"/></g>
  <g transform="translate(150,1384)"><rect x="-30" y="-64" width="60" height="64" rx="10" fill="#FCF5EB"/><path d="M30 -48 Q54 -44 50 -26 Q46 -12 30 -14" fill="none" stroke="#FCF5EB" stroke-width="8"/><rect x="-30" y="-30" width="60" height="12" fill="#15787D"/><path id="Lsteam1" d="M-10 -78 Q-2 -92 -10 -106" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/><path id="Lsteam2" d="M10 -78 Q18 -92 10 -106" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;
    },
    depan() {
      return `<g id="Lfront">${leaf(-40, 1900, -58, 2.2, '#0F5C60', '#0A4649', 'Lf1')}${leaf(-60, 1930, -25, 2.0, '#13343B', '#0A2A30', 'Lf2')}${leaf(-30, 1940, -82, 1.6, '#15787D', '#0F5C60', 'Lf3')}</g>`;
    },
    // tepi gelap: taruh di luar grup kamera supaya tidak ikut zoom
    tepi() { return `<rect width="1080" height="1920" fill="url(#Lvig)"/>`; },
    BEL: [560, 1384],
    hidup(t) {
      const $ = id => document.getElementById(id), n = H.noise;
      $('Lcloud').setAttribute('transform', `translate(${(t * 7) % 120},${Math.sin(t * .5) * 3})`);
      $('LsunG').setAttribute('r', 54 + Math.sin(t * 2) * 5);
      $('Lwave').setAttribute('transform', `translate(${Math.sin(t * 1.2) * 14},${Math.sin(t * 2.4) * 2})`);
      $('Lcurt').setAttribute('transform', `translate(120,548) skewX(${Math.sin(t * 1.1) * 2.2 + n(t * .7, 31) * 1.2}) translate(-120,-548)`);
      $('Lshaft1').setAttribute('opacity', .42 + .1 * Math.sin(t * .9));
      [0, 2, 3].forEach(i => { const e = $('Lkey' + i); e.setAttribute('transform', `rotate(${[4, 0, -3, 5][i] + Math.sin(t * 2.2 + i) * 3.5} ${e.dataset.x} 14)`); });
      $('Llamp').setAttribute('opacity', .88 + .12 * n(t * 3, 40));
      ['Lp1', 'Lp2', 'Lp3', 'Lp4', 'Lp5'].forEach((id, i) => sway(id, t, 2.2, 1.1 + i * .13, i * 1.3));
      ['Lf1', 'Lf2', 'Lf3'].forEach((id, i) => sway(id, t, 1.6, .9 + i * .1, i * 2));
      [['Lsteam1', 0], ['Lsteam2', .8]].forEach(([id, o]) => { const p = ((t * .7 + o) % 1.6) / 1.6; $(id).setAttribute('transform', `translate(${Math.sin(p * 6) * 4},${-p * 26})`); $(id).setAttribute('opacity', .8 * Math.sin(Math.PI * p)); });
    },
    // daun depan bergeser lebih jauh dari latar saat kamera bergerak (paralaks). c = hasil H.kf kamera.
    paralaks(c) { document.getElementById('Lfront').setAttribute('transform', `translate(${-(c.x - 540) * .5 - (c.s - 1) * 260},${-(c.y - 960) * .3 + (c.s - 1) * 420})`); },
  };
  window.L = L;
})();
