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
//renderCart()

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