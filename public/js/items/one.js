// Static Managed Item
const checkout = (event, item) => {
  event.preventDefault()

  let preference = {
    items: [
      {
      	id: item._id,
        title: item.title,
        unit_price: item.price,
        currency_id: 'ARS',
        quantity: event.target.qty.value,
      }
    ]
  }

  fetch('/checkout', {
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
    if (!res.success) {
    	return console.log(res)
    }
    alert("not redirect")
  })
  .catch(err => {
    alert("err", err)
  })

}