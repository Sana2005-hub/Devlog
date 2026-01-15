const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let posts = [];

/* GET ALL POSTS */
app.get("/posts", (req, res) => {
  res.json(posts);
});

/* CREATE POST */
app.post("/posts", (req, res) => {
  const { title, body, category } = req.body;

  const newPost = {
    title,
    body,
    category,
    timestamp: new Date().toLocaleTimeString()
  };

  posts.push(newPost);
  res.json({ message: "Post added" });
});

/* DELETE POST */
app.delete("/posts/:index", (req, res) => {
  const index = req.params.index;

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
