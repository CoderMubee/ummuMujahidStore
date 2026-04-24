/* 
---Category Scroll-Hide Effect with fade
---Toggle Product Details
---load Product from data.json
*/
const categorySection = document.querySelector('.store__category');
const categoryHeader = categorySection.querySelector('.category__header');
const categoryItems = categorySection.querySelectorAll('.category__item');
const selectedDisplay = categorySection.querySelector('.category__selected');

selectedDisplay.addEventListener('click', () => {
  categorySection.classList.toggle('active');
});

categoryItems.forEach(item => {
  item.addEventListener('click', () => {
    const selectedCategory = item.textContent.trim();

    selectedDisplay.textContent = "Selected: " + selectedCategory;
    categorySection.classList.remove('active');

    // filter product by selected category 
    filterProducts(selectedCategory);
  });
});

// ----- Toggle Product Details -----
const descriptionBox = document.querySelector('.store__description');
const toggleLink = document.querySelector('.description__toggle');
const extraDetails = document.querySelector('.description__extra');

toggleLink.addEventListener('click', (e) => {
  e.preventDefault();
  extraDetails.classList.toggle('active');
  toggleLink.textContent = extraDetails.classList.contains('active') ? 'See Less' : 'See More';
});

// Collapse automatically when mouse leaves the description box
descriptionBox.addEventListener('mouseleave', () => {
  if (extraDetails.classList.contains('active')) {
    extraDetails.classList.remove('active');
    toggleLink.textContent = 'See More'; // reset link text
  }
});

//-------- load Product from data.json ----------
let allProducts = [];
const productsGrid = document.querySelector(".products__grid");

async function loadProducts() {
  try {
    const response = await fetch("data.json");
    const products = await response.json();

    allProducts = products; // store globally
    displayProducts(allProducts);
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

// product filter function
function filterProducts(category) {
  if (category === "All Products") {
    displayProducts(allProducts);
    return;
  }

  const filtered = allProducts.filter(product =>
    product.category === category
  );

  displayProducts(filtered);
}

// product display function
function displayProducts(products) {
  productsGrid.innerHTML = "";

  products.forEach((product, index) => {
    const productCard = document.createElement("div");
    productCard.classList.add("products__item", "product-card");

    productCard.innerHTML = `
      <span class="product-card__badge product-card__badge--discount">25% Off</span>
      <img src="${product.image_url}" class="product-card__image" alt="${product.name}">
      <div class="product-card__body">
        <h5 class="product-card__title">${product.name}</h5>
        <p class="product-card__price">₦${product.price.toLocaleString()}</p>
        <button class="product-card__button">Add to Cart</button>
      </div>
    `;

    // 🔥 CLICK EVENT
    productCard.addEventListener("click", () => {
      showProductDetails(product);
    });

    productsGrid.appendChild(productCard);
  });
}

loadProducts()

// show product details when card clicked
function showProductDetails(product) {
  document.getElementById("detail-name").textContent =
    product.name || "Not Available";

  document.getElementById("detail-price").textContent =
    product.price ? "₦" + product.price.toLocaleString() : "Not Available";

  document.getElementById("detail-size").textContent =
    product.size || "Not Available";

  document.getElementById("detail-color").textContent =
    product.color || "Not Available";

    // VIDEO LOGIC
  const video = document.getElementById("detail-video");
  const videoSource = document.getElementById("video-source");

  if (product.video_url) {
    videoSource.src = product.video_url;
    video.style.display = "block";
    video.load(); // reload video
  } else {
    video.style.display = "none"; // hide if not available
  }
}

//--------------------
const menuToggleButton = document.querySelector('.store__navbar__anchor');
const storeNavbarUl = document.getElementById('store__navbar__ul');


menuToggleButton.addEventListener('click', () => {
  storeNavbarUl.classList.toggle('hidden');
   
});