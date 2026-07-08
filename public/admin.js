const baht = new Intl.NumberFormat('th-TH', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});

let products = [];

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function checkAuth() {
  const response = await fetch('/api/me');
  const data = response.ok ? await response.json() : { authenticated: false };
  if (!data.authenticated) {
    window.location.href = '/login.html';
    return false;
  }
  document.getElementById('adminNotice').textContent = 'เข้าสู่ระบบแล้ว พร้อมจัดการสินค้า';
  document.getElementById('adminApp').hidden = false;
  return true;
}

async function loadProducts() {
  const rows = document.getElementById('productRows');
  rows.innerHTML = '<tr><td colspan="5">กำลังโหลด...</td></tr>';

  try {
    const response = await fetch('/api/products');
    if (!response.ok) throw new Error('โหลดสินค้าไม่สำเร็จ');
    products = await response.json();

    if (!products.length) {
      rows.innerHTML = '<tr><td colspan="5">ยังไม่มีสินค้าในระบบ</td></tr>';
      return;
    }

    rows.innerHTML = products.map((product) => `
      <tr>
        <td>${product.image ? `<img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}">` : '-'}</td>
        <td>${escapeHtml(product.name)}</td>
        <td>฿ ${baht.format(Number(product.price || 0))}</td>
        <td>${escapeHtml(product.category || '-')}</td>
        <td>
          <button class="btn btn-outline" type="button" onclick="editProduct(${product.id})">แก้ไข</button>
          <button class="btn btn-danger" type="button" onclick="deleteProduct(${product.id})">ลบ</button>
        </td>
      </tr>
    `).join('');
  } catch {
    rows.innerHTML = '<tr><td colspan="5">โหลดสินค้าไม่ได้</td></tr>';
  }
}

function resetForm() {
  document.getElementById('productForm').reset();
  document.getElementById('editId').value = '';
  document.getElementById('formTitle').textContent = 'เพิ่มสินค้า';
}

function editProduct(id) {
  const product = products.find((item) => item.id === id);
  if (!product) return;

  document.getElementById('editId').value = product.id;
  document.getElementById('formTitle').textContent = `แก้ไขสินค้า: ${product.name}`;
  [
    'name', 'subtitle', 'price', 'category', 'description', 'features',
    'applications', 'technicalSpecs', 'codeSizes', 'packaging', 'pdfLink'
  ].forEach((field) => {
    document.getElementById(field).value = product[field] || '';
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function deleteProduct(id) {
  if (!confirm('ต้องการลบสินค้านี้ใช่ไหม?')) return;

  const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    alert('ลบสินค้าไม่สำเร็จ');
    return;
  }
  await loadProducts();
  resetForm();
}

async function saveProduct(event) {
  event.preventDefault();
  const form = document.getElementById('productForm');
  const id = document.getElementById('editId').value;
  const formData = new FormData(form);

  const response = await fetch(id ? `/api/products/${id}` : '/api/products', {
    method: id ? 'PUT' : 'POST',
    body: formData
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    alert(data.error || 'บันทึกสินค้าไม่สำเร็จ');
    return;
  }

  alert('บันทึกสินค้าเรียบร้อย');
  resetForm();
  await loadProducts();
}

async function logout() {
  await fetch('/api/logout', { method: 'POST' });
  window.location.href = '/login.html';
}

document.addEventListener('DOMContentLoaded', async () => {
  if (!(await checkAuth())) return;
  document.getElementById('productForm').addEventListener('submit', saveProduct);
  document.getElementById('resetBtn').addEventListener('click', resetForm);
  document.getElementById('reloadBtn').addEventListener('click', loadProducts);
  document.getElementById('logoutBtn').addEventListener('click', (event) => {
    event.preventDefault();
    logout();
  });
  loadProducts();
});
