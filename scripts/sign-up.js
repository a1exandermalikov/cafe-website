let signupbtn = document.getElementById('signup-button')

let users = JSON.parse(localStorage.getItem('users') || '{}')

if (!users['admin@gmail.com']) {
	users['admin@gmail.com'] = { password: 'admin123', cart: [] }
	localStorage.setItem('users', JSON.stringify(users))
}

signupbtn.onclick = () => {
	let email = document.getElementById('signup-email').value
	let password = document.getElementById('signup-password').value

	if (email in users) {
		alert('User already exists')
	} else {
		users[email] = { password: password, cart: [] }
		localStorage.setItem('users', JSON.stringify(users))
		alert('Регистрация прошла успешно')
		document.getElementById('signup-email').value = ''
		document.getElementById('signup-password').value = ''
		window.location.href = '../pages/sign-in.html'
	}
}
