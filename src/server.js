const app = require("./app");

const PORT = process.env.MONGO_URI ;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
