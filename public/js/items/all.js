// Dynamic Managed API
// get items - GET
const getItems = () => {
  document.getElementById('items').innerHTML = 'cargando...'
  fetch('/api/items')
    .then(res => {
      return res.json()
    })
    .then(res => {
      if (res.success && res.data.length) {
        return renderItems(res.data, 'items')
      }
      document.getElementById('items').innerHTML = 'Sin resultados'
    })
    .catch(err => {
      console.log(err)
    })
}

// add item - POST
const addItem = (event) => {
  event.preventDefault()

  // handle btn submit
  document.getElementById("addSubmit").value = "cargando..."
  document.getElementById("addSubmit").setAttribute("disabled", true)

  let item = {
    img: event.target.img.value,
    title: event.target.title.value,
    desc: event.target.desc.value,
    price: Number(event.target.price.value),
    qty: Number(event.target.qty.value)
  }

  fetch('/api/items', {
    method: 'POST',
    body: JSON.stringify({ item: item }),
    headers:{
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    return res.json()
  })
  .then(res => {
    if (res.success) {
      // reset form values
      event.target.reset()
      // reset img preview and uploadValue
      document.getElementById("preview").removeAttribute("src")
      document.getElementById("uploadValue").innerHTML = ""
      // reset btn submit
      document.getElementById("addSubmit").value = "Guardar"
      document.getElementById("addSubmit").removeAttribute("disabled")
      alert("producto creado!")
      return getItems()
    }
    alert("res", res)
  })
  .catch(err => {
    alert("err", err)
  })
}

// delete item - POST
const deleteItem = (title, id) => {
  let _title = title.toUpperCase()
  if (confirm(`Borrar ${_title} ?`)) {
    fetch(`/api/items/${id}/delete`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      }
    })
   .then(res => {
      return res.json()
    })
    .then(res => {
      if (res.success) {
        return getItems()
      }
      alert(res)
    })
    .catch(err => {
      alert(err)
    })
  }
}

// print items html
const renderItems = (data, id) => {
  let butonDelete = (title, id) => { return `
    <span
      class="badge badge-danger badge-pill btn-delete"
      onclick="deleteItem('${title}', '${id}')"
    >&times;</span>
  `}
  let html = data.map((item, index) => {
    return(`
      <li class="list-group-item shadow mp0">
        <div class="container">
          <div class="row mp0">
            <div class="col-4 col-md-3 mp0">
              <a href="/items/${item._id}">
                <img class="img-fluid img-center img-list" src="${item.img}"/>
              </a>
            </div>
            <div class="col-8 col-md-9 mp0">
              <a href="/items/${item._id}">
                <p class="title-list">${item.title}</p>
              </a>
              <h3 class="price-list">$ ${item.price}</h3>
              ${
                isAdmin($user && $user.email ? $user.email : null) ? butonDelete(item.title, item._id) : ""
              }
            </div>
          </div>
        </div>
      </li>`)
    }).join(" ")

  document.getElementById(id).innerHTML = html
}

const onChangeImage = (event) => {
  const file = event.target.files[0]
  const task = firebase
    .storage()
    .ref(`img/${file.name + Date.now()}`)
    .put(file)

  task.on('state_changed', (snapshot) => {
    let value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    console.log(snapshot)
    document.getElementById("uploadValue").innerHTML = `${value}%`
  }, (error) => {
    console.error(error.message)
  }, () => {
    task.snapshot.ref.getDownloadURL().then((img) => {
      document.getElementById("urlImg").value = img
      document.getElementById("preview").setAttribute("src", img)
    })
  })
}

// init
getItems()
