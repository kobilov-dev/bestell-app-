
function createBasketHTML(index) {
  const item = cart[index];

  return `
    <div class="basket-item">
      <div class="basket-item-title">
        ${item.qty} x ${item.name}
      </div>

      <div class="basket-item-bottom">
        <div class="basket-qty">
          <button onclick="decreaseQty(${index})">−</button>
          <span>${item.qty}</span>
          <button onclick="increaseQty(${index})">+</button>
        </div>

        <div>
          ${(item.price * item.qty).toFixed(2)}€
          <button onclick="removeItem(${index})">🗑</button>
        </div>
      </div>
    </div>
  `;
}

function createButtonHTML(qty, name) {
  return `
    <span class="added-text" style="color: rgba(231, 108, 31, 1);">
      Added ${qty}
      <span class="btn-plus" data-name="${name}" style="color: rgba(231, 108, 31, 1);">+</span>
    </span>
  `;
}


function renderMobileNav() {
  return `
    <div class="mobile-nav">
      <img src="./assets/logos/Home.png" alt="Home" />
      <img src="./assets/logos/Profile.png" alt="User" />
      <img src="./assets/logos/orders.png" alt="Menu" />
      <div class="cart-icon" onclick="openBasket()">
        <img src="./assets/logos/small-basket.png" alt="Basket" />
        <span id="mobileCartCount" class="cart-count">0</span>
      </div>
    </div>
  `;
}

