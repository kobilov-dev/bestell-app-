const basket = document.getElementById("basket");
const basketItems = document.getElementById("basketItems");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");
const totalBtnEl = document.getElementById("totalBtn");
const closeBasket = document.getElementById("closeBasket");

let cart = [];
const DELIVERY = 4.99;

/* OPEN BASKET */
function openBasket() {
  basket.classList.add("active");
}

/* CLOSE */
closeBasket.addEventListener("click", () => {
  basket.classList.remove("active");
});

/* ADD TO BASKET */
document.querySelectorAll(".menu-item-button").forEach(btn => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);

    const existing = cart.find(item => item.name === name);

    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name, price, qty: 1 });
    }

    openBasket();
    renderCart();
  });
});

/* RENDER */
function renderCart() {
  basketItems.innerHTML = "";

  cart.forEach((item, index) => {
    basketItems.innerHTML += `
      <div class="basket-item">
        <div class="basket-item-title">
          ${item.qty} x ${item.name}
        </div>

        <div class="basket-item-bottom">
          <div class="basket-qty">
            <button onclick="changeQty(${index}, -1)">−</button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${index}, 1)">+</button>
          </div>

          <div>
            ${(item.price * item.qty).toFixed(2)}€
            <button class="basket-remove" onclick="removeItem(${index})">🗑</button>
          </div>
        </div>
      </div>
    `;
  });

  updateTotals();
}

/* CHANGE QTY */
function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  renderCart();
}

/* REMOVE */
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

/* TOTALS */
function updateTotals() {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const total = subtotal + (cart.length ? DELIVERY : 0);

  subtotalEl.textContent = subtotal.toFixed(2) + "€";
  totalEl.textContent = total.toFixed(2) + "€";
  totalBtnEl.textContent = total.toFixed(2) + "€";
}
