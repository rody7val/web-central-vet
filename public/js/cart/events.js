/*
// *****************************************
// Triggers / Events
// ***************************************** 
// Add item
$('.add-to-cart').click(function(event) {
  event.preventDefault();
  var name = $(this).data('name');
  var price = Number($(this).data('price'));
  shoppingCart.addItemToCart(name, price, 1);
  displayCart();
});

// Clear items
$('.clear-cart').click(function() {
  shoppingCart.clearCart();
  displayCart();
});
*/

const renderCart = () => {
  let cartItems = shoppingCart.listCart()

  let head = `
  <thead>
    <tr class="bg-warning">
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
    <table class="table table-sm shadow">
      ${head + body}
    </table>
  ` : "Vacío..."
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