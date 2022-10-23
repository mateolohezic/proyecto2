(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

const loginUser = async () => {
  const userType = document.getElementById('userLogin').value
  const passwordType = document.getElementById('passwordLogin').value
  const replace = document.getElementById('error')
  const results = await fetch('http://localhost:3000/users');
  const users = await results.json()
  const user = users.find(users => users.user === userType);

  if (user.password === passwordType) {
    localStorage.setItem('role', user.role)
    window.location.reload();
  } else {
    replace.classList.replace('error', 'error-active')
  }
}

const createUser = () => {
  const name = document.getElementById('nameId').value
  const surname = document.getElementById('surnameId').value
  const user = document.getElementById('userId').value
  const email = document.getElementById('emailId').value
  const password = document.getElementById('password1').value
  const role = document.getElementById('roleId').value

  fetch('http://localhost:3000/users', {
    method: 'POST',
    body: JSON.stringify({
      name,
      surname,
      user,
      email,
      password,
      role
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  alert('Usuario creado con exito')
}

const cerrarSesion = () =>{
  localStorage.setItem ("role", "nologin")
  window.location.reload();
}

const imprimirBoton = () =>{
  const rol = localStorage.getItem ("role")
  const boton = document.getElementById('botonLoginId')
  const cerrarSesion = document.getElementById('botonCerrarSesion')
  if (rol == "nologin"){
  boton.innerHTML = `<button type="button" class="btn mt-2 ms-1 me-1 boton" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Iniciar sesión <i class="bi bi-person"></i></button>`
  cerrarSesion.innerHTML = ``
  } else if (rol == "admin"){
    boton.innerHTML = `<a href="./admin.html" class="text-decoration-none text-light"><button type="button" class="btn mt-2 ms-1 me-1 boton">Administración <i class="bi bi-gear-fill"></i></button></a>`
    cerrarSesion.innerHTML = `<button type="button" class="btn mt-2 ms-1 me-1 boton" onclick="cerrarSesion()">Cerrar Sesión <i class="bi bi-door-open-fill"></i></button>`
  } else if (rol == "usuario"){
    boton.innerHTML = `<button type="button" class="btn mt-2 ms-1 me-1 boton" onclick="cerrarSesion()">Cerrar Sesión <i class="bi bi-door-open-fill"></i></button>`
    cerrarSesion.innerHTML = ``
  }

}

imprimirBoton()

const getJuegos = async () => {
  const resultado = await fetch('http://localhost:3000/games/');
  const resultados = await resultado.json();
  return resultados;
}

const getAccion = async () => {
  juegos = await getJuegos()
  const acciontotal = juegos.filter(juego => juego.categorie == "Acción" )
  return acciontotal
}

const getAccionPublicados = async () => {
  juegos = await getAccion()
  const accion = juegos.filter(juego => juego.published == true )
  return accion
}

const getCarreras = async () => {
  juegos = await getJuegos()
  const carrerastotal = juegos.filter(juego => juego.categorie == "Carreras" )
  return carrerastotal
}

const getCarrerasPublicados = async () => {
  juegos = await getCarreras()
  const carreras = juegos.filter(juego => juego.published == true )
  return carreras
}

const getTerror = async () => {
  juegos = await getJuegos()
  const terrortotal = juegos.filter(juego => juego.categorie == "Terror" )
  return terrortotal
}

const getTerrorPublicados = async () => {
  juegos = await getTerror()
  const terror = juegos.filter(juego => juego.published == true )
  return terror
}

const getEstrategia = async () => {
  juegos = await getJuegos()
  const estrategiatotal = juegos.filter(juego => juego.categorie == "Estrategia" )
  return estrategiatotal
}

const getEstrategiaPublicados = async () => {
  juegos = await getEstrategia()
  const estrategia = juegos.filter(juego => juego.published == true )
  return estrategia
}

const imprimirAccion = async () => {
  const juegos = await getAccionPublicados();
  const carousel = document.getElementById ("imprimirAccion");

  const juegosDelCarousel = juegos.map(juego => (`
  <div class="carousel-item">
    <div class="row justify-content-center">
      <div class="col-6">
        <div class="card border-0">
          <img src="${juego.image1}" class="card-img-top imagencarousel border-bottom border-5 border-dark border-primary">
          <div class="card-body ">
            <h5 class="card-title fuente tituloCard mt-3 mb-4 tamañoFuente">${juego.title}</h5>
            <p class="card-text fuente descripcionCard">${juego.synopsis}</p>
            <div class="d-flex flex-row-reverse fuente">
              <button type="button" class="btn btn-danger" onclick="setX(${juego.id})">Ver más</button>  
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  `)).join('')

  carousel.innerHTML = juegosDelCarousel
}

imprimirAccion()

const imprimirTerror = async () => {
  const juegos = await getTerrorPublicados();
  const carousel = document.getElementById ("imprimirTerror");

  const juegosDelCarousel = juegos.map(juego => (`
  <div class="carousel-item">
    <div class="row justify-content-center">
      <div class="col-6">
        <div class="card border-0">
          <img src="${juego.image1}" class="card-img-top imagencarousel border-bottom border-5 border-dark border-primary">
          <div class="card-body ">
            <h5 class="card-title fuente tituloCard mt-3 mb-4 tamañoFuente">${juego.title}</h5>
            <p class="card-text fuente descripcionCard">${juego.synopsis}</p>
            <div class="d-flex flex-row-reverse fuente">
              <button type="button" class="btn btn-danger" onclick="setX(${juego.id})">Ver más</button>  
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  `)).join('')

  carousel.innerHTML = juegosDelCarousel
}

imprimirTerror()

const imprimirCarreras = async () => {
  const juegos = await getCarrerasPublicados();
  const carousel = document.getElementById ("imprimirCarreras");

  const juegosDelCarousel = juegos.map(juego => (`
  <div class="carousel-item">
    <div class="row justify-content-center">
      <div class="col-6">
        <div class="card border-0">
          <img src="${juego.image1}" class="card-img-top imagencarousel border-bottom border-5 border-dark border-primary">
          <div class="card-body ">
            <h5 class="card-title fuente tituloCard mt-3 mb-4 tamañoFuente">${juego.title}</h5>
            <p class="card-text fuente descripcionCard">${juego.synopsis}</p>
            <div class="d-flex flex-row-reverse fuente">
              <button type="button" class="btn btn-danger" onclick="setX(${juego.id}})">Ver más</button>  
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  `)).join('')

  carousel.innerHTML = juegosDelCarousel
}

imprimirCarreras()

const imprimirEstrategia = async () => {
  const juegos = await getEstrategiaPublicados();
  const carousel = document.getElementById ("imprimirEstrategia");

  const juegosDelCarousel = juegos.map(juego => (`
  <div class="carousel-item">
    <div class="row justify-content-center">
      <div class="col-6">
        <div class="card border-0">
          <img src="${juego.image1}" class="card-img-top imagencarousel border-bottom border-5 border-dark border-primary">
          <div class="card-body ">
            <h5 class="card-title fuente tituloCard mt-3 mb-4 tamañoFuente">${juego.title}</h5>
            <p class="card-text fuente descripcionCard">${juego.synopsis}</p>
            <div class="d-flex flex-row-reverse fuente">
                <button type="button" class="btn btn-danger" onclick="setX(${juego.id})">Ver más</button>  
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  `)).join('')

  carousel.innerHTML = juegosDelCarousel
}

imprimirEstrategia()

const setX = (id) =>{
  localStorage.setItem("id", id)
  window.location.href= "./game.html"
}
