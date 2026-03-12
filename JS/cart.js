const courses = [
    { id: 1, title: 'Javascript for beginners', description: 'Javascript made easy as your first language. This video walks you through the basic mechanism of algorithms, loops, conditions, functions, JS modules, unit tests, and modern syntax perfect for starters', creationDate: new Date('2026-01-01'), thumbnail: 'https://picsum.photos/400', price: 120000, level: 'beginner', language: 'en', technologies: ['javascript'] },
    { id: 2, title: 'Java for beginners', description: 'A simple course for true beginners in Java. Learn OOP fundamentals: classes, objects, encapsulation, inheritance, polymorphism, abstraction to understand the basics of Java.', creationDate: new Date('2026-01-01'), thumbnail: 'https://picsum.photos/400', price: 220000, level: 'beginner', language: 'en', technologies: ['java'] },
    { id: 3, title: 'Relational Databases for beginners', description: 'Understand how relational databases really work. This course introduces tables, primary keys, foreign keys, constraints, normalization, ER diagrams, and SQL basics.', creationDate: new Date('2026-01-01'), thumbnail: 'https://picsum.photos/400', price: 180000, level: 'beginner', language: 'fr', technologies: ['sql'] },
    { id: 4, title: 'Git & Version Control Essentials', description: 'Master Git from scratch. Learn repositories, commits, branches, merging, rebasing, resolving conflicts, and collaborating with remote repositories like GitHub.', creationDate: new Date('2026-01-01'), thumbnail: 'https://picsum.photos/400', price: 95000, level: 'beginner', language: 'en', technologies: [] },
    { id: 5, title: 'Operating Systems Fundamentals', description: 'Discover how operating systems manage processes, memory, files, threads, and scheduling. Understand the difference between user space and kernel space, concurrency basics.', creationDate: new Date('2026-01-01'), thumbnail: 'https://picsum.photos/400', price: 200000, level: 'intermediate', language: 'fr', technologies: [] },
    { id: 6, title: 'Technical English for Developers', description: 'Improve your English for the tech world. Learn essential vocabulary for programming, documentation, meetings, presentations, and job interviews.', creationDate: new Date('2026-01-01'), thumbnail: 'https://picsum.photos/400', price: 85000, level: 'beginner', language: 'mg', technologies: [] },
    { id: 7, title: 'Professional French Communication', description: 'Strengthen your French for academic and professional environments. Focus on formal writing, presentations, technical explanations, and clear structured arguments.', creationDate: new Date('2026-01-01'), thumbnail: 'https://picsum.photos/400', price: 80000, level: 'beginner', language: 'mg', technologies: [] },
    { id: 8, title: 'SEO Fundamentals for Web Developers', description: 'Learn how search engines work and how to optimize websites for visibility. Cover keywords, technical SEO, performance optimization, metadata, and structured data.', creationDate: new Date('2026-01-01'), thumbnail: 'https://picsum.photos/400', price: 150000, level: 'intermediate', language: 'en', technologies: ['javascript'] },
    { id: 9, title: 'Spring Boot for Backend Development', description: 'Build modern REST APIs with Spring Boot. Learn dependency injection, controllers, services, JPA, security basics, validation, and scalable backend architecture.', creationDate: new Date('2026-01-01'), thumbnail: 'https://picsum.photos/400', price: 250000, level: 'advanced', language: 'fr', technologies: ['java'] },
  ]
const cartList = document.getElementById('cartList');
let timeOut;
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  cartList.innerHTML = updateCartCount();
});
if (cartList) {
  cartList.addEventListener('click', (e) => {
    if (e.target.closest('.remove-btn')) {  // support si clic sur <i> ou <button>
      const btn = e.target.closest('.remove-btn');
      const id = parseInt(btn.dataset.id);
      removeFromCart(id);
    }
  });
}
const cartButton = document.querySelectorAll('.cartBtn');
const cartToggle = document.querySelector('.cart');
if (cartToggle) {
  cartToggle.addEventListener('click', (e) => {
    if (!cartList) return;
    cartList.style.display = cartList.style.display === 'block' ? 'none' : 'block';
    if (timeOut) clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      if (cartList && (!cartList.matches(':hover') && !(cartToggle && cartToggle.matches(':hover')))) {
        cartList.style.display = 'none';
      }
    }, 2500);
  });
}
cartButton.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const courseId = parseInt(e.target.getAttribute('data-course-id'));
        addToCart(courseId);
    })});
if (cartList) {
  cartList.addEventListener('mouseenter', () => {
    if (timeOut) clearTimeout(timeOut);
  });
  cartToggle.addEventListener('mouseenter', () => {
    if (!cartList) return;
    if (cartList.style.display === 'block') {
      if (timeOut) clearTimeout(timeOut);
    }
  });

  cartToggle.addEventListener('mouseleave', () => {
    if (!cartList) return;
    if (cartList.style.display === 'block') {
      if (timeOut) clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        if (cartList && (!cartList.matches(':hover') && !(cartToggle && cartToggle.matches(':hover')))) {
          cartList.style.display = 'none';
        }
      }, 2500);
    }
  });

  cartList.addEventListener('mouseleave', () => {
    timeOut = setTimeout(() => {
      if (cartList && (!cartList.matches(':hover') && !(cartToggle && cartToggle.matches(':hover')))) {
        cartList.style.display = 'none';
      }
    }, 2500);
  });
}
function addToCart(id) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (!cart.includes(id)) {
    cart.push(id);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  cartList.innerHTML = updateCartCount();
  cartList.style.display = 'block';
  if (timeOut) clearTimeout(timeOut);
  timeOut = setTimeout(() => {
    if (cartList && (!cartList.matches(':hover') && !(cartToggle && cartToggle.matches(':hover')))) {
      cartList.style.display = 'none';
    }
  }, 2500);
}
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartBtn = document.getElementById('cart') || document.querySelector('.cart');
  if (!cartBtn) return;
  cartBtn.setAttribute('data-count', String(cart.length));

  let cartContent = '';

if (cart.length === 0) {
      cartList.style.display = 'none';
    cartContent = `<p class="text-gray-500">Your cart is empty.</p>`;
  } else {
    cartContent = `
      <ul class="text-red w-[15vw] flex flex-col gap-2">
        ${cart
        .map(id => `
          <li class="flex justify-between items-center">
            <span>${courses.find(c => c.id === id)?.title}</span>
            <button class="remove-btn" data-id="${id}">
              <i class="fa-solid fa-trash"></i>
            </button>
          </li>`).join('')}
      </ul>
    `;
  }

  return `
    <h2 class="text-xl font-bold mb-2 text-red">Cart Items</h2>
    <hr class="border-t border-gray-300 my-1">
    ${cartContent}
  `;
}

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(itemId => itemId !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  cartList.innerHTML = updateCartCount();
}
cartList.innerHTML = updateCartCount();