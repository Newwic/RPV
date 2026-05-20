let editingId = null;

async function loadProducts() {
  const tbody = document.querySelector('#productTable tbody');
  tbody.innerHTML = '<tr><td colspan="5">กำลังโหลด...</td></tr>';

  try {
    const res = await fetch('/api/products');
    const products = await res.json();

    tbody.innerHTML = products.map(p => `
      <tr>
        <td>${p.image ? `<img src="${p.image}">` : 'ไม่มีรูป'}</td>
        <td>${p.name}</td>
        <td>${Number(p.price).toLocaleString()} บาท</td>
        <td>${p.category || '-'}</td>
        <td>
          <button class="btn btn-edit" onclick="editProduct(${p.id})">แก้ไข</button>
          <button class="btn btn-delete" onclick="deleteProduct(${p.id})">ลบ</button>
        </td>
      </tr>
    `).join('');
  } catch (e) {
    tbody.innerHTML = '<tr><td colspan="5" style="color:red">เกิดข้อผิดพลาด</td></tr>';
  }
}

async function deleteProduct(id) {
  if (!confirm('ยืนยันลบสินค้านี้?')) return;
  await fetch(`/api/products/${id}`, { method: 'DELETE' });
  loadProducts();
}

window.editProduct = async (id) => {
  // สามารถขยายฟังก์ชันนี้ได้เต็มที่
  alert('ฟีเจอร์แก้ไขสินค้า (กำลังพัฒนาเพิ่มเติม)');
};

document.getElementById('productForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  formData.append('name', document.getElementById('name').value);
  formData.append('price', document.getElementById('price').value);
  formData.append('category', document.getElementById('category').value);
  formData.append('description', document.getElementById('description').value);

  const url = editingId ? `/api/products/${editingId}` : '/api/products';
  const method = editingId ? 'PUT' : 'POST';

  await fetch(url, { method, body: formData });
  alert(editingId ? 'แก้ไขสำเร็จ' : 'เพิ่มสินค้าเรียบร้อย');
  document.getElementById('productForm').reset();
  editingId = null;
  loadProducts();
});

loadProducts();