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

  if (user.password === passwordType && user.confirm == "verificado") {
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
  const confirm = "pendiente"

  fetch('http://localhost:3000/users', {
    method: 'POST',
    body: JSON.stringify({
      name,
      surname,
      user,
      email,
      password,
      role,
      confirm
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
    boton.innerHTML = `
    <div class="dropdown botonDropdown">
      <button type="button" class="btn mt-2 me-1 boton dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Administración <i class="bi bi-gear-fill"></i></button>
      <ul class="dropdown-menu bg-secondary">
        <li><a class="dropdown-item text-white" href="./admin.html">Juegos</a></li>
        <li><a class="dropdown-item text-white" href="./users.html">Usuarios</a></li>
      </ul>
    </div>
    `
    cerrarSesion.innerHTML = `<button type="button" class="btn mt-2 ms-1 me-1 boton" onclick="cerrarSesion()">Cerrar Sesión <i class="bi bi-door-open-fill"></i></button>`
  } else if (rol == "usuario"){
    boton.innerHTML = `<button type="button" class="btn mt-2 ms-1 me-1 boton" onclick="cerrarSesion()">Cerrar Sesión <i class="bi bi-door-open-fill"></i></button>`
    cerrarSesion.innerHTML = ``
  } else if ( rol == undefined){
    boton.innerHTML = `<button type="button" class="btn mt-2 ms-1 me-1 boton" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Iniciar sesión <i class="bi bi-person"></i></button>`
    cerrarSesion.innerHTML = ``
  }
}

imprimirBoton()

const getJuegos = async () => {
  const resultado = await fetch('http://localhost:3000/games/');
  const resultados = await resultado.json();
  return resultados;
}

const getJuegosPublicados = async () => {
  juegos = await getJuegos()
  const juegosPublicados = juegos.filter(juego => juego.published == true )
  return juegosPublicados
}

const getDestacado = async () => {
  juegos = await getJuegos()
  const juegosDestacado = juegos.filter(juego => juego.favorite == true )
  return juegosDestacado
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

const coinciden = async (valor) => {
  juegos = await getJuegos()
  const letras = valor
  const juegosCoinciden = juegos.filter(juego => juego.title.includes(`${letras}`) || juego.categorie.includes(`${letras}`) || juego.date.includes(`${letras}`) || juego.price.includes(`${letras}`) || juego.developer.includes(`${letras}`) || juego.title.toLowerCase().includes(`${letras}`) || juego.categorie.toLowerCase().includes(`${letras}`) || juego.developer.toLowerCase().includes(`${letras}`))
  return juegosCoinciden
}

const barraSearch = (juegosCoinciden) =>{
  
  const juegos = juegosCoinciden
  const cards = document.getElementById(`searchCards`)
  const juegosCards = juegos.map(juego => (`

  <div class="searchCard" onclick="setX(${juego.id})">
    <div class="searchCardBody mt-4 p-3">
      <div class="text-center">
        <div class="text-white fs-5">${juego.title}</div>
      </div>
    </div>
  </div>
  `)).join('')

  cards.innerHTML = juegosCards

}

const barraCoinciden = async () =>{
  const barraBusqueda = document.getElementById (`search`)
  const valor = barraBusqueda.value
  const juegosCoincidentes = await coinciden (valor)
  return barraSearch(juegosCoincidentes)
}

const imprimirDestacado = async () => {
  const juegos = await getDestacado();
  const juego = juegos[0]
  const imagen1 = document.getElementById ("imagen1");
  const imagen2 = document.getElementById ("imagen2");
  const imagen3 = document.getElementById ("imagen3");

  imagen1.innerHTML = (`
  <img src="${juego.image1}" class="d-block w-100" onclick="setX(${juego.id})">
  <div class="carousel-caption d-none d-md-block">
    <h5 class="text-light fs-5 text-center mt-5 badge bg-secondary bg-opacity-50 text-wrap w-100">${juego.title}</h5>
  </div>
  
  `)

  imagen2.innerHTML = (`
  <img src="${juego.image2}" class="d-block w-100" onclick="setX(${juego.id})">
  `)

  imagen3.innerHTML = (`
  <img src="${juego.image3}" class="d-block w-100" onclick="setX(${juego.id})">
  `)
}

imprimirDestacado()