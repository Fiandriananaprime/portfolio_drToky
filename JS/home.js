import data from "./tokimahery.data.mjs";

const aboutME1 = document.getElementById("aboutME1");
const aboutME2 = document.getElementById("aboutME2");

aboutME1.textContent = data.aboutMe_part1;
aboutME2.textContent = data.aboutMe_part2;

const container = document.getElementById("overview");

if (container) {
  data.overview.forEach((item, index) => {
    const block = document.createElement("div");

    const accentClass = index !== 0 ? "accent" : "";

    block.innerHTML = `
      <p class="stat-number ${accentClass}">${item.number}</p>
      <p class="stat-label">${item.label}</p>
    `;

    container.appendChild(block);
  });
}
