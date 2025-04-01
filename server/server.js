const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

const useRoutes = require("./routes/users");
const itemRoutes = require("./routes/items");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", useRoutes);
app.use("/api/items", itemRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
