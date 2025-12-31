const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

function generatePassword(length, options) {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+[]{}<>?/";

  let chars = "";
  if (options.uppercase) chars += upper;
  if (options.lowercase) chars += lower;
  if (options.numbers) chars += numbers;
  if (options.symbols) chars += symbols;

  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  return password;
}

app.post("/api/generate", (req, res) => {
  const { length, options } = req.body;

  if (!options.uppercase && !options.lowercase && !options.numbers && !options.symbols) {
    return res.status(400).json({ error: "Select at least one option" });
  }

  const password = generatePassword(length, options);
  res.json({ password });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});