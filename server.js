import express from "express";
const app = express();
app.use(express.static("public"));
app.use(express.json());

// Placeholder route pour test
app.get("/api/test", (req, res) => res.json({ message: "OK" }));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
