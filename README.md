# RPV Industrial Website

เว็บไซต์ RPV Industrial พร้อมระบบแสดงสินค้าและหน้า Admin สำหรับเพิ่มสินค้าใหม่.

## การติดตั้ง

1. ติดตั้ง dependencies

```bash
npm install
```

2. ตั้งค่า MySQL database

- สร้างฐานข้อมูลชื่อ `rpv_db`
- สร้างตาราง `products` และ `users`

ตัวอย่าง SQL:

```sql
CREATE DATABASE rpv_db;
USE rpv_db;
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  detail TEXT,
  image VARCHAR(255) DEFAULT 'product1.jpg'
);
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL
);
```

3. รันเซิร์ฟเวอร์

```bash
npm start
```

4. เปิดเว็บ

```
http://localhost:3000/index.html
```

## โครงสร้างไฟล์

- `index.html` - หน้าแรก
- `product.html` - หน้าแสดงรายละเอียดสินค้า
- `about.html` - เกี่ยวกับบริษัท
- `gallery.html` - แกลเลอรี่
- `contact.html` - หน้าติดต่อ
- `login.html` - หน้า Login
- `admin.html` - หน้าเพิ่มสินค้า
- `style.css` - สไตล์เว็บไซต์
- `script.js` - โหลดสินค้าหน้าแรก
- `product.js` - โหลดข้อมูลสินค้าแบบละเอียด
- `admin.js` - เพิ่มสินค้าใหม่
- `login.js` - เข้าสู่ระบบผู้ดูแล
- `server.js` - เซิร์ฟเวอร์ Node/Express และ API
 
