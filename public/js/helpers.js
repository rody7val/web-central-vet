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