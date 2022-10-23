const getId = () =>{
    const id = localStorage.getItem("id")
    return id
}

const getJuego = async () => {
    const x = getId()
    const resultado = await fetch(`http://localhost:3000/games/${x}`);
    const resultados = await resultado.json();
    return resultados;
  }

const cambiarPortada = async (imagen) => {
    const juego = await getJuego()

    if (imagen == 1){
        portada = juego.image1
    } else if (imagen == 2){
        portada = juego.image2
    } else if (imagen == 3){
        portada = juego.image3
    } else if (imagen == 4){
        portada = juego.image4
    }

    fetch(`http://localhost:3000/games/${juego.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        portada,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
  )
    
}

  const imprimirJuego = async () => {
    const juego = await getJuego();
    const detalles = document.getElementById ("paginaJuego");

    detalles.innerHTML = (`
    
    <div class="container col-xxl-6 col-xl-6 col-lg-6 col-sm-12 col-md-12 cajagrandeizq text-center">
        <div class="text-start volverinicio mt-3 ms-4">
            <a href="./index.html" class="text-decoration-none inicio"><i class="bi bi-arrow-left-short"></i>Inicio</a>
        </div>
        <div class="container ">
            <div id="carouselFotosJuego" class="carousel slide carruseljuego mx-auto fixedtop mt-3" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active ">
                        <img src="${juego.image1}" class="d-block w-100 imagencarrousel" alt="Imagen 1">
                    </div>
                    <div class="carousel-item">
                        <img src="${juego.image2}" class="d-block w-100 imagencarrousel" alt="Imagen 2">
                    </div>
                    <div class="carousel-item">
                        <img src="${juego.image3}" class="d-block w-100 imagencarrousel" alt="Imagen 3">
                    </div>
                    <div class="carousel-item">
                        <img src="${juego.image4}" class="d-block w-100 imagencarrousel" alt="Imagen 4">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselFotosJuego" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselFotosJuego" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
        <div class="galeriaseleccionar">
            <div class="container col-8">
                <img src="${juego.portada}" alt="Portada" class="mt-3 mb-3 img-fluid imagengrande">
            </div>
            <div class="container col-10">    
                <img src="${juego.image1}" alt="Imagen 1" class="imagenchica" onclick="cambiarPortada(1)">
                <img src="${juego.image2}" alt="Imagen 2" class="imagenchica" onclick="cambiarPortada(2)">
            </div>
            <div class="container col-10 mt-2"> 
                <img src="${juego.image3}" alt="Imagen 3" class="imagenchica" onclick="cambiarPortada(3)">
                <img src="${juego.image4}" alt="Imagen 4" class="imagenchica" onclick="cambiarPortada(4)">
            </div>
        </div>
    </div>
    <div class="col-xxl-6 col-xl-6 col-lg-6 col-sm-12 col-md-12 cajagrandeder">
        <div class="column text-start ms-4 me-2">
            <div class="container mt-5 fs-1">${juego.title}</div>
            <div class="container fs-6 text-white text-opacity-75">${juego.developer}</div>
            <div class="container fs-6 text-white text-opacity-75">Etiquetas: ${juego.categorie}</div>
            <div class="container fs-6 text-white text-opacity-75">Fecha de Estreno: ${juego.date}</div>
            <div class="container fs-6 text-white text-opacity-75" id="estrellasRating"></div>
            <div class="container mt-5 fs-5">${juego.synopsis}</div>
        </div>
        <div class="d-flex flex-row-reverse fixed-bottom m-5">
            <a href="./404.html"><button type="button" class="btn btn-darkk btn-lg">Comprar</button></a>

        </div>
    </div>
    
    `)
}

imprimirJuego()

const imprimirRating = async () => {
    const juego = await getJuego();
    const estrellas = document.getElementById ("estrellasRating");
    
    if (juego.rating == 0){
    estrellas.innerHTML = (`<i class="bi bi-star"></i>  <i class="bi bi-star"></i>  <i class="bi bi-star"></i>  <i class="bi bi-star"></i>  <i class="bi bi-star"></i>`)
    } else if (juego.rating == 1){
    estrellas.innerHTML = (`<i class="bi bi-star-fill"></i>  <i class="bi bi-star"></i>  <i class="bi bi-star"></i>  <i class="bi bi-star"></i>  <i class="bi bi-star"></i>`)
    } else if (juego.rating == 2){
    estrellas.innerHTML = (`<i class="bi bi-star-fill"></i>  <i class="bi bi-star-fill"></i>  <i class="bi bi-star"></i>  <i class="bi bi-star"></i>  <i class="bi bi-star"></i>`)   
    } else if (juego.rating == 3){
    estrellas.innerHTML = (`<i class="bi bi-star-fill"></i>  <i class="bi bi-star-fill"></i>  <i class="bi bi-star-fill"></i>  <i class="bi bi-star"></i>  <i class="bi bi-star"></i>`)
    } else if (juego.rating == 4){
    estrellas.innerHTML = (`<i class="bi bi-star-fill"></i>  <i class="bi bi-star-fill"></i>  <i class="bi bi-star-fill"></i>  <i class="bi bi-star-fill"></i>  <i class="bi bi-star"></i>`)
    } else if (juego.rating == 5){
    estrellas.innerHTML = (`<i class="bi bi-star-fill"></i>  <i class="bi bi-star-fill"></i>  <i class="bi bi-star-fill"></i>  <i class="bi bi-star-fill"></i>  <i class="bi bi-star-fill"></i>`)
    } else{
    estrellas.innerHTML = estrellas.innerHTML = (`N/A   <i class="bi bi-star-fill"></i>`)
    }

}

imprimirRating()