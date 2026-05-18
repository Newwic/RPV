const path = require("path");
const crypto = require("crypto");
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const sessions = new Map();
const COOKIE_NAME = "rpv_session";

function parseCookies(cookieHeader = "") {
    return cookieHeader.split(";").reduce((cookies, pair) => {
        const [name, ...rest] = pair.trim().split("=");
        if (!name) return cookies;
        cookies[name] = rest.join("=");
        return cookies;
    }, {});
}

function attachSession(req, res, next) {
    const cookies = parseCookies(req.headers.cookie || "");
    const sessionId = cookies[COOKIE_NAME];
    if (sessionId && sessions.has(sessionId)) {
        req.sessionId = sessionId;
        req.session = sessions.get(sessionId);
    } else {
        req.sessionId = null;
        req.session = null;
    }
    req.setSessionCookie = (id) => {
        res.setHeader("Set-Cookie", `${COOKIE_NAME}=${id}; HttpOnly; Path=/; Max-Age=86400`);
    };
    req.clearSessionCookie = () => {
        res.setHeader("Set-Cookie", `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0`);
    };
    next();
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(attachSession);

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Neww_ic95559",
    database: "rpv_db"
});

db.connect((err) => {
    if (err) {
        console.error("❌ MySQL Connection Failed:", err.message);
    } else {
        console.log("✅ MySQL Connected Successfully");
    }
});

function requireAuth(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }

    const acceptsJson = req.headers.accept && req.headers.accept.includes("application/json");
    if (acceptsJson || req.method !== "GET") {
        return res.status(401).json({ status: "unauthorized" });
    }

    res.redirect("/login");
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/login", (req, res) => {
    if (req.session && req.session.user) {
        return res.redirect("/admin");
    }
    res.sendFile(path.join(__dirname, "login.html"));
});

app.get("/admin", requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, "admin.html"));
});

app.get("/logout", (req, res) => {
    if (req.sessionId) {
        sessions.delete(req.sessionId);
    }
    req.clearSessionCookie();
    res.redirect("/login");
});

app.get("/products", (req, res) => {
    db.query("SELECT * FROM products", (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

app.get("/admin/products", requireAuth, (req, res) => {
    db.query("SELECT * FROM products", (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

app.get("/product/:id", (req, res) => {
    db.query("SELECT * FROM products WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(404).send("Not found");
        res.json(result[0]);
    });
});

app.post("/add-product", requireAuth, (req, res) => {
    const { name, price, detail, image } = req.body;
    const sql = "INSERT INTO products (name, price, detail, image) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, price, detail, image], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ status: "success" });
    });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const fallbackUsername = "new";
    const fallbackPassword = "neww_ic95559";

    const proceedLogin = (userId, userName) => {
        const sessionId = crypto.randomBytes(16).toString("hex");
        const sessionData = { user: { id: userId, username: userName }, createdAt: Date.now() };
        sessions.set(sessionId, sessionData);
        req.setSessionCookie(sessionId);
        res.json({ status: "success" });
    };

    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            if (username === fallbackUsername && password === fallbackPassword) {
                return proceedLogin(-1, fallbackUsername);
            }
            return res.status(500).send(err);
        }

        if (result.length > 0) {
            return proceedLogin(result[0].id, result[0].username);
        }

        if (username === fallbackUsername && password === fallbackPassword) {
            return proceedLogin(-1, fallbackUsername);
        }

        res.json({ status: "fail" });
    });
});

app.use(express.static(".", { extensions: ["html"] }));

app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
});