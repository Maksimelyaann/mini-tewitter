const app = document.getElementById("app");

let user = localStorage.getItem("user");
let posts = JSON.parse(localStorage.getItem("posts") || "[]");

function savePosts() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

function render() {
  if (!user) {
    app.innerHTML = `
      <h2>Login</h2>
      <input id="username" placeholder="Your name" />
      <button onclick="login()">Login</button>
    `;
    return;
  }

  app.innerHTML = `
    <h2>Mini Twitter</h2>
    <p>Hello, ${user} <button onclick="logout()">Logout</button></p>

    <textarea id="newPost" placeholder="What's happening?"></textarea><br/>
    <button onclick="addPost()">Post</button>

    <div id="posts"></div>
  `;

  const postsDiv = document.getElementById("posts");
  postsDiv.innerHTML = posts
    .map(
      (p, i) => `
      <div class="post">
        <strong>${p.user}</strong>: ${p.text}<br/>
        ❤️ ${p.likes}
        <button onclick="likePost(${i})">Like</button>
      </div>
    `
    )
    .join("");
}

function login() {
  const name = document.getElementById("username").value.trim();
  if (!name) return;
  user = name;
  localStorage.setItem("user", user);
  render();
}

function logout() {
  user = null;
  localStorage.removeItem("user");
  render();
}

function addPost() {
  const text = document.getElementById("newPost").value.trim();
  if (!text) return;
  posts.unshift({ user, text, likes: 0 });
  savePosts();
  render();
}

function likePost(index) {
  posts[index].likes++;
  savePosts();
  render();
}

render();