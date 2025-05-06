const costoTotalVentas = ventasEstimadas * costo; // Calcular el costo total de los productos vendidos
const gananciaNeta = ingresos - costoTotalVentas - presupuesto; // Corregir el cálculo de la ganancia neta

function calcular() {
  // Limpiar cualquier alerta de error o éxito previa
  const alertasPrevias = document.querySelectorAll('.alert');
  alertasPrevias.forEach(alerta => alerta.remove());

  // Limpiar los resultados previos
  document.getElementById('impresiones').textContent = '';
  document.getElementById('clics').textContent = '';
  document.getElementById('ventas').textContent = '';
  document.getElementById('ingresos').textContent = '';
  document.getElementById('ganancia').textContent = '';
  document.getElementById('roas').textContent = '';
  document.getElementById('cpa').textContent = '';
  document.getElementById('recomendacion').textContent = '';
  document.getElementById('resultados').style.display = 'none'; // Ocultar el contenedor antes de los nuevos resultados

  // Obtener los valores de los campos del formulario
  const presupuestoInput = document.getElementById('presupuesto');
  const cpcInput = document.getElementById('cpc');
  const ctrInput = document.getElementById('ctr');
  const cvrInput = document.getElementById('cvr');
  const precioInput = document.getElementById('precio');
  const costoInput = document.getElementById('costo');
  const diasInput = document.getElementById('dias');

  const presupuesto = parseFloat(presupuestoInput.value);
  const cpc = parseFloat(cpcInput.value);
  const ctr = parseFloat(ctrInput.value) / 100; // Convertir porcentaje a decimal
  const cvr = parseFloat(cvrInput.value) / 100; // Convertir porcentaje a decimal
  const precio = parseFloat(precioInput.value);
  const costo = parseFloat(costoInput.value);
  const dias = parseInt(diasInput.value);

  let errores = false;

  // Función para resaltar el borde en rojo
  function marcarError(input) {
    input.classList.add('is-invalid');
    errores = true;
  }

  // Limpiar los estilos de error previos
  const inputs = [presupuestoInput, cpcInput, ctrInput, cvrInput, precioInput, costoInput, diasInput];
  inputs.forEach(input => input.classList.remove('is-invalid'));

  // Validar que los campos requeridos no estén vacíos
  if (isNaN(presupuesto)) marcarError(presupuestoInput);
  if (isNaN(cpc)) marcarError(cpcInput);
  if (isNaN(ctr)) marcarError(ctrInput);
  if (isNaN(cvr)) marcarError(cvrInput);
  if (isNaN(precio)) marcarError(precioInput);
  if (isNaN(costo)) marcarError(costoInput);
  if (isNaN(dias)) marcarError(diasInput);

  if (errores) {
    // Mostrar alerta de Bootstrap si hay errores
    const alerta = `
      <div class="alert alert-danger alert-dismissible fade show mt-3" role="alert">
        Por favor, completa todos los campos requeridos.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
    const formulario = document.getElementById('formulario');
    formulario.insertAdjacentHTML('afterend', alerta);
    return; // Detener la ejecución si hay errores
  }

  // Realizar los cálculos si no hay errores
  const impresionesEstimadas = presupuesto / cpc;
  const clicsEstimados = impresionesEstimadas * ctr;
  const ventasEstimadas = clicsEstimados * cvr;
  const ingresos = ventasEstimadas * precio;
  const gananciaNeta = ingresos - (ventasEstimadas * costo) - presupuesto;
  const roas = presupuesto > 0 ? ingresos / presupuesto : 0;
  const cpa = ventasEstimadas > 0 ? presupuesto / ventasEstimadas : 0;

  let recomendacion = "";
  if (roas < 1) {
    recomendacion = "Considera optimizar tu campaña, el ROAS es bajo.";
  } else if (roas >= 2.5 && gananciaNeta > 0) {
    recomendacion = "¡Excelente! La campaña parece escalable.";
  } else if (gananciaNeta <= 0) {
    recomendacion = "La campaña no está generando ganancias netas positivas.";
  } else {
    recomendacion = "Revisa las métricas para identificar áreas de mejora.";
  }

  // Mostrar o actualizar los resultados en el contenedor
  document.getElementById('impresiones').textContent = Math.round(impresionesEstimadas);
  document.getElementById('clics').textContent = Math.round(clicsEstimados);
  document.getElementById('ventas').textContent = Math.round(ventasEstimadas);
  document.getElementById('ingresos').textContent = ingresos.toFixed(2);
  document.getElementById('ganancia').textContent = gananciaNeta.toFixed(2);
  document.getElementById('roas').textContent = roas.toFixed(2);
  document.getElementById('cpa').textContent = cpa.toFixed(2);
  document.getElementById('recomendacion').textContent = recomendacion;

  // Asegurarse de que el contenedor de resultados esté visible
  document.getElementById('resultados').style.display = 'block';

  // Agregar dinámicamente el botón de limpiar si no existe
  let limpiarBtn = document.getElementById('limpiar-calculadora');
  if (!limpiarBtn) {
    const calcularBtn = document.querySelector('#formulario button[type="button"]');
    const limpiarButton = document.createElement('button');
    limpiarButton.type = 'button';
    limpiarButton.classList.add('btn', 'btn-secondary', 'ms-2', 'w-50'); // Añade clases de Bootstrap para estilo
    limpiarButton.id = 'limpiar-calculadora';
    limpiarButton.textContent = 'Limpiar';
    limpiarButton.onclick = limpiarFormulario;
    calcularBtn.parentNode.insertBefore(limpiarButton, calcularBtn.nextSibling);
    calcularBtn.classList.remove('w-100'); // Ajusta el ancho del botón calcular
    calcularBtn.classList.add('w-50');
  }
}

function rellenarValores() {
  const industria = document.getElementById('industria').value;

  const datosIndustria = {
    vestir:     { cpc: 0.45, ctr: 2.5, cvr: 3.0 },
    auto:       { cpc: 2.24, ctr: 1.8, cvr: 2.2 },
    b2b:        { cpc: 2.52, ctr: 1.5, cvr: 1.8 },
    belleza:    { cpc: 1.81, ctr: 2.8, cvr: 3.2 },
    servicios:  { cpc: 3.08, ctr: 1.2, cvr: 2.0 },
    educacion:  { cpc: 1.06, ctr: 2.6, cvr: 3.5 },
    empleo:     { cpc: 2.72, ctr: 1.6, cvr: 2.5 },
    finanzas:   { cpc: 3.77, ctr: 1.0, cvr: 1.8 },
    fitness:    { cpc: 1.90, ctr: 2.7, cvr: 3.0 },
    hogar:      { cpc: 2.93, ctr: 1.9, cvr: 2.8 },
    salud:      { cpc: 1.32, ctr: 2.2, cvr: 3.1 },
    industriales:{ cpc: 2.14, ctr: 1.4, cvr: 2.0 },
    legal:      { cpc: 1.32, ctr: 1.3, cvr: 2.1 },
    bienes:     { cpc: 1.81, ctr: 2.0, cvr: 2.6 },
    minorista:  { cpc: 0.70, ctr: 3.1, cvr: 3.3 },
    tecnologia: { cpc: 1.27, ctr: 2.3, cvr: 2.9 },
    viajes:     { cpc: 0.63, ctr: 2.9, cvr: 3.0 }
  };

  const cpcInput = document.getElementById('cpc');
  const ctrInput = document.getElementById('ctr');
  const cvrInput = document.getElementById('cvr');

  if (industria === 'personalizado') {
    cpcInput.value = '';
    ctrInput.value = '';
    cvrInput.value = '';
  } else {
    const valores = datosIndustria[industria];
    cpcInput.value = valores.cpc;
    ctrInput.value = valores.ctr;
    cvrInput.value = valores.cvr;
  }
}

function limpiarFormulario() {
  document.getElementById('formulario').reset();
  document.getElementById('resultados').style.display = 'none';
  const limpiarBtn = document.getElementById('limpiar-calculadora');
  if (limpiarBtn) {
    limpiarBtn.remove();
    const calcularBtn = document.querySelector('#formulario button[type="button"]');
    calcularBtn.classList.remove('w-50');
    calcularBtn.classList.add('w-100');
  }
  // Eliminar cualquier alerta de error que esté visible
  const alertaError = document.querySelector('.alert-danger');
  if (alertaError) {
    alertaError.remove();
  }
  // Limpiar los estilos de error de los inputs
  const inputs = document.querySelectorAll('.form-control.is-invalid');
  inputs.forEach(input => input.classList.remove('is-invalid'));
}

// Cargar el navbar y el footer al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    fetch('./reusable/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-container').innerHTML = data;
        });

    fetch('./reusable/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        });

    // Asegurarse de que el formulario no se envíe de la manera tradicional
    const formulario = document.getElementById('formulario');
    formulario.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita la recarga de la página
        calcular(); // Llama a la función calcular
    });
});