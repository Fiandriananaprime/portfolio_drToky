(() => {
  const minSlider = document.getElementById('rangeMin');
  const maxSlider = document.getElementById('rangeMax');
  const priceSpan = document.getElementById('price-range');
  if (!minSlider || !maxSlider) return;

  const minAttr = Number(minSlider.min) || 0;
  const maxAttr = Number(maxSlider.max) || 300000;

  function formatAr(n) {
    return n.toLocaleString('fr-FR') + 'Ar';
  }

  function applyGradients(min, max) {
    const minPct = ((min - minAttr) / (maxAttr - minAttr)) * 100;
    const maxPct = ((max - minAttr) / (maxAttr - minAttr)) * 100;
    const minP = Math.max(0, Math.min(100, minPct)).toFixed(2) + '%';
    const maxP = Math.max(0, Math.min(100, maxPct)).toFixed(2) + '%';
    const gradMin = `linear-gradient(90deg, var(--color-red) 0%, var(--color-red) ${minP}, var(--color-border-light) ${minP}, var(--color-border-light) 100%)`;
    const gradMax = `linear-gradient(90deg, var(--color-red) 0%, var(--color-red) ${maxP}, var(--color-border-light) ${maxP}, var(--color-border-light) 100%)`;
    minSlider.style.setProperty('background', gradMin, 'important');
    maxSlider.style.setProperty('background', gradMax, 'important');
    let styleEl = document.getElementById('range-track-style');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'range-track-style';
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = `#${minSlider.id}::-webkit-slider-runnable-track{background:${gradMin} !important} #${maxSlider.id}::-webkit-slider-runnable-track{background:${gradMax} !important}`;
  }

  function update() {
    let min = Number(minSlider.value);
    let max = Number(maxSlider.value);
    if (!isFinite(min)) min = minAttr;
    if (!isFinite(max)) max = maxAttr;
    if (min < minAttr) min = minAttr;
    if (max > maxAttr) max = maxAttr;
    if (min > max) min = max;
    minSlider.value = String(min);
    maxSlider.value = String(max);
    if (priceSpan) priceSpan.textContent = formatAr(min) + ' - ' + formatAr(max);
    applyGradients(min, max);
  }


  update();
  minSlider.addEventListener('input', update);
  maxSlider.addEventListener('input', update);
})();

