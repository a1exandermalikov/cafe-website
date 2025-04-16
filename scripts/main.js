let users = JSON.parse(localStorage.getItem('users') || '{}')

if (!users['admin@gmail.com']) {
	users['admin@gmail.com'] = { password: 'admin123', cart: [] }
	localStorage.setItem('users', JSON.stringify(users))
}

const cart = document.getElementById('cart')
const allProducts = JSON.parse(localStorage.getItem('products') || '[]')

function productsItem(name, image, price) {
	return `<div class="product-card">
						<div class="product-card__image">
							<img
								src="${image}"
								alt="latte"
							/>
						</div>
						<div class="product-card__text">
							<h3 class="product-title">${name}</h3>
							<p class="product-price">$${price}</p>
							<button
								onclick="add(this)"
								class="product-card__button"
								data-name="${name}"
								data-price="${price}"
							>
								Add
							</button>
						</div>
					</div>`
}

function renderProducts() {
	const productsContainer = document.getElementById('products')
	productsContainer.innerHTML = ''

	allProducts.forEach(product => {
		productsContainer.innerHTML += productsItem(
			product.name,
			product.image,
			product.price
		)
	})
}

renderProducts()

function cartItem(name, price, count = 1) {
	const total = (price * count).toFixed(2)
	return `
		<div class="cart-item" data-name="${name}" data-price="${price}">
			<div>
				<p class="cart-item__title">${name}</p>
				<div class="cart-item__controls">
					<button class="cart-item__button minus">−</button>
					<span class="cart-item__count">${count}</span>
					<button class="cart-item__button plus">+</button>
					<button class="cart-item__button delete">🗑</button>
				</div>
			</div>
			<p class="cart-item__total">$${total}</p>
		</div>`
}

function renderCart() {
	cart.innerHTML = ''
	const currentUser = localStorage.getItem('currentUser')
	const userCart = users[currentUser]?.cart || []

	let grandTotal = 0

	userCart.forEach(item => {
		cart.innerHTML += cartItem(item.name, item.price, item.count)
		grandTotal += item.price * item.count
	})

	// Обновляем общий тотал
	const totalEl = document.getElementById('total-price')
	if (totalEl) totalEl.textContent = '$' + grandTotal.toFixed(2)

	// Подключаем кнопки
	cart.querySelectorAll('.cart-item').forEach(item => {
		const name = item.getAttribute('data-name')
		item.querySelector('.plus').onclick = () => updateCount(name, 1)
		item.querySelector('.minus').onclick = () => updateCount(name, -1)
		item.querySelector('.delete').onclick = () => deleteItem(name)
	})
}

function add(e) {
	const productName = e.getAttribute('data-name')
	const productPrice = parseFloat(e.getAttribute('data-price'))
	const currentUser = localStorage.getItem('currentUser')
	const userCart = users[currentUser].cart

	const existing = userCart.find(item => item.name === productName)

	if (existing) {
		existing.count = (existing.count || 1) + 1
	} else {
		userCart.push({
			name: productName,
			price: productPrice,
			count: 1,
		})
	}

	localStorage.setItem('users', JSON.stringify(users))
	renderCart()
}

function updateCount(name, delta) {
	const currentUser = localStorage.getItem('currentUser')
	const userCart = users[currentUser].cart
	const item = userCart.find(i => i.name === name)

	if (!item) return

	item.count = (item.count || 1) + delta

	if (item.count <= 0) {
		const index = userCart.indexOf(item)
		userCart.splice(index, 1)
	}

	localStorage.setItem('users', JSON.stringify(users))
	renderCart()
}

function deleteItem(name) {
	const currentUser = localStorage.getItem('currentUser')
	const userCart = users[currentUser].cart
	const index = userCart.findIndex(i => i.name === name)
	if (index !== -1) userCart.splice(index, 1)

	localStorage.setItem('users', JSON.stringify(users))
	renderCart()
}

if ('currentUser' in localStorage) {
	const currentUser = localStorage.getItem('currentUser')
	document.querySelector('nav').innerHTML = `
		<span>${currentUser}</span>
		<button class="logout-button">Logout</button>
	`

	renderCart()

	document.querySelector('.logout-button').onclick = () => {
		localStorage.removeItem('currentUser')
		location.href = '../index.html'
	}
} else {
	document.querySelector('nav').innerHTML = `
		<button onclick="window.location.href='./pages/sign-in.html'">Sign In</button>
		<button onclick="window.location.href='./pages/sign-up.html'">Sign Up</button>`
}
