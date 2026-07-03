const sequelize = require('./database/config');
const Product = require('./database/models/Product');

async function test() {
  try {
    await sequelize.authenticate();
    console.log('Connected');
    const count = await Product.count();
    console.log(`Total count: ${count}`);
    const products = await Product.findAll();
    console.log('All products:');
    products.forEach(p => {
      console.log(`  ID: ${p.id}, Name: ${p.name}, Price: ${p.price}`);
    });
  } catch (e) {
    console.error(e);
  } finally {
    await sequelize.close();
  }
}

test();
