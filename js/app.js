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
  const results = await fetch('http://localhost:3000/user');
  const users = await results.json()
  const user = users.find(user => user.user === userType);

  if (user.password === passwordType) {
    localStorage.setItem('role', user.role)
    window.location.href = './admin.html'
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

  fetch('http://localhost:3000/user', {
    method: 'POST',
    body: JSON.stringify({
      name,
      surname,
      user,
      email,
      password
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  alert('Usuario creado con exito')
}












