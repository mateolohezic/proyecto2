const getJuegos = async () => {
    const resultado = await fetch('http://localhost:3000/games/');
    const resultados = await resultado.json();
    return resultados;
}

getJuegos()

const imprimirTabla = async () => {
    const juegos = await getJuegos();
    const fila = document.getElementById ("tabla");

    const filas = juegos.map(juego => (
    `
    <tr>
        <td>${juego.id}<img src="./img/404.png" alt="" width="0" height="0" onload= "imprimirFavorito(${juego.id})"></td>
        <td>${juego.title}<img src="./img/404.png" alt="" width="0" height="0" onload= "imprimirPublicado(${juego.id})"></td>
        <td>${juego.categorie}</td>
        <td>${juego.synopsis}</td>
        <td>$ ${juego.price}</td>
        <td>
        <div id="publicado${juego.id}">
        </div>
        </td>
        <td>
            <div class="d-flex justify-content-evenly" >                                    
                <div id="estrellaFav${juego.id}">
                </div>
                <div>
                <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#editarJuego${juego.id}"><i class="bi bi-pencil-fill"></i></button>
                </div>
                <div>
                <button type="button" class="btn btn-danger"  onclick="eliminarJuego(${juego.id})"><i class="bi bi-trash"></i></button>
                </div>
            </div>
        </td>
    </tr>
    <div class="modal fade text-start" id="editarJuego${juego.id}" tabindex="-1" aria-labelledby="editarJuegoLabel${juego.id}" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="editarJuegoLabel${juego.id}">Editar un juego</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="row">
                  <div class="mb-3 col">
                    <label for="etitle${juego.id}" class="form-label">Titulo</label>
                    <input type="text" class="form-control" id="etitle${juego.id}" value="${juego.title}" required>
                  </div>
                  <div class="mb-3 col">
                    <label for="edeveloper${juego.id}" class="form-label">Desarrolllador</label>
                    <input type="text" class="form-control" id="edeveloper${juego.id}" value="${juego.developer}" required>
                  </div>
                </div>
                <div class="row">
                  <div class="mb-3 col">
                    <label class="form-label">Categoria</label>
                    <select class="form-select" aria-label="Default select example" id="ecategorie${juego.id}" required>
                      <option value="N/A" selected>Seleccione una Categoria</option>
                      <option value="Acción">Accion</option>
                      <option value="Carreras">Carreras</option>
                      <option value="Estrategia">Estrategia</option>
                      <option value="Terror">Terror</option>
                    </select>
                  </div>
                  <div class="mb-3 col">
                    <label for="edate${juego.id}" class="form-label">Fecha de Estreno</label>
                    <input type="number" class="form-control" id="edate${juego.id}" min="1900" max="2023" value="${juego.date}" required>
                  </div>
                </div>                                       
                <div class="row">
                  <div class="mb-3 col">
                    <label for="eprice${juego.id}" class="form-label">Precio</label>
                    <input type="number" class="form-control" id="eprice${juego.id}" value="${juego.price}" required>
                  </div>
                  <div class="mb-3 col">
                    <label for="esynopsis${juego.id}" class="form-label">Descripcion</label>
                    <input type="text" class="form-control" id="esynopsis${juego.id}" value="${juego.synopsis}" required>
                  </div>
                </div>
                <div class="row">
                  <div class="mb-3 col">
                      <label for="eimage1${juego.id}" class="form-label">Portada</label>
                      <input type="text" class="form-control" id="eimage1${juego.id}" value="${juego.image1}" required>
                  </div>
                  <div class="mb-3 col">
                      <label for="eimage2${juego.id}" class="form-label">Imagen 2</label>
                      <input type="text" class="form-control" id="eimage2${juego.id}" value="${juego.image2}" required>
                  </div>
                </div>
                <div class="row">
                  <div class="mb-3 col">
                    <label for="eimage3${juego.id}" class="form-label">Imagen 3</label>
                    <input type="text" class="form-control" id="eimage3${juego.id}" value="${juego.image3}" required>
                  </div>
                  <div class="mb-3 col">
                    <label for="eimage4${juego.id}" class="form-label">Imagen 4</label>
                    <input type="text" class="form-control" id="eimage4${juego.id}" value="${juego.image4}" required>
                  </div>
                </div>
                <div class="row">
                  <div class="mb-3 col-6">
                    <label class="form-label">Puntaje</label>
                    <select class="form-select" aria-label="Default select example" id="erating${juego.id}" required>
                      <option value="N/A" selected>Seleccione un puntaje</option>
                      <option value="0">0/5</option>
                      <option value="1">1/5</option>
                      <option value="2">2/5</option>
                      <option value="3">3/5</option>
                      <option value="4">4/5</option>
                      <option value="5">5/5</option>
                    </select>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-danger" onclick="editarJuego(${juego.id})">Editar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    `)
 

    ).join('')

    fila.innerHTML = filas
}

imprimirTabla()

const crearJuego = () =>{
        const title = document.getElementById ("title").value
        const date = document.getElementById ("date").value
        const price = document.getElementById ("price").value
        const synopsis = document.getElementById ("synopsis").value
        const categorie = document.getElementById ("categorie").value
        const developer = document.getElementById ("developer").value
        const rating = document.getElementById ("rating").value
        const image1 = document.getElementById ("image1").value
        const image2 = document.getElementById ("image2").value
        const image3 = document.getElementById ("image3").value
        const image4 = document.getElementById ("image4").value
        const favorite = false
        const published = false

        fetch("http://localhost:3000/games", {
            
            method:"POST",
            body: JSON.stringify({
                title,
                date,
                price,
                synopsis,
                categorie,
                developer,
                rating,
                favorite,
                published,
                image1,
                image2,
                image3,
                image4
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
    }

const setX = (id) =>{
    localStorage.setItem("id", id)
}


const editarJuego = (id) =>{
    const x = id
    const title = document.getElementById (`etitle${x}`).value
    const date = document.getElementById (`edate${x}`).value
    const price = document.getElementById (`eprice${x}`).value
    const synopsis = document.getElementById (`esynopsis${x}`).value
    const categorie = document.getElementById (`ecategorie${x}`).value
    const developer = document.getElementById (`edeveloper${x}`).value
    const rating = document.getElementById (`erating${x}`).value
    const image1 = document.getElementById (`eimage1${x}`).value
    const image2 = document.getElementById (`eimage2${x}`).value
    const image3 = document.getElementById (`eimage3${x}`).value
    const image4 = document.getElementById (`eimage4${x}`).value
    const favorite = false
    const published = false

    fetch(`http://localhost:3000/games/${x}`, {
        
        method:"PUT",
        body: JSON.stringify({
            title,
            date,
            price,
            synopsis,
            categorie,
            developer,
            rating,
            favorite,
            published,
            image1,
            image2,
            image3,
            image4
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
}


const eliminarJuego = (id) =>{
    fetch(`http://localhost:3000/games/${id}`, {
      method: 'DELETE',
    });
}

const imprimirFavorito = async (id) =>{

    const resultado = await fetch(`http://localhost:3000/games/${id}`);
    const resultados = await resultado.json();
    const x = document.getElementById(`estrellaFav${id}`)

    if(resultados.favorite){
        x.innerHTML = `<button type="button" class="btn btn-danger"  onclick="quitarFavorito(${id})"><i class="bi bi-star-fill"></i></button>`
    }
    else{
        x.innerHTML = `<button type="button" class="btn btn-danger"  onclick="agregarFavorito(${id})"><i class="bi bi-star"></i></button>`
    }
}

const quitarTodosFavoritos = async () =>{
  const juegos = await getJuegos()
  const favorite = false
  juegos.map(juego => 
   
  fetch(`http://localhost:3000/games/${juego.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        favorite,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
  ))
}

const agregarFavorito = async (id) =>{ 
    await quitarTodosFavoritos();
    const favorite = true

    fetch(`http://localhost:3000/games/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        favorite,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
}

const quitarFavorito = (id) =>{
    
    const favorite = false

    fetch(`http://localhost:3000/games/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        favorite,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })

}

const imprimirPublicado = async (id) =>{

  const resultado = await fetch(`http://localhost:3000/games/${id}`);
  const resultados = await resultado.json();
  const x = document.getElementById(`publicado${id}`)

  if(resultados.published){
      x.innerHTML = `<button type="button" class="btn btn-danger"  onclick="quitarPublicado(${id})"><i class="bi bi-bag-check-fill"></i></button>`
  }
  else{
      x.innerHTML = `<button type="button" class="btn btn-danger"  onclick="agregarPublicado(${id})"><i class="bi bi-bag-check"></i></button>`
  }
}

const agregarPublicado = (id) =>{
    
  const published = true

  fetch(`http://localhost:3000/games/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      published,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
}

const quitarPublicado = (id) =>{
  
  const published = false

  fetch(`http://localhost:3000/games/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      published,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })

}