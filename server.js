import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("backend running");
});

app.post("/process", (req, res) => {
  const { url } = req.body;

  res.json({
    driveLink: "https://drive.google.com/fake-link"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("running"));
