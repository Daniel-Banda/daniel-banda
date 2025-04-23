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

const fechaLimite = new Date("May 2, 2025 22:00:00").getTime();
const intervalo = setInterval(actualizarContador, 1000);
