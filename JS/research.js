const researchPapers = [
    {
      id: 1,
      title: "Automatic Generation of Thematic Maps Using Multi-Agent Systems",
      abstract:
        "This paper presents an approach to automating the generation of thematic maps through multi-agent systems. Agents collaborate to process, interpret, and spatially organize geographic data, reducing the manual effort typically required in cartographic workflows. The system is demonstrated and evaluated within the GAMA simulation platform.",
      publishedDate: new Date("2024-11-01"),
      journal: "GAMA Days 2024",
      authors: [
        "I. H. Maminiaina",
        "H. Rakotonirainy",
        "J. Dinaharison",
        "T. Ramarozaka",
        "A. Razafinimaro",
      ],
      tags: ["multi-agent systems", "cartography", "GAMA"],
      url: "https://hal.science/hal-04890215v1/file/Gama_days_2024_Maminiaina.pdf",
      pdfUrl:
        "https://hal.science/hal-04890215v1/file/Gama_days_2024_Maminiaina.pdf",
    },
    {
      id: 2,
      title: "Prise en compte des normes dans les comportements des agents",
      abstract:
        "Cette thèse de doctorat explore comment les normes sociales et organisationnelles peuvent être intégrées dans les comportements des agents autonomes. Elle propose un cadre formel permettant aux agents de percevoir, interpréter et respecter des normes dans des environnements multi-agents complexes, avec des applications en simulation sociale et en systèmes distribués.",
      publishedDate: new Date("2024-01-01"),
      journal: "Université de Fianarantsoa — Thèse de doctorat en Informatique",
      authors: ["T. Ramarozaka"],
      tags: ["multi-agent systems", "norms", "PhD thesis"],
      url: "https://agritrop.cirad.fr/610658/1/THESE%20Tokimahery%20FINALE.pdf",
      pdfUrl:
        "https://agritrop.cirad.fr/610658/1/THESE%20Tokimahery%20FINALE.pdf",
    },
    {
      id: 3,
      title:
        "Extending Partial-Order Planning to Account for Norms in Agent Behavior",
      abstract:
        "This paper proposes an extension of partial-order planning to integrate normative constraints into agent behavior. By incorporating norms directly into the planning process, agents can reason about socially acceptable action sequences while still achieving their goals. The approach is evaluated in the context of multi-agent simulations and discussed within the European Social Simulation community.",
      publishedDate: new Date("2022-09-01"),
      journal:
        "Conference of the European Social Simulation Association, Springer Nature Switzerland",
      authors: ["T. Ramarozaka", "J. P. Müller", "H. L. Rakotonirainy"],
      tags: ["multi-agent systems", "norms", "planning"],
      url: "https://edepot.wur.nl/641647#page=144",
      pdfUrl: "https://edepot.wur.nl/641647#page=144",
    },
  ]
function renderResearchCard(paper) {
  const authors = paper.authors?.join(', ') || '';
  const date = paper.publishedDate ? new Date(paper.publishedDate).toISOString().slice(0,10) : '';
  const tagsHtml = (paper.tags || []).map(t => `<span class="bg-warm py-1 px-3 rounded-lg shadow text-dark text-sm mr-2">${t}</span>`).join('');
  return `
    <div class="w-[65%] shadow-xl p-5 rounded-lg">
      <div class="flex flex-col gap-4">
        <div class="flex justify-between">
          <div class="badgeList mt-3">
            ${tagsHtml}
          </div>
          <span class="text-sm text-muted">${date}</span>
        </div>
        <h2 class="text-xl font-extrabold text-dark font-playfair ">${paper.title}</h2>
        <div class="flex flex-wrap gap-2">
        <span class="text-xs text-light">${authors}</span>
        ${paper.journal ? `<span class="text-xs text-muted">${paper.journal}</span>` : ''}
        </div>
        <p class="text-dark text-sm">${paper.abstract}</p>
      </div>
      <hr class="my-5 border-gray-300" />
      <div class="flex justify-between items-center">
        <a class="text-red underline flex items-center gap-1" href="${paper.pdfUrl || paper.url || '#'}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-file-pdf"></i> Read PDF</a>
      </div>
    </div>
  `;
}

// Auto-render into the research page's section if present
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('papersSection') || document.getElementById('papersContainer');
  if (!container) return;
  container.innerHTML = researchPapers.map(renderResearchCard).join('\n');
});

