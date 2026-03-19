(function () {
  const data = window.sharedData || window.data;
  if (!data) return;

  const researchPapers = data.papers || [];

  function renderResearchCard(paper) {
    const authors = paper.authors?.join(", ") || "";
    const date = paper.publishedDate
      ? new Date(paper.publishedDate).toISOString().slice(0, 10)
      : "";
    const tagsHtml = (paper.tags || [])
      .map(
        (t) =>
          `<span class="bg-warm py-1 px-3 rounded-lg shadow text-dark text-sm mr-2">${t}</span>`,
      )
      .join("");
    return `
      <div id="paper-${paper.id}" class="w-[65%] min-w-[300px] shadow-xl p-5 rounded-lg">
        <div class="flex flex-col gap-4">
          <div class="flex justify-between">
            <div class="badgeList mt-3 flex flex-wrap gap-2 w-[80%] ">
              ${tagsHtml}
            </div>
            <span class="text-sm text-muted">${date}</span>
          </div>
          <h2 class="text-xl font-extrabold text-dark font-playfair ">${paper.title}</h2>
          <div class="flex flex-wrap gap-2">
          <span class="text-xs text-light">${authors}</span>
          ${paper.journal ? `<span class="text-xs text-muted">${paper.journal}</span>` : ""}
          </div>
          <p class="text-dark text-sm">${paper.abstract}</p>
        </div>
        <hr class="my-5 border-gray-300" />
        <div class="flex justify-between items-center">
          <a class="text-red underline flex items-center gap-1" href="${paper.pdfUrl || paper.url || "#"}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-file-pdf"></i> Read PDF</a>
        </div>
      </div>
    `;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const container =
      document.getElementById("papersSection") ||
      document.getElementById("papersContainer");
    if (!container) return;
    container.innerHTML = researchPapers.map(renderResearchCard).join("\n");
  });
})();


