let editingId = null;

document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  setupFormHandler();
});

async function loadProducts() {
  try {
    const response = await fetch('/api/products');
    if (!response.ok) throw new Error('Failed to fetch');

    const products = await response.json();
    const tbody = document.querySelector('#productTable tbody');

    tbody.innerHTML = products.map(p => `
      <tr>
        <td><img src="${p.image || 'images/product1.jpg'}" alt="${p.name}"></td>
        <td>${p.name}</td>
        <td>฿ ${Number(p.price).toLocaleString()}</td>
        <td>${p.category || '-'}</td>
        <td>
          <button class="btn btn-edit" onclick="editProduct(${p.id})">แก้ไข</button>
          <button class="btn btn-delete" onclick="deleteProduct(${p.id})">ลบ</button>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error:', error);
    alert('ไม่สามารถโหลดรายการสินค้า');
  }
}

function editProduct(id) {
  fetch(`/api/products`)
    .then(r => r.json())
    .then(products => {
      const product = products.find(p => p.id === id);
      if (product) {
        document.getElementById('editId').value = id;
        document.getElementById('name').value = product.name;
        document.getElementById('price').value = product.price;
        document.getElementById('category').value = product.category || '';
        document.getElementById('description').value = product.description || '';
        window.scrollTo(0, 0);
      }
    });
}

async function deleteProduct(id) {
  if (!confirm('คุณแน่ใจหรือว่าต้องการลบสินค้านี้?')) return;

  try {
    const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if (response.ok) {
      alert('ลบสินค้าสำเร็จ');
      loadProducts();
      resetForm();
    }
  } catch (error) {
    alert('เกิดข้อผิดพลาด: ' + error.message);
  }
}

function setupFormHandler() {
  const form = document.getElementById('productForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('price', document.getElementById('price').value);
    formData.append('category', document.getElementById('category').value);
    formData.append('description', document.getElementById('description').value);

    const imageInput = document.getElementById('image');
    if (imageInput.files.length > 0) {
      formData.append('image', imageInput.files[0]);
    }

    const id = document.getElementById('editId').value;
    const url = id ? `/api/products/${id}` : '/api/products';
    const method = id ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, { method, body: formData });
      if (response.ok) {
        alert(id ? 'อัปเดตสินค้าสำเร็จ' : 'เพิ่มสินค้าสำเร็จ');
        loadProducts();
        resetForm();
      } else {
        alert('เกิดข้อผิดพลาด');
      }
    } catch (error) {
      alert('ไม่สามารถบันทึกข้อมูล: ' + error.message);
    }
  });
}

function resetForm() {
  document.getElementById('productForm').reset();
  document.getElementById('editId').value = '';
}
