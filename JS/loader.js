window.onload = function () {
    let currentPage = location.pathname.split("/").pop();
  
    // Si no hay nombre de archivo (estás en la raíz), asumimos "index.html"
    if (currentPage === "") currentPage = "index.html";
  
    const navHtml = `
  <nav class="navbar navbar-expand-lg bg-dark shadow-sm" style="box-shadow: 0 4px 6px -4px var (--black);">
    <div class="container">
      <div class="d-flex w-100 justify-content-between align-items-center">
        <a class="navbar-brand d-flex align-items-center text-white" href="index.html">
          <img src="../assets/img/Logo_DB (1).webp" alt="Logo" width="30" height="24">
        </a>
        <button class="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link text-white" href="index.html">Inicio</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" href="calculadora.html">Calculadora</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" href="cursos.html">Cursos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" href="contacto.html">Contacto</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  `;
  
    const footerHtml = `
      <footer class="text-center py-3 bg-dark text-white mt-5">
        <p>&copy; 2025 Daniel Banda</p>
      </footer>
    `;
  
    document.getElementById("nav-container").innerHTML = navHtml;
    document.getElementById("footer-container").innerHTML = footerHtml;
  
    // Activar link actual
    const links = document.querySelectorAll("#navbarNav .nav-link");
    links.forEach(link => {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active", "text-orange");
      }
    });
  };
  