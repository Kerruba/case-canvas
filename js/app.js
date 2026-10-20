/**
 * PROFILER: CRIME BOARD — Main Investigative Engine
 * Modular Vanilla JS Architecture with Infinite Canvas, Cluster Groups (with Auto-Resize),
 * Multi-Select, Card Title-Only Collapse, Text Selection Highlighter,
 * Interactive Top Timeline Bar with Linked Cards, Red Strings SVG Engine,
 * LocalStorage Persistence & Verdict System.
 */

(function () {
  'use strict';

  const STORAGE_PREFIX = 'profiler_crime_board_v2_';

  const CATEGORY_STYLES = {
    'Forense': {
      badgeBg: 'bg-red-800 text-red-50 border-red-600',
      headerAccent: 'border-l-4 border-l-red-700',
      icon: 'microscope'
    },
    'Deposizione': {
      badgeBg: 'bg-blue-800 text-blue-50 border-blue-600',
      headerAccent: 'border-l-4 border-l-blue-700',
      icon: 'message-square-quote'
    },
    'Documento': {
      badgeBg: 'bg-emerald-800 text-emerald-50 border-emerald-600',
      headerAccent: 'border-l-4 border-l-emerald-700',
      icon: 'file-text'
    },
    'Luogo': {
      badgeBg: 'bg-amber-800 text-amber-50 border-amber-600',
      headerAccent: 'border-l-4 border-l-amber-700',
      icon: 'map-pin'
    }
  };

  const GROUP_THEMES = {
    amber: {
      name: 'Ambra',
      border: 'border-amber-500/50',
      bg: 'bg-amber-950/15',
      headerBg: 'bg-amber-950/60 border-b border-amber-500/30',
      text: 'text-amber-300',
      dot: 'bg-amber-400'
    },
    crimson: {
      name: 'Cremisi',
      border: 'border-red-500/50',
      bg: 'bg-red-950/15',
      headerBg: 'bg-red-950/60 border-b border-red-500/30',
      text: 'text-red-300',
      dot: 'bg-red-500'
    },
    blue: {
      name: 'Blu Polizia',
      border: 'border-sky-500/50',
      bg: 'bg-sky-950/15',
      headerBg: 'bg-sky-950/60 border-b border-sky-500/30',
      text: 'text-sky-300',
      dot: 'bg-sky-400'
    },
    emerald: {
      name: 'Smeraldo',
      border: 'border-emerald-500/50',
      bg: 'bg-emerald-950/15',
      headerBg: 'bg-emerald-950/60 border-b border-emerald-500/30',
      text: 'text-emerald-300',
      dot: 'bg-emerald-400'
    },
    purple: {
      name: 'Viola',
      border: 'border-purple-500/50',
      bg: 'bg-purple-950/15',
      headerBg: 'bg-purple-950/60 border-b border-purple-500/30',
      text: 'text-purple-300',
      dot: 'bg-purple-400'
    },
    slate: {
      name: 'Ardesia',
      border: 'border-stone-500/50',
      bg: 'bg-stone-900/25',
      headerBg: 'bg-stone-900/75 border-b border-stone-600/40',
      text: 'text-stone-300',
      dot: 'bg-stone-400'
    }
  };

  const TIMELINE_DOT_COLORS = {
    amber: {
      dotBg: 'bg-amber-400',
      timeText: 'text-amber-300',
      badgeBorder: 'border-amber-500/50'
    },
    red: {
      dotBg: 'bg-red-500',
      timeText: 'text-red-400',
      badgeBorder: 'border-red-500/50'
    },
    blue: {
      dotBg: 'bg-sky-400',
      timeText: 'text-sky-300',
      badgeBorder: 'border-sky-500/50'
    },
    green: {
      dotBg: 'bg-emerald-400',
      timeText: 'text-emerald-300',
      badgeBorder: 'border-emerald-500/50'
    }
  };

  const THEME_KEYS = Object.keys(GROUP_THEMES);

  // Application State
  const state = {
    scenarioId: 'caso-409-morosini',
    scenario: null,
    drawnCount: 0,
    cardsState: {},     // cardId -> { x, y, note, important, archived, collapsed, highlights: [{text, color}], zIndex }
    groups: [],         // [{ id, title, x, y, width, height, theme }]
    connections: [],    // [{ id, from, to, label }]
    timelineEvents: [], // [{ id, time, label, cardId, color }]
    timelineCollapsed: false,
    panX: 60,
    panY: 135,
    scale: 1,
    boardSurface: 'anthracite', // 'anthracite' | 'cork'
    maxZIndex: 20,

    // UI transient state
    selectedCards: new Set(),
    toolMode: 'pan', // 'pan' | 'select' | 'link'
    linkStartCardId: null,
    mouseWorldPos: { x: 0, y: 0 },
    inspectedCardId: null,
    editingStringId: null,
    editingTimelineId: null,
    editingTimelineColor: 'amber',
    groupPopoverCardId: null,
    activeSelection: null, // { cardId, text }
    verdictSubmitted: false,
    verdictAnswers: {},
    verdictNotes: ''
  };

  // DOM Elements cache
  const dom = {};

  function cacheDom() {
    dom.viewport = document.getElementById('viewport');
    dom.world = document.getElementById('world');
    dom.groupsLayer = document.getElementById('groups-layer');
    dom.cardsLayer = document.getElementById('cards-layer');
    dom.stringsSvg = document.getElementById('strings-svg');
    dom.stringLabelsLayer = document.getElementById('string-labels-layer');
    dom.marqueeBox = document.getElementById('marquee-box');

    // Top bar & HUD
    dom.caseTitle = document.getElementById('case-title-display');
    dom.caseNumber = document.getElementById('case-number-display');
    dom.scenarioSelect = document.getElementById('scenario-select');
    dom.btnToolSelect = document.getElementById('btn-tool-select');
    dom.btnToolLink = document.getElementById('btn-tool-link');
    dom.btnDrawTop = document.getElementById('btn-draw-top');
    dom.deckCounterTop = document.getElementById('deck-counter-top');

    // Top Timeline Bar
    dom.timelineBar = document.getElementById('timeline-bar');
    dom.timelineContentArea = document.getElementById('timeline-content-area');
    dom.timelineNodesContainer = document.getElementById('timeline-nodes-container');
    dom.timelineCountBadge = document.getElementById('timeline-count-badge');
    dom.timelineChevron = document.getElementById('timeline-chevron');

    // Bottom-right Deck Widget
    dom.deckCountText = document.getElementById('deck-count-text');
    dom.deckProgressBar = document.getElementById('deck-progress-bar');
    dom.btnDrawDeck = document.getElementById('btn-draw-deck');
    dom.deckVisualStack = document.getElementById('deck-visual-stack');

    // Zoom & Surface HUD
    dom.zoomLevelText = document.getElementById('zoom-level-text');
    dom.btnSurfaceToggle = document.getElementById('btn-surface-toggle');
    dom.saveStatusBadge = document.getElementById('save-status-badge');

    // Card Selection Context Bar & Group Popover
    dom.multiSelectBar = document.getElementById('multi-select-bar');
    dom.multiSelectCount = document.getElementById('multi-select-count');
    dom.multiGroupSelect = document.getElementById('multi-group-select');
    dom.cardGroupPopover = document.getElementById('card-group-popover');
    dom.cardGroupPopoverList = document.getElementById('card-group-popover-list');

    // Text selection highlighter toolbar
    dom.textSelectionToolbar = document.getElementById('text-selection-toolbar');

    // Link Mode Banner
    dom.linkModeBanner = document.getElementById('link-mode-banner');
    dom.linkBannerText = document.getElementById('link-banner-text');

    // Modals
    dom.inspectModal = document.getElementById('inspect-modal');
    dom.dossierModal = document.getElementById('dossier-modal');
    dom.solveModal = document.getElementById('solve-modal');
    dom.stringModal = document.getElementById('string-modal');
    dom.stringLabelInput = document.getElementById('string-label-input');

    // Timeline Modal
    dom.timelineModal = document.getElementById('timeline-modal');
    dom.tlTimeInput = document.getElementById('tl-time-input');
    dom.tlLabelInput = document.getElementById('tl-label-input');
    dom.tlCardSelect = document.getElementById('tl-card-select');
    dom.tlColorPicker = document.getElementById('tl-color-picker');
    dom.tlLinkedActions = document.getElementById('tl-linked-actions');
    dom.tlLinkedCardName = document.getElementById('tl-linked-card-name');
    dom.btnDeleteTimeline = document.getElementById('btn-delete-timeline');
  }

  // =========================================================================
  // INITIALIZATION & SCENARIO LOADING
  // =========================================================================

  async function init() {
    cacheDom();
    bindGlobalEvents();

    let lastScenarioId = localStorage.getItem(STORAGE_PREFIX + 'active_scenario') || 'caso-904-abbazia';
    if (!localStorage.getItem(STORAGE_PREFIX + 'introduced_904')) {
      localStorage.setItem(STORAGE_PREFIX + 'introduced_904', '1');
      lastScenarioId = 'caso-904-abbazia';
    }
    await loadScenarioById(lastScenarioId);
  }

  async function loadScenarioById(scenarioId, forceReset = false) {
    state.scenarioId = scenarioId;
    localStorage.setItem(STORAGE_PREFIX + 'active_scenario', scenarioId);

    let scenarioData = null;
    if (scenarioId === 'custom-uploaded') {
      const rawCustom = localStorage.getItem(STORAGE_PREFIX + 'custom_scenario_json');
      if (rawCustom) {
        try {
          scenarioData = JSON.parse(rawCustom);
        } catch (_) {}
      }
    }

    if (!scenarioData) {
      scenarioData = await window.ProfilerScenarios.loadPreset(scenarioId);
    }

    applyScenario(scenarioData, forceReset);
  }

  function applyScenario(scenarioData, forceReset = false) {
    state.scenario = scenarioData;
    state.selectedCards.clear();
    state.linkStartCardId = null;
    state.inspectedCardId = null;
    hideTextSelectionToolbar();
    closeCardGroupPopover();

    const storageKey = STORAGE_PREFIX + 'state_' + (scenarioData.metadata.id || state.scenarioId);
    const savedRaw = !forceReset ? localStorage.getItem(storageKey) : null;

    if (savedRaw) {
      try {
        const parsed = JSON.parse(savedRaw);
        state.drawnCount = parsed.drawnCount ?? 1;
        state.cardsState = parsed.cardsState || {};
        state.groups = parsed.groups || getDefaultGroups();
        state.connections = parsed.connections || [];
        state.timelineEvents = parsed.timelineEvents || [];
        state.timelineCollapsed = Boolean(parsed.timelineCollapsed);
        state.panX = parsed.panX ?? 50;
        state.panY = parsed.panY ?? 20;
        state.scale = parsed.scale ?? 1.0;
        state.boardSurface = parsed.boardSurface || 'anthracite';
        state.maxZIndex = parsed.maxZIndex || 30;
        state.verdictSubmitted = parsed.verdictSubmitted || false;
        state.verdictAnswers = parsed.verdictAnswers || {};
        state.verdictNotes = parsed.verdictNotes || '';
      } catch (e) {
        resetBoardStateToDefaults();
      }
    } else {
      resetBoardStateToDefaults();
    }

    dom.caseTitle.textContent = scenarioData.metadata.title;
    dom.caseNumber.textContent = scenarioData.metadata.caseNumber || 'CASO ATTIVO';
    if (dom.scenarioSelect.querySelector(`option[value="${state.scenarioId}"]`)) {
      dom.scenarioSelect.value = state.scenarioId;
    }

    applySurfaceTheme();
    updateWorldTransform();
    renderAll();
    saveState();
  }

  function getDefaultGroups() {
    return [
      {
        id: 'grp-forense',
        title: '🔬 SCENA DEL CRIMINE & PROVE FORENSI',
        x: 40,
        y: 30,
        width: 640,
        height: 485,
        theme: 'crimson'
      },
      {
        id: 'grp-timeline',
        title: '⏱️ TIMELINE, ALIBI & DEPOSIZIONI',
        x: 710,
        y: 30,
        width: 640,
        height: 485,
        theme: 'blue'
      },
      {
        id: 'grp-movente',
        title: '📂 DOCUMENTI, MOVENTE & REGISTRI',
        x: 40,
        y: 545,
        width: 640,
        height: 485,
        theme: 'amber'
      },
      {
        id: 'grp-scartate',
        title: '🗑️ PISTE FALSE / DEPISTAGGI ACCERTATI',
        x: 710,
        y: 545,
        width: 640,
        height: 485,
        theme: 'slate'
      }
    ];
  }

  function getResponsiveDefaultScale() {
    if (window.innerWidth < 640) return 0.58;
    if (window.innerWidth < 1024) return 0.78;
    return 1.0;
  }

  function resetBoardStateToDefaults() {
    state.drawnCount = 0;
    state.cardsState = {};
    state.groups = getDefaultGroups();
    state.connections = [];
    state.timelineEvents = [];
    state.timelineCollapsed = window.innerWidth < 640;
    state.panX = window.innerWidth < 640 ? 16 : 50;
    state.panY = 20;
    state.scale = getResponsiveDefaultScale();
    state.maxZIndex = 20;
    state.verdictSubmitted = false;
    state.verdictAnswers = {};
    state.verdictNotes = '';

    drawNextCard(true);
  }

  // =========================================================================
  // PERSISTENCE (LOCALSTORAGE)
  // =========================================================================

  let saveIndicatorTimeout = null;

  function saveState() {
    if (!state.scenario) return;
    const storageKey = STORAGE_PREFIX + 'state_' + (state.scenario.metadata.id || state.scenarioId);
    const payload = {
      drawnCount: state.drawnCount,
      cardsState: state.cardsState,
      groups: state.groups,
      connections: state.connections,
      timelineEvents: state.timelineEvents,
      timelineCollapsed: state.timelineCollapsed,
      panX: state.panX,
      panY: state.panY,
      scale: state.scale,
      boardSurface: state.boardSurface,
      maxZIndex: state.maxZIndex,
      verdictSubmitted: state.verdictSubmitted,
      verdictAnswers: state.verdictAnswers,
      verdictNotes: state.verdictNotes,
      updatedAt: Date.now()
    };

    try {
      localStorage.setItem(storageKey, JSON.stringify(payload));
      if (dom.saveStatusBadge) {
        dom.saveStatusBadge.classList.remove('opacity-40');
        dom.saveStatusBadge.classList.add('text-emerald-400');
        clearTimeout(saveIndicatorTimeout);
        saveIndicatorTimeout = setTimeout(() => {
          dom.saveStatusBadge.classList.add('opacity-40');
          dom.saveStatusBadge.classList.remove('text-emerald-400');
        }, 1200);
      }
    } catch (err) {
      console.warn('Impossibile salvare in localStorage:', err);
    }
  }

  // =========================================================================
  // COORDINATE SYSTEM, PAN & ZOOM
  // =========================================================================

  function screenToWorld(clientX, clientY) {
    const rect = dom.viewport ? dom.viewport.getBoundingClientRect() : { left: 0, top: 0 };
    return {
      x: (clientX - rect.left - state.panX) / state.scale,
      y: (clientY - rect.top - state.panY) / state.scale
    };
  }

  function updateWorldTransform() {
    // No 2D transform needed in Structured Grid mode
  }

  function zoomAtPoint() {
    // No zoom needed in Structured Grid mode
  }

  function centerViewOnBoard() {
    if (dom.viewport) {
      dom.viewport.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function focusCardOnBoard(cardId) {
    const cs = state.cardsState[cardId];
    if (!cs) {
      showToast('Questa carta non è ancora sulla lavagna.', 'stone');
      return;
    }

    state.selectedCards.clear();
    state.selectedCards.add(cardId);

    renderCards();
    renderTimeline();
    updateMultiSelectToolbar();
    saveState();

    const domCard = document.getElementById(`card-${cardId}`);
    if (domCard) {
      domCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      domCard.classList.add('timeline-pulse');
      setTimeout(() => domCard.classList.remove('timeline-pulse'), 1900);
    }
  }

  function applySurfaceTheme() {
    const isSmall = window.innerWidth < 640;
    if (state.boardSurface === 'cork') {
      dom.viewport.classList.remove('board-surface-anthracite');
      dom.viewport.classList.add('board-surface-cork');
      if (dom.btnSurfaceToggle) dom.btnSurfaceToggle.textContent = isSmall ? '🟫 Sughero' : '🟫 Sfondo: Sughero';
    } else {
      dom.viewport.classList.remove('board-surface-cork');
      dom.viewport.classList.add('board-surface-anthracite');
      if (dom.btnSurfaceToggle) dom.btnSurfaceToggle.textContent = isSmall ? '⬛ Antracite' : '⬛ Sfondo: Antracite';
    }
  }

  // =========================================================================
  // TOP TIMELINE BAR & CHRONOLOGICAL ENGINE
  // =========================================================================

  function parseTimeSortKey(timeStr) {
    const raw = (timeStr || '').trim();
    if (!raw) return 999999;

    let dayOffset = 0;
    const dayMatch = raw.match(/\b(\d{1,2})\s*(?:Nov|Ott|Gen|Feb|Mar|Apr|Mag|Giu|Lug|Ago|Set|Dic)/i);
    if (dayMatch) {
      dayOffset = parseInt(dayMatch[1], 10) * 1440;
    }

    const timeMatch = raw.match(/(\d{1,2})[:.](\d{2})/);
    if (!timeMatch) return dayOffset || 500000;

    let hours = parseInt(timeMatch[1], 10);
    const mins = parseInt(timeMatch[2], 10);

    if (!dayMatch && hours < 8) {
      hours += 24;
    }

    return dayOffset + hours * 60 + mins;
  }

  function extractTimeFromSnippet(text, fallbackTimestamp) {
    const clean = (text || '').trim();
    const dateAndTime = clean.match(/\b(\d{1,2}\s*(?:Nov|Ott|Gen|Feb|Mar|Apr|Mag|Giu|Lug|Ago|Set|Dic)[a-z]*\s*(?:•|,|-|\s)*\s*(?:ore\s*)?\d{1,2}[:.]\d{2})/i);
    if (dateAndTime) {
      return dateAndTime[1].replace(/\s+/g, ' ').trim();
    }
    const timeOnly = clean.match(/\b(\d{1,2}[:.]\d{2})\b/);
    if (timeOnly) {
      return timeOnly[1].replace('.', ':');
    }
    if (fallbackTimestamp) {
      const fbTime = fallbackTimestamp.match(/\b(\d{1,2}[:.]\d{2})\b/);
      if (fbTime) return fbTime[1];
      return fallbackTimestamp;
    }
    return '';
  }

  function renderTimeline() {
    if (!dom.timelineNodesContainer) return;

    const count = state.timelineEvents.length;
    if (dom.timelineCountBadge) {
      dom.timelineCountBadge.textContent = String(count);
    }

    if (state.timelineCollapsed) {
      dom.timelineContentArea.classList.add('hidden');
      if (dom.timelineChevron) dom.timelineChevron.textContent = '▾ Mostra';
      return;
    } else {
      dom.timelineContentArea.classList.remove('hidden');
      if (dom.timelineChevron) dom.timelineChevron.textContent = '▴';
    }

    if (count === 0) {
      dom.timelineNodesContainer.innerHTML = `
        <div class="flex items-center gap-3 text-[11px] text-stone-400 py-2 px-2">
          <span class="w-2.5 h-2.5 rounded-full bg-amber-500/60 inline-block"></span>
          <span>Nessun evento sulla linea del tempo. <b>Seleziona un orario nel testo di una carta</b> e premi <b class="text-sky-300">⏱️ +Timeline</b>, clicca <b class="text-amber-300">+⏱️</b> sull'orario di una carta, o premi <b class="text-amber-300">+ Pallino</b>.</span>
        </div>
      `;
      return;
    }

    const sorted = [...state.timelineEvents].sort((a, b) => parseTimeSortKey(a.time) - parseTimeSortKey(b.time));

    dom.timelineNodesContainer.innerHTML = `
      <!-- Horizontal Axis Line behind dots (Tablet & Desktop >= 768px) -->
      <div class="hidden md:block absolute left-6 right-6 top-[29px] h-[2px] bg-gradient-to-r from-stone-700 via-amber-500/50 to-stone-700 pointer-events-none"></div>
      <!-- Vertical Axis Line behind dots (Smartphone < 768px) -->
      <div class="md:hidden absolute left-[18px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-stone-700 via-amber-500/60 to-stone-700 pointer-events-none"></div>
    `;

    sorted.forEach(ev => {
      const cStyle = TIMELINE_DOT_COLORS[ev.color] || TIMELINE_DOT_COLORS.amber;
      const linkedCard = (ev.cardId && state.scenario)
        ? state.scenario.cards.find(c => c.id === ev.cardId)
        : null;
      const isCardSelected = ev.cardId && state.selectedCards.has(ev.cardId);

      const node = document.createElement('div');
      node.className = `timeline-node shrink-0 ${isCardSelected ? 'is-highlighted' : ''}`;
      node.title = `${ev.time} — ${ev.label}${linkedCard ? ` (Carta ${linkedCard.number}: ${linkedCard.title})` : ''}\nClicca sul pallino per modificare • Clicca sul badge carta per raggiungerla`;

      node.innerHTML = `
        <!-- Desktop/Tablet Horizontal Node Layout (md:flex) -->
        <div class="hidden md:flex flex-col items-center w-full">
          <div class="font-mono-tech font-extrabold text-[10.5px] ${cStyle.timeText} leading-none mb-1.5 tracking-tight">
            ${escapeHtml(ev.time)}
          </div>
          <div class="timeline-dot ${cStyle.dotBg}"></div>
          <div class="mt-1.5 flex flex-col items-center max-w-[155px]">
            <span class="text-[10px] font-medium text-stone-200 truncate w-full text-center leading-tight">
              ${escapeHtml(ev.label)}
            </span>
            ${linkedCard ? `
              <button type="button" data-jump-card="${linkedCard.id}"
                class="mt-0.5 px-1.5 py-0.2 rounded bg-stone-900 hover:bg-amber-500 text-amber-300 hover:text-stone-950 border ${cStyle.badgeBorder} font-mono-tech font-bold text-[9px] transition cursor-pointer"
                title="Clicca per andare alla Carta ${escapeHtml(linkedCard.number)}">
                🔗 ${escapeHtml(linkedCard.number)}
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Smartphone Vertical Node Layout (< 768px) -->
        <div class="flex md:hidden items-center justify-between gap-2.5 w-full pl-1">
          <div class="flex items-center gap-2.5 min-w-0">
            <div class="timeline-dot shrink-0 ${cStyle.dotBg}"></div>
            <div class="min-w-0">
              <div class="font-mono-tech font-extrabold text-[11px] ${cStyle.timeText} leading-tight">
                ${escapeHtml(ev.time)}
              </div>
              <div class="text-xs font-medium text-stone-200 break-words leading-snug">
                ${escapeHtml(ev.label)}
              </div>
            </div>
          </div>
          ${linkedCard ? `
            <button type="button" data-jump-card="${linkedCard.id}"
              class="shrink-0 px-2 py-1 rounded bg-stone-900 hover:bg-amber-500 text-amber-300 hover:text-stone-950 border ${cStyle.badgeBorder} font-mono-tech font-bold text-[10px] transition cursor-pointer"
              title="Clicca per andare alla Carta ${escapeHtml(linkedCard.number)}">
              🔗 ${escapeHtml(linkedCard.number)}
            </button>
          ` : ''}
        </div>
      `;

      if (linkedCard) {
        node.addEventListener('mouseenter', () => {
          const domCard = document.getElementById(`card-${linkedCard.id}`);
          if (domCard) domCard.classList.add('is-selected');
        });
        node.addEventListener('mouseleave', () => {
          const domCard = document.getElementById(`card-${linkedCard.id}`);
          if (domCard && !state.selectedCards.has(linkedCard.id)) {
            domCard.classList.remove('is-selected');
          }
        });
      }

      node.querySelectorAll('[data-jump-card]').forEach(jumpBtn => {
        jumpBtn.addEventListener('click', e => {
          e.stopPropagation();
          focusCardOnBoard(linkedCard.id);
        });
      });

      node.addEventListener('click', () => {
        openTimelineModal({ editId: ev.id });
      });

      dom.timelineNodesContainer.appendChild(node);
    });
  }

  function populateTimelineCardSelect(selectedCardId) {
    if (!dom.tlCardSelect || !state.scenario) return;
    const drawnCards = state.scenario.cards.slice(0, state.drawnCount);
    dom.tlCardSelect.innerHTML = `<option value="">— Nessuna carta collegata —</option>` +
      drawnCards.map(c => `<option value="${c.id}" ${c.id === selectedCardId ? 'selected' : ''}>${escapeHtml(c.number)} — ${escapeHtml(c.title)}</option>`).join('');
  }

  function setTimelineColorSelection(color) {
    state.editingTimelineColor = color || 'amber';
    if (!dom.tlColorPicker) return;
    dom.tlColorPicker.querySelectorAll('[data-tl-color]').forEach(btn => {
      const isMatch = btn.dataset.tlColor === state.editingTimelineColor;
      btn.classList.toggle('border-white', isMatch);
      btn.classList.toggle('border-transparent', !isMatch);
      btn.classList.toggle('opacity-75', !isMatch);
      btn.classList.toggle('scale-105', isMatch);
    });
  }

  function openTimelineModal(options = {}) {
    const { editId = null, prefillTime = '', prefillLabel = '', prefillCardId = '', prefillColor = 'amber' } = options;

    state.editingTimelineId = editId;
    const existing = editId ? state.timelineEvents.find(x => x.id === editId) : null;

    const timeVal = existing ? existing.time : prefillTime;
    const labelVal = existing ? existing.label : prefillLabel;
    const cardIdVal = existing ? (existing.cardId || '') : prefillCardId;
    const colorVal = existing ? (existing.color || 'amber') : prefillColor;

    populateTimelineCardSelect(cardIdVal);
    dom.tlTimeInput.value = timeVal;
    dom.tlLabelInput.value = labelVal;
    setTimelineColorSelection(colorVal);

    if (existing) {
      dom.btnDeleteTimeline.classList.remove('hidden');
    } else {
      dom.btnDeleteTimeline.classList.add('hidden');
    }

    updateTimelineModalLinkedCardBar(cardIdVal);
    dom.timelineModal.classList.remove('hidden');
    setTimeout(() => {
      if (!dom.tlTimeInput.value) {
        dom.tlTimeInput.focus();
      } else {
        dom.tlLabelInput.focus();
      }
    }, 40);
  }

  function updateTimelineModalLinkedCardBar(cardId) {
    if (!dom.tlLinkedActions) return;
    const card = (cardId && state.scenario) ? state.scenario.cards.find(c => c.id === cardId) : null;
    if (card) {
      dom.tlLinkedActions.classList.remove('hidden');
      dom.tlLinkedCardName.textContent = `🔗 ${card.number}: ${card.title}`;
    } else {
      dom.tlLinkedActions.classList.add('hidden');
    }
  }

  function saveTimelineModal() {
    const timeVal = dom.tlTimeInput.value.trim();
    const labelVal = dom.tlLabelInput.value.trim();
    const cardIdVal = dom.tlCardSelect.value;

    if (!timeVal) {
      showToast('Inserisci un orario o una data (es. 21:51)', 'amber');
      dom.tlTimeInput.focus();
      return;
    }
    if (!labelVal) {
      showToast('Inserisci una breve descrizione per l\'evento', 'amber');
      dom.tlLabelInput.focus();
      return;
    }

    if (state.editingTimelineId) {
      const ev = state.timelineEvents.find(x => x.id === state.editingTimelineId);
      if (ev) {
        ev.time = timeVal;
        ev.label = labelVal;
        ev.cardId = cardIdVal || '';
        ev.color = state.editingTimelineColor;
      }
    } else {
      state.timelineEvents.push({
        id: 'tl-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
        time: timeVal,
        label: labelVal,
        cardId: cardIdVal || '',
        color: state.editingTimelineColor
      });
    }

    state.timelineCollapsed = false;
    closeTimelineModal();
    renderTimeline();
    saveState();
    showToast(`Evento "${timeVal} — ${labelVal}" salvato sulla Timeline`, 'amber');
  }

  function deleteActiveTimelineEvent() {
    if (!state.editingTimelineId) return;
    state.timelineEvents = state.timelineEvents.filter(x => x.id !== state.editingTimelineId);
    closeTimelineModal();
    renderTimeline();
    saveState();
    showToast('Pallino rimosso dalla Timeline', 'stone');
  }

  function closeTimelineModal() {
    state.editingTimelineId = null;
    dom.timelineModal.classList.add('hidden');
  }

  // =========================================================================
  // DECK MANAGEMENT & DRAWING CARDS
  // =========================================================================

  function drawNextCard(isInitial = false) {
    if (!state.scenario) return;
    const total = state.scenario.cards.length;
    if (state.drawnCount >= total) {
      showToast('Tutte le carte del mazzo sono già sulla lavagna!', 'amber');
      return;
    }

    const cardObj = state.scenario.cards[state.drawnCount];
    state.drawnCount += 1;
    state.maxZIndex += 1;

    if (!state.cardsState[cardObj.id]) {
      state.cardsState[cardObj.id] = {
        groupId: null,
        note: '',
        important: false,
        archived: false,
        collapsed: false,
        highlights: [],
        zIndex: state.maxZIndex,
        justDrawn: true
      };
    }

    state.selectedCards.clear();
    state.selectedCards.add(cardObj.id);

    renderBoard();
    renderDeckUI();
    updateMultiSelectToolbar();
    saveState();

    if (!isInitial) {
      openInspectModal(cardObj.id);
      showToast(`Carta ${cardObj.number}: "${cardObj.title}" pescata e aperta in modalità ispezione`, 'amber');
    }
  }

  function renderDeckUI() {
    if (!state.scenario) return;
    const total = state.scenario.cards.length;
    const drawn = state.drawnCount;
    const nextCard = drawn < total ? state.scenario.cards[drawn] : null;

    if (dom.deckCounterTop) {
      dom.deckCounterTop.textContent = `${drawn} / ${total}`;
    }
    if (dom.deckCountText) {
      dom.deckCountText.textContent = `Carte pescate: ${drawn} / ${total}`;
    }
    if (dom.deckProgressBar) {
      const pct = total > 0 ? Math.round((drawn / total) * 100) : 0;
      dom.deckProgressBar.style.width = `${pct}%`;
    }

    if (nextCard) {
      const label = `🃏 Pesca Prossima Carta (${nextCard.number})`;
      dom.btnDrawTop.innerHTML = `<span>${label}</span>`;
      dom.btnDrawTop.disabled = false;
      dom.btnDrawTop.className = 'px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-md text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer';

      dom.btnDrawDeck.innerHTML = `<span>Pesca Prossima Carta (${nextCard.number})</span>`;
      dom.btnDrawDeck.disabled = false;
      dom.btnDrawDeck.className = 'w-full py-2 px-3 bg-amber-500 hover:bg-amber-400 active:scale-[0.99] text-stone-950 font-extrabold rounded-md text-xs shadow-lg transition flex items-center justify-center gap-1.5 cursor-pointer';
      if (dom.deckVisualStack) dom.deckVisualStack.style.opacity = '1';
    } else {
      dom.btnDrawTop.innerHTML = `<span>✅ Mazzo Completato (${total}/${total})</span>`;
      dom.btnDrawTop.disabled = true;
      dom.btnDrawTop.className = 'px-3.5 py-1.5 bg-stone-800 text-stone-400 border border-stone-700 font-semibold rounded-md text-xs flex items-center gap-1.5 cursor-not-allowed';

      dom.btnDrawDeck.innerHTML = `<span>✅ Tutte le carte pescate</span>`;
      dom.btnDrawDeck.disabled = true;
      dom.btnDrawDeck.className = 'w-full py-2 px-3 bg-stone-800 text-stone-400 border border-stone-700 font-bold rounded-md text-xs flex items-center justify-center gap-1.5 cursor-not-allowed';
      if (dom.deckVisualStack) dom.deckVisualStack.style.opacity = '0.35';
    }
  }

  // =========================================================================
  // FORENSIC TEXT HIGHLIGHT RENDERER
  // =========================================================================

  function renderHighlightedText(rawText, highlights) {
    let safeHtml = escapeHtml(rawText || '');
    if (!Array.isArray(highlights) || highlights.length === 0) {
      return safeHtml;
    }

    const indexed = highlights
      .map((h, i) => ({ ...h, idx: i }))
      .filter(h => h.text && h.text.trim().length > 0)
      .sort((a, b) => b.text.length - a.text.length);

    const placeholders = [];
    indexed.forEach(h => {
      const escapedTarget = escapeHtml(h.text);
      if (!escapedTarget) return;
      const colorClass = `hl-${h.color || 'yellow'}`;
      const token = `__HL_TOKEN_${placeholders.length}__`;
      const replacement = `<mark class="forensic-hl ${colorClass}" data-hl-idx="${h.idx}" title="Clicca per rimuovere questa evidenziazione">${escapedTarget}</mark>`;
      if (safeHtml.includes(escapedTarget)) {
        safeHtml = safeHtml.split(escapedTarget).join(token);
        placeholders.push({ token, replacement });
      }
    });

    placeholders.forEach(({ token, replacement }) => {
      safeHtml = safeHtml.split(token).join(replacement);
    });

    return safeHtml;
  }

  function addHighlightToCard(cardId, selectedText, color) {
    const clean = (selectedText || '').trim();
    if (!clean || !state.cardsState[cardId]) return;

    const cs = state.cardsState[cardId];
    if (!Array.isArray(cs.highlights)) cs.highlights = [];

    const existing = cs.highlights.find(h => h.text.toLowerCase() === clean.toLowerCase());
    if (existing) {
      existing.color = color;
    } else {
      cs.highlights.push({ text: clean, color });
    }

    window.getSelection()?.removeAllRanges();
    hideTextSelectionToolbar();
    renderCards();
    if (state.inspectedCardId === cardId && !dom.inspectModal.classList.contains('hidden')) {
      openInspectModal(cardId);
    }
    saveState();
  }

  function removeHighlightByIndex(cardId, hlIdx) {
    const cs = state.cardsState[cardId];
    if (!cs || !Array.isArray(cs.highlights)) return;
    cs.highlights.splice(hlIdx, 1);
    renderCards();
    if (state.inspectedCardId === cardId && !dom.inspectModal.classList.contains('hidden')) {
      openInspectModal(cardId);
    }
    saveState();
  }

  function clearCardHighlights(cardId) {
    const cs = state.cardsState[cardId];
    if (!cs) return;
    cs.highlights = [];
    window.getSelection()?.removeAllRanges();
    hideTextSelectionToolbar();
    renderCards();
    if (state.inspectedCardId === cardId && !dom.inspectModal.classList.contains('hidden')) {
      openInspectModal(cardId);
    }
    saveState();
    showToast('Evidenziazioni rimosse dalla carta', 'stone');
  }

  function hideTextSelectionToolbar() {
    state.activeSelection = null;
    if (dom.textSelectionToolbar) {
      dom.textSelectionToolbar.classList.add('hidden');
    }
  }

  // =========================================================================
  // RENDERING: GROUPS, CARDS, RED STRINGS & TIMELINE
  // =========================================================================

  function renderAll() {
    renderTimeline();
    renderBoard();
    renderDeckUI();
    updateMultiSelectToolbar();
  }

  function renderBoard() {
    renderGroupsDOM();
    renderCardsDOM();
  }

  function renderGroups() {
    renderBoard();
  }

  function renderCards() {
    renderBoard();
  }

  function getCardDimensions(cs) {
    if (!cs) return { width: 288, height: 408 };
    if (cs.archived) return { width: 288, height: 126 };
    if (cs.collapsed) return { width: 288, height: 102 };
    return { width: 288, height: 408 };
  }

  function isCardInsideGroup(cardState, group) {
    const dims = getCardDimensions(cardState);
    const cx = cardState.x + dims.width / 2;
    const cy = cardState.y + dims.height / 2;
    return (
      cx >= group.x &&
      cx <= group.x + group.width &&
      cy >= group.y &&
      cy <= group.y + group.height
    );
  }

  function findGroupContainingCard(cardId) {
    const cs = state.cardsState[cardId];
    if (!cs) return null;

    if (cs.groupId !== undefined) {
      if (!cs.groupId) return null;
      return state.groups.find(g => g.id === cs.groupId) || null;
    }

    // Legacy coordinate fallback migration
    if (typeof cs.x === 'number' && typeof cs.y === 'number') {
      const legacyGroup = state.groups.find(g => isCardInsideGroup(cs, g)) || null;
      cs.groupId = legacyGroup ? legacyGroup.id : null;
      return legacyGroup;
    }

    cs.groupId = null;
    return null;
  }

  function getCardsInGroup(group) {
    if (!state.scenario) return [];
    const drawnCards = state.scenario.cards.slice(0, state.drawnCount);
    return drawnCards.filter(c => {
      const g = findGroupContainingCard(c.id);
      return g && g.id === group.id;
    });
  }

  function renderGroupsDOM() {
    dom.groupsLayer.innerHTML = '';

    state.groups.forEach(group => {
      const theme = GROUP_THEMES[group.theme] || GROUP_THEMES.amber;
      const cardsInside = getCardsInGroup(group);
      const allCollapsedInside = cardsInside.length > 0 && cardsInside.every(c => state.cardsState[c.id]?.collapsed);

      const el = document.createElement('div');
      el.id = `group-${group.id}`;
      el.dataset.groupId = group.id;
      el.className = `group-zone ${theme.border} ${theme.bg} shadow-xl`;

      el.innerHTML = `
        <div class="group-zone-header px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2 ${theme.headerBg}">
          <div class="flex items-center gap-2 flex-1 min-w-[180px]">
            <button type="button" class="btn-group-color w-4 h-4 rounded-full ${theme.dot} ring-2 ring-white/20 hover:scale-125 transition shrink-0 cursor-pointer" title="Cambia colore gruppo"></button>
            <input type="text" value="${escapeHtml(group.title)}"
              class="group-title-input bg-transparent text-sm font-extrabold ${theme.text} uppercase tracking-wider focus:outline-none focus:bg-black/30 px-1.5 py-0.5 rounded w-full truncate"
              title="Clicca per rinominare il gruppo" />
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <span class="text-xs font-mono-tech px-2 py-0.5 rounded bg-black/50 text-stone-200 border border-white/10" title="Carte presenti in questo gruppo">
              ${cardsInside.length} ${cardsInside.length === 1 ? 'carta' : 'carte'}
            </span>
            <button type="button" class="btn-group-collapse text-xs px-2 py-0.5 rounded bg-stone-800/80 hover:bg-stone-700 text-stone-200 border border-stone-600/50 transition cursor-pointer" title="Riduci a solo titolo (Collapse) o riespandi tutte le carte in questo gruppo">
              ${allCollapsedInside ? '▾ Espandi tutte' : '▴ Compatta tutte'}
            </button>
            <button type="button" class="btn-group-delete text-stone-400 hover:text-red-400 px-1.5 py-0.5 rounded transition text-sm font-bold cursor-pointer" title="Elimina gruppo (le carte torneranno tra i reperti da smistare)">
              ✕
            </button>
          </div>
        </div>
        <div id="group-cards-${group.id}" class="group-cards-container grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 items-start">
          ${cardsInside.length === 0 ? `
            <div class="col-span-full py-6 px-4 text-center text-xs font-mono-tech text-stone-400/80 border border-dashed border-white/10 rounded-lg select-none">
              Nessuna carta in questo gruppo — Usa il bottone <b>📁</b> su una carta (o trascinala qui) per aggiungerla
            </div>
          ` : ''}
        </div>
      `;

      bindGroupEvents(el, group);
      dom.groupsLayer.appendChild(el);
    });

    const unassignedSection = document.getElementById('unassigned-section');
    if (unassignedSection && !unassignedSection.dataset.dropBound) {
      unassignedSection.dataset.dropBound = '1';
      unassignedSection.addEventListener('dragover', e => {
        e.preventDefault();
        unassignedSection.classList.add('border-amber-400', 'bg-stone-900/80');
      });
      unassignedSection.addEventListener('dragleave', () => {
        unassignedSection.classList.remove('border-amber-400', 'bg-stone-900/80');
      });
      unassignedSection.addEventListener('drop', e => {
        e.preventDefault();
        unassignedSection.classList.remove('border-amber-400', 'bg-stone-900/80');
        const cid = e.dataTransfer?.getData('text/plain');
        if (cid && state.cardsState[cid]) {
          state.cardsState[cid].groupId = null;
          renderAll();
          saveState();
          showToast('Carta spostata in "Nuovi Reperti / Da Smistare"', 'stone');
        }
      });
    }

    if (dom.multiGroupSelect) {
      dom.multiGroupSelect.innerHTML = `<option value="">📁 Sposta nel Gruppo...</option>` +
        state.groups.map(g => `<option value="${g.id}">${escapeHtml(g.title)}</option>`).join('') +
        `<option value="__unassigned__">📥 Sposta in Da Smistare</option>` +
        `<option value="__new_group__">➕ Crea Nuovo Gruppo con selezione...</option>`;
    }
  }

  function renderCardsDOM() {
    if (!state.scenario) return;
    dom.cardsLayer.innerHTML = '';
    state.groups.forEach(group => {
      const container = document.getElementById(`group-cards-${group.id}`);
      if (container && getCardsInGroup(group).length > 0) {
        container.innerHTML = '';
      }
    });

    const drawnCards = state.scenario.cards.slice(0, state.drawnCount);
    let unassignedCount = 0;

    drawnCards.forEach(card => {
      let cs = state.cardsState[card.id];
      if (!cs) {
        cs = { groupId: null, note: '', important: false, archived: false, collapsed: false, highlights: [] };
        state.cardsState[card.id] = cs;
      }
      if (!Array.isArray(cs.highlights)) cs.highlights = [];

      const catStyle = CATEGORY_STYLES[card.category] || CATEGORY_STYLES['Forense'];
      const isSelected = state.selectedCards.has(card.id);
      const isLinkStart = state.linkStartCardId === card.id;
      const isCollapsed = Boolean(cs.collapsed) && !cs.archived;
      const hasNote = Boolean(cs.note && cs.note.trim().length > 0);
      const hasHighlights = cs.highlights.length > 0;
      const parentGroup = findGroupContainingCard(card.id);
      const parentTheme = parentGroup ? (GROUP_THEMES[parentGroup.theme] || GROUP_THEMES.amber) : null;

      if (!parentGroup) {
        unassignedCount += 1;
      }

      // Red Strings connected to this card
      const cardConnections = state.connections.filter(c => c.from === card.id || c.to === card.id);
      const redStringsHtml = cardConnections.length > 0 ? `
        <div class="px-2.5 py-1 bg-red-950/15 border-b border-stone-300/80 flex flex-wrap items-center gap-1 shrink-0">
          ${cardConnections.map(conn => {
            const otherId = conn.from === card.id ? conn.to : conn.from;
            const otherCard = state.scenario.cards.find(c => c.id === otherId);
            return `
              <div class="inline-flex items-center rounded-full bg-red-950 text-red-100 border border-red-500 text-[10.5px] font-mono-tech overflow-hidden shadow-sm">
                <button type="button" data-jump-conn-card="${otherId}" class="px-2 py-0.5 hover:bg-red-800 font-bold transition cursor-pointer" title="Vai alla carta collegata ${otherCard ? escapeHtml(otherCard.title) : ''}">
                  🧶 → ${otherCard ? escapeHtml(otherCard.number) : otherId}${conn.label ? ': ' + escapeHtml(conn.label) : ''}
                </button>
                <button type="button" data-edit-conn="${conn.id}" class="px-1.5 py-0.5 bg-red-900/80 hover:bg-red-700 text-red-200 border-l border-red-600/60 transition cursor-pointer" title="Modifica etichetta o rimuovi filo rosso">
                  ✎
                </button>
              </div>
            `;
          }).join('')}
        </div>
      ` : '';

      const el = document.createElement('div');
      el.id = `card-${card.id}`;
      el.dataset.cardId = card.id;
      el.draggable = true;
      el.className = [
        'crime-card',
        catStyle.headerAccent,
        isSelected ? 'is-selected' : '',
        cs.important ? 'is-important' : '',
        cs.archived ? 'is-archived' : '',
        isCollapsed ? 'is-collapsed' : '',
        cs.justDrawn ? 'card-deal-anim' : ''
      ].filter(Boolean).join(' ');

      if (cs.justDrawn) {
        delete cs.justDrawn;
      }

      const illustrationHtml = window.ProfilerIllustrations.render(card.image, card.category, card.number);
      const formattedRawTextHtml = renderHighlightedText(card.rawText, cs.highlights);

      el.innerHTML = `
        <!-- 3D Push-Pin at top center -->
        <div class="card-pin-wrapper" data-pin-card="${card.id}" title="Puntina: clicca per collegare un Filo Rosso con un'altra carta">
          <div class="card-pin ${isLinkStart ? 'pin-active ring-4 ring-red-500' : ''}"></div>
        </div>

        <!-- Card Header (Double click to Collapse/Expand; ONLY Collapse button here) -->
        <div class="card-header-drag px-3 pt-2.5 pb-1.5 ${isCollapsed && !redStringsHtml ? 'rounded' : 'border-b border-stone-300 rounded-t'} bg-stone-200/75 flex flex-col gap-1 shrink-0" title="Doppio click per ridurre a solo titolo (Collapse) • Trascina o usa 📁 per cambiare gruppo">
          <!-- Row 1: Number, Category Badge & Collapse Button Only -->
          <div class="flex items-center justify-between gap-1.5">
            <div class="flex items-center gap-1.5">
              <span class="font-mono-tech font-extrabold text-sm bg-stone-900 text-amber-400 px-2 py-0.5 rounded shrink-0">${escapeHtml(card.number)}</span>
              <span class="${catStyle.badgeBg} text-[10.5px] font-mono-tech uppercase px-2 py-0.5 rounded font-bold border shrink-0">
                ${escapeHtml(card.category)}
              </span>
            </div>
            <div class="flex items-center gap-1 shrink-0">
              ${isCollapsed && parentTheme ? `<span class="w-2.5 h-2.5 rounded-full ${parentTheme.dot}" title="Nel gruppo: ${escapeHtml(parentGroup.title)}"></span>` : ''}
              ${isCollapsed && hasNote ? '<span class="text-[10.5px] bg-yellow-300/90 text-amber-950 px-1.5 rounded font-bold" title="Contiene una nota Post-it">📝</span>' : ''}
              ${isCollapsed && hasHighlights ? '<span class="text-[10.5px] bg-amber-200 text-stone-900 px-1.5 rounded font-bold" title="Contiene testo evidenziato">🖍️</span>' : ''}
              <button type="button" class="btn-card-collapse px-2 py-0.5 rounded transition font-mono-tech font-bold text-xs cursor-pointer ${isCollapsed ? 'bg-stone-800 text-amber-400 hover:bg-stone-700' : 'bg-stone-300/90 hover:bg-stone-400/70 text-stone-800'}" title="${isCollapsed ? 'Espandi carta completa' : 'Riduci a icona lasciando solo il titolo (Collapse)'}">
                ${isCollapsed ? '▾' : '▴'}
              </button>
            </div>
          </div>

          <!-- Row 2: Full Un-truncated Card Title -->
          <div class="font-extrabold text-[14px] text-stone-900 leading-snug whitespace-normal break-words pt-0.5">
            ${escapeHtml(card.title)}
          </div>

          <!-- Row 3: Timestamp -->
          <div class="flex items-center justify-between text-xs text-stone-600">
            <span class="font-mono-tech font-semibold text-stone-700">🕒 ${escapeHtml(card.timestamp)}</span>
          </div>
        </div>

        ${redStringsHtml}

        ${cs.archived ? `
          <div class="px-3 py-2 flex items-center justify-between text-xs font-mono-tech text-stone-600 bg-stone-200/60 border-t border-stone-300 rounded-b">
            <span>[PISTA ARCHIVIATA]</span>
            <button type="button" class="btn-card-archive underline font-bold text-stone-800 cursor-pointer">Ripristina</button>
          </div>
        ` : isCollapsed ? '' : `
          <!-- Forensic Illustration Preview (Proportional 20:9 Aspect Ratio + Click to Zoom) -->
          <div class="card-image-preview aspect-[20/9] w-full px-2.5 pt-1.5 shrink-0 cursor-zoom-in" title="Clicca sul disegno per ingrandirlo con la lente (Zoom)">
            ${illustrationHtml}
          </div>

          <!-- Objective Typewriter Raw Text (Selectable for Copy/Paste, Highlighting & Timeline!) -->
          <div class="card-text-scroll-area px-2.5 py-1.5 flex-1 min-h-0 max-h-[155px] overflow-y-auto evidence-scroll">
            <div data-evidence-card-id="${card.id}"
              class="card-raw-text selectable-evidence-text font-typewriter text-[12.2px] leading-[1.44] p-2.5 text-stone-900 whitespace-pre-line bg-white/85 rounded border border-stone-300/90 shadow-inner"
              title="Seleziona il testo o un orario col mouse per copiarlo, evidenziarlo o inviarlo alla Timeline">${formattedRawTextHtml}</div>
          </div>

          <!-- Personal Sticky Note (Post-it Giallo) -->
          <div class="px-2.5 pb-1 pt-0.5 shrink-0">
            <div class="postit-note px-2.5 py-1 relative">
              <div class="flex items-center justify-between text-[10px] font-mono-tech font-bold text-amber-900/85 uppercase tracking-wider mb-0.5">
                <span>📝 Nota Investigatore (Post-it)</span>
                ${cs.important ? '<span class="text-amber-800 font-extrabold">★ CHIAVE</span>' : ''}
              </div>
              <textarea
                rows="2"
                placeholder="Incolla indizi o scrivi deduzioni..."
                class="card-note-input selectable-evidence-text w-full bg-transparent text-xs leading-tight font-medium text-stone-900 placeholder-amber-900/45 focus:outline-none resize-none"
              >${escapeHtml(cs.note || '')}</textarea>
            </div>
          </div>

          <!-- Bottom Action Bar (All Action Buttons except Collapse) -->
          <div class="card-footer-actions px-2.5 py-1.5 border-t border-stone-300/90 bg-stone-200/80 rounded-b flex items-center justify-between gap-1.5 shrink-0">
            <div class="flex items-center gap-1">
              <button type="button" class="btn-card-group px-2 py-0.5 rounded transition text-xs font-bold flex items-center gap-1 cursor-pointer ${parentGroup ? 'bg-stone-800 text-amber-300 border border-stone-600' : 'bg-stone-300/90 hover:bg-amber-300 text-stone-800 border border-stone-400/50'}" title="${parentGroup ? 'Nel gruppo: ' + escapeHtml(parentGroup.title) + ' (Clicca per cambiare gruppo)' : 'Aggiungi questa carta a un Gruppo esistente'}">
                ${parentTheme ? `<span class="w-2.5 h-2.5 rounded-full ${parentTheme.dot} inline-block"></span>` : ''}📁
              </button>
              <button type="button" class="btn-card-timeline px-2 py-0.5 rounded bg-stone-300/90 hover:bg-amber-400 text-stone-800 hover:text-stone-950 border border-stone-400/50 font-mono-tech font-bold text-[11px] transition cursor-pointer" title="Aggiungi questa carta e un orario sulla Timeline in alto">
                +⏱️
              </button>
              <button type="button" class="btn-card-important px-2 py-0.5 rounded hover:bg-amber-200/90 transition text-xs cursor-pointer border ${cs.important ? 'bg-amber-300 text-amber-950 border-amber-500 font-bold' : 'bg-stone-300/60 text-stone-600 border-stone-400/40'}" title="Segna come Importante (Bordo Dorato)">
                📌
              </button>
              <button type="button" class="btn-card-archive px-2 py-0.5 rounded hover:bg-stone-300 transition text-xs cursor-pointer border ${cs.archived ? 'bg-stone-800 text-white border-stone-900' : 'bg-stone-300/60 text-stone-600 border-stone-400/40'}" title="${cs.archived ? 'Ripristina carta' : 'Segna come Pista Falsa / Archivia (Opacità 40%)'}">
                🗑️
              </button>
            </div>
            <button type="button" class="btn-card-inspect px-2.5 py-0.5 rounded bg-stone-800 hover:bg-amber-600 text-stone-100 hover:text-stone-950 font-bold transition text-xs flex items-center gap-1 cursor-pointer shrink-0 shadow-sm" title="Ingrandisci e ispeziona il reperto ad alta risoluzione">
              <span>🔍</span>
              <span>Ispeziona</span>
            </button>
          </div>
        `}
      `;

      bindCardEvents(el, card.id);

      if (parentGroup) {
        const groupContainer = document.getElementById(`group-cards-${parentGroup.id}`);
        if (groupContainer) {
          groupContainer.appendChild(el);
        } else {
          dom.cardsLayer.appendChild(el);
        }
      } else {
        dom.cardsLayer.appendChild(el);
      }
    });

    const unassignedBadge = document.getElementById('unassigned-count-badge');
    if (unassignedBadge) {
      unassignedBadge.textContent = String(unassignedCount);
    }

    if (unassignedCount === 0) {
      dom.cardsLayer.innerHTML = `
        <div class="col-span-full py-2.5 px-3 text-center text-xs font-mono-tech text-stone-400/80 border border-dashed border-stone-700/70 rounded-lg select-none">
          ✅ Tutti i reperti pescati sono stati assegnati ai gruppi sottostanti — Pesca una nuova carta o trascina qui per rimuoverla da un gruppo
        </div>
      `;
    }
  }

  function renderStrings() {
    // Red Strings are rendered directly on each connected card in Structured Grid mode
  }

  // =========================================================================
  // INTERACTIONS: CARDS, TEXT SELECTION, PINS, GROUPS & CANVAS
  // =========================================================================

  function bindCardEvents(cardEl, cardId) {
    // 1. Pin click -> Start or finish a Red String immediately
    const pinWrapper = cardEl.querySelector('.card-pin-wrapper');
    if (pinWrapper) {
      pinWrapper.addEventListener('mousedown', e => e.stopPropagation());
      pinWrapper.addEventListener('click', e => {
        e.stopPropagation();
        handleCardLinkClick(cardId);
      });
    }

    // 2. Quick action buttons (Add to Group, Collapse title-only, Important, Archive, Inspect, Add to Timeline)
    const btnGroup = cardEl.querySelector('.btn-card-group');
    if (btnGroup) {
      btnGroup.addEventListener('mousedown', e => e.stopPropagation());
      btnGroup.addEventListener('click', e => {
        e.stopPropagation();
        openCardGroupPopover(cardId, btnGroup);
      });
    }

    const btnCollapse = cardEl.querySelector('.btn-card-collapse');
    if (btnCollapse) {
      btnCollapse.addEventListener('mousedown', e => e.stopPropagation());
      btnCollapse.addEventListener('click', e => {
        e.stopPropagation();
        toggleCardCollapsed(cardId);
      });
    }

    const headerDrag = cardEl.querySelector('.card-header-drag');
    if (headerDrag) {
      headerDrag.addEventListener('dblclick', e => {
        if (e.target.tagName === 'BUTTON') return;
        e.stopPropagation();
        toggleCardCollapsed(cardId);
      });
    }

    const btnTimeline = cardEl.querySelector('.btn-card-timeline');
    if (btnTimeline) {
      btnTimeline.addEventListener('mousedown', e => e.stopPropagation());
      btnTimeline.addEventListener('click', e => {
        e.stopPropagation();
        const card = state.scenario?.cards.find(c => c.id === cardId);
        const extractedTime = card ? extractTimeFromSnippet('', card.timestamp) : '';
        openTimelineModal({
          prefillTime: extractedTime,
          prefillLabel: card ? card.title : '',
          prefillCardId: cardId,
          prefillColor: 'amber'
        });
      });
    }

    const btnImportant = cardEl.querySelector('.btn-card-important');
    if (btnImportant) {
      btnImportant.addEventListener('mousedown', e => e.stopPropagation());
      btnImportant.addEventListener('click', e => {
        e.stopPropagation();
        toggleCardImportant(cardId);
      });
    }

    const btnsArchive = cardEl.querySelectorAll('.btn-card-archive');
    btnsArchive.forEach(btn => {
      btn.addEventListener('mousedown', e => e.stopPropagation());
      btn.addEventListener('click', e => {
        e.stopPropagation();
        toggleCardArchive(cardId);
      });
    });

    const btnInspect = cardEl.querySelector('.btn-card-inspect');
    if (btnInspect) {
      btnInspect.addEventListener('mousedown', e => e.stopPropagation());
      btnInspect.addEventListener('click', e => {
        e.stopPropagation();
        openInspectModal(cardId);
      });
    }

    const imgPreview = cardEl.querySelector('.card-image-preview');
    if (imgPreview) {
      imgPreview.addEventListener('mousedown', e => e.stopPropagation());
      imgPreview.addEventListener('click', e => {
        e.stopPropagation();
        if (state.toolMode === 'link' || state.linkStartCardId) {
          handleCardLinkClick(cardId);
          return;
        }
        openImageZoomModal(cardId);
      });
    }

    // 3. Raw Text Area: Allow native text selection for Copy/Paste, Highlighting & Timeline without dragging card!
    const rawTextEl = cardEl.querySelector('.card-raw-text');
    if (rawTextEl) {
      rawTextEl.addEventListener('mousedown', e => {
        if (state.toolMode === 'link' || state.linkStartCardId) {
          return;
        }
        e.stopPropagation();
      });

      rawTextEl.querySelectorAll('mark.forensic-hl').forEach(markEl => {
        markEl.addEventListener('click', e => {
          e.stopPropagation();
          const idx = Number(markEl.dataset.hlIdx);
          if (!Number.isNaN(idx)) {
            removeHighlightByIndex(cardId, idx);
          }
        });
      });
    }

    // 4. Personal Note (Post-it) input
    const noteInput = cardEl.querySelector('.card-note-input');
    if (noteInput) {
      noteInput.addEventListener('mousedown', e => e.stopPropagation());
      noteInput.addEventListener('input', e => {
        if (state.cardsState[cardId]) {
          state.cardsState[cardId].note = e.target.value;
          saveState();
        }
      });
    }

    // 5. Red String Connection Badges on Card
    cardEl.querySelectorAll('[data-jump-conn-card]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        focusCardOnBoard(btn.dataset.jumpConnCard);
      });
    });
    cardEl.querySelectorAll('[data-edit-conn]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        openStringModal(btn.dataset.editConn);
      });
    });

    // 6. HTML5 Drag & Drop between Groups + Click Selection
    cardEl.addEventListener('dragstart', e => {
      if (document.activeElement && (document.activeElement.tagName === 'TEXTAREA' || document.activeElement.tagName === 'INPUT')) {
        e.preventDefault();
        return;
      }
      e.dataTransfer?.setData('text/plain', cardId);
      cardEl.classList.add('opacity-60');
    });

    cardEl.addEventListener('dragend', () => {
      cardEl.classList.remove('opacity-60');
      clearHoveredGroups();
    });

    cardEl.addEventListener('click', e => {
      if (e.target.closest('button, textarea, input, select, .card-raw-text')) {
        return;
      }
      hideTextSelectionToolbar();
      closeCardGroupPopover();

      if (state.toolMode === 'link' || state.linkStartCardId) {
        handleCardLinkClick(cardId);
        return;
      }

      if (e.shiftKey) {
        if (state.selectedCards.has(cardId)) {
          state.selectedCards.delete(cardId);
          cardEl.classList.remove('is-selected');
        } else {
          state.selectedCards.add(cardId);
          cardEl.classList.add('is-selected');
        }
      } else {
        state.selectedCards.clear();
        document.querySelectorAll('.crime-card.is-selected').forEach(el => el.classList.remove('is-selected'));
        state.selectedCards.add(cardId);
        cardEl.classList.add('is-selected');
      }

      updateMultiSelectToolbar();
      renderTimeline();
    });
  }

  function clearHoveredGroups() {
    document.querySelectorAll('.group-zone.drop-target-hover').forEach(el => {
      el.classList.remove('drop-target-hover');
    });
  }

  // =========================================================================
  // GROUP POPOVER & AUTO-EXPANDING GROUP ASSIGNMENT LOGIC
  // =========================================================================

  function openCardGroupPopover(cardId, anchorBtn) {
    if (!dom.cardGroupPopover || !dom.cardGroupPopoverList) return;
    state.groupPopoverCardId = cardId;

    const currentGroup = findGroupContainingCard(cardId);

    const itemsHtml = state.groups.map(g => {
      const theme = GROUP_THEMES[g.theme] || GROUP_THEMES.amber;
      const count = getCardsInGroup(g).length;
      const isCurrent = currentGroup && currentGroup.id === g.id;
      return `
        <button type="button" data-pick-group="${g.id}"
          class="w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between gap-2 transition cursor-pointer ${isCurrent ? 'bg-amber-500/20 border border-amber-500/60 text-amber-200 font-bold' : 'hover:bg-stone-800 text-stone-200'}">
          <div class="flex items-center gap-2 min-w-0">
            <span class="w-2.5 h-2.5 rounded-full ${theme.dot} shrink-0"></span>
            <span class="truncate">${escapeHtml(g.title)}</span>
          </div>
          <span class="text-[10px] font-mono-tech text-stone-400 shrink-0">${isCurrent ? '✓ Qui' : count + ' carte'}</span>
        </button>
      `;
    }).join('');

    dom.cardGroupPopoverList.innerHTML = `
      ${itemsHtml}
      <div class="border-t border-stone-800 mt-1 pt-1 flex flex-col gap-1">
        ${currentGroup ? `
          <button type="button" data-pick-group="__unassigned__"
            class="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-stone-300 hover:bg-stone-800 font-medium flex items-center gap-2 cursor-pointer">
            <span>📥 Sposta in "Nuovi Reperti / Da Smistare"</span>
          </button>
        ` : ''}
        <button type="button" data-pick-group="__new_group__"
          class="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-amber-300 hover:bg-stone-800 font-semibold flex items-center gap-2 cursor-pointer">
          <span>➕ Crea Nuovo Gruppo con questa carta</span>
        </button>
      </div>
    `;

    dom.cardGroupPopoverList.querySelectorAll('[data-pick-group]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const targetGroupId = btn.dataset.pickGroup;
        closeCardGroupPopover();
        if (targetGroupId === '__new_group__') {
          createNewGroupWithCards([cardId]);
        } else if (targetGroupId === '__unassigned__') {
          if (state.cardsState[cardId]) state.cardsState[cardId].groupId = null;
          renderAll();
          saveState();
          showToast('Carta riportata in "Nuovi Reperti / Da Smistare"', 'stone');
        } else {
          addCardsToGroup(targetGroupId, [cardId]);
        }
      });
    });

    dom.cardGroupPopover.classList.remove('hidden');

    const rect = anchorBtn.getBoundingClientRect();
    const popHeight = dom.cardGroupPopover.offsetHeight || 220;
    const left = Math.min(window.innerWidth - 270, Math.max(12, rect.left));
    const top = (rect.bottom + popHeight + 12 > window.innerHeight)
      ? Math.max(12, rect.top - popHeight - 6)
      : rect.bottom + 6;

    dom.cardGroupPopover.style.left = `${left}px`;
    dom.cardGroupPopover.style.top = `${top}px`;
  }

  function closeCardGroupPopover() {
    state.groupPopoverCardId = null;
    if (dom.cardGroupPopover) {
      dom.cardGroupPopover.classList.add('hidden');
    }
  }

  function createNewGroupWithCards(cardIds) {
    if (!cardIds || cardIds.length === 0) return;
    const themeKey = THEME_KEYS[state.groups.length % THEME_KEYS.length];

    const newGroup = {
      id: 'grp-' + Date.now(),
      title: '📁 NUOVO GRUPPO INDIZI',
      theme: themeKey
    };

    state.groups.push(newGroup);
    addCardsToGroup(newGroup.id, cardIds);
  }

  /**
   * Adds one or more cards to an existing group; in Structured Grid mode,
   * the group's CSS grid container automatically grows vertically to accommodate them.
   */
  function addCardsToGroup(groupId, cardIdsToAdd) {
    if (!groupId || !Array.isArray(cardIdsToAdd) || cardIdsToAdd.length === 0) return;
    const group = state.groups.find(g => g.id === groupId);
    if (!group) return;

    cardIdsToAdd.forEach(cid => {
      if (state.cardsState[cid]) {
        state.cardsState[cid].groupId = group.id;
      }
    });

    renderAll();
    saveState();

    // Flash the group border to highlight the addition & auto-expansion
    const gEl = document.getElementById(`group-${group.id}`);
    if (gEl) {
      gEl.classList.add('group-expanded-flash');
      setTimeout(() => gEl.classList.remove('group-expanded-flash'), 800);
    }

    if (cardIdsToAdd.length === 1 && state.scenario) {
      const card = state.scenario.cards.find(c => c.id === cardIdsToAdd[0]);
      showToast(
        `${card ? 'Carta ' + card.number : 'Carta'} aggiunta a "${group.title}"`,
        'amber'
      );
    } else {
      showToast(
        `${cardIdsToAdd.length} carte aggiunte a "${group.title}"`,
        'amber'
      );
    }
  }

  function bindGroupEvents(groupEl, group) {
    const titleInput = groupEl.querySelector('.group-title-input');
    const btnColor = groupEl.querySelector('.btn-group-color');
    const btnCollapse = groupEl.querySelector('.btn-group-collapse');
    const btnDelete = groupEl.querySelector('.btn-group-delete');

    titleInput.addEventListener('mousedown', e => e.stopPropagation());
    titleInput.addEventListener('input', e => {
      group.title = e.target.value;
      saveState();
    });

    btnColor.addEventListener('mousedown', e => e.stopPropagation());
    btnColor.addEventListener('click', e => {
      e.stopPropagation();
      const idx = THEME_KEYS.indexOf(group.theme);
      group.theme = THEME_KEYS[(idx + 1) % THEME_KEYS.length];
      renderGroups();
      renderCards();
      saveState();
    });

    if (btnCollapse) {
      btnCollapse.addEventListener('mousedown', e => e.stopPropagation());
      btnCollapse.addEventListener('click', e => {
        e.stopPropagation();
        const cardsInside = getCardsInGroup(group);
        if (cardsInside.length === 0) {
          showToast('Aggiungi prima delle carte dentro questo gruppo!', 'stone');
          return;
        }
        const shouldCollapse = cardsInside.some(c => !state.cardsState[c.id]?.collapsed);
        cardsInside.forEach(c => {
          const cs = state.cardsState[c.id];
          if (cs) cs.collapsed = shouldCollapse;
        });
        renderAll();
        saveState();
      });
    }

    btnDelete.addEventListener('mousedown', e => e.stopPropagation());
    btnDelete.addEventListener('click', e => {
      e.stopPropagation();
      getCardsInGroup(group).forEach(c => {
        if (state.cardsState[c.id]) state.cardsState[c.id].groupId = null;
      });
      state.groups = state.groups.filter(g => g.id !== group.id);
      renderGroups();
      renderCards();
      saveState();
      showToast('Gruppo rimosso (le carte sono tornate in "Nuovi Reperti / Da Smistare")', 'stone');
    });

    // HTML5 Drop Target for Cards
    groupEl.addEventListener('dragover', e => {
      e.preventDefault();
      groupEl.classList.add('drop-target-hover');
    });
    groupEl.addEventListener('dragleave', e => {
      if (!groupEl.contains(e.relatedTarget)) {
        groupEl.classList.remove('drop-target-hover');
      }
    });
    groupEl.addEventListener('drop', e => {
      e.preventDefault();
      groupEl.classList.remove('drop-target-hover');
      const draggedCardId = e.dataTransfer?.getData('text/plain');
      if (draggedCardId) {
        addCardsToGroup(group.id, [draggedCardId]);
      }
    });
  }

  // =========================================================================
  // RED STRINGS (FILI ROSSI) LOGIC
  // =========================================================================

  function handleCardLinkClick(cardId) {
    if (!state.linkStartCardId) {
      state.linkStartCardId = cardId;
      updateLinkBanner();
      renderBoard();
      return;
    }

    if (state.linkStartCardId === cardId) {
      state.linkStartCardId = null;
      updateLinkBanner();
      renderBoard();
      return;
    }

    const existing = state.connections.find(
      c => (c.from === state.linkStartCardId && c.to === cardId) ||
           (c.from === cardId && c.to === state.linkStartCardId)
    );

    if (existing) {
      state.linkStartCardId = null;
      updateLinkBanner();
      renderBoard();
      openStringModal(existing.id);
      return;
    }

    const newConn = {
      id: 'str-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
      from: state.linkStartCardId,
      to: cardId,
      label: ''
    };

    state.connections.push(newConn);
    state.linkStartCardId = null;
    updateLinkBanner();
    renderBoard();
    saveState();

    openStringModal(newConn.id);
  }

  function updateLinkBanner() {
    const active = state.toolMode === 'link' || Boolean(state.linkStartCardId);
    if (dom.linkModeBanner) {
      dom.linkModeBanner.classList.toggle('hidden', !active);
      if (state.linkStartCardId && state.scenario) {
        const card = state.scenario.cards.find(c => c.id === state.linkStartCardId);
        dom.linkBannerText.textContent = `🧶 Filo Rosso agganciato a ${card ? card.number : ''} — Clicca sulla seconda carta per collegarla (ESC per annullare)`;
      } else {
        dom.linkBannerText.textContent = `🧶 Modalità Filo Rosso attiva — Clicca sulla prima carta o su una puntina`;
      }
    }

    if (dom.btnToolLink) {
      if (state.toolMode === 'link') {
        dom.btnToolLink.className = 'px-3 py-1.5 bg-red-700 hover:bg-red-600 text-white border border-red-400 rounded-md text-xs font-bold shadow transition flex items-center gap-1.5';
        dom.btnToolLink.innerHTML = '<span>🧶 Filo Rosso: ON</span>';
      } else {
        dom.btnToolLink.className = 'px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-md text-xs font-medium transition flex items-center gap-1.5';
        dom.btnToolLink.innerHTML = '<span>🧶 Filo Rosso</span>';
      }
    }
  }

  function openStringModal(connId) {
    const conn = state.connections.find(c => c.id === connId);
    if (!conn) return;
    state.editingStringId = connId;
    dom.stringLabelInput.value = conn.label || '';
    dom.stringModal.classList.remove('hidden');
    setTimeout(() => dom.stringLabelInput.focus(), 40);
  }

  function saveStringModal() {
    const conn = state.connections.find(c => c.id === state.editingStringId);
    if (conn) {
      conn.label = dom.stringLabelInput.value.trim();
      renderBoard();
      if (state.inspectedCardId && !dom.inspectModal.classList.contains('hidden')) {
        openInspectModal(state.inspectedCardId);
      }
      saveState();
    }
    closeStringModal();
  }

  function deleteActiveString() {
    state.connections = state.connections.filter(c => c.id !== state.editingStringId);
    renderBoard();
    if (state.inspectedCardId && !dom.inspectModal.classList.contains('hidden')) {
      openInspectModal(state.inspectedCardId);
    }
    saveState();
    closeStringModal();
    showToast('Filo rosso rimosso', 'stone');
  }

  function closeStringModal() {
    state.editingStringId = null;
    dom.stringModal.classList.add('hidden');
  }

  // =========================================================================
  // CARD STATUS, TITLE-ONLY COLLAPSE & SELECTION BAR ACTIONS
  // =========================================================================

  function toggleCardCollapsed(cardId) {
    const cs = state.cardsState[cardId];
    if (!cs) return;
    cs.collapsed = !cs.collapsed;
    if (cs.collapsed) cs.archived = false;
    renderBoard();
    saveState();
  }

  function toggleCardImportant(cardId) {
    const cs = state.cardsState[cardId];
    if (!cs) return;
    cs.important = !cs.important;
    if (cs.important) cs.archived = false;
    renderCards();
    renderStrings();
    saveState();
  }

  function toggleCardArchive(cardId) {
    const cs = state.cardsState[cardId];
    if (!cs) return;
    cs.archived = !cs.archived;
    if (cs.archived) {
      cs.important = false;
      cs.collapsed = false;
    }
    renderCards();
    renderStrings();
    saveState();
  }

  function updateMultiSelectToolbar() {
    const count = state.selectedCards.size;
    const commandsBanner = document.getElementById('hud-commands-banner');
    if (count >= 1) {
      dom.multiSelectBar.classList.remove('hidden');
      if (commandsBanner) {
        commandsBanner.classList.add('!hidden');
      }
      if (count === 1 && state.scenario) {
        const onlyId = Array.from(state.selectedCards)[0];
        const card = state.scenario.cards.find(c => c.id === onlyId);
        dom.multiSelectCount.textContent = card ? `Carta ${card.number} selezionata` : '1 carta selezionata';
      } else {
        dom.multiSelectCount.textContent = `${count} carte selezionate`;
      }
    } else {
      dom.multiSelectBar.classList.add('hidden');
      if (commandsBanner && !state.commandsBannerDismissed) {
        commandsBanner.classList.remove('!hidden');
      }
    }
  }

  // =========================================================================
  // MODALS: INSPECT (ZOOM), DOSSIER BRIEFING, SOLVE CASE (VERDICT)
  // =========================================================================

  function openInspectModal(cardId) {
    if (!state.scenario) return;
    const card = state.scenario.cards.find(c => c.id === cardId);
    if (!card) return;
    state.inspectedCardId = cardId;
    const cs = state.cardsState[cardId] || { highlights: [] };
    if (!Array.isArray(cs.highlights)) cs.highlights = [];
    const catStyle = CATEGORY_STYLES[card.category] || CATEGORY_STYLES['Forense'];
    const currentGroup = findGroupContainingCard(cardId);

    const linkedStrings = state.connections.filter(c => c.from === cardId || c.to === cardId);
    const linkedHtml = linkedStrings.length === 0
      ? `<p class="text-xs text-stone-500 italic">Nessun filo rosso collegato a questo reperto.</p>`
      : linkedStrings.map(conn => {
          const otherId = conn.from === cardId ? conn.to : conn.from;
          const otherCard = state.scenario.cards.find(c => c.id === otherId);
          return `
            <div class="flex items-center justify-between bg-stone-900/90 border border-red-900/60 px-2.5 py-1.5 rounded text-xs">
              <div class="flex items-center gap-2">
                <span class="text-red-400 font-bold">🧶 → ${otherCard ? escapeHtml(otherCard.number + ' ' + otherCard.title) : otherId}</span>
                ${conn.label ? `<span class="bg-red-950 text-red-200 px-1.5 py-0.5 rounded text-[10px] font-mono-tech">${escapeHtml(conn.label)}</span>` : ''}
              </div>
              <button type="button" data-open-card="${otherId}" class="text-[11px] text-amber-400 hover:underline font-semibold">Ispeziona →</button>
            </div>
          `;
        }).join('');

    const formattedModalTextHtml = renderHighlightedText(card.rawText, cs.highlights);

    const contentEl = document.getElementById('inspect-modal-body');
    contentEl.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Left column: High-Res Evidence Visual & Status -->
        <div class="lg:col-span-5 flex flex-col gap-4">
          <div class="flex flex-col gap-1.5">
            <div class="flex items-center justify-between px-1">
              <span class="text-[11px] font-mono-tech uppercase text-amber-400 font-bold">🎨 Tavola Illustrata (Zoom &amp; Trascina)</span>
              <div class="flex items-center gap-1">
                <button type="button" id="modal-img-zoom-out" class="px-2 py-0.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-600 rounded text-[11px] font-mono-tech font-bold cursor-pointer" title="Riduci zoom disegno">－</button>
                <span id="modal-img-zoom-label" class="text-[10px] font-mono-tech text-amber-300 min-w-[40px] text-center">100%</span>
                <button type="button" id="modal-img-zoom-in" class="px-2 py-0.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-600 rounded text-[11px] font-mono-tech font-bold cursor-pointer" title="Aumenta zoom disegno">＋</button>
                <button type="button" id="modal-img-zoom-reset" class="px-2 py-0.5 bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-600 rounded text-[10px] font-mono-tech cursor-pointer" title="Reset 100%">100%</button>
                <button type="button" id="modal-img-fullscreen" class="px-2 py-0.5 bg-amber-500/20 hover:bg-amber-500/35 text-amber-300 border border-amber-500/50 rounded text-[10px] font-bold cursor-pointer" title="Apri il disegno a tutto schermo con la lente">⛶ Lente</button>
              </div>
            </div>
            <div id="modal-img-viewport" class="aspect-[20/9] w-full rounded-lg overflow-hidden border-2 border-stone-700 shadow-inner bg-[#ede3ce] relative cursor-grab active:cursor-grabbing select-none" style="touch-action: none;" title="Usa la rotellina per zoomare • Trascina per muoverti nel disegno">
              <div id="modal-img-stage" class="w-full h-full origin-center transition-transform duration-75">
                ${window.ProfilerIllustrations.render(card.image, card.category, card.number, { showZoomHint: false })}
              </div>
            </div>
          </div>

          <div class="bg-stone-900/90 border border-stone-700/80 rounded-lg p-3.5 flex flex-col gap-2.5">
            <div class="text-[11px] font-mono-tech uppercase text-stone-400 tracking-wider">Stato &amp; Gruppo sulla Lavagna</div>
            <div class="grid grid-cols-2 gap-2">
              <button type="button" id="modal-btn-collapse" class="py-2 px-2 rounded font-bold text-xs border transition flex items-center justify-center gap-1 cursor-pointer ${cs.collapsed ? 'bg-sky-700 text-white border-sky-400' : 'bg-stone-800 text-stone-200 border-stone-600 hover:bg-stone-700'}">
                ${cs.collapsed ? '▾ Espandi Carta' : '▴ Solo Titolo'}
              </button>
              <button type="button" id="modal-btn-add-timeline" class="py-2 px-2 rounded font-bold text-xs border border-amber-500/50 bg-amber-500/20 hover:bg-amber-500/35 text-amber-300 transition flex items-center justify-center gap-1 cursor-pointer">
                ⏱️ +Timeline
              </button>
              <button type="button" id="modal-btn-important" class="py-2 px-2 rounded font-bold text-xs border transition flex items-center justify-center gap-1 cursor-pointer ${cs.important ? 'bg-amber-500 text-stone-950 border-amber-400' : 'bg-stone-800 text-stone-200 border-stone-600 hover:bg-stone-700'}">
                📌 Importante
              </button>
              <button type="button" id="modal-btn-archive" class="py-2 px-2 rounded font-bold text-xs border transition flex items-center justify-center gap-1 cursor-pointer ${cs.archived ? 'bg-red-900/80 text-red-100 border-red-500' : 'bg-stone-800 text-stone-200 border-stone-600 hover:bg-stone-700'}">
                🗑️ ${cs.archived ? 'Archiviata' : 'Archivia'}
              </button>
            </div>

            <div class="pt-1">
              <label class="block text-[10px] font-mono-tech uppercase text-stone-400 mb-1">📁 Aggiungi / Sposta nel Gruppo:</label>
              <select id="modal-group-select" class="w-full bg-stone-950 border border-stone-700 rounded px-2.5 py-1.5 text-xs text-amber-300 font-semibold focus:outline-none focus:border-amber-500">
                <option value="__unassigned__" ${!currentGroup ? 'selected' : ''}>📥 Nuovi Reperti / Da Smistare</option>
                ${state.groups.map(g => `<option value="${g.id}" ${currentGroup && currentGroup.id === g.id ? 'selected' : ''}>${escapeHtml(g.title)}</option>`).join('')}
                <option value="__new_group__">➕ Crea Nuovo Gruppo con questa carta...</option>
              </select>
            </div>
          </div>

          <div class="bg-stone-900/90 border border-stone-700/80 rounded-lg p-3.5 flex flex-col gap-2">
            <div class="text-[11px] font-mono-tech uppercase text-stone-400 tracking-wider">Fili Rossi Collegati (${linkedStrings.length})</div>
            <div class="flex flex-col gap-1.5 max-h-36 overflow-y-auto evidence-scroll">
              ${linkedHtml}
            </div>
          </div>
        </div>

        <!-- Right column: Full Typewriter Evidence Document & Post-it Note -->
        <div class="lg:col-span-7 flex flex-col gap-4">
          <div class="bg-[#f4f1ea] text-stone-900 rounded-lg p-5 border-2 border-stone-400 shadow-xl">
            <div class="flex flex-wrap items-center justify-between gap-2 border-b-2 border-stone-400 pb-3 mb-3">
              <div class="flex items-center gap-2.5">
                <span class="font-mono-tech font-extrabold text-base bg-stone-900 text-amber-400 px-2.5 py-1 rounded">${escapeHtml(card.number)}</span>
                <div>
                  <h3 class="text-lg font-extrabold text-stone-900 leading-tight">${escapeHtml(card.title)}</h3>
                  <p class="text-xs font-mono-tech text-stone-600">🕒 Rilevamento: ${escapeHtml(card.timestamp)}</p>
                </div>
              </div>
              <span class="${catStyle.badgeBg} text-xs font-mono-tech uppercase px-2.5 py-1 rounded font-bold border">
                ${escapeHtml(card.category)}
              </span>
            </div>

            <div class="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono-tech text-stone-600 mb-1.5">
              <span>💡 <b>Seleziona una frase o un orario</b> per evidenziarlo, copiarlo o inviarlo alla <b>⏱️ Timeline</b></span>
              ${cs.highlights.length > 0 ? `<button type="button" id="modal-btn-clear-hl" class="text-red-700 hover:underline font-bold cursor-pointer">🧽 Rimuovi evidenziazioni (${cs.highlights.length})</button>` : ''}
            </div>

            <div id="modal-raw-text-box" data-evidence-card-id="${card.id}"
              class="selectable-evidence-text font-typewriter text-sm leading-relaxed whitespace-pre-line bg-white/90 p-4 rounded border border-stone-300 text-stone-900 shadow-inner">${formattedModalTextHtml}</div>
          </div>

          <!-- Post-it Note Editor in Modal -->
          <div class="postit-note p-4 rounded-lg text-stone-900">
            <label class="block text-xs font-mono-tech font-extrabold text-amber-950 uppercase tracking-wider mb-1.5">
              📝 Appunto Personale dell'Investigatore (Post-it allegato alla carta ${escapeHtml(card.number)})
            </label>
            <textarea id="modal-note-textarea" rows="3" placeholder="Scrivi o incolla qui le tue deduzioni su questo reperto..."
              class="selectable-evidence-text w-full bg-white/45 border border-amber-500/60 rounded p-2.5 text-sm font-medium text-stone-900 placeholder-amber-900/50 focus:outline-none focus:bg-white/75 resize-none"
            >${escapeHtml(cs.note || '')}</textarea>
          </div>
        </div>
      </div>
    `;

    // Bind interactive zoom & pan on the illustration inside the Inspect Modal
    bindInteractiveImageStage({
      viewportEl: document.getElementById('modal-img-viewport'),
      stageEl: document.getElementById('modal-img-stage'),
      labelEl: document.getElementById('modal-img-zoom-label'),
      btnIn: document.getElementById('modal-img-zoom-in'),
      btnOut: document.getElementById('modal-img-zoom-out'),
      btnReset: document.getElementById('modal-img-zoom-reset'),
      maxScale: 4.5
    });

    document.getElementById('modal-img-fullscreen')?.addEventListener('click', () => {
      openImageZoomModal(cardId);
    });

    // Bind events inside inspect modal
    document.getElementById('modal-btn-collapse').addEventListener('click', () => {
      toggleCardCollapsed(cardId);
      openInspectModal(cardId);
    });
    document.getElementById('modal-btn-add-timeline').addEventListener('click', () => {
      openTimelineModal({
        prefillTime: extractTimeFromSnippet('', card.timestamp),
        prefillLabel: card.title,
        prefillCardId: cardId,
        prefillColor: 'amber'
      });
    });
    document.getElementById('modal-btn-important').addEventListener('click', () => {
      toggleCardImportant(cardId);
      openInspectModal(cardId);
    });
    document.getElementById('modal-btn-archive').addEventListener('click', () => {
      toggleCardArchive(cardId);
      openInspectModal(cardId);
    });
    document.getElementById('modal-group-select').addEventListener('change', e => {
      const val = e.target.value;
      if (!val) return;
      if (val === '__new_group__') {
        createNewGroupWithCards([cardId]);
      } else if (val === '__unassigned__') {
        if (state.cardsState[cardId]) state.cardsState[cardId].groupId = null;
        renderAll();
        saveState();
      } else {
        addCardsToGroup(val, [cardId]);
      }
      openInspectModal(cardId);
    });

    const btnClearHl = document.getElementById('modal-btn-clear-hl');
    if (btnClearHl) {
      btnClearHl.addEventListener('click', () => clearCardHighlights(cardId));
    }

    const modalTextBox = document.getElementById('modal-raw-text-box');
    if (modalTextBox) {
      modalTextBox.querySelectorAll('mark.forensic-hl').forEach(markEl => {
        markEl.addEventListener('click', e => {
          e.stopPropagation();
          const idx = Number(markEl.dataset.hlIdx);
          if (!Number.isNaN(idx)) {
            removeHighlightByIndex(cardId, idx);
          }
        });
      });
    }

    document.getElementById('modal-note-textarea').addEventListener('input', e => {
      if (state.cardsState[cardId]) {
        state.cardsState[cardId].note = e.target.value;
        renderCards();
        saveState();
      }
    });
    contentEl.querySelectorAll('[data-open-card]').forEach(btn => {
      btn.addEventListener('click', () => {
        openInspectModal(btn.dataset.openCard);
      });
    });

    const btnInspectDraw = document.getElementById('btn-inspect-draw-next');
    if (btnInspectDraw) {
      const nextUndrawn = state.scenario.cards[state.drawnCount];
      if (nextUndrawn) {
        btnInspectDraw.textContent = `🃏 Pesca Prossima (${nextUndrawn.number})`;
        btnInspectDraw.classList.remove('hidden');
      } else {
        btnInspectDraw.classList.add('hidden');
      }
    }

    dom.inspectModal.classList.remove('hidden');
  }

  function navigateInspectModal(dir) {
    if (!state.scenario || !state.inspectedCardId) return;
    const drawnCards = state.scenario.cards.slice(0, state.drawnCount);
    const idx = drawnCards.findIndex(c => c.id === state.inspectedCardId);
    if (idx === -1) return;
    const nextIdx = (idx + dir + drawnCards.length) % drawnCards.length;
    openInspectModal(drawnCards[nextIdx].id);
  }

  /**
   * Attaches interactive Zoom (100% -> 500%), Mouse Wheel Zoom, Drag-to-Pan,
   * and Touch Pinch/Drag to any illustration viewport + stage container.
   */
  function bindInteractiveImageStage({ viewportEl, stageEl, labelEl, btnIn, btnOut, btnReset, maxScale = 5 }) {
    if (!viewportEl || !stageEl) return null;
    let scale = 1;
    let panX = 0;
    let panY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let pinchStartDist = 0;
    let pinchStartScale = 1;

    function updateTransform() {
      if (scale <= 1.01) {
        scale = 1;
        panX = 0;
        panY = 0;
      }
      stageEl.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
      if (labelEl) {
        labelEl.textContent = `${Math.round(scale * 100)}%`;
      }
    }

    function setZoom(newScale) {
      scale = Math.min(maxScale, Math.max(1, newScale));
      updateTransform();
    }

    btnIn?.addEventListener('click', e => {
      e.stopPropagation();
      setZoom(scale + 0.4);
    });
    btnOut?.addEventListener('click', e => {
      e.stopPropagation();
      setZoom(scale - 0.4);
    });
    btnReset?.addEventListener('click', e => {
      e.stopPropagation();
      scale = 1;
      panX = 0;
      panY = 0;
      updateTransform();
    });

    viewportEl.onwheel = e => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.25 : -0.25;
      setZoom(scale + delta);
    };

    viewportEl.onmousedown = e => {
      if (e.button !== 0) return;
      isDragging = true;
      startX = e.clientX - panX;
      startY = e.clientY - panY;
    };

    viewportEl.ondblclick = e => {
      e.stopPropagation();
      if (scale > 1.1) {
        scale = 1;
        panX = 0;
        panY = 0;
      } else {
        scale = 2.2;
      }
      updateTransform();
    };

    window.addEventListener('mousemove', e => {
      if (!isDragging) return;
      panX = e.clientX - startX;
      panY = e.clientY - startY;
      updateTransform();
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    viewportEl.ontouchstart = e => {
      if (e.touches.length === 2) {
        e.preventDefault();
        pinchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        pinchStartScale = scale;
      } else if (e.touches.length === 1) {
        isDragging = true;
        startX = e.touches[0].clientX - panX;
        startY = e.touches[0].clientY - panY;
      }
    };

    viewportEl.ontouchmove = e => {
      if (e.touches.length === 2 && pinchStartDist > 0) {
        e.preventDefault();
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        setZoom(pinchStartScale * (dist / pinchStartDist));
      } else if (e.touches.length === 1 && isDragging && scale > 1) {
        e.preventDefault();
        panX = e.touches[0].clientX - startX;
        panY = e.touches[0].clientY - startY;
        updateTransform();
      }
    };

    viewportEl.ontouchend = () => {
      isDragging = false;
      pinchStartDist = 0;
    };

    updateTransform();
    return { setZoom, reset: () => { scale = 1; panX = 0; panY = 0; updateTransform(); } };
  }

  function openImageZoomModal(cardId) {
    if (!state.scenario) return;
    const card = state.scenario.cards.find(c => c.id === cardId);
    if (!card) return;

    const modalEl = document.getElementById('image-zoom-modal');
    const titleEl = document.getElementById('img-zoom-title');
    const viewportEl = document.getElementById('img-zoom-viewport');
    const stageEl = document.getElementById('img-zoom-stage');
    const labelEl = document.getElementById('img-zoom-level');
    const btnOpenCard = document.getElementById('btn-img-zoom-open-card');

    if (!modalEl || !viewportEl || !stageEl) return;

    if (titleEl) {
      titleEl.textContent = `Tavola ${card.number} — ${card.title} (${card.category})`;
    }

    stageEl.innerHTML = `
      <div class="w-full max-w-5xl aspect-[20/9] shadow-2xl rounded overflow-hidden border-2 border-stone-600">
        ${window.ProfilerIllustrations.render(card.image, card.category, card.number, { showZoomHint: false })}
      </div>
    `;

    // Replace buttons to avoid duplicate listeners across opens
    const btnInOld = document.getElementById('btn-img-zoom-in');
    const btnOutOld = document.getElementById('btn-img-zoom-out');
    const btnResetOld = document.getElementById('btn-img-zoom-reset');
    const btnIn = btnInOld.cloneNode(true);
    const btnOut = btnOutOld.cloneNode(true);
    const btnReset = btnResetOld.cloneNode(true);
    btnInOld.replaceWith(btnIn);
    btnOutOld.replaceWith(btnOut);
    btnResetOld.replaceWith(btnReset);

    if (btnOpenCard) {
      btnOpenCard.onclick = () => {
        modalEl.classList.add('hidden');
        openInspectModal(cardId);
      };
    }

    bindInteractiveImageStage({
      viewportEl,
      stageEl,
      labelEl,
      btnIn,
      btnOut,
      btnReset,
      maxScale: 5
    });

    modalEl.classList.remove('hidden');
  }

  function openDossierModal() {
    if (!state.scenario) return;
    const meta = state.scenario.metadata;
    const v = meta.victim || {};
    const suspects = meta.suspects || [];

    const body = document.getElementById('dossier-modal-body');
    body.innerHTML = `
      <div class="flex flex-col gap-5 selectable-evidence-text">
        <div class="bg-stone-900/90 border border-stone-700 rounded-lg p-4">
          <div class="flex flex-wrap justify-between items-start gap-2 mb-2">
            <div>
              <span class="text-xs font-mono-tech text-amber-400 uppercase font-bold">${escapeHtml(meta.caseNumber || 'DOSSIER INVESTIGATIVO')}</span>
              <h3 class="text-xl font-extrabold text-white">${escapeHtml(meta.title)}</h3>
            </div>
            <div class="text-right text-xs font-mono-tech text-stone-400">
              <div>📅 ${escapeHtml(meta.date || '')}</div>
              <div>📍 ${escapeHtml(meta.location || '')}</div>
            </div>
          </div>
          <p class="text-sm text-stone-300 leading-relaxed border-t border-stone-800 pt-3 mt-2">
            ${escapeHtml(meta.description)}
          </p>
        </div>

        <!-- Victim Card -->
        <div class="bg-red-950/25 border border-red-800/60 rounded-lg p-4">
          <div class="text-xs font-mono-tech font-bold uppercase tracking-wider text-red-400 mb-1">⚰️ Scheda Vittima</div>
          <div class="flex flex-wrap items-baseline justify-between gap-2">
            <h4 class="text-base font-extrabold text-stone-100">${escapeHtml(v.name || 'Sconosciuto')} (${v.age || '?'} anni) — <span class="text-stone-300 font-semibold">${escapeHtml(v.role || '')}</span></h4>
            ${v.bloodType ? `<span class="text-xs font-mono-tech bg-red-900/80 text-red-100 px-2 py-0.5 rounded font-bold">Gruppo Sanguigno: ${escapeHtml(v.bloodType)}</span>` : ''}
          </div>
          <p class="text-xs text-stone-300 mt-2 font-mono-tech">${escapeHtml(v.notes || '')}</p>
        </div>

        <!-- Suspects Grid -->
        <div>
          <div class="text-xs font-mono-tech font-bold uppercase tracking-wider text-amber-400 mb-2.5">
            👥 Persone Informate sui Fatti / Sospettati (${suspects.length})
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            ${suspects.map((s, idx) => `
              <div class="bg-stone-900/90 border border-stone-700/90 rounded-lg p-3.5 flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between gap-2 mb-1">
                    <span class="font-bold text-sm text-stone-100">${idx + 1}. ${escapeHtml(s.name)} (${s.age}a)</span>
                    <span class="text-[10px] font-mono-tech bg-stone-800 text-amber-300 px-2 py-0.5 rounded border border-stone-700">${escapeHtml(s.role)}</span>
                  </div>
                  <div class="text-[11px] font-mono-tech text-sky-300 mb-1.5">${escapeHtml(s.traits || '')}</div>
                  <p class="text-xs text-stone-400 leading-relaxed">${escapeHtml(s.notes || '')}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Prosecutor Questions Overview (Open-Ended, Zero Spoilers) -->
        <div class="bg-amber-950/20 border border-amber-600/50 rounded-lg p-4">
          <div class="text-xs font-mono-tech font-bold uppercase tracking-wider text-amber-400 mb-2">
            ❓ Quesiti Ufficiali della Procura (Risposta Aperta a Fine Indagine)
          </div>
          <div class="flex flex-col gap-1.5 text-xs text-stone-200 font-medium">
            ${(state.scenario.solution || []).map(q => `
              <div class="py-1 border-b border-stone-800/80 last:border-b-0">${escapeHtml(q.question)}</div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    dom.dossierModal.classList.remove('hidden');
  }

  function openSolveModal() {
    if (!state.scenario) return;
    renderSolveModalContent();
    dom.solveModal.classList.remove('hidden');
  }

  /**
   * Evaluates an open-text investigator answer against the question's acceptedKeywords
   * or falls back to matching significant keywords from officialAnswer / correct option.
   */
  function evaluateOpenAnswer(q, rawText) {
    const overrideKey = '__override_' + q.id;
    if (state.verdictAnswers && typeof state.verdictAnswers[overrideKey] === 'boolean') {
      return state.verdictAnswers[overrideKey];
    }

    const text = String(rawText || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (text.trim().length < 3) return false;

    if (Array.isArray(q.acceptedKeywords) && q.acceptedKeywords.length > 0) {
      return q.acceptedKeywords.every(group =>
        group.some(kw => {
          const cleanKw = String(kw).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          return text.includes(cleanKw);
        })
      );
    }

    const reference = String(q.officialAnswer || (Array.isArray(q.options) ? q.options[q.correctOptionIndex] : '') || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const stopWords = new Set(['della', 'dello', 'delle', 'degli', 'nella', 'nello', 'nelle', 'prima', 'dopo', 'stato', 'stata', 'aveva', 'hanno', 'perche', 'come', 'quando', 'contro', 'verso', 'senza', 'anche', 'solo', 'tutto']);
    const tokens = reference
      .split(/[^a-z0-9:]+/)
      .filter(t => t.length >= 4 && !stopWords.has(t));

    if (tokens.length === 0) return text.trim().length >= 5;
    const matched = tokens.filter(t => text.includes(t));
    return matched.length >= Math.min(2, Math.ceil(tokens.length * 0.35));
  }

  function renderSolveModalContent() {
    const questions = state.scenario.solution || [];
    const totalCards = state.scenario.cards.length;
    const container = document.getElementById('solve-modal-body');

    let scoreHtml = '';
    if (state.verdictSubmitted) {
      let correctCount = 0;
      questions.forEach(q => {
        if (evaluateOpenAnswer(q, state.verdictAnswers[q.id])) {
          correctCount += 1;
        }
      });
      const pct = Math.round((correctCount / questions.length) * 100);
      let rankTitle = 'Agente in Prova';
      let rankColor = 'text-stone-300 border-stone-600 bg-stone-900';
      if (pct === 100) {
        rankTitle = '🏆 ISPETTORE CAPO — PROFILER D\'ÉLITE';
        rankColor = 'text-amber-300 border-amber-500 bg-amber-950/40';
      } else if (pct >= 75) {
        rankTitle = '🎖️ DETECTIVE SENIOR';
        rankColor = 'text-emerald-300 border-emerald-500 bg-emerald-950/40';
      } else if (pct >= 50) {
        rankTitle = '🔎 INVESTIGATORE OPERATIVO';
        rankColor = 'text-sky-300 border-sky-500 bg-sky-950/40';
      }

      scoreHtml = `
        <div class="p-4 rounded-lg border-2 ${rankColor} mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div class="text-xs font-mono-tech uppercase tracking-widest opacity-80">ESITO UFFICIALE DELLA PROCURA</div>
            <div class="text-xl font-extrabold mt-0.5">${rankTitle}</div>
            <div class="text-xs mt-1 text-stone-300">
              Carte pescate: <b>${state.drawnCount}/${totalCards}</b> • Fili rossi: <b>${state.connections.length}</b> • Eventi Timeline: <b>${state.timelineEvents.length}</b>
            </div>
          </div>
          <div class="text-right">
            <div class="text-3xl font-mono-tech font-extrabold">${correctCount} / ${questions.length}</div>
            <div class="text-xs font-mono-tech">Accuratezza Deduttiva: ${pct}%</div>
          </div>
        </div>
      `;
    } else {
      scoreHtml = `
        <div class="p-3.5 rounded-lg bg-stone-900 border border-amber-500/50 text-stone-200 text-xs mb-4 flex flex-col gap-1">
          <div class="font-mono-tech font-bold text-amber-400 uppercase">⚖️ Deposito del Verdetto a Risposta Aperta (Senza Suggerimenti)</div>
          <p class="text-stone-300 leading-relaxed">
            Per non influenzare o semplificare l'indagine non sono presenti opzioni a scelta multipla. Scrivi liberamente le tue conclusioni per ciascun quesito (hai pescato <b>${state.drawnCount} carte su ${totalCards}</b>) e poi confrontale con gli atti ufficiali della Procura.
          </p>
        </div>
      `;
    }

    const questionsHtml = questions.map(q => {
      const userAnswer = typeof state.verdictAnswers[q.id] === 'string' ? state.verdictAnswers[q.id] : '';
      const isCorrect = state.verdictSubmitted ? evaluateOpenAnswer(q, userAnswer) : false;
      const officialShort = q.officialAnswer || (Array.isArray(q.options) ? q.options[q.correctOptionIndex] : '');

      return `
        <div class="bg-stone-900/90 border ${state.verdictSubmitted ? (isCorrect ? 'border-emerald-600' : 'border-amber-600') : 'border-stone-700'} rounded-lg p-4 mb-4">
          <div class="flex flex-wrap items-start justify-between gap-2 mb-2.5">
            <h4 class="font-bold text-sm text-stone-100">${escapeHtml(q.question)}</h4>
            ${state.verdictSubmitted ? `
              <button type="button" data-toggle-score="${q.id}"
                class="px-2.5 py-1 rounded text-[11px] font-mono-tech font-bold border transition cursor-pointer shrink-0 ${isCorrect ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 hover:bg-emerald-900' : 'bg-stone-800 border-stone-600 text-stone-300 hover:bg-stone-700'}"
                title="Clicca se la tua risposta aperta esprimeva il concetto corretto con parole diverse">
                ${isCorrect ? '✔ Deduzione Esatta (Cambia)' : '✘ Segna come Indovinata'}
              </button>
            ` : ''}
          </div>

          <textarea
            rows="2"
            data-question-input="${q.id}"
            ${state.verdictSubmitted ? 'readonly' : ''}
            placeholder="Scrivi qui la tua risposta deduttiva (es. nome, arma, orario, movente)..."
            class="selectable-evidence-text w-full bg-stone-950 border ${state.verdictSubmitted ? (isCorrect ? 'border-emerald-500/70 text-emerald-100' : 'border-amber-500/70 text-amber-100') : 'border-stone-700 text-stone-100 focus:border-amber-500'} rounded-md p-2.5 text-xs font-medium focus:outline-none resize-y"
          >${escapeHtml(userAnswer)}</textarea>

          ${state.verdictSubmitted ? `
            <div class="mt-3 pt-3 border-t border-stone-700/80 text-xs leading-relaxed">
              <div class="bg-stone-950/90 border-l-4 border-amber-500 px-3 py-2 rounded-r mb-2">
                <span class="font-mono-tech font-bold uppercase text-amber-400 text-[11px]">🏛️ Risposta Ufficiale della Procura:</span>
                <div class="text-stone-100 font-bold mt-0.5">${escapeHtml(officialShort)}</div>
              </div>
              <div class="text-stone-300">
                <span class="font-mono-tech font-bold uppercase text-sky-400 text-[11px]">🔎 Spiegazione &amp; Prove Oggettive:</span>
                <p class="mt-0.5">${escapeHtml(q.explanation)}</p>
              </div>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    container.innerHTML = `
      ${scoreHtml}
      ${questionsHtml}
      <div class="bg-stone-900/90 border border-stone-700 rounded-lg p-4 mb-4">
        <label class="block text-xs font-mono-tech uppercase text-stone-400 mb-1.5">
          📝 Appunti Generali sul Caso (Opzionale)
        </label>
        <textarea id="verdict-notes-input" rows="2" ${state.verdictSubmitted ? 'readonly' : ''}
          placeholder="Annota qui eventuali osservazioni aggiuntive..."
          class="selectable-evidence-text w-full bg-stone-950 border border-stone-700 rounded p-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
        >${escapeHtml(state.verdictNotes || '')}</textarea>
      </div>
      <div class="flex items-center justify-end gap-3 pt-2">
        ${state.verdictSubmitted ? `
          <button type="button" id="btn-reopen-verdict" class="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-600 rounded-md text-xs font-bold transition cursor-pointer">
            🔄 Modifica Risposte
          </button>
        ` : `
          <button type="button" id="btn-submit-verdict" class="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-md text-xs font-extrabold shadow-lg transition cursor-pointer">
            ⚖️ CONSEGNA VERDETTO FINALE E RIVELA SOLUZIONE
          </button>
        `}
      </div>
    `;

    container.querySelectorAll('textarea[data-question-input]').forEach(area => {
      area.addEventListener('input', e => {
        state.verdictAnswers[e.target.dataset.questionInput] = e.target.value;
        saveState();
      });
    });

    container.querySelectorAll('button[data-toggle-score]').forEach(btn => {
      btn.addEventListener('click', () => {
        const qId = btn.dataset.toggleScore;
        const qObj = questions.find(item => item.id === qId);
        if (!qObj) return;
        const current = evaluateOpenAnswer(qObj, state.verdictAnswers[qId]);
        state.verdictAnswers['__override_' + qId] = !current;
        saveState();
        renderSolveModalContent();
      });
    });

    const notesEl = document.getElementById('verdict-notes-input');
    if (notesEl) {
      notesEl.addEventListener('input', e => {
        state.verdictNotes = e.target.value;
        saveState();
      });
    }

    const btnSubmit = document.getElementById('btn-submit-verdict');
    if (btnSubmit) {
      btnSubmit.addEventListener('click', () => {
        const unanswered = questions.filter(q => {
          const val = state.verdictAnswers[q.id];
          return typeof val !== 'string' || val.trim().length === 0;
        });
        if (unanswered.length > 0) {
          showToast(`Compila una risposta per tutte le ${questions.length} domande prima di consegnare il verdetto!`, 'amber');
          return;
        }
        state.verdictSubmitted = true;
        saveState();
        renderSolveModalContent();
      });
    }

    const btnReopen = document.getElementById('btn-reopen-verdict');
    if (btnReopen) {
      btnReopen.addEventListener('click', () => {
        state.verdictSubmitted = false;
        saveState();
        renderSolveModalContent();
      });
    }
  }

  // =========================================================================
  // GLOBAL EVENTS (PAN, ZOOM, MARQUEE, TEXT SELECTION & TOPBAR BUTTONS)
  // =========================================================================

  function bindGlobalEvents() {
    // Close Card Group Popover on outside click
    document.getElementById('btn-close-group-popover')?.addEventListener('click', closeCardGroupPopover);

    // 1. Text Selection Listener for Highlighting / Copy / Send to Post-it / Send to Timeline
    document.addEventListener('mouseup', e => {
      if (dom.textSelectionToolbar && dom.textSelectionToolbar.contains(e.target)) {
        return;
      }

      setTimeout(() => {
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed) {
          hideTextSelectionToolbar();
          return;
        }

        const text = sel.toString().trim();
        if (!text || text.length < 2) {
          hideTextSelectionToolbar();
          return;
        }

        const anchorNode = sel.anchorNode;
        const parentEl = anchorNode?.nodeType === 3 ? anchorNode.parentElement : anchorNode;
        const evidenceBox = parentEl ? parentEl.closest('[data-evidence-card-id]') : null;

        if (!evidenceBox) {
          hideTextSelectionToolbar();
          return;
        }

        const cardId = evidenceBox.dataset.evidenceCardId;
        const range = sel.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        state.activeSelection = { cardId, text };
        const left = Math.min(window.innerWidth - 220, Math.max(220, rect.left + rect.width / 2));
        const top = Math.max(58, rect.top);

        dom.textSelectionToolbar.style.left = `${left}px`;
        dom.textSelectionToolbar.style.top = `${top}px`;
        dom.textSelectionToolbar.classList.remove('hidden');
      }, 15);
    });

    if (dom.textSelectionToolbar) {
      dom.textSelectionToolbar.addEventListener('mousedown', e => {
        e.preventDefault();
        e.stopPropagation();
      });

      dom.textSelectionToolbar.querySelectorAll('[data-hl-color]').forEach(btn => {
        btn.addEventListener('click', e => {
          e.stopPropagation();
          if (state.activeSelection) {
            addHighlightToCard(state.activeSelection.cardId, state.activeSelection.text, btn.dataset.hlColor);
          }
        });
      });

      document.getElementById('btn-sel-copy').addEventListener('click', async e => {
        e.stopPropagation();
        if (!state.activeSelection) return;
        const textToCopy = state.activeSelection.text;
        try {
          await navigator.clipboard.writeText(textToCopy);
          showToast(`Copiato negli appunti: "${textToCopy.slice(0, 42)}${textToCopy.length > 42 ? '…' : ''}"`, 'amber');
        } catch (_) {
          document.execCommand('copy');
          showToast('Testo copiato negli appunti!', 'amber');
        }
        hideTextSelectionToolbar();
      });

      document.getElementById('btn-sel-to-note').addEventListener('click', e => {
        e.stopPropagation();
        if (!state.activeSelection) return;
        const { cardId, text } = state.activeSelection;
        const cs = state.cardsState[cardId];
        if (cs) {
          const snippet = `«${text}»`;
          cs.note = cs.note ? `${cs.note}\n${snippet}` : snippet;
          window.getSelection()?.removeAllRanges();
          hideTextSelectionToolbar();
          renderCards();
          if (state.inspectedCardId === cardId && !dom.inspectModal.classList.contains('hidden')) {
            const modalNote = document.getElementById('modal-note-textarea');
            if (modalNote) modalNote.value = cs.note;
          }
          saveState();
          showToast('Frammento aggiunto al Post-it della carta!', 'amber');
        }
      });

      document.getElementById('btn-sel-to-timeline').addEventListener('click', e => {
        e.stopPropagation();
        if (!state.activeSelection) return;
        const { cardId, text } = state.activeSelection;
        const card = state.scenario?.cards.find(c => c.id === cardId);
        const extractedTime = extractTimeFromSnippet(text, card ? card.timestamp : '');
        const cleanLabel = text.replace(/\s+/g, ' ').slice(0, 85);

        window.getSelection()?.removeAllRanges();
        hideTextSelectionToolbar();

        openTimelineModal({
          prefillTime: extractedTime,
          prefillLabel: cleanLabel,
          prefillCardId: cardId,
          prefillColor: 'amber'
        });
      });

      document.getElementById('btn-sel-clear-hl').addEventListener('click', e => {
        e.stopPropagation();
        if (state.activeSelection) {
          clearCardHighlights(state.activeSelection.cardId);
        }
      });
    }

    // 2. Timeline Bar & Modal Controls
    document.getElementById('btn-toggle-timeline-bar').addEventListener('click', () => {
      state.timelineCollapsed = !state.timelineCollapsed;
      renderTimeline();
      saveState();
    });

    document.getElementById('btn-add-timeline-event').addEventListener('click', () => {
      const selectedCardId = state.selectedCards.size === 1 ? Array.from(state.selectedCards)[0] : '';
      const card = (selectedCardId && state.scenario) ? state.scenario.cards.find(c => c.id === selectedCardId) : null;
      openTimelineModal({
        prefillTime: card ? extractTimeFromSnippet('', card.timestamp) : '',
        prefillLabel: card ? card.title : '',
        prefillCardId: selectedCardId,
        prefillColor: 'amber'
      });
    });

    dom.tlColorPicker.querySelectorAll('[data-tl-color]').forEach(btn => {
      btn.addEventListener('click', () => setTimelineColorSelection(btn.dataset.tlColor));
    });

    dom.tlCardSelect.addEventListener('change', e => {
      updateTimelineModalLinkedCardBar(e.target.value);
    });

    document.getElementById('btn-tl-focus-card').addEventListener('click', () => {
      const cid = dom.tlCardSelect.value;
      if (cid) {
        closeTimelineModal();
        dom.inspectModal.classList.add('hidden');
        focusCardOnBoard(cid);
      }
    });

    document.getElementById('btn-tl-inspect-card').addEventListener('click', () => {
      const cid = dom.tlCardSelect.value;
      if (cid) {
        closeTimelineModal();
        openInspectModal(cid);
      }
    });

    document.getElementById('btn-save-timeline').addEventListener('click', saveTimelineModal);
    document.getElementById('btn-delete-timeline').addEventListener('click', deleteActiveTimelineEvent);
    document.getElementById('btn-cancel-timeline').addEventListener('click', closeTimelineModal);
    dom.tlLabelInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') saveTimelineModal();
    });
    dom.tlTimeInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') saveTimelineModal();
    });

    // 3. Click on empty board background clears selection / link mode
    dom.viewport.addEventListener('click', e => {
      if (e.target.closest('.crime-card, .group-zone-header, button, input, textarea, select')) {
        return;
      }

      hideTextSelectionToolbar();
      closeCardGroupPopover();

      if (state.linkStartCardId) {
        state.linkStartCardId = null;
        updateLinkBanner();
        renderCards();
        return;
      }

      if (!e.shiftKey && state.selectedCards.size > 0) {
        state.selectedCards.clear();
        document.querySelectorAll('.crime-card.is-selected').forEach(el => el.classList.remove('is-selected'));
        updateMultiSelectToolbar();
        renderTimeline();
      }
    });

    window.addEventListener('resize', () => {
      applySurfaceTheme();
    });

    // 4. Keyboard Shortcuts (ESC, D to draw)
    window.addEventListener('keydown', e => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
        if (e.key === 'Escape') e.target.blur();
        return;
      }

      if (e.key === 'Escape') {
        state.linkStartCardId = null;
        state.toolMode = 'pan';
        hideTextSelectionToolbar();
        closeCardGroupPopover();
        updateToolButtons();
        updateLinkBanner();
        dom.inspectModal.classList.add('hidden');
        dom.dossierModal.classList.add('hidden');
        dom.solveModal.classList.add('hidden');
        document.getElementById('image-zoom-modal')?.classList.add('hidden');
        closeStringModal();
        closeTimelineModal();
        renderCards();
        renderStrings();
      } else if (e.key.toLowerCase() === 'd' && !e.metaKey && !e.ctrlKey) {
        drawNextCard();
      }
    });

    // 5. Top Bar Controls
    document.getElementById('btn-add-group').addEventListener('click', () => {
      const themeKey = THEME_KEYS[state.groups.length % THEME_KEYS.length];
      const newGroup = {
        id: 'grp-' + Date.now(),
        title: '📁 NUOVA AREA DI RAGGRUPPAMENTO',
        theme: themeKey
      };
      state.groups.push(newGroup);
      renderGroups();
      renderCards();
      saveState();
      const gEl = document.getElementById(`group-${newGroup.id}`);
      if (gEl) {
        gEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        gEl.classList.add('group-expanded-flash');
        setTimeout(() => gEl.classList.remove('group-expanded-flash'), 800);
      }
      showToast('Nuova Area di Raggruppamento aggiunta alla griglia', 'amber');
    });

    dom.btnToolLink.addEventListener('click', () => {
      state.toolMode = state.toolMode === 'link' ? 'pan' : 'link';
      state.linkStartCardId = null;
      updateToolButtons();
      updateLinkBanner();
      renderCards();
      renderStrings();
    });

    dom.btnDrawTop.addEventListener('click', () => drawNextCard());
    dom.btnDrawDeck.addEventListener('click', () => drawNextCard());

    document.getElementById('btn-open-dossier').addEventListener('click', openDossierModal);
    document.getElementById('btn-open-solve').addEventListener('click', openSolveModal);

    dom.scenarioSelect.addEventListener('change', e => {
      loadScenarioById(e.target.value, false);
    });

    const fileInput = document.getElementById('json-file-input');
    document.getElementById('btn-upload-json').addEventListener('click', () => {
      fileInput.value = '';
      fileInput.click();
    });

    fileInput.addEventListener('change', e => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        try {
          const parsed = JSON.parse(ev.target.result);
          const check = window.ProfilerScenarios.validateScenario(parsed);
          if (!check.valid) {
            showToast(`Errore JSON: ${check.error}`, 'red');
            return;
          }
          if (!parsed.metadata.id) {
            parsed.metadata.id = 'custom-' + Date.now();
          }
          localStorage.setItem(STORAGE_PREFIX + 'custom_scenario_json', JSON.stringify(parsed));

          let opt = dom.scenarioSelect.querySelector('option[value="custom-uploaded"]');
          if (!opt) {
            opt = document.createElement('option');
            opt.value = 'custom-uploaded';
            dom.scenarioSelect.appendChild(opt);
          }
          opt.textContent = `📂 Custom: ${parsed.metadata.title}`;
          dom.scenarioSelect.value = 'custom-uploaded';

          state.scenarioId = 'custom-uploaded';
          applyScenario(parsed, true);
          showToast(`Scenario "${parsed.metadata.title}" caricato con successo!`, 'amber');
        } catch (err) {
          showToast('File JSON non valido o corrotto.', 'red');
        }
      };
      reader.readAsText(file);
    });

    document.getElementById('btn-reset-board').addEventListener('click', () => {
      if (confirm('Vuoi azzerare la lavagna di questo caso e ricominciare dalla Carta #01?')) {
        applyScenario(state.scenario, true);
        showToast('Lavagna azzerata. Caso riavviato dalla Carta #01.', 'stone');
      }
    });

    dom.btnSurfaceToggle.addEventListener('click', () => {
      state.boardSurface = state.boardSurface === 'anthracite' ? 'cork' : 'anthracite';
      applySurfaceTheme();
      saveState();
    });

    // Selection bar controls (works for 1 or more selected cards)
    dom.multiGroupSelect.addEventListener('change', e => {
      const val = e.target.value;
      if (!val) return;
      const selectedIds = Array.from(state.selectedCards);
      e.target.value = '';
      if (val === '__new_group__') {
        createNewGroupWithCards(selectedIds);
      } else if (val === '__unassigned__') {
        selectedIds.forEach(cid => {
          if (state.cardsState[cid]) state.cardsState[cid].groupId = null;
        });
        renderAll();
        saveState();
        showToast('Carte riportate in "Nuovi Reperti / Da Smistare"', 'stone');
      } else {
        addCardsToGroup(val, selectedIds);
      }
    });

    const btnMultiCollapse = document.getElementById('btn-multi-collapse');
    if (btnMultiCollapse) {
      btnMultiCollapse.addEventListener('click', () => {
        const ids = Array.from(state.selectedCards);
        const shouldCollapse = ids.some(id => !state.cardsState[id]?.collapsed);
        ids.forEach(id => {
          if (state.cardsState[id]) {
            state.cardsState[id].collapsed = shouldCollapse;
            if (shouldCollapse) state.cardsState[id].archived = false;
          }
        });
        renderAll();
        saveState();
      });
    }

    document.getElementById('btn-multi-important').addEventListener('click', () => {
      state.selectedCards.forEach(id => {
        if (state.cardsState[id]) {
          state.cardsState[id].important = !state.cardsState[id].important;
          if (state.cardsState[id].important) state.cardsState[id].archived = false;
        }
      });
      renderCards();
      saveState();
    });

    document.getElementById('btn-multi-archive').addEventListener('click', () => {
      state.selectedCards.forEach(id => {
        if (state.cardsState[id]) {
          state.cardsState[id].archived = !state.cardsState[id].archived;
        }
      });
      renderCards();
      renderStrings();
      saveState();
    });

    document.getElementById('btn-multi-clear').addEventListener('click', () => {
      state.selectedCards.clear();
      document.querySelectorAll('.crime-card.is-selected').forEach(el => el.classList.remove('is-selected'));
      updateMultiSelectToolbar();
      renderTimeline();
    });

    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.closeModal;
        document.getElementById(targetId).classList.add('hidden');
        hideTextSelectionToolbar();
      });
    });

    document.getElementById('btn-inspect-prev').addEventListener('click', () => navigateInspectModal(-1));
    document.getElementById('btn-inspect-next').addEventListener('click', () => navigateInspectModal(1));
    document.getElementById('btn-inspect-draw-next')?.addEventListener('click', () => drawNextCard(false));

    document.getElementById('btn-save-string').addEventListener('click', saveStringModal);
    document.getElementById('btn-delete-string').addEventListener('click', deleteActiveString);
    document.getElementById('btn-cancel-string').addEventListener('click', closeStringModal);
    dom.stringLabelInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') saveStringModal();
    });
    document.querySelectorAll('[data-string-preset]').forEach(chip => {
      chip.addEventListener('click', () => {
        dom.stringLabelInput.value = chip.dataset.stringPreset;
        dom.stringLabelInput.focus();
      });
    });

    document.getElementById('btn-cancel-link-mode').addEventListener('click', () => {
      state.linkStartCardId = null;
      state.toolMode = 'pan';
      updateToolButtons();
      updateLinkBanner();
      renderCards();
      renderStrings();
    });
  }

  function updateToolButtons() {
    if (!dom.btnToolSelect) return;
    if (state.toolMode === 'select') {
      dom.btnToolSelect.className = 'px-3 py-1.5 bg-sky-600 text-white border border-sky-400 rounded-md text-xs font-bold shadow transition flex items-center gap-1.5';
    } else {
      dom.btnToolSelect.className = 'px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-md text-xs font-medium transition flex items-center gap-1.5';
    }
  }

  // =========================================================================
  // UTILITIES
  // =========================================================================

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function showToast(message, tone = 'amber') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toneStyles = {
      amber: 'bg-stone-900/95 border-amber-500 text-amber-200',
      red: 'bg-red-950/95 border-red-500 text-red-100',
      stone: 'bg-stone-900/95 border-stone-600 text-stone-200'
    };
    const toast = document.createElement('div');
    toast.className = `px-3.5 py-2 rounded-md border-l-4 shadow-xl text-xs font-medium transition-all duration-300 ${toneStyles[tone] || toneStyles.amber}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(6px)';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  window.addEventListener('DOMContentLoaded', init);
})();
