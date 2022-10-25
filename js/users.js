const getUsers = async () => {
  const resultado = await fetch('http://localhost:3000/users/');
  const resultados = await resultado.json();
  return resultados;
}

getUsers()

const getUser = async (id) => {
  const resultado = await fetch(`http://localhost:3000/users/${id}`);
  const resultados = await resultado.json();
  return resultados;
}

const imprimirTabla = async () => {
  const users = await getUsers();
  const fila = document.getElementById ("tabla");
  const filas = users.map(user => (`
    <tr>
      <td>${user.id}<img src="./img/404.png"width="0" height="0" onload= "imprimirVerificado(${user.id})"></td>
      <td>${user.name}<img src="./img/404.png"width="0" height="0" onload= "imprimirPermisos(${user.id})"></td>
      <td>${user.surname}</td>
      <td>${user.user}</td>
      <td>${user.email}</td>
      <td>
        <div id="permisos${user.id}">
        </div>
      </td>
      <td>
        <div class="d-flex justify-content-evenly" >                                    
          <div id="verificado${user.id}">
          </div>
          <div>
            <button type="button" class="btn btn-danger"  onclick="eliminarUser(${user.id})"><i class="bi bi-trash"></i></button>
          </div>
        </div>
      </td>
    </tr>
  `)).join('')

  fila.innerHTML = filas
}

imprimirTabla()

const eliminarUser = (id) =>{
  fetch(`http://localhost:3000/users/${id}`, {
    method: 'DELETE',
  });
  location.reload();
}

const imprimirVerificado = async (id) =>{
  const resultado = await fetch(`http://localhost:3000/users/${id}`);
  const resultados = await resultado.json();
  const x = document.getElementById(`verificado${id}`)

  if(resultados.confirm == "verificado"){
    x.innerHTML = `<button type="button" class="btn btn-danger"  onclick="suspender(${id})"><i class="bi bi-person-check-fill"></i></button>`
  }
  else if(resultados.confirm == "pendiente"){
    x.innerHTML = `<button type="button" class="btn btn-danger"  onclick="verificar(${id})"><i class="bi bi-person-plus-fill"></i></button>`
  } else if (resultados.confirm == "suspendido"){
    x.innerHTML = `<button type="button" class="btn btn-danger"  onclick="verificar(${id})"><i class="bi bi-person-x-fill"></i></button>`
  }
}

const verificar = async (id) =>{ 
  const confirm = "verificado"
  const usuarios = await getUser(id)

  fetch(`http://localhost:3000/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      confirm,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  location.reload();
}

const suspender = (id) =>{
  const confirm = "suspendido"
  const usuarios = getUser(id)

  fetch(`http://localhost:3000/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      confirm,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  location.reload();
}

const imprimirPermisos = async (id) =>{
  const resultado = await fetch(`http://localhost:3000/users/${id}`);
  const resultados = await resultado.json();
  const x = document.getElementById(`permisos${id}`)

  if(resultados.role == "admin"){
    x.innerHTML = `<button type="button" class="btn btn-danger"  onclick="hacerUser(${id})"><i class="bi bi-gear-fill"></i></i></button>`
  }
  else if (resultados.role == "usuario"){
    x.innerHTML = `<button type="button" class="btn btn-danger"  onclick="hacerAdmin(${id})"><i class="bi bi-person-fill"></i></button>`
  }
}

const hacerUser = (id) =>{
  const role = "usuario"

  fetch(`http://localhost:3000/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      role,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  location.reload();
}

const hacerAdmin = (id) =>{
  const role = "admin"

  fetch(`http://localhost:3000/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      role,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  location.reload();
}

const cerrarSesion = () =>{
  localStorage.setItem ("role", "nologin")
  window.location.href= "./index.html"
}