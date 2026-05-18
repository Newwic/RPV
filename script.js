// script.js - โหลดสินค้าในหน้า index.html

document.addEventListener("DOMContentLoaded", () => {
    fetch("/products")
        .then(response => {
            if (!response.ok) throw new Error("Network error");
            return response.json();
        })
        .then(products => {
            const container = document.getElementById("products");
            const existingGrid = container.querySelector(".products");
            if (existingGrid) existingGrid.remove();

            if (!Array.isArray(products) || products.length === 0) {
                const empty = document.createElement("p");
                empty.className = "empty-state";
                empty.textContent = "ยังไม่มีสินค้าในระบบ";
                container.appendChild(empty);
                return;
            }

            const grid = document.createElement("div");
            grid.className = "products";

            products.forEach(product => {
                const card = document.createElement("article");
                card.className = "card";
                card.innerHTML = `
                    <div class="image-box">
                        <img src="images/${product.image || 'product1.jpg'}" alt="${product.name}">
                    </div>
                    <div class="card-content">
                        <h2>${product.name}</h2>
                        <p>${product.detail ? product.detail.substring(0, 120) + '...' : 'รายละเอียดสินค้าไม่พร้อมใช้งาน'}</p>
                        <h3>${Number(product.price).toLocaleString()} บาท</h3>
                        <a href="product.html?id=${product.id}">
                            <button class="buy-btn">ดูรายละเอียด</button>
                        </a>
                    </div>
                `;
                grid.appendChild(card);
            });

            container.appendChild(grid);
        })
        .catch(error => {
            console.error("Error loading products:", error);
            document.getElementById("products").innerHTML = `
                <p class="empty-state" style="color:#ff6b6b;">
                    ❌ ไม่สามารถโหลดสินค้าได้<br>
                    กรุณาตรวจสอบว่า Server กำลังรันอยู่ที่ <strong>http://localhost:3000</strong>
                </p>`;
        });
});