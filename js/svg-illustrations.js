/**
 * PROFILER: CRIME BOARD
 * Hand-Drawn Investigative Sketch & Forensic Illustration Engine
 * Renders all evidence visuals as tactile pen-and-ink, pencil, cross-hatching
 * and selective crimson/amber wash drawings on vintage sketchbook paper.
 */

window.ProfilerIllustrations = {
  render(imageSpec, category, cardNumber, options = {}) {
    const showZoomHint = options.showZoomHint !== false;
    if (imageSpec && !imageSpec.startsWith('svg:')) {
      return `
        <div class="relative w-full h-full overflow-hidden bg-[#efe7d6] flex items-center justify-center border border-stone-500/80 rounded-sm">
          <img src="${imageSpec}" alt="Reperto ${cardNumber}" class="w-full h-full object-contain contrast-125 sepia-[.35]" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-stone-900/25 via-transparent to-transparent pointer-events-none"></div>
          <span class="absolute bottom-1 left-1.5 text-[8.5px] font-typewriter bg-[#efe8d8]/90 text-stone-900 border border-stone-600/70 px-1.5 rounded-sm">Tav. ${cardNumber}</span>
          ${showZoomHint ? `<span class="absolute bottom-1 right-1.5 text-[8.5px] font-mono-tech font-bold bg-stone-900/80 text-amber-300 border border-amber-500/50 px-1.5 py-0.2 rounded-sm pointer-events-none">🔎 Zoom</span>` : ''}
        </div>
      `;
    }

    const key = imageSpec ? imageSpec.replace('svg:', '') : this.defaultKeyForCategory(category);
    const bodySvg = this.templates[key] || this.templates[this.defaultKeyForCategory(category)];
    const uid = String(cardNumber || '0').replace(/[^a-zA-Z0-9]/g, '') + '-' + key.replace(/[^a-zA-Z0-9]/g, '') + '-' + (showZoomHint ? 'c' : 'z');

    return `
      <div class="relative w-full h-full overflow-hidden bg-[#ede3ce] select-none flex items-center justify-center border border-stone-500/80 rounded-sm shadow-inner group">
        <svg viewBox="0 0 320 144" preserveAspectRatio="xMidYMid meet" class="w-full h-full block" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <!-- Warm Sketchbook Paper Background -->
            <radialGradient id="paper-grad-${uid}" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stop-color="#f7f2e7"/>
              <stop offset="70%" stop-color="#ede3ce"/>
              <stop offset="100%" stop-color="#dfd1b5"/>
            </radialGradient>
            <!-- Diagonal Pencil Cross-Hatching -->
            <pattern id="hatch-${uid}" width="6" height="6" patternTransform="rotate(35 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#44403c" stroke-width="0.65" opacity="0.28"/>
            </pattern>
            <pattern id="crosshatch-${uid}" width="6" height="6" patternTransform="rotate(-35 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#292524" stroke-width="0.65" opacity="0.22"/>
              <line x1="0" y1="0" x2="6" y2="0" stroke="#292524" stroke-width="0.55" opacity="0.18"/>
            </pattern>
            <!-- Hand-Drawn Ink Wobble Filter -->
            <filter id="sketch-${uid}" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" seed="7"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.45" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
          </defs>

          <!-- Paper Base -->
          <rect width="320" height="144" fill="url(#paper-grad-${uid})"/>

          <!-- Subtle Pencil Margin & Corner Ticks -->
          <rect x="6" y="6" width="308" height="132" fill="none" stroke="#78716c" stroke-width="0.7" stroke-dasharray="8,3,2,3" opacity="0.55"/>
          <path d="M 10 18 L 10 10 L 18 10 M 302 10 L 310 10 L 310 18 M 10 126 L 10 134 L 18 134 M 302 134 L 310 134 L 310 126" fill="none" stroke="#44403c" stroke-width="1.1" opacity="0.65"/>

          <!-- Main Hand-Drawn Ink & Pencil Artwork -->
          <g filter="url(#sketch-${uid})">
            ${bodySvg.replace(/__HATCH__/g, `url(#hatch-${uid})`).replace(/__CROSSHATCH__/g, `url(#crosshatch-${uid})`)}
          </g>
        </svg>
        <div class="absolute bottom-1 left-1.5 text-[8.5px] font-typewriter font-bold tracking-wider text-stone-800 uppercase bg-[#f5efe2]/85 border border-stone-500/60 px-1.5 py-0.2 rounded-sm shadow-xs pointer-events-none">
          Tav. ${cardNumber}
        </div>
        ${showZoomHint ? `
          <div class="absolute bottom-1 right-1.5 text-[8.5px] font-mono-tech font-bold bg-stone-900/80 group-hover:bg-amber-500 text-amber-300 group-hover:text-stone-950 border border-amber-500/50 px-1.5 py-0.2 rounded-sm shadow-xs transition pointer-events-none">
            🔎 Ingrandisci
          </div>
        ` : ''}
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
    // =========================================================================
    // SCENES & PLACES (HAND-DRAWN ARCHITECTURAL & COURTROOM SKETCHES)
    // =========================================================================
    'crime-scene-desk': `
      <!-- Perspective Ink Sketch of Mahogany Study Desk, Body, Cup & Window -->
      <!-- Window on left with rain streaks & curtain -->
      <path d="M 18 16 L 56 22 L 56 116 L 18 124 Z" fill="#dbeafe" fill-opacity="0.35" stroke="#292524" stroke-width="1.4"/>
      <line x1="37" y1="19" x2="37" y2="120" stroke="#292524" stroke-width="1.1"/>
      <line x1="18" y1="68" x2="56" y2="70" stroke="#292524" stroke-width="1.1"/>
      <path d="M 24 32 L 20 44 M 44 28 L 40 40 M 30 82 L 25 96 M 48 80 L 43 94" stroke="#1d4ed8" stroke-width="0.9" opacity="0.6"/>
      <path d="M 54 18 Q 66 55 58 118" fill="none" stroke="#44403c" stroke-width="1.5"/>
      <!-- Mahogany Desk in perspective -->
      <polygon points="82,46 274,46 296,108 64,108" fill="#d6c7b2" stroke="#1c1917" stroke-width="1.8"/>
      <polygon points="82,46 274,46 296,108 64,108" fill="__HATCH__"/>
      <path d="M 68 108 L 68 132 L 92 132 L 92 108 M 268 108 L 268 132 L 292 132 L 292 108" fill="#a8a29e" fill-opacity="0.35" stroke="#1c1917" stroke-width="1.6"/>
      <rect x="122" y="54" width="112" height="46" fill="#f5efe2" stroke="#292524" stroke-width="1.2"/>
      <!-- Slumped Figure Sketch (head & shoulders over blotter) -->
      <ellipse cx="178" cy="68" rx="15" ry="13" fill="#e7e5e4" stroke="#1c1917" stroke-width="1.8"/>
      <path d="M 168 62 C 173 56, 184 56, 188 63" fill="none" stroke="#1c1917" stroke-width="1.2"/>
      <path d="M 142 98 C 146 74, 162 72, 178 74 C 194 72, 210 74, 214 98" fill="__CROSSHATCH__" stroke="#1c1917" stroke-width="1.8"/>
      <!-- Left Hand & Fountain Pen + Ink Line -->
      <path d="M 142 86 L 112 80" stroke="#1c1917" stroke-width="3" stroke-linecap="round"/>
      <path d="M 96 68 L 118 83" stroke="#1d4ed8" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M 118 83 Q 130 85 136 78" fill="none" stroke="#1d4ed8" stroke-width="1.2"/>
      <circle cx="106" cy="75" r="12" fill="none" stroke="#b91c1c" stroke-width="1.2" stroke-dasharray="3,2"/>
      <text x="85" y="102" fill="#1c1917" font-family="Courier Prime, monospace" font-size="8" font-weight="bold">sx: stilografica</text>
      <!-- Right side Espresso Cup on Saucer -->
      <ellipse cx="256" cy="76" rx="13" ry="7" fill="#f5f5f4" stroke="#1c1917" stroke-width="1.3"/>
      <path d="M 248 68 L 250 77 C 253 80, 259 80, 262 77 L 264 68 Z" fill="#78350f" fill-opacity="0.7" stroke="#1c1917" stroke-width="1.3"/>
      <path d="M 264 70 C 269 70, 269 75, 263 75" fill="none" stroke="#1c1917" stroke-width="1.2"/>
      <circle cx="256" cy="73" r="16" fill="none" stroke="#b91c1c" stroke-width="1.2" stroke-dasharray="3,2"/>
      <text x="235" y="102" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8" font-weight="bold">dx: tazzina</text>
    `,

    'greenhouse-boots': `
      <!-- Botanical Greenhouse Arch, Pruning Shears, Mortar & Muddy Bootprint Sketch -->
      <!-- Glasshouse iron arches in background -->
      <path d="M 16 122 L 16 48 Q 75 12 134 48 L 134 122" fill="none" stroke="#57534e" stroke-width="1.3"/>
      <path d="M 45 122 L 45 34 M 75 122 L 75 26 M 105 122 L 105 34 M 16 68 L 134 68" stroke="#78716c" stroke-width="0.8"/>
      <!-- Yew branch (Taxus baccata) & Orchid sketch -->
      <path d="M 28 96 Q 55 72 88 54" fill="none" stroke="#1c1917" stroke-width="1.8"/>
      <path d="M 42 84 L 34 72 M 50 78 L 44 65 M 60 71 L 56 58 M 70 65 L 68 52 M 46 84 L 58 90 M 58 75 L 70 81 M 70 67 L 82 72" stroke="#15803d" stroke-width="1.6" stroke-linecap="round"/>
      <circle cx="55" cy="74" r="3" fill="#b91c1c" stroke="#1c1917" stroke-width="0.8"/>
      <circle cx="72" cy="64" r="3" fill="#b91c1c" stroke="#1c1917" stroke-width="0.8"/>
      <!-- Mortar & Pestle -->
      <path d="M 92 88 L 128 88 L 122 114 C 115 120, 105 120, 98 114 Z" fill="__CROSSHATCH__" stroke="#1c1917" stroke-width="1.6"/>
      <path d="M 116 70 L 106 92" stroke="#1c1917" stroke-width="3.2" stroke-linecap="round"/>
      <!-- Divider line -->
      <line x1="154" y1="18" x2="154" y2="128" stroke="#44403c" stroke-width="1" stroke-dasharray="4,3"/>
      <!-- Bootprint & Raincoat Sketch on Right -->
      <g transform="translate(170, 22)">
        <path d="M 24 14 C 12 14, 10 38, 15 54 C 18 62, 16 70, 14 78 L 34 78 C 32 70, 31 62, 34 54 C 39 38, 36 14, 24 14 Z" fill="__HATCH__" stroke="#1c1917" stroke-width="1.6"/>
        <rect x="14" y="81" width="20" height="14" rx="2" fill="__CROSSHATCH__" stroke="#1c1917" stroke-width="1.6"/>
        <line x1="44" y1="14" x2="44" y2="95" stroke="#b91c1c" stroke-width="1"/>
        <line x1="40" y1="14" x2="48" y2="14" stroke="#b91c1c" stroke-width="1"/>
        <line x1="40" y1="95" x2="48" y2="95" stroke="#b91c1c" stroke-width="1"/>
        <text x="50" y="56" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8.5" font-weight="bold">Tg. 38</text>
        <!-- Raincoat sketch -->
        <path d="M 92 18 L 108 12 L 124 18 L 134 48 L 122 52 L 118 34 L 118 94 L 98 94 L 98 34 L 94 52 L 82 48 Z" fill="#65a30d" fill-opacity="0.22" stroke="#1c1917" stroke-width="1.5"/>
        <rect x="101" y="62" width="12" height="14" fill="none" stroke="#1c1917" stroke-width="1.1"/>
        <circle cx="107" cy="69" r="9" fill="none" stroke="#b91c1c" stroke-width="1.1" stroke-dasharray="2,2"/>
      </g>
    `,

    // =========================================================================
    // FORENSIC & SCIENTIFIC DRAWINGS (DA VINCI / LAB NOTEBOOK SKETCHES)
    // =========================================================================
    'thermal-blood': `
      <!-- Hand-Drawn Body Supine Livor Mortis Diagram, Thermometer & Blood Drop -->
      <!-- Thermometer sketch -->
      <rect x="26" y="22" width="10" height="74" rx="5" fill="#f5f5f4" stroke="#1c1917" stroke-width="1.5"/>
      <circle cx="31" cy="102" r="10" fill="#b91c1c" stroke="#1c1917" stroke-width="1.5"/>
      <rect x="29" y="48" width="4" height="48" fill="#b91c1c"/>
      <line x1="36" y1="34" x2="43" y2="34" stroke="#1c1917" stroke-width="1.2"/>
      <text x="46" y="37" fill="#1c1917" font-family="Courier Prime, monospace" font-size="8">37°C (21:50)</text>
      <line x1="36" y1="54" x2="43" y2="54" stroke="#b91c1c" stroke-width="1.4"/>
      <text x="46" y="57" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8.5" font-weight="bold">34°C (23:50)</text>

      <!-- Anatomical Body Profile showing Dorsal Livor Mortis (Ipostasi dorsali) -->
      <g transform="translate(115, 28)">
        <circle cx="22" cy="18" r="11" fill="__HATCH__" stroke="#1c1917" stroke-width="1.5"/>
        <path d="M 33 22 C 55 20, 78 22, 102 25 C 108 32, 95 38, 34 34 Z" fill="__HATCH__" stroke="#1c1917" stroke-width="1.5"/>
        <!-- Crimson dorsal shading indicating fixed livor mortis on back -->
        <path d="M 20 29 C 45 34, 80 35, 102 32" fill="none" stroke="#b91c1c" stroke-width="3.5" opacity="0.75"/>
        <line x1="10" y1="36" x2="115" y2="36" stroke="#44403c" stroke-width="1.2" stroke-dasharray="4,2"/>
        <text x="14" y="50" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8" font-weight="bold">ipostasi dorsali (supino)</text>
        <!-- Door handle with Luminol blood drop -->
        <circle cx="30" cy="76" r="7" fill="none" stroke="#1c1917" stroke-width="1.5"/>
        <path d="M 30 76 L 72 76 C 76 76, 76 83, 72 83 L 35 83" fill="#d6d3d1" stroke="#1c1917" stroke-width="1.5"/>
        <path d="M 68 85 C 68 85, 61 96, 61 101 C 61 105, 64 108, 68 108 C 72 108, 75 105, 75 101 C 75 96, 68 85, 68 85 Z" fill="#b91c1c" stroke="#1c1917" stroke-width="1.2"/>
        <text x="82" y="104" fill="#991b1b" font-family="Courier Prime, monospace" font-size="9.5" font-weight="bold">Sangue 0-</text>
      </g>
    `,

    'toxicology-lab': `
      <!-- Hand-Drawn Eye Dropper Vial, Skull Symbol, Coffee Cup & Botanical Alkaloid Sketch -->
      <!-- Eye Dropper Bottle (Collirio) -->
      <g transform="translate(34, 20)">
        <path d="M 20 8 C 20 2, 32 2, 32 8 L 34 22 L 18 22 Z" fill="__CROSSHATCH__" stroke="#1c1917" stroke-width="1.5"/>
        <rect x="14" y="22" width="24" height="8" rx="1" fill="#d6d3d1" stroke="#1c1917" stroke-width="1.4"/>
        <path d="M 16 30 L 10 44 L 10 92 C 10 96, 42 96, 42 92 L 42 44 L 36 30 Z" fill="#f5f5f4" stroke="#1c1917" stroke-width="1.7"/>
        <path d="M 12 58 Q 26 62 40 58 L 40 90 L 12 90 Z" fill="#b91c1c" fill-opacity="0.32" stroke="#991b1b" stroke-width="1"/>
        <!-- Tiny skull sketch on label -->
        <circle cx="26" cy="70" r="6" fill="#f5efe2" stroke="#1c1917" stroke-width="1.2"/>
        <circle cx="24" cy="69" r="1.2" fill="#1c1917"/>
        <circle cx="28" cy="69" r="1.2" fill="#1c1917"/>
        <path d="M 18 82 L 34 76 M 18 76 L 34 82" stroke="#1c1917" stroke-width="1.2"/>
        <text x="2" y="110" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8" font-weight="bold">Aconitina + Atropina</text>
      </g>
      <!-- Anatomical Eye with falling drop -->
      <g transform="translate(128, 36)">
        <path d="M 8 32 Q 36 8 64 32 Q 36 56 8 32 Z" fill="#f5f5f4" stroke="#1c1917" stroke-width="1.6"/>
        <circle cx="36" cy="32" r="11" fill="__CROSSHATCH__" stroke="#1c1917" stroke-width="1.4"/>
        <circle cx="36" cy="32" r="4.5" fill="#1c1917"/>
        <path d="M 36 4 C 36 4, 31 12, 31 16 C 31 19, 33 21, 36 21 C 39 21, 41 19, 41 16 C 41 12, 36 4, 36 4 Z" fill="#b91c1c" stroke="#1c1917" stroke-width="1.1"/>
      </g>
      <!-- Chemical Benzene Ring & flasks on right -->
      <g transform="translate(216, 26)">
        <polygon points="36,12 56,24 56,46 36,58 16,46 16,24" fill="none" stroke="#1c1917" stroke-width="1.5"/>
        <circle cx="36" cy="35" r="12" fill="none" stroke="#1c1917" stroke-width="1.1" stroke-dasharray="3,2"/>
        <path d="M 56 24 L 72 16 M 56 46 L 72 54 M 16 46 L 4 54" stroke="#1c1917" stroke-width="1.3"/>
        <text x="6" y="82" fill="#1c1917" font-family="Courier Prime, monospace" font-size="8">Tassina B (caffè)</text>
        <text x="6" y="95" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8" font-weight="bold">0 tracce saliva</text>
      </g>
    `,

    'autopsy-ecg': `
      <!-- Anatomical Heart Sketch, Wristwatch at 21:51 & Flatlining Ink Trace -->
      <!-- Da Vinci style Anatomical Heart sketch on left -->
      <g transform="translate(24, 20)">
        <path d="M 34 26 C 20 22, 12 36, 16 54 C 20 74, 38 92, 44 96 C 50 92, 66 72, 64 50 C 62 34, 48 24, 34 26 Z" fill="__CROSSHATCH__" stroke="#1c1917" stroke-width="1.7"/>
        <path d="M 34 26 C 20 22, 12 36, 16 54 C 20 74, 38 92, 44 96" fill="#b91c1c" fill-opacity="0.22"/>
        <!-- Aorta & vessels -->
        <path d="M 30 26 L 28 10 L 36 10 L 38 26 M 42 26 C 44 12, 56 12, 58 22" fill="none" stroke="#1c1917" stroke-width="1.6"/>
        <!-- Coronary veins -->
        <path d="M 38 36 Q 42 58 34 78 M 39 50 L 52 60 M 36 60 L 24 68" fill="none" stroke="#991b1b" stroke-width="1.2"/>
      </g>
      <!-- Millimeter Graph & Ink ECG Line -->
      <rect x="108" y="24" width="190" height="68" fill="#f5efe2" stroke="#78716c" stroke-width="1"/>
      <path d="M 108 46 L 298 46 M 108 68 L 298 68 M 148 24 L 148 92 M 188 24 L 188 92 M 228 24 L 228 92 M 268 24 L 268 92" stroke="#a8a29e" stroke-width="0.5" stroke-dasharray="2,2"/>
      <polyline points="114,62 134,62 140,48 145,76 151,28 157,84 163,56 172,62 186,62 192,34 198,82 204,32 210,80 218,62 292,62" fill="none" stroke="#b91c1c" stroke-width="2"/>
      <circle cx="218" cy="62" r="3.5" fill="#991b1b"/>
      <text x="222" y="54" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8.5" font-weight="bold">21:51 arresto</text>
      <text x="112" y="114" fill="#1c1917" font-family="Courier Prime, monospace" font-size="8.5">Stomaco: 0,0 mg | Occhi: Aconitina+</text>
    `,

    // =========================================================================
    // PORTRAIT SKETCHES OF WITNESSES & SUSPECTS (CHARCOAL & INK PORTRAITS)
    // =========================================================================
    'witness-clara': `
      <!-- Hand-Drawn Portrait of Dr. Clara Valli (Glasses, Lab Coat, Cigarette Holder) -->
      <g transform="translate(24, 14)">
        <rect x="0" y="4" width="84" height="108" fill="#f5efe2" stroke="#1c1917" stroke-width="1.5"/>
        <rect x="4" y="8" width="76" height="100" fill="__HATCH__" stroke="#57534e" stroke-width="0.7"/>
        <!-- Hair & Face -->
        <path d="M 22 46 C 20 22, 64 22, 62 46 C 64 60, 68 72, 64 78" fill="__CROSSHATCH__" stroke="#1c1917" stroke-width="1.5"/>
        <path d="M 26 42 C 26 62, 34 72, 42 72 C 50 72, 58 62, 58 42 C 58 28, 26 28, 26 42 Z" fill="#f5efe2" stroke="#1c1917" stroke-width="1.5"/>
        <!-- Rectangular Glasses -->
        <rect x="29" y="42" width="11" height="7" fill="none" stroke="#1c1917" stroke-width="1.4"/>
        <rect x="44" y="42" width="11" height="7" fill="none" stroke="#1c1917" stroke-width="1.4"/>
        <line x1="40" y1="45" x2="44" y2="45" stroke="#1c1917" stroke-width="1.3"/>
        <circle cx="34.5" cy="45.5" r="1.2" fill="#1c1917"/>
        <circle cx="49.5" cy="45.5" r="1.2" fill="#1c1917"/>
        <path d="M 42 47 L 40 55 L 43 56" fill="none" stroke="#1c1917" stroke-width="1.1"/>
        <path d="M 37 62 Q 42 64 47 62" fill="none" stroke="#1c1917" stroke-width="1.2"/>
        <!-- Lab coat lapels -->
        <path d="M 12 108 C 16 82, 28 76, 42 76 C 56 76, 68 82, 72 108" fill="#f5f5f4" stroke="#1c1917" stroke-width="1.6"/>
        <path d="M 32 76 L 42 98 L 52 76" fill="none" stroke="#1c1917" stroke-width="1.3"/>
      </g>
      <!-- Notebook Sketch Notes on Right -->
      <g transform="translate(126, 24)">
        <text x="0" y="14" fill="#1c1917" font-family="Courier Prime, monospace" font-size="10" font-weight="bold">Dott.ssa Clara Valli</text>
        <line x1="0" y1="20" x2="170" y2="20" stroke="#1c1917" stroke-width="1"/>
        <text x="0" y="38" fill="#292524" font-family="Courier Prime, monospace" font-size="8.5">• Studio vittima fino alle 21:15</text>
        <text x="0" y="54" fill="#292524" font-family="Courier Prime, monospace" font-size="8.5">• Impermeabile verde in spogliatoio</text>
        <text x="0" y="70" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8.5" font-weight="bold">• Destrorsa | A+ | Calzature 39</text>
        <!-- Sketched fountain pen signature -->
        <path d="M 6 92 Q 28 80 42 92 T 78 88" fill="none" stroke="#1d4ed8" stroke-width="1.3"/>
      </g>
    `,

    'witness-lorenzo': `
      <!-- Hand-Drawn Portrait of Lorenzo Morosini (Young Architect, Scarf, Sports Car Sketch) -->
      <g transform="translate(24, 14)">
        <rect x="0" y="4" width="84" height="108" fill="#f5efe2" stroke="#1c1917" stroke-width="1.5"/>
        <rect x="4" y="8" width="76" height="100" fill="__HATCH__" stroke="#57534e" stroke-width="0.7"/>
        <!-- Wavy hair & angular face -->
        <path d="M 24 38 C 22 20, 62 18, 60 38" fill="__CROSSHATCH__" stroke="#1c1917" stroke-width="1.6"/>
        <path d="M 26 40 C 26 60, 34 72, 42 72 C 50 72, 58 60, 58 40 C 58 28, 26 28, 26 40 Z" fill="#f5efe2" stroke="#1c1917" stroke-width="1.5"/>
        <circle cx="35" cy="45" r="1.4" fill="#1c1917"/>
        <circle cx="49" cy="45" r="1.4" fill="#1c1917"/>
        <path d="M 31 40 L 38 41 M 46 41 L 53 40" stroke="#1c1917" stroke-width="1.3"/>
        <path d="M 42 45 L 41 54 L 44 55" fill="none" stroke="#1c1917" stroke-width="1.2"/>
        <path d="M 37 62 L 47 61" stroke="#1c1917" stroke-width="1.2"/>
        <!-- Jacket & Architect turtleneck -->
        <path d="M 12 108 C 16 82, 28 76, 42 76 C 56 76, 68 82, 72 108" fill="__CROSSHATCH__" stroke="#1c1917" stroke-width="1.6"/>
      </g>
      <!-- Sketched Car & Receipt on Right -->
      <g transform="translate(126, 22)">
        <text x="0" y="14" fill="#1c1917" font-family="Courier Prime, monospace" font-size="10" font-weight="bold">Lorenzo Morosini (Nipote)</text>
        <line x1="0" y1="20" x2="170" y2="20" stroke="#1c1917" stroke-width="1"/>
        <!-- Sketch of Alfa Romeo silhouette -->
        <path d="M 8 56 L 22 42 L 58 42 L 74 54 L 92 56 L 92 68 L 6 68 Z" fill="#f5efe2" stroke="#1c1917" stroke-width="1.4"/>
        <circle cx="24" cy="68" r="8" fill="#d6d3d1" stroke="#1c1917" stroke-width="1.5"/>
        <circle cx="72" cy="68" r="8" fill="#d6d3d1" stroke="#1c1917" stroke-width="1.5"/>
        <text x="102" y="54" fill="#1c1917" font-family="Courier Prime, monospace" font-size="8.5" font-weight="bold">GK-412-TR</text>
        <text x="102" y="68" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8">Como 20:30-23:15?</text>
        <text x="0" y="94" fill="#292524" font-family="Courier Prime, monospace" font-size="8.5">• Scontrino POS ore 22:35 (€64)</text>
      </g>
    `,

    'witness-beatrice': `
      <!-- Hand-Drawn Portrait of Beatrice Sartori (Housekeeper, Bun Hair, Espresso Tray) -->
      <g transform="translate(24, 14)">
        <rect x="0" y="4" width="84" height="108" fill="#f5efe2" stroke="#1c1917" stroke-width="1.5"/>
        <rect x="4" y="8" width="76" height="100" fill="__HATCH__" stroke="#57534e" stroke-width="0.7"/>
        <!-- Hair bun -->
        <circle cx="42" cy="20" r="10" fill="__CROSSHATCH__" stroke="#1c1917" stroke-width="1.4"/>
        <path d="M 26 42 C 26 62, 34 72, 42 72 C 50 72, 58 62, 58 42 C 58 26, 26 26, 26 42 Z" fill="#f5efe2" stroke="#1c1917" stroke-width="1.5"/>
        <circle cx="35" cy="46" r="1.3" fill="#1c1917"/>
        <circle cx="49" cy="46" r="1.3" fill="#1c1917"/>
        <path d="M 32 52 Q 36 54 39 52 M 45 52 Q 48 54 52 52" fill="none" stroke="#78716c" stroke-width="0.8"/>
        <path d="M 42 46 L 40 55 L 43 56" fill="none" stroke="#1c1917" stroke-width="1.1"/>
        <path d="M 36 63 Q 42 61 48 63" fill="none" stroke="#1c1917" stroke-width="1.2"/>
        <path d="M 12 108 C 16 82, 28 76, 42 76 C 56 76, 68 82, 72 108" fill="__HATCH__" stroke="#1c1917" stroke-width="1.6"/>
      </g>
      <g transform="translate(126, 24)">
        <text x="0" y="14" fill="#1c1917" font-family="Courier Prime, monospace" font-size="10" font-weight="bold">Beatrice Sartori</text>
        <line x1="0" y1="20" x2="170" y2="20" stroke="#1c1917" stroke-width="1"/>
        <text x="0" y="38" fill="#292524" font-family="Courier Prime, monospace" font-size="8.5">• Caffè servito alle ore 21:39</text>
        <text x="0" y="54" fill="#292524" font-family="Courier Prime, monospace" font-size="8.5">• Codice Serra #9901 (con Rinaldi)</text>
        <text x="0" y="70" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8.5" font-weight="bold">• Taglia 38 | Coltiva Taxus</text>
        <!-- Key & Cup doodle -->
        <circle cx="18" cy="90" r="6" fill="none" stroke="#1c1917" stroke-width="1.3"/>
        <path d="M 24 90 L 44 90 M 38 90 L 38 95 M 42 90 L 42 95" stroke="#1c1917" stroke-width="1.3"/>
      </g>
    `,

    'witness-matteo': `
      <!-- Hand-Drawn Portrait of Matteo Rinaldi (Security Chief, Scar/Cut on Right Index Finger) -->
      <g transform="translate(24, 14)">
        <rect x="0" y="4" width="84" height="108" fill="#f5efe2" stroke="#1c1917" stroke-width="1.5"/>
        <rect x="4" y="8" width="76" height="100" fill="__HATCH__" stroke="#57534e" stroke-width="0.7"/>
        <!-- Short military crop hair & stern jaw -->
        <path d="M 25 40 C 25 62, 32 73, 42 73 C 52 73, 59 62, 59 40 C 59 25, 25 25, 25 40 Z" fill="#f5efe2" stroke="#1c1917" stroke-width="1.6"/>
        <path d="M 25 35 L 59 35" stroke="#1c1917" stroke-width="2.5"/>
        <circle cx="35" cy="45" r="1.4" fill="#1c1917"/>
        <circle cx="49" cy="45" r="1.4" fill="#1c1917"/>
        <path d="M 30 40 L 39 42 M 45 42 L 54 40" stroke="#1c1917" stroke-width="1.5"/>
        <path d="M 42 45 L 40 55 L 44 55" fill="none" stroke="#1c1917" stroke-width="1.2"/>
        <line x1="35" y1="63" x2="49" y2="63" stroke="#1c1917" stroke-width="1.4"/>
        <path d="M 10 108 C 14 80, 28 76, 42 76 C 56 76, 70 80, 74 108" fill="__CROSSHATCH__" stroke="#1c1917" stroke-width="1.7"/>
      </g>
      <!-- Hand Sketch with 8mm Fresh Cut on Right Index Finger -->
      <g transform="translate(126, 22)">
        <text x="0" y="14" fill="#1c1917" font-family="Courier Prime, monospace" font-size="10" font-weight="bold">Matteo Rinaldi (Sicurezza)</text>
        <line x1="0" y1="20" x2="170" y2="20" stroke="#1c1917" stroke-width="1"/>
        <!-- Sketch of right hand & cut -->
        <path d="M 14 88 L 14 58 C 14 54, 20 54, 20 58 L 20 42 C 20 37, 27 37, 27 42 L 27 56 L 29 38 C 29 34, 36 34, 36 38 L 36 56 L 38 44 C 38 40, 44 40, 44 44 L 44 88 Z" fill="#f5efe2" stroke="#1c1917" stroke-width="1.4"/>
        <!-- Red cut on index finger -->
        <line x1="19" y1="47" x2="28" y2="51" stroke="#b91c1c" stroke-width="2.2"/>
        <circle cx="23" cy="49" r="9" fill="none" stroke="#b91c1c" stroke-width="1.2" stroke-dasharray="2,2"/>
        <text x="56" y="48" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8.5" font-weight="bold">Taglio 8mm (Indice DX)</text>
        <text x="56" y="64" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8.5" font-weight="bold">Gruppo: 0 Negativo (0-)</text>
        <text x="56" y="80" fill="#292524" font-family="Courier Prime, monospace" font-size="8">Anfibi Vibram Tg. 44</text>
      </g>
    `,

    // =========================================================================
    // DOCUMENTS, LOGS & REGISTRIES (SKETCHED LEDGERS, KEYS, PADLOCKS & DOSSIERS)
    // =========================================================================
    'digital-logs': `
      <!-- Sketched Toll Gate Camera, Credit Card Receipt & Keypad Lock -->
      <!-- Toll Gate barrier on left -->
      <g transform="translate(18, 24)">
        <rect x="4" y="42" width="16" height="44" fill="__CROSSHATCH__" stroke="#1c1917" stroke-width="1.5"/>
        <path d="M 20 52 L 84 32 L 86 38 L 20 58 Z" fill="#f5efe2" stroke="#1c1917" stroke-width="1.4"/>
        <text x="4" y="102" fill="#1c1917" font-family="Courier Prime, monospace" font-size="8" font-weight="bold">SS340: 0 transiti</text>
      </g>
      <!-- Paper POS Receipt in middle -->
      <g transform="translate(118, 18)">
        <path d="M 0 6 L 6 0 L 12 6 L 18 0 L 24 6 L 30 0 L 36 6 L 42 0 L 48 6 L 54 0 L 60 6 L 66 0 L 72 6 L 72 96 L 0 96 Z" fill="#fafaf9" stroke="#1c1917" stroke-width="1.4"/>
        <text x="8" y="24" fill="#1c1917" font-family="Courier Prime, monospace" font-size="7.5" font-weight="bold">LA DARSENA</text>
        <line x1="6" y1="30" x2="66" y2="30" stroke="#78716c" stroke-width="0.8" stroke-dasharray="2,2"/>
        <text x="8" y="44" fill="#1c1917" font-family="Courier Prime, monospace" font-size="7.5">Ore 22:35</text>
        <text x="8" y="56" fill="#1c1917" font-family="Courier Prime, monospace" font-size="8" font-weight="bold">EUR 64,00</text>
        <text x="6" y="74" fill="#991b1b" font-family="Courier Prime, monospace" font-size="7" font-weight="bold">ApplePay:</text>
        <text x="6" y="85" fill="#991b1b" font-family="Courier Prime, monospace" font-size="7" font-weight="bold">Camilla Neri</text>
      </g>
      <!-- Electronic Keypad on right -->
      <g transform="translate(212, 22)">
        <rect x="8" y="4" width="74" height="90" rx="4" fill="__HATCH__" stroke="#1c1917" stroke-width="1.6"/>
        <rect x="16" y="12" width="58" height="18" fill="#f5efe2" stroke="#1c1917" stroke-width="1.2"/>
        <text x="22" y="24" fill="#991b1b" font-family="Courier Prime, monospace" font-size="9" font-weight="bold"># 9 9 0 1</text>
        <path d="M 22 40 h 10 v 8 h -10 z M 40 40 h 10 v 8 h -10 z M 58 40 h 10 v 8 h -10 z M 22 54 h 10 v 8 h -10 z M 40 54 h 10 v 8 h -10 z M 58 54 h 10 v 8 h -10 z" fill="#f5efe2" stroke="#1c1917" stroke-width="1"/>
        <text x="6" y="106" fill="#1c1917" font-family="Courier Prime, monospace" font-size="8" font-weight="bold">Serra 21:22-21:38</text>
      </g>
    `,

    'vault-registry': `
      <!-- Sketched Poison Cabinet Ledger Book, Vial & Security Badge #SEC-01 -->
      <!-- Open Ledger Book -->
      <g transform="translate(20, 22)">
        <path d="M 4 12 Q 46 4 88 12 Q 130 4 172 12 L 172 96 Q 130 88 88 96 Q 46 88 4 96 Z" fill="#fafaf9" stroke="#1c1917" stroke-width="1.7"/>
        <line x1="88" y1="12" x2="88" y2="96" stroke="#1c1917" stroke-width="1.4"/>
        <text x="12" y="28" fill="#1c1917" font-family="Courier Prime, monospace" font-size="8" font-weight="bold">REGISTRO VELENI</text>
        <line x1="12" y1="33" x2="80" y2="33" stroke="#78716c" stroke-width="0.8"/>
        <text x="12" y="48" fill="#292524" font-family="Courier Prime, monospace" font-size="7.5">12 Nov - 18:40</text>
        <text x="12" y="62" fill="#991b1b" font-family="Courier Prime, monospace" font-size="7.5" font-weight="bold">Aconitina 50mg</text>
        <text x="12" y="75" fill="#991b1b" font-family="Courier Prime, monospace" font-size="7.5" font-weight="bold">Atropina solf.</text>
        <text x="96" y="34" fill="#1c1917" font-family="Courier Prime, monospace" font-size="7.5">Autorizzazione:</text>
        <rect x="96" y="42" width="68" height="22" fill="#fef3c7" stroke="#991b1b" stroke-width="1.2"/>
        <text x="101" y="56" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8.5" font-weight="bold">BADGE #SEC-01</text>
        <text x="96" y="78" fill="#1c1917" font-family="Courier Prime, monospace" font-size="7.5" font-weight="bold">M. Rinaldi</text>
      </g>
      <!-- Sketched Keycard & Glass Ampoule on Right -->
      <g transform="translate(214, 24)">
        <rect x="6" y="18" width="46" height="68" rx="3" fill="__HATCH__" stroke="#1c1917" stroke-width="1.5"/>
        <circle cx="29" cy="26" r="3" fill="#f5efe2" stroke="#1c1917" stroke-width="1"/>
        <line x1="14" y1="42" x2="44" y2="42" stroke="#1c1917" stroke-width="2"/>
        <text x="12" y="62" fill="#991b1b" font-family="Courier Prime, monospace" font-size="7.5" font-weight="bold">SEC-01</text>
        <!-- Ampoule -->
        <path d="M 68 18 L 72 8 L 76 18 L 80 32 L 80 78 L 64 78 L 64 32 Z" fill="#f5efe2" stroke="#1c1917" stroke-width="1.4"/>
        <rect x="65" y="48" width="14" height="24" fill="#b91c1c" fill-opacity="0.35"/>
      </g>
    `,

    'forensic-digital': `
      <!-- Sketched Legal Dossier, Vibram Sole Print Tg.44 & Cut CCTV Camera -->
      <!-- Dossier Folder on Left -->
      <g transform="translate(18, 22)">
        <path d="M 4 12 L 42 12 L 50 20 L 116 20 L 116 96 L 4 96 Z" fill="#f5efe2" stroke="#1c1917" stroke-width="1.6"/>
        <rect x="12" y="28" width="96" height="60" fill="#fafaf9" stroke="#44403c" stroke-width="1"/>
        <text x="18" y="42" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8" font-weight="bold">DENUNCIA PENALE</text>
        <text x="18" y="56" fill="#1c1917" font-family="Courier Prime, monospace" font-size="7.5">Brevetto MBP-9</text>
        <text x="18" y="70" fill="#1c1917" font-family="Courier Prime, monospace" font-size="7.5">Conto Basilea:</text>
        <text x="18" y="82" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8" font-weight="bold">450.000 CHF</text>
      </g>
      <!-- CCTV Camera & Vibram Boot Sole on Right -->
      <g transform="translate(154, 22)">
        <!-- CCTV camera sketch -->
        <polygon points="8,24 54,14 60,34 14,44" fill="__CROSSHATCH__" stroke="#1c1917" stroke-width="1.5"/>
        <path d="M 36 39 L 36 52 L 12 52" fill="none" stroke="#1c1917" stroke-width="1.6"/>
        <line x1="16" y1="10" x2="52" y2="48" stroke="#b91c1c" stroke-width="2.2"/>
        <text x="66" y="28" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8" font-weight="bold">OFF: 23:04-23:08</text>
        <!-- Vibram lug sole tread sketch -->
        <rect x="12" y="64" width="128" height="32" rx="12" fill="__HATCH__" stroke="#1c1917" stroke-width="1.5"/>
        <path d="M 26 68 v 8 M 42 68 v 8 M 58 68 v 8 M 74 68 v 8 M 90 68 v 8 M 26 84 v 8 M 42 84 v 8 M 58 84 v 8 M 74 84 v 8 M 90 84 v 8" stroke="#1c1917" stroke-width="2"/>
        <text x="98" y="83" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8" font-weight="bold">TG.44</text>
      </g>
    `,

    // =========================================================================
    // NEW CASE #718-VE: GRAN TEATRO VENEZIA — "REQUIEM PER L'AUTOMA D'ORO"
    // =========================================================================
    'fenice-dressing-room': `
      <!-- Sketch of Maestro Contarini in Dressing Room, Vanity Mirror, Murano Glass Dagger & Automaton -->
      <!-- Ornate Venetian Mirror with bulbs -->
      <rect x="28" y="18" width="96" height="68" rx="6" fill="#e7e5e4" fill-opacity="0.5" stroke="#1c1917" stroke-width="1.8"/>
      <path d="M 38 28 L 58 48 M 46 26 L 68 48" stroke="#78716c" stroke-width="0.9"/>
      <circle cx="28" cy="28" r="3" fill="#fef08a" stroke="#1c1917" stroke-width="1"/>
      <circle cx="28" cy="52" r="3" fill="#fef08a" stroke="#1c1917" stroke-width="1"/>
      <circle cx="28" cy="76" r="3" fill="#fef08a" stroke="#1c1917" stroke-width="1"/>
      <circle cx="124" cy="28" r="3" fill="#fef08a" stroke="#1c1917" stroke-width="1"/>
      <circle cx="124" cy="52" r="3" fill="#fef08a" stroke="#1c1917" stroke-width="1"/>
      <circle cx="124" cy="76" r="3" fill="#fef08a" stroke="#1c1917" stroke-width="1"/>
      <!-- Maestro figure in tuxedo with twisted Murano glass stiletto in chest -->
      <circle cx="76" cy="50" r="12" fill="#f5efe2" stroke="#1c1917" stroke-width="1.6"/>
      <path d="M 48 116 C 52 78, 100 78, 104 116" fill="__CROSSHATCH__" stroke="#1c1917" stroke-width="1.8"/>
      <!-- Murano Glass Stiletto hilt protruding -->
      <path d="M 68 88 L 52 72" stroke="#0284c7" stroke-width="2.6" stroke-linecap="round"/>
      <circle cx="50" cy="70" r="4" fill="#38bdf8" stroke="#1c1917" stroke-width="1.2"/>
      <circle cx="64" cy="84" r="11" fill="none" stroke="#b91c1c" stroke-width="1.3" stroke-dasharray="3,2"/>
      <!-- Dressing Table on Right with Overturned Champagne Flute & Golden Automaton -->
      <line x1="138" y1="96" x2="300" y2="96" stroke="#1c1917" stroke-width="2"/>
      <!-- Overturned flute -->
      <path d="M 158 92 L 184 84 L 184 95 Z" fill="#fda4af" fill-opacity="0.5" stroke="#1c1917" stroke-width="1.3"/>
      <line x1="144" y1="92" x2="158" y2="92" stroke="#1c1917" stroke-width="1.3"/>
      <!-- Clockwork Automaton on pedestal -->
      <rect x="224" y="68" width="52" height="28" fill="__HATCH__" stroke="#1c1917" stroke-width="1.6"/>
      <circle cx="250" cy="40" r="9" fill="#fef08a" fill-opacity="0.5" stroke="#1c1917" stroke-width="1.4"/>
      <path d="M 236 68 C 238 50, 262 50, 264 68" fill="#fef08a" fill-opacity="0.35" stroke="#1c1917" stroke-width="1.5"/>
      <text x="215" y="114" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8" font-weight="bold">Automa d'Oro (1768)</text>
    `,

    'fenice-locked-door': `
      <!-- Sketch of Heavy Dressing Room Door, Inner Bolt, Silk Harp Thread & Acoustic Vent -->
      <!-- Door & Frame -->
      <rect x="30" y="16" width="82" height="110" fill="__HATCH__" stroke="#1c1917" stroke-width="1.8"/>
      <rect x="40" y="26" width="62" height="40" fill="none" stroke="#1c1917" stroke-width="1.1"/>
      <rect x="40" y="74" width="62" height="42" fill="none" stroke="#1c1917" stroke-width="1.1"/>
      <!-- Sliding Bolt (Chiavistello interno) -->
      <rect x="86" y="64" width="32" height="8" fill="#78716c" stroke="#1c1917" stroke-width="1.4"/>
      <!-- Broken golden silk harp thread looping from bolt under door threshold -->
      <path d="M 96 72 C 96 98, 92 118, 126 124" fill="none" stroke="#b91c1c" stroke-width="1.6" stroke-dasharray="3,2"/>
      <circle cx="96" cy="70" r="10" fill="none" stroke="#b91c1c" stroke-width="1.2"/>
      <text x="122" y="118" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8" font-weight="bold">Filo di seta spezzato</text>
      <!-- Acoustic Ventilation Grate on Right -->
      <g transform="translate(178, 24)">
        <rect x="0" y="0" width="110" height="68" fill="#f5efe2" stroke="#1c1917" stroke-width="1.6"/>
        <line x1="10" y1="14" x2="100" y2="14" stroke="#1c1917" stroke-width="1.4"/>
        <line x1="10" y1="26" x2="100" y2="26" stroke="#1c1917" stroke-width="1.4"/>
        <line x1="10" y1="38" x2="100" y2="38" stroke="#1c1917" stroke-width="1.4"/>
        <line x1="10" y1="50" x2="100" y2="50" stroke="#1c1917" stroke-width="1.4"/>
        <!-- Unscrewed bottom right screw & rosin dust -->
        <circle cx="8" cy="8" r="2.5" fill="#1c1917"/>
        <circle cx="102" cy="8" r="2.5" fill="#1c1917"/>
        <circle cx="8" cy="60" r="2.5" fill="#1c1917"/>
        <circle cx="102" cy="60" r="6" fill="none" stroke="#b91c1c" stroke-width="1.3"/>
        <text x="0" y="84" fill="#1c1917" font-family="Courier Prime, monospace" font-size="8">Griglia condotto acustico</text>
      </g>
    `,

    'fenice-autopsy': `
      <!-- Forensic Sketch: Bloodless Chest Wound vs Finger Micro-Puncture & Holter 22:14 -->
      <!-- Torso diagram showing bloodless post-mortem stab wound -->
      <g transform="translate(22, 18)">
        <path d="M 18 16 L 34 8 L 58 8 L 74 16 L 68 88 L 24 88 Z" fill="#f5efe2" stroke="#1c1917" stroke-width="1.6"/>
        <line x1="46" y1="12" x2="46" y2="86" stroke="#78716c" stroke-width="0.8" stroke-dasharray="2,2"/>
        <!-- Ribcage sketch lines -->
        <path d="M 30 28 Q 46 34 62 28 M 28 40 Q 46 46 64 40 M 30 52 Q 46 58 62 52" fill="none" stroke="#78716c" stroke-width="1"/>
        <!-- Post-mortem wound mark -->
        <line x1="50" y1="36" x2="60" y2="44" stroke="#0284c7" stroke-width="2.5"/>
        <circle cx="55" cy="40" r="10" fill="none" stroke="#b91c1c" stroke-width="1.2" stroke-dasharray="2,2"/>
        <text x="2" y="104" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8" font-weight="bold">Ferita esangue (Post-Mortem!)</text>
      </g>
      <!-- Magnified Right Index Finger Tip with Micro-Puncture & Holter Trace -->
      <g transform="translate(154, 18)">
        <circle cx="42" cy="44" r="30" fill="#fafaf9" stroke="#1c1917" stroke-width="1.6"/>
        <!-- Finger tip inside magnifying glass -->
        <path d="M 28 70 L 28 38 C 28 24, 56 24, 56 38 L 56 70" fill="#f5efe2" stroke="#1c1917" stroke-width="1.5"/>
        <path d="M 34 36 C 34 29, 50 29, 50 36" fill="none" stroke="#78716c" stroke-width="0.9"/>
        <!-- Tiny black/red puncture dot on finger pad -->
        <circle cx="42" cy="46" r="2.5" fill="#991b1b"/>
        <circle cx="42" cy="46" r="7" fill="none" stroke="#b91c1c" stroke-width="1.2"/>
        <text x="80" y="34" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8.5" font-weight="bold">Tetrodotossina</text>
        <text x="80" y="48" fill="#1c1917" font-family="Courier Prime, monospace" font-size="8">Polpastrello DX</text>
        <text x="80" y="66" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8.5" font-weight="bold">Holter: 22:14</text>
        <text x="8" y="104" fill="#1c1917" font-family="Courier Prime, monospace" font-size="8">Stomaco: 0 mg Digitalina</text>
      </g>
    `,

    'fenice-automaton': `
      <!-- Detailed Da Vinci Clockwork Drawing of 1768 Golden Automaton, Gears & Poisoned Winding Key -->
      <!-- Clockwork gears & mainspring barrel -->
      <g transform="translate(24, 18)">
        <circle cx="52" cy="52" r="34" fill="#fef08a" fill-opacity="0.25" stroke="#1c1917" stroke-width="1.8"/>
        <circle cx="52" cy="52" r="26" fill="none" stroke="#1c1917" stroke-width="1.2" stroke-dasharray="4,3"/>
        <!-- Coiled spiral mainspring -->
        <path d="M 52 52 C 56 48, 60 54, 54 58 C 46 64, 38 52, 46 42 C 56 32, 70 46, 62 62 C 52 76, 30 62, 38 40" fill="none" stroke="#1c1917" stroke-width="1.5"/>
        <!-- Interlocking second gear -->
        <circle cx="102" cy="36" r="18" fill="__HATCH__" stroke="#1c1917" stroke-width="1.5"/>
        <circle cx="102" cy="36" r="5" fill="#f5efe2" stroke="#1c1917" stroke-width="1.2"/>
        <text x="8" y="104" fill="#1c1917" font-family="Courier Prime, monospace" font-size="8">Olio Moebius 9010 + Ottone</text>
      </g>
      <!-- Ornate Winding Key with Spring-Loaded Micro-Needle -->
      <g transform="translate(166, 22)">
        <circle cx="32" cy="44" r="18" fill="none" stroke="#1c1917" stroke-width="2"/>
        <circle cx="32" cy="44" r="8" fill="none" stroke="#1c1917" stroke-width="1.3"/>
        <rect x="50" y="40" width="58" height="8" fill="#fef08a" fill-opacity="0.4" stroke="#1c1917" stroke-width="1.6"/>
        <!-- Spring needle popping out of key collar at 3rd turn -->
        <path d="M 46 40 L 38 22" stroke="#b91c1c" stroke-width="2.2"/>
        <circle cx="38" cy="22" r="3" fill="#b91c1c"/>
        <circle cx="42" cy="30" r="12" fill="none" stroke="#b91c1c" stroke-width="1.2" stroke-dasharray="2,2"/>
        <text x="58" y="24" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8" font-weight="bold">Micro-ago a scatto</text>
        <text x="12" y="88" fill="#1c1917" font-family="Courier Prime, monospace" font-size="8">Carica abituale: ore 22:12</text>
      </g>
    `,

    'fenice-champagne-dagger': `
      <!-- Sketch of Gold-Rimmed Champagne Flute (Digitalis) & Broken Murano Glass Stiletto (B- Blood) -->
      <!-- Gold-rimmed Flute on Left -->
      <g transform="translate(28, 18)">
        <path d="M 18 12 L 46 12 L 40 62 C 36 72, 28 72, 24 62 Z" fill="#fda4af" fill-opacity="0.3" stroke="#1c1917" stroke-width="1.6"/>
        <line x1="18" y1="14" x2="46" y2="14" stroke="#d97706" stroke-width="2.8"/>
        <line x1="32" y1="69" x2="32" y2="96" stroke="#1c1917" stroke-width="1.6"/>
        <ellipse cx="32" cy="96" rx="14" ry="4" fill="none" stroke="#1c1917" stroke-width="1.5"/>
        <text x="0" y="112" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8" font-weight="bold">Digitalina 120mg (Rossetto)</text>
      </g>
      <!-- Broken Murano Glass Stiletto on Right -->
      <g transform="translate(152, 20)">
        <!-- Ornate spiral glass handle -->
        <path d="M 12 52 L 54 52" stroke="#1c1917" stroke-width="6" stroke-linecap="round"/>
        <path d="M 54 36 L 54 68" stroke="#1c1917" stroke-width="3.5" stroke-linecap="round"/>
        <!-- Fractured glass blade -->
        <polygon points="54,45 122,48 108,54 134,58 54,59" fill="#bae6fd" fill-opacity="0.55" stroke="#1c1917" stroke-width="1.5"/>
        <!-- Blood drop B- on guard & rosin dust -->
        <path d="M 58 68 C 58 68, 52 78, 52 82 C 52 86, 55 88, 58 88 C 61 88, 64 86, 64 82 C 64 78, 58 68, 58 68 Z" fill="#b91c1c" stroke="#1c1917" stroke-width="1.1"/>
        <text x="70" y="85" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8.5" font-weight="bold">Sangue B- sull'elsa</text>
        <text x="12" y="110" fill="#1c1917" font-family="Courier Prime, monospace" font-size="8">+ Tracce di pece (colofonia)</text>
      </g>
    `,

    'fenice-soprano': `
      <!-- Portrait Sketch of Flavia De Santis (Prima Soprano, Pearl Necklace, Opera Tiara) -->
      <g transform="translate(24, 14)">
        <rect x="0" y="4" width="84" height="108" fill="#f5efe2" stroke="#1c1917" stroke-width="1.5"/>
        <rect x="4" y="8" width="76" height="100" fill="__HATCH__" stroke="#57534e" stroke-width="0.7"/>
        <!-- Opera tiara & updo -->
        <path d="M 28 24 L 36 14 L 42 20 L 48 14 L 56 24" fill="none" stroke="#d97706" stroke-width="1.6"/>
        <path d="M 25 42 C 25 62, 33 72, 42 72 C 51 72, 59 62, 59 42 C 59 26, 25 26, 25 42 Z" fill="#f5efe2" stroke="#1c1917" stroke-width="1.5"/>
        <circle cx="35" cy="45" r="1.4" fill="#1c1917"/>
        <circle cx="49" cy="45" r="1.4" fill="#1c1917"/>
        <path d="M 36 62 Q 42 66 48 62 Z" fill="#b91c1c" stroke="#1c1917" stroke-width="1"/>
        <!-- Pearl necklace & evening gown -->
        <circle cx="34" cy="78" r="2.2" fill="#fafaf9" stroke="#1c1917" stroke-width="0.9"/>
        <circle cx="42" cy="80" r="2.2" fill="#fafaf9" stroke="#1c1917" stroke-width="0.9"/>
        <circle cx="50" cy="78" r="2.2" fill="#fafaf9" stroke="#1c1917" stroke-width="0.9"/>
        <path d="M 12 108 C 18 82, 28 78, 42 78 C 56 78, 66 82, 72 108" fill="__CROSSHATCH__" stroke="#1c1917" stroke-width="1.6"/>
      </g>
      <g transform="translate(126, 24)">
        <text x="0" y="14" fill="#1c1917" font-family="Courier Prime, monospace" font-size="10" font-weight="bold">Flavia De Santis (Soprano)</text>
        <line x1="0" y1="20" x2="170" y2="20" stroke="#1c1917" stroke-width="1"/>
        <text x="0" y="38" fill="#292524" font-family="Courier Prime, monospace" font-size="8.5">• Nel camerino alle ore 21:35</text>
        <text x="0" y="54" fill="#292524" font-family="Courier Prime, monospace" font-size="8.5">• Sul palco dalle 22:05 alle 22:45</text>
        <text x="0" y="70" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8.5" font-weight="bold">• Usa gocce di Digitalina</text>
        <text x="0" y="86" fill="#292524" font-family="Courier Prime, monospace" font-size="8">• Rossetto 'Rouge Carmine #14'</text>
      </g>
    `,

    'fenice-violinist': `
      <!-- Portrait Sketch of Davide Moretti (First Violin, Violin & Bow, Bandaged Left Wrist) -->
      <g transform="translate(24, 14)">
        <rect x="0" y="4" width="84" height="108" fill="#f5efe2" stroke="#1c1917" stroke-width="1.5"/>
        <rect x="4" y="8" width="76" height="100" fill="__HATCH__" stroke="#57534e" stroke-width="0.7"/>
        <path d="M 24 40 C 20 22, 64 20, 60 42" fill="__CROSSHATCH__" stroke="#1c1917" stroke-width="1.5"/>
        <path d="M 26 42 C 26 62, 34 72, 42 72 C 50 72, 58 62, 58 42 C 58 28, 26 28, 26 42 Z" fill="#f5efe2" stroke="#1c1917" stroke-width="1.5"/>
        <circle cx="35" cy="45" r="1.4" fill="#1c1917"/>
        <circle cx="49" cy="45" r="1.4" fill="#1c1917"/>
        <path d="M 36 62 L 48 62" stroke="#1c1917" stroke-width="1.2"/>
        <!-- Bowtie & Tuxedo -->
        <polygon points="35,76 42,79 35,82" fill="#1c1917"/>
        <polygon points="49,76 42,79 49,82" fill="#1c1917"/>
        <path d="M 12 108 C 16 82, 28 76, 42 76 C 56 76, 68 82, 72 108" fill="__CROSSHATCH__" stroke="#1c1917" stroke-width="1.6"/>
        <!-- Violin scroll & bow diagonal across corner -->
        <line x1="8" y1="104" x2="78" y2="68" stroke="#78350f" stroke-width="2"/>
      </g>
      <g transform="translate(126, 24)">
        <text x="0" y="14" fill="#1c1917" font-family="Courier Prime, monospace" font-size="10" font-weight="bold">Davide Moretti (1° Violino)</text>
        <line x1="0" y1="20" x2="170" y2="20" stroke="#1c1917" stroke-width="1"/>
        <text x="0" y="38" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8.5" font-weight="bold">• Gruppo B Negativo (B-)</text>
        <text x="0" y="54" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8.5">• Abrasione fresca al polso</text>
        <text x="0" y="70" fill="#292524" font-family="Courier Prime, monospace" font-size="8.5">• Assente dal podio 22:48-23:02</text>
        <text x="0" y="86" fill="#292524" font-family="Courier Prime, monospace" font-size="8">• Pece di pino sulle dita</text>
      </g>
    `,

    'fenice-horologist': `
      <!-- Portrait Sketch of Ing. Ettore Marin (Master Watchmaker, Loupe Monocle, Tweezers & Gears) -->
      <g transform="translate(24, 14)">
        <rect x="0" y="4" width="84" height="108" fill="#f5efe2" stroke="#1c1917" stroke-width="1.5"/>
        <rect x="4" y="8" width="76" height="100" fill="__HATCH__" stroke="#57534e" stroke-width="0.7"/>
        <path d="M 26 42 C 26 62, 34 72, 42 72 C 50 72, 58 62, 58 42 C 58 26, 26 26, 26 42 Z" fill="#f5efe2" stroke="#1c1917" stroke-width="1.5"/>
        <!-- Watchmaker's Brass Loupe on Right Eye -->
        <circle cx="34" cy="45" r="6.5" fill="#fef08a" fill-opacity="0.4" stroke="#1c1917" stroke-width="2"/>
        <circle cx="34" cy="45" r="2" fill="#1c1917"/>
        <circle cx="49" cy="45" r="1.4" fill="#1c1917"/>
        <!-- Mustache -->
        <path d="M 33 60 Q 42 56 51 60" fill="none" stroke="#1c1917" stroke-width="2"/>
        <path d="M 12 108 C 16 82, 28 76, 42 76 C 56 76, 68 82, 72 108" fill="__HATCH__" stroke="#1c1917" stroke-width="1.6"/>
      </g>
      <g transform="translate(126, 24)">
        <text x="0" y="14" fill="#1c1917" font-family="Courier Prime, monospace" font-size="10" font-weight="bold">Ing. Ettore Marin (Orologiaio)</text>
        <line x1="0" y1="20" x2="170" y2="20" stroke="#1c1917" stroke-width="1"/>
        <text x="0" y="38" fill="#292524" font-family="Courier Prime, monospace" font-size="8.5">• Manutenzione Automa ore 19:30</text>
        <text x="0" y="54" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8.5" font-weight="bold">• Olio Moebius 9010 &amp; frese</text>
        <text x="0" y="70" fill="#292524" font-family="Courier Prime, monospace" font-size="8.5">• In platea alle ore 22:14</text>
        <text x="0" y="86" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8">• Collezione tassidermia marina</text>
      </g>
    `,

    'fenice-daughter': `
      <!-- Portrait Sketch of Valeria Contarini (Harpsichordist & Daughter, Harp Tuning Key) -->
      <g transform="translate(24, 14)">
        <rect x="0" y="4" width="84" height="108" fill="#f5efe2" stroke="#1c1917" stroke-width="1.5"/>
        <rect x="4" y="8" width="76" height="100" fill="__HATCH__" stroke="#57534e" stroke-width="0.7"/>
        <path d="M 22 36 C 18 58, 20 82, 24 94 M 62 36 C 66 58, 64 82, 60 94" fill="none" stroke="#1c1917" stroke-width="1.6"/>
        <path d="M 27 42 C 27 61, 34 71, 42 71 C 50 71, 57 61, 57 42 C 57 27, 27 27, 27 42 Z" fill="#f5efe2" stroke="#1c1917" stroke-width="1.5"/>
        <circle cx="36" cy="45" r="1.3" fill="#1c1917"/>
        <circle cx="48" cy="45" r="1.3" fill="#1c1917"/>
        <path d="M 37 61 Q 42 64 47 61" fill="none" stroke="#1c1917" stroke-width="1.2"/>
        <path d="M 14 108 C 18 82, 28 76, 42 76 C 56 76, 66 82, 70 108" fill="__HATCH__" stroke="#1c1917" stroke-width="1.6"/>
      </g>
      <g transform="translate(126, 24)">
        <text x="0" y="14" fill="#1c1917" font-family="Courier Prime, monospace" font-size="10" font-weight="bold">Valeria Contarini (Figlia)</text>
        <line x1="0" y1="20" x2="170" y2="20" stroke="#1c1917" stroke-width="1"/>
        <text x="0" y="38" fill="#292524" font-family="Courier Prime, monospace" font-size="8.5">• Vista nel corridoio alle 22:32</text>
        <text x="0" y="54" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8.5" font-weight="bold">• Rocchetto filo di seta dorata</text>
        <text x="0" y="70" fill="#292524" font-family="Courier Prime, monospace" font-size="8.5">• Mancina | Gruppo AB+</text>
        <text x="0" y="86" fill="#292524" font-family="Courier Prime, monospace" font-size="8">• Temeva che accusassero Davide</text>
      </g>
    `,

    'fenice-stage-plan': `
      <!-- Architectural Blueprint Sketch of Theater Stage, Dressing Room #1 & Acoustic Duct -->
      <rect x="18" y="18" width="284" height="106" fill="#f5efe2" stroke="#1c1917" stroke-width="1.6"/>
      <!-- Stage Area -->
      <rect x="26" y="26" width="116" height="90" fill="__HATCH__" stroke="#1c1917" stroke-width="1.4"/>
      <text x="42" y="44" fill="#1c1917" font-family="Courier Prime, monospace" font-size="8.5" font-weight="bold">PALCOSCENICO</text>
      <text x="34" y="58" fill="#292524" font-family="Courier Prime, monospace" font-size="7.5">Atto II: 22:05-22:45</text>
      <!-- Hidden Acoustic Duct connecting Backstage to Dressing Room #1 -->
      <path d="M 142 42 L 210 42 L 210 62" fill="none" stroke="#b91c1c" stroke-width="2.2" stroke-dasharray="4,2"/>
      <text x="146" y="36" fill="#991b1b" font-family="Courier Prime, monospace" font-size="7.5" font-weight="bold">Condotto acustico</text>
      <!-- Dressing Room #1 -->
      <rect x="192" y="62" width="100" height="54" fill="#fef3c7" fill-opacity="0.45" stroke="#1c1917" stroke-width="1.6"/>
      <text x="200" y="78" fill="#1c1917" font-family="Courier Prime, monospace" font-size="8" font-weight="bold">CAMERINO N. 1</text>
      <text x="200" y="92" fill="#991b1b" font-family="Courier Prime, monospace" font-size="7.5" font-weight="bold">Porta chiusa (filo)</text>
      <text x="200" y="104" fill="#292524" font-family="Courier Prime, monospace" font-size="7.5">Automa + Coppa</text>
    `,

    'fenice-xrf-report': `
      <!-- Sketch of XRF Spectrometer Graph, Geneva Auction Invoice & Tetrodotoxin Vial -->
      <!-- Geneva Auction Document on Left -->
      <g transform="translate(18, 20)">
        <rect x="0" y="0" width="132" height="100" fill="#fafaf9" stroke="#1c1917" stroke-width="1.5"/>
        <text x="8" y="18" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8" font-weight="bold">PERIZIA METALLURGICA</text>
        <line x1="8" y1="23" x2="124" y2="23" stroke="#78716c" stroke-width="0.8"/>
        <text x="8" y="38" fill="#1c1917" font-family="Courier Prime, monospace" font-size="7.5">Ingranaggi Automa:</text>
        <text x="8" y="50" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8" font-weight="bold">Ottone CNC 2026 (Falso!)</text>
        <text x="8" y="66" fill="#1c1917" font-family="Courier Prime, monospace" font-size="7.5">Originale 1768 venduto</text>
        <text x="8" y="78" fill="#1c1917" font-family="Courier Prime, monospace" font-size="7.5">a Ginevra da E. Marin:</text>
        <text x="8" y="92" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8.5" font-weight="bold">CHF 1.200.000</text>
      </g>
      <!-- Workshop Lathe & Tetrodotoxin Ampoule on Right -->
      <g transform="translate(166, 22)">
        <rect x="0" y="0" width="132" height="98" fill="#f5efe2" stroke="#1c1917" stroke-width="1.4"/>
        <!-- Pufferfish / Tetrodotoxin vial sketch -->
        <path d="M 22 24 L 26 14 L 30 24 L 34 36 L 34 74 L 18 74 L 18 36 Z" fill="#fafaf9" stroke="#1c1917" stroke-width="1.4"/>
        <rect x="19" y="46" width="14" height="22" fill="#b91c1c" fill-opacity="0.4"/>
        <text x="44" y="32" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8" font-weight="bold">Tetrodotossina</text>
        <text x="44" y="46" fill="#1c1917" font-family="Courier Prime, monospace" font-size="7.5">Lab. E. Marin:</text>
        <text x="44" y="60" fill="#1c1917" font-family="Courier Prime, monospace" font-size="7.5">• Trucioli chiave oro</text>
        <text x="44" y="74" fill="#991b1b" font-family="Courier Prime, monospace" font-size="7.5" font-weight="bold">• Micro-aghi 0,2mm</text>
      </g>
    `,

    // =========================================================================
    // NEW CASE #904-AO: EREMO DI SAN BERNARDO — "L'OMBRA DELLA CRIPTA" (20 CARTE)
    // =========================================================================
    'abbazia-briefing': `
      <!-- Hand-Drawn Alpine Abbey in Snowstorm & Prosecutor's 6 Questions Parchment -->
      <!-- Alpine Peaks & Abbey Belltower on Left -->
      <path d="M 14 114 L 42 52 L 66 86 L 98 34 L 138 114 Z" fill="__HATCH__" stroke="#1c1917" stroke-width="1.4"/>
      <rect x="52" y="54" width="24" height="60" fill="#f5efe2" stroke="#1c1917" stroke-width="1.6"/>
      <polygon points="48,54 64,28 80,54" fill="__CROSSHATCH__" stroke="#1c1917" stroke-width="1.6"/>
      <rect x="76" y="74" width="44" height="40" fill="#f5efe2" stroke="#1c1917" stroke-width="1.6"/>
      <path d="M 60 66 a 4 4 0 0 1 8 0 v 10 h -8 z" fill="#1c1917"/>
      <!-- Snow wind lines -->
      <path d="M 18 32 L 42 38 M 84 24 L 114 30 M 22 48 L 46 53" stroke="#57534e" stroke-width="0.9" stroke-dasharray="3,3"/>
      <!-- Wax-Sealed Prosecutor's Questions Scroll on Right -->
      <g transform="translate(152, 16)">
        <rect x="0" y="0" width="148" height="106" rx="2" fill="#fafaf9" stroke="#1c1917" stroke-width="1.6"/>
        <text x="10" y="18" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8.5" font-weight="bold">QUESITI DELLA PROCURA</text>
        <line x1="10" y1="23" x2="138" y2="23" stroke="#1c1917" stroke-width="1"/>
        <text x="10" y="37" fill="#1c1917" font-family="Courier Prime, monospace" font-size="7.3">1. Chi è l'assassino?</text>
        <text x="10" y="50" fill="#1c1917" font-family="Courier Prime, monospace" font-size="7.3">2. Causa della morte?</text>
        <text x="10" y="63" fill="#1c1917" font-family="Courier Prime, monospace" font-size="7.3">3. Luogo e ora decesso?</text>
        <text x="10" y="76" fill="#1c1917" font-family="Courier Prime, monospace" font-size="7.3">4. Qual è il movente?</text>
        <text x="10" y="89" fill="#1c1917" font-family="Courier Prime, monospace" font-size="7.3">5. Dinamica della scena?</text>
        <text x="10" y="101" fill="#1c1917" font-family="Courier Prime, monospace" font-size="7.3">6. Altri illeciti?</text>
        <circle cx="132" cy="90" r="9" fill="#b91c1c" stroke="#1c1917" stroke-width="1.2"/>
      </g>
    `,

    'abbazia-crypt-stairs': `
      <!-- Sketch of Steep Stone Crypt Staircase, Body at Base, Bronze Candelabrum & Watch at 22:40 -->
      <!-- Stone Steps descending left to right -->
      <path d="M 18 24 L 46 24 L 46 42 L 74 42 L 74 60 L 102 60 L 102 78 L 130 78 L 130 96 L 158 96 L 158 114 L 18 114 Z" fill="__HATCH__" stroke="#1c1917" stroke-width="1.7"/>
      <!-- Body at foot of stairs -->
      <ellipse cx="186" cy="104" rx="12" ry="9" fill="#f5efe2" stroke="#1c1917" stroke-width="1.6"/>
      <path d="M 196 104 C 216 96, 238 98, 252 112 L 194 114 Z" fill="__CROSSHATCH__" stroke="#1c1917" stroke-width="1.6"/>
      <!-- Three-branched Bronze Candelabrum on floor -->
      <g transform="translate(148, 42)">
        <line x1="24" y1="12" x2="24" y2="42" stroke="#b45309" stroke-width="2.4"/>
        <path d="M 12 20 Q 24 30 36 20" fill="none" stroke="#b45309" stroke-width="2"/>
        <polygon points="16,42 32,42 28,36 20,36" fill="#b45309" stroke="#1c1917" stroke-width="1.1"/>
        <circle cx="24" cy="26" r="16" fill="none" stroke="#b91c1c" stroke-width="1.2" stroke-dasharray="3,2"/>
      </g>
      <!-- Broken Wristwatch zoom on Top Right (22:40 + pulled crown) -->
      <g transform="translate(216, 18)">
        <circle cx="42" cy="38" r="24" fill="#fafaf9" stroke="#1c1917" stroke-width="1.8"/>
        <line x1="42" y1="38" x2="28" y2="28" stroke="#1c1917" stroke-width="2"/>
        <line x1="42" y1="38" x2="26" y2="48" stroke="#1c1917" stroke-width="1.5"/>
        <!-- Pulled setting crown on right -->
        <line x1="66" y1="38" x2="76" y2="38" stroke="#b91c1c" stroke-width="2"/>
        <rect x="76" y="33" width="5" height="10" fill="#b91c1c" stroke="#1c1917" stroke-width="1"/>
        <text x="14" y="76" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8" font-weight="bold">22:40 (Corona estratta)</text>
      </g>
    `,

    'abbazia-scriptorium': `
      <!-- Sketch of Medieval Scriptorium Desk, Codex Vallis under UV Lamp, Tipped Genepy Glass in Planter -->
      <!-- Wooden Lectern & Illuminated Codex Vallis -->
      <polygon points="26,56 124,46 136,96 20,108" fill="#d6c7b2" stroke="#1c1917" stroke-width="1.7"/>
      <path d="M 40 58 L 76 54 L 82 90 L 44 95 Z M 76 54 L 114 50 L 120 86 L 82 90 Z" fill="#fafaf9" stroke="#1c1917" stroke-width="1.4"/>
      <!-- UV Lamp cone of light -->
      <path d="M 68 18 L 92 18 L 86 28 L 74 28 Z" fill="__CROSSHATCH__" stroke="#1c1917" stroke-width="1.5"/>
      <polygon points="74,28 86,28 118,86 42,92" fill="#7c3aed" fill-opacity="0.18" stroke="#6d28d9" stroke-width="0.9" stroke-dasharray="3,2"/>
      <text x="26" y="122" fill="#1c1917" font-family="Courier Prime, monospace" font-size="8" font-weight="bold">Lampada UV su Codex</text>
      <!-- Planter Pot with spilled Genepy liqueur & Orpiment -->
      <g transform="translate(168, 28)">
        <polygon points="18,46 68,46 60,84 26,84" fill="__CROSSHATCH__" stroke="#1c1917" stroke-width="1.6"/>
        <path d="M 32 46 Q 24 24 14 20 M 44 46 Q 44 18 48 12 M 54 46 Q 64 24 72 22" fill="none" stroke="#15803d" stroke-width="1.7"/>
        <!-- Tipped liqueur glass pouring yellow/green liquid into soil -->
        <polygon points="72,32 96,24 94,42" fill="#fde047" fill-opacity="0.6" stroke="#1c1917" stroke-width="1.3"/>
        <text x="6" y="98" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8" font-weight="bold">Genepy + Arsenico in terra</text>
      </g>
    `,

    'abbazia-priore': `
      <!-- Portrait Sketch of Padre Anselmo Viret (Monastic Habit, Brass-Tipped Walking Cane) -->
      <g transform="translate(24, 14)">
        <rect x="0" y="4" width="84" height="108" fill="#f5efe2" stroke="#1c1917" stroke-width="1.5"/>
        <rect x="4" y="8" width="76" height="100" fill="__HATCH__" stroke="#57534e" stroke-width="0.7"/>
        <path d="M 26 42 C 26 62, 34 72, 42 72 C 50 72, 58 62, 58 42 C 58 26, 26 26, 26 42 Z" fill="#f5efe2" stroke="#1c1917" stroke-width="1.5"/>
        <circle cx="35" cy="46" r="1.3" fill="#1c1917"/>
        <circle cx="49" cy="46" r="1.3" fill="#1c1917"/>
        <path d="M 35 62 Q 42 59 49 62" fill="none" stroke="#1c1917" stroke-width="1.2"/>
        <!-- Monastic Cowl & Cross -->
        <path d="M 10 108 C 14 78, 28 74, 42 74 C 56 74, 70 78, 74 108" fill="__CROSSHATCH__" stroke="#1c1917" stroke-width="1.8"/>
        <line x1="42" y1="82" x2="42" y2="102" stroke="#d97706" stroke-width="2"/>
        <line x1="35" y1="88" x2="49" y2="88" stroke="#d97706" stroke-width="2"/>
      </g>
      <g transform="translate(126, 24)">
        <text x="0" y="14" fill="#1c1917" font-family="Courier Prime, monospace" font-size="10" font-weight="bold">Padre Anselmo Viret (Priore)</text>
        <line x1="0" y1="20" x2="174" y2="20" stroke="#1c1917" stroke-width="1"/>
        <text x="0" y="38" fill="#292524" font-family="Courier Prime, monospace" font-size="8.5">• Artrosi ginocchio DX (Bastone)</text>
        <text x="0" y="54" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8.5" font-weight="bold">• Puntale ottone + cera d'api</text>
        <text x="0" y="70" fill="#292524" font-family="Courier Prime, monospace" font-size="8.5">• Nello Scriptorium alle 22:18</text>
        <text x="0" y="86" fill="#292524" font-family="Courier Prime, monospace" font-size="8">• Destrorso | Gruppo A+</text>
      </g>
    `,

    'abbazia-chimica': `
      <!-- Portrait Sketch of Dott.ssa Miriam Alverà (Restorer, Orpiment Jar & Clove Cigarette) -->
      <g transform="translate(24, 14)">
        <rect x="0" y="4" width="84" height="108" fill="#f5efe2" stroke="#1c1917" stroke-width="1.5"/>
        <rect x="4" y="8" width="76" height="100" fill="__HATCH__" stroke="#57534e" stroke-width="0.7"/>
        <path d="M 22 44 C 18 20, 66 20, 62 44" fill="__CROSSHATCH__" stroke="#1c1917" stroke-width="1.6"/>
        <path d="M 26 42 C 26 62, 34 72, 42 72 C 50 72, 58 62, 58 42 C 58 28, 26 28, 26 42 Z" fill="#f5efe2" stroke="#1c1917" stroke-width="1.5"/>
        <circle cx="35" cy="45" r="1.4" fill="#1c1917"/>
        <circle cx="49" cy="45" r="1.4" fill="#1c1917"/>
        <path d="M 37 62 L 47 62" stroke="#1c1917" stroke-width="1.2"/>
        <path d="M 12 108 C 16 82, 28 76, 42 76 C 56 76, 68 82, 72 108" fill="#fafaf9" stroke="#1c1917" stroke-width="1.6"/>
        <!-- Yellow Orpiment stain on sleeve -->
        <circle cx="62" cy="96" r="6" fill="#eab308" fill-opacity="0.7" stroke="#991b1b" stroke-width="1"/>
      </g>
      <g transform="translate(126, 24)">
        <text x="0" y="14" fill="#1c1917" font-family="Courier Prime, monospace" font-size="10" font-weight="bold">Dott.ssa Miriam Alverà</text>
        <line x1="0" y1="20" x2="174" y2="20" stroke="#1c1917" stroke-width="1"/>
        <text x="0" y="38" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8.5" font-weight="bold">• Pigmento Orpimento (Arsenico)</text>
        <text x="0" y="54" fill="#292524" font-family="Courier Prime, monospace" font-size="8.5">• Sigarette al chiodo di garofano</text>
        <text x="0" y="70" fill="#292524" font-family="Courier Prime, monospace" font-size="8.5">• In cella dalle 21:42 (Wi-Fi ok)</text>
        <text x="0" y="86" fill="#292524" font-family="Courier Prime, monospace" font-size="8">• Mancina | Gruppo 0-</text>
      </g>
    `,

    'abbazia-figlio': `
      <!-- Portrait Sketch of Federico Dalmasso (Antiquarian Son, Missing EpiPen Case) -->
      <g transform="translate(24, 14)">
        <rect x="0" y="4" width="84" height="108" fill="#f5efe2" stroke="#1c1917" stroke-width="1.5"/>
        <rect x="4" y="8" width="76" height="100" fill="__HATCH__" stroke="#57534e" stroke-width="0.7"/>
        <path d="M 26 42 C 26 62, 34 72, 42 72 C 50 72, 58 62, 58 42 C 58 26, 26 26, 26 42 Z" fill="#f5efe2" stroke="#1c1917" stroke-width="1.5"/>
        <circle cx="35" cy="45" r="1.4" fill="#1c1917"/>
        <circle cx="49" cy="45" r="1.4" fill="#1c1917"/>
        <path d="M 36 62 Q 42 65 48 62" fill="none" stroke="#1c1917" stroke-width="1.2"/>
        <path d="M 12 108 C 16 82, 28 76, 42 76 C 56 76, 68 82, 72 108" fill="__CROSSHATCH__" stroke="#1c1917" stroke-width="1.6"/>
      </g>
      <g transform="translate(126, 24)">
        <text x="0" y="14" fill="#1c1917" font-family="Courier Prime, monospace" font-size="10" font-weight="bold">Federico Dalmasso (Figlio)</text>
        <line x1="0" y1="20" x2="174" y2="20" stroke="#1c1917" stroke-width="1"/>
        <text x="0" y="38" fill="#292524" font-family="Courier Prime, monospace" font-size="8.5">• Telefono satellitare 21:30-23:00</text>
        <text x="0" y="54" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8.5" font-weight="bold">• 1 EpiPen rubato dalla borsa!</text>
        <text x="0" y="70" fill="#292524" font-family="Courier Prime, monospace" font-size="8.5">• Stivali La Sportiva Tg. 43</text>
        <text x="0" y="86" fill="#292524" font-family="Courier Prime, monospace" font-size="8">• Destrorso | Gruppo A-</text>
      </g>
    `,

    'abbazia-suora': `
      <!-- Portrait Sketch of Suor Cecilia / Dr. Elena Roux (Monastic Veil, Genepy Still & Syringe) -->
      <g transform="translate(24, 14)">
        <rect x="0" y="4" width="84" height="108" fill="#f5efe2" stroke="#1c1917" stroke-width="1.5"/>
        <rect x="4" y="8" width="76" height="100" fill="__HATCH__" stroke="#57534e" stroke-width="0.7"/>
        <!-- Monastic Veil framing face -->
        <path d="M 14 108 L 18 30 C 22 14, 62 14, 66 30 L 70 108 Z" fill="__CROSSHATCH__" stroke="#1c1917" stroke-width="1.6"/>
        <path d="M 27 44 C 27 62, 34 71, 42 71 C 50 71, 57 62, 57 44 C 57 30, 27 30, 27 44 Z" fill="#f5efe2" stroke="#1c1917" stroke-width="1.5"/>
        <circle cx="36" cy="47" r="1.3" fill="#1c1917"/>
        <circle cx="48" cy="47" r="1.3" fill="#1c1917"/>
        <path d="M 37 61 L 47 61" stroke="#1c1917" stroke-width="1.2"/>
        <rect x="28" y="72" width="28" height="10" fill="#fafaf9" stroke="#1c1917" stroke-width="1.2"/>
      </g>
      <g transform="translate(126, 24)">
        <text x="0" y="14" fill="#1c1917" font-family="Courier Prime, monospace" font-size="10" font-weight="bold">Suor Cecilia (Elena Roux)</text>
        <line x1="0" y1="20" x2="174" y2="20" stroke="#1c1917" stroke-width="1"/>
        <text x="0" y="38" fill="#292524" font-family="Courier Prime, monospace" font-size="8.5">• Speziale &amp; Distillatrice Genepy</text>
        <text x="0" y="54" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8.5" font-weight="bold">• Ex Anestesista radiata a Lione</text>
        <text x="0" y="70" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8.5" font-weight="bold">• Fiale Succinilcolina in cella</text>
        <text x="0" y="86" fill="#292524" font-family="Courier Prime, monospace" font-size="8">• Destrorsa | Gruppo B+</text>
      </g>
    `,

    'abbazia-custode': `
      <!-- Portrait Sketch of Marco Chabod (Bearded Caretaker, Lugged Boots Tg.45 & Breaker Switch) -->
      <g transform="translate(24, 14)">
        <rect x="0" y="4" width="84" height="108" fill="#f5efe2" stroke="#1c1917" stroke-width="1.5"/>
        <rect x="4" y="8" width="76" height="100" fill="__HATCH__" stroke="#57534e" stroke-width="0.7"/>
        <path d="M 26 42 C 26 62, 34 72, 42 72 C 50 72, 58 62, 58 42 C 58 26, 26 26, 26 42 Z" fill="#f5efe2" stroke="#1c1917" stroke-width="1.5"/>
        <!-- Full beard -->
        <path d="M 26 52 C 26 74, 58 74, 58 52 L 50 58 L 34 58 Z" fill="__CROSSHATCH__" stroke="#1c1917" stroke-width="1.4"/>
        <circle cx="35" cy="44" r="1.4" fill="#1c1917"/>
        <circle cx="49" cy="44" r="1.4" fill="#1c1917"/>
        <path d="M 10 108 C 14 80, 28 76, 42 76 C 56 76, 70 80, 74 108" fill="__HATCH__" stroke="#1c1917" stroke-width="1.7"/>
      </g>
      <g transform="translate(126, 24)">
        <text x="0" y="14" fill="#1c1917" font-family="Courier Prime, monospace" font-size="10" font-weight="bold">Marco Chabod (Manutentore)</text>
        <line x1="0" y1="20" x2="174" y2="20" stroke="#1c1917" stroke-width="1"/>
        <text x="0" y="38" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8.5" font-weight="bold">• Blackout manuale 22:28-22:39</text>
        <text x="0" y="54" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8.5" font-weight="bold">• Scarponi chiodati Tg. 45</text>
        <text x="0" y="70" fill="#292524" font-family="Courier Prime, monospace" font-size="8.5">• Pagato da Padre Anselmo</text>
        <text x="0" y="86" fill="#292524" font-family="Courier Prime, monospace" font-size="8">• Mancino | Gruppo 0+</text>
      </g>
    `,

    'abbazia-autopsy-epipen': `
      <!-- Forensic Sketch: Modified EpiPen Auto-Injector & Shoulder Injection Ring vs Bloodless Skull Wound -->
      <!-- Modified EpiPen Auto-Injector Cylinder on Left -->
      <g transform="translate(20, 22)">
        <rect x="12" y="12" width="112" height="22" rx="4" fill="#fef3c7" stroke="#1c1917" stroke-width="1.7"/>
        <rect x="12" y="12" width="28" height="22" fill="#f97316" fill-opacity="0.55" stroke="#1c1917" stroke-width="1.5"/>
        <line x1="2" y1="23" x2="12" y2="23" stroke="#b91c1c" stroke-width="2.2"/>
        <text x="46" y="26" fill="#1c1917" font-family="Courier Prime, monospace" font-size="8" font-weight="bold">EPIPEN MODIFICATO</text>
        <text x="6" y="54" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8" font-weight="bold">Succinilcolina + Potassio</text>
        <text x="6" y="70" fill="#1c1917" font-family="Courier Prime, monospace" font-size="7.5">• Colpo alla nuca: ESANGUE</text>
        <text x="6" y="84" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8" font-weight="bold">  (Inflitto Post-Mortem!)</text>
      </g>
      <!-- Left Shoulder Injection Mark & CGM 21:59 on Right -->
      <g transform="translate(172, 18)">
        <circle cx="46" cy="44" r="28" fill="#fafaf9" stroke="#1c1917" stroke-width="1.5"/>
        <circle cx="46" cy="44" r="10" fill="none" stroke="#b91c1c" stroke-width="1.5" stroke-dasharray="3,2"/>
        <circle cx="46" cy="44" r="2.5" fill="#991b1b"/>
        <text x="80" y="36" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8.5" font-weight="bold">Spalla SX</text>
        <text x="80" y="50" fill="#1c1917" font-family="Courier Prime, monospace" font-size="8">Foro + Anello</text>
        <text x="12" y="94" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8.5" font-weight="bold">Sensore CGM: Morte 21:59</text>
      </g>
    `,

    'abbazia-uv-codex': `
      <!-- Sketch of UV Scan on Codex Vallis (4 Missing 1280 Folios stained with Genepy) & Lyon Shipment -->
      <g transform="translate(18, 20)">
        <rect x="0" y="0" width="134" height="100" fill="#fafaf9" stroke="#1c1917" stroke-width="1.5"/>
        <text x="8" y="18" fill="#6d28d9" font-family="Courier Prime, monospace" font-size="8" font-weight="bold">SCANSIONE UV (ORE 21:53)</text>
        <line x1="8" y1="23" x2="126" y2="23" stroke="#78716c" stroke-width="0.8"/>
        <text x="8" y="38" fill="#1c1917" font-family="Courier Prime, monospace" font-size="7.5">Codex Vallis (XIII sec.):</text>
        <text x="8" y="52" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8" font-weight="bold">4 Miniature Rubate!</text>
        <text x="8" y="68" fill="#1c1917" font-family="Courier Prime, monospace" font-size="7.5">Falsi invecchiati con:</text>
        <text x="8" y="82" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8" font-weight="bold">Decotto di Genepy</text>
      </g>
      <g transform="translate(166, 20)">
        <rect x="0" y="0" width="134" height="100" fill="#f5efe2" stroke="#1c1917" stroke-width="1.5"/>
        <text x="8" y="18" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8" font-weight="bold">CASSE LIQUORE -&gt; LIONE</text>
        <line x1="8" y1="23" x2="126" y2="23" stroke="#78716c" stroke-width="0.8"/>
        <text x="8" y="40" fill="#1c1917" font-family="Courier Prime, monospace" font-size="7.5">Spedizioni Erboristeria</text>
        <text x="8" y="54" fill="#1c1917" font-family="Courier Prime, monospace" font-size="7.5">firmate da Suor Cecilia</text>
        <text x="8" y="72" fill="#1c1917" font-family="Courier Prime, monospace" font-size="7.5">Conto Elena Roux:</text>
        <text x="8" y="88" fill="#991b1b" font-family="Courier Prime, monospace" font-size="8.5" font-weight="bold">+ EUR 680.000</text>
      </g>
    `
  }
};
