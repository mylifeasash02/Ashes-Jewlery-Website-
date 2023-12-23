const bar=document.getElementById('mobile-icon');
const close=document.getElementById('close');
const nav=document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', ()=>{
        nav.classList.add('active')
    })
    
}
if (close) {
    close.addEventListener('click', ()=>{
        nav.classList.remove('active')
    })
}

// announcment

function openModal() {
  document.getElementById('announcementModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('announcementModal').style.display = 'none';
}
window.onload = function() {
  openModal();
};




// Contact Page

 document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#contact-form');
    const nameInput = document.querySelector('#name input');
    const emailInput = document.querySelector('#email input');
    const msgInput = document.querySelector('#msg textarea');
    const successMessage = document.querySelector('#success');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      validateForm();
    });
  
    function validateForm() {
      clearErrors();
  
      if (nameInput.value.trim() === '') {
        showError(nameInput, 'Please enter your full name');
      }
  
      if (emailInput.value.trim() === '') {
        showError(emailInput, 'Please enter your email');
      } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid ');
      }
  
      if (msgInput.value.trim() === '') {
        showError(msgInput, '');
      }
  
      if (!hasErrors()) {
        successMessage.textContent = 'Form submitted successfully!';
      }
    }
  
    function showError(input, message) {
      const errorNode = input.parentElement.querySelector('.error');
      errorNode.textContent = message;
    }
  
    function clearErrors() {
      const errorNodes = document.querySelectorAll('.error');
      errorNodes.forEach(function (errorNode) {
        errorNode.textContent = '';
      });
    }
  
    function isValidEmail(email) {
      return email.includes('@');
    }
  
    function hasErrors() {
      const errorNodes = document.querySelectorAll('.error');
      return Array.from(errorNodes).some(function (errorNode) {
        return errorNode.textContent.trim() !== '';
      });
    }
  });
  


// Add to cart Page


document.addEventListener('DOMContentLoaded', function () {
    const products = document.querySelectorAll('.shop-btn');
    const cartContainer = document.getElementById('cart-icon');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const subtotalContainer = document.getElementById('subtotal');
    const couponInput = document.querySelector('#coupon input');
    const applyCouponBtn = document.getElementById('apply-coupon-btn');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Function to update the cart icon
    function updateCartIcon() {
        cartContainer.innerHTML = `<i class="fas fa-shopping-cart"></i> Cart (${cart.length})`;
    }

    // Function to render the cart items
    function renderCart() {
        // Clear previous cart items
        cartItemsContainer.innerHTML = '';

        // Render each item in the cart
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <p>${item.name} - $${item.price} - Quantity: ${item.quantity}</p>
          <button class="delete-btn" data-id="${item.id}">Delete</button>
        `;

            cartItemsContainer.appendChild(cartItem);
        });

        // Update the cart icon
        updateCartIcon();

        // Add event listeners to delete buttons
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function () {
                const itemId = parseInt(button.getAttribute('data-id'), 10);
                removeItemFromCart(itemId);
            });
        });

        // Calculate and display Cart Total and Subtotal
        calculateCartTotal();
    }

    // Function to remove item from the cart
    function removeItemFromCart(itemId) {
        cart = cart.filter(item => item.id !== itemId);

        // Save the cart data to local storage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Render the updated cart
        renderCart();
    }

    // Function to add or update items in the cart
    function addToCart(item) {
        const existingItem = cart.find(i => i.id === item.id);

        if (existingItem) {
            // Item already exists, increment quantity
            existingItem.quantity++;
        } else {
            // Item does not exist, add to cart
            item.quantity = 1;
            cart.push(item);
        }

        // Save the cart data to local storage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Render the updated cart
        renderCart();
    }

    // Function to calculate and display Cart Total and Subtotal
    function calculateCartTotal() {
        let subtotal = 0;

        // Calculate subtotal
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
        });

        const total= document.getElementById('total')

        // Display Cart SubTotal and Total
        subtotalContainer.querySelector('td:nth-child(2)').textContent = `$${subtotal.toFixed(2)}`;
       total.textContent = `$${subtotal.toFixed(2)}`;
    }

    // Add event listeners to product buttons
    products.forEach((product, index) => {
        product.addEventListener('click', function () {
            // Example product data
            const productData = {
                id: index,
                name: document.querySelectorAll('.shop-h2')[index].innerText,
                price: parseFloat(document.querySelectorAll('.price')[index].innerText.slice(1)),
                image: document.querySelectorAll('.shop-img')[index].src,
                quantity: 0, // Will be incremented later
            };

            // Add product to the cart array
            addToCart(productData);
        });
    });
    // Featured Pro
    const featuredproducts = document.querySelectorAll('.add-to-cart-btn');
    featuredproducts.forEach((featuredproducts, index) => {
      featuredproducts.addEventListener('click', function () {
          // Example product data
          const featuredproductsData = {
              id: index,
              name: document.querySelectorAll('h3')[index].innerText,
              price: parseFloat(document.querySelectorAll('.price')[index].innerText.slice(1)),
              image: document.querySelectorAll('.featured-img')[index].src,
              quantity: 0, // Will be incremented later
          };

          // Add product to the cart array
          addToCart(featuredproductsData);
      });
  });


    // Load cart data from local storage on page load
    const storedCart = localStorage.getItem('cart');
    const initialCart = storedCart ? JSON.parse(storedCart) : [];
    // Use initialCart to initialize your cart array
    let cart = initialCart;

    // Render the initial cart
    renderCart();

  // Checkout
});

function placeOrder() {
  const fullName = document.getElementById("fullName").value;
  const address = document.getElementById("address").value;
  const contact = document.getElementById("contact").value;

  // Validate the form fields
  if (!fullName || !address || !contact) {
      alert("Please fill out all fields.");
      return;
  }

  // Display order summary
  const orderSummary = `
      Order Placed Successfully!\n\n
      Full Name: ${fullName}\n
      Address: ${address}\n
      Contact Number: ${contact}\n\n
      Thank you for your order!
  `;

  alert(orderSummary);

  // Reset the form
  document.getElementById("orderForm").reset();
}


  

  
// Function to update the current time
function updateCurrentTime() {
    var currentTimeElement = document.getElementById("time");
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    var formattedTime = hours + ":" + minutes + ":" + seconds;

    currentTimeElement.textContent = formattedTime;
}
updateCurrentTime();

setInterval(updateCurrentTime, 1000);


