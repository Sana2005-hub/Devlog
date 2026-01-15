// ---------- POSTS STORAGE ----------
let posts = JSON.parse(localStorage.getItem("posts")) || [];

// ---------- DOM ELEMENTS ----------
const postsContainer = document.getElementById("posts");
const filterButtons = document.querySelectorAll(".filter-btn");

// ---------- FUNCTIONS ----------

// Render posts with optional filter
function renderPosts(filter = "All") {
  postsContainer.innerHTML = ""; // clear previous posts

  const filteredPosts = posts.filter(post => filter === "All" || post.category === filter);

  if (filteredPosts.length === 0) {
    postsContainer.innerHTML = "<p>No posts available in this category.</p>";
    return;
  }

  filteredPosts.forEach(post => {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");
    postDiv.dataset.id = post.id;
    postDiv.dataset.category = post.category;
    postDiv.innerHTML = `
      <h2 class="post-title">${post.title}</h2>
      <p>${post.content}</p>
      <p class="post-category">Category: ${post.category}</p>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    `;
    postsContainer.appendChild(postDiv);
  });
}

// Save posts to localStorage
function savePosts() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

// Generate unique ID for posts
function generateId() {
  return Date.now();
}

// ---------- EVENT LISTENERS ----------

// Filter buttons
document.addEventListener("DOMContentLoaded", () => {
  renderPosts(); // render all posts initially

  // Set "All" button active
  const allBtn = document.querySelector('.filter-btn[data-category="All"]');
  if(allBtn) allBtn.classList.add("active");

  // Filter click
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderPosts(btn.dataset.category);
    });
  });
});

// Edit/Delete posts
document.addEventListener("click", (e) => {
  const postDiv = e.target.closest(".post");
  if (!postDiv) return;

  const postId = Number(postDiv.dataset.id);
  const postIndex = posts.findIndex(p => p.id === postId);

  // EDIT
  if (e.target.classList.contains("edit-btn")) {
    const newTitle = prompt("Enter new title:", posts[postIndex].title);
    const newContent = prompt("Enter new content:", posts[postIndex].content);
    if (newTitle) posts[postIndex].title = newTitle;
    if (newContent) posts[postIndex].content = newContent;
    savePosts();
    renderPosts(document.querySelector(".filter-btn.active")?.dataset.category || "All");
  }

  // DELETE
  if (e.target.classList.contains("delete-btn")) {
    if (confirm("Are you sure you want to delete this post?")) {
      posts.splice(postIndex, 1);
      savePosts();
      renderPosts(document.querySelector(".filter-btn.active")?.dataset.category || "All");
    }
  }
});

// ---------- RECEIVE POST FROM write.html ----------
window.addEventListener("storage", (e) => {
  if (e.key === "posts") {
    posts = JSON.parse(e.newValue) || [];
    renderPosts(document.querySelector(".filter-btn.active")?.dataset.category || "All");
  }
});
