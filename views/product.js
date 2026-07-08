(() => {
  const glassBeads = [
    ['Glass Beads No.3', '425-850 µm', 425, 850, 'งานพ่นทำความสะอาดผิว / งานที่ต้องการเม็ดใหญ่', 'glass-beads-no3'],
    ['Glass Beads No.4', '250-425 µm', 250, 425, 'งานพ่นผิวทั่วไป / ลดคมผิวชิ้นงาน', 'glass-beads-no4'],
    ['Glass Beads No.6', '180-300 µm', 180, 300, 'งานขัดผิวโลหะ / ทำความสะอาดผิว', 'glass-beads-no6'],
    ['Glass Beads No.9', '106-212 µm', 106, 212, 'งานพ่นละเอียดระดับกลาง / เตรียมผิวโลหะ', 'glass-beads-no9'],
    ['Glass Beads No.10', '75-150 µm', 75, 150, 'งานขัดผิวละเอียด / ผิวเนียนสม่ำเสมอ', 'glass-beads-no10'],
    ['Glass Beads No.12', '45-90 µm', 45, 90, 'งานพ่นละเอียด / งานทำผิว Satin', 'glass-beads-no12'],
    ['Glass Beads No.13', '0-45 µm', 0, 45, 'งานละเอียดมาก / งานผิวต้องการความเรียบสูง', 'glass-beads-no13'],
    ['Crush Glass', '125-250 µm', 125, 250, 'งานพ่นทำความสะอาดผิว / เตรียมผิวก่อนเคลือบ', 'crush-glass']
  ].map(([name, size, minMicron, maxMicron, application, slug]) => ({
    slug,
    name,
    category: slug === 'crush-glass' ? 'Crush Glass' : 'Glass Beads',
    size,
    micron: size,
    minMicron,
    maxMicron,
    application,
    applicationTags: slug === 'crush-glass' ? ['surface-prep', 'cleaning'] : ['fine-blasting', 'surface-prep'],
    recommendedUse: slug === 'glass-beads-no12'
      ? 'เหมาะกับงานผิว Satin และงานพ่นละเอียด'
      : 'เลือกตามความละเอียดของผิวและแรงกระแทกที่ต้องการ',
    description: 'เม็ดแก้วพ่นทรายสำหรับงานขัดผิว ลบคม และปรับผิวชิ้นงานให้สม่ำเสมอ',
    imageTone: 'glass'
  }));

  const baseProducts = [
    ...glassBeads,
    {
      slug: 'portable-und-blaster',
      name: 'Portable Under Blaster',
      category: 'Portable Sand Blaster',
      size: '1 เครื่อง / ระบบพ่นทรายกลางแจ้ง',
      micron: 'ใช้กับ abrasive media หลายขนาด',
      minMicron: 0,
      maxMicron: 10000,
      application: 'งานพ่นทรายหน้างาน / งานโครงสร้างเหล็ก / งานซ่อมบำรุง',
      applicationTags: ['surface-prep', 'cleaning'],
      recommendedUse: 'เหมาะกับงานที่ต้องการเคลื่อนย้ายเครื่องไปใช้นอกโรงงาน',
      description: 'เครื่องพ่นทรายแบบพกพาสำหรับงานภาคสนาม สามารถต่อใช้งานกับวัสดุพ่นทรายได้หลากหลายและเหมาะกับงานเตรียมผิวเหล็กขนาดใหญ่',
      features: [
        'โครงสร้างเคลื่อนย้ายง่าย',
        'ใช้งานได้กับงานพ่นทรายหน้างาน',
        'รองรับงานเตรียมผิวและทำความสะอาดสนิม',
        'ปรับใช้งานร่วมกับ abrasive media หลายประเภท'
      ].join('\n'),
      technicalSpecs: [
        'ชนิดเครื่อง: Portable Sand Blaster',
        'การใช้งาน: งานภาคสนาม / งานซ่อมบำรุง',
        'วัสดุที่รองรับ: Glass Beads, Steel Shot, Steel Grit',
        'การจ่ายลม: ตามสเปกเครื่องลูกค้า',
        'การบำรุงรักษา: ทำความสะอาดถังและชุดสายพ่นหลังใช้งานทุกครั้ง'
      ].join('\n'),
      codeSizes: 'Portable Unit / Custom Setup',
      packaging: 'จัดส่งเป็นเครื่องพร้อมชุดอุปกรณ์',
      pdfLink: '/contact.html?topic=portable-sand-blaster',
      imageTone: 'portable'
    },
    {
      slug: 'steel-shot',
      name: 'Steel Shot',
      category: 'Steel Shot',
      size: 'สอบถามตามงาน',
      micron: 'ขึ้นอยู่กับเบอร์สินค้า',
      minMicron: 250,
      maxMicron: 1200,
      application: 'งานทำความสะอาดผิวเหล็ก / shot blasting',
      applicationTags: ['surface-prep', 'cleaning'],
      recommendedUse: 'เหมาะกับชิ้นงานเหล็กที่ต้องการแรงกระแทกสูง',
      description: 'เม็ดเหล็กกลมสำหรับงานยิงผิว ทำความสะอาดสนิม สเกล และเตรียมผิวก่อนเคลือบ',
      imageTone: 'steel'
    },
    {
      slug: 'steel-grit',
      name: 'Steel Grit',
      category: 'Steel Grit',
      size: 'สอบถามตามงาน',
      micron: 'ขึ้นอยู่กับเบอร์สินค้า',
      minMicron: 250,
      maxMicron: 1400,
      application: 'งานเตรียมผิวโลหะที่ต้องการ profile',
      applicationTags: ['surface-prep', 'cleaning'],
      recommendedUse: 'เหมาะกับงานที่ต้องการผิวหยาบเพื่อยึดเกาะ',
      description: 'เม็ดเหล็กทรงเหลี่ยมสำหรับสร้าง profile บนผิวโลหะและงานเตรียมผิวหนัก',
      imageTone: 'grit'
    },
    {
      slug: 'carbon-steel-cut-wire',
      name: 'Carbon Steel Cut Wire',
      category: 'Cut Wire',
      size: 'สอบถามตามงาน',
      micron: 'ขึ้นอยู่กับเส้นผ่านศูนย์กลาง',
      minMicron: 300,
      maxMicron: 1800,
      application: 'งาน shot peening / cleaning / deburring',
      applicationTags: ['deburring', 'surface-prep', 'cleaning'],
      recommendedUse: 'เหมาะกับงานที่ต้องการความทนทานและความสม่ำเสมอของเม็ด',
      description: 'เม็ดลวดตัดสำหรับงานขัดผิว ลบคม และงานอุตสาหกรรมที่ต้องการอายุการใช้งานสูง',
      imageTone: 'wire'
    },
    {
      slug: 'ceramic-media',
      name: 'Ceramic Media',
      category: 'Ceramic Media',
      size: 'หลายรูปทรง / หลายขนาด',
      micron: 'เลือกตามเครื่องและชิ้นงาน',
      minMicron: 1000,
      maxMicron: 10000,
      application: 'งานลบคม / ขัดผิวในเครื่อง vibratory finishing',
      applicationTags: ['deburring'],
      recommendedUse: 'เหมาะกับงานลบคมและขัดผิวชิ้นงานจำนวนมาก',
      description: 'วัสดุขัดเซรามิกสำหรับเครื่องขัดเขย่าและงานลบคมโลหะ',
      imageTone: 'ceramic'
    },
    {
      slug: 'plastic-media',
      name: 'Plastic Media',
      category: 'Plastic Media',
      size: 'หลายรูปทรง / หลายขนาด',
      micron: 'เลือกตามเครื่องและชิ้นงาน',
      minMicron: 1000,
      maxMicron: 10000,
      application: 'งานลบคมชิ้นงานที่ไม่ต้องการแรงกระแทกสูง',
      applicationTags: ['deburring'],
      recommendedUse: 'เหมาะกับชิ้นงานที่ต้องการลดรอยและควบคุมแรงขัด',
      description: 'วัสดุขัดพลาสติกสำหรับงานลบคมและปรับผิวที่ต้องการความนุ่มกว่า ceramic media',
      imageTone: 'plastic'
    }
  ];

  const faqs = [
    ['Glass Beads ใช้ทำอะไร?', 'ใช้สำหรับงานพ่นละเอียด ขัดผิว ลบคมเบา ๆ และทำผิว Satin บนโลหะหรือชิ้นงานที่ต้องการความเรียบสม่ำเสมอ'],
    ['ควรเลือกขนาด micron ยังไง?', 'ถ้าต้องการผิวละเอียดให้เลือกขนาดเล็กลง ถ้าต้องการแรงกระแทกหรือทำความสะอาดผิวมากขึ้นให้เลือกขนาดใหญ่ขึ้น'],
    ['Glass Beads No.12 เหมาะกับอะไร?', 'ขนาด 45-90 micron เหมาะกับงานพ่นละเอียด งานลบคม และงานทำผิว Satin'],
    ['Steel Shot ต่างจาก Glass Beads ยังไง?', 'Steel Shot มีแรงกระแทกสูงกว่า เหมาะกับผิวเหล็ก ส่วน Glass Beads ให้ผิวละเอียดและไม่รุนแรงเท่า'],
    ['ควรเลือก abrasive media แบบไหน?', 'ดูชนิดวัสดุชิ้นงาน ความละเอียดที่ต้องการ เครื่องที่ใช้ และเป้าหมายของงาน เช่น พ่นทราย ลบคม หรือทำผิวเรียบ']
  ];

  const state = {
    products: baseProducts,
    filtered: baseProducts
  };

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function productUrl(product) {
    return `/products/${product.slug || `item-${product.id}`}`;
  }

  function quoteUrl(product) {
    return `/contact.html?product=${encodeURIComponent(product.name)}`;
  }

  function svgImage(product) {
    const palettes = {
      glass: ['#dff7ff', '#7fcbe8', '#ffffff'],
      steel: ['#dce3e5', '#6c7a80', '#f8fbfc'],
      grit: ['#e6e0d8', '#525252', '#ffffff'],
      wire: ['#e8edf0', '#7d8b8f', '#ffffff'],
      ceramic: ['#f2efe8', '#c1b58d', '#ffffff'],
      plastic: ['#eaf5e8', '#82b880', '#ffffff'],
      portable: ['#f3f2f0', '#2f3d46', '#ffffff']
    };
    const [bg, bead, shine] = palettes[product.imageTone] || palettes.glass;
    const label = escapeHtml(product.category || 'RPV');

    if (product.imageTone === 'portable') {
      return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420" role="img">
          <rect width="640" height="420" fill="${bg}"/>
          <ellipse cx="320" cy="350" rx="240" ry="34" fill="rgba(0,0,0,.08)"/>
          <rect x="170" y="110" width="220" height="160" rx="18" fill="${bead}" />
          <rect x="188" y="130" width="184" height="118" rx="12" fill="#ffffff"/>
          <circle cx="214" cy="292" r="26" fill="#2f3d46"/>
          <circle cx="336" cy="292" r="26" fill="#2f3d46"/>
          <rect x="385" y="150" width="90" height="18" rx="9" fill="#2f3d46"/>
          <rect x="458" y="132" width="88" height="10" rx="5" fill="#2f3d46" transform="rotate(10 458 132)"/>
          <path d="M545 132 C585 110, 600 92, 620 82" stroke="#2f3d46" stroke-width="8" fill="none" stroke-linecap="round"/>
          <path d="M208 110 L180 76" stroke="#2f3d46" stroke-width="8" fill="none" stroke-linecap="round"/>
          <circle cx="208" cy="110" r="16" fill="#d9e6df"/>
          <rect x="214" y="160" width="148" height="18" rx="9" fill="#d9e6df"/>
          <rect x="214" y="188" width="120" height="12" rx="6" fill="#d9e6df"/>
          <circle cx="248" cy="215" r="10" fill="#d9e6df"/>
          <circle cx="282" cy="215" r="10" fill="#d9e6df"/>
          <circle cx="316" cy="215" r="10" fill="#d9e6df"/>
          <rect x="86" y="304" width="468" height="40" rx="10" fill="rgba(255,255,255,.82)"/>
          <text x="320" y="331" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="#123b25">${label}</text>
        </svg>
      `)}`;
    }

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420" role="img">
        <rect width="640" height="420" fill="${bg}"/>
        <g opacity="0.95">
          <circle cx="170" cy="150" r="48" fill="${bead}"/>
          <circle cx="265" cy="105" r="32" fill="${bead}"/>
          <circle cx="350" cy="170" r="66" fill="${bead}"/>
          <circle cx="455" cy="115" r="38" fill="${bead}"/>
          <circle cx="210" cy="255" r="58" fill="${bead}"/>
          <circle cx="390" cy="280" r="78" fill="${bead}"/>
          <circle cx="505" cy="245" r="42" fill="${bead}"/>
        </g>
        <g fill="${shine}" opacity="0.68">
          <circle cx="154" cy="134" r="13"/>
          <circle cx="333" cy="148" r="18"/>
          <circle cx="376" cy="250" r="20"/>
          <circle cx="491" cy="231" r="11"/>
        </g>
        <rect x="40" y="330" width="560" height="48" rx="8" fill="rgba(255,255,255,.76)"/>
        <text x="320" y="361" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="#123b25">${label}</text>
      </svg>
    `)}`;
  }

  function productImage(product) {
    const src = product.image || svgImage(product);
    return `<img src="${escapeHtml(src)}" alt="${escapeHtml(`${product.name} ${product.size} สำหรับงาน ${product.application}`)}" loading="lazy">`;
  }

  function sizeBucket(product) {
    const min = Number(product.minMicron || 0);
    const max = Number(product.maxMicron || 0);
    if (max <= 100) return '0-100';
    if (min < 250 && max <= 250) return '100-250';
    if (min < 500 && max <= 500) return '250-500';
    return '500-plus';
  }

  function renderCard(product) {
    return `
      <article class="seo-product-card" data-category="${escapeHtml(product.category)}">
        <a class="seo-product-media" href="${productUrl(product)}">${productImage(product)}</a>
        <div class="seo-product-body">
          <span class="badge">${escapeHtml(product.category)}</span>
          <h3><a href="${productUrl(product)}">${escapeHtml(product.name)}</a></h3>
          <dl class="product-facts">
            <div><dt>ขนาด</dt><dd>${escapeHtml(product.size)}</dd></div>
            <div><dt>การใช้งาน</dt><dd>${escapeHtml(product.application)}</dd></div>
            <div><dt>ประเภท</dt><dd>${escapeHtml(product.category)}</dd></div>
          </dl>
          <div class="product-card-actions">
            <a class="btn btn-outline" href="${productUrl(product)}">ดูรายละเอียด</a>
            <a class="btn btn-primary" href="${quoteUrl(product)}">ขอราคา</a>
          </div>
        </div>
      </article>
    `;
  }

  function slugifyCategory(category) {
    return String(category).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  function renderProducts() {
    const host = document.getElementById('productGroups');
    const count = document.getElementById('resultCount');
    count.textContent = `พบ ${state.filtered.length} รายการ`;

    if (!state.filtered.length) {
      host.innerHTML = '<div class="empty">ไม่พบสินค้าที่ตรงกับเงื่อนไข ลองเปลี่ยนคำค้นหาหรือเลือกทุกหมวดสินค้า</div>';
      return;
    }

    const groups = new Map();
    state.filtered.forEach((product) => {
      const category = product.category || 'Other Abrasive Media';
      if (!groups.has(category)) groups.set(category, []);
      groups.get(category).push(product);
    });

    host.innerHTML = [...groups.entries()].map(([category, products]) => `
      <section class="product-category-section" id="${slugifyCategory(category)}">
        <div class="category-heading">
          <h2>${escapeHtml(category)}</h2>
          <p>${categoryDescription(category)}</p>
        </div>
        <div class="seo-product-grid">
          ${products.map(renderCard).join('')}
        </div>
      </section>
    `).join('');
  }

  function categoryDescription(category) {
    const descriptions = {
      'Glass Beads': 'เม็ดแก้วพ่นทรายสำหรับงานพ่นละเอียด ขัดผิว และทำผิว Satin',
      'Crush Glass': 'วัสดุพ่นจากแก้วบดสำหรับงานทำความสะอาดผิวและเตรียมผิว',
      'Portable Sand Blaster': 'เครื่องพ่นทรายแบบพกพาสำหรับงานภาคสนามและงานซ่อมบำรุง',
      'Steel Shot': 'เม็ดเหล็กกลมสำหรับงาน shot blasting และทำความสะอาดผิวเหล็ก',
      'Steel Grit': 'เม็ดเหล็กทรงเหลี่ยมสำหรับสร้าง profile และเตรียมผิวก่อนเคลือบ',
      'Cut Wire': 'เม็ดลวดตัดสำหรับงาน shot peening และงานลบคม',
      'Ceramic Media': 'วัสดุขัดเซรามิกสำหรับเครื่องขัดเขย่าและงานลบคม',
      'Plastic Media': 'วัสดุขัดพลาสติกสำหรับงานลบคมที่ต้องการความนุ่มกว่า ceramic media'
    };
    return descriptions[category] || 'Abrasive media สำหรับงานอุตสาหกรรม';
  }

  function applyFilters() {
    const keyword = document.getElementById('searchInput').value.trim().toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const size = document.getElementById('sizeFilter').value;
    const application = document.getElementById('applicationFilter').value;

    state.filtered = state.products.filter((product) => {
      const text = `${product.name} ${product.category} ${product.size} ${product.application} ${product.description}`.toLowerCase();
      const matchKeyword = !keyword || text.includes(keyword);
      const matchCategory = category === 'all' || product.category === category;
      const matchSize = size === 'all' || sizeBucket(product) === size;
      const matchApplication = application === 'all' || (product.applicationTags || []).includes(application);
      return matchKeyword && matchCategory && matchSize && matchApplication;
    });

    renderProducts();
  }

  function renderCategoryOptions() {
    const select = document.getElementById('categoryFilter');
    const categories = [...new Set(state.products.map((product) => product.category).filter(Boolean))];
    select.innerHTML = '<option value="all">ทุกหมวดสินค้า</option>' + categories
      .map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`)
      .join('');
  }

  function renderComparison() {
    const rows = document.getElementById('comparisonRows');
    if (!rows) return;
    rows.innerHTML = state.products.map((product) => `
      <tr>
        <td>${escapeHtml(product.category)}</td>
        <td>${escapeHtml(product.size)}</td>
        <td>${escapeHtml(product.micron)}</td>
        <td>${escapeHtml(product.application)}</td>
        <td>${escapeHtml(product.recommendedUse)}</td>
      </tr>
    `).join('');
  }

  function renderFaq() {
    const host = document.getElementById('faqList');
    if (!host) return;
    host.innerHTML = faqs.map(([question, answer], index) => `
      <details class="faq-item" ${index === 0 ? 'open' : ''}>
        <summary>${escapeHtml(question)}</summary>
        <p>${escapeHtml(answer)}</p>
      </details>
    `).join('');
  }

  function renderJsonLd(productList) {
    const graph = productList.map((product) => ({
      '@type': 'Product',
      name: product.name,
      category: product.category,
      description: product.description,
      image: product.image ? (product.image.startsWith('http') ? product.image : location.origin + product.image) : undefined,
      brand: { '@type': 'Brand', name: 'RPV Industrial Supply' },
      url: location.origin + productUrl(product),
      additionalProperty: [
        { '@type': 'PropertyValue', name: 'Size', value: product.size },
        { '@type': 'PropertyValue', name: 'Micron', value: product.micron },
        { '@type': 'PropertyValue', name: 'Application', value: product.application }
      ]
    }));
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          name: 'RPV Abrasive Media Products',
          url: location.origin + '/products',
          description: 'สินค้า abrasive media และเครื่องพ่นทรายของ RPV Industrial Supply'
        },
        ...graph
      ]
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  function findProductFromLocation() {
    const query = new URLSearchParams(location.search);
    const idParam = query.get('id');
    const slugFromPath = location.pathname
      .replace(/^\/products\/?/, '')
      .replace(/\/$/, '');

    if (idParam) {
      const numericId = Number(idParam);
      if (!Number.isNaN(numericId)) {
        const byId = state.products.find((item) => Number(item.id) === numericId);
        if (byId) return byId;
      }
    }

    if (slugFromPath) {
      const bySlug = state.products.find((item) => item.slug === slugFromPath);
      if (bySlug) return bySlug;

      const itemMatch = slugFromPath.match(/^item-(\d+)$/);
      if (itemMatch) {
        const byItemId = state.products.find((item) => Number(item.id) === Number(itemMatch[1]));
        if (byItemId) return byItemId;
      }
    }

    return null;
  }

  function normalizeDbProduct(item) {
    const name = item.name || 'Abrasive Media';
    const category = item.category || 'Other Abrasive Media';
    const slug = String(name)
      .toLowerCase()
      .replace(/no\./g, 'no')
      .replace(/[^a-z0-9ก-๙]+/gi, '-')
      .replace(/(^-|-$)/g, '');

    return {
      slug,
      id: item.id,
      name,
      category,
      size: item.subtitle || 'สอบถามขนาดเพิ่มเติม',
      micron: item.subtitle || 'สอบถามขนาดเพิ่มเติม',
      minMicron: 0,
      maxMicron: 10000,
      application: item.applications ? String(item.applications).split('\n')[0] : 'สอบถามการใช้งานเพิ่มเติม',
      applicationTags: ['surface-prep'],
      recommendedUse: item.description || 'สอบถามทีม RPV เพื่อเลือกสินค้าให้เหมาะกับงาน',
      description: item.description || 'สินค้าอุตสาหกรรมสำหรับงานขัดผิวและเตรียมผิว',
      image: item.image,
      imageTone: 'glass',
      features: item.features || '',
      technicalSpecs: item.technicalSpecs || '',
      codeSizes: item.codeSizes || '',
      packaging: item.packaging || '',
      pdfLink: item.pdfLink || ''
    };
  }

  async function loadDbProducts() {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) return [];
      const data = await response.json();
      return data.map(normalizeDbProduct);
    } catch {
      return [];
    }
  }

  function renderList(title, items) {
    if (!items.length) return '';
    return `
      <div class="info-section">
        <h3>${escapeHtml(title)}</h3>
        <ul class="feature-list">
          ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  function renderDetail(product) {
    document.getElementById('pageH1').textContent = product.name;
    document.title = `${product.name} | RPV Industrial Supply`;
    document.querySelector('meta[name="description"]').setAttribute(
      'content',
      `${product.name} ${product.size} สำหรับ ${product.application} ติดต่อ RPV Industrial Supply เพื่อขอใบเสนอราคา`
    );
    document.getElementById('productFilters').hidden = true;
    document.getElementById('productGroups').hidden = true;

    const featureList = String(product.features || '').split('\n').filter(Boolean);
    const specList = String(product.technicalSpecs || '').split('\n').filter(Boolean);
    const optionsList = String(product.codeSizes || '').split('\n').filter(Boolean);
    const packageText = String(product.packaging || '').trim();
    const isPortable = product.slug === 'portable-und-blaster';

    const detail = document.getElementById('detailView');
    detail.hidden = false;
    detail.innerHTML = `
      <article class="product-detail-page">
        <a class="btn btn-outline" href="/products">กลับไปหน้าสินค้าทั้งหมด</a>
        ${isPortable ? `
          <section class="product-hero-mini">
            <div class="badge">Featured Machine</div>
            <h2>เครื่องพ่นทรายกลางแจ้งแบบพกพา</h2>
            <p class="lead">โซลูชันสำหรับงานภาคสนาม งานซ่อมบำรุง และงานเตรียมผิวโครงสร้างเหล็กขนาดใหญ่</p>
          </section>
        ` : ''}
        <div class="product-detail-layout">
          <div class="detail-image">${productImage(product)}</div>
          <div class="panel detail-info">
            <span class="badge">${escapeHtml(product.category)}</span>
            <h2>${escapeHtml(product.name)}</h2>
            <p class="lead">${escapeHtml(product.description)}</p>
            <dl class="product-facts detail-facts">
              <div><dt>ขนาด</dt><dd>${escapeHtml(product.size)}</dd></div>
              <div><dt>Micron</dt><dd>${escapeHtml(product.micron)}</dd></div>
              <div><dt>การใช้งานหลัก</dt><dd>${escapeHtml(product.application)}</dd></div>
              <div><dt>แนะนำ</dt><dd>${escapeHtml(product.recommendedUse)}</dd></div>
            </dl>
            ${renderList('จุดเด่น', featureList)}
            ${renderList('สเปกหลัก', specList)}
            ${renderList('ขนาด / รุ่น', optionsList)}
            ${packageText ? `<div class="info-section"><h3>การจัดส่ง</h3><p>${escapeHtml(packageText)}</p></div>` : ''}
            <div class="product-card-actions">
              <a class="btn btn-primary" href="${quoteUrl(product)}">ขอใบเสนอราคา</a>
              <a class="btn btn-outline" href="/3d/filter">ดูโมเดล 3D</a>
              <a class="btn btn-outline" href="/catalog.html">PDF Catalog</a>
              <a class="btn btn-outline" href="tel:0863990785">โทร 086-399-0785</a>
              ${product.pdfLink ? `<a class="btn btn-outline" href="${escapeHtml(product.pdfLink)}">เปิดรายละเอียด</a>` : ''}
            </div>
          </div>
        </div>
        ${isPortable ? `
          <section class="product-gallery-strip">
            <div class="gallery-tile">${productImage({ ...product, imageTone: 'portable' })}</div>
            <div class="gallery-tile">${productImage({ ...product, imageTone: 'steel' })}</div>
            <div class="gallery-tile">${productImage({ ...product, imageTone: 'grit' })}</div>
          </section>
        ` : ''}
      </article>
    `;
  }

  function setupEvents() {
    ['searchInput', 'categoryFilter', 'sizeFilter', 'applicationFilter'].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', applyFilters);
      el.addEventListener('change', applyFilters);
    });
  }

  async function init() {
    const dbProducts = await loadDbProducts();
    const knownSlugs = new Set(baseProducts.map((product) => product.slug));
    state.products = [
      ...baseProducts,
      ...dbProducts.filter((product) => !knownSlugs.has(product.slug))
    ];
    state.filtered = state.products;

    renderCategoryOptions();
    renderProducts();
    renderComparison();
    renderFaq();
    renderJsonLd(state.products);
    setupEvents();

    const product = findProductFromLocation();
    if (product) renderDetail(product);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
