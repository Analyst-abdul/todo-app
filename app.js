const STORAGE_KEY = "abdul-landing-comments";

const form = document.getElementById("comment-form");
const list = document.getElementById("comment-list");
const errorEl = document.getElementById("form-error");
document.getElementById("year").textContent = String(new Date().getFullYear());

function loadComments() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveComments(comments) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
}

function formatTime(iso) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return "";
  }
}

function render() {
  const comments = loadComments();
  list.innerHTML = "";
  if (!comments.length) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = "No comments yet. Be the first.";
    list.appendChild(empty);
    return;
  }
  comments.forEach((c) => {
    const li = document.createElement("li");
    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = `${c.name} · ${formatTime(c.at)}`;
    const body = document.createElement("p");
    body.textContent = c.message;
    li.append(meta, body);
    list.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  errorEl.hidden = true;
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const message = String(data.get("message") || "").trim();

  if (!name || !email || !message) {
    errorEl.hidden = false;
    errorEl.textContent = "Please complete name, email, and comment.";
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errorEl.hidden = false;
    errorEl.textContent = "Please enter a valid email address.";
    return;
  }

  const comments = loadComments();
  comments.unshift({ name, email, message, at: new Date().toISOString() });
  saveComments(comments.slice(0, 50));
  form.reset();
  render();
});

render();
