/* latar-komik.js — empat latar untuk panel komik (ukuran panel 960 x 1180).
 *   LK.kereta(t)   gerbong: jendela dengan pemandangan bergerak, gantungan tangan berayun, getaran kereta
 *   LK.rumah(t)    ruang tamu: sofa, lampu, tirai, kucing tidur
 *   LK.kantor(t)   kantor: rak arsip, jam dinding, tanaman, meja + monitor   (LK.mejaKantor(t) digambar di depan tokoh)
 *   LK.teras(t)    teras sore: matahari terbenam, laut, pohon kelapa, lampu gantung   (LK.kursiTeras(t) di depan tokoh)
 * Semua mengembalikan string SVG dan bergerak pelan sesuai t. Butuh hidup.js.
 */
(function () {
  const LK = {}, PI = Math.PI;
  const rep = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join('');

  LK.kereta = t => {
    const far = -(t * 45 % 420), mid = -(t * 240 % 340), near = -(t * 900 % 620);
    const sh = Math.sin(t * 21) * 1.6 + Math.max(0, Math.sin(t * 2.1)) ** 8 * 5;
    return `<g transform="translate(0,${sh})"><rect x="-60" y="-60" width="1080" height="1300" fill="#D5E6E3"/><rect x="-60" y="640" width="1080" height="600" fill="#BCD5D2"/><rect x="-60" y="628" width="1080" height="16" fill="#9FBDB9"/>
      <clipPath id="LKw"><rect x="70" y="130" width="820" height="440" rx="34"/></clipPath>
      <g clip-path="url(#LKw)"><rect x="70" y="130" width="820" height="440" fill="#A9DFEA"/><rect x="70" y="330" width="820" height="240" fill="#DFF3EE"/>
        <circle cx="760" cy="220" r="46" fill="#FFD45C"/>
        ${rep(4, i => `<ellipse cx="${far + i * 420 + 200}" cy="470" rx="260" ry="${110 + (i % 2) * 40}" fill="#8CC7A1"/>`)}
        <rect x="70" y="450" width="820" height="120" fill="#7DBB8C"/>
        ${rep(5, i => `<g transform="translate(${mid + i * 340 + 100},0)"><rect x="-8" y="400" width="16" height="70" fill="#6B4F3A"/><circle cx="0" cy="380" r="46" fill="#3F9A72"/><circle cx="26" cy="400" r="30" fill="#358A64"/></g>`)}
        <rect x="70" y="500" width="820" height="70" fill="#E6D08F"/>
        ${rep(3, i => `<g transform="translate(${near + i * 620 + 300},0)"><rect x="-9" y="130" width="18" height="440" fill="#5B6B73"/><rect x="-60" y="170" width="120" height="12" fill="#5B6B73"/></g>`)}
        <path d="M70 182 Q480 210 890 182" stroke="#5B6B73" stroke-width="4" fill="none" opacity=".7"/>
        ${rep(4, i => `<rect x="${70 + ((t * 1300 + i * 260) % 900)}" y="${520 + i * 12}" width="120" height="5" rx="2" fill="#fff" opacity=".55" transform="translate(${-2 * ((t * 1300 + i * 260) % 900) + 820},0)"/>`)}
        <polygon points="70,130 300,130 150,570 70,570" fill="#fff" opacity=".16"/></g>
      <rect x="70" y="130" width="820" height="440" rx="34" fill="none" stroke="#5B6B73" stroke-width="16"/><rect x="472" y="130" width="16" height="440" fill="#5B6B73"/>
      <rect x="-60" y="44" width="1080" height="20" rx="8" fill="#8A9AA0"/><rect x="-60" y="84" width="1080" height="10" rx="5" fill="#8A9AA0"/>
      <g transform="rotate(${Math.sin(t * 21) * 1.2} 730 64)"><rect x="640" y="-20" width="190" height="84" rx="20" fill="#D9774F"/><rect x="640" y="14" width="190" height="10" fill="#B85A36"/></g>
      ${[170, 480, 800].map((x, i) => `<g transform="rotate(${Math.sin(t * 4.4 + i * 1.3) * 7} ${x} 90)"><rect x="${x - 5}" y="90" width="10" height="70" fill="#5B6B73"/><rect x="${x - 34}" y="156" width="68" height="46" rx="20" fill="none" stroke="#FCF5EB" stroke-width="12"/></g>`).join('')}
      <rect x="250" y="560" width="620" height="700" rx="70" fill="#15787D"/><rect x="250" y="560" width="620" height="700" rx="70" fill="#0B4F53" opacity=".25"/><rect x="330" y="584" width="460" height="110" rx="30" fill="#FCF5EB"/><rect x="330" y="664" width="460" height="14" fill="#E9DCC8"/></g>`;
  };

  LK.rumah = t => {
    const br = Math.sin(t * 1.5);
    return `<rect x="-60" y="-60" width="1080" height="1300" fill="#F3E3CF"/><rect x="-60" y="-60" width="1080" height="1100" fill="url(#Kkw)"/>
      <rect x="-60" y="1040" width="1080" height="200" fill="#D9B98C"/>
      <circle cx="150" cy="330" r="240" fill="#FFD45C" opacity="${.2 + .04 * H.noise(t * 3, 4)}"/>
      <g><rect x="140" y="330" width="20" height="330" fill="#5B4636"/><path d="M70 330 L110 190 H190 L230 330Z" fill="#F2A07E"/><path d="M70 330 L110 190 H140 L120 330Z" fill="#fff" opacity=".2"/><rect x="60" y="324" width="180" height="16" rx="8" fill="#D9774F"/></g>
      <g transform="rotate(-4 400 200)"><rect x="310" y="120" width="190" height="150" rx="8" fill="#FCF5EB" stroke="#5B4636" stroke-width="12"/><circle cx="370" cy="190" r="26" fill="#D9A074"/><circle cx="440" cy="196" r="22" fill="#8D5A3B"/><rect x="330" y="216" width="150" height="40" fill="#15787D" opacity=".6"/></g>
      <clipPath id="LKr"><rect x="620" y="110" width="290" height="380" rx="20"/></clipPath>
      <g clip-path="url(#LKr)"><rect x="620" y="110" width="290" height="380" fill="#BFE7EE"/><circle cx="850" cy="180" r="34" fill="#FFD45C"/><ellipse cx="${700 + (t * 9) % 200}" cy="220" rx="46" ry="16" fill="#fff"/><g transform="rotate(${Math.sin(t * 1.3) * 2} 720 490)"><rect x="710" y="330" width="20" height="160" fill="#6B4F3A"/><circle cx="720" cy="310" r="70" fill="#3F9A72"/><circle cx="770" cy="350" r="46" fill="#358A64"/></g></g>
      <rect x="620" y="110" width="290" height="380" rx="20" fill="none" stroke="#B77B4A" stroke-width="14"/><line x1="765" y1="110" x2="765" y2="490" stroke="#B77B4A" stroke-width="10"/>
      <g transform="translate(620,96) skewX(${Math.sin(t * 1.1) * 2.5})"><path d="M-14 0 H86 Q92 220 46 260 Q60 340 70 430 H-14Z" fill="#FFFAF0"/><path d="M14 0 Q22 180 10 260 M50 0 Q60 180 34 260" stroke="#E6D8BF" stroke-width="5" fill="none"/></g>
      <rect x="590" y="82" width="350" height="18" rx="9" fill="#B77B4A"/>
      <rect x="40" y="560" width="880" height="560" rx="90" fill="#7FB5A8"/><rect x="40" y="560" width="880" height="560" rx="90" fill="#000" opacity=".06"/>
      <rect x="-20" y="900" width="1000" height="340" rx="70" fill="#6AA396"/>
      <rect x="-40" y="760" width="150" height="460" rx="60" fill="#5E9A8C"/><rect x="850" y="760" width="150" height="460" rx="60" fill="#5E9A8C"/>
      <rect x="620" y="700" width="170" height="170" rx="30" fill="#E8C987" transform="rotate(8 705 785)"/>
      <g transform="translate(790,552)"><path d="M70 0 Q${130 + Math.sin(t * 2.2) * 26} ${-50 + Math.cos(t * 2.2) * 10} ${96 + Math.sin(t * 2.2) * 30} -92" stroke="#E0A35E" stroke-width="18" fill="none" stroke-linecap="round"/><ellipse cx="0" cy="0" rx="${92 + br * 3}" ry="${48 + br * 4}" fill="#E0A35E"/><path d="M-30 -30 q14 -14 28 0 M10 -34 q14 -14 28 0" stroke="#C4863F" stroke-width="7" fill="none"/><circle cx="-84" cy="-12" r="40" fill="#E0A35E"/><path d="M-116 -34 L-112 -68 L-90 -46Z M-76 -50 L-58 -74 L-52 -38Z" fill="#E0A35E"/><path d="M-102 -10 q8 6 16 0 M-78 -10 q8 6 16 0" stroke="#5B4636" stroke-width="5" fill="none" stroke-linecap="round"/><text x="${-120 - ((t * .5) % 1) * 30}" y="${-80 - ((t * .5) % 1) * 50}" font-family="P" font-weight="700" font-size="34" fill="#15787D" opacity="${Math.sin(PI * ((t * .5) % 1))}">z</text></g>`;
  };

  LK.kantor = t => {
    const sec = Math.floor(t * 2) * 15;
    return `<rect x="-60" y="-60" width="1080" height="1300" fill="#E2EBEE"/><rect x="-60" y="-60" width="1080" height="1300" fill="url(#Kkw)" opacity=".6"/>
      <rect x="-60" y="700" width="1080" height="540" fill="#CFDDE1"/>
      <g transform="translate(820,130)"><circle r="68" fill="#FCF5EB" stroke="#16202A" stroke-width="10"/>${rep(4, i => `<rect x="-4" y="-56" width="8" height="14" fill="#16202A" transform="rotate(${i * 90})"/>`)}<rect x="-5" y="-34" width="10" height="38" rx="5" fill="#16202A" transform="rotate(${50 + t * 2})"/><rect x="-3" y="-50" width="6" height="54" rx="3" fill="#FD5B35" transform="rotate(${sec})"/><circle r="7" fill="#16202A"/></g>
      <rect x="520" y="350" width="400" height="24" rx="8" fill="#B77B4A"/><rect x="540" y="374" width="16" height="50" fill="#9C6A3C"/><rect x="884" y="374" width="16" height="50" fill="#9C6A3C"/>
      ${[['#7FB5A8', 0], ['#E8C987', 1], ['#C9A1B5', 2], ['#8FB0D6', 3], ['#7FB5A8', 4]].map(([c, i]) => `<rect x="${546 + i * 44}" y="${240 + (i % 2) * 14}" width="38" height="${110 - (i % 2) * 14}" rx="5" fill="${c}"/><rect x="${553 + i * 44}" y="${262 + (i % 2) * 14}" width="24" height="20" rx="3" fill="#FCF5EB"/>`).join('')}
      <g transform="translate(840,350)"><rect x="-34" y="-50" width="68" height="50" rx="8" fill="#D9A566"/>${[-34, -8, 22].map((r, i) => `<g transform="rotate(${r + Math.sin(t * 1.4 + i) * 4})"><path d="M0 -44 C-22 -90 -10 -130 0 -150 C12 -130 22 -90 0 -44Z" fill="${i == 1 ? '#2A9D7C' : '#1E8A6E'}"/></g>`).join('')}</g>
      <g transform="rotate(-2 180 250)"><rect x="70" y="130" width="230" height="250" rx="10" fill="#FCF5EB" stroke="#16202A" stroke-width="8"/><rect x="70" y="130" width="230" height="56" rx="10" fill="#FD5B35" opacity=".85"/>${K.txt(185, 170, 30, 'DESEMBER', '#fff', 'middle')}${rep(20, i => `<rect x="${90 + (i % 5) * 40}" y="${204 + Math.floor(i / 5) * 40}" width="30" height="30" rx="6" fill="${[7, 8, 9, 13, 14].includes(i) ? '#FFD45C' : '#E9DCC8'}"/>`)}</g>`;
  };
  LK.mejaKantor = (t, isiLayar = '') => `<rect x="-60" y="930" width="1080" height="46" rx="14" fill="#C9955A"/><rect x="-60" y="960" width="1080" height="16" fill="#9C6A3C"/><rect x="-60" y="976" width="1080" height="260" fill="#173336"/>
      <g transform="translate(110,930)"><rect x="100" y="-40" width="60" height="40" fill="#5B6B73"/><rect x="50" y="-10" width="160" height="14" rx="7" fill="#5B6B73"/><rect x="-40" y="-290" width="340" height="250" rx="20" fill="#16202A"/><rect x="-24" y="-274" width="308" height="218" rx="10" fill="#EAF6F4"/>${isiLayar}</g>
      <g transform="translate(500,930)"><rect x="-30" y="-64" width="60" height="64" rx="10" fill="#FCF5EB"/><path d="M30 -48 Q54 -44 50 -26 Q46 -12 30 -14" fill="none" stroke="#FCF5EB" stroke-width="8"/><rect x="-30" y="-30" width="60" height="12" fill="#15787D"/>${[0, .8].map(o => { const p = ((t * .7 + o) % 1.6) / 1.6; return `<path d="M${-8 + o * 22} -78 q8 -14 0 -28" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" opacity="${.8 * Math.sin(PI * p)}" transform="translate(${Math.sin(p * 6) * 4},${-p * 26})"/>`; }).join('')}</g>`;

  LK.teras = t => {
    const sway = Math.sin(t * 1.2);
    return `<linearGradient id="LKs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE8B8"/><stop offset=".55" stop-color="#F9B890"/><stop offset="1" stop-color="#F2A07E"/></linearGradient>
      <rect x="-60" y="-60" width="1080" height="760" fill="url(#LKs)"/>
      <circle cx="700" cy="520" r="${150 + Math.sin(t * 2) * 8}" fill="#FFD45C" opacity=".35"/><circle cx="700" cy="520" r="92" fill="#FD7A4A"/>
      ${rep(3, i => `<ellipse cx="${(200 + i * 330 + t * (8 + i * 3)) % 1100 - 60}" cy="${190 + i * 70}" rx="${90 - i * 14}" ry="${22 - i * 3}" fill="#fff" opacity=".65"/>`)}
      <path d="M-60 560 Q120 500 300 556 Q380 530 470 560 L470 600 H-60Z" fill="#6E7FA0" opacity=".7"/>
      <rect x="-60" y="560" width="1080" height="150" fill="#4FB3B8"/><rect x="560" y="560" width="280" height="150" fill="#FFD45C" opacity=".28"/>
      ${rep(6, i => `<path d="M${(i * 190 + Math.sin(t * 1.3 + i) * 16)} ${586 + (i % 3) * 34} q22 -10 44 0 t44 0" stroke="#fff" stroke-width="5" fill="none" opacity=".7"/>`)}
      <g transform="rotate(${sway * 2.5} 110 720)"><path d="M100 720 Q84 480 130 300" stroke="#13343B" stroke-width="26" fill="none" stroke-linecap="round"/>${[-150, -110, -60, -20, 30, 70].map((a, i) => `<path d="M130 300 Q${130 + Math.cos(a * PI / 180) * 130} ${300 + Math.sin(a * PI / 180) * 130 - 30} ${130 + Math.cos(a * PI / 180) * 230} ${300 + Math.sin(a * PI / 180) * 200 + 50}" stroke="#13343B" stroke-width="22" fill="none" stroke-linecap="round" transform="rotate(${Math.sin(t * 1.6 + i) * 3} 130 300)"/>`).join('')}</g>
      <rect x="-60" y="690" width="1080" height="24" fill="#13343B"/>${rep(13, i => `<rect x="${-40 + i * 84}" y="714" width="16" height="170" fill="#13343B"/>`)}<rect x="-60" y="860" width="1080" height="380" fill="#C9955A"/>${rep(5, i => `<line x1="-60" y1="${920 + i * 60}" x2="1020" y2="${920 + i * 60}" stroke="#9C6A3C" stroke-width="4" opacity=".6"/>`)}
      <path d="M-60 60 Q240 150 480 80 T1020 70" stroke="#13343B" stroke-width="5" fill="none"/>
      ${rep(9, i => { const x = -20 + i * 122, y = 82 + Math.sin(i * 1.7) * 22 + (i > 0 && i < 4 ? 30 : 0); return `<line x1="${x}" y1="${y - 14}" x2="${x}" y2="${y}" stroke="#13343B" stroke-width="4"/><circle cx="${x}" cy="${y + 12}" r="${30 + 8 * H.noise(t * 2.5, i)}" fill="#FFD45C" opacity=".22"/><circle cx="${x}" cy="${y + 12}" r="13" fill="#FFE9A8"/>`; })}
      <g transform="translate(880,0) rotate(${sway * 4})"><line x1="0" y1="-20" x2="0" y2="150" stroke="#5B4636" stroke-width="6"/><path d="M-50 150 H50 L36 220 H-36Z" fill="#D9A566"/>${[-60, -20, 20, 60].map((r, i) => `<path d="M0 170 C${r} 230 ${r * 1.4} 290 ${r * 1.2} ${330 + i % 2 * 30}" stroke="#1E8A6E" stroke-width="14" fill="none" stroke-linecap="round" transform="rotate(${Math.sin(t * 1.8 + i) * 4} 0 170)"/>`).join('')}</g>
      <ellipse cx="480" cy="700" rx="290" ry="330" fill="#D9A566"/><ellipse cx="480" cy="700" rx="290" ry="330" fill="none" stroke="#B77B4A" stroke-width="16"/>
      ${rep(7, i => `<path d="M${250 + i * 76} ${470 + Math.abs(3 - i) * 26} V1000" stroke="#B77B4A" stroke-width="6" opacity=".8"/>`)}${rep(5, i => `<path d="M210 ${560 + i * 90} H750" stroke="#B77B4A" stroke-width="6" opacity=".6"/>`)}
      <ellipse cx="480" cy="700" rx="200" ry="240" fill="#F3E3CF"/>`;
  };
  LK.kursiTeras = (t, getar = 0) => `<rect x="150" y="1010" width="660" height="260" rx="80" fill="#C9955A"/><rect x="150" y="1010" width="660" height="60" rx="30" fill="#D9A566"/>
      <rect x="110" y="900" width="120" height="340" rx="56" fill="#D9A566" stroke="#B77B4A" stroke-width="10"/><rect x="730" y="900" width="120" height="340" rx="56" fill="#D9A566" stroke="#B77B4A" stroke-width="10"/>
      <g transform="translate(900,1010)"><rect x="-80" y="0" width="160" height="22" rx="10" fill="#5B4636"/><rect x="-10" y="22" width="20" height="220" fill="#5B4636"/><g transform="translate(0,-8) rotate(${-12 + Math.sin(t * 60) * 5 * getar})"><rect x="-56" y="-18" width="112" height="22" rx="8" fill="#16202A"/><rect x="-48" y="-22" width="96" height="8" rx="4" fill="${getar > .1 ? '#2DBE78' : '#3B4F66'}"/></g></g>`;

  window.LK = LK;
})();
