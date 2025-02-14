let list = document.querySelectorAll('.carousel .list .item');
let carousel = document.querySelector('.carousel');
let next = document.getElementById('next');
let prev = document.getElementById('prev');

let mockup = document.querySelector('.mockup');

let count = list.length;
let active = 0;
let leftMockup = 0;
let left_each_item = 100 / (list.length - 1);


next.onclick = () => {
    active = active >= count - 1 ? 0 : active + 1;
    leftMockup = leftMockup + left_each_item;
    carousel.classList.remove('right');
    changeCarousel();
}
prev.onclick = () => {
    active = active <= 0 ? count - 1 : active - 1;
    leftMockup = leftMockup - left_each_item;
    carousel.classList.add('right');
    changeCarousel();
}
function changeCarousel() {
    // find item has class hidden to remove it
    let hidden_old = document.querySelector('.item.hidden');
    if(hidden_old) hidden_old.classList.remove('hidden');

    // find item old active to remove it and add class hidden
    let active_old = document.querySelector('.item.active');
    active_old.classList.remove('active');
    active_old.classList.add('hidden');
    // add class active in position active new
    list[active].classList.add('active');
    // change mockup background
    mockup.style.setProperty('--left', leftMockup + '%');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(()=> {next.click()}, 3000);
}


// auto run 3s
let refreshInterval = setInterval(()=> {next.click()}, 3000);

document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = document.getElementById("cart-count");
    const cartTable = document.getElementById("cart-table");
    const cartTotal = document.getElementById("cart-total");

    function updateCartCount() {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    }

    function addToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        saveCart();
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const name = button.getAttribute("data-name");
            const price = parseFloat(button.getAttribute("data-price"));
            addToCart(name, price);
        });
    });

    if (cartTable) {
        const tbody = cartTable.querySelector("tbody");
        tbody.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td><button class="remove-item" data-index="${index}">X</button></td>
            `;
            tbody.appendChild(row);
        });

        cartTotal.textContent = total.toFixed(2);

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", () => {
                const index = button.getAttribute("data-index");
                cart.splice(index, 1);
                saveCart();
                location.reload();
            });
        });

        document.getElementById("clear-cart").addEventListener("click", () => {
            localStorage.removeItem("cart");
            location.reload();
        });
    }

    updateCartCount();
});

document.addEventListener("DOMContentLoaded", () => {
    // Initialize Swiper for Product Carousel
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: { delay: 2000 },
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // Smooth Fade-in Animation for Homepage Text
    gsap.from("h1", { opacity: 0, y: -50, duration: 1, delay: 0.5 });
});

/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
   navToggle.addEventListener('click', () =>{
      navMenu.classList.add('show-menu')
   })
}

/* Menu hidden */
if(navClose){
   navClose.addEventListener('click', () =>{
      navMenu.classList.remove('show-menu')
   })
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              

    // Swiper for product carousel
    new Swiper('.swiper-container', {
        loop: true,
        autoplay: { delay: 2000 },
        pagination: { el: '.swiper-pagination', clickable: true },
    });

document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = document.getElementById("cart-count");
    const likeButtons = document.querySelectorAll(".like-btn");

    function updateCartCount() {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    }

    function addToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        saveCart();
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const name = button.getAttribute("data-name");
            const price = parseFloat(button.getAttribute("data-price"));
            addToCart(name, price);
        });
    });

    // Like Button Logic
    function loadLikes() {
        likeButtons.forEach(button => {
            const flavor = button.getAttribute("data-flavor");
            const likeCount = button.querySelector(".like-count");
            const likes = JSON.parse(localStorage.getItem("likes")) || {};
            likeCount.textContent = likes[flavor] || 0;
        });
    }

    likeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const flavor = button.getAttribute("data-flavor");
            const likeCount = button.querySelector(".like-count");
            const likes = JSON.parse(localStorage.getItem("likes")) || {};

            likes[flavor] = (likes[flavor] || 0) + 1;
            localStorage.setItem("likes", JSON.stringify(likes));
            likeCount.textContent = likes[flavor];
            button.classList.add("liked");
        });
    });

    loadLikes();
    updateCartCount();
});