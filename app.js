const express = require('express');
const { Client } = require('pg');
const app = express();

const PORT = process.env.PORT || 3000;

// Tạo client
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// Kết nối 1 lần duy nhất
client.connect()
    .then(() => console.log("🔌 Connected to PostgreSQL Render"))
    .catch(err => console.error("❌ Connection error:", err));

app.get('/', async (req, res) => {
    try {
        const result = await client.query("SELECT NOW() AS current_time");

        res.send(`
            <h1>✅ Kết nối DB Render thành công!</h1>
            <h1>✅ Hồ Quang Lành, Trần Nữ Hồ Na, Nguyễn Hữu Luật</h1>
            <p>⏰ Thời gian từ DB: <b>${result.rows[0].current_time}</b></p>
        `);

    } catch (error) {
        res.send(`❌ Lỗi truy vấn: ${error.message}`);
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
