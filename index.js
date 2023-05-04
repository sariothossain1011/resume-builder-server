const app = require("./app");

const PORT = process.env.PORT;






app.listen(PORT, () => console.log(`server is runing at http://localhost:${PORT}`));
