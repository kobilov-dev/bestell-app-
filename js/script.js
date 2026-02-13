const basket = document.getElementById("basket");
const basketItems = document.getElementById("basketItems");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");
const totalBtnEl = document.getElementById("totalBtn");
const closeBasket = document.getElementById("closeBasket");

const buttons = document.getElementsByClassName("menu-item-button");

let cart = [];
const DELIVERY = 4.99;

function openBasket() {
  basket.classList.add("active");
}

function closeBasketFn() {
  basket.classList.remove("active");
}

closeBasket.addEventListener("click", closeBasketFn);

function initButtons() {
  let i = 0;
  while (i < buttons.length) {
    buttons[i].addEventListener("click", handleAddClick);
    i++;
  }
}

function handleAddClick(event) {
  const button = event.currentTarget;
  const name = button.dataset.name;
  const price = Number(button.dataset.price);

  addToCart(name, price);
  openBasket();
  renderCart();
  syncButtons();
}

function addToCart(name, price) {
  const index = findItemIndex(name);

  if (index === -1) {
    cart.push({
      name: name,
      price: price,
      qty: 1
    });
  } else {
    cart[index].qty++;
  }
}

function findItemIndex(name) {
  let i = 0;
  while (i < cart.length) {
    if (cart[i].name === name) {
      return i;
    }
    i++;
  }
  return -1;
}

function renderCart() {
  basketItems.innerHTML = "";

  let i = 0;
  while (i < cart.length) {
    basketItems.innerHTML += createBasketHTML(i);
    i++;
  }

  updateTotals();
}


function increaseQty(index) {
  cart[index].qty++;
  renderCart();
  syncButtons();
}

function decreaseQty(index) {
  cart[index].qty--;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  renderCart();
  syncButtons();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
  syncButtons();
}

function updateTotals() {
  let subtotal = 0;
  let i = 0;

  while (i < cart.length) {
    subtotal += cart[i].price * cart[i].qty;
    i++;
  }

  let total = subtotal;
  if (cart.length > 0) {
    total += DELIVERY;
  }

  subtotalEl.textContent = subtotal.toFixed(2) + "€";
  totalEl.textContent = total.toFixed(2) + "€";
  totalBtnEl.textContent = total.toFixed(2) + "€";
}

function syncButtons() {
  let i = 0;

  while (i < buttons.length) {
    const button = buttons[i];
    const name = button.dataset.name;
    const index = findItemIndex(name);

    if (index === -1) {
      button.innerHTML = "Add to basket";
    } else {
      button.innerHTML = `
        <span class="added-text" style="color: rgba(231, 108, 31, 1);">
          Added ${cart[index].qty}
          <span class="btn-plus" data-name="${name}" style="color: rgba(231, 108, 31, 1);">+</span>
        </span>
      `;
    }

    i++;
  }

  initPlusButtons();
}

function handlePlusClick(event) {
  event.stopPropagation();

  const name = event.target.dataset.name;
  const index = findItemIndex(name);

  if (index !== -1) {
    cart[index].qty++;
  }

  renderCart();
  syncButtons();
}



function initPlusButtons() {
  const plusButtons = document.getElementsByClassName("btn-plus");

  let i = 0;
  while (i < plusButtons.length) {
    plusButtons[i].onclick = handlePlusClick;
    i++;
  }
}



initButtons();
