document.addEventListener("DOMContentLoaded", () => {
  fetch("/components/footer.html")
    .then(res => {
      if (!res.ok) return fetch("components/footer.html").then(r => r.text());
      return res.text();
    })
    .then(html => {
      const footer = document.getElementById("footer");
      if (footer) footer.innerHTML = html;
    })
    .catch(err => console.error("Footer load failed", err));
});
