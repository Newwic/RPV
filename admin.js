document.addEventListener("DOMContentLoaded", () => {
    loadAdminProducts();
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            fetch("/logout").then(() => {
                window.location.href = "/login";
            });
        });
    }
});

function loadAdminProducts() {
    const container = document.getElementById("admin-products");
    if (!container) return;

    container.innerHTML = `<p class="empty-state">กำลังโหลดสินค้าสำหรับผู้ดูแล...</p>`;

    fetch("/admin/products")
        .then(res => {
            if (res.status === 401) {
                window.location.href = "/login";
                throw new Error("unauthorized");
            }
            if (!res.ok) throw new Error("ไม่สามารถโหลดรายการสินค้าได้");
            return res.json();
        })
        .then(products => {
            if (!products || products.length === 0) {
                container.innerHTML = `<p class="empty-state">ยังไม่มีสินค้าในระบบ</p>`;
                return;
            }
            container.innerHTML = products.map(product => `
                <article class="product-card">
                    <img src="images/${product.image || 'product1.jpg'}" alt="${product.name}">
                    <div class="product-content">
                        <h3>${product.name}</h3>
                        <p>${product.detail ? product.detail.substring(0, 120) + '...' : 'ไม่มีรายละเอียดสินค้า'}</p>
                        <div class="price">${Number(product.price).toLocaleString()} บาท</div>
                    </div>
                </article>
            `).join("");
        })
        .catch(error => {
            console.error(error);
            container.innerHTML = `<p class="empty-state" style="color:#ff6b6b;">ไม่สามารถโหลดรายการสินค้าได้</p>`;
        });
}

function addProduct() {
    const name = document.getElementById("name").value.trim();
    const price = document.getElementById("price").value.trim();
    const detail = document.getElementById("detail").value.trim();
    const image = document.getElementById("image").value.trim() || "product1.jpg";

    if (!name || !price || !detail) {
        alert("กรุณากรอกข้อมูลสินค้าให้ครบถ้วน");
        return;
    }

    fetch("/add-product", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, price, detail, image })
    })
        .then(res => {
            if (res.status === 401) {
                window.location.href = "/login";
                throw new Error("unauthorized");
            }
            if (!res.ok) throw new Error("ไม่สามารถเพิ่มสินค้าได้");
            return res.json();
        })
        .then(data => {
            alert("เพิ่มสินค้าเรียบร้อยแล้ว");
            document.getElementById("name").value = "";
            document.getElementById("price").value = "";
            document.getElementById("detail").value = "";
            document.getElementById("image").value = "";
            loadAdminProducts();
        })
        .catch(err => {
            console.error(err);
            alert("ไม่สามารถเพิ่มสินค้าได้ กรุณาลองใหม่อีกครั้ง");
        });
}
