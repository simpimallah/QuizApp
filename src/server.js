const app = require("./app");

const PORT = process.env.MONGO_URI || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
