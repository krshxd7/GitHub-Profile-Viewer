async function getProfile() {
  const username = document.getElementById("usernameInput").value.trim();

  if (!username) {
    alert("Please enter a GitHub username");
    return;
  }

  const url = `https://api.github.com/users/${username}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("User not found");

    const data = await res.json();

    document.getElementById("profile").innerHTML = `
      <img src="${data.avatar_url}" width="100" />
      <h2>${data.name || data.login}</h2>
      <p><strong>Public Repos:</strong> ${data.public_repos}</p>
      <p><strong>Followers:</strong> ${data.followers}</p>
      <p><strong>Following:</strong> ${data.following}</p>
      <p><a href="${data.html_url}" target="_blank">View Profile</a></p>
    `;
  } catch (err) {
    document.getElementById("profile").innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
}
