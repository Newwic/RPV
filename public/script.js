const baht = new Intl.NumberFormat('th-TH', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function productCard(product) {
  const image = product.image
    ? `<img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy">`
    : '<span>RPV</span>';
  const description = product.description
    ? `${escapeHtml(product.description).slice(0, 110)}...`
    : 'รายละเอียดสินค้าและวิธีใช้งาน';
  const productPath = `/products/${product.slug || `item-${product.id}`}`;

  return `
    <article class="product-card">
      <a class="thumb" href="${productPath}">${image}</a>
      <div class="product-body">
        ${product.category ? `<span class="badge">${escapeHtml(product.category)}</span>` : ''}
        <h3>${escapeHtml(product.name)}</h3>
        <p class="muted">${description}</p>
        <div class="price">฿ ${baht.format(Number(product.price || 0))}</div>
        <a class="btn btn-outline" href="${productPath}">ดูรายละเอียด</a>
      </div>
    </article>
  `;
}

async function loadHomeProducts() {
  const target = document.getElementById('homeProducts');
  if (!target) return;

  try {
    const response = await fetch('/api/products');
    if (!response.ok) throw new Error('โหลดสินค้าไม่สำเร็จ');
    const products = await response.json();

    if (!products.length) {
      target.innerHTML = '<div class="empty">ยังไม่มีสินค้าในระบบ</div>';
      return;
    }

    target.innerHTML = products.slice(0, 6).map(productCard).join('');
  } catch {
    target.innerHTML = '<div class="error-box">โหลดสินค้าไม่ได้ กรุณาตรวจสอบว่า server ทำงานอยู่</div>';
  }
}

document.addEventListener('DOMContentLoaded', loadHomeProducts);
