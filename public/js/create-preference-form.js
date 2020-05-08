const createPreference = (event) => {
  event.preventDefault()

  let item = {
    title: event.target.title.value,
    quantity: Number(event.target.qty.value),
    currency_id: event.target.currency_id.value,
    unit_price: Number(event.target.price.value)
  }

  let data = {
    items: [item]
  }

  fetch("http://localhost:8000/api/create/preference", {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(res => printResponse(res))
  .catch(err => printResponse(err))
  
  return false
}

const printResponse = (obj) => {
	document.getElementById('response').innerHTML = JSON.stringify(obj)
  document.getElementById('link').href = obj.data
  document.getElementById('link').innerHTML = "Pagar"
}