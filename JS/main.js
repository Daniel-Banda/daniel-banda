const actualizarContador = () => {
  const ahora = new Date().getTime();
  const diferencia = fechaLimite - ahora;

  if (diferencia <= 0) {
    clearInterval(intervalo);
    document.getElementById("contador").innerHTML = "Inscripciones cerradas";
    return;
  }

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  document.getElementById("contador").innerHTML =
    `${dias}d ${horas}h ${minutos}m ${segundos}s`;
};

// Configura la fecha límite de la cuenta atrás
const fechaLimite = new Date("Apr 29, 2025 21:03:11").getTime();

// Ejecuta el contador cada segundo
const intervalo = setInterval(actualizarContador, 1000);

// Añadir aquí código para forzar el "Inscripciones cerradas" si quieres hacer pruebas:
const fechaLimitePasada = new Date("Apr 1, 2024 00:00:00").getTime(); // Para prueba

// Si estás probando y quieres forzar el "Inscripciones cerradas" sin esperar, descomenta la siguiente línea:
if (new Date().getTime() > fechaLimite) {
  clearInterval(intervalo);
  document.getElementById("contador").innerHTML = "Inscripciones cerradas";
}
