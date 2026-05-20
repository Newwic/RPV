// server.js
const express = require('express');
const path = require('path');
const session = require('express-session');
const multer = require('multer');
const sequelize = require('./database/config');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'rpv-industrial-2026',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 2 * 60 * 60 * 1000 }
}));

// Multer
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// เชื่อมต่อ MySQL
sequelize.authenticate()
  .then(() => console.log('✅ MySQL เชื่อมต่อสำเร็จ'))
  .catch(err => console.error('❌ MySQL Error:', err.message));

sequelize.sync({ alter: false, force: false })
  .then(() => console.log('✅ Database Synced'))
  .catch(err => console.error('❌ Sync Error:', err));

const Product = require('./database/models/Product');

// Seed Data (ตัวอย่างสินค้า) - Disabled
async function seedData() {
  try {
    const count = await Product.count();
    console.log(`📦 สินค้าในฐานข้อมูล: ${count} รายการ`);
  } catch (e) {
    console.error('Seed Error:', e.message);
  }
}
seedData();

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '123456') {
    req.session.isLoggedIn = true;
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
  }
});

const isAuthenticated = (req, res, next) => {
  if (req.session.isLoggedIn) return next();
  res.redirect('/login.html');
};

app.get('/admin.html', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin.html'));
});

app.get('/api/products', async (req, res) => {
  const products = await Product.findAll({ order: [['id', 'DESC']] });
  res.json(products);
});

app.get('/api/debug/count', async (req, res) => {
  const count = await Product.count();
  const all = await Product.findAll();
  res.json({ count, productIds: all.map(p => p.id), total: all.length });
});

app.post('/api/products', isAuthenticated, upload.single('image'), async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      price: parseFloat(req.body.price),
      description: req.body.description,
      category: req.body.category,
      image: req.file ? `/uploads/${req.file.filename}` : null
    });
    res.json(product);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.put('/api/products/:id', isAuthenticated, upload.single('image'), async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'ไม่พบสินค้า' });

    const updateData = {
      name: req.body.name,
      price: parseFloat(req.body.price),
      description: req.body.description,
      category: req.body.category
    };
    if (req.file) updateData.image = `/uploads/${req.file.filename}`;

    await product.update(updateData);
    res.json(product);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete('/api/products/:id', isAuthenticated, async (req, res) => {
  await Product.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});