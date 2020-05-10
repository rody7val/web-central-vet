// Static Managed Item
const checkout = (event, item) => {
  event.preventDefault()

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
    	window.location.replace(res.init_point);
    }
  })
  .catch(err => {
    alert("err", err)
  })
}