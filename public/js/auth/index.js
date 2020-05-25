const AuthCreate = (event) => {
  event.preventDefault()
  alert("work")
}

const isAdmin = (email) => {
	if (email === "rod7val@gmail.com") {
		return true
	}
	return false
}