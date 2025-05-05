// CTR (Click Through Rate)
function calcCTR() {
    const clicks = parseFloat(document.getElementById("ctr-clicks").value);
    const impressions = parseFloat(document.getElementById("ctr-impressions").value);
    if (impressions > 0) {
      const result = (clicks / impressions) * 100;
      document.getElementById("ctr-result").innerText = result.toFixed(2);
    } else {
      document.getElementById("ctr-result").innerText = "--";
    }
  }
  
  // CPM (Costo por Mil Impresiones)
  function calcCPM() {
    const cost = parseFloat(document.getElementById("cpm-cost").value);
    const impressions = parseFloat(document.getElementById("cpm-impressions").value);
    if (impressions > 0) {
      const result = (cost / impressions) * 1000;
      document.getElementById("cpm-result").innerText = result.toFixed(2);
    } else {
      document.getElementById("cpm-result").innerText = "--";
    }
  }
  
  // CPC (Costo por Clic)
  function calcCPC() {
    const cost = parseFloat(document.getElementById("cpc-cost").value);
    const clicks = parseFloat(document.getElementById("cpc-clicks").value);
    if (clicks > 0) {
      const result = cost / clicks;
      document.getElementById("cpc-result").innerText = result.toFixed(2);
    } else {
      document.getElementById("cpc-result").innerText = "--";
    }
  }
  
  // ROAS (Return on Ad Spend)
  function calcROAS() {
    const revenue = parseFloat(document.getElementById("roas-revenue").value);
    const cost = parseFloat(document.getElementById("roas-cost").value);
    if (cost > 0) {
      const result = revenue / cost;
      document.getElementById("roas-result").innerText = result.toFixed(2);
    } else {
      document.getElementById("roas-result").innerText = "--";
    }
  }
  
  // Costo por Resultado
  function calcCostPerResult() {
    const cost = parseFloat(document.getElementById("res-cost").value);
    const totalResults = parseFloat(document.getElementById("res-total").value);
    if (totalResults > 0) {
      const result = cost / totalResults;
      document.getElementById("res-result").innerText = result.toFixed(2);
    } else {
      document.getElementById("res-result").innerText = "--";
    }
  }


  function calcular() {
    const presupuesto = parseFloat(document.getElementById('presupuesto').value);
    const cpc = parseFloat(document.getElementById('cpc').value);
    let tasa = parseFloat(document.getElementById('tasa').value) / 100;
    const valor = parseFloat(document.getElementById('valor').value);
    const minimo = parseFloat(document.getElementById('minimo').value);
    const trafico = document.getElementById('trafico').value;
  
    const resultado = document.getElementById('resultado');
    resultado.classList.add('d-none');
    resultado.innerHTML = '';
  
    if (trafico && !tasa) {
      if (trafico === 'frio') tasa = 0.015;
      if (trafico === 'tibio') tasa = 0.04;
      if (trafico === 'caliente') tasa = 0.08;
    }
  
    if (!presupuesto || !cpc || !tasa) {
      resultado.classList.remove('d-none');
      resultado.innerHTML = 'Por favor completa al menos presupuesto, CPC y tasa de conversión o tipo de tráfico.';
      return;
    }
  
    const clics = presupuesto / cpc;
    const conversiones = clics * tasa;
    const costoConversion = conversiones > 0 ? presupuesto / conversiones : 0;
    const ingreso = valor ? conversiones * valor : null;
    const cumpleMeta = minimo ? conversiones >= minimo : null;
  
    let html = `
      <strong>Clics esperados:</strong> ${clics.toFixed(0)}<br/>
      <strong>Conversiones esperadas:</strong> ${conversiones.toFixed(1)}<br/>
      <strong>Costo por conversión:</strong> $${costoConversion.toFixed(2)} MXN<br/>
    `;
  
    if (valor) {
      html += `<strong>Ingresos estimados:</strong> $${ingreso.toFixed(2)} MXN<br/>`;
  
      const utilidad = ingreso - presupuesto;
      const estado = utilidad >= 0
        ? `🟢 Ganancia de $${utilidad.toFixed(2)} MXN`
        : `🔴 Pérdida de $${Math.abs(utilidad).toFixed(2)} MXN`;
  
      html += `<strong>Resultado final:</strong> ${estado}<br/>`;
    }
  
    if (minimo) {
      html += `<strong>¿Cumple el objetivo mínimo?:</strong> ${cumpleMeta ? '✅ Sí' : '❌ No'}<br/>`;
    }
  
    resultado.classList.remove('d-none');
    resultado.innerHTML = html;
  }
  