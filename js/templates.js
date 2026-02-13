
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