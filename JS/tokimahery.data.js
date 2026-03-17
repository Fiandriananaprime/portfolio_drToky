// Non-module fallback: expose minimal sharedData on window for older devices / file:// testing
(function () {
  try {
    window.sharedData = window.sharedData || {
      posts: [
        { id: 1, title: "Join me at HEI", description: "Since 2021, I have been a part of HEI - Haute École d'Informatique...", page: "blog.html#post-1" },
        { id: 2, title: "Teaching Databases the Right Way", description: "Too many students jump directly into ORMs...", page: "blog.html#post-2" },
        { id: 3, title: "Why Git Is a Survival Skill", description: "Version control is not optional...", page: "blog.html#post-3" }
      ],
      courses: [
        { id: 1, title: "Javascript for beginners", description: "Javascript made easy...", price: 120000, page: "courses.html#course-1" },
        { id: 2, title: "Java for beginners", description: "A simple course for true beginners in Java...", price: 220000, page: "courses.html#course-2" }
      ],
      papers: [],
      youtubeVideos: [],
      archives: []
    };
    console.log('tokimahery.data.js: window.sharedData created (fallback)');
  } catch (e) {
    console.warn('tokimahery.data.js: could not set sharedData', e);
  }
})();
