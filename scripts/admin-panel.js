const form = document.getElementById('product-form')
const nameInput = document.getElementById('name')
const imageUrlInput = document.getElementById('image-url')
const priceInput = document.getElementById('price')
const productList = document.getElementById('product-list')

let products = JSON.parse(localStorage.getItem('products') || '[]')

function renderProducts() {
	productList.innerHTML = ''
	products.forEach((product, index) => {
		productList.innerHTML += `
				<div class="product-item">
					<img src="${product.image}" alt="${product.name}">
					<h3>${product.name}</h3>
					<p>$${product.price}</p>
					<button onclick="deleteProduct(${index})">Delete</button>
				</div>
			`
	})
}

function deleteProduct(index) {
	products.splice(index, 1)
	localStorage.setItem('products', JSON.stringify(products))
	renderProducts()
}

form.onsubmit = e => {
	e.preventDefault()
	const name = nameInput.value.trim()
	const image = imageUrlInput.value.trim()
	const price = parseFloat(priceInput.value)

	if (!name || !image || isNaN(price)) {
		alert('Please fill all fields correctly')
		return
	}

	products.push({ name, image, price: price.toFixed(2) })
	localStorage.setItem('products', JSON.stringify(products))
	renderProducts()
	form.reset()
}

renderProducts()
