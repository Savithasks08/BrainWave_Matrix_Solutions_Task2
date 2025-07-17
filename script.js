const products = [
  { id: 1, name: "Disney Lilo Stitch Stickers", price: 50, image: "https://i.etsystatic.com/23031570/r/il/844ae4/3970163866/il_fullxfull.3970163866_h9js.jpg" },
  { id: 2, name: "Hello Kitty Stickers", price: 60, image: "https://m.media-amazon.com/images/I/71taMaaC0wL.jpg" },
  { id: 3, name: "Cute Cactus Stickers", price: 20, image: "https://static.vecteezy.com/system/resources/previews/010/549/897/original/cute-stickers-pack-of-kawaii-doodles-cactus-in-pots-baby-cacti-kids-illustration-in-cartoon-style-succulents-gardening-homeplants-vector.jpg" },
  { id: 4, name: "Cactus Stickers", price: 30, image: "https://i.etsystatic.com/41865190/r/il/437b47/4831116157/il_794xN.4831116157_9e7q.jpg" },
  { id: 5, name: "Aesthetic Blue Stickers", price: 50, image: "https://i.pinimg.com/originals/a6/f5/59/a6f5597534d63f327ddc1a376f36571d.jpg"},
  { id: 6, name: "Blue Stickers", price: 30, image: "https://i.pinimg.com/474x/b4/35/1b/b4351b86fcca99e7918c075867974850.jpg" },
  { id: 7, name: "Vintage Stickers", price: 100, image: "https://m.media-amazon.com/images/I/814tscpLvgL._SL1500_.jpg" },
  { id: 8, name: "Kawaii Food Stickers", price: 80, image: "https://static.vecteezy.com/system/resources/previews/010/721/254/original/kawaii-food-stickers-set-free-vector.jpg" },
  { id: 9, name: "Positive Mind Stickers", price: 50, image: "https://stickaroo.com/cdn/shop/files/Positive-mind-laptop-set....jpg?v=1683207334&width=480" },
  { id: 10, name: "Black and white Stickers", price: 40, image: "https://i.ebayimg.com/images/g/Zo8AAOSwIotfWZ8q/s-l1600.jpg" },
  { id: 11, name: "Unicorn Stickers", price: 60, image: "https://i.etsystatic.com/40331685/r/il/d5e17b/5393852397/il_794xN.5393852397_lg8b.jpg" },
  { id: 12, name: "Minimalist Stickers", price: 100, image: "https://m.media-amazon.com/images/I/71zORglA4uL.jpg" },
  { id: 13, name: "Cute Dinosaurs Stickers", price: 100, image: "https://img.freepik.com/premium-vector/cute-dinosaurs-printable-stickers-clipart-vector-illustration-set_953968-1004.jpg"},
  { id: 14, name: "Funny Cat Meme Stickers", price: 100, image: "https://down-ph.img.susercontent.com/file/id-11134207-7r98p-lqg1oruf9czcca"},
  { id: 15, name: "Funny Dog Stickers", price: 150, image: "https://m.media-amazon.com/images/I/81IzP+gYdSL._AC_SL1500_.jpg"},
  { id: 16, name: "Cute Dog Stickers", price: 50, image: "https://i.etsystatic.com/19765352/r/il/09e60d/1922301506/il_fullxfull.1922301506_fkj4.jpg"},
  { id: 17, name: "Spider man Stickers", price: 100, image: "https://images-na.ssl-images-amazon.com/images/I/71Sd-XQDyaL._AC_SL1000_.jpg" },
  { id: 18, name: "Cars Stickers", price: 80, image: "https://th.bing.com/th/id/R.6ecb21b11ab38907de608095c9cd1d08?rik=ImlR7uIxF%2b1C1Q&riu=http%3a%2f%2fwww.supercoloring.com%2fsites%2fdefault%2ffiles%2ffif%2f2016%2f12%2fset-of-pop-art-cars-printable-stickers-paper-craft.png&ehk=sVra8eSg4RZvCsF%2bwi5tWHkA%2blHEIRUT8UHEBH%2fD5Vg%3d&risl=&pid=ImgRaw&r=0" },
  { id: 19, name: "Shinchan Stickers", price: 50, image: "https://cf.shopee.ph/file/27025d5e0e50dc6935ec7a286c5f613d" },
  { id: 20, name: "Doraemon Stickers", price: 50, image: "https://salt.tikicdn.com/cache/w1200/ts/product/b1/04/65/81dc1236915fb7122e01dc195ffd4f07.jpg" },
];

//Render products
function renderProducts(list) {
  const productList = document.getElementById('product-list');
  if (productList) {
    productList.innerHTML = "";
    list.forEach(product => {
      const div = document.createElement('div');
      div.classList.add('product');
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" onclick="viewProduct(${product.id})">
        <h3>${product.name}</h3>
        <p>Rs.${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productList.appendChild(div);
    });
  }
}
renderProducts(products);

//Search
document.getElementById('searchInput')?.addEventListener('input', function() {
  const term = this.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(term));
  renderProducts(filtered);
});

//Sort
document.getElementById('sortSelect')?.addEventListener('change', function() {
  let sorted = [...products];
  if (this.value === "price-asc") sorted.sort((a,b) => a.price - b.price);
  if (this.value === "price-desc") sorted.sort((a,b) => b.price - a.price);
  if (this.value === "name-asc") sorted.sort((a,b) => a.name.localeCompare(b.name));
  if (this.value === "name-desc") sorted.sort((a,b) => b.name.localeCompare(a.name));
  renderProducts(sorted);
});

//Add to Cart
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let product = products.find(p => p.id === id);
  let existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}

//View Product Details
function viewProduct(id) {
  const product = products.find(p => p.id === id);
  alert(`Name: ${product.name}\nPrice: Rs.${product.price}\n`);
}

//Display Cart
const cartItemsDiv = document.getElementById('cart-items');
if (cartItemsDiv) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach(item => {
      const div = document.createElement('div');
      div.innerHTML = `
        <p>${item.name} x ${item.qty} - Rs.${item.price * item.qty}</p>
        <button onclick="removeItem(${item.id})">Remove</button>
      `;
      cartItemsDiv.appendChild(div);
    });
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    document.getElementById('total').innerText = `Total: Rs.${total}`;
  }
}

//Remove item
function removeItem(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload();
}
//Show cart count in header
const cartLink = document.getElementById('cart-link');
if (cartLink) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  if (count > 0) {
    cartLink.textContent = `🛒 Cart (${count})`;
  }
}

//Checkout form
document.getElementById('checkoutForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const address = document.getElementById('address').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!name || !address || !email) {
    alert("Please fill out all fields correctly.");
    return;
  }

  localStorage.removeItem('cart');
  document.getElementById('confirmation').innerHTML = `<h2>Thank you for your order, ${name}!</h2>`;
  this.reset();
});
