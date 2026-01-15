const form = document.getElementById("postForm");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;
  const category = document.getElementById("category").value;

  if (!title || !body) {
    alert("Please fill all fields");
    return;
  }

  await fetch("http://localhost:5000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title,
      body,
      category
    })
  });

  // Redirect to homepage after publishing
  window.location.href = "index.html";
});
