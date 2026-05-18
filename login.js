function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("กรุณากรอก Username และ Password");
        return;
    }

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
        .then(res => res.json())
        .then(data => {
            if (data.status === "success") {
                window.location.href = "/admin";
            } else {
                alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
            }
        })
        .catch(err => {
            console.error(err);
            alert("ไม่สามารถเชื่อมต่อกับ Server ได้");
        });
}
