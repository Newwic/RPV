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

const uploadDir = path.join(__dirname, 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '-');
    cb(null, `${Date.now()}-${base}${ext}`);
  }
});
const upload = multer({ storage });

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
  res.sendFile(path.join(__dirname, 'views', 'product.html'));
});

app.get('/products/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'product.html'));
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
    const products = await Product.findAll({ order: [['id', 'ASC']] });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/products', requireAdmin, upload.single('image'), async (req, res) => {
  try {
    const product = await Product.create({
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
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    await product.update({
      ...req.body,
      image: req.file ? `/uploads/${req.file.filename}` : (req.body.image || product.image)
    });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/products/:id', requireAdmin, async (req, res) => {
  try {
    const deleted = await Product.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log(`RPV website running: http://localhost:${PORT}`);
  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
});
