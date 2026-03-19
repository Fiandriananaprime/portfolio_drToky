(function () {
  const data = window.sharedData || window.data;
  if (!data) return;

  function renderTestimonials() {
    const grid = document.getElementById("testimonialsGrid");
    if (!grid) return;

    data.testimonials.filter(t => t.role === "student").forEach((t) => {
      const stars = Array.from({length: 5}, (_, i) =>
        `<i class="fa-solid fa-star ${i >= t.rating ? 'empty' : ''}"></i>`
      ).join('');

      grid.innerHTML += `
        <article class="testimonial-card bg-white rounded-2xl p-6 flex flex-col"
                 style="border: 1px solid var(--color-border);">
          <header class="flex items-center gap-3 mb-1">
            <img src="${t.thumbnail}" alt="${t.author}"
                 class="w-10 h-10 rounded-full object-cover flex-shrink-0" />
            <div>
              <p class="testimonial-name">${t.author}</p>
              <p class="testimonial-role">${t.role}</p>
            </div>
          </header>
          <div class="card-divider"></div>
          <p class="testimonial-text">${t.description}</p>
          <div class="stars">${stars}</div>
        </article>
      `;
    });
  }

  function renderCollaborators() {
    const grid = document.getElementById("collabGrid");
    if (!grid) return;

    data.testimonials
      .filter(t => t.role === "collaborator")
      .forEach((t) => {
        grid.innerHTML += `
          <article class="collab-card bg-white rounded-2xl p-7 flex flex-col gap-6"
                   style="border: 1px solid var(--color-border);">
            <p class="font-playfair collab-quote">"${t.description}"</p>
            <footer class="flex items-center gap-3">
              <img src="${t.thumbnail}" alt="${t.author}"
                   class="w-10 h-10 rounded-full object-cover flex-shrink-0" />
              <div>
                <p class="testimonial-name">${t.author}</p>
                <p class="collab-role mt-0.5">${t.role}</p>
              </div>
            </footer>
          </article>
        `;
      });
  }

  function renderCustomers() {
    const grid = document.getElementById("customerGrid");
    if (!grid) return;

    data.testimonials
      .filter(t => t.role === "customer")
      .forEach((t) => {
        const stars = Array.from({length: 5}, (_, i) =>
          `<i class="fa-solid fa-star ${i >= t.rating ? 'empty' : ''}"></i>`
        ).join('');

        grid.innerHTML += `
          <article class="customer-card bg-white rounded-2xl p-7 flex flex-col gap-5"
                   style="border: 1px solid var(--color-border);">
            <div class="stars">${stars}</div>
            <p class="testimonial-text flex-1">"${t.description}"</p>
            <footer class="flex items-center gap-3">
              <img src="${t.thumbnail}" alt="${t.author}"
                   class="w-10 h-10 rounded-full object-cover flex-shrink-0" />
              <div>
                <p class="testimonial-name">${t.author}</p>
                <p class="customer-role mt-0.5">${t.role}</p>
              </div>
            </footer>
          </article>
        `;
      });
  }

  renderTestimonials();
  renderCollaborators();
  renderCustomers();
})();

