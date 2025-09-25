import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import fetch from "node-fetch";

dotenv.config();
const app = express();

// سرو فایل‌های استاتیک (همون index, script, style قبلی)
app.use(express.static("public"));
app.use(bodyParser.json());

// مسیر API برای بررسی Cloudflare Token
app.post("/api/check", async (req, res) => {
  try {
    const token = req.body.token;
    if (!token) return res.status(400).json({ success: false, message: "No token" });

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.CF_SECRET,
        response: token,
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`✅ Server running on http://localhost:${process.env.PORT}`);
});
