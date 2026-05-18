const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Neww_ic95559",
    database: "rpv_db"
});

db.connect((err) => {
    if (err) {
        console.error("❌ Connection failed:", err.message);
        process.exit(1);
    }
    console.log("✅ Connected to rpv_db");

    // Check tables
    db.query("SHOW TABLES", (err, result) => {
        if (err) {
            console.error("❌ Error listing tables:", err.message);
        } else {
            console.log("📋 Tables in database:");
            result.forEach(row => {
                const tableName = row[Object.keys(row)[0]];
                console.log(`  - ${tableName}`);
            });
        }

        // Check if products table exists and show structure
        db.query("DESCRIBE products", (err, result) => {
            if (err) {
                console.error("❌ products table error:", err.message);
            } else {
                console.log("\n🏗️ products table structure:");
                console.table(result);
            }

            // Check products count
            db.query("SELECT COUNT(*) as count FROM products", (err, result) => {
                if (err) {
                    console.error("❌ Error counting products:", err.message);
                } else {
                    console.log(`\n📦 Product count: ${result[0].count}`);
                }
                db.end();
            });
        });
    });
});
