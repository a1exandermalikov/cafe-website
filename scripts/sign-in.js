let signinbtn = document.getElementById('signin-button')

const users = JSON.parse(localStorage.getItem('users') || '{}')

signinbtn.onclick = () => {
	let email = document.getElementById('signin-email').value
	let password = document.getElementById('signin-password').value

	if (email in users && users[email].password === password) {
		alert('Вход прошел успешно')
		document.getElementById('signin-email').value = ''
		document.getElementById('signin-password').value = ''
		localStorage.setItem('currentUser', email)
		location.href = '../index.html' // ⬅ Переброс на главную
	} else {
		alert('Неверные данные')
	}
}
