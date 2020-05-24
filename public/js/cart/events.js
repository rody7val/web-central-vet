// copy qty
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
    document.getElementById("cart_items").innerHTML = "Vacío..."
  }
}

// checkout cart
const checkoutCart = (event) => {
  event.preventDefault()
  event.preventDefault()
  // disabled button submit
  document.getElementById("checkoutCartBtn").setAttribute("disabled", true)
  document.getElementById("checkoutCartBtn").value = "cargando..."

  let preference = {}
  preference.items = shoppingCart.listCart().map((item, index) => {
    return {
      title: item.name,
      unit_price: Number(item.price),
      currency_id: "ARS",
      quantity: item.count
    }
  })

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
    if (res.success) {
      // delete cart
      shoppingCart.clearCart()
      // redirect to mercado pago
      window.location.replace(res.init_point)
    }else{
      alert("El carro esta vacío...")
      document.getElementById("checkoutCartBtn").removeAttribute("disabled")
      document.getElementById("checkoutCartBtn").value = "Comprar ahora"
    }
  })
  .catch(err => {
    alert("err", err)
  })
}

// checkout item
const checkout = (event, item) => {
  event.preventDefault()
  // disabled button submit
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
    if (res.success) {
      // delete cart
      shoppingCart.clearCart()
      renderCart()
      document.getElementById("cart_items").innerHTML = "Vacío..."
      // redirect to mercado pago
      window.location.replace(res.init_point)
    }
  })
  .catch(err => {
    alert("err", err)
  })
}

// notification render
const renderAlert = (type, content) => {
  let alert = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${content}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  `
  document.getElementById("alert_content").innerHTML = alert
}

// render cart
const renderCart = () => {
  let cartItems = shoppingCart.listCart()

  let head = `
  <thead>
    <tr class="bg-info" style="color: #efefef;">
      <th scope="col">Producto</th>
      <th class="text-right" scope="col">Precio</th>
      <th class="text-center" scope="col">Cantidad</th>
      <th class="text-right" scope="col">Total</th>
    </tr>
  </thead>
  `
  let body = cartItems.map((item, index) => {
    return(`
      <tr>
        <td>
          <small>${item.name}</small>
        </td>
        <td class="text-right">
          <small>$${item.price}</small>
        </td>
        <td class="text-center">
          <small><span class="badge badge-secondary badge-pill">${item.count}</span></small>
        </td>
        <td class="text-right">
          <small><b>$${item.price * item.count}</b></small>
        </td>
      </tr>
    `)
  }).join(" ")

  document.getElementById("cart_items").innerHTML = cartItems.length ? `
    <table class="table table-sm">
      ${head + body}
    </table>
  ` : "&nbsp; Vacío..."
  document.getElementById("cart_total").innerHTML = shoppingCart.totalCart()
  document.getElementById("cart_count").innerHTML = shoppingCart.lengthCart()
}
renderCart()

/*
// Delete item button

$('.show-cart').on("click", ".delete-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
})


// -1
$('.show-cart').on("click", ".minus-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCart(name);
  displayCart();
})
// +1
$('.show-cart').on("click", ".plus-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.addItemToCart(name);
  displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function(event) {
   var name = $(this).data('name');
   var count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});

displayCart();
*/