/**
 * PROFILER: CRIME BOARD
 * Forensic & Dossier SVG Illustrations Generator
 * Supports both built-in procedural vector diagrams ("svg:...") and external image URLs.
 */

window.ProfilerIllustrations = {
  render(imageSpec, category, cardNumber) {
    if (imageSpec && !imageSpec.startsWith('svg:')) {
      return `
        <div class="relative w-full h-full overflow-hidden bg-stone-900 flex items-center justify-center">
          <img src="${imageSpec}" alt="Reperto ${cardNumber}" class="w-full h-full object-cover contrast-125 sepia-[.25]" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none"></div>
          <span class="absolute bottom-1 right-1.5 text-[9px] font-mono bg-black/70 text-amber-400 px-1 rounded">EVIDENCE ${cardNumber}</span>
        </div>
      `;
    }

    const key = imageSpec ? imageSpec.replace('svg:', '') : this.defaultKeyForCategory(category);
    const svgContent = this.templates[key] || this.templates[this.defaultKeyForCategory(category)];

    return `
      <div class="relative w-full h-full overflow-hidden bg-stone-900 select-none flex items-center justify-center border border-stone-700/80 rounded-sm">
        ${svgContent}
        <div class="absolute top-1 left-1.5 text-[9.5px] font-mono font-semibold tracking-wider text-stone-300/90 uppercase bg-black/70 px-1.5 py-0.2 rounded">
          REPERTO ${cardNumber} // ${category.toUpperCase()}
        </div>
      </div>
    `;
  },

  defaultKeyForCategory(category) {
    const cat = (category || '').toLowerCase();
    if (cat.includes('forense')) return 'toxicology-lab';
    if (cat.includes('deposizione')) return 'witness-clara';
    if (cat.includes('documento')) return 'digital-logs';
    return 'crime-scene-desk';
  },

  templates: {
    'crime-scene-desk': `
      <svg viewBox="12 12 296 120" preserveAspectRatio="xMidYMid slice" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-blueprint" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#334155" stroke-width="0.6"/>
          </pattern>
        </defs>
        <rect width="320" height="140" fill="#0f172a"/>
        <rect width="320" height="140" fill="url(#grid-blueprint)"/>
        <!-- Desk outline -->
        <rect x="70" y="28" width="180" height="84" rx="4" fill="#1e293b" stroke="#94a3b8" stroke-width="1.5"/>
        <!-- Blotter -->
        <rect x="115" y="42" width="90" height="56" fill="#0f172a" stroke="#64748b" stroke-width="1" stroke-dasharray="3,2"/>
        <!-- Body silhouette outline (chalk style) -->
        <circle cx="160" cy="64" r="14" fill="none" stroke="#f87171" stroke-width="1.8" stroke-dasharray="4,2"/>
        <path d="M132,95 C135,74 185,74 188,95" fill="none" stroke="#f87171" stroke-width="1.8" stroke-dasharray="4,2"/>
        <!-- Coffee cup on RIGHT -->
        <circle cx="225" cy="58" r="9" fill="#451a03" stroke="#f59e0b" stroke-width="1.5"/>
        <circle cx="225" cy="58" r="4" fill="#78350f"/>
        <text x="212" y="80" fill="#fbbf24" font-family="monospace" font-size="7" font-weight="bold">TAZZINA (DX)</text>
        <!-- Pen on LEFT -->
        <line x1="88" y1="75" x2="108" y2="55" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
        <text x="76" y="88" fill="#38bdf8" font-family="monospace" font-size="7" font-weight="bold">PENNA (SX)</text>
        <!-- Window indicator -->
        <line x1="20" y1="15" x2="20" y2="125" stroke="#22d3ee" stroke-width="2" stroke-dasharray="6,3"/>
        <text x="26" y="128" fill="#22d3ee" font-family="monospace" font-size="7">FINESTRA (+12cm)</text>
        <!-- Evidence markers -->
        <polygon points="232,42 242,42 237,32" fill="#eab308"/>
        <text x="235" y="41" fill="#000" font-family="monospace" font-size="6" font-weight="bold">1</text>
        <polygon points="90,52 100,52 95,42" fill="#eab308"/>
        <text x="93" y="51" fill="#000" font-family="monospace" font-size="6" font-weight="bold">2</text>
      </svg>
    `,

    'thermal-blood': `
      <svg viewBox="12 12 296 120" preserveAspectRatio="xMidYMid slice" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="140" fill="#181214"/>
        <!-- Thermal decay graph -->
        <line x1="35" y1="25" x2="35" y2="115" stroke="#57534e" stroke-width="1.2"/>
        <line x1="35" y1="115" x2="205" y2="115" stroke="#57534e" stroke-width="1.2"/>
        <polyline points="40,35 95,62 150,89 195,108" fill="none" stroke="#ef4444" stroke-width="2.2"/>
        <circle cx="40" cy="35" r="3.5" fill="#fbbf24"/>
        <text x="46" y="34" fill="#fde68a" font-family="monospace" font-size="7.5">37.0°C (21:50)</text>
        <circle cx="150" cy="89" r="4" fill="#ef4444" stroke="#fff" stroke-width="1"/>
        <text x="115" y="104" fill="#fca5a5" font-family="monospace" font-size="7.5" font-weight="bold">34.0°C @ 23:50</text>
        <text x="38" y="128" fill="#a8a29e" font-family="monospace" font-size="7">-1.5°C / ORA (AMB. 20°C)</text>
        <!-- Blood drop & Luminol badge -->
        <g transform="translate(225, 22)">
          <rect x="0" y="0" width="78" height="94" rx="4" fill="#27171c" stroke="#991b1b" stroke-width="1.2"/>
          <path d="M39,18 C39,18 22,42 22,54 C22,64 30,71 39,71 C48,71 56,64 56,54 C56,42 39,18 39,18 Z" fill="#dc2626" opacity="0.85"/>
          <text x="39" y="58" text-anchor="middle" fill="#fff" font-family="monospace" font-size="12" font-weight="bold">0-</text>
          <text x="39" y="85" text-anchor="middle" fill="#f87171" font-family="monospace" font-size="7">LUMINOL POS.</text>
        </g>
      </svg>
    `,

    'witness-clara': `
      <svg viewBox="12 12 296 120" preserveAspectRatio="xMidYMid slice" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="140" fill="#171923"/>
        <!-- Dossier Mugshot Frame -->
        <rect x="22" y="20" width="76" height="100" rx="3" fill="#2d3748" stroke="#64748b" stroke-width="1.2"/>
        <circle cx="60" cy="54" r="17" fill="#94a3b8"/>
        <path d="M34,108 C34,82 86,82 86,108" fill="#64748b"/>
        <!-- Glasses -->
        <rect x="47" y="49" width="11" height="7" rx="1" fill="none" stroke="#1e293b" stroke-width="1.5"/>
        <rect x="62" y="49" width="11" height="7" rx="1" fill="none" stroke="#1e293b" stroke-width="1.5"/>
        <line x1="58" y1="52" x2="62" y2="52" stroke="#1e293b" stroke-width="1.5"/>
        <!-- Voice waveform & Data -->
        <text x="115" y="36" fill="#93c5fd" font-family="monospace" font-size="9" font-weight="bold">INTERROGATORIO // REC-01</text>
        <g stroke="#3b82f6" stroke-width="2" stroke-linecap="round">
          <line x1="118" y1="65" x2="118" y2="55"/><line x1="126" y1="72" x2="126" y2="48"/>
          <line x1="134" y1="78" x2="134" y2="42"/><line x1="142" y1="66" x2="142" y2="54"/>
          <line x1="150" y1="82" x2="150" y2="38"/><line x1="158" y1="70" x2="158" y2="50"/>
          <line x1="166" y1="64" x2="166" y2="56"/><line x1="174" y1="75" x2="174" y2="45"/>
          <line x1="182" y1="80" x2="182" y2="40"/><line x1="190" y1="68" x2="190" y2="52"/>
          <line x1="198" y1="62" x2="198" y2="58"/><line x1="206" y1="74" x2="206" y2="46"/>
        </g>
        <rect x="115" y="92" width="182" height="26" rx="3" fill="#1e293b" stroke="#334155"/>
        <text x="123" y="108" fill="#e2e8f0" font-family="monospace" font-size="8">GRUPPO: A+ | DESTRORSA | TAGLIA 39</text>
      </svg>
    `,

    'witness-lorenzo': `
      <svg viewBox="12 12 296 120" preserveAspectRatio="xMidYMid slice" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="140" fill="#171923"/>
        <rect x="22" y="20" width="76" height="100" rx="3" fill="#2d3748" stroke="#64748b" stroke-width="1.2"/>
        <circle cx="60" cy="54" r="17" fill="#94a3b8"/>
        <path d="M34,108 C34,82 86,82 86,108" fill="#475569"/>
        <text x="115" y="36" fill="#93c5fd" font-family="monospace" font-size="9" font-weight="bold">DEPOSIZIONE // ALIBI ESTERNO</text>
        <rect x="115" y="48" width="182" height="36" rx="3" fill="#0f172a" stroke="#475569"/>
        <text x="124" y="64" fill="#38bdf8" font-family="monospace" font-size="8.5" font-weight="bold">TARGA: GK-412-TR</text>
        <text x="124" y="77" fill="#94a3b8" font-family="monospace" font-size="7.5">ALIBI DICHIARATO: 20:30 - 23:15</text>
        <rect x="115" y="92" width="182" height="26" rx="3" fill="#1e293b" stroke="#334155"/>
        <text x="123" y="108" fill="#e2e8f0" font-family="monospace" font-size="8">POS COMO: ORE 22:35 (€ 64,00)</text>
      </svg>
    `,

    'witness-beatrice': `
      <svg viewBox="12 12 296 120" preserveAspectRatio="xMidYMid slice" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="140" fill="#171923"/>
        <rect x="22" y="20" width="76" height="100" rx="3" fill="#2d3748" stroke="#64748b" stroke-width="1.2"/>
        <circle cx="60" cy="54" r="17" fill="#94a3b8"/>
        <path d="M34,108 C34,82 86,82 86,108" fill="#64748b"/>
        <text x="115" y="36" fill="#93c5fd" font-family="monospace" font-size="9" font-weight="bold">TESTIMONIANZA // PERSONALE</text>
        <rect x="115" y="48" width="182" height="36" rx="3" fill="#0f172a" stroke="#475569"/>
        <text x="124" y="64" fill="#fbbf24" font-family="monospace" font-size="8.5" font-weight="bold">CONSEGNA CAFFÈ: ORE 21:39</text>
        <text x="124" y="77" fill="#94a3b8" font-family="monospace" font-size="7.5">CODICE SERRA: #9901 (CONDIVISO)</text>
        <rect x="115" y="92" width="182" height="26" rx="3" fill="#1e293b" stroke="#334155"/>
        <text x="123" y="108" fill="#e2e8f0" font-family="monospace" font-size="8">BOTANICA: TAXUS BACCATA / ORCHIDEE</text>
      </svg>
    `,

    'witness-matteo': `
      <svg viewBox="12 12 296 120" preserveAspectRatio="xMidYMid slice" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="140" fill="#171923"/>
        <rect x="22" y="20" width="76" height="100" rx="3" fill="#2d3748" stroke="#64748b" stroke-width="1.2"/>
        <circle cx="60" cy="54" r="17" fill="#94a3b8"/>
        <path d="M34,108 C34,82 86,82 86,108" fill="#334155"/>
        <text x="115" y="36" fill="#93c5fd" font-family="monospace" font-size="9" font-weight="bold">SICUREZZA // RONDA & ALLARMI</text>
        <rect x="115" y="48" width="182" height="36" rx="3" fill="#0f172a" stroke="#ef4444" stroke-width="1"/>
        <text x="124" y="64" fill="#fca5a5" font-family="monospace" font-size="8.5" font-weight="bold">LESIONE INDICE DX (8 mm)</text>
        <text x="124" y="77" fill="#94a3b8" font-family="monospace" font-size="7.5">ALLARME FUMO 1° PIANO: ORE 23:05</text>
        <rect x="115" y="92" width="182" height="26" rx="3" fill="#1e293b" stroke="#334155"/>
        <text x="123" y="108" fill="#f87171" font-family="monospace" font-size="8" font-weight="bold">GRUPPO SANGUIGNO: 0 NEGATIVO (0-)</text>
      </svg>
    `,

    'digital-logs': `
      <svg viewBox="12 12 296 120" preserveAspectRatio="xMidYMid slice" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="140" fill="#091914"/>
        <rect x="16" y="22" width="288" height="104" rx="4" fill="#052e16" fill-opacity="0.4" stroke="#10b981" stroke-width="1"/>
        <text x="26" y="40" fill="#34d399" font-family="monospace" font-size="8.5" font-weight="bold">&gt; LOG_QUERY --DATE=14-NOV --TARGET=VILLA_DOMOTICS</text>
        <line x1="24" y1="47" x2="294" y2="47" stroke="#065f46" stroke-width="1"/>
        <text x="26" y="63" fill="#a7f3d0" font-family="monospace" font-size="8">[SS340_GATE] TARGA GK-412-TR : 0 TRANSITI (20:00-24:00)</text>
        <text x="26" y="81" fill="#fde68a" font-family="monospace" font-size="8">[POS_COMO]   22:35 €64.00 -&gt; DEV: IPHONE_CAMILLA_NERI</text>
        <text x="26" y="99" fill="#fca5a5" font-family="monospace" font-size="8">[SERRA_LOCK] 21:22 OPEN (#9901) | 21:38 LOCK (#9901)</text>
        <text x="26" y="116" fill="#6ee7b7" font-family="monospace" font-size="7.5">STATUS: VERIFIED // CHECKSUM SHA-256 OK</text>
      </svg>
    `,

    'toxicology-lab': `
      <svg viewBox="12 12 296 120" preserveAspectRatio="xMidYMid slice" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="140" fill="#1a1016"/>
        <!-- GC-MS Chromatogram peaks -->
        <polyline points="20,112 55,112 62,65 69,112 115,112 125,28 136,112 185,112 195,42 205,112 295,112" fill="none" stroke="#f43f5e" stroke-width="2"/>
        <line x1="20" y1="112" x2="298" y2="112" stroke="#881337" stroke-width="1"/>
        <text x="45" y="58" fill="#fda4af" font-family="monospace" font-size="7.5">TASSINA B (CAFFÈ)</text>
        <text x="108" y="23" fill="#fb7185" font-family="monospace" font-size="8" font-weight="bold">ACONITINA (COLLIRIO)</text>
        <text x="180" y="36" fill="#fda4af" font-family="monospace" font-size="7.5">ATROPINA 4%</text>
        <text x="24" y="128" fill="#9f1239" font-family="monospace" font-size="7.5">SPETTROMETRIA DI MASSA GC-MS // LAB FORENSE</text>
      </svg>
    `,

    'autopsy-ecg': `
      <svg viewBox="12 12 296 120" preserveAspectRatio="xMidYMid slice" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="140" fill="#140c0e"/>
        <!-- ECG trace turning flatline -->
        <polyline points="18,75 45,75 52,60 58,92 64,32 70,105 76,68 85,75 110,75 116,40 122,102 128,35 134,100 140,42 146,95 154,75 300,75" fill="none" stroke="#ef4444" stroke-width="2.2"/>
        <circle cx="154" cy="75" r="4" fill="#ef4444"/>
        <text x="30" y="45" fill="#fca5a5" font-family="monospace" font-size="7.5">21:40 COLLIRIO</text>
        <text x="102" y="28" fill="#fbbf24" font-family="monospace" font-size="7.5">21:44 ARITMIA</text>
        <text x="165" y="64" fill="#f87171" font-family="monospace" font-size="9" font-weight="bold">21:51 ARRESTO CARDIACO</text>
        <text x="22" y="124" fill="#fda4af" font-family="monospace" font-size="8">STOMACO: 0.0mg TASSINA | OCCHI: ACONITINA 4.2 µg/mL</text>
      </svg>
    `,

    'greenhouse-boots': `
      <svg viewBox="12 12 296 120" preserveAspectRatio="xMidYMid slice" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="140" fill="#141a14"/>
        <!-- Boot print schematic -->
        <g transform="translate(38, 28)">
          <rect x="0" y="0" width="95" height="86" rx="4" fill="#1e2923" stroke="#4d7c0f" stroke-width="1"/>
          <ellipse cx="38" cy="42" rx="18" ry="26" fill="none" stroke="#a3e635" stroke-width="1.5" stroke-dasharray="3,2"/>
          <rect x="26" y="68" width="24" height="12" rx="2" fill="none" stroke="#a3e635" stroke-width="1.5"/>
          <text x="58" y="45" fill="#bef264" font-family="monospace" font-size="8" font-weight="bold">TG. 38</text>
          <text x="58" y="58" fill="#84cc16" font-family="monospace" font-size="7">FANGO +</text>
          <text x="58" y="68" fill="#84cc16" font-family="monospace" font-size="7">POLLINE</text>
        </g>
        <!-- Raincoat & Taxus filter -->
        <g transform="translate(150, 28)">
          <rect x="0" y="0" width="145" height="86" rx="4" fill="#1e2923" stroke="#4d7c0f" stroke-width="1"/>
          <text x="12" y="24" fill="#d9f99d" font-family="monospace" font-size="8" font-weight="bold">IMPERMEABILE VERDE OLIVA</text>
          <text x="12" y="42" fill="#a3e635" font-family="monospace" font-size="7.5">• Spalle bagnate (pioggia)</text>
          <text x="12" y="57" fill="#a3e635" font-family="monospace" font-size="7.5">• Tasca SX: filtro infuso</text>
          <text x="12" y="72" fill="#fde047" font-family="monospace" font-size="7.5">• Residuo: Taxus baccata</text>
        </g>
      </svg>
    `,

    'vault-registry': `
      <svg viewBox="12 12 296 120" preserveAspectRatio="xMidYMid slice" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="140" fill="#111827"/>
        <rect x="18" y="24" width="284" height="98" rx="3" fill="#1f2937" stroke="#f59e0b" stroke-width="1.2"/>
        <text x="28" y="42" fill="#fbbf24" font-family="monospace" font-size="8.5" font-weight="bold">REGISTRO CAVEAU VELENI // CLEARANCE LIV. 4</text>
        <line x1="28" y1="49" x2="290" y2="49" stroke="#374151" stroke-width="1"/>
        <text x="28" y="66" fill="#e5e7eb" font-family="monospace" font-size="8">DATA: 12 NOV | ORA: 18:40 | STATO: PRELIEVO</text>
        <text x="28" y="83" fill="#fca5a5" font-family="monospace" font-size="8">SOSTANZA: ACONITINA (50mg) + ATROPINA SOLFATO</text>
        <rect x="28" y="93" width="262" height="20" rx="2" fill="#451a03" stroke="#d97706" stroke-width="0.8"/>
        <text x="36" y="106" fill="#fde68a" font-family="monospace" font-size="8" font-weight="bold">BADGE ID: #SEC-01 (INTESTATO: M. RINALDI)</text>
      </svg>
    `,

    'forensic-digital': `
      <svg viewBox="12 12 296 120" preserveAspectRatio="xMidYMid slice" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="140" fill="#0f172a"/>
        <rect x="18" y="24" width="134" height="96" rx="3" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
        <text x="26" y="42" fill="#38bdf8" font-family="monospace" font-size="8" font-weight="bold">DENUNCIA_PROCURA.PDF</text>
        <text x="26" y="58" fill="#e2e8f0" font-family="monospace" font-size="7.5">Salvato: 14 Nov 20:45</text>
        <text x="26" y="74" fill="#fca5a5" font-family="monospace" font-size="7.5">Indagato: M. Rinaldi</text>
        <text x="26" y="90" fill="#fde047" font-family="monospace" font-size="7.5">Conto Lugano:</text>
        <text x="26" y="104" fill="#fde047" font-family="monospace" font-size="8" font-weight="bold">+450.000 CHF (MBP-9)</text>

        <rect x="164" y="24" width="138" height="96" rx="3" fill="#1e293b" stroke="#f43f5e" stroke-width="1"/>
        <text x="172" y="42" fill="#fb7185" font-family="monospace" font-size="8" font-weight="bold">TRACCE &amp; TELECAMERE</text>
        <text x="172" y="60" fill="#e2e8f0" font-family="monospace" font-size="7.5">• Blackout Cam 1°P:</text>
        <text x="172" y="73" fill="#fca5a5" font-family="monospace" font-size="8" font-weight="bold">  23:04 -&gt; 23:08</text>
        <text x="172" y="90" fill="#e2e8f0" font-family="monospace" font-size="7.5">• Trascinamento:</text>
        <text x="172" y="104" fill="#fde047" font-family="monospace" font-size="8" font-weight="bold">  SUOLA VIBRAM TG.44</text>
      </svg>
    `
  }
};
