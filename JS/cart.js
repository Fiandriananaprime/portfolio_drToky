const courses = [
  {
    id: 1,
    title: "Javascript for beginners",
    description:
      "Javascript made easy as your first language. This video walks you through the basic mechanism of algorithms, loops, conditions, functions, JS modules, unit tests, and modern syntax perfect for starters",
    creationDate: new Date("2026-01-01"),
    thumbnail: "https://picsum.photos/400",
    price: 120000,
    level: "beginner",
    language: "en",
    technologies: ["javascript"],
  },
  {
    id: 2,
    title: "Java for beginners",
    description:
      "A simple course for true beginners in Java. Learn OOP fundamentals: classes, objects, encapsulation, inheritance, polymorphism, abstraction to understand the basics of Java.",
    creationDate: new Date("2026-01-01"),
    thumbnail: "https://picsum.photos/400",
    price: 220000,
    level: "beginner",
    language: "en",
    technologies: ["java"],
  },
  {
    id: 3,
    title: "Relational Databases for beginners",
    description:
      "Understand how relational databases really work. This course introduces tables, primary keys, foreign keys, constraints, normalization, ER diagrams, and SQL basics.",
    creationDate: new Date("2026-01-01"),
    thumbnail: "https://picsum.photos/400",
    price: 180000,
    level: "beginner",
    language: "fr",
    technologies: ["sql"],
  },
  {
    id: 4,
    title: "Git & Version Control Essentials",
    description:
      "Master Git from scratch. Learn repositories, commits, branches, merging, rebasing, resolving conflicts, and collaborating with remote repositories like GitHub.",
    creationDate: new Date("2026-01-01"),
    thumbnail: "https://picsum.photos/400",
    price: 95000,
    level: "beginner",
    language: "en",
    technologies: [],
  },
  {
    id: 5,
    title: "Operating Systems Fundamentals",
    description:
      "Discover how operating systems manage processes, memory, files, threads, and scheduling. Understand the difference between user space and kernel space, concurrency basics.",
    creationDate: new Date("2026-01-01"),
    thumbnail: "https://picsum.photos/400",
    price: 200000,
    level: "intermediate",
    language: "fr",
    technologies: [],
  },
  {
    id: 6,
    title: "Technical English for Developers",
    description:
      "Improve your English for the tech world. Learn essential vocabulary for programming, documentation, meetings, presentations, and job interviews.",
    creationDate: new Date("2026-01-01"),
    thumbnail: "https://picsum.photos/400",
    price: 85000,
    level: "beginner",
    language: "mg",
    technologies: [],
  },
  {
    id: 7,
    title: "Professional French Communication",
    description:
      "Strengthen your French for academic and professional environments. Focus on formal writing, presentations, technical explanations, and clear structured arguments.",
    creationDate: new Date("2026-01-01"),
    thumbnail: "https://picsum.photos/400",
    price: 80000,
    level: "beginner",
    language: "mg",
    technologies: [],
  },
  {
    id: 8,
    title: "SEO Fundamentals for Web Developers",
    description:
      "Learn how search engines work and how to optimize websites for visibility. Cover keywords, technical SEO, performance optimization, metadata, and structured data.",
    creationDate: new Date("2026-01-01"),
    thumbnail: "https://picsum.photos/400",
    price: 150000,
    level: "intermediate",
    language: "en",
    technologies: ["javascript"],
  },
  {
    id: 9,
    title: "Spring Boot for Backend Development",
    description:
      "Build modern REST APIs with Spring Boot. Learn dependency injection, controllers, services, JPA, security basics, validation, and scalable backend architecture.",
    creationDate: new Date("2026-01-01"),
    thumbnail: "https://picsum.photos/400",
    price: 250000,
    level: "advanced",
    language: "fr",
    technologies: ["java"],
  },
];
const cartList = document.getElementById("cartList");
let alertTimeout = null;
let confirmTimeout = null;

const closeAlertBtn = document.getElementById("closeAlert");
if (closeAlertBtn) {
  closeAlertBtn.addEventListener("click", () => {
    const confBox = document.getElementById("confirm");
    if (confBox) {
      confBox.classList.remove("show");
    }
    if (confirmTimeout) {
      clearTimeout(confirmTimeout);
      confirmTimeout = null;
    }

    const alertBox = document.getElementById("alert");
    if (alertBox) {
      alertBox.classList.remove("show");
    }
    if (alertTimeout) {
      clearTimeout(alertTimeout);
      alertTimeout = null;
    }
  });
}

let timeOut;
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  cartList.innerHTML = updateCartCount();
});
if (cartList) {
  cartList.addEventListener("click", (e) => {
    const removeBtn = e.target.closest(".remove-btn");
    if (removeBtn) {
      const id = parseInt(removeBtn.dataset.id);
      removeFromCart(id);
      return;
    }
    const confirmBtn = e.target.closest("#confirmOrder");

    if (confirmBtn) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (cart.length === 0) {
        showAlert("Your cart is empty");
        return;
      }
      localStorage.setItem("cart", JSON.stringify([]));
      if (cartList) {
        cartList.innerHTML = updateCartCount();
      } else {
        updateCartCount();
      }
      closeCart();
      const conf = document.getElementById("confirm");
      if (conf) {
        conf.classList.add("show");
        // clear any previous confirm timeout
        if (confirmTimeout) {
          clearTimeout(confirmTimeout);
          confirmTimeout = null;
        }
        confirmTimeout = setTimeout(() => {
          conf.classList.remove("show");
          confirmTimeout = null;
        }, 5000);
      }
      return;
    }
    const closeBtn = e.target.closest("#closeCart");
    if (closeBtn) {
      e.stopPropagation();
      closeCart();
      return;
    }
  });
}
const cartButton = document.querySelectorAll(".cartBtn");
const cartToggle = document.querySelector(".cart");
const menuBtn = document.getElementById("menuBtn");
menuBtn.addEventListener("click", () => {
  const navMenu = document.getElementById("navMenu");
  if (navMenu) {
    navMenu.classList.toggle("hidden");
  }
});

function showAlert(message) {
  const alertBox = document.getElementById("alert");
  if (!alertBox) return;
  alertBox.classList.add("show");
  alertBox.innerHTML = `<div class="flex items-center gap-3 bg-red-600 text-white p-3 rounded-lg shadow">
    <i class="fa-solid fa-triangle-exclamation text-xl"></i>
    <span class="text-sm">${message}</span>
  </div>
  `;
  if (alertTimeout) {
    clearTimeout(alertTimeout);
    alertTimeout = null;
  }
  alertTimeout = setTimeout(() => {
    alertBox.classList.remove("show");
    alertTimeout = null;
  }, 1500);
}
if (cartToggle) {
  cartToggle.addEventListener("click", (e) => {
    if (!cartList) return;
    cartList.style.display =
      cartList.style.display === "block" ? "none" : "block";
    if (timeOut) clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      if (
        cartList &&
        !cartList.matches(":hover") &&
        !(cartToggle && cartToggle.matches(":hover"))
      ) {
        cartList.style.display = "none";
      }
    }, 5000);
  });
}
if (cartList) {
  cartList.addEventListener("mouseenter", () => {
    if (timeOut) clearTimeout(timeOut);
  });
  cartToggle.addEventListener("mouseenter", () => {
    if (!cartList) return;
    if (cartList.style.display === "block") {
      if (timeOut) clearTimeout(timeOut);
    }
  });

  cartToggle.addEventListener("mouseleave", () => {
    if (!cartList) return;
    if (cartList.style.display === "block") {
      if (timeOut) clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        if (
          cartList &&
          !cartList.matches(":hover") &&
          !(cartToggle && cartToggle.matches(":hover"))
        ) {
          cartList.style.display = "none";
        }
      }, 5000);
    }
  });

  cartList.addEventListener("mouseleave", () => {
    timeOut = setTimeout(() => {
      if (
        cartList &&
        !cartList.matches(":hover") &&
        !(cartToggle && cartToggle.matches(":hover"))
      ) {
        cartList.style.display = "none";
      }
    }, 5000);
  });
}
function addToCart(id) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!cart.includes(id)) {
    cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    cartList.innerHTML = updateCartCount();
    cartList.style.display = "block";
    if (timeOut) clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      if (
        cartList &&
        !cartList.matches(":hover") &&
        !(cartToggle && cartToggle.matches(":hover"))
      ) {
        cartList.style.display = "none";
      }
    }, 5000);
  } else {
    showAlert("Course is already in the cart");
  }
}
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartBtn =
    document.getElementById("cart") || document.querySelector(".cart");
  if (!cartBtn) return;
  cartBtn.setAttribute("data-count", String(cart.length));

  let cartContent = "";

  if (cart.length === 0) {
    cartList.style.display = "none";
    cartContent = `<p class="text-gray-500">Your cart is empty.</p>`;
  } else {
    cartContent = `
      <ul class="text-dark  flex flex-col gap-2">
        ${cart
          .map(
            (id) => `
          <li class="flex justify-between items-center">
            <span class="text-sm">${courses.find((c) => c.id === id)?.title}</span>
            <div class="flex items-center justify-end">
            <span class="text-sm font-bold">${courses.find((c) => c.id === id)?.price.toLocaleString("fr-FR")} Ar</span>
            <button class="remove-btn" data-id="${id}">
              <i class="fa-solid fa-trash text-light text-sm "></i>
            </button>
            </div>
          </li>`,
          )
          .join("")}
      </ul>
    `;
  }

  return `
  <div class="flex justify-between items-center mb-4 w-full">
    <h2 class=" font-bold  text-dark">Your cart</h2>
    <button id="closeCart" class="text-muted hover:text-red"><i class="fa-solid fa-times"></i></button>
  </div>
    ${cartContent}
    <hr class="border-t border-gray-300 my-1">
    <div class="flex flex-col items-center mt-2">
    <div class="flex justify-between items-center mt-2 w-full">
      <span class="text-sm text-muted">Total:</span><span class="text-sm font-bold">${getCartTotal().toLocaleString("fr-FR")} Ar</span>
    </div>
      <button id="confirmOrder" class="mt-4 w-[90%] bg-red text-white py-1 rounded-2xl hover:bg-dark transition">Confirm Order</button>
    </div>
   `;
}
function getCartTotal() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.reduce((total, id) => {
    const course = courses.find((c) => c.id === id);
    return total + (course ? course.price : 0);
  }, 0);
}
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((itemId) => itemId !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  cartList.innerHTML = updateCartCount();
}
function closeCart() {
  if (!cartList) return;
  clearTimeout(timeOut);
  cartList.style.display = "none";
}
cartList.innerHTML = updateCartCount();
