document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const container = document.getElementById("detailContainer");

    if (!id) {
        showError("ไม่พบรหัสสินค้า");
        return;
    }

    // ดึงข้อมูลสินค้าทั้งหมด แล้วหาตัวที่ตรงกับ id
    fetch('/api/products')
        .then(response => {
            if (!response.ok) throw new Error("ไม่สามารถเชื่อมต่อ Server");
            return response.json();
        })
        .then(products => {
            const product = products.find(p => p.id == id);

            if (!product) {
                showError("ไม่พบสินค้านี้ในระบบ");
                return;
            }

            // แสดงข้อมูลสินค้า
            container.innerHTML = `
                <div class="detail-card">
                    <div class="image-box">
                        ${product.image 
                            ? `<img src="${product.image}" alt="${product.name}">` 
                            : `<img src="images/product1.jpg" alt="${product.name}">`}
                    </div>
                    <div class="detail-content">
                        <h1>${product.name}</h1>
                        <h2>฿ ${Number(product.price).toLocaleString()}</h2>
                        <p><strong>หมวดหมู่:</strong> ${product.category || 'ไม่ระบุ'}</p>
                        <p>${product.description || 'ไม่มีรายละเอียดเพิ่มเติม'}</p>
                        
                        <button onclick="alert('ขอบคุณที่สนใจสินค้า\nเราจะติดต่อกลับโดยเร็วที่สุด')">
                            ติดต่อสั่งซื้อสินค้า
                        </button>
                        
                        <br><br>
                        <a href="product.html" style="color: var(--accent); font-size: 1.1rem;">
                            ← กลับไปหน้าสินค้าทั้งหมด
                        </a>
                    </div>
                </div>
            `;
        })
        .catch(error => {
            console.error(error);
            showError("เกิดข้อผิดพลาด กรุณาตรวจสอบ Server");
        });
});

function showError(message) {
    const container = document.getElementById("detailContainer");
    container.innerHTML = `
        <div style="text-align:center; padding:80px 20px;">
            <h2 style="color:#ff6b6b;">❌ ${message}</h2>
            <br>
            <a href="product.html" style="color:var(--accent); font-size:1.1rem;">
                ← กลับไปหน้าสินค้าทั้งหมด
            </a>
        </div>
    `;
}