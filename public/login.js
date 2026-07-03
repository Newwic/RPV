document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const error = document.getElementById('error');

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    error.textContent = '';

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: document.getElementById('username').value.trim(),
          password: document.getElementById('password').value
        })
      });

      if (!response.ok) {
        error.textContent = 'Username หรือ Password ไม่ถูกต้อง';
        return;
      }

      window.location.href = 'admin.html';
    } catch {
      error.textContent = 'เชื่อมต่อ server ไม่ได้';
    }
  });
});
