import express from "express";
import cors from "cors";
import { exec } from "child_process";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/process", async (req, res) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ error: "No URL" });

  const fileName = "video.mp4";

  try {
    // 1. download video
    await new Promise((resolve, reject) => {
      exec(`yt-dlp -o "${fileName}" ${url}`, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // 2. upload to Google Drive (placeholder step)
    // اینجا بعداً OAuth اضافه می‌کنیم
    const driveLink = "https://drive.google.com/fake-upload";

    // 3. delete file
    fs.unlinkSync(fileName);

    res.json({ driveLink });

  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed processing video" });
  }
});

app.listen(process.env.PORT || 3000);
