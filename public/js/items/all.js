window.load = false

// get items - GET
const getItems = () => {
  document.getElementById('items').innerHTML = 'cargando...'
  fetch('/api/items')
    .then(res => {
      return res.json()
    })
    .then(res => {
    	console.log(res.data)
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

  let item = {
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
      event.target.reset()
      alert("producto creado!")
      return getItems()
    }
    alert(res)
  })
  .catch(err => {
    alert(err)
  })
}

const deleteItem = (id) => {
  if (confirm(`Borrar ${id} ?`)) {
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
        alert("producto borrado!")
        return getItems()
      }
      alert(res)
    })
    .catch(err => {
      alert(err)
    })
  }
}

// print html
const renderItems = (data, id) => {
  let html = data.map((item, index) => {
    return(`
      <li class="list-group-item mp0">
        <div class="container-fluid">
          <div class="row">
            <div class="col-4 col-md-3 mp0">
              <img class="img-fluid img-center img-list" src="https://placekitten.com/160/220"/>
            </div>
            <div class="col-8 col-md-9">
              <p class="lead title-list">${item.title}</p>
              <h3>$ ${item.price}</h3>
              <a class="btn btn-primary btn-sm" href="${item.init_point}">Pagar</a>
              <span class="badge badge-danger badge-pill btn-delete" onclick="deleteItem('${item._id}')">borrar</span>
            </div>
          </div>
        </div>
      </li>`)
    }).join(" ");

  document.getElementById(id).innerHTML = html;
}

// init
getItems()
