/* AeroRisk AI — prototipo academico sin servidor.
   El modelo real fue entrenado con scikit-learn y se carga desde assets/model.js.
   Esta funcion reproduce StandardScaler + LogisticRegression.predict_proba(). */
(() => {
  'use strict';

  const model = window.AERORISK_MODEL;
  if (!model || !Array.isArray(model.coef) || model.coef.length !== 4) {
    document.body.insertAdjacentHTML('afterbegin', '<p style="background:#fff0ea;color:#912c2c;padding:20px">No se pudo cargar el modelo entrenado. Verifica que exista el archivo assets/model.js.</p>');
    return;
  }

  const $ = (id) => document.getElementById(id);
  const scenarios = {
    A: { name: 'Vuelo A', description: 'Aeronave reciente y condiciones favorables', age: 3, climate: 0, hours: 2500, maintenance: 1 },
    B: { name: 'Vuelo B', description: 'Aeronave antigua, clima adverso y revisión pendiente', age: 18, climate: 1, hours: 20000, maintenance: 0 },
    C: { name: 'Vuelo C', description: 'Clima adverso con mantenimiento al día', age: 12, climate: 1, hours: 12000, maintenance: 1 },
  };
  const limits = { age: [0, 35], hours: [0, 40000] };
  let state = { ...scenarios.A };
  let selectedScenario = 'A';

  const nfmt = (n, maxDigits = 2) => new Intl.NumberFormat('es-PE', {
    minimumFractionDigits: maxDigits, maximumFractionDigits: maxDigits,
  }).format(n);
  const intfmt = (n) => new Intl.NumberFormat('es-PE', { maximumFractionDigits: 0 }).format(n);
  const percentage = (p) => `${nfmt(p * 100)}%`;
  const icon = (id) => `<svg class="icon" aria-hidden="true"><use href="#${id}"></use></svg>`;

  function predict(x) {
    // Orden: antiguedad_avion, clima, horas_vuelo, mantenimiento.
    const values = [x.age, x.climate, x.hours, x.maintenance];
    let logit = model.intercept;
    const impacts = [];
    for (let i = 0; i < values.length; i += 1) {
      const contribution = model.coef[i] * ((values[i] - model.mean[i]) / model.scale[i]);
      impacts.push(contribution);
      logit += contribution;
    }
    // Sigmoide numericamente estable.
    const probability = logit >= 0
      ? 1 / (1 + Math.exp(-logit))
      : Math.exp(logit) / (1 + Math.exp(logit));
    return { probability, impacts, logit };
  }

  function getLevel(p) {
    if (p < 0.2) return { label: 'Bajo', cls: 'low', color: '#11a999', summary: 'La estimación es baja dentro de los umbrales usados para esta demostración.' };
    if (p < 0.5) return { label: 'Moderado', cls: 'medium', color: '#e5ae43', summary: 'La estimación se ubica en la franja intermedia de esta demostración.' };
    return { label: 'Elevado', cls: 'high', color: '#ee845c', summary: 'La estimación es elevada en este escenario ficticio y requiere un análisis ilustrativo.' };
  }

  function recommendation(p, s) {
    const tags = [];
    let message;
    if (p >= 0.5) {
      message = 'Priorizar una revisión técnica y evaluar las condiciones meteorológicas. Escalar el escenario al equipo de seguridad operacional para un análisis adicional.';
      tags.push('Revisión prioritaria', 'Análisis adicional');
    } else if (p >= 0.2) {
      message = 'Programar una evaluación preventiva del escenario y revisar los controles de mantenimiento y meteorología antes de planificar la operación.';
      tags.push('Seguimiento preventivo', 'Verificación técnica');
    } else {
      message = 'Mantener los controles rutinarios, el seguimiento técnico y la verificación meteorológica. Continuar observando cambios en los indicadores.';
      tags.push('Monitoreo rutinario', 'Control preventivo');
    }
    if (s.maintenance === 0) tags.unshift('Mantenimiento pendiente');
    if (s.climate === 1) tags.push('Revisar clima');
    return { message, tags: tags.slice(0, 3) };
  }

  function syncNumberRange(field, value) {
    const cap = field === 'age' ? 'Age' : 'Hours';
    const input = $(`${field}Number`);
    const range = $(`${field}Range`);
    input.value = value;
    range.value = value;
    const [min, max] = limits[field];
    const progress = ((value - min) / (max - min)) * 100;
    range.style.background = `linear-gradient(90deg,#15b0ad ${progress}%,#e3edf2 ${progress}%)`;
  }

  function updateControlState() {
    syncNumberRange('age', state.age);
    syncNumberRange('hours', state.hours);
    document.querySelectorAll('.choice').forEach((button) => {
      const field = button.dataset.field;
      const key = field === 'clima' ? 'climate' : 'maintenance';
      const active = Number(button.dataset.value) === state[key];
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('.quick-btn').forEach((button) => {
      button.classList.toggle('active', button.dataset.scenario === selectedScenario);
    });
  }

  function updateCurrentScenario() {
    const matched = Object.entries(scenarios).find(([, s]) =>
      s.age === state.age && s.climate === state.climate && s.hours === state.hours && s.maintenance === state.maintenance);
    selectedScenario = matched ? matched[0] : null;
  }

  function render() {
    updateControlState();
    const { probability: p, impacts } = predict(state);
    const risk = getLevel(p);
    const displayName = selectedScenario ? scenarios[selectedScenario].name : 'Personalizado';
    const displayDescription = selectedScenario ? scenarios[selectedScenario].description : 'Escenario personalizado · Datos modificados';
    document.documentElement.style.setProperty('--risk-color', risk.color);

    $('kpiAccident').textContent = percentage(p);
    $('kpiSafe').textContent = percentage(1 - p);
    $('kpiLevel').textContent = risk.label;
    $('gaugeValue').textContent = percentage(p);
    $('gaugeProgress').style.strokeDashoffset = String(2 * Math.PI * 91 * (1 - p));
    $('gaugeProgress').setAttribute('aria-label', `Probabilidad de accidente estimada: ${percentage(p)}`);
    $('scenarioDescription').textContent = `${displayName} · ${displayDescription}`;
    $('riskBadge').className = `risk-badge ${risk.cls}`;
    $('riskBadgeText').textContent = `Riesgo ${risk.label.toLowerCase()}`;
    $('riskSummary').textContent = risk.summary;
    $('flightName').textContent = displayName;
    $('scalePercent').textContent = percentage(p);
    $('riskPointer').style.left = `calc(${Math.max(0.4, Math.min(99.5, p * 100))}% - 1px)`;

    const advice = recommendation(p, state);
    $('recommendationText').textContent = advice.message;
    $('actionTags').replaceChildren(...advice.tags.map((tag) => {
      const span = document.createElement('span');
      span.textContent = tag;
      return span;
    }));

    const alternate = { ...state, maintenance: state.maintenance === 1 ? 0 : 1 };
    const altP = predict(alternate).probability;
    const difference = (altP - p) * 100;
    if (state.maintenance === 0) {
      $('counterText').textContent = `Si el mantenimiento cambiara de 0 a 1, la estimación sería ${percentage(altP)} en lugar de ${percentage(p)}.`;
    } else {
      $('counterText').textContent = `Si el mantenimiento cambiara de 1 a 0, la estimación sería ${percentage(altP)} en lugar de ${percentage(p)}.`;
    }
    $('counterDiff').textContent = `${difference > 0 ? '+' : '−'}${nfmt(Math.abs(difference))} pp`;
    $('counterDiff').style.color = difference > 0 ? '#d47c55' : '#098b86';

    renderContributions(impacts);
    renderScenarioCards();
  }

  function renderContributions(impacts) {
    const names = [
      ['Antigüedad', `${state.age} años`],
      ['Clima', state.climate === 1 ? 'Adverso' : 'Favorable'],
      ['Horas de vuelo', `${intfmt(state.hours)} h`],
      ['Mantenimiento', state.maintenance === 1 ? 'Al día' : 'No al día'],
    ];
    // Escala grafica simetrica y uniforme para los cuatro factores.
    const maxAbs = Math.max(1.75, ...impacts.map((v) => Math.abs(v)));
    $('contributionRows').innerHTML = names.map(([name, detail], idx) => {
      const val = impacts[idx];
      const width = Math.min(100, (Math.abs(val) / maxAbs) * 100);
      const sign = val < 0 ? 'negative' : 'positive';
      return `<div class="factor-row"><div class="factor-name"><strong>${name}</strong><small>${detail}</small></div>
      <div class="factor-track"><div class="factor-half ${sign}"><div class="factor-fill" style="width:${width}%"></div></div></div>
      <div class="factor-magnitude ${sign}">${val >= 0 ? '+' : '−'}${nfmt(Math.abs(val))}</div></div>`;
    }).join('');
  }

  function renderScenarioCards() {
    $('scenarioCards').innerHTML = Object.entries(scenarios).map(([key, s]) => {
      const p = predict(s).probability;
      const level = getLevel(p);
      return `<article class="flight-card ${selectedScenario === key ? 'selected' : ''}">
        <div class="flight-card-header"><div class="flight-name"><span class="flight-emblem">${icon('i-plane')}</span><div><strong>${s.name}</strong><small>ESCENARIO ${key}</small></div></div><span class="flight-risk ${level.cls}">${level.label}</span></div>
        <div class="flight-prob">${percentage(p)}<small>de accidente</small></div>
        <div class="flight-bar"><div class="flight-bar-fill ${level.cls}" style="width:${p * 100}%"></div></div>
        <div class="flight-specs"><div><span>Antigüedad</span><strong>${s.age} años</strong></div><div><span>Clima</span><strong>${s.climate === 1 ? 'Adverso' : 'Favorable'}</strong></div><div><span>Horas de vuelo</span><strong>${intfmt(s.hours)} h</strong></div><div><span>Mantenimiento</span><strong>${s.maintenance === 1 ? 'Al día' : 'No al día'}</strong></div></div>
        <button class="load-flight" data-load="${key}" type="button">Analizar este vuelo ${icon('i-arrow')}</button>
      </article>`;
    }).join('');
  }

  function renderDataset() {
    $('dataBody').innerHTML = model.vuelos.map((flight, idx) => `<tr>
      <td>V-${String(idx + 1).padStart(2, '0')}</td>
      <td>${flight.antiguedad_avion}</td>
      <td>${flight.clima === 1 ? 'Adverso (1)' : 'Favorable (0)'}</td>
      <td>${intfmt(flight.horas_vuelo)} h</td>
      <td><span class="table-chip ${flight.mantenimiento === 1 ? 'good' : 'bad'}">${flight.mantenimiento === 1 ? 'Al día (1)' : 'No al día (0)'}</span></td>
      <td><span class="table-chip ${flight.accidente === 0 ? 'good' : 'bad'}">${flight.accidente === 1 ? 'Sí (1)' : 'No (0)'}</span></td>
    </tr>`).join('');
    const accuracy = model.metricas.accuracy_loo;
    $('validationText').innerHTML = `Evaluación <strong>Leave-One-Out: ${nfmt(accuracy * 100, 0)}% de aciertos</strong> en estos 20 datos ficticios. <strong>NO</strong> implica fiabilidad en vuelos reales.`;
  }

  function loadScenario(key, scroll = false) {
    const s = scenarios[key];
    if (!s) return;
    state = { ...s };
    selectedScenario = key;
    render();
    if (scroll) $('simulador').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function setNumeric(field, raw, final) {
    if (raw === '' && !final) return;
    const num = Number(raw);
    if (!Number.isFinite(num)) return;
    const [min, max] = limits[field];
    state[field] = Math.round(Math.max(min, Math.min(max, num)));
    updateCurrentScenario();
    render();
  }

  ['age', 'hours'].forEach((field) => {
    $(`${field}Range`).addEventListener('input', (ev) => setNumeric(field, ev.target.value, false));
    $(`${field}Number`).addEventListener('change', (ev) => setNumeric(field, ev.target.value, true));
  });
  document.querySelectorAll('.choice').forEach((button) => {
    button.addEventListener('click', () => {
      state[button.dataset.field === 'clima' ? 'climate' : 'maintenance'] = Number(button.dataset.value);
      updateCurrentScenario();
      render();
    });
  });
  document.querySelectorAll('.quick-btn').forEach((button) => {
    button.addEventListener('click', () => loadScenario(button.dataset.scenario));
  });
  $('scenarioCards').addEventListener('click', (event) => {
    const button = event.target.closest('[data-load]');
    if (button) loadScenario(button.dataset.load, true);
  });
  $('resetBtn').addEventListener('click', () => loadScenario('A'));
  $('flightForm').addEventListener('submit', (event) => {
    event.preventDefault();
    ['age', 'hours'].forEach((field) => setNumeric(field, $(`${field}Number`).value, true));
    $('gaugeValue').setAttribute('aria-live', 'polite');
    $('gaugeValue').focus?.();
  });

  // Navegacion movil.
  const backdrop = $('mobileBackdrop');
  function toggleNav(open) {
    document.body.classList.toggle('nav-open', open);
    backdrop.hidden = !open;
    $('mobileMenu').setAttribute('aria-expanded', String(open));
  }
  $('mobileMenu').addEventListener('click', () => toggleNav(!document.body.classList.contains('nav-open')));
  backdrop.addEventListener('click', () => toggleNav(false));
  document.querySelectorAll('.nav-link').forEach((a) => {
    a.addEventListener('click', () => {
      toggleNav(false);
      document.querySelectorAll('.nav-link').forEach((item) => item.classList.remove('active'));
      a.classList.add('active');
    });
  });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') toggleNav(false); });

  renderDataset();
  loadScenario('A');
  // Autoverificacion del modelo exportado: avisar por consola si difiere del entrenamiento.
  Object.entries({ A: scenarios.A, B: scenarios.B, C: scenarios.C }).forEach(([key, s]) => {
    const delta = Math.abs(predict(s).probability - model.escenarios[key]);
    if (delta > 1e-10) console.warn(`Desfase entre Python y navegador en el vuelo ${key}.`);
  });
})();
