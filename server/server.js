const path = require('path');
const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

const useRoutes = require("./routes/users");
const itemRoutes = require("./routes/items");

app.use("/api/users", useRoutes);
app.use("/api/items", itemRoutes);

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
