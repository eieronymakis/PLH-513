fetch('http://127.0.0.1/user/info')
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("username").innerHTML = data.username.toLowerCase()+` (${data.role})`;
  });

  const toast = new bootstrap.Toast(document.getElementById('orionNotification'))
  toast.show()