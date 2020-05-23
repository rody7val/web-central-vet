// Dynamic Managed API

// get items - GET
const getCategories = () => {
  document.getElementsByClassName("categories")[0].innerHTML = 'cargando...'
  document.getElementsByClassName("categories")[1].innerHTML = 'cargando...'
  fetch('/api/categories')
    .then(res => {
      return res.json()
    })
    .then(res => {
      if (res.success && res.categories.length) {
        return renderCategories(res.categories, "categories")
      }
    document.getElementsByClassName("categories")[0].innerHTML = '<select class="form-control form-control-sm mr-2 mb-3" name="category"><option value="" selected>Categoria...</option></select>'
    document.getElementsByClassName("categories")[1].innerHTML = '<select class="form-control form-control-sm mr-2 mb-3" name="category"><option value="" selected>Categoria...</option></select>'
    })
    .catch(err => {
      console.log(err)
    })
}

// get items - GET
const getItems = () => {
  document.getElementById('items').innerHTML = 'cargando...'
  fetch('/api/items')
    .then(res => {
      return res.json()
    })
    .then(res => {
      console.log(res.items)
      if (res.success && res.items.length) {
        return renderItems(res.items, 'items')
      }
      document.getElementById('items').innerHTML = 'Sin resultados'
    })
    .catch(err => {
      console.log(err)
    })
}

// get items by title - POST
const getItemsSearch = (event, name) => {
  event.preventDefault()
  document.getElementById('items').innerHTML = 'cargando...'

  fetch('/api/items/search', {
    method: 'POST',
    body: JSON.stringify({
      filter_title: event.target.value
    }),
    headers:{
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    return res.json()
  })
  .then(res => {
    if (res.success && res.items.length) {
      return renderItems(res.items, 'items')
    }
    document.getElementById('items').innerHTML = 'Sin resultados'
  })
  .catch(err => {
    console.log(err)
  })
}

// add category - POST
const addCategory = (event) => {
  event.preventDefault()
  // handle btn submit
  document.getElementById("addSubmitCategory").value = "cargando..."
  document.getElementById("addSubmitCategory").setAttribute("disabled", true)

  let category = {
    name: event.target.category.value,
    img: event.target.img.value
  }

  fetch('/api/categories', {
    method: 'POST',
    body: JSON.stringify({ category: category }),
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
      // reset btn submit
      document.getElementById("addSubmitCategory").value = "Guardar"
      document.getElementById("addSubmitCategory").removeAttribute("disabled")
      alert("categoria creada!")
      window.location.reload()
      return
      //return getCategories()
    }
    alert("res", res)
  })
  .catch(err => {
    alert("err", err)
  })
}

// add item - POST
const addItem = (event) => {
  event.preventDefault()

  // handle btn submit
  document.getElementById("addSubmit").value = "cargando..."
  document.getElementById("addSubmit").setAttribute("disabled", true)

  let item = {
    category: event.target.category.value,
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
      alert("producto creado!")
      return window.location.reload()
    }
    alert("res", res)
  })
  .catch(err => {
    alert("err", err)
  })
}

// delete - POST
const deleteByType = (title, type, id) => {
  let _title = title.toUpperCase()
  if (confirm(`Borrar ${_title} ?`)) {
    fetch(`/api/${type}/${id}/delete`, {
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
        alert("Borrado!")
        return window.location.reload()
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
              <a href="/items/${item._id}" class="card">
                <img class="card-img-top" src="${item.img ? item.img : 'https://placekitten.com/300/200'}"/>
              </a>

            </div>
            <div class="col-8 col-md-9 mp0">
              <a href="/items/${item._id}">
                <p class="title-list">${item.title}</p>
              </a>
              <h3 class="price-list">$ ${item.price}</h3>
              <span class="badge badge-warning">${item.category.name}</span>
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

// print categories html
const renderCategories = (data, className) => {
  let options = data.length ? data.map((category, index) => {
    return `
      <option value="${category._id}">${category.name}</option>
    `
    }).join(" ") : ""

  document.getElementsByClassName(className)[0].innerHTML = `
    <select class="form-control form-control-sm mr-2 mb-3" name="category">
      <option value="" selected>Categoria...</option>
        ${options}
    </select>
  `
  document.getElementsByClassName(className)[1].innerHTML = `
    <select class="form-control form-control-sm mr-2 mb-3" name="category">
      <option value="" selected>Categoria...</option>
        ${options}
    </select>
  `
}

const onChangeImage = (event, uploadValue, urlImg, preview ) => {
  const file = event.target.files[0]
  const task = firebase
    .storage()
    .ref(`img/${file.name + Date.now()}`)
    .put(file)
  task.on('state_changed', (snapshot) => {
    let value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    console.log(snapshot)
    document.getElementById(uploadValue).innerHTML = `${value}%`
  }, (error) => {
    console.error(error.message)
  }, () => {
    task.snapshot.ref.getDownloadURL().then(img => {
      console.log(img)
      document.getElementById(urlImg).value = img
      document.getElementById(preview).setAttribute("src", img)
    })
  })
}

// init
//getItems()
//getCategories()