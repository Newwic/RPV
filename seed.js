// seed.js
const sequelize = require('./database/config');
const Product = require('./database/models/Product');

async function seed() {
  try {
    const count = await Product.count();
    console.log(`ปัจจุบันมีสินค้า ${count} รายการ`);

    if (count === 0) {
      await Product.bulkCreate([
        { name: "เครื่องพ่นทรายอัตโนมัติ 500 ลิตร", price: 125000, description: "เครื่องพ่นทรายระบบอัตโนมัติ ขนาดใหญ่", category: "เครื่องพ่นทราย" },
        { name: "ทรายพ่น Aluminum Oxide 80 mesh", price: 850, description: "ทรายพ่นคุณภาพสูง 25 กก.", category: "วัสดุขัดผิว" },
        { name: "ปืนพ่นทราย Heavy Duty", price: 2450, description: "ปืนพ่นทรายมือถือทนทาน", category: "อุปกรณ์" },
        { name: "ระบบ Shot Blasting", price: 89000, description: "เครื่องฟื้นฟูผิวโลหะ", category: "เครื่องพ่นทราย" }
      ]);
      console.log('✅ เพิ่มสินค้าตัวอย่างสำเร็จ 4 รายการ');
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

seed(); 