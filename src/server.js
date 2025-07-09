const app = require("./app");

const PORT = process.env.MONGO_URI || 1000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
