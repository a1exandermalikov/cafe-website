let signinbtn = document.getElementById('signin-button')

// Добавляем админа, если его нет
let users = JSON.parse(localStorage.getItem('users') || '{}')

if (!users['admin@gmail.com']) {
	users['admin@gmail.com'] = { password: 'admin123', cart: [] }
	localStorage.setItem('users', JSON.stringify(users))
}

signinbtn.onclick = () => {
	let email = document.getElementById('signin-email').value
	let password = document.getElementById('signin-password').value

	if (email in users && users[email].password === password) {
		alert('Вход прошел успешно')
		localStorage.setItem('currentUser', email)
		if (email === 'admin@gmail.com') {
			console.log(email)
			window.location.href = 'admin-panel.html'
		} else {
			document.getElementById('signin-email').value = ''
			document.getElementById('signin-password').value = ''
			window.location.href = '../index.html'
		}
	} else {
		alert('Неверные данные')
	}
}
