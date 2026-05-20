// Main products loading script
async function loadProducts() {
  try {
    const response = await fetch('/api/products');
    if (!response.ok) throw new Error('Failed to fetch products');

    const products = await response.json();
    const container = document.getElementById('products') || document.getElementById('product-detail');

    if (!container) return;

    if (products.length === 0) {
      container.innerHTML = '<p class="empty-state">ยังไม่มีสินค้าในระบบ</p>';
      return;
    }

    const isProductPage = container.id === 'products';

    container.innerHTML = products.map(product => `
      <div class="product-card">
        <img src="${product.image || 'images/product1.jpg'}" alt="${product.name}">
        <div class="product-content">
          <h3>${product.name}</h3>
          <p>${product.description || 'ไม่มีรายละเอียด'}</p>
          <div class="price">฿ ${Number(product.price).toLocaleString()}</div>
          ${isProductPage ? `<button onclick="viewProduct(${product.id})">ดูรายละเอียด</button>` : ''}
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading products:', error);
    const container = document.getElementById('products') || document.getElementById('product-detail');
    if (container) container.innerHTML = '<p class="empty-state">⚠️ ไม่สามารถโหลดสินค้า</p>';
  }
}

function viewProduct(id) {
  window.location.href = `/views/product-detail.html?id=${id}`;
}

// Load products when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
});
