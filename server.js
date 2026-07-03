const path = require('path');
const fs = require('fs');
const express = require('express');
const session = require('express-session');
const multer = require('multer');
const cors = require('cors');

const sequelize = require('./database/config');
const Product = require('./database/models/Product');

const app = express();
const PORT = process.env.PORT || 3000;
const SITE_URL = (process.env.SITE_URL || process.env.RENDER_EXTERNAL_URL || 'https://rpv-industrial-supply.onrender.com').replace(/\/$/, '');
const SITEMAP_URLS = [
  '/',
  '/about.html',
  '/products',
  '/gallery.html',
  '/contact.html'
];
const productsFile = path.join(__dirname, 'database', 'products.json');
const seedProducts = [
  {
    id: 1,
    name: 'Glass Beads No.12',
    price: 850,
    subtitle: '45-90 µm',
    description: 'เม็ดแก้วพ่นทรายสำหรับงานพ่นละเอียด งานลบคม และงานทำผิว Satin',
    category: 'Glass Beads',
    image: ''
  },
  {
    id: 2,
    name: 'Steel Shot',
    price: 1200,
    subtitle: '250-1200 µm',
    description: 'เม็ดเหล็กกลมสำหรับงาน shot blasting และเตรียมผิวโลหะ',
    category: 'Steel Shot',
    image: ''
  },
  {
    id: 3,
    name: 'Steel Grit',
    price: 1300,
    subtitle: '250-1400 µm',
    description: 'เม็ดเหล็กทรงเหลี่ยมสำหรับสร้าง profile และทำผิวหยาบ',
    category: 'Steel Grit',
    image: ''
  },
  {
    id: 4,
    name: 'Carbon Steel Cut Wire',
    price: 1450,
    subtitle: '300-1800 µm',
    description: 'เม็ดลวดตัดสำหรับงาน shot peening และงานลบคม',
    category: 'Cut Wire',
    image: ''
  },
  {
    id: 5,
    name: 'Ceramic Media',
    price: 1650,
    subtitle: '1000-10000 µm',
    description: 'วัสดุขัดเซรามิกสำหรับเครื่อง vibratory finishing',
    category: 'Ceramic Media',
    image: ''
  }
];

const uploadDir = path.join(__dirname, 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });
fs.mkdirSync(path.dirname(productsFile), { recursive: true });
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '-');
    cb(null, `${Date.now()}-${base}${ext}`);
  }
});
const upload = multer({ storage });
let useDatabase = false;

async function ensureFileStore() {
  try {
    await fs.promises.access(productsFile, fs.constants.F_OK);
  } catch {
    await fs.promises.writeFile(productsFile, JSON.stringify(seedProducts, null, 2), 'utf8');
  }
}

async function readFileProducts() {
  await ensureFileStore();
  const raw = await fs.promises.readFile(productsFile, 'utf8');
  try {
    return JSON.parse(raw);
  } catch {
    return [...seedProducts];
  }
}

async function writeFileProducts(products) {
  await fs.promises.writeFile(productsFile, JSON.stringify(products, null, 2), 'utf8');
}

function normalizeFileProduct(product) {
  return {
    ...product,
    price: Number(product.price || 0)
  };
}

async function listProducts() {
  if (useDatabase) {
    return Product.findAll({ order: [['id', 'ASC']] });
  }
  const products = await readFileProducts();
  return products.map(normalizeFileProduct);
}

async function createProduct(data) {
  if (useDatabase) {
    return Product.create(data);
  }
  const products = await readFileProducts();
  const nextId = products.length ? Math.max(...products.map((item) => Number(item.id) || 0)) + 1 : 1;
  const product = { id: nextId, ...data, price: Number(data.price || 0) };
  products.push(product);
  await writeFileProducts(products);
  return product;
}

async function updateProductById(id, data) {
  if (useDatabase) {
    const product = await Product.findByPk(id);
    if (!product) return null;
    await product.update(data);
    return product;
  }

  const products = await readFileProducts();
  const index = products.findIndex((item) => Number(item.id) === Number(id));
  if (index === -1) return null;
  products[index] = { ...products[index], ...data, id: products[index].id, price: Number(data.price ?? products[index].price ?? 0) };
  await writeFileProducts(products);
  return products[index];
}

async function deleteProductById(id) {
  if (useDatabase) {
    return Product.destroy({ where: { id } });
  }

  const products = await readFileProducts();
  const filtered = products.filter((item) => Number(item.id) !== Number(id));
  const deleted = filtered.length !== products.length;
  if (deleted) {
    await writeFileProducts(filtered);
  }
  return deleted;
}

async function seedDatabaseIfEmpty() {
  const count = await Product.count();
  if (count > 0) return;
  await Product.bulkCreate(seedProducts);
}

function requireAdmin(req, res, next) {
  if (req.session.authenticated) return next();
  return res.status(401).json({ error: 'Please login first' });
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'rpv-dev-session',
  resave: false,
  saveUninitialized: false
}));

app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml
`);
});

app.get('/sitemap.xml', (req, res) => {
  const urls = SITEMAP_URLS.map((route) => {
    const loc = `${SITE_URL}${route === '/' ? '/' : route}`;
    const priority = route === '/' ? '1.0' : route === '/products' ? '0.9' : '0.8';
    return `  <url>
    <loc>${loc}</loc>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');
  res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use('/uploads', express.static(uploadDir));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/products', (req, res) => {
  const file = path.join(__dirname, 'views', 'product.html');
  res.type('html').send(fs.readFileSync(file, 'utf8'));
});

app.get('/products/:slug', (req, res) => {
  const file = path.join(__dirname, 'views', 'product.html');
  res.type('html').send(fs.readFileSync(file, 'utf8'));
});

app.get('/api/me', (req, res) => {
  res.json({ authenticated: Boolean(req.session.authenticated) });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    req.session.authenticated = true;
    return res.json({ ok: true });
  }
  res.status(401).json({ error: 'Invalid username or password' });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await listProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/products', requireAdmin, upload.single('image'), async (req, res) => {
  try {
    const product = await createProduct({
      ...req.body,
      image: req.file ? `/uploads/${req.file.filename}` : req.body.image
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/products/:id', requireAdmin, upload.single('image'), async (req, res) => {
  try {
    const product = await updateProductById(req.params.id, {
      ...req.body,
      image: req.file ? `/uploads/${req.file.filename}` : req.body.image
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/products/:id', requireAdmin, async (req, res) => {
  try {
    const deleted = await deleteProductById(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await seedDatabaseIfEmpty();
    useDatabase = true;
    console.log(`RPV website running with database: http://localhost:${PORT}`);
  } catch (err) {
    useDatabase = false;
    await ensureFileStore();
    console.warn(`MySQL unavailable, using file store instead: ${err.message}`);
    console.log(`RPV website running with file store: http://localhost:${PORT}`);
  }
});
