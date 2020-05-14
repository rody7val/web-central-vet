const AuthCreate = (event) => {
  event.preventDefault()
  alert("work")
}

const googleAuth = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithPopup(provider).then(result => {
    fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify({user: result.user}),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => {return res.json()})
    .then(res => {
      if (res.success) {
        window.location.reload(true)
      }else{
        alert("Error")
      }
    }).catch(err => {alert("err", err)})
  }).catch(error => {alert(error)})
}

const googleOut = () => {
	firebase.auth().signOut().then(result => {
    fetch('/api/auth/out', {
      method: 'POST',
      body: JSON.stringify({signOut: true}),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => {return res.json()})
    .then(res => {
      if (res.success) {
        window.location.reload(true)
      }else{
        alert("Error")
      }
    }).catch(err => {alert("err", err)})
  }).catch(error => {
    alert(error)
  })
}

const isAdmin = (email) => {
	if (email === "rod7val@gmail.com") {
		return true
	}
	return false
}