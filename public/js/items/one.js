// Static Managed Item
const qtyChange = (event) => {
  event.preventDefault()
  document.getElementById('cart_qty').value = event.target.value
}

//add item
const addToCart = (event, item) => {
  event.preventDefault()
  shoppingCart.addItemToCart(item.title, Number(item.price), Number(event.target.cart_qty.value), item.qty)
  renderCart()
}

// delete cart
const deleteCart = () => {
  if (confirm("Borrar todos los productos del carro?")) {
    shoppingCart.clearCart()
    renderCart()
    document.getElementById("cart_items").innerHTML = "Sin resultados..."
  }
}

const checkout = (event, item) => {
  event.preventDefault()
  document.getElementById("checkoutBtn").setAttribute("disabled", true)
  document.getElementById("checkoutBtn").value = "cargando..."

  let preference = {
    items: [
      {
      	id: item._id,
        title: item.title,
        unit_price: Number(item.price),
        currency_id: 'ARS',
        quantity: Number(event.target.qty.value),
      }
    ]
  }

  fetch('/api/checkout', {
    method: 'POST',
    body: JSON.stringify(preference),
    headers:{
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    return res.json()
  })
  .then(res => {
    // document.getElementById("checkoutBtn").removeAttribute("disabled")
    if (res.success) {
      window.location.replace(res.init_point)
    }
  })
  .catch(err => {
    alert("err", err)
  })
}


