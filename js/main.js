document.addEventListener('DOMContentLoaded', function() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  const cart = document.getElementById('cart');
  const cartItems = document.getElementById('cart-items');
  const total = document.getElementById('total');
  const closeButton = document.getElementById('close-cart');
  // const checkoutButton = document.getElementById('checkout-btn');
  const viewCartButton = document.getElementById('view-cart-btn');
  const badge = document.querySelector('.badge');

  let totalPrice = 0;
  let cartCount = 0;

  // Function to retrieve cart data from localStorage
  function loadCartData() {
    const savedCartItems = localStorage.getItem('cartItems');
    const savedTotalPrice = localStorage.getItem('totalPrice');
    const savedCartCount = localStorage.getItem('cartCount');

    if (savedCartItems) {
      cartItems.innerHTML = savedCartItems.trim(); // Trim any whitespace
      totalPrice = parseFloat(savedTotalPrice) || 0;
      cartCount = parseInt(savedCartCount) || 0;

      total.innerText = `$${totalPrice.toFixed(2)}`;
      badge.textContent = cartCount;
      updateCartDisplay();
    }
  }

  // Function to save cart data to localStorage
  function saveCartData() {
    localStorage.setItem('cartItems', cartItems.innerHTML.trim()); // Trim any whitespace
    localStorage.setItem('totalPrice', totalPrice);
    localStorage.setItem('cartCount', cartCount);
  }

  // Load cart data when the page is loaded
  loadCartData();

  // Hide the cart initially when the window is loaded
  cart.style.display = 'none';

  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const item = this.parentElement;
      const itemName = item.querySelector('a').innerText;
      const itemPrice = parseFloat(item.querySelector('p').innerText.replace('$', ''));
      const itemImage = item.querySelector('img').src;

      let existingCartItem = null;

      // Check if item already exists in cart
      cartItems.childNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const name = node.querySelector('h4').innerText;
          if (name === itemName) {
            existingCartItem = node;
          }
        }
      });

      if (existingCartItem) {
        // If item exists, update quantity and total price
        const quantityElement = existingCartItem.querySelector('.quantity');
        if (quantityElement) {
          let quantity = parseInt(quantityElement.textContent) + 1;
          quantityElement.textContent = quantity;

          const priceElement = existingCartItem.querySelector('.price');
          if (priceElement) {
            const itemTotalPrice = itemPrice * quantity;
            priceElement.textContent = `$${itemTotalPrice.toFixed(2)}`;
          }

          totalPrice += itemPrice;
        }
      } else {
        // If item doesn't exist, create new cart item
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
          <span class="remove-item">&times;</span>
          <div style="display: flex; align-items: center;">
            <img src="${itemImage}" alt="${itemName}" style="width: 60px; height: 60px;">
            <div style="margin-left: 5px;">
              <h4>${itemName}</h4>
              <p class="price">$${itemPrice.toFixed(2)}</p>
              quantity: <button class="quantity-btn minus-btn">-</button>
              <span class="quantity">1</span>
              <button class="quantity-btn plus-btn">+</button>
            </div>
          </div>
        `;
        cartItems.appendChild(cartItem);

        totalPrice += itemPrice;
        cartCount++;
      }

      total.innerText = `$${totalPrice.toFixed(2)}`;
      badge.textContent = cartCount;
      updateCartDisplay();
      saveCartData();
    });
  });

  // Event delegation for remove item buttons and quantity buttons
  cartItems.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-item')) {
      const cartItem = event.target.parentElement;
      const quantityElement = cartItem.querySelector('.quantity');
      const priceElement = cartItem.querySelector('.price');
      if (quantityElement && priceElement) {
        const itemTotalPrice = parseFloat(priceElement.textContent.replace('$', ''));
        totalPrice -= itemTotalPrice;
        total.innerText = `$${totalPrice.toFixed(2)}`;
        cartCount -= parseInt(quantityElement.textContent);

        cartCount = Math.max(cartCount, 0);

        badge.textContent = cartCount;
        cartItem.remove();
        saveCartData();
        updateCartDisplay();
      }
    } else if (event.target.classList.contains('plus-btn')) {
      const quantityElement = event.target.parentElement.querySelector('.quantity');
      let quantity = parseInt(quantityElement.textContent);
      quantity++;
      quantityElement.textContent = quantity;

      const priceElement = event.target.parentElement.parentElement.querySelector('.price');
      if (priceElement) {
        const itemPrice = parseFloat(priceElement.textContent.replace('$', ''));
        totalPrice += itemPrice;
        total.innerText = `$${totalPrice.toFixed(2)}`;
      }
      updateCartDisplay();
      saveCartData();
    } else if (event.target.classList.contains('minus-btn')) {
      const quantityElement = event.target.parentElement.querySelector('.quantity');
      let quantity = parseInt(quantityElement.textContent);
      if (quantity > 1) {
        quantity--;
        quantityElement.textContent = quantity;

        const priceElement = event.target.parentElement.parentElement.querySelector('.price');
        if (priceElement) {
          const itemPrice = parseFloat(priceElement.textContent.replace('$', ''));
          totalPrice -= itemPrice;
          total.innerText = `$${totalPrice.toFixed(2)}`;
        }
      }
    }
    updateCartDisplay();
    saveCartData();
  });

  closeButton.addEventListener('click', function() {
    cart.style.display = 'none';
  });

  viewCartButton.addEventListener('click', function() {
    window.location.href = 'viewcart.html'; // Redirect to the cart page
  });

  // checkoutButton.addEventListener('click', function() {
  //   window.location.href = '/index' // Redirect to the checkout page
  // });

  badge.addEventListener('click', function() {
    if (cart.style.display === 'block') {
      cart.style.display = 'none';
    } else {
      cart.style.display = 'block';
    }
  });

  function updateCartDisplay() {
    // Remove all empty text nodes from cartItems
    const nodes = [...cartItems.childNodes];
    nodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) {
        node.remove();
      }
    });

    if (cartItems.children.length === 0) {
      cart.style.display = 'none';
      total.innerText = "$0.00";
      totalPrice = 0;
    } else {
      cart.style.display = 'block';
    }
  }
});









/*--------- alert code -----*/

 






  /*---product page---*/
  document.addEventListener("DOMContentLoaded", function() {
    const signs = document.querySelectorAll('.sign');
    signs.forEach(sign => {
      sign.addEventListener('click', function() {
        const dropdown = this.nextElementSibling.querySelector('.dropdown-content');
        if (dropdown.style.display === 'block') {
          dropdown.style.display = 'none';
        } else {
          dropdown.style.display = 'block';
        }
      });
    });
  });

  /*---range--*/
  const rangeInput = document.querySelectorAll(".range-input input"),
  priceInput = document.querySelectorAll(".price-input input"),
  range = document.querySelector(".slider .progress");

let priceGap = 1000;

priceInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minPrice = parseInt(priceInput[0].value),
      maxPrice = parseInt(priceInput[1].value);

    if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
      if (e.target.className === "input-min") {
        rangeInput[0].value = minPrice;
        range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
      } else {
        rangeInput[1].value = maxPrice;
        range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
      }
    }
  });
});

rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(rangeInput[0].value),
      maxVal = parseInt(rangeInput[1].value);

    if (maxVal - minVal < priceGap) {
      if (e.target.className === "range-min") {
        rangeInput[0].value = maxVal - priceGap;
      } else {
        rangeInput[1].value = minVal + priceGap;
      }
    } else {
      priceInput[0].value = minVal;
      priceInput[1].value = maxVal;
      range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
    }
  });
});

/*-- short--*/
function sortCards(option) {
    var cardsContainer = document.querySelectorAll('.card-container');
    cardsContainer.forEach(container => {
        var cards = container.querySelectorAll('.card');
        var cardsArray = Array.from(cards);
        cardsArray.sort(function(a, b) {
            var cardTitleA = a.querySelector('.card-title').innerText.toUpperCase();
            var cardTitleB = b.querySelector('.card-title').innerText.toUpperCase();
            if (option === 'A-Z') {
                return (cardTitleA < cardTitleB) ? -1 : (cardTitleA > cardTitleB) ? 1 : 0;
            } else if (option === 'Z-A') {
                return (cardTitleA > cardTitleB) ? -1 : (cardTitleA < cardTitleB) ? 1 : 0;
            }
        });
     
        cardsArray.forEach(card => {
            container.appendChild(card);
        });
    });
}
// Function to set a cookie

