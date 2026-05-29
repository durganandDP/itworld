// ===============================
// STATE
// ===============================
let currentCategory = "support";
let addedPosts = new Set();

let loadIndex = 0;
let loadStep = 6;


// ===============================
// FILTER SYSTEM
// ===============================
function filterPosts(category) {

  currentCategory = category;

  let categories = document.querySelectorAll('.category');
  let allGrid = document.getElementById('all-grid');

  // ===== ALL VIEW =====
  if (category === 'all') {

    allGrid.innerHTML = "";

    let posts = document.querySelectorAll('.blog-card');

    posts.forEach(post => {
      allGrid.appendChild(post.cloneNode(true)); // safe clone
    });

    categories.forEach(cat => cat.style.display = 'none');

    allGrid.style.display = 'grid';
  }

  // ===== NORMAL CATEGORY =====
  else {

    allGrid.style.display = 'none';

    categories.forEach(cat => {
      cat.style.display = (cat.id === category) ? 'block' : 'none';
    });
  }

  // ACTIVE BUTTON
  document.querySelectorAll('.filters button').forEach(b => {
    b.classList.remove('active');
  });

  document.querySelector(`.filters button[onclick="filterPosts('${category}')"]`)
    ?.classList.add('active');
}


// ===============================
// EXTRA POSTS
// ===============================
let extraPosts = [
  {
    id: "macbook-battery",
    title: "MacBook Battery Replacement Guide",
    category: "support",
    img: "/blog/img/macbook-battery.webp",
    link: "/blog/it-help/macbook-battery/",
    desc: "Complete battery replacement guide for MacBook.",
    date: "April 2026"
  },
  {
    id: "gpu-update",
    title: "New GPU Technology 2026",
    category: "hardware",
    img: "/blog/img/gpu.webp",
    link: "/blog/it-hardware/gpu-update/",
    desc: "Latest GPU technology updates.",
    date: "April 2026"
  },
  {
    id: "Tech-Trends-2026",
    title: "Top Tech Trends in 2026 – What to Expect",
    category: "news",
    img: "/blog/img/tech-trends-2026.webp",
    link: "/blog/it-news/top-tech-trends-2026/",
    desc: "Explore the latest technology trends and innovations.",
    date: "April 2026"
  }
];


// ===============================
// LOAD MORE (FIXED)
// ===============================
function loadMore() {

  let count = 0;

  for (let i = loadIndex; i < extraPosts.length; i++) {

    let post = extraPosts[i];

    // ❗ skip wrong category
    if (currentCategory !== 'all' && post.category !== currentCategory) continue;

    if (addedPosts.has(post.id)) continue;

    let html = `
      <div class="blog-card" data-category="${post.category}">
        <img src="${post.img}" loading="lazy" alt="${post.title}">
        <h2><a href="${post.link}">${post.title}</a></h2>
        <p>${post.desc}</p>
        <span class="date">Updated ${post.date}</span>
      </div>
    `;

    let container = document.querySelector(`#${post.category} .category-grid`);

    if (container) {
      container.insertAdjacentHTML('beforeend', html);
      addedPosts.add(post.id);
      count++;
    }

    if (count >= loadStep) break;
  }

  loadIndex += count;

  // hide button if done
  if (loadIndex >= extraPosts.length) {
    document.querySelector('.load-more button').style.display = 'none';
  }

  // refresh ALL view
  if (currentCategory === 'all') {
    filterPosts('all');
  }
}


// ===============================
// DEFAULT LOAD
// ===============================
window.addEventListener("DOMContentLoaded", () => {
  filterPosts("support");
});


// ===============================
// CARD CLICK
// ===============================
document.addEventListener("click", function(e) {
  let card = e.target.closest(".blog-card");
  if (!card) return;

  let link = card.querySelector("a");

  if (link && !e.target.closest("a")) {
    window.location = link.href;
  }
});


// ===============================
// YEAR
// ===============================
let yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}