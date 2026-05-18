document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const detail = document.getElementById("product-detail");

    if (!id) {
        showError("ไม่พบรหัสสินค้า");
        return;
    }

    fetch(`/product/${id}`)
        .then(response => {
            if (!response.ok) throw new Error("ไม่พบสินค้า");
            return response.json();
        })
        .then(product => {
            detail.innerHTML = `
                <div class="detail-card">
                    <img src="images/${product.image || 'product1.jpg'}" alt="${product.name}">
                    <div class="detail-content">
                        <h1>${product.name}</h1>
                        <h2>${Number(product.price).toLocaleString()} บาท</h2>
                        <p>${product.detail || 'รายละเอียดสินค้าไม่พร้อมใช้งาน'}</p>
                        <button onclick="alert('ติดต่อฝ่ายขาย: 02-xxx-xxxx')">ติดต่อสั่งซื้อ</button>
                        <p class="footer-note" style="margin-top:20px;">หรือกลับไปยัง <a href="index.html">หน้าหลัก</a></p>
                    </div>
                </div>
            `;
        })
        .catch(error => {
            console.error(error);
            showError("ไม่พบสินค้า หรือ Server ไม่ทำงาน");
        });
});

function showError(message) {
    document.getElementById("product-detail").innerHTML = `
        <div style="text-align:center; padding:100px 20px;">
            <h2 style="color:#ff6b6b;">❌ ${message}</h2>
            <a href="index.html" style="color:#1aff8c; font-size:18px;">กลับไปหน้าหลัก</a>
        </div>
    `;
}