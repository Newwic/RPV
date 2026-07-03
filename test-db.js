// test-db.js
const sequelize = require('./database/config');
const Product = require('./database/models/Product');

async function checkDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL เชื่อมต่อสำเร็จ');

    const count = await Product.count();
    console.log(`📊 จำนวนสินค้าในฐานข้อมูล: ${count} รายการ`);

    if (count === 0) {
      console.log('⚠️ ยังไม่มีข้อมูลสินค้า กำลังเพิ่มตัวอย่าง...');
      
      await Product.bulkCreate([
        { name: "เครื่องพ่นทรายอัตโนมัติ 500 ลิตร", price: 125000, description: "เครื่องพ่นทรายระบบอัตโนมัติ", category: "เครื่องพ่นทราย" },
        { name: "ทรายพ่น Aluminum Oxide", price: 850, description: "ทรายพ่นคุณภาพสูง 25 กก.", category: "วัสดุขัดผิว" },
        { name: "ปืนพ่นทราย Heavy Duty", price: 2450, description: "ปืนพ่นทรายมือถือ", category: "อุปกรณ์" }
      ]);
      console.log('✅ เพิ่มข้อมูลตัวอย่างสำเร็จแล้ว');
    }

    const products = await Product.findAll();
    console.table(products.map(p => ({ id: p.id, name: p.name, price: p.price })));

  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    process.exit();
  }
}

checkDB();