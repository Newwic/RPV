const bahtCatalog = new Intl.NumberFormat('th-TH', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});

function escapeCatalog(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function catalogProductPath(product) {
  return `/products/${product.slug || `item-${product.id}`}`;
}

function renderCatalogProduct(product, index) {
  const description = product.description || 'สอบถามรายละเอียดสินค้าและการใช้งานเพิ่มเติมกับทีม RPV';
  const subtitle = product.subtitle || product.category || 'Abrasive media';
  const price = Number(product.price || 0);

  return `
    <article class="catalog-product">
      <div class="catalog-product-number">${String(index + 1).padStart(2, '0')}</div>
      <div>
        <span class="badge">${escapeCatalog(product.category || 'RPV')}</span>
        <h3>${escapeCatalog(product.name)}</h3>
        <p>${escapeCatalog(description)}</p>
        <dl class="catalog-facts compact">
          <div><dt>Size / Detail</dt><dd>${escapeCatalog(subtitle)}</dd></div>
          <div><dt>Price</dt><dd>${price ? `฿ ${bahtCatalog.format(price)}` : 'สอบถามราคา'}</dd></div>
          <div><dt>Product URL</dt><dd>${escapeCatalog(catalogProductPath(product))}</dd></div>
        </dl>
      </div>
    </article>
  `;
}

async function loadCatalog() {
  const target = document.getElementById('catalogProducts');
  if (!target) return;

  try {
    const response = await fetch('/api/products');
    if (!response.ok) throw new Error('Cannot load products');
    const products = await response.json();
    target.innerHTML = products.map(renderCatalogProduct).join('');
  } catch {
    target.innerHTML = '<div class="error-box">โหลดรายการสินค้าไม่ได้ กรุณาตรวจสอบ server</div>';
  }
}

document.addEventListener('DOMContentLoaded', loadCatalog);
