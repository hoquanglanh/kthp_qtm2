const express = require('express');
const { Client } = require('pg');
const app = express();

const PORT = process.env.PORT || 3000;

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

app.get('/', async (req, res) => {
    try {
        await client.connect();
        const result = await client.query("SELECT NOW() as current_time");

        res.send(`
            <h1>✅ Kết nối DB Render thành công!</h1>
            <p>⏰ Thời gian từ DB: <b>${result.rows[0].current_time}</b></p>
        `);
    } catch (error) {
        res.send(`❌ Lỗi kết nối: ${error.message}`);
    }
});

app.listen(PORT, () => console.log(`Server chạy tại cổng ${PORT}`));
